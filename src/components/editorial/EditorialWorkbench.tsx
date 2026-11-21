"use client";

import React from "react";
import { useWorkbench } from "@/context/WorkbenchContext";
import { Volume2, VolumeX, RotateCw, Sparkles, Sliders } from "lucide-react";

export default function EditorialWorkbench() {
  const {
    theme,
    setTheme,
    typeface,
    setTypeface,
    isGravityInverted,
    toggleGravity,
    soundActive,
    toggleSound,
    soundVolume,
    setSoundVolume,
  } = useWorkbench();

  return (
    <section id="workbench" className="py-20 md:py-28 border-b hairline-border bg-black/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{"// Interactive Lab & Playground"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              The Workbench.
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-light">
            Personalize your viewing environment. Toggle typefaces, switch color systems, activate ambient focus audio, or invert gravitational coordinates.
          </p>
        </div>

        {/* 4 Interactive Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Typeface Switcher */}
          <div className="editorial-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Typeface
                </span>
                <span className="font-serif text-lg font-bold text-foreground">Aa</span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Currently rendering in <strong className="text-foreground capitalize">{typeface}</strong>. Switch to suit your typographical preference.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTypeface("swiss")}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  typeface === "swiss"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Swiss
              </button>
              <button
                onClick={() => setTypeface("mono")}
                className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                  typeface === "mono"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Mono
              </button>
              <button
                onClick={() => setTypeface("serif")}
                className={`px-3 py-2 rounded-lg text-xs font-serif border transition-all ${
                  typeface === "serif"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Serif
              </button>
            </div>
          </div>

          {/* 2. Palette Mode */}
          <div className="editorial-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Palette Mode
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#07090E] border border-white/20" />
                  <span className="h-3 w-3 rounded-full bg-[#F7F8FA] border border-black/20" />
                  <span className="h-3 w-3 rounded-full bg-[#22D3EE]" />
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Toggle between deep obsidian dark, clean editorial paper light, or high-contrast cyber matrix.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme("obsidian")}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  theme === "obsidian"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Obsidian
              </button>
              <button
                onClick={() => setTheme("paper")}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  theme === "paper"
                    ? "bg-amber-500/20 text-amber-300 border-amber-400/50"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Paper
              </button>
              <button
                onClick={() => setTheme("cyber")}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  theme === "cyber"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
                    : "border-white/[0.08] text-slate-400 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Cyber
              </button>
            </div>
          </div>

          {/* 3. System Frequency Focus Audio */}
          <div className="editorial-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Focus Frequency
                </span>
                {soundActive ? (
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                Native Web Audio synthesizer generating calibrated brown noise for deep engineering focus.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={toggleSound}
                className={`w-full py-2 px-3 rounded-lg text-xs font-mono border flex items-center justify-center gap-2 transition-all ${
                  soundActive
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50"
                    : "border-white/[0.08] text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <span>{soundActive ? "Frequency Active" : "Engage Focus Noise"}</span>
              </button>

              {soundActive && (
                <div className="flex items-center gap-2 pt-1">
                  <Sliders className="w-3 h-3 text-slate-400" />
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    aria-label="Adjust focus sound volume"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4. Quantum Inversion (Anti-Gravity Mode) */}
          <div className="editorial-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Anti-Gravity Mode
                </span>
                <RotateCw
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-700 ${
                    isGravityInverted ? "rotate-180" : ""
                  }`}
                />
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Invert gravitational coordinates 180° to debug systems from an inverted perspective.
              </p>
            </div>

            <button
              onClick={toggleGravity}
              className={`w-full py-2 px-3 rounded-lg text-xs font-mono border flex items-center justify-center gap-2 transition-all ${
                isGravityInverted
                  ? "bg-purple-500/20 text-purple-300 border-purple-400/50"
                  : "border-white/[0.08] text-slate-300 hover:bg-white/[0.04] hover:text-cyan-400"
              }`}
            >
              <span>{isGravityInverted ? "Restore Normal Gravity" : "Invert Gravity 180°"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
