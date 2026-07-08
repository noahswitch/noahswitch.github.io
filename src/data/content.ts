// ─────────────────────────────────────────────────────────────
// Single source of truth for all real content on the site.
// Edit this file to update copy anywhere across the portfolio.
// ─────────────────────────────────────────────────────────────

import { withBasePath } from "@/lib/basePath";

export const profile = {
  name: "N. Slimani",
  fullName: "Nasreddine Slimani",
  handle: "noahswitch",
  role: "Systems Engineer · Cloud Architect · ML Researcher",
  location: "Budapest, Hungary",
  statusLine: "Open to collaboration • Research • Projects • Opportunities",
  oneLiner:
    "I design and secure the infrastructure organisations depend on, and build machine learning systems that make sense of their data.",
  bio: [
    "I'm a Systems Engineer and Cloud Architect based in Budapest, Hungary. I build and secure the infrastructure that keeps organisations running — and what drives me is the intersection of reliable systems and intelligent automation.",
    "My academic background in Computer Engineering (Master's, Excellent distinction) informs how I approach infrastructure: not just as plumbing to maintain, but as a platform to build intelligent, data-driven solutions on top of.",
  ],
  heroTags: ["AWS", "Azure", "Kubernetes", "Docker", "Python", "Jenkins"],
  values: [
    {
      title: "Reliability first",
      body: "Systems should be boring in the best way — predictable, observable, and recoverable before they're clever.",
    },
    {
      title: "Research-minded",
      body: "I read papers, run experiments, and publish results. Curiosity is a working tool, not a hobby.",
    },
    {
      title: "Automate the toil",
      body: "If a task repeats, it becomes a script, then a pipeline. Manual process is a bug to be fixed.",
    },
    {
      title: "Always learning",
      body: "New certification, new framework, new dataset — the stack keeps moving and so do I.",
    },
  ],
} as const;

export const links = {
  email: "mailto:slimanin.dev@gmail.com",
  emailDisplay: "slimanin.dev@gmail.com",
  github: "https://github.com/noahswitch",
  linkedin: "https://linkedin.com/in/NASREDDINESLIMANI",
  researchgate: "https://www.researchgate.net/profile/Nasreddine-Slimani",
  telegram: "https://t.me/s_noah",
  blog: "https://nslimani.blogspot.com/",
} as const;

