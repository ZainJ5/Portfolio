// Single source of truth for every fact shown on the site.
// Reconciled against the LinkedIn export (Nov 2026) and the latest resume.
// Change something here and it changes everywhere.

export const profile = {
  name: "Zain Jamshaid",
  role: "Associate Software Engineer",
  company: "Ubiquify Digital",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "zainjamshaid55@gmail.com",
  resume: "/resume/zainjamshaid_resume.pdf",
  tagline:
    "I build full-stack products, the pipelines that ship them, and the LLM systems that run inside them.",
  socials: [
    { label: "GitHub", handle: "ZainJ5", href: "https://github.com/ZainJ5" },
    {
      label: "LinkedIn",
      handle: "zain-jamshaid",
      href: "https://www.linkedin.com/in/zain-jamshaid-8779b9294",
    },
    { label: "X", handle: "@ZainJamshaid05", href: "https://x.com/ZainJamshaid05" },
  ],
};

export const stats = [
  { value: "Rs. 19.2M+", label: "in orders processed by a platform I built and run" },
  { value: "2", label: "hackathon podiums, Microsoft and Google events" },
  { value: "3", label: "environments in my CI/CD pipeline: dev, testing, staging" },
  { value: "2027", label: "BS Software Engineering, GIK Institute" },
];

export const about = {
  statement:
    "I am a software engineer who likes owning the whole path, from the first commit to the server it runs on. I started with web apps, got curious about what happens after git push, and now spend as much time on containers, pipelines and LLM orchestration as I do on interfaces.",
  paragraphs: [
    "Right now I work as an Associate Software Engineer at Ubiquify Digital while finishing my final year of Software Engineering at GIK Institute. Before that I interned at NETSOL Technologies, where I shipped an AI-powered learning management system to production.",
    "Outside work I led the technical side of Google Developer Group at GIKI, ran workshops on web development and Git, and built an ordering platform for a restaurant that is still running in production today.",
  ],
  facts: [
    { k: "Based in", v: "Lahore, Pakistan" },
    { k: "Currently", v: "Ubiquify Digital" },
    { k: "Studying", v: "BS Software Engineering, GIKI '27" },
    { k: "Focus", v: "Full-stack, DevOps, LLM systems" },
  ],
};

export const marquee = [
  "Next.js",
  "Docker",
  "GitHub Actions",
  "AWS",
  "LangChain",
  "Node.js",
  "Terraform",
  "PostgreSQL",
  "NGINX",
  "RAG",
  "Python",
  "MongoDB",
];

// Featured case studies. `visual` picks the artwork component.
export const featured = [
  {
    id: "tipu",
    index: "01",
    title: "Restaurant ordering platform",
    client: "Tipu Burger & Broast",
    status: "Live in production",
    summary:
      "It started as a website for one restaurant in Karachi. It now takes online orders, runs the counter POS, prints kitchen slips and reports revenue branch by branch.",
    points: [
      "Real-time order tracking, an integrated POS and an installable PWA",
      "Admin portal for menus, discounts and custom delivery zones",
      "CI/CD with GitHub Actions and Docker to a VPS behind NGINX",
    ],
    metric: { value: "Rs. 19.2M+", label: "total revenue processed" },
    stack: ["Next.js", "MongoDB", "Firebase", "Docker", "GitHub Actions", "NGINX"],
    links: [
      { label: "Live site", href: "https://tipuburgerandbroast.com/" },
      { label: "Source", href: "https://github.com/ZainJ5/Restaurant-website" },
    ],
    visual: "browser",
    image: "/project/resturant.jpg",
    url: "tipuburgerandbroast.com",
  },
  {
    id: "fyp",
    index: "02",
    title: "Multi-agent candidate assessment",
    client: "Final-year project, GIKI",
    status: "In progress",
    summary:
      "A multi-agent LLM pipeline that evaluates software candidates from their public GitHub activity, with every run frozen against its evidence so results can be replayed and audited.",
    points: [
      "Several LLM agents work from what a candidate has actually shipped in public",
      "Evidence is frozen per run, so any assessment can be replayed later",
      "Extending it into a dataset study on detecting artificially inflated profiles",
    ],
    metric: { value: "FYP", label: "final-year project, 2026–27" },
    stack: ["Python", "LLM agents", "LangChain", "GitHub API"],
    links: [],
    visual: "agents",
  },
  {
    id: "cicd",
    index: "03",
    title: "Containerized CI/CD pipeline",
    client: "News aggregator, personal project",
    status: "Open source",
    summary:
      "A multi-environment pipeline that takes a React, Node.js and PostgreSQL app from pull request to running containers on AWS without anyone touching a server.",
    points: [
      "Workflows on pull request and push to main: build, unit tests, lint",
      "Versioned images pushed to ECR, pulled on EC2 with IAM roles, no stored keys",
      "Dev, testing and staging environments with email alerts on every run",
    ],
    metric: { value: "3", label: "environments, one push" },
    stack: ["GitHub Actions", "Docker Compose", "AWS EC2", "AWS ECR", "IAM"],
    links: [
      { label: "Source", href: "https://github.com/ZainJ5/news-aggregator-docker-cicd" },
    ],
    visual: "pipeline",
  },
  {
    id: "chat",
    index: "04",
    title: "Real-time chat with an inline AI assistant",
    client: "Personal project",
    status: "Open source",
    summary:
      "A chat app where the assistant lives inside the conversation. Mention @AI mid-thread, ask about an uploaded file, or get a summary of everything you missed.",
    points: [
      "@AI mentions answered in the thread, with the conversation as context",
      "Unread-message summaries and file-aware question answering",
      "Socket.IO for delivery, MongoDB for history",
    ],
    metric: { value: "@AI", label: "assistant inside the thread" },
    stack: ["React", "Express.js", "Socket.IO", "MongoDB"],
    links: [{ label: "Source", href: "https://github.com/ZainJ5/AI-chatApp" }],
    visual: "chat",
  },
];

