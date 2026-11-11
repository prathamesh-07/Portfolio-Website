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

  /* Arc Reactor Main Assembly */
  .arc-reactor-assembly {
    position: relative;
    width: 280px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 1. Outermost Electromagnetic Corona (Strictly outside r=73px) */
  .reactor-corona {
    position: absolute;
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background: radial-gradient(circle, transparent 74px, rgba(0, 229, 255, 0.4) 84px, rgba(99, 102, 241, 0.25) 105px, transparent 132px);
    filter: blur(10px);
    animation: reactorCoronaPulse 2.4s ease-in-out infinite alternate;
    pointer-events: none;
  }

  /* 2. Outer Palladium Containment Ring */
  .reactor-chassis-outer {
    position: absolute;
    width: 228px;
    height: 228px;
    border-radius: 50%;
    border: 1.5px solid rgba(0, 229, 255, 0.35);
    box-shadow: 0 0 16px rgba(0, 229, 255, 0.25), inset 0 0 12px rgba(0, 229, 255, 0.15);
    pointer-events: none;
  }

  /* 3. Outer Stator Turbine Track (Slow reverse magnetic rotation) */
  .reactor-turbine-ring {
    position: absolute;
    width: 212px;
    height: 212px;
    border-radius: 50%;
    border: 1.5px dashed rgba(0, 229, 255, 0.55);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.35);
    animation: reactorStatorSpin 18s linear infinite reverse;
    pointer-events: none;
  }

  /* 4. The 10 Electromagnetic Induction Coils (Iconic Arc Reactor Array) */
  .reactor-coils {
    position: absolute;
    width: 198px;
    height: 198px;
    border-radius: 50%;
    background: repeating-conic-gradient(
      from 0deg,
      rgba(0, 242, 254, 0.95) 0deg 12deg,
      rgba(0, 229, 255, 0.2) 12deg 14deg,
      transparent 14deg 36deg
    );
    -webkit-mask: radial-gradient(circle, transparent 75px, black 76px, black 95px, transparent 96px);
    mask: radial-gradient(circle, transparent 75px, black 76px, black 95px, transparent 96px);
    filter: drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 18px rgba(0, 229, 255, 0.75));
    animation: reactorCoilsPulse 1.8s ease-in-out infinite alternate;
    pointer-events: none;
  }

  /* 5. Copper / Brass Induction Wire Guide Ring */
  .reactor-copper-ring {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px solid rgba(255, 175, 55, 0.4);
    box-shadow: 0 0 8px rgba(255, 175, 55, 0.2);
    pointer-events: none;
  }

  /* 6. Inner Core Power Rim (Strictly outside 144px logo at 152px) */
  .reactor-inner-rim {
    position: absolute;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    border: 2px solid rgba(0, 242, 254, 0.9);
    box-shadow: 0 0 14px rgba(0, 229, 255, 0.8), inset 0 0 8px rgba(0, 229, 255, 0.6);
    pointer-events: none;
    animation: rimGlow 2s ease-in-out infinite alternate;
  }

  /* 7. Arc Reactor Energy Pulse Wave (Pings outward from coils) */
  .reactor-energy-wave {
    position: absolute;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    border: 2px solid rgba(0, 229, 255, 0.95);
    pointer-events: none;
    animation: arcWavePulse 2.2s cubic-bezier(0.1, 0.8, 0.25, 1) infinite;
  }

  /* 8. Core: Clean PC Logo with zero interior glow or pollution */
  .pc-core-wrap {
    position: relative;
    width: 144px;
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    border-radius: 50%;
    background-color: #050816; /* Guarantees pure dark interior */
  }

  .pc-loader-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcRingSpin 1.4s linear infinite;
    filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.95)) drop-shadow(0 0 18px rgba(99, 102, 241, 0.7));
    pointer-events: none;
    user-select: none;
  }

  .pc-loader-letters {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: coreHeartbeat 2.2s ease-in-out infinite;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
    pointer-events: none;
    user-select: none;
  }

  @keyframes pcRingSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes reactorStatorSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes reactorCoronaPulse {
    0% {
      opacity: 0.6;
      transform: scale(0.96);
      filter: blur(10px) hue-rotate(-10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1.06);
      filter: blur(14px) hue-rotate(15deg);
    }
  }

  @keyframes reactorCoilsPulse {
    0% {
      opacity: 0.75;
      filter: drop-shadow(0 0 6px #00e5ff) drop-shadow(0 0 12px rgba(0, 229, 255, 0.5));
    }
    100% {
      opacity: 1;
      filter: drop-shadow(0 0 10px #00e5ff) drop-shadow(0 0 22px rgba(0, 229, 255, 0.9));
    }
  }

  @keyframes rimGlow {
    0% {
      border-color: rgba(0, 229, 255, 0.7);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
    }
    100% {
      border-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 0 18px rgba(0, 229, 255, 1), inset 0 0 10px rgba(0, 229, 255, 0.8);
    }
  }

  @keyframes arcWavePulse {
    0% {
      transform: scale(1);
      opacity: 0.95;
      border-color: rgba(255, 255, 255, 0.95);
    }
    55% {
      transform: scale(1.36);
      opacity: 0.35;
      border-color: rgba(0, 229, 255, 0.6);
    }
    100% {
      transform: scale(1.6);
      opacity: 0;
      border-color: transparent;
    }
  }

  @keyframes coreHeartbeat {
    0%, 100% {
      opacity: 0.95;
      transform: scale(0.985);
    }
    50% {
      opacity: 1;
      transform: scale(1.015);
    }
  }
</style>
</head>
<body>
  <div class="arc-reactor-assembly">
    <!-- Outermost Energy Corona (Strictly outside r=73px) -->
    <div class="reactor-corona"></div>

    <!-- Energy Shockwave Wave -->
    <div class="reactor-energy-wave"></div>

    <!-- Outer Palladium Chassis Ring -->
    <div class="reactor-chassis-outer"></div>

    <!-- Turbine Stator Notched Ring -->
    <div class="reactor-turbine-ring"></div>

    <!-- 10 Iconic Arc Reactor Magnetic Coils -->
    <div class="reactor-coils"></div>

    <!-- Copper Wire Guide Ring -->
    <div class="reactor-copper-ring"></div>

    <!-- Inner Core Conduit Rim -->
    <div class="reactor-inner-rim"></div>

    <!-- Core: Clean PC Logo with pure dark background and zero interior pollution -->
    <div class="pc-core-wrap">
      <img class="pc-loader-ring" src="${rData}" alt="" width="144" height="144" />
      <img class="pc-loader-letters" src="${lData}" alt="PC" width="144" height="144" />
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('test-arc.html', html);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 500 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/test-arc.html');
  await page.screenshot({ path: 'verification-screenshots/test-arc-reactor-v2.png' });
  await browser.close();
  console.log('Saved verification-screenshots/test-arc-reactor-v2.png');
}

main().catch(console.error);
