-- =========================================================================
-- SEED DATA FOR INDERJEET SINGH BAMRAH PORTFOLIO
-- =========================================================================

-- Clear previous seeded content in new tables
TRUNCATE TABLE public.projects CASCADE;
TRUNCATE TABLE public.project_categories CASCADE;
TRUNCATE TABLE public.technologies CASCADE;
TRUNCATE TABLE public.profiles CASCADE;
TRUNCATE TABLE public.experience CASCADE;
TRUNCATE TABLE public.education CASCADE;
TRUNCATE TABLE public.architecture_demos CASCADE;
TRUNCATE TABLE public.design_showcases CASCADE;

-- 1. PROFILES
INSERT INTO public.profiles (
  slug, full_name, headline, subheadline, professional_identity, positioning,
  bio, email, github_url, linkedin_url, location, is_available, availability_status,
  interests, philosophy
) VALUES (
  'inderjeet',
  'Inderjeet Singh Bamrah',
  'Engineering Digital Experiences. Building What''s Next.',
  'I bridge the gap between thoughtful design and robust engineering, creating digital products that are beautiful, performant and built to scale.',
  'Full-Stack Developer | Software Architect | UI/UX Designer | Product Engineer',
  'I design thoughtful digital experiences and engineer scalable software systems.',
  'With a deep academic foundation holding a B.Tech in Information Technology and M.Tech in Computer Science / IT, I combine rigorous systems thinking with modern product engineering. Having served as an Assistant Professor and currently working as a Lecturer in Information Technology, I bring an educator''s clarity, an architect''s structural rigor, and a designer''s attention to detail to building reliable, scalable software products.',
  'inderjeet.bamrah@gmail.com',
  'https://github.com/inderjeetsingh',
  'https://linkedin.com/in/inderjeetsinghbamrah',
  'India',
  true,
  'Available for High-Impact Full-Stack & Architectural Projects',
  '["Building scalable SaaS products", "Designing exceptional user experiences", "Full-stack application development", "Database architecture", "Distributed systems", "Cloud infrastructure", "Developer tooling", "AI-powered applications"]'::jsonb,
  '[
    {"title": "Design is Communication", "quote": "Design is not decoration. It is how a system communicates.", "description": "Every pixel, visual hierarchy choice, and interaction communicates state, intent, and reliability. High-craft design reduces cognitive load and turns complex technical workflows into intuitive actions."},
    {"title": "Performance is a Feature", "quote": "Performance is a feature, not an afterthought.", "description": "Sub-millisecond queries, streaming SSR, optimized bundle sizes, and minimal client overhead aren''t luxury items—they are fundamental user rights that define software trust."},
    {"title": "Manageable Complexity", "quote": "Good architecture makes future complexity manageable.", "description": "Premature abstractions create drag, but thoughtful domain boundaries, typed contracts, and clean separation of concerns enable rapid iteration without fragile regressions."},
    {"title": "Type Safety & Integrity", "quote": "Type safety and data integrity are non-negotiable in production.", "description": "From PostgreSQL relational constraints to end-to-end TypeScript interfaces, enforcing invariants at compile time and database schemas eliminates entire classes of runtime anomalies."}
  ]'::jsonb
);

-- 2. PROJECT CATEGORIES
INSERT INTO public.project_categories (id, slug, name, description, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'saas', 'SaaS Applications', 'Scalable multi-tenant cloud software platforms', 1),
  ('c1000000-0000-0000-0000-000000000002', 'devtools', 'Developer Tools', 'Developer productivity, CLI utilities, and simulators', 2),
  ('c1000000-0000-0000-0000-000000000003', 'ai-apps', 'AI Applications', 'Intelligent systems, vector retrieval, and agentic workflows', 3),
  ('c1000000-0000-0000-0000-000000000004', 'api-products', 'API Products', 'High-throughput RESTful services, caching, and gateways', 4),
  ('c1000000-0000-0000-0000-000000000005', 'ui-ux', 'UI/UX Experiments', 'Design systems, micro-interactions, and accessibility', 5),
  ('c1000000-0000-0000-0000-000000000006', 'devops', 'Infrastructure & DevOps', 'Containerization, Kubernetes, CI/CD, and orchestration', 6);

