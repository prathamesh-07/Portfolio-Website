import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { IconDownload, IconArrowRight } from "../shared/Icons";
import { useLoader } from "../../context/LoaderContext";

import pcAvif480 from "../../assets/hero/hero-pc-480.avif";
import pcAvif720 from "../../assets/hero/hero-pc-720.avif";
import pcAvif960 from "../../assets/hero/hero-pc-960.avif";
import pcWebp480 from "../../assets/hero/hero-pc-480.webp";
import pcWebp720 from "../../assets/hero/hero-pc-720.webp";
import pcWebp960 from "../../assets/hero/hero-pc-960.webp";
import pcPng480  from "../../assets/hero/hero-pc-480.png";
import pcPng720  from "../../assets/hero/hero-pc-720.png";
import pcPng960  from "../../assets/hero/hero-pc-960.png";

const LiteHero = () => {
  const shouldReduce = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { appReady, heroKey } = useLoader();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dur = shouldReduce ? 0 : 0.5;
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      aria-label="Introduction & Hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden"
      style={{
        paddingTop: "calc(5.5rem + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* 2-column on tablet (>=768px), single column stacked on mobile (<768px) */}
      <div key={heroKey} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center my-auto z-10">
        
        {/* Left Column: Heading, Subtitle & Actions */}
        <div className="md:col-span-7 flex flex-row items-start gap-4 sm:gap-6">
          {/* Vertical Indigo Line & Dot Motif */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={appReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.45, ease }}
            className="flex flex-col justify-center items-center mt-2.5 origin-top shrink-0"
            aria-hidden="true"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#6366f1] shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            <div className="w-1 h-36 sm:h-56 md:h-72 accent-gradient rounded-full" />
          </motion.div>

          {/* Text Block */}
          <div className="flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={appReady ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduce ? 0 : 16 }}
              transition={{ duration: dur, delay: shouldReduce || !appReady ? 0 : 0.15, ease }}
              className="font-black text-white tracking-tight leading-[1.12]"
              style={{ fontSize: "clamp(2rem, 7.5vw, 4.25rem)" }}
            >
              Hi, I'm{" "}
              <span className="gradient-text whitespace-nowrap">
                Prathamesh
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur, delay: shouldReduce ? 0 : 0.28, ease }}
              className="text-[#dfd9ff] font-medium text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Full-Stack Developer &amp; Cyber Security Graduate (Class of 2026).
              I build production web applications and research AI-driven security threats.
            </motion.p>

            {/* Thumb-friendly CTAs (min-height 48px) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur, delay: shouldReduce ? 0 : 0.4, ease }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#works"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] active:scale-[0.97] transition-all shadow-[0_4px_16px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
              >
                <span>View Projects</span>
                <IconArrowRight size={15} />
              </a>

              <a
                href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Prathamesh_Chiddarwar_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl font-semibold text-sm text-[#e2e8f0] bg-[#111638] border border-white/10 hover:border-[#6366f1]/50 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
              >
                <IconDownload size={15} />
                <span>Resume</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Column / Stage: 3D Scene Pre-rendered Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.45, ease }}
          className="md:col-span-5 relative flex items-center justify-center w-full max-w-md mx-auto"
        >
          {/* Ambient soft glow background */}
          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{ background: "radial-gradient(circle, #6366f1 0%, #885cf5 60%, transparent 80%)" }}
            aria-hidden="true"
          />

          {/* Pre-rendered 3D Desk & PC Container with CSS Float */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center animate-hero-float">
            {/* Soft pulsing glow positioned over the CRT monitor screen area */}
            <div
              className="absolute top-[32%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-20 rounded-full blur-xl pointer-events-none animate-monitor-glow"
              style={{ background: "#a5b4fc" }}
              aria-hidden="true"
            />

            <picture className="w-full h-full flex items-center justify-center">
              {/* AVIF srcset */}
              <source
                type="image/avif"
                srcSet={`${pcAvif480} 480w, ${pcAvif720} 720w, ${pcAvif960} 960w`}
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 720px, 960px"
              />
              {/* WebP srcset */}
              <source
                type="image/webp"
                srcSet={`${pcWebp480} 480w, ${pcWebp720} 720w, ${pcWebp960} 960w`}
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 720px, 960px"
              />
              {/* PNG fallback */}
              <img
                src={pcPng720}
                srcSet={`${pcPng480} 480w, ${pcPng720} 720w, ${pcPng960} 960w`}
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 720px, 960px"
                alt="3D workstation setup with vintage desktop PC"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                style={{
                  WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 72%, transparent 100%)",
                  maskImage: "radial-gradient(circle at 50% 50%, black 72%, transparent 100%)",
                }}
              />
            </picture>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue at Bottom */}
      <motion.div
        animate={{ opacity: hasScrolled ? 0 : 0.8, y: hasScrolled ? 10 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full flex justify-center items-center pt-2 pb-2 pointer-events-none"
        aria-hidden="true"
      >
        <a href="#about" tabIndex={-1} className="flex flex-col items-center gap-1.5 opacity-70">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-[#94a3b8]/40 flex justify-center p-1">
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
              className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default LiteHero;
