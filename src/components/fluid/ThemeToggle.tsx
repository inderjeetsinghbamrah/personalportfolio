"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { sound } from "@/lib/sound";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    sound.playTick();
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? "Switch to bright mode" : "Switch to dark mode"}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-sm group select-none"
      style={{
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.12)",
        color: isDark ? "#F8FAFC" : "#0F172A",
      }}
      title={isDark ? "Switch to bright mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-xs font-mono font-medium text-slate-300 group-hover:text-white">
            Bright
          </span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-blue-600 group-hover:-rotate-45 transition-transform duration-300" />
          <span className="text-xs font-mono font-medium text-slate-700 group-hover:text-black">
            Dark
          </span>
        </>
      )}
    </button>
  );
}
