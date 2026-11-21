"use client";

import React, { useId } from "react";

interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  inverted?: boolean;
  opacity?: number;
}

export default function FluidWaveDivider({
  fromColor = "var(--canvas-bg)",
  toColor = "var(--surface-bg)",
  inverted = false,
}: WaveDividerProps) {
  const gradientId = useId();

  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-10 pointer-events-none select-none ${
        inverted ? "rotate-180 -mt-1" : "-mb-1"
      }`}
      aria-hidden="true"
    >
      <svg
        className="relative block w-full h-14 sm:h-20 lg:h-24"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.25" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Layer 1: Ambient Fluid Glow Wave */}
        <path
          d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,48C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill={`url(#${gradientId})`}
        />

        {/* Layer 2: Main Curving Organic Water Edge */}
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,58.7C672,64,768,96,864,96C960,96,1056,64,1152,58.7C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
