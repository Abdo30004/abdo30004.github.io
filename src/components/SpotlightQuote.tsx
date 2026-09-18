"use client";

import { useState, useRef } from "react";

export function SpotlightQuote() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-full min-h-[140px] mt-auto bg-slate-950/50 rounded-xl border border-slate-800/60 flex items-center justify-center overflow-hidden cursor-crosshair p-6 transition-all duration-500"
    >
      {/* Background hidden text (barely visible to hint it's there) */}
      <p className="text-xs md:text-sm font-mono text-slate-800/40 text-center select-none pointer-events-none transition-opacity duration-300">
        "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
        <br /><br />
        <span className="text-slate-800/30">— Gene Spafford</span>
      </p>

      {/* Spotlight revealed text using CSS masking */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center p-6 transition-opacity duration-200"
        style={{
          opacity: opacity,
          WebkitMaskImage: `radial-gradient(140px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`,
          maskImage: `radial-gradient(140px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`
        }}
      >
        <p className="text-xs md:text-sm font-mono text-cyan-400 text-center drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] leading-relaxed">
          "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
          <br /><br />
          <span className="text-cyan-600 font-bold">— Gene Spafford</span>
        </p>
      </div>

      {/* Subtle ambient glow tracking mouse */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-200 mix-blend-screen"
        style={{
          opacity: opacity,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`,
        }}
      />
    </div>
  );
}