-- 3. TECHNOLOGIES
INSERT INTO public.technologies (slug, name, category, icon, how_i_use_it, related_tech, sort_order) VALUES
  ('react', 'React', 'Frontend', 'Atom', 'Building reactive interfaces with concurrent rendering, server components, custom hooks, and state machines.', '["Next.js", "TypeScript", "Tailwind CSS"]'::jsonb, 1),
  ('nextjs', 'Next.js', 'Frontend', 'Globe', 'Architecting full-stack web applications with App Router, Server Actions, Edge Middleware, and streaming SSR.', '["React", "TypeScript", "Vercel"]'::jsonb, 2),
  ('typescript', 'TypeScript', 'Frontend', 'FileCode', 'Enforcing end-to-end type safety from database schemas to client-side API contracts and component props.', '["React", "Next.js", "Node.js"]'::jsonb, 3),
  ('tailwind', 'Tailwind CSS', 'Frontend', 'Palette', 'Engineering responsive, token-based design systems with zero runtime overhead and atomic utility classes.', '["Design Systems", "Figma", "React"]'::jsonb, 4),
  ('figma', 'Figma', 'Design', 'PenTool', 'Prototyping responsive interfaces, wireframing user journeys, and structuring modular design tokens.', '["UI/UX", "Design Systems", "Tailwind CSS"]'::jsonb, 5),
  ('nodejs', 'Node.js', 'Backend', 'Server', 'Building asynchronous microservices, runtime background jobs, and high-performance serverless endpoints.', '["Express", "TypeScript", "REST APIs"]'::jsonb, 6),
  ('express', 'Express', 'Backend', 'Cpu', 'Creating modular RESTful APIs with structured middleware, JWT authentication, and request sanitization.', '["Node.js", "PostgreSQL", "REST APIs"]'::jsonb, 7),
  ('rust', 'Rust', 'Backend', 'Flame', 'Developing high-throughput, memory-safe backend utilities, CLI tooling, and compute-heavy background tasks.', '["Node.js", "Docker", "DevOps"]'::jsonb, 8),
  ('rest-apis', 'REST APIs', 'Backend', 'Network', 'Designing idempotent, resource-oriented HTTP APIs adhering to OpenAPI/Swagger standards.', '["Node.js", "Express", "TypeScript"]'::jsonb, 9),
  ('postgresql', 'PostgreSQL', 'Database', 'Database', 'Designing normalized relational schemas, foreign keys, composite indexes, JSONB operators, and triggers.', '["Supabase", "Prisma", "Redis"]'::jsonb, 10),
  ('supabase', 'Supabase', 'Database', 'Zap', 'Utilizing managed Postgres, Row Level Security (RLS) policies, storage buckets, and realtime change streams.', '["PostgreSQL", "Next.js", "Auth"]'::jsonb, 11),
  ('redis', 'Redis', 'Database', 'Layers', 'Implementing sub-millisecond caching layers, rate limiting with sliding windows, and pub/sub message brokers.', '["PostgreSQL", "Node.js", "Next.js"]'::jsonb, 12),
  ('prisma', 'Prisma', 'Database', 'Code2', 'Type-safe ORM for database migrations, declarative data modeling, and compile-time query validation.', '["PostgreSQL", "TypeScript", "Next.js"]'::jsonb, 13),
  ('docker', 'Docker', 'Infrastructure', 'Box', 'Containerizing full-stack microservices with multi-stage builds, non-root runtimes, and minimal attack surface.', '["Kubernetes", "CI/CD", "GitHub Actions"]'::jsonb, 14),
  ('kubernetes', 'Kubernetes', 'Infrastructure', 'Boxes', 'Orchestrating containerized workloads with Ingress controllers, Services, ConfigMaps, and Pod autoscaling.', '["Docker", "DevOps", "Cloud"]'::jsonb, 15),
  ('github-actions', 'GitHub Actions', 'Infrastructure', 'GitBranch', 'Automating CI/CD pipelines with automated test suites, linting, Docker image builds, and Vercel deploys.', '["Docker", "CI/CD", "Next.js"]'::jsonb, 16),
  ('ui-ux', 'UI/UX Design', 'Design', 'Layout', 'Crafting user-centered workflows, cognitive hierarchy, micro-interactions, and accessibility (WCAG AAA).', '["Figma", "Design Systems", "Tailwind CSS"]'::jsonb, 17),
  ('design-systems', 'Design Systems', 'Design', 'Component', 'Constructing composable UI component primitives with documented states, tokens, and contrast standards.', '["Figma", "Tailwind CSS", "React"]'::jsonb, 18);

