import { NextRequest, NextResponse } from "next/server";
import { 
  getAdminCredentials, 
  verifyPassword, 
  createAdminSession, 
  verifyAdminSession, 
  revokeAdminSession,
  checkLoginRateLimit 
} from "@/lib/auth-security";

export async function GET() {
  const isValid = await verifyAdminSession();
  return NextResponse.json({ authenticated: isValid });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    
    // Enforce rate limiting
    const rateCheck = await checkLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { 
          error: `Too many login attempts. Access locked for ${Math.ceil(rateCheck.resetIn / 60)} minutes.`,
          locked: true 
        },
        { status: 429 }
      );
    }

    const { passcode } = await req.json();
    if (!passcode) {
      return NextResponse.json({ error: "Passcode is required" }, { status: 400 });
    }

    const creds = await getAdminCredentials();
    const isValid = verifyPassword(passcode, creds.hash, creds.salt);

    if (!isValid) {
      return NextResponse.json(
        { 
          error: "Invalid Security Passcode", 
          remainingAttempts: rateCheck.remaining 
        },
        { status: 401 }
      );
    }

    // Passcode valid: create hardened session
    const userAgent = req.headers.get("user-agent") || undefined;
    await createAdminSession(ip, userAgent);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server authentication error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  await revokeAdminSession();
  return NextResponse.json({ success: true });
}
