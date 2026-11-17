import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060709",
        foreground: "#f3f4f6",
        cyber: {
          dark: "#060709",
          panel: "#0b0e14",
          card: "#0f131c",
          border: "#1b2230",
          "border-bright": "#2c384e",
          accent: "#00ffaa", // phosphor emerald
          rust: "#f97316",   // rust solar orange
          cyan: "#00e5ff",   // cyber cyan
          amber: "#eab308",  // warning amber
          purple: "#a855f7", // quantum purple
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radar 4s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-pulse": "glow 3s ease-in-out infinite alternate",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 15px rgba(0,255,170,0.2))" },
          "100%": { opacity: "0.85", filter: "drop-shadow(0 0 30px rgba(0,255,170,0.6))" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
