import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

function checkAdminAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("isb_admin_session");
  const authHeader = req.headers.get("x-admin-passcode");
  const validPasscode = process.env.ADMIN_PASSCODE || process.env.ADMIN_DEFAULT_PASSCODE || "systems2026";
  
  if (cookie?.value === "authenticated_admin") return true;
  if (authHeader && authHeader === validPasscode) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  try {
    const [messagesRes, projectsRes, profileRes] = await Promise.all([
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("sort_order", { ascending: true }),
      supabase.from("profiles").select("*").eq("slug", "inderjeet").maybeSingle(),
    ]);

    return NextResponse.json({
      messages: messagesRes.data || [],
      projects: projectsRes.data || [],
      profile: profileRes.data || null,
    });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch admin data." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === "save_project") {
      const { id, ...projectData } = payload;
      if (id) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
      }
      return NextResponse.json({ success: true, message: "Project saved successfully." });
    }

    if (action === "update_profile") {
      const profileData = { ...payload };
      delete profileData.id;
      const { error } = await supabase.from("profiles").update(profileData).eq("slug", "inderjeet");
      if (error) throw error;
      return NextResponse.json({ success: true, message: "Profile updated successfully." });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (err: unknown) {
    console.error("Admin mutation error:", err);
    const message = err instanceof Error ? err.message : "Mutation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "project" or "message"
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  try {
    if (type === "project") {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: "Project deleted." });
    }

    if (type === "message") {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: "Message deleted." });
    }

    return NextResponse.json({ error: "Invalid type." }, { status: 400 });
  } catch (err: unknown) {
    console.error("Admin delete error:", err);
    const message = err instanceof Error ? err.message : "Deletion failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
