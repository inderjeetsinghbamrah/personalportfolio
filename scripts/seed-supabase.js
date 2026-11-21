const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SECRET_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

async function runSeed() {
  console.log('Seeding Supabase database for Inderjeet Singh Bamrah...');

  // 1. Profile
  const profileData = {
    slug: 'inderjeet',
    full_name: 'Inderjeet Singh Bamrah',
    headline: 'Engineering Digital Experiences. Building What\'s Next.',
    subheadline: 'I bridge the gap between thoughtful design and robust engineering, creating digital products that are beautiful, performant and built to scale.',
    professional_identity: 'Full-Stack Developer | Software Architect | UI/UX Designer | Product Engineer',
    positioning: 'I design thoughtful digital experiences and engineer scalable software systems.',
    bio: 'With a deep academic foundation holding a B.Tech in Information Technology and M.Tech in Computer Science / IT, I combine rigorous systems thinking with modern product engineering. Having served as an Assistant Professor and currently working as a Lecturer in Information Technology, I bring an educator\'s clarity, an architect\'s structural rigor, and a designer\'s attention to detail to building reliable, scalable software products.',
    email: 'inderjeet.bamrah@gmail.com',
    github_url: 'https://github.com/inderjeetsingh',
    linkedin_url: 'https://linkedin.com/in/inderjeetsinghbamrah',
    location: 'India',
    is_available: true,
    availability_status: 'Available for High-Impact Full-Stack & Architectural Projects',
    interests: [
      'Building scalable SaaS products',
      'Designing exceptional user experiences',
      'Full-stack application development',
      'Database architecture',
      'Distributed systems',
      'Cloud infrastructure',
      'Developer tooling',
      'AI-powered applications'
    ],
    philosophy: [
      {
        title: 'Design is Communication',
        quote: 'Design is not decoration. It is how a system communicates.',
        description: 'Every pixel, visual hierarchy choice, and interaction communicates state, intent, and reliability. High-craft design reduces cognitive load and turns complex technical workflows into intuitive actions.'
      },
      {
        title: 'Performance is a Feature',
        quote: 'Performance is a feature, not an afterthought.',
        description: 'Sub-millisecond queries, streaming SSR, optimized bundle sizes, and minimal client overhead aren\'t luxury items—they are fundamental user rights that define software trust.'
      },
      {
        title: 'Manageable Complexity',
        quote: 'Good architecture makes future complexity manageable.',
        description: 'Premature abstractions create drag, but thoughtful domain boundaries, typed contracts, and clean separation of concerns enable rapid iteration without fragile regressions.'
      },
      {
        title: 'Type Safety & Integrity',
        quote: 'Type safety and data integrity are non-negotiable in production.',
        description: 'From PostgreSQL relational constraints to end-to-end TypeScript interfaces, enforcing invariants at compile time and database schemas eliminates entire classes of runtime anomalies.'
      }
    ]
  };

  const { data: pCheck } = await supabase.from('profiles').select('id').eq('slug', 'inderjeet').maybeSingle();
  if (pCheck) {
    await supabase.from('profiles').update(profileData).eq('id', pCheck.id);
  } else {
    await supabase.from('profiles').insert([profileData]);
  }
  console.log('✓ Profile seeded');

  // 2. Project Categories
  const categories = [
    { id: 'c1000000-0000-0000-0000-000000000001', slug: 'saas', name: 'SaaS Applications', description: 'Scalable multi-tenant cloud software platforms', sort_order: 1 },
    { id: 'c1000000-0000-0000-0000-000000000002', slug: 'devtools', name: 'Developer Tools', description: 'Developer productivity, CLI utilities, and simulators', sort_order: 2 },
    { id: 'c1000000-0000-0000-0000-000000000003', slug: 'ai-apps', name: 'AI Applications', description: 'Intelligent systems, vector retrieval, and agentic workflows', sort_order: 3 },
    { id: 'c1000000-0000-0000-0000-000000000004', slug: 'api-products', name: 'API Products', description: 'High-throughput RESTful services, caching, and gateways', sort_order: 4 },
    { id: 'c1000000-0000-0000-0000-000000000005', slug: 'ui-ux', name: 'UI/UX Experiments', description: 'Design systems, micro-interactions, and accessibility', sort_order: 5 },
    { id: 'c1000000-0000-0000-0000-000000000006', slug: 'devops', name: 'Infrastructure & DevOps', description: 'Containerization, Kubernetes, CI/CD, and orchestration', sort_order: 6 }
  ];

  for (const cat of categories) {
    const { data: existing } = await supabase.from('project_categories').select('id').eq('slug', cat.slug).maybeSingle();
    if (existing) {
      await supabase.from('project_categories').update(cat).eq('id', existing.id);
    } else {
      await supabase.from('project_categories').insert([cat]);
    }
  }
  console.log('✓ Project categories seeded');

  // 3. Technologies
  const technologies = [
    { slug: 'react', name: 'React', category: 'Frontend', icon: 'Atom', how_i_use_it: 'Building reactive interfaces with concurrent rendering, server components, custom hooks, and state machines.', related_tech: ['Next.js', 'TypeScript', 'Tailwind CSS'], sort_order: 1 },
    { slug: 'nextjs', name: 'Next.js', category: 'Frontend', icon: 'Globe', how_i_use_it: 'Architecting full-stack web applications with App Router, Server Actions, Edge Middleware, and streaming SSR.', related_tech: ['React', 'TypeScript', 'Vercel'], sort_order: 2 },
    { slug: 'typescript', name: 'TypeScript', category: 'Frontend', icon: 'FileCode', how_i_use_it: 'Enforcing end-to-end type safety from database schemas to client-side API contracts and component props.', related_tech: ['React', 'Next.js', 'Node.js'], sort_order: 3 },
    { slug: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', how_i_use_it: 'Engineering responsive, token-based design systems with zero runtime overhead and atomic utility classes.', related_tech: ['Design Systems', 'Figma', 'React'], sort_order: 4 },
    { slug: 'figma', name: 'Figma', category: 'Design', icon: 'PenTool', how_i_use_it: 'Prototyping responsive interfaces, wireframing user journeys, and structuring modular design tokens.', related_tech: ['UI/UX', 'Design Systems', 'Tailwind CSS'], sort_order: 5 },
    { slug: 'nodejs', name: 'Node.js', category: 'Backend', icon: 'Server', how_i_use_it: 'Building asynchronous microservices, runtime background jobs, and high-performance serverless endpoints.', related_tech: ['Express', 'TypeScript', 'REST APIs'], sort_order: 6 },
    { slug: 'express', name: 'Express', category: 'Backend', icon: 'Cpu', how_i_use_it: 'Creating modular RESTful APIs with structured middleware, JWT authentication, and request sanitization.', related_tech: ['Node.js', 'PostgreSQL', 'REST APIs'], sort_order: 7 },
    { slug: 'rust', name: 'Rust', category: 'Backend', icon: 'Flame', how_i_use_it: 'Developing high-throughput, memory-safe backend utilities, CLI tooling, and compute-heavy background tasks.', related_tech: ['Node.js', 'Docker', 'DevOps'], sort_order: 8 },
    { slug: 'rest-apis', name: 'REST APIs', category: 'Backend', icon: 'Network', how_i_use_it: 'Designing idempotent, resource-oriented HTTP APIs adhering to OpenAPI/Swagger standards.', related_tech: ['Node.js', 'Express', 'TypeScript'], sort_order: 9 },
    { slug: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: 'Database', how_i_use_it: 'Designing normalized relational schemas, foreign keys, composite indexes, JSONB operators, and triggers.', related_tech: ['Supabase', 'Prisma', 'Redis'], sort_order: 10 },
    { slug: 'supabase', name: 'Supabase', category: 'Database', icon: 'Zap', how_i_use_it: 'Utilizing managed Postgres, Row Level Security (RLS) policies, storage buckets, and realtime change streams.', related_tech: ['PostgreSQL', 'Next.js', 'Auth'], sort_order: 11 },
    { slug: 'redis', name: 'Redis', category: 'Database', icon: 'Layers', how_i_use_it: 'Implementing sub-millisecond caching layers, rate limiting with sliding windows, and pub/sub message brokers.', related_tech: ['PostgreSQL', 'Node.js', 'Next.js'], sort_order: 12 },
    { slug: 'prisma', name: 'Prisma', category: 'Database', icon: 'Code2', how_i_use_it: 'Type-safe ORM for database migrations, declarative data modeling, and compile-time query validation.', related_tech: ['PostgreSQL', 'TypeScript', 'Next.js'], sort_order: 13 },
    { slug: 'docker', name: 'Docker', category: 'Infrastructure', icon: 'Box', how_i_use_it: 'Containerizing full-stack microservices with multi-stage builds, non-root runtimes, and minimal attack surface.', related_tech: ['Kubernetes', 'CI/CD', 'GitHub Actions'], sort_order: 14 },
    { slug: 'kubernetes', name: 'Kubernetes', category: 'Infrastructure', icon: 'Boxes', how_i_use_it: 'Orchestrating containerized workloads with Ingress controllers, Services, ConfigMaps, and Pod autoscaling.', related_tech: ['Docker', 'DevOps', 'Cloud'], sort_order: 15 },
    { slug: 'github-actions', name: 'GitHub Actions', category: 'Infrastructure', icon: 'GitBranch', how_i_use_it: 'Automating CI/CD pipelines with automated test suites, linting, Docker image builds, and Vercel deploys.', related_tech: ['Docker', 'CI/CD', 'Next.js'], sort_order: 16 },
    { slug: 'ui-ux', name: 'UI/UX Design', category: 'Design', icon: 'Layout', how_i_use_it: 'Crafting user-centered workflows, cognitive hierarchy, micro-interactions, and accessibility (WCAG AAA).', related_tech: ['Figma', 'Design Systems', 'Tailwind CSS'], sort_order: 17 },
    { slug: 'design-systems', name: 'Design Systems', category: 'Design', icon: 'Component', how_i_use_it: 'Constructing composable UI component primitives with documented states, tokens, and contrast standards.', related_tech: ['Figma', 'Tailwind CSS', 'React'], sort_order: 18 }
  ];

  for (const t of technologies) {
    const { data: existing } = await supabase.from('technologies').select('id').eq('slug', t.slug).maybeSingle();
    if (existing) {
      await supabase.from('technologies').update(t).eq('id', existing.id);
    } else {
      await supabase.from('technologies').insert([t]);
    }
  }
  console.log('✓ Technologies seeded');

  // 4. Projects
  const projects = [
    {
      slug: 'eduobal',
      title: 'EDUOBAL: Outcome-Based Education SaaS',
      tagline: 'Multi-tenant institutional platform automating NBA/NAAC Outcome-Based Education (OBE) accreditation and attainment analysis.',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      category_name: 'SaaS Applications',
      is_featured: true,
      is_published: true,
      sort_order: 1,
      overview: 'EDUOBAL is a comprehensive higher education SaaS platform engineered to streamline Outcome-Based Education (OBE) compliance, multi-tier institutional management, student attendance, course syllabus tracking, continuous internal assessments, and complex CO-PO (Course Outcome to Program Outcome) attainment matrices required by international accreditation bodies (e.g. Washington Accord / NBA / NAAC).',
      problem_statement: 'Higher education institutions face immense bureaucratic overhead manually aggregating thousands of student marks across continuous internal assessments, laboratory sessions, and end-semester examinations to calculate CO-PO attainment. Existing academic ERPs are monolithic, clunky, lack transparent mathematical calculation engines, and do not offer secure multi-tenancy.',
      solution: 'Engineered a modern multi-tenant cloud architecture using Next.js App Router, Supabase PostgreSQL with tenant-isolated Row Level Security, and an interactive mathematical attainment matrix calculation engine. The system automates threshold calculations, generates audit-ready accreditation reports, and provides real-time departmental dashboards.',
      interactive_demo_type: 'eduobal',
      architecture_diagram: {
        client: 'Next.js 14 Client Components (SSR + Responsive Tabs)',
        api: 'Next.js Server Actions & API Route Handlers',
        database: 'Supabase PostgreSQL 17 with Multi-Tenant RLS',
        cache: 'Upstash Redis for Attainment Matrix Aggregation',
        security: 'Role-Based Access Control (Admin, HOD, Faculty, Student)'
      },
      database_design: {
        tables: [
          'institutes (id, name, code, domain)',
          'departments (id, institute_id, name, code)',
          'programs (id, department_id, name, pso_json)',
          'courses (id, program_id, code, title, credits)',
          'course_outcomes (id, course_id, code, bloom_level, target_pct)',
          'assessments (id, course_id, name, max_marks, co_mapping_json)',
          'student_scores (id, assessment_id, student_id, marks_obtained)',
          'co_po_matrix (id, course_id, co_code, po_mappings_json)'
        ]
      },
      engineering_challenges: [
        { title: 'Non-Linear Matrix Aggregation', description: 'Formulating an efficient algorithmic pipeline to compute weighted CO-PO matrices across varying assessment rubrics without triggering high database compute spikes.' },
        { title: 'Multi-Tenant Data Isolation', description: 'Ensuring strict institutional multi-tenancy using PostgreSQL Row Level Security with zero cross-tenant data leakage risks.' },
        { title: 'Dynamic Bloom\'s Taxonomy Weighting', description: 'Allowing faculty to define flexible assessment questions mapped to Cognitive Levels (Recall, Understand, Apply, Analyze, Evaluate, Create) with real-time recalculation.' }
      ],
      key_decisions: [
        { decision: 'PostgreSQL RLS for Tenant Separation', reason: 'Avoids application-level query filtering bugs by delegating isolation directly to the database kernel.' },
        { decision: 'Server-Side Attainment Computation', reason: 'Guarantees deterministic calculation across thousands of student assessment records without burdening client memory.' },
        { decision: 'Modular Accreditation Export', reason: 'Structures calculation output into standardized NBA/NAAC format tables exportable to CSV and printable audit records.' }
      ],
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Redis'],
      github_url: 'https://github.com/inderjeetsingh/eduobal',
      live_demo_url: '#eduobal-demo'
    },
    {
      slug: 'sysflow',
      title: 'SysFlow: Distributed Task Orchestration Engine',
      tagline: 'Resilient directed acyclic graph (DAG) task runner with Redis Streams and stateful compensation workflows.',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      category_name: 'Developer Tools',
      is_featured: true,
      is_published: true,
      sort_order: 2,
      overview: 'A high-reliability distributed task engine designed to coordinate complex multi-step backend operations with automatic retries, exponential backoff, dead-letter queues, and rollback compensations (Saga pattern).',
      problem_statement: 'Complex distributed workflows across heterogeneous services fail due to transient network drops, rate limits, or partial service outages. Building custom retry and rollback logic in every microservice creates spaghetti code and inconsistent error recovery states.',
      solution: 'Architected an event-driven DAG execution model backed by Redis Streams for message persistence and PostgreSQL for durable state checkpoints. Operators can inspect live graph transitions and replay failed nodes with zero data loss.',
      interactive_demo_type: 'sysflow',
      architecture_diagram: {
        orchestrator: 'TypeScript DAG Scheduler Engine',
        queue: 'Redis Streams Consumer Groups',
        state: 'Supabase Postgres Event Store',
        monitoring: 'Server-Sent Events (SSE) Live Execution Graph'
      },
      database_design: {
        tables: [
          'workflow_definitions (id, name, dag_json)',
          'workflow_executions (id, definition_id, status, started_at)',
          'task_nodes (id, execution_id, step_name, status, payload, retry_count)'
        ]
      },
      engineering_challenges: [
        { title: 'Race-Free Worker Heartbeats', description: 'Preventing zombie task re-executions during worker node network partitions through distributed Redis leases.' },
        { title: 'Saga Rollback Coordination', description: 'Executing compensating reverse transactions in reverse topological order when a terminal step fails.' }
      ],
      key_decisions: [
        { decision: 'Redis Streams over RabbitMQ', reason: 'Stream consumer groups provide high read throughput and native at-least-once delivery with lightweight deployment overhead.' },
        { decision: 'Topological Sort in TypeScript', reason: 'Enables dependency validation and cyclic graph detection prior to workflow dispatch.' }
      ],
      technologies: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
      github_url: 'https://github.com/inderjeetsingh/sysflow',
      live_demo_url: '#sysflow-demo'
    },
    {
      slug: 'devpulse',
      title: 'DevPulse: Edge Log & Telemetry Pipeline',
      tagline: 'High-throughput edge ingestion proxy with micro-batching, geo-routing, and live metric aggregation.',
      category_id: 'c1000000-0000-0000-0000-000000000004',
      category_name: 'API Products',
      is_featured: false,
      is_published: true,
      sort_order: 3,
      overview: 'A telemetry ingestion proxy designed to capture application metrics, error traces, and request events at the edge, batching them intelligently before shipping to long-term analytical storage.',
      problem_statement: 'High-volume edge requests generating immediate database writes degrade database connection pools and inflate cloud costs.',
      solution: 'Engineered an edge ingestion route with in-memory buffering, compression, and batched bulk inserts into PostgreSQL with time-partitioned schemas.',
      interactive_demo_type: 'devpulse',
      architecture_diagram: {
        edge: 'Edge Runtime Ingestion Gateway',
        buffer: 'Worker In-Memory Ring Buffer',
        storage: 'PostgreSQL Partitioned Timeseries Tables'
      },
      database_design: {
        tables: [
          'telemetry_events (timestamp, service_id, event_type, duration_ms, payload_json)',
          'service_metrics (service_id, window_minute, avg_latency, error_rate)'
        ]
      },
      engineering_challenges: [
        { title: 'Buffer Eviction under Load', description: 'Implementing adaptive sampling rates when edge memory thresholds are approached during DDoS traffic bursts.' }
      ],
      key_decisions: [
        { decision: 'Time-Partitioned Tables', reason: 'Significantly speeds up analytical range queries and allows instantaneous dropping of expired log partitions.' }
      ],
      technologies: ['Next.js Edge', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      github_url: 'https://github.com/inderjeetsingh/devpulse',
      live_demo_url: '#devpulse-demo'
    },
    {
      slug: 'prismui',
      title: 'PrismUI: Architectural Design System & Token Studio',
      tagline: 'Accessible, token-driven component architecture with mathematical contrast validation and dynamic themes.',
      category_id: 'c1000000-0000-0000-0000-000000000005',
      category_name: 'UI/UX Experiments',
      is_featured: false,
      is_published: true,
      sort_order: 4,
      overview: 'An open-source design engineering playground and headless component token studio exploring accessible UI states, semantic contrast ratios, and modular CSS variables.',
      problem_statement: 'Designers and frontend engineers often misalign on spacing scales, interactive states (focus-visible vs active), and WCAG accessibility compliance across dark/light mode themes.',
      solution: 'Constructed a live token exploration workbench allowing engineers to inspect component states, verify WCAG AAA contrast ratios in real time, and export token schemas to Tailwind CSS or CSS Custom Properties.',
      interactive_demo_type: 'prismui',
      architecture_diagram: {
        core: 'React Composable Primitives',
        tokens: 'CSS Custom Properties Engine',
        inspector: 'Real-Time Color Contrast Calculation Utility'
      },
      database_design: {
        tokens: [
          'spacing-scale (4px-64px)',
          'color-primitives (10-step palette)',
          'typography-scale (fluid clamp scales)',
          'elevation-tokens (shadows & border highlights)'
        ]
      },
      engineering_challenges: [
        { title: 'APCA & WCAG 2.1 Formulae', description: 'Implementing the perceptual contrast algorithm directly in browser JavaScript for instantaneous validation.' }
      ],
      key_decisions: [
        { decision: 'Zero Runtime CSS Engine', reason: 'Uses pure CSS variables to ensure theme changes happen instantly without React component re-render cascades.' }
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Design Systems'],
      github_url: 'https://github.com/inderjeetsingh/prismui',
      live_demo_url: '#prismui-demo'
    }
  ];

  for (const p of projects) {
    const { data: existing } = await supabase.from('projects').select('id').eq('slug', p.slug).maybeSingle();
    if (existing) {
      await supabase.from('projects').update(p).eq('id', existing.id);
    } else {
      await supabase.from('projects').insert([p]);
    }
  }
  console.log('✓ Projects seeded');

  // 5. Experience
  const experiences = [
    {
      role: 'Lecturer in Information Technology',
      organization: 'Department of Information Technology',
      period: 'Present',
      is_current: true,
      description: 'Delivering specialized lectures, laboratory instruction, and engineering project mentorship across modern software systems, web engineering, database architecture, and cloud technologies.',
      responsibilities: [
        'Instructing undergraduate engineering students in Full-Stack Web Architecture, Database Systems, and Cloud Engineering.',
        'Mentoring student teams in architecting end-to-end software capstone projects.',
        'Formulating and evaluating Outcome-Based Education (OBE) course outcome attainment matrices.',
        'Conducting workshops on modern developer workflows: Git, Docker, TypeScript, and REST APIs.'
      ],
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Database Architecture', 'System Design'],
      sort_order: 1
    },
    {
      role: 'Assistant Professor (B.Tech Computer Science / IT)',
      organization: 'Engineering Academic Institution',
      period: 'Past',
      is_current: false,
      description: 'Taught core computer science and engineering coursework, guided undergraduate technical research, and participated in curriculum modernization and accreditation documentation.',
      responsibilities: [
        'Taught core curriculum including Data Structures, Object-Oriented Software Design, Operating Systems, and Relational Database Systems.',
        'Designed practical laboratory assignments simulating production-grade engineering environments.',
        'Assisted departmental committees in NBA/NAAC accreditation compliance and academic audit documentation.',
        'Guided student research in distributed algorithms and software engineering methodologies.'
      ],
      technologies: ['C++', 'Java', 'PostgreSQL', 'Relational Database Theory', 'Software Engineering', 'Linux'],
      sort_order: 2
    },
    {
      role: 'Full-Stack Developer & Software Systems Consultant',
      organization: 'Independent Engineering Practice',
      period: 'Ongoing',
      is_current: false,
      description: 'Designing and developing tailored web applications, database schemas, and developer tooling for client products and educational initiatives.',
      responsibilities: [
        'Architecting responsive web applications using React, Next.js, and TypeScript.',
        'Designing normalized PostgreSQL database schemas and implementing Row Level Security policies.',
        'Establishing CI/CD deployment pipelines using GitHub Actions and containerized workflows.',
        'Prototyping intuitive user interfaces and modular design systems in Figma.'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Docker', 'Figma'],
      sort_order: 3
    }
  ];

  for (const exp of experiences) {
    const { data: existing } = await supabase.from('experience').select('id').eq('role', exp.role).maybeSingle();
    if (existing) {
      await supabase.from('experience').update(exp).eq('id', existing.id);
    } else {
      await supabase.from('experience').insert([exp]);
    }
  }
  console.log('✓ Experience seeded');

  // 6. Education
  const educations = [
    {
      degree: 'Master of Technology (M.Tech)',
      field: 'Computer Science & Information Technology',
      institution: 'Recognized Engineering University',
      period: 'Postgraduate',
      details: 'Advanced graduate study focused on distributed systems, advanced database engineering, algorithm analysis, and software quality assurance methodologies.',
      highlights: [
        'Specialized coursework in Distributed Computing, Advanced Database Architecture, and Cloud Systems.',
        'Conducted research into software engineering methodologies and automated test validation.',
        'Graduated with honors and departmental commendation.'
      ],
      sort_order: 1
    },
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Information Technology',
      institution: 'Recognized Engineering University',
      period: 'Undergraduate',
      details: 'Rigorous four-year engineering degree encompassing computer science fundamentals, data structures, computer networks, operating systems, and full-stack software development.',
      highlights: [
        'Comprehensive study of Computer Organization, Object-Oriented Analysis, and Discrete Mathematics.',
        'Developed multiple full-stack capstone projects and led student technical societies.',
        'Built strong foundational expertise in algorithms, relational databases, and systems programming.'
      ],
      sort_order: 2
    }
  ];

  for (const edu of educations) {
    const { data: existing } = await supabase.from('education').select('id').eq('degree', edu.degree).maybeSingle();
    if (existing) {
      await supabase.from('education').update(edu).eq('id', existing.id);
    } else {
      await supabase.from('education').insert([edu]);
    }
  }
  console.log('✓ Education seeded');

  // 7. Architecture Demos
  const demos = [
    {
      slug: 'nextjs-fullstack',
      title: 'Next.js 14 App Architecture',
      subtitle: 'Edge Network, React Server Components (RSC) & Streaming SSR',
      description: 'Demonstrates how modern Next.js utilizes Edge Middleware for authentication checks, React Server Components for zero-bundle data fetching, and progressive streaming to render instantaneous UI shells.',
      components: [
        { name: 'Client Browser', role: 'Interactivity & Hydrated Island Components', tech: 'React 18 / DOM' },
        { name: 'Edge Middleware', role: 'Auth Verification, Header Rewrites & Geolocation', tech: 'Vercel Edge Network' },
        { name: 'Server Components (RSC)', role: 'Zero-JS Server Execution, Direct DB Queries', tech: 'Node.js / Edge Runtime' },
        { name: 'Server Actions', role: 'Type-Safe Mutations & Form Submissions', tech: 'RPC Protocol' },
        { name: 'Streaming Pipeline', role: 'Progressive Suspense HTML Streaming', tech: 'HTTP/2 Chunked Transfer' }
      ],
      data_flow: [
        { step: 1, from: 'Client Browser', to: 'Edge Middleware', action: 'HTTPS Request with Session Cookie', latency: '8ms' },
        { step: 2, from: 'Edge Middleware', to: 'Server Components (RSC)', action: 'Verified Request Routed to RSC Tree', latency: '2ms' },
        { step: 3, from: 'Server Components (RSC)', to: 'Client Browser', action: 'Stream Fast Shell (Suspense Fallback)', latency: '15ms' },
        { step: 4, from: 'Server Components (RSC)', to: 'Client Browser', action: 'Stream Hydrated Data Payload', latency: '42ms' }
      ],
      sort_order: 1
    },
    {
      slug: 'supabase-db',
      title: 'Supabase & PostgreSQL Architecture',
      subtitle: 'PostgreSQL 17, Row Level Security & Connection Pooling',
      description: 'Illustrates modern database architecture leveraging PostgreSQL 17 with kernel-level Row Level Security policies, Supavisor connection pooling, and the write-ahead log (WAL) Realtime replication engine.',
      components: [
        { name: 'Application Server', role: 'Executes parameterized SQL queries with JWT identity', tech: 'Next.js / Node.js' },
        { name: 'Supavisor Pooler', role: 'Manages thousands of concurrent client connections', tech: 'Elixir / Supavisor' },
        { name: 'Postgres Kernel', role: 'Enforces RLS policies, constraints & indexes', tech: 'PostgreSQL 17' },
        { name: 'WAL Realtime Engine', role: 'Broadcasts database changes via WebSockets', tech: 'Logical Replication / Phoenix' },
        { name: 'Storage Engine', role: 'Durable NVMe storage with automated backups', tech: 'Block Storage' }
      ],
      data_flow: [
        { step: 1, from: 'Application Server', to: 'Supavisor Pooler', action: 'Acquire Pooled Transaction Connection', latency: '1ms' },
        { step: 2, from: 'Supavisor Pooler', to: 'Postgres Kernel', action: 'Execute Query with auth.uid() Session Context', latency: '3ms' },
        { step: 3, from: 'Postgres Kernel', to: 'Postgres Kernel', action: 'Evaluate RLS Policy (auth.uid() = tenant_id)', latency: '<1ms' },
        { step: 4, from: 'Postgres Kernel', to: 'Application Server', action: 'Return Filtered Row Payload', latency: '4ms' }
      ],
      sort_order: 2
    },
    {
      slug: 'redis-caching',
      title: 'Redis Cache-Aside & Rate Limiting',
      subtitle: 'Sub-millisecond In-Memory Caching & Sliding Window Protection',
      description: 'Visualizes how a distributed Redis cache intercepts read traffic to relieve relational database load and executes token-bucket or sliding-window rate limiting algorithms.',
      components: [
        { name: 'API Gateway', role: 'Checks rate limit counters before forwarding request', tech: 'Edge Worker' },
        { name: 'Redis In-Memory Cluster', role: 'Holds cached serialization payloads with TTLs', tech: 'Redis 7 / Upstash' },
        { name: 'Primary Database', role: 'Persistent source of truth queried on cache misses', tech: 'PostgreSQL' },
        { name: 'Cache Invalidator', role: 'Evicts keys on mutations (Stale-While-Revalidate)', tech: 'Event Bus' }
      ],
      data_flow: [
        { step: 1, from: 'API Gateway', to: 'Redis In-Memory Cluster', action: 'Check Rate Limit Key (INCRBY + EXPIRE)', latency: '1ms' },
        { step: 2, from: 'API Gateway', to: 'Redis In-Memory Cluster', action: 'Query Cached Response (GET cache:projects)', latency: '1ms' },
        { step: 3, from: 'Redis In-Memory Cluster', to: 'API Gateway', action: 'Cache HIT -> Instant 200 OK Response', latency: '1ms' },
        { step: 4, from: 'API Gateway', to: 'Primary Database', action: '(On MISS only) Query DB & Populate Redis', latency: '18ms' }
      ],
      sort_order: 3
    },
    {
      slug: 'k8s-devops',
      title: 'Kubernetes & Docker Orchestration',
      subtitle: 'Ingress, Services, Rolling Updates & Horizontal Pod Autoscaling',
      description: 'Details the production container lifecycle: automated multi-stage Docker builds, Kubernetes Ingress routing, ClusterIP service discovery, and declarative zero-downtime rolling deployments.',
      components: [
        { name: 'Traffic Ingress', role: 'TLS termination and path-based request routing', tech: 'Nginx / Traefik Ingress' },
        { name: 'ClusterIP Service', role: 'Internal load balancing across healthy pod replicas', tech: 'K8s Service' },
        { name: 'Pod Replicas', role: 'Stateless containerized application processes', tech: 'Docker / Alpine' },
        { name: 'HPA Controller', role: 'Monitors CPU/Memory and scales pods dynamically', tech: 'K8s Metrics Server' },
        { name: 'ConfigMaps & Secrets', role: 'Decoupled environment configuration', tech: 'K8s Config' }
      ],
      data_flow: [
        { step: 1, from: 'Traffic Ingress', to: 'ClusterIP Service', action: 'Forward Decrypted HTTPS Traffic', latency: '1ms' },
        { step: 2, from: 'ClusterIP Service', to: 'Pod Replicas', action: 'Round-Robin Dispatch to Healthy Pod', latency: '<1ms' },
        { step: 3, from: 'Pod Replicas', to: 'Pod Replicas', action: 'Execute Application Logic in Sandbox', latency: '12ms' },
        { step: 4, from: 'HPA Controller', to: 'Pod Replicas', action: 'Scale 2 -> 5 Replicas upon 75% CPU Threshold', latency: 'Event' }
      ],
      sort_order: 4
    }
  ];

  for (const d of demos) {
    const { data: existing } = await supabase.from('architecture_demos').select('id').eq('slug', d.slug).maybeSingle();
    if (existing) {
      await supabase.from('architecture_demos').update(d).eq('id', existing.id);
    } else {
      await supabase.from('architecture_demos').insert([d]);
    }
  }
  console.log('✓ Architecture demos seeded');

  // 8. Design Showcases
  const showcases = [
    {
      title: 'Obsidian Slate Design System',
      category: 'Color & Contrast Architecture',
      description: 'A precision-calibrated dark palette designed for extended engineering reading sessions, eliminating eye strain while maximizing typographic clarity.',
      principles: [
        { principle: 'Hierarchical Contrast', detail: 'Primary surfaces at #07080B, elevation cards at #0D0F14, and high-visibility text at #F8FAFC adhering to WCAG AAA standards.' },
        { principle: 'Restrained Chromatic Energy', detail: 'Electric violet (#6366F1) and cyan (#38BDF8) accents used exclusively for interactive affordances and state indicators, preventing visual fatigue.' },
        { principle: 'Precision Borders', detail: 'Subtle 1px boundaries (rgba(255,255,255,0.08)) define structural components without heavy drop shadows.' }
      ],
      tokens: { surface_base: '#07080B', surface_card: '#0D0F14', surface_hover: '#131720', border_subtle: 'rgba(255,255,255,0.08)', accent_primary: '#6366F1', accent_cyan: '#38BDF8' },
      sort_order: 1
    },
    {
      title: 'Fluid Typographic Scale',
      category: 'Typography Systems',
      description: 'A mathematically harmonized typographic scale utilizing CSS clamp() for seamless responsiveness across mobile viewports, high-density laptops, and ultra-wide desktop monitors.',
      principles: [
        { principle: 'Fluid Clamp Calculations', detail: 'Headings scale smoothly with clamp(1.8rem, 4vw, 3.2rem), eliminating awkward breakpoint jumps.' },
        { principle: 'Dual Font Pairing', detail: 'Geist Sans provides human readability for prose, paired with Geist Mono for code blocks, metrics, and technical specifications.' },
        { principle: 'Strict Line Lengths', detail: 'Text reading columns capped at 65-75 characters (max-w-2xl) to optimize reading velocity.' }
      ],
      tokens: { font_sans: 'Geist Sans, system-ui', font_mono: 'Geist Mono, monospace', heading_hero: 'clamp(2.5rem, 6vw, 4.5rem)', body_base: '1rem / 1.6' },
      sort_order: 2
    }
  ];

  for (const s of showcases) {
    const { data: existing } = await supabase.from('design_showcases').select('id').eq('title', s.title).maybeSingle();
    if (existing) {
      await supabase.from('design_showcases').update(s).eq('id', existing.id);
    } else {
      await supabase.from('design_showcases').insert([s]);
    }
  }
  console.log('✓ Design showcases seeded');

  console.log('\n🎉 ALL PORTFOLIO TABLES SEEDED SUCCESSFULLY IN SUPABASE!');
}

runSeed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
