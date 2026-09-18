"use client";

import { 
  Terminal, Server, 
  Mail, Cpu, GitMerge, CheckCircle2, Loader2, CircleDashed,
  Code2, Database, Cloud, Shield, Network, ShieldAlert, Flag, BrainCircuit, Bot, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import NetworkBackground from "@/components/NetworkBackground";
import { LiveTelemetry } from "@/components/LiveTelemetry";
import { Widget } from "@/components/Widget";
import { ProjectBackground } from "@/components/ProjectAnimations";
import { SplashScreen } from "@/components/SplashScreen";
import { SpotlightQuote } from "@/components/SpotlightQuote";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig, SKILLS, PROJECTS, PIPELINE_STAGES } from "@/config/site";
import { 
  SiTypescript, SiJavascript, SiPython, SiRust, SiC, 
  SiExpress, SiNestjs, SiFastapi, SiFlask, 
  SiDocker, SiKubernetes, SiTerraform, SiGooglecloud, SiGithubactions, SiNginx, SiGrafana,
  SiOwasp, SiHackthebox, SiWireshark,
  SiReact, SiTraefikproxy, SiPostgresql,
  SiRedis, SiMongodb, SiPuppeteer, SiCheerio
} from "react-icons/si";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Languages": Code2,
  "Backend": Database,
  "Infrastructure": Cloud,
  "Security": Shield,
  "Web Automation": Bot
};

const SKILL_ICONS: Record<string, React.ElementType> = {
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Python": SiPython,
  "Rust": SiRust,
  "C": SiC,
  "Express.js": SiExpress,
  "Nest.js": SiNestjs,
  "FastAPI": SiFastapi,
  "Flask": SiFlask,
  "Microservices": Network,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  "MongoDB": SiMongodb,
  "Docker": SiDocker,
  "K8s": SiKubernetes,
  "Terraform": SiTerraform,
  "GCP": SiGooglecloud,
  "CI/CD": SiGithubactions,
  "Nginx": SiNginx,
  "Grafana": SiGrafana,
  "Traefik": SiTraefikproxy,
  "HAProxy": Network,
  "Web Security": SiOwasp,
  "CTF": Flag,
  "Network Security": SiWireshark,
  "Playwright": Terminal,
  "Puppeteer": SiPuppeteer,
  "BeautifulSoup": Terminal,
  "Cheerio": SiCheerio,
  "React": SiReact,
  "Terminal": Terminal,
  "IoT": Cpu,
  "AI": BrainCircuit,
  "Backend": Database
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("boot_sequence_played")) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("boot_sequence_played", "true");
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      <NetworkBackground />
      
      <LiveTelemetry />

      {/* Main Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        
        {/* Identity Widget */}
        <Widget className="md:col-span-8" title="Identity_Module" icon={Terminal}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
                {siteConfig.name}
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
                {siteConfig.role}. {siteConfig.description}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-slate-800/50">
              <Link href={siteConfig.socials.github} target="_blank" className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors">
                <GithubIcon className="w-4 h-4" />
                <span>github.com/{siteConfig.socials.github.split("/").pop()}</span>
              </Link>
              <Link href={siteConfig.socials.linkedin} target="_blank" className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors">
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </Widget>

        {/* Pipeline / Deployment Widget */}
        <Widget className="md:col-span-4" title="Deployment_Pipeline" icon={GitMerge}>
          <div className="relative flex flex-col gap-5 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-slate-800">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={i} className="relative flex items-start gap-4 z-10">
                <div className="bg-slate-900 mt-1 p-0.5 rounded-full z-10 relative">
                  {stage.status === "SUCCESS" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {stage.status === "RUNNING" && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
                  {stage.status === "PENDING" && <CircleDashed className="w-5 h-5 text-slate-600" />}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "font-mono text-[10px] font-semibold mb-1 uppercase tracking-wider",
                    stage.status === "SUCCESS" ? "text-emerald-400" :
                    stage.status === "RUNNING" ? "text-cyan-400" : "text-slate-500"
                  )}>
                    {stage.title}
                  </span>
                  <p className="text-xs text-slate-300">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* Competencies */}
        <Widget className="md:col-span-4" title="Core_Competencies" icon={Cpu}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
              {Object.entries(SKILLS).map(([category, items]) => {
                const Icon = CATEGORY_ICONS[category];
                return (
                  <div key={category}>
                    <h3 className="text-xs font-mono text-cyan-500/80 mb-3 uppercase tracking-wider flex items-center gap-2">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map(skill => {
                        const SkillIcon = SKILL_ICONS[skill];
                        return (
                          <span 
                            key={skill} 
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/50 text-slate-300 text-xs font-mono border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-default"
                          >
                            {SkillIcon && <SkillIcon className="w-3.5 h-3.5" />}
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
        </Widget>

        {/* Projects / Deployments */}
        <Widget className="md:col-span-8" title="Deployment_Logs" icon={Server}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((project, i) => (
              <div key={i} className="group/item flex flex-col p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800/80 transition-colors z-10 relative overflow-hidden">
                <ProjectBackground projectName={project.name} />
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <Link href={project.url} target="_blank" className="font-display font-medium text-slate-200 group-hover/item:text-cyan-400 transition-colors hover:underline flex items-center gap-1.5">
                    {project.name}
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/item:opacity-100" />
                  </Link>
                  <div className="flex items-center gap-2">
                    {project.blogUrl && (
                      <Link href={project.blogUrl} target="_blank" className="font-mono text-[9px] text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-500/30 rounded">
                        <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></span>
                        WRITEUP
                      </Link>
                    )}
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded-full border border-slate-700/50">
                      {project.status === 'operational' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>}
                      {project.status === 'beta' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                      {project.status === 'archived' && <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>}
                      {project.status}
                    </span>
                  </div>
                </div>
                  <p className="text-sm text-slate-400 mb-10 flex-1 relative z-10">
                    {project.desc}
                  </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/80 relative z-10">
                  <span className="text-xs font-mono text-slate-500">{project.role}</span>
                    <div className="flex gap-1.5">
                      {project.tags.slice(0, 3).map(tag => {
                        const TagIcon = SKILL_ICONS[tag];
                        return (
                          <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                            {TagIcon && <TagIcon className="w-3 h-3" />}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                </div>
              </div>
            ))}
          </div>
          <SpotlightQuote />
        </Widget>

      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pt-8 pb-4 text-center"
      >
        <p className="font-mono text-xs text-slate-500">
          // END OF TRANSMISSION // 2026 // Y.A.
        </p>
      </motion.footer>
    </main>
    </>
  );
}
