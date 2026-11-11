import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outDir = path.join(rootDir, 'public/assets/screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
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

const PORT = 4477;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

server.listen(PORT, async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-compare-'));
  try {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      pipe: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-default-browser-check',
        `--user-data-dir=${tmpDir}`,
      ],
    });

    const shots = [
      { name: 'desktop-3d-1440', url: `http://localhost:${PORT}/?home=3d`, width: 1440, height: 900, isMobile: false, hasTouch: false, wait: 3500 },
      { name: 'desktop-3d-1920', url: `http://localhost:${PORT}/?home=3d`, width: 1920, height: 1080, isMobile: false, hasTouch: false, wait: 3500 },
      { name: 'lite-mobile-320', url: `http://localhost:${PORT}/`, width: 320, height: 640, isMobile: true, hasTouch: true, wait: 1200 },
      { name: 'lite-mobile-375', url: `http://localhost:${PORT}/`, width: 375, height: 812, isMobile: true, hasTouch: true, wait: 1200 },
      { name: 'lite-tablet-768', url: `http://localhost:${PORT}/`, width: 768, height: 1024, isMobile: true, hasTouch: true, wait: 1200 },
    ];

    for (const s of shots) {
      console.log(`Capturing ${s.name} (${s.width}x${s.height})...`);
      const page = await browser.newPage();
      await page.setViewport({ width: s.width, height: s.height, isMobile: s.isMobile, hasTouch: s.hasTouch });
      await page.goto(s.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, s.wait));

      const raw = await page.screenshot({ type: 'png' });
      await sharp(raw)
        .png({ quality: 90 })
        .toFile(path.join(outDir, `${s.name}.png`));

      await page.close();
      console.log(`Saved ${s.name}.png`);
    }

    await browser.close();
    console.log('✅ All variant comparison screenshots captured successfully.');
  } catch (err) {
    console.error('Capture Error:', err);
  } finally {
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
  }
});

