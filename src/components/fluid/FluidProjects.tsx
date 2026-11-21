"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code2,
  Layers,
  CheckCircle2,
  Play
} from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT, ProjectData } from "@/data/portfolio-content";
import EduobalInteractiveDemo from "@/components/projects/EduobalInteractiveDemo";
import SysflowInteractiveDemo from "@/components/projects/SysflowInteractiveDemo";
import ProjectCaseStudyModal from "@/components/projects/ProjectCaseStudyModal";
import { Project } from "@/types/portfolio";

export default function FluidProjects() {
  const { projects } = PORTFOLIO_CONTENT;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSandboxId, setActiveSandboxId] = useState<string | null>("eduobal");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const categories = ["All", "SaaS Applications", "Developer Tools", "Design Systems", "Cloud Infrastructure"];

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const handleOpenSandbox = (id: string) => {
    sound.playTick();
    setActiveSandboxId((prev) => (prev === id ? null : id));
  };

  const handleOpenCaseStudy = (proj: ProjectData) => {
    sound.playTick();
    // Convert to Project shape for modal
    const p: Project = {
      id: proj.id,
      title: proj.title,
      slug: proj.slug,
      tagline: proj.tagline,
      overview: proj.description,
      problem_statement: proj.problem,
      solution: proj.solution,
      architecture_diagram: {
        Client: "Next.js 14 App Router / React Server Components",
        Gateway: "Edge Route Handlers & Zod contract validation",
        Database: "PostgreSQL 17 with Row Level Security (RLS)",
        Cache: "Redis sub-2ms in-memory cache-aside cluster",
      },
      database_design: {
        tables: ["tenants", "courses", "assessments", "students", "attainment_matrices"],
        tokens: ["color-brand-cyan", "spacing-fluid-lg", "elevation-caustic-3"],
      },
      technologies: proj.technologies,
      engineering_challenges: [
        {
          title: "Real-Time Matrix Calculation",
          description: "High-throughput linear algebraic transformations across thousands of student course marks.",
        },
        {
          title: "Multi-Tenant Isolation",
          description: "Enforcing Row Level Security (RLS) policies at the PostgreSQL kernel level.",
        },
        {
          title: "Cache Invalidation",
          description: "Sub-10ms cache invalidation and distributed session locks using Redis.",
        },
      ],
      key_decisions: [
        {
          decision: "PostgreSQL 17 Relational Engine",
          reason: "Strict ACID transactional invariants for academic outcome records.",
        },
        {
          decision: "React Server Components",
          reason: "Zero-bundle client runtime with sub-second streaming SSR delivery.",
        },
      ],
      github_url: proj.githubUrl,
      live_demo_url: proj.liveUrl || "",
      is_featured: true,
      is_published: true,
      category_name: proj.category,
      sort_order: 1,
    };
    setSelectedCaseStudy(p);
  };

  return (
    <section id="projects" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-deep">
      {/* Ambient Moving Atmosphere */}
      <div className="absolute top-1/4 left-1/3 w-[45rem] h-[45rem] bg-cyan-600/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[35rem] h-[35rem] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span>03 // PRODUCT LAB & IMMERSIVE CASE STUDIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Engineered Software Products
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Every project is treated as an interactive product—complete with live executable sandboxes, architectural decompositions, database schemas, and technical trade-offs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playTick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.07]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Showcase List (Full-Width Immersive Cards) */}
        <div className="space-y-12">
          {filteredProjects.map((proj, idx) => {
            const hasSandbox = proj.interactiveDemoType && proj.interactiveDemoType !== "none";
            const isSandboxOpen = activeSandboxId === proj.id;

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="fluid-glass rounded-3xl p-6 sm:p-9 lg:p-11 relative overflow-hidden border border-white/[0.1] hover:border-cyan-400/40 transition-all duration-500 group shadow-2xl"
              >
                {/* Background Ambient Gradient Flare */}
                <div
                  className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${proj.gradient} rounded-full blur-[140px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Left Column: Product Information & Architectural Breakdown */}
                  <div className="max-w-2xl space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                        {proj.category}
                      </span>
                      {hasSandbox && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE SANDBOX
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-sm sm:text-base text-cyan-200 font-medium">
                      {proj.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      {proj.description}
                    </p>

                    {/* Key Technical Highlights */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Core Architectural Invariants:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {proj.keyFeatures.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack Tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-3">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Actions & Live Sandbox Trigger */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-56">
                    {hasSandbox && (
                      <button
                        onClick={() => handleOpenSandbox(proj.id)}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                          isSandboxOpen
                            ? "bg-cyan-500 text-black shadow-cyan-500/30"
                            : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isSandboxOpen ? "Close Live Sandbox" : "Launch Live Sandbox"}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenCaseStudy(proj)}
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Deep Case Study</span>
                    </button>

                    <div className="flex items-center gap-2 w-full pt-1">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-lg bg-ocean-deep hover:bg-slate-900 border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>GitHub</span>
                      </a>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-lg bg-ocean-deep hover:bg-slate-900 border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline Expandable Live Sandbox Drawer */}
                <AnimatePresence>
                  {isSandboxOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-8 pt-8 border-t border-white/[0.1] overflow-hidden"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                          <span className="text-xs font-mono font-bold text-cyan-300">
                            LIVE CLIENT SANDBOX // {proj.title.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          Fully interactive in-browser simulation
                        </span>
                      </div>

                      {proj.interactiveDemoType === "eduobal" && <EduobalInteractiveDemo />}
                      {proj.interactiveDemoType === "sysflow" && <SysflowInteractiveDemo />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedCaseStudy && (
        <ProjectCaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
}
