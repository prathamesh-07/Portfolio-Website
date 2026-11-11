import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('--- Step 1: Testing initial document load on http://localhost:5173/ ---');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Check elements inside loader
  const loaderCheck = await page.evaluate(() => {
    const loader = document.getElementById('app-loader');
    const progressBar = document.getElementById('loader-progress-bar');
    const pcWrap = document.querySelector('.pc-loader-wrap');
    const pcRing = document.querySelector('.pc-loader-ring');
    const pcLetters = document.querySelector('.pc-loader-letters');

    return {
      hasLoader: !!loader,
      hasProgressBar: !!progressBar,
      hasPcWrap: !!pcWrap,
      hasPcRing: !!pcRing,
      hasPcLetters: !!pcLetters,
    };
  });

  console.log('Loader elements check:', loaderCheck);

  // Take screenshot of new loader active on initial paint
  await page.screenshot({ path: 'verification-screenshots/new-loader-initial.png' });
  console.log('Saved verification-screenshots/new-loader-initial.png');

  // Wait for initial loader to complete and exit
  await new Promise(r => setTimeout(r, 1600));

  // Step 2: Test Logo Replay
  console.log('--- Step 2: Testing Logo Click Replay ---');
  await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
  await new Promise(r => setTimeout(r, 150));

  const replayCheck = await page.evaluate(() => {
    const replay = document.getElementById('app-loader-replay');
    const progressBar = document.getElementById('loader-progress-bar-replay');
    const pcWrap = replay ? replay.querySelector('.pc-loader-wrap') : null;
    const pcRing = replay ? replay.querySelector('.pc-loader-ring') : null;
    const pcLetters = replay ? replay.querySelector('.pc-loader-letters') : null;

    return {
      hasReplay: !!replay,
      hasProgressBar: !!progressBar,
      hasPcWrap: !!pcWrap,
      hasPcRing: !!pcRing,
      hasPcLetters: !!pcLetters,
    };
  });

  console.log('Replay elements check:', replayCheck);
  await page.screenshot({ path: 'verification-screenshots/new-loader-replay.png' });
  console.log('Saved verification-screenshots/new-loader-replay.png');

  await browser.close();

  // Validate
  if (loaderCheck.hasProgressBar) {
    throw new Error('FAILED: loader-progress-bar should be removed!');
  }
  if (!loaderCheck.hasPcWrap || !loaderCheck.hasPcRing || !loaderCheck.hasPcLetters) {
    throw new Error('FAILED: pc-loader elements missing in initial loader!');
  }
  if (!replayCheck.hasReplay || !replayCheck.hasPcWrap || !replayCheck.hasPcRing || !replayCheck.hasPcLetters) {
    throw new Error('FAILED: pc-loader elements missing in replay loader!');
  }

  console.log('\n>>> ALL NEW LOADER DESIGN CHECKS PASSED SUCCESSFULLY! <<<');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
