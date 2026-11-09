import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { IconGithub, IconExternalLink, IconClose, IconCode, IconShield, IconCheck } from "../components/shared/Icons";

const projectItems = [
  {
    id: "ieee-deepfake",
    title: "Real-Time Detection of AI-Generated Deepfake Audio",
    subtitle: "Research Publication — ICTBIG 2024 (IEEE Xplore)",
    track: "cybersecurity",
    trackLabel: "Cybersecurity Research",
    isFeatured: true,
    tags: ["Signal Processing", "CNN", "STFT", "MFCC", "Audio Forensics"],
    problem:
      "Rapid advances in generative voice cloning tools present acute threats of impersonation fraud and disinformation. Existing detection mechanisms suffer from high inference latency and fail under real-world acoustic degradation.",
    built:
      "A real-time CNN signal-processing pipeline that performs short-time Fourier transform (STFT) to analyze spectral feature dynamics. Extracted Mel-frequency cepstral coefficients (MFCCs) and spectral descriptors to classify authentic vs synthetic speech in real time.",
    learned:
      "Advanced acoustic signal representation, spectrogram feature engineering, and optimizing neural inference for low latency without sacrificing accuracy.",
    links: {
      paper: "https://doi.org/10.1109/ICTBIG57409.2024.10911062",
      doi: "10.1109/ICTBIG57409.2024.10911062",
    },
  },
  {
    id: "email-security-analyst",
    title: "Email Security Analyst",
    subtitle: "Phishing Detection & Threat Scoring Platform",
    track: "cybersecurity",
    trackLabel: "Cybersecurity",
    isFeatured: false,
    tags: ["Python", "Flask", "Scikit-learn", "TF-IDF", "SPF / DKIM / DMARC"],
    problem:
      "Phishing remains the predominant vector for corporate credential compromise. Conventional email filters frequently miss targeted spear-phishing messages with clean domain reputation.",
    built:
      "A Flask-based web security application that ingests raw email headers and bodies. Employs TF-IDF vectorization and Logistic Regression to detect deceptive language, combined with programmatic DNS queries to verify SPF, DKIM, and DMARC authentication records, attachment scanning, and link parsing to produce a composite risk report.",
    learned:
      "Practical implementation of mail exchange protocols (RFC 7208 / 6376 / 7489), feature engineering on text, and mitigating false positives in threat classification.",
    links: {
      github: "https://github.com/prathamesh-07", // TODO: Specific repo URL when public
    },
  },
  {
    id: "cloudmigrate",
    title: "CloudMigrate",
    subtitle: "Multi-Cloud Data Orchestration Platform",
    track: "both",
    trackLabel: "Both Tracks (Web & Sec)",
    isFeatured: false,
    tags: ["Next.js", "Python", "AWS S3", "GCP", "Supabase", "Cryptographic Hashes"],
    problem:
      "Enterprise data mobility between competing cloud platforms is frequently plagued by network interruptions, silent bitrot, and lack of verified data integrity checkpoints.",
    built:
      "A multi-cloud orchestration pipeline that transfers large datasets securely from AWS S3 buckets to Google Cloud Storage. Computed MD5 and SHA-256 cryptographic hashes prior to dispatch and immediately upon cloud arrival to guarantee zero transfer corruption. Powered by a Next.js control plane with Supabase logging.",
    learned:
      "Asynchronous stream handling with boto3 and google-cloud-storage libraries, and end-to-end cryptographic checksum verification in distributed pipelines.",
    links: {
      github: "https://github.com/prathamesh-07",
    },
  },
  {
    id: "atms",
    title: "ATMS — Enterprise Asset Management",
    subtitle: "Full-Stack System with Role-Based Access Control",
    track: "both",
    trackLabel: "Both Tracks (Web & Sec)",
    isFeatured: false,
    tags: ["React", "Node.js", "Express", "MongoDB", "RBAC", "JWT"],
    problem:
      "Small-to-midsize organizations struggle to monitor physical and digital IT assets across their lifecycle, resulting in compliance audit failures and unpatched vulnerabilities.",
    built:
      "An enterprise web application built on React, Express, and MongoDB that audits, assigns, and retires organizational assets. Enforces strict server-side Role-Based Access Control (RBAC) and immutable audit log trails ensuring users access only resources permitted by their role.",
    learned:
      "Granular permission modeling, secure session management, and structuring scalable NoSQL schemas with strict access boundaries.",
    links: {
      github: "https://github.com/prathamesh-07",
    },
  },
  {
    id: "delpat-production",
    title: "DelPat LLP Production Systems",
    subtitle: "Production Web Applications & Cloud Infrastructure",
    track: "web",
    trackLabel: "Web Development",
    isFeatured: false,
    tags: ["React", "Next.js", "JWT Auth", "AWS EC2", "Vercel", "Firebase"],
    problem:
      "Client organizations needed scalable, modern web platforms to replace legacy monoliths and repetitive custom components that slowed down engineering velocity.",
    built:
      "Engineered and deployed 6+ production web applications end-to-end. Architected a role-based CMS backend with JWT authentication and full CRUD APIs; executed a zero-downtime WordPress-to-React migration; established a shared React component library adopted across projects; and managed deployments on AWS EC2, Vercel, and Firebase.",
    learned:
      "Client-facing production SLAs, cross-team component reuse, CI/CD pipeline stabilization, and resolving real-world cloud deployment challenges.",
    links: {
      note: "Client production code subject to NDA",
    },
  },
];

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTrack = searchParams.get("track") || "all";
  const [activeModalProject, setActiveModalProject] = useState(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    document.title = "Projects | Prathamesh Chiddarwar — Web Dev & Cybersecurity";
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (track) => {
    if (track === "all") {
      searchParams.delete("track");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ track });
    }
  };

  const filteredProjects = projectItems.filter((item) => {
    if (currentTrack === "all") return true;
    if (currentTrack === "web") return item.track === "web" || item.track === "both";
    if (currentTrack === "cybersecurity") return item.track === "cybersecurity" || item.track === "both";
    return true;
  });

  // Modal accessibility: Escape key and focus trapping
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setActiveModalProject(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeModalProject]);

  return (
    <div className="relative min-h-screen bg-[#050816] text-white flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-16 py-12 w-full">
        {/* Header and Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-2">
              <span>Portfolio</span>
              <span className="text-secondary">/</span>
              <span className="text-secondary">Technical Projects</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Projects & Research
            </h1>
            <p className="mt-2 text-secondary text-base max-w-2xl leading-relaxed">
              Real systems spanning secure web applications, data migration pipelines with cryptographic verification, and published AI audio forensic research.
            </p>
          </div>

          {/* Segmented Track Filter */}
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="flex items-center p-1.5 rounded-xl bg-[#151030] border border-white/10 self-start md:self-auto"
          >
            {[
              { id: "all", label: "All Work" },
              { id: "web", label: "Web Development" },
              { id: "cybersecurity", label: "Cybersecurity" },
            ].map((tab) => {
              const active = currentTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#6366f1] text-white shadow-md shadow-[#6366f1]/20"
                      : "text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Featured Wide Tile: IEEE Research Paper */}
          {(currentTrack === "all" || currentTrack === "cybersecurity") && (
            <article
              className="md:col-span-12 bg-[#151030] border border-[#8b5cf6]/40 rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/40 font-bold uppercase tracking-wider">
                      Published Research · IEEE Xplore
                    </span>
                    <span className="text-xs text-secondary font-mono">ICTBIG 2024</span>
                  </div>
                  <a
                    href="https://doi.org/10.1109/ICTBIG57409.2024.10911062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b5cf6] hover:text-white transition-colors"
                  >
                    <span>DOI: 10.1109/ICTBIG57409.2024.10911062</span>
                    <IconExternalLink size={14} />
                  </a>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight mb-2">
                  Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach
                </h2>
                <p className="text-secondary text-sm sm:text-base max-w-4xl leading-relaxed mb-6">
                  Published peer-reviewed research addressing synthetic voice cloning threats. Engineered a CNN-based signal-processing pipeline using spectral feature analysis (STFT and MFCCs) capable of distinguishing synthetic speech from authentic human speech in real time with minimal latency overhead.
                </p>

                {/* Method Overview Pill Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { step: "01", title: "STFT Conversion", desc: "Audio signal converted to time-frequency spectrogram." },
                    { step: "02", title: "Feature Extraction", desc: "MFCC, chroma, and spectral contrast vectors computed." },
                    { step: "03", title: "CNN Analysis", desc: "Convolutional network learns synthetic acoustic artifacts." },
                    { step: "04", title: "Real-Time Scoring", desc: "Softmax probability outputs authentic vs deepfake confidence." },
                  ].map((m) => (
                    <div key={m.step} className="p-3 rounded-xl bg-[#100d25] border border-white/5">
                      <span className="text-xs font-mono font-bold text-[#8b5cf6]">{m.step}</span>
                      <h3 className="text-xs font-bold text-white mt-1">{m.title}</h3>
                      <p className="text-[11px] text-secondary mt-0.5 leading-snug">{m.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Signal Processing", "CNN", "STFT Spectrograms", "MFCCs", "AI Threat Defense"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-secondary border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(projectItems[0])}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  View Full Study Details
                </button>
                <a
                  href="https://doi.org/10.1109/ICTBIG57409.2024.10911062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors"
                >
                  <span>Open IEEE Xplore Record</span>
                  <IconExternalLink size={14} />
                </a>
              </div>
            </article>
          )}

          {/* Regular Project Tiles */}
          {filteredProjects
            .filter((p) => !p.isFeatured)
            .map((project) => (
              <article
                key={project.id}
                className="md:col-span-6 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-card hover:border-[#6366f1]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        project.track === "cybersecurity"
                          ? "bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30"
                          : project.track === "web"
                          ? "bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {project.trackLabel}
                    </span>

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-white transition-colors p-1"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <IconGithub size={18} />
                      </a>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-[#6366f1] transition-colors mb-1">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#a5b4fc] font-medium mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.problem}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-secondary border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6366f1] hover:text-[#a5b4fc] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <span>→</span>
                  </button>
                  <span className="text-[11px] text-secondary font-mono">
                    {project.track === "both" ? "Dual-Track" : project.track}
                  </span>
                </div>
              </article>
            ))}

        </div>
      </main>

      {/* Accessible Project Details Modal / Drawer */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            ref={modalRef}
            className="bg-[#151030] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6366f1] px-2.5 py-0.5 rounded bg-[#6366f1]/10 border border-[#6366f1]/20">
                  {activeModalProject.trackLabel}
                </span>
                <h2 id="modal-project-title" className="text-2xl font-black text-white mt-2">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-secondary mt-0.5">{activeModalProject.subtitle}</p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close project details"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <IconClose size={20} />
              </button>
            </div>

            <div className="space-y-6 text-sm text-secondary leading-relaxed mt-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  1. The Problem
                </h3>
                <p className="bg-[#100d25] p-4 rounded-xl border border-white/5 text-white/90">
                  {activeModalProject.problem}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  2. What I Built
                </h3>
                <p className="bg-[#100d25] p-4 rounded-xl border border-white/5 text-white/90">
                  {activeModalProject.built}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                  3. Key Takeaway & Learning
                </h3>
                <p className="bg-[#100d25] p-4 rounded-xl border border-white/5 text-white/90">
                  {activeModalProject.learned}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  4. Technologies & Protocols
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 text-white border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {activeModalProject.links.paper && (
                  <a
                    href={activeModalProject.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors"
                  >
                    <span>View on IEEE Xplore</span>
                    <IconExternalLink size={14} />
                  </a>
                )}
                {activeModalProject.links.github && (
                  <a
                    href={activeModalProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <IconGithub size={15} />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {activeModalProject.links.note && (
                  <span className="text-xs text-secondary italic">
                    {activeModalProject.links.note}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="text-xs text-secondary hover:text-white transition-colors ml-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectsPage;

