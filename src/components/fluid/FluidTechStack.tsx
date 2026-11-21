"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  Database,
  Box,
  Palette,
  Search,
  CheckCircle2,
  Share2,
  Sparkles
} from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT, TechNode } from "@/data/portfolio-content";

export default function FluidTechStack() {
  const { techStack } = PORTFOLIO_CONTENT;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTech, setActiveTech] = useState<TechNode>(techStack[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Frontend", "Backend", "Database", "Design", "Infrastructure"];

  const filteredTech = useMemo(() => {
    return techStack.filter((t) => {
      const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [techStack, selectedCategory, searchQuery]);

  const handleSelectTech = (tech: TechNode) => {
    sound.playTick();
    setActiveTech(tech);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Frontend":
        return Layers;
      case "Backend":
        return Cpu;
      case "Database":
        return Database;
      case "Design":
        return Palette;
      case "Infrastructure":
        return Box;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="stack" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-abyss">
      {/* Background Liquid Atmosphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35rem] h-[35rem] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-cyan-300 mb-4">
              <span>02 // INTERACTIVE TECHNOLOGY CONSTELLATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Production Tech Ecosystem
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light">
              An organic, interconnected network of runtimes, languages, and distributed systems. Hover or select any node to inspect production application patterns and connected infrastructure.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack or runtime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-ocean-deep/90 border border-white/[0.1] focus:border-cyan-400 text-xs text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Pill Filters with Liquid Hover */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const Icon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playTick();
                  setSelectedCategory(cat);
                }}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.07]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Constellation Grid & Inspector Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Constellation Nodes Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {filteredTech.map((tech) => {
              const isSelected = activeTech.name === tech.name;
              const isConnected = activeTech.connectedTo.includes(tech.name);

              return (
                <motion.div
                  key={tech.name}
                  layout
                  onClick={() => handleSelectTech(tech)}
                  onMouseEnter={() => {
                    sound.playTick();
                    setActiveTech(tech);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? "bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.03] ring-1 ring-cyan-400/50"
                      : isConnected
                      ? "bg-ocean-deep/90 border-blue-400/60 shadow-lg shadow-blue-500/15"
                      : "bg-ocean-deep/60 hover:bg-ocean-deep border-white/[0.07] hover:border-white/[0.2]"
                  }`}
                >
                  {/* Glowing Connection Dot */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      {tech.category}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-all ${
                        isSelected
                          ? "bg-cyan-400 animate-ping"
                          : isConnected
                          ? "bg-blue-400 animate-pulse"
                          : "bg-slate-700"
                      }`}
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {tech.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {tech.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Node Detail Inspector Drawer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 fluid-glass p-7 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Top Liquid Flare */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {activeTech.category}{" // "}ARCHITECTURAL ROLE
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                    {activeTech.name}
                  </h3>
                </div>

                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Share2 className="w-5 h-5" />
                </div>
              </div>

              {/* Role & Description */}
              <div className="space-y-4 mb-6">
                <div>
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Production Role
                  </h5>
                  <p className="text-sm font-medium text-cyan-200">
                    {activeTech.role}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Architectural Invariant & Usage
                  </h5>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {activeTech.description}
                  </p>
                </div>
              </div>

              {/* Connected Technologies Nodes */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <div>
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Connected System Dependencies</span>
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeTech.connectedTo.map((conn) => (
                      <span
                        key={conn}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-200"
                      >
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Built Using This Tech */}
                <div>
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Deployed In Projects
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeTech.projectsUsedIn.map((proj) => (
                      <span
                        key={proj}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/50 border border-blue-500/30 text-blue-200 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{proj}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
