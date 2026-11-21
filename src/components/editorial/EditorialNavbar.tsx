"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, FileText, Command, Moon, Sun, Laptop } from "lucide-react";
import { useWorkbench } from "@/context/WorkbenchContext";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

interface EditorialNavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export default function EditorialNavbar({ onOpenResume, onOpenCommandPalette }: EditorialNavbarProps) {
  const { theme, setTheme, soundActive, toggleSound } = useWorkbench();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    if (theme === "obsidian") setTheme("paper");
    else if (theme === "paper") setTheme("cyber");
    else setTheme("obsidian");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-opacity-80 backdrop-blur-md border-b hairline-border shadow-sm"
          : "py-5 bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled
          ? theme === "paper"
            ? "rgba(247, 248, 250, 0.85)"
            : "rgba(7, 9, 14, 0.85)"
          : "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <Link href="#top" className="flex items-center gap-3 shrink-0 group focus:outline-none">
          <div className="h-8 w-8 rounded-full border hairline-border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-400">
            ISB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-cyan-400">
              {PORTFOLIO_CONTENT.personal.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              Software Architect & Educator
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
          <a
            href="#overview"
            className="text-slate-400 hover:text-foreground transition-colors"
          >
            Overview
          </a>
          <a
            href="#strategy"
            className="text-slate-400 hover:text-foreground transition-colors"
          >
            Strategy
          </a>
          <a
            href="#projects"
            className="text-slate-400 hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <a
            href="#invariants"
            className="text-slate-400 hover:text-foreground transition-colors"
          >
            FAQ
          </a>
          <a
            href="#workbench"
            className="text-slate-400 hover:text-cyan-400 transition-colors font-mono"
          >
            Play / Lab ⚙
          </a>
        </nav>

        {/* Right Utility Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border hairline-border bg-opacity-30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300">Available</span>
          </div>

          {/* Theme Cycler */}
          <button
            onClick={cycleTheme}
            aria-label="Cycle theme mode"
            className="h-8 w-8 rounded-full border hairline-border flex items-center justify-center text-slate-300 hover:text-foreground transition-colors"
            title={`Current theme: ${theme}. Click to switch.`}
          >
            {theme === "obsidian" && <Moon className="w-3.5 h-3.5 text-cyan-400" />}
            {theme === "paper" && <Sun className="w-3.5 h-3.5 text-amber-600" />}
            {theme === "cyber" && <Laptop className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundActive ? "Mute ambient focus sound" : "Enable ambient focus sound"}
            className="h-8 w-8 rounded-full border hairline-border flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-colors"
            title={soundActive ? "Focus soundscape active" : "Enable focus soundscape"}
          >
            {soundActive ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Resume Viewer Trigger */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border hairline-border text-xs font-medium text-slate-300 hover:text-foreground transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border hairline-border text-xs font-mono text-slate-400 hover:text-foreground transition-colors"
            title="Command Palette (Cmd+K / Ctrl+K)"
          >
            <Command className="w-3 h-3" />
            <span className="text-[10px]">K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
