"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, AlertTriangle, Server, ShieldCheck, Zap } from "lucide-react";

export interface BlueprintData {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  architectureDetails: string[];
  tradeoffs: {
    technology: string;
    whyChosen: string;
    alternativeRejected: string;
    reason: string;
  }[];
  failureModeAndMitigation: {
    failureMode: string;
    mitigation: string;
  };
  productionImpact: string[];
}

export const projectBlueprints: Record<string, BlueprintData> = {
  "aether-kv": {
    id: "aether-kv",
    title: "Aether-KV",
    subtitle: "Distributed Raft Key-Value Storage Engine",
    problem:
      "Modern web and financial backends require linearizable state storage that can sustain 200,000+ operations/sec while guaranteeing strictly bounded tail latency under 1ms, even when cloud network jitter occurs.",
    architectureDetails: [
      "LSM-Tree (Log-Structured Merge Tree) storage hierarchy with MemTable in-memory skiplist and immutable SSTables on NVMe.",
      "Custom Raft consensus state machine utilizing Tokio asynchronous actors with work-stealing thread pools.",
      "Linux io_uring kernel ring buffers for zero-copy disk writes, bypassing traditional synchronous pwrite syscall overhead.",
      "gRPC binary transport layer with Protocol Buffers for cross-node heartbeats and chunked log replication."
    ],
    tradeoffs: [
      {
        technology: "Rust (over Go)",
        whyChosen: "Deterministic zero-cost memory management with zero Garbage Collection pauses.",
        alternativeRejected: "Go / JVM",
        reason: "Go's runtime GC sweep cycles caused unacceptable 15-30ms tail latency spikes at P99 under 100k open socket connections."
      },
      {
        technology: "io_uring (over epoll + thread pool)",
        whyChosen: "Single syscall submission for batch operations with kernel-level asynchronous completion.",
        alternativeRejected: "Standard POSIX threads",
        reason: "Eliminated context-switching CPU thrashing across 64 worker threads, saving 38% CPU overhead."
      }
    ],
    failureModeAndMitigation: {
      failureMode: "Network Partition Split-Brain: A network isolate could attempt to commit stale leader logs.",
      mitigation: "Pre-vote Raft extension implemented: nodes must verify reachability with a quorum before incrementing elections, preventing disruption from partitioned nodes."
    },
    productionImpact: [
      "Sustained 240,000 requests/sec with P99 latency of 0.85ms.",
      "Memory footprint bounded at 14MB under 100k idle client connections.",
      "Zero data loss across simulated chaos monkey kill signals."
    ]
  },
  "hyperion-next": {
    id: "hyperion-next",
    title: "Hyperion Platform",
    subtitle: "Streaming Edge Telemetry & Analytics Dashboard",
    problem:
      "Enterprise operations teams required instantaneous global dashboards processing high-frequency metrics feeds without multi-megabyte JavaScript bundles freezing client browsers on mobile or low-spec devices.",
    architectureDetails: [
      "Next.js 14 App Router architecture dividing the app into Server Component data orchestrators and client-side reactive leaves.",
      "Chunked transfer-encoding streaming SSR with Suspense: critical navigation renders in < 15ms while long-running analytics queries stream asynchronously.",
      "Cloudflare Edge Middleware inspecting JWTs and geo-routing requests to nearest regional replicas before hitting origin servers.",
      "Lightweight canvas shaders handling 60 FPS real-time graph rendering without DOM node churn."
    ],
    tradeoffs: [
      {
        technology: "React Server Components (over traditional SPA Client Fetch)",
        whyChosen: "Zero-bundle database drivers and direct backend streaming to client.",
        alternativeRejected: "Vite SPA with Client React-Query",
        reason: "Client SPA had a 1.2MB initial JS bundle and a 3-step waterfall (HTML -> JS bundle -> Auth check -> API fetch). RSC reduced initial payload by 45%."
      },
      {
        technology: "Edge Middleware (over Origin Gateway)",
        whyChosen: "Sub-5ms authentication validation and localized regional cache hits.",
        alternativeRejected: "Centralized AWS Nginx Ingress",
        reason: "Eliminated transatlantic network latency for European and Asian users accessing US origin databases."
      }
    ],
    failureModeAndMitigation: {
      failureMode: "Slow Regional Upstream APIs causing blank screens or blocked HTML delivery.",
      mitigation: "Suspense boundaries with predictive micro-skeletons: the page shell hydrates immediately, and individual slow data cards resolve independently without delaying navigation."
    },
    productionImpact: [
      "100/100 Lighthouse Performance score with zero Cumulative Layout Shift (CLS).",
      "Average TTFB reduced from 340ms down to 12ms globally.",
      "45% client-side JavaScript bundle size reduction."
    ]
  },
  "orbit-kube": {
    id: "orbit-kube",
    title: "Orbit-Kube",
    subtitle: "Autonomous Kubernetes Canary Rollout Controller",
    problem:
      "Human-managed deployments and rigid shell scripts caused intermittent downtime during major version upgrades, with delayed rollback when silent regressions occurred in production microservices.",
    architectureDetails: [
      "Custom Kubernetes Controller built with Rust using kube-rs, watching Pod lifecycle events via the API server stream.",
      "Real-time eBPF socket tracing monitoring HTTP 5xx error budgets and TCP retransmit rates directly at the Linux kernel level.",
      "Automated multi-stage traffic shifting (10% -> 25% -> 50% -> 100%) synchronized with Prometheus health telemetry.",
      "Distroless scratch Docker images containing purely static musl ELF binaries for maximum attack surface reduction."
    ],
    tradeoffs: [
      {
        technology: "Rust kube-rs (over Go client-go)",
        whyChosen: "Guaranteed memory footprint under 20MB with zero runtime panics.",
        alternativeRejected: "Go Operator SDK",
        reason: "Running operators in every cluster node benefited from an 80% reduction in memory usage compared to standard Go operators."
      },
      {
        technology: "eBPF Socket Telemetry (over Sidecar Proxies)",
        whyChosen: "Kernel-level visibility with zero packet injection latency.",
        alternativeRejected: "Envoy Sidecar Injection (Service Mesh)",
        reason: "Avoided doubling memory consumption per Pod and eliminated 2ms proxy hop latency per internal RPC."
      }
    ],
    failureModeAndMitigation: {
      failureMode: "Silent Memory Leak in new canary version not captured by HTTP error rates.",
      mitigation: "Integrated cgroup memory slope monitoring: if the canary container's RSS memory trajectory exceeds nominal by > 20%, an automated instant rollback triggers before OOMKilled events occur."
    },
    productionImpact: [
      "Zero-downtime rolling updates across 450+ production pods.",
      "Automated rollback triggered in < 1.2 seconds upon metric degradation.",
      "Distroless container image size compressed to 18.2 MB."
    ]
  },
  "photon-canvas": {
    id: "photon-canvas",
    title: "Photon-Canvas",
    subtitle: "Real-Time Collaborative Spatial 3D Canvas",
    problem:
      "Multi-user 3D collaborative spatial workspaces suffer from main-thread frame drops when complex physics calculations and network packet reconciliation compete with rendering.",
    architectureDetails: [
      "Rust physics and collision calculation engine compiled into WebAssembly (WASM).",
      "Web Workers running WASM simulation in the background using SharedArrayBuffer for zero-copy memory exchange.",
      "Three.js frontend connected via OffscreenCanvas for uninterrupted 60 FPS rendering.",
      "Yjs conflict-free replicated data types (CRDTs) over WebSockets ensuring deterministic eventual consistency without centralized locking."
    ],
    tradeoffs: [
      {
        technology: "Rust WASM Web Worker (over JavaScript Main Thread)",
        whyChosen: "Near-native SIMD math execution isolated from UI thread.",
        alternativeRejected: "Pure JavaScript Canvas Physics",
        reason: "JavaScript physics suffered from garbage collection pauses and dropped frames whenever > 50 concurrent entities interacted."
      },
      {
        technology: "CRDT State Sync (over Centralized Redis Locks)",
        whyChosen: "Peer-to-peer eventual consistency allowing offline changes without conflict.",
        alternativeRejected: "Operational Transformation (OT)",
        reason: "CRDTs handled network jitter and out-of-order packet delivery without requiring central server lock arbitration."
      }
    ],
    failureModeAndMitigation: {
      failureMode: "High-latency clients experiencing rubber-banding or spatial desync.",
      mitigation: "Client-side prediction with hermite spline interpolation: local changes render with zero perceptual lag and reconcile smoothly once remote state arrives."
    },
    productionImpact: [
      "Maintained constant 60 FPS even with 50+ concurrent active spatial collaborators.",
      "WASM compute benchmarked 4.8x faster than equivalent JavaScript algorithms.",
      "State reconciliation latency under 18ms over standard WebSockets."
    ]
  }
};

