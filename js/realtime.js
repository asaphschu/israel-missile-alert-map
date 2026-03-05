// js/realtime.js
// Real-time alert polling from Pikud HaOref (Israel Home Front Command)
//
// oref.org.il requires a Referer: https://www.oref.org.il/ header.
// Browsers cannot set this header, so a server-side proxy is needed.
// Deploy cloudflare-worker.js as a Cloudflare Worker (free, ~2 min),
// then set WORKER_URL below to your worker's URL.
//
// toggle() is async — performs a connectivity check before enabling.
// Returns Promise<true> if live mode started, Promise<false> if it failed.
// When a city appears in a poll that was NOT in the previous poll, _onNewAlert(city)
// is called so the caller can animate a projectile on the map.

const Realtime = (function () {
  'use strict';

  // ─── PROXY CONFIGURATION ─────────────────────────────────────────────────
  // On Vercel the Edge Function at /api/proxy handles the request.
  // On localhost /api/proxy returns 404, so the connectivity check fails
  // gracefully and shows "API unavailable" (expected during local dev).
  const IS_LOCAL = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const POLL_URL = IS_LOCAL
    ? 'https://corsproxy.io/?https://www.oref.org.il/WarningMessages/alert/alerts.json'
    : '/api/proxy';
  // ─────────────────────────────────────────────────────────────────────────

  const POLL_INTERVAL = 10000;   // 10 seconds

  let _interval    = null;
  let _liveLayer   = null;
  let _map         = null;
  let _hebMap      = {};          // Hebrew city name → city object
  let _active      = false;
  let _prevCityIds = new Set();   // city IDs seen in previous poll
  let _onNewAlert  = null;        // callback(city) for newly detected alert cities

  // ===== INIT =====
  function init(mapInstance, cities) {
    _map = mapInstance;
    cities.forEach(city => {
      if (!city.nameHe) return;
      city.nameHe.split(/[,\/]/).forEach(part => {
        const key = part.trim();
        if (key) _hebMap[key] = city;
      });
      _hebMap[city.nameHe.trim()] = city;
    });
  }

  // ===== TOGGLE =====
  // async — returns Promise<boolean> (true = now active, false = stopped or failed)
  async function toggle(mapInstance, onUpdate, onNewAlert) {
    if (_active) {
      stop();
      return false;
    }
    return _start(mapInstance, onUpdate, onNewAlert);
  }

  // ===== START (internal, async) =====
  async function _start(mapInstance, onUpdate, onNewAlert) {
    if (mapInstance) _map = mapInstance;
    _onNewAlert = onNewAlert || null;

    // ---- Connectivity check ----
    // Try to reach the API before committing to live mode.
    try {
      const testRes = await fetch(POLL_URL, { cache: 'no-store' });
      // An empty body (no alerts) still returns HTTP 200 or a short JSON.
      // If the proxy itself is down we get a network error (caught below).
      if (!testRes.ok) return false;
    } catch (_err) {
      return false;   // CORS proxy unreachable or network offline
    }

    _active      = true;
    _prevCityIds = new Set();

    _poll(onUpdate);   // immediate first real poll
    _interval = setInterval(() => _poll(onUpdate), POLL_INTERVAL);
    return true;
  }

  // ===== STOP =====
  function stop() {
    _active = false;
    if (_interval) { clearInterval(_interval); _interval = null; }
    _clearLiveLayer();
    _prevCityIds = new Set();
    _onNewAlert  = null;
  }

  // ===== IS ACTIVE =====
  function isActive() { return _active; }

  // ===== POLL =====
  async function _poll(onUpdate) {
    try {
      const res  = await fetch(POLL_URL, { cache: 'no-store' });
      const text = await res.text();

      if (!text || text.trim() === '' || !res.ok) {
        _clearLiveLayer();
        _prevCityIds = new Set();
        if (onUpdate) onUpdate(0);
        return;
      }

      let json;
      try { json = JSON.parse(text); } catch (_) {
        _clearLiveLayer();
        _prevCityIds = new Set();
        if (onUpdate) onUpdate(0);
        return;
      }

      const activeNames  = Array.isArray(json.data) ? json.data : [];
      const activeCities = activeNames
        .map(n => _hebMap[n.trim()])
        .filter(Boolean);

      // ---- Detect new alerts (cities not present in previous poll) ----
      if (_onNewAlert) {
        activeCities.forEach(city => {
          if (!_prevCityIds.has(city.id)) {
            _onNewAlert(city);
          }
        });
      }
      _prevCityIds = new Set(activeCities.map(c => c.id));

      _renderLiveAlerts(activeCities);
      if (onUpdate) onUpdate(activeCities.length);

    } catch (_err) {
      _clearLiveLayer();
      _prevCityIds = new Set();
      if (onUpdate) onUpdate(0);
    }
  }

  // ===== RENDER LIVE ALERTS =====
  function _renderLiveAlerts(cities) {
    _clearLiveLayer();
    if (!_map) return;

    _liveLayer = L.layerGroup();

    cities.forEach(city => {
      // Outer pulsing ring
      L.circleMarker([city.lat, city.lng], {
        radius:      18,
        fillColor:   '#ff1744',
        color:       '#ff5252',
        weight:      2,
        fillOpacity: 0.18,
        opacity:     0.7,
        className:   'live-outer',
        interactive: false
      }).addTo(_liveLayer);

      // Inner solid dot
      L.circleMarker([city.lat, city.lng], {
        radius:      5,
        fillColor:   '#ff1744',
        color:       '#fff',
        weight:      1.5,
        fillOpacity: 1.0,
        opacity:     1.0,
        className:   'live-inner',
        interactive: false
      }).addTo(_liveLayer);
    });

    _liveLayer.addTo(_map);
  }

  // ===== CLEAR LIVE LAYER =====
  function _clearLiveLayer() {
    if (_liveLayer && _map) { _map.removeLayer(_liveLayer); }
    _liveLayer = null;
  }

  return { init, toggle, stop, isActive };

})();
