"use client";

import React from "react";
import { GraduationCap, Cpu, Layers, ShieldCheck } from "lucide-react";

export default function EditorialOverview() {
  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      number: "01",
      title: "System Topology & Scalability",
      description:
        "Architecting resilient multi-tenant architectures featuring cache-aside Redis layers, idempotent APIs, asynchronous message queues, and deterministic PostgreSQL transaction boundaries.",
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      number: "02",
      title: "Design Engineering & Fluid UX",
      description:
        "Crafting token-driven design systems from Figma to React. Obsessed with zero layout shift (CLS 0), accessible color contrast (WCAG AAA), and 60fps micro-interactions.",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
      number: "03",
      title: "Pedagogical Clarity & Formal Rigor",
      description:
        "Leveraging academic instruction across B.Tech and M.Tech curricula to enforce first-principles engineering. If an architectural decision cannot be clearly reasoned about and documented, it is flawed.",
    },
  ];

  return (
    <section id="overview" className="py-20 md:py-28 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              {"// Philosophy & Pedagogy"}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Beyond Writing Code.
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-light">
            I believe world-class software requires both computational depth and typographic precision.
          </p>
        </div>

        {/* Narrative & Academic Callout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            <p>
              With an <strong className="text-foreground font-semibold">M.Tech in Computer Science & IT</strong> and a{" "}
              <strong className="text-foreground font-semibold">B.Tech in Information Technology</strong>, my engineering
              mindset is grounded in formal foundations: relational database calculus, distributed consensus, compiler
              principles, and algorithmic complexity.
            </p>
            <p>
              Currently serving as a <strong className="text-foreground font-semibold">Lecturer in Information Technology</strong> and
              having worked as an <strong className="text-foreground font-semibold">Assistant Professor</strong> educating B.Tech
              undergraduates, I view system design as an exercise in clarity. Explaining advanced software concepts to hundreds of
              aspiring engineers strips away cargo-culting: every layer in the stack must justify its existence.
            </p>
            <p>
              In production, I translate this rigor into building full-lifecycle digital products: from intuitive Figma design systems
              to type-safe Next.js applications, optimized PostgreSQL database schemas, and automated containerized pipelines.
            </p>
          </div>

          {/* Academic & Professional Credential Card */}
          <div className="lg:col-span-5 editorial-card p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b hairline-border">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Pedagogical Record
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-0.5">CURRENT APPOINTMENT</div>
                <div className="font-semibold text-foreground">Lecturer in Information Technology</div>
                <div className="text-xs text-slate-400">Engineering Curriculum Instruction & Mentorship</div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-0.5">PREVIOUS APPOINTMENT</div>
                <div className="font-semibold text-foreground">Assistant Professor</div>
                <div className="text-xs text-slate-400">Department of Computer Science & Engineering</div>
              </div>

              <div className="pt-4 border-t hairline-border">
                <div className="text-xs font-mono text-slate-400 mb-0.5">ACADEMIC DEGREES</div>
                <div className="font-semibold text-foreground">Master of Technology (M.Tech)</div>
                <div className="text-xs text-slate-400 mb-2">Computer Science & Information Technology</div>
                <div className="font-semibold text-foreground">Bachelor of Technology (B.Tech)</div>
                <div className="text-xs text-slate-400">Information Technology</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t hairline-border">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="editorial-card p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-500">{pillar.number}</span>
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
