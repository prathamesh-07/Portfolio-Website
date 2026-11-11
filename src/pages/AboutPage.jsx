import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import {
  IconDownload,
  IconExternalLink,
  IconChevronRight,
  IconCode,
  IconShield,
  IconCheck,
} from "../components/shared/Icons";

import portraitAvif480  from "../assets/brand/portrait-4x5-480.avif";
import portraitAvif800  from "../assets/brand/portrait-4x5-800.avif";
import portraitAvif1200 from "../assets/brand/portrait-4x5-1200.avif";
import portraitWebp480  from "../assets/brand/portrait-4x5-480.webp";
import portraitWebp800  from "../assets/brand/portrait-4x5-800.webp";
import portraitWebp1200 from "../assets/brand/portrait-4x5-1200.webp";
import portraitJpg480   from "../assets/brand/portrait-4x5-480.jpg";
import portraitJpg800   from "../assets/brand/portrait-4x5-800.jpg";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  bg:          "var(--bg-primary)",
  surface:     "var(--bg-surface-raised)",
  border:      "var(--border-subtle)",
  indigo:      "var(--color-indigo)",
  violet:      "var(--color-violet)",
  muted:       "var(--text-muted)",
  main:        "var(--text-main)",
};

/* ─── Track pills (identical styling for both tracks) ───────────────────── */
const TrackPill = ({ track }) => {
  const isWeb = track === "web";
  return (
    <span
      style={{
        backgroundColor: isWeb ? "rgba(99,102,241,0.15)" : "rgba(136,92,245,0.15)",
        color:           isWeb ? "#a5b4fc" : "#c4b5fd",
        border:          `1px solid ${isWeb ? "rgba(99,102,241,0.3)" : "rgba(136,92,245,0.3)"}`,
      }}
      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
    >
      <span
        style={{ background: isWeb ? T.indigo : T.violet }}
        className="w-1.5 h-1.5 rounded-full"
      />
      {isWeb ? "Web Development" : "Cybersecurity"}
    </span>
  );
};

/* ─── Disclosure toggle (accordion) ─────────────────────────────────────── */
const Disclosure = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 text-[13px] font-semibold mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
        style={{ color: T.indigo }}
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.18 }}
        >
          <IconChevronRight size={14} />
        </motion.span>
        {label}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Chapter section wrapper ────────────────────────────────────────────── */
const Chapter = ({ id, num, heading, children, chapterRef }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.section
      ref={chapterRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 pb-16 border-b last:border-b-0"
      style={{ borderColor: T.border }}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span
          className="text-[11px] font-mono font-bold tracking-widest"
          style={{ color: T.indigo, minWidth: "2rem" }}
          aria-hidden="true"
        >
          {num}
        </span>
        <h2
          id={`${id}-heading`}
          className="text-xl sm:text-2xl font-bold"
          style={{ color: T.main }}
        >
          {heading}
        </h2>
      </div>
      {children}
    </motion.section>
  );
};

