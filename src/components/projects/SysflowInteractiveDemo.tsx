"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Play, RotateCcw } from "lucide-react";

export default function SysflowInteractiveDemo() {
  const [nodes, setNodes] = useState([
    { id: "validate", label: "Validate Payload", status: "completed", latency: "4ms" },
    { id: "auth", label: "Check Auth & Permissions", status: "completed", latency: "8ms" },
    { id: "charge", label: "Debit Account Ledger", status: "idle", latency: "-" },
    { id: "notify", label: "Publish Event to Kafka", status: "idle", latency: "-" },
    { id: "audit", label: "Store Append-Only Log", status: "idle", latency: "-" },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [injectError, setInjectError] = useState(false);
  const [log, setLog] = useState<string>("DAG engine ready. Awaiting dispatch trigger.");

  const handleRun = () => {
    sound.playTick();
    setIsRunning(true);
    setLog("Executing DAG topological run...");

    setNodes((prev) =>
      prev.map((n, i) => (i === 0 || i === 1 ? { ...n, status: "completed" } : { ...n, status: "idle" }))
    );

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => (n.id === "charge" ? { ...n, status: "running" } : n))
      );
      setLog("Step 3: Debiting Account Ledger...");

      setTimeout(() => {
        if (injectError) {
          setNodes((prev) =>
            prev.map((n) =>
              n.id === "charge"
                ? { ...n, status: "failed" }
                : n.id === "validate" || n.id === "auth"
                ? { ...n, status: "compensated" }
                : n
            )
          );
          setLog("CRITICAL: Ledger debit timed out! Initiating Saga compensation rollback in reverse order.");
          setIsRunning(false);
          sound.playTick();
        } else {
          setNodes((prev) =>
            prev.map((n) => (n.id === "charge" ? { ...n, status: "completed", latency: "38ms" } : n))
          );
          setLog("Step 4: Publishing Event to Kafka...");

          setTimeout(() => {
            setNodes((prev) =>
              prev.map((n) =>
                n.id === "notify" || n.id === "audit"
                  ? { ...n, status: "completed", latency: "14ms" }
                  : n
              )
            );
            setLog("Workflow run completed successfully. 5/5 DAG tasks committed.");
            setIsRunning(false);
            sound.playSuccess();
          }, 500);
        }
      }, 600);
    }, 400);
  };

  const handleReset = () => {
    sound.playTick();
    setNodes([
      { id: "validate", label: "Validate Payload", status: "idle", latency: "-" },
      { id: "auth", label: "Check Auth & Permissions", status: "idle", latency: "-" },
      { id: "charge", label: "Debit Account Ledger", status: "idle", latency: "-" },
      { id: "notify", label: "Publish Event to Kafka", status: "idle", latency: "-" },
      { id: "audit", label: "Store Append-Only Log", status: "idle", latency: "-" },
    ]);
    setLog("DAG workflow reset. Ready.");
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl bg-[#090B10] border border-white/[0.1] p-5 sm:p-7 shadow-2xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-1">
            DISTRIBUTED TASK ORCHESTRATION SANDBOX
          </div>
          <h4 className="text-lg font-bold text-white">SysFlow DAG & Saga Compensation Engine</h4>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs font-mono text-slate-300 cursor-pointer bg-[#121622] px-2.5 py-1.5 rounded-lg border border-white/[0.08]">
            <input
              type="checkbox"
              checked={injectError}
              onChange={(e) => setInjectError(e.target.checked)}
              className="accent-amber-500"
            />
            <span className="text-amber-400">Inject Step 3 Failure</span>
          </label>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dispatch</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DAG Flow Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {nodes.map((node, idx) => (
          <div
            key={node.id}
            className={`p-3 rounded-xl border text-xs font-mono transition-all duration-300 ${
              node.status === "completed"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : node.status === "running"
                ? "bg-indigo-500/20 border-indigo-500/60 text-indigo-200 animate-pulse"
                : node.status === "failed"
                ? "bg-red-500/20 border-red-500/60 text-red-300"
                : node.status === "compensated"
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-white/[0.02] border-white/[0.06] text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 text-[10px]">
              <span>STEP 0{idx + 1}</span>
              <span>{node.latency}</span>
            </div>
            <div className="font-sans font-medium text-white line-clamp-1">{node.label}</div>
            <div className="mt-2 text-[10px] font-semibold uppercase">
              {node.status}
            </div>
          </div>
        ))}
      </div>

      {/* Execution Terminal Log */}
      <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">&gt;</span>
          <span>{log}</span>
        </div>
        <span className="text-[10px] text-slate-500">EVENT BUS: REDIS STREAMS</span>
      </div>
    </div>
  );
}
