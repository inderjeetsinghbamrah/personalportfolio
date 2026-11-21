"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  FileText
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { sound } from "@/lib/sound";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import confetti from "canvas-confetti";

interface FluidContactProps {
  onOpenResume: () => void;
}

export default function FluidContact({ onOpenResume }: FluidContactProps) {
  const { personal } = PORTFOLIO_CONTENT;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    focus: "Full-Stack Application Development",
    message: "",
    honeypot: "",
  });

  const [formTime] = useState<number>(Date.now());
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    sound.playTick();
    navigator.clipboard.writeText(personal.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTick();
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: formTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please retry.");
      }

      setStatus("success");
      sound.playSuccess();

      // Trigger fluid confetti celebration
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#00F2FE", "#3B82F6", "#8B5CF6", "#10B981"],
      });

      setFormData({
        name: "",
        email: "",
        focus: "Full-Stack Application Development",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
      sound.playTick();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden bg-ocean-abyss">
      {/* Radiant Underwater Caustic Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-blue-950/40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[35rem] bg-gradient-to-t from-cyan-500/15 via-blue-600/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Narrative & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
                <span>06 // INITIATE TRANSMISSION</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Have an idea{" "}
                <span className="fluid-gradient-cyan block mt-1">
                  worth building?
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Let&apos;s turn ambitious ideas into meaningful digital products. Whether you need distributed systems architecture, a custom multi-tenant SaaS, or high-craft product design, I am available to collaborate.
              </p>
            </div>

            {/* Live Availability Status */}
            <div className="p-4 rounded-2xl bg-ocean-deep/90 border border-emerald-500/30 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {personal.availability}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3">
              {/* Copy Email Button */}
              <div className="p-4 rounded-2xl bg-ocean-deep/80 border border-white/[0.08] hover:border-cyan-400/40 flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-3 truncate">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</div>
                    <div className="text-xs sm:text-sm font-medium text-white truncate font-mono">
                      {personal.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub & LinkedIn Links */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTick()}
                  className="p-3.5 rounded-2xl bg-ocean-deep/80 border border-white/[0.08] hover:border-cyan-400/40 flex items-center gap-2.5 text-slate-300 hover:text-white transition-all group"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">GitHub Profile</span>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTick()}
                  className="p-3.5 rounded-2xl bg-ocean-deep/80 border border-white/[0.08] hover:border-cyan-400/40 flex items-center gap-2.5 text-slate-300 hover:text-white transition-all group"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">LinkedIn Profile</span>
                </a>
              </div>

              {/* View Full Verified Resume Button */}
              <button
                onClick={() => {
                  sound.playTick();
                  onOpenResume();
                }}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-ocean-deep to-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Full Verified Resume Dossier</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive "Start a Conversation" Form */}
          <div className="lg:col-span-7 fluid-glass p-8 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  ENCRYPTED TRANSMISSION
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                  Start a Conversation
                </h3>
              </div>

              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Send className="w-4 h-4" />
              </div>
            </div>

            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Transmission Received!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                  Thank you for reaching out. Your transmission has been written directly to my database. I will reply to you promptly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-slate-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ocean-deep/90 border border-white/[0.08] focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ocean-deep/90 border border-white/[0.08] focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Project Focus / Inquiry
                  </label>
                  <select
                    value={formData.focus}
                    onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ocean-deep/90 border border-white/[0.08] focus:border-cyan-400 text-sm text-white focus:outline-none transition-all shadow-inner"
                  >
                    <option value="Full-Stack Application Development">Full-Stack Application Development</option>
                    <option value="SaaS Architecture & Database Design">SaaS Architecture & Database Design</option>
                    <option value="UI/UX & Design Systems in Figma">UI/UX & Design Systems in Figma</option>
                    <option value="Educational Technology & OBE Solutions">Educational Technology & OBE Solutions</option>
                    <option value="Technical Consulting / Advisory">Technical Consulting / Advisory</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, and architectural requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ocean-deep/90 border border-white/[0.08] focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <ArrowRight className="w-4 h-4 text-cyan-200" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
