"use client";

import React, { useState } from "react";
import { useSector } from "@/context/SectorContext";
import { Bot, Sparkles, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { sound } from "@/lib/sound";

interface SectorGateProps {
  sectorId: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function SectorGate({ sectorId, actionButton }: SectorGateProps) {
  const { activeSectorId, characterOpeningSector, sectors, nextSector } = useSector();
  const [briefingOpen, setBriefingOpen] = useState(true);

  const sector = sectors.find((s) => s.id === sectorId);
  if (!sector) return null;

  const isActive = activeSectorId === sectorId;
  const isOpening = characterOpeningSector === sectorId;

  return (
    <div className="relative mb-8 pt-4">
      {/* Laser Scanning Beam when character opens section */}
      {isOpening && (
        <div className="absolute -top-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse z-20 pointer-events-none" />
      )}

      {/* Top Sector Status Pill & Character Companion Link */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          {/* Sector Tag with Ping indicator */}
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/20"
                : "bg-white/[0.03] border border-white/[0.06] text-slate-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isActive ? "bg-cyan-400" : "bg-slate-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isActive ? "bg-cyan-500" : "bg-slate-500"
                }`}
              />
            </span>
            <span className="font-bold">{sector.tag}</span>
            <span className="text-slate-500">{" // "}</span>
            <span>{sector.shortTitle.toUpperCase()}</span>
          </div>

          {isOpening && (
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse hidden sm:inline">
              [SECTOR UNLOCKED BY ARCHITECT]
            </span>
          )}
        </div>

        {/* Character Briefing Toggle & Quick Step Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTick();
              setBriefingOpen(!briefingOpen);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono text-indigo-300 hover:text-white transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-sky-400" />
            <span>Architect Briefing</span>
            {briefingOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => {
              sound.playTick();
              nextSector();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-[11px] font-mono text-indigo-300 hover:text-white transition-colors"
            title="Fly character to next sector"
          >
            <span>Next Sector</span>
            <ChevronRight className="w-3 h-3 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Expandable Architect Holographic Transmission Box */}
      {briefingOpen && (
        <div className="mt-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#0C0F1A]/95 via-[#0A0D15]/90 to-[#0C0F1A]/95 border border-indigo-500/25 shadow-lg shadow-black/60 relative overflow-hidden">
          {/* Cybernetic Accent Glow */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 via-sky-400 to-indigo-500" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pl-2">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Bot className="w-4 h-4 text-sky-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">
                    Inderjeet Singh Bamrah
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                    VOICE TRANSMISSION
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
                  {sector.greeting}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-sky-400">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>{sector.actionHint}</span>
                </div>
              </div>
            </div>

            {/* Quick Sector Action CTA */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-11 sm:pl-0">
              {actionButton && (
                <button
                  onClick={() => {
                    sound.playTick();
                    actionButton.onClick();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-sm shadow-indigo-600/30 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-sky-200" />
                  <span>{actionButton.label}</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playTick();
                  nextSector();
                }}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                title="Advance to next sector"
              >
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
