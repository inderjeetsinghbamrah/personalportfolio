"use client";

import React, { useState, useRef } from "react";
import {
  Terminal,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Zap,
  Compass,
  Radio,
} from "lucide-react";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { usePortfolioData } from "@/lib/portfolio-data";
import { ProjectItem } from "@/data/default-portfolio";
import { sound } from "@/lib/sound";

interface TopologyMeta {
  stageIndex: number;
  name: string;
  subtitle: string;
  engine: string;
  nodes: string;
  latency: string;
  color: string;
  colorBorder: string;
}

const TOPOLOGIES: Record<string, TopologyMeta> = {
  "aether-kv": {
    stageIndex: 2,
    name: "03 // RAFT CONSENSUS CLUSTER",
    subtitle: "Linearizable Storage & io_uring",
    engine: "Tokio Async Actors",
    nodes: "3 Quorum Nodes",
    latency: "P99 0.85ms",
    color: "text-amber-400",
    colorBorder: "border-amber-500/30",
  },
  hyperion: {
    stageIndex: 1,
    name: "02 // 3-TIER SYSTEMS RUNTIME",
    subtitle: "React 19 RSC & Streaming Edge",
    engine: "HTTP/3 Edge Worker",
    nodes: "32 Global PoPs",
    latency: "SSR 12ms",
    color: "text-emerald-400",
    colorBorder: "border-emerald-500/30",
  },
  vectormesh: {
    stageIndex: 3,
    name: "04 // GLOBAL ANYCAST MESH",
    subtitle: "Multi-Region Planetary Routing",
    engine: "HNSW Vector Topology",
    nodes: "8 Sharded Replicas",
    latency: "Query 1.8ms",
    color: "text-sky-400",
    colorBorder: "border-sky-500/30",
  },
  "photon-canvas": {
    stageIndex: 4,
    name: "05 // BARE-METAL KERNEL ENGINE",
    subtitle: "Axial Spatial Turbine & WASM",
    engine: "io_uring & Offscreen Worker",
    nodes: "Single-Threaded 60 FPS",
    latency: "Zero Jank",
    color: "text-purple-400",
    colorBorder: "border-purple-500/30",
  },
};

