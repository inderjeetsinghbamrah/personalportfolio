"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Lightbulb, CheckCircle2, ChevronRight, Layers, ShieldCheck, Zap } from "lucide-react";
import { sound } from "@/lib/sound";
import SectorGate from "@/components/character/SectorGate";

interface PhilosophyItem {
  title: string;
  quote: string;
  description: string;
}

interface AboutProps {
  positioning: string;
  bio: string;
  interests: string[];
  philosophy: PhilosophyItem[];
}

export default function InteractiveAbout({
  positioning,
  bio,
  interests,
  philosophy,
}: AboutProps) {
  const [activePhilosophy, setActivePhilosophy] = useState<number>(0);

  const handlePhilosophyClick = (index: number) => {
    sound.playTick();
    setActivePhilosophy(index);
  };

  const backgroundPillars = [
    {
      title: "Academic Pedagogy & Research",
      icon: GraduationCap,
      period: "M.Tech & B.Tech in IT/CS",
      points: [
        "Master of Technology (M.Tech) in Computer Science & IT",
        "Bachelor of Technology (B.Tech) in Information Technology",
        "Deep foundation in formal relational database theory, operating systems, and distributed algorithms",
      ],
    },
    {
      title: "Engineering Education & Mentorship",
      icon: Briefcase,
      period: "Lecturer & Former Assistant Professor",
      points: [
        "Currently serving as Lecturer in Information Technology",
        "Former Assistant Professor instructing B.Tech computer science and IT undergraduates",
        "Formulating Outcome-Based Education (OBE) course outcome attainment assessments (NBA/NAAC)",
      ],
    },
    {
      title: "Full-Stack Product Engineering",
      icon: Layers,
      period: "End-to-End Systems",
      points: [
        "Architecting modern multi-tenant cloud applications (Next.js, TypeScript, PostgreSQL)",
        "Bridging visual interface craft in Figma with robust cloud infrastructure in Docker & Kubernetes",
        "Strict adherence to data integrity, type-safety invariants, and sub-millisecond cache latency",
      ],
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sector Gate 02: Philosophy & Pedagogy */}
        <SectorGate sectorId="about" />

        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-indigo-400 mb-3">
            <span>02 // PHILOSOPHY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            The Intersection of Rigor and Craft
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            &ldquo;{positioning}&rdquo;
          </p>
        </div>

        {/* Narrative & Background Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] leading-relaxed text-slate-300 text-sm sm:text-base space-y-4">
              <p>
                {bio}
              </p>
              <p className="text-slate-400 text-sm">
                Rather than treating software as disparate fragments of frontend buttons and database tables, I approach products holistically: defining the domain model, enforcing relational constraints in PostgreSQL, designing modular accessible design systems, and deploying resilient containerized architectures.
              </p>
            </div>

            {/* Core Engineering Focus Areas */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08]">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-sky-400" />
                <span>CORE ENGINEERING INTERESTS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic & Professional Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {backgroundPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {pillar.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="h-1 w-1 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE ENGINEERING PHILOSOPHY WORKBENCH
            ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F121C] to-[#0A0B10] border border-white/[0.1] relative">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE ENGINEERING PHILOSOPHY WORKBENCH</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">
            Architectural Axioms
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Axiom Selector Buttons */}
            <div className="lg:col-span-5 space-y-2">
              {philosophy.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePhilosophyClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                    activePhilosophy === idx
                      ? "bg-[#181D2E] border-indigo-500/60 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                      : "bg-[#0E1017]/80 hover:bg-[#131622] border-white/[0.06] text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-indigo-400 font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activePhilosophy === idx
                        ? "text-indigo-400 translate-x-1"
                        : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Axiom Deep Dive Rationale Display */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest">
                  AXIOM {activePhilosophy + 1} &bull; RATIONALE & APPLICATION
                </span>
                <blockquote className="text-lg sm:text-xl font-medium text-white my-3 italic border-l-2 border-indigo-500 pl-4">
                  &ldquo;{philosophy[activePhilosophy]?.quote}&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                  {philosophy[activePhilosophy]?.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>ENFORCED IN PRODUCTION</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED DESIGN INVARIANT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
