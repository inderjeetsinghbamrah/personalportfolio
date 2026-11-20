"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Command, 
  ArrowRight, 
  FileText, 
  Zap, 
  Layers, 
  Globe, 
  Terminal, 
  Mail, 
  Volume2, 
  Sparkles,
  Activity,
  Shield,
  X 
} from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Architecture" | "Actions" | "Contact" | "Visuals";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const triggerStressTest = () => {
    onClose();
    window.dispatchEvent(new CustomEvent("trigger-pipeline-stress"));
  };

  const copyEmail = () => {
    onClose();
    navigator.clipboard.writeText("inderjeet@systems.dev");
  };

  const switchVisual = (engine: "stream" | "horizon" | "mesh" | "globe") => {
    onClose();
    localStorage.setItem("portfolio_visual_engine", engine);
    window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: engine }));
    sound.playClick();
  };

  const commands: CommandItem[] = [
    {
      id: "resume",
      title: "View & Download ATS Resume (PDF)",
      category: "Actions",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      shortcut: "R",
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "stress-test",
      title: "Stress-Test 3D Pipeline (Simulate 100k req/s)",
      category: "Actions",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      shortcut: "S",
      action: triggerStressTest,
    },
    {
      id: "admin-panel",
      title: "Systems Admin Console (Owner Secret Gate)",
      category: "Actions",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      shortcut: "⌥A",
      action: () => {
        onClose();
        router.push("/admin");
      },
    },
    {
      id: "nav-hero",
      title: "Jump to Overview & Systems SLA",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      action: () => scrollTo("#hero"),
    },
    {
      id: "nav-stack",
      title: "Jump to Architecture & Core Runtimes",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo("#stack"),
    },
    {
      id: "nav-projects",
      title: "Jump to Selected Production Projects",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      action: () => scrollTo("#projects"),
    },
    {
      id: "nav-remote",
      title: "Jump to Global Remote Overlap & Timezones",
      category: "Navigation",
      icon: <Globe className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo("#remote"),
    },
    {
      id: "nav-terminal",
      title: "Jump to System CLI Terminal",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => scrollTo("#terminal"),
    },
    {
      id: "nav-contact",
      title: "Jump to Contact & Inquiries",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => scrollTo("#contact"),
    },
    {
      id: "copy-email",
      title: "Copy Email Address (inderjeet@systems.dev)",
      category: "Contact",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: copyEmail,
    },
    {
      id: "toggle-sound",
      title: "Toggle UI Audio Synthesizer",
      category: "Actions",
      icon: <Volume2 className="w-4 h-4 text-slate-400" />,
      action: () => {
        sound.toggleMute();
        onClose();
      },
    },
    {
      id: "engine-stream",
      title: "Visual Engine: Tokio Concurrency Streams (Calm multi-threaded flow)",
      category: "Visuals",
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      shortcut: "1",
      action: () => switchVisual("stream"),
    },
    {
      id: "engine-horizon",
      title: "Visual Engine: Systems Horizon (Digital topological matrix plane)",
      category: "Visuals",
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      shortcut: "2",
      action: () => switchVisual("horizon"),
    },
    {
      id: "engine-mesh",
      title: "Visual Engine: Cluster Service DAG (Distributed microservices)",
      category: "Visuals",
      icon: <Sparkles className="w-4 h-4 text-teal-400" />,
      shortcut: "3",
      action: () => switchVisual("mesh"),
    },
    {
      id: "engine-globe",
      title: "Visual Engine: Global Edge Infrastructure (Worldwide CDN mesh)",
      category: "Visuals",
      icon: <Globe className="w-4 h-4 text-indigo-400" />,
      shortcut: "4",
      action: () => switchVisual("globe"),
    },
  ];

  const filteredCommands = query.trim() === ""
    ? commands
    : commands.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0c0e14] border border-white/15 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search (e.g. 'resume', 'stress', 'rust')..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
          <button onClick={onClose} className="sm:hidden text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching actions found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors ${
                  idx === selectedIndex
                    ? "bg-white/10 text-white font-medium"
                    : "text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-white block font-medium">{item.title}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                {item.shortcut && (
                  <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with ↑ / ↓ • Select with Enter</span>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>K</span>
          </span>
        </div>
      </div>
    </div>
  );
}
