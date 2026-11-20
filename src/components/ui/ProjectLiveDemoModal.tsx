"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Zap,
  ExternalLink,
  Shield,
  Server,
  Activity,
  AlertTriangle,
  Radio,
  Sliders,
  Cpu,
  RefreshCw,
  Globe,
  Sparkles,
} from "lucide-react";
import { ProjectItem } from "@/data/default-portfolio";
import { sound } from "@/lib/sound";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ProjectLiveDemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectLiveDemoModal({
  project,
  onClose,
}: ProjectLiveDemoModalProps) {
  const [viewMode, setViewMode] = useState<"simulation" | "iframe">("simulation");

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Dialog Shell */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090c13] border border-white/15 shadow-2xl shadow-emerald-500/10 overflow-hidden text-slate-100"
      >
        {/* Top Command Bar */}
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    project.badgeColor || "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                  }`}
                >
                  {project.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                LIVE RUNTIME SIMULATOR • INTERACTIVE DEMO
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle if Live URL exists */}
            {project.liveDemoUrl && (
              <div className="flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/10 text-xs font-mono mr-2">
                <button
                  onClick={() => {
                    setViewMode("simulation");
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === "simulation"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>Interactive Simulator</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("iframe");
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === "iframe"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Live Web App</span>
                </button>
              </div>
            )}

            {/* GitHub Code Link */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-slate-200 hover:text-white font-mono flex items-center gap-1.5 transition-all group"
                title="View Source on GitHub"
              >
                <GitHubIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
                <span className="hidden sm:inline">GitHub Code</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            )}

            {/* External Live Site Link */}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-400 font-mono flex items-center gap-1.5 transition-all"
                title="Open Live Application"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-1"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
          {viewMode === "iframe" && project.liveDemoUrl ? (
            <LiveIframeView url={project.liveDemoUrl} />
          ) : (
            <ProjectSimulationView projectId={project.id} project={project} />
          )}
        </div>

        {/* Footer Status Bar */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ISOLATED WASM / SANDBOX ENGINE</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-400">
              Stack: {project.stack.slice(0, 4).join(" • ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ESC</kbd> to return</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: Live Embedded Web App Iframe View
// =============================================================================
function LiveIframeView({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-3">
      {/* Browser Frame Header */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-t-2xl bg-black/60 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-slate-500 ml-2 truncate max-w-sm">{url}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
        >
          <span>Open Fullscreen</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Frame Viewport */}
      <div className="relative w-full h-[65vh] rounded-b-2xl overflow-hidden border border-t-0 border-white/10 bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090c13] gap-3">
            <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
            <span className="text-xs font-mono text-slate-400">Loading Live Instance from {url}...</span>
          </div>
        )}
        <iframe
          src={url}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0"
          title="Project Live Demo Viewport"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: Project Simulation Switcher
// =============================================================================
function ProjectSimulationView({
  projectId,
}: {
  projectId: string;
  project: ProjectItem;
}) {
  switch (projectId) {
    case "aether-kv":
      return <AetherKvSimulator />;
    case "hyperion-next":
      return <HyperionSimulator />;
    case "orbit-kube":
      return <OrbitKubeSimulator />;
    case "photon-canvas":
      return <PhotonCanvasSimulator />;
    default:
      return <AetherKvSimulator />;
  }
}

// =============================================================================
// 1. AETHER-KV: Distributed Raft Consensus & Key-Value Simulator
// =============================================================================
interface RaftLogEntry {
  index: number;
  term: number;
  key: string;
  val: string;
  latencyMs: number;
  quorum: string;
}

function AetherKvSimulator() {
  const [term, setTerm] = useState(4);
  const [leaderId, setLeaderId] = useState(1);
  const [inputKey, setInputKey] = useState("user:101");
  const [inputVal, setInputVal] = useState('{"tier":"enterprise","plan":"active"}');
  const [kvStore, setKvStore] = useState<Record<string, string>>({
    "cluster:name": "aether-alpha-prod",
    "raft:quorum": "2/3",
    "user:101": '{"tier":"enterprise","plan":"active"}',
    "auth:token": "jwt_tok_991823",
  });
  const [logs, setLogs] = useState<RaftLogEntry[]>([
    { index: 104, term: 4, key: "cluster:name", val: "aether-alpha-prod", latencyMs: 0.78, quorum: "3/3 Quorum ACK" },
    { index: 105, term: 4, key: "user:101", val: '{"tier":"enterprise"}', latencyMs: 0.85, quorum: "3/3 Quorum ACK" },
  ]);
  const [isPartitioned, setIsPartitioned] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Cluster Healthy • All 3 Quorum Nodes Synced");

  const nodes = [
    { id: 1, name: "Node-1 (SFO)", port: 7001, role: leaderId === 1 ? "Leader" : "Follower", isDown: isPartitioned && leaderId === 1 },
    { id: 2, name: "Node-2 (FRA)", port: 7002, role: leaderId === 2 ? "Leader" : "Follower", isDown: false },
    { id: 3, name: "Node-3 (SIN)", port: 7003, role: leaderId === 3 ? "Leader" : "Follower", isDown: false },
  ];

  const handleWrite = () => {
    if (!inputKey || !inputVal) return;
    sound.playClick();
    setIsCommitting(true);

    setTimeout(() => {
      const nextIndex = logs.length > 0 ? logs[logs.length - 1].index + 1 : 101;
      const latency = parseFloat((0.65 + Math.random() * 0.35).toFixed(2));
      const newEntry: RaftLogEntry = {
        index: nextIndex,
        term,
        key: inputKey,
        val: inputVal,
        latencyMs: latency,
        quorum: isPartitioned ? "2/3 Quorum ACK (Leader Partitioned)" : "3/3 Quorum ACK",
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 7)]);
      setKvStore((prev) => ({ ...prev, [inputKey]: inputVal }));
      setIsCommitting(false);
      sound.playSuccess();
      setStatusMessage(`Successfully committed entry #${nextIndex} via Raft Consensus (P99: ${latency}ms)`);
    }, 180);
  };

  const handleKillLeader = () => {
    sound.playError();
    setIsPartitioned(true);
    setStatusMessage("WARNING: Node-1 (Current Leader) killed! Heartbeat timeout detected...");

    // Simulate Raft Election
    setTimeout(() => {
      const newTerm = term + 1;
      setTerm(newTerm);
      setLeaderId(2);
      sound.playSuccess();
      setStatusMessage(`ELECTION COMPLETE: Node-2 elected new Raft Leader for Term #${newTerm} with 2/2 Quorum Votes!`);
    }, 700);
  };

  const handleRevive = () => {
    sound.playClick();
    setIsPartitioned(false);
    setLeaderId(1);
    setStatusMessage("Cluster restored. Node-1 caught up with AppendEntries RPC.");
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-300">
          <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-semibold">{statusMessage}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Current Term:</span>
          <span className="px-2 py-0.5 rounded bg-black/50 text-amber-400 font-bold">#{term}</span>
        </div>
      </div>

      {/* 3-Node Cluster Architecture Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {nodes.map((node) => {
          const isLeader = node.role === "Leader" && !node.isDown;
          return (
            <div
              key={node.id}
              className={`p-4 rounded-2xl border transition-all ${
                node.isDown
                  ? "bg-rose-500/10 border-rose-500/40 opacity-70"
                  : isLeader
                  ? "bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10"
                  : "bg-white/[0.02] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 font-bold">{node.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    node.isDown
                      ? "bg-rose-500/20 text-rose-400"
                      : isLeader
                      ? "bg-amber-400 text-slate-950"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {node.isDown ? "OFFLINE" : node.role}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>gRPC Port:</span>
                  <span className="text-slate-200">{node.port}</span>
                </div>
                <div className="flex justify-between">
                  <span>Log Index:</span>
                  <span className="text-emerald-400 font-bold">#{logs[0]?.index || 100}</span>
                </div>
                <div className="flex justify-between">
                  <span>Commit Status:</span>
                  <span className={node.isDown ? "text-rose-400" : "text-emerald-400"}>
                    {node.isDown ? "Partitioned" : "Synchronized"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Key-Value Input & Chaos Operations */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit Linearizable Raft Mutation:</span>
          </span>
          <div className="flex items-center gap-2 text-xs font-mono">
            {isPartitioned ? (
              <button
                onClick={handleRevive}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Revive Partitioned Node</span>
              </button>
            ) : (
              <button
                onClick={handleKillLeader}
                className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 transition-colors flex items-center gap-1.5"
                title="Kill Node-1 to trigger automated leader failover"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Kill Current Leader (Chaos Test)</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Key Name</label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
              placeholder="e.g. user:token"
            />
          </div>
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Value (LSM Payload)</label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
              placeholder='{"role":"admin"}'
            />
          </div>
          <div className="sm:col-span-2 flex items-end">
            <button
              onClick={handleWrite}
              disabled={isCommitting}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold font-mono text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              {isCommitting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
              <span>Commit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live State Table & Consensus Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KV Store Inspection */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-2">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>In-Memory LSM State Store</span>
            </span>
            <span className="text-[10px] text-slate-500">{Object.keys(kvStore).length} Keys</span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar text-xs">
            {Object.entries(kvStore).map(([k, v]) => (
              <div key={k} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-2">
                <span className="text-amber-400 font-semibold truncate">{k}</span>
                <span className="text-slate-300 text-[11px] truncate max-w-[200px]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Raft Log Replications */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-2">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Consensus WAL Log Entries</span>
            </span>
            <span className="text-[10px] text-emerald-400">io_uring Zero-Copy</span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar text-[11px]">
            {logs.map((log) => (
              <div key={log.index} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <span className="text-slate-500 mr-2">#{log.index}</span>
                  <span className="text-emerald-400 font-semibold">{log.key}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{log.latencyMs}ms</span>
                  <span className="text-[10px] text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {log.quorum}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 2. HYPERION: Streaming Edge Telemetry & Analytics Simulator
// =============================================================================
function HyperionSimulator() {
  const [selectedRegion, setSelectedRegion] = useState("SFO");
  const [isPaused, setIsPaused] = useState(false);
  const [surgeActive, setSurgeActive] = useState(false);
  const [ttfbHistory, setTtfbHistory] = useState([12, 11, 14, 12, 10, 13, 11, 12, 10, 12]);
  const [events, setEvents] = useState([
    { id: "ev-1", timestamp: "16:20:04.102", method: "GET", path: "/api/telemetry/stream", status: 200, ttfb: 11.2, pop: "SFO-Edge" },
    { id: "ev-2", timestamp: "16:20:04.891", method: "POST", path: "/api/v2/analytics/ingest", status: 201, ttfb: 14.1, pop: "FRA-Edge" },
    { id: "ev-3", timestamp: "16:20:05.412", method: "GET", path: "/metrics/global", status: 200, ttfb: 9.8, pop: "SIN-Edge" },
  ]);

  // Live streaming simulator ticker
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const paths = ["/api/telemetry/stream", "/api/v2/analytics/ingest", "/metrics/global", "/v1/edge/cache"];
      const pops = ["SFO-Edge", "FRA-Edge", "SIN-Edge", "LHR-Edge", "NRT-Edge"];
      const randomPath = paths[Math.floor(Math.random() * paths.length)];
      const randomPop = pops[Math.floor(Math.random() * pops.length)];
      const baseTtfb = surgeActive ? 22 + Math.random() * 8 : 10 + Math.random() * 4;
      const ttfb = parseFloat(baseTtfb.toFixed(1));

      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;

      setEvents((prev) => [
        { id: `ev-${Date.now()}`, timestamp: timeStr, method: "GET", path: randomPath, status: 200, ttfb, pop: randomPop },
        ...prev.slice(0, 8),
      ]);

      setTtfbHistory((prev) => [...prev.slice(1), Math.round(ttfb)]);
    }, 900);

    return () => clearInterval(interval);
  }, [isPaused, surgeActive]);

  const toggleSurge = () => {
    sound.playClick();
    setSurgeActive(!surgeActive);
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Edge P99 TTFB</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {surgeActive ? "24 ms" : "11 ms"}
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">300+ Edge PoPs</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Throughput</span>
          <div className="text-2xl font-bold font-mono text-white">
            {surgeActive ? "142k" : "18.4k"} <span className="text-xs text-slate-400">req/s</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">HTTP/3 Multiplexed</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Cache Hit Rate</span>
          <div className="text-2xl font-bold font-mono text-sky-400">99.4%</div>
          <span className="text-[10px] text-slate-400 font-mono">Stale-While-Revalidate</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Lighthouse</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">100/100</div>
          <span className="text-[10px] text-slate-400 font-mono">Core Web Vitals Pass</span>
        </div>
      </div>

      {/* Sparkline Wave & Controls */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-white font-bold">REAL-TIME EDGE TTFB LATENCY GRAPH:</span>
            <span className="text-emerald-400 font-mono">({selectedRegion} PoP)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10">
              {["SFO", "FRA", "SIN", "LHR"].map((pop) => (
                <button
                  key={pop}
                  onClick={() => {
                    setSelectedRegion(pop);
                    sound.playClick();
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    selectedRegion === pop
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {pop}
                </button>
              ))}
            </div>
            <button
              onClick={toggleSurge}
              className={`px-3 py-1 rounded-lg border text-xs font-mono transition-colors ${
                surgeActive
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {surgeActive ? "⚡ Surge (10x)" : "Surge"}
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
          </div>
        </div>

        {/* SVG Sparkline */}
        <div className="h-24 w-full flex items-end justify-between gap-2 px-2 pt-4 bg-black/40 rounded-xl border border-white/[0.06]">
          {ttfbHistory.map((val, idx) => {
            const heightPercent = Math.min(100, (val / 30) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-slate-400">{val}ms</span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    val > 20 ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Streaming Event Feed */}
      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-2">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Streaming Server-Sent Events (SSE) Stream</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Progressive SSR via HTTP/2</span>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar text-[11px]">
          {events.map((ev) => (
            <div key={ev.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">{ev.timestamp}</span>
                <span className="text-emerald-400 font-bold">{ev.method}</span>
                <span className="text-slate-300 truncate max-w-[200px] sm:max-w-xs">{ev.path}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{ev.pop}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                  {ev.ttfb} ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 3. ORBIT-KUBE: Autonomous Kubernetes Canary Rollout Controller
// =============================================================================
function OrbitKubeSimulator() {
  const [canaryPercent, setCanaryPercent] = useState(25);
  const [p99Latency, setP99Latency] = useState(68);
  const [errorBudget, setErrorBudget] = useState(99.98);
  const [isAlert, setIsAlert] = useState(false);
  const [logs, setLogs] = useState([
    "[16:21:00] [INFO] Orbit controller initialized. Reconciling Deployment orbit-gateway.",
    "[16:21:05] [INFO] Canary target set to 25%. Shifted 3 of 12 pods to image v2.1.0-distroless.",
    "[16:21:08] [STATUS] Prometheus metrics stable: P99 = 68ms, Error budget = 99.98%.",
  ]);

  const pods = Array.from({ length: 12 }, (_, i) => {
    const isCanary = i < Math.round((canaryPercent / 100) * 12);
    return {
      id: i + 1,
      isCanary,
      status: isAlert && isCanary ? "degraded" : "running",
    };
  });

  const injectLatencySpike = () => {
    sound.playError();
    setIsAlert(true);
    setP99Latency(198);
    setErrorBudget(98.15);

    setLogs((prev) => [
      `[16:21:14] [ALERT] P99 Latency breach! 198ms exceeds threshold 150ms!`,
      `[16:21:14] [TRIGGER] Prometheus ServiceLevelObjective breach on Canary v2.1.0!`,
      `[16:21:15] [RECOVERY] Autonomous Rollback initiated! Scaling canary traffic to 0%...`,
      ...prev,
    ]);

    // Automated rollback
    setTimeout(() => {
      setCanaryPercent(0);
      setP99Latency(45);
      setErrorBudget(99.95);
      setIsAlert(false);
      sound.playSuccess();
      setLogs((prev) => [
        `[16:21:16] [COMPLETED] Instant Canary Rollback successful in 1,120ms. 100% traffic on stable v2.0.4.`,
        ...prev,
      ]);
    }, 1200);
  };

  const handleSliderChange = (val: number) => {
    setCanaryPercent(val);
    sound.playClick();
    setLogs((prev) => [
      `[CONFIG] Shifted traffic weighting: ${val}% Canary / ${100 - val}% Stable.`,
      ...prev.slice(0, 6),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Alert Warning */}
      {isAlert && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>CRITICAL: P99 LATENCY BREACH (198ms). AUTONOMOUS ROLLBACK TRIGGERED!</span>
          </div>
          <span className="font-bold">Rollback in 1.1s</span>
        </div>
      )}

      {/* Prometheus Telemetry HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 space-y-1">
          <span className="text-[10px] text-slate-400">P99 Latency</span>
          <div className="text-xl font-bold text-sky-400">{p99Latency} ms</div>
          <span className="text-[10px] text-slate-400">Target &lt; 150ms</span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
          <span className="text-[10px] text-slate-400">SLO Error Budget</span>
          <div className="text-xl font-bold text-emerald-400">{errorBudget}%</div>
          <span className="text-[10px] text-slate-400">Prometheus Alert</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400">Stable v2.0.4</span>
          <div className="text-xl font-bold text-white">{100 - canaryPercent}%</div>
          <span className="text-[10px] text-emerald-400">Healthy</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400">Canary v2.1.0</span>
          <div className="text-xl font-bold text-sky-400">{canaryPercent}%</div>
          <span className="text-[10px] text-slate-400">Traffic Weight</span>
        </div>
      </div>

      {/* Traffic Allocation Slider */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white font-bold flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Canary Traffic Allocation:</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">{100 - canaryPercent}% Stable (v2.0.4)</span>
            <span className="text-sky-400 font-bold">{canaryPercent}% Canary (v2.1.0)</span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={canaryPercent}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />

        <div className="flex justify-between text-[10px] text-slate-500">
          <span>0% (Safe Stable)</span>
          <span>50% Split</span>
          <span>100% Full Promotion</span>
        </div>
      </div>

      {/* Visual Kubernetes Pod Matrix */}
      <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-2">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span>Kubernetes Pod Cluster (12 Managed Pods)</span>
          </span>
          <button
            onClick={injectLatencySpike}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Inject Latency Anomaly</span>
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
          {pods.map((p) => (
            <div
              key={p.id}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                p.status === "degraded"
                  ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-bounce"
                  : p.isCanary
                  ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-bold">pod-{p.id}</span>
              <span className="text-[9px] opacity-75">{p.isCanary ? "v2.1.0" : "v2.0.4"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Event Log */}
      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono space-y-2">
        <span className="text-xs font-bold text-slate-300 block mb-2">kube-rs Operator Controller Log:</span>
        <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar text-[11px] text-slate-400">
          {logs.map((log, idx) => (
            <div key={idx} className="p-1.5 rounded bg-white/[0.02]">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 4. PHOTON-CANVAS: Real-Time Collaborative 3D/Spatial Canvas Sandbox
// =============================================================================
interface SpatialParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

function PhotonCanvasSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleCount, setParticleCount] = useState(35);
  const [wasmThreads, setWasmThreads] = useState(4);
  const fps = 60;
  const particlesRef = useRef<SpatialParticle[]>([]);

  // Initialize and run Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 320);

    const colors = ["#a855f7", "#ec4899", "#38bdf8", "#34d399"];

    // Populate particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      radius: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.fillStyle = "rgba(9, 12, 19, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Connect lines between nearby particles (spatial indexing simulation)
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / 90})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [particleCount]);

  const handleScatter = () => {
    sound.playClick();
    particlesRef.current.forEach((p) => {
      p.vx = (Math.random() - 0.5) * 9;
      p.vy = (Math.random() - 0.5) * 9;
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    particlesRef.current.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 5,
      color: "#f59e0b",
    });
    setParticleCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* HUD Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/25">
        <div className="flex items-center gap-2 text-purple-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>WASM OffscreenWorker Physics Engine • Click canvas to spawn spatial entities!</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">{fps}.0 FPS</span>
          <span className="text-purple-300">Compute: 0.18ms</span>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090c13] shadow-inner">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-80 block cursor-crosshair"
        />
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
          Spatial Entities: <span className="text-purple-400 font-bold">{particleCount}</span>
        </div>
      </div>

      {/* WASM Control Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-slate-400 block text-[11px]">WASM Thread Pool</span>
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-bold">{wasmThreads} Rayon Threads</span>
            <button
              onClick={() => {
                sound.playClick();
                setWasmThreads((prev) => (prev >= 8 ? 2 : prev + 2));
              }}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/15 text-[10px] text-white"
            >
              Cycle
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <span className="text-slate-400 block text-[11px]">CRDT State Sync</span>
          <div className="text-emerald-400 font-bold">Zero-Conflict Yjs Active</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
          <button
            onClick={handleScatter}
            className="w-full py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Shockwave Pulse</span>
          </button>
        </div>
      </div>
    </div>
  );
}
