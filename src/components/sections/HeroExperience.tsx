"use client";

import React, { useState } from "react";
import { ArrowRight, FileText, Send, Activity, Layers, Server, Database, Box, Cpu, RefreshCw, GraduationCap, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";
import dynamic from "next/dynamic";

// Dynamically import 3D Character Hero Stage for client WebGL
const HeroCharacterStage = dynamic(
  () => import("@/components/character/HeroCharacterStage"),
  { ssr: false }
);

interface HeroProps {
  name: string;
  professionalIdentity: string;
  headline: string;
  subheadline: string;
  availabilityStatus: string;
  onOpenResume: () => void;
  onViewProjects: () => void;
}

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tech: string;
  latency: string;
  protocol: string;
  status: "healthy" | "active" | "cached";
  description: string;
  details: string[];
}

export default function HeroExperience({
  name,
  professionalIdentity,
  headline,
  subheadline,
  availabilityStatus,
  onOpenResume,
  onViewProjects,
}: HeroProps) {
  const [selectedNode, setSelectedNode] = useState<string>("api");
  const [simMode, setSimMode] = useState<"normal" | "spike" | "cache_miss" | "failover">("normal");

  const nodes: ArchNode[] = [
    {
      id: "frontend",
      title: "Client & Edge Tier",
      subtitle: "React 18 / Next.js RSC",
      icon: Layers,
      tech: "Next.js 14 App Router",
      latency: simMode === "spike" ? "18ms" : "8ms",
      protocol: "HTTP/3 / QUIC",
      status: "active",
      description: "Hydrated island components combined with zero-bundle React Server Components. Streaming SSR delivers progressive HTML shells in under 20ms.",
      details: [
        "Edge Middleware session validation & routing",
        "Sub-second First Contentful Paint (FCP)",
        "Progressive chunked streaming via Suspense",
      ],
    },
    {
      id: "api",
      title: "API & Gateway Layer",
      subtitle: "Edge & Server Actions",
      icon: Cpu,
      tech: "TypeScript / Node.js",
      latency: simMode === "spike" ? "42ms" : "12ms",
      protocol: "gRPC & REST / JSON",
      status: "healthy",
      description: "Type-safe RPC boundary executing Server Actions with zero API boilerplate. Performs input sanitization, rate-limit enforcement, and schema validation.",
      details: [
        "Zod runtime payload contract validation",
        "Sliding-window token rate limiting",
        "Stateless idempotent request handlers",
      ],
    },
    {
      id: "cache",
      title: "Distributed Cache",
      subtitle: "Redis In-Memory",
      icon: Server,
      tech: "Upstash Redis Cluster",
      latency: simMode === "cache_miss" ? "MISS" : "1.2ms",
      protocol: "RESP3 Protocol",
      status: simMode === "cache_miss" ? "cached" : "active",
      description: "High-throughput in-memory caching tier shielding relational databases from redundant read queries. Implements stale-while-revalidate invalidation.",
      details: [
        "Sub-2ms average key lookup latency",
        "Distributed lock coordination for workers",
        "Sliding window API rate limit counters",
      ],
    },
    {
      id: "database",
      title: "Primary Relational DB",
      subtitle: "Supabase PostgreSQL 17",
      icon: Database,
      tech: "PostgreSQL 17 + RLS",
      latency: simMode === "cache_miss" ? "24ms" : "4ms",
      protocol: "PostgreSQL Wire 3.0",
      status: simMode === "failover" ? "active" : "healthy",
      description: "ACID compliant relational core with kernel-level Row Level Security (RLS) guaranteeing strict multi-tenant boundary isolation without application bugs.",
      details: [
        "Supavisor connection pooling for thousands of clients",
        "WAL logical replication streaming to realtime clients",
        "Composite btree and gin indexes on hot path queries",
      ],
    },
    {
      id: "infra",
      title: "Cloud Infrastructure",
      subtitle: "Docker & Kubernetes",
      icon: Box,
      tech: "Docker / K8s / Vercel",
      latency: "<1ms internal",
      protocol: "Container Network Interface",
      status: "healthy",
      description: "Production containerization with multi-stage non-root images, automated GitHub Actions CI/CD test gates, and declarative zero-downtime rolling deploys.",
      details: [
        "Distroless container runtime security profile",
        "Horizontal Pod Autoscaling (HPA) triggered at 70% CPU",
        "Continuous deployment via GitHub Actions",
      ],
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[1];

  const handleSelectNode = (id: string) => {
    sound.playTick();
    setSelectedNode(id);
  };

  const handleSimChange = (mode: "normal" | "spike" | "cache_miss" | "failover") => {
    sound.playTick();
    setSimMode(mode);
  };

  return (
    <section id="lab" className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden bg-grid">
      {/* Subtle radial ambient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/[0.08] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-sky-500/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 2-Column Desktop Grid: Storytelling & Action Left / 3D Developer Stage Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Identity Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>{name.toUpperCase()}{" // "}{professionalIdentity.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-emerald-400">STATUS:</span>
                <span>{availabilityStatus}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              {headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-100">
                Building What&apos;s Next.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {subheadline}
            </p>

            {/* Action CTAs (Clean, uncluttered, focused) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playTick();
                  onViewProjects();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
              >
                <span>Explore Project Lab</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="#contact"
                onClick={() => sound.playTick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-slate-200 hover:text-white font-medium text-sm transition-all"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>Let&apos;s Connect</span>
              </a>

              <button
                onClick={() => {
                  sound.playTick();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Engineering Credential Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-400" />
                M.Tech in CS/IT
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Lecturer in Information Technology
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                PostgreSQL 17 + Supabase
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                Docker + Kubernetes
              </span>
            </div>
          </div>

          {/* Right Column: 3D Developer Stage (Clean, no floating popups) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroCharacterStage />
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE ARCHITECTURAL CANVAS: DIGITAL ENGINEERING WORKSPACE
            ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>INTERACTIVE DIGITAL ENGINEERING WORKSPACE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Live System Architecture Topology
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Click any component below to inspect communication protocols, latency profile, and architectural design invariants.
              </p>
            </div>

            {/* Simulation controls */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0E1017] p-1.5 rounded-lg border border-white/[0.08]">
              <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-indigo-400" />
                <span>SIMULATE:</span>
              </span>
              <button
                onClick={() => handleSimChange("normal")}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-all ${
                  simMode === "normal"
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                Normal (200 RPS)
              </button>
              <button
                onClick={() => handleSimChange("spike")}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-all ${
                  simMode === "spike"
                    ? "bg-amber-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                10k RPS Spike
              </button>
              <button
                onClick={() => handleSimChange("cache_miss")}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-all ${
                  simMode === "cache_miss"
                    ? "bg-sky-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                Cache Invalidation
              </button>
            </div>
          </div>

          {/* Interactive Topological Nodes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                    isSelected
                      ? "bg-[#141824] border-indigo-500/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                      : "bg-[#0E1017]/80 hover:bg-[#121520] border-white/[0.08] hover:border-white/[0.18]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-white/[0.05] text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="font-semibold text-xs sm:text-sm text-slate-100 truncate">
                    {node.title}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                    {node.tech}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">LATENCY</span>
                    <span
                      className={`font-medium ${
                        node.latency === "MISS"
                          ? "text-amber-400"
                          : simMode === "spike"
                          ? "text-sky-300"
                          : "text-emerald-400"
                      }`}
                    >
                      {node.latency}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Contextual Architecture Inspector Panel */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F16] border border-white/[0.1] relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column: Component Specs */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-indigo-400 uppercase tracking-wider">
                    INSPECTING COMPONENT //
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {currentNode.protocol}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {currentNode.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentNode.description}
                </p>
              </div>

              {/* Middle Column: Architecture Invariants */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  ENGINEERING INVARIANTS:
                </div>
                <ul className="space-y-2">
                  {currentNode.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Live Telemetry & Simulation Readout */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">TELEMETRY RUNTIME</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">SIMULATION MODE:</span>
                  <span className="text-indigo-300 font-semibold uppercase">{simMode}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">TRANSPORT:</span>
                  <span className="text-slate-200">{currentNode.protocol}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">ESTIMATED P99:</span>
                  <span className="text-emerald-400 font-semibold">{currentNode.latency}</span>
                </div>
                <div className="pt-2 text-[11px] text-slate-400 border-t border-white/[0.04]">
                  Ready for production scaling with zero regression.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
