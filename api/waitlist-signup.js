// Redvive — Vercel serverless function for waitlist signup
// Place at: /api/waitlist-signup.js

import crypto from 'crypto';
import { kv } from '@vercel/kv';

// ----- helpers -----

const hash = (value) => crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const pad2 = (n) => String(n).padStart(2, '0');

const FOUNDING_CAP = 99;
const COUNTER_KEY = 'redvive:founding_counter';

const flodeskAuth = () =>
  `Basic ${Buffer.from(process.env.FLODESK_API_KEY + ':').toString('base64')}`;

// ----- Flodesk -----

async function upsertFlodesk(fields) {
  const res = await fetch('https://api.flodesk.com/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': flodeskAuth(),
      'Content-Type': 'application/json',
      'User-Agent': 'Redvive/waitlist-signup'
    },
    body: JSON.stringify(fields)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Flodesk upsert failed: ${res.status} — ${errText}`);
  }
  return res.json();
}

async function addToSegment(email, segmentId) {
  const res = await fetch(
    `https://api.flodesk.com/v1/subscribers/${encodeURIComponent(email)}/segments`,
    {
      method: 'POST',
      headers: { 'Authorization': flodeskAuth(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ segment_ids: [segmentId] })
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Flodesk segment add failed: ${res.status} — ${errText}`);
  }
  return true;
}

async function processSignup({ email, firstName, language, postalCode }) {
  if (!process.env.FLODESK_API_KEY || !process.env.FLODESK_SEGMENT_ID) {
    throw new Error('Flodesk credentials missing');
  }
  const lang = language || 'en';
  const emailKey = hash(email);

  await upsertFlodesk({
    email,
    first_name: firstName || '',
    status: 'active',
    source: 'redvive-waitlist'
  });

  let foundingNumber = null;
  let founding = false;
  let isNew = false;

  const prior = await kv.hget('redvive:members', emailKey);
  if (prior && prior !== 'general') {
    foundingNumber = String(prior);
    founding = true;
  } else if (prior === 'general') {
    founding = false;
  } else {
    isNew = true;
    const n = await kv.incr(COUNTER_KEY);
    if (n <= FOUNDING_CAP) {
      foundingNumber = pad2(n);
      founding = true;
      await kv.hset('redvive:members', { [emailKey]: foundingNumber });
    } else {
      founding = false;
      await kv.hset('redvive:members', { [emailKey]: 'general' });
    }
  }

  let segmentId;
  if (!founding && process.env.FLODESK_GENERAL_SEGMENT_ID) {
    segmentId = process.env.FLODESK_GENERAL_SEGMENT_ID;
  } else if (lang === 'fi' && process.env.FLODESK_SEGMENT_ID_FI) {
    segmentId = process.env.FLODESK_SEGMENT_ID_FI;
  } else {
    segmentId = process.env.FLODESK_SEGMENT_ID;
  }
  await addToSegment(email, segmentId);

  if (isNew) {
    try {
      await kv.rpush('redvive:signups', JSON.stringify({
        postalCode: postalCode ? String(postalCode).trim() : '',
        language: lang,
        foundingNumber,
        founding,
        ts: Date.now()
      }));
    } catch (e) {
      console.error('KV signup log failed (non-fatal):', e.message);
    }
  }

  return { foundingNumber, founding };
}

// ----- Meta Conversions API -----

async function fireMetaLead({ email, firstName, request }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return false;

  const userData = {
    em: [hash(email)],
    fn: firstName ? [hash(firstName)] : undefined,
    client_ip_address: request.headers['x-forwarded-for']?.split(',')[0]?.trim() || '',
    client_user_agent: request.headers['user-agent'] || ''
  };
  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
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

// ----- Slack ping (optional, off unless SLACK_WEBHOOK_URL is set) -----

async function pingSlack({ email, firstName, language, foundingNumber, founding }) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return false;
  const memberLine = founding
    ? `*Founding member:* #${foundingNumber} of ${FOUNDING_CAP}`
    : `*Status:* general waitlist (founding spots full)`;
  const text = `🔴 *New Redvive waitlist signup*\n` +
    `*Name:* ${firstName || '(not provided)'}\n` +
    `*Email:* ${email}\n` +
    `*Language:* ${language}\n` +
    memberLine;
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

  const { email, firstName, language, postalCode, consent } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!consent) {
    return res.status(400).json({ error: 'Consent required' });
  }

  try {
    const { foundingNumber, founding } = await processSignup({
      email, firstName, language: language || 'en', postalCode
    });

    fireMetaLead({ email, firstName, request: req }).catch(() => {});
    pingSlack({ email, firstName, language: language || 'en', foundingNumber, founding }).catch(() => {});

    return res.status(200).json({
      success: true,
      founding,
      foundingNumber,
      message: founding ? 'Welcome to the waitlist' : 'Added to the waitlist'
    });
  } catch (err) {
    console.error('Signup handler error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Try again in a moment.' });
  }
}
