/**
 * scripts/capture-screenshots.mjs
 * Automated screenshot capture pipeline for README & docs.
 * Run with: npm run screenshots
 */

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
const docsAssetsDir = path.join(rootDir, 'docs/assets');

if (!fs.existsSync(docsAssetsDir)) {
  fs.mkdirSync(docsAssetsDir, { recursive: true });
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
};

// Start local static server on port 4199
const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let fp = path.join(distDir, p);
  if (!fs.existsSync(fp)) fp = path.join(distDir, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(fp));
});

const PORT = 4199;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist/ directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  if (!chromePath) {
    console.error('Error: Google Chrome executable not found. Set CHROME_PATH environment variable.');
    process.exit(1);
  }

  server.listen(PORT, async () => {
    console.log(`Preview server running at http://localhost:${PORT}`);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-profile-'));

    try {
      const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: 'new',
        userDataDir: tmpDir,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--no-first-run',
          '--no-default-browser-check',
          '--disable-background-networking',
        ],
      });

      const pages = [
        { name: 'screenshot-home', url: `http://localhost:${PORT}/`, width: 1440, height: 900 },
        { name: 'screenshot-about', url: `http://localhost:${PORT}/about`, width: 1440, height: 900 },
        { name: 'screenshot-projects', url: `http://localhost:${PORT}/projects`, width: 1440, height: 900 },
        { name: 'screenshot-contact', url: `http://localhost:${PORT}/contact`, width: 1440, height: 900 },
        { name: 'screenshot-mobile-home', url: `http://localhost:${PORT}/`, width: 390, height: 844, isMobile: true },
      ];

      for (const p of pages) {
        console.log(`Capturing ${p.name} (${p.width}x${p.height})...`);
        const page = await browser.newPage();
        await page.setViewport({ width: p.width, height: p.height, deviceScaleFactor: 2 });
        await page.goto(p.url, { waitUntil: 'networkidle0' });

        // Wait for loader to fade out
        await page.waitForTimeout ? page.waitForTimeout(1400) : new Promise(r => setTimeout(r, 1400));

        // Disable heavy CSS animations
        await page.addStyleTag({
          content: '* { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }',
        });

        const rawBuf = await page.screenshot({ type: 'png' });
        await page.close();

        // Post-process with sharp: 16px rounded corners + 1px #1E212E border
        const meta = await sharp(rawBuf).metadata();
        const targetW = Math.min(meta.width, 1200);
        const targetH = Math.round((meta.height / meta.width) * targetW);

        const roundedMaskSvg = Buffer.from(`
          <svg width="${targetW}" height="${targetH}">
            <rect x="0" y="0" width="${targetW}" height="${targetH}" rx="16" ry="16" fill="#fff" />
          </svg>
        `);
        const borderSvg = Buffer.from(`
          <svg width="${targetW}" height="${targetH}">
            <rect x="0.5" y="0.5" width="${targetW - 1}" height="${targetH - 1}" rx="16" ry="16" fill="none" stroke="#1E212E" stroke-width="1"/>
          </svg>
        `);

        const roundedBuf = await sharp(rawBuf)
          .resize(targetW, targetH, { fit: 'cover' })
          .composite([{ input: roundedMaskSvg, blend: 'dest-in' }])
          .toBuffer();

        const finalWithBorder = await sharp(roundedBuf)
          .composite([{ input: borderSvg }])
          .toBuffer();

        await sharp(finalWithBorder)
          .png({ quality: 90 })
          .toFile(path.join(docsAssetsDir, `${p.name}.png`));

        await sharp(finalWithBorder)
          .webp({ quality: 85 })
          .toFile(path.join(docsAssetsDir, `${p.name}.webp`));

        console.log(`Saved ${p.name}.png & .webp in docs/assets/`);
      }

      await browser.close();
      console.log('All screenshots captured and processed successfully.');
    } catch (err) {
      console.error('Screenshot capture error:', err.message);
    } finally {
      server.close();
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    }
  });
}

main();