/* ─── Main page ─────────────────────────────────────────────────────────── */
const AboutPage = () => {
  const shouldReduce = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState("who");
  const [skillsTrack, setSkillsTrack] = useState("web");
  const [showAllSkills, setShowAllSkills] = useState(false);

  const chapterRefs = {
    who:   useRef(null),
    exp:   useRef(null),
    edu:   useRef(null),
    skills: useRef(null),
    certs:  useRef(null),
    next:   useRef(null),
  };

  const chapters = [
    { id: "who",    num: "01", label: "Who I Am" },
    { id: "exp",    num: "02", label: "Experience" },
    { id: "edu",    num: "03", label: "Education" },
    { id: "skills", num: "04", label: "Skills" },
    { id: "certs",  num: "05", label: "Certifications" },
    { id: "next",   num: "06", label: "Next Steps" },
  ];

  useEffect(() => {
    document.title = "About | Prathamesh Chiddarwar — Web Development & Cybersecurity";
    window.scrollTo(0, 0);
  }, []);

  /* Scroll-spy via IntersectionObserver */
  useEffect(() => {
    const observers = [];
    Object.entries(chapterRefs).forEach(([id, ref]) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(ref.current);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Skills data */
  const webSkills    = ["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "Express.js", "TailwindCSS", "React Native", "MongoDB", "MySQL", "Firebase", "AWS EC2", "AWS S3", "Vercel", "GCP"];
  const cyberSkills  = ["Vulnerability Assessment", "Penetration Testing", "Risk Assessment", "Wireshark", "Nmap", "Nessus", "Burp Suite", "Metasploit", "ISO 27001 (ISMS)", "ISO 9001 (QMS)", "RBAC Architecture", "CI/CD"];

  const activeSkills  = skillsTrack === "web" ? webSkills : cyberSkills;
  const visibleSkills = showAllSkills ? activeSkills : activeSkills.slice(0, 8);

  return (
    <div
      className="relative min-h-screen flex flex-col pt-20"
      style={{ background: T.bg, color: T.main }}
    >
      {/* Dot-grid background at 6% opacity */}
      <div
        className="pointer-events-none fixed inset-0 bg-dot-grid opacity-[0.06]"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      />

      <Navbar />

      <main className="relative z-10 flex-1 w-full" id="main-content">
        {/* ─── Page header ─── */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-10 pb-6">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block"
            style={{ color: T.indigo }}
          >
            Profile
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-none" style={{ color: T.main }}>
            About Me
          </h1>
          <p className="mt-3 text-base max-w-xl leading-relaxed" style={{ color: T.muted }}>
            Full-stack developer and cybersecurity graduate (Class of 2026).
            I build production web applications and research AI-driven security threats.
          </p>
        </div>

        {/* ─── Two-column layout ─── */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-20">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 items-start">

            {/* ─── LEFT: Sticky column ─── */}
            <aside
              className="hidden lg:block lg:sticky lg:top-28 self-start pb-10"
              aria-label="Page navigation"
            >
              {/* Portrait */}
              <div
                className="rounded-2xl overflow-hidden aspect-[4/5] mb-6 shadow-[0_8px_32px_-8px_rgba(136,92,245,0.3)]"
                style={{ border: `1px solid ${T.border}` }}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${portraitAvif480} 480w, ${portraitAvif800} 800w, ${portraitAvif1200} 1200w`}
                    sizes="280px"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${portraitWebp480} 480w, ${portraitWebp800} 800w, ${portraitWebp1200} 1200w`}
                    sizes="280px"
                  />
                  <img
                    src={portraitJpg800}
                    srcSet={`${portraitJpg480} 480w, ${portraitJpg800} 800w`}
                    sizes="280px"
                    alt="Prathamesh Chiddarwar"
                    width={280}
                    height={350}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 20%" }}
                  />
                </picture>
              </div>

              {/* Name & role */}
              <p className="text-base font-bold leading-tight" style={{ color: T.main }}>
                Prathamesh Chiddarwar
              </p>
              <p className="text-xs mt-1" style={{ color: T.muted }}>
                Full-Stack Developer · Cyber Security Researcher
              </p>

              {/* Chapter nav */}
              <nav
                className="mt-6"
                aria-label="Chapters on this page"
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                  style={{ color: T.muted }}
                >
                  On This Page
                </p>
                <ul className="space-y-0.5">
                  {chapters.map((ch) => {
                    const isActive = activeChapter === ch.id;
                    return (
                      <li key={ch.id}>
                        <a
                          href={`#${ch.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className="flex items-center gap-3 py-1.5 px-2 rounded-lg text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                          style={{
                            color:   isActive ? T.indigo : T.muted,
                            background: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                          }}
                        >
                          <span
                            className="font-mono text-[10px] font-bold w-6 shrink-0"
                            style={{ color: isActive ? T.indigo : T.border }}
                          >
                            {ch.num}
                          </span>
                          {ch.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* ─── RIGHT: Scrolling chapters ─── */}
            <div className="pt-8 lg:pt-0 space-y-0">

              {/* ── 01 WHO I AM ── */}
              <Chapter id="who" num="01" heading="Who I Am" chapterRef={chapterRefs.who}>
                <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: T.muted }}>
                  <p>
                    I am a Computer Science graduate (<strong style={{ color: T.main }}>Class of 2026</strong>) specializing in{" "}
                    <strong style={{ color: T.main }}>Cyber Security and Forensics</strong> at MIT World Peace University, Pune.
                    My work spans production full-stack engineering and peer-reviewed AI security research.
                  </p>
                  <p>
                    At <strong style={{ color: T.main }}>DelPat LLP</strong>, I engineered and shipped 6+ production web applications,
                    architected a role-based CMS with JWT authentication, and managed multi-environment cloud deployments
                    across AWS EC2, Vercel, and Firebase. In parallel, I authored{" "}
                    <strong style={{ color: T.main }}>two IEEE Xplore-published papers</strong> on AI-generated deepfake audio detection.
                  </p>
                </div>

                {/* Two equal tracks */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      track: "web",
                      icon: <IconCode size={16} />,
                      title: "Web Development",
                      desc: "Full-stack engineering from architecture through multi-environment cloud deployment. React, Next.js, Node.js, AWS, Vercel.",
                    },
                    {
                      track: "cyber",
                      icon: <IconShield size={16} />,
                      title: "Cybersecurity",
                      desc: "Vulnerability assessment, penetration testing, threat modeling, ISO compliance, and applied AI security research.",
                    },
                  ].map((t) => {
                    const isWeb = t.track === "web";
                    return (
                      <div
                        key={t.track}
                        className="rounded-xl p-5"
                        style={{
                          background: isWeb ? "rgba(99,102,241,0.07)" : "rgba(136,92,245,0.07)",
                          border: `1px solid ${isWeb ? "rgba(99,102,241,0.2)" : "rgba(136,92,245,0.2)"}`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ color: isWeb ? T.indigo : T.violet }}>{t.icon}</span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: T.main }}
                          >
                            {t.title}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed" style={{ color: T.muted }}>
                          {t.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Chapter>

              {/* ── 02 EXPERIENCE ── */}
              <Chapter id="exp" num="02" heading="Experience & Research" chapterRef={chapterRefs.exp}>
                {/* Timeline */}
                <div className="relative pl-6 border-l-2" style={{ borderColor: T.border }}>
                  {/* DelPat */}
                  <div className="relative mb-10">
                    <span
                      className="absolute -left-[25px] top-1 w-3 h-3 rounded-full ring-4"
                      style={{
                        background: T.indigo,
                        ringColor: T.bg,
                        boxShadow: `0 0 0 3px ${T.bg}, 0 0 0 5px ${T.indigo}`,
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <TrackPill track="web" />
                      <span className="text-[12px]" style={{ color: T.muted }}>Jun 2025 – Dec 2025</span>
                    </div>
                    <h3 className="text-base font-bold" style={{ color: T.main }}>
                      Full Stack Developer Intern — DelPat LLP
                    </h3>
                    <p className="text-[13px] mt-1" style={{ color: T.muted }}>
                      Engineered and deployed 6+ production web applications, led a WordPress-to-React migration,
                      and provisioned AWS EC2 multi-environment cloud infrastructure.
                    </p>
                    <Disclosure label="Details">
                      <ul className="space-y-1.5 text-[13px]" style={{ color: T.muted }}>
                        {[
                          "Architected role-based CMS backend with JWT authentication, image processing, and full CRUD APIs.",
                          "Built a reusable component library adopted across multiple projects, enforcing consistent design standards.",
                          "Kickstarted a cross-platform React Native app from PRD and ER-diagram through navigation and UI integration.",
                          "Provisioned AWS EC2 and managed Vercel / Firebase multi-environment deployments, resolving CI/build issues.",
                        ].map((pt, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span style={{ color: T.indigo, marginTop: 2 }}>▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure>
                  </div>

                  {/* IEEE Research ICTBIG 2024 */}
                  <div className="relative mb-10">
                    <span
                      className="absolute -left-[25px] top-1 w-3 h-3 rounded-full"
                      style={{
                        background: T.violet,
                        boxShadow: `0 0 0 3px ${T.bg}, 0 0 0 5px ${T.violet}`,
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <TrackPill track="cyber" />
                      <span className="text-[12px]" style={{ color: T.muted }}>Nov 2024 – Mar 2025</span>
                    </div>
                    <h3 className="text-base font-bold" style={{ color: T.main }}>
                      Researcher — ICTBIG 2024, IEEE Xplore
                    </h3>
                    <p className="text-[13px] mt-1" style={{ color: T.muted }}>
                      Published peer-reviewed paper on real-time CNN-based deepfake audio detection using STFT and MFCC spectral analysis.{" "}
                      <a
                        href="https://doi.org/10.1109/ICTBIG64922.2024.10911062"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-focus)] rounded"
                        style={{ color: T.indigo }}
                      >
                        DOI ↗
                      </a>
                    </p>
                    <Disclosure label="Details">
                      <ul className="space-y-1.5 text-[13px]" style={{ color: T.muted }}>
                        {[
                          'Authored "Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach" — added to IEEE Xplore March 2025.',
                          "Designed a CNN signal-processing pipeline: audio → STFT spectrogram → MFCC extraction → softmax classifier with configurable threshold.",
                          "Conference: 2024 IEEE 4th ICTBIG, 13–14 December 2024.",
                        ].map((pt, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span style={{ color: T.violet, marginTop: 2 }}>▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure>
                  </div>

                  {/* IEEE Research ICTBIG 2025 */}
                  <div className="relative">
                    <span
                      className="absolute -left-[25px] top-1 w-3 h-3 rounded-full"
                      style={{
                        background: T.violet,
                        boxShadow: `0 0 0 3px ${T.bg}, 0 0 0 5px ${T.violet}`,
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <TrackPill track="cyber" />
                      <span className="text-[12px]" style={{ color: T.muted }}>Dec 2025 – Jan 2026</span>
                    </div>
                    <h3 className="text-base font-bold" style={{ color: T.main }}>
                      Researcher — ICTBIG 2025, IEEE Xplore
                    </h3>
                    <p className="text-[13px] mt-1" style={{ color: T.muted }}>
                      Published comprehensive survey reviewing deepfake audio detection techniques, adversarial evasion, and future forensic directions.{" "}
                      <a
                        href="https://doi.org/10.1109/ICTBIG68706.2025.11323737"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-focus)] rounded"
                        style={{ color: T.indigo }}
                      >
                        DOI ↗
                      </a>
                    </p>
                    <Disclosure label="Details">
                      <ul className="space-y-1.5 text-[13px]" style={{ color: T.muted }}>
                        {[
                          'Authored "A Comprehensive Review of Deepfake Audio Detection Techniques: Advances, Challenges and Future Directions" — added to IEEE Xplore January 2026.',
                          "Covered taxonomy of generative voice synthesis engines, temporal/spectral feature extraction, benchmark evaluation (ASVspoof, In-the-Wild), and multimodal forensic countermeasures.",
                          "Conference: 2025 IEEE 5th ICTBIG, 12–13 December 2025.",
                        ].map((pt, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span style={{ color: T.violet, marginTop: 2 }}>▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure>
                  </div>
                </div>
              </Chapter>

              {/* ── 03 EDUCATION ── */}
              <Chapter id="edu" num="03" heading="Academic Foundation" chapterRef={chapterRefs.edu}>
                {/* Primary */}
                <div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(99,102,241,0.07)", border: `1px solid rgba(99,102,241,0.2)` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-bold" style={{ color: T.main }}>MIT World Peace University, Pune</p>
                      <p className="text-[13px] mt-0.5" style={{ color: T.muted }}>B.Tech in CSE (Cyber Security &amp; Forensics)</p>
                    </div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
                    >
                      Graduated 2026
                    </span>
                  </div>
                  <p className="text-[13px] mt-2 font-medium" style={{ color: T.muted }}>CGPA: 7.47 / 10</p>
                </div>

                {/* Earlier education accordion */}
                <Disclosure label="Earlier Education">
                  <div className="space-y-3">
                    {[
                      { name: "Hislop Junior College", loc: "Nagpur", degree: "HSC (MSBSHSE)", grade: "70.67%", year: "2022" },
                      { name: "Jet Kids International School", loc: "Pusad", degree: "SSC (CBSE)", grade: "87.6%", year: "2020" },
                    ].map((e) => (
                      <div
                        key={e.name}
                        className="rounded-xl p-4 flex flex-wrap items-start justify-between gap-2"
                        style={{ background: "rgba(30,33,46,0.5)", border: `1px solid ${T.border}` }}
                      >
                        <div>
                          <p className="text-[13px] font-bold" style={{ color: T.main }}>{e.name}, {e.loc}</p>
                          <p className="text-[12px] mt-0.5" style={{ color: T.muted }}>{e.degree} · {e.grade}</p>
                        </div>
                        <span className="text-[12px] font-mono" style={{ color: T.muted }}>{e.year}</span>
                      </div>
                    ))}
                  </div>
                </Disclosure>
              </Chapter>

              {/* ── 04 SKILLS ── */}
              <Chapter id="skills" num="04" heading="Technical Capabilities" chapterRef={chapterRefs.skills}>
                {/* Segmented control */}
                <div
                  className="inline-flex p-1 rounded-xl mb-6"
                  role="tablist"
                  aria-label="Skills track"
                  style={{ background: "rgba(30,33,46,0.8)", border: `1px solid ${T.border}` }}
                >
                  {[
                    { id: "web",   label: "Web Development",  color: T.indigo },
                    { id: "cyber", label: "Cybersecurity",    color: T.violet },
                  ].map((tab) => {
                    const active = skillsTrack === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active}
                        onClick={() => { setSkillsTrack(tab.id); setShowAllSkills(false); }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowRight") { setSkillsTrack("cyber"); setShowAllSkills(false); }
                          if (e.key === "ArrowLeft")  { setSkillsTrack("web"); setShowAllSkills(false); }
                        }}
                        className="relative px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                        style={{
                          color: active ? "#fff" : T.muted,
                          background: active ? tab.color : "transparent",
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence mode="wait">
                    {visibleSkills.map((skill, i) => (
                      <motion.span
                        key={`${skillsTrack}-${skill}`}
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, delay: shouldReduce ? 0 : Math.min(i * 0.04, 0.32) }}
                        className="px-3 py-1.5 rounded-lg text-[13px] font-medium"
                        style={{
                          background: skillsTrack === "web" ? "rgba(99,102,241,0.1)" : "rgba(136,92,245,0.1)",
                          color: skillsTrack === "web" ? "#c7d2fe" : "#ddd6fe",
                          border: `1px solid ${skillsTrack === "web" ? "rgba(99,102,241,0.2)" : "rgba(136,92,245,0.2)"}`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                {activeSkills.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSkills((v) => !v)}
                    className="mt-4 text-[13px] font-semibold flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
                    style={{ color: T.indigo }}
                  >
                    {showAllSkills ? "Show fewer" : `+ Show all ${activeSkills.length} skills`}
                  </button>
                )}
              </Chapter>

              {/* ── 05 CERTIFICATIONS ── */}
              <Chapter id="certs" num="05" heading="Honors & Certifications" chapterRef={chapterRefs.certs}>
                <div className="space-y-3">
                  {[
                    {
                      title: "Blockchain Evolution Certification",
                      org: "GIAN Program, NIT Goa",
                      year: "2025",
                      desc: "Decentralized Systems and distributed ledger architecture.",
                      track: "web",
                    },
                  ].map((cert) => (
                    <div
                      key={cert.title}
                      className="flex items-start gap-4 rounded-xl p-4"
                      style={{ background: "rgba(30,33,46,0.5)", border: `1px solid ${T.border}` }}
                    >
                      <span
                        className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(99,102,241,0.15)", color: T.indigo }}
                      >
                        <IconCheck size={12} />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold" style={{ color: T.main }}>{cert.title}</p>
                        <p className="text-[12px] mt-0.5" style={{ color: T.muted }}>{cert.org} · {cert.year}</p>
                        <p className="text-[12px] mt-1" style={{ color: T.muted }}>{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Chapter>

              {/* ── 06 NEXT STEPS ── */}
              <Chapter id="next" num="06" heading="Next Steps" chapterRef={chapterRefs.next}>
                <p className="text-[15px] mb-6" style={{ color: T.muted }}>
                  Open to software engineering roles and cybersecurity research collaboration.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Prathamesh_Chiddarwar_Resume.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    style={{ background: T.indigo, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                  >
                    <IconDownload size={15} />
                    Download Resume
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    style={{
                      color: T.main,
                      background: "rgba(30,33,46,0.8)",
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    Get in touch
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Chapter>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
