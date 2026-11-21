"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScroll, motion } from "framer-motion";
import { Volume2, VolumeX, FileText, Command, Menu, X, Shield } from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import ThemeToggle from "@/components/fluid/ThemeToggle";

interface FluidNavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export default function FluidNavbar({ onOpenResume, onOpenCommandPalette }: FluidNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ["hero", "about", "stack", "projects", "philosophy", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Philosophy", href: "#philosophy", id: "philosophy" },
    { label: "Journey", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    sound.playTick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Liquid Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 z-50 shadow-[0_0_12px_#22d3ee]"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3 bg-ocean-deep/85 backdrop-blur-xl border-b border-white/[0.08]" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Monogram */}
          <Link
            href="#hero"
            onClick={() => sound.playTick()}
            className="flex items-center gap-3 shrink-0 group focus:outline-none"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-cyan-400/40 group-hover:border-cyan-400 flex items-center justify-center transition-all duration-300 shadow-sm shadow-cyan-500/20">
              <span className="font-mono text-xs font-bold text-white group-hover:text-cyan-200">
                ISB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors whitespace-nowrap">
                {PORTFOLIO_CONTENT.personal.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider whitespace-nowrap">
                Full-Stack Architect
              </span>
            </div>
          </Link>

          {/* Center Liquid Navigation Island (Floating Glass Capsule) */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-ocean-abyss/80 border border-white/[0.1] backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap relative ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-indigo-500/30 rounded-full border border-cyan-400/40 shadow-sm shadow-cyan-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live Availability Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold">Available</span>
            </div>

            {/* Dark / Bright Mode Toggle */}
            <ThemeToggle />

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="h-8 w-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-colors"
              title={isMuted ? "Audio muted" : "Audio active"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sound.playTick();
                onOpenResume();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-cyan-400/40 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.playTick();
                onOpenCommandPalette();
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all"
              title="Command Menu (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>

            {/* Admin Shield */}
            <Link
              href="/admin"
              onClick={() => sound.playTick()}
              className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
              title="Admin Console"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-ocean-deep/95 border-b border-white/[0.1] backdrop-blur-2xl px-6 py-5 space-y-2 mt-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  sound.playTick();
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 text-center"
              >
                View Resume
              </button>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