-- 4. PROJECTS
INSERT INTO public.projects (
  slug, title, tagline, category_id, category_name, is_featured, is_published, sort_order,
  overview, problem_statement, solution, interactive_demo_type,
  architecture_diagram, database_design, engineering_challenges, key_decisions,
  technologies, github_url, live_demo_url
) VALUES
  (
    'eduobal',
    'EDUOBAL: Outcome-Based Education SaaS',
    'Multi-tenant institutional platform automating NBA/NAAC Outcome-Based Education (OBE) accreditation and attainment analysis.',
    'c1000000-0000-0000-0000-000000000001',
    'SaaS Applications',
    true,
    true,
    1,
    'EDUOBAL is a comprehensive higher education SaaS platform engineered to streamline Outcome-Based Education (OBE) compliance, multi-tier institutional management, student attendance, course syllabus tracking, continuous internal assessments, and complex CO-PO (Course Outcome to Program Outcome) attainment matrices required by international accreditation bodies (e.g. Washington Accord / NBA / NAAC).',
    'Higher education institutions face immense bureaucratic overhead manually aggregating thousands of student marks across continuous internal assessments, laboratory sessions, and end-semester examinations to calculate CO-PO attainment. Existing academic ERPs are monolithic, clunky, lack transparent mathematical calculation engines, and do not offer secure multi-tenancy.',
    'Engineered a modern multi-tenant cloud architecture using Next.js App Router, Supabase PostgreSQL with tenant-isolated Row Level Security, and an interactive mathematical attainment matrix calculation engine. The system automates threshold calculations, generates audit-ready accreditation reports, and provides real-time departmental dashboards.',
    'eduobal',
    '{"client": "Next.js 14 Client Components (SSR + Responsive Tabs)", "api": "Next.js Server Actions & API Route Handlers", "database": "Supabase PostgreSQL 17 with Multi-Tenant RLS", "cache": "Upstash Redis for Attainment Matrix Aggregation", "security": "Role-Based Access Control (Admin, HOD, Faculty, Student)"}'::jsonb,
    '{"tables": ["institutes (id, name, code, domain)", "departments (id, institute_id, name, code)", "programs (id, department_id, name, pso_json)", "courses (id, program_id, code, title, credits)", "course_outcomes (id, course_id, code, bloom_level, target_pct)", "assessments (id, course_id, name, max_marks, co_mapping_json)", "student_scores (id, assessment_id, student_id, marks_obtained)", "co_po_matrix (id, course_id, co_code, po_mappings_json)"]}'::jsonb,
    '[
      {"title": "Non-Linear Matrix Aggregation", "description": "Formulating an efficient algorithmic pipeline to compute weighted CO-PO matrices across varying assessment rubrics without triggering high database compute spikes."},
      {"title": "Multi-Tenant Data Isolation", "description": "Ensuring strict institutional multi-tenancy using PostgreSQL Row Level Security with zero cross-tenant data leakage risks."},
      {"title": "Dynamic Bloom''s Taxonomy Weighting", "description": "Allowing faculty to define flexible assessment questions mapped to Cognitive Levels (Recall, Understand, Apply, Analyze, Evaluate, Create) with real-time recalculation."}
    ]'::jsonb,
    '[
      {"decision": "PostgreSQL RLS for Tenant Separation", "reason": "Avoids application-level query filtering bugs by delegating isolation directly to the database kernel."},
      {"decision": "Server-Side Attainment Computation", "reason": "Guarantees deterministic calculation across thousands of student assessment records without burdening client memory."},
      {"decision": "Modular Accreditation Export", "reason": "Structures calculation output into standardized NBA/NAAC format tables exportable to CSV and printable audit records."}
    ]'::jsonb,
    '["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS", "Redis"]'::jsonb,
    'https://github.com/inderjeetsingh/eduobal',
    '#live-demo'
  ),
  (
    'sysflow',
    'SysFlow: Distributed Task Orchestration Engine',
    'Resilient directed acyclic graph (DAG) task runner with Redis Streams and stateful compensation workflows.',
    'c1000000-0000-0000-0000-000000000002',
    'Developer Tools',
    true,
    true,
    2,
    'A high-reliability distributed task engine designed to coordinate complex multi-step backend operations with automatic retries, exponential backoff, dead-letter queues, and rollback compensations (Saga pattern).',
    'Complex distributed workflows across heterogeneous services fail due to transient network drops, rate limits, or partial service outages. Building custom retry and rollback logic in every microservice creates spaghetti code and inconsistent error recovery states.',
    'Architected an event-driven DAG execution model backed by Redis Streams for message persistence and PostgreSQL for durable state checkpoints. Operators can inspect live graph transitions and replay failed nodes with zero data loss.',
    'sysflow',
    '{"orchestrator": "TypeScript DAG Scheduler Engine", "queue": "Redis Streams Consumer Groups", "state": "Supabase Postgres Event Store", "monitoring": "Server-Sent Events (SSE) Live Execution Graph"}'::jsonb,
    '{"tables": ["workflow_definitions (id, name, dag_json)", "workflow_executions (id, definition_id, status, started_at)", "task_nodes (id, execution_id, step_name, status, payload, retry_count)"]}'::jsonb,
    '[
      {"title": "Race-Free Worker Heartbeats", "description": "Preventing zombie task re-executions during worker node network partitions through distributed Redis leases."},
      {"title": "Saga Rollback Coordination", "description": "Executing compensating reverse transactions in reverse topological order when a terminal step fails."}
    ]'::jsonb,
    '[
      {"decision": "Redis Streams over RabbitMQ", "reason": "Stream consumer groups provide high read throughput and native at-least-once delivery with lightweight deployment overhead."},
      {"decision": "Topological Sort in TypeScript", "reason": "Enables dependency validation and cyclic graph detection prior to workflow dispatch."}
    ]'::jsonb,
    '["TypeScript", "Node.js", "Redis", "PostgreSQL", "Docker"]'::jsonb,
    'https://github.com/inderjeetsingh/sysflow',
    '#live-demo'
  ),
  (
    'devpulse',
    'DevPulse: Edge Log & Telemetry Pipeline',
    'High-throughput edge ingestion proxy with micro-batching, geo-routing, and live metric aggregation.',
    'c1000000-0000-0000-0000-000000000004',
    'API Products',
    false,
    true,
    3,
    'A telemetry ingestion proxy designed to capture application metrics, error traces, and request events at the edge, batching them intelligently before shipping to long-term analytical storage.',
    'High-volume edge requests generating immediate database writes degrade database connection pools and inflate cloud costs.',
    'Engineered an edge ingestion route with in-memory buffering, compression, and batched bulk inserts into PostgreSQL with time-partitioned schemas.',
    'devpulse',
    '{"edge": "Edge Runtime Ingestion Gateway", "buffer": "Worker In-Memory Ring Buffer", "storage": "PostgreSQL Partitioned Timeseries Tables"}'::jsonb,
    '{"tables": ["telemetry_events (timestamp, service_id, event_type, duration_ms, payload_json)", "service_metrics (service_id, window_minute, avg_latency, error_rate)"]}'::jsonb,
    '[
      {"title": "Buffer Eviction under Load", "description": "Implementing adaptive sampling rates when edge memory thresholds are approached during DDoS traffic bursts."}
    ]'::jsonb,
    '[
      {"decision": "Time-Partitioned Tables", "reason": "Significantly speeds up analytical range queries and allows instantaneous dropping of expired log partitions."}
    ]'::jsonb,
    '["Next.js Edge", "TypeScript", "PostgreSQL", "Tailwind CSS"]'::jsonb,
    'https://github.com/inderjeetsingh/devpulse',
    '#live-demo'
  ),
  (
    'prismui',
    'PrismUI: Architectural Design System & Token Studio',
    'Accessible, token-driven component architecture with mathematical contrast validation and dynamic themes.',
    'c1000000-0000-0000-0000-000000000005',
    'UI/UX Experiments',
    false,
    true,
    4,
    'An open-source design engineering playground and headless component token studio exploring accessible UI states, semantic contrast ratios, and modular CSS variables.',
    'Designers and frontend engineers often misalign on spacing scales, interactive states (focus-visible vs active), and WCAG accessibility compliance across dark/light mode themes.',
    'Constructed a live token exploration workbench allowing engineers to inspect component states, verify WCAG AAA contrast ratios in real time, and export token schemas to Tailwind CSS or CSS Custom Properties.',
    'prismui',
    '{"core": "React Composable Primitives", "tokens": "CSS Custom Properties Engine", "inspector": "Real-Time Color Contrast Calculation Utility"}'::jsonb,
    '{"tokens": ["spacing-scale (4px-64px)", "color-primitives (10-step palette)", "typography-scale (fluid clamp scales)", "elevation-tokens (shadows & border highlights)"]}'::jsonb,
    '[
      {"title": "APCA & WCAG 2.1 Formulae", "description": "Implementing the perceptual contrast algorithm directly in browser JavaScript for instantaneous validation."}
    ]'::jsonb,
    '[
      {"decision": "Zero Runtime CSS Engine", "reason": "Uses pure CSS variables to ensure theme changes happen instantly without React component re-render cascades."}
    ]'::jsonb,
    '["React", "TypeScript", "Tailwind CSS", "Figma", "Design Systems"]'::jsonb,
    'https://github.com/inderjeetsingh/prismui',
    '#live-demo'
  );

