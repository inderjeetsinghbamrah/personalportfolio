"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function EditorialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      number: "01",
      question: "What kinds of software systems and applications do you build?",
      answer:
        "I design and engineer end-to-end digital products: from full-stack SaaS web applications, developer tooling, and educational platforms to high-throughput relational database architectures and design systems. I operate across the full continuum: crafting fluid, accessible user interfaces in Figma and React, writing type-safe backend services in TypeScript/Node.js or Rust, optimizing PostgreSQL database schemas, and orchestrating containerized cloud environments with Docker and Kubernetes.",
    },
    {
      number: "02",
      question: "How does your academic and teaching background make you a better engineer?",
      answer:
        "As a Lecturer in Information Technology and former Assistant Professor instructing undergraduate B.Tech computer science students, I am constantly forced to articulate system design trade-offs from first principles. If you cannot explain relational database indexing, distributed consensus, or operating system concurrency clearly to a lecture hall of students, you do not understand it deeply. In engineering production, this translates to cleaner software abstractions, meticulous documentation, zero architectural cargo-culting, and strong collaborative leadership.",
    },
    {
      number: "03",
      question: "What is your philosophy on full-stack architecture vs specialized frontend?",
      answer:
        "Great user experiences cannot be divorced from backend architecture. A beautifully animated UI is worthless if the API response takes 1,400ms or fails under load. Conversely, an impeccably scaled database delivers zero customer value if the user cannot navigate the interface effortlessly. Being a true full-stack software architect means designing the frontend with a profound understanding of database indexing and network roundtrips, and architecting the backend specifically to power fluid, instantaneous user interactions.",
    },
    {
      number: "04",
      question: "What is your tech stack of choice for high-scale, resilient SaaS applications?",
      answer:
        "For modern web applications, my foundation is TypeScript throughout: Next.js (App Router, Server Components, and Server Actions), PostgreSQL (leveraging Supabase or self-hosted PostgreSQL 17 with strict Row Level Security), Redis for cache-aside patterns and rate limiting, and Tailwind CSS with tokenized design systems. For high-throughput worker services, data processing pipelines, or performance-critical CLI utilities, I utilize Rust and Go. For cloud deployments, Docker and Kubernetes guarantee reproducible, declarative environments.",
    },
    {
      number: "05",
      question: "How do you approach new project collaborations, consulting, and architecture reviews?",
      answer:
        "Whether you are building a new SaaS product from 0 to 1, re-architecting an existing legacy web application, or designing an enterprise token-driven component library, I engage directly with technical founders and product teams. You can reach out directly via email at inderjeet.sbamrah@gmail.com with your system requirements, deadlines, and technical scope. We'll schedule a technical discovery session and map out the exact architectural roadmap.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="invariants" className="py-20 md:py-28 border-b hairline-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              {"// Invariants & Questions"}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions.
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-light">
            Answers regarding my architectural perspective, technical capabilities, and collaboration model.
          </p>
        </div>

        {/* Numbered Accordion List */}
        <div className="divide-y hairline-border border-t border-b hairline-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.number} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-start justify-between gap-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-cyan-400 pt-1 shrink-0">
                      {faq.number}
                    </span>
                    <h3 className="text-base sm:text-xl font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-full border hairline-border shrink-0 mt-1 text-slate-400 group-hover:text-foreground group-hover:border-slate-400 transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-12 pr-4 sm:pr-12 text-sm sm:text-base text-slate-300 font-light leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
