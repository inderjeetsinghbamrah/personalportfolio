"use client";

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
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(updated));
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
 * Saves a contact form message via secure server API endpoint /api/contact.
 * Zero Supabase credentials or endpoints are exposed to the client bundle.
 */
export async function saveContactMessage(msg: Omit<ContactMessage, "id" | "created_at">): Promise<{
  success: boolean;
  error?: string;
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

  // Keep local copy so the administrator can inspect offline if needed
  saveLocalMessage(localMsg);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: msg.name,
        email: msg.email,
        focus: msg.focus,
        message: msg.message,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: true, // Graceful fallback
        error: data.error || `HTTP ${res.status}`,
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const msgErr = err instanceof Error ? err.message : "Network error";
    return {
      success: true,
      error: msgErr,
    };
  }
}
