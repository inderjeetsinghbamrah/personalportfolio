import { createClient } from "@supabase/supabase-js";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

// Alias for backward compatibility
export const supabaseAnonKey = supabasePublishableKey;

export const supabaseProjectRef =
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || "";

export const supabaseProjectName =
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_NAME || "personalPortfolio";

// Singleton Supabase Client
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublishableKey || "placeholder",
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
  read?: boolean;
}

const LOCAL_MESSAGES_KEY = "portfolio_admin_messages";

export function getLocalMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalMessage(msg: ContactMessage): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalMessages();
    const updated = [msg, ...current.filter((m) => m.id !== msg.id)];
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to save local message:", err);
  }
}

export function deleteLocalMessage(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalMessages();
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn("Failed to delete local message:", err);
  }
}

export function toggleMessageReadStatus(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalMessages();
    const updated = current.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to update message status:", err);
  }
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
        apikey: supabasePublishableKey,
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
  const localMsg: ContactMessage = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
    name: msg.name,
    email: msg.email,
    focus: msg.focus,
    message: msg.message,
    created_at: new Date().toISOString(),
    read: false,
  };

  // Always store locally as well so admin sees inquiries instantly
  saveLocalMessage(localMsg);

  try {
    const payload = {
      name: msg.name,
      email: msg.email,
      focus: msg.focus,
      message: msg.message,
      created_at: localMsg.created_at,
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
