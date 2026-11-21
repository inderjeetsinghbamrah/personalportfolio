"use client";

import React from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { Mail, Shield, ArrowUp, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  const scrollToTop = () => {
    sound.playTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#06070A] text-slate-400 text-xs py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Identity Monogram */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-mono text-xs font-bold text-white">
              ISB
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Inderjeet Singh Bamrah</div>
              <div className="text-[11px] font-mono text-slate-500">
                Full-Stack Developer & Software Architect
              </div>
            </div>
          </div>

          {/* Cloud Spec Pills */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>SUPABASE PG17: ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>NEXT.JS 14 APP ROUTER</span>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/inderjeetsingh"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/inderjeetsinghbamrah"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:inderjeet.bamrah@gmail.com"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Inderjeet Singh Bamrah. Designed & engineered with precision.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
