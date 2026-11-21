"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export default function FluidExperience() {
  const { experience } = PORTFOLIO_CONTENT;
  const [filterType, setFilterType] = useState<"all" | "academic" | "education">("all");

  const filteredTimeline = experience.filter(
    (item) => filterType === "all" || item.type === filterType
  );

  return (
    <section id="experience" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-deep">
      {/* Ambient Moving Atmosphere */}
      <div className="absolute top-1/4 right-1/4 w-[35rem] h-[35rem] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
              <span>05 // CAREER & ACADEMIC PEDIGREE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Professional Journey
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light">
              Higher education engineering instruction, graduate computing research, and full-stack architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-ocean-abyss border border-white/[0.08]">
            {[
              { id: "all", label: "All Milestones" },
              { id: "academic", label: "Teaching & Faculty" },
              { id: "education", label: "Degrees (M.Tech & B.Tech)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTick();
                  setFilterType(tab.id as typeof filterType);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  filterType === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Continuous Flowing Timeline */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12 border-l-2 border-gradient-to-b border-cyan-500/30 space-y-12">
          {filteredTimeline.map((item, idx) => {
            const isEducation = item.type === "education";

            return (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Glowing Flow Node Orb on the Timeline Rail */}
                <div className="absolute -left-[31px] sm:-left-[47px] lg:-left-[55px] top-6 h-6 w-6 rounded-full bg-ocean-deep border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform duration-300">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                {/* Milestone Card */}
                <div className="fluid-glass p-7 sm:p-9 rounded-3xl border border-white/[0.08] hover:border-cyan-400/40 transition-all shadow-xl">
                  {/* Top Header Row with Large Expressive Date Typography */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.07]">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                          {isEducation ? "ACADEMIC DEGREE" : "FACULTY APPOINTMENT"}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {item.location}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {item.role}
                      </h3>

                      <div className="text-sm sm:text-base text-cyan-200 font-medium mt-0.5">
                        {item.institution}
                      </div>
                    </div>

                    {/* Large Date Typography */}
                    <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400 shrink-0">
                      {item.period}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 mb-6">
                    {item.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-300 leading-relaxed font-light">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-xs font-mono text-slate-400 mr-1">DOMAINS:</span>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
