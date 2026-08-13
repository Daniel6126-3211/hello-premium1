// api/count.js
// Vercel Serverless Function — visitor counter backed by Vercel KV.
// Requires: `npm install @vercel/kv` and a KV database connected in your
// Vercel project (Storage tab -> Create Database -> KV). Vercel injects
// the required env vars automatically once connected.

import { kv } from '@vercel/kv';

const COUNTER_KEY = 'hello-premium:homepage-visits';

export default async function handler(req, res) {
  // Allow the site to call this from the browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let count;

    if (req.method === 'POST') {
      // Increment and return new value
      count = await kv.incr(COUNTER_KEY);
    } else {
      // GET: just read current value without incrementing
      count = (await kv.get(COUNTER_KEY)) || 0;
    }

    return res.status(200).json({ value: count });
  } catch (err) {
    console.error('Counter API error:', err);
    return res.status(500).json({ error: 'Counter unavailable' });
  }
}