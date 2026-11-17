"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUpRight, Globe, FileText, Layers } from "lucide-react";
import ResumeModal from "@/components/ui/ResumeModal";

export default function HeroSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 max-w-6xl mx-auto z-10"
    >
      {/* Global Status Badges */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for global full-stack &amp; systems roles</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 font-mono">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>UTC+5:30 • 4-5h US overlap • Full EU/UK overlap</span>
        </div>

        <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 font-mono">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Distributed Architecture: Next.js Edge ➔ Tokio Reactor ➔ Kubernetes</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
          Engineering scalable web applications and high-performance compiled systems.
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
          I&apos;m <span className="text-white font-semibold">Inderjeet</span>. I bridge the gap between reactive frontend user experiences and low-level backend performance—crafting applications in <span className="text-emerald-300">React &amp; Next.js</span>, writing memory-safe concurrency with <span className="text-amber-300">Rust</span>, and orchestrating resilient deployments with <span className="text-sky-300">Docker &amp; Kubernetes</span>.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("#projects")}
            className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => setResumeOpen(true)}
            className="px-5 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-medium text-sm hover:bg-emerald-500/20 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume (PDF)</span>
          </button>

          <button
            onClick={() => scrollTo("#remote")}
            className="px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white font-medium text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <span>Remote Overlap</span>
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="px-5 py-3 rounded-full text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("trigger-core-pulse"));
            }}
            title="Trigger 3D Systems Architecture Core resonance pulse"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/15 text-sm font-medium transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pulse 3D Core</span>
          </button>
        </div>
      </div>

      {/* Clean 3-Pillar Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 pt-8 border-t border-white/[0.08]">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="text-xs font-mono text-emerald-400 font-medium mb-1">01 / FRONTEND</div>
          <div className="text-base font-semibold text-white">React 19 &amp; Next.js</div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            React Server Components, progressive streaming SSR, edge caching, and interactive 3D WebGL interfaces.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="text-xs font-mono text-amber-400 font-medium mb-1">02 / SYSTEMS</div>
          <div className="text-base font-semibold text-white">Rust &amp; Concurrency</div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Tokio async runtimes, zero-cost abstractions, mathematical memory safety, and WebAssembly compilation.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="text-xs font-mono text-sky-400 font-medium mb-1">03 / DEVOPS</div>
          <div className="text-base font-semibold text-white">Cloud &amp; Deployment</div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Automated CI/CD pipelines, distroless Docker containers, Kubernetes canary rollouts, and infrastructure as code.
          </p>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
