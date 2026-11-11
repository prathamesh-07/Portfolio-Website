import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = [];

  const logTest = (name, pass, details = '') => {
    results.push({ name, pass, details });
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${name}: ${details}`);
  };

  try {
    // 1. Fresh load on / -> Loader SHOULD display
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const homeInitialHasLoader = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      return !!el && !document.documentElement.classList.contains('loader-skip');
    });
    logTest('1. Fresh load on / shows loader', homeInitialHasLoader, 'app-loader exists without loader-skip');

    // Wait for loader to finish on home
    await new Promise(r => setTimeout(r, 1600));

    // 2. Refresh on / -> Loader SHOULD display
    await page.reload({ waitUntil: 'domcontentloaded' });
    const homeReloadHasLoader = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      return !!el && !document.documentElement.classList.contains('loader-skip');
    });
    logTest('2. Refresh on / shows loader', homeReloadHasLoader, 'app-loader exists on reload');
    await new Promise(r => setTimeout(r, 1600));

    // 3. Fresh load on /about -> Loader SHOULD NOT display
    await page.goto('http://localhost:5173/about', { waitUntil: 'domcontentloaded' });
    const aboutInitialLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('3. Fresh load on /about skips loader', aboutInitialLoaderSkipped, 'loader-skip applied or loader hidden');

    // 4. Refresh on /about -> Loader SHOULD NOT display
    await page.reload({ waitUntil: 'domcontentloaded' });
    const aboutReloadLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('4. Refresh on /about skips loader', aboutReloadLoaderSkipped, 'loader skipped on refresh of /about');

    // 5. Fresh load on /projects -> Loader SHOULD NOT display
    await page.goto('http://localhost:5173/projects', { waitUntil: 'domcontentloaded' });
    const projectsInitialLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('5. Fresh load on /projects skips loader', projectsInitialLoaderSkipped, 'loader skipped on fresh load of /projects');

    // 6. Refresh on /projects -> Loader SHOULD NOT display
    await page.reload({ waitUntil: 'domcontentloaded' });
    const projectsReloadLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('6. Refresh on /projects skips loader', projectsReloadLoaderSkipped, 'loader skipped on refresh of /projects');

    // 7. Fresh load on /contact -> Loader SHOULD NOT display
    await page.goto('http://localhost:5173/contact', { waitUntil: 'domcontentloaded' });
    const contactInitialLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('7. Fresh load on /contact skips loader', contactInitialLoaderSkipped, 'loader skipped on fresh load of /contact');

    // 8. Refresh on /contact -> Loader SHOULD NOT display
    await page.reload({ waitUntil: 'domcontentloaded' });
    const contactReloadLoaderSkipped = await page.evaluate(() => {
      const el = document.getElementById('app-loader');
      const isSkip = document.documentElement.classList.contains('loader-skip');
      const style = el ? window.getComputedStyle(el).display : 'none';
      return isSkip || style === 'none' || !el;
    });
    logTest('8. Refresh on /contact skips loader', contactReloadLoaderSkipped, 'loader skipped on refresh of /contact');

    // 9. Homepage scroll down -> click logo scrolls to top (NO loader) -> click on top loads loader
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1600));

    // Scroll down 600px
    await page.evaluate(() => window.scrollBy(0, 600));
    await new Promise(r => setTimeout(r, 400));
    const scrolledBefore = await page.evaluate(() => window.scrollY);

    // Click logo while scrolled down
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    // Wait for smooth scroll
    await new Promise(r => setTimeout(r, 600));

    const scrolledAfterFirstClick = await page.evaluate(() => window.scrollY);
    const replayDuringScroll = await page.evaluate(() => !!document.getElementById('app-loader-replay'));

    logTest(
      '9a. On Homepage scrolled down, click logo scrolls to top without loader',
      scrolledBefore > 100 && scrolledAfterFirstClick <= 20 && !replayDuringScroll,
      `Scrolled before: ${scrolledBefore}, after click: ${scrolledAfterFirstClick}, replay appeared: ${replayDuringScroll}`
    );

    // Now on top of homepage -> click logo SHOULD trigger loader replay
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await new Promise(r => setTimeout(r, 100));

    const replayAfterTopClick = await page.evaluate(() => !!document.getElementById('app-loader-replay'));
    logTest(
      '9b. On Homepage at top, click logo triggers loader replay',
      replayAfterTopClick,
      `Replay loader appeared: ${replayAfterTopClick}`
    );

    // Wait for replay loader to complete
    await new Promise(r => setTimeout(r, 1200));

    // 10. On /about: scroll down -> click logo scrolls to top of /about (NO loader) -> click on top loads loader and navigates to /
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));

    // Scroll down 600px on /about
    await page.evaluate(() => window.scrollBy(0, 600));
    await new Promise(r => setTimeout(r, 400));
    const aboutScrollBefore = await page.evaluate(() => window.scrollY);

    // Click logo while scrolled down on /about
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await new Promise(r => setTimeout(r, 600));

    const aboutScrollAfterClick = await page.evaluate(() => window.scrollY);
    const aboutPathAfterScroll = await page.evaluate(() => window.location.pathname);
    const aboutReplayDuringScroll = await page.evaluate(() => !!document.getElementById('app-loader-replay'));

    logTest(
      '10a. On /about scrolled down, click logo scrolls to top without loader',
      aboutScrollBefore > 100 && aboutScrollAfterClick <= 20 && !aboutReplayDuringScroll && aboutPathAfterScroll === '/about',
      `Scrolled before: ${aboutScrollBefore}, after: ${aboutScrollAfterClick}, path: ${aboutPathAfterScroll}, replay: ${aboutReplayDuringScroll}`
    );

    // Now on top of /about -> click logo SHOULD trigger loader and navigate to /
    await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
    await new Promise(r => setTimeout(r, 100));

    const aboutReplayAfterTopClick = await page.evaluate(() => !!document.getElementById('app-loader-replay'));
    await new Promise(r => setTimeout(r, 1200));
    const finalPath = await page.evaluate(() => window.location.pathname);

    logTest(
      '10b. On /about at top, click logo triggers loader and navigates to /',
      aboutReplayAfterTopClick && finalPath === '/',
      `Replay appeared: ${aboutReplayAfterTopClick}, landed on path: ${finalPath}`
    );

  } finally {
    await browser.close();
  }

  const failedCount = results.filter(r => !r.pass).length;
  console.log('\n========================================');
  console.log(`TOTAL TESTS: ${results.length}`);
  console.log(`PASSED: ${results.length - failedCount}`);
  console.log(`FAILED: ${failedCount}`);
  console.log('========================================');

  if (failedCount > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
