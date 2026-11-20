export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "rust" | "nextjs" | "devops" | "spatial";
  badge: string;
  badgeColor?: string;
  description: string;
  highlights: string[];
  metrics: ProjectMetric[];
  stack: string[];
  terminalCmd: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface PillarItem {
  number: string;
  title: string;
  tech: string;
  description: string;
  color: string;
}

export interface ProfileData {
  name: string;
  role: string;
  statusBadge: string;
  isAvailable: boolean;
  timezoneOverlap: string;
  architectureTag: string;
  headline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  pillars: PillarItem[];
}

export interface ResumeData {
  summary: string;
  competencies: {
    frontend: string;
    systems: string;
    devops: string;
  };
  workReadiness: {
    asyncFirst: string;
    usEuOverlap: string;
    contractModels: string;
    english: string;
  };
}

export interface PortfolioData {
  profile: ProfileData;
  projects: ProjectItem[];
  resume: ResumeData;
}

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Inderjeet",
    role: "Full-Stack & Systems Engineer",
    statusBadge: "Available for global full-stack & systems roles",
    isAvailable: true,
    timezoneOverlap: "UTC+5:30 • 4-5h US overlap • Full EU/UK overlap",
    architectureTag: "Distributed Architecture: Next.js Edge ➔ Tokio Reactor ➔ Kubernetes",
    headline: "Engineering scalable web applications and high-performance compiled systems.",
    bio: "I bridge the gap between reactive frontend user experiences and low-level backend performance—crafting applications in React & Next.js, writing memory-safe concurrency with Rust, and orchestrating resilient deployments with Docker & Kubernetes.",
    email: "inderjeet@systems.dev",
    githubUrl: "https://github.com/inderjeet",
    linkedinUrl: "https://linkedin.com/in/inderjeet",
    pillars: [
      {
        number: "01 / FRONTEND",
        title: "Frontend Engineering",
        tech: "React 19 & Next.js",
        description: "React Server Components, progressive streaming SSR, edge caching, and interactive 3D WebGL interfaces.",
        color: "text-emerald-400",
      },
      {
        number: "02 / SYSTEMS",
        title: "Systems Concurrency",
        tech: "Rust & Concurrency",
        description: "Tokio async runtimes, zero-cost abstractions, mathematical memory safety, and WebAssembly compilation.",
        color: "text-amber-400",
      },
      {
        number: "03 / DEVOPS",
        title: "Infrastructure & Cloud",
        tech: "Cloud & Deployment",
        description: "Automated CI/CD pipelines, distroless Docker containers, Kubernetes canary rollouts, and infrastructure as code.",
        color: "text-sky-400",
      },
    ],
  },
  projects: [
    {
      id: "aether-kv",
      title: "Aether-KV",
      subtitle: "Distributed Raft Key-Value Storage Engine",
      category: "rust",
      badge: "Rust / Systems",
      badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      description:
        "A distributed, linearizable key-value store engineered in Rust. Implements the Raft consensus protocol with an LSM-Tree storage hierarchy, io_uring asynchronous Linux I/O, and zero-copy gRPC transport.",
      highlights: [
        "Zero-cost Tokio asynchronous actor model for request routing",
        "Memory footprint capped at 14MB under 100k concurrent connections",
        "Deterministic crash recovery via write-ahead logging (WAL)",
      ],
      metrics: [
        { label: "Throughput", value: "240k req/s" },
        { label: "P99 Latency", value: "0.85 ms" },
        { label: "Memory Footprint", value: "14 MB" },
      ],
      stack: ["Rust", "Tokio", "gRPC", "io_uring", "Raft", "Docker"],
      terminalCmd: "cargo install aether-kv && aether-kv --cluster-size 5",
      githubUrl: "https://github.com/inderjeetsinghbamrah/personalportfolio",
      liveDemoUrl: "",
    },
    {
      id: "hyperion-next",
      title: "Hyperion Platform",
      subtitle: "Streaming Edge Telemetry & Analytics Dashboard",
      category: "nextjs",
      badge: "Next.js / Full-Stack",
      badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      description:
        "A high-throughput distributed analytics dashboard built with Next.js 14 App Router and React Server Components. Utilizes progressive streaming SSR over HTTP/2 and edge middleware to deliver real-time data feeds with minimal client bundle size.",
      highlights: [
        "Sub-15ms edge time-to-first-byte (TTFB) across 300+ CDN points of presence",
        "Hybrid rendering architecture: static navigation shells with streaming Suspense lists",
        "Dynamic data visualization with custom WebGL canvas shaders",
      ],
      metrics: [
        { label: "Lighthouse Score", value: "100/100" },
        { label: "Edge TTFB", value: "12 ms" },
        { label: "JS Bundle Reduction", value: "-45%" },
      ],
      stack: ["Next.js 14", "React 19", "TypeScript", "Tailwind CSS", "Zustand", "Cloudflare"],
      terminalCmd: "npx create-hyperion-client@latest --template enterprise",
      githubUrl: "https://github.com/inderjeetsinghbamrah/personalportfolio",
      liveDemoUrl: "",
    },
    {
      id: "orbit-kube",
      title: "Orbit-Kube",
      subtitle: "Autonomous Kubernetes Canary Rollout Controller",
      category: "devops",
      badge: "DevOps / Cloud",
      badgeColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
      description:
        "A custom Kubernetes operator written in Rust using kube-rs that automates canary rollouts and traffic shifting based on real-time Prometheus error budget thresholds and eBPF network telemetry.",
      highlights: [
        "Automated instant rollback when P99 latency breaches 150ms",
        "Distroless scratch Docker multi-stage images (18.2MB size)",
        "Declarative Terraform modules for multi-region AWS EKS & GCP GKE clusters",
      ],
      metrics: [
        { label: "Failover Time", value: "< 1.2s" },
        { label: "Image Size", value: "18.2 MB" },
        { label: "Pods Managed", value: "450+" },
      ],
      stack: ["Kubernetes", "Rust", "Docker", "Prometheus", "Terraform", "eBPF"],
      terminalCmd: "kubectl krew install orbit-canary && orbit canary status",
      githubUrl: "https://github.com/inderjeetsinghbamrah/personalportfolio",
      liveDemoUrl: "",
    },
    {
      id: "photon-canvas",
      title: "Photon-Canvas",
      subtitle: "Real-Time Collaborative Spatial 3D Canvas",
      category: "spatial",
      badge: "3D / WebAssembly",
      badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      description:
        "A collaborative 3D spatial canvas combining Three.js interactive rendering with a WebAssembly compute engine compiled from Rust. Synchronizes real-time entity updates via WebSockets and conflict-free replicated data types (CRDTs).",
      highlights: [
        "Physics & collision engine runs in Rust WASM Web Workers at 60 FPS",
        "Conflict-free replicated data types (Yjs) for multi-user state synchronization",
        "Zero main-thread jank with OffscreenCanvas rendering",
      ],
      metrics: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "WASM Speedup", value: "4.8x" },
        { label: "Sync Delay", value: "< 18 ms" },
      ],
      stack: ["Three.js", "React", "Rust WASM", "WebSockets", "CRDT", "Web Workers"],
      terminalCmd: "git clone https://github.com/inderjeet/photon-canvas && npm run dev",
      githubUrl: "https://github.com/inderjeetsinghbamrah/personalportfolio",
      liveDemoUrl: "",
    },
  ],
  resume: {
    summary:
      "Full-Stack & Systems Engineer with deep expertise across high-scale frontend architectures (React 19, Next.js Server Components, streaming SSR), low-level memory-safe backend systems (Rust, Tokio async runtime, Axum, io_uring), and cloud-native containerized infrastructure (Docker multi-stage distroless, Kubernetes, automated canary rollouts, Terraform). Proven track record of designing fault-tolerant distributed applications with sub-millisecond P99 latencies, zero runtime memory leaks, and high global availability.",
    competencies: {
      frontend:
        "React 19, Next.js 14 (App Router), React Server Components (RSC), Streaming SSR, Partial Prerendering, Zustand, Tailwind CSS, Three.js, WebGL.",
      systems:
        "Rust (Tokio, Axum, Actix, Serde, Rayon, io_uring), WebAssembly (WASM), gRPC, Protocol Buffers, Raft Distributed Consensus, Memory Safety (RAII).",
      devops:
        "Kubernetes (Operators, StatefulSets, Ingress), Docker Multi-Stage Builds, GitHub Actions CI/CD, Terraform, Prometheus, Grafana, eBPF telemetry.",
    },
    workReadiness: {
      asyncFirst: "RFC & PR documentation",
      usEuOverlap: "4-6h core hours daily",
      contractModels: "Deel, Remote, B2B",
      english: "Full professional fluency",
    },
  },
};
