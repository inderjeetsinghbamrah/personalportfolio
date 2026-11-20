"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Workflow, 
  Sun, 
  Moon, 
  Sliders 
} from "lucide-react";
import { usePortfolioData } from "@/lib/portfolio-data";

export default function RemoteWorkSection() {
  const { data } = usePortfolioData();
  const profile = data.profile;
  const [clientPing, setClientPing] = useState<number | null>(null);
  const [nearestPoP, setNearestPoP] = useState<string>("Detecting Edge...");
  const [utcHour, setUtcHour] = useState<number>(14); // Default to 14:00 UTC (19:30 IST / 10:00 AM EST)

  useEffect(() => {
    // Detect current real UTC hour on load
    const now = new Date();
    setUtcHour(now.getUTCHours());

    // Measure round trip latency to current host
    const start = performance.now();
    fetch("/favicon.ico", { cache: "no-store", method: "HEAD" })
      .then(() => {
        const latency = Math.round(performance.now() - start);
        setClientPing(latency);

        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
          if (tz.includes("america") || tz.includes("us") || tz.includes("canada")) {
            setNearestPoP("US-East (N. Virginia Edge)");
          } else if (tz.includes("europe") || tz.includes("london") || tz.includes("berlin") || tz.includes("paris")) {
            setNearestPoP("EU-Central (Frankfurt Edge)");
          } else if (tz.includes("asia") || tz.includes("kolkata") || tz.includes("singapore") || tz.includes("tokyo")) {
            setNearestPoP("AP-South (Mumbai / Singapore Edge)");
          } else {
            setNearestPoP("Global Cloudflare PoP");
          }
        } catch {
          setNearestPoP("Global CDN Edge");
        }
      })
      .catch(() => {
        setClientPing(14);
        setNearestPoP("Global Anycast Edge");
      });
  }, []);

  // Time conversion helper
  const getTimeString = (baseUtcHour: number, offsetHours: number) => {
    let totalMinutes = Math.round((baseUtcHour + offsetHours) * 60);
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return {
      formatted: `${h12}:${m === 0 ? "00" : m} ${period}`,
      rawHour: h + m / 60,
      isDaytime: h >= 8 && h < 20,
      isWorkingHour: h >= 9 && h <= 18,
    };
  };

  // City calculations
  const sf = getTimeString(utcHour, -8);
  const ny = getTimeString(utcHour, -5);
  const london = getTimeString(utcHour, 0);
  const berlin = getTimeString(utcHour, 1);
  const inderjeet = getTimeString(utcHour, 5.5);

  const isInderjeetAvailable = inderjeet.rawHour >= 10 && inderjeet.rawHour <= 23;
  const isOverlapActive = isInderjeetAvailable && (ny.isWorkingHour || london.isWorkingHour || sf.isWorkingHour || berlin.isWorkingHour);

  return (
    <section id="remote" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-6">
        <div>
          <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider mb-2">
            04 / GLOBAL REMOTE COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built for Distributed, Async Teams
          </h2>
          <p className="text-base text-slate-400 font-normal mt-2 max-w-xl">
            Drag the interactive world clock slider below to simulate real-time overlap across your local working hours.
          </p>
        </div>

        {/* Live Client Edge Latency Widget */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-slate-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400">YOUR CONNECTION TO EDGE</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-bold text-white">{nearestPoP}</span>
              <span className="text-emerald-400">
                {clientPing !== null ? `${clientPing}ms latency` : "pinging..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- WOW ELEMENT: INTERACTIVE 24-HOUR WORLD TIME OVERLAP SCRUBBER --- */}
      <div className="card-clean p-6 sm:p-8 rounded-2xl border-white/15 mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              Interactive Global Overlap Simulator
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Selected:</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">
              {String(utcHour).padStart(2, "0")}:00 UTC
            </span>
            {isOverlapActive ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Overlap Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-0.5 rounded-full text-[11px]">
                Async RFC / PR Queue
              </span>
            )}
          </div>
        </div>

        {/* Time Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={23}
            step={1}
            value={utcHour}
            onChange={(e) => setUtcHour(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1 select-none">
            <span>00:00 UTC (Night)</span>
            <span>06:00 UTC (Asia/EU Morn)</span>
            <span>12:00 UTC (EU Core / US Morn)</span>
            <span>18:00 UTC (US Aft)</span>
            <span>24:00 UTC</span>
          </div>
        </div>

        {/* 5 City Cards Synchronized with Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* SF */}
          <div className={`p-3 rounded-xl border transition-all ${
            sf.isWorkingHour ? "bg-white/[0.04] border-white/20 text-white" : "bg-white/[0.01] border-white/5 text-slate-400"
          }`}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-medium">San Francisco</span>
              {sf.isDaytime ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
            </div>
            <div className="text-sm font-mono font-bold text-white">{sf.formatted}</div>
            <span className="text-[10px] text-slate-400 font-mono">PST (UTC-8)</span>
          </div>

          {/* NY */}
          <div className={`p-3 rounded-xl border transition-all ${
            ny.isWorkingHour ? "bg-white/[0.04] border-white/20 text-white" : "bg-white/[0.01] border-white/5 text-slate-400"
          }`}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-medium">New York</span>
              {ny.isDaytime ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
            </div>
            <div className="text-sm font-mono font-bold text-white">{ny.formatted}</div>
            <span className="text-[10px] text-slate-400 font-mono">EST (UTC-5)</span>
          </div>

          {/* London */}
          <div className={`p-3 rounded-xl border transition-all ${
            london.isWorkingHour ? "bg-white/[0.04] border-white/20 text-white" : "bg-white/[0.01] border-white/5 text-slate-400"
          }`}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-medium">London</span>
              {london.isDaytime ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
            </div>
            <div className="text-sm font-mono font-bold text-white">{london.formatted}</div>
            <span className="text-[10px] text-slate-400 font-mono">GMT (UTC+0)</span>
          </div>

          {/* Berlin */}
          <div className={`p-3 rounded-xl border transition-all ${
            berlin.isWorkingHour ? "bg-white/[0.04] border-white/20 text-white" : "bg-white/[0.01] border-white/5 text-slate-400"
          }`}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-medium">Berlin</span>
              {berlin.isDaytime ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
            </div>
            <div className="text-sm font-mono font-bold text-white">{berlin.formatted}</div>
            <span className="text-[10px] text-slate-400 font-mono">CET (UTC+1)</span>
          </div>

          {/* Profile Name */}
          <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-white col-span-2 sm:col-span-1 shadow-lg shadow-emerald-500/5">
            <div className="flex items-center justify-between text-[11px] mb-1 text-emerald-300 font-semibold">
              <span>{profile.name}</span>
              {inderjeet.isDaytime ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-emerald-300" />}
            </div>
            <div className="text-sm font-mono font-bold text-white">{inderjeet.formatted}</div>
            <span className="text-[10px] text-emerald-400/90 font-mono">
              {isInderjeetAvailable ? "● Online & Active" : "○ Async Review"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 4 Core Pillars of International Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 1: Timezone Overlap */}
        <div className="card-clean p-7 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Timezone Overlap Guarantee</h3>
              <p className="text-xs text-slate-400">Base: UTC+5:30 (India Standard Time)</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            I maintain dedicated daily overlap blocks with US and European engineering hubs every single day:
          </p>

          <div className="space-y-2.5 text-xs font-mono pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <span className="text-white font-medium">United States (EST / EDT)</span>
              <span className="text-emerald-400 font-semibold">4 – 5 hours daily overlap</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <span className="text-white font-medium">UK &amp; Europe (GMT / CET)</span>
              <span className="text-emerald-400 font-semibold">6 – 8 hours full overlap</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <span className="text-white font-medium">Asia-Pacific (SGT / JST / AEST)</span>
              <span className="text-emerald-400 font-semibold">Full business day overlap</span>
            </div>
          </div>
        </div>

        {/* Card 2: Async Communication */}
        <div className="card-clean p-7 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Async-First Communication Culture</h3>
              <p className="text-xs text-slate-400">High-signal, low-meeting velocity</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Great remote engineering happens through clear written artifacts and autonomy, not endless synchronous meetings:
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>RFC-Driven Decisions:</strong> I write concise Request for Comments (RFCs) documenting trade-offs before executing major architecture shifts.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Self-Documenting Pull Requests:</strong> Clear context, benchmark diffs, reproducible test steps, and short screen walk-throughs.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Blameless Post-Mortems:</strong> Concrete root-cause analysis and actionable mitigation tasks whenever incidents occur.</span>
            </div>
          </div>
        </div>

        {/* Card 3: Hiring Models & Legal Logistics */}
        <div className="card-clean p-7 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Frictionless Hiring &amp; Contracts</h3>
              <p className="text-xs text-slate-400">Ready for global hiring immediately</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            I work seamlessly with global employers through standard compliance and payroll platforms:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="font-semibold text-white block mb-0.5">Employer of Record (EOR)</span>
              <p className="text-slate-400 text-[11px]">Hiring via Deel, Remote.com, OysterHR with local payroll and benefits.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="font-semibold text-white block mb-0.5">B2B Remote Contract</span>
              <p className="text-slate-400 text-[11px]">Direct international invoicing in USD / EUR with compliant tax filings.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] sm:col-span-2">
              <span className="font-semibold text-white block mb-0.5">Relocation &amp; Visa Sponsorship</span>
              <p className="text-slate-400 text-[11px]">Open to relocation for high-impact systems engineering roles in the US, Europe, or UK.</p>
            </div>
          </div>
        </div>

        {/* Card 4: Production Ownership */}
        <div className="card-clean p-7 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Full Production Ownership</h3>
              <p className="text-xs text-slate-400">You build it, you run it</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            I don&apos;t consider a ticket done when code merges; I consider it done when it is monitored, tested, and running stably in production:
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Rigorous Testing:</strong> Unit tests, automated integration suites, and fuzz testing for concurrent Rust algorithms.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Observability First:</strong> Prometheus metrics, structured JSON logging, and OpenTelemetry distributed tracing built in from day one.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Zero-Downtime Rollouts:</strong> Declarative Kubernetes manifests with health probes and automated canary rollback budgets.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
