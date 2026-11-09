import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  shopify,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  {
    id: "",
    title: "Home",
    path: "/",
  },
  {
    id: "about",
    title: "About",
    path: "/about",
  },
  {
    id: "projects",
    title: "Projects",
    path: "/projects",
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
  },
];

const services = [
  {
    title: "Full-Stack Web Developer",
    track: "Web Development",
    icon: backend,
  },
  {
    title: "Cybersecurity Analyst",
    track: "Cybersecurity",
    icon: web,
  },
  {
    title: "Frontend & Cloud Engineer",
    track: "Web Development",
    icon: creator,
  },
  {
    title: "Security & Penetration Testing",
    track: "Cybersecurity",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Redux",
    icon: redux,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company_name: "DelPat LLP (Remote)",
    track: "Web Development",
    icon: backend,
    iconBg: "#1d1836",
    date: "Jun 2025 – Dec 2025",
    points: [
      "Engineered and deployed 6+ production web applications end-to-end across client and internal projects, covering full-stack architecture, deployment, and maintenance.",
      "Architected a role-based CMS backend with JWT authentication, image processing, and full CRUD APIs; led a full WordPress-to-React migration for a client site.",
      "Built a reusable component library adopted across multiple projects, cutting redundant development time and enforcing consistent design standards.",
      "Kickstarted a cross-platform React Native app from PRD and ER-diagram design through navigation and UI-library integration.",
      "Provisioned AWS EC2 cloud infrastructure and managed multi-environment deployments via Vercel and Firebase Hosting, independently resolving CI/build and backend-integration issues.",
    ],
  },
  {
    title: "Researcher (Published IEEE Xplore)",
    company_name: "ICTBIG 2024 (DOI: 10.1109/ICTBIG57409.2024.10911062)",
    track: "Cybersecurity",
    icon: web,
    iconBg: "#151030",
    date: "Nov 2024 – Mar 2025",
    points: [
      "Authored and published 'Real-Time Detection of AI-Generated Deepfake Audio: A Novel Approach' in IEEE Xplore for the AI-security research community.",
      "Researched and implemented a CNN-based signal-processing pipeline for real-time deepfake audio detection using spectral feature analysis.",
    ],
  },
  {
    title: "HackMIT 2025 (CTF) – 5th Rank",
    company_name: "MIT CTF Competition",
    track: "Cybersecurity",
    icon: mobile,
    iconBg: "#1d1836",
    date: "2025",
    points: [
      "Secured 5th place by solving 15+ challenges across web security, reverse engineering, cryptography, and logical vulnerability analysis.",
    ],
  },
  {
    title: "Blockchain Evolution Certification",
    company_name: "GIAN Program, NIT Goa",
    track: "Web Development",
    icon: creator,
    iconBg: "#151030",
    date: "2025",
    points: [
      "Completed rigorous GIAN certification on Decentralized Systems and distributed ledger architecture at NIT Goa.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "B.Tech in Computer Science (Cyber Security and Forensics) — CGPA 7.47 / 10",
    name: "MIT World Peace University, Pune",
    designation: "2022 – 2026",
    company: "Pune, India",
    image: null,
  },
  {
    testimonial:
      "HSC (MSBSHSE) — 70.67%",
    name: "Hislop Junior College, Nagpur",
    designation: "2022",
    company: "Nagpur, India",
    image: null,
  },
  {
    testimonial:
      "SSC (CBSE) — 87.6%",
    name: "Jet Kids International School, Pusad",
    designation: "2020",
    company: "Pusad, India",
    image: null,
  },
];

const projects = [
  {
    name: "Email Security Analyst",
    subtitle: "Phishing Detection Platform",
    track: "Cybersecurity",
    description:
      "Flask web application that analyzes email content and classifies phishing attempts using TF-IDF feature extraction and Logistic Regression. Implements sender authentication checks (SPF, DKIM, DMARC), URL analysis, and attachment scanning to generate a composite threat score and security report.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Flask",
        color: "green-text-gradient",
      },
      {
        name: "Scikit-learn",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/prathamesh-07",
  },
  {
    name: "CloudMigrate",
    subtitle: "Multi-Cloud Data Orchestration",
    track: "Both Tracks",
    description:
      "Multi-cloud data orchestration platform with a Next.js interface and Python transfer pipeline to securely transfer files from AWS S3 to Google Cloud Storage. Implements MD5 and SHA-256 cryptographic hashing to verify file integrity and detect corruption during transit.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Python",
        color: "green-text-gradient",
      },
      {
        name: "AWS S3 / GCP",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/prathamesh-07",
  },
  {
    name: "ATMS",
    subtitle: "Enterprise Asset Management",
    track: "Both Tracks",
    description:
      "Full-stack asset management system built with React and MongoDB that tracks organizational hardware and software assets across their lifecycle. Implements strict Role-Based Access Control (RBAC) to provide secure, permission-based access by user role.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "RBAC",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/prathamesh-07",
  },
];

export { services, technologies, experiences, testimonials, projects };
