import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { acquireScrollLock, releaseScrollLock } from "../utils/scrollLock";
import { LOADER_ROUTES } from "./../constants/loaderConfig";

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
  const [appReady, setAppReady] = useState(false);
  const [heroKey, setHeroKey] = useState(0);
  const [replayProgress, setReplayProgress] = useState(0.15);
  const [isReplayExiting, setIsReplayExiting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const initialHandledRef = useRef(false);

  // 1. Initial Load Handler (Coordinates with inlined #app-loader in index.html)
  useEffect(() => {
    if (initialHandledRef.current) return;
    initialHandledRef.current = true;

    if (typeof document === "undefined") return;

    const loaderEl = document.getElementById("app-loader");
    const progressBar = document.getElementById("loader-progress-bar");
    const rootEl = document.getElementById("root");

    const isSkipped =
      !loaderEl ||
      document.documentElement.classList.contains("loader-skip");

    if (isSkipped) {
      if (loaderEl) loaderEl.remove();
      setAppReady(true);
      document.documentElement.classList.add("app-ready");
      return;
    }

    // Loader is active for initial paint
    setIsLoading(true);
    setLoadingReason("initial");
    setAppReady(false);
    acquireScrollLock();

    if (rootEl) {
      rootEl.setAttribute("aria-hidden", "true");
      if ("inert" in rootEl) rootEl.inert = true;
    }

    const startTime = performance.now();
    let currentProgress = 0.15;
    let isExited = false;

    const setProgress = (val) => {
      if (val > currentProgress) {
        currentProgress = val;
        if (progressBar) {
          progressBar.style.transform = `scaleX(${val})`;
        }
      }
    };

    const finishInitial = () => {
      if (isExited) return;
      isExited = true;

      setProgress(1.0);

      const elapsed = performance.now() - startTime;
      const minDuration = 350;
      const remainingDelay = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        // Begin 400ms exit transition
        loaderEl.classList.add("loader-exiting");

        // Signal app entrance animations to trigger immediately as loader lifts
        setAppReady(true);
        document.documentElement.classList.add("app-ready");

        if (rootEl) {
          rootEl.removeAttribute("aria-hidden");
          if ("inert" in rootEl) rootEl.inert = false;
        }
        releaseScrollLock();

        setTimeout(() => {
          if (loaderEl && loaderEl.parentNode) {
            loaderEl.remove();
          }
          setIsLoading(false);
          setLoadingReason(null);
        }, 420);
      }, remainingDelay);
    };

    // Real readiness signals
    setProgress(0.6);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => setProgress(0.85))
        .catch(() => {});
    }

    if (document.readyState === "complete") {
      finishInitial();
    } else {
      window.addEventListener("load", finishInitial, { once: true });
    }

    const hardCapTimer = setTimeout(finishInitial, 1200);

    return () => {
      clearTimeout(hardCapTimer);
      window.removeEventListener("load", finishInitial);
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

      // Lock scroll and root accessibility
      acquireScrollLock();
      const rootEl = document.getElementById("root");
      if (rootEl) {
        rootEl.setAttribute("aria-hidden", "true");
        if ("inert" in rootEl) rootEl.inert = true;
      }

      // Increment heroKey so only hero text entrance animation restarts on home
      setHeroKey((prev) => prev + 1);

      // Navigate to "/" immediately under the overlay
      const isAlreadyOnHome = location.pathname === "/";
      navigate("/", { replace: isAlreadyOnHome });
      window.scrollTo({ top: 0, behavior: "auto" });

      const startTime = performance.now();
      const p1 = setTimeout(() => setReplayProgress(0.6), 180);
      const p2 = setTimeout(() => setReplayProgress(0.9), 380);

      const finishReplay = () => {
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

          if (rootEl) {
            rootEl.removeAttribute("aria-hidden");
            if ("inert" in rootEl) rootEl.inert = false;
          }
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

      // Finish after guaranteed short sequence (min 600ms)
      const finishTimer = setTimeout(finishReplay, 550);

      return () => {
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(finishTimer);
        clearTimeout(hardCapTimer);
      };
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
