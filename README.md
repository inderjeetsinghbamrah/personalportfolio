# Inderjeet Singh Bamrah — Personal Engineering Laboratory

> "I design thoughtful digital experiences and engineer scalable software systems."

An interactive, award-winning digital engineering laboratory and personal portfolio built for **Inderjeet Singh Bamrah**: Full-Stack Developer, Software Architect, UI/UX Designer, and Lecturer in Information Technology.

---

## 🏛️ Architectural Overview

- **Frontend Core**: Next.js 14 (App Router) + React 18 Concurrent Features + TypeScript + Tailwind CSS
- **Design System**: Obsidian Slate palette (`#08090C`, `#0E1017`) with electric violet (`#6366F1`) & sky cyan (`#38BDF8`) accents, WCAG AAA contrast compliance, fluid `clamp()` typography, and zero-runtime CSS tokens.
- **Backend & Database**: Supabase PostgreSQL 17 with kernel-level Row Level Security (RLS) policies, PgBouncer / Supavisor connection pooling, and Next.js Server Route Handlers.
- **Audio Feedback**: Subtle, non-intrusive synthesized Web Audio API (zero external MP3 bandwidth footprint) with toggleable mute persistence.
- **DevOps & Infrastructure**: Multi-stage production `Dockerfile`, `docker-compose.yml`, Kubernetes deployment manifests (`k8s/`), and automated GitHub Actions CI/CD gates.

---

## 🧪 Interactive Experiences

1. **Digital Engineering Workspace (Hero)**: Interactive topology canvas (`Frontend` ➔ `API` ➔ `Cache` ➔ `Database` ➔ `Infrastructure`) with traffic spike simulation (200 RPS vs 10k RPS) and telemetry inspection.
2. **Interactive About & Philosophy Workbench**: Deep architectural axioms (*"Design is not decoration. It is how a system communicates."*, *"Performance is a feature."*, *"Good architecture makes future complexity manageable."*).
3. **Interactive Technology Constellation**: Interconnected node graph featuring React, Next.js, TypeScript, Tailwind, Figma, Node.js, Express, Rust, REST APIs, PostgreSQL, Supabase, Redis, Prisma, Docker, Kubernetes, and GitHub Actions.
4. **Project Lab & Live Product Sandboxes**:
   - **EDUOBAL (Featured Concept)**: Interactive Outcome-Based Education (OBE) accreditation & attainment engine. Allows live adjustment of threshold percentages, student marks distribution, CO-PO mapping correlation, and multi-tenant department switching.
   - **SysFlow**: Distributed task execution orchestrator with DAG scheduling and Saga compensation rollback simulation.
   - **DevPulse**: Edge telemetry micro-batching pipeline.
   - **PrismUI**: Architectural token and perceptual contrast inspector.
5. **System Architecture Playground**: Visual walkthroughs of Next.js 14 App Architecture, PostgreSQL 17 RLS, Redis Caching, and Kubernetes Orchestration.
6. **Design Lab**: Split-screen before/after design transformation slider, component pseudo-state inspector, and live CSS custom property theme engine.
7. **Developer Playground**:
   - Safe local terminal simulator supporting `help`, `about`, `skills`, `projects`, `stack`, `contact`, `cat resume`, `ping`, and `clear`.
   - Real-time live API request runner testing `/api/profile`, `/api/projects`, and `/api/obe-calc`.
   - PostgreSQL Entity-Relationship Diagram (ERD) schema visualizer.
8. **Experience & Education Timeline**: Chronological presentation of academic degrees (M.Tech in CS/IT, B.Tech in IT) and teaching/engineering roles (Lecturer in IT, Assistant Professor).
9. **Secure Contact Transmission**: Sanitized contact form with honeypot spam protection and direct insertion into Supabase PostgreSQL.
10. **Admin Management Console (`/admin`)**: Passcode-authenticated management dashboard allowing on-the-fly editing of projects, profiles, and reading incoming contact messages.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm 9+
- Supabase account (or local PostgreSQL instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/inderjeetsingh/portfolio_website.git
cd portfolio_website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the laboratory.

### Database Migrations & Seeding

```bash
# Seed Supabase PostgreSQL tables directly
node scripts/seed-supabase.js
```

---

## 🚢 Deployment

### Vercel Deployment
The project is pre-configured for zero-configuration deployment on Vercel:
```bash
npm run build
```

### Docker Containerization
```bash
# Build multi-stage production image
docker build -t isb-portfolio:latest .

# Run with Docker Compose
docker compose up -d
```

### Kubernetes Orchestration
```bash
kubectl apply -f k8s/deployment.yaml
```

---

## 📄 License
MIT © Inderjeet Singh Bamrah
