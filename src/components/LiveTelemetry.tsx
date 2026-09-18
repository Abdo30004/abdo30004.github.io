"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function LiveTelemetry() {
  const [uptime, setUptime] = useState(99.999100);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { 
        timeZone: "Africa/Algiers", 
        hour12: true, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      }));
    };
    
    updateTime(); // initial call
    const interval = setInterval(() => {
      setUptime(prev => prev + 0.000001);
      updateTime();
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
      <div className="flex items-center gap-3 w-full md:w-1/3">
        <div className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </div>
        <span className="font-mono text-xs text-slate-300 tracking-wider">SYSTEM.STATE: <span className="text-cyan-400">ONLINE</span></span>
      </div>

      <div className="flex md:justify-center w-full md:w-1/3 font-mono text-xs text-slate-500 tracking-widest">
        {timeStr ? (
          <span>TIME_DZ: <span className="text-slate-300">{timeStr}</span></span>
        ) : (
          <span>TIME_DZ: <span className="text-slate-600">SYNCING...</span></span>
        )}
      </div>

      <div className="flex items-center md:justify-end gap-6 font-mono text-xs text-slate-500 w-full md:w-1/3">
        <span className="hidden lg:inline-block">ENV: PRODUCTION</span>
        <span className="hidden sm:inline-block">LOC: {siteConfig.location}</span>
        <span>UPTIME: <span className="text-slate-300">{uptime.toFixed(6)}%</span></span>
      </div>
    </motion.header>
  );
}
