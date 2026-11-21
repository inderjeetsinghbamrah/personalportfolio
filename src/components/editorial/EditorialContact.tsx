"use client";

import React, { useState } from "react";
import { Copy, Check, Send, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";

export default function EditorialContact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.8 },
            colors: ["#22D3EE", "#3B82F6", "#8B5CF6"],
          });
        } catch {}
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Direct Inquiries */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                {"// Transmission & Inquiries"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                Have an ambitious system to architect?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Whether you’re building a full-stack SaaS from the ground up, re-architecting a data layer, or looking for an engineering consultation, let’s talk.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Direct Electronic Mail
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PORTFOLIO_CONTENT.personal.email}`}
                  className="text-lg sm:text-xl font-medium text-foreground hover:text-cyan-400 transition-colors underline underline-offset-4"
                >
                  {PORTFOLIO_CONTENT.personal.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md border hairline-border text-slate-400 hover:text-foreground transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Developer Terminal Endpoint
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hairline-border bg-black/20 font-mono text-xs text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>curl -sL https://inderjeetsinghbamrah.in/index.md</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Transmission Form */}
          <div className="lg:col-span-6">
            <div className="editorial-card p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                Direct transmission dispatched directly to my notification channel.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-xl border hairline-border bg-emerald-500/10 text-emerald-300 text-sm space-y-2">
                  <div className="font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Transmission Received</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light">
                    Thank you. Your message has been logged. I typically review and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/20 border hairline-border text-foreground text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/20 border hairline-border text-foreground text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Project Scope & Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your system requirements, timeline, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/20 border hairline-border text-foreground text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3 px-4 rounded-lg bg-foreground text-background font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === "submitting" ? "Dispatching..." : "Send Transmission"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
