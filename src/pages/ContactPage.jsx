import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import initEmailJS from "../utils/emailjs-init";
import {
  IconMail,
  IconGithub,
  IconLinkedin,
  IconCopy,
  IconCheck,
  IconDownload,
  IconArrowRight,
} from "../components/shared/Icons";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  bg:      "var(--bg-primary)",
  surface: "var(--bg-surface-raised)",
  border:  "var(--border-subtle)",
  indigo:  "var(--color-indigo)",
  violet:  "var(--color-violet)",
  muted:   "var(--text-muted)",
  main:    "var(--text-main)",
};

/* ─── Field-level inline validation ─────────────────────────────────────── */
const FieldError = ({ message }) =>
  message ? (
    <p role="alert" className="text-xs mt-1.5" style={{ color: "#f87171" }}>
      {message}
    </p>
  ) : null;

/* ─── Contact page ───────────────────────────────────────────────────────── */
const ContactPage = () => {
  const formRef     = useRef();
  const honeypotRef = useRef();
  const shouldReduce = useReducedMotion();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState(null); // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied]     = useState(false);

  useEffect(() => {
    document.title = "Contact | Prathamesh Chiddarwar — Full-Stack & Cyber Security";
    window.scrollTo(0, 0);
    initEmailJS();
  }, []);

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (status) setStatus(null);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("prathameshchiddarwar42@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API not available — silent fail */
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim())    errors.name    = "Name is required.";
    if (!form.email.trim())   errors.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email address.";
    if (!form.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Honeypot check */
    if (honeypotRef.current?.value) return;

    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          to_name:    "Prathamesh",
          from_email: form.email,
          to_email:   "prathameshchiddarwar42@gmail.com",
          message:    form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
          setFieldErrors({});
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          setErrorMessage(
            "Failed to send via EmailJS. Write directly to prathameshchiddarwar42@gmail.com."
          );
          console.error("EmailJS error:", error);
        }
      );
  };

  /* ── Direct link rows ── */
  const channels = [
    {
      icon: <IconMail size={16} />,
      label: "Email",
      display: "prathameshchiddarwar42@gmail.com",
      href: "mailto:prathameshchiddarwar42@gmail.com",
      action: (
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label={copied ? "Email copied" : "Copy email address"}
          className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
          style={{
            background: copied ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
            color: copied ? "#4ade80" : "var(--text-muted)",
            border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : T.border}`,
          }}
        >
          {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      ),
    },
    {
      icon: <IconLinkedin size={16} />,
      label: "LinkedIn",
      display: "prathamesh-chiddarwar",
      href: "https://linkedin.com/in/prathamesh-chiddarwar",
    },
    {
      icon: <IconGithub size={16} />,
      label: "GitHub",
      display: "prathamesh-07",
      href: "https://github.com/prathamesh-07",
    },
  ];

  /* ── Entry animations ── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      className="relative min-h-screen flex flex-col pt-20"
      style={{ background: T.bg, color: "var(--text-main)" }}
    >
      {/* Static ambient radial background */}
      <div
        className="bg-ambient-radial fixed inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-10 py-16 sm:py-24">

        {/* 12-col grid: left 5, right 7 — stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-10">

            {/* Statement */}
            <motion.div {...fadeUp(0)}>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--color-indigo)" }}
              >
                Contact
              </p>
              <h1
                className="font-black leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
                  color: "var(--text-main)",
                }}
              >
                Let's build secure,<br />
                scalable web<br />
                applications.
              </h1>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Open for software engineering roles and cybersecurity research.
              </p>
            </motion.div>

            {/* Direct channels */}
            <motion.div {...fadeUp(0.08)}>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Direct Channels
              </p>

              <ul className="flex flex-col gap-1" role="list">
                {channels.map((ch) => (
                  <li
                    key={ch.label}
                    className="flex items-center justify-between gap-3 py-3"
                    style={{ borderBottom: `1px solid ${T.border}` }}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span style={{ color: "var(--color-indigo)" }} aria-hidden="true">
                        {ch.icon}
                      </span>
                      <div className="overflow-hidden">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider block"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {ch.label}
                        </span>
                        <a
                          href={ch.href}
                          target={ch.href.startsWith("http") ? "_blank" : undefined}
                          rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium truncate block hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
                          style={{ color: "var(--text-main)" }}
                        >
                          {ch.display}
                        </a>
                      </div>
                    </div>
                    {ch.action ?? (
                      <a
                        href={ch.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
                        aria-label={`Open ${ch.label}`}
                        style={{ color: "var(--text-muted)" }}
                      >
                        <IconArrowRight size={14} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resume download — quiet text link */}
            <motion.div {...fadeUp(0.14)}>
              <a
                href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Prathamesh_Chiddarwar_Resume.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded transition-opacity hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                <IconDownload size={14} />
                Download Resume PDF
              </a>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN — form card ══════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.12)}
            className="lg:col-span-7"
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              <h2
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-main)" }}
              >
                Send a Message
              </h2>
              <p
                className="text-xs mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                Delivered via EmailJS. I typically reply within 48 hours.
              </p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Honeypot */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="contact_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Your Name <span aria-hidden="true" style={{ color: "var(--color-indigo)" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    style={{
                      background: "var(--bg-primary)",
                      border: `1px solid ${fieldErrors.name ? "#f87171" : T.border}`,
                      color: "var(--text-main)",
                    }}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email Address <span aria-hidden="true" style={{ color: "var(--color-indigo)" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    style={{
                      background: "var(--bg-primary)",
                      border: `1px solid ${fieldErrors.email ? "#f87171" : T.border}`,
                      color: "var(--text-main)",
                    }}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Message <span aria-hidden="true" style={{ color: "var(--color-indigo)" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or inquiry..."
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl text-sm resize-y transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    style={{
                      background: "var(--bg-primary)",
                      border: `1px solid ${fieldErrors.message ? "#f87171" : T.border}`,
                      color: "var(--text-main)",
                    }}
                  />
                  <FieldError message={fieldErrors.message} />
                </div>

                {/* Submit button — morphs on success */}
                {status === "success" ? (
                  <div className="flex flex-col gap-3">
                    <div
                      role="status"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                      style={{
                        background: "rgba(74,222,128,0.08)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        color: "#4ade80",
                      }}
                    >
                      <IconCheck size={16} />
                      Message sent — I'll reply within 48 hours.
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus(null)}
                      className="text-xs underline self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    {status === "error" && (
                      <p
                        role="alert"
                        className="text-xs px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(248,113,113,0.08)",
                          border: "1px solid rgba(248,113,113,0.3)",
                          color: "#f87171",
                        }}
                      >
                        {errorMessage}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                      style={{ background: "var(--color-indigo)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin mr-2"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
