"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  ExternalLink,
  Play,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  ArrowDown
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT, ProjectData } from "@/data/portfolio-content";
import EduobalInteractiveDemo from "@/components/projects/EduobalInteractiveDemo";
import SysflowInteractiveDemo from "@/components/projects/SysflowInteractiveDemo";

interface PinnedProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onOpenDemo: (id: string) => void;
}

function PinnedProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  onOpenDemo,
}: PinnedProjectCardProps) {
  const hasDemo = project.interactiveDemoType && project.interactiveDemoType !== "none";

  // Compute entry and exit scroll thresholds for 4 cards across [0, 1]
  const enterStart = index === 0 ? 0 : (index - 1) * 0.25 + 0.16;
  const enterEnd = index === 0 ? 0 : index * 0.25 + 0.04;

  const exitStart = index * 0.25 + 0.16;
  const exitEnd = (index + 1) * 0.25 + 0.04;

  // Y Transform: glides in from bottom (110vh), sits at 0, drifts slightly up on exit (-8vh)
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStart, Math.min(exitEnd, 1)]
      : index === total - 1
      ? [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, 1]
      : [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, exitStart, exitEnd],
    index === 0
      ? ["0vh", "0vh", "-8vh"]
      : index === total - 1
      ? ["110vh", "110vh", "0vh", "0vh"]
      : ["110vh", "110vh", "0vh", "0vh", "-8vh"]
  );

  // Scale Transform: expands to 1.0 at peak, scales down to 0.88 when exiting or waiting
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStart, Math.min(exitEnd, 1)]
      : index === total - 1
      ? [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, 1]
      : [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, exitStart, exitEnd],
    index === 0
      ? [1, 1, 0.88]
      : index === total - 1
      ? [0.88, 0.88, 1, 1]
      : [0.88, 0.88, 1, 1, 0.88]
  );

  // Opacity Transform: 0 when waiting, 1 when active, 0.05 when blurred into background
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStart, Math.min(exitEnd, 1)]
      : index === total - 1
      ? [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, 1]
      : [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, exitStart, exitEnd],
    index === 0
      ? [1, 1, 0.05]
      : index === total - 1
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0.05]
  );

  // Filter Transform: blur(28px) when in background or approaching, blur(0px) when active
  const filter = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStart, Math.min(exitEnd, 1)]
      : index === total - 1
      ? [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, 1]
      : [Math.max(enterStart - 0.01, 0), enterStart, enterEnd, exitStart, exitEnd],
    index === 0
      ? ["blur(0px)", "blur(0px)", "blur(28px)"]
      : index === total - 1
      ? ["blur(28px)", "blur(28px)", "blur(0px)", "blur(0px)"]
      : ["blur(28px)", "blur(28px)", "blur(0px)", "blur(0px)", "blur(28px)"]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex: index + 10,
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-primary)",
      }}
      className="absolute inset-0 m-auto w-full max-w-5xl max-h-[82vh] overflow-y-auto rounded-3xl p-6 sm:p-9 lg:p-11 border backdrop-blur-2xl shadow-2xl transition-all duration-300 will-change-transform"
    >
      {/* Background Ambient Radial Flare */}
      <div
        className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${project.gradient} rounded-full blur-[140px] pointer-events-none opacity-40`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-cyan-400">
              0{index + 1} / 0{total}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            {hasDemo && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                INTERACTIVE SANDBOX
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {hasDemo && (
              <button
                onClick={() => onOpenDemo(project.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive Demo</span>
              </button>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/[0.12] hover:border-cyan-400/40 text-slate-300 hover:text-white transition-colors bg-white/[0.03]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTick()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity font-semibold"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base text-cyan-400 font-medium">
              {project.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Problem & Solution Invariants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-black/25">
                <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                  The Problem
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-black/25">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Architectural Solution
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Invariants & Technologies */}
          <div className="lg:col-span-4 flex flex-col gap-5 pt-1">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Core Architectural Invariants
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Technologies & Protocols
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.04] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FluidProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects } = PORTFOLIO_CONTENT;
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active project index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveIndex(0);
      else if (latest < 0.50) setActiveIndex(1);
      else if (latest < 0.75) setActiveIndex(2);
      else setActiveIndex(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleOpenDemo = (id: string) => {
    sound.playTick();
    setActiveDemoId(id);
  };

  const handleCloseDemo = () => {
    sound.playTick();
    setActiveDemoId(null);
  };

  const scrollToStep = (index: number) => {
    sound.playTick();
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = top + (index / (projects.length - 1)) * height;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* Outer pinned scroll container: 450vh total height */}
      <section
        id="projects"
        ref={containerRef}
        className="relative h-[450vh] transition-colors duration-500"
        style={{ backgroundColor: "var(--surface-bg)" }}
      >
        {/* Ambient Backdrop Blur Mask: Fades and blurs everything around the active card */}
        <div className="absolute inset-0 pointer-events-none bg-black/20 dark:bg-black/40 backdrop-blur-[2px] z-10" />

        {/* Sticky Viewport Stage: Locks in place while scrolling */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
          {/* Top Bar: Section Badge & Live Step Navigation */}
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 pt-4 shrink-0 transition-opacity duration-300">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>03 // PRODUCT LAB & IMMERSIVE CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 hidden sm:block">
                Engineered Software Systems
              </h2>
            </div>

            {/* Interactive Step Navigator */}
            <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/[0.1] backdrop-blur-xl shadow-lg" style={{ backgroundColor: "var(--card-bg)" }}>
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => scrollToStep(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/30 scale-105"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Stage: Stacked Pinned Project Cards with Deep Blur & Fade Transitions */}
          <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-2">
            {projects.map((project, index) => (
              <PinnedProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                scrollYProgress={scrollYProgress}
                onOpenDemo={handleOpenDemo}
              />
            ))}
          </div>

          {/* Bottom Bar: Scroll Indicator & Progress Line */}
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between text-xs font-mono text-slate-400 pb-2 shrink-0">
            <div className="flex items-center gap-2">
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>
                Scroll to explore systems ({activeIndex + 1} of {projects.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Progress:</span>
              <div className="w-24 sm:w-36 h-1.5 rounded-full bg-white/[0.1] overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Modal Overlay */}
      {activeDemoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.15] p-6 sm:p-8 shadow-2xl"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                  Live Interactive Execution Sandbox
                </span>
              </div>
              <button
                onClick={handleCloseDemo}
                className="p-1.5 rounded-full border border-white/[0.1] hover:border-cyan-400 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/40 p-2 sm:p-4">
              {activeDemoId === "eduobal" && <EduobalInteractiveDemo />}
              {activeDemoId === "sysflow" && <SysflowInteractiveDemo />}
              {activeDemoId !== "eduobal" && activeDemoId !== "sysflow" && (
                <div className="py-12 text-center text-slate-400 font-mono text-sm">
                  Interactive sandbox initialized for {activeDemoId}.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
