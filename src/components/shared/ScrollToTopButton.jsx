import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsVisible(scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });

    // Move keyboard focus to top landmark/heading for accessibility
    setTimeout(() => {
      const topTarget =
        document.querySelector("#main-content") ||
        document.querySelector("h1") ||
        document.querySelector(".skip-link");

      if (topTarget) {
        topTarget.setAttribute("tabindex", "-1");
        topTarget.focus({ preventScroll: true });
      }
    }, shouldReduceMotion ? 0 : 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 hover:border-[var(--color-indigo)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
          style={{
            backgroundColor: "rgba(11, 16, 48, 0.88)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-main)",
            boxShadow: "0 8px 24px -4px rgba(5, 8, 22, 0.8), 0 0 16px -2px rgba(99, 102, 241, 0.25)",
          }}
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;

