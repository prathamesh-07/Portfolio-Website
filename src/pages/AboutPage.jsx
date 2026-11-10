import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Logo from "../components/shared/Logo";
import { IconDownload, IconExternalLink, IconShield, IconCode, IconCheck } from "../components/shared/Icons";

// Portrait 4:5 AVIF
import portraitAvif480 from "../assets/brand/portrait-4x5-480.avif";
import portraitAvif800 from "../assets/brand/portrait-4x5-800.avif";
import portraitAvif1200 from "../assets/brand/portrait-4x5-1200.avif";
import portraitAvif1600 from "../assets/brand/portrait-4x5-1600.avif";

// Portrait 4:5 WebP
import portraitWebp480 from "../assets/brand/portrait-4x5-480.webp";
import portraitWebp800 from "../assets/brand/portrait-4x5-800.webp";
import portraitWebp1200 from "../assets/brand/portrait-4x5-1200.webp";
import portraitWebp1600 from "../assets/brand/portrait-4x5-1600.webp";

// Portrait 4:5 JPG Fallback
import portraitJpg480 from "../assets/brand/portrait-4x5-480.jpg";
import portraitJpg800 from "../assets/brand/portrait-4x5-800.jpg";
import portraitJpg1200 from "../assets/brand/portrait-4x5-1200.jpg";
import portraitJpg1600 from "../assets/brand/portrait-4x5-1600.jpg";

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
            Full-stack developer and cybersecurity graduate (Class of 2026). I build production web applications and research AI-driven security threats.
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Tile 1 (Span 7 on desktop): Bio & Engineering Background */}
          <section
            aria-labelledby="bio-heading"
            className="md:col-span-7 bg-[#151030] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-card"
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
                  I am a Computer Science graduate (<strong className="text-white font-semibold">Class of 2026</strong>) specializing in <strong className="text-white font-semibold">Cyber Security and Forensics</strong> at MIT World Peace University, Pune, with practical experience building and deploying full-stack web applications end-to-end.
                </p>
                <p>
                  During my internship at <strong className="text-white font-semibold">DelPat LLP</strong>, I engineered and deployed 6+ production web applications across client and internal products. My responsibilities included architecting a role-based CMS backend with JWT authentication, leading a complete WordPress-to-React migration, publishing a reusable component library, and orchestrating multi-environment cloud deployments across AWS EC2, Vercel, and Firebase.
                </p>
                <p>
                  Alongside production web development, I pursue academic research on emerging digital threats. I have authored and published two peer-reviewed research papers in <strong className="text-white font-semibold">IEEE Xplore</strong> (ICTBIG 2024 &amp; ICTBIG 2025) focused on AI-generated deepfake audio detection methods and comprehensive reviews of acoustic forensic defenses.
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

          {/* Tile 2 (Span 5 on desktop): Portrait & Caption Tile */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Large Bento Tile: 4:5 Portrait */}
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_12px_36px_-8px_rgba(139,92,246,0.3)] bg-[#151030] relative aspect-[4/5] w-full">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${portraitAvif480} 480w, ${portraitAvif800} 800w, ${portraitAvif1200} 1200w, ${portraitAvif1600} 1600w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 480px"
                />
                <source
                  type="image/webp"
                  srcSet={`${portraitWebp480} 480w, ${portraitWebp800} 800w, ${portraitWebp1200} 1200w, ${portraitWebp1600} 1600w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 480px"
                />
                <img
                  src={portraitJpg800}
                  srcSet={`${portraitJpg480} 480w, ${portraitJpg800} 800w, ${portraitJpg1200} 1200w, ${portraitJpg1600} 1600w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 480px"
                  alt="Portrait of Prathamesh Chiddarwar in a navy blazer"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
              </picture>
            </div>

            {/* Small Caption Tile */}
            <aside
              aria-label="Author snapshot"
              className="rounded-2xl border border-white/10 bg-[#100d25] p-6 shadow-card flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Prathamesh Chiddarwar
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold">
                  <span className="text-[#6366f1]">Full-Stack Developer</span>
                  <span className="text-white/30">·</span>
                  <span className="text-[#8b5cf6]">Cybersecurity</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-secondary">Location</span>
                    <span className="text-white font-medium text-xs">Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-secondary">Education</span>
                    <span className="text-white font-medium text-xs">B.Tech Graduate (Class of 2026)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-secondary">Specialization</span>
                    <span className="text-white font-medium text-xs">Cyber Security &amp; Forensics</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <a
                  href="/assets/Prathamesh_Chiddarwar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Prathamesh_Chiddarwar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-md shadow-[#6366f1]/20 transition-all"
                >
                  <IconDownload size={15} />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </aside>
          </div>

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
                    <span><strong className="text-white">2x Published IEEE Xplore Papers:</strong> Real-time detection &amp; comprehensive review of deepfake audio forensic techniques.</span>
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
                    <li>Engineered and deployed 6+ production web applications end-to-end across client and internal projects.</li>
                    <li>Architected role-based CMS backend with JWT auth and complete CRUD APIs; led client WordPress-to-React migration.</li>
                    <li>Built reusable component library and kickstarted cross-platform React Native app from PRD and ER diagrams.</li>
                    <li>Provisioned AWS EC2 infrastructure and managed Vercel / Firebase multi-environment cloud CI deployments.</li>
                  </ul>
                </div>

                {/* IEEE Research 1 (ICTBIG 2024) */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#8b5cf6] ring-4 ring-[#151030]" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30">
                      Cybersecurity Research
                    </span>
                    <span className="text-xs text-secondary">Nov 2024 – Mar 2025</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Researcher — ICTBIG 2024 (IEEE Xplore)
                  </h3>
                  <p className="text-secondary text-xs mb-2">
                    DOI: <a href="https://doi.org/10.1109/ICTBIG64922.2024.10911062" target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">10.1109/ICTBIG64922.2024.10911062</a>
                  </p>
                  <ul className="text-xs sm:text-sm text-secondary space-y-1.5 list-disc ml-4">
                    <li>Authored &amp; published peer-reviewed paper: "Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach".</li>
                    <li>Designed and implemented CNN signal-processing pipeline using spectral feature analysis (STFT and MFCCs).</li>
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
                      Graduated 2026
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

