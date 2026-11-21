"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Volume2, VolumeX, FileText, Command, Shield, ChevronDown } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  availabilityStatus?: string;
  isAvailable?: boolean;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenResume,
  availabilityStatus = "Available",
  isAvailable = true,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const primaryNav = [
    { label: "Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#ecosystem" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const secondaryNav = [
    { label: "System Architecture", href: "#architecture" },
    { label: "Design Token Lab", href: "#design" },
    { label: "Developer Playground", href: "#playground" },
    { label: "Career & Education", href: "#timeline" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090C]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5 shadow-2xl shadow-black/80"
          : "bg-transparent border-b border-transparent py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <Link
          href="#lab"
          onClick={() => sound.playTick()}
          className="group flex items-center gap-2.5 shrink-0 focus:outline-none"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-sky-500/10 border border-white/[0.12] group-hover:border-indigo-500/60 flex items-center justify-center transition-all shadow-sm">
            <span className="font-mono text-xs font-bold tracking-wider text-white group-hover:text-indigo-300">
              ISB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              Inderjeet Singh Bamrah
            </span>
            <span className="font-mono text-[10px] tracking-wider text-slate-400">
              Full-Stack Architect
            </span>
          </div>
        </Link>

        {/* Center Streamlined Primary Navigation (No wrap, high whitespace) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E1017]/80 backdrop-blur-md border border-white/[0.08] rounded-full px-2 py-1 shadow-inner">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => sound.playTick()}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
            >
              {item.label}
            </a>
          ))}

          {/* More Dropdown for secondary sections */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playTick();
                setMoreMenuOpen(!moreMenuOpen);
              }}
              className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-all flex items-center gap-1"
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {moreMenuOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-48 py-2 rounded-xl bg-[#0F121C] border border-white/[0.1] shadow-2xl space-y-1"
                onMouseLeave={() => setMoreMenuOpen(false)}
              >
                {secondaryNav.map((sec) => (
                  <a
                    key={sec.href}
                    href={sec.href}
                    onClick={() => {
                      sound.playTick();
                      setMoreMenuOpen(false);
                    }}
                    className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Compact Actions Bar (Clean, no overcrowding) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Availability Status Dot Badge (Compact, non-overflowing) */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono ${
              isAvailable
                ? "bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400"
                : "bg-slate-500/[0.08] border border-slate-500/20 text-slate-400"
            }`}
            title={availabilityStatus}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isAvailable ? "bg-emerald-400" : "bg-slate-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isAvailable ? "bg-emerald-500" : "bg-slate-500"
              }`}></span>
            </span>
            <span className="text-[11px] font-semibold">{isAvailable ? "Available" : "Busy"}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
            title={isMuted ? "Audio muted" : "Audio active"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Resume Viewer Button */}
          <button
            onClick={() => {
              sound.playTick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sound.playTick();
              onOpenCommandPalette();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/[0.12] hover:bg-indigo-500/[0.2] border border-indigo-500/30 text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-all"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
            title="Admin Portal"
            onClick={() => sound.playTick()}
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F14] border-b border-white/[0.08] px-4 py-3 space-y-1">
          {[...primaryNav, ...secondaryNav].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.06]">
            <button
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 text-center text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded-lg border border-indigo-500/20"
            >
              Open Full Interactive Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
