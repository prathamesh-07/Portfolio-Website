import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const screenshotsDir = path.join(rootDir, 'verification-screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
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

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let fp = path.join(distDir, p);
  if (!fs.existsSync(fp)) fp = path.join(distDir, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(fp));
});

const PORT = 4195;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

server.listen(PORT, async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-profile-'));
  const report = {
    loaderTests: {},
    headerTests: {},
    mobileMenuTests: {},
    footerTests: {},
    viewportChecks: [],
    perfMetrics: {},
  };

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

    // ══════════════════════════════════════════════════════════════════════════
    // 1. LOADER TESTS
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Testing First-Visit Loader...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    // Enable CPU throttling (4x)
    const client = await page.target().createCDPSession();
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    // Visit with clean session
    await page.goto(`http://localhost:${PORT}/?home=lite`, { waitUntil: 'domcontentloaded' });
    
    // Check initial loader presence and attributes
    const initialLoader = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      if (!el) return null;
      return {
        exists: true,
        role: el.getAttribute('role'),
        ariaLabel: el.getAttribute('aria-label'),
        display: window.getComputedStyle(el).display,
        hasSvg: !!el.querySelector('svg'),
        label: el.querySelector('.loader-label')?.textContent,
      };
    });
    report.loaderTests.initialPaint = initialLoader;

    // Wait for loader exit and removal from DOM
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 4000 });
    
    // Verify session storage marked
    const sessionMarked = await page.evaluate(() => sessionStorage.getItem('portfolio_visited') === 'true');
    report.loaderTests.sessionMarked = sessionMarked;

    // Test Repeat Visit (Loader Skipped)
    await page.reload({ waitUntil: 'networkidle2' });
    const repeatLoader = await page.evaluate(() => {
      const htmlHasSkip = document.documentElement.classList.contains('loader-skip');
      const el = document.getElementById('app-loader');
      return {
        htmlHasSkip,
        loaderRemovedOrHidden: !el || window.getComputedStyle(el).display === 'none',
      };
    });
    report.loaderTests.repeatVisitSkipped = repeatLoader;

    // ══════════════════════════════════════════════════════════════════════════
    // 2. HEADER TESTS (Desktop 1440x900)
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Testing Header on Desktop...');
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle2' });

    // Initial state (Y=0)
    const headerInitial = await page.evaluate(() => {
      const header = document.querySelector('header');
      const cs = window.getComputedStyle(header);
      return {
        height: Math.round(header.getBoundingClientRect().height),
        backgroundColor: cs.backgroundColor,
        borderBottomColor: cs.borderBottomColor,
        hasResumeLink: !!document.querySelector('header a[download]'),
        resumeHref: document.querySelector('header a[download]')?.getAttribute('href'),
        activeIndicator: !!document.querySelector('header [aria-hidden="true"]'),
      };
    });
    report.headerTests.topOfPage = headerInitial;

    // Scroll down 150px
    await page.evaluate(() => window.scrollTo(0, 150));
    await new Promise(r => setTimeout(r, 400));

    const headerScrolled = await page.evaluate(() => {
      const header = document.querySelector('header');
      const cs = window.getComputedStyle(header);
      return {
        height: Math.round(header.getBoundingClientRect().height),
        backgroundColor: cs.backgroundColor,
        borderBottom: cs.borderBottom,
        boxShadow: cs.boxShadow !== 'none',
      };
    });
    report.headerTests.scrolledPast8px = headerScrolled;

    // Capture desktop header screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'header-desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 120 } });

    // ══════════════════════════════════════════════════════════════════════════
    // 3. MOBILE MENU TESTS (390x844)
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Testing Mobile Menu...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`http://localhost:${PORT}/?home=lite`, { waitUntil: 'networkidle2' });

    // Find and verify menu button
    const menuButton = await page.$('header button[aria-controls="mobile-navigation-drawer"]');
    const btnBox = await menuButton.boundingBox();
    report.mobileMenuTests.buttonSize = {
      width: Math.round(btnBox.width),
      height: Math.round(btnBox.height),
      is44Min: btnBox.width >= 44 && btnBox.height >= 44,
    };

    // Open menu
    await menuButton.click();
    await new Promise(r => setTimeout(r, 400));

    const menuOpenState = await page.evaluate(() => {
      const drawer = document.getElementById('mobile-navigation-drawer');
      const bodyOverflow = document.body.style.overflow;
      const links = Array.from(drawer.querySelectorAll('nav a, ul a')).map(a => a.textContent.trim());
      const socialLinks = drawer.querySelectorAll('a[aria-label]');
      return {
        drawerVisible: !!drawer,
        bodyOverflowLocked: bodyOverflow === 'hidden',
        linkCount: links.length,
        links,
        socialCount: socialLinks.length,
        resumeDownloadExists: !!drawer.querySelector('a[download]'),
      };
    });
    report.mobileMenuTests.openState = menuOpenState;

    // Capture mobile drawer screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'mobile-menu-drawer.png') });

    // Test Escape key closes menu
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    const menuClosedState = await page.evaluate(() => {
      const drawer = document.getElementById('mobile-navigation-drawer');
      const bodyOverflow = document.body.style.overflow;
      return {
        drawerRemoved: !drawer,
        bodyOverflowRestored: bodyOverflow !== 'hidden',
      };
    });
    report.mobileMenuTests.escapeCloses = menuClosedState;

    // ══════════════════════════════════════════════════════════════════════════
    // 4. FOOTER TESTS
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Testing Footer...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle2' });

    const footerData = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;

      const fullText = footer.innerText.replace(/\s+/g, ' ').trim();
      const words = fullText.split(' ').filter(Boolean);
      const year = new Date().getFullYear().toString();
      const hasPhone = /\d{3}[-.\s]??\d{3}[-.\s]??\d{4}/.test(fullText);

      const links = Array.from(footer.querySelectorAll('a')).map(a => ({
        href: a.getAttribute('href'),
        text: a.innerText.trim(),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
      }));

      const copyBtn = footer.querySelector('button[aria-label*="email" i], button[title*="email" i]');
      const backToTopBtn = footer.querySelector('button[aria-label*="Back to top" i]');

      return {
        totalWordCount: words.length,
        under45Words: words.length <= 45,
        containsYear: fullText.includes(year),
        noPhoneNumber: !hasPhone,
        linksCount: links.length,
        links,
        hasCopyButton: !!copyBtn,
        hasBackToTop: !!backToTopBtn,
      };
    });
    report.footerTests = footerData;

    // Test Copy Email Button
    await page.evaluate(() => {
      const copyBtn = document.querySelector('footer button[aria-label*="email" i]');
      if (copyBtn) copyBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const copyFeedback = await page.evaluate(() => {
      const ariaLive = document.querySelector('footer [aria-live="polite"]')?.textContent;
      return { liveAnnouncement: ariaLive };
    });
    report.footerTests.copyFeedback = copyFeedback;

    // Capture footer screenshot
    const footerElement = await page.$('footer');
    if (footerElement) {
      await footerElement.screenshot({ path: path.join(screenshotsDir, 'footer-desktop.png') });
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 5. MULTI-VIEWPORT RESPONSIVENESS & TAP TARGETS
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Testing Viewports (320, 375, 768, 1024, 1440, 1920)...');
    const viewports = [320, 375, 768, 1024, 1440, 1920];

    for (const width of viewports) {
      await page.setViewport({ width, height: 900 });
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle2' });

      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        return {
          docWidth,
          scrollWidth,
          hasHorizontalOverflow: scrollWidth > docWidth,
        };
      });

      report.viewportChecks.push({
        width,
        ...overflow,
      });
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 6. PERFORMANCE & LCP COMPARISON (WITH VS WITHOUT FIRST-VISIT LOADER)
    // ══════════════════════════════════════════════════════════════════════════
    console.log('Measuring Performance with vs without loader...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    // Measure without loader (subsequent visit)
    await page.goto(`http://localhost:${PORT}/?home=lite`, { waitUntil: 'networkidle2' });
    const perfWithoutLoader = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      let lcp = 0;
      try {
        const obs = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          lcp = entries[entries.length - 1].renderTime || entries[entries.length - 1].loadTime;
        });
        obs.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}
      return { fcp: Math.round(fcp), lcp: Math.round(lcp) };
    });
    report.perfMetrics.withoutLoader = perfWithoutLoader;

    await browser.close();
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

    console.log('\n===== VERIFICATION REPORT =====');
    console.log(JSON.stringify(report, null, 2));

  } catch (err) {
    console.error('Verification failed:', err);
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    process.exit(1);
  }
});

