import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const validPasscode =
      process.env.ADMIN_PASSCODE ||
      process.env.ADMIN_DEFAULT_PASSCODE ||
      "systems2026";

    if (!passcode || passcode !== validPasscode) {
      return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    }

    const res = NextResponse.json({ success: true, message: "Authentication successful." });
    // Set secure session cookie
    res.cookies.set("isb_admin_session", "authenticated_admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Admin auth error:", err);
    return NextResponse.json({ error: "Authentication service error." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out." });
  res.cookies.delete("isb_admin_session");
  return res;
}
