"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop screens
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("custom-cursor-enabled");

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const updateTrail = () => {
      // Smooth lerp trailing ring
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;
      setTrail({ x: trailX, y: trailY });
      animId = requestAnimationFrame(updateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    animId = requestAnimationFrame(updateTrail);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* Precision Core Dot */}
      <div
        className="absolute w-2 h-2 -ml-1 -mt-1 bg-cyber-accent rounded-full transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${
            isClicking ? 0.7 : isHovered ? 1.4 : 1
          })`,
          boxShadow: "0 0 10px #00ffaa",
        }}
      />

      {/* Trailing Crosshair Ring */}
      <div
        className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${
            isHovered ? 1.7 : isClicking ? 0.85 : 1
          })`,
          borderColor: isHovered ? "#00ffaa" : "rgba(255, 255, 255, 0.3)",
          backgroundColor: isHovered ? "rgba(0, 255, 170, 0.08)" : "transparent",
        }}
      />

      {/* Crosshair ticks */}
      {isHovered && (
        <div
          className="absolute -ml-6 -mt-6 w-12 h-12 pointer-events-none"
          style={{ transform: `translate3d(${trail.x}px, ${trail.y}px, 0)` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyber-accent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyber-accent" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyber-accent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyber-accent" />
        </div>
      )}

      {/* Small live coordinates HUD at cursor */}
      <div
        className="absolute text-[8px] font-mono tracking-tighter text-cyber-muted opacity-60 ml-5 mt-4"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        X:{Math.round(pos.x)} Y:{Math.round(pos.y)}
      </div>
    </div>
  );
}
