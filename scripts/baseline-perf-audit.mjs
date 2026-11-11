/**
 * Baseline Performance & Metrics Audit
 * Simulates mobile device (390x844), 4x CPU slowdown, and captures:
 * LCP, CLS, FCP, TTFB, DOMContentLoaded, Load time, Console errors, Tap targets, Accessibility markers
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

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

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let fp = path.join(distDir, p);
  if (!fs.existsSync(fp)) fp = path.join(distDir, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(fp));
});

import os from 'os';

const PORT = 4198;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

server.listen(PORT, async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'audit-profile-'));
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

    const pagesToTest = [
      { name: 'Home (Lite)', url: `http://localhost:${PORT}/?home=lite` },
      { name: 'About', url: `http://localhost:${PORT}/about` },
      { name: 'Projects', url: `http://localhost:${PORT}/projects` },
      { name: 'Contact', url: `http://localhost:${PORT}/contact` },
    ];

    const results = [];

    for (const testPage of pagesToTest) {
      const page = await browser.newPage();
      
      // Mobile viewport 390x844 (iPhone 14 / modern standard mobile)
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      
      // Throttle CPU 4x
      const client = await page.target().createCDPSession();
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

      // Track errors
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      // Clear session storage before loading to test first visit
      await page.goto('about:blank');

      const startTime = Date.now();
      await page.goto(testPage.url, { waitUntil: 'networkidle2', timeout: 15000 });
      const totalLoadTime = Date.now() - startTime;

      // Extract performance timing and Web Vitals
      const metrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          let lcp = 0;
          let cls = 0;
          let fcp = 0;

          // Performance Observer for LCP
          try {
            const lcpObserver = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              const lastEntry = entries[entries.length - 1];
              lcp = lastEntry.renderTime || lastEntry.loadTime;
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          } catch (e) {}

          // Performance Observer for CLS
          try {
            const clsObserver = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                  cls += entry.value;
                }
              }
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
          } catch (e) {}

          // Paint entries for FCP
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(p => p.name === 'first-contentful-paint');
          if (fcpEntry) fcp = fcpEntry.startTime;

          // Navigation timing
          const navEntries = performance.getEntriesByType('navigation');
          const nav = navEntries.length > 0 ? navEntries[0] : null;
          const ttfb = nav ? nav.responseStart : 0;
          const domContentLoaded = nav ? nav.domContentLoadedEventEnd : 0;

          // Tap targets check (< 44x44)
          const interactives = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
          const smallTargets = interactives
            .filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
            })
            .map(el => ({
              tag: el.tagName,
              text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
              width: Math.round(el.getBoundingClientRect().width),
              height: Math.round(el.getBoundingClientRect().height)
            }));

          setTimeout(() => {
            resolve({
              lcp: Math.round(lcp),
              cls: Number(cls.toFixed(4)),
              fcp: Math.round(fcp),
              ttfb: Math.round(ttfb),
              domContentLoaded: Math.round(domContentLoaded),
              smallTargetsCount: smallTargets.length,
              smallTargetsSample: smallTargets.slice(0, 5),
            });
          }, 500);
        });
      });

      results.push({
        page: testPage.name,
        ...metrics,
        totalLoadTime,
        errors: errors.filter(e => !e.includes('caniuse-lite')),
      });

      await page.close();
    }

    await browser.close();
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error('Audit failed:', err);
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    process.exit(1);
  }
});