export const achievements = [
  { icon: "users", value: "145+", label: "Enterprise users in managed infrastructure" },
  { icon: "zap", value: "40%", label: "Operational efficiency improvement via automation" },
  { icon: "brain", value: "85%", label: "NLP classification accuracy on ML thesis" },
  { icon: "trending-up", value: "45%", label: "Customer engagement lift from cloud automation" },
] as const;

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  skills: { name: string; blurb: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    label: "Cloud & Infra",
    icon: "cloud",
    skills: [
      { name: "AWS", blurb: "Production workloads, SES automation, and cost-aware architecture." },
      { name: "Azure", blurb: "Identity, VMs, and hybrid cloud integration for enterprise environments." },
      { name: "VMware", blurb: "Virtualized enterprise infrastructure and resource pooling." },
      { name: "Linux", blurb: "Daily driver for servers, automation, and low-level systems work." },
      { name: "Windows Server", blurb: "AD lifecycle, GPOs, and enterprise directory services." },
      { name: "KVM", blurb: "Open-source virtualization for self-hosted infrastructure." },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "cog",
    skills: [
      { name: "Docker", blurb: "Containerized services for consistent, portable deployments." },
      { name: "Kubernetes", blurb: "Orchestration for resilient, scalable service architectures." },
      { name: "Jenkins", blurb: "CI/CD pipelines that ship changes safely and often." },
      { name: "GitLab CI", blurb: "Automated build, test, and deploy workflows." },
      { name: "Ansible", blurb: "Configuration management and repeatable provisioning." },
      { name: "IaC", blurb: "Infrastructure as code — environments defined, versioned, reviewed." },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: "shield",
    skills: [
      { name: "Zero-Trust", blurb: "Access models that verify every request, not just the perimeter." },
      { name: "SIEM", blurb: "Centralized log correlation for threat detection." },
      { name: "IAM", blurb: "Identity and access management across cloud and on-prem." },
      { name: "MFA", blurb: "Multi-factor enforcement across enterprise accounts." },
      { name: "SentinelOne", blurb: "Endpoint detection and response in production." },
      { name: "Compliance", blurb: "Policy review and audit-ready security documentation." },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    icon: "code",
    skills: [
      { name: "Python", blurb: "ML pipelines, automation scripts, and backend services." },
      { name: "PowerShell", blurb: "Windows automation and enterprise administration at scale." },
      { name: "Bash", blurb: "Shell scripting for Linux systems and CI pipelines." },
      { name: "JavaScript", blurb: "Browser-native tools and interactive dashboards." },
      { name: "NodeJS", blurb: "Backend services for full-stack applications." },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "network",
    skills: [
      { name: "Cisco", blurb: "Enterprise switching and routing infrastructure." },
      { name: "Ubiquiti", blurb: "Unified network management for growing organisations." },
      { name: "VLANs", blurb: "Network segmentation for security and performance." },
      { name: "pfSense", blurb: "Open-source firewall and routing at the network edge." },
      { name: "SonicWall", blurb: "Perimeter security appliances and threat prevention." },
      { name: "Load Balancing", blurb: "Traffic distribution for high-availability services." },
    ],
  },
  {
    id: "data",
    label: "Data & Monitor",
    icon: "database",
    skills: [
      { name: "MongoDB", blurb: "Document-oriented storage for scalable applications." },
      { name: "SQL Server", blurb: "Relational data management for enterprise systems." },
      { name: "CloudWatch", blurb: "Metrics, logs, and alerting across cloud infrastructure." },
      { name: "VEEAM", blurb: "Backup and disaster recovery for critical systems." },
      { name: "Log Analysis", blurb: "Turning raw logs into actionable operational insight." },
    ],
  },
  {
    id: "ml",
    label: "ML / NLP",
    icon: "sparkles",
    skills: [
      { name: "Transformers", blurb: "Attention-based architectures for language understanding." },
      { name: "BERT variants", blurb: "Fine-tuning encoder models for classification tasks." },
      { name: "Federated Learning", blurb: "Privacy-preserving training across distributed clients." },
      { name: "Low-resource NLP", blurb: "Modelling under-represented languages and dialects." },
      { name: "Fine-tuning", blurb: "Adapting pretrained models to domain-specific data." },
    ],
  },
];

export const certifications = [
  { name: "AWS Cloud Practitioner", issuer: "Cloud Architecture Fundamentals", year: "2023" },
  { name: "DevOps Bootcamp", issuer: "Techworld with Nana, CI/CD", year: "2024" },
  { name: "Linux Admin / DevOps", issuer: "Nix Tech Company", year: "2024" },
] as const;

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "French", level: "Professional" },
] as const;

export type Project = {
  id: string;
  title: string;
  year: string;
  badge: string;
  problem: string;
  solution: string;
  tech: string[];
  results: string[];
  lessons: string;
  link?: string;
  linkLabel?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "stock-management",
    title: "Stock Management System",
    year: "2024",
    badge: "Featured Build",
    problem:
      "Multi-location inventory was tracked manually across spreadsheets — slow to update, error-prone, and impossible to audit quickly when stock moved between sites.",
    solution:
      "A full-stack inventory platform with a scalable MongoDB data model built for multi-location stock, paired with an automated document pipeline for invoices and purchase orders — all exported as browser-native PDFs with no third-party service in the loop.",
    tech: ["Python", "NodeJS", "MongoDB", "PDF Generation"],
    results: [
      "Scalable MongoDB architecture handling multi-location inventory",
      "Automated invoice and purchase order generation pipeline",
      "Browser-native PDF export without third-party services",
    ],
    lessons:
      "Designing the data model around how stock actually moves (not how it's reported) made every feature after it — audits, PDFs, multi-location views — fall out almost for free.",
    featured: true,
  },
  {
    id: "nlp-sentiment",
    title: "NLP Sentiment Analysis",
    year: "2023",
    badge: "Research Build",
    problem:
      "Understanding public sentiment at scale from raw, noisy social text requires a model that generalises past hand-tuned keyword rules.",
    solution:
      "A deep learning sentiment classifier trained on Twitter data, paired with a real-time interactive visualization dashboard so results are legible to non-technical stakeholders, not just the model.",
    tech: ["Python", "NLP", "Deep Learning"],
    results: ["85% classification accuracy", "Real-time interactive visualization dashboard"],
    lessons:
      "The dashboard mattered as much as the model — a good classifier nobody can interrogate is a lot less useful than a decent one people can actually explore.",
  },
  {
    id: "urboutik",
    title: "UrBoutik.com",
    year: "2023",
    badge: "Production Build",
    problem:
      "A growing e-commerce operation needed production-grade infrastructure and marketing automation without enterprise budget or headcount.",
    solution:
      "A production e-commerce platform deployed on AWS with SES-powered marketing automation, high-availability infrastructure, and DNS optimisation tuned for real customer traffic.",
    tech: ["WordPress", "AWS SES", "Cloud Infra"],
    results: ["45% customer engagement improvement", "High-availability cloud architecture"],
    lessons:
      "Most of the engagement lift came from infrastructure being invisible — fast pages and reliable email deliverability, not a redesign.",
  },
];

