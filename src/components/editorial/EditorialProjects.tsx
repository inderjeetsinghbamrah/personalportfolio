"use client";

import React, { useState } from "react";
import { ArrowUpRight, Play, Check, ChevronDown, ChevronUp } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import EduobalInteractiveDemo from "@/components/projects/EduobalInteractiveDemo";
import SysflowInteractiveDemo from "@/components/projects/SysflowInteractiveDemo";

export default function EditorialProjects() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const toggleDemo = (projectId: string) => {
    setActiveDemo((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              {"// Selected Works"}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Production Systems & Architectures.
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-light">
            Engineered from ground up with explicit architectural trade-offs, rigorous data schemas, and interactive user interfaces.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {PORTFOLIO_CONTENT.projects.map((project, index) => {
            const hasDemo = project.interactiveDemoType && project.interactiveDemoType !== "none";
            const isDemoOpen = activeDemo === project.id;

            return (
              <div
                key={project.id}
                className="editorial-card rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300"
              >
                {/* Project Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b hairline-border">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full border hairline-border bg-cyan-500/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Actions & Links */}
                  <div className="flex flex-wrap items-center gap-3">
                    {hasDemo && (
                      <button
                        onClick={() => toggleDemo(project.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                          isDemoOpen
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                            : "bg-white/[0.04] text-slate-300 border-white/[0.1] hover:text-cyan-400 hover:border-cyan-400/30"
                        }`}
                      >
                        <Play className="w-3 h-3 text-cyan-400" />
                        <span>{isDemoOpen ? "Close Interactive Demo" : "Launch Interactive Demo"}</span>
                        {isDemoOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border hairline-border text-slate-300 hover:text-foreground transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl border hairline-border bg-black/10">
                        <div className="text-[11px] font-mono text-amber-400 uppercase mb-1">
                          The Challenge
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          {project.problem}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border hairline-border bg-black/10">
                        <div className="text-[11px] font-mono text-cyan-400 uppercase mb-1">
                          The Architecture
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Architecture & Stack Tags */}
                  <div className="lg:col-span-4 flex flex-col gap-5 pt-2">
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Key Invariants
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                        {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Technologies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md border hairline-border bg-white/[0.03] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* In-line Interactive Sandbox Drawer */}
                {isDemoOpen && (
                  <div className="pt-6 border-t hairline-border animate-in fade-in duration-300">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                        </span>
                        <span className="text-xs font-mono text-cyan-400 uppercase">
                          Live Interactive Sandbox Execution
                        </span>
                      </div>
                      <button
                        onClick={() => toggleDemo(project.id)}
                        className="text-xs text-slate-400 hover:text-foreground font-mono"
                      >
                        [Hide Demo]
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border hairline-border bg-black/40 p-2 sm:p-4">
                      {project.interactiveDemoType === "eduobal" && <EduobalInteractiveDemo />}
                      {project.interactiveDemoType === "sysflow" && <SysflowInteractiveDemo />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
