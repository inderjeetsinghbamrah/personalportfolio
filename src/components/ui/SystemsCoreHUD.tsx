"use client";

import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { Zap, Layers, Server, Globe, Terminal, Send, ChevronRight, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import { CoreTelemetryState, ARCHITECTURE_STAGES } from "@/components/canvas/ArchitectureCore";

export default function SystemsCoreHUD() {
  const [telemetry, setTelemetry] = useState<CoreTelemetryState>({
    stageIndex: 0,
    stageName: ARCHITECTURE_STAGES[0].name,
    stageRole: ARCHITECTURE_STAGES[0].role,
    activeTech: ARCHITECTURE_STAGES[0].tech,
    targetPos: null as unknown as THREE.Vector3,
    colorHex: ARCHITECTURE_STAGES[0].color,
    progress: 0,
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const handleTelemetry = (e: Event) => {
      const customEvent = e as CustomEvent<CoreTelemetryState>;
      if (customEvent.detail) {
        setTelemetry(customEvent.detail);
      }
    };

    const handlePulse = () => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 800);
    };

    window.addEventListener("core-telemetry-update", handleTelemetry as EventListener);
    window.addEventListener("core-pulse-triggered", handlePulse);

    return () => {
      window.removeEventListener("core-telemetry-update", handleTelemetry as EventListener);
      window.removeEventListener("core-pulse-triggered", handlePulse);
    };
  }, []);

  const triggerPulse = () => {
    sound.playClick();
    sound.playLayerSwitch("react");
    window.dispatchEvent(new CustomEvent("trigger-core-pulse"));
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 800);
  };

  const scrollToStage = (stageIdx: number) => {
    const sectionIds = ["#hero", "#stack", "#projects", "#remote", "#terminal", "#contact"];
    const target = sectionIds[stageIdx];
    if (target) {
      sound.playClick();
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stageIcons = [
    <Zap key="0" className="w-3.5 h-3.5 text-emerald-400" />,
    <Layers key="1" className="w-3.5 h-3.5 text-amber-400" />,
    <Server key="2" className="w-3.5 h-3.5 text-sky-400" />,
    <Globe key="3" className="w-3.5 h-3.5 text-indigo-400" />,
    <Terminal key="4" className="w-3.5 h-3.5 text-emerald-300" />,
    <Send key="5" className="w-3.5 h-3.5 text-amber-300" />,
  ];

  return (
    <div className="fixed top-20 right-6 z-30 hidden lg:flex flex-col items-end gap-2 pointer-events-auto">
      {/* Main HUD Card */}
      <div
        className={`transition-all duration-300 rounded-2xl bg-[#090b10]/85 border backdrop-blur-xl shadow-2xl overflow-hidden ${
          isPulsing
            ? "border-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.3)] scale-[1.02]"
            : "border-white/10 hover:border-white/20"
        } ${isExpanded ? "w-80 p-4" : "w-auto px-3.5 py-2"}`}
      >
        {/* Header / Collapse Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 cursor-pointer select-none group"
            title="Click to toggle 3D Architecture HUD"
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPulsing ? "scale-150 bg-emerald-300 shadow-[0_0_8px_#34d399]" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase group-hover:text-emerald-400 transition-colors">
              SPATIAL CORE // {Math.round(telemetry.progress * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={triggerPulse}
              title="Pulse 3D Core Shockwave"
              className="p-1 rounded-md bg-white/[0.04] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-colors border border-white/5"
            >
              <Sparkles className="w-3 h-3" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
            >
              {isExpanded ? "[–]" : "[+]"}
            </button>
          </div>
        </div>

        {/* Expanded Telemetry Details */}
        {isExpanded && (
          <div className="mt-3 space-y-3 pt-3 border-t border-white/[0.06]">
            {/* Active Stage & Meaning */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                {stageIcons[telemetry.stageIndex] || stageIcons[0]}
                <span>{telemetry.stageName}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {telemetry.stageRole}
              </p>
            </div>

            {/* Active Tech Stack Tag */}
            <div className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">ACTIVE SUBSYSTEM</span>
              <span className="text-[10px] font-mono font-medium text-emerald-400 truncate max-w-[170px]">
                {telemetry.activeTech}
              </span>
            </div>

            {/* Interactive 6-Stage Progress Track */}
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 flex justify-between">
                <span>SCROLL PIPELINE STAGES</span>
                <span className="text-slate-400">0{telemetry.stageIndex + 1} / 06</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {ARCHITECTURE_STAGES.map((s, idx) => {
                  const isActive = idx === telemetry.stageIndex;
                  return (
                    <button
                      key={s.name}
                      onClick={() => scrollToStage(idx)}
                      title={`Jump to ${s.name}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)] scale-y-125"
                          : idx < telemetry.stageIndex
                          ? "bg-slate-600 hover:bg-slate-500"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400 border-t border-white/[0.04]">
              <span className="text-slate-500">60 FPS Spring Lerp</span>
              <button
                onClick={triggerPulse}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline transition-all"
              >
                <span>Resonance Pulse</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
