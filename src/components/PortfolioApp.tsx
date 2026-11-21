"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import FluidSmoothScroll from "@/components/fluid/FluidSmoothScroll";
import FluidNavbar from "@/components/fluid/FluidNavbar";
import FluidHero from "@/components/fluid/FluidHero";
import FluidAbout from "@/components/fluid/FluidAbout";
import FluidTechStack from "@/components/fluid/FluidTechStack";
import FluidProjects from "@/components/fluid/FluidProjects";
import FluidPhilosophy from "@/components/fluid/FluidPhilosophy";
import FluidExperience from "@/components/fluid/FluidExperience";
import FluidContact from "@/components/fluid/FluidContact";
import FluidFooter from "@/components/fluid/FluidFooter";
import FluidWaveDivider from "@/components/fluid/FluidWaveDivider";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeViewerModal from "@/components/ui/ResumeViewerModal";

export default function PortfolioApp() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <FluidSmoothScroll>
        <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-white relative" style={{ backgroundColor: "var(--bg-primary)" }}>
          {/* Floating Fluid Glass Capsule Navigation */}
          <FluidNavbar
            onOpenResume={() => setResumeOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

        <main>
          {/* Section 1: Cinematic Fluid Hero with 3D Liquid Mesh */}
          <FluidHero
            onExploreWork={scrollToProjects}
            onCollaborate={scrollToContact}
          />

          {/* Organic Wave Transition into About */}
          <FluidWaveDivider fromColor="var(--bg-primary)" toColor="var(--bg-primary)" />

          {/* Section 2: Beyond Writing Code (Editorial Journey & Pedagogy) */}
          <FluidAbout />

          {/* Organic Wave Transition into Tech Stack */}
          <FluidWaveDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

          {/* Section 3: Interactive Technology Constellation */}
          <FluidTechStack />

          {/* Organic Wave Transition into Projects */}
          <FluidWaveDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

          {/* Section 4: Pinned Scroll Product Lab (Cycles through all projects on scroll before moving down) */}
          <FluidProjects />

          {/* Organic Wave Transition into Philosophy */}
          <FluidWaveDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

          {/* Section 5: Design & Engineering Philosophy River */}
          <FluidPhilosophy />

          {/* Organic Wave Transition into Experience */}
          <FluidWaveDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

          {/* Section 6: Professional Career & Academic Chronology */}
          <FluidExperience />

          {/* Organic Wave Transition into Contact */}
          <FluidWaveDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

          {/* Section 7: Radiant Liquid Contact & Transmission */}
          <FluidContact onOpenResume={() => setResumeOpen(true)} />
        </main>

        {/* Fluid Editorial Footer */}
        <FluidFooter />

        {/* Global Dialog Modals */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenResume={() => {
            setCommandPaletteOpen(false);
            setResumeOpen(true);
          }}
        />

        <ResumeViewerModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </FluidSmoothScroll>
  </ThemeProvider>
  );
}
