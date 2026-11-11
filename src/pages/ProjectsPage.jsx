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
} from "../components/shared/Icons";

/* ─── Design tokens (CSS vars only, no raw hex) ─────────────────────────── */
const T = {
  bg:          "var(--bg-primary)",
  surface:     "var(--bg-surface-raised)",
  border:      "var(--border-subtle)",
  indigo:      "var(--color-indigo)",
  violet:      "var(--color-violet)",
  muted:       "var(--text-muted)",
  main:        "var(--text-main)",
};

/* ─── Track pill ─────────────────────────────────────────────────────────── */
const TrackPill = ({ track, label }) => {
  const isWeb  = track === "web";
  const isBoth = track === "both";
  return (
    <span
      style={{
        backgroundColor: isWeb
          ? "rgba(99,102,241,0.12)"
          : isBoth
          ? "rgba(136,92,245,0.08)"
          : "rgba(136,92,245,0.12)",
        color: isWeb ? "#a5b4fc" : "#c4b5fd",
        border: `1px solid ${isWeb
          ? "rgba(99,102,241,0.3)"
          : "rgba(136,92,245,0.3)"}`,
      }}
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap"
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
    tags: ["Deepfake Forensics", "Survey", "Voice Synthesis"],
    summary:
      "Published peer-reviewed survey synthesizing audio deepfake architectures, acoustic anomaly indicators, and forensic benchmark evaluations (ASVspoof, In-the-Wild).",
    problem:
      "Rapid advances in generative voice synthesis, diffusion-based acoustic modeling, and zero-shot voice cloning have lowered the barrier to convincing audio impersonation, challenging conventional forensic detectors with zero-day synthesis signatures.",
    built:
      "A comprehensive review published in IEEE Xplore categorizing audio deepfake generation methods, temporal and spectral feature representations, benchmark forensic evaluation datasets (ASVspoof, In-the-Wild), and adversarial evasion attacks, proposing pathways toward robust, generalizable forensic defenses.",
    learned:
      "Taxonomy of audio generation pipelines, acoustic distortion signatures under compression and transmission noise, cross-dataset generalization limitations, and multimodal forensic countermeasures.",
    links: {
      paper: "https://ieeexplore.ieee.org/document/11323737",
      doi:   "10.1109/ICTBIG68706.2025.11323737",
      doiUrl: "https://doi.org/10.1109/ICTBIG68706.2025.11323737",
    },
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
    tags: ["Signal Processing", "CNN", "STFT / MFCC"],
    summary:
      "CNN signal-processing pipeline using STFT and MFCC feature analysis to classify authentic vs synthetic speech in real time with minimal latency overhead.",
    problem:
      "Rapid advances in generative voice cloning tools present acute threats of impersonation fraud and disinformation. Existing detection mechanisms suffer from high inference latency and fail under real-world acoustic degradation.",
    built:
      "A real-time CNN signal-processing pipeline that performs short-time Fourier transform (STFT) to analyze spectral feature dynamics. Extracted Mel-frequency cepstral coefficients (MFCCs) and spectral descriptors to classify authentic vs synthetic speech in real time.",
    learned:
      "Advanced acoustic signal representation, spectrogram feature engineering, and optimizing neural inference for low latency without sacrificing accuracy.",
    links: {
      paper: "https://ieeexplore.ieee.org/document/10911062",
      doi:   "10.1109/ICTBIG64922.2024.10911062",
      doiUrl: "https://doi.org/10.1109/ICTBIG64922.2024.10911062",
    },
  },
  {
    id: "email-security-analyst",
    num: "01",
    title: "Email Security Analyst",
    subtitle: "Phishing Detection Platform — SPF, DKIM, DMARC + ML threat scoring",
    track: "cybersecurity",
    trackLabel: "Cybersecurity",
    isResearch: false,
    tags: ["Python", "Flask", "Scikit-learn"],
    summary:
      "Flask web app analyzing email headers and bodies to classify phishing attempts using TF-IDF and Logistic Regression with DNS protocol authentication.",
    problem:
      "Phishing remains the predominant vector for corporate credential compromise. Conventional email filters frequently miss targeted spear-phishing messages with clean domain reputation.",
    built:
      "A Flask-based web security application that ingests raw email headers and bodies. Employs TF-IDF vectorization and Logistic Regression to detect deceptive language, combined with programmatic DNS queries to verify SPF, DKIM, and DMARC authentication records, attachment scanning, and link parsing to produce a composite risk report.",
    learned:
      "Practical implementation of mail exchange protocols (RFC 7208 / 6376 / 7489), feature engineering on text, and mitigating false positives in threat classification.",
    links: { github: "https://github.com/prathamesh-07" },
  },
  {
    id: "cloudmigrate",
    num: "02",
    title: "CloudMigrate",
    subtitle: "Multi-Cloud Data Orchestration — AWS S3 to GCP with cryptographic verification",
    track: "both",
    trackLabel: "Web · Security",
    isResearch: false,
    tags: ["Next.js", "Python", "AWS S3 / GCP"],
    summary:
      "Multi-cloud orchestration platform transferring files from AWS S3 to Google Cloud Storage with MD5 and SHA-256 hash verification at every checkpoint.",
    problem:
      "Enterprise data mobility between competing cloud platforms is frequently plagued by network interruptions, silent bitrot, and lack of verified data integrity checkpoints.",
    built:
      "A multi-cloud orchestration pipeline that transfers large datasets securely from AWS S3 buckets to Google Cloud Storage. Computed MD5 and SHA-256 cryptographic hashes prior to dispatch and immediately upon cloud arrival to guarantee zero transfer corruption. Powered by a Next.js control plane with Supabase logging.",
    learned:
      "Asynchronous stream handling with boto3 and google-cloud-storage libraries, and end-to-end cryptographic checksum verification in distributed pipelines.",
    links: { github: "https://github.com/prathamesh-07" },
  },
  {
    id: "atms",
    num: "03",
    title: "ATMS",
    subtitle: "Enterprise Asset Management — RBAC-enforced lifecycle tracking",
    track: "both",
    trackLabel: "Web · Security",
    isResearch: false,
    tags: ["React", "MongoDB", "RBAC / JWT"],
    summary:
      "Full-stack asset tracking system with strict server-side RBAC, immutable audit logs, and hardware/software lifecycle management across the organization.",
    problem:
      "Small-to-midsize organizations struggle to monitor physical and digital IT assets across their lifecycle, resulting in compliance audit failures and unpatched vulnerabilities.",
    built:
      "An enterprise web application built on React, Express, and MongoDB that audits, assigns, and retires organizational assets. Enforces strict server-side Role-Based Access Control (RBAC) and immutable audit log trails ensuring users access only resources permitted by their role.",
    learned:
      "Granular permission modeling, secure session management, and structuring scalable NoSQL schemas with strict access boundaries.",
    links: { github: "https://github.com/prathamesh-07" },
  },
  {
    id: "delpat-production",
    num: "04",
    title: "DelPat LLP — Production Systems",
    subtitle: "6+ web applications shipped end-to-end for real clients",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    tags: ["React", "Next.js", "AWS EC2"],
    summary:
      "Engineered and deployed production web apps including a CMS with JWT auth, a WordPress-to-React migration, and a shared component library across AWS / Vercel / Firebase.",
    problem:
      "Client organizations needed scalable, modern web platforms to replace legacy monoliths and repetitive custom components that slowed engineering velocity.",
    built:
      "Engineered and deployed 6+ production web applications end-to-end. Architected a role-based CMS backend with JWT authentication and full CRUD APIs; executed a zero-downtime WordPress-to-React migration; established a shared React component library adopted across projects; and managed deployments on AWS EC2, Vercel, and Firebase.",
    learned:
      "Client-facing production SLAs, cross-team component reuse, CI/CD pipeline stabilization, and resolving real-world cloud deployment challenges.",
    links: { note: "Client production code subject to NDA" },
  },
  {
    id: "ai-resume-builder",
    num: "05",
    title: "AI-Resume-Builder",
    subtitle: "GPT-4 powered resume generation with live preview and PDF export",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    tags: ["Next.js 14", "TypeScript", "OpenAI GPT-4"],
    summary:
      "Full-stack resume builder on Next.js 14 App Router generating tailored summaries via OpenAI API with real-time preview and print-ready PDF download.",
    problem:
      "Job applicants often struggle with articulating bullet points effectively and formatting clean, ATS-compliant resumes without tedious manual tweaking.",
    built:
      "A full-stack, AI-driven resume builder built on Next.js 14 App Router, React, TypeScript, and Tailwind CSS. Connects to OpenAI's GPT API via lightweight serverless routes to generate tailored summaries and experience descriptions, offers multiple responsive resume templates with live interactive preview, and compiles print-ready PDFs for download.",
    learned:
      "Mastering Next.js 14 serverless API routing, streaming OpenAI completions with rate limiting, client-side dynamic PDF document compilation, and building accessible customizable form templates.",
    links: { github: "https://github.com/prathamesh-07/AI-Resume-Builder" },
  },
  {
    id: "investinsight-stock-prediction",
    num: "06",
    title: "InvestInsight",
    subtitle: "LSTM + Prophet stock forecasting dashboard with live market data",
    track: "web",
    trackLabel: "Web Development",
    isResearch: false,
    tags: ["Python", "TensorFlow / Keras", "Streamlit"],
    summary:
      "Financial analytics platform with real-time yFinance data, RSI/Moving Average indicators, and dual forecasting via LSTM networks and Facebook Prophet.",
    problem:
      "Retail investors require clear predictive analytics and historical volatility indicators in an intuitive, unified dashboard without having to write custom machine learning scripts.",
    built:
      "A web-based financial analytics platform built with Streamlit and Python. Pulls real-time market data through the yFinance API, computes technical indicators (RSI, Moving Averages, Volatility), and generates time-series forecasts using both statistical models (Facebook Prophet) and deep learning architectures (LSTM networks in TensorFlow/Keras), visualized with dynamic Plotly charts.",
    learned:
      "Recurrent neural network (LSTM) sequence modeling for financial time-series data, Prophet trend and seasonality decomposition, and architecting reactive Python web UIs with Streamlit.",
    links: { github: "https://github.com/prathamesh-07/-Stock-Prediction-Webapp" },
  },
  {
    id: "firmware-hawk-eye",
    num: "07",
    title: "Firmware HawkEye",
    subtitle: "IoT firmware vulnerability scanner with structured audit reports",
    track: "cybersecurity",
    trackLabel: "Cybersecurity",
    isResearch: false,
    tags: ["TypeScript", "React 18", "Radix UI"],
    summary:
      "React 18 platform that ingests binary firmware files, detects security misconfigurations and exposed keys, and exports prioritized JSON audit reports.",
    problem:
      "Embedded IoT device firmware often harbors critical security misconfigurations, exposed keys, and outdated component vulnerabilities that are cumbersome to detect without specialized tooling.",
    built:
      "A dedicated firmware security analysis platform built with React 18, TypeScript, Tailwind CSS, and Radix UI primitives. Ingests binary firmware files, performs automated vulnerability detection and potential issue scanning, visualizes internal firmware structure, generates prioritized remediation recommendations, and exports structured audit reports in JSON.",
    learned:
      "Firmware binary analysis methodologies, security audit reporting workflows, accessible dashboard component composition using Radix UI primitives, and asynchronous client-side file inspection.",
    links: { github: "https://github.com/prathamesh-07/firmware-hawk-eye" },
  },
];

