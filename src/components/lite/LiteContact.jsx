import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import initEmailJS from "../../utils/emailjs-init";
import { styles } from "../../styles";
import { IconMail, IconCheck, IconArrowRight } from "../shared/Icons";

const LiteContact = () => {
  const formRef = useRef();
  const honeypotRef = useRef();
  const shouldReduce = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check for spam bots
    if (honeypotRef.current && honeypotRef.current.value) {
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Prathamesh",
          from_email: form.email,
          to_email: "prathameshchiddarwar42@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          setErrorMessage(
            "Failed to send message via EmailJS. Please write directly to prathameshchiddarwar42@gmail.com."
          );
          console.error("EmailJS submission error:", error);
        }
      );
  };

  return (
    <section id="contact" className="relative z-10 py-16 px-6 sm:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Form Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-[#0b1030] p-6 sm:p-10 rounded-3xl border border-[#1e212e] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h2 className={styles.sectionHeadText}>Contact.</h2>
          <p className="text-[#94a3b8] text-sm mt-2 mb-8 leading-relaxed">
            Open to software engineering roles, security research collaboration, and technical inquiries.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot spam trap */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                ref={honeypotRef}
                type="text"
                name="contact_honeypot"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="lite-contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Your Name <span className="text-[#6366f1]">*</span>
              </label>
              <input
                id="lite-contact-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="w-full bg-[#050816] border border-[#1e212e] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lite-contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Your Email <span className="text-[#6366f1]">*</span>
              </label>
              <input
                id="lite-contact-email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="w-full bg-[#050816] border border-[#1e212e] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lite-contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Your Message <span className="text-[#6366f1]">*</span>
              </label>
              <textarea
                id="lite-contact-message"
                rows={5}
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className="w-full bg-[#050816] border border-[#1e212e] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-colors resize-y"
              />
            </div>

            {status === "success" && (
              <div role="status" className="p-4 rounded-xl bg-green-950/40 border border-green-500/40 text-green-300 text-sm flex items-center gap-2">
                <IconCheck size={18} className="text-green-400 shrink-0" />
                <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] active:scale-[0.97] shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <IconArrowRight size={14} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Lightweight CSS Glowing Orb Stage (Replaces 18MB WebGL Earth) */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[280px] sm:min-h-[340px]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #885cf5 0%, #6366f1 70%, transparent 100%)" }}
            aria-hidden="true"
          />

          {/* Planetary Orbital Graphic with pure CSS */}
          <div className="relative flex items-center justify-center w-52 h-52 sm:w-64 sm:h-64">
            {/* Outer Orbit Ring */}
            <div
              className="absolute inset-0 rounded-full border border-[#885cf5]/20 animate-spin"
              style={{ animationDuration: "24s" }}
              aria-hidden="true"
            >
              <div className="w-3 h-3 rounded-full bg-[#885cf5] absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#885cf5]" />
            </div>

            {/* Middle Orbit Ring */}
            <div
              className="absolute inset-6 rounded-full border border-[#6366f1]/25 border-dashed animate-spin"
              style={{ animationDuration: "16s", animationDirection: "reverse" }}
              aria-hidden="true"
            />

            {/* Glowing Center Core */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center p-4 text-center shadow-[0_0_40px_rgba(99,102,241,0.25)] border border-white/10"
              style={{
                background: "linear-gradient(135deg, #151030 0%, #0b1030 100%)",
              }}
            >
              <IconMail size={24} className="text-[#a5b4fc] mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Inquiries</span>
              <span className="text-[11px] font-semibold text-white mt-0.5">Let's Connect</span>
            </div>
          </div>

          <p className="text-center text-xs text-[#94a3b8] mt-6 max-w-xs leading-relaxed">
            Based in Pune, India (IST / UTC+5:30). Typically responsive within 24–48 hours.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default LiteContact;
