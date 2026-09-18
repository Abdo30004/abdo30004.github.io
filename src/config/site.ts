export const siteConfig = {
  name: "Yahiaoui Abderrahmane",
  role: "Cyber Security Master's Student & Instructor",
  description: "Specializing in infrastructure security, backend microservices, and orchestrating robust deployment pipelines.",
  location: "ALGIERS_DZ",
  email: "yahiaoui.abderrahmane.pro@gmail.com",
  socials: {
    github: "https://github.com/Abdo30004",
    linkedin: "https://linkedin.com/in/yahiaoui-abderrahmane"
  }
};

export const SKILLS = {
  "Languages": ["TypeScript", "JavaScript", "Python", "Rust", "C"],
  "Backend": ["Express.js", "Nest.js", "FastAPI", "Flask", "Microservices"],
  "Infrastructure": ["Docker", "K8s", "Terraform", "GCP", "CI/CD", "Nginx", "Grafana"],
  "Security": ["Web Security", "CTF", "Network Security"]
};

export const PROJECTS = [
  {
    name: "MCTF Instancer",
    role: "Infrastructure Lead",
    date: "2025",
    desc: "Orchestrated Docker infrastructure for MCTF 5.0 with per-team isolation, dynamic port allocation, and Prometheus metrics.",
    tags: ["Python", "React", "Docker", "Traefik", "PostgreSQL"],
    status: "operational",
    url: "https://github.com/Abdo30004/mctf-instancer",
    blogUrl: "https://mctf-blog.microclub.info/posts/organizing-mctf-infrastructure"
  },
  {
    name: "CVE Monitoring Tool",
    role: "Fullstack",
    date: "2025",
    desc: "Automated vulnerability tracking pipeline with OpenAPI documentation and SQLAlchemy persistence.",
    tags: ["FastAPI", "Python", "Docker", "PostgreSQL"],
    status: "operational",
    url: "https://github.com/Abdo30004/cve-monitoring-tool"
  },
  {
    name: "Docker Monitor TUI",
    role: "Systems Dev",
    date: "2025",
    desc: "Interactive terminal-based Docker monitoring dashboard with real-time resource visualization.",
    tags: ["Rust", "Terminal"],
    status: "beta",
    url: "https://github.com/Abdo30004/docker-monitoring-tool"
  },
  {
    name: "AquaSense",
    role: "Backend & AI",
    date: "2025",
    desc: "Autonomous aquafarm monitoring with IoT sensors, RAG, and AI disease detection. 1st Place Junction X Algiers 2025.",
    tags: ["IoT", "AI", "Backend"],
    status: "archived",
    url: "https://github.com/orgs/aqua-sense-junction"
  }
];

export const PIPELINE_STAGES = [
  {
    title: "BSc_COMPUTER_SCIENCE",
    status: "SUCCESS",
    desc: "USTHB. Foundational build completed."
  },
  {
    title: "CTF_INFRA_LEAD",
    status: "SUCCESS",
    desc: "Architected MCTF 5.0 & CTF El Djazaïr."
  },
  {
    title: "VICE_PRESIDENT",
    status: "RUNNING",
    desc: "MicroClub USTHB - Managing open-source teams."
  },
  {
    title: "CYBER_SECURITY_INSTRUCTOR",
    status: "RUNNING",
    desc: "Red/Blue team training at Code and Sens."
  },
  {
    title: "MSc_CYBER_SECURITY",
    status: "PENDING",
    desc: "Infrastructure security specialization."
  }
];
