"use client";

import React, { useState, useMemo } from "react";
import { Technology, Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import {
  Layers,
  Server,
  Database,
  Box,
  Palette,
  Search,
  ExternalLink,
  Cpu,
  Share2,
  Atom,
  Globe,
  FileCode,
  Flame,
  Zap,
  Code2,
  Boxes,
  GitBranch,
  Layout,
  Component,
  Network
} from "lucide-react";

interface ConstellationProps {
  technologies: Technology[];
  projects: Project[];
}

export default function TechnologyConstellation({
  technologies,
  projects,
}: ConstellationProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("nextjs");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Frontend", "Backend", "Database", "Infrastructure", "Design"];

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((t) => {
      const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.how_i_use_it.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [technologies, selectedCategory, searchQuery]);

  const selectedTech = useMemo(() => {
    return technologies.find((t) => t.slug === selectedSlug) || technologies[0];
  }, [technologies, selectedSlug]);

  const relatedProjects = useMemo(() => {
    if (!selectedTech) return [];
    return projects.filter((p) =>
      p.technologies?.some(
        (techName) =>
          techName.toLowerCase().includes(selectedTech.name.toLowerCase()) ||
          selectedTech.name.toLowerCase().includes(techName.toLowerCase())
      )
    );
  }, [projects, selectedTech]);

  const getTechIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "react":
        return Atom;
      case "next.js":
        return Globe;
      case "typescript":
        return FileCode;
      case "tailwind css":
        return Palette;
      case "node.js":
        return Server;
      case "express":
        return Cpu;
      case "rust":
        return Flame;
      case "rest apis":
        return Network;
      case "postgresql":
        return Database;
      case "supabase":
        return Zap;
      case "redis":
        return Layers;
      case "prisma":
        return Code2;
      case "docker":
        return Box;
      case "kubernetes":
        return Boxes;
      case "github actions":
        return GitBranch;
      case "figma":
        return Palette;
      case "ui/ux design":
        return Layout;
      case "design systems":
        return Component;
      default:
        return Cpu;
    }
  };

  const handleSelectTech = (slug: string) => {
    sound.playTick();
    setSelectedSlug(slug);
  };

  const IconComponent = selectedTech ? getTechIcon(selectedTech.name) : Cpu;

  return (
    <section id="ecosystem" className="py-24 border-t border-white/[0.08] relative bg-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-sky-400 mb-3">
              <span>03 // INTERACTIVE TECHNOLOGY CONSTELLATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Technology Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              An interconnected matrix of tools, runtimes, and databases I engineer with. Select any node to inspect production application patterns and associated systems.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0E1017] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playTick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Constellation Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Node Constellation Visual (Left 7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-xs font-mono text-slate-400">
              <span>CONSTELLATION NODES ({filteredTechnologies.length})</span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Share2 className="w-3.5 h-3.5" />
                <span>INTERACTIVE GRAPH</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredTechnologies.map((tech) => {
                const isSelected = selectedSlug === tech.slug;
                const isRelated = selectedTech?.related_tech?.includes(tech.name);
                const NodeIcon = getTechIcon(tech.name);

                return (
                  <button
                    key={tech.slug}
                    onClick={() => handleSelectTech(tech.slug)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative group ${
                      isSelected
                        ? "bg-[#181D2E] border-indigo-500/70 shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-500/40"
                        : isRelated
                        ? "bg-[#11141F] border-sky-500/40"
                        : "bg-black/30 hover:bg-white/[0.04] border-white/[0.06] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected
                            ? "bg-indigo-500/20 text-indigo-300"
                            : isRelated
                            ? "bg-sky-500/20 text-sky-300"
                            : "bg-white/[0.05] text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {tech.category}
                      </span>
                    </div>

                    <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-white truncate">
                      {tech.name}
                    </div>

                    {isRelated && !isSelected && (
                      <span className="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        CONNECTED
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Detail Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0F121C] border border-white/[0.1] shadow-2xl relative">
            {selectedTech ? (
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {selectedTech.name}
                      </h3>
                      <span className="text-xs font-mono text-indigo-300 uppercase">
                        CATEGORY: {selectedTech.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Production Application Rationale */}
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    HOW I USE IT IN PRODUCTION:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-black/40 border border-white/[0.05]">
                    {selectedTech.how_i_use_it}
                  </p>
                </div>

                {/* Related Technologies In Ecosystem */}
                {selectedTech.related_tech && selectedTech.related_tech.length > 0 && (
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                      CONNECTED ECOSYSTEM NODES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTech.related_tech.map((relName, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const found = technologies.find(
                              (t) => t.name.toLowerCase() === relName.toLowerCase()
                            );
                            if (found) handleSelectTech(found.slug);
                          }}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-sky-300 hover:text-sky-200 transition-colors"
                        >
                          {relName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Associated Projects in Lab */}
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                    RELEVANT LAB PROJECTS:
                  </div>
                  {relatedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {relatedProjects.map((p) => (
                        <a
                          key={p.slug}
                          href="#projects"
                          onClick={() => sound.playTick()}
                          className="block p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] transition-colors"
                        >
                          <div className="font-semibold text-xs text-white flex items-center justify-between">
                            <span>{p.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {p.tagline}
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      Used across full-stack core architectural infrastructure.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-center py-12">
                Select a technology node to inspect details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
