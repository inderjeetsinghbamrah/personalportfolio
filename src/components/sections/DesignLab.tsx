"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Palette, Check } from "lucide-react";

export default function DesignLab() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [componentState, setComponentState] = useState<"default" | "hover" | "active" | "focus" | "loading" | "disabled">("default");
  const [selectedTheme, setSelectedTheme] = useState<string>("obsidian");

  const themes = [
    { id: "obsidian", name: "Obsidian Violet", primary: "#6366F1", bg: "#08090C", border: "rgba(99, 102, 241, 0.4)" },
    { id: "cyber", name: "Cyber Ice", primary: "#38BDF8", bg: "#060A10", border: "rgba(56, 189, 248, 0.4)" },
    { id: "emerald", name: "Slate Emerald", primary: "#10B981", bg: "#060D0A", border: "rgba(16, 185, 129, 0.4)" },
    { id: "amber", name: "Solar Amber", primary: "#F59E0B", bg: "#0D0A06", border: "rgba(245, 158, 11, 0.4)" },
  ];

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[0];

  const handleStateChange = (state: typeof componentState) => {
    sound.playTick();
    setComponentState(state);
  };

  const handleThemeChange = (id: string) => {
    sound.playTick();
    setSelectedTheme(id);
  };

  return (
    <section id="design" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>06 // DESIGN LAB & UI/UX CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Design Engineering & Token Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Design is how complex technical systems communicate intent. Explore design token architectures, interactive component states, and accessibility contrast validation.
          </p>
        </div>

        {/* 1. Before & After Split Transformation Slider */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#0E1017] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                INTERACTIVE COMPARISON SLIDER
              </div>
              <h3 className="text-xl font-bold text-white">
                Before / After Design System Transformation
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span>SLIDE TO REVEAL:</span>
              <span className="text-indigo-400 font-bold">{sliderPos}%</span>
            </div>
          </div>

          {/* Interactive Split View Container */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden select-none border border-white/[0.1]">
            {/* Left: Unstructured Interface (Before) */}
            <div className="absolute inset-0 bg-[#1a1a1a] p-6 text-black flex flex-col justify-center">
              <div className="max-w-md bg-white p-5 rounded shadow">
                <div className="text-base font-bold text-blue-600 mb-1">Generic Form #402</div>
                <div className="text-xs text-gray-600 mb-3">No design tokens. Unaligned padding. Poor contrast.</div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded text-xs">Submit</button>
              </div>
              <span className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                BEFORE: Raw Unengineered Interface
              </span>
            </div>

            {/* Right: Refined Engineered Design System (After) */}
            <div
              className="absolute inset-0 bg-[#090B10] p-6 flex flex-col justify-center border-r border-indigo-500"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="max-w-md bg-[#121624] p-5 rounded-xl border border-indigo-500/40 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                    PROD-DEPLOYMENT // CONFIRM
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    WCAG AAA
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">Execute Canary Deployment to K8s</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strict 8px token spacing, semantic color scale, and sub-millisecond focus rings.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium font-sans transition-colors">
                    Confirm Rollout
                  </button>
                  <button className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] text-slate-300 text-xs font-mono">
                    Abort
                  </button>
                </div>
              </div>
              <span className="absolute bottom-3 left-4 text-[11px] font-mono text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                AFTER: Precision Art-Directed Design System
              </span>
            </div>

            {/* Range input slider overlaid */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before/after comparison slider position"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-indigo-400 pointer-events-none z-10 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 border border-white text-white flex items-center justify-center shadow-lg text-[10px]">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Component State Inspector & Theme Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Component States Workbench (Left 7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                  MICRO-INTERACTIONS & STATES
                </span>
                <h4 className="text-lg font-bold text-white">Component Pseudo-State Inspector</h4>
              </div>

              {/* State Selector Buttons */}
              <div className="flex flex-wrap gap-1 bg-[#121622] p-1 rounded-lg border border-white/[0.06]">
                {(["default", "hover", "active", "focus", "loading", "disabled"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateChange(st)}
                    className={`px-2 py-1 rounded text-[11px] font-mono capitalize transition-all ${
                      componentState === st
                        ? "bg-indigo-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Preview Canvas */}
            <div className="p-8 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Primary Button */}
              <button
                disabled={componentState === "disabled"}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 ${
                  componentState === "hover"
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                    : componentState === "active"
                    ? "bg-indigo-700 text-white scale-95"
                    : componentState === "focus"
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-500/40"
                    : componentState === "loading"
                    ? "bg-indigo-600/80 text-indigo-200 cursor-wait animate-pulse"
                    : componentState === "disabled"
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                {componentState === "loading" ? "Validating Contract..." : "Deploy Container"}
              </button>

              {/* Secondary Ghost Button */}
              <button
                disabled={componentState === "disabled"}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
                  componentState === "hover"
                    ? "bg-white/[0.1] text-white border-white/[0.2]"
                    : componentState === "disabled"
                    ? "text-slate-600 cursor-not-allowed"
                    : "bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                }`}
              >
                Inspect Telemetry
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center justify-between pt-2">
              <span>STATE ACTIVE: {componentState.toUpperCase()}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                ACCESSIBILITY VERIFIED
              </span>
            </div>
          </div>

          {/* Theme Engine & Design Tokens (Right 5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0F121C] border border-white/[0.1] space-y-6">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">
                SYSTEM TOKEN ARCHITECTURE
              </span>
              <h4 className="text-xl font-bold text-white mt-1">Theme Token Switcher</h4>
              <p className="text-xs text-slate-400 mt-1">
                Scalable CSS custom properties allow instant runtime theme switching with zero DOM re-render penalty.
              </p>
            </div>

            {/* Theme options */}
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((th) => (
                <button
                  key={th.id}
                  onClick={() => handleThemeChange(th.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedTheme === th.id
                      ? "bg-[#161B2B] border-indigo-500/70 ring-1 ring-indigo-500/40 text-white"
                      : "bg-black/30 border-white/[0.06] text-slate-400 hover:text-white"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: th.primary }}
                  />
                  <span className="text-xs font-medium font-sans truncate">{th.name}</span>
                </button>
              ))}
            </div>

            {/* Live Token Values Readout */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs space-y-2">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider pb-1 border-b border-white/[0.06]">
                ACTIVE CSS TOKENS
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">--brand-primary:</span>
                <span className="text-white font-semibold">{currentTheme.primary}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">--surface-base:</span>
                <span className="text-white font-semibold">{currentTheme.bg}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">--border-focus:</span>
                <span className="text-white font-semibold">{currentTheme.border}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">--radius-card:</span>
                <span className="text-white font-semibold">16px / 1rem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
