-- =========================================================================
-- AWARD-WINNING DEVELOPER PORTFOLIO - PRODUCTION DATABASE SCHEMA
-- Inderjeet Singh Bamrah | Full-Stack Developer & Software Architect
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL DEFAULT 'inderjeet',
  full_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  professional_identity TEXT NOT NULL,
  positioning TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'India',
  is_available BOOLEAN NOT NULL DEFAULT true,
  availability_status TEXT NOT NULL DEFAULT 'Available for Full-Stack & Software Architecture Roles',
  resume_url TEXT,
  interests JSONB NOT NULL DEFAULT '[]'::jsonb,
  philosophy JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read profiles" ON public.profiles;
CREATE POLICY "Public can read profiles" ON public.profiles FOR SELECT USING (true);

-- 2. PROJECT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.project_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read project_categories" ON public.project_categories;
CREATE POLICY "Public can read project_categories" ON public.project_categories FOR SELECT USING (true);

-- 3. TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Database', 'Infrastructure', 'Design'
  icon TEXT,
  how_i_use_it TEXT NOT NULL,
  related_tech JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read technologies" ON public.technologies;
CREATE POLICY "Public can read technologies" ON public.technologies FOR SELECT USING (true);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  overview TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  interactive_demo_type TEXT, -- e.g. 'eduobal', 'sysflow', 'apexkv', 'devpulse'
  architecture_diagram JSONB NOT NULL DEFAULT '{}'::jsonb,
  database_design JSONB NOT NULL DEFAULT '{}'::jsonb,
  engineering_challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
  key_decisions JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  github_url TEXT,
  live_demo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published projects" ON public.projects;
CREATE POLICY "Public can read published projects" ON public.projects FOR SELECT USING (is_published = true);

-- 5. PROJECT_TECHNOLOGIES (M2M junction)
CREATE TABLE IF NOT EXISTS public.project_technologies (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES public.technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read project_technologies" ON public.project_technologies;
CREATE POLICY "Public can read project_technologies" ON public.project_technologies FOR SELECT USING (true);

-- 6. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read experience" ON public.experience;
CREATE POLICY "Public can read experience" ON public.experience FOR SELECT USING (true);

-- 7. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  details TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read education" ON public.education;
CREATE POLICY "Public can read education" ON public.education FOR SELECT USING (true);

-- 8. DESIGN SHOWCASES TABLE
CREATE TABLE IF NOT EXISTS public.design_showcases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  principles JSONB NOT NULL DEFAULT '[]'::jsonb,
  tokens JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.design_showcases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read design_showcases" ON public.design_showcases;
CREATE POLICY "Public can read design_showcases" ON public.design_showcases FOR SELECT USING (true);

-- 9. ARCHITECTURE DEMOS TABLE
CREATE TABLE IF NOT EXISTS public.architecture_demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  components JSONB NOT NULL DEFAULT '[]'::jsonb,
  data_flow JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.architecture_demos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read architecture_demos" ON public.architecture_demos;
CREATE POLICY "Public can read architecture_demos" ON public.architecture_demos FOR SELECT USING (true);

-- 10. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  focus TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert contact_messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 11. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site_settings" ON public.site_settings;
CREATE POLICY "Public can read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_published_sort ON public.projects (is_published, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category_id);
CREATE INDEX IF NOT EXISTS idx_technologies_category ON public.technologies (category, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_experience_sort ON public.experience (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_education_sort ON public.education (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages (created_at DESC);
