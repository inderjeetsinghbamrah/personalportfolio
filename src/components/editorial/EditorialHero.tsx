"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Terminal, Mail, FileDown } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

interface EditorialHeroProps {
  onOpenResume: () => void;
}

export default function EditorialHero({ onOpenResume }: EditorialHeroProps) {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const curlCommand = "curl -sL https://inderjeetsinghbamrah.in/index.md";

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="top" className="pt-32 pb-16 md:pt-40 md:pb-24 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border hairline-border bg-opacity-40 mb-8 sm:mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-slate-300">
            Open for Architecture & Full-Stack Projects
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] max-w-5xl mb-8">
          I design thoughtful digital experiences and engineer scalable software systems.
        </h1>

        {/* Supporting Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-8 space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Full-Stack Developer, Software Architect, and Lecturer in Information Technology.
              Combining formal computing rigor with modern product design to build resilient,
              high-performance web applications.
            </p>
            <p className="text-sm text-slate-400 font-mono tracking-wide">
              M.Tech in Computer Science & IT · B.Tech in Information Technology · Higher Education Pedagogy
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Direct Channels
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a
                href={PORTFOLIO_CONTENT.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={PORTFOLIO_CONTENT.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>Resume / CV</span>
                <FileDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Row & Terminal Snippet */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t hairline-border">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PORTFOLIO_CONTENT.personal.email}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Say Hello</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border hairline-border text-xs sm:text-sm text-slate-300 hover:text-foreground hover:border-slate-500 transition-all"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs">inderjeet.sbamrah@gmail.com</span>
                </>
              )}
            </button>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border hairline-border text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <span>Selected Work ↓</span>
            </a>
          </div>

          {/* Developer-First /index.md Terminal Curl snippet */}
          <div className="flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2 rounded-full border hairline-border bg-black/20 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400 truncate">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-300 truncate">{curlCommand}</span>
            </div>
            <button
              onClick={handleCopyCurl}
              aria-label="Copy terminal curl command"
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors shrink-0"
              title="Copy command to curl portfolio as markdown in terminal"
            >
              {copiedCurl ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
