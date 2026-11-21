"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme, THEME_OPTIONS, ThemeId } from "@/context/ThemeContext";
import { sound } from "@/lib/sound";

export default function ThemeSwitcher() {
  const { theme, setTheme, currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectTheme = (id: ThemeId) => {
    sound.playTick();
    setTheme(id);
    setIsOpen(false);
  };

  const darkThemes = THEME_OPTIONS.filter((t) => t.type === "dark");
  const lightThemes = THEME_OPTIONS.filter((t) => t.type === "light");

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Palette Trigger Pill */}
      <button
        onClick={() => {
          sound.playTick();
          setIsOpen(!isOpen);
        }}
        aria-label="Change Color Theme"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.12] hover:border-cyan-400/40 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium transition-all shadow-sm group"
        title="Change theme palette"
      >
        <Palette className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className="hidden sm:inline text-xs font-mono">{currentTheme.name}</span>
        {/* Swatch dots preview */}
        <div className="flex items-center -space-x-1">
          {currentTheme.swatches.slice(0, 3).map((color, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full border border-black/20 shadow-xs"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {/* Floating Theme Palette Selector Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl p-4 bg-ocean-abyss/95 border border-white/[0.15] backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.1]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Color Palette
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              6 Handcrafted Themes
            </span>
          </div>

          {/* Group 1: Atmospheric Dark Themes */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
              <Moon className="w-3 h-3 text-cyan-400" />
              <span>Atmospheric Dark (Non-Black)</span>
            </div>
            {darkThemes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-400/40 text-white"
                      : "hover:bg-white/[0.05] text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Swatches preview */}
                    <div className="flex items-center -space-x-1 shrink-0">
                      {t.swatches.map((c, idx) => (
                        <span
                          key={idx}
                          className="h-3 w-3 rounded-full border border-black/30 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{t.name}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{t.tagline}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Group 2: Bright & Radiant Themes */}
          <div className="space-y-1 border-t border-white/[0.1] pt-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Bright & Radiant Light</span>
            </div>
            {lightThemes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-400/40 text-white"
                      : "hover:bg-white/[0.05] text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Swatches preview */}
                    <div className="flex items-center -space-x-1 shrink-0">
                      {t.swatches.map((c, idx) => (
                        <span
                          key={idx}
                          className="h-3 w-3 rounded-full border border-black/20 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{t.name}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{t.tagline}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