export const archive = [
  {
    title: "GIKI Chatbot",
    kind: "RAG / AI",
    description:
      "Answers university questions using retrieval over data scraped from GIKI's social channels. LangChain for orchestration, FAISS for vector search.",
    stack: ["Python", "LangChain", "FAISS", "React"],
    href: "https://github.com/ZainJ5/GIKI_chatBot",
    image: "/project/giki_chatbot.png",
  },
  {
    title: "DOMjudge deployment orchestration",
    kind: "DevOps",
    description:
      "Multi-container DOMjudge stack (domserver, judgehosts, MariaDB) on Docker Compose with isolated networks, persistent volumes and scalable judgehost replicas.",
    stack: ["Docker Compose", "Networking", "Bash"],
    href: "https://github.com/ZainJ5/devops-docker-deployment",
  },
  {
    title: "Linux automation & LAMP provisioning",
    kind: "DevOps",
    description:
      "Bash tooling for a LAMP installer with CLI flags and logging, a live HTML system-health report, SSH hardening and cron-scheduled backups.",
    stack: ["Bash", "Apache", "MySQL", "Cron", "AWK"],
    href: "https://github.com/ZainJ5/devops-bash-scripting",
  },
  {
    title: "Linux system administration",
    kind: "DevOps",
    description:
      "Documented Ubuntu Server administration: users and groups, sudo policies, SSH keys, ACL permissions, packages and process monitoring.",
    stack: ["Ubuntu", "SSH", "ACL"],
    href: "https://github.com/ZainJ5/devops-linux-administration",
  },
  {
    title: "Social Connect",
    kind: "Full-stack",
    description:
      "A social network with a C++ (Crow) backend built on hand-written linked lists, stacks, a trie and merge sort, behind a React frontend.",
    stack: ["C++ (Crow)", "React", "Data structures"],
    href: "https://github.com/ZainJ5/SocialConnect",
    image: "/project/socialconnect.jpg",
  },
  {
    title: "Real-time chat application",
    kind: "Full-stack",
    description:
      "Live messaging with authentication, email verification through Nodemailer and a dark mode.",
    stack: ["Express.js", "EJS", "Socket.IO", "MongoDB"],
    href: "https://github.com/ZainJ5/ChatApp",
    image: "/project/chatapp.jpg",
  },
  {
    title: "Nike store",
    kind: "Full-stack",
    description:
      "A shoe store with category browsing, ordering and an admin panel for managing the catalogue.",
    stack: ["React", "Node.js", "MongoDB", "Firebase"],
    href: "https://github.com/ZainJ5/frontendNike",
    image: "/project/nike.png",
  },
  {
    title: "Video streaming app",
    kind: "Desktop",
    description:
      "A YouTube-style desktop app in Qt and C++ with a creator portal, likes and comments, backed by file handling.",
    stack: ["C++", "Qt"],
    href: "https://github.com/ZainJ5/Video-Streaming-app-Youtube-clone-",
    image: "/project/youtube.png",
  },
];

export const experience = [
  {
    role: "Associate Software Engineer",
    org: "Ubiquify Digital",
    place: "Lahore",
    period: "Aug 2026 — Present",
    current: true,
    body: "Joined full-time after my internship, working as a software engineer alongside my final year at GIKI.",
    tags: [],
  },
  {
    role: "Software Engineer Intern",
    org: "Ubiquify Digital",
    place: "Lahore",
    period: "Jul 2026 — Aug 2026",
    body: "Summer internship that converted into a full-time associate role.",
    tags: [],
  },
  {
    role: "Full Stack Development Intern",
    org: "NETSOL Technologies",
    place: "Lahore",
    period: "Aug 2025 — Sep 2025",
    body: "Built and deployed an AI-powered learning management system: Gemini-driven course summaries, quizzes and interactive avatars, real-time messaging over Socket.IO, containerized services, and a VPS production deployment behind an NGINX reverse proxy.",
    tags: ["Next.js", "MongoDB", "Gemini", "Socket.IO", "Docker", "NGINX"],
  },
];

