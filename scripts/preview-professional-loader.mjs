import fs from 'fs';
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

  .pro-loader-assembly {
    position: relative;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 1. Strictly OUTSIDE Ambient Reactor Glow (Inner 68px radius is 100% pure transparent) */
  .pro-ambient-aura {
    position: absolute;
    width: 230px;
    height: 230px;
    border-radius: 50%;
    background: radial-gradient(circle, transparent 68px, rgba(99, 102, 241, 0.3) 78px, rgba(136, 92, 245, 0.12) 100px, transparent 115px);
    filter: blur(14px);
    animation: auraBreathe 3.5s ease-in-out infinite alternate;
    pointer-events: none;
  }

  /* 2. Outer Precision Hairline Halo Ring (Concentric, 1px, 20% opacity) */
  .pro-halo-outer {
    position: absolute;
    width: 176px;
    height: 176px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.22);
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.12);
    pointer-events: none;
  }

  /* 3. Outer Stately Sweeping Arc (Smooth 4.5s orbit) */
  .pro-sweep-arc {
    position: absolute;
    width: 176px;
    height: 176px;
    border-radius: 50%;
    border: 1.5px solid transparent;
    border-top-color: rgba(136, 92, 245, 0.7);
    border-right-color: rgba(99, 102, 241, 0.4);
    filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.5));
    animation: proOrbit 4.5s linear infinite reverse;
    pointer-events: none;
  }

  /* 4. Fine Concentric Dashed Micro-Track (Very subtle 15% opacity) */
  .pro-dashed-track {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px dashed rgba(148, 163, 184, 0.25);
    animation: proOrbit 20s linear infinite;
    pointer-events: none;
  }

  /* 5. Outward Subtle Energy Pulse Ring (Expands outward from logo edge into space) */
  .pro-energy-pulse {
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.6);
    pointer-events: none;
    animation: proPulseOut 2.5s cubic-bezier(0.1, 0.7, 0.2, 1) infinite;
  }

  /* 6. Core: The PC Logo (136px diameter = 68px radius) */
  .pro-core-wrap {
    position: relative;
    width: 136px;
    height: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    border-radius: 50%;
    background-color: #050816; /* Clean dark core */
  }

  .pc-loader-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcRingSpin 1.4s linear infinite;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.75)) drop-shadow(0 0 20px rgba(136, 92, 245, 0.4));
    pointer-events: none;
    user-select: none;
  }

  .pc-loader-letters {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: coreBreath 2.6s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
    pointer-events: none;
    user-select: none;
  }

  @keyframes pcRingSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes proOrbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes auraBreathe {
    0% {
      opacity: 0.6;
      transform: scale(0.96);
    }
    100% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @keyframes proPulseOut {
    0% {
      transform: scale(1);
      opacity: 0.7;
      border-color: rgba(99, 102, 241, 0.7);
    }
    60% {
      transform: scale(1.3);
      opacity: 0.2;
      border-color: rgba(136, 92, 245, 0.4);
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
      border-color: transparent;
    }
  }

  @keyframes coreBreath {
    0% {
      opacity: 0.95;
      transform: scale(0.99);
    }
    100% {
      opacity: 1;
      transform: scale(1.01);
    }
  }
</style>
</head>
<body>
  <div class="pro-loader-assembly">
    <!-- Ambient Aura (Strictly outside 68px radius) -->
    <div class="pro-ambient-aura"></div>

    <!-- Expanding Pulse Wave -->
    <div class="pro-energy-pulse"></div>

    <!-- Outer Precision Hairline Halo -->
    <div class="pro-halo-outer"></div>

    <!-- Sweeping Arc -->
    <div class="pro-sweep-arc"></div>

    <!-- Fine Concentric Dashed Micro-Track -->
    <div class="pro-dashed-track"></div>

    <!-- Core: Clean PC Logo with pure dark background and zero interior noise -->
    <div class="pro-core-wrap">
      <img class="pc-loader-ring" src="${rData}" alt="" width="136" height="136" />
      <img class="pc-loader-letters" src="${lData}" alt="PC" width="136" height="136" />
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('test-pro.html', html);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 500 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/test-pro.html');
  await page.screenshot({ path: 'verification-screenshots/test-pro-refined.png' });
  await browser.close();
  console.log('Saved verification-screenshots/test-pro-refined.png');
}

main().catch(console.error);
