import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { acquireScrollLock, releaseScrollLock } from "../utils/scrollLock";
import { LOADER_ROUTES, isRouteAllowed } from "../components/shared/loaderShared";

const LoaderContext = createContext({
  isLoading: false,
  loadingReason: null,
  appReady: true,
  heroKey: 0,
  play: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingReason, setLoadingReason] = useState(null);
  const [appReady, setAppReady] = useState(true); // Initialized to true for failsafe rendering
  const [heroKey, setHeroKey] = useState(0);
  const [replayProgress, setReplayProgress] = useState(0.15);
  const [isReplayExiting, setIsReplayExiting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initial Document Load Handler (Coordinates with inlined #app-loader in index.html)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const loaderEl = document.getElementById("app-loader");
    const progressBar = document.getElementById("loader-progress-bar");
    const rootEl = document.getElementById("root");

    // Clean up any lingering inert / aria-hidden attributes immediately
    const clearRootInert = () => {
      if (rootEl) {
        rootEl.removeAttribute("aria-hidden");
        rootEl.removeAttribute("inert");
        if ("inert" in rootEl) {
          rootEl.inert = false;
        }
      }
    };

    const isPathAllowed = isRouteAllowed(location.pathname, LOADER_ROUTES);

    const isSkipped =
      !loaderEl ||
      !isPathAllowed ||
      document.documentElement.classList.contains("loader-skip");

    if (isSkipped) {
      if (loaderEl) loaderEl.remove();
      clearRootInert();
      setAppReady(true);
      document.documentElement.classList.add("app-ready");
      return;
    }

    // Loader is actively displaying
    setIsLoading(true);
    setLoadingReason("initial");
    setAppReady(false);
    acquireScrollLock();

    let isFinished = false;
    const startTime = performance.now();

    const cleanupAndExit = () => {
      if (isFinished) return;
      isFinished = true;

      // 1. Instantly unfreeze the document and root
      clearRootInert();
      releaseScrollLock();

      // 2. Trigger hero animations to start as loader begins to lift
      setAppReady(true);
      document.documentElement.classList.add("app-ready");

      // 3. Begin CSS exit transition (opacity 0, translateY -12px)
      if (loaderEl) {
        loaderEl.classList.add("loader-exiting");
      }

      // 4. Remove loader from DOM after transition
      setTimeout(() => {
        if (loaderEl && loaderEl.parentNode) {
          loaderEl.remove();
        }
        setIsLoading(false);
        setLoadingReason(null);
      }, 420);
    };

    const finishInitial = () => {
      if (isFinished) return;

      if (progressBar) {
        progressBar.style.transform = "scaleX(1)";
      }

      const elapsed = performance.now() - startTime;
      const minDuration = 350;
      const remainingDelay = Math.max(0, minDuration - elapsed);

      setTimeout(cleanupAndExit, remainingDelay);
    };

    // Readiness signals
    if (progressBar) {
      progressBar.style.transform = "scaleX(0.6)";
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (!isFinished && progressBar) {
            progressBar.style.transform = "scaleX(0.85)";
          }
        })
        .catch(() => {});
    }

    if (document.readyState === "complete") {
      finishInitial();
    } else {
      window.addEventListener("load", finishInitial, { once: true });
    }

    // Hard cap failsafe at 1200ms
    const hardCapTimer = setTimeout(finishInitial, 1200);

    return () => {
      clearTimeout(hardCapTimer);
      window.removeEventListener("load", finishInitial);
      // If unmounted before finish (e.g. StrictMode cycle or navigation),
      // ensure page is NEVER left frozen or locked!
      if (!isFinished) {
        cleanupAndExit();
      }
    };
  }, []);

  // 2. Play method for replay triggers (e.g. Header Logo Click)
  const play = useCallback(
    (reason) => {
      // Prevent stacking on double-clicks or while active
      if (isLoading) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Under prefers-reduced-motion: skip loader completely
      if (prefersReducedMotion) {
        if (location.pathname !== "/") {
          navigate("/", { replace: false });
        }
        window.scrollTo({ top: 0, behavior: "auto" });
        const h1 = document.querySelector("h1");
        if (h1) {
          h1.setAttribute("tabindex", "-1");
          h1.focus({ preventScroll: true });
        }
        return;
      }

      setIsLoading(true);
      setLoadingReason(reason);
      setAppReady(false);
      setIsReplayExiting(false);
      setReplayProgress(0.2);

      // Lock scroll while overlay covers viewport
      acquireScrollLock();

      // Increment heroKey so only hero text entrance animation restarts on home
      setHeroKey((prev) => prev + 1);

      // Navigate to "/" immediately under the overlay
      const isAlreadyOnHome = location.pathname === "/";
      navigate("/", { replace: isAlreadyOnHome });
      window.scrollTo({ top: 0, behavior: "auto" });

      const startTime = performance.now();
      const p1 = setTimeout(() => setReplayProgress(0.6), 180);
      const p2 = setTimeout(() => setReplayProgress(0.9), 380);

      let isReplayFinished = false;

      const finishReplay = () => {
        if (isReplayFinished) return;
        isReplayFinished = true;
        clearTimeout(p1);
        clearTimeout(p2);
        setReplayProgress(1.0);
        const elapsed = performance.now() - startTime;
        const minDuration = 600; // Guaranteed 600ms visible time for logo replay
        const remainingDelay = Math.max(0, minDuration - elapsed);

        setTimeout(() => {
          // Trigger CSS exit transition
          setIsReplayExiting(true);

          // Hero entrance animations start now as loader begins to lift
          setAppReady(true);
          document.documentElement.classList.add("app-ready");

          releaseScrollLock();

          // Move focus to page's h1
          setTimeout(() => {
            const h1 = document.querySelector("h1");
            if (h1) {
              h1.setAttribute("tabindex", "-1");
              h1.focus({ preventScroll: true });
            }
          }, 50);

          setTimeout(() => {
            setIsLoading(false);
            setLoadingReason(null);
            setIsReplayExiting(false);
          }, 420);
        }, remainingDelay);
      };

      const hardCapTimer = setTimeout(finishReplay, 1200);
      const finishTimer = setTimeout(finishReplay, 550);
    },
    [isLoading, location.pathname, navigate]
  );

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        loadingReason,
        appReady,
        heroKey,
        isReplayExiting,
        replayProgress,
        play,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
