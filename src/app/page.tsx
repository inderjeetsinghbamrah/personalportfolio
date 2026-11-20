"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import StackDeepDive from "@/components/sections/StackDeepDive";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RemoteWorkSection from "@/components/sections/RemoteWorkSection";
import InteractiveTerminal from "@/components/sections/InteractiveTerminal";
import ContactSection from "@/components/sections/ContactSection";
import CommandPalette from "@/components/ui/CommandPalette";
import PipelineStressHUD from "@/components/ui/PipelineStressHUD";
import VisualEngineSwitcher from "@/components/ui/VisualEngineSwitcher";
import SystemsCoreHUD from "@/components/ui/SystemsCoreHUD";
import ResumeModal from "@/components/ui/ResumeModal";

// Dynamically import ThreeCanvas for client-side WebGL
const ThreeCanvas = dynamic(() => import("@/components/canvas/ThreeCanvas"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress =
            totalHeight > 0 ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1) : 0;
          setScrollProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for section tracking
    const sections = ["hero", "stack", "projects", "remote", "terminal", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.3 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    // Global Shortcuts: Cmd+K (Palette) and Ctrl+Shift+A (Hidden Admin Gate)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [router]);

  return (
    <main className="relative min-h-screen bg-[#08090d] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-200">
      {/* 3D Architecture Pipeline Canvas */}
      <ThreeCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Subtle ambient grid pattern for depth */}
      <div className="fixed inset-0 pointer-events-none ambient-grid z-[1] opacity-60" />

      {/* Clean Navigation Bar */}
      <Navigation activeSection={activeSection} />

      {/* Content Stream with generous spacing and high legibility */}
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <StackDeepDive />
        <ProjectsSection />
        <RemoteWorkSection />
        <InteractiveTerminal />
        <ContactSection />
      </div>

      {/* Floating 3D Architecture Pipeline HUD (Top-Right) */}
      <SystemsCoreHUD />

      {/* Floating 3D Visual Engine Switcher (Bottom-Left) */}
      <VisualEngineSwitcher />

      {/* Floating Interactive 3D Pipeline Stress-Test HUD (Bottom-Right) */}
      <PipelineStressHUD />

      {/* Raycast-style Command Palette Modal (Cmd + K) */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* ATS Resume Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </main>
  );
}
