"use client";

import React, { useState } from "react";
import { ArchitectureDemo } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import { ArrowRight, Play, Shield, Activity } from "lucide-react";
import SectorGate from "@/components/character/SectorGate";

interface ArchPlaygroundProps {
  demos: ArchitectureDemo[];
}

export default function ArchitecturePlayground({ demos }: ArchPlaygroundProps) {
  const [selectedDemoSlug, setSelectedDemoSlug] = useState<string>("nextjs-fullstack");
  const [selectedComponentIdx, setSelectedComponentIdx] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentDemo = demos.find((d) => d.slug === selectedDemoSlug) || demos[0];
  const activeComponent = currentDemo?.components[selectedComponentIdx] || currentDemo?.components[0];

  const handleSelectDemo = (slug: string) => {
    sound.playTick();
    setSelectedDemoSlug(slug);
    setSelectedComponentIdx(0);
    setActiveStep(1);
  };

  const handleSelectComponent = (idx: number) => {
    sound.playTick();
    setSelectedComponentIdx(idx);
  };

  const handleStepSimulation = () => {
    sound.playTick();
    setIsSimulating(true);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      if (step > currentDemo.data_flow.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setActiveStep(1);
        sound.playSuccess();
      } else {
        setActiveStep(step);
        sound.playTick();
      }
    }, 700);
  };

  return (
    <section id="architecture" className="py-24 border-t border-white/[0.08] relative bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Sector Gate 05: System Architecture Playground */}
        <SectorGate
          sectorId="architecture"
          actionButton={{
            label: "Trace Packet Flow",
            onClick: handleStepSimulation,
          }}
        />

        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-sky-400 mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>05 // SYSTEM ARCHITECTURE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Interactive Architecture Explorer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Inspect verified cloud topologies, component communication boundaries, data flow lifecycles, and failure recovery protocols.
          </p>
        </div>

        {/* Architecture Topology Switcher Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {demos.map((d) => {
            const isSelected = selectedDemoSlug === d.slug;
            return (
              <button
                key={d.slug}
                onClick={() => handleSelectDemo(d.slug)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#181D2E] border-indigo-500/70 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-[#0E1017] hover:bg-[#131622] border-white/[0.06] text-slate-300"
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 mb-1">
                  TOPOLOGY 0{d.sort_order}
                </div>
                <div className="font-semibold text-xs sm:text-sm text-white line-clamp-1">
                  {d.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Playground Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Topology Diagram (Left 7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white">{currentDemo.title}</h3>
                <span className="text-xs font-mono text-slate-400">{currentDemo.subtitle}</span>
              </div>

              {/* Animate Data Flow Button */}
              <button
                onClick={handleStepSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold disabled:opacity-50 transition-colors self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? `Flowing Step ${activeStep}...` : "Trace Packet Flow"}</span>
              </button>
            </div>

            {/* Clickable Component Nodes */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                COMPONENTS (CLICK TO INSPECT RESPONSIBILITIES):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentDemo.components.map((comp, idx) => {
                  const isSelected = selectedComponentIdx === idx;
                  return (
                    <button
                      key={comp.name}
                      onClick={() => handleSelectComponent(idx)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#181D2E] border-indigo-500/70 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                          : "bg-black/30 hover:bg-white/[0.04] border-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-slate-400">NODE 0{idx + 1}</span>
                        <span className="text-sky-400 truncate max-w-[120px]">{comp.tech}</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-white">
                        {comp.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {comp.role}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Data Flow Trace Pipeline */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>DATA FLOW PIPELINE (STEP {activeStep} OF {currentDemo.data_flow.length})</span>
                <span className="text-emerald-400">TOTAL ROUND TRIP &lt; 50ms</span>
              </div>

              <div className="space-y-2">
                {currentDemo.data_flow.map((step) => {
                  const isCurrent = activeStep === step.step;
                  return (
                    <div
                      key={step.step}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-all duration-200 flex items-center justify-between gap-3 ${
                        isCurrent
                          ? "bg-indigo-500/20 border-indigo-500/60 text-white shadow-sm ring-1 ring-indigo-500/30"
                          : "bg-white/[0.01] border-white/[0.04] text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`font-bold ${isCurrent ? "text-indigo-400" : "text-slate-600"}`}>
                          0{step.step}
                        </span>
                        <span className="text-white truncate">{step.from}</span>
                        <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                        <span className="text-white truncate">{step.to}</span>
                        <span className="text-[11px] text-slate-300 hidden sm:inline">: {step.action}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold shrink-0">
                        {step.latency}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Component Deep Rationale Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0F121C] border border-white/[0.1] shadow-2xl space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-1">
                COMPONENT INSPECTION
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">
                {activeComponent?.name}
              </h4>
              <span className="text-xs font-mono text-sky-400">
                RUNTIME TECH: {activeComponent?.tech}
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                ARCHITECTURAL RESPONSIBILITY:
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-black/40 border border-white/[0.05]">
                {activeComponent?.role}
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                OVERVIEW OF ARCHITECTURE:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentDemo.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 text-xs font-mono space-y-2 text-indigo-200">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>FAULT TOLERANCE INVARIANT</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Engineered with graceful degradation. In the event of network partition or upstream cache evictions, fallback circuits prevent cascade failures to downstream services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
