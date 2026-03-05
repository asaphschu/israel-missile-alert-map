/**
 * api/visitors.js  —  Vercel Edge Function
 * Tracks concurrent visitors using Vercel KV (free on Hobby plan).
 *
 * Setup (one-time, ~2 minutes):
 *   1. In Vercel dashboard → Storage → Create Database → KV
 *   2. Connect the KV database to this project
 *   3. Vercel automatically injects KV_REST_API_URL + KV_REST_API_TOKEN env vars
 *   4. In js/app.js, set VISITOR_URL = '/api/visitors'
 *
 * How it works:
 *   - Each client sends GET /api/visitors?id=<random-session-id> every 30 s
 *   - We store that ID in a Redis sorted set with a score = expiry timestamp
 *   - Members with expired scores are removed; ZCARD gives the live count
 */

export const config = { runtime: 'edge' };

const TTL_MS = 90_000;   // visitor considered "online" for 90 s after last ping

async function kv(url, token, ...args) {
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export default async function handler(req) {
  const KV_URL   = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return new Response(JSON.stringify({ count: 0, error: 'KV not configured' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id') || 'anon';
  const now = Date.now();

  // Register / refresh this visitor (score = future expiry timestamp)
  await kv(KV_URL, KV_TOKEN, 'ZADD', 'online_visitors', now + TTL_MS, id);

  // Remove visitors whose expiry has passed
  await kv(KV_URL, KV_TOKEN, 'ZREMRANGEBYSCORE', 'online_visitors', '-inf', now);

  // Count remaining active visitors
  const result = await kv(KV_URL, KV_TOKEN, 'ZCARD', 'online_visitors');
  const count  = typeof result.result === 'number' ? result.result : 0;

  return new Response(JSON.stringify({ count }), {
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':               'no-store',
    },
  });
}
