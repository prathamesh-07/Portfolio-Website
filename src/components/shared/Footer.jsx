import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import Logo from "./Logo";
import { navLinks } from "../../constants";
import { IconGithub, IconLinkedin, IconMail, IconCopy, IconCheck, IconDownload } from "./Icons";

const EMAIL_ADDRESS = "prathameshchiddarwar42@gmail.com";
const RESUME_PATH = "/assets/Prathamesh_Chiddarwar_Resume.pdf";
const RESUME_NAME = "Prathamesh_Chiddarwar_Resume.pdf";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <footer
      className="w-full border-t text-sm"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-muted)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-10">

        {/* ── Desktop 12-col grid / Mobile stacked layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 items-start">

          {/* ══ Column A (Desktop 5 cols): Lockup + Plain sentence ══ */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              to="/"
              className="inline-block hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded-lg w-fit"
              aria-label="Prathamesh Chiddarwar, home"
            >
              <Logo variant="horizontal" tone="color" height={56} decorative={false} />
            </Link>

            <p className="text-[14px] leading-relaxed max-w-sm" style={{ color: "var(--text-muted)" }}>
              I build full-stack web applications and test how they hold up against attack.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span
                className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                  color: "var(--text-main)",
                  borderColor: "rgba(99, 102, 241, 0.3)",
                }}
              >
                Web Development
              </span>
              <span
                className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: "rgba(136, 92, 245, 0.12)",
                  color: "var(--text-main)",
                  borderColor: "rgba(136, 92, 245, 0.3)",
                }}
              >
                Cybersecurity
              </span>
            </div>
          </div>

          {/* ══ Mobile: 2-column pair for Pages and Connect ══ */}
          <div className="grid grid-cols-2 gap-8 lg:contents">

            {/* ══ Column B (Desktop 3 cols): Pages ══ */}
            <nav aria-label="Footer Pages" className="lg:col-span-3 flex flex-col gap-3">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-main)" }}
              >
                Pages
              </h3>
              <ul className="flex flex-col gap-1 list-none" role="list">
                {navLinks.map((nav) => (
                  <li key={nav.title}>
                    <Link
                      to={nav.path}
                      className="inline-flex items-center min-h-[44px] py-1 text-[14px] transition-colors hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ══ Column C (Desktop 4 cols): Connect ══ */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-main)" }}
              >
                Connect
              </h3>
              <ul className="flex flex-col gap-1 list-none" role="list">
                <li>
                  <a
                    href="https://github.com/prathamesh-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 min-h-[44px] py-1 text-[14px] transition-colors hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
                  >
                    <IconGithub size={16} />
                    <span>GitHub ↗</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://linkedin.com/in/prathamesh-chiddarwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 min-h-[44px] py-1 text-[14px] transition-colors hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
                  >
                    <IconLinkedin size={16} />
                    <span>LinkedIn ↗</span>
                  </a>
                </li>

                <li>
                  <div className="inline-flex items-center gap-2 min-h-[44px] py-1">
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="inline-flex items-center gap-2 text-[14px] transition-colors hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
                    >
                      <IconMail size={16} />
                      <span>Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)]"
                      style={{ color: copied ? "#4ade80" : "var(--text-muted)" }}
                      aria-label={copied ? "Email copied" : "Copy email address"}
                      title={copied ? "Copied!" : "Copy email address"}
                    >
                      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                      <span className="sr-only" aria-live="polite">
                        {copied ? "Email address copied to clipboard" : ""}
                      </span>
                    </button>
                  </div>
                </li>

                <li>
                  <a
                    href={RESUME_PATH}
                    download={RESUME_NAME}
                    className="inline-flex items-center gap-2 min-h-[44px] py-1 text-[14px] font-medium transition-colors hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
                    style={{ color: "var(--color-indigo)" }}
                  >
                    <IconDownload size={14} />
                    <span>Download resume (PDF) ⤓</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Understated CTA link to /contact above bottom bar ── */}
        <div className="pb-8 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-indigo)] rounded"
            style={{ color: "var(--color-indigo)" }}
          >
            <span>Get in touch</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── Bottom Bar: Copyright, Single-Color White Icon, Back to Top ── */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Left: Copyright */}
          <div className="flex items-center gap-3">
            <p>© {currentYear} Prathamesh Chiddarwar</p>
          </div>

          {/* Center / Right: White Logo Icon */}
          <div className="flex items-center gap-4">
            <Logo variant="icon" tone="white" height={24} decorative />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
