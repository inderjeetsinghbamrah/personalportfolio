"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Activity, Layers, Globe, ChevronDown, Check } from "lucide-react";
import { sound } from "@/lib/sound";
import { VisualEngineMode } from "@/components/canvas/ThreeCanvas";

interface EngineOption {
  id: VisualEngineMode;
  label: string;
  tagline: string;
  icon: React.ReactNode;
}

const ENGINES: EngineOption[] = [
  {
    id: "stream",
    label: "Tokio Concurrency Streams",
    tagline: "Serene multi-threaded task flow & streaming SSR (Default)",
    icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />,
  },
  {
    id: "horizon",
    label: "Systems Horizon",
    tagline: "Topological wave matrix at deep horizon, 100% reading clarity",
    icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
  },
  {
    id: "mesh",
    label: "Cluster Service DAG",
    tagline: "Perimeter microservice topology & async packet routing",
    icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" />,
  },
  {
    id: "globe",
    label: "Global Edge Infrastructure",
    tagline: "Multi-region CDN edge nodes & transatlantic conduits",
    icon: <Globe className="w-3.5 h-3.5 text-indigo-400" />,
  },
];

export default function VisualEngineSwitcher() {
  const [activeEngine, setActiveEngine] = useState<VisualEngineMode>("stream");
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_visual_engine") as VisualEngineMode | null;
    if (saved && ENGINES.some((e) => e.id === saved)) {
      setActiveEngine(saved);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    const handleSwitchEngineEvent = (e: Event) => {
      const customEvent = e as CustomEvent<VisualEngineMode>;
      if (customEvent.detail) {
        setActiveEngine(customEvent.detail);
      }
    };
    window.addEventListener("set-visual-engine", handleSwitchEngineEvent as EventListener);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("set-visual-engine", handleSwitchEngineEvent as EventListener);
    };
  }, []);

  const selectEngine = (id: VisualEngineMode) => {
    setActiveEngine(id);
    setMenuOpen(false);
    sound.playClick();
    localStorage.setItem("portfolio_visual_engine", id);
    window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: id }));
  };

  const activeOption = ENGINES.find((e) => e.id === activeEngine) || ENGINES[0];

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-30 hidden sm:block">
      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="mb-2 p-2 rounded-2xl bg-[#0c0e14]/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-1 w-[320px]">
          <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider uppercase">
              Select 3D Visual Engine
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">60 FPS WebGL</span>
          </div>

          <div className="py-1 space-y-1">
            {ENGINES.map((item) => {
              const isSelected = item.id === activeEngine;
              return (
                <button
                  key={item.id}
                  onClick={() => selectEngine(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                    isSelected
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-white"
                      : "hover:bg-white/[0.04] text-slate-300 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 p-1 rounded-md bg-white/[0.04] group-hover:bg-white/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-tight">
                        {item.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
          sound.playClick();
        }}
        title="Toggle 3D visual engine background"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d1017]/90 hover:bg-[#141924] border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-xl backdrop-blur-md group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)] group-hover:scale-125 transition-transform" />
        <span className="text-slate-400 font-sans">Engine:</span>
        <span className="text-slate-100 font-medium">{activeOption.label.split(" ")[0]}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
