"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId =
  | "deep-ocean"
  | "cyber-violet"
  | "emerald-matrix"
  | "daylight-studio"
  | "sunset-atelier";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  type: "dark" | "light";
  primaryBg: string;
  surfaceBg: string;
  accent: string;
  swatches: string[];
}

export const THEME_OPTIONS: ThemeOption[] = [
  // 🌙 Atmospheric Dark Themes (Rich, non-flat-black palettes)
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    tagline: "Royal navy abyss & electric cyan",
    type: "dark",
    primaryBg: "#060E20",
    surfaceBg: "#0A1633",
    accent: "#00F2FE",
    swatches: ["#060E20", "#00F2FE", "#3B82F6"],
  },
  {
    id: "cyber-violet",
    name: "Cosmic Amethyst",
    tagline: "Velvety twilight violet & electric orchid",
    type: "dark",
    primaryBg: "#0C071C",
    surfaceBg: "#160D33",
    accent: "#C084FC",
    swatches: ["#0C071C", "#A855F7", "#EC4899"],
  },
  {
    id: "emerald-matrix",
    name: "Cyber Emerald",
    tagline: "Alpine slate charcoal & neon mint",
    type: "dark",
    primaryBg: "#04130F",
    surfaceBg: "#08241D",
    accent: "#10B981",
    swatches: ["#04130F", "#10B981", "#34D399"],
  },

  // ☀️ Bright / Light Themes (High-contrast, zero eye strain)
  {
    id: "daylight-studio",
    name: "Daylight Swiss",
    tagline: "Pure architectural white & royal electric blue",
    type: "light",
    primaryBg: "#F8FAFC",
    surfaceBg: "#FFFFFF",
    accent: "#2563EB",
    swatches: ["#F8FAFC", "#090D16", "#2563EB"],
  },
  {
    id: "sunset-atelier",
    name: "Warm Atelier",
    tagline: "Warm luxury cream & terracotta amber",
    type: "light",
    primaryBg: "#FAF7F2",
    surfaceBg: "#FFFFFF",
    accent: "#D97706",
    swatches: ["#FAF7F2", "#1C1917", "#D97706"],
  },
];

interface ThemeContextType {
  theme: ThemeId;
  currentTheme: ThemeOption;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("deep-ocean");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("isb-theme") as ThemeId;
      if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
        setThemeState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    try {
      localStorage.setItem("isb-theme", id);
    } catch {
      // ignore
    }
  };

  const cycleTheme = () => {
    const currentIndex = THEME_OPTIONS.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
    setTheme(THEME_OPTIONS[nextIndex].id);
  };

  const currentTheme = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const isDark = currentTheme.type === "dark";

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous theme classes
    THEME_OPTIONS.forEach((t) => {
      root.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Manage dark/light mode class
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        setTheme,
        cycleTheme,
        isDark,
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