-- 5. EXPERIENCE
INSERT INTO public.experience (role, organization, period, is_current, description, responsibilities, technologies, sort_order) VALUES
  (
    'Lecturer in Information Technology',
    'Department of Information Technology',
    'Present',
    true,
    'Delivering specialized lectures, laboratory instruction, and engineering project mentorship across modern software systems, web engineering, database architecture, and cloud technologies.',
    '["Instructing undergraduate engineering students in Full-Stack Web Architecture, Database Systems, and Cloud Engineering.", "Mentoring student teams in architecting end-to-end software capstone projects.", "Formulating and evaluating Outcome-Based Education (OBE) course outcome attainment matrices.", "Conducting workshops on modern developer workflows: Git, Docker, TypeScript, and REST APIs."]'::jsonb,
    '["Next.js", "TypeScript", "PostgreSQL", "Docker", "Database Architecture", "System Design"]'::jsonb,
    1
  ),
  (
    'Assistant Professor (B.Tech Computer Science / IT)',
    'Engineering Academic Institution',
    'Past',
    false,
    'Taught core computer science and engineering coursework, guided undergraduate technical research, and participated in curriculum modernization and accreditation documentation.',
    '["Taught core curriculum including Data Structures, Object-Oriented Software Design, Operating Systems, and Relational Database Systems.", "Designed practical laboratory assignments simulating production-grade engineering environments.", "Assisted departmental committees in NBA/NAAC accreditation compliance and academic audit documentation.", "Guided student research in distributed algorithms and software engineering methodologies."]'::jsonb,
    '["C++", "Java", "PostgreSQL", "Relational Database Theory", "Software Engineering", "Linux"]'::jsonb,
    2
  ),
  (
    'Full-Stack Developer & Software Systems Consultant',
    'Independent Engineering Practice',
    'Ongoing',
    false,
    'Designing and developing tailored web applications, database schemas, and developer tooling for client products and educational initiatives.',
    '["Architecting responsive web applications using React, Next.js, and TypeScript.", "Designing normalized PostgreSQL database schemas and implementing Row Level Security policies.", "Establishing CI/CD deployment pipelines using GitHub Actions and containerized workflows.", "Prototyping intuitive user interfaces and modular design systems in Figma."]'::jsonb,
    '["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Docker", "Figma"]'::jsonb,
    3
  );

