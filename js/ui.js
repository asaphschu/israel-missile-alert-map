// js/ui.js
// UI helpers: filter panel, legend, tooltips, info panel, stats bar,
//             search autocomplete, leaderboard, sources modal

const UI = {

  // ===== FILTER PANEL =====

  /**
   * Builds episode checkbox rows in #episode-checkboxes.
   * @param {object}   episodes       - meta.episodes from ALERT_DATA
   * @param {Set}      activeEpisodes - initially selected episode keys
   * @param {Function} onFilterChange - callback(newActiveSet)
   */
  buildFilterUI(episodes, activeEpisodes, onFilterChange) {
    const container = document.getElementById('episode-checkboxes');
    container.innerHTML = '';

    Object.entries(episodes).forEach(([key, ep]) => {
      const totalCount = window.ALERT_DATA.cities.reduce(
        (sum, c) => sum + (c.episodes[key] || 0), 0
      );

      const item = document.createElement('label');
      item.className = 'episode-item';
      item.title = ep.desc + (ep.date ? `\n${ep.date}` : '');

      const cb = document.createElement('input');
      cb.type    = 'checkbox';
      cb.value   = key;
      cb.checked = activeEpisodes.has(key);

      const dot = document.createElement('span');
      dot.className    = 'episode-dot';
      dot.style.background = ep.color;

      const labelEl = document.createElement('span');
      labelEl.className   = 'episode-label';
      labelEl.textContent = ep.label;

      const countEl = document.createElement('span');
      countEl.className   = 'episode-count';
      countEl.textContent = totalCount > 0 ? totalCount.toLocaleString() : '—';

      item.appendChild(cb);
      item.appendChild(dot);
      item.appendChild(labelEl);
      item.appendChild(countEl);
      container.appendChild(item);
    });

    // Delegate to a single change listener
    container.addEventListener('change', () => {
      const active = new Set(
        [...container.querySelectorAll('input[type="checkbox"]:checked')].map(el => el.value)
      );
      onFilterChange(active);
    });

    document.getElementById('btn-select-all').addEventListener('click', () => {
      container.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = true; });
      onFilterChange(new Set(Object.keys(episodes)));
    });

    document.getElementById('btn-clear-all').addEventListener('click', () => {
      container.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
      onFilterChange(new Set());
    });
  },

  // ===== LEGEND =====

  buildLegend() {
    const svg   = document.getElementById('legend-circles');
    const sizes = [
      { count: 10,   label: '10' },
      { count: 100,  label: '100' },
      { count: 500,  label: '500' },
      { count: 1500, label: '1500+' }
    ];

    const radii   = sizes.map(s => Math.min(4 + Math.sqrt(s.count) * 1.2, 40));
    const maxR    = Math.max(...radii);
    const padding = 6;
    let x = maxR + padding;

    sizes.forEach(({ label }, i) => {
      const r  = radii[i];
      const cy = maxR + 2;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r',  r);
      circle.setAttribute('fill',         'rgba(255,255,255,0.12)');
      circle.setAttribute('stroke',       'rgba(200,200,220,0.5)');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x',            x);
      text.setAttribute('y',            maxR * 2 + 12);
      text.setAttribute('text-anchor',  'middle');
      text.setAttribute('fill',         '#7986cb');
      text.setAttribute('font-size',    '9');
      text.textContent = label;
      svg.appendChild(text);

      x += maxR + r + padding;
    });

    const totalWidth  = x + padding;
    const totalHeight = maxR * 2 + 20;
    svg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
    svg.setAttribute('width',  totalWidth);
    svg.setAttribute('height', totalHeight);
  },

  // ===== SEARCH =====

  /**
   * Wires up the city search autocomplete.
   * @param {Array}    cities   - all city objects
   * @param {Function} onSelect - callback(city) when a city is chosen
   */
  buildSearch(cities, onSelect) {
    const input   = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    let highlighted = -1;
    let currentMatches = [];

    function showResults(matches) {
      currentMatches = matches;
      highlighted    = -1;
      results.innerHTML = '';

      if (!matches.length) { results.classList.add('hidden'); return; }

      matches.forEach((city, idx) => {
        const li = document.createElement('li');
        li.dataset.idx = idx;

        const nameEl = document.createElement('span');
        nameEl.className   = 'sr-name';
        nameEl.textContent = city.nameEn;

        const regEl = document.createElement('span');
        regEl.className   = 'sr-region';
        regEl.textContent = city.region;

        li.appendChild(nameEl);

        if (city.nameHe) {
          const heEl = document.createElement('span');
          heEl.className   = 'sr-he';
          heEl.textContent = city.nameHe;
          li.appendChild(heEl);
        }

        li.appendChild(regEl);

        li.addEventListener('mousedown', e => {
          e.preventDefault();
          pick(city);
        });

        results.appendChild(li);
      });

      results.classList.remove('hidden');
    }

    function pick(city) {
      input.value = '';
      results.classList.add('hidden');
      highlighted    = -1;
      currentMatches = [];
      onSelect(city);
    }

    function applyHighlight() {
      [...results.querySelectorAll('li')].forEach((li, i) => {
        li.classList.toggle('highlighted', i === highlighted);
      });
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.classList.add('hidden'); currentMatches = []; return; }

      const matches = cities
        .filter(c =>
          c.nameEn.toLowerCase().includes(q) ||
          (c.nameHe && c.nameHe.includes(q))
        )
        .slice(0, 8);

      showResults(matches);
    });

    input.addEventListener('keydown', e => {
      const lis = [...results.querySelectorAll('li')];
      if (!lis.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlighted = Math.min(highlighted + 1, lis.length - 1);
        applyHighlight();

      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlighted = Math.max(highlighted - 1, -1);
        applyHighlight();

      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlighted >= 0 && currentMatches[highlighted]) {
          pick(currentMatches[highlighted]);
        }

      } else if (e.key === 'Escape') {
        input.value = '';
        results.classList.add('hidden');
        highlighted    = -1;
        currentMatches = [];
      }
    });

    // Hide dropdown on blur (small delay lets mousedown fire first)
    input.addEventListener('blur', () => {
      setTimeout(() => results.classList.add('hidden'), 160);
    });

    // Re-show dropdown on refocus if query still present
    input.addEventListener('focus', () => {
      if (input.value.trim()) input.dispatchEvent(new Event('input'));
    });
  },

  // ===== LEADERBOARD =====

  /**
   * Renders top-10 most targeted cities in #leaderboard-body.
   * @param {Array}  cities         - all city objects
   * @param {Set}    activeEpisodes - currently selected episodes (used when overrideCounts is null)
   * @param {object} overrideCounts - optional {cityId: count} map; used in Today mode
   */
  updateLeaderboard(cities, activeEpisodes, overrideCounts) {
    const body = document.getElementById('leaderboard-body');
    if (!body) return;

    const getCount = overrideCounts
      ? city => overrideCounts[city.id] || 0
      : city => Data.getAlertCount(city, activeEpisodes);

    const ranked = cities
      .map(city => ({ city, count: getCount(city) }))
      .filter(({ count }) => count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    if (!ranked.length) {
      body.innerHTML = '<div style="color:var(--text-dim);font-size:11px;padding:4px 2px">No data for selected filter</div>';
      return;
    }

    const maxCount = ranked[0].count;
    body.innerHTML = ranked.map(({ city, count }, idx) => {
      const barPct = Math.round((count / maxCount) * 100);
      return `
        <div class="lb-row">
          <span class="lb-rank">${idx + 1}</span>
          <div class="lb-info">
            <div class="lb-name" title="${city.nameEn}">${city.nameEn}</div>
            <div class="lb-bar-wrap">
              <div class="lb-bar-fill" style="width:${barPct}%"></div>
            </div>
          </div>
          <span class="lb-count">${count.toLocaleString()}</span>
        </div>`;
    }).join('');
  },

  // ===== SOURCES MODAL =====

  showSourcesModal() {
    document.getElementById('sources-modal').classList.remove('hidden');
  },

  hideSourcesModal() {
    document.getElementById('sources-modal').classList.add('hidden');
  },

  // ===== TOOLTIP =====

  buildTooltip(city, count) {
    const heStr = city.nameHe
      ? `<span class="tt-he">${city.nameHe}</span>`
      : '';
    return (
      `<span class="tt-name">${city.nameEn}</span>` +
      heStr +
      `<span class="tt-count">${count.toLocaleString()} alerts</span>` +
      `<span class="tt-region">${city.region}</span>`
    );
  },

  // ===== INFO PANEL =====

  showInfoPanel(city, activeCount) {
    const meta = window.ALERT_DATA.meta;

    let episodeRows = '';
    Object.entries(meta.episodes).forEach(([key, ep]) => {
      const cnt = city.episodes[key] || 0;
      if (cnt === 0) return;
      episodeRows += `
        <div class="info-episode-row">
          <span class="info-episode-dot" style="background:${ep.color}"></span>
          <span class="info-episode-label">${ep.label}</span>
          <span class="info-episode-count">${cnt.toLocaleString()}</span>
        </div>`;
    });

    if (!episodeRows) {
      episodeRows = '<div style="color:#5c6880;font-size:12px">No alerts recorded</div>';
    }

    const heStr = city.nameHe
      ? `<div class="info-city-he">${city.nameHe}</div>`
      : '';

    const metaLines = [];
    if (city.firstAlert) metaLines.push(`First alert: ${city.firstAlert}`);
    if (city.lastAlert)  metaLines.push(`Last alert: ${city.lastAlert}`);
    metaLines.push(`Region: ${city.region}`);

    document.getElementById('info-content').innerHTML = `
      <div class="info-city-name">${city.nameEn}</div>
      ${heStr}
      <div class="info-total">${activeCount.toLocaleString()}</div>
      <div class="info-total-label">alerts (active filter)</div>
      <div class="info-section-title">By Episode</div>
      ${episodeRows}
      <div class="info-meta">${metaLines.join('<br>')}</div>`;

    document.getElementById('info-panel').classList.remove('hidden');
  },

  hideInfoPanel() {
    document.getElementById('info-panel').classList.add('hidden');
  },

  // ===== STATS BAR =====

  /**
   * @param {number} totalAlerts
   * @param {number} citiesCount
   * @param {Set}    activeEpisodes
   * @param {object} episodeMeta
   * @param {string} [overrideLabel] - if provided, used as-is instead of computing from episodes
   */
  updateStats(totalAlerts, citiesCount, activeEpisodes, episodeMeta, overrideLabel) {
    document.getElementById('total-alerts').textContent = totalAlerts.toLocaleString();
    document.getElementById('total-cities').textContent = citiesCount.toLocaleString();

    let label = overrideLabel;
    if (!label) {
      if (activeEpisodes.size === 0) {
        label = 'No episodes selected';
      } else if (activeEpisodes.size === Object.keys(episodeMeta).length) {
        label = 'All episodes combined';
      } else {
        label = 'Showing: ' + [...activeEpisodes]
          .map(ep => episodeMeta[ep] ? episodeMeta[ep].label : ep)
          .join(', ');
      }
    }

    document.getElementById('active-filter-label').textContent = label;
  }

};
