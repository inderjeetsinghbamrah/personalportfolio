"use client";

import React from "react";

interface InfiniteMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speedSeconds?: number;
  separator?: string;
  className?: string;
}

export default function InfiniteMarquee({
  items,
  direction = "left",
  speedSeconds = 30,
  separator = "•",
  className = "",
}: InfiniteMarqueeProps) {
  // Duplicate items for continuous seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden select-none marquee-container py-3 ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center gap-6 whitespace-nowrap will-change-transform ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
        style={{ "--marquee-speed": `${speedSeconds}s` } as React.CSSProperties}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-6">
            <span className="text-xs sm:text-sm font-mono tracking-wider text-slate-300 transition-colors hover:text-cyan-400">
              {item}
            </span>
            <span className="text-[10px] text-cyan-400/40 select-none">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
