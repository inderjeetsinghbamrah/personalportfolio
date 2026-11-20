import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession, updateAdminPasscode, getAdminCredentials, verifyPassword } from "@/lib/auth-security";

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access: Valid session required" }, { status: 401 });
  }

  try {
    const { currentPasscode, newPasscode } = await req.json();
    if (!currentPasscode || !newPasscode) {
      return NextResponse.json({ error: "Current and new passcodes are required" }, { status: 400 });
    }

    const creds = await getAdminCredentials();
    const isValid = verifyPassword(currentPasscode, creds.hash, creds.salt);
    if (!isValid) {
      return NextResponse.json({ error: "Current passcode is incorrect" }, { status: 403 });
    }

    const res = await updateAdminPasscode(newPasscode);
    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update passcode";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
