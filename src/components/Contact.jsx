import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import initEmailJS from "../utils/emailjs-init";

const Contact = () => {
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

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
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
      setErrorMessage("Please fill in all required fields.");
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
          setErrorMessage("Failed to send message via EmailJS. Please email directly at prathameshchiddarwar42@gmail.com.");
          console.error("EmailJS submission error:", error);
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
          noValidate
        >
          {/* Honeypot spam trap */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              ref={honeypotRef}
              type="text"
              name="honeypot_field"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name *</span>
            <input
              type='text'
              name='name'
              required
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#6366f1] font-medium transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email *</span>
            <input
              type='email'
              name='email'
              required
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#6366f1] font-medium transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message *</span>
            <textarea
              rows={7}
              name='message'
              required
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to discuss?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#6366f1] font-medium resize-y transition-colors'
            />
          </label>

          {status === "success" && (
            <div role="status" className="p-4 rounded-lg bg-green-900/30 border border-green-500 text-green-300 text-sm">
              Thank you! Your message has been sent successfully. I will get back to you shortly.
            </div>
          )}

          {status === "error" && (
            <div role="alert" className="p-4 rounded-lg bg-red-900/30 border border-red-500 text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#1d1836] transition-colors border border-white/10 disabled:opacity-50'
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
