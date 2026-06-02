// Redvive — Vercel serverless function for waitlist signup (v2 — founding counter)
// Place at: /api/waitlist-signup.js
//
// What this does:
//   1. Validates POST input (email + first name + GDPR consent + language)
//   2. Deduplicates repeat emails using Vercel KV
//   3. Atomically increments a founding-member counter (max 99) in Vercel KV
//   4. Sends to Flodesk API (adds subscriber + founding_number custom field + segments)
//   5. Fires Meta Conversions API "Lead" event (if Pixel ID + access token configured)
//   6. Posts to a Slack webhook so Charlotta gets pinged on each signup
//
// Environment variables to set in Vercel (Project Settings → Environment Variables):
//   FLODESK_API_KEY             — get from Flodesk → Settings → API
//   FLODESK_SEGMENT_EN_ID       — the ID of "Waitlist — EN" segment
//   FLODESK_SEGMENT_FI_ID       — the ID of "Waitlist — FI" segment
//   FLODESK_GENERAL_SEGMENT_ID  — (optional) segment for signups after spot 99
//   META_PIXEL_ID               — from Meta Business Manager → Pixel settings
//   META_CAPI_ACCESS_TOKEN      — generated in Meta Events Manager → Conversions API
//   SLACK_WEBHOOK_URL           — incoming webhook URL (optional, for live ping)
//   KV_REST_API_URL             — auto-added by Vercel KV (Upstash)
//   KV_REST_API_TOKEN           — auto-added by Vercel KV (Upstash)
//
// Vercel KV keys used:
//   "founding_counter"          — integer 0–99, incremented atomically per signup
//   "waitlist_emails"           — hash map of hashed emails → founding number (or "general")

import crypto from 'crypto';
import { kv } from '@vercel/kv';

// ----- helpers -----
const hash = (value) => crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FOUNDING_MAX = 99;

// ----- Founding counter (atomic via Vercel KV) -----
async function claimFoundingSpot(emailHash) {
  // Deduplicate: if this email already signed up, return their existing number
  const existing = await kv.hget('waitlist_emails', emailHash);
  if (existing !== null && existing !== undefined) {
    return {
      founding: existing !== 'general',
      foundingNumber: existing !== 'general' ? String(existing).padStart(2, '0') : null,
      duplicate: true
    };
  }

  // Atomically increment counter
  const newCount = await kv.incr('founding_counter');

  if (newCount <= FOUNDING_MAX) {
    const paddedNumber = String(newCount).padStart(2, '0');
    await kv.hset('waitlist_emails', { [emailHash]: newCount });
    return { founding: true, foundingNumber: paddedNumber, duplicate: false };
  } else {
    await kv.hset('waitlist_emails', { [emailHash]: 'general' });
    return { founding: false, foundingNumber: null, duplicate: false };
  }
}

// ----- Flodesk -----
async function addToFlodesk({ email, firstName, language, foundingNumber, postalCode }) {
  const flodeskKey = process.env.FLODESK_API_KEY;
  const foundingSegmentId = language === 'fi'
    ? process.env.FLODESK_SEGMENT_FI_ID
    : process.env.FLODESK_SEGMENT_EN_ID;
  const generalSegmentId = process.env.FLODESK_GENERAL_SEGMENT_ID;

  const segmentId = foundingNumber ? foundingSegmentId : (generalSegmentId || foundingSegmentId);

  if (!flodeskKey || !segmentId) {
    throw new Error('Flodesk credentials missing');
  }

  const authHeader = `Basic ${Buffer.from(flodeskKey + ':').toString('base64')}`;

  const customFields = { language: language || 'en' };
  if (foundingNumber) {
    customFields.founding_number = foundingNumber;
  }
  if (postalCode) {
    customFields.postal_code = postalCode;
  }

  // Step 1: create or update subscriber
  const subscriberRes = await fetch('https://api.flodesk.com/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
      'User-Agent': 'Redvive/waitlist-signup'
    },
    body: JSON.stringify({
      email,
      first_name: firstName || '',
      custom_fields: customFields,
      status: 'active',
      source: 'redvive-waitlist'
    })
  });

  if (!subscriberRes.ok) {
    const errText = await subscriberRes.text();
    throw new Error(`Flodesk subscriber create failed: ${subscriberRes.status} — ${errText}`);
  }

  const subscriberData = await subscriberRes.json();
  const subscriberId = subscriberData.id || subscriberData.data?.id;
  if (!subscriberId) {
    throw new Error(`Flodesk subscriber response missing ID: ${JSON.stringify(subscriberData)}`);
  }

  // Step 2: add subscriber to segment
  const segmentRes = await fetch(`https://api.flodesk.com/v1/subscribers/${subscriberId}/segments`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ segment_ids: [segmentId] })
  });

  if (!segmentRes.ok) {
    const errText = await segmentRes.text();
    throw new Error(`Flodesk segment add failed: ${segmentRes.status} — ${errText}`);
  }

  return true;
}

// ----- Meta Conversions API -----
async function fireMetaLead({ email, firstName, request }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return false;
  }

  const eventTime = Math.floor(Date.now() / 1000);
  const userData = {
    em: [hash(email)],
    fn: firstName ? [hash(firstName)] : undefined,
    client_ip_address: request.headers['x-forwarded-for']?.split(',')[0]?.trim() || '',
    client_user_agent: request.headers['user-agent'] || ''
  };

  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: eventTime,
      event_source_url: 'https://redvivestudios.com',
      action_source: 'website',
      user_data: userData,
      custom_data: { content_name: 'Redvive waitlist', currency: 'EUR', value: 0 }
    }]
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error('Meta CAPI fire failed:', err.message);
    return false;
  }
}

// ----- Slack ping -----
async function pingSlack({ email, firstName, language, foundingNumber }) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return false;

  const spotLine = foundingNumber
    ? `*Founding spot:* #${foundingNumber} of ${FOUNDING_MAX}`
    : `*Spot:* General waitlist (founding full)`;

  const text = `🔴 *New Redvive waitlist signup*\n` +
    `*Name:* ${firstName || '(not provided)'}\n` +
    `*Email:* ${email}\n` +
    `*Language:* ${language}\n` +
    spotLine;

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return true;
  } catch (err) {
    console.error('Slack ping failed:', err.message);
    return false;
  }
}

// ----- main handler -----
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://redvivestudios.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName, language, consent, postalCode } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!consent) {
    return res.status(400).json({ error: 'Consent required' });
  }

  try {
    const emailHash = hash(email);

    // 1. Claim founding spot (or detect duplicate)
    const { founding, foundingNumber, duplicate } = await claimFoundingSpot(emailHash);

    if (!duplicate) {
      // 2. Add to Flodesk (triggers welcome sequence)
      await addToFlodesk({ email, firstName, language: language || 'en', foundingNumber, postalCode: postalCode || '' });

      // 3. Log postal code to KV for geographic analysis (fire and forget, no PII)
      kv.rpush('redvive:signups', JSON.stringify({
        postalCode: postalCode || '',
        language: language || 'en',
        foundingNumber: foundingNumber ?? null,
        ts: new Date().toISOString()
      })).catch(() => {});

      // 4. Fire Meta CAPI Lead (fire and forget)
      fireMetaLead({ email, firstName, request: req }).catch(() => {});

      // 5. Slack ping (fire and forget)
      pingSlack({ email, firstName, language: language || 'en', foundingNumber }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      founding,
      foundingNumber: foundingNumber ?? undefined,
      duplicate
    });
  } catch (err) {
    console.error('Signup handler error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Try again in a moment.' });
  }
}