export type DailyTool = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  results: string[];
  link: string;
};

export const dailyTools: DailyTool[] = [
  {
    id: "mailforge",
    title: "MailForge",
    description: "Email workflow and message-generation tool I use daily for communication and fast content drafting.",
    tags: ["Email", "Automation", "Productivity"],
    results: ["Helps streamline daily communication tasks", "Built for fast, reusable email workflows"],
    link: "https://noahswitch.github.io/NoahSwitch-MailForge",
  },
  {
    id: "noah-sign",
    title: "Noah Sign",
    description: "Signature and document-signing helper used in daily operations to speed up communication and document handling.",
    tags: ["Documents", "Signing", "Workflow"],
    results: ["Useful for recurring document workflows", "Keeps signing tasks fast and consistent"],
    link: "https://noahswitch.github.io/Noah-Sign",
  },
  {
    id: "doc2html",
    title: "Noah-Doc2HTML",
    description:
      "Browser-native document editor with live bidirectional HTML sync, rich formatting toolbar, real-time preview, and one-click HTML export — no backend required.",
    tags: ["HTML", "JavaScript", "ContentEditable", "DOM"],
    results: [
      "Live two-pane sync: rich editor ↔ raw HTML source in real time",
      "Zero-dependency export pipeline — produces clean, portable HTML files",
    ],
    link: "https://noahswitch.github.io/Doc2HTML/",
  },
];

export type ResearchPaper = {
  id: string;
  title: string;
  venue: string;
  year: string;
  summary: string;
  tags: string[];
  results: string[];
  link: string;
  accent: string;
};

