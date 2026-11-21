"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Mail, FileText, Send, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SectorGate from "@/components/character/SectorGate";

interface ContactProps {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  onOpenResume: () => void;
}

export default function ContactExperience({
  email,
  githubUrl,
  linkedinUrl,
  onOpenResume,
}: ContactProps) {
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
    <section id="contact" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sector Gate 09: Secure Uplink */}
        <SectorGate sectorId="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-indigo-400 mb-3">
                <span>09 // INITIATE TRANSMISSION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you are exploring a new SaaS product architecture, looking for senior full-stack guidance, or evaluating engineering talent for your team, my inbox is open.
              </p>
            </div>

            {/* Direct Connect Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                onClick={() => sound.playTick()}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0E1017] hover:bg-[#131622] border border-white/[0.08] hover:border-indigo-500/40 text-slate-200 hover:text-white transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">DIRECT EMAIL</div>
                  <div className="text-sm font-semibold">{email}</div>
                </div>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playTick()}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0E1017] hover:bg-[#131622] border border-white/[0.08] hover:border-indigo-500/40 text-slate-200 hover:text-white transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-white/[0.05] text-slate-300 group-hover:text-white">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">GITHUB PROFILE</div>
                  <div className="text-sm font-semibold">github.com/inderjeetsingh</div>
                </div>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playTick()}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0E1017] hover:bg-[#131622] border border-white/[0.08] hover:border-indigo-500/40 text-slate-200 hover:text-white transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">LINKEDIN NETWORK</div>
                  <div className="text-sm font-semibold">linkedin.com/in/inderjeetsinghbamrah</div>
                </div>
              </a>

              <button
                onClick={() => {
                  sound.playTick();
                  onOpenResume();
                }}
                className="w-full flex items-center gap-3.5 p-4 rounded-xl bg-[#0E1017] hover:bg-[#131622] border border-white/[0.08] hover:border-indigo-500/40 text-left text-slate-200 hover:text-white transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">ACADEMIC & WORK RESUME</div>
                  <div className="text-sm font-semibold">Inspect / Print Verified Dossier</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0E1017] border border-white/[0.1] shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">
              Send a Secure Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Submissions are validated, encrypted, and recorded in Supabase PostgreSQL with rate-limiting protection.
            </p>

            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Message securely transmitted!</div>
                  <div className="text-emerald-400/90 text-xs">
                    Thank you. I have received your message in the PostgreSQL ledger and will reply promptly.
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <div className="font-bold">Transmission issue:</div>
                  <div className="text-red-400/90 text-xs">{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from human visitors) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Collaboration Focus
                </label>
                <select
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Full-Stack Application Development">Full-Stack Application Development</option>
                  <option value="Software & System Architecture">Software & System Architecture</option>
                  <option value="SaaS Product Engineering">SaaS Product Engineering</option>
                  <option value="Database Design & Optimization">Database Design & Optimization</option>
                  <option value="Academic Collaboration & Teaching">Academic Collaboration & Teaching</option>
                  <option value="Other / General Discussion">Other / General Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, questions, or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141824] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PROTECTED BY SPAM DEFENSE & RLS</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm font-sans transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${submitting ? "animate-spin" : ""}`} />
                  <span>{submitting ? "Encrypting & Storing..." : "Transmit Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
