import { NextResponse } from "next/server";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export async function GET() {
  const markdown = `---
title: "${PORTFOLIO_CONTENT.personal.name} — Full-Stack Developer & Software Architect"
canonical_url: "https://inderjeetsinghbamrah.in"
last_updated: "${new Date().toISOString()}"
author: "${PORTFOLIO_CONTENT.personal.name}"
role: "${PORTFOLIO_CONTENT.personal.title}"
location: "${PORTFOLIO_CONTENT.personal.location}"
email: "${PORTFOLIO_CONTENT.personal.email}"
github: "${PORTFOLIO_CONTENT.personal.github}"
linkedin: "${PORTFOLIO_CONTENT.personal.linkedin}"
availability: "${PORTFOLIO_CONTENT.personal.availability}"
---

# ${PORTFOLIO_CONTENT.personal.name}
**${PORTFOLIO_CONTENT.personal.title}**

> "${PORTFOLIO_CONTENT.personal.positioning}"

---

## Overview

${PORTFOLIO_CONTENT.about.lead}

${PORTFOLIO_CONTENT.about.story.join("\n\n")}

### Academic & Pedagogical Pedigree
- **Lecturer in Information Technology** (Current appointment)
- **Former Assistant Professor**, Department of Computer Science & Engineering
- **Master of Technology (M.Tech)** in Computer Science & IT
- **Bachelor of Technology (B.Tech)** in Information Technology

---

## Core Engineering Pillars

1. **Full-Stack Engineering**: Zero-compromise web applications built with Next.js App Router, TypeScript, and React Server Components for instantaneous SSR delivery.
2. **Product Architecture**: Resilient distributed system topologies featuring idempotent APIs, message queues, and cache-aside invalidation.
3. **Database Architecture**: High-concurrency relational modeling in PostgreSQL with strict Row Level Security, indexing strategies, and atomic transactions.
4. **Cloud & Infrastructure**: Immutable container deployments with Docker, declarative Kubernetes clusters, and automated CI/CD pipelines.
5. **Design Systems**: Systematic UI architectures in Figma with fluid typography, design tokens, and WCAG AAA compliance.
6. **Pedagogical Clarity**: Explaining complex distributed systems through first principles and clean architectural documentation.

---

## Technology Ecosystem

### Frontend
- Next.js 14 (App Router, Server Actions, RSC)
- React 18 / TypeScript Strict
- Tailwind CSS / Design Tokens / Radix UI / shadcn
- Framer Motion / WebGL / Three.js
- HTML5 / Web Audio API

### Backend & Systems
- Node.js / Express
- Rust (Microservices, high-throughput tooling)
- Python (Analytics, data processing)
- RESTful & GraphQL APIs

### Database & Caching
- PostgreSQL 17 (Relational Modeling, Indexing, RLS)
- Supabase (PostgreSQL, Realtime, Auth, Storage)
- Redis / Upstash (Sub-10ms cache-aside, rate limiting)

### Infrastructure & DevOps
- Docker / Multi-stage containerization
- Kubernetes / Pod topologies & ingress
- GitHub Actions / Automated CI/CD pipelines
- Vercel (Edge & Fluid compute)

---

## Selected Featured Projects

### 1. EDUOBAL — Outcome-Based Education Analytics & Attainment Engine
- **Category:** SaaS Applications / Educational Technology
- **Tagline:** Automating complex NBA/NAAC Course Outcome (CO) and Program Outcome (PO) attainment calculations.
- **Problem:** Engineering institutions manually spend hundreds of faculty hours compiling assessment spreadsheets prone to calculation drift.
- **Solution:** A deterministic relational computation engine that processes multi-tier assessments, evaluates weighted thresholds, and generates accreditation-ready matrices.
- **Stack:** Next.js 14, PostgreSQL 17, Supabase, TypeScript, Tailwind CSS
- **Code:** ${PORTFOLIO_CONTENT.projects[0].githubUrl}

### 2. SysFlow — Distributed Workflow Orchestrator & DAG Visualizer
- **Category:** Developer Tools / Systems Architecture
- **Tagline:** Visualizing distributed state machines with real-time execution graphs and Saga pattern rollbacks.
- **Problem:** Debugging distributed multi-service pipelines across asynchronous queues leads to opaque failure states.
- **Solution:** An interactive Directed Acyclic Graph (DAG) executor simulating step transitions, retry policies, and compensating transactions.
- **Stack:** React, TypeScript, WebGL Canvas, Redis, Saga Patterns
- **Code:** ${PORTFOLIO_CONTENT.projects[1].githubUrl}

### 3. Aether — Design System Architecture
- **Category:** Design Systems & UI Architecture
- **Tagline:** Enterprise token-driven component architecture with fluid typography and WCAG AAA compliance.
- **Solution:** Comprehensive design token framework unifying Figma variables with CSS custom properties.
- **Stack:** TypeScript, Tailwind CSS, Radix UI, Storybook
- **Code:** ${PORTFOLIO_CONTENT.projects[2].githubUrl}

### 4. KubeScale — Cloud-Native Microservices Topology
- **Category:** Cloud Infrastructure & DevOps
- **Tagline:** Production-ready Kubernetes cluster blueprint with autoscaling, ingress control, and distributed tracing.
- **Solution:** Declarative GitOps infrastructure automating deployments with zero downtime rolling updates.
- **Stack:** Docker, Kubernetes, Prometheus, Redis, Go
- **Code:** ${PORTFOLIO_CONTENT.projects[3].githubUrl}

---

## Frequently Asked Questions

### 01. What kind of software systems do you build?
Everything from full-stack SaaS platforms and developer tooling to high-throughput relational database architectures and educational software. I engineer end-to-end products: from fluid, accessible UI in Figma and React to backend microservices, SQL databases, and containerized deployments.

### 02. How does your teaching and academic background make you a better engineer?
Instructing B.Tech engineering students requires breaking down complex distributed systems and data structures to first principles. If you cannot explain why a B-Tree index behaves the way it does or why eventual consistency is necessary in distributed networks, you don't know it deeply. In software development, this translates to cleaner architecture, better abstractions, and exceptional technical communication.

### 03. What is your preferred tech stack for scalable web applications?
For modern web products, my foundation is TypeScript throughout: Next.js 14 App Router, PostgreSQL (with Supabase or managed RDS), Redis for caching and rate limiting, and Tailwind CSS for tokenized design systems. For high-performance backend utilities or CLI tooling, I leverage Rust.

### 04. How do you approach new collaborations?
Whether you need an architectural review, a full-stack SaaS MVP built from scratch, or an enterprise design system, reach out with project objectives, timelines, and technical scope.

---

## Contact & Transmission
- **Email:** ${PORTFOLIO_CONTENT.personal.email}
- **Website:** https://inderjeetsinghbamrah.in
- **GitHub:** ${PORTFOLIO_CONTENT.personal.github}
- **LinkedIn:** ${PORTFOLIO_CONTENT.personal.linkedin}
`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
