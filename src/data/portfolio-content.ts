export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: "SaaS Applications" | "Developer Tools" | "AI & Systems" | "Design Systems" | "Cloud Infrastructure";
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architectureOverview: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  gradient: string;
  accentColor: string;
  interactiveDemoType?: "eduobal" | "sysflow" | "design" | "none";
}

export interface TechNode {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Design" | "Infrastructure";
  role: string;
  description: string;
  proficiency: number; // 1-100
  connectedTo: string[];
  projectsUsedIn: string[];
}

export interface PhilosophyStage {
  step: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  invariants: string[];
}

export interface TimelineMilestone {
  period: string;
  role: string;
  institution: string;
  location: string;
  type: "academic" | "education";
  highlights: string[];
  skills: string[];
}

export const PORTFOLIO_CONTENT = {
  personal: {
    name: "Inderjeet Singh Bamrah",
    title: "Full Stack Developer · UI/UX Designer · Software Architect · Creative Technologist",
    positioning: "I bridge the gap between thoughtful design and robust engineering, creating digital products that are beautiful, performant and built to scale.",
    location: "India",
    email: "inderjeet.sbamrah@gmail.com",
    github: "https://github.com/inderjeetsinghbamrah",
    linkedin: "https://linkedin.com/in/inderjeetsinghbamrah",
    availability: "Available for Architecture & Full-Stack Projects",
    isAvailable: true,
    stats: [
      { label: "Engineering Instruction", value: "B.Tech & M.Tech", detail: "CS & IT Pedagogy" },
      { label: "Core Competency", value: "Full-Stack", detail: "Next.js · Rust · Postgres" },
      { label: "Architecture Invariant", value: "Sub-10ms", detail: "Cache-Aside Caching" },
      { label: "Design Systems", value: "100%", detail: "WCAG AAA Compliant" },
    ],
  },

  hero: {
    headline: "Engineering Digital Experiences.",
    subheadline: "I design, build and engineer digital products that combine beautiful interfaces, intelligent architecture and exceptional performance.",
    keywords: [
      "Next.js 14 App Router",
      "PostgreSQL 17 & RLS",
      "TypeScript Strict",
      "Tailwind CSS & Design Tokens",
      "Redis Caching",
      "Docker & Kubernetes",
      "Figma UI/UX Systems",
      "Rust & Microservices",
    ],
  },

  about: {
    headline: "Beyond Writing Code.",
    lead: "I approach software development not as writing disparate lines of syntax, but as sculpting a living digital product from the ground up.",
    story: [
      "With an M.Tech in Computer Science / IT and a B.Tech in Information Technology, my engineering perspective is deeply grounded in formal computing principles—relational database calculus, distributed consensus, compiler design, and operating systems.",
      "As a Lecturer in Information Technology and former Assistant Professor instructing undergraduate B.Tech engineers, I bridge theoretical rigour with modern production practices. Teaching forces clarity: if you cannot explain an architectural trade-off simply, you do not understand it deeply.",
      "In production, I operate across the full continuum: crafting fluid, accessible user interfaces in Figma, developing type-safe full-stack React Server Components, architecting multi-tenant PostgreSQL schemas with Row Level Security, and orchestrating resilient containerized cloud environments.",
    ],
    pillars: [
      {
        title: "Full-Stack Engineering",
        description: "Zero-compromise web applications built with Next.js App Router, TypeScript, and React Server Components for instantaneous SSR delivery.",
      },
      {
        title: "Product Architecture",
        description: "Resilient distributed system topologies featuring idempotent APIs, message queues, and cache-aside invalidation.",
      },
      {
        title: "UI/UX & Design Systems",
        description: "Pixel-perfect, fluid interface design in Figma translated into strict semantic CSS design token architectures.",
      },
      {
        title: "Database Architecture",
        description: "PostgreSQL relational schemas with strict ACID compliance, declarative migrations, and Row Level Security multi-tenancy.",
      },
      {
        title: "Cloud Infrastructure",
        description: "Multi-stage distroless Docker containers, automated GitHub Actions CI/CD pipelines, and declarative Kubernetes orchestration.",
      },
      {
        title: "Creative Problem Solving",
        description: "Formulating novel educational assessment algorithms like outcome-based education (OBE) attainment matrices.",
      },
    ],
  },

  techStack: [
    {
      name: "React",
      category: "Frontend",
      role: "Component Engine",
      description: "Building responsive, reactive component trees with hooks, memoization, and concurrent mode rendering.",
      proficiency: 95,
      connectedTo: ["Next.js", "TypeScript", "Tailwind CSS"],
      projectsUsedIn: ["EDUOBAL", "SysFlow", "Aether UI"],
    },
    {
      name: "Next.js",
      category: "Frontend",
      role: "Full-Stack Meta-Framework",
      description: "Leveraging React Server Components, Streaming SSR with Suspense, Edge Route Handlers, and Server Actions.",
      proficiency: 96,
      connectedTo: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      projectsUsedIn: ["EDUOBAL", "Personal Portfolio", "SysFlow"],
    },
    {
      name: "TypeScript",
      category: "Frontend",
      role: "Type System & Contract Enforcement",
      description: "Strict compile-time type-safety, disciminated unions, generic constraints, and runtime schema validation with Zod.",
      proficiency: 95,
      connectedTo: ["React", "Next.js", "Node.js"],
      projectsUsedIn: ["All Projects"],
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      role: "Utility-First Design System",
      description: "Composing custom token systems, responsive fluid layouts, and hardware-accelerated transitions with zero CSS bloat.",
      proficiency: 98,
      connectedTo: ["React", "Next.js", "Figma"],
      projectsUsedIn: ["All Projects"],
    },
    {
      name: "Node.js",
      category: "Backend",
      role: "Async JavaScript Runtime",
      description: "High-throughput asynchronous I/O services, RESTful API endpoints, and event-driven worker consumers.",
      proficiency: 92,
      connectedTo: ["Express", "TypeScript", "PostgreSQL"],
      projectsUsedIn: ["EDUOBAL", "SysFlow"],
    },
    {
      name: "Express",
      category: "Backend",
      role: "HTTP Middleware Framework",
      description: "Composing robust middleware chains, CORS headers, rate limiting, and structured JSON error responses.",
      proficiency: 90,
      connectedTo: ["Node.js", "REST APIs"],
      projectsUsedIn: ["Backend Services"],
    },
    {
      name: "Rust",
      category: "Backend",
      role: "High-Performance Systems Language",
      description: "Memory-safe, zero-cost abstraction services for CPU-intensive mathematical data crunching and CLI utilities.",
      proficiency: 80,
      connectedTo: ["REST APIs", "Docker"],
      projectsUsedIn: ["SysFlow Core Engine"],
    },
    {
      name: "PostgreSQL",
      category: "Database",
      role: "Primary Relational Core",
      description: "Advanced relational database design with composite indexing, foreign keys, transaction isolation, and JSONB queries.",
      proficiency: 94,
      connectedTo: ["Supabase", "Prisma", "Redis"],
      projectsUsedIn: ["EDUOBAL", "SysFlow", "Portfolio Backend"],
    },
    {
      name: "Supabase",
      category: "Database",
      role: "PostgreSQL & Auth Platform",
      description: "Postgres 17 backend with Row Level Security (RLS) policies, Realtime WAL change streams, and secure file storage.",
      proficiency: 92,
      connectedTo: ["PostgreSQL", "Next.js"],
      projectsUsedIn: ["EDUOBAL", "Portfolio Backend"],
    },
    {
      name: "Redis",
      category: "Database",
      role: "In-Memory Cache & Rate Limiter",
      description: "Sub-2ms cache-aside lookup tier, distributed locking, pub/sub messaging, and sliding window rate limiting.",
      proficiency: 88,
      connectedTo: ["PostgreSQL", "Node.js"],
      projectsUsedIn: ["SysFlow", "API Gateways"],
    },
    {
      name: "Figma",
      category: "Design",
      role: "Interface & Prototype Canvas",
      description: "Creating comprehensive design systems with auto-layout, component variants, design tokens, and interactive micro-prototypes.",
      proficiency: 92,
      connectedTo: ["Tailwind CSS", "UI/UX Design"],
      projectsUsedIn: ["All Interfaces"],
    },
    {
      name: "UI/UX Design",
      category: "Design",
      role: "User Experience Architecture",
      description: "Information architecture, visual hierarchy, cognitive load reduction, and WCAG AAA accessibility compliance.",
      proficiency: 94,
      connectedTo: ["Figma", "Design Systems"],
      projectsUsedIn: ["EDUOBAL", "Portfolio"],
    },
    {
      name: "Docker",
      category: "Infrastructure",
      role: "Containerization",
      description: "Multi-stage non-root container builds, Alpine/Distroless bases, layer caching, and local Docker Compose environments.",
      proficiency: 90,
      connectedTo: ["Kubernetes", "CI/CD"],
      projectsUsedIn: ["Production Deployments"],
    },
    {
      name: "Kubernetes",
      category: "Infrastructure",
      role: "Container Orchestration",
      description: "Declarative Deployments, ClusterIP & LoadBalancer Services, Horizontal Pod Autoscaling (HPA), and ConfigMaps.",
      proficiency: 84,
      connectedTo: ["Docker", "CI/CD"],
      projectsUsedIn: ["Cloud Infrastructure"],
    },
    {
      name: "CI/CD & Git",
      category: "Infrastructure",
      role: "Automated Deployment Pipeline",
      description: "GitHub Actions workflows for automated type checks, linting, unit test gates, and continuous zero-downtime deployment.",
      proficiency: 92,
      connectedTo: ["Docker", "Kubernetes"],
      projectsUsedIn: ["All Repositories"],
    },
  ] as TechNode[],

  projects: [
    {
      id: "eduobal",
      slug: "eduobal",
      title: "EDUOBAL — Outcome-Based Education SaaS",
      category: "SaaS Applications",
      tagline: "Comprehensive Multi-Tenant Academic Management & Real-Time Attainment Analytics",
      description: "An enterprise-grade Outcome-Based Education (OBE) SaaS platform engineered for engineering colleges and universities to compute real-time course outcome (CO) and program outcome (PO) attainment matrices for NBA and NAAC accreditation.",
      problem: "Higher education institutions struggle with complex manual calculations for OBE accreditation compliance. Faculty spend hundreds of hours manually aggregating exam marks, assignment scores, and direct/indirect assessment percentages across thousands of students.",
      solution: "Engineered an automated multi-tenant platform with granular Row Level Security (RLS). Teachers upload grades or enter marks; the platform runs mathematical matrix transformations to compute direct, indirect, and combined attainment scores in milliseconds.",
      architectureOverview: "Multi-tenant Next.js App Router fronted by Supavisor connection-pooled PostgreSQL 17. Row Level Security guarantees tenant isolation. Redis handles session rate limiting and caching of precomputed attainment matrices.",
      keyFeatures: [
        "Interactive mathematical attainment matrix calculator for NBA/NAAC compliance",
        "Multi-tenant tenant isolation with PostgreSQL Row Level Security (RLS)",
        "Automated direct (80%) vs indirect (20%) attainment weighting engine",
        "Exportable PDF/Excel compliance audits and accreditation reports",
        "Student attendance tracking, course management, and faculty analytics",
      ],
      technologies: ["Next.js 14", "TypeScript", "PostgreSQL 17", "Supabase RLS", "Tailwind CSS", "Redis"],
      githubUrl: "https://github.com/inderjeet-singh-bamrah/eduobal",
      liveUrl: "https://eduobal.vercel.app",
      gradient: "from-cyan-500/20 via-blue-600/20 to-indigo-700/20",
      accentColor: "#06b6d4",
      interactiveDemoType: "eduobal",
    },
    {
      id: "sysflow",
      slug: "sysflow",
      title: "SysFlow — Distributed DAG Orchestrator",
      category: "Developer Tools",
      tagline: "Real-Time Distributed Workflow Engine with Saga Rollback Compensation",
      description: "A developer tool and distributed workflow execution engine capable of running directed acyclic graphs (DAGs) with retry backoffs, distributed state synchronization, and automated Saga transaction rollback compensation.",
      problem: "Microservice orchestration frequently suffers from partial failures where intermediate steps fail, leaving distributed data in inconsistent states without clear transaction boundaries.",
      solution: "Built a type-safe workflow engine where tasks are declared as nodes in a DAG. If any node fails after maximum retries, the orchestrator triggers reverse compensation steps in reverse topological order.",
      architectureOverview: "Node.js and Rust worker pool communicating via Redis queues. State transitions recorded in PostgreSQL with WAL streaming for real-time visualization of executing graphs.",
      keyFeatures: [
        "Visual DAG execution simulator with live node state progression",
        "Automatic Saga compensation rollback on downstream task failure",
        "Sliding-window rate limiting and exponential retry backoff",
        "Real-time WebSocket telemetry of distributed task states",
      ],
      technologies: ["TypeScript", "Node.js", "Rust", "PostgreSQL", "Redis", "Docker"],
      githubUrl: "https://github.com/inderjeet-singh-bamrah/sysflow",
      liveUrl: "https://sysflow-orchestrator.vercel.app",
      gradient: "from-blue-600/20 via-indigo-600/20 to-violet-700/20",
      accentColor: "#3b82f6",
      interactiveDemoType: "sysflow",
    },
    {
      id: "aether-design",
      slug: "aether-design",
      title: "Aether — Fluid Token Design System",
      category: "Design Systems",
      tagline: "High-Craft Design System with WCAG AAA Contrast & Fluid Scaling",
      description: "A comprehensive design system and component architecture bridging Figma tokens with Tailwind CSS and React primitives. Designed for deep-dark modern software products with high aesthetic polish.",
      problem: "Many web applications suffer from inconsistent padding, uncalibrated color contrast, and fragmented component states across developers.",
      solution: "Created a single source of truth for design tokens (spacing, typography, elevation, motion curves). Built with automatic contrast validation and smooth theme switching.",
      architectureOverview: "Token definitions exported from Figma via Tokens Studio into CSS variables. React primitives wrapped in accessible ARIA patterns with Framer Motion fluid microinteractions.",
      keyFeatures: [
        "100% WCAG AAA contrast ratio compliance across light and dark themes",
        "Fluid typography and spacing scale using CSS clamp functions",
        "Interactive component pseudo-state inspector (hover, active, focus, disabled)",
        "Zero-runtime overhead with Tailwind CSS utility mapping",
      ],
      technologies: ["Figma", "Tailwind CSS", "React", "TypeScript", "Radix UI"],
      githubUrl: "https://github.com/inderjeet-singh-bamrah/aether-design",
      liveUrl: "https://aether-tokens.vercel.app",
      gradient: "from-violet-600/20 via-purple-600/20 to-pink-600/20",
      accentColor: "#8b5cf6",
      interactiveDemoType: "design",
    },
    {
      id: "kubescale",
      slug: "kubescale",
      title: "KubeScale — Cloud Topology Visualizer",
      category: "Cloud Infrastructure",
      tagline: "Declarative Kubernetes Autoscaling & Traffic Simulation Platform",
      description: "An infrastructure engineering visualization platform demonstrating declarative container orchestration, Horizontal Pod Autoscaling (HPA), and traffic ingress routing.",
      problem: "Understanding distributed cloud topologies, ingress routing, and pod autoscaling during high-traffic spikes is difficult without hands-on visualization.",
      solution: "Designed an interactive topology simulator mapping traffic flow from client requests through Ingress Controllers, ClusterIP services, and autoscaled replica pods.",
      architectureOverview: "Simulated Kubernetes control plane with real-time metrics generation, container health check probes, and graceful SIGTERM handling simulation.",
      keyFeatures: [
        "Live simulated RPS spike injection (100 RPS to 10,000 RPS)",
        "Dynamic Horizontal Pod Autoscaling visualization based on CPU utilization",
        "Packet latency breakdown across edge, gateway, cache, and database tiers",
        "Automated failover and circuit breaker demonstrations",
      ],
      technologies: ["Docker", "Kubernetes", "TypeScript", "Next.js", "Tailwind CSS"],
      githubUrl: "https://github.com/inderjeet-singh-bamrah/kubescale",
      liveUrl: "https://kubescale.vercel.app",
      gradient: "from-teal-500/20 via-cyan-600/20 to-blue-700/20",
      accentColor: "#14b8a6",
      interactiveDemoType: "none",
    },
  ] as ProjectData[],

  philosophy: [
    {
      step: "01",
      title: "Understand the Problem",
      subtitle: "Domain Modeling & User Empathy",
      quote: "Code without domain comprehension is technical debt written early.",
      description: "Before typing a single line of syntax, I dissect the problem at its roots: user workflows, cognitive friction points, and business invariants.",
      invariants: [
        "Map core entity relationships before choosing libraries",
        "Identify the primary user action and reduce clicks to completion",
        "Eliminate ambiguous requirements through clear specifications",
      ],
    },
    {
      step: "02",
      title: "Architect the Solution",
      subtitle: "Relational Schemas & Boundary Isolation",
      quote: "Good architecture makes future complexity manageable.",
      description: "I structure systems with clear boundaries: strict PostgreSQL foreign key constraints, type-safe RPC interfaces, and cache-aside invalidation.",
      invariants: [
        "Relational schemas with ACID guarantees and Row Level Security",
        "Stateless idempotent APIs that scale horizontally without state locks",
        "Cache-aside Redis tier shielding databases from read spikes",
      ],
    },
    {
      step: "03",
      title: "Design the Experience",
      subtitle: "Craft, Typography & Fluid Interaction",
      quote: "Design is not decoration. It is how a system communicates state.",
      description: "Interfaces must communicate intent immediately. I build with generous whitespace, intentional contrast, and smooth microinteractions.",
      invariants: [
        "100% WCAG AAA contrast compliance across all viewports",
        "Consistent mathematical token scales for spacing and type",
        "Subtle tactile feedback for state changes and user confirmations",
      ],
    },
    {
      step: "04",
      title: "Engineer the Product",
      subtitle: "Type-Safety, Server Components & Tests",
      quote: "Correctness is not an afterthought; it is an invariant.",
      description: "Full-stack development using Next.js 14 App Router, TypeScript strict mode, and React Server Components for zero-bundle SSR delivery.",
      invariants: [
        "End-to-end type safety from database query to UI component",
        "Streaming SSR with Suspense for sub-second First Contentful Paint",
        "Automated CI/CD linting, formatting, and unit test gates",
      ],
    },
    {
      step: "05",
      title: "Optimize and Scale",
      subtitle: "Resilience, Containers & Observability",
      quote: "Performance is a feature, and reliability is a promise.",
      description: "Packaging applications into lightweight distroless Docker containers, monitoring latency profiles, and deploying with zero downtime.",
      invariants: [
        "Sub-10ms cache latency and optimized composite database indexes",
        "Horizontal Pod Autoscaling triggered proactively on CPU/memory load",
        "Graceful degradation and circuit breakers on external service failures",
      ],
    },
  ] as PhilosophyStage[],

  experience: [
    {
      period: "2023 — Present",
      role: "Lecturer in Information Technology",
      institution: "Higher Education Engineering Department",
      location: "India",
      type: "academic",
      highlights: [
        "Instructing undergraduate engineering students in Advanced Web Technologies, Relational Database Management Systems, and Distributed Computing.",
        "Formulating Outcome-Based Education (OBE) course outcome attainment models adhering to NBA and NAAC national accreditation metrics.",
        "Mentoring student capstone engineering projects spanning full-stack cloud applications, multi-tenant databases, and modern UI/UX design systems.",
      ],
      skills: ["Database Systems", "Web Engineering", "Distributed Architecture", "Pedagogy", "OBE Accreditation"],
    },
    {
      period: "2020 — 2023",
      role: "Assistant Professor in Computer Science & IT",
      institution: "Faculty of Engineering & Technology",
      location: "India",
      type: "academic",
      highlights: [
        "Taught core computer science coursework: Relational Databases (PostgreSQL/SQL), Operating Systems, Data Structures, and Software Engineering methodologies.",
        "Headed department technical curriculum modernization committees, introducing modern TypeScript, cloud computing, and containerization into lab coursework.",
        "Published academic research and guided undergraduate student project labs from initial architecture proposal to functional deployment.",
      ],
      skills: ["PostgreSQL", "Operating Systems", "Data Structures", "System Design", "Engineering Mentorship"],
    },
    {
      period: "Postgraduate Degree",
      role: "Master of Technology (M.Tech) in Computer Science / IT",
      institution: "Accredited University Engineering Campus",
      location: "India",
      type: "education",
      highlights: [
        "Advanced specialization in Distributed Systems, Relational Database Theory, Operating System Kernels, and Cloud Computing Architecture.",
        "M.Tech thesis research investigating performance optimization in distributed relational queries and caching topologies.",
        "Graduated with top academic standing and departmental honors.",
      ],
      skills: ["Distributed Systems", "Database Theory", "Cloud Computing", "Research Methodology"],
    },
    {
      period: "Undergraduate Degree",
      role: "Bachelor of Technology (B.Tech) in Information Technology",
      institution: "College of Engineering & Technology",
      location: "India",
      type: "education",
      highlights: [
        "Comprehensive 4-year engineering foundation in Computer Science, Discrete Mathematics, Computer Networks, and Object-Oriented Software Design.",
        "Led university software development student chapter, organizing hackathons, open-source workshops, and web technology bootcamps.",
        "Graduated with First Class Distinction in Information Technology.",
      ],
      skills: ["Information Technology", "Computer Networks", "Software Engineering", "Algorithms"],
    },
  ] as TimelineMilestone[],
};