export default function ProjectsSection() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeProjectId, setActiveProjectId] = useState<string>("aether-kv");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string | null>(null);

  // Touch & Pointer drag rotation state
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeTopology = TOPOLOGIES[activeProjectId] || TOPOLOGIES["aether-kv"];

  const activateProject = (projectId: string) => {
    setActiveProjectId(projectId);
    sound.playClick();
    const meta = TOPOLOGIES[projectId];
    if (meta) {
      window.dispatchEvent(
        new CustomEvent("set-architecture-stage", {
          detail: { stageIndex: meta.stageIndex },
        })
      );
    }
  };

  const triggerPulse = () => {
    sound.playClick();
    window.dispatchEvent(new CustomEvent("trigger-core-pulse"));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerPos.current.x;
    const dy = e.clientY - lastPointerPos.current.y;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    window.dispatchEvent(
      new CustomEvent("drag-3d-model", { detail: { dx, dy } })
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

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
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Section Header with frosted contrast shield */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0a0d14]/85 backdrop-blur-xl border border-white/[0.08] mb-12 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-semibold tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>03 // SELECTED WORK &amp; SYSTEM TOPOLOGIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Production Engineering Dossier
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal mt-2 leading-relaxed">
            Systems designed for scalability, low latency, and zero-downtime operations. Select any project to inspect its architecture blueprint and synchronize the interactive 3D digital twin.
          </p>
        </div>

        {/* Filter buttons with dark frosted shield */}
        <div className="flex flex-wrap items-center bg-[#07090f]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/[0.1] gap-1 text-xs shadow-inner">
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
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                selectedFilter === f.value
                  ? "bg-white/15 text-white font-semibold shadow-sm border border-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE ONLY: Interactive 3D System Inspector Portal */}
      <div className="lg:hidden mb-8 rounded-2xl bg-[#090c13]/90 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">
              3D SPATIAL TOPOLOGY
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            {activeTopology.latency}
          </span>
        </div>

        {/* Topology selection pills for mobile */}
        <div className="grid grid-cols-2 gap-2">
          {projects.map((p) => {
            const isCurrent = p.id === activeProjectId;
            return (
              <button
                key={p.id}
                onClick={() => activateProject(p.id)}
                className={`px-2.5 py-2 rounded-xl text-left transition-all border ${
                  isCurrent
                    ? "bg-emerald-500/15 border-emerald-500/40 text-white shadow-sm"
                    : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-[11px] font-bold truncate">{p.title}</div>
                <div className="text-[9px] text-slate-400 truncate">{TOPOLOGIES[p.id]?.engine || "Active Topology"}</div>
              </button>
            );
          })}
        </div>

        {/* Drag rotation pad for mobile */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-28 rounded-xl bg-gradient-to-b from-white/[0.02] to-white/[0.04] border border-white/[0.08] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-[11px] font-mono text-slate-300 font-medium">
            Touch &amp; Drag to Rotate 3D Core
          </span>
          <span className="text-[9px] text-slate-500 mt-0.5">
            Active: {activeTopology.name}
          </span>
        </div>
      </div>

      {/* Main Split-Stage Grid Layout (7 Cols Dossier / 5 Cols 3D Stage) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Engineering Dossier (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {filteredProjects.map((project) => {
            const isCopied = copiedId === project.id;
            const isActive = project.id === activeProjectId;
            const meta = TOPOLOGIES[project.id];

            return (
              <div
                key={project.id}
                onClick={() => activateProject(project.id)}
                className={`card-clean p-7 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all ${
                  isActive
                    ? "ring-2 ring-emerald-500/40 border-emerald-500/40 bg-[#0d121c]/95 shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                    : "hover:border-white/20"
                }`}
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(
                          project
                        )}`}
                      >
                        {project.badge}
                      </span>
                      {isActive && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                          <Radio className="w-2.5 h-2.5 animate-pulse" />
                          <span>3D SYNCED</span>
                        </span>
                      )}
                    </div>

                    {/* View Blueprint Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveBlueprintId(project.id);
                      }}
                      className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Architecture Blueprint</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight flex items-center justify-between">
                    <span>{project.title}</span>
                    <span className="text-xs font-mono font-normal text-slate-400 opacity-60">
                      {meta?.nodes}
                    </span>
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
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/75 border border-white/[0.08] text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300 truncate text-[11px]">
                        {project.terminalCmd}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCmd(project.id, project.terminalCmd);
                      }}
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

        {/* Right Column: Sticky 3D System Architecture Stage (5 Cols Desktop) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-24 space-y-4">
          <div className="rounded-3xl bg-[#090c13]/90 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl space-y-5">
            {/* Stage Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  3D Systems Architecture Stage
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                60 FPS WebGL
              </span>
            </div>

            {/* Active Topology Readout Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">ACTIVE TWIN</span>
                <span className={`font-semibold ${activeTopology.color}`}>
                  {activeTopology.latency}
                </span>
              </div>
              <div className="text-base font-bold text-white tracking-tight">
                {activeTopology.name}
              </div>
              <div className="text-xs text-slate-400">
                {activeTopology.subtitle}
              </div>
              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{activeTopology.engine}</span>
                <span className="text-emerald-400">{activeTopology.nodes}</span>
              </div>
            </div>

            {/* Direct Project Stage Selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Synchronize Architecture Model:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {projects.map((p) => {
                  const isCurrent = p.id === activeProjectId;
                  const meta = TOPOLOGIES[p.id];
                  return (
                    <button
                      key={p.id}
                      onClick={() => activateProject(p.id)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        isCurrent
                          ? "bg-emerald-500/15 border-emerald-500/40 text-white shadow-md"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{p.title}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {meta?.engine || "Topology"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Gyroscopic 3D Rotation Pad */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Click and drag to spin 3D architecture model"
              className="relative h-44 rounded-2xl bg-gradient-to-b from-white/[0.02] to-white/[0.05] border border-white/[0.08] hover:border-emerald-500/30 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none group transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5 group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-xs font-mono text-white font-semibold tracking-wide">
                Interactive 3D Stage
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Click &amp; drag anywhere to rotate 360°
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={triggerPulse}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-medium transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resonance Pulse</span>
              </button>

              <button
                onClick={() => setActiveBlueprintId(activeProjectId)}
                className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-medium transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Blueprint Specs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Deep-Dive Blueprint Modal */}
      <ArchitectureModal
        blueprintId={activeBlueprintId}
        onClose={() => setActiveBlueprintId(null)}
      />
    </section>
  );
}