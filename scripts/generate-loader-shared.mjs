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
    transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
    pointer-events: auto;
  }
  #app-loader.loader-exiting {
    opacity: 0 !important;
    transform: translateY(-8px) scale(0.96) !important;
    pointer-events: none !important;
  }
  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pc-loader-wrap {
    position: relative;
    width: 112px;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pcEntrance 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .pc-loader-glow {
    position: absolute;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(136, 92, 245, 0.12) 50%, transparent 72%);
    filter: blur(14px);
    animation: pcGlowPulse 2s ease-in-out infinite;
    pointer-events: none;
  }
  .pc-loader-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: pcRingSpin 1.25s linear infinite;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
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
    pointer-events: none;
    user-select: none;
  }
  @keyframes pcRingSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
  @keyframes pcEntrance {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pc-loader-ring,
    .pc-loader-letters,
    .pc-loader-glow,
    .pc-loader-wrap {
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
    <div class="pc-loader-wrap" role="img" aria-label="Prathamesh Chiddarwar PC Logo Loading">
      <div class="pc-loader-glow" aria-hidden="true"></div>
      <img class="pc-loader-ring" src="\${PC_RING_DATA_URI}" alt="" width="112" height="112" aria-hidden="true" />
      <img class="pc-loader-letters" src="\${PC_LETTERS_DATA_URI}" alt="PC" width="112" height="112" />
    </div>
  </div>
\`;
`;

fs.writeFileSync('src/components/shared/loaderShared.js', code, 'utf-8');
console.log('src/components/shared/loaderShared.js written successfully');
