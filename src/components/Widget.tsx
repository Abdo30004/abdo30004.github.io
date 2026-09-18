"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
}

export function Widget({ children, className, title, icon: Icon, action }: WidgetProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      variants={itemVariants}
      className={cn("group bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden transition-colors hover:border-slate-700", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.1), transparent 40%)`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      
      {title && (
        <div className="flex items-center justify-between text-slate-400 mb-2 pb-4 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase font-semibold">{title}</h2>
          </div>
          {action}
        </div>
      )}
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
