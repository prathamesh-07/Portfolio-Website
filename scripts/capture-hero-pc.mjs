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
const heroAssetsDir = path.join(rootDir, 'src/assets/hero');

if (!fs.existsSync(heroAssetsDir)) {
  fs.mkdirSync(heroAssetsDir, { recursive: true });
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

const PORT = 4399;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

server.listen(PORT, async () => {
  console.log(`Capture server running at http://localhost:${PORT}`);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'capture-hero-'));

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

    const page = await browser.newPage();
    // 2x device scale factor for ultra crisp capture
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    await page.goto(`http://localhost:${PORT}/?capture=true&home=3d`, { waitUntil: 'networkidle0', timeout: 60000 });

    // Allow 3D canvas and lights to fully settle
    await new Promise(r => setTimeout(r, 3500));

    // Hide everything except the 3D canvas
    await page.evaluate(() => {
      const heroText = document.querySelector('.accent-gradient')?.closest('.absolute');
      if (heroText) heroText.style.display = 'none';
      const nav = document.querySelector('nav');
      if (nav) nav.style.display = 'none';
      const loader = document.querySelector('.canvas-loader')?.parentElement;
      if (loader) loader.style.display = 'none';
    });

    // Locate the 3D Canvas element
    const canvasHandle = await page.$('canvas');
    if (!canvasHandle) {
      throw new Error('Canvas element not found in DOM');
    }

    console.log('Capturing canvas screenshot...');
    const rawBuffer = await canvasHandle.screenshot({
      type: 'png',
      omitBackground: true, // Transparent background!
    });

    await browser.close();

    console.log('Post-processing raw canvas capture with sharp...');
    // Trim empty transparent pixels around the 3D PC model
    const trimmed = await sharp(rawBuffer)
      .trim()
      .toBuffer();

    const meta = await sharp(trimmed).metadata();
    console.log(`Trimmed PC visual size: ${meta.width}x${meta.height}`);

    // Export derivatives at 480, 720, and 960 px width
    const targetWidths = [480, 720, 960];

    for (const w of targetWidths) {
      const h = Math.round((meta.height / meta.width) * w);

      // PNG (fallback)
      await sharp(trimmed)
        .resize(w, h, { fit: 'inside' })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(path.join(heroAssetsDir, `hero-pc-${w}.png`));

      // WebP
      await sharp(trimmed)
        .resize(w, h, { fit: 'inside' })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(heroAssetsDir, `hero-pc-${w}.webp`));

      // AVIF
      await sharp(trimmed)
        .resize(w, h, { fit: 'inside' })
        .avif({ quality: 78, effort: 6 })
        .toFile(path.join(heroAssetsDir, `hero-pc-${w}.avif`));

      const pngStat = fs.statSync(path.join(heroAssetsDir, `hero-pc-${w}.png`));
      const webpStat = fs.statSync(path.join(heroAssetsDir, `hero-pc-${w}.webp`));
      const avifStat = fs.statSync(path.join(heroAssetsDir, `hero-pc-${w}.avif`));

      console.log(`Exported width ${w}px -> PNG: ${Math.round(pngStat.size/1024)}KB | WebP: ${Math.round(webpStat.size/1024)}KB | AVIF: ${Math.round(avifStat.size/1024)}KB`);
    }

    console.log('✅ All hero PC visual derivatives successfully exported to src/assets/hero/');
  } catch (err) {
    console.error('Error capturing hero visual:', err);
  } finally {
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
  }
});
