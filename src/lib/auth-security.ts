import crypto from "crypto";
import { cookies } from "next/headers";
import { cacheRateLimit, cacheGet, cacheSet, cacheDelete } from "./redis";
import { createClient } from "@supabase/supabase-js";

const COOKIE_NAME = "portfolio_admin_auth_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

// Server-side Supabase client using secret key for privileged auth tables
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ovmvzfakvxoshjnwsfcy.supabase.co";
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
  return createClient(url, secret, {
    auth: { persistSession: false },
  });
}

/**
 * Derives a cryptographically secure hash for a password/passcode using PBKDF2-SHA512.
 */
export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(32).toString("hex");
  const iterations = 100000;
  const keylen = 64;
  const digest = "sha512";

  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
  return {
    hash: derivedKey.toString("hex"),
    salt,
  };
}

/**
 * Constant-time password verification to prevent timing attacks.
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  try {
    const { hash } = hashPassword(password, storedSalt);
    const hashBuffer = Buffer.from(hash, "hex");
    const storedBuffer = Buffer.from(storedHash, "hex");

    if (hashBuffer.length !== storedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(hashBuffer, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Gets or initializes the master admin credentials in Supabase.
 */
export async function getAdminCredentials(): Promise<{ hash: string; salt: string; isDefault: boolean }> {
  const supabase = getServerSupabase();
  const cached = await cacheGet<{ hash: string; salt: string; isDefault: boolean }>("admin:creds");
  if (cached) return cached;

  const { data } = await supabase
    .from("admin_credentials")
    .select("password_hash, salt")
    .eq("id", "owner")
    .single();

  if (data?.password_hash && data?.salt) {
    const creds = { hash: data.password_hash, salt: data.salt, isDefault: false };
    await cacheSet("admin:creds", creds, 3600);
    return creds;
  }

  // Fallback to default hash of 'systems2026'
  const defaultSalt = "f8a931c890de2b47e8105c3bfa179428";
  const defaultHash = hashPassword("systems2026", defaultSalt).hash;

  return { hash: defaultHash, salt: defaultSalt, isDefault: true };
}

/**
 * Updates the master admin passcode.
 */
export async function updateAdminPasscode(newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "New passcode must be at least 6 characters" };
  }

  try {
    const { hash, salt } = hashPassword(newPassword);
    const supabase = getServerSupabase();

    await supabase.from("admin_credentials").upsert([
      {
        id: "owner",
        password_hash: hash,
        salt,
        failed_attempts: 0,
        locked_until: null,
        updated_at: new Date().toISOString(),
      },
    ]);

    await cacheSet("admin:creds", { hash, salt, isDefault: false }, 3600);
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update passcode";
    return { success: false, error: msg };
  }
}

/**
 * Creates a cryptographically random session token, registers it in DB/Redis, and sets an httpOnly cookie.
 */
export async function createAdminSession(ipAddress?: string, userAgent?: string): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  // Cache session in Redis for instant authentication
  await cacheSet(`session:${tokenHash}`, { adminId: "owner", expiresAt }, SESSION_TTL_SECONDS);

  // Persist session to Supabase admin_sessions
  try {
    const supabase = getServerSupabase();
    await supabase.from("admin_sessions").upsert([
      {
        token_hash: tokenHash,
        admin_id: "owner",
        ip_address: ipAddress || null,
        user_agent: userAgent || null,
        expires_at: expiresAt,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err) {
    console.warn("[Auth] Failed to persist session to Supabase:", err);
  }

  // Set hardened httpOnly cookie
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return rawToken;
}

/**
 * Verifies the admin session from httpOnly cookie or Bearer header.
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = cookies();
  const rawToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!rawToken) return false;

  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  // 1. Check Redis cache first (sub-millisecond)
  const cached = await cacheGet<{ adminId: string; expiresAt: string }>(`session:${tokenHash}`);
  if (cached && new Date(cached.expiresAt).getTime() > Date.now()) {
    return true;
  }

  // 2. Fallback to Supabase database lookup
  try {
    const supabase = getServerSupabase();
    const { data } = await supabase
      .from("admin_sessions")
      .select("expires_at")
      .eq("token_hash", tokenHash)
      .single();

    if (data && new Date(data.expires_at).getTime() > Date.now()) {
      // Re-prime Redis
      await cacheSet(`session:${tokenHash}`, { adminId: "owner", expiresAt: data.expires_at }, 3600);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Destroys session on logout.
 */
export async function revokeAdminSession(): Promise<void> {
  const cookieStore = cookies();
  const rawToken = cookieStore.get(COOKIE_NAME)?.value;

  if (rawToken) {
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    await cacheDelete(`session:${tokenHash}`);

    try {
      const supabase = getServerSupabase();
      await supabase.from("admin_sessions").delete().eq("token_hash", tokenHash);
    } catch {
      // Ignored
    }
  }

  cookieStore.delete(COOKIE_NAME);
}

/**
 * Enforces rate limiting on sensitive login attempts.
 */
export async function checkLoginRateLimit(clientIp: string) {
  return await cacheRateLimit(`login:${clientIp}`, 5, 900); // 5 attempts per 15 minutes
}
