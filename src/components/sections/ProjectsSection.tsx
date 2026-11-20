"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle2, Layers, ArrowUpRight } from "lucide-react";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { usePortfolioData } from "@/lib/portfolio-data";
import { ProjectItem } from "@/data/default-portfolio";

export default function ProjectsSection() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string | null>(null);

  const getBadgeColor = (p: ProjectItem) => {
    if (p.badgeColor) return p.badgeColor;
    switch (p.category) {
      case "rust":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "nextjs":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "devops":
        return "text-sky-400 bg-sky-400/10 border-sky-400/20";
      case "spatial":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default:
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    }
  };

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const handleCopyCmd = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-6">
        <div>
          <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider mb-2">
            03 / SELECTED WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Production Engineering Dossier
          </h2>
          <p className="text-base text-slate-400 font-normal mt-2 max-w-xl">
            Systems designed for scalability, low latency, and zero-downtime operations. Click any project to inspect its architecture blueprint and technical trade-offs.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.08] gap-1 text-xs">
          {[
            { label: "All Work", value: "all" },
            { label: "Rust Systems", value: "rust" },
            { label: "Next.js / Web", value: "nextjs" },
            { label: "DevOps & Cloud", value: "devops" },
            { label: "3D & WASM", value: "spatial" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                selectedFilter === f.value
                  ? "bg-white/10 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isCopied = copiedId === project.id;
          return (
            <div
              key={project.id}
              className="card-clean p-7 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(project)}`}>
                    {project.badge}
                  </span>
                  
                  {/* View Blueprint Button */}
                  <button
                    onClick={() => setActiveBlueprintId(project.id)}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Architecture Blueprint</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5 mb-4">
                  {project.subtitle}
                </p>

                <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Technical Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-6">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-left">
                      <div className="text-[11px] text-slate-400 font-medium">
                        {m.label}
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs bg-white/[0.03] border border-white/[0.06] text-slate-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Terminal Snippet */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/[0.06] text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300 truncate text-[11px]">
                      {project.terminalCmd}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCmd(project.id, project.terminalCmd)}
                    title="Copy command"
                    className="ml-2 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-[10px] flex items-center gap-1 flex-shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Deep-Dive Blueprint Modal */}
      <ArchitectureModal
        blueprintId={activeBlueprintId}
        onClose={() => setActiveBlueprintId(null)}
      />
    </section>
  );
}
