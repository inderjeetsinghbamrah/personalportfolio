"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

interface EditorialFooterProps {
  onOpenResume: () => void;
}

export default function EditorialFooter({ onOpenResume }: EditorialFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b hairline-border">
          <div className="space-y-1">
            <div className="font-semibold text-foreground text-sm">
              {PORTFOLIO_CONTENT.personal.name}
            </div>
            <p className="text-slate-400 font-light">
              Full-Stack Developer, Software Architect & Lecturer in Information Technology.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a
              href={PORTFOLIO_CONTENT.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={PORTFOLIO_CONTENT.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <span>Resume / CV</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <a
              href="/index.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 font-mono inline-flex items-center gap-1 transition-colors"
            >
              <span>/index.md</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © {currentYear} Inderjeet Singh Bamrah. Designed & engineered from first principles.
          </div>
          <div>
            B.Tech in IT · M.Tech in CS/IT · Higher Education Pedagogy
          </div>
        </div>
      </div>
    </footer>
  );
}
