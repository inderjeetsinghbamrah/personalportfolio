"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Terminal as TerminalIcon, Send, Database, Play, Copy, Check } from "lucide-react";
import SectorGate from "@/components/character/SectorGate";

interface DevPlaygroundProps {
  onOpenResume: () => void;
}

export default function DeveloperPlayground({ onOpenResume }: DevPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "api" | "erd">("terminal");

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [terminalOutput, setTerminalOutput] = useState<Array<{ cmd: string; res: string | React.ReactNode }>>([
    {
      cmd: "init",
      res: "ISB Engineering Terminal Simulator v2.6. Type 'help' to inspect supported commands.",
    },
  ]);

  // API Explorer state
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("/api/profile");
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string>(
    JSON.stringify(
      {
        status: "ok",
        data: {
          name: "Inderjeet Singh Bamrah",
          role: "Full-Stack Developer | Software Architect | UI/UX Designer | Product Engineer",
          positioning: "I design thoughtful digital experiences and engineer scalable software systems.",
        },
      },
      null,
      2
    )
  );
  const [apiLatency, setApiLatency] = useState<string>("14ms");
  const [copied, setCopied] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalOutput]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = terminalInput.trim();
    if (!rawCmd) return;

    sound.playTick();
    const cmd = rawCmd.toLowerCase();
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setTerminalInput("");

    let res: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        res = (
          <div className="space-y-1 text-slate-300">
            <div>Available Commands:</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">about</span>: Personal background, education, and philosophy</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">skills</span> / <span className="text-indigo-400 font-semibold">stack</span>: Full technology ecosystem breakdown</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">projects</span>: Production case studies and live sandboxes</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">cat resume</span>: Open verified engineering resume</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">contact</span>: Direct communication channels</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">ping</span>: Cloud edge heartbeat check</div>
            <div>&bull; <span className="text-indigo-400 font-semibold">clear</span>: Clear terminal console</div>
          </div>
        );
        break;

      case "about":
        res = "Inderjeet Singh Bamrah — Full-Stack Developer & Software Architect. B.Tech in IT, M.Tech in CS/IT. Currently Lecturer in Information Technology. Positioning: 'I design thoughtful digital experiences and engineer scalable software systems.'";
        break;

      case "skills":
      case "stack":
        res = "Frontend: React, Next.js 14, TypeScript, Tailwind CSS, Figma | Backend: Node.js, Express, Rust, REST APIs | Database: PostgreSQL 17, Supabase, Redis, Prisma | Infrastructure: Docker, Kubernetes, GitHub Actions CI/CD.";
        break;

      case "projects":
        res = "Featured Projects: 1. EDUOBAL (NBA/NAAC Outcome-Based Education SaaS) | 2. SysFlow (Distributed DAG Task Runner) | 3. DevPulse (Edge Telemetry Pipeline) | 4. PrismUI (Accessible Design Tokens).";
        break;

      case "cat resume":
      case "resume":
        res = "Opening interactive resume modal...";
        onOpenResume();
        break;

      case "contact":
        res = "Direct channels: Email: inderjeet.bamrah@gmail.com | GitHub: github.com/inderjeetsingh | LinkedIn: linkedin.com/in/inderjeetsinghbamrah";
        break;

      case "ping":
        res = "PONG: 64 bytes from edge.isb.dev: icmp_seq=1 ttl=58 time=12.4 ms";
        break;

      case "clear":
        setTerminalOutput([]);
        return;

      default:
        res = `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;
        break;
    }

    setTerminalOutput((prev) => [...prev, { cmd: rawCmd, res }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput("");
      }
    }
  };

  const handleSendApiRequest = async () => {
    sound.playTick();
    setApiLoading(true);
    const start = performance.now();
    try {
      if (selectedEndpoint === "/api/obe-calc") {
        const res = await fetch("/api/obe-calc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseCode: "CS401", thresholdPercentage: 60 }),
        });
        const data = await res.json();
        setApiResponse(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch(selectedEndpoint);
        const data = await res.json();
        setApiResponse(JSON.stringify(data, null, 2));
      }
      const dur = Math.round(performance.now() - start);
      setApiLatency(`${dur}ms`);
      sound.playSuccess();
    } catch {
      setApiResponse(JSON.stringify({ error: "Failed to dispatch request." }, null, 2));
      setApiLatency("ERR");
    } finally {
      setApiLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(apiResponse);
    setCopied(true);
    sound.playTick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sector Gate 07: Developer Playground */}
        <SectorGate
          sectorId="playground"
          actionButton={{
            label: "Send Live API Request",
            onClick: handleSendApiRequest,
          }}
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>07 // DEVELOPER PLAYGROUND & LIVE API EXPLORER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Developer Tooling Suite
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Safe local interactive utilities: sandbox terminal simulator, live REST endpoint tester, and PostgreSQL relational schema ERD browser.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex items-center gap-2 bg-[#0E1017] p-1.5 rounded-xl border border-white/[0.08]">
            {[
              { id: "terminal", label: "Terminal Shell" },
              { id: "api", label: "Live API Runner" },
              { id: "erd", label: "Database Schema ERD" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Terminal Shell Experience */}
        {activeTab === "terminal" && (
          <div className="rounded-2xl bg-[#090B10] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-3 bg-[#0F1219] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-slate-400">inderjeet@systems-lab: ~</span>
              </div>
              <span className="text-[11px] text-slate-500">BASH SIMULATOR (SAFE SANDBOX)</span>
            </div>

            {/* Terminal Log Output */}
            <div className="p-5 sm:p-6 min-h-[300px] max-h-[420px] overflow-y-auto space-y-4">
              {terminalOutput.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                    <span className="text-slate-500">guest@isb-lab:~$</span>
                    <span>{item.cmd}</span>
                  </div>
                  <div className="text-slate-300 pl-4">{item.res}</div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={handleCommandSubmit}
              className="px-4 py-3 bg-[#0C0E14] border-t border-white/[0.08] flex items-center gap-2"
            >
              <span className="text-indigo-400 font-bold shrink-0">guest@isb-lab:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'projects', 'about', 'stack', 'cat resume'..."
                className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs sm:text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 rounded text-slate-400 hover:text-white"
                aria-label="Execute Command"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. Live API Request Explorer */}
        {activeTab === "api" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedEndpoint === "/api/obe-calc" ? "POST" : "GET"}
                </span>
                <select
                  value={selectedEndpoint}
                  onChange={(e) => {
                    sound.playTick();
                    setSelectedEndpoint(e.target.value);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141824] border border-white/[0.1] text-xs font-mono text-white focus:outline-none"
                >
                  <option value="/api/profile">GET /api/profile (Personal Identity)</option>
                  <option value="/api/projects">GET /api/projects (Project List)</option>
                  <option value="/api/obe-calc">POST /api/obe-calc (OBE Attainment Calculator)</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-slate-400">
                  LATENCY: <span className="text-emerald-400 font-bold">{apiLatency}</span>
                </div>
                <button
                  onClick={handleSendApiRequest}
                  disabled={apiLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold disabled:opacity-50 transition-colors"
                >
                  <Play className={`w-3.5 h-3.5 ${apiLoading ? "animate-spin" : "fill-current"}`} />
                  <span>{apiLoading ? "Executing..." : "Send Request"}</span>
                </button>
              </div>
            </div>

            {/* Response Display */}
            <div className="relative">
              <div className="flex items-center justify-between pb-2 text-xs font-mono text-slate-400">
                <span>HTTP 200 OK &bull; CONTENT-TYPE: APPLICATION/JSON</span>
                <button
                  onClick={copyResponse}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy JSON"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.06] text-xs font-mono text-emerald-300 overflow-x-auto max-h-[350px]">
                {apiResponse}
              </pre>
            </div>
          </div>
        )}

        {/* 3. Database ERD Explorer */}
        {activeTab === "erd" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <Database className="w-4 h-4" />
                <span>POSTGRESQL 17 ENTITY-RELATIONSHIP ARCHITECTURE</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                ROW LEVEL SECURITY ENABLED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  table: "public.profiles",
                  keys: ["id: UUID (PK)", "slug: TEXT (UNIQUE)", "full_name: TEXT", "headline: TEXT", "interests: JSONB", "philosophy: JSONB"],
                  rls: "Public SELECT / Admin UPDATE",
                },
                {
                  table: "public.projects",
                  keys: ["id: UUID (PK)", "slug: TEXT (UNIQUE)", "title: TEXT", "category_id: UUID (FK)", "architecture: JSONB", "technologies: JSONB"],
                  rls: "Public SELECT (is_published=true)",
                },
                {
                  table: "public.contact_messages",
                  keys: ["id: UUID (PK)", "name: TEXT", "email: TEXT", "focus: TEXT", "message: TEXT", "ip_address: TEXT"],
                  rls: "Public INSERT only / Admin SELECT",
                },
              ].map((schema, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/[0.08] space-y-3 font-mono text-xs">
                  <div className="font-bold text-indigo-400 pb-2 border-b border-white/[0.06]">
                    {schema.table}
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    {schema.keys.map((col, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5 truncate">
                        <span className="text-slate-500">&bull;</span>
                        <span>{col}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-white/[0.06] text-[10px] text-emerald-400">
                    RLS: {schema.rls}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
