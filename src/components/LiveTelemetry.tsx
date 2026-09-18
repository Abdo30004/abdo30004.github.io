"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function LiveTelemetry() {
  const [uptime, setUptime] = useState(99.999100);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 0.000001);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/50 border border-slate-800 rounded-lg px-6 py-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </div>
        <span className="font-mono text-xs text-slate-300 tracking-wider">SYSTEM.STATE: <span className="text-cyan-400">ONLINE</span></span>
      </div>
      <div className="flex items-center gap-6 font-mono text-xs text-slate-500">
        <span className="hidden sm:inline-block">ENV: PRODUCTION</span>
        <span className="hidden sm:inline-block">LOC: {siteConfig.location}</span>
        <span>UPTIME: <span className="text-slate-300">{uptime.toFixed(6)}%</span></span>
      </div>
    </motion.header>
  );
}
