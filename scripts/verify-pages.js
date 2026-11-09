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

const port = 4186;

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: path.join(__dirname, '..', '.chrome-test-' + Date.now()),
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const routes = ['/', '/about', '/projects', '/contact', '/experience', '/404'];

  for (const r of routes) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(`http://localhost:${port}${r}`, { waitUntil: 'networkidle0', timeout: 15000 });
    // dismiss loader
    await page.evaluate(() => {
      sessionStorage.setItem('portfolio_loaded', 'true');
      const loader = document.querySelector('[aria-hidden="true"]');
      if (loader && loader.classList.contains('fixed')) loader.remove();
    });
    await new Promise(res => setTimeout(res, 800));

    const title = await page.title();
    const text = await page.evaluate(() => document.body.innerText);

    console.log(`\n================================`);
    console.log(`Route: ${r}`);
    console.log(`Title: ${title}`);
    console.log(`Errors count: ${errors.length}`);
    if (errors.length) console.log(`Errors:`, errors);
    console.log(`Rendered text length: ${text.length}`);
    console.log(`First 120 chars: ${text.substring(0, 120).replace(/\n+/g, ' ')}`);
    console.log(`Includes Web Development: ${text.includes('Web Development')}`);
    console.log(`Includes Cybersecurity: ${text.includes('Cybersecurity')}`);
    await page.close();
  }

  await browser.close();
  server.close(() => {
    console.log('\nAll route tests complete.');
    process.exit(0);
  });
});

