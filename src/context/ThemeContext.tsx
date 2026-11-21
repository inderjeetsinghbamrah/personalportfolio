"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setMode: (m: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("isb-theme-mode") as ThemeMode;
      if (saved === "dark" || saved === "light") {
        setModeState(saved);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        // Respect system preference if not set
        setModeState("dark"); // Default dark-first
      }
    } catch {
      // ignore
    }
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("isb-theme-mode", newMode);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const isDark = mode === "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "theme-deep-ocean", "theme-cyber-violet", "theme-emerald-matrix", "theme-daylight-studio", "theme-sunset-atelier");
    
    if (isDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [mode, isDark]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark,
        toggleTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