interface ArchitectureModalProps {
  blueprintId: string | null;
  onClose: () => void;
}

export default function ArchitectureModal({ blueprintId, onClose }: ArchitectureModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!blueprintId) return null;
  const data = projectBlueprints[blueprintId];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0f15] border border-white/15 p-6 sm:p-8 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-1">
              SYSTEM ARCHITECTURE &amp; PRODUCTION BLUEPRINT
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {data.title}
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              {data.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close blueprint modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="space-y-8 text-sm">
          {/* Section 1: The Problem & Scale */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>01 / The Engineering Problem &amp; Scale</span>
            </h4>
            <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
              {data.problem}
            </p>
          </div>

          {/* Section 2: Architecture Data Flow */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>02 / System Implementation &amp; Data Flow</span>
            </h4>
            <div className="space-y-2">
              {data.architectureDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-white/5 text-slate-400 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Engineering Trade-offs (What international tech leads look for) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>03 / Key Technical Trade-Offs (Why Chosen vs Rejected)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.tradeoffs.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{t.technology}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Advantage:</strong> {t.whyChosen}
                  </p>
                  <div className="pt-2 border-t border-white/[0.05] text-xs text-slate-400">
                    <span className="text-rose-400 font-medium">Alternative Rejected: {t.alternativeRejected}</span>
                    <p className="mt-1">{t.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Failure Mode & Mitigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>04 / Production Failure Mode &amp; Mitigation</span>
            </h4>
            <div className="p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 text-xs space-y-2">
              <div className="text-rose-300 font-semibold">
                Risk: {data.failureModeAndMitigation.failureMode}
              </div>
              <div className="text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-semibold">Mitigation Strategy: </span>
                {data.failureModeAndMitigation.mitigation}
              </div>
            </div>
          </div>

          {/* Section 5: Production Impact Metrics */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>05 / Verified Production Results</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.productionImpact.map((impact, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold block mb-1">Result #{idx + 1}</span>
                  {impact}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
