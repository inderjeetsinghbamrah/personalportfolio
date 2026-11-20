"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Server, 
  Code2 
} from "lucide-react";
import { sound } from "@/lib/sound";

export default function StackDeepDive() {
  const [activeTab, setActiveTab] = useState<"frontend" | "rust" | "devops">("frontend");

  // Interactive Widget 1: Streaming SSR Simulator
  const [streamingChunks, setStreamingChunks] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const runStreamingSim = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamingChunks([]);

    const chunks = [
      "HTTP/2 200 OK — Edge CDN Node (Frankfurt)",
      "<header> Hydrating Global Nav & Layout (0.3ms)",
      "<Suspense> Resolving DB Query across Edge Worker...",
      "<main> Server Component rendered stream: 12,400 records",
      "<script> Hydration complete. Total TTFB: 14.2ms"
    ];

    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        setStreamingChunks((prev) => [...prev, chunk]);
        if (index === chunks.length - 1) {
          setIsStreaming(false);
        }
      }, (index + 1) * 300);
    });
  };

  // Interactive Widget 2: Rust Borrow Checker Simulator
  const [borrowMode, setBorrowMode] = useState<"valid_read" | "valid_mut" | "race_error">("valid_read");

  // Interactive Widget 3: Live Canary Deployment Pipeline
  const [deployStep, setDeployStep] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  const runCanaryDeployment = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeployStep(1);
    setDeployLogs(["[PIPELINE] Initializing GitHub Actions runner..."]);

    const steps = [
      { step: 2, msg: "[CARGO] cargo test --release (184 passed in 1.2s)" },
      { step: 3, msg: "[DOCKER] Static musl binary compressed: 18.2MB" },
      { step: 4, msg: "[K8S] Rolling canary update: 10% -> 50% -> 100%" },
      { step: 5, msg: "[EDGE] Global CDN cache invalidated across 32 PoPs." }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setDeployStep(s.step);
        setDeployLogs((prev) => [...prev, s.msg]);

        if (idx === steps.length - 1) {
          setIsDeploying(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <section id="stack" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Section Header with protective frosted contrast & ambient reading shield */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0a0d14]/85 backdrop-blur-xl border border-white/[0.08] mb-12 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-semibold tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>02 // ARCHITECTURE &amp; RUNTIME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How I Build Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal mt-2 leading-relaxed">
            A breakdown of architectural decisions across frontend reactivity, low-level backend performance, and deployment infrastructure.
          </p>
        </div>

        {/* Tab Switcher with dark frosted shield */}
        <div className="flex items-center bg-[#07090f]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/[0.1] gap-1 shadow-inner">
          <button
            onClick={() => {
              setActiveTab("frontend");
              sound.playClick();
              window.dispatchEvent(
                new CustomEvent("set-architecture-stage", { detail: { stageIndex: 1 } })
              );
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "frontend"
                ? "bg-white/15 text-white shadow-sm font-semibold border border-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            React &amp; Next.js
          </button>
          <button
            onClick={() => {
              setActiveTab("rust");
              sound.playClick();
              window.dispatchEvent(
                new CustomEvent("set-architecture-stage", { detail: { stageIndex: 2 } })
              );
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "rust"
                ? "bg-white/15 text-white shadow-sm font-semibold border border-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Rust Systems
          </button>
          <button
            onClick={() => {
              setActiveTab("devops");
              sound.playClick();
              window.dispatchEvent(
                new CustomEvent("set-architecture-stage", { detail: { stageIndex: 3 } })
              );
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === "devops"
                ? "bg-white/15 text-white shadow-sm font-semibold border border-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            DevOps &amp; Cloud
          </button>
        </div>
      </div>

      {/* --- TAB 1: REACT & NEXT.JS --- */}
      {activeTab === "frontend" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="card-clean p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3">
                Server-Driven React &amp; Modern Next.js Architecture
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                I leverage <strong className="text-white">React Server Components (RSC)</strong> and streaming SSR to minimize client JavaScript bundle size and push compute to the edge. Dynamic content streams progressively through Suspense boundaries without blocking the main browser thread.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  "React Server Components (RSC)",
                  "Streaming SSR & Suspense",
                  "Next.js App Router & Server Actions",
                  "Edge Middleware & Caching",
                  "Zustand State Architecture",
                  "Three.js & WebGL Spatial Shaders",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="card-clean p-5 rounded-2xl font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-3 mb-3 border-b border-white/[0.06]">
                <span className="flex items-center gap-2 text-white">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>app/api/stream/route.ts</span>
                </span>
                <span className="text-[11px] text-emerald-400">RUNTIME: EDGE</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px]">
{`export const runtime = 'edge';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  (async () => {
    for await (const chunk of fetchRustTelemetryStream()) {
      await writer.write(encoder.encode(JSON.stringify(chunk) + '\\n'));
    }
    await writer.close();
  })();

  return new Response(stream.readable, {
    headers: { 'Content-Type': 'application/x-ndjson' }
  });
}`}
              </pre>
            </div>
          </div>

          {/* Right Column: Streaming Playground */}
          <div className="lg:col-span-5 card-clean p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                  INTERACTIVE STREAMING TEST
                </span>
                <button
                  onClick={runStreamingSim}
                  disabled={isStreaming}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3 h-3" />
                  <span>{isStreaming ? "Streaming..." : "Run Test"}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Click &quot;Run Test&quot; to inspect how chunked HTTP/2 transfer encoding delivers data to the client with sub-15ms TTFB:
              </p>

              <div className="bg-black/60 rounded-xl p-4 border border-white/[0.06] font-mono text-xs min-h-[200px] flex flex-col gap-2">
                {streamingChunks.length === 0 ? (
                  <div className="text-slate-500 italic m-auto text-center">
                    Awaiting trigger. Press &quot;Run Test&quot; above.
                  </div>
                ) : (
                  streamingChunks.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-emerald-400 select-none">&gt;</span>
                      <span className="break-all">{line}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Status: {isStreaming ? "Active Stream" : "Idle"}</span>
              <span className="text-emerald-400 font-medium">TTFB: 14.2ms</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: RUST SYSTEMS --- */}
      {activeTab === "rust" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="card-clean p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3">
                Rust Systems &amp; Concurrency Without Data Races
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Rust allows writing systems with C/C++ execution speeds while eliminating memory corruption, buffer overflows, and multi-threaded data races at compile time. I use Rust for high-throughput distributed microservices and WebAssembly compute engines.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  "Tokio Async Work-Stealing Runtime",
                  "Zero-Cost Abstractions & RAII",
                  "Axum & Actix-Web Microservices",
                  "WebAssembly (WASM) Client Compute",
                  "Rayon Data Parallelism",
                  "io_uring Asynchronous Linux I/O",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="card-clean p-5 rounded-2xl font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-3 mb-3 border-b border-white/[0.06]">
                <span className="flex items-center gap-2 text-white">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>src/worker.rs (Async Reactor)</span>
                </span>
                <span className="text-[11px] text-amber-400">RUST 2024</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px]">
{`use tokio::sync::mpsc;

pub async fn spawn_worker(mut rx: mpsc::Receiver<Task>) {
    tokio::spawn(async move {
        while let Some(task) = rx.recv().await {
            tokio::task::spawn_blocking(move || {
                task.process_simd();
            });
        }
    });
}`}
              </pre>
            </div>
          </div>

          {/* Right Column: Borrow Checker Test */}
          <div className="lg:col-span-5 card-clean p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                  BORROW CHECKER TEST
                </span>
                <span className="text-[11px] text-slate-400 font-mono">cargo check</span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Select a memory reference pattern to see how the compiler validates thread safety:
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <button
                  onClick={() => setBorrowMode("valid_read")}
                  className={`w-full p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    borrowMode === "valid_read"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-medium"
                      : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white"
                  }`}
                >
                  <span>1. Multiple Immutable References (&amp;T, &amp;T)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>

                <button
                  onClick={() => setBorrowMode("valid_mut")}
                  className={`w-full p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    borrowMode === "valid_mut"
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300 font-medium"
                      : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white"
                  }`}
                >
                  <span>2. Exclusive Mutable Reference (&amp;mut T)</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => setBorrowMode("race_error")}
                  className={`w-full p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    borrowMode === "race_error"
                      ? "border-rose-500/40 bg-rose-500/10 text-rose-300 font-medium"
                      : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white"
                  }`}
                >
                  <span>3. Concurrent Read + Write Hazard</span>
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                </button>
              </div>

              <div className="bg-black/60 rounded-xl p-4 border border-white/[0.06] font-mono text-xs min-h-[140px]">
                {borrowMode === "valid_read" && (
                  <div className="space-y-1 text-emerald-400 text-[11px]">
                    <div>$ cargo check</div>
                    <div className="text-slate-300">Finished dev profile in 0.28s</div>
                    <div className="text-slate-400 mt-2">
                      {"// PASS: Multiple readers are completely thread-safe simultaneously."}
                    </div>
                  </div>
                )}

                {borrowMode === "valid_mut" && (
                  <div className="space-y-1 text-amber-400 text-[11px]">
                    <div>$ cargo check</div>
                    <div className="text-slate-300">Finished dev profile in 0.31s</div>
                    <div className="text-slate-400 mt-2">
                      {"// PASS: Single mutable borrow guarantees exclusive, deterministic ownership."}
                    </div>
                  </div>
                )}

                {borrowMode === "race_error" && (
                  <div className="space-y-1 text-rose-400 text-[11px]">
                    <div className="font-bold">error[E0502]: cannot borrow as mutable because it is also borrowed as immutable</div>
                    <div className="text-slate-400 mt-2">
                      {"// CAUGHT AT COMPILE TIME: Zero chance of runtime data races in production."}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Garbage Collection: 0ms</span>
              <span className="text-amber-400 font-medium">Memory Safe</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: DEVOPS & INFRASTRUCTURE --- */}
      {activeTab === "devops" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="card-clean p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3">
                Cloud-Native Infrastructure &amp; Automated Deployments
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Code is only as effective as its operational reliability. I build distroless Docker multi-stage containers, manage Kubernetes cluster deployments with automated rolling canaries, and configure infrastructure declaratively via Terraform.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  "Docker Distroless Multi-Stage Builds",
                  "Kubernetes (K8s) StatefulSets & Ingress",
                  "Automated Zero-Downtime Canaries",
                  "GitHub Actions CI/CD Workflows",
                  "Prometheus & Grafana Observability",
                  "Terraform Infrastructure as Code",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="card-clean p-5 rounded-2xl font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-3 mb-3 border-b border-white/[0.06]">
                <span className="flex items-center gap-2 text-white">
                  <Server className="w-4 h-4 text-sky-400" />
                  <span>k8s/canary-deployment.yaml</span>
                </span>
                <span className="text-[11px] text-sky-400">APPS/V1</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto leading-relaxed text-[11px]">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-canary
spec:
  replicas: 12
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: rust-kernel
        image: ghcr.io/inderjeet/kernel:v2.4
        resources:
          limits: { memory: "64Mi", cpu: "200m" }`}
              </pre>
            </div>
          </div>

          {/* Right Column: Deployment Simulator */}
          <div className="lg:col-span-5 card-clean p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                  CANARY PIPELINE SIMULATOR
                </span>
                <button
                  onClick={runCanaryDeployment}
                  disabled={isDeploying}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3 h-3" />
                  <span>{isDeploying ? "Deploying..." : "Trigger Rollout"}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Simulate a zero-downtime rolling canary update across stages:
              </p>

              <div className="space-y-2 mb-4 text-xs font-mono">
                {[
                  { step: 1, label: "01. Provision CI Runner" },
                  { step: 2, label: "02. Cargo Test Suite (184 Passed)" },
                  { step: 3, label: "03. Docker Scratch Image (18MB)" },
                  { step: 4, label: "04. K8s Rolling Canary Rollout" },
                  { step: 5, label: "05. Global Edge CDN Invalidation" }
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      deployStep >= s.step
                        ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
                        : "border-white/[0.06] bg-white/[0.02] text-slate-500"
                    }`}
                  >
                    <span>{s.label}</span>
                    {deployStep >= s.step ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-black/60 rounded-xl p-3 border border-white/[0.06] font-mono text-[11px] min-h-[90px] space-y-1">
                {deployLogs.length === 0 ? (
                  <div className="text-slate-500 italic text-center py-4">
                    Ready to deploy. Press &quot;Trigger Rollout&quot; above.
                  </div>
                ) : (
                  deployLogs.map((log, i) => (
                    <div key={i} className="text-slate-300 flex items-start gap-1.5">
                      <span className="text-sky-400">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Zero Dropped Requests</span>
              <span className="text-sky-400 font-medium">Uptime: 99.999%</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
