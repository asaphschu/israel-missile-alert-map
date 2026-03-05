/**
 * cloudflare-worker.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloudflare Worker that proxies the Pikud HaOref real-time alert API.
 *
 * WHY THIS IS NEEDED
 * ──────────────────
 * oref.org.il blocks requests from generic CORS proxies (they return 403).
 * Their server requires a valid Referer header pointing to their own domain.
 * Browsers cannot set the Referer header themselves (security restriction),
 * so the only solution is a small server-side proxy that adds it.
 *
 * Cloudflare Workers are free for up to 100,000 requests/day — more than
 * enough for polling every 10 seconds from thousands of users.
 *
 * SETUP (takes ~2 minutes)
 * ────────────────────────
 * 1. Create a free account at https://cloudflare.com
 * 2. In the dashboard, go to: Workers & Pages → Create application → Create Worker
 * 3. Replace the default worker code with everything in this file
 * 4. Click "Deploy"
 * 5. Copy your worker URL — it will look like:
 *      https://oref-proxy.YOUR-SUBDOMAIN.workers.dev
 * 6. Open js/realtime.js and set the WORKER_URL constant to that URL
 * 7. Live mode will now work!
 *
 * OPTIONAL: Custom domain
 * ───────────────────────
 * In the Worker settings you can add a custom route like:
 *   alerts.yourdomain.com → this worker
 * Then set WORKER_URL = 'https://alerts.yourdomain.com' in realtime.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default {
  async fetch(request) {

    // Handle CORS preflight requests from browsers
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin':  '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age':       '86400',
        },
      });
    }

    try {
      // Fetch from oref.org.il with the headers their server requires
      const res = await fetch(
        'https://www.oref.org.il/WarningMessages/alert/alerts.json',
        {
          headers: {
            'Accept':           'application/json, text/plain, */*',
            'Accept-Language':  'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control':    'no-cache',
            'Referer':          'https://www.oref.org.il/',        // ← key header
            'X-Requested-With': 'XMLHttpRequest',                  // ← key header
            'User-Agent':       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                                'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                                'Chrome/120.0.0.0 Safari/537.36',
          },
        }
      );

      const body = await res.text();

      return new Response(body, {
        status: res.status,
        headers: {
          'Content-Type':                'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',   // allow any origin to read this
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
  },
};
