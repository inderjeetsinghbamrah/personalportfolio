"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, ArrowUpRight, Database } from "lucide-react";
import { saveContactMessage } from "@/lib/messages-client";
import { usePortfolioData } from "@/lib/portfolio-data";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function ContactSection() {
  const { data } = usePortfolioData();
  const profile = data.profile;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<string>("Full-Stack Architecture");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const focusOptions = [
    "Full-Stack Architecture",
    "React & Next.js Applications",
    "Rust Microservices",
    "Kubernetes & Cloud Infrastructure",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    await saveContactMessage({
      name,
      email,
      focus: selectedFocus,
      message,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.dispatchEvent(new CustomEvent("trigger-core-dispatch"));
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto z-10 flex flex-col justify-center">
      {/* Header */}
      <div className="mb-12 border-b border-white/[0.08] pb-6">
        <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider mb-2">
          05 / CONTACT
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Get in Touch
        </h2>
        <p className="text-base text-slate-400 font-normal mt-2 max-w-xl">
          Whether you are looking to build a high-performance web platform, design low-overhead backend systems, or architect cloud deployments—let&apos;s connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 card-clean p-6 sm:p-8 rounded-2xl">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{name}</span>. Your message has been received. I will follow up at <span className="text-emerald-400 font-medium">{email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Focus selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Project Domain / Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {focusOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setSelectedFocus(opt)}
                      className={`p-2.5 rounded-xl text-xs text-left transition-all border ${
                        selectedFocus === opt
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-medium"
                          : "border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message input */}
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share project scope, questions, or requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-slate-900" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Channels */}
        <div className="lg:col-span-5 card-clean p-6 sm:p-8 rounded-2xl space-y-4">
          <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Direct Channels
          </h4>

          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-slate-200 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono">{profile.email}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-slate-200 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <GitHubIcon className="w-4 h-4 text-slate-300" />
              <span className="text-xs font-mono">{profile.githubUrl.replace("https://", "")}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-slate-200 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <LinkedInIcon className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono">{profile.linkedinUrl.replace("https://", "")}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Database Infrastructure Status */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-emerald-500/20 text-slate-300 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-white">
                  Database Infrastructure
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">
                Live &amp; Synced
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-0.5">
              <span>Status: Distributed PostgreSQL</span>
              <span className="text-[10px] text-emerald-400/80 font-mono">TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          {profile.name} © 2026 • Built with React, Next.js, Three.js &amp; Rust
        </div>
        <div>
          Engineered for performance &amp; accessibility
        </div>
      </footer>
    </section>
  );
}
