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
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Cybersecurity Analyst",
    icon: web,
  },
  {
    title: "Web Security Enthusiast",
    icon: mobile,
  },
  {
    title: "Web Developer",
    icon: backend,
  },
  {
    title: "Frontend Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
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
    name: "Redux Toolkit",
    icon: redux,
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
    name: "Three JS",
    icon: threejs,
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
    title: "Cybersecurity Projects and Experience",
    company_name: "MIT World Peace University",
    icon: starbucks,
    iconBg: "black",
    date: "2023 - 2024",
    points: [
      "Conducted vulnerability assessments using tools like Nessus, Wireshark, and Nmap on simulated network environments.",
      "Gained hands-on experience with web application security by exploiting and mitigating vulnerabilities from the OWASP Top 10 using Burp Suite and OWASP ZAP.",
      "Developed skills in password cracking, cryptography, and incident response through academic coursework and labs.",
    ],
  },
  {
    title: "Cyber Security Pre-Graduation Program",
    company_name: "Pregrad",
    icon: tesla,
    iconBg: "black",
    date: "Dec 2022 - Feb 2023",
    points: [
      "Successfully completed a Cyber Security Pre-Graduation program, enhancing practical knowledge in cyber defense techniques and information security.",
      "Developed a strong foundation in cybersecurity principles through hands-on learning.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Goldman Sachs Software Engineering Job Simulation",
    company_name: "Forage",
    icon: shopify,
    iconBg: "black",
    date: "Sep 2024",
    points: [
      "Completed tasks focusing on password cracking and securing leaked password databases.",
      "Demonstrated practical skills in security risk mitigation through industry-relevant job simulations.",
      "Gained hands-on experience in tackling real-world software engineering problems related to cybersecurity.",
    ],
  },
  {
    title: "Entrepreneurship Awareness Drive - Local Startups Meet 2023",
    company_name: "IIT Kharagpur (E-Cell)",
    icon: meta,
    iconBg: "black",
    date: "Aug 2023",
    points: [
      "Engaged with entrepreneurs and startup founders, gaining insights into business models and startup ecosystems.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "MIT World Peace University, Pune",
    name: "B.Tech in Computer Science, Specialization in Cyber Security and Forensics",
  },
  {
    testimonial:
      "Hislop Junior College, Nagpur",
    name: "Class 12th",
  },
  {
    testimonial:
      "Jet Kids International School, Pusad",
    name: "Class 10th",
  },
];

const projects = [
  {
    name: "InvestInsight",
    description:
      "A web-based platform for stock price prediction, portfolio management, and performance analysis. Built with Streamlit, using yFinance for data, Prophet and LSTM models for forecasting, and tools like Pandas, Plotly, and Keras for deep learning and data visualization.",
    tags: [
      {
        name: "Streamlit",
        color: "blue-text-gradient",
      },
      {
        name: "Prophet",
        color: "green-text-gradient",
      },
      {
        name: "LSTM",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/prathamesh-07/-Stock-Prediction-Webapp.git",
  },
  {
    name: "Cyber Security Projects",
    description:
      "A cybersecurity toolkit demonstrating ethical hacking and information security skills. Features keylogging, text and image encryption/decryption, and local file transfer capabilities. Showcases practical applications of core cybersecurity concepts and techniques.",
    tags: [
      {
        name: "CyberSecurity",
        color: "blue-text-gradient",
      },
      {
        name: "Encryption",
        color: "green-text-gradient",
      },
      {
        name: "InfoSec",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/prathamesh-07/CyberSecurityProjects.git",
  },
  {
    name: "AI Resume Builder",
    description:
      "An AI-powered resume builder web application which features intelligent content suggestions, customizable templates, and ATS-optimization tools. Demonstrates practical applications of full-stack development, API integration, and user experience design principles.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Express",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
