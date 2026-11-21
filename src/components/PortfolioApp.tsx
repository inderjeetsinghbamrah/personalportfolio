"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroExperience from "@/components/sections/HeroExperience";
import InteractiveAbout from "@/components/sections/InteractiveAbout";
import TechnologyConstellation from "@/components/sections/TechnologyConstellation";
import ProjectLab from "@/components/sections/ProjectLab";
import ArchitecturePlayground from "@/components/sections/ArchitecturePlayground";
import DesignLab from "@/components/sections/DesignLab";
import DeveloperPlayground from "@/components/sections/DeveloperPlayground";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ContactExperience from "@/components/sections/ContactExperience";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeViewerModal from "@/components/ui/ResumeViewerModal";
import { Profile, ProjectCategory, Technology, Project, Experience, Education, ArchitectureDemo } from "@/types/portfolio";
import { SectorProvider } from "@/context/SectorContext";

interface PortfolioAppProps {
  initialData: {
    profile: Profile;
    categories: ProjectCategory[];
    technologies: Technology[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
    architectureDemos: ArchitectureDemo[];
  };
}

export default function PortfolioApp({ initialData }: PortfolioAppProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const { profile, categories, technologies, projects, experience, education, architectureDemos } = initialData;

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectorProvider>
      <div className="min-h-screen bg-[#08090C] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
        {/* Streamlined, Non-crowded Top Navigation */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          availabilityStatus={profile.availability_status}
          isAvailable={profile.is_available}
        />

        <main>
          {/* Section 1: Hero & Interactive Digital Engineering Workspace */}
          <HeroExperience
            name={profile.full_name}
            professionalIdentity={profile.professional_identity}
            headline={profile.headline}
            subheadline={profile.subheadline}
            availabilityStatus={profile.availability_status}
            onOpenResume={() => setResumeOpen(true)}
            onViewProjects={scrollToProjects}
          />

          {/* Section 2: Interactive About & Philosophy Workbench */}
          <InteractiveAbout
            positioning={profile.positioning}
            bio={profile.bio}
            interests={profile.interests}
            philosophy={profile.philosophy}
          />

          {/* Section 3: Interactive Technology Constellation */}
          <TechnologyConstellation
            technologies={technologies}
            projects={projects}
          />

          {/* Section 4: Project Lab (Featured: EDUOBAL live sandbox) */}
          <ProjectLab
            projects={projects}
            categories={categories}
          />

          {/* Section 5: System Architecture Playground */}
          <ArchitecturePlayground
            demos={architectureDemos}
          />

          {/* Section 6: Design Engineering Lab */}
          <DesignLab />

          {/* Section 7: Developer Playground (Terminal, Live API runner, ERD) */}
          <DeveloperPlayground
            onOpenResume={() => setResumeOpen(true)}
          />

          {/* Section 8: Chronological Experience & Education Timeline */}
          <ExperienceTimeline
            experience={experience}
            education={education}
          />

          {/* Section 9: Secure Contact Transmission Experience */}
          <ContactExperience
            email={profile.email}
            githubUrl={profile.github_url}
            linkedinUrl={profile.linkedin_url}
            onOpenResume={() => setResumeOpen(true)}
          />
        </main>

        {/* Global Engineering Footer */}
        <Footer />

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
    </SectorProvider>
  );
}
