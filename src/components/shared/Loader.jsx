import { useEffect } from "react";
import { acquireScrollLock, releaseScrollLock } from "../../utils/scrollLock";

/**
 * Orchestrator for the critical first-visit loader.
 * The loader's HTML & critical CSS are inlined in index.html to ensure 0ms first-paint.
 * This component takes over the inlined DOM element `#app-loader`, tracks real readiness
 * (fonts, app mount, critical images, window load), enforces min 350ms / max 1200ms duration,
 * and performs a graceful 400ms exit transition with zero layout shift.
 */
const Loader = () => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const loaderEl = document.getElementById("app-loader");
    const progressBar = document.getElementById("loader-progress-bar");
    const rootEl = document.getElementById("root");

    // If loader is absent, already hidden, or skipped via <head> script
    if (!loaderEl || document.documentElement.classList.contains("loader-skip")) {
      try {
        sessionStorage.setItem("portfolio_visited", "true");
      } catch (e) {}
      if (loaderEl) loaderEl.remove();
      return;
    }

    const startTime = performance.now();
    let currentProgress = 0.15;
    let isExited = false;

    // Helper to safely advance progress (monotonically increasing)
    const setProgress = (value) => {
      if (value > currentProgress) {
        currentProgress = value;
        if (progressBar) {
          progressBar.style.transform = `scaleX(${value})`;
        }
      }
    };

    // Lock scroll and mark app root inert while loader is presented
    acquireScrollLock();
    if (rootEl) {
      rootEl.setAttribute("aria-hidden", "true");
      if ("inert" in rootEl) {
        rootEl.inert = true;
      }
    }

    const finish = () => {
      if (isExited) return;
      isExited = true;

      setProgress(1.0);

      const elapsed = performance.now() - startTime;
      const minDuration = 350;
      const remainingDelay = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        // Trigger exit animation: 400ms fade and subtle lift
        loaderEl.classList.add("loader-exiting");

        // Unlock root accessibility and scroll
        if (rootEl) {
          rootEl.removeAttribute("aria-hidden");
          if ("inert" in rootEl) {
            rootEl.inert = false;
          }
        }
        releaseScrollLock();

        try {
          sessionStorage.setItem("portfolio_visited", "true");
        } catch (e) {}

        // Complete DOM removal after CSS transition ends
        setTimeout(() => {
          if (loaderEl && loaderEl.parentNode) {
            loaderEl.remove();
          }
        }, 420);
      }, remainingDelay);
    };

    // Real readiness tracking:
    // 1. App mounted in React
    setProgress(0.6);

    // 2. Web fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setProgress(0.85);
      }).catch(() => {});
    }

    // 3. Document / window load or hero image decode
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // 4. Hard cap failsafe at 1200ms
    const hardCapTimer = setTimeout(finish, 1200);

    // 5. Handle back/forward cache navigation
    const handlePageShow = (e) => {
      if (e.persisted) {
        if (loaderEl && loaderEl.parentNode) loaderEl.remove();
        releaseScrollLock();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimeout(hardCapTimer);
      window.removeEventListener("load", finish);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
};

export default Loader;
