export interface Profile {
  id?: string;
  slug: string;
  full_name: string;
  headline: string;
  subheadline: string;
  professional_identity: string;
  positioning: string;
  bio: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  location: string;
  is_available: boolean;
  availability_status: string;
  resume_url?: string;
  interests: string[];
  philosophy: Array<{
    title: string;
    quote: string;
    description: string;
  }>;
}

export interface ProjectCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sort_order: number;
}

export interface Technology {
  id?: string;
  slug: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Infrastructure' | 'Design';
  icon?: string;
  how_i_use_it: string;
  related_tech: string[];
  sort_order: number;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  category_id?: string;
  category_name: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  overview: string;
  problem_statement: string;
  solution: string;
  interactive_demo_type?: 'eduobal' | 'sysflow' | 'devpulse' | 'prismui';
  architecture_diagram: Record<string, string>;
  database_design: {
    tables?: string[];
    tokens?: string[];
  };
  engineering_challenges: Array<{
    title: string;
    description: string;
  }>;
  key_decisions: Array<{
    decision: string;
    reason: string;
  }>;
  technologies: string[];
  github_url?: string;
  live_demo_url?: string;
}

export interface Experience {
  id?: string;
  role: string;
  organization: string;
  period: string;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  sort_order: number;
}

export interface Education {
  id?: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  details: string;
  highlights: string[];
  sort_order: number;
}

export interface ArchitectureDemo {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  components: Array<{
    name: string;
    role: string;
    tech: string;
  }>;
  data_flow: Array<{
    step: number;
    from: string;
    to: string;
    action: string;
    latency: string;
  }>;
  sort_order: number;
}

export interface DesignShowcase {
  id?: string;
  title: string;
  category: string;
  description: string;
  principles: Array<{
    principle: string;
    detail: string;
  }>;
  tokens: Record<string, string>;
  sort_order: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  focus: string;
  message: string;
  created_at?: string;
  is_read?: boolean;
}
