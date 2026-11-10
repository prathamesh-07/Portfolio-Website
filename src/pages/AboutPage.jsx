import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Logo from "../components/shared/Logo";
import { IconDownload, IconExternalLink, IconShield, IconCode, IconCheck } from "../components/shared/Icons";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | Prathamesh Chiddarwar — Web Development & Cybersecurity";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050816] text-white flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-16 py-12 w-full">
        {/* Header Breadcrumb / Label */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-2">
            <span>Profile</span>
            <span className="text-secondary">/</span>
            <span className="text-secondary">Background & Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Me
          </h1>
          <p className="mt-3 text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
            Full-stack developer and cybersecurity student. I build production web applications and research AI-driven security threats.
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Tile 1 (Span 8): Bio & Engineering Background */}
          <section
            aria-labelledby="bio-heading"
            className="md:col-span-8 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                <h2 id="bio-heading" className="text-xl sm:text-2xl font-bold text-white">
                  Engineering Background
                </h2>
              </div>
              <div className="text-secondary text-[15px] sm:text-[16px] leading-relaxed space-y-4">
                <p>
                  I am a final-year Computer Science student specializing in <strong className="text-white font-semibold">Cyber Security and Forensics</strong> at MIT World Peace University, Pune, with practical experience building and deploying full-stack web applications end-to-end.
                </p>
                <p>
                  During my internship at <strong className="text-white font-semibold">DelPat LLP</strong>, I engineered and deployed 6+ production web applications across client and internal products. My responsibilities included architecting a role-based CMS backend with JWT authentication, leading a complete WordPress-to-React migration, publishing a reusable component library, and orchestrating multi-environment cloud deployments across AWS EC2, Vercel, and Firebase.
                </p>
                <p>
                  Alongside production web development, I pursue academic research on emerging digital threats. In 2024–2025, I authored and published a peer-reviewed research paper in <strong className="text-white font-semibold">IEEE Xplore</strong> introducing a real-time CNN-based signal-processing method for detecting AI-generated deepfake audio.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Tracks:</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30 font-medium">
                  Web Development
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30 font-medium">
                  Cybersecurity
                </span>
              </div>
              <Link
                to="/contact"
                className="text-sm font-semibold text-[#6366f1] hover:text-[#a5b4fc] transition-colors"
              >
                Get in touch →
              </Link>
            </div>
          </section>

          {/* Tile 2 (Span 4): Headshot Placeholder & Quick Meta */}
          <aside
            aria-label="Author snapshot"
            className="md:col-span-4 bg-[#100d25] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-card"
          >
            <div>
              <div className="w-full aspect-square rounded-xl bg-[#151030] border border-white/10 flex flex-col items-center justify-center p-6 text-center mb-6 shadow-inner">
                <Logo variant="icon" tone="color" width={110} height={110} decorative />
                <span className="text-white font-bold text-base mt-4 tracking-tight">
                  Prathamesh Chiddarwar
                </span>
                <span className="text-xs text-secondary mt-1">
                  Full-Stack Developer · Cyber Security
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-secondary">Location</span>
                  <p className="text-white font-medium">Pune, Maharashtra, India</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-secondary">Current Focus</span>
                  <p className="text-white font-medium">B.Tech (2022–2026) & Full-Stack / Security</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-secondary">Open For</span>
                  <p className="text-white font-medium">Software Engineering & Security Roles</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <a
                href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Prathamesh_Chiddarwar_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-md shadow-[#6366f1]/20 transition-all"
              >
                <IconDownload size={16} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </aside>

          {/* Tile 3 (Span 12): Two Tracks Split (Equal Prominence) */}
          <section
            aria-labelledby="tracks-heading"
            className="md:col-span-12 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 id="tracks-heading" className="text-xl sm:text-2xl font-bold text-white">
                  Equal Focus: Two Core Disciplines
                </h2>
                <p className="text-secondary text-sm mt-1">
                  Neither discipline is secondary. Software engineering provides the ability to build; cybersecurity ensures what is built resists adversarial attack.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Track A: Web Development */}
              <div className="p-6 rounded-xl bg-[#100d25] border-l-4 border-[#6366f1] border-t border-r border-b border-white/5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="p-2 rounded-lg bg-[#6366f1]/20 text-[#6366f1]">
                    <IconCode size={18} />
                  </span>
                  <h3 className="text-lg font-bold text-white">Web Development Track</h3>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  Full-stack application engineering from concept to multi-environment deployment. Focus on robust backend APIs, role-based architectures, and modern component systems.
                </p>
                <ul className="space-y-2 text-sm text-secondary" role="list">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366f1] mt-0.5">▸</span>
                    <span><strong className="text-white">DelPat LLP:</strong> Built and shipped 6+ web applications end-to-end.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366f1] mt-0.5">▸</span>
                    <span><strong className="text-white">Full-Stack Stack:</strong> React, Next.js, Node.js, Express, MongoDB, MySQL.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6366f1] mt-0.5">▸</span>
                    <span><strong className="text-white">Cloud Delivery:</strong> AWS EC2 & S3, Vercel, Firebase hosting with CI pipelines.</span>
                  </li>
                </ul>
              </div>

              {/* Track B: Cybersecurity */}
              <div className="p-6 rounded-xl bg-[#100d25] border-l-4 border-[#8b5cf6] border-t border-r border-b border-white/5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="p-2 rounded-lg bg-[#8b5cf6]/20 text-[#8b5cf6]">
                    <IconShield size={18} />
                  </span>
                  <h3 className="text-lg font-bold text-white">Cybersecurity Track</h3>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  Penetration testing, threat modeling, security compliance standards, and applied AI-security research into synthetic audio detection.
                </p>
                <ul className="space-y-2 text-sm text-secondary" role="list">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8b5cf6] mt-0.5">▸</span>
                    <span><strong className="text-white">IEEE Xplore Paper:</strong> Published real-time deepfake audio detection method.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8b5cf6] mt-0.5">▸</span>
                    <span><strong className="text-white">Vulnerability Assessment:</strong> Wireshark, Nmap, Nessus, Burp Suite, Metasploit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8b5cf6] mt-0.5">▸</span>
                    <span><strong className="text-white">Competitions & Governance:</strong> HackMIT CTF 5th Rank, ISO 27001 (ISMS), ISO 9001.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tile 4 (Span 7): Experience Timeline */}
          <section
            aria-labelledby="experience-timeline-heading"
            className="md:col-span-7 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 id="experience-timeline-heading" className="text-xl font-bold text-white">
                  Experience & Research
                </h2>
                <span className="text-xs text-secondary font-mono">2024–2025</span>
              </div>

              <div className="space-y-6 relative border-l-2 border-white/10 pl-6 ml-2">
                {/* DelPat */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#6366f1] ring-4 ring-[#151030]" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30">
                      Web Development
                    </span>
                    <span className="text-xs text-secondary">Jun 2025 – Dec 2025</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Full Stack Developer Intern — DelPat LLP
                  </h3>
                  <p className="text-secondary text-xs mb-2">Remote</p>
                  <ul className="text-xs sm:text-sm text-secondary space-y-1.5 list-disc ml-4">
                    <li>Engineered and deployed 6+ production web applications end-to-end.</li>
                    <li>Architected role-based CMS backend with JWT auth and complete CRUD APIs.</li>
                    <li>Led client WordPress-to-React migration and built reusable component library.</li>
                    <li>Provisioned AWS EC2 infrastructure and managed Vercel / Firebase CI deployments.</li>
                  </ul>
                </div>

                {/* IEEE Research */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#8b5cf6] ring-4 ring-[#151030]" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30">
                      Cybersecurity
                    </span>
                    <span className="text-xs text-secondary">Nov 2024 – Mar 2025</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Researcher — ICTBIG 2024 (IEEE Xplore)
                  </h3>
                  <p className="text-secondary text-xs mb-2">
                    DOI: <a href="https://doi.org/10.1109/ICTBIG57409.2024.10911062" target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">10.1109/ICTBIG57409.2024.10911062</a>
                  </p>
                  <ul className="text-xs sm:text-sm text-secondary space-y-1.5 list-disc ml-4">
                    <li>Authored & published peer-reviewed paper: "Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach".</li>
                    <li>Designed and implemented CNN signal-processing pipeline using spectral feature analysis.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-secondary">
              <span>Timeline verified with resume</span>
              <Link to="/projects" className="text-[#6366f1] hover:underline">View Projects →</Link>
            </div>
          </section>

          {/* Tile 5 (Span 5): Education & Achievements */}
          <section
            aria-labelledby="education-heading"
            className="md:col-span-5 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between"
          >
            <div>
              <h2 id="education-heading" className="text-xl font-bold text-white mb-4">
                Education & Honors
              </h2>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#100d25] border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">MIT World Peace University</h3>
                      <p className="text-xs text-secondary">B.Tech in CSE (Cyber Security & Forensics)</p>
                    </div>
                    <span className="text-xs font-semibold text-[#6366f1] bg-[#6366f1]/10 px-2 py-0.5 rounded">
                      2022–2026
                    </span>
                  </div>
                  <p className="text-xs text-white/90 mt-2 font-medium">CGPA: 7.47 / 10</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100d25] border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">Hislop Junior College</h3>
                      <p className="text-xs text-secondary">HSC (MSBSHSE), Nagpur</p>
                    </div>
                    <span className="text-xs text-secondary">2022</span>
                  </div>
                  <p className="text-xs text-white/90 mt-2 font-medium">Score: 70.67%</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100d25] border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">Jet Kids International School</h3>
                      <p className="text-xs text-secondary">SSC (CBSE), Pusad</p>
                    </div>
                    <span className="text-xs text-secondary">2020</span>
                  </div>
                  <p className="text-xs text-white/90 mt-2 font-medium">Score: 87.6%</p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-amber-400 font-bold mt-0.5">★</span>
                    <p className="text-white">
                      <strong>HackMIT 2025 CTF (5th Rank):</strong> Solved 15+ challenges across web security, reverse engineering, and crypto.
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-[#8b5cf6] font-bold mt-0.5">★</span>
                    <p className="text-white">
                      <strong>GIAN Program, NIT Goa:</strong> Blockchain Evolution & Decentralized Systems Certification (2025).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tile 6 (Span 12): Skills Bento Split into Two Equal Track Groups */}
          <section
            aria-labelledby="skills-bento-heading"
            className="md:col-span-12 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card"
          >
            <div className="mb-6">
              <h2 id="skills-bento-heading" className="text-xl sm:text-2xl font-bold text-white">
                Technical Skills & Tools
              </h2>
              <p className="text-secondary text-sm mt-1">
                Strictly factual skills grouped by track. No arbitrary percentage bars or star ratings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Web Development Skills Group */}
              <div className="p-6 rounded-xl bg-[#100d25] border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6366f1] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                  Web Development Toolkit
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-secondary block mb-2">Languages & Core:</span>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "TypeScript", "Python", "SQL"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-secondary block mb-2">Web Frameworks & UI:</span>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "React Native", "Node.js", "Express.js", "TailwindCSS", "REST APIs"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-[#6366f1]/10 text-[#c7d2fe] border border-[#6366f1]/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-secondary block mb-2">Databases & Cloud:</span>
                    <div className="flex flex-wrap gap-2">
                      {["MongoDB", "MySQL", "Firebase", "AWS EC2", "AWS S3", "Vercel", "GCP"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cybersecurity Skills Group */}
              <div className="p-6 rounded-xl bg-[#100d25] border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b5cf6] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                  Cybersecurity & Forensics Toolkit
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-secondary block mb-2">Security Tools:</span>
                    <div className="flex flex-wrap gap-2">
                      {["Wireshark", "Nmap", "Nessus", "Burp Suite", "Metasploit"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-[#8b5cf6]/10 text-[#ddd6fe] border border-[#8b5cf6]/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-secondary block mb-2">Security & Compliance:</span>
                    <div className="flex flex-wrap gap-2">
                      {["Vulnerability Assessment", "Risk Assessment", "ISO 27001 (ISMS)", "ISO 9001 (QMS)", "Penetration Testing"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-secondary block mb-2">Practices & Methodologies:</span>
                    <div className="flex flex-wrap gap-2">
                      {["CI/CD", "Technical Documentation", "Agile Collaboration", "RBAC Architecture", "Analytical Problem-Solving"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

