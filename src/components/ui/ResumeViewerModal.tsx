"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { X, Printer, Copy, Check, GraduationCap, Briefcase, Award } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewerModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const markdownResume = `# INDERJEET SINGH BAMRAH
Full-Stack Developer | Software Architect | UI/UX Designer | Product Engineer
Email: inderjeet.bamrah@gmail.com | Location: India
GitHub: https://github.com/inderjeetsingh | LinkedIn: https://linkedin.com/in/inderjeetsinghbamrah

## PROFESSIONAL SUMMARY
Software Architect and Senior Full-Stack Engineer with an academic background holding an M.Tech in Computer Science/IT and B.Tech in IT. Experienced as a university Assistant Professor and currently Lecturer in Information Technology. Specializes in building scalable SaaS products, distributed systems, resilient PostgreSQL databases, and high-craft UI/UX interfaces.

## EDUCATION
- Master of Technology (M.Tech) in Computer Science & Information Technology
  * Advanced distributed computing, algorithm analysis, relational database architecture.
- Bachelor of Technology (B.Tech) in Information Technology
  * Computer systems, data structures, computer networks, operating systems.

## PROFESSIONAL EXPERIENCE
- Lecturer in Information Technology (Present)
  * Department of Information Technology
  * Delivering advanced instruction in Web Architecture, Database Systems, and Cloud Engineering.
  * Formulating Outcome-Based Education (OBE) course outcome attainment matrices (NBA/NAAC compliance).
- Assistant Professor (Past)
  * Engineering Academic Institution
  * Instructed undergraduate B.Tech Computer Science & IT students in core operating systems, software design, and databases.
- Full-Stack Developer & Software Systems Consultant (Ongoing)
  * Designing multi-tenant web applications, PostgreSQL schemas, and CI/CD pipelines.

## CORE COMPETENCIES
- Frontend: React, Next.js 14, TypeScript, Tailwind CSS, Figma, Design Systems
- Backend: Node.js, Express, Rust, REST APIs, Microservices
- Database: PostgreSQL 17, Supabase, Redis, Prisma, Connection Pooling, RLS
- Infrastructure: Docker, Kubernetes, GitHub Actions CI/CD, Linux`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownResume);
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sound.playTick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl bg-[#090B10] border border-white/[0.12] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-slate-200">
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-[#0E1118] border-b border-white/[0.08] flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-indigo-400 font-bold">DOSSIER //</span>
            <span>INDERJEET SINGH BAMRAH</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied MD" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF</span>
            </button>

            <button
              onClick={() => {
                sound.playTick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#090B10] text-slate-200">
          {/* Header */}
          <div className="border-b border-white/[0.1] pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Inderjeet Singh Bamrah
            </h1>
            <p className="text-sm font-mono text-indigo-400">
              Full-Stack Developer | Software Architect | UI/UX Designer | Product Engineer
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-1">
              <span>Email: inderjeet.bamrah@gmail.com</span>
              <span>&bull;</span>
              <span>Location: India</span>
              <span>&bull;</span>
              <span>GitHub: github.com/inderjeetsingh</span>
            </div>
          </div>

          {/* Academic Pedigree */}
          <div>
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>ACADEMIC FOUNDATION & DEGREES</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white">Master of Technology (M.Tech)</h3>
                    <p className="text-xs text-indigo-300 font-mono">Computer Science & Information Technology</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Postgraduate</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Specialized graduate study focused on distributed systems, advanced database engineering, algorithm analysis, and software quality assurance methodologies.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white">Bachelor of Technology (B.Tech)</h3>
                    <p className="text-xs text-indigo-300 font-mono">Information Technology</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Undergraduate</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Rigorous four-year engineering degree encompassing computer science fundamentals, data structures, computer networks, operating systems, and full-stack software development.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>PROFESSIONAL APPOINTMENTS & ENGINEERING ROLES</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.06] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white">Lecturer in Information Technology</h3>
                    <p className="text-xs text-sky-400 font-mono">Department of Information Technology</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Present</span>
                </div>
                <p className="text-xs text-slate-300">
                  Delivering specialized lectures, laboratory instruction, and engineering project mentorship across modern software systems, web engineering, database architecture, and cloud technologies. Formulating and evaluating Outcome-Based Education (OBE) course outcome attainment matrices.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.06] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white">Assistant Professor (B.Tech CS / IT)</h3>
                    <p className="text-xs text-sky-400 font-mono">Engineering Academic Institution</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Past</span>
                </div>
                <p className="text-xs text-slate-300">
                  Taught core computer science and engineering coursework, guided undergraduate technical research, and participated in curriculum modernization and NBA/NAAC accreditation documentation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.06] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white">Full-Stack Developer & Software Systems Consultant</h3>
                    <p className="text-xs text-sky-400 font-mono">Independent Practice</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Ongoing</span>
                </div>
                <p className="text-xs text-slate-300">
                  Architecting modern web applications (Next.js, TypeScript, PostgreSQL), building multi-tenant SaaS platforms, designing token-driven design systems, and deploying containerized microservices.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Competencies Matrix */}
          <div>
            <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>TECHNICAL COMPETENCY MATRIX</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-[#0E1017] border border-white/[0.06]">
                <span className="font-mono text-indigo-400 font-bold block mb-1">Frontend Engineering</span>
                <span className="text-slate-300">React, Next.js 14 (App Router), TypeScript, Tailwind CSS, Concurrent Rendering, Streaming SSR</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E1017] border border-white/[0.06]">
                <span className="font-mono text-indigo-400 font-bold block mb-1">Backend & Systems</span>
                <span className="text-slate-300">Node.js, Express, Rust, RESTful APIs, Asynchronous I/O, Event-Driven Architecture</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E1017] border border-white/[0.06]">
                <span className="font-mono text-sky-400 font-bold block mb-1">Database Architecture</span>
                <span className="text-slate-300">PostgreSQL 17, Supabase, Redis (In-Memory), Row Level Security (RLS), Connection Pooling, Prisma</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E1017] border border-white/[0.06]">
                <span className="font-mono text-sky-400 font-bold block mb-1">DevOps & Cloud</span>
                <span className="text-slate-300">Docker, Kubernetes (K8s), GitHub Actions CI/CD, Linux Administration, Vercel Edge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
