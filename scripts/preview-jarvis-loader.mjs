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

  .jarvis-container {
    position: relative;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 1. Deep Aurora / Nebula Glow in Background */
  .aurora-glow {
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, rgba(136, 92, 245, 0.15) 65%, transparent 75%);
    filter: blur(28px);
    animation: auroraBreathe 3s ease-in-out infinite alternate;
    pointer-events: none;
  }

  /* 2. Rotating Conic Aurora Shimmer */
  .aurora-shimmer {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(99, 102, 241, 0.25) 60deg, rgba(56, 189, 248, 0.35) 120deg, transparent 180deg, rgba(136, 92, 245, 0.3) 260deg, transparent 360deg);
    filter: blur(22px);
    animation: auroraSpin 6s linear infinite;
    pointer-events: none;
  }

  /* 3. Outer Jarvis HUD Ring (Counter-clockwise orbit, dashed ticks) */
  .jarvis-hud-ring {
    position: absolute;
    width: 196px;
    height: 196px;
    border-radius: 50%;
    border: 1px dashed rgba(99, 102, 241, 0.4);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.2), inset 0 0 15px rgba(56, 189, 248, 0.15);
    animation: hudOrbit 10s linear infinite reverse;
    pointer-events: none;
  }

  /* 4. Jarvis Radar Pulse Ping / Sonar Ripple */
  .jarvis-sonar {
    position: absolute;
    width: 144px;
    height: 144px;
    border-radius: 50%;
    border: 1px solid rgba(56, 189, 248, 0.7);
    pointer-events: none;
    animation: sonarPing 2.4s cubic-bezier(0.1, 0.8, 0.2, 1) infinite;
  }

  /* 5. Jarvis 4 cardinal target brackets outside the logo (NO lines through letters) */
  .jarvis-bracket {
    position: absolute;
    width: 208px;
    height: 208px;
    border-radius: 50%;
    pointer-events: none;
    border: 2px solid transparent;
    border-top-color: rgba(56, 189, 248, 0.75);
    border-bottom-color: rgba(56, 189, 248, 0.75);
    filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.8));
    animation: bracketPulse 2s ease-in-out infinite;
  }
  .jarvis-bracket-side {
    position: absolute;
    width: 208px;
    height: 208px;
    border-radius: 50%;
    pointer-events: none;
    border: 2px solid transparent;
    border-left-color: rgba(136, 92, 245, 0.75);
    border-right-color: rgba(136, 92, 245, 0.75);
    filter: drop-shadow(0 0 6px rgba(136, 92, 245, 0.8));
    animation: bracketPulse 2s ease-in-out infinite;
  }

  /* 6. Main PC Logo Wrap (144px x 144px!) */
  .pc-loader-wrap {
    position: relative;
    width: 144px;
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .pc-loader-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcRingSpin 1.35s linear infinite;
    filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.85)) drop-shadow(0 0 24px rgba(56, 189, 248, 0.5));
    pointer-events: none;
    user-select: none;
  }

  .pc-loader-letters {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcPulse 2s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    pointer-events: none;
    user-select: none;
  }

  @keyframes pcRingSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes hudOrbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes auroraSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes auroraBreathe {
    0% {
      opacity: 0.5;
      transform: scale(0.94);
      filter: blur(22px) hue-rotate(0deg);
    }
    100% {
      opacity: 0.95;
      transform: scale(1.15);
      filter: blur(30px) hue-rotate(40deg);
    }
  }

  @keyframes bracketPulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(0.98);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }

  @keyframes sonarPing {
    0% {
      transform: scale(0.95);
      opacity: 0.85;
      border-color: rgba(56, 189, 248, 0.8);
    }
    60% {
      transform: scale(1.3);
      opacity: 0.3;
      border-color: rgba(99, 102, 241, 0.45);
    }
    100% {
      transform: scale(1.48);
      opacity: 0;
      border-color: transparent;
    }
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
</style>
</head>
<body>
  <div class="jarvis-container">
    <div class="aurora-glow"></div>
    <div class="aurora-shimmer"></div>
    <div class="jarvis-sonar"></div>
    <div class="jarvis-hud-ring"></div>
    <div class="jarvis-bracket"></div>
    <div class="jarvis-bracket-side"></div>
    <div class="pc-loader-wrap">
      <img class="pc-loader-ring" src="${rData}" alt="" width="144" height="144" />
      <img class="pc-loader-letters" src="${lData}" alt="PC" width="144" height="144" />
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('test-jarvis.html', html);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 500 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/test-jarvis.html');
  await page.screenshot({ path: 'verification-screenshots/test-jarvis-clean.png' });
  await browser.close();
  console.log('Saved verification-screenshots/test-jarvis-clean.png');
}

main().catch(console.error);
