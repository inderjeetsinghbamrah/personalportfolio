"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Search, X, ArrowRight, FileText, Send, Sparkles, Terminal, Layers, Database } from "lucide-react";

interface PaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: PaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: "hero", label: "Jump to Architecture Lab (Hero)", icon: Layers, href: "#lab" },
    { id: "about", label: "About & Engineering Philosophy", icon: Sparkles, href: "#about" },
    { id: "stack", label: "Interactive Technology Constellation", icon: Database, href: "#ecosystem" },
    { id: "projects", label: "Project Lab (EDUOBAL, SysFlow)", icon: Sparkles, href: "#projects" },
    { id: "arch", label: "System Architecture Playground", icon: Layers, href: "#architecture" },
    { id: "design", label: "Design Token & State Lab", icon: Sparkles, href: "#design" },
    { id: "dev", label: "Terminal & API Developer Playground", icon: Terminal, href: "#playground" },
    { id: "timeline", label: "Experience & Education Timeline", icon: FileText, href: "#timeline" },
    { id: "contact", label: "Initiate Transmission (Contact)", icon: Send, href: "#contact" },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090B10] border border-white/[0.12] shadow-2xl overflow-hidden">
        {/* Search header */}
        <div className="p-3.5 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-1 text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action list */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {/* Quick Resume Option */}
          <button
            onClick={() => {
              sound.playTick();
              onClose();
              onOpenResume();
            }}
            className="w-full p-2.5 rounded-lg hover:bg-white/[0.05] text-left flex items-center justify-between text-xs font-medium text-indigo-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Open Verified Engineering Resume</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">MODAL</span>
          </button>

          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  sound.playTick();
                  onClose();
                }}
                className="p-2.5 rounded-lg hover:bg-white/[0.05] flex items-center justify-between text-xs text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              </a>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0C0E14] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with arrows or mouse</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
