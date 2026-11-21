"use client";

import React, { useState } from "react";
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
    <FluidSmoothScroll>
      <div className="min-h-screen bg-ocean-deep text-slate-100 selection:bg-cyan-500/30 selection:text-white relative">
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
          <FluidWaveDivider fromColor="#030712" toColor="#030712" />

          {/* Section 2: Beyond Writing Code (Editorial Journey & Pedagogy) */}
          <FluidAbout />

          {/* Organic Wave Transition into Tech Stack */}
          <FluidWaveDivider fromColor="#030712" toColor="#04091A" />

          {/* Section 3: Interactive Technology Constellation */}
          <FluidTechStack />

          {/* Organic Wave Transition into Projects */}
          <FluidWaveDivider fromColor="#04091A" toColor="#030712" />

          {/* Section 4: Product Lab & Immersive Project Showcases */}
          <FluidProjects />

          {/* Organic Wave Transition into Philosophy */}
          <FluidWaveDivider fromColor="#030712" toColor="#04091A" />

          {/* Section 5: Design & Engineering Philosophy River */}
          <FluidPhilosophy />

          {/* Organic Wave Transition into Experience */}
          <FluidWaveDivider fromColor="#04091A" toColor="#030712" />

          {/* Section 6: Professional Career & Academic Chronology */}
          <FluidExperience />

          {/* Organic Wave Transition into Contact */}
          <FluidWaveDivider fromColor="#030712" toColor="#04091A" />

          {/* Section 7: Radiant Liquid Contact & Encrypted Transmission */}
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
  );
}
