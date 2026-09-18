"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DockerWhaleIcon } from "@/components/icons";
import { Boxes, Container } from "lucide-react";

// 1. CVE Monitoring: Radar Sweep
export function CVEMonitorAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.15] pointer-events-none z-0 flex items-center justify-end pr-8">
      <div className="relative w-32 h-32">
        {/* Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30" />
        <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-8 rounded-full border border-cyan-500/10" />
        {/* Radar Crosshairs */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/20" />
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-cyan-500/20" />
        {/* Sweeper */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 75%, rgba(6,182,212,0.5) 100%)' }}
        />
        {/* Blip */}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.8 }}
          className="absolute top-8 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]"
        />
      </div>
    </div>
  );
}

// 2. MCTF Instancer: Network Node Spawning (Horizontal Pipeline)
export function InstancerAnimation() {
  const [nodes, setNodes] = useState<{ id: number, direction: number, slot: number, instanceNum: number }[]>([]);
  const MAX_NODES = 6; 
  const slotCount = 3; 

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => {
        // Keep max nodes on screen
        const activeNodes = prev.length >= MAX_NODES ? prev.slice(1) : prev;
        
        // Purely derive new ID from previous state to bypass React 18 StrictMode double-invoke bug
        const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 0;
        const direction = newId % 2 === 0 ? 0 : Math.PI; // Alternates Right (0) and Left (PI)
        
        // Find empty slot for this specific direction
        const nodesInDirection = activeNodes.filter(n => n.direction === direction);
        const usedSlots = new Set(nodesInDirection.map(n => n.slot));
        let availableSlot = 0;
        while (usedSlots.has(availableSlot)) {
          availableSlot++;
        }

        return [...activeNodes, { 
          id: newId, 
          direction,
          slot: availableSlot % slotCount,
          instanceNum: newId + 1
        }];
      });
    }, 1800); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.6] pointer-events-none z-20">
      {/* Placed perfectly on the border-t line (approx 52px from bottom) and exactly in the middle */}
      <div className="absolute bottom-[52px] left-1/2 w-0 h-0 flex items-center justify-center">
        
        {/* Core Node (Docker Compose / Boxes) */}
        <motion.div 
          animate={{ y: ["-3px", "3px", "-3px"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute z-10 text-cyan-400 bg-slate-900 rounded-md p-1 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        >
          <Boxes className="w-6 h-6 opacity-90" />
        </motion.div>
        
        {/* Spawned Child Containers */}
        <AnimatePresence>
          {nodes.map(node => {
            // Distance reduced to max 130px (60 + 2*35) to strictly prevent escaping card bounds
            const distance = 60 + (node.slot * 35);
            const x = Math.cos(node.direction) * distance;

            return (
              <motion.div
                key={node.id}
                initial={{ x: 0, opacity: 0, scale: 0.5 }}
                animate={{ x, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="absolute flex items-center justify-center"
              >
                {/* Connecting Line */}
                <svg className="absolute w-[400px] h-[400px] pointer-events-none opacity-40">
                  <motion.line 
                    x1="200" y1="200" 
                    x2={200 - x} y2="200" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-cyan-500"
                  />
                </svg>

                {/* Spawned Container */}
                <div className="text-cyan-400 relative z-10 bg-slate-900 rounded-sm">
                  <Container className="w-4 h-4 opacity-80 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                </div>
                
                {/* Instance Number perfectly sitting on the line */}
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-5 text-[9px] font-mono text-cyan-300/80 whitespace-nowrap bg-slate-900/80 px-1 rounded-sm"
                >
                  #{node.instanceNum}
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 3. Docker Monitor: Swimming Whale (Mathematically locked to wave)
export function DockerMonitorAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.35] pointer-events-none z-20 flex items-end">
      {/* Sine Wave Water - Fixed height for perfect pixel calculations */}
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        className="w-[200%] h-[100px] text-cyan-600/40 flex-shrink-0"
      >
        <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Mathematically uniform repeating wave (400 units = 1 cycle). Peak amplitude is exactly 15px. */}
          <path d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50 L800,100 L0,100 Z" fill="currentColor" opacity="0.8"/>
          <path d="M0,60 Q100,30 200,60 T400,60 T600,60 T800,60 L800,100 L0,100 Z" fill="currentColor" opacity="0.4"/>
        </svg>
      </motion.div>
      
      {/* Swimming Docker Whale */}
      <motion.div 
        animate={{ 
          right: ["-100%", "140%"],
          y: ["0px", "-15px", "0px", "15px", "0px"],
          rotate: [-6, 0, 6, 0, -6]
        }}
        transition={{ 
          right: { repeat: Infinity, duration: 24, ease: "linear" },
          y: { repeat: Infinity, duration: 10, ease: "linear" },
          rotate: { repeat: Infinity, duration: 10, ease: "linear" }
        }}
        // The wave's baseline is at y=50 in the 100px SVG, meaning exactly 50px from the bottom.
        style={{ bottom: "50px" }}
        className="absolute text-cyan-400 origin-bottom"
      >
        <DockerWhaleIcon className="w-16 h-16 opacity-90 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
      </motion.div>
    </div>
  );
}

// 4. AquaSense: Sine Wave + Bubbles
export function AquaSenseAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none z-0">
      <motion.div 
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[200%] h-1/2 flex items-end"
      >
        <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="w-full h-full text-cyan-400">
          <path d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 800,50 L800,100 L0,100 Z" fill="currentColor" opacity="0.3"/>
          <path d="M0,60 C150,90 250,10 400,60 C550,90 650,10 800,60 L800,100 L0,100 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ y: ["100%", "-200%"], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 0.5 }}
        className="absolute left-[20%] bottom-0 text-cyan-200 font-mono text-[10px]"
      >
        pH: 7.2
      </motion.div>
      <motion.div
        animate={{ y: ["100%", "-200%"], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: 2.5 }}
        className="absolute left-[70%] bottom-0 text-cyan-200 font-mono text-[10px]"
      >
        T: 24C
      </motion.div>
    </div>
  );
}

export function ProjectBackground({ projectName }: { projectName: string }) {
  if (projectName.includes("MCTF")) return <InstancerAnimation />;
  if (projectName.includes("CVE")) return <CVEMonitorAnimation />;
  if (projectName.includes("Docker")) return <DockerMonitorAnimation />;
  if (projectName.includes("AquaSense")) return <AquaSenseAnimation />;
  return null;
}
