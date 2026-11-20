import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, getCacheTelemetry } from "@/lib/redis";
import { verifyAdminSession } from "@/lib/auth-security";
import { defaultPortfolioData, PortfolioData, ProjectItem } from "@/data/default-portfolio";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    // 1. Try Redis Cache first for blazing fast retrieval
    const cached = await cacheGet<PortfolioData>("portfolio:all");
    if (cached) {
      return NextResponse.json(
        { data: cached, source: "redis", telemetry: getCacheTelemetry() },
        { headers: { "X-Cache": "HIT (Redis)", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
      );
    }

    // 2. Fetch from Supabase Postgres tables
    const supabase = getSupabaseServerClient();
    const [profileRes, projectsRes, resumeRes] = await Promise.all([
      supabase.from("portfolio_profile").select("*").eq("id", "main").single(),
      supabase.from("portfolio_projects").select("*").order("sort_order", { ascending: true }),
      supabase.from("portfolio_resume").select("*").eq("id", "main").single(),
    ]);

    const result: PortfolioData = {
      profile: profileRes.data
        ? {
            name: profileRes.data.name,
            role: profileRes.data.role,
            statusBadge: profileRes.data.status_badge,
            isAvailable: profileRes.data.is_available,
            timezoneOverlap: profileRes.data.timezone_overlap,
            architectureTag: profileRes.data.architecture_tag,
            headline: profileRes.data.headline,
            bio: profileRes.data.bio,
            email: profileRes.data.email,
            githubUrl: profileRes.data.github_url,
            linkedinUrl: profileRes.data.linkedin_url,
            pillars: profileRes.data.pillars || defaultPortfolioData.profile.pillars,
          }
        : defaultPortfolioData.profile,
      projects:
        projectsRes.data && projectsRes.data.length > 0
          ? projectsRes.data.map((p) => ({
              id: p.id,
              title: p.title,
              subtitle: p.subtitle,
              category: p.category,
              badge: p.badge,
              badgeColor: p.badge_color,
              description: p.description,
              highlights: p.highlights || [],
              metrics: p.metrics || [],
              stack: p.stack || [],
              terminalCmd: p.terminal_cmd,
            }))
          : defaultPortfolioData.projects,
      resume: resumeRes.data
        ? {
            summary: resumeRes.data.summary,
            competencies: resumeRes.data.competencies || defaultPortfolioData.resume.competencies,
            workReadiness: resumeRes.data.work_readiness || defaultPortfolioData.resume.workReadiness,
          }
        : defaultPortfolioData.resume,
    };

    // 3. Store in Redis with 24h TTL
    await cacheSet("portfolio:all", result, 86400);

    return NextResponse.json(
      { data: result, source: "database", telemetry: getCacheTelemetry() },
      { headers: { "X-Cache": "MISS (Supabase Postgres)", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err: unknown) {
    console.warn("[API /portfolio] Error fetching portfolio:", err);
    return NextResponse.json({ data: defaultPortfolioData, source: "defaults" });
  }
}

export async function POST(req: NextRequest) {
  // Enforce safest admin session verification
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access: Valid admin session required" }, { status: 401 });
  }

  try {
    const payload: PortfolioData = await req.json();
    if (!payload.profile || !payload.projects || !payload.resume) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // 1. Update Profile in Supabase
    await supabase.from("portfolio_profile").upsert([
      {
        id: "main",
        name: payload.profile.name,
        role: payload.profile.role,
        headline: payload.profile.headline,
        bio: payload.profile.bio,
        is_available: payload.profile.isAvailable,
        status_badge: payload.profile.statusBadge,
        timezone_overlap: payload.profile.timezoneOverlap,
        architecture_tag: payload.profile.architectureTag,
        email: payload.profile.email,
        github_url: payload.profile.githubUrl,
        linkedin_url: payload.profile.linkedinUrl,
        pillars: payload.profile.pillars,
        updated_at: new Date().toISOString(),
      },
    ]);

    // 2. Update Projects in Supabase (upsert all and delete removed ones)
    const existingProjects = await supabase.from("portfolio_projects").select("id");
    const newProjectIds = new Set(payload.projects.map((p) => p.id));

    if (existingProjects.data) {
      const toDelete = existingProjects.data.filter((p) => !newProjectIds.has(p.id)).map((p) => p.id);
      if (toDelete.length > 0) {
        await supabase.from("portfolio_projects").delete().in("id", toDelete);
      }
    }

    const projectRows = payload.projects.map((p: ProjectItem, idx: number) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      badge: p.badge,
      badge_color: p.badgeColor || null,
      description: p.description,
      highlights: p.highlights,
      metrics: p.metrics,
      stack: p.stack,
      terminal_cmd: p.terminalCmd,
      sort_order: idx,
      updated_at: new Date().toISOString(),
    }));

    await supabase.from("portfolio_projects").upsert(projectRows);

    // 3. Update Resume in Supabase
    await supabase.from("portfolio_resume").upsert([
      {
        id: "main",
        summary: payload.resume.summary,
        competencies: payload.resume.competencies,
        work_readiness: payload.resume.workReadiness,
        updated_at: new Date().toISOString(),
      },
    ]);

    // 4. Invalidate & update Redis cache immediately so all edge nodes have fresh data
    await cacheSet("portfolio:all", payload, 86400);

    return NextResponse.json({ success: true, telemetry: getCacheTelemetry() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to persist portfolio data";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
