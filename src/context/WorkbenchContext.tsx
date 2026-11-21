"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type ThemeMode = "obsidian" | "paper" | "cyber";
export type TypefaceMode = "swiss" | "mono" | "serif";

interface WorkbenchContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  typeface: TypefaceMode;
  setTypeface: (f: TypefaceMode) => void;
  isGravityInverted: boolean;
  toggleGravity: () => void;
  soundActive: boolean;
  toggleSound: () => void;
  soundVolume: number;
  setSoundVolume: (v: number) => void;
}

const WorkbenchContext = createContext<WorkbenchContextType | undefined>(undefined);

export function WorkbenchProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("obsidian");
  const [typeface, setTypeface] = useState<TypefaceMode>("swiss");
  const [isGravityInverted, setIsGravityInverted] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.3);

  const soundVolumeRef = useRef(soundVolume);
  useEffect(() => {
    soundVolumeRef.current = soundVolume;
  }, [soundVolume]);

  // Web Audio ambient brown noise synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Apply theme & font to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-obsidian", "theme-paper", "theme-cyber");
    root.classList.add(`theme-${theme}`);

    root.classList.remove("font-swiss", "font-mono-mode", "font-serif-mode");
    root.classList.add(`font-${typeface}-mode`);

    if (isGravityInverted) {
      root.classList.add("gravity-inverted");
    } else {
      root.classList.remove("gravity-inverted");
    }
  }, [theme, typeface, isGravityInverted]);

  // Handle ambient sound generation with Web Audio API
  useEffect(() => {
    if (!soundActive) {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          if (noiseSourceRef.current) {
            noiseSourceRef.current.stop();
            noiseSourceRef.current.disconnect();
            noiseSourceRef.current = null;
          }
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // 5 seconds brown noise buffer
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise integration
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5; // Scale
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;
      noiseSourceRef.current = noiseSource;

      // Lowpass filter for smooth ocean/deep focus drone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(soundVolumeRef.current * 0.15, ctx.currentTime);
      gainNodeRef.current = gainNode;

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start();
    } catch (e) {
      console.warn("Web Audio not supported or blocked by browser policy:", e);
      setSoundActive(false);
    }

    return () => {
      if (noiseSourceRef.current) {
        try {
          noiseSourceRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, [soundActive]);

  // Update volume in real-time
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(soundVolume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [soundVolume]);

  const toggleGravity = () => {
    setIsGravityInverted((prev) => !prev);
  };

  const toggleSound = () => {
    setSoundActive((prev) => !prev);
  };

  return (
    <WorkbenchContext.Provider
      value={{
        theme,
        setTheme,
        typeface,
        setTypeface,
        isGravityInverted,
        toggleGravity,
        soundActive,
        toggleSound,
        soundVolume,
        setSoundVolume,
      }}
    >
      {children}
    </WorkbenchContext.Provider>
  );
}

export function useWorkbench() {
  const context = useContext(WorkbenchContext);
  if (!context) {
    throw new Error("useWorkbench must be used within a WorkbenchProvider");
  }
  return context;
}