export const community = [
  {
    role: "Technical Lead",
    org: "Google Developer Group, GIKI",
    period: "Oct 2025 — Oct 2026",
    body: "Led the technical team, coordinated development projects for the student community and ran workshops on web development and Git/GitHub.",
  },
  {
    role: "Tech Team Member",
    org: "Google Developer Group, GIKI",
    period: "Oct 2024 — Nov 2025",
    body: "Worked on the GIKI Chatbot and an internal automation system, and helped organise a speed programming competition.",
  },
  {
    role: "Team Member",
    org: "ACM Student Chapter, GIKI",
    period: "Oct 2024 — Nov 2026",
    body: "Supported hackathons, technical events and workshops for the computing society.",
  },
  {
    role: "Team Member",
    org: "Team Techno",
    period: "Oct 2024 — Oct 2025",
    body: "Robotics team. Built an obstacle-avoidance robot and contributed to technical workshops.",
  },
  {
    role: "Team Member",
    org: "Team Invictus",
    period: "Mar 2024 — Oct 2024",
    body: "GIKI's Design/Build/Fly team, which represents Pakistan at the competition in the USA.",
  },
];

// The 3D balls. `icon` files live in /public/skills (Devicon, MIT).
export const skillBalls = [
  { name: "Next.js", icon: "/skills/nextjs.svg" },
  { name: "React", icon: "/skills/react.svg" },
  { name: "Node.js", icon: "/skills/nodejs.svg" },
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "Python", icon: "/skills/python.svg" },
  { name: "C++", icon: "/skills/cplusplus.svg" },
  { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
  { name: "MongoDB", icon: "/skills/mongodb.svg" },
  { name: "Docker", icon: "/skills/docker.svg" },
  { name: "GitHub Actions", icon: "/skills/github-actions.svg" },
  { name: "AWS", icon: "/skills/aws.svg" },
  { name: "Terraform", icon: "/skills/terraform.svg" },
  { name: "NGINX", icon: "/skills/nginx.svg" },
  { name: "Linux", icon: "/skills/linux.svg" },
  { name: "Git", icon: "/skills/git.svg" },
  { name: "Bash", icon: "/skills/bash.svg" },
];

// Mirrors the "Technical Skills" block of the resume.
export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "C/C++", "JavaScript", "SQL (PostgreSQL)", "Bash/Shell", "HTML/CSS"],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Terraform",
      "AWS (EC2, ECR, IAM)",
      "NGINX",
      "Apache",
      "Linux (Ubuntu)",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Next.js", "React", "Node.js", "Express.js", "Flask", "LangChain", "Socket.IO"],
  },
  {
    title: "AI & Data",
    items: ["RAG", "LLM agents", "FAISS", "MongoDB", "Firebase"],
  },
  {
    title: "Tools",
    items: ["Git", "VMware", "Digital Ocean", "VS Code"],
  },
];

export const awards = [
  {
    place: "3rd place",
    event: "Microsoft Micathon",
    date: "Apr 2024",
    project: "AccessSuite",
    body: "A desktop and web suite of accessibility tools that makes computers easier to use for specially abled people. Built with team Code Crafters.",
    href: "https://1drv.ms/v/s!AsLeCa7Olk9Hg65gVIya-iUHlqFj3w?e=gTlkE4",
    linkLabel: "Demo video",
  },
  {
    place: "Runner-up",
    event: "Google Idea Sprint Hackathon",
    date: "Dec 2024",
    project: "AidPath",
    body: "An emergency-response platform: connected ambulance services with ride-hailing fallback, a live hospital map and a multilingual assistant with Urdu support.",
    href: "https://aidpath-gdsc-hackathon.vercel.app/",
    linkLabel: "Live demo",
  },
];

export const certifications = [
  {
    title: "Advanced React",
    issuer: "Meta, via Coursera",
    date: "Aug 2024",
    href: "https://www.coursera.org/account/accomplishments/records/IKVL10PXERYB",
  },
  {
    title: "React Basics",
    issuer: "Meta, via Coursera",
    date: "Jul 2024",
    href: "https://www.coursera.org/account/accomplishments/records/WUSX4Y4P4Q9E",
  },
];

export const education = [
  {
    degree: "BS Software Engineering",
    school: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
    place: "Topi, KPK",
    period: "2023 — 2027",
  },
  {
    degree: "FSc Pre-Engineering",
    school: "Forman Christian College",
    place: "Lahore",
    period: "2021 — 2023",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
