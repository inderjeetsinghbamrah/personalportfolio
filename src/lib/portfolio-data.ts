"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioData, defaultPortfolioData } from "@/data/default-portfolio";

const STORAGE_KEY = "portfolio_site_data";

/**
 * Retrieves the current portfolio data from localStorage or fallback defaults.
 */
export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultPortfolioData;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolioData;
    const parsed = JSON.parse(raw);
    return {
      profile: { ...defaultPortfolioData.profile, ...parsed.profile },
      projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : defaultPortfolioData.projects,
      resume: { ...defaultPortfolioData.resume, ...parsed.resume },
    };
  } catch (err) {
    console.warn("Failed to load cached portfolio data, using defaults:", err);
    return defaultPortfolioData;
  }
}

/**
 * Saves updated portfolio data to Redis & Supabase via API, updates localStorage, and notifies components.
 */
export async function savePortfolioData(data: PortfolioData): Promise<{ success: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, error: "SSR environment" };

  try {
    // 1. Save to localStorage immediately for instant local update
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: data }));

    // 2. Persist to Supabase and warm Redis via secure authenticated API
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.error || `HTTP ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to save data";
    return { success: false, error: msg };
  }
}

/**
 * Reverts portfolio data back to default initial values.
 */
export function resetPortfolioData(): PortfolioData {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: defaultPortfolioData }));
  }
  return defaultPortfolioData;
}

/**
 * Enterprise-grade Hardened Admin Authentication Client
 */
export async function adminLogin(passcode: string): Promise<{ success: boolean; error?: string; remainingAttempts?: number }> {
  try {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      sessionStorage.setItem("portfolio_admin_auth", "true");
      return { success: true };
    }

    return {
      success: false,
      error: data.error || "Authentication rejected",
      remainingAttempts: data.remainingAttempts,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error during authentication";
    return { success: false, error: msg };
  }
}

export async function adminCheckSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/auth", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        sessionStorage.setItem("portfolio_admin_auth", "true");
        return true;
      }
    }
    sessionStorage.removeItem("portfolio_admin_auth");
    return false;
  } catch {
    return sessionStorage.getItem("portfolio_admin_auth") === "true";
  }
}

export async function adminLogout(): Promise<void> {
  try {
    await fetch("/api/admin/auth", {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    // Ignore network error on logout
  }
  sessionStorage.removeItem("portfolio_admin_auth");
}

export async function adminChangePasscode(currentPasscode: string, newPasscode: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/admin/passcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPasscode, newPasscode }),
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      return { success: true };
    }
    return { success: false, error: data.error || "Failed to update passcode" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network failure";
    return { success: false, error: msg };
  }
}

/**
 * Legacy compatibility helpers
 */
export function isSessionAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("portfolio_admin_auth") === "true";
}

export function setSessionAuthenticated(auth: boolean): void {
  if (typeof window === "undefined") return;
  if (auth) {
    sessionStorage.setItem("portfolio_admin_auth", "true");
  } else {
    sessionStorage.removeItem("portfolio_admin_auth");
  }
}

/**
 * React hook to access live-updated portfolio data across any component,
 * backed by Redis and Supabase.
 */
export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cacheSource, setCacheSource] = useState<string>("local");

  const loadLocal = useCallback(() => {
    const current = getPortfolioData();
    setData(current);
  }, []);

  const fetchRemote = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
          setCacheSource(json.source || "remote");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        }
      }
    } catch (err) {
      console.warn("[PortfolioData] Failed to fetch remote portfolio data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadLocal();
    fetchRemote();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        loadLocal();
      }
    };

    window.addEventListener("portfolio-data-updated", handleUpdate);
    window.addEventListener("storage", loadLocal);

    return () => {
      window.removeEventListener("portfolio-data-updated", handleUpdate);
      window.removeEventListener("storage", loadLocal);
    };
  }, [loadLocal, fetchRemote]);

  const update = async (newData: PortfolioData) => {
    const res = await savePortfolioData(newData);
    if (res.success) {
      setData(newData);
    }
    return res;
  };

  const reset = () => {
    const def = resetPortfolioData();
    setData(def);
  };

  return {
    data,
    isLoaded,
    cacheSource,
    updateData: update,
    resetData: reset,
    refreshRemote: fetchRemote,
  };
}
