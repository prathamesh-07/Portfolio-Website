import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import initEmailJS from "../utils/emailjs-init";
import { IconMail, IconGithub, IconLinkedin, IconCopy, IconCheck, IconDownload } from "../components/shared/Icons";

const ContactPage = () => {
  const formRef = useRef();
  const honeypotRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Contact | Prathamesh Chiddarwar — Full-Stack & Cyber Security";
    window.scrollTo(0, 0);
    initEmailJS();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (status) setStatus(null);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("prathameshchiddarwar42@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot spam field check
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
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          setErrorMessage("Failed to send message via EmailJS. Please write directly to prathameshchiddarwar42@gmail.com.");
          console.error("EmailJS submission error:", error);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-16 py-12 w-full">
        {/* Header Breadcrumb */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-2">
            <span>Inquiries</span>
            <span className="text-secondary">/</span>
            <span className="text-secondary">Get in touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact
          </h1>
          <p className="mt-2 text-secondary text-base max-w-2xl leading-relaxed">
            Open to software engineering roles, security research collaboration, and technical inquiries.
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Form Tile (Span 7) */}
          <section
            aria-labelledby="contact-form-title"
            className="md:col-span-7 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between"
          >
            <div>
              <h2 id="contact-form-title" className="text-xl sm:text-2xl font-bold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-secondary text-sm mb-6">
                Connected to original EmailJS delivery pipeline. Fill out the form below or email directly.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot Spam Trap */}
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
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#100d25] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-secondary/60 focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full bg-[#100d25] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-secondary/60 focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or inquiry..."
                    className="w-full bg-[#100d25] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-secondary/60 focus:outline-none focus:border-[#6366f1] transition-colors resize-y"
                  />
                </div>

                {status === "success" && (
                  <div role="status" className="p-4 rounded-xl bg-green-900/30 border border-green-500 text-green-300 text-sm">
                    Thank you! Your message has been sent successfully. I will get back to you shortly.
                  </div>
                )}

                {status === "error" && (
                  <div role="alert" className="p-4 rounded-xl bg-red-900/30 border border-red-500 text-red-300 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-xl text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-md shadow-[#6366f1]/20 transition-all disabled:opacity-50"
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>

          {/* Direct Channels & Details (Span 5) */}
          <section
            aria-labelledby="direct-channels-title"
            className="md:col-span-5 space-y-6"
          >
            {/* Direct Links Tile */}
            <div className="bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card">
              <h2 id="direct-channels-title" className="text-xl font-bold text-white mb-4">
                Direct Channels
              </h2>

              <ul className="space-y-4" role="list">
                {/* Email with copy */}
                <li className="p-3.5 rounded-xl bg-[#100d25] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="p-2 rounded-lg bg-[#6366f1]/20 text-[#6366f1]">
                      <IconMail size={16} />
                    </span>
                    <div className="truncate">
                      <span className="text-[11px] text-secondary uppercase tracking-wider block">Email</span>
                      <a
                        href="mailto:prathameshchiddarwar42@gmail.com"
                        className="text-xs sm:text-sm text-white font-medium hover:text-[#6366f1] truncate block"
                      >
                        prathameshchiddarwar42@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex-shrink-0"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied!" : "Copy email"}
                  >
                    {copied ? <IconCheck size={16} className="text-green-400" /> : <IconCopy size={16} />}
                  </button>
                </li>

                {/* LinkedIn */}
                <li className="p-3.5 rounded-xl bg-[#100d25] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#6366f1]/20 text-[#6366f1]">
                      <IconLinkedin size={16} />
                    </span>
                    <div>
                      <span className="text-[11px] text-secondary uppercase tracking-wider block">LinkedIn</span>
                      <span className="text-xs sm:text-sm text-white font-medium">prathamesh-chiddarwar</span>
                    </div>
                  </div>
                  <a
                    href="https://linkedin.com/in/prathamesh-chiddarwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#6366f1] hover:underline px-2 py-1"
                  >
                    Connect →
                  </a>
                </li>

                {/* GitHub */}
                <li className="p-3.5 rounded-xl bg-[#100d25] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#6366f1]/20 text-[#6366f1]">
                      <IconGithub size={16} />
                    </span>
                    <div>
                      <span className="text-[11px] text-secondary uppercase tracking-wider block">GitHub</span>
                      <span className="text-xs sm:text-sm text-white font-medium">prathamesh-07</span>
                    </div>
                  </div>
                  <a
                    href="https://github.com/prathamesh-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#6366f1] hover:underline px-2 py-1"
                  >
                    Follow →
                  </a>
                </li>
              </ul>
            </div>

            {/* Location & Resume Tile */}
            <div className="bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Location</span>
                <p className="text-sm font-medium text-white mt-0.5">Pune, Maharashtra, India (IST / UTC+5:30)</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Phone Number</span>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                  Omitted from public view for security & privacy. Included directly inside the verified resume PDF.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Prathamesh_Chiddarwar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#100d25] border border-white/10 hover:border-[#6366f1] transition-all"
                >
                  <IconDownload size={15} />
                  <span>Download Verified Resume</span>
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

