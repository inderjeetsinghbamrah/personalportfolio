"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Layers,
  Cpu,
  Database,
  Box,
  Palette,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export default function FluidAbout() {
  const { about, personal } = PORTFOLIO_CONTENT;

  const pillarIcons = [
    Layers,       // Full-Stack Engineering
    Cpu,          // Product Architecture
    Palette,      // UI/UX & Design Systems
    Database,     // Database Architecture
    Box,          // Cloud Infrastructure
    Lightbulb,    // Creative Problem Solving
  ];

  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-deep">
      {/* Ambient Caustic Glows */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Organic Tag */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4"
          >
            <span>01 // PROFESSIONAL IDENTITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            {about.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light"
          >
            {about.lead}
          </motion.p>
        </div>

        {/* Narrative & Metric Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-start">
          {/* Main Story Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
          >
            {about.story.map((paragraph, idx) => (
              <p
                key={idx}
                className="p-6 rounded-2xl bg-ocean-abyss/80 border border-white/[0.07] backdrop-blur-md shadow-lg shadow-black/40 hover:border-cyan-500/30 transition-colors"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Animated Metric Cards (4 Pillars of Excellence) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {personal.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-ocean-abyss to-ocean-mariana border border-white/[0.08] hover:border-cyan-400/40 shadow-xl transition-all group flex flex-col justify-between min-h-[160px]"
              >
                <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:fluid-gradient-cyan transition-all">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-3">
                  {stat.detail}
                </div>
              </div>
            ))}

            {/* Academic Pedigree Callout */}
            <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-ocean-abyss to-cyan-950/30 border border-cyan-500/20 text-slate-300 text-xs sm:text-sm flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-medium">Higher Education Faculty</strong>
                <span className="text-slate-400">
                  Lecturer & former Assistant Professor in Computer Science & Information Technology.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 6 Core Engineering Pillars Section */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Six Technical Dimensions
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              CROSS-FUNCTIONAL EXPERTISE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] || CheckCircle2;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => sound.playTick()}
                  className="fluid-glass p-7 rounded-2xl relative group overflow-hidden"
                >
                  {/* Subtle top fluid line highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400 transition-all duration-500" />

                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-5 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
