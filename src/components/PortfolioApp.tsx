"use client";

import React, { useState } from "react";
import FluidSmoothScroll from "@/components/fluid/FluidSmoothScroll";
import { WorkbenchProvider } from "@/context/WorkbenchContext";
import EditorialNavbar from "@/components/editorial/EditorialNavbar";
import EditorialHero from "@/components/editorial/EditorialHero";
import EditorialOverview from "@/components/editorial/EditorialOverview";
import EditorialStrategy from "@/components/editorial/EditorialStrategy";
import EditorialProjects from "@/components/editorial/EditorialProjects";
import EditorialFAQ from "@/components/editorial/EditorialFAQ";
import EditorialWorkbench from "@/components/editorial/EditorialWorkbench";
import EditorialContact from "@/components/editorial/EditorialContact";
import EditorialFooter from "@/components/editorial/EditorialFooter";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeViewerModal from "@/components/ui/ResumeViewerModal";

export default function PortfolioApp() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <WorkbenchProvider>
      <FluidSmoothScroll>
        <div className="min-h-screen text-foreground selection:bg-cyan-500/30 selection:text-white relative">
          {/* Editorial Minimalist Navigation */}
          <EditorialNavbar
            onOpenResume={() => setResumeOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          <main>
            {/* Section 1: Editorial Hero with Instant Contact & Terminal Snippet */}
            <EditorialHero onOpenResume={() => setResumeOpen(true)} />

            {/* Section 2: Overview & Academic Pedagogy */}
            <EditorialOverview />

            {/* Section 3: Engineering Strategy, Invariants & Infinite Dual Marquees */}
            <EditorialStrategy />

            {/* Section 4: Curated Production Projects with In-line Interactive Demos */}
            <EditorialProjects />

            {/* Section 5: Numbered Invariants / FAQ Accordion */}
            <EditorialFAQ />

            {/* Section 6: The Workbench (Play Lab - Typeface, Themes, Focus Noise, Gravity Flip) */}
            <EditorialWorkbench />

            {/* Section 7: Inquiries & Transmission */}
            <EditorialContact />
          </main>

          {/* Editorial Footer */}
          <EditorialFooter onOpenResume={() => setResumeOpen(true)} />

          {/* Modals */}
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
    </WorkbenchProvider>
  );
}
