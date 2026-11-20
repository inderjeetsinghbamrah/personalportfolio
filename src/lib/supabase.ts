import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase Client Utility.
 * Strictly reads server environment variables and never exposes keys or endpoints to client bundles.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
