"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import { useSector } from "@/context/SectorContext";
import { Bot, Compass, Zap, Play, ChevronRight } from "lucide-react";

export default function HeroCharacterStage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [thrusterBoost, setThrusterBoost] = useState(false);
  const { startGuidedTour, nextSector, activeSector } = useSector();

  // Interactive 3D WebGL Developer Canvas Engine
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. High-Tech Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const violetKeyLight = new THREE.DirectionalLight(0x818cf8, 3.0);
    violetKeyLight.position.set(5, 5, 5);
    scene.add(violetKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanRimLight.position.set(-5, -3, 3);
    scene.add(cyanRimLight);

    // 3. Cyber Developer Character Model
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // Materials
    const armorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0f17,
      roughness: 0.25,
      metalness: 0.85,
    });
    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x181e2e,
      roughness: 0.35,
      metalness: 0.65,
    });
    const glowVioletMaterial = new THREE.MeshBasicMaterial({ color: 0x6366f1 });
    const glowCyanMaterial = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    // Torso / Kinetic Core
    const torsoGeo = new THREE.CylinderGeometry(0.58, 0.46, 1.25, 8);
    const torso = new THREE.Mesh(torsoGeo, armorMaterial);
    characterGroup.add(torso);

    // Pulsing Arc Core Reactor
    const coreGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, glowCyanMaterial);
    coreMesh.position.set(0, 0.15, 0.46);
    torso.add(coreMesh);

    // Head & Holographic Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.98, 0);
    characterGroup.add(headGroup);

    const headGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
    const head = new THREE.Mesh(headGeo, secondaryMaterial);
    headGroup.add(head);

    const visorGeo = new THREE.BoxGeometry(0.69, 0.22, 0.38);
    const visor = new THREE.Mesh(visorGeo, glowCyanMaterial);
    visor.position.set(0, 0.05, 0.22);
    headGroup.add(visor);

    // Audio / Telemetry Antenna
    const antennaGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8);
    const antenna = new THREE.Mesh(antennaGeo, glowVioletMaterial);
    antenna.position.set(0.4, 0.28, 0);
    antenna.rotation.z = -0.3;
    headGroup.add(antenna);

    // Dual Jetpack Thrusters
    const jetpackGeo = new THREE.BoxGeometry(0.65, 0.75, 0.35);
    const jetpack = new THREE.Mesh(jetpackGeo, armorMaterial);
    jetpack.position.set(0, 0.1, -0.42);
    characterGroup.add(jetpack);

    const thrusterGeo = new THREE.ConeGeometry(0.14, 0.35, 8);
    const leftThruster = new THREE.Mesh(thrusterGeo, glowVioletMaterial);
    leftThruster.position.set(-0.22, -0.45, -0.42);
    leftThruster.rotation.x = Math.PI;
    characterGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, glowVioletMaterial);
    rightThruster.position.set(0.22, -0.45, -0.42);
    rightThruster.rotation.x = Math.PI;
    characterGroup.add(rightThruster);

    // Articulated Arms
    const armGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.75, 8);
    const leftArm = new THREE.Mesh(armGeo, secondaryMaterial);
    leftArm.position.set(-0.8, 0.12, 0);
    leftArm.rotation.z = 0.35;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, secondaryMaterial);
    rightArm.position.set(0.8, 0.12, 0);
    rightArm.rotation.z = -0.35;
    characterGroup.add(rightArm);

    // Holographic Datapad in Right Hand
    const datapadGeo = new THREE.PlaneGeometry(0.45, 0.28);
    const datapad = new THREE.Mesh(datapadGeo, glowCyanMaterial);
    datapad.position.set(0.9, -0.3, 0.35);
    datapad.rotation.x = -Math.PI / 4;
    characterGroup.add(datapad);

    // Orbiting Telemetry Drone ("CORE-01")
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    const droneCoreGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const droneCore = new THREE.Mesh(droneCoreGeo, glowCyanMaterial);
    droneGroup.add(droneCore);

    const droneRingGeo = new THREE.TorusGeometry(0.32, 0.035, 8, 24);
    const droneRing = new THREE.Mesh(droneRingGeo, glowVioletMaterial);
    droneGroup.add(droneRing);

    // Particle Thruster Trail System
    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.3;
      particlePositions[i * 3 + 1] = -0.6 - Math.random() * 0.9;
      particlePositions[i * 3 + 2] = -0.42 + (Math.random() - 0.5) * 0.3;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: -0.05 - Math.random() * 0.05,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    characterGroup.add(particleSystem);

    // Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = { x: Math.max(-1.5, Math.min(1.5, x)), y: Math.max(-1.5, Math.min(1.5, y)) };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Hovering bobbing
      characterGroup.position.y = Math.sin(elapsed * 2.8) * 0.18;
      characterGroup.rotation.y = Math.sin(elapsed * 1.3) * 0.12 + mousePos.current.x * 0.45;
      characterGroup.rotation.x = -mousePos.current.y * 0.3;

      // Head cursor tracking
      headGroup.rotation.y = mousePos.current.x * 0.7;
      headGroup.rotation.x = -mousePos.current.y * 0.45;

      // Typing motion
      rightArm.rotation.x = Math.sin(elapsed * 5.5) * 0.2;
      leftArm.rotation.x = Math.cos(elapsed * 5.5) * 0.2;

      // Thruster flame scale
      const flamePulse = 1 + Math.sin(elapsed * 20) * 0.35;
      leftThruster.scale.set(flamePulse, flamePulse, flamePulse);
      rightThruster.scale.set(flamePulse, flamePulse, flamePulse);

      // Arc Core breathing
      const coreScale = 1 + Math.sin(elapsed * 4) * 0.2;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Orbiting Drone
      const orbitRadius = 1.75;
      const orbitSpeed = elapsed * 2.2;
      droneGroup.position.x = Math.cos(orbitSpeed) * orbitRadius;
      droneGroup.position.z = Math.sin(orbitSpeed) * orbitRadius;
      droneGroup.position.y = Math.sin(elapsed * 3.5) * 0.45 + 0.35;
      droneRing.rotation.x += 0.035;
      droneRing.rotation.y += 0.045;

      // Particle update
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 2] += particleVelocities[i].z;

        if (positions[i * 3 + 1] < -2.0) {
          positions[i * 3] = (Math.random() - 0.5) * 0.28;
          positions[i * 3 + 1] = -0.6;
          positions[i * 3 + 2] = -0.42 + (Math.random() - 0.5) * 0.28;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  const handleBurst = () => {
    sound.playTick();
    setThrusterBoost(true);
    setTimeout(() => setThrusterBoost(false), 800);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Outer Holographic Containment Ring & Glowing Ambient Halo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-sky-500/30 to-violet-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

      {/* Main Holographic Terminal Deck */}
      <div className="relative rounded-2xl bg-[#090C15]/90 border border-white/[0.12] shadow-2xl p-4 sm:p-5 backdrop-blur-xl">
        {/* Top Telemetry Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400">
              ARCHITECT BOT // ONLINE
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.06]">
              60 FPS WebGL
            </span>
            <span className="text-sky-400 font-semibold">CORE-01 ACTIVE</span>
          </div>
        </div>

        {/* 3D WebGL Avatar Viewport */}
        <div className="relative h-64 sm:h-72 w-full rounded-xl bg-gradient-to-b from-[#080A12] to-[#0D111D] border border-white/[0.06] flex items-center justify-center overflow-hidden">
          {/* Subtle cyber grid background in 3D viewport */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Mount Three.js Canvas */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating HUD Overlays inside Canvas */}
          <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-[#090B12]/80 border border-white/[0.08] text-[9px] font-mono text-indigo-300 pointer-events-none">
            ESCORT PROTOCOL: READY
          </div>

          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-[#090B12]/80 border border-white/[0.08] text-[9px] font-mono text-sky-300 pointer-events-none">
            {activeSector.tag}
          </div>

          {/* Bottom Floating Dialogue Prompt */}
          <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-lg bg-[#090B12]/90 border border-indigo-500/30 backdrop-blur-md text-[11px] font-mono text-slate-200 flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2 truncate">
              <Bot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">&ldquo;{activeSector.greeting}&rdquo;</span>
            </div>
            <button
              onClick={handleBurst}
              className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all ${
                thrusterBoost
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/50"
                  : "bg-white/[0.06] hover:bg-white/[0.12] text-slate-300"
              }`}
              title="Pulse Jetpack"
            >
              <Zap className="w-3 h-3 text-cyan-400 inline mr-0.5" />
              PULSE
            </button>
          </div>
        </div>

        {/* Interactive Guided Tour & Sector Control Deck */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>ACTIVE SECTOR:</span>
              <strong className="text-white">{activeSector.shortTitle}</strong>
            </span>
            <span className="text-sky-400 font-semibold">{activeSector.tag}</span>
          </div>

          {/* Action Button Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={startGuidedTour}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all group"
            >
              <Play className="w-3.5 h-3.5 text-sky-200 fill-sky-200 group-hover:scale-110 transition-transform" />
              <span>Start Guided Tour</span>
            </button>

            <button
              onClick={() => {
                sound.playTick();
                nextSector();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-medium transition-all"
            >
              <span>Fly to Next Sector</span>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
