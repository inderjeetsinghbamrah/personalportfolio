"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Volume2, VolumeX, FileText, Command, Shield } from "lucide-react";
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
  availabilityStatus = "Available for Full-Stack & Architecture Roles",
  isAvailable = true,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: "Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#ecosystem" },
    { label: "Projects", href: "#projects" },
    { label: "Architecture", href: "#architecture" },
    { label: "Design", href: "#design" },
    { label: "Dev Tools", href: "#playground" },
    { label: "Experience", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090C]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5 shadow-2xl shadow-black/80"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="#lab"
          onClick={() => sound.playTick()}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="h-9 w-9 rounded-md bg-white/[0.05] border border-white/[0.12] group-hover:border-indigo-500/50 flex items-center justify-center transition-all duration-200">
            <span className="font-mono text-xs font-bold tracking-wider text-slate-100 group-hover:text-indigo-400">
              ISB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-white transition-colors">
              Inderjeet Singh Bamrah
            </span>
            <span className="font-mono text-[10px] tracking-wider text-slate-400">
              ENGINEERING LAB // v2.6
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => sound.playTick()}
              className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Availability Status Badge */}
          <div className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono ${
            isAvailable
              ? "bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400"
              : "bg-slate-500/[0.08] border border-slate-500/20 text-slate-400"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isAvailable ? "bg-emerald-400" : "bg-slate-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isAvailable ? "bg-emerald-500" : "bg-slate-500"
              }`}></span>
            </span>
            <span className="truncate max-w-[170px]">{availabilityStatus}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
            className="h-8 w-8 rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
            title={isMuted ? "Audio muted (Click to enable)" : "Audio enabled (Click to mute)"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Resume Viewer Button */}
          <button
            onClick={() => {
              sound.playTick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
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
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-indigo-500/[0.12] hover:bg-indigo-500/[0.2] border border-indigo-500/30 text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-all"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
            title="Admin Portal"
            onClick={() => sound.playTick()}
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F14] border-b border-white/[0.08] px-4 py-3 space-y-1">
          {navLinks.map((item) => (
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
          <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
            <button
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 text-center text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded-md border border-indigo-500/20"
            >
              Open Full Interactive Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
