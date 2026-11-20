"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw } from "lucide-react";
import { getPortfolioData } from "@/lib/portfolio-data";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      text: "Inderjeet Systems Shell (x86_64-linux)",
    },
    {
      type: "system",
      text: "Type 'help' to view commands, or click any shortcut below.",
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the internal terminal container, NEVER the window viewport
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [{ type: "input", text: `$ ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case "help":
        newLines.push({
          type: "output",
          text: `Available commands:
  whoami    - Developer profile & engineering background
  stack     - Technologies used across React, Next.js, Rust, DevOps
  rust      - Run a simulated Rust SIMD benchmark
  deploy    - Simulate edge canary deployment
  projects  - List of selected systems projects
  anim      - Switch 3D background visual engine (stream|horizon|mesh|globe)
  supabase  - Check live Supabase cloud database connection
  contact   - Display communication channels
  clear     - Clear terminal screen`,
        });
        break;

      case "anim":
      case "engine":
        newLines.push({
          type: "output",
          text: `3D Visual Engines:
  • anim stream   - Tokio Concurrency Streams (Default: Serene multi-threaded flow)
  • anim horizon  - Systems Horizon (Mathematical wave matrix, 100% reading space clarity)
  • anim mesh     - Cluster Service DAG (Distributed microservice topology)
  • anim globe    - Global Edge Infrastructure (Worldwide CDN edge nodes)
Usage: Type 'anim horizon', 'anim stream', 'anim mesh', or 'anim globe'.`,
        });
        break;

      case "anim stream":
      case "engine stream":
        window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: "stream" }));
        localStorage.setItem("portfolio_visual_engine", "stream");
        newLines.push({
          type: "output",
          text: `[Visual Engine] Switched to Tokio Concurrency Streams (Serene async flow).`,
        });
        break;

      case "anim horizon":
      case "engine horizon":
        window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: "horizon" }));
        localStorage.setItem("portfolio_visual_engine", "horizon");
        newLines.push({
          type: "output",
          text: `[Visual Engine] Switched to Systems Horizon (Digital topological matrix).`,
        });
        break;

      case "anim mesh":
      case "engine mesh":
        window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: "mesh" }));
        localStorage.setItem("portfolio_visual_engine", "mesh");
        newLines.push({
          type: "output",
          text: `[Visual Engine] Switched to Cluster Service DAG (Distributed microservices).`,
        });
        break;

      case "anim globe":
      case "engine globe":
        window.dispatchEvent(new CustomEvent("set-visual-engine", { detail: "globe" }));
        localStorage.setItem("portfolio_visual_engine", "globe");
        newLines.push({
          type: "output",
          text: `[Visual Engine] Switched to Global Edge Infrastructure (CDN nodes & conduits).`,
        });
        break;

      case "whoami": {
        const pData = getPortfolioData();
        newLines.push({
          type: "output",
          text: `Developer: ${pData.profile.name}
Role: ${pData.profile.role}
Status: ${pData.profile.statusBadge}
Timezone: ${pData.profile.timezoneOverlap}
Contact: ${pData.profile.email}`,
        });
        break;
      }

      case "stack":
        newLines.push({
          type: "output",
          text: `Frontend:   React 19, Next.js 14 (App Router), RSC, Streaming SSR, Three.js, Tailwind
Backend:    Rust (2024 Edition), Tokio, Axum, Actix, Serde, WebAssembly, io_uring
DevOps:     Docker Distroless, Kubernetes (K8s), Helm, Terraform, GitHub Actions, eBPF`,
        });
        break;

      case "rust":
        newLines.push({
          type: "output",
          text: `[Benchmark] Executing 1,000,000 SIMD Float Operations in Rust:
  • Parallel Rayon iterators completed in 1.42 ms.
  • Zero multi-threaded data races (verified by borrow checker).
  • Zero garbage collection latency overhead.
  • Status: PASS`,
        });
        break;

      case "deploy":
        newLines.push({
          type: "output",
          text: `[Canary Deployment Initiated]
  • Checking image: ghcr.io/inderjeet/api:v2.4
  • Rolling canary update: 10% -> 50% -> 100%
  • Global Edge CDN cache purged across 32 PoPs.
  • Zero dropped connections. Cluster health: 100% NOMINAL.`,
        });
        break;

      case "projects": {
        const pData = getPortfolioData();
        const listStr = pData.projects
          .map((p, idx) => `${idx + 1}. ${p.title} - ${p.subtitle} (${p.stack.slice(0, 2).join(", ")})`)
          .join("\n");
        newLines.push({
          type: "output",
          text: listStr || "No projects loaded.",
        });
        break;
      }

      case "admin":
      case "sudo":
      case "sudo admin":
      case "override":
        newLines.push({
          type: "system",
          text: `[SYSTEMS OVERRIDE DETECTED]
  • Secret Route: /admin
  • Redirecting to Owner Control Console...`,
        });
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
        break;

      case "supabase":
      case "db":
        newLines.push({
          type: "output",
          text: `[DATABASE INFRASTRUCTURE]
  • Engine:        PostgreSQL with Row Level Security (RLS)
  • Architecture:  Multi-Region Distributed State
  • Caching:       Redis In-Memory Tier (< 5ms read latency)
  • Auth Guard:    PBKDF2-SHA512 + Strict HttpOnly Session Cookies
  • Security:      Modern Publishable Key & Server Secret Isolation
  • Status:        ONLINE & SECURED (TLS 1.3)`,
        });
        break;

      case "contact":
        newLines.push({
          type: "output",
          text: `Contact protocols:
  Email:  inderjeet@systems.dev
  GitHub: github.com/inderjeet`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLines.push({
          type: "error",
          text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`,
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <section id="terminal" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="mb-8 border-b border-white/[0.08] pb-6">
        <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider mb-2">
          05 / INTERACTIVE SHELL
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          System Console
        </h2>
        <p className="text-base text-slate-400 font-normal mt-2 max-w-xl">
          An interactive command-line interface to inspect system telemetry, run simulated benchmarks, or learn more about my background.
        </p>
      </div>

      {/* Terminal Container */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0e14]/90 shadow-xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
            <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>inderjeet@systems-core: ~ (zsh)</span>
            </span>
          </div>

          <button
            onClick={() => setHistory([])}
            title="Clear terminal"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Shortcuts Bar */}
        <div className="px-5 py-2.5 bg-black/40 border-b border-white/[0.04] flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 text-[11px]">Shortcuts:</span>
          {["help", "supabase", "stack", "rust", "deploy", "anim", "whoami", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded-md bg-white/[0.03] hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.06] transition-colors text-xs"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Area (Isolated Scroll Container) */}
        <div 
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="p-5 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto font-mono text-xs sm:text-sm space-y-2 cursor-text"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed whitespace-pre-wrap">
              {line.type === "input" && (
                <div className="text-white font-medium flex items-start gap-2">
                  <span className="text-emerald-400">&gt;</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.type === "output" && (
                <div className="text-slate-300 pl-4">{line.text}</div>
              )}
              {line.type === "system" && (
                <div className="text-slate-400 text-xs">{line.text}</div>
              )}
              {line.type === "error" && (
                <div className="text-rose-400 pl-4">{line.text}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-white font-medium pt-1">
            <span className="text-emerald-400">&gt;</span>
            <span className="text-slate-500 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white font-mono text-xs sm:text-sm placeholder:text-slate-600"
              placeholder="Type a command ('help', 'stack', 'rust')..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
