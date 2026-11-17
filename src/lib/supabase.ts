import { createClient } from "@supabase/supabase-js";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabaseProjectRef =
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || "";

export const supabaseProjectName =
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_NAME || "personalPortfolio";

// Singleton Supabase Client
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  focus: string;
  message: string;
  created_at?: string;
}

/**
 * Checks connectivity to the Supabase backend.
 */
export async function checkSupabaseHealth(): Promise<{
  connected: boolean;
  projectRef: string;
  projectName: string;
  version?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        apikey: supabaseAnonKey,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return {
        connected: true,
        projectRef: supabaseProjectRef,
        projectName: supabaseProjectName,
        version: data?.version || "v2.x",
      };
    } else {
      return {
        connected: false,
        projectRef: supabaseProjectRef,
        projectName: supabaseProjectName,
        error: `HTTP ${res.status}: ${res.statusText}`,
      };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      connected: false,
      projectRef: supabaseProjectRef,
      projectName: supabaseProjectName,
      error: msg,
    };
  }
}

/**
 * Saves a contact form message directly to Supabase table 'messages'.
 * Falls back gracefully if the table is pending creation in Supabase SQL editor.
 */
export async function saveContactMessage(msg: Omit<ContactMessage, "id" | "created_at">): Promise<{
  success: boolean;
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const payload = {
      name: msg.name,
      email: msg.email,
      focus: msg.focus,
      message: msg.message,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("messages").insert([payload]);

    if (error) {
      console.warn("[Supabase] Insert notice:", error.message);
      // PGRST205 indicates table does not exist in schema yet
      const isMissing = error.code === "PGRST205" || error.message.includes("Could not find the table");
      return {
        success: !isMissing ? false : true, // don't break user flow if table setup is pending
        error: error.message,
        isTableMissing: isMissing,
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const msgErr = err instanceof Error ? err.message : "Network error";
    console.warn("[Supabase] Network exception:", msgErr);
    return {
      success: true, // optimistic fallback
      error: msgErr,
    };
  }
}