export const research: ResearchPaper[] = [
  {
    id: "dziribert",
    title: "Federated Fine-Tuning of DziriBERT",
    venue: "AIDAM26",
    year: "2026",
    summary:
      "Privacy-preserving NLP for Algerian dialect sentiment analysis using federated learning strategies on a low-resource language model. Compares FedAvg, FedProx, semi-supervised, and distilled approaches under realistic non-IID client distributions.",
    tags: ["NLP", "Federated Learning", "DziriBERT", "Low-resource AI", "Privacy-preserving ML"],
    results: [
      "FedAvg reached 84.8% accuracy vs centralized baseline",
      "FedProx improved convergence under non-IID client data",
      "SSFL reduced labeling requirements while maintaining performance",
      "DistilBERT offered a lighter alternative with competitive results",
    ],
    link: withBasePath("/research-dziribert/"),
    accent: "signal",
  },
  {
    id: "auto-fl-iot",
    title: "Automated Privacy-Preserving FL for IoT Intrusion Detection",
    venue: "PAIS26",
    year: "2026",
    summary:
      "Interactive research presentation on a privacy-preserving federated learning pipeline for IoT intrusion detection. The work focuses on automated deployment, non-IID robustness, low-bandwidth communication, and near-centralized performance without exposing raw device data.",
    tags: ["Federated Learning", "IoT Security", "Privacy-preserving ML", "Intrusion Detection"],
    results: [
      "Near-centralized detection performance with privacy-preserving training",
      "Automated pipeline reduces manual FL setup and deployment effort",
      "Very low communication overhead using parameter exchange only",
    ],
    link: withBasePath("/ResearchAuto-FL/"),
    accent: "teal",
  },
  {
    id: "xai-ids",
    title: "XAI-IDS: Explainable Intrusion Detection for Smart Energy IoT",
    venue: "ASREM26",
    year: "2026",
    summary:
      "Explainable intrusion detection framework combining Random Forest, XGBoost, and LightGBM with SHAP TreeExplainer to deliver global, local, and per-class explanations on the RT-IoT2022 benchmark, with a focus on energy IoT edge-gateway deployment.",
    tags: ["Explainable AI", "SHAP", "IoT Security", "XGBoost", "LightGBM", "Edge Computing"],
    results: [
      "All models reached macro F1 above 0.98 on RT-IoT2022",
      "4-feature SHAP consensus shared across all three models",
      "88% feature reduction with under 0.007 F1 loss for edge deployment",
    ],
    link: withBasePath("/ASREM2026/"),
    accent: "violet",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location: string;
  body: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Systems Engineer & Cloud Administrator",
    org: "Diamond Diagnostics Inc.",
    period: "Sep 2022 – Present",
    location: "Budapest, Hungary",
    body: "Primary administrator for a 145+ user enterprise environment, managing Windows AD lifecycle, Office 365, cloud architecture, cybersecurity operations, and ITIL-compliant change management.",
  },
  {
    role: "Cybersecurity Intern",
    org: "DEKRA Magyarország KFT.",
    period: "Mar – Aug 2022",
    location: "Budapest (Hybrid)",
    body: "Vulnerability assessments, security procedure documentation, and policy review support under senior cybersecurity staff.",
  },
  {
    role: "Self-Employed IT Consultant",
    org: "N Slimani EV",
    period: "Sep 2021 – Sep 2022",
    location: "Remote",
    body: "Delivered software development and sysadmin services to 5+ clients. Built e-commerce solutions with 40% operational efficiency gains and automated inventory systems.",
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  grade: string;
  note?: string;
  tags: string[];
};

export const education: EducationItem[] = [
  {
    degree: "M.Sc. Computer Engineering",
    school: "Széchenyi István University, Győr, Hungary",
    period: "2020 – 2022",
    grade: "Excellent",
    note: 'Thesis: "Sentiment Analysis of Twitter Data Using Neural Network Models"',
    tags: ["HPC", "Cloud Architecture", "Network Security", "AI", "Distributed Systems"],
  },
  {
    degree: "B.Sc. Computer Systems",
    school: "University of Bechar, Algeria",
    period: "2017 – 2020",
    grade: "Good",
    tags: ["Database Systems", "Networks", "OS", "Algorithms"],
  },
];

export const honor = {
  title: "Stipendium Hungaricum Scholarship",
  body: "Hungarian Government, 2020 — Full scholarship for Master's studies",
};

export const openToList = [
  "Full-time opportunities",
  "Research collaborations",
  "Freelance projects",
  "Open-source",
  "Startup ideas",
] as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#open-source", label: "Open Source" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const bootLines = [
  "establishing secure session…",
  "mounting cloud infrastructure…",
  "loading research index…",
  "calibrating models…",
  "systems nominal.",
] as const;