-- 6. EDUCATION
INSERT INTO public.education (degree, field, institution, period, details, highlights, sort_order) VALUES
  (
    'Master of Technology (M.Tech)',
    'Computer Science & Information Technology',
    'Recognized Engineering University',
    'Postgraduate',
    'Advanced graduate study focused on distributed systems, advanced database engineering, algorithm analysis, and software quality assurance methodologies.',
    '["Specialized coursework in Distributed Computing, Advanced Database Architecture, and Cloud Systems.", "Conducted research into software engineering methodologies and automated test validation.", "Graduated with honors and departmental commendation."]'::jsonb,
    1
  ),
  (
    'Bachelor of Technology (B.Tech)',
    'Information Technology',
    'Recognized Engineering University',
    'Undergraduate',
    'Rigorous four-year engineering degree encompassing computer science fundamentals, data structures, computer networks, operating systems, and full-stack software development.',
    '["Comprehensive study of Computer Organization, Object-Oriented Analysis, and Discrete Mathematics.", "Developed multiple full-stack capstone projects and led student technical societies.", "Built strong foundational expertise in algorithms, relational databases, and systems programming."]'::jsonb,
    2
  );

-- 7. ARCHITECTURE DEMOS
INSERT INTO public.architecture_demos (slug, title, subtitle, description, components, data_flow, sort_order) VALUES
  (
    'nextjs-fullstack',
    'Next.js 14 App Architecture',
    'Edge Network, React Server Components (RSC) & Streaming SSR',
    'Demonstrates how modern Next.js utilizes Edge Middleware for authentication checks, React Server Components for zero-bundle data fetching, and progressive streaming to render instantaneous UI shells.',
    '[
      {"name": "Client Browser", "role": "Interactivity & Hydrated Island Components", "tech": "React 18 / DOM"},
      {"name": "Edge Middleware", "role": "Auth Verification, Header Rewrites & Geolocation", "tech": "Vercel Edge Network"},
      {"name": "Server Components (RSC)", "role": "Zero-JS Server Execution, Direct DB Queries", "tech": "Node.js / Edge Runtime"},
      {"name": "Server Actions", "role": "Type-Safe Mutations & Form Submissions", "tech": "RPC Protocol"},
      {"name": "Streaming Pipeline", "role": "Progressive Suspense HTML Streaming", "tech": "HTTP/2 Chunked Transfer"}
    ]'::jsonb,
    '[
      {"step": 1, "from": "Client Browser", "to": "Edge Middleware", "action": "HTTPS Request with Session Cookie", "latency": "8ms"},
      {"step": 2, "from": "Edge Middleware", "to": "Server Components (RSC)", "action": "Verified Request Routed to RSC Tree", "latency": "2ms"},
      {"step": 3, "from": "Server Components (RSC)", "to": "Client Browser", "action": "Stream Fast Shell (Suspense Fallback)", "latency": "15ms"},
      {"step": 4, "from": "Server Components (RSC)", "to": "Client Browser", "action": "Stream Hydrated Data Payload", "latency": "42ms"}
    ]'::jsonb,
    1
  ),
  (
    'supabase-db',
    'Supabase & PostgreSQL Architecture',
    'PostgreSQL 17, Row Level Security & Connection Pooling',
    'Illustrates modern database architecture leveraging PostgreSQL 17 with kernel-level Row Level Security policies, Supavisor connection pooling, and the write-ahead log (WAL) Realtime replication engine.',
    '[
      {"name": "Application Server", "role": "Executes parameterized SQL queries with JWT identity", "tech": "Next.js / Node.js"},
      {"name": "Supavisor Pooler", "role": "Manages thousands of concurrent client connections", "tech": "Elixir / Supavisor"},
      {"name": "Postgres Kernel", "role": "Enforces RLS policies, constraints & indexes", "tech": "PostgreSQL 17"},
      {"name": "WAL Realtime Engine", "role": "Broadcasts database changes via WebSockets", "tech": "Logical Replication / Phoenix"},
      {"name": "Storage Engine", "role": "Durable NVMe storage with automated backups", "tech": "Block Storage"}
    ]'::jsonb,
    '[
      {"step": 1, "from": "Application Server", "to": "Supavisor Pooler", "action": "Acquire Pooled Transaction Connection", "latency": "1ms"},
      {"step": 2, "from": "Supavisor Pooler", "to": "Postgres Kernel", "action": "Execute Query with auth.uid() Session Context", "latency": "3ms"},
      {"step": 3, "from": "Postgres Kernel", "to": "Postgres Kernel", "action": "Evaluate RLS Policy (auth.uid() = tenant_id)", "latency": "<1ms"},
      {"step": 4, "from": "Postgres Kernel", "to": "Application Server", "action": "Return Filtered Row Payload", "latency": "4ms"}
    ]'::jsonb,
    2
  ),
  (
    'redis-caching',
    'Redis Cache-Aside & Rate Limiting',
    'Sub-millisecond In-Memory Caching & Sliding Window Protection',
    'Visualizes how a distributed Redis cache intercepts read traffic to relieve relational database load and executes token-bucket or sliding-window rate limiting algorithms.',
    '[
      {"name": "API Gateway", "role": "Checks rate limit counters before forwarding request", "tech": "Edge Worker"},
      {"name": "Redis In-Memory Cluster", "role": "Holds cached serialization payloads with TTLs", "tech": "Redis 7 / Upstash"},
      {"name": "Primary Database", "role": "Persistent source of truth queried on cache misses", "tech": "PostgreSQL"},
      {"name": "Cache Invalidator", "role": "Evicts keys on mutations (Stale-While-Revalidate)", "tech": "Event Bus"}
    ]'::jsonb,
    '[
      {"step": 1, "from": "API Gateway", "to": "Redis In-Memory Cluster", "action": "Check Rate Limit Key (INCRBY + EXPIRE)", "latency": "1ms"},
      {"step": 2, "from": "API Gateway", "to": "Redis In-Memory Cluster", "action": "Query Cached Response (GET cache:projects)", "latency": "1ms"},
      {"step": 3, "from": "Redis In-Memory Cluster", "to": "API Gateway", "action": "Cache HIT -> Instant 200 OK Response", "latency": "1ms"},
      {"step": 4, "from": "API Gateway", "to": "Primary Database", "action": "(On MISS only) Query DB & Populate Redis", "latency": "18ms"}
    ]'::jsonb,
    3
  ),
  (
    'k8s-devops',
    'Kubernetes & Docker Orchestration',
    'Ingress, Services, Rolling Updates & Horizontal Pod Autoscaling',
    'Details the production container lifecycle: automated multi-stage Docker builds, Kubernetes Ingress routing, ClusterIP service discovery, and declarative zero-downtime rolling deployments.',
    '[
      {"name": "Traffic Ingress", "role": "TLS termination and path-based request routing", "tech": "Nginx / Traefik Ingress"},
      {"name": "ClusterIP Service", "role": "Internal load balancing across healthy pod replicas", "tech": "K8s Service"},
      {"name": "Pod Replicas", "role": "Stateless containerized application processes", "tech": "Docker / Alpine"},
      {"name": "HPA Controller", "role": "Monitors CPU/Memory and scales pods dynamically", "tech": "K8s Metrics Server"},
      {"name": "ConfigMaps & Secrets", "role": "Decoupled environment configuration", "tech": "K8s Config"}
    ]'::jsonb,
    '[
      {"step": 1, "from": "Traffic Ingress", "to": "ClusterIP Service", "action": "Forward Decrypted HTTPS Traffic", "latency": "1ms"},
      {"step": 2, "from": "ClusterIP Service", "to": "Pod Replicas", "action": "Round-Robin Dispatch to Healthy Pod", "latency": "<1ms"},
      {"step": 3, "from": "Pod Replicas", "to": "Pod Replicas", "action": "Execute Application Logic in Sandbox", "latency": "12ms"},
      {"step": 4, "from": "HPA Controller", "to": "Pod Replicas", "action": "Scale 2 -> 5 Replicas upon 75% CPU Threshold", "latency": "Event"}
    ]'::jsonb,
    4
  );

