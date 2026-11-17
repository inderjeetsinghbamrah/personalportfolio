"use client";

import React, { useState, useEffect } from "react";
import { Zap, Activity } from "lucide-react";
import { sound } from "@/lib/sound";

export default function PipelineStressHUD() {
  const [isStressActive, setIsStressActive] = useState(false);
  const [telemetry, setTelemetry] = useState<{
    throughput: number;
    latency: number;
    cpu: number;
    memory: number;
  } | null>(null);

  useEffect(() => {
    const handleStressEvent = () => {
      if (isStressActive) return;
      setIsStressActive(true);
      sound.playClick();

      let count = 0;
      const interval = setInterval(() => {
        count++;
        setTelemetry({
          throughput: Math.round(180000 + Math.random() * 70000),
          latency: +(0.72 + Math.random() * 0.18).toFixed(2),
          cpu: Math.round(35 + Math.random() * 15),
          memory: +(14.2 + Math.random() * 0.6).toFixed(1),
        });

        if (count >= 14) {
          clearInterval(interval);
          setTimeout(() => {
            setIsStressActive(false);
            sound.playChime();
          }, 600);
        }
      }, 250);
    };

    window.addEventListener("trigger-pipeline-stress", handleStressEvent);
    return () => window.removeEventListener("trigger-pipeline-stress", handleStressEvent);
  }, [isStressActive]);

  const triggerTest = () => {
    window.dispatchEvent(new CustomEvent("trigger-pipeline-stress"));
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden md:block">
      {isStressActive ? (
        <div className="card-clean p-4 rounded-2xl border-amber-500/40 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-2 min-w-[280px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SIMULATING 100K REQ/S SPIKE</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-2 rounded-lg bg-black/50 border border-white/5">
              <span className="text-[10px] text-slate-400 block">THROUGHPUT</span>
              <span className="text-white font-bold">{telemetry?.throughput.toLocaleString()} req/s</span>
            </div>
            <div className="p-2 rounded-lg bg-black/50 border border-white/5">
              <span className="text-[10px] text-slate-400 block">P99 LATENCY</span>
              <span className="text-emerald-400 font-bold">{telemetry?.latency} ms</span>
            </div>
            <div className="p-2 rounded-lg bg-black/50 border border-white/5">
              <span className="text-[10px] text-slate-400 block">TOKIO CPU</span>
              <span className="text-amber-400 font-bold">{telemetry?.cpu}% (16 Cores)</span>
            </div>
            <div className="p-2 rounded-lg bg-black/50 border border-white/5">
              <span className="text-[10px] text-slate-400 block">RUST MEMORY</span>
              <span className="text-sky-400 font-bold">{telemetry?.memory} MB</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={triggerTest}
          title="Simulate 100,000 req/sec stress test across the 3D pipeline"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d1017]/90 hover:bg-[#141924] border border-white/10 hover:border-amber-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-xl backdrop-blur-md group"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
          <span>Stress-Test 3D Pipeline</span>
          <span className="text-[10px] text-slate-500 font-sans border-l border-white/10 pl-2">
            100k req/s
          </span>
        </button>
      )}
    </div>
  );
}
