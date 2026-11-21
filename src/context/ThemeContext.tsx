"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId =
  | "ocean-sapphire"
  | "cosmic-violet"
  | "emerald-matrix"
  | "daylight-clean"
  | "sunset-cream"
  | "aurora-bright";

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
  // Dark Themes (Non-black, rich atmospheric palettes)
  {
    id: "ocean-sapphire",
    name: "Ocean Sapphire",
    tagline: "Deep royal navy & electric cyan",
    type: "dark",
    primaryBg: "#060E20",
    surfaceBg: "#0B1736",
    accent: "#00F2FE",
    swatches: ["#060E20", "#00F2FE", "#3B82F6"],
  },
  {
    id: "cosmic-violet",
    name: "Cosmic Amethyst",
    tagline: "Deep violet twilight & electric magenta",
    type: "dark",
    primaryBg: "#0D061A",
    surfaceBg: "#170D30",
    accent: "#C084FC",
    swatches: ["#0D061A", "#8B5CF6", "#EC4899"],
  },
  {
    id: "emerald-matrix",
    name: "Cyber Emerald",
    tagline: "Dark alpine slate & neon mint",
    type: "dark",
    primaryBg: "#041410",
    surfaceBg: "#09241D",
    accent: "#10B981",
    swatches: ["#041410", "#10B981", "#34D399"],
  },

  // Bright / Light Themes
  {
    id: "daylight-clean",
    name: "Daylight Minimal",
    tagline: "Crisp Swiss white & royal electric blue",
    type: "light",
    primaryBg: "#F8FAFC",
    surfaceBg: "#FFFFFF",
    accent: "#2563EB",
    swatches: ["#FFFFFF", "#0F172A", "#2563EB"],
  },
  {
    id: "sunset-cream",
    name: "Sunset Atelier",
    tagline: "Warm luxury ivory & terracotta gold",
    type: "light",
    primaryBg: "#FDFBF7",
    surfaceBg: "#F6F0E6",
    accent: "#D97706",
    swatches: ["#FDFBF7", "#1C1917", "#D97706"],
  },
  {
    id: "aurora-bright",
    name: "Aurora Polar",
    tagline: "Luminous mint mist & cyber teal",
    type: "light",
    primaryBg: "#F0FDF4",
    surfaceBg: "#E0F7EB",
    accent: "#059669",
    swatches: ["#F0FDF4", "#064E3B", "#059669"],
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
  const [theme, setThemeState] = useState<ThemeId>("ocean-sapphire");

  useEffect(() => {
    // Check saved theme
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
    // Remove all previous theme classes
    THEME_OPTIONS.forEach((t) => {
      root.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Manage dark mode class for Tailwind
    if (isDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
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
