import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ovmvzfakvxoshjnwsfcy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "";

// Public browser client (uses publishable anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey || "dummy-anon-key", {
  auth: {
    persistSession: typeof window !== "undefined",
  },
});

// Server-side administrative client (uses secret key, only in Server Components / Route Handlers)
export function getServiceSupabase() {
  const key = supabaseSecretKey || supabaseAnonKey;
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Backward compatibility alias
export const getSupabaseServerClient = getServiceSupabase;
