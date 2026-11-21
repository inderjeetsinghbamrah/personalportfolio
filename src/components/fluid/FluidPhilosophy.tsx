"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export default function FluidPhilosophy() {
  const { philosophy } = PORTFOLIO_CONTENT;
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeStage = philosophy[activeStepIdx];

  const handleSelectStep = (idx: number) => {
    sound.playTick();
    setActiveStepIdx(idx);
  };

  return (
    <section id="philosophy" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-abyss">
      {/* Ambient Fluid Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[30rem] h-[30rem] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span>04 // PRODUCT DEVELOPMENT PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Design is not decoration.
            <span className="fluid-gradient-cyan block mt-1">
              It&apos;s functionality.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            A disciplined, five-stage product engineering lifecycle bridging user empathy, mathematical relational schemas, fluid interface craft, and distributed cloud resilience.
          </p>
        </div>

        {/* 5-Stage Flowing River Stepper Bar */}
        <div className="relative mb-14">
          {/* Continuous Glowing River Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/50 to-violet-500/30 -translate-y-1/2 rounded-full hidden md:block" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
            {philosophy.map((stage, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border relative ${
                    isSelected
                      ? "bg-gradient-to-b from-cyan-950/90 to-ocean-deep border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.03] ring-1 ring-cyan-400/50"
                      : "bg-ocean-deep/80 hover:bg-ocean-deep border-white/[0.08] hover:border-white/[0.2]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black font-mono text-cyan-400">
                      {stage.step}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isSelected ? "bg-cyan-400 animate-ping" : "bg-slate-700"
                      }`}
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-light">
                    {stage.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Fluid Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fluid-glass p-8 sm:p-12 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Background Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Stage Axiom & Narrative */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    STAGE {activeStage.step}{" // "}{activeStage.subtitle.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {activeStage.title}
                </h3>

                <blockquote className="p-4 rounded-xl bg-cyan-950/30 border-l-4 border-cyan-400 text-sm sm:text-base text-cyan-100 italic">
                  &ldquo;{activeStage.quote}&rdquo;
                </blockquote>

                <p className="text-base text-slate-300 leading-relaxed font-light">
                  {activeStage.description}
                </p>
              </div>

              {/* Right Column: Key Invariants Checklist */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-ocean-deep/90 border border-white/[0.08] shadow-inner space-y-4">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engineering Invariants Enforced</span>
                </div>

                <div className="space-y-3">
                  {activeStage.invariants.map((inv, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300 leading-snug">
                        {inv}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const next = (activeStepIdx + 1) % philosophy.length;
                      handleSelectStep(next);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Next Stage ({philosophy[(activeStepIdx + 1) % philosophy.length].title})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
