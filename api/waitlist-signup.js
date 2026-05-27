// Redvive — Vercel serverless function for waitlist signup
// Place at: /api/waitlist-signup.js
//
// What this does:
//   1. Validates POST input (email + first name + GDPR consent + language)
//   2. Sends to Flodesk API (adds subscriber + tags them)
//   3. Fires Meta Conversions API "Lead" event (if Pixel ID + access token configured)
//   4. Posts to a Slack webhook so Charlotta gets pinged on each signup
//
// Environment variables to set in Vercel (Project Settings → Environment Variables):
//   FLODESK_API_KEY         — get from Flodesk → Settings → API
//   FLODESK_SEGMENT_ID      — the ID of "Waitlist — pre-launch" segment
//   META_PIXEL_ID           — from Meta Business Manager → Pixel settings
//   META_CAPI_ACCESS_TOKEN  — generated in Meta Events Manager → Conversions API
//   SLACK_WEBHOOK_URL       — incoming webhook URL (optional, for live ping)
//
// Deploy:
//   vercel deploy
//
// Test:
//   curl -X POST https://redvivestudios.com/api/waitlist-signup \
//     -H "Content-Type: application/json" \
//     -d '{"email":"test@example.com","firstName":"Test","language":"en","consent":true}'

import crypto from 'crypto';

// ----- helpers -----

const hash = (value) => crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ----- Flodesk -----

async function addToFlodesk({ email, firstName, language }) {
  const flodeskKey = process.env.FLODESK_API_KEY;
  const segmentId = process.env.FLODESK_SEGMENT_ID;

  if (!flodeskKey || !segmentId) {
    throw new Error('Flodesk credentials missing');
  }

  // Step 1: create or update subscriber
  const subscriberRes = await fetch('https://api.flodesk.com/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(flodeskKey + ':').toString('base64')}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Redvive/waitlist-signup'
    },
    body: JSON.stringify({
      email,
      first_name: firstName || '',
      custom_fields: { language: language || 'en' },
      status: 'active',
      source: 'redvive-waitlist'
    })
  });

  if (!subscriberRes.ok) {
    const errText = await subscriberRes.text();
    throw new Error(`Flodesk subscriber create failed: ${subscriberRes.status} — ${errText}`);
  }

  // Step 2: add subscriber to the waitlist segment
  const segmentRes = await fetch(`https://api.flodesk.com/v1/subscribers/${encodeURIComponent(email)}/segments`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(flodeskKey + ':').toString('base64')}`,
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
    return false; // CAPI not configured, skip silently
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

async function pingSlack({ email, firstName, language, totalSignupsToday }) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return false;

  const text = `🔴 *New Redvive waitlist signup*\n` +
    `*Name:* ${firstName || '(not provided)'}\n` +
    `*Email:* ${email}\n` +
    `*Language:* ${language}\n` +
    (totalSignupsToday ? `*Today's count:* ${totalSignupsToday}` : '');

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
  // CORS for browser POST
  res.setHeader('Access-Control-Allow-Origin', 'https://redvivestudios.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName, language, consent } = req.body || {};

  // Validate
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!consent) {
    return res.status(400).json({ error: 'Consent required' });
  }

  try {
    // 1. Add to Flodesk (this triggers welcome sequence)
    await addToFlodesk({ email, firstName, language: language || 'en' });

    // 2. Fire Meta CAPI Lead (server-side, in addition to client Pixel)
    fireMetaLead({ email, firstName, request: req }).catch(() => {}); // fire and forget

    // 3. Slack ping (fire and forget)
    pingSlack({ email, firstName, language: language || 'en' }).catch(() => {});

    return res.status(200).json({ success: true, message: 'Welcome to the waitlist' });
  } catch (err) {
    console.error('Signup handler error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Try again in a moment.' });
  }
}
