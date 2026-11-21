"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { sound } from "@/lib/sound";

export interface SectorInfo {
  id: string;
  number: string;
  tag: string;
  title: string;
  shortTitle: string;
  greeting: string;
  actionHint: string;
}

export const SECTORS: SectorInfo[] = [
  {
    id: "lab",
    number: "01",
    tag: "SECTOR 01",
    title: "Command Deck // Hero Lab",
    shortTitle: "Hero Lab",
    greeting: "Greetings! I'm Inderjeet. Welcome to my Digital Engineering Laboratory. I bridge thoughtful design with robust distributed systems.",
    actionHint: "Inspect the live architecture topology and trigger real-time traffic simulations.",
  },
  {
    id: "about",
    number: "02",
    tag: "SECTOR 02",
    title: "Philosophy & Pedagogy Deck",
    shortTitle: "Philosophy",
    greeting: "With an M.Tech in CS/IT and teaching appointments as Lecturer and Assistant Professor, I believe good architecture makes future complexity manageable.",
    actionHint: "Click through my interactive engineering philosophy axioms.",
  },
  {
    id: "ecosystem",
    number: "03",
    tag: "SECTOR 03",
    title: "Technology Constellation Reactor",
    shortTitle: "Tech Stack",
    greeting: "Welcome to my production stack. From React Server Components and Rust to PostgreSQL 17 and Kubernetes orchestration.",
    actionHint: "Select any technology node to see its production rationale and connected dependencies.",
  },
  {
    id: "projects",
    number: "04",
    tag: "SECTOR 04",
    title: "Project Vault // EDUOBAL",
    shortTitle: "Projects",
    greeting: "Sector 04 Unlocked! Inspect EDUOBAL—my outcome-based education SaaS with real-time NBA/NAAC attainment computation, and SysFlow DAG runner.",
    actionHint: "Launch the interactive attainment sandbox or DAG execution simulator below.",
  },
  {
    id: "architecture",
    number: "05",
    tag: "SECTOR 05",
    title: "System Architecture Playground",
    shortTitle: "Architecture",
    greeting: "Explore my production system blueprints: Next.js edge routing, Supabase RLS isolation, Redis caching, and Kubernetes deployments.",
    actionHint: "Click 'Trace Packet Flow' to watch network packets travel across the subsystem bus.",
  },
  {
    id: "design",
    number: "06",
    tag: "SECTOR 06",
    title: "Design Systems & Token Studio",
    shortTitle: "Design Lab",
    greeting: "Design is not decoration—it is how a system communicates state and intent. I create precision token architectures with WCAG AAA contrast compliance.",
    actionHint: "Slide the before/after comparison tool and inspect interactive component pseudo-states.",
  },
  {
    id: "playground",
    number: "07",
    tag: "SECTOR 07",
    title: "Developer Terminal & API Deck",
    shortTitle: "Terminal & API",
    greeting: "Test out my safe browser terminal emulator or dispatch real HTTP requests to the live backend APIs to measure latency in real time.",
    actionHint: "Type 'help' in the terminal or click 'Send Request' in the API runner.",
  },
  {
    id: "timeline",
    number: "08",
    tag: "SECTOR 08",
    title: "Academic & Career Chronology",
    shortTitle: "Chronology",
    greeting: "Review my academic degrees in Computer Science / IT and teaching appointments across engineering departments.",
    actionHint: "Toggle between Professional Experience and Academic Degrees.",
  },
  {
    id: "contact",
    number: "09",
    tag: "SECTOR 09",
    title: "Secure Uplink Station",
    shortTitle: "Uplink & Contact",
    greeting: "Transmission channel ready! Dispatch an encrypted message directly into my Supabase PostgreSQL database.",
    actionHint: "Fill out the transmission form or reach out directly via Email, GitHub, or LinkedIn.",
  },
];

interface SectorContextType {
  activeSectorId: string;
  activeSector: SectorInfo;
  activeSectorIndex: number;
  sectors: SectorInfo[];
  isTouring: boolean;
  goToSector: (sectorId: string) => void;
  nextSector: () => void;
  prevSector: () => void;
  startGuidedTour: () => void;
  stopGuidedTour: () => void;
  characterOpeningSector: string | null;
}

const SectorContext = createContext<SectorContextType | undefined>(undefined);

export function SectorProvider({ children }: { children: React.ReactNode }) {
  const [activeSectorId, setActiveSectorId] = useState<string>("lab");
  const [isTouring, setIsTouring] = useState<boolean>(false);
  const [characterOpeningSector, setCharacterOpeningSector] = useState<string | null>("lab");

  const activeSectorIndex = Math.max(
    0,
    SECTORS.findIndex((s) => s.id === activeSectorId)
  );
  const activeSector = SECTORS[activeSectorIndex] || SECTORS[0];

  const goToSector = useCallback(
    (sectorId: string) => {
      sound.playTick();
      setActiveSectorId(sectorId);
      setCharacterOpeningSector(sectorId);

      // Trigger section scroll
      const el = document.getElementById(sectorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }

      // Reset opening scan animation after 1.5 seconds
      setTimeout(() => {
        setCharacterOpeningSector((prev) => (prev === sectorId ? null : prev));
      }, 1500);
    },
    []
  );

  const nextSector = useCallback(() => {
    const nextIdx = (activeSectorIndex + 1) % SECTORS.length;
    goToSector(SECTORS[nextIdx].id);
  }, [activeSectorIndex, goToSector]);

  const prevSector = useCallback(() => {
    const prevIdx = (activeSectorIndex - 1 + SECTORS.length) % SECTORS.length;
    goToSector(SECTORS[prevIdx].id);
  }, [activeSectorIndex, goToSector]);

  const startGuidedTour = useCallback(() => {
    sound.playSuccess();
    setIsTouring(true);
    goToSector("lab");
  }, [goToSector]);

  const stopGuidedTour = useCallback(() => {
    sound.playTick();
    setIsTouring(false);
  }, []);

  // Sync with user's scroll position when not explicitly jumping
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const windowHeight = window.innerHeight;
        let detected = activeSectorId;

        for (const s of SECTORS) {
          const el = document.getElementById(s.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.2) {
              detected = s.id;
              break;
            }
          }
        }

        if (detected !== activeSectorId) {
          setActiveSectorId(detected);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeSectorId]);

  return (
    <SectorContext.Provider
      value={{
        activeSectorId,
        activeSector,
        activeSectorIndex,
        sectors: SECTORS,
        isTouring,
        goToSector,
        nextSector,
        prevSector,
        startGuidedTour,
        stopGuidedTour,
        characterOpeningSector,
      }}
    >
      {children}
    </SectorContext.Provider>
  );
}

export function useSector() {
  const ctx = useContext(SectorContext);
  if (!ctx) {
    throw new Error("useSector must be used within a SectorProvider");
  }
  return ctx;
}
