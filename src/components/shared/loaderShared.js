import { LOADER_ROUTES } from "../../constants/loaderConfig";

export { LOADER_ROUTES };

export const LOADER_LABEL = "Build · Secure";

export const LOADER_SVG = `<svg class="loader-icon" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M1.98441 29.2899C1.98441 27.0299 2.42954 24.7919 3.29444 22.704C4.15935 20.6159 5.42701 18.7187 7.02513 17.1206C8.62324 15.5225 10.5204 14.2548 12.6084 13.3899C14.6965 12.5251 16.9344 12.0799 19.1945 12.0799V29.2899H1.98441Z" fill="#442781"></path>
  <path d="M1.98441 29.2899C1.98441 31.55 2.42954 33.7879 3.29444 35.876C4.15935 37.964 5.42701 39.8612 7.02513 41.4593C8.62324 43.0574 10.5204 44.3251 12.6084 45.19C14.6965 46.0549 16.9344 46.5 19.1945 46.5V29.2899H1.98441Z" fill="#61459C"></path>
  <path d="M36.4043 29.2899C36.4043 31.55 35.9595 33.7879 35.0947 35.876C34.2298 37.964 32.9622 39.8612 31.3638 41.4593C29.7657 43.0574 27.8685 44.3251 25.7804 45.19C23.6925 46.0549 21.4545 46.5 19.1945 46.5V29.2899H36.4043Z" fill="#A992DB"></path>
  <path d="M47.0156 14.422C47.0156 21.5586 41.23 27.344 34.0935 27.344H21.1716V14.422C21.1716 7.2854 26.957 1.5 34.0935 1.5C41.23 1.5 47.0156 7.2854 47.0156 14.422Z" fill="#FF7917"></path>
</svg>`;

export const LOADER_CSS = `
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
    transform: translateY(-12px) !important;
    pointer-events: none !important;
  }
  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .loader-icon {
    width: 96px;
    height: 96px;
    animation: loaderIconEntrance 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .loader-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    animation: loaderMetaEntrance 300ms ease-out 100ms forwards;
    opacity: 0;
  }
  .loader-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #94a3b8;
    font-family: Inter, system-ui, -apple-system, sans-serif;
  }
  .loader-bar-bg {
    width: 160px;
    height: 2px;
    background: #1e212e;
    border-radius: 9999px;
    overflow: hidden;
  }
  .loader-bar-fill {
    height: 100%;
    width: 100%;
    transform-origin: left;
    transform: scaleX(0.15);
    background: linear-gradient(90deg, #6366f1, #885cf5);
    transition: transform 250ms ease-out;
    border-radius: 9999px;
  }
  @keyframes loaderIconEntrance {
    from {
      opacity: 0;
      transform: scale(0.94);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes loaderMetaEntrance {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
`;

export const LOADER_INNER_HTML = `
  <div class="loader-content">
    ${LOADER_SVG}
    <div class="loader-meta">
      <p class="loader-label">${LOADER_LABEL}</p>
      <div class="loader-bar-bg">
        <div id="loader-progress-bar" class="loader-bar-fill"></div>
      </div>
    </div>
  </div>
`;

