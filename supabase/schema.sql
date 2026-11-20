-- ==============================================================
-- PRODUCTION SUPABASE SCHEMA FOR PERSONAL PORTFOLIO
-- Cloud Database Architecture & Row Level Security Setup
-- ==============================================================

-- 1. Contact Form Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  focus TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public anonymous inserts" ON public.messages;
CREATE POLICY "Allow public anonymous inserts"
  ON public.messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read-only access" ON public.messages;
CREATE POLICY "Allow authenticated read-only access"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (true);

-- 2. Dynamic Profile & SLA Parameters Table
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  status_badge TEXT NOT NULL,
  timezone_overlap TEXT NOT NULL,
  architecture_tag TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  pillars JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read portfolio_profile" ON public.portfolio_profile;
CREATE POLICY "Allow public read portfolio_profile"
  ON public.portfolio_profile
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 3. Dynamic Projects Dossier Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT NOT NULL,
  badge_color TEXT,
  description TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  terminal_cmd TEXT NOT NULL,
  github_url TEXT,
  live_demo_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Allow public read portfolio_projects"
  ON public.portfolio_projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_sort ON public.portfolio_projects (sort_order ASC);

-- 4. Dynamic Resume & Competencies Table
CREATE TABLE IF NOT EXISTS public.portfolio_resume (
  id TEXT PRIMARY KEY DEFAULT 'main',
  summary TEXT NOT NULL,
  competencies JSONB NOT NULL DEFAULT '{}'::jsonb,
  work_readiness JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.portfolio_resume ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read portfolio_resume" ON public.portfolio_resume;
CREATE POLICY "Allow public read portfolio_resume"
  ON public.portfolio_resume
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. Hardened Admin Credentials (PBKDF2-SHA512 + Salt)
CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id TEXT PRIMARY KEY DEFAULT 'owner',
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
-- No public RLS access: accessible only via server-side service_role

-- 6. Cryptographically Signed Admin Sessions
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  token_hash TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL DEFAULT 'owner',
  ip_address TEXT,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
-- No public RLS access: managed exclusively via server-side session validator
