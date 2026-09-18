"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

interface TerminalEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalEasterEgg({ isOpen, onClose }: TerminalEasterEggProps) {
  const [input, setInput] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<{ type: "cmd" | "out" | "err", text: string, center?: boolean }[]>([
    { type: "out", text: "Linux Terminal", center: true },
    { type: "out", text: "Authentication successful. Type 'help' to see available commands." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: "cmd", text: cmd }]);
    setIsProcessing(true);
    
    setTimeout(() => {
      let output = "";
      let type: "out" | "err" = "out";

      switch (trimmed) {
        case "help":
          output = "Available commands: whoami, skills, clear, sudo rm -rf /, exit";
          break;
        case "whoami":
          output = "root@algiers_dz - Admin Access Granted.\nRole: DevSecOps Engineer & Threat Hunter.";
          break;
        case "skills":
          output = "[*] Penetration Testing\n[*] Cloud Infrastructure (Docker, K8s)\n[*] Automation (Python, Bash)\n[*] Next-Gen Web Dev";
          break;
        case "clear":
          setHistory([]);
          setIsProcessing(false);
          return;
        case "sudo rm -rf /":
          type = "err";
          output = "Permission Denied: Nice try! You are trapped in a sandboxed environment.";
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          break;
        case "exit":
          onClose();
          setIsProcessing(false);
          return;
        case "":
          setIsProcessing(false);
          return;
        default:
          type = "err";
          output = `Command not found: ${trimmed}`;
      }
      
      setHistory(prev => [...prev, { type, text: output }]);
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0, x: isShaking ? [-10, 10, -10, 10, 0] : 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ x: { duration: 0.4 } }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0b0f19] border border-slate-700 rounded-lg shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col font-mono text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon className="w-4 h-4" />
                <span className="text-xs">root@linux:~</span>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-red-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Body */}
            <div 
              ref={scrollRef}
              className="p-4 h-80 overflow-y-auto flex flex-col gap-2"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap ${line.type === 'err' ? 'text-red-400' : line.type === 'cmd' ? 'text-slate-300' : 'text-cyan-400'} ${line.center ? 'text-center font-bold tracking-widest mb-2' : ''}`}>
                  {line.type === 'cmd' && <span className="text-emerald-400 mr-2">root@linux:~$</span>}
                  {line.text}
                </div>
              ))}
              
              {!isProcessing && (
                <div className="flex items-center text-slate-300 mt-1">
                  <span className="text-emerald-400 mr-2 shrink-0">root@linux:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none flex-1 w-full text-slate-300 caret-cyan-400"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
