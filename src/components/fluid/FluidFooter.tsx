"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Shield } from "lucide-react";
import { sound } from "@/lib/sound";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export default function FluidFooter() {
  const { personal } = PORTFOLIO_CONTENT;

  const scrollToTop = () => {
    sound.playTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ocean-deep border-t border-white/[0.08] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand & Positioning */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight">
              {personal.name}
            </span>
            <span className="text-xs text-slate-400 font-light mt-0.5">
              Full-Stack Developer · Software Architect · UI/UX Designer
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-cyan-400 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Status Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} {personal.name}. Built with Next.js 14, Three.js & Tailwind CSS.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>All Systems Nominal</span>
            </span>

            <Link
              href="/admin"
              onClick={() => sound.playTick()}
              className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
