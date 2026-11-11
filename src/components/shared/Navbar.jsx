import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";

import Logo from "./Logo";
import { navLinks } from "../../constants";
import { IconGithub, IconLinkedin, IconMail } from "./Icons";
import { acquireScrollLock, releaseScrollLock } from "../../utils/scrollLock";

const RESUME_PATH = "/assets/Prathamesh_Chiddarwar_Resume.pdf";
const RESUME_NAME = "Prathamesh_Chiddarwar_Resume.pdf";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const sentinelRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // Scroll Progress Bar (Universal spring progress line)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. IntersectionObserver Sentinel for scroll detection (> 8px)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [0, 1], rootMargin: "0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // 2. Mobile Hide on Scroll Down / Show on Scroll Up (<= 767px)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScrollDirection = () => {
      // Never hide while menu is open or on desktop
      if (isMenuOpen || window.innerWidth > 767) {
        setIsHeaderHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;

      if (currentScrollY > 100 && currentScrollY > prevScrollY + 8) {
        // Scrolling down past threshold -> hide
        setIsHeaderHidden(true);
      } else if (currentScrollY < prevScrollY - 8 || currentScrollY < 50) {
        // Scrolling up or near top -> show
        setIsHeaderHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, [isMenuOpen, shouldReduceMotion]);

  // 3. Auto-close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 4. Auto-close menu on viewport resize > 1023px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // 5. Scroll lock & focus management when mobile menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      acquireScrollLock();

      // Focus first focusable link in drawer
      requestAnimationFrame(() => {
        const firstFocusable = drawerRef.current?.querySelector("a, button");
        firstFocusable?.focus();
      });

      // Escape key handler
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        releaseScrollLock();
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Focus restoration on menu close
      if (document.activeElement && drawerRef.current?.contains(document.activeElement)) {
        menuButtonRef.current?.focus();
      }
    }
  }, [isMenuOpen]);

  // 6. Keyboard Focus Trap within Mobile Menu
  const handleDrawerKeyDown = useCallback((e) => {
    if (e.key !== "Tab" || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      {/* Scroll detection sentinel (positioned 8px from page top) */}
      <div
        ref={sentinelRef}
        className="absolute top-0 left-0 w-full h-[8px] pointer-events-none -z-50"
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-200 ${
          isHeaderHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          zIndex: "var(--z-header)",
          height: isScrolled ? "var(--header-h-scrolled)" : "var(--header-h)",
          backgroundColor: isScrolled
            ? "rgba(5, 8, 22, 0.92)"
            : isMenuOpen
            ? "var(--bg-primary)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
          boxShadow: isScrolled ? "0 4px 20px -2px rgba(5, 8, 22, 0.7)" : "none",
        }}
      >
        <nav
          aria-label="Primary"
          className="w-full h-full max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between"
        >
          {/* ── Left: Identity Lockup ── */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded-lg p-1 -ml-1 transition-transform"
            aria-label="Prathamesh Chiddarwar, home"
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
              }
            }}
          >
            <div className="w-[36px] sm:w-[38px] h-[36px] sm:h-[38px] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
              <Logo variant="icon" tone="color" height={38} decorative priority />
            </div>

            <div className="flex items-center gap-2">
              <span
                className="font-bold text-[16px] sm:text-[17px] tracking-tight transition-colors"
                style={{ color: "var(--text-main)" }}
              >
                <span className="hidden sm:inline">Prathamesh Chiddarwar</span>
                <span className="sm:hidden">Prathamesh</span>
              </span>

              {/* Dev · Sec Badge (Hidden below 480px per brief) */}
              <span
                className="hidden min-[480px]:inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  color: "var(--text-muted)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                Dev · Sec
              </span>
            </div>
          </Link>

          {/* ── Center / Right: Desktop Navigation Links (>= 1024px) ── */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-1 sm:gap-2 list-none" role="list">
              {navLinks.map((nav) => (
                <li key={nav.title} className="relative">
                  <NavLink
                    to={nav.path}
                    end={nav.path === "/"}
                    className={({ isActive }) =>
                      `relative inline-flex items-center px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] ${
                        isActive
                          ? "text-[var(--text-main)] font-semibold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{nav.title}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, var(--color-indigo), var(--color-violet))",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                              duration: shouldReduceMotion ? 0 : 0.25,
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            <a
              href={RESUME_PATH}
              download={RESUME_NAME}
              className="inline-flex items-center justify-center min-h-[44px] px-5 text-[14px] font-semibold text-white rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
              style={{
                backgroundColor: "var(--color-indigo)",
                boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.28)",
              }}
            >
              Resume
            </a>
          </div>

          {/* ── Mobile / Tablet Menu Button (< 1024px) ── */}
          <div className="lg:hidden flex items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Morphing Hamburger to X */}
              <div className="w-5 h-4 relative flex flex-col justify-between" aria-hidden="true">
                <span
                  className={`h-[2px] w-full rounded-full transition-all duration-300 transform origin-left ${
                    isMenuOpen
                      ? "rotate-45 translate-x-0.5 -translate-y-0.5"
                      : ""
                  }`}
                  style={{ backgroundColor: "var(--text-main)" }}
                />
                <span
                  className={`h-[2px] w-full rounded-full transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ backgroundColor: "var(--text-main)" }}
                />
                <span
                  className={`h-[2px] w-full rounded-full transition-all duration-300 transform origin-left ${
                    isMenuOpen
                      ? "-rotate-45 translate-x-0.5 translate-y-0.5"
                      : ""
                  }`}
                  style={{ backgroundColor: "var(--text-main)" }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* 2px Scroll Progress Line pinned along header bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX,
            background:
              "linear-gradient(90deg, var(--color-indigo), var(--color-violet))",
          }}
          aria-hidden="true"
        />
      </header>

      {/* ── Mobile Navigation Drawer (< 1024px) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 flex"
            style={{ zIndex: "var(--z-mobile-menu)" }}
          >
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0"
              style={{
                backgroundColor: "rgba(5, 8, 22, 0.72)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Right Drawer Panel */}
            <motion.div
              id="mobile-navigation-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              onKeyDown={handleDrawerKeyDown}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: "100%", opacity: 0.7 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { x: 0, opacity: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: "100%", opacity: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative ml-auto w-full max-w-sm h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto border-l shadow-2xl"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Header inside drawer with close button */}
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  <div className="flex items-center gap-3">
                    <Logo variant="icon" tone="color" height={32} decorative />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight" style={{ color: "var(--text-main)" }}>
                        Prathamesh Chiddarwar
                      </span>
                      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                        Web Dev · Cybersecurity
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-muted)",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Staggered Navigation Links (01 to 04) */}
                <ul className="flex flex-col gap-2 list-none" role="list">
                  {navLinks.map((nav, idx) => {
                    const isCurrent = location.pathname === nav.path;
                    const indexStr = String(idx + 1).padStart(2, "0");

                    return (
                      <motion.li
                        key={nav.title}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : idx * 0.04,
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <NavLink
                          to={nav.path}
                          end={nav.path === "/"}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `flex items-center justify-between min-h-[56px] px-4 rounded-xl text-[16px] font-medium transition-colors border ${
                              isActive
                                ? "font-semibold"
                                : "hover:text-[var(--text-main)]"
                            }`
                          }
                          style={({ isActive }) => ({
                            backgroundColor: isActive
                              ? "var(--bg-surface)"
                              : "transparent",
                            borderColor: isActive
                              ? "var(--color-indigo)"
                              : "transparent",
                            color: isActive
                              ? "var(--text-main)"
                              : "var(--text-muted)",
                          })}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="font-mono text-xs font-semibold"
                              style={{ color: "var(--color-indigo)" }}
                            >
                              {indexStr}
                            </span>
                            <span>{nav.title}</span>
                          </div>

                          {isCurrent && (
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "rgba(99, 102, 241, 0.16)",
                                color: "var(--color-indigo)",
                              }}
                            >
                              Current
                            </span>
                          )}
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Drawer Bottom: Resume CTA + Social Row */}
              <div className="pt-6 mt-8 border-t flex flex-col gap-5" style={{ borderColor: "var(--border-subtle)" }}>
                {/* Full-width Resume button (48px tall) */}
                <a
                  href={RESUME_PATH}
                  download={RESUME_NAME}
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold text-white rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                  style={{
                    backgroundColor: "var(--color-indigo)",
                    boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.32)",
                  }}
                >
                  Download Resume (PDF)
                </a>

                {/* Social icons row (each tap target >= 44x44) */}
                <div className="flex items-center justify-around py-1">
                  <a
                    href="https://github.com/prathamesh-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-sm transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="GitHub profile"
                  >
                    <IconGithub size={20} />
                  </a>

                  <a
                    href="https://linkedin.com/in/prathamesh-chiddarwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-sm transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="LinkedIn profile"
                  >
                    <IconLinkedin size={20} />
                  </a>

                  <a
                    href="mailto:prathameshchiddarwar42@gmail.com"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-sm transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="Send email"
                  >
                    <IconMail size={20} />
                  </a>
                </div>

                <p className="text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
                  © {new Date().getFullYear()} Prathamesh Chiddarwar
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
