import fs from 'fs';
import { LOADER_CSS, LOADER_INNER_HTML, LOADER_ROUTES } from '../src/components/shared/loaderShared.js';

let html = fs.readFileSync('index.html', 'utf-8');

const routesVal = JSON.stringify(LOADER_ROUTES);
html = html.replace(/var allowedRoutes = .*?;/, `var allowedRoutes = ${routesVal};`);
html = html.replace(
  /<style id="critical-loader-css">[\s\S]*?<\/style>/,
  `<style id="critical-loader-css">${LOADER_CSS}</style>`
);
html = html.replace(
  /<div id="app-loader"[^>]*>[\s\S]*?<\/div>\s*(?=<a href="#main-content")/,
  `<div id="app-loader" role="status" aria-label="Loading">${LOADER_INNER_HTML}</div>\n    `
);

fs.writeFileSync('index.html', html, 'utf-8');
console.log('index.html synced successfully');
