import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { logo, menu, close } from "../../assets";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setToggle(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open & handle Escape
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setToggle(false);
          toggleButtonRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggle]);

  // Trap focus within mobile menu
  const handleMenuKeyDown = (e) => {
    if (e.key !== "Tab" || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll("a, button");
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
  };

  return (
    <header
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="w-full flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-16"
      >
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label="Prathamesh Chiddarwar Portfolio Home"
        >
          <img
            src={logo}
            alt="PC Logo"
            className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex flex-wrap items-center">
            Prathamesh
            <span className="sm:inline-block hidden ml-2 text-xs font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-secondary border border-white/5">
              Dev · Sec
            </span>
          </p>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-7" role="list">
            {navLinks.map((nav) => (
              <li key={nav.title}>
                <NavLink
                  to={nav.path}
                  end={nav.path === "/"}
                  className={({ isActive }) =>
                    `text-[15px] font-medium transition-colors duration-200 py-1 border-b-2 ${
                      isActive
                        ? "text-white border-[#6366f1]"
                        : "text-secondary hover:text-white border-transparent"
                    }`
                  }
                  aria-current={location.pathname === nav.path ? "page" : undefined}
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <a
            href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Prathamesh_Chiddarwar_Resume.pdf"
            className="inline-flex items-center justify-center min-h-[44px] px-5 text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-xl shadow-md shadow-[#6366f1]/20 transition-all hover:scale-[1.02]"
          >
            Resume
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setToggle(!toggle)}
            aria-expanded={toggle}
            aria-controls="mobile-navigation"
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          >
            <img
              src={toggle ? close : menu}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      </nav>

      {/* Accessible Mobile Drawer */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handleMenuKeyDown}
            className="md:hidden fixed top-[72px] left-0 w-full bg-[#050816]/98 backdrop-blur-xl border-b border-white/10 p-6 z-40 shadow-2xl"
          >
            <ul className="list-none flex flex-col gap-3" role="list">
              {navLinks.map((nav) => (
                <li key={nav.title}>
                  <NavLink
                    to={nav.path}
                    end={nav.path === "/"}
                    onClick={() => setToggle(false)}
                    className={({ isActive }) =>
                      `flex items-center min-h-[44px] px-4 py-2 rounded-lg text-[16px] font-medium transition-colors ${
                        isActive
                          ? "bg-[#6366f1]/20 text-white border-l-4 border-[#6366f1]"
                          : "text-secondary hover:text-white hover:bg-white/5"
                      }`
                    }
                    aria-current={location.pathname === nav.path ? "page" : undefined}
                  >
                    {nav.title}
                  </NavLink>
                </li>
              ))}
              <li className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Prathamesh_Chiddarwar_Resume.pdf"
                  onClick={() => setToggle(false)}
                  className="w-full flex items-center justify-center min-h-[44px] py-3 rounded-lg text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors"
                >
                  Download Resume (PDF)
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
