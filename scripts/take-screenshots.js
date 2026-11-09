import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.bin': 'application/octet-stream',
  '.gltf': 'model/gltf+json',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const port = 4180;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  let browser;
  try {
    const userDataDir = path.join(__dirname, '..', '.chrome-user-data-' + Date.now());
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      userDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();

    const viewports = [
      { name: 'homepage-1440.png', width: 1440, height: 900, path: '/' },
      { name: 'homepage-768.png', width: 768, height: 1024, path: '/' },
      { name: 'homepage-375.png', width: 375, height: 812, path: '/' },
      { name: 'about-1440.png', width: 1440, height: 900, path: '/about' },
      { name: 'projects-1440.png', width: 1440, height: 900, path: '/projects' },
      { name: 'contact-1440.png', width: 1440, height: 900, path: '/contact' },
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const targetUrl = `http://localhost:${port}${vp.path}`;
      console.log(`Navigating to ${targetUrl} (${vp.width}x${vp.height})...`);
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 15000 });
      // Bypass session loader so actual content is captured
      await page.evaluate(() => {
        sessionStorage.setItem('portfolio_loaded', 'true');
        const loader = document.querySelector('[aria-hidden="true"]');
        if (loader && loader.classList.contains('fixed')) {
          loader.remove();
        }
      });
      await new Promise(r => setTimeout(r, 2000));
      const file = path.join(outDir, vp.name);
      await page.screenshot({ path: file, fullPage: false });
      console.log(`Saved screenshot: ${file}`);
    }

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Puppeteer capture error:', err);
  } finally {
    if (browser) await browser.close();
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }
});
