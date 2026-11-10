import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { navLinks } from "../../constants";
import { IconGithub, IconLinkedin, IconMail, IconCopy, IconCheck, IconDownload } from "./Icons";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("prathameshchiddarwar42@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050816] border-t border-white/10 pt-16 pb-12 text-secondary">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Dual Track Positioning */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo variant="horizontal" tone="color" height={56} decorative={false} />
            </Link>
            <p className="text-secondary text-sm max-w-md leading-relaxed mt-1">
              Full-stack developer and cybersecurity student. Building secure, production-grade web applications and researching AI-driven security threats.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30 font-medium">
                Web Development
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30 font-medium">
                Cybersecurity
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map((nav) => (
                <li key={nav.title}>
                  <Link
                    to={nav.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Prathamesh_Chiddarwar_Resume.pdf"
                  className="inline-flex items-center gap-1.5 text-sm text-[#6366f1] hover:text-[#a5b4fc] transition-colors"
                >
                  <IconDownload size={14} />
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">
              Connect
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              <li>
                <a
                  href="https://github.com/prathamesh-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <IconGithub size={16} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/prathamesh-chiddarwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <IconLinkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm">
                  <a
                    href="mailto:prathameshchiddarwar42@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <IconMail size={16} />
                    <span>Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-white/10 text-secondary hover:text-white transition-colors"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied!" : "Copy email"}
                  >
                    {copied ? <IconCheck size={14} className="text-green-400" /> : <IconCopy size={14} />}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <div className="flex items-center gap-2.5">
            <Logo variant="icon" tone="white" height={22} decorative />
            <p>© {currentYear} Prathamesh Chiddarwar. All rights reserved.</p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
