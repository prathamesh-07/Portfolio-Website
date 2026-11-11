import fs from 'fs';

const lBuf = fs.readFileSync('public/assets/brand/logo-pc-letters.webp');
const rBuf = fs.readFileSync('public/assets/brand/logo-pc-ring.webp');

const lData = 'data:image/webp;base64,' + lBuf.toString('base64');
const rData = 'data:image/webp;base64,' + rBuf.toString('base64');

const code = `import { LOADER_ROUTES } from "../../constants/loaderConfig.js";

export { LOADER_ROUTES };

export const isRouteAllowed = (path, allowedRoutes = LOADER_ROUTES) => {
  if (allowedRoutes === "all") return true;
  if (!Array.isArray(allowedRoutes)) return false;
  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return (
    allowedRoutes.includes(normalized) ||
    allowedRoutes.includes(path) ||
    (normalized === "/index.html" && allowedRoutes.includes("/"))
  );
};

export const PC_LETTERS_DATA_URI = "${lData}";
export const PC_RING_DATA_URI = "${rData}";

export const LOADER_CSS = \`
  .loader-skip #app-loader {
    display: none !important;
  }
  #app-loader {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: #050816;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
    pointer-events: auto;
  }
  #app-loader.loader-exiting {
    opacity: 0 !important;
    transform: scale(0.95) !important;
    pointer-events: none !important;
  }
  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pro-loader-assembly {
    position: relative;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: proEntrance 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
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
  .pro-halo-outer {
    position: absolute;
    width: 176px;
    height: 176px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.22);
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.12);
    pointer-events: none;
  }
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
  .pro-dashed-track {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px dashed rgba(148, 163, 184, 0.25);
    animation: proOrbit 20s linear infinite;
    pointer-events: none;
  }
  .pro-energy-pulse {
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.6);
    pointer-events: none;
    animation: proPulseOut 2.5s cubic-bezier(0.1, 0.7, 0.2, 1) infinite;
  }
  .pro-core-wrap {
    position: relative;
    width: 136px;
    height: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    border-radius: 50%;
    background-color: #050816;
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
  @keyframes proEntrance {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media (max-width: 480px) {
    .pro-loader-assembly {
      transform: scale(0.85);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pc-loader-ring,
    .pc-loader-letters,
    .pro-ambient-aura,
    .pro-halo-outer,
    .pro-sweep-arc,
    .pro-dashed-track,
    .pro-energy-pulse,
    .pro-loader-assembly {
      animation: none !important;
    }
  }
  @keyframes loaderFailsafe {
    to {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
  }
  #app-loader {
    animation: loaderFailsafe 0.4s ease 3s forwards;
  }
\`;

export const LOADER_INNER_HTML = \`
  <div class="loader-content">
    <div class="pro-loader-assembly" role="img" aria-label="Prathamesh Chiddarwar PC Logo Loading">
      <div class="pro-ambient-aura" aria-hidden="true"></div>
      <div class="pro-energy-pulse" aria-hidden="true"></div>
      <div class="pro-halo-outer" aria-hidden="true"></div>
      <div class="pro-sweep-arc" aria-hidden="true"></div>
      <div class="pro-dashed-track" aria-hidden="true"></div>
      <div class="pro-core-wrap">
        <img class="pc-loader-ring" src="\${PC_RING_DATA_URI}" alt="" width="136" height="136" aria-hidden="true" />
        <img class="pc-loader-letters" src="\${PC_LETTERS_DATA_URI}" alt="PC" width="136" height="136" />
      </div>
    </div>
  </div>
\`;
`;

fs.writeFileSync('src/components/shared/loaderShared.js', code, 'utf-8');
console.log('src/components/shared/loaderShared.js written successfully');
