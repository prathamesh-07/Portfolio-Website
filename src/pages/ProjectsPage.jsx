import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import {
  IconGithub,
  IconExternalLink,
  IconClose,
  IconArrowRight,
  IconBook,
  IconCode,
  IconShield,
  IconCloud,
} from "../components/shared/Icons";

/* ─── Project Photos & Graphics ─────────────────────────────────────────── */
import carrent from "../assets/carrent.png";
import jobit from "../assets/jobit.png";
import tripguide from "../assets/tripguide.png";
import delpatImg from "../assets/projects/delpat.svg";
import aiResumeImg from "../assets/projects/ai-resume.svg";
import investInsightImg from "../assets/projects/investinsight.svg";
import firmwareImg from "../assets/projects/firmware.svg";
import ieeeReviewImg from "../assets/projects/ieee-review.svg";
import ieeeRealtimeImg from "../assets/projects/ieee-realtime.svg";

/* ─── Design tokens (CSS vars only) ─────────────────────────────────────── */
const T = {
  bg:      "var(--bg-primary)",
  surface: "var(--bg-surface-raised)",
  border:  "var(--border-subtle)",
  indigo:  "var(--color-indigo)",
  violet:  "var(--color-violet)",
  muted:   "var(--text-muted)",
  main:    "var(--text-main)",
};

/* ─── Track pill ─────────────────────────────────────────────────────────── */
const TrackPill = ({ track, label }) => {
  const isWeb = track === "web";
  return (
    <span
      style={{
        backgroundColor: isWeb ? "rgba(99,102,241,0.18)" : "rgba(136,92,245,0.18)",
        color: isWeb ? "#a5b4fc" : "#c4b5fd",
        border: `1px solid ${isWeb ? "rgba(99,102,241,0.4)" : "rgba(136,92,245,0.4)"}`,
        backdropFilter: "blur(6px)",
      }}
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm"
    >
      <span
        style={{ background: isWeb ? T.indigo : T.violet }}
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
      />
      {label}
    </span>
  );
};

