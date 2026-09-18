"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type Lang = "en" | "ar" | "fr" | "es" | "de";

const QUOTES: Record<Lang, { text: string, author: string, fontClass: string, dir: "ltr" | "rtl" }> = {
  ar: {
    text: "« أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ »",
    author: "رسول الله ﷺ",
    fontClass: "font-sans text-lg md:text-xl font-medium",
    dir: "rtl"
  },
  fr: {
    text: `"Les actes les plus aimés d'Allah sont les plus constants, même s'ils sont minimes."`,
    author: "Prophète Muhammad (ﷺ)",
    fontClass: "font-mono text-xs md:text-sm",
    dir: "ltr"
  },
  es: {
    text: `"Las acciones más amadas por Allah son las constantes, aunque sean pequeñas."`,
    author: "Profeta Muhammad (ﷺ)",
    fontClass: "font-mono text-xs md:text-sm",
    dir: "ltr"
  },
  de: {
    text: `"Die beliebtesten Taten bei Allah sind jene, die beständig sind, auch wenn sie gering sind."`,
    author: "Prophet Muhammad (ﷺ)",
    fontClass: "font-mono text-xs md:text-sm",
    dir: "ltr"
  },
  en: {
    text: `"The most beloved of deeds to Allah are those that are most consistent, even if they are small."`,
    author: "Prophet Muhammad (ﷺ)",
    fontClass: "font-mono text-xs md:text-sm",
    dir: "ltr"
  }
};

export function SpotlightQuote() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect browser language on the client side
    const userLang = navigator.language.toLowerCase();
    if (userLang.startsWith("ar")) {
      setLang("ar");
    } else if (userLang.startsWith("fr")) {
      setLang("fr");
    } else if (userLang.startsWith("es")) {
      setLang("es");
    } else if (userLang.startsWith("de")) {
      setLang("de");
    } else {
      setLang("en");
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const currentQuote = QUOTES[lang];

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      dir={currentQuote.dir}
      className="relative w-full flex-1 min-h-[120px] mt-8 flex flex-col items-center justify-center overflow-hidden cursor-crosshair group"
    >
      {/* Background hidden text */}
      <p className={cn(currentQuote.fontClass, "text-slate-800/30 text-center select-none pointer-events-none italic leading-relaxed")}>
        {currentQuote.text}
        <br /><br />
        <span className="text-slate-800/20">{currentQuote.author}</span>
      </p>

      {/* Spotlight revealed text using CSS masking (Mouse) */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-200 hidden sm:flex"
        style={{
          opacity: opacity,
          WebkitMaskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`,
          maskImage: `radial-gradient(150px circle at ${position.x}px ${position.y}px, black 15%, transparent 100%)`
        }}
      >
        <p className={cn(currentQuote.fontClass, "text-cyan-400 text-center italic leading-relaxed drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]")}>
          {currentQuote.text}
          <br /><br />
          <span className="text-cyan-600/80 font-bold">{currentQuote.author}</span>
        </p>
      </div>

      {/* Endless Shine revealed text (Mobile/Touch) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center sm:hidden">
        <p 
          className={cn(currentQuote.fontClass, "text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-cyan-400 to-slate-600 animate-shimmer text-center italic leading-relaxed")}
          style={{ backgroundSize: "200% auto" }}
        >
          {currentQuote.text}
          <br /><br />
          <span className="font-bold">{currentQuote.author}</span>
        </p>
      </div>
    </div>
  );
}
