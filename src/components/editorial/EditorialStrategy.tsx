"use client";

import React from "react";
import InfiniteMarquee from "./InfiniteMarquee";
import { Zap, Database, Terminal, Shield } from "lucide-react";

export default function EditorialStrategy() {
  const techStack = [
    "Next.js 14 App Router",
    "TypeScript Strict",
    "PostgreSQL 17",
    "Supabase Realtime & Auth",
    "Redis Cache-Aside",
    "Docker Containerization",
    "Kubernetes Topologies",
    "Rust Microservices",
    "Tailwind CSS Tokens",
    "React Server Components",
    "GraphQL APIs",
    "Python Analytics",
    "GitOps & CI/CD",
  ];

  const engineeringDomains = [
    "Distributed Systems",
    "Outcome-Based Education",
    "Sub-10ms Latency",
    "Saga Pattern Workflows",
    "Relational Database Normalization",
    "WCAG AAA Accessibility",
    "Zero Layout Shift (CLS 0)",
    "High Concurrency Microservices",
    "Higher Education Pedagogy",
    "Deterministic State Machines",
  ];

  const invariants = [
    {
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      title: "Zero Runtime Bloat",
      detail: "Avoiding fragile dependency chains. Every client bundle is audited for tree-shaking and zero unnecessary polyfills.",
    },
    {
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      title: "End-to-End Type Safety",
      detail: "TypeScript throughout the entire lifecycle: from database schemas to server route handlers and client React components.",
    },
    {
      icon: <Database className="w-4 h-4 text-blue-400" />,
      title: "Deterministic SQL Schemas",
      detail: "Strict relational integrity, normalized foreign keys, and Row Level Security (RLS) policies tested against privilege escalation.",
    },
    {
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      title: "Resilient Failure Domains",
      detail: "Distributed workflows engineered with idempotency keys, exponential retries, and compensating transactions.",
    },
  ];

  return (
    <section id="strategy" className="py-20 md:py-28 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
            {"// Architecture & Strategy"}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Engineered for performance, resilience, and longevity.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            I build digital products that survive traffic spikes, evolve cleanly over time, and provide
            delightful user interactions. Whether architecting an educational SaaS platform, a distributed
            developer tool, or a component design system, I adhere to uncompromising technical invariants.
          </p>
        </div>

        {/* Technical Invariants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {invariants.map((item, idx) => (
            <div key={idx} className="editorial-card p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {item.icon}
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Marquee Streams */}
      <div className="space-y-2 border-t border-b hairline-border bg-black/10 py-3">
        <InfiniteMarquee items={techStack} direction="left" speedSeconds={35} separator="✦" />
        <InfiniteMarquee items={engineeringDomains} direction="right" speedSeconds={40} separator="◆" />
      </div>
    </section>
  );
}
