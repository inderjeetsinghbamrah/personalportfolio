"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, FileText } from "lucide-react";
import ResumeModal from "@/components/ui/ResumeModal";
import { usePortfolioData } from "@/lib/portfolio-data";

interface NavProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavProps) {
  const router = useRouter();
  const { data } = usePortfolioData();
  const profile = data.profile;
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [secretBeaconClicks, setSecretBeaconClicks] = useState(0);

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsMuted(muted));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      unsub();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Overview", href: "#hero", section: "hero" },
    { label: "Architecture", href: "#stack", section: "stack" },
    { label: "Projects", href: "#projects", section: "projects" },
    { label: "Remote & Overlap", href: "#remote", section: "remote" },
    { label: "Terminal", href: "#terminal", section: "terminal" },
    { label: "Contact", href: "#contact", section: "contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#08090d]/85 backdrop-blur-md border-b border-white/[0.08]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Typographic Identity */}
          <div 
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span 
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                const next = secretBeaconClicks + 1;
                if (next >= 5) {
                  setSecretBeaconClicks(0);
                  router.push("/admin");
                } else {
                  setSecretBeaconClicks(next);
                }
              }}
              title="Systems Status Active"
              className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(16,185,129,0.5)] cursor-pointer" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {profile.name}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Utility HUD */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              title="Open Command Palette (Cmd + K or Ctrl + K)"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            >
              <span className="text-[10px] text-slate-500">⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-slate-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume</span>
            </button>

            {/* Audio Toggle (Subtle, discreet) */}
            <button
              onClick={() => sound.toggleMute()}
              title={isMuted ? "Unmute subtle UI sounds" : "Mute UI sounds"}
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle sound"
            >
              {!isMuted ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Get in touch button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/[0.08] text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#08090d]/95 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left py-3 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setResumeOpen(true);
            }}
            className="text-left py-3 px-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-medium text-emerald-300 flex items-center justify-between"
          >
            <span>View Resume (PDF)</span>
            <FileText className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ATS Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
