// data/flightpaths.js
// Launch site data and missile/drone trajectory targets for the Middle East view.
// Targets reference city IDs from ALERT_DATA.cities.
// Paths are rendered as curved arcs at low zoom levels only.

window.FLIGHT_PATHS = [
  {
    episode:    'iran_2025',
    label:      'Iran',
    from:       [33.5, 50.0],     // Central Iran (approx. between Isfahan and Arak)
    color:      '#e67e22',
    arcHeight:  3.5,              // degrees of lat offset at arc peak
    targets:    ['tel-aviv-center', 'tel-aviv-north', 'tel-aviv-east', 'tel-aviv-south',
                 'jerusalem', 'haifa', 'beer-sheva', 'ashdod', 'petah-tikva', 'bnei-brak']
  },
  {
    episode:    'iran_oct_2024',
    label:      'Iran',
    from:       [33.5, 50.0],
    color:      '#e74c3c',
    arcHeight:  3.5,
    targets:    ['tel-aviv-center', 'jerusalem', 'haifa', 'beer-sheva', 'eilat', 'ashdod']
  },
  {
    episode:    'iran_apr_2024',
    label:      'Iran',
    from:       [33.5, 50.0],
    color:      '#c0392b',
    arcHeight:  3.5,
    targets:    ['tel-aviv-center', 'beer-sheva', 'eilat', 'haifa', 'ashdod']
  },
  {
    episode:    'lebanon',
    label:      'Lebanon',
    from:       [33.15, 35.50],   // South Lebanon / Hezbollah territory
    color:      '#8e44ad',
    arcHeight:  0.4,
    targets:    ['kiryat-shmona', 'metula', 'nahariya', 'haifa', 'tiberias', 'safed', 'akko']
  },
  {
    episode:    'gaza',
    label:      'Gaza',
    from:       [31.35, 34.35],   // Central Gaza Strip
    color:      '#27ae60',
    arcHeight:  0.3,
    targets:    ['sderot', 'ashkelon', 'ashdod', 'netivot', 'beer-sheva', 'kiryat-malachi', 'kiryat-gat']
  },
  {
    episode:    'houthis',
    label:      'Yemen',
    from:       [14.5, 44.0],     // Near Sanaa, Yemen
    color:      '#f39c12',
    arcHeight:  5.5,              // Large arc — long-distance ballistic / cruise trajectory
    targets:    ['eilat', 'lod', 'ramle', 'herzliya', 'tel-aviv-center', 'ashdod', 'ashkelon']
  }
];

// Additional labeled locations for Middle East context
// (not launch sites — shown as informational markers)
window.REGION_LABELS = [
  { label: '🇨🇾 Cyprus',    lat: 34.85, lng: 33.00 },
  { label: '🇪🇬 Egypt',     lat: 27.00, lng: 31.00 },
  { label: '🇸🇦 Saudi Arabia', lat: 24.5, lng: 45.0 },
  { label: '🇮🇶 Iraq',      lat: 33.00, lng: 43.50 },
  { label: '🇯🇴 Jordan',    lat: 31.00, lng: 37.00 },
  { label: '🇸🇾 Syria',     lat: 34.00, lng: 38.00 },
  { label: '🇱🇧 Lebanon',   lat: 33.90, lng: 35.85 },
  { label: '🇾🇪 Yemen',     lat: 16.50, lng: 48.00 },
  { label: '🇮🇷 Iran',      lat: 32.00, lng: 53.00 }
];
