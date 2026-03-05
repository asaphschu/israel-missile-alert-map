// data/borders.js
// Simplified GeoJSON outline of Israel for map overlay
// Coordinates are approximate (combines 1949 Green Line + de facto borders)
// Note: borders are approximate and for reference only

window.ISRAEL_BORDER = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'Israel (approximate outline)' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        // [longitude, latitude] — going clockwise from north coast
        // Northern coast / Lebanon border
        [35.102, 33.092],
        [35.155, 33.115],
        [35.185, 33.105],
        [35.300, 33.140],
        [35.410, 33.178],
        [35.475, 33.218],
        // Northeast / Golan foothills
        [35.580, 33.272],
        [35.625, 33.160],
        [35.660, 32.975],
        // Jordan Valley going south
        [35.660, 32.680],
        [35.615, 32.510],
        [35.577, 32.330],
        [35.543, 32.100],
        [35.530, 31.895],
        // Dead Sea area
        [35.500, 31.775],
        [35.460, 31.490],
        // Arava valley south toward Eilat
        [35.400, 31.210],
        [35.240, 30.800],
        [35.090, 30.420],
        [34.975, 30.080],
        // Eilat — southernmost tip
        [34.975, 29.558],
        // Egypt / Sinai border (northwest line)
        [34.830, 29.590],
        [34.615, 29.705],
        [34.420, 29.855],
        [34.330, 30.055],
        [34.262, 30.430],
        [34.255, 30.905],
        [34.252, 31.225],
        // Gaza coastal junction / Mediterranean
        [34.302, 31.292],
        [34.365, 31.410],
        [34.495, 31.665],
        [34.575, 31.730],
        [34.685, 31.920],
        [34.752, 32.048],
        [34.822, 32.155],
        [34.872, 32.325],
        [34.918, 32.468],
        [34.942, 32.592],
        [34.972, 32.708],
        [34.993, 32.824],
        [35.022, 32.942],
        [35.053, 33.018],
        // Back to Rosh HaNikra
        [35.102, 33.092]
      ]]
    }
  }]
};
