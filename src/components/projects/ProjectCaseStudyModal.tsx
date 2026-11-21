"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import EduobalInteractiveDemo from "./EduobalInteractiveDemo";
import SysflowInteractiveDemo from "./SysflowInteractiveDemo";
import { X, CheckCircle2, AlertCircle, Database, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface CaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: CaseStudyProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "architecture" | "database" | "challenges">("demo");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#090B10] border border-white/[0.12] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#0E1118] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.category_name}
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              CASE STUDY // {project.slug.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Project Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>

            {/* Quick Links & Technologies */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-slate-200 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
            {[
              { id: "demo", label: "Interactive Demo" },
              { id: "architecture", label: "System Architecture" },
              { id: "database", label: "Database Schema" },
              { id: "challenges", label: "Engineering Decisions" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? "text-indigo-400 border-b-2 border-indigo-500 bg-white/[0.03]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Interactive Functional Demo */}
          {activeTab === "demo" && (
            <div className="space-y-6">
              {project.interactive_demo_type === "eduobal" ? (
                <EduobalInteractiveDemo />
              ) : project.interactive_demo_type === "sysflow" ? (
                <SysflowInteractiveDemo />
              ) : (
                <div className="p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] text-center space-y-3">
                  <Cpu className="w-8 h-8 text-indigo-400 mx-auto" />
                  <h4 className="text-lg font-semibold text-white">Production Architectural Case Study</h4>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    {project.overview}
                  </p>
                </div>
              )}

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-xl bg-[#0F121C] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>THE PROBLEM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problem_statement}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0F121C] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>THE ARCHITECTURAL SOLUTION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: System Architecture Breakdown */}
          {activeTab === "architecture" && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-[#0E1017] border border-white/[0.08]">
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-3">
                  TOPOLOGY & SUBSYSTEM DECOMPOSITION
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(project.architecture_diagram || {}).map(([key, value]) => (
                    <div key={key} className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase text-sky-400 tracking-wider">
                        {key}
                      </span>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Database Design & Schema */}
          {activeTab === "database" && (
            <div className="p-5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-4">
              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>RELATIONAL SCHEMA SPECIFICATION (POSTGRESQL 17)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.database_design?.tables?.map((table, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-xs text-indigo-300"
                  >
                    <span className="text-slate-500">TABLE 0{i + 1}: </span>
                    <span className="text-slate-200">{table}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Engineering Challenges & Key Decisions */}
          {activeTab === "challenges" && (
            <div className="space-y-6">
              {/* Engineering Challenges */}
              <div>
                <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Key Engineering Challenges Solved
                </h4>
                <div className="space-y-3">
                  {project.engineering_challenges?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08]"
                    >
                      <div className="font-semibold text-xs sm:text-sm text-white mb-1">
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Decisions */}
              <div>
                <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Trade-Offs & Rationale
                </h4>
                <div className="space-y-3">
                  {project.key_decisions?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] flex items-start gap-3"
                    >
                      <span className="font-mono text-xs text-indigo-400 font-bold shrink-0 mt-0.5">
                        DECISION 0{idx + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-white">
                          {item.decision}
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
