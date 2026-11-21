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
        background: "#030712",
        foreground: "#F8FAFC",
        ocean: {
          deep: "#030712",
          abyss: "#04091A",
          mariana: "#060D24",
          surface: "#0A1435",
          glass: "rgba(6, 13, 36, 0.75)",
          border: "rgba(255, 255, 255, 0.1)",
          "border-bright": "rgba(34, 211, 238, 0.35)",
        },
        fluid: {
          cyan: "#00F2FE",
          electric: "#22D3EE",
          turquoise: "#06B6D4",
          blue: "#3B82F6",
          royal: "#2563EB",
          violet: "#8B5CF6",
          purple: "#A855F7",
          mint: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "liquid-pulse": "liquidPulse 6s ease-in-out infinite",
        "water-wave": "waterWave 14s ease-in-out infinite alternate",
        "caustic-drift": "causticDrift 25s linear infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
      },
      keyframes: {
        liquidPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.08)", opacity: "0.8" },
        },
        waterWave: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-25px) translateY(10px)" },
          "100%": { transform: "translateX(25px) translateY(-10px)" },
        },
        causticDrift: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
