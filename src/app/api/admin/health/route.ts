import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth-security";

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json(
      { error: "Unauthorized access: Valid session required" },
      { status: 401 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

  if (!url || !key) {
    return NextResponse.json({
      connected: false,
      error: "Supabase environment variables not configured in .env",
    });
  }

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: key },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json({
        connected: true,
        version: data?.version || "v2.x",
      });
    } else {
      return NextResponse.json({
        connected: false,
        error: `HTTP ${res.status}: ${res.statusText}`,
      });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    return NextResponse.json({
      connected: false,
      error: msg,
    });
  }
}
