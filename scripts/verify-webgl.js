import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.bin': 'application/octet-stream',
  '.gltf': 'model/gltf+json',
};

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let fp = path.join(distDir, p);
  if (!fs.existsSync(fp)) fp = path.join(distDir, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(fp));
});

const port = 4192;

server.listen(port, async () => {
  console.log(`WebGL test server running on port ${port}`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: path.join(__dirname, '..', '.chrome-webgl-' + Date.now()),
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const warnings = [];
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'warning') warnings.push(msg.text());
    if (msg.type() === 'error') errors.push(msg.text());
  });

  page.on('pageerror', err => errors.push(err.message));

  console.log('Navigating to homepage and scrolling through all 3D sections...');
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0', timeout: 20000 });

  await page.evaluate(() => {
    sessionStorage.setItem('portfolio_loaded', 'true');
    const loader = document.querySelector('[aria-hidden="true"]');
    if (loader && loader.classList.contains('fixed')) loader.remove();
  });

  // Scroll to Tech section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to Works / Projects
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to Contact & Stars
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1500));

  console.log('\n--- WEBGL CONSOLE REPORT ---');
  const nanWarnings = warnings.filter(w => w.includes('computeBoundingSphere') || w.includes('NaN'));
  console.log('NaN / computeBoundingSphere warnings found:', nanWarnings.length);
  if (nanWarnings.length) console.log(nanWarnings);

  const contextLostErrors = errors.filter(e => e.includes('Context Lost') || e.includes('WebGLRenderer'));
  console.log('WebGL Context Lost errors found:', contextLostErrors.length);
  if (contextLostErrors.length) console.log(contextLostErrors);

  console.log('Total console errors:', errors.length);
  if (errors.length) console.log(errors);

  await browser.close();
  server.close(() => {
    console.log('Verification finished.');
    process.exit(0);
  });
});
