"use client";

import React, { useState } from "react";
import { Experience, Education } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";

interface TimelineProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceTimeline({
  experience,
  education,
}: TimelineProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  const handleTabChange = (tab: "experience" | "education") => {
    sound.playTick();
    setActiveTab(tab);
  };

  return (
    <section id="timeline" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-sky-400 mb-3">
              <span>08 // CHRONOLOGICAL TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Experience & Education
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Academic pedigree and professional engineering trajectory bridging higher education instruction with production software architecture.
            </p>
          </div>

          {/* Switcher Buttons */}
          <div className="flex items-center bg-[#0E1017] p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => handleTabChange("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </button>
            <button
              onClick={() => handleTabChange("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === "education"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Experience */}
        {activeTab === "experience" && (
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-10">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-[#08090C] ${
                    exp.is_current ? "bg-emerald-400 ring-4 ring-emerald-400/20" : "bg-indigo-500"
                  }`}
                />

                <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{exp.period}</span>
                      {exp.is_current && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          CURRENT
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-sky-400 font-medium">
                    {exp.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Responsibilities list */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack tags */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.04]">
                      {exp.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education */}
        {activeTab === "education" && (
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-10">
            {education.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-[#08090C] bg-sky-400" />

                <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-indigo-400 font-medium">
                    {edu.field} &bull; {edu.institution}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {edu.details}
                  </p>

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {edu.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-400 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
