// src/constants/data.js
// Single source of truth for all site content.
// Keep this file in sync with Prathamesh_Chiddarwar_Resume.pdf.

export const owner = {
  name:     "Prathamesh Chiddarwar",
  email:    "prathameshchiddarwar42@gmail.com",
  phone:    "+91-8767394228",
  linkedin: "https://linkedin.com/in/prathamesh-chiddarwar",
  github:   "https://github.com/prathamesh-07",
  resume:   "/assets/Prathamesh_Chiddarwar_Resume.pdf",
  position: "Full-Stack Developer · Cyber Security Researcher",
  tagline:  "B.Tech Graduate in Computer Science (Cyber Security & Forensics, Class of 2026) building full-stack web apps and 2x published IEEE Xplore researcher in AI-driven security threats.",
};

export const navLinks = [
  { path: "/",           label: "Home"       },
  { path: "/about",      label: "About"      },
  { path: "/experience", label: "Experience" },
  { path: "/projects",   label: "Projects"   },
  { path: "/research",   label: "Research"   },
  { path: "/skills",     label: "Skills"     },
  { path: "/contact",    label: "Contact"    },
];

export const experiences = [
  {
    id: "delpat",
    type: "work",
    title: "Full Stack Developer Intern",
    org: "DelPat LLP",
    location: "Remote",
    dateRange: "Jun 2025 – Dec 2025",
    dateSort: "2025-06",
    points: [
      "Engineered and deployed 6+ production web applications end-to-end across client and internal projects, covering full-stack architecture, deployment, and maintenance.",
      "Architected a role-based CMS backend with JWT authentication, image processing, and full CRUD APIs; led a full WordPress-to-React migration for a client site.",
      "Built a reusable component library adopted across multiple projects, cutting redundant development time and enforcing consistent design standards.",
      "Kickstarted a cross-platform React Native app from PRD and ER-diagram design through navigation and UI-library integration.",
      "Provisioned AWS EC2 cloud infrastructure and managed multi-environment deployments via Vercel and Firebase Hosting, independently resolving CI/build and backend-integration issues.",
    ],
  },
  {
    id: "ieee-research",
    type: "research",
    title: "Researcher",
    org: "ICTBIG 2024 — IEEE Xplore",
    location: "Published",
    dateRange: "Nov 2024 – Mar 2025",
    dateSort: "2024-11",
    points: [
      "Authored and published 'Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach' in IEEE Xplore (DOI: 10.1109/ICTBIG64922.2024.10911062).",
      "Researched and implemented a CNN-based signal-processing pipeline for real-time deepfake audio detection using spectral feature analysis.",
    ],
  },
];

export const education = [
  {
    id: "mitwpu",
    degree: "B.Tech in Computer Science (Cyber Security and Forensics)",
    institution: "MIT World Peace University",
    location: "Pune",
    dateRange: "Graduated 2026",
    grade: "CGPA 7.47 / 10",
  },
  {
    id: "hislop",
    degree: "HSC — MSBSHSE",
    institution: "Hislop Junior College",
    location: "Nagpur",
    dateRange: "2022",
    grade: "70.67%",
  },
  {
    id: "jetkids",
    degree: "SSC — CBSE",
    institution: "Jet Kids International School",
    location: "Pusad",
    dateRange: "2020",
    grade: "87.6%",
  },
];

export const projects = [
  {
    id: "email-security-analyst",
    name: "Email Security Analyst",
    subtitle: "Phishing Detection Platform",
    description:
      "Flask web app that analyses email content and classifies phishing attempts using TF-IDF feature extraction and Logistic Regression. Performs sender authentication checks (SPF, DKIM, DMARC), URL analysis, and attachment scanning to generate a composite threat score and security report.",
    tags: ["Python", "Flask", "Scikit-learn", "TF-IDF", "NLP"],
    category: "security",
    problem: "Phishing emails account for the majority of credential theft incidents. Existing tools are either too expensive or require manual investigation.",
    built: "A self-contained Flask app that takes raw email content (headers + body), extracts TF-IDF features, runs a trained Logistic Regression classifier, verifies SPF/DKIM/DMARC records, scans URLs against pattern rules, and returns a structured threat report with a 0–100 risk score.",
    learned: "Deepened understanding of email authentication protocols and the practical limits of Logistic Regression on adversarial text. Learned to build end-to-end ML pipelines without heavyweight frameworks.",
    // TODO: Add real GitHub repo URL when made public
    githubUrl: null,
    // TODO: Add live demo URL if deployed
    liveUrl: null,
    // TODO: Add screenshot — save to public/assets/projects/email-security-analyst.png
    image: null,
  },
  {
    id: "cloudmigrate",
    name: "CloudMigrate",
    subtitle: "Multi-Cloud Data Orchestration",
    description:
      "Python pipeline that securely transfers files from AWS S3 to Google Cloud Storage, using MD5 and SHA-256 hashing to verify file integrity and detect corruption during transfer.",
    tags: ["Next.js", "Python", "AWS S3", "GCP", "Supabase"],
    category: "cloud",
    problem: "Moving large datasets between cloud providers without corruption or data loss is error-prone when done manually.",
    built: "A pipeline with pre-transfer checksum computation on the source, streaming transfer to GCS, and post-transfer verification. Supabase stores transfer logs and status. A Next.js dashboard shows transfer history and integrity results.",
    learned: "Hands-on with boto3, Google Cloud Storage client libraries, and streaming large binary files efficiently. Reinforced the importance of integrity checking in distributed systems.",
    // TODO: Add real GitHub repo URL
    githubUrl: null,
    liveUrl: null,
    // TODO: Add screenshot — save to public/assets/projects/cloudmigrate.png
    image: null,
  },
  {
    id: "atms",
    name: "ATMS",
    subtitle: "Enterprise Asset Management System",
    description:
      "Full-stack asset management system that tracks organisational assets across their lifecycle, with Role-Based Access Control (RBAC) for secure, permission-based access by user role.",
    tags: ["React", "MongoDB", "RBAC", "Node.js", "Express"],
    category: "fullstack",
    problem: "Many small organisations track hardware and software assets in spreadsheets, leading to audit failures and untracked vulnerabilities.",
    built: "A React frontend with a Node/Express REST API backed by MongoDB. RBAC is enforced at both the API and UI layer — admins can assign, retire, or audit assets; viewers can only query. Includes audit trail logging for every mutation.",
    learned: "Designed a proper RBAC schema from scratch and learned the importance of server-side permission checks even when the UI restricts actions.",
    // TODO: Add real GitHub repo URL
    githubUrl: null,
    liveUrl: null,
    // TODO: Add screenshot — save to public/assets/projects/atms.png
    image: null,
  },
];

