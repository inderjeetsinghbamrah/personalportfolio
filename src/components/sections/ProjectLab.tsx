"use client";

import React, { useState, useMemo } from "react";
import { Project, ProjectCategory } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import ProjectCaseStudyModal from "@/components/projects/ProjectCaseStudyModal";
import { Search, LayoutGrid, List, Sparkles, ArrowRight } from "lucide-react";
import SectorGate from "@/components/character/SectorGate";

interface ProjectLabProps {
  projects: Project[];
  categories: ProjectCategory[];
}

export default function ProjectLab({ projects, categories }: ProjectLabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categoryList = useMemo(() => {
    return ["All", ...categories.map((c) => c.name)];
  }, [categories]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category_name === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const featuredProject = useMemo(() => {
    return projects.find((p) => p.is_featured && p.slug === "eduobal") || projects[0];
  }, [projects]);

  const handleOpenProject = (project: Project) => {
    sound.playTick();
    setActiveProject(project);
  };

  return (
    <section id="projects" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sector Gate 04: Project Vault */}
        <SectorGate
          sectorId="projects"
          actionButton={
            featuredProject
              ? {
                  label: "Launch EDUOBAL Sandbox",
                  onClick: () => setActiveProject(featuredProject),
                }
              : undefined
          }
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 // PROJECT LAB & PRODUCT CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Production Systems & Experiments
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Every project is an engineered product featuring interactive sandboxes, architectural decompositions, database schemas, and honest technical trade-offs.
            </p>
          </div>

          {/* Search & Layout Toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#0E1017] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center bg-[#0E1017] p-1 rounded-lg border border-white/[0.08]">
              <button
                onClick={() => {
                  sound.playTick();
                  setViewMode("grid");
                }}
                className={`p-1.5 rounded ${
                  viewMode === "grid" ? "bg-white/[0.1] text-white" : "text-slate-500 hover:text-slate-300"
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sound.playTick();
                  setViewMode("list");
                }}
                className={`p-1.5 rounded ${
                  viewMode === "list" ? "bg-white/[0.1] text-white" : "text-slate-500 hover:text-slate-300"
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Project Spotlight: EDUOBAL */}
        {featuredProject && (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121624] via-[#0E1119] to-[#0A0C12] border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    FEATURED ARCHITECTURAL CONCEPT
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    LIVE SANDBOX READY
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {featuredProject.overview}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {featuredProject.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  onClick={() => handleOpenProject(featuredProject)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
                >
                  <span>Launch Interactive Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playTick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Explorer Layout */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                onClick={() => handleOpenProject(project)}
                className="group p-6 sm:p-7 rounded-2xl bg-[#0E1017] hover:bg-[#131722] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.05] text-indigo-400 border border-white/[0.08]">
                      {project.category_name}
                    </span>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                      <span>INSPECT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.interactive_demo_type && (
                    <span className="text-[11px] font-mono text-emerald-400">
                      ● LIVE DEMO
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Presentation */
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                onClick={() => handleOpenProject(project)}
                className="py-5 px-4 rounded-xl hover:bg-white/[0.03] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-indigo-400">
                      {project.category_name}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {project.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex gap-1.5">
                    {project.technologies?.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
