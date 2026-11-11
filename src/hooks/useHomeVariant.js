import { useState, useEffect } from "react";

function checkWebGL2() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch (e) {
    return false;
  }
}

function getUrlOverride() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const homeParam = params.get("home");
    if (homeParam === "3d") return "3d";
    if (homeParam === "lite") return "lite";
  } catch (e) {
    // Ignore URL parsing errors
  }
  return null;
}

export function evaluateIs3D() {
  if (typeof window === "undefined") return false;

  const override = getUrlOverride();
  if (override === "3d") return true;
  if (override === "lite") return false;

  // 1. Viewport width at least 1024 px
  const hasMinDesktopWidth = window.innerWidth >= 1024;

  // 2. (hover: hover) and (pointer: fine) — touch tablets, even large ones, get LITE
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // 3. prefers-reduced-motion is not "reduce"
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 4. navigator.connection.saveData is not true
  const isSaveData = Boolean(
    navigator.connection && navigator.connection.saveData === true
  );

  // 5. deviceMemory is undefined or >= 4
  const hasAdequateMemory =
    navigator.deviceMemory === undefined || navigator.deviceMemory >= 4;

  // 6. hardwareConcurrency is undefined or >= 4
  const hasAdequateCores =
    navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency >= 4;

  // 7. WebGL2 is available (tested via canvas.getContext('webgl2'))
  const hasWebGL2 = checkWebGL2();

  return (
    hasMinDesktopWidth &&
    isFinePointer &&
    !isReducedMotion &&
    !isSaveData &&
    hasAdequateMemory &&
    hasAdequateCores &&
    hasWebGL2
  );
}

export default function useHomeVariant() {
  // Synchronous initial state resolution on first render
  const [is3D, setIs3D] = useState(() => evaluateIs3D());

  useEffect(() => {
    let timer = null;
    const handleResizeOrChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIs3D(evaluateIs3D());
      }, 250);
    };

    window.addEventListener("resize", handleResizeOrChange);
    window.addEventListener("orientationchange", handleResizeOrChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResizeOrChange);
      window.removeEventListener("orientationchange", handleResizeOrChange);
    };
  }, []);

  return { is3D, variant: is3D ? "desktop-3d" : "mobile-lite" };
}
