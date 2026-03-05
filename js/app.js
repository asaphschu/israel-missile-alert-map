// js/app.js
// Map initialisation, layer management, filter logic, theme toggle,
// flight paths, search, leaderboard and Today / All-time view switching.

(function () {
  'use strict';

  // ===== CONSTANTS =====
  const MAP_CENTER        = [31.5, 36.0];
  const DEFAULT_ZOOM      = 7;
  const MIN_ZOOM          = 4;
  const MAX_ZOOM          = 14;
  const ZOOM_SHOW_MARKERS = 7;
  const ZOOM_SHOW_PATHS   = 7;
  const ZOOM_FADE_HEAT    = 11;

  const TILE_DARK  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const TILE_OPTS  = {
    maxZoom:     19,
    subdomains:  'abcd',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ' +
      '&copy; <a href="https://carto.com/attributions">CARTO</a>'
  };

  // ─── VISITOR COUNT ENDPOINT ──────────────────────────────────────────────
  // Uses the Vercel Edge Function when deployed; disabled on localhost.
  const IS_LOCAL    = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const VISITOR_URL = IS_LOCAL ? null : '/api/visitors';
  // ─────────────────────────────────────────────────────────────────────────

  // ===== STATE =====
  let map;
  let tileLayer;
  let heatLayer;
  let markerLayer;
  let canvasRenderer;
  let flightPathLayer  = null;
  let cityEntries      = [];
  let _footerClockId   = null;
  let _visitorPingId   = null;
  let _visitorId       = null;   // unique session ID for visitor tracking

  const state = {
    activeEpisodes: new Set(),
    markerClicked:  false,
    showPaths:      true,
    theme:          localStorage.getItem('mapTheme') || 'dark',
    viewMode:       'today',    // 'today' | 'alltime'
    todayData:      {}          // cityId → accumulated alert count (today view)
  };

  // ===== UNIFIED COUNT ACCESSORS =====
  // All map-rendering functions call these so switching views is transparent.

  function getCount(city) {
    return state.viewMode === 'today'
      ? (state.todayData[city.id] || 0)
      : Data.getAlertCount(city, state.activeEpisodes);
  }

  function getMaxCount() {
    if (state.viewMode === 'today') {
      const vals = Object.values(state.todayData);
      return vals.length ? Math.max(...vals) : 1;
    }
    return Data.getMaxCount(window.ALERT_DATA.cities, state.activeEpisodes);
  }

  // ===== ENTRY POINT =====
  function init() {
    const data = window.ALERT_DATA;
    if (!data) { console.error('ALERT_DATA not loaded'); return; }

    // Default all-time selection: most recent Iran episode that has data
    const iranOrder  = ['iran_2025', 'iran_oct_2024', 'iran_apr_2024'];
    const defaultEp  = iranOrder.find(ep => data.cities.some(c => (c.episodes[ep] || 0) > 0)) || 'iran_oct_2024';
    state.activeEpisodes.add(defaultEp);

    // ---- Map ----
    map = L.map('map', {
      center: MAP_CENTER, zoom: DEFAULT_ZOOM,
      minZoom: MIN_ZOOM,  maxZoom: MAX_ZOOM,
      zoomControl: false
    });
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    if (state.theme === 'light') document.body.classList.add('light-mode');
    updateThemeIcon();

    tileLayer = L.tileLayer(
      state.theme === 'light' ? TILE_LIGHT : TILE_DARK, TILE_OPTS
    ).addTo(map);

    canvasRenderer = L.canvas({ padding: 0.5 });

    // ---- Layers (built with today data = empty initially) ----
    buildHeatLayer();
    buildMarkerLayer();
    buildFlightPaths();
    buildRegionLabels();

    // ---- UI ----
    UI.buildFilterUI(data.meta.episodes, state.activeEpisodes, handleFilterChange);
    UI.buildLegend();
    UI.buildSearch(data.cities, handleSearchSelect);
    updateStats();
    updateLeaderboard();

    // ---- Events ----
    map.on('zoomend', handleZoomEnd);
    map.on('click', () => {
      if (state.markerClicked) { state.markerClicked = false; }
      else { UI.hideInfoPanel(); }
    });
    handleZoomEnd();

    document.getElementById('info-close').addEventListener('click', e => {
      e.stopPropagation(); UI.hideInfoPanel();
    });
    document.getElementById('theme-toggle').addEventListener('click', handleThemeToggle);
    document.getElementById('btn-sources').addEventListener('click', () => UI.showSourcesModal());
    document.getElementById('modal-close-btn').addEventListener('click', () => UI.hideSourcesModal());
    document.getElementById('sources-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('sources-modal')) UI.hideSourcesModal();
    });
    document.getElementById('chk-paths').addEventListener('change', e => {
      state.showPaths = e.target.checked;
      updateFlightPathsVisibility();
    });
    const lbToggle = document.getElementById('leaderboard-toggle');
    lbToggle.addEventListener('click', () => {
      const body      = document.getElementById('leaderboard-body');
      const collapsed = body.classList.toggle('lb-collapsed');
      lbToggle.classList.toggle('collapsed', collapsed);
      lbToggle.textContent = collapsed ? '▸' : '▾';
    });

    // View tabs
    document.getElementById('tab-today')  .addEventListener('click', () => switchView('today'));
    document.getElementById('tab-alltime').addEventListener('click', () => switchView('alltime'));

    // ---- Initialise in Today mode ----
    Realtime.init(map, data.cities);
    applyViewUI('today');
    startTodayMode();

    // ---- Footer clock ----
    startFooterClock();

    // ---- Visitor counter ----
    _visitorId = 'v' + Math.random().toString(36).slice(2, 10) + Date.now();
    pingVisitors();
    _visitorPingId = setInterval(pingVisitors, 30000);
  }

  // ===== VIEW SWITCHING =====

  function switchView(mode) {
    if (state.viewMode === mode) return;
    state.viewMode = mode;

    if (mode === 'today') {
      stopAllTimeMode();
      applyViewUI('today');
      startTodayMode();
    } else {
      stopTodayMode();
      applyViewUI('alltime');
      startAllTimeMode();
    }
  }

  /** Show/hide the correct panel sections and update tab styling. */
  function applyViewUI(mode) {
    document.getElementById('tab-today')   .classList.toggle('active', mode === 'today');
    document.getElementById('tab-alltime') .classList.toggle('active', mode === 'alltime');
    document.getElementById('today-status').classList.toggle('hidden', mode !== 'today');
    document.getElementById('alltime-filters').classList.toggle('hidden', mode !== 'alltime');

    const lb = document.getElementById('leaderboard-title');
    lb.textContent = mode === 'today' ? '🏆 Today\'s Most Targeted' : '🏆 Most Targeted';
  }

  // ===== TODAY MODE =====

  async function startTodayMode() {
    setTodayMsg('Connecting…', false);
    updateStats();
    updateLeaderboard();

    // Show Iran 2025 flight paths in today mode
    const savedEpisodes = state.activeEpisodes;
    state.activeEpisodes = new Set(['iran_2025']);
    buildFlightPaths();
    state.activeEpisodes = savedEpisodes;

    const ok = await Realtime.toggle(map, onTodayPoll, onNewTodayAlert);
    if (ok) {
      setTodayMsg('Live — polling every 10 s', true);
    } else {
      setTodayMsg('API unavailable — deploy proxy to enable', false);
    }
  }

  function stopTodayMode() {
    Realtime.stop();
    // Keep todayData so it persists if user switches back
  }

  function onTodayPoll(activeCount) {
    if (activeCount > 0) {
      setTodayMsg(`${activeCount} active alert${activeCount === 1 ? '' : 's'} right now`, true);
    } else {
      setTodayMsg('No active alerts right now', true);
    }
    updateStats();
    updateLeaderboard();
  }

  function onNewTodayAlert(city) {
    // Accumulate: each new alert event increments the city's today count
    state.todayData[city.id] = (state.todayData[city.id] || 0) + 1;
    updateLayers();
    updateStats();
    updateLeaderboard();
  }

  function setTodayMsg(msg, isLive) {
    const el = document.getElementById('today-msg');
    const wrap = document.getElementById('today-status');
    if (el)   el.textContent = msg;
    if (wrap) {
      wrap.classList.toggle('ok',   isLive);
      wrap.classList.toggle('idle', !isLive);
    }
  }

  // ===== ALL TIME MODE =====

  function startAllTimeMode() {
    updateLayers();
    updateStats();
    updateLeaderboard();
    buildFlightPaths();
  }

  function stopAllTimeMode() {
    // Nothing to stop — just a static data view
  }

  // ===== THEME =====

  function handleThemeToggle() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mapTheme', state.theme);
    document.body.classList.toggle('light-mode', state.theme === 'light');
    updateThemeIcon();
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(
      state.theme === 'light' ? TILE_LIGHT : TILE_DARK, TILE_OPTS
    ).addTo(map);
    tileLayer.bringToBack();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = state.theme === 'dark' ? '☀' : '🌙';
  }

  // ===== FLIGHT PATHS =====

  function getArcPoints(from, to, arcHeight) {
    const n = 20, pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push([
        from[0] + (to[0] - from[0]) * t + Math.sin(t * Math.PI) * arcHeight,
        from[1] + (to[1] - from[1]) * t
      ]);
    }
    return pts;
  }

  function buildFlightPaths() {
    if (!window.FLIGHT_PATHS) return;
    if (flightPathLayer) { map.removeLayer(flightPathLayer); flightPathLayer = null; }
    flightPathLayer = L.layerGroup();

    const cityById = {};
    window.ALERT_DATA.cities.forEach(c => { cityById[c.id] = c; });

    window.FLIGHT_PATHS.forEach(fp => {
      if (!state.activeEpisodes.has(fp.episode)) return;
      const from = fp.from;
      const launchIcon = L.divIcon({
        className: '',
        html: `<div class="launch-site-icon" style="color:${fp.color}">${fp.label} ✦</div>`,
        iconAnchor: [0, 8]
      });
      L.marker(from, { icon: launchIcon, interactive: false, zIndexOffset: -100 })
        .addTo(flightPathLayer);

      fp.targets.forEach(targetId => {
        const city = cityById[targetId];
        if (!city) return;
        L.polyline(getArcPoints(from, [city.lat, city.lng], fp.arcHeight), {
          color: fp.color, weight: 1.5, opacity: 0.55,
          className: 'flight-arc', interactive: false
        }).addTo(flightPathLayer);
      });
    });

    if (state.showPaths && map.getZoom() <= ZOOM_SHOW_PATHS) {
      flightPathLayer.addTo(map);
    }
  }

  function buildRegionLabels() {
    if (!window.REGION_LABELS) return;
    window.REGION_LABELS.forEach(r => {
      L.marker([r.lat, r.lng], {
        icon: L.divIcon({ className: 'region-label', html: r.label, iconAnchor: [0, 0] }),
        interactive: false, zIndexOffset: -200
      }).addTo(map);
    });
  }

  function updateFlightPathsVisibility() {
    if (!flightPathLayer) return;
    const shouldShow = state.showPaths && map.getZoom() <= ZOOM_SHOW_PATHS;
    if (shouldShow) { if (!map.hasLayer(flightPathLayer)) flightPathLayer.addTo(map); }
    else            { if (map.hasLayer(flightPathLayer))  map.removeLayer(flightPathLayer); }
  }

  // ===== HEAT LAYER =====

  function buildHeatLayer() {
    const { cities } = window.ALERT_DATA;
    const max = getMaxCount();
    const points = cities.reduce((acc, city) => {
      const cnt = getCount(city);
      if (cnt > 0) acc.push([city.lat, city.lng, Math.log1p(cnt) / Math.log1p(Math.max(max, 1))]);
      return acc;
    }, []);

    if (heatLayer) map.removeLayer(heatLayer);
    heatLayer = L.heatLayer(points, {
      radius: 32, blur: 20, maxZoom: MAX_ZOOM, max: 1.0, minOpacity: 0.3,
      gradient: { 0.0: '#313695', 0.25: '#4575b4', 0.5: '#abd9e9', 0.625: '#fee090', 0.75: '#f46d43', 1.0: '#d73027' }
    }).addTo(map);
    if (heatLayer._canvas) heatLayer._canvas.style.pointerEvents = 'none';
  }

  // ===== MARKER LAYER =====

  function buildMarkerLayer() {
    const { cities } = window.ALERT_DATA;
    const max = getMaxCount();

    if (markerLayer) map.removeLayer(markerLayer);
    markerLayer = L.layerGroup();
    cityEntries = [];

    cities.forEach(city => {
      const count      = getCount(city);
      const normalized = count > 0 ? Math.log1p(count) / Math.log1p(Math.max(max, 1)) : 0;
      const radius     = count > 0 ? Math.min(4 + Math.sqrt(count) * 1.2, 40) : 0;

      const marker = L.circleMarker([city.lat, city.lng], {
        renderer: canvasRenderer, radius,
        fillColor: Data.getColor(normalized),
        color: 'rgba(255,255,255,0.5)', weight: 1,
        opacity: count > 0 ? 0.9 : 0, fillOpacity: count > 0 ? 0.8 : 0,
        interactive: count > 0
      });

      if (count > 0) {
        marker.bindTooltip(UI.buildTooltip(city, count), { sticky: true, direction: 'top', offset: [0, -4] });
        marker.on('click', e => {
          state.markerClicked = true;
          L.DomEvent.stopPropagation(e.originalEvent);
          UI.showInfoPanel(city, getCount(city));
        });
        markerLayer.addLayer(marker);
      }

      cityEntries.push({ city, marker });
    });

    if (map && map.getZoom() >= ZOOM_SHOW_MARKERS) markerLayer.addTo(map);
  }

  // ===== LAYER UPDATE =====

  function updateLayers() {
    const { cities } = window.ALERT_DATA;
    const max = getMaxCount();

    // Heatmap
    const points = cities.reduce((acc, city) => {
      const cnt = getCount(city);
      if (cnt > 0) acc.push([city.lat, city.lng, Math.log1p(cnt) / Math.log1p(Math.max(max, 1))]);
      return acc;
    }, []);
    heatLayer.setLatLngs(points);

    // Markers
    markerLayer.clearLayers();
    cityEntries.forEach(({ city, marker }) => {
      const count = getCount(city);
      if (count === 0) {
        marker.setStyle({ opacity: 0, fillOpacity: 0, interactive: false });
        return;
      }
      const normalized = Math.log1p(count) / Math.log1p(Math.max(max, 1));
      marker.setRadius(Math.min(4 + Math.sqrt(count) * 1.2, 40));
      marker.setStyle({
        fillColor: Data.getColor(normalized),
        color: 'rgba(255,255,255,0.5)', weight: 1,
        opacity: 0.9, fillOpacity: 0.8,
        interactive: true   // restore after filter/view change
      });
      marker.bindTooltip(UI.buildTooltip(city, count), { sticky: true, direction: 'top', offset: [0, -4] });
      marker.off('click');
      marker.on('click', e => {
        state.markerClicked = true;
        L.DomEvent.stopPropagation(e.originalEvent);
        UI.showInfoPanel(city, getCount(city));
      });
      markerLayer.addLayer(marker);
    });

    const z = map.getZoom();
    if (z >= ZOOM_SHOW_MARKERS) { if (!map.hasLayer(markerLayer)) markerLayer.addTo(map); }
    else                        { if (map.hasLayer(markerLayer))  map.removeLayer(markerLayer); }
  }

  // ===== STATS BAR =====

  function updateStats() {
    const { cities, meta } = window.ALERT_DATA;
    let totalAlerts = 0, citiesCount = 0;

    cities.forEach(city => {
      const cnt = getCount(city);
      if (cnt > 0) { totalAlerts += cnt; citiesCount++; }
    });

    let label;
    if (state.viewMode === 'today') {
      const total = Object.keys(state.todayData).length;
      label = total > 0 ? 'Today (since page load)' : 'Today — waiting for data';
    } else {
      const eps = state.activeEpisodes;
      if (eps.size === 0) label = 'No episodes selected';
      else if (eps.size === Object.keys(meta.episodes).length) label = 'All episodes combined';
      else label = 'Showing: ' + [...eps].map(ep => meta.episodes[ep]?.label || ep).join(', ');
    }

    UI.updateStats(totalAlerts, citiesCount, state.activeEpisodes, meta.episodes, label);
  }

  // ===== LEADERBOARD =====

  function updateLeaderboard() {
    const { cities } = window.ALERT_DATA;
    const overrides = state.viewMode === 'today' ? state.todayData : null;
    UI.updateLeaderboard(cities, state.activeEpisodes, overrides);
  }

  // ===== SEARCH =====

  function handleSearchSelect(city) {
    map.setView([city.lat, city.lng], 12);
    UI.showInfoPanel(city, getCount(city));
  }

  // ===== ZOOM HANDLING =====

  function handleZoomEnd() {
    const z      = map.getZoom();
    const radius = Math.max(14, 60 - z * 5);
    const blur   = Math.max(7,  45 - z * 4);
    const minOp  = z >= ZOOM_FADE_HEAT ? 0.06 : 0.3;
    heatLayer.setOptions({ radius, blur, minOpacity: minOp });

    if (z >= ZOOM_SHOW_MARKERS) { if (!map.hasLayer(markerLayer)) markerLayer.addTo(map); }
    else                        { if (map.hasLayer(markerLayer))  map.removeLayer(markerLayer); }
    updateFlightPathsVisibility();
  }

  // ===== FILTER CHANGE (All-time mode) =====

  function handleFilterChange(newActiveEpisodes) {
    state.activeEpisodes = newActiveEpisodes;
    if (state.viewMode === 'alltime') {
      updateLayers();
      updateStats();
      updateLeaderboard();
      buildFlightPaths();
    }
    UI.hideInfoPanel();
  }

  // ===== FOOTER CLOCK (Israel time) =====

  function startFooterClock() {
    function tick() {
      const el = document.getElementById('footer-time');
      if (!el) return;
      el.textContent = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jerusalem', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }) + ' IST';
    }
    tick();
    _footerClockId = setInterval(tick, 1000);
  }

  // ===== VISITOR COUNT =====

  async function pingVisitors() {
    if (!VISITOR_URL) return;
    try {
      const res  = await fetch(`${VISITOR_URL}?id=${_visitorId}`, { cache: 'no-store' });
      const json = await res.json();
      const el   = document.getElementById('visitors-count');
      if (el && typeof json.count === 'number') el.textContent = json.count;
    } catch (_) { /* silent — no visitor URL configured yet */ }
  }

  // ===== BOOT =====
  document.addEventListener('DOMContentLoaded', init);

})();
