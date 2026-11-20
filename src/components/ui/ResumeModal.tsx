"use client";

import React, { useEffect } from "react";
import { X, Printer, Globe, Mail } from "lucide-react";
import { usePortfolioData } from "@/lib/portfolio-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { data } = usePortfolioData();
  const { profile, resume, projects } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0c0e14] border border-white/15 p-6 sm:p-10 shadow-2xl text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 print:hidden">
          <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
            ATS-COMPLIANT TECHNICAL RESUME DOSSIER
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="space-y-6 text-slate-200 print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black/20">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-base text-emerald-400 font-medium mt-1">
              {profile.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.email}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Timezone: {profile.timezoneOverlap}</span>
              </span>
              <span>•</span>
              <span className="text-amber-400">Status: {profile.statusBadge}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {resume.summary}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Technical Competencies Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="font-semibold text-emerald-400 block mb-1">Frontend &amp; Edge</span>
                <p className="text-slate-300">
                  {resume.competencies.frontend}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="font-semibold text-amber-400 block mb-1">Systems &amp; Backend</span>
                <p className="text-slate-300">
                  {resume.competencies.systems}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="font-semibold text-sky-400 block mb-1">Cloud &amp; DevOps</span>
                <p className="text-slate-300">
                  {resume.competencies.devops}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Production Systems */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Selected Systems Engineering Projects
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">{p.title} — {p.subtitle}</span>
                    <span className="text-xs font-mono text-emerald-400">{p.stack.slice(0, 4).join(", ")}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* International Remote Collaboration Readiness */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              International Remote Work Readiness
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                <span className="text-emerald-400 block font-semibold mb-0.5">Async-First</span>
                <span>{resume.workReadiness.asyncFirst}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                <span className="text-emerald-400 block font-semibold mb-0.5">US/EU Overlap</span>
                <span>{resume.workReadiness.usEuOverlap}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                <span className="text-emerald-400 block font-semibold mb-0.5">Contract Models</span>
                <span>{resume.workReadiness.contractModels}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                <span className="text-emerald-400 block font-semibold mb-0.5">English</span>
                <span>{resume.workReadiness.english}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer print note */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 print:hidden">
          <span>Formatted for automated Applicant Tracking Systems (ATS)</span>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            Download / Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}
