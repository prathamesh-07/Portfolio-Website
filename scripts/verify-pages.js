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
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
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

const port = 4190;

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: path.join(__dirname, '..', '.chrome-test-' + Date.now()),
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const routes = ['/', '/about', '/projects', '/contact', '/404'];

  for (const r of routes) {
    const page = await browser.newPage();
    const errors = [];
    const failedRequests = [];

    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => failedRequests.push(`${req.url()} (${req.failure()?.errorText})`));

    await page.goto(`http://localhost:${port}${r}`, { waitUntil: 'networkidle0', timeout: 15000 });

    // Inspect logos on page
    const logoReport = await page.evaluate(() => {
      const pictures = Array.from(document.querySelectorAll('picture'));
      return pictures.map(p => {
        const img = p.querySelector('img');
        const webpSource = p.querySelector('source[type="image/webp"]');
        return {
          alt: img?.getAttribute('alt'),
          ariaHidden: img?.getAttribute('aria-hidden'),
          width: img?.getAttribute('width'),
          height: img?.getAttribute('height'),
          src: img?.getAttribute('src'),
          hasWebpSource: !!webpSource,
        };
      });
    });

    const title = await page.title();
    const text = await page.evaluate(() => document.body.innerText);

    console.log(`\n================================`);
    console.log(`Route: ${r}`);
    console.log(`Title: ${title}`);
    console.log(`Errors count: ${errors.length}`);
    if (errors.length) console.log(`Errors:`, errors);
    console.log(`Failed network requests: ${failedRequests.length}`);
    if (failedRequests.length) console.log(`Failed:`, failedRequests);
    console.log(`Logos rendered count: ${logoReport.length}`);
    console.log(`Sample logo:`, logoReport[0]);
    console.log(`Includes Web Development: ${text.includes('Web Development')}`);
    console.log(`Includes Cybersecurity: ${text.includes('Cybersecurity')}`);
    await page.close();
  }

  await browser.close();
  server.close(() => {
    console.log('\nAll brand and route verifications complete.');
    process.exit(0);
  });
});