/* ─── Project data ───────────────────────────────────────────────────────── */
const projectItems = [
  {
    id: "ieee-deepfake-review",
    num: "R2",
    title: "A Comprehensive Review of Deepfake Audio Detection Techniques",
    subtitle: "Advances, Challenges and Future Directions",
    venue: "ICTBIG 2025 · IEEE Xplore",
    track: "cybersecurity",
    trackLabel: "Cybersecurity Research",
    isResearch: true,
    image: ieeeReviewImg,
    tags: ["Deepfake Forensics", "Survey", "Voice Synthesis"],
    summary: "Published peer-reviewed survey synthesizing audio deepfake architectures, acoustic anomaly indicators, and forensic benchmark evaluations.",
    problem:
      "Rapid advances in generative voice synthesis, diffusion-based acoustic modeling, and zero-shot voice cloning have lowered the barrier to convincing audio impersonation, challenging conventional forensic detectors with zero-day synthesis signatures.",
    built:
      "A comprehensive review published in IEEE Xplore categorizing audio deepfake generation methods, temporal and spectral feature representations, benchmark forensic evaluation datasets (ASVspoof, In-the-Wild), and adversarial evasion attacks, proposing pathways toward robust, generalizable forensic defenses.",
    learned:
      "Taxonomy of audio generation pipelines, acoustic distortion signatures under compression and transmission noise, cross-dataset generalization limitations, and multimodal forensic countermeasures.",
    links: {
      paper: "https://ieeexplore.ieee.org/document/11323737",
      doi: "10.1109/ICTBIG68706.2025.11323737",
      doiUrl: "https://doi.org/10.1109/ICTBIG68706.2025.11323737",
    },
    thumb: { bg: "rgba(136,92,245,0.08)", accent: "#c4b5fd", icon: IconBook, label: "IEEE" },
  },
  {
    id: "ieee-deepfake",
    num: "R1",
    title: "Real-Time Detection of AI-Generated Deepfake Audio",
    subtitle: "A Novel Approach",
    venue: "ICTBIG 2024 · IEEE Xplore",
    track: "cybersecurity",
    trackLabel: "Cybersecurity Research",
    isResearch: true,
    image: ieeeRealtimeImg,
    tags: ["Signal Processing", "CNN", "STFT / MFCC"],
    summary: "CNN signal-processing pipeline using STFT and MFCC feature analysis to classify authentic vs synthetic speech in real time.",
    problem:
      "Rapid advances in generative voice cloning tools present acute threats of impersonation fraud and disinformation. Existing detection mechanisms suffer from high inference latency and fail under real-world acoustic degradation.",
    built:
      "A real-time CNN signal-processing pipeline that performs short-time Fourier transform (STFT) to analyze spectral feature dynamics. Extracted Mel-frequency cepstral coefficients (MFCCs) and spectral descriptors to classify authentic vs synthetic speech in real time.",
    learned:
      "Advanced acoustic signal representation, spectrogram feature engineering, and optimizing neural inference for low latency without sacrificing accuracy.",
    links: {
      paper: "https://ieeexplore.ieee.org/document/10911062",
      doi: "10.1109/ICTBIG64922.2024.10911062",
      doiUrl: "https://doi.org/10.1109/ICTBIG64922.2024.10911062",
    },
    thumb: { bg: "rgba(136,92,245,0.08)", accent: "#c4b5fd", icon: IconBook, label: "IEEE" },
  },
  {
    id: "email-security-analyst",
    num: "01",
    title: "Email Security Analyst",
    subtitle: "Phishing Detection Platform",
    track: "cybersecurity",
    trackLabel: "Cybersecurity",
    isResearch: false,
    image: jobit,
    tags: ["Python", "Flask", "Scikit-learn"],
    summary: "Flask web app that classifies phishing emails via TF-IDF + Logistic Regression and DNS-level SPF/DKIM/DMARC authentication checks.",
    problem:
      "Phishing remains the predominant vector for corporate credential compromise. Conventional email filters frequently miss targeted spear-phishing messages with clean domain reputation.",
    built:
      "A Flask-based web security application that ingests raw email headers and bodies. Employs TF-IDF vectorization and Logistic Regression to detect deceptive language, combined with programmatic DNS queries to verify SPF, DKIM, and DMARC authentication records, attachment scanning, and link parsing to produce a composite risk report.",
    learned:
      "Practical implementation of mail exchange protocols (RFC 7208 / 6376 / 7489), feature engineering on text, and mitigating false positives in threat classification.",
    links: { github: "https://github.com/prathamesh-07" },
    thumb: { bg: "rgba(136,92,245,0.08)", accent: "#c4b5fd", icon: IconShield, label: "Security" },
  },
  {
    id: "cloudmigrate",
    num: "02",
    title: "CloudMigrate",
    subtitle: "Multi-Cloud Data Orchestration",
    track: "both",
    trackLabel: "Web · Security",
    isResearch: false,
    image: carrent,
    tags: ["Next.js", "Python", "AWS S3 / GCP"],
    summary: "Multi-cloud orchestration platform transferring files from AWS S3 to Google Cloud Storage with MD5 and SHA-256 hash verification.",
    problem:
      "Enterprise data mobility between competing cloud platforms is frequently plagued by network interruptions, silent bitrot, and lack of verified data integrity checkpoints.",
    built:
      "A multi-cloud orchestration pipeline that transfers large datasets securely from AWS S3 buckets to Google Cloud Storage. Computed MD5 and SHA-256 cryptographic hashes prior to dispatch and immediately upon cloud arrival to guarantee zero transfer corruption. Powered by a Next.js control plane with Supabase logging.",
    learned:
      "Asynchronous stream handling with boto3 and google-cloud-storage libraries, and end-to-end cryptographic checksum verification in distributed pipelines.",
    links: { github: "https://github.com/prathamesh-07" },
    thumb: { bg: "rgba(99,102,241,0.08)", accent: "#a5b4fc", icon: IconCloud, label: "Cloud" },
  },
  {
    id: "atms",
    num: "03",
    title: "ATMS",
    subtitle: "Enterprise Asset Management",
    track: "both",
    trackLabel: "Web · Security",
    isResearch: false,
    image: tripguide,
    tags: ["React", "MongoDB", "RBAC / JWT"],
    summary: "Full-stack asset tracking system with server-side RBAC, immutable audit logs, and hardware/software lifecycle management.",
    problem:
      "Small-to-midsize organizations struggle to monitor physical and digital IT assets across their lifecycle, resulting in compliance audit failures and unpatched vulnerabilities.",
    built:
      "An enterprise web application built on React, Express, and MongoDB that audits, assigns, and retires organizational assets. Enforces strict server-side Role-Based Access Control (RBAC) and immutable audit log trails ensuring users access only resources permitted by their role.",
    learned:
      "Granular permission modeling, secure session management, and structuring scalable NoSQL schemas with strict access boundaries.",
    links: { github: "https://github.com/prathamesh-07" },
    thumb: { bg: "rgba(99,102,241,0.08)", accent: "#a5b4fc", icon: IconCode, label: "App" },
  },
  {
    id: "delpat-production",
    num: "04",
    title: "DelPat LLP — Production Systems",
    subtitle: "6+ web apps shipped end-to-end",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    image: delpatImg,
    tags: ["React", "Next.js", "AWS EC2"],
    summary: "Engineered production web apps including a CMS with JWT auth, a WordPress-to-React migration, and a shared component library.",
    problem:
      "Client organizations needed scalable, modern web platforms to replace legacy monoliths and repetitive custom components that slowed engineering velocity.",
    built:
      "Engineered and deployed 6+ production web applications end-to-end. Architected a role-based CMS backend with JWT authentication and full CRUD APIs; executed a zero-downtime WordPress-to-React migration; established a shared React component library adopted across projects; and managed deployments on AWS EC2, Vercel, and Firebase.",
    learned:
      "Client-facing production SLAs, cross-team component reuse, CI/CD pipeline stabilization, and resolving real-world cloud deployment challenges.",
    links: { note: "Client production code subject to NDA" },
    thumb: { bg: "rgba(99,102,241,0.08)", accent: "#a5b4fc", icon: IconCode, label: "Web" },
  },
  {
    id: "ai-resume-builder",
    num: "05",
    title: "AI-Resume-Builder",
    subtitle: "GPT-4 powered resume generation",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    image: aiResumeImg,
    tags: ["Next.js 14", "TypeScript", "OpenAI GPT-4"],
    summary: "Full-stack resume builder on Next.js 14 App Router generating tailored summaries via OpenAI API with real-time preview and PDF download.",
    problem:
      "Job applicants often struggle with articulating bullet points effectively and formatting clean, ATS-compliant resumes without tedious manual tweaking.",
    built:
      "A full-stack, AI-driven resume builder built on Next.js 14 App Router, React, TypeScript, and Tailwind CSS. Connects to OpenAI's GPT API via lightweight serverless routes to generate tailored summaries and experience descriptions, offers multiple responsive resume templates with live interactive preview, and compiles print-ready PDFs for download.",
    learned:
      "Next.js 14 serverless API routing, streaming OpenAI completions with rate limiting, client-side dynamic PDF document compilation, and building accessible customizable form templates.",
    links: { github: "https://github.com/prathamesh-07/AI-Resume-Builder" },
    thumb: { bg: "rgba(99,102,241,0.08)", accent: "#a5b4fc", icon: IconCode, label: "AI" },
  },
  {
    id: "investinsight-stock-prediction",
    num: "06",
    title: "InvestInsight",
    subtitle: "Stock Prediction & Portfolio Analytics",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    image: investInsightImg,
    tags: ["Python", "TensorFlow / Keras", "Streamlit"],
    summary: "Financial analytics platform with live yFinance data, RSI/Moving Average indicators, and dual forecasting via LSTM and Facebook Prophet.",
    problem:
      "Retail investors require clear predictive analytics and historical volatility indicators in an intuitive, unified dashboard without having to write custom machine learning scripts.",
    built:
      "A web-based financial analytics platform built with Streamlit and Python. Pulls real-time market data through the yFinance API, computes technical indicators (RSI, Moving Averages, Volatility), and generates time-series forecasts using both statistical models (Facebook Prophet) and deep learning architectures (LSTM networks in TensorFlow/Keras), visualized with dynamic Plotly charts.",
    learned:
      "LSTM sequence modeling for financial time-series data, Prophet trend and seasonality decomposition, and architecting reactive Python web UIs with Streamlit.",
    links: { github: "https://github.com/prathamesh-07/-Stock-Prediction-Webapp" },
    thumb: { bg: "rgba(99,102,241,0.08)", accent: "#a5b4fc", icon: IconCode, label: "ML" },
  },
  {
    id: "firmware-hawk-eye",
    num: "07",
    title: "Firmware HawkEye",
    subtitle: "IoT Firmware Vulnerability Scanner",
    track: "cybersecurity",
    trackLabel: "Cybersecurity",
    isResearch: false,
    image: firmwareImg,
    tags: ["TypeScript", "React 18", "Radix UI"],
    summary: "React 18 platform that ingests binary firmware files, detects security misconfigurations and exposed keys, exports JSON audit reports.",
    problem:
      "Embedded IoT device firmware often harbors critical security misconfigurations, exposed keys, and outdated component vulnerabilities that are cumbersome to detect without specialized tooling.",
    built:
      "A dedicated firmware security analysis platform built with React 18, TypeScript, Tailwind CSS, and Radix UI primitives. Ingests binary firmware files, performs automated vulnerability detection and potential issue scanning, visualizes internal firmware structure, generates prioritized remediation recommendations, and exports structured audit reports in JSON.",
    learned:
      "Firmware binary analysis methodologies, security audit reporting workflows, accessible dashboard component composition using Radix UI primitives, and asynchronous client-side file inspection.",
    links: { github: "https://github.com/prathamesh-07/firmware-hawk-eye" },
    thumb: { bg: "rgba(136,92,245,0.08)", accent: "#c4b5fd", icon: IconShield, label: "Security" },
  },
];

