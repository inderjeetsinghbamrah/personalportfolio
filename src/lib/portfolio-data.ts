"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioData, defaultPortfolioData } from "@/data/default-portfolio";
import { supabase } from "./supabase";

const STORAGE_KEY = "portfolio_site_data";
const PASSCODE_STORAGE_KEY = "portfolio_admin_passcode";
const AUTH_SESSION_KEY = "portfolio_admin_auth";
export const DEFAULT_ADMIN_PASSCODE = "systems2026";

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
    console.warn("Failed to load custom portfolio data, using defaults:", err);
    return defaultPortfolioData;
  }
}

/**
 * Saves updated portfolio data to localStorage and dispatches a change event.
 * Also attempts to persist to Supabase or API if possible.
 */
export async function savePortfolioData(data: PortfolioData): Promise<{ success: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, error: "SSR environment" };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: data }));

    // Try synchronizing with Supabase portfolio_settings if table exists
    try {
      await supabase
        .from("portfolio_settings")
        .upsert([{ id: "site_config", data, updated_at: new Date().toISOString() }]);
    } catch {
      // Ignored if table not created in Supabase yet
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
 * Manages the Admin Passcode
 */
export function getAdminPasscode(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PASSCODE;
  return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_ADMIN_PASSCODE;
}

export function setAdminPasscode(newCode: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newCode || newCode.length < 4) return false;
  localStorage.setItem(PASSCODE_STORAGE_KEY, newCode);
  return true;
}

export function verifyAdminPasscode(attempt: string): boolean {
  const current = getAdminPasscode();
  return attempt.trim() === current.trim();
}

/**
 * Session Authentication State (persisted per browser session)
 */
export function isSessionAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
}

export function setSessionAuthenticated(auth: boolean): void {
  if (typeof window === "undefined") return;
  if (auth) {
    sessionStorage.setItem(AUTH_SESSION_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
}

/**
 * React hook to access live-updated portfolio data across any component.
 */
export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = useCallback(() => {
    const current = getPortfolioData();
    setData(current);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadData();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        loadData();
      }
    };

    window.addEventListener("portfolio-data-updated", handleUpdate);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("portfolio-data-updated", handleUpdate);
      window.removeEventListener("storage", loadData);
    };
  }, [loadData]);

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
    updateData: update,
    resetData: reset,
  };
}
