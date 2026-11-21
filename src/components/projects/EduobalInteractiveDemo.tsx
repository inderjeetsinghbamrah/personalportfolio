"use client";

import React, { useState, useId } from "react";
import { sound } from "@/lib/sound";
import { Building2, RefreshCw, BarChart2 } from "lucide-react";

export default function EduobalInteractiveDemo() {
  const [thresholdPct, setThresholdPct] = useState<number>(60);
  const [directWeight, setDirectWeight] = useState<number>(80);
  const [selectedCourse, setSelectedCourse] = useState<string>("CS401");
  const [selectedTenant, setSelectedTenant] = useState<string>("Dept of Information Technology");
  const [calculating, setCalculating] = useState<boolean>(false);

  const thresholdSliderId = useId();
  const directWeightSliderId = useId();

  // Synthetic student assessment sample data
  const sampleData = {
    CS401: {
      name: "CS401: Distributed Systems & Cloud Architecture",
      studentsCount: 64,
      coDetails: [
        { co: "CO1", description: "Design distributed consensus protocols (Raft, Paxos)", bloom: "Create (L6)", avgScore: 16.4 },
        { co: "CO2", description: "Analyze CAP theorem trade-offs in partitioned networks", bloom: "Analyze (L4)", avgScore: 14.8 },
        { co: "CO3", description: "Implement async RPC message queues with Redis Streams", bloom: "Apply (L3)", avgScore: 17.2 },
        { co: "CO4", description: "Evaluate Byzantine fault tolerance in decentralized clusters", bloom: "Evaluate (L5)", avgScore: 13.5 },
      ],
    },
    IT302: {
      name: "IT302: Relational Database Engineering & PostgreSQL",
      studentsCount: 72,
      coDetails: [
        { co: "CO1", description: "Design 3NF relational schemas and foreign key cascades", bloom: "Create (L6)", avgScore: 17.8 },
        { co: "CO2", description: "Formulate kernel Row Level Security (RLS) policies", bloom: "Apply (L3)", avgScore: 15.6 },
        { co: "CO3", description: "Analyze B-Tree vs Hash index scan performance via EXPLAIN", bloom: "Analyze (L4)", avgScore: 14.1 },
        { co: "CO4", description: "Implement ACID transactions with two-phase commit", bloom: "Apply (L3)", avgScore: 16.0 },
      ],
    },
  };

  const course = sampleData[selectedCourse as keyof typeof sampleData];

  // Dynamic attainment calculation
  const maxMarks = 20;
  const passingMarks = (thresholdPct / 100) * maxMarks;

  const coCalculations = course.coDetails.map((item) => {
    // Model realistic bell-curve attainment based on threshold
    const difficultyFactor = item.avgScore / maxMarks; // e.g. 0.8
    const basePct = (difficultyFactor / (thresholdPct / 100)) * 68;
    const attainmentPct = Math.min(Math.max(Number(basePct.toFixed(1)), 42), 94);

    let level = 0;
    if (attainmentPct >= 70) level = 3;
    else if (attainmentPct >= 60) level = 2;
    else if (attainmentPct >= 50) level = 1;

    const directAttainment = level;
    const indirectAttainment = 2.8; // exit survey out of 3.0
    const finalAttainment = Number(
      ((directAttainment * (directWeight / 100)) + (indirectAttainment * ((100 - directWeight) / 100))).toFixed(2)
    );

    return {
      ...item,
      attainmentPct,
      level,
      finalAttainment,
    };
  });

  const handleRecalculate = () => {
    sound.playTick();
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      sound.playSuccess();
    }, 350);
  };

  return (
    <div className="rounded-2xl bg-[#090B10] border border-white/[0.1] p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Top Banner & Multi-Tenant Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FUNCTIONAL LIVE DEMO // NBA & NAAC OBE ENGINE</span>
          </div>
          <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            EDUOBAL Outcome Attainment Sandbox
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive demonstration of multi-tenant outcome-based education calculations and course outcome to program outcome mapping.
          </p>
        </div>

        {/* Tenant Selector */}
        <div className="flex items-center gap-2 bg-[#121622] p-1.5 rounded-xl border border-white/[0.08] text-xs font-mono">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <select
            value={selectedTenant}
            onChange={(e) => {
              sound.playTick();
              setSelectedTenant(e.target.value);
            }}
            className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="Dept of Information Technology">Dept of Information Technology</option>
            <option value="Dept of Computer Science & Eng">Dept of Computer Science & Eng</option>
            <option value="School of Advanced Computing">School of Advanced Computing</option>
          </select>
        </div>
      </div>

      {/* Control Panel: Sliders & Course Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#0F131D] border border-white/[0.06]">
        {/* Course Selection */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
            Active Accredited Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              sound.playTick();
              setSelectedCourse(e.target.value);
            }}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="CS401">CS401: Distributed Systems</option>
            <option value="IT302">IT302: Relational Databases</option>
          </select>
        </div>

        {/* Threshold Slider */}
        <div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <label htmlFor={thresholdSliderId} className="uppercase tracking-wider">Pass Threshold</label>
            <span className="text-indigo-400 font-bold">{thresholdPct}% ({passingMarks.toFixed(1)}/20)</span>
          </div>
          <input
            id={thresholdSliderId}
            type="range"
            min="40"
            max="80"
            step="5"
            value={thresholdPct}
            onChange={(e) => setThresholdPct(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Direct Assessment Weightage */}
        <div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <label htmlFor={directWeightSliderId} className="uppercase tracking-wider">Direct / Indirect Ratio</label>
            <span className="text-sky-400 font-bold">{directWeight}% / {100 - directWeight}%</span>
          </div>
          <input
            id={directWeightSliderId}
            type="range"
            min="60"
            max="90"
            step="5"
            value={directWeight}
            onChange={(e) => setDirectWeight(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* Attainment Table Readout */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] text-[11px] font-mono text-slate-400 uppercase">
              <th className="py-2.5 px-3">Outcome</th>
              <th className="py-2.5 px-3">Cognitive Level</th>
              <th className="py-2.5 px-3">Attaining Threshold</th>
              <th className="py-2.5 px-3">NBA Level (0-3)</th>
              <th className="py-2.5 px-3 text-right">Computed Attainment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {coCalculations.map((row) => (
              <tr key={row.co} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3 font-mono font-semibold text-indigo-400">
                  {row.co}
                  <div className="font-sans font-normal text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {row.description}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                    {row.bloom}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{row.attainmentPct}%</span>
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${row.attainmentPct}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                      row.level === 3
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : row.level === 2
                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    Level {row.level}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white text-sm">
                  {row.finalAttainment} / 3.0
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Program Outcome (PO) Mapping Matrix */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-indigo-300">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>NBA PROGRAM OUTCOMES (PO1 - PO4) CORRELATION</span>
          </span>
          <span className="text-emerald-400">ACCREDITATION TARGET: &gt;= 2.0</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { po: "PO1: Eng Knowledge", val: (coCalculations[0].finalAttainment * 0.95).toFixed(2) },
            { po: "PO2: Problem Analysis", val: (coCalculations[1].finalAttainment * 0.92).toFixed(2) },
            { po: "PO3: Design Solutions", val: (coCalculations[2].finalAttainment * 0.89).toFixed(2) },
            { po: "PO4: Modern Tool Usage", val: (coCalculations[3].finalAttainment * 0.96).toFixed(2) },
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-[#0E121A] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 truncate">{item.po}</div>
              <div className="text-base font-mono font-bold text-white mt-1">{item.val}</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">COMPLIANT</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer trigger */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
        <span>Multi-Tenant Context: {selectedTenant}</span>
        <button
          onClick={handleRecalculate}
          disabled={calculating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-medium transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${calculating ? "animate-spin" : ""}`} />
          <span>{calculating ? "Recalculating..." : "Execute Re-evaluation"}</span>
        </button>
      </div>
    </div>
  );
}
