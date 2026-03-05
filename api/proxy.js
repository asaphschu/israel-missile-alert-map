/**
 * api/proxy.js  —  Vercel Edge Function
 * Proxies the Pikud HaOref real-time alert API with the required headers.
 *
 * Deployed automatically by Vercel at: /api/proxy
 * Set WORKER_URL in js/realtime.js to '/api/proxy' after deploying to Vercel.
 */

export const config = { runtime: 'edge' };

export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }

  try {
    const res = await fetch(
      'https://www.oref.org.il/WarningMessages/alert/alerts.json',
      {
        headers: {
          'Accept':           'application/json, text/plain, */*',
          'Accept-Language':  'he-IL,he;q=0.9,en-US;q=0.8',
          'Cache-Control':    'no-cache',
          'Referer':          'https://www.oref.org.il/',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    );

    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type':                'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':               'no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
