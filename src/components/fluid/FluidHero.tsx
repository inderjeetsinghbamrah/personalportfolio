"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Send, Layers } from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

// Dynamically import Three.js Fluid Mesh with SSR false
const FluidLiquidSphere = dynamic(
  () => import("@/components/fluid/FluidLiquidSphere"),
  { ssr: false }
);

interface FluidHeroProps {
  onExploreWork: () => void;
  onCollaborate: () => void;
}

export default function FluidHero({ onExploreWork, onCollaborate }: FluidHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Smooth Parallax Transformations
  const yText = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityHero = useTransform(scrollY, [0, 450], [1, 0.1]);
  const scaleMesh = useTransform(scrollY, [0, 600], [1, 0.85]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden ocean-mesh"
    >
      {/* Ambient Moving Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-water-wave" />
      <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none animate-water-wave" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Column: Expressive Editorial Typography & CTAs */}
          <motion.div
            style={{ y: yText, opacity: opacityHero }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Identity Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="tracking-wide uppercase font-semibold">
                {PORTFOLIO_CONTENT.personal.name}
              </span>
              <span className="text-cyan-600">{" // "}</span>
              <span className="text-slate-300 hidden sm:inline">
                Full-Stack Architect & UI/UX
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Engineering{" "}
              <span className="fluid-gradient-text block mt-1">
                Digital Experiences.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              {PORTFOLIO_CONTENT.hero.subheadline}
            </motion.p>

            {/* Dynamic Discipline Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 pt-1 text-xs font-mono"
            >
              {[
                "Full Stack Developer",
                "UI/UX Designer",
                "Software Architect",
                "Creative Technologist",
              ].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 backdrop-blur-sm hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <button
                onClick={() => {
                  sound.playTick();
                  onExploreWork();
                }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore My Work</span>
                <Layers className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
              </button>

              <button
                onClick={() => {
                  sound.playTick();
                  onCollaborate();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-cyan-400/40 text-slate-200 hover:text-white font-medium text-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Let&apos;s Collaborate</span>
              </button>
            </motion.div>

            {/* Floating Technical Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400"
            >
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                STACK:
              </span>
              {["Next.js 14", "PostgreSQL 17", "TypeScript", "Docker", "Figma"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-900/60 border border-white/[0.06] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Fluid Liquid Sphere Canvas */}
          <motion.div
            style={{ scale: scaleMesh }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[520px] w-full flex items-center justify-center relative"
          >
            <FluidLiquidSphere />

            {/* Subtle floating hint */}
            <div className="absolute -bottom-2 text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm pointer-events-none">
              Interactive Liquid Mesh · Hover / Click
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          onClick={() => {
            sound.playTick();
            onExploreWork();
          }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
