"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
  "Initializing kernel environment...",
  "Loading core infrastructure modules...",
  "Mounting encrypted filesystems... OK",
  "Starting container orchestration daemon... OK",
  "Allocating dynamic network resources...",
  "Bringing up network interface eth0... OK",
  "Establishing secure connection to ALGIERS_DZ... SUCCESS",
  "Bypassing firewall constraints... OK",
  "Verifying cryptographic signatures...",
  "Identity verified: YAHIAOUI ABDERRAHMANE",
  "SYSTEM ONLINE. Welcome, Admin."
];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setVisibleLines((prev) => prev + 1);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1200); // slightly longer pause before resolving
      }
    }, 150); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      // Cinematic focus-in on load, and cinematic blur/scale-out on exit
      initial={{ opacity: 1, filter: "blur(12px)", scale: 0.98 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col justify-center items-center p-6 font-mono text-[10px] md:text-xs overflow-hidden"
    >
      <div className="max-w-2xl w-full space-y-2 opacity-90">
        {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => {
          let textColor = "text-slate-400";
          if (i === BOOT_SEQUENCE.length - 1) textColor = "text-cyan-400 font-bold text-sm md:text-base mt-4";
          else if (line.includes("SUCCESS") || line.includes("OK")) textColor = "text-emerald-400";
          else if (line.includes("verified")) textColor = "text-cyan-300";

          return (
            <motion.div 
              key={i}
              // Smooth individual line appearance without any sharp snapping
              initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={textColor}
            >
              <span className="text-slate-600 mr-4 select-none">
                [{String((i * 0.1234).toFixed(4)).padStart(6, '0')}]
              </span>
              {line}
            </motion.div>
          );
        })}
        
        {visibleLines < BOOT_SEQUENCE.length && (
          <motion.div
            animate={{ opacity: [1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            className="w-2 h-3 bg-cyan-500 inline-block align-middle ml-2"
          />
        )}
      </div>
      
      {/* Subtle CRT gradient, no sharp lines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </motion.div>
  );
}
