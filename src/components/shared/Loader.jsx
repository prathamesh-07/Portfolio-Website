import React, { useState, useEffect } from "react";
import Logo from "./Logo";

const Loader = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    // Skip if user visited in current session
    if (sessionStorage.getItem("portfolio_loaded")) return false;
    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  });
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!show) return;

    // Simulate progress tied to initial lifecycle
    const pTimer = setTimeout(() => setProgress(75), 250);
    const completeTimer = setTimeout(() => setProgress(100), 650);

    const finish = () => {
      setProgress(100);
      setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("portfolio_loaded", "true");
        }, 300);
      }, 200);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Hard cap of 1200ms
    const hardCapTimer = setTimeout(finish, 1200);

    return () => {
      clearTimeout(pTimer);
      clearTimeout(completeTimer);
      clearTimeout(hardCapTimer);
      window.removeEventListener("load", finish);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816] transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Brand Icon (96px, priority) */}
        <div className="relative flex items-center justify-center p-2 rounded-2xl bg-[#050816] shadow-2xl shadow-[#6366f1]/20">
          <Logo
            variant="icon"
            tone="color"
            width={96}
            height={96}
            priority
            decorative
            className="animate-pulse"
          />
        </div>

        {/* Two-word/two-track label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-secondary">
          <span className="text-[#6366f1]">Web Development</span>
          <span className="text-white/40">·</span>
          <span className="text-[#8b5cf6]">Cybersecurity</span>
        </div>

        {/* Thin progress line */}
        <div className="w-48 h-1 bg-[#151030] rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;

