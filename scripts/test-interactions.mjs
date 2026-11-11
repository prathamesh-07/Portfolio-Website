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

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Test scrolling down
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 300));
  const scrolledY = await page.evaluate(() => window.scrollY);

  // 2. Test clicking About in navigation
  await page.click('header nav ul a[href="/about"]');
  await new Promise(r => setTimeout(r, 500));
  const currentPath = await page.evaluate(() => window.location.pathname);

  // 3. Test clicking Logo to return home with replay
  await page.click('header a[aria-label="Prathamesh Chiddarwar, home"]');
  await new Promise(r => setTimeout(r, 1500));
  const returnedPath = await page.evaluate(() => window.location.pathname);
  const returnedScrollY = await page.evaluate(() => window.scrollY);
  const h1Text = await page.evaluate(() => document.querySelector('h1')?.innerText);
  const h1Opacity = await page.evaluate(() => {
    const el = document.querySelector('h1');
    return el ? window.getComputedStyle(el).opacity : 'null';
  });

  console.log('INTERACTION RESULTS:', JSON.stringify({
    scrolledY,
    currentPath,
    returnedPath,
    returnedScrollY,
    h1Text,
    h1Opacity
  }, null, 2));

  // Take screenshot of desktop home now
  await page.screenshot({ path: 'verification-screenshots/desktop-fixed.png' });

  await browser.close();
}

main().catch(console.error);
