import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
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

const PORT = 4193;
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.CHROME_PATH || '',
].filter(Boolean);

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));

server.listen(PORT, async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'loader-rev-'));
  const testResults = [];

  const record = (name, passed, details) => {
    testResults.push({ name, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}: ${details}`);
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
    await page.setViewport({ width: 1440, height: 900 });

    // ── Test 1: New tab / fresh load to /, /about, /projects, /contact ──
    const routes = ['/', '/about', '/projects', '/contact'];
    let allRoutesShowLoader = true;
    for (const r of routes) {
      await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'domcontentloaded' });
      const hasLoader = await page.evaluate(() => {
        const el = document.getElementById('app-loader');
        return el && window.getComputedStyle(el).display !== 'none';
      });
      if (!hasLoader) allRoutesShowLoader = false;
      // Wait for exit
      await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });
    }
    record(
      'Fresh load on /, /about, /projects, /contact shows loader',
      allRoutesShowLoader,
      `All 4 routes showed loader on fresh load and exited gracefully within cap`
    );

    // ── Test 2: Refresh (F5 / reload) shows loader each time ──
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle2' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    const reloadLoader = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      return el && window.getComputedStyle(el).display !== 'none';
    });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });
    record('Refresh on /about shows loader', reloadLoader, 'Page reload correctly triggers the document loader');

    // ── Test 3: In-site navigation Home -> About -> Home via nav links: NO loader ──
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });

    // Click "About" link in header
    await page.click('header nav ul a[href="/about"]');
    await new Promise(r => setTimeout(r, 400));
    const aboutInSiteLoader = await page.evaluate(() => !!document.getElementById('app-loader') || !!document.getElementById('app-loader-replay'));

    // Click "Home" link in header nav list
    await page.click('header nav ul a[href="/"]');
    await new Promise(r => setTimeout(r, 400));
    const homeInSiteLoader = await page.evaluate(() => !!document.getElementById('app-loader') || !!document.getElementById('app-loader-replay'));

    record(
      'Header nav links (Home/About) in-site navigation: no loader',
      !aboutInSiteLoader && !homeInSiteLoader,
      'Normal router navigation does not trigger loader'
    );

    // ── Test 4: From /projects, click header logo -> plays loader & lands on Home at top ──
    await page.goto(`http://localhost:${PORT}/projects`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });

    // Scroll down 400px
    await page.evaluate(() => window.scrollTo(0, 400));
    
    // Click header logo
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');

    // Check that replay loader overlay appears
    await page.waitForSelector('#app-loader-replay', { timeout: 2000 });
    const replayActive = await page.evaluate(() => {
      const el = document.getElementById('app-loader-replay');
      return el && el.getAttribute('role') === 'status';
    });

    // Wait for replay loader to finish and exit
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });

    const logoLandingState = await page.evaluate(() => ({
      path: window.location.pathname,
      scrollY: window.scrollY,
      activeTag: document.activeElement ? document.activeElement.tagName : '',
    }));

    record(
      'Header logo click triggers replay, navigates to /, resets scroll to top, and focuses h1',
      replayActive && logoLandingState.path === '/' && logoLandingState.scrollY === 0 && logoLandingState.activeTag === 'H1',
      `Landed on / with scrollY: ${logoLandingState.scrollY}, focused: ${logoLandingState.activeTag}`
    );

    // ── Test 5: Click logo while already on Home: no duplicate history entry ──
    const histLenBefore = await page.evaluate(() => window.history.length);
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await page.waitForSelector('#app-loader-replay', { timeout: 2000 });
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });
    const histLenAfter = await page.evaluate(() => window.history.length);

    record(
      'Logo click on Home uses replaceState (no duplicate history entries)',
      histLenBefore === histLenAfter,
      `History length before: ${histLenBefore}, after: ${histLenAfter}`
    );

    // ── Test 6: Double-click logo quickly: only one loader plays ──
    await page.evaluate(() => {
      const logo = document.querySelector('header a[aria-label="Prathamesh Chiddarwar, home"]');
      logo.click();
      logo.click();
    });
    const overlayCount = await page.evaluate(() => document.querySelectorAll('#app-loader-replay').length);
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });
    record(
      'Double-clicking logo does not stack loader overlays',
      overlayCount === 1,
      `Overlay count during rapid double-click was: ${overlayCount}`
    );

    // ── Test 7: Browser Back/Forward between pages: no loader ──
    await page.click('header nav a[href="/about"]');
    await new Promise(r => setTimeout(r, 400));
    await page.click('header nav a[href="/projects"]');
    await new Promise(r => setTimeout(r, 400));

    // Browser back to /about
    await page.goBack();
    await new Promise(r => setTimeout(r, 200));
    const backLoader = await page.evaluate(() => !!document.getElementById('app-loader') || !!document.getElementById('app-loader-replay'));

    // Browser forward to /projects
    await page.goForward();
    await new Promise(r => setTimeout(r, 200));
    const forwardLoader = await page.evaluate(() => !!document.getElementById('app-loader') || !!document.getElementById('app-loader-replay'));

    record(
      'Browser Back/Forward navigation: no loader',
      !backLoader && !forwardLoader,
      'Back and forward page history traversals produce zero loader interruptions'
    );

    // ── Test 8: Footer links and 404 links: no loader ──
    await page.goto(`http://localhost:${PORT}/404`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });

    // Click "Back to Home" button inside 404 main content
    const backHomeBtn = await page.$('main a[href="/"]');
    if (backHomeBtn) {
      await backHomeBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const notFoundNavLoader = await page.evaluate(() => !!document.getElementById('app-loader') || !!document.getElementById('app-loader-replay'));
      record('404 "Back to Home" link: no loader', !notFoundNavLoader, 'Link cleanly returns to Home without triggering loader');
    }

    // ── Test 9: Mobile menu: tapping logo while menu is open closes menu & plays loader ──
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });

    // Open mobile menu
    await page.click('header button[aria-controls="mobile-navigation-drawer"]');
    await new Promise(r => setTimeout(r, 350));

    // Tap logo inside mobile drawer
    await page.click('#mobile-navigation-drawer a[aria-label="Prathamesh Chiddarwar, home"]');

    // Wait for replay overlay
    await page.waitForSelector('#app-loader-replay', { timeout: 2000 });
    const drawerClosedWhileLoading = await page.evaluate(() => !document.getElementById('mobile-navigation-drawer'));
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });

    const mobileLandedHome = await page.evaluate(() => window.location.pathname === '/');
    record(
      'Mobile drawer logo click closes drawer, plays loader, and lands on Home',
      drawerClosedWhileLoading && mobileLandedHome,
      'Drawer auto-closed and loader navigated to /'
    );

    // ── Test 10: Reduced motion: loader skipped everywhere, logo navigates & scrolls ──
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`http://localhost:${PORT}/about`, { waitUntil: 'networkidle2' });
    const reducedMotionInitialLoader = await page.evaluate(() => !!document.getElementById('app-loader'));

    // Click logo with reduced motion
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await new Promise(r => setTimeout(r, 300));
    const reducedMotionReplayLoader = await page.evaluate(() => !!document.getElementById('app-loader-replay'));
    const reducedMotionState = await page.evaluate(() => ({
      path: window.location.pathname,
      scrollY: window.scrollY,
    }));

    record(
      'Prefers-reduced-motion: loader skipped completely, logo navigates & scrolls',
      !reducedMotionInitialLoader && !reducedMotionReplayLoader && reducedMotionState.path === '/' && reducedMotionState.scrollY === 0,
      `Initial loader: ${!reducedMotionInitialLoader}, replay: ${!reducedMotionReplayLoader}, path: ${reducedMotionState.path}`
    );

    // ── Test 11: Desktop 3D homepage: logo replay preserves WebGL scene canvas node ──
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/?home=3d`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 4000 });

    // Identify canvas node
    await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.setAttribute('data-test-marker', 'original-canvas-node');
    });

    // Replay logo
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await page.waitForSelector('#app-loader-replay', { timeout: 2000 });
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });

    const canvasNodePreserved = await page.evaluate(() => {
      const canvas = document.querySelector('canvas[data-test-marker="original-canvas-node"]');
      return !!canvas;
    });

    record(
      'Desktop 3D homepage: logo replay preserves WebGL scene without recreation',
      canvasNodePreserved,
      'Canvas DOM element maintained identity throughout replay'
    );

    // ── Test 12: Keyboard navigation to logo: Enter triggers replay, ends on h1 ──
    await page.goto(`http://localhost:${PORT}/projects`, { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => !document.getElementById('app-loader'), { timeout: 3000 });

    // Focus logo link and press Enter
    await page.focus('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#app-loader-replay', { timeout: 2000 });
    await page.waitForFunction(() => !document.getElementById('app-loader-replay'), { timeout: 3000 });

    const keyboardFocusH1 = await page.evaluate(() => document.activeElement && document.activeElement.tagName === 'H1');
    record(
      'Keyboard: tabbing to logo and pressing Enter triggers replay and moves focus to h1',
      keyboardFocusH1,
      `Focus landed on: ${keyboardFocusH1 ? 'H1 (correct)' : document.activeElement?.tagName}`
    );

    await browser.close();
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

    console.log('\n========================================');
    console.log(`TOTAL TESTS: ${testResults.length}`);
    console.log(`PASSED: ${testResults.filter(t => t.passed).length}`);
    console.log(`FAILED: ${testResults.filter(t => !t.passed).length}`);
    console.log('========================================');

  } catch (err) {
    console.error('Test suite failed:', err);
    server.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    process.exit(1);
  }
});