/* ─── Drawer / Bottom-sheet ──────────────────────────────────────────────── */
const ProjectDrawer = ({ project, onClose, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  const drawerRef    = useRef(null);
  const closeRef     = useRef(null);

  /* Focus trap */
  useEffect(() => {
    if (!drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'a[href],button:not([disabled]),textarea,input,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap  = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, []);

  /* Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Restore focus */
  useEffect(() => () => triggerRef?.current?.focus(), [triggerRef]);

  const desktopVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: shouldReduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:   { x: "100%", opacity: 0, transition: { duration: shouldReduce ? 0 : 0.2 } },
  };
  const mobileVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:   { y: "100%", opacity: 0, transition: { duration: shouldReduce ? 0 : 0.2 } },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ background: "rgba(5,8,22,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      aria-hidden="false"
    >
      {/* Desktop: right drawer */}
      <motion.div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="hidden md:flex ml-auto flex-col w-full max-w-xl h-full overflow-y-auto shadow-2xl"
        style={{ background: T.surface, borderLeft: `1px solid ${T.border}` }}
        variants={desktopVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerContent project={project} onClose={onClose} closeRef={closeRef} />
      </motion.div>

      {/* Mobile: bottom sheet */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="flex md:hidden mt-auto flex-col w-full max-h-[88vh] overflow-y-auto rounded-t-2xl shadow-2xl"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}
        variants={mobileVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerContent project={project} onClose={onClose} closeRef={closeRef} />
      </motion.div>
    </div>
  );
};

const DrawerContent = ({ project, onClose, closeRef }) => (
  <div className="p-6 sm:p-8 flex flex-col gap-6 h-full">
    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <TrackPill track={project.track} label={project.trackLabel} />
        <h2
          id="drawer-title"
          className="text-xl sm:text-2xl font-black mt-3 leading-tight"
          style={{ color: "var(--text-main)" }}
        >
          {project.title}
        </h2>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {project.subtitle}
        </p>
        {project.venue && (
          <p className="text-xs font-semibold mt-1" style={{ color: "var(--color-violet)" }}>
            {project.venue}
          </p>
        )}
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close details"
        className="p-2 rounded-lg transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
        style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-main)" }}
      >
        <IconClose size={20} />
      </button>
    </div>

    {/* Body sections */}
    <div className="flex flex-col gap-5 flex-1 text-sm" style={{ color: "var(--text-muted)" }}>
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
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}`, color: "var(--text-main)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Links */}
      <div className="mt-auto pt-4 flex flex-wrap gap-3" style={{ borderTop: `1px solid ${T.border}` }}>
        {project.links.paper && (
          <a
            href={project.links.paper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            style={{ background: "var(--color-violet)" }}
          >
            <IconExternalLink size={13} />
            View on IEEE Xplore
          </a>
        )}
        {project.links.doiUrl && (
          <a
            href={project.links.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-main)", border: `1px solid ${T.border}` }}
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
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-main)", border: `1px solid ${T.border}` }}
          >
            <IconGithub size={14} />
            GitHub
          </a>
        )}
        {project.links.note && (
          <span className="text-xs italic self-center" style={{ color: "var(--text-muted)" }}>
            {project.links.note}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Section = ({ label, children }) => (
  <div>
    <p
      className="text-[10px] font-bold uppercase tracking-widest mb-2"
      style={{ color: "var(--color-indigo)" }}
    >
      {label}
    </p>
    {children}
  </div>
);

/* ─── Research row ───────────────────────────────────────────────────────── */
const ResearchRow = ({ project, onClick, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4 py-5 cursor-pointer"
      style={{ borderBottom: `1px solid ${T.border}` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      ref={triggerRef}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
    >
      {/* Book icon */}
      <span
        className="flex-shrink-0 p-2 rounded-lg mt-0.5"
        style={{ background: "rgba(136,92,245,0.12)", color: "var(--color-violet)" }}
      >
        <IconBook size={16} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <TrackPill track={project.track} label={project.trackLabel} />
          <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
            {project.venue}
          </span>
        </div>
        <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text-main)" }}>
          {project.title}
        </p>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
          {project.summary}
        </p>
        {project.links.doiUrl && (
          <a
            href={project.links.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono mt-1.5 inline-block hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-violet)" }}
            onClick={(e) => e.stopPropagation()}
          >
            DOI: {project.links.doi}
          </a>
        )}
      </div>

      {/* Arrow */}
      <motion.span
        className="flex-shrink-0 self-center"
        style={{ color: "var(--text-muted)" }}
        animate={{}}
        whileHover={shouldReduce ? {} : { x: 4 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <IconArrowRight size={16} />
      </motion.span>
    </motion.div>
  );
};

/* ─── Editorial project row ─────────────────────────────────────────────── */
const ProjectRow = ({ project, index, onClick, triggerRef }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-4 sm:gap-6 py-5 cursor-pointer"
      style={{ borderBottom: `1px solid ${T.border}` }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      ref={triggerRef}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
    >
      {/* Number */}
      <span
        className="text-[13px] font-mono font-bold w-7 flex-shrink-0 text-right select-none"
        style={{ color: "var(--color-indigo)" }}
      >
        {project.num}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-sm sm:text-base font-bold" style={{ color: "var(--text-main)" }}>
            {project.title}
          </span>
          <TrackPill track={project.track} label={project.trackLabel} />
        </div>
        <p className="text-xs line-clamp-1 mb-2" style={{ color: "var(--text-muted)" }}>
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: "var(--text-muted)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <motion.span
        className="flex-shrink-0"
        style={{ color: "var(--text-muted)" }}
        whileHover={shouldReduce ? {} : { x: 4 }}
        transition={{ duration: 0.15 }}
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
    if (track === "all") {
      const next = new URLSearchParams(searchParams);
      next.delete("track");
      setSearchParams(next);
    } else {
      setSearchParams({ track });
    }
  }, [searchParams, setSearchParams]);

  const openProject = useCallback((project) => setActiveProject(project), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  /* Filter logic */
  const researchItems = projectItems.filter((p) => p.isResearch);
  const workItems     = projectItems.filter((p) => !p.isResearch).filter((p) => {
    if (currentTrack === "all")           return true;
    if (currentTrack === "web")           return p.track === "web" || p.track === "both";
    if (currentTrack === "cybersecurity") return p.track === "cybersecurity" || p.track === "both";
    return true;
  });
  const showResearch = currentTrack === "all" || currentTrack === "cybersecurity";

  const tabs = [
    { id: "all",           label: "All Work" },
    { id: "web",           label: "Web Development" },
    { id: "cybersecurity", label: "Cybersecurity" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col pt-20"
      style={{ background: T.bg, color: "var(--text-main)" }}
    >
      {/* Static pinstripe background */}
      <div
        className="bg-pinstripe-grid fixed inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-10 py-16 sm:py-24">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-indigo)" }}
          >
            Portfolio
          </p>
          <h1
            className="font-black tracking-tight leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "var(--text-main)",
            }}
          >
            Selected Work<br />
            <span style={{ color: "var(--color-indigo)" }}>&amp; Research</span>
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Production web systems, cryptographic pipelines, and two published IEEE papers in AI audio forensics.
          </p>
        </motion.div>

        {/* ── Segmented filter ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 overflow-x-auto"
        >
          <div
            role="tablist"
            aria-label="Filter by discipline"
            className="relative flex items-center p-1 rounded-xl w-fit"
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
                  className="relative z-10 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                  style={{
                    color: active ? "#fff" : "var(--text-muted)",
                    background: active ? "var(--color-indigo)" : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div>
          {/* Research section */}
          <AnimatePresence mode="wait">
            {showResearch && (
              <motion.section
                key="research"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                aria-labelledby="research-heading"
                className="mb-10"
              >
                <div
                  className="flex items-center gap-3 mb-2 pb-3"
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <h2
                    id="research-heading"
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--color-violet)" }}
                  >
                    Research Publications
                  </h2>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "rgba(136,92,245,0.12)", color: "var(--color-violet)" }}
                  >
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

          {/* Projects section */}
          <section aria-labelledby="projects-heading">
            {workItems.length > 0 && (
              <div
                className="flex items-center gap-3 mb-2 pb-3"
                style={{ borderBottom: `1px solid ${T.border}` }}
              >
                <h2
                  id="projects-heading"
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--color-indigo)" }}
                >
                  Projects
                </h2>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(99,102,241,0.1)", color: "var(--color-indigo)" }}
                >
                  {workItems.length} items
                </span>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {workItems.length > 0 ? (
                workItems.map((p, i) => (
                  <ProjectRow
                    key={p.id}
                    project={p}
                    index={i}
                    onClick={openProject}
                    triggerRef={(el) => { triggerRefs.current[p.id] = el; }}
                  />
                ))
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-sm text-center"
                  style={{ color: "var(--text-muted)" }}
                >
                  No projects match this filter.
                </motion.p>
              )}
            </AnimatePresence>
          </section>
        </div>
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