export const researchPapers = [
  {
    id: "ieee-deepfake-review-2025",
    title: "A Comprehensive Review of Deepfake Audio Detection Techniques: Advances, Challenges and Future Directions",
    venue: "2025 IEEE 5th International Conference on ICT in Business Industry & Government (ICTBIG)",
    conferenceDates: "12–13 December 2025",
    addedToXplore: "13 January 2026",
    doi: "10.1109/ICTBIG68706.2025.11323737",
    url: "https://ieeexplore.ieee.org/document/11323737",
    doiUrl: "https://doi.org/10.1109/ICTBIG68706.2025.11323737",
    proceedingsUrl: "https://ieeexplore.ieee.org/xpl/conhome/11323510/proceeding",
    dateRange: "Dec 2025 – Jan 2026",
    abstract:
      "Rapid advances in deep learning and generative voice synthesis (TTS, voice conversion, diffusion models) pose unprecedented security challenges. This paper provides a comprehensive review of audio deepfake detection techniques, categorizing acoustic artifact extraction methods, deep neural network classification frameworks, benchmark forensic datasets (ASVspoof, In-the-Wild), and adversarial evasion attacks, concluding with critical future research pathways.",
    method: [
      "Taxonomy of modern generative voice synthesis engines and attack threat models.",
      "Analysis of temporal, spectral, and prosodic feature extraction representations.",
      "Comparative benchmark evaluation across state-of-the-art detector architectures.",
      "Identification of generalization bottlenecks and prospective multimodal forensic countermeasures.",
    ],
  },
  {
    id: "ieee-deepfake-2024",
    title: "Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach",
    venue: "2024 IEEE 4th International Conference on ICT in Business Industry & Government (ICTBIG)",
    conferenceDates: "13–14 December 2024",
    addedToXplore: "13 March 2025",
    doi: "10.1109/ICTBIG64922.2024.10911062",
    url: "https://ieeexplore.ieee.org/document/10911062",
    doiUrl: "https://doi.org/10.1109/ICTBIG64922.2024.10911062",
    dateRange: "Nov 2024 – Mar 2025",
    abstract:
      "AI-generated deepfake audio poses an increasing threat to digital trust. This paper presents a CNN-based signal-processing pipeline capable of detecting synthetic speech in real time using spectral feature analysis. The method achieves high accuracy by extracting Mel-frequency cepstral coefficients (MFCCs) and other spectral descriptors, feeding them into a lightweight convolutional network optimised for low-latency inference.",
    method: [
      "Audio input is converted to a spectrogram using short-time Fourier transform (STFT).",
      "MFCC, chroma, and spectral contrast features are extracted per frame.",
      "A CNN encoder learns discriminative patterns that separate synthetic from natural speech.",
      "A softmax classifier outputs a real-time authenticity score with a configurable detection threshold.",
    ],
  },
];

export const research = researchPapers[1]; // Backwards compatibility

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Web Development",
    items: ["React", "Next.js", "React Native", "Node.js", "Express.js", "TailwindCSS", "REST APIs"],
  },
  {
    category: "Databases & Cloud",
    items: ["MongoDB", "MySQL", "Firebase", "AWS EC2", "AWS S3", "Vercel", "GCP"],
  },
  {
    category: "Security & Compliance",
    items: ["Vulnerability Assessment", "Risk Assessment", "ISO 27001 (ISMS)", "ISO 9001 (QMS)", "Penetration Testing"],
  },
  {
    category: "Security Tools",
    items: ["Wireshark", "Nmap", "Nessus", "Burp Suite", "Metasploit"],
  },
  {
    category: "Practices",
    items: ["Agile Collaboration", "CI/CD", "Technical Documentation", "RBAC Design", "Analytical Problem-Solving"],
  },
];

export const achievements = [
  {
    id: "hackmit",
    title: "HackMIT 2025 (CTF) — 5th Rank",
    description: "Solved 15+ challenges covering web security, reverse engineering, cryptography, and logical analysis.",
    year: "2025",
  },
  {
    id: "blockchain",
    title: "Blockchain Evolution Certification",
    description: "GIAN Program on Decentralised Systems, NIT Goa.",
    year: "2025",
  },
];

