"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Activity, Layers, Globe, ChevronDown, Check, Sun, Moon, Eye } from "lucide-react";
import { sound } from "@/lib/sound";
import { VisualEngineMode, VisualIntensityMode } from "@/components/canvas/ThreeCanvas";

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

interface IntensityOption {
  id: VisualIntensityMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const INTENSITIES: IntensityOption[] = [
  {
    id: "delicate",
    label: "Light (Ethereal)",
    description: "Subdued, soft wireframe, maximum text readability (Recommended)",
    icon: <Sun className="w-3 h-3 text-amber-300" />,
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "Atmospheric ambient contrast",
    icon: <Eye className="w-3 h-3 text-emerald-400" />,
  },
  {
    id: "vivid",
    label: "Vivid",
    description: "Full neon vibrancy",
    icon: <Sparkles className="w-3 h-3 text-sky-400" />,
  },
  {
    id: "zen",
    label: "Zen Watermark",
    description: "Very faint 20% watermark background",
    icon: <Moon className="w-3 h-3 text-slate-400" />,
  },
];

export default function VisualEngineSwitcher() {
  const [activeEngine, setActiveEngine] = useState<VisualEngineMode>("stream");
  const [activeIntensity, setActiveIntensity] = useState<VisualIntensityMode>("delicate");
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_visual_engine") as VisualEngineMode | null;
    if (saved && ENGINES.some((e) => e.id === saved)) {
      setActiveEngine(saved);
    }

    const savedIntensity = localStorage.getItem("portfolio_visual_intensity") as VisualIntensityMode | null;
    if (savedIntensity && INTENSITIES.some((i) => i.id === savedIntensity)) {
      setActiveIntensity(savedIntensity);
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

    const handleSwitchIntensityEvent = (e: Event) => {
      const customEvent = e as CustomEvent<VisualIntensityMode>;
      if (customEvent.detail) {
        setActiveIntensity(customEvent.detail);
      }
    };
    window.addEventListener("set-visual-intensity", handleSwitchIntensityEvent as EventListener);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("set-visual-engine", handleSwitchEngineEvent as EventListener);
      window.removeEventListener("set-visual-intensity", handleSwitchIntensityEvent as EventListener);
    };
  }, []);

  const selectEngine = (id: VisualEngineMode) => {
    setActiveEngine(id);
    sound.playClick();
    localStorage.setItem("portfolio_visual_engine", id);
    window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: id }));
  };

  const selectIntensity = (id: VisualIntensityMode) => {
    setActiveIntensity(id);
    sound.playClick();
    localStorage.setItem("portfolio_visual_intensity", id);
    window.dispatchEvent(new CustomEvent("set-visual-intensity", { detail: id }));
  };

  const activeOption = ENGINES.find((e) => e.id === activeEngine) || ENGINES[0];

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-30 hidden sm:block">
      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="mb-2 p-3 rounded-2xl bg-[#0c0e14]/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-3 w-[330px]">
          {/* Header */}
          <div className="px-1 pb-2 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider uppercase">
              3D Visual Engine &amp; Contrast
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">60 FPS WebGL</span>
          </div>

          {/* Intensity Selector Segment */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                3D Light / Opacity:
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">
                {activeIntensity === "delicate" ? "Light (Best Reading)" : activeIntensity}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              {INTENSITIES.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectIntensity(opt.id)}
                  title={opt.description}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all text-center flex flex-col items-center gap-1 ${
                    activeIntensity === opt.id
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  {opt.icon}
                  <span className="truncate w-full">{opt.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Engine Selector */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
              Background Pipeline Engine:
            </span>
            <div className="py-1 space-y-1">
              {ENGINES.map((item) => {
                const isSelected = item.id === activeEngine;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectEngine(item.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex items-start gap-2.5 group ${
                      isSelected
                        ? "bg-white/[0.08] border border-white/15 text-white"
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
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                        {item.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => {
          setMenuOpen(!menuOpen);
          sound.playClick();
        }}
        title="Toggle 3D visual engine and lighting intensity"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d1017]/90 hover:bg-[#141924] border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-xl backdrop-blur-md group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)] group-hover:scale-125 transition-transform" />
        <span className="text-slate-400 font-sans">Engine:</span>
        <span className="text-slate-100 font-medium">{activeOption.label.split(" ")[0]}</span>
        <span className="text-slate-500">•</span>
        <span className="text-emerald-400 font-medium capitalize">{activeIntensity}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