/* ─── Drawer section helper ──────────────────────────────────────────────── */
const Section = ({ label, children }) => (
  <div>
    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: T.indigo }}>
      {label}
    </p>
    {children}
  </div>
);

/* ─── Drawer content ─────────────────────────────────────────────────────── */
const DrawerContent = ({ project, onClose, closeRef }) => (
  <div className="p-6 sm:p-8 flex flex-col gap-5 h-full">
    {/* Drawer Header Top */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <TrackPill track={project.track} label={project.trackLabel} />
        <h2 id="drawer-title" className="text-xl sm:text-2xl font-black mt-2 leading-tight" style={{ color: T.main }}>
          {project.title}
        </h2>
        <p className="text-xs mt-1" style={{ color: T.muted }}>{project.subtitle}</p>
        {project.venue && (
          <p className="text-xs font-semibold mt-1" style={{ color: T.violet }}>{project.venue}</p>
        )}
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close details"
        className="p-2 rounded-lg transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
        style={{ background: "rgba(255,255,255,0.06)", color: T.main }}
      >
        <IconClose size={20} />
      </button>
    </div>

    {/* Project Photo / Graphic Banner */}
    {project.image && (
      <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border flex-shrink-0" style={{ borderColor: T.border, background: "#050816" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    )}

    {/* Details Body */}
    <div className="flex flex-col gap-5 flex-1 text-sm overflow-y-auto" style={{ color: T.muted }}>
      <Section label="Problem">
        <p className="leading-relaxed">{project.problem}</p>
      </Section>
      <Section label="What I Built">
        <p className="leading-relaxed">{project.built}</p>
      </Section>
      <Section label="What I Learned">
        <p className="leading-relaxed">{project.learned}</p>
      </Section>
      <Section label="Stack">
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}`, color: T.main }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Links Footer */}
      <div className="mt-auto pt-4 flex flex-wrap gap-3" style={{ borderTop: `1px solid ${T.border}` }}>
        {project.links.paper && (
          <a
            href={project.links.paper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            style={{ background: T.violet }}
          >
            <IconExternalLink size={13} /> View on IEEE Xplore
          </a>
        )}
        {project.links.doiUrl && (
          <a
            href={project.links.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            style={{ background: "rgba(255,255,255,0.06)", color: T.main, border: `1px solid ${T.border}` }}
          >
            DOI →
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            style={{ background: "rgba(255,255,255,0.06)", color: T.main, border: `1px solid ${T.border}` }}
          >
            <IconGithub size={14} /> GitHub
          </a>
        )}
        {project.links.note && (
          <span className="text-xs italic self-center" style={{ color: T.muted }}>
            {project.links.note}
          </span>
        )}
      </div>
    </div>
  </div>
);

/* ─── Drawer / Bottom-sheet ──────────────────────────────────────────────── */
const ProjectDrawer = ({ project, onClose, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  const drawerRef    = useRef(null);
  const closeRef     = useRef(null);

  useEffect(() => {
    if (!drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap  = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => () => triggerRef?.current?.focus(), [triggerRef]);

  const dur = shouldReduce ? 0 : 0.28;
  const ease = [0.22, 1, 0.36, 1];

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ background: "rgba(5,8,22,0.72)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* Desktop right drawer */}
      <motion.div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="hidden md:flex ml-auto flex-col w-full max-w-xl h-full overflow-y-auto shadow-2xl"
        style={{ background: "var(--bg-surface-raised)", borderLeft: `1px solid ${T.border}` }}
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: dur, ease } }}
        exit={{ x: "100%", transition: { duration: dur * 0.75 } }}
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerContent project={project} onClose={onClose} closeRef={closeRef} />
      </motion.div>

      {/* Mobile bottom sheet */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="flex md:hidden mt-auto flex-col w-full max-h-[88vh] overflow-y-auto rounded-t-2xl shadow-2xl"
        style={{ background: "var(--bg-surface-raised)", borderTop: `1px solid ${T.border}` }}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { duration: dur, ease } }}
        exit={{ y: "100%", transition: { duration: dur * 0.75 } }}
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerContent project={project} onClose={onClose} closeRef={closeRef} />
      </motion.div>
    </div>
  );
};

/* ─── Project card (with real photo/image) ───────────────────────────────── */
const ProjectCard = ({ project, index, onClick, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  const isWeb = project.track === "web";

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col cursor-pointer rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] transition-all hover:border-[var(--color-indigo)]"
      style={{ background: T.surface, border: `1px solid ${T.border}` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      ref={triggerRef}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
    >
      {/* Project Photo / Graphic Banner */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#070b20]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: project.thumb.bg }}>
            <project.thumb.icon size={32} style={{ color: project.thumb.accent }} />
          </div>
        )}

        {/* Subtle dark gradient overlay from bottom */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg-surface-raised)] via-black/20 to-black/30"
          aria-hidden="true"
        />

        {/* Number badge top-left */}
        <span
          className="absolute top-3 left-3 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-md"
          style={{ background: "rgba(5,8,22,0.7)", color: "#e2e8f0", border: `1px solid ${T.border}` }}
        >
          {project.num}
        </span>

        {/* Track pill top-right */}
        <div className="absolute top-3 right-3">
          <TrackPill track={project.track} label={project.trackLabel} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2">
        <h3
          className="text-base font-bold leading-snug group-hover:text-[var(--color-indigo)] transition-colors"
          style={{ color: T.main }}
        >
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: T.muted }}>
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: T.muted }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
          <span className="text-[11px] font-semibold tracking-wider" style={{ color: isWeb ? "#a5b4fc" : "#c4b5fd" }}>
            View details
          </span>
          <motion.span
            style={{ color: T.muted }}
            whileHover={shouldReduce ? {} : { x: 3 }}
            transition={{ duration: 0.14 }}
            aria-hidden="true"
          >
            <IconArrowRight size={14} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Research row ───────────────────────────────────────────────────────── */
const ResearchRow = ({ project, onClick, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded"
      style={{ borderBottom: `1px solid ${T.border}` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      ref={triggerRef}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
    >
      {/* Research Paper Preview Graphic */}
      {project.image && (
        <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 border bg-[#050816]" style={{ borderColor: T.border }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <TrackPill track={project.track} label={project.trackLabel} />
          <span className="text-[11px] font-mono" style={{ color: T.muted }}>{project.venue}</span>
        </div>
        <p className="text-sm font-bold leading-snug mb-1 group-hover:text-[var(--color-violet)] transition-colors" style={{ color: T.main }}>
          {project.title}
        </p>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: T.muted }}>{project.summary}</p>
        {project.links.doiUrl && (
          <a
            href={project.links.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono mt-1.5 inline-block hover:opacity-80 transition-opacity"
            style={{ color: T.violet }}
            onClick={(e) => e.stopPropagation()}
          >
            DOI: {project.links.doi}
          </a>
        )}
      </div>

      <motion.span
        className="hidden sm:inline-block flex-shrink-0 self-center"
        style={{ color: T.muted }}
        whileHover={shouldReduce ? {} : { x: 3 }}
        transition={{ duration: 0.14 }}
        aria-hidden="true"
      >
        <IconArrowRight size={16} />
      </motion.span>
    </motion.div>
  );
};

/* ─── Main page ─────────────────────────────────────────────────────────── */
const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTrack = searchParams.get("track") || "all";
  const [activeProject, setActiveProject] = useState(null);
  const triggerRefs = useRef({});
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    document.title = "Projects | Prathamesh Chiddarwar — Web Dev & Cybersecurity";
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = useCallback((track) => {
    const next = new URLSearchParams(searchParams);
    if (track === "all") next.delete("track");
    else next.set("track", track);
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const openProject  = useCallback((p) => setActiveProject(p), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  const researchItems = projectItems.filter((p) => p.isResearch);
  const workItems = projectItems.filter((p) => !p.isResearch).filter((p) => {
    if (currentTrack === "all")           return true;
    if (currentTrack === "web")           return p.track === "web" || p.track === "both";
    if (currentTrack === "cybersecurity") return p.track === "cybersecurity" || p.track === "both";
    return true;
  });
  const showResearch = currentTrack === "all" || currentTrack === "cybersecurity";

  const tabs = [
    { id: "all",           label: "All Work" },
    { id: "web",           label: "Web Dev" },
    { id: "cybersecurity", label: "Cybersecurity" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col pt-20" style={{ background: T.bg, color: T.main }}>
      {/* Same dot-grid background as About page — fully cohesive across site */}
      <div className="bg-dot-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <Navbar />

      <main className="relative flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-10 py-14 sm:py-20">

        {/* ── Compact page header (matches About/Contact style) ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: T.indigo }}>
            Portfolio
          </p>
          <h1
            className="font-black tracking-tight leading-tight mb-3"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", color: T.main }}
          >
            Projects &amp; Research
          </h1>
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: T.muted }}>
            Production web systems, cryptographic pipelines, and two published IEEE papers in AI audio forensics.
          </p>
        </motion.div>

        {/* ── Segmented filter ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 overflow-x-auto"
        >
          <div
            role="tablist"
            aria-label="Filter by discipline"
            className="flex items-center p-1 rounded-xl w-fit"
            style={{ background: "var(--bg-surface-raised)", border: `1px solid ${T.border}` }}
          >
            {tabs.map((tab) => {
              const active = currentTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(tab.id)}
                  className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                  style={{
                    color: active ? "#fff" : T.muted,
                    background: active ? T.indigo : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Research publications ── */}
        <AnimatePresence mode="wait">
          {showResearch && (
            <motion.section
              key="research"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-labelledby="research-heading"
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-1 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                <h2 id="research-heading" className="text-[11px] font-bold uppercase tracking-widest" style={{ color: T.violet }}>
                  Research Publications
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(136,92,245,0.1)", color: T.violet }}>
                  IEEE Xplore · 2 papers
                </span>
              </div>
              {researchItems.map((p) => (
                <ResearchRow
                  key={p.id}
                  project={p}
                  onClick={openProject}
                  triggerRef={(el) => { triggerRefs.current[p.id] = el; }}
                />
              ))}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Project cards grid with Photos ── */}
        <section aria-labelledby="projects-heading">
          {workItems.length > 0 && (
            <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
              <h2 id="projects-heading" className="text-[11px] font-bold uppercase tracking-widest" style={{ color: T.indigo }}>
                Projects
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(99,102,241,0.1)", color: T.indigo }}>
                {workItems.length} items
              </span>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {workItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workItems.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    index={i}
                    onClick={openProject}
                    triggerRef={(el) => { triggerRefs.current[p.id] = el; }}
                  />
                ))}
              </div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-sm text-center"
                style={{ color: T.muted }}
              >
                No projects match this filter.
              </motion.p>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Drawer */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDrawer
            key="drawer"
            project={activeProject}
            onClose={closeProject}
            triggerRef={{ current: triggerRefs.current[activeProject.id] }}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
