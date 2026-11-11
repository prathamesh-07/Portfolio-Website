import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

async function main() {
  const lBuf = fs.readFileSync('public/assets/brand/logo-pc-letters.webp');
  const rBuf = fs.readFileSync('public/assets/brand/logo-pc-ring.webp');

  const lData = 'data:image/webp;base64,' + lBuf.toString('base64');
  const rData = 'data:image/webp;base64,' + rBuf.toString('base64');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    background: #050816;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }
  .pc-loader-wrap {
    position: relative;
    width: 108px;
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pc-loader-glow {
    position: absolute;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(136, 92, 245, 0.12) 50%, transparent 72%);
    filter: blur(14px);
    animation: pcGlowPulse 2s ease-in-out infinite;
  }
  .pc-loader-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcRingSpin 1.25s linear infinite;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.45));
  }
  .pc-loader-letters {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcPulse 2s ease-in-out infinite;
  }
  @keyframes pcRingSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pcPulse {
    0%, 100% {
      opacity: 0.94;
      transform: scale(0.98);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }
  @keyframes pcGlowPulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(0.95);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
</style>
</head>
<body>
  <div class="pc-loader-wrap">
    <div class="pc-loader-glow"></div>
    <img class="pc-loader-ring" src="${rData}" alt="" />
    <img class="pc-loader-letters" src="${lData}" alt="PC Logo" />
  </div>
</body>
</html>`;

  fs.writeFileSync('test-loader.html', html);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 360 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/test-loader.html');
  await page.screenshot({ path: 'verification-screenshots/test-loader-preview.png' });
  await browser.close();
  console.log('Saved verification-screenshots/test-loader-preview.png');
}

main().catch(console.error);
