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
      className="relative w-full flex-1 min-h-[120px] mt-8 flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
    >
      {/* Background hidden text */}
      <p className="text-xs md:text-sm font-mono text-slate-800/30 text-center select-none pointer-events-none italic leading-relaxed">
        "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
        <br /><br />
        <span className="text-slate-800/20">— Gene Spafford</span>
      </p>

      {/* Spotlight revealed text using CSS masking */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-200"
        style={{
          opacity: opacity,
          WebkitMaskImage: `radial-gradient(140px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`,
          maskImage: `radial-gradient(140px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`
        }}
      >
        <p className="text-xs md:text-sm font-mono text-cyan-400 text-center italic leading-relaxed drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
          "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
          <br /><br />
          <span className="text-cyan-600/80 font-bold">— Gene Spafford</span>
        </p>
      </div>
    </div>
  );
}