-- 8. DESIGN SHOWCASES
INSERT INTO public.design_showcases (title, category, description, principles, tokens, sort_order) VALUES
  (
    'Obsidian Slate Design System',
    'Color & Contrast Architecture',
    'A precision-calibrated dark palette designed for extended engineering reading sessions, eliminating eye strain while maximizing typographic clarity.',
    '[
      {"principle": "Hierarchical Contrast", "detail": "Primary surfaces at #07080B, elevation cards at #0D0F14, and high-visibility text at #F8FAFC adhering to WCAG AAA standards."},
      {"principle": "Restrained Chromatic Energy", "detail": "Electric violet (#6366F1) and cyan (#38BDF8) accents used exclusively for interactive affordances and state indicators, preventing visual fatigue."},
      {"principle": "Precision Borders", "detail": "Subtle 1px boundaries (rgba(255,255,255,0.08)) define structural components without heavy drop shadows."}
    ]'::jsonb,
    '{"surface_base": "#07080B", "surface_card": "#0D0F14", "surface_hover": "#131720", "border_subtle": "rgba(255,255,255,0.08)", "accent_primary": "#6366F1", "accent_cyan": "#38BDF8"}'::jsonb,
    1
  ),
  (
    'Fluid Typographic Scale',
    'Typography Systems',
    'A mathematically harmonized typographic scale utilizing CSS clamp() for seamless responsiveness across mobile viewports, high-density laptops, and ultra-wide desktop monitors.',
    '[
      {"principle": "Fluid Clamp Calculations", "detail": "Headings scale smoothly with clamp(1.8rem, 4vw, 3.2rem), eliminating awkward breakpoint jumps."},
      {"principle": "Dual Font Pairing", "detail": "Geist Sans provides human readability for prose, paired with Geist Mono for code blocks, metrics, and technical specifications."},
      {"principle": "Strict Line Lengths", "detail": "Text reading columns capped at 65-75 characters (max-w-2xl) to optimize reading velocity."}
    ]'::jsonb,
    '{"font_sans": "Geist Sans, system-ui", "font_mono": "Geist Mono, monospace", "heading_hero": "clamp(2.5rem, 6vw, 4.5rem)", "body_base": "1rem / 1.6"}'::jsonb,
    2
  );
