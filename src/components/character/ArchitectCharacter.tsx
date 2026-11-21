"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bot,
  VolumeX,
  Minimize2
} from "lucide-react";

interface Station {
  id: string;
  name: string;
  tag: string;
  dialogue: string;
  actionHint: string;
}

const STATIONS: Station[] = [
  {
    id: "lab",
    name: "Command Deck // Hero Lab",
    tag: "SECTOR 01",
    dialogue: "Greetings! I'm Inderjeet. Welcome to my Digital Engineering Laboratory. I design thoughtful digital experiences and engineer scalable software systems.",
    actionHint: "Inspect the live architecture topology and trigger traffic simulations below.",
  },
  {
    id: "about",
    name: "Philosophy & Pedagogy Deck",
    tag: "SECTOR 02",
    dialogue: "With an M.Tech in CS/IT and years teaching undergraduate B.Tech engineers as Lecturer and Assistant Professor, I believe good architecture makes future complexity manageable.",
    actionHint: "Click through the interactive architectural axioms on the right.",
  },
  {
    id: "ecosystem",
    name: "Technology Constellation Reactor",
    tag: "SECTOR 03",
    dialogue: "Here is my production technology stack. From React Server Components and Rust to PostgreSQL 17 and Kubernetes orchestration.",
    actionHint: "Select any technology node to see its production rationale and connected systems.",
  },
  {
    id: "projects",
    name: "Project Vault // EDUOBAL",
    tag: "SECTOR 04",
    dialogue: "Check out EDUOBAL—my outcome-based education SaaS platform! It features a real-time mathematical attainment matrix calculator for NBA/NAAC compliance.",
    actionHint: "Launch the interactive sandbox to simulate student score attainment matrices.",
  },
  {
    id: "architecture",
    name: "System Architecture Playground",
    tag: "SECTOR 05",
    dialogue: "I approach systems holistically: Next.js edge routing, Supabase RLS isolation, Redis cache-aside invalidation, and declarative Kubernetes deployments.",
    actionHint: "Click 'Trace Packet Flow' to watch network packets travel across the subsystem bus.",
  },
  {
    id: "design",
    name: "Design Systems & Token Studio",
    tag: "SECTOR 06",
    dialogue: "Design is not decoration—it is how a system communicates state and intent. I create precision token architectures with WCAG AAA contrast compliance.",
    actionHint: "Slide the before/after comparison tool and inspect interactive component pseudo-states.",
  },
  {
    id: "playground",
    name: "Developer Terminal & API Deck",
    tag: "SECTOR 07",
    dialogue: "Test out my safe terminal emulator or dispatch real HTTP requests to the live backend APIs to measure latency in real time.",
    actionHint: "Type 'help' in the terminal or click 'Send Request' in the API runner.",
  },
  {
    id: "timeline",
    name: "Academic & Career Chronology",
    tag: "SECTOR 08",
    dialogue: "Review my academic degrees in Computer Science / IT and teaching appointments across engineering departments.",
    actionHint: "Toggle between Professional Experience and Academic Degrees.",
  },
  {
    id: "contact",
    name: "Secure Uplink Station",
    tag: "SECTOR 09",
    dialogue: "Ready to build something impactful together? Transmit an encrypted message directly into my Supabase PostgreSQL database.",
    actionHint: "Fill out the transmission form or reach out directly via Email, GitHub, or LinkedIn.",
  },
];

export default function ArchitectCharacter() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentStationIdx, setCurrentStationIdx] = useState<number>(0);
  const [dialogueText, setDialogueText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hudMinimized, setHudMinimized] = useState<boolean>(false);
  const [speechActive, setSpeechActive] = useState<boolean>(true);

  // Position & movement refs
  const mousePos = useRef({ x: 0, y: 0 });

  const currentStation = STATIONS[currentStationIdx] || STATIONS[0];

  // =========================================================================
  // TYPEWRITER EFFECT FOR CHARACTER DIALOGUE
  // =========================================================================
  useEffect(() => {
    let index = 0;
    setDialogueText("");
    setIsTyping(true);

    const fullText = currentStation.dialogue;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDialogueText(fullText.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [currentStationIdx, currentStation.dialogue]);

  // =========================================================================
  // SCROLL-BASED SECTION TRACKING
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Find which section is currently centered in viewport
      let activeIdx = 0;
      STATIONS.forEach((st, idx) => {
        const el = document.getElementById(st.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            activeIdx = idx;
          }
        }
      });

      if (activeIdx !== currentStationIdx) {
        setCurrentStationIdx(activeIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentStationIdx]);

  // =========================================================================
  // THREE.JS 3D ANIMATED DEVELOPER AVATAR ENGINE
  // =========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x818cf8, 2.5); // Electric violet key light
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0); // Sky cyan rim light
    rimLight.position.set(-5, -3, 3);
    scene.add(rimLight);

    // 3. Construct 3D Developer Character Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // --- Materials ---
    const armorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e111a,
      roughness: 0.3,
      metalness: 0.8,
    });
    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e2438,
      roughness: 0.4,
      metalness: 0.6,
    });
    const glowVioletMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
    });
    const glowCyanMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
    });

    // --- Torso / Chest Armor ---
    const torsoGeo = new THREE.CylinderGeometry(0.55, 0.45, 1.2, 8);
    const torso = new THREE.Mesh(torsoGeo, armorMaterial);
    characterGroup.add(torso);

    // Chest Core Reactor (Pulsing Arc Core)
    const coreGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, glowCyanMaterial);
    coreMesh.position.set(0, 0.15, 0.45);
    torso.add(coreMesh);

    // --- Head & Visor ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.95, 0);
    characterGroup.add(headGroup);

    const headGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const head = new THREE.Mesh(headGeo, secondaryMaterial);
    headGroup.add(head);

    // Cyber Visor / Code Display
    const visorGeo = new THREE.BoxGeometry(0.66, 0.2, 0.35);
    const visor = new THREE.Mesh(visorGeo, glowCyanMaterial);
    visor.position.set(0, 0.05, 0.22);
    headGroup.add(visor);

    // Headset / Audio Antenna
    const antennaGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const antenna = new THREE.Mesh(antennaGeo, glowVioletMaterial);
    antenna.position.set(0.38, 0.25, 0);
    antenna.rotation.z = -0.3;
    headGroup.add(antenna);

    // --- Dual Jetpack Thrusters ---
    const jetpackGeo = new THREE.BoxGeometry(0.6, 0.7, 0.3);
    const jetpack = new THREE.Mesh(jetpackGeo, armorMaterial);
    jetpack.position.set(0, 0.1, -0.4);
    characterGroup.add(jetpack);

    // Left & Right Thruster Cones
    const thrusterGeo = new THREE.ConeGeometry(0.12, 0.3, 8);
    const leftThruster = new THREE.Mesh(thrusterGeo, glowVioletMaterial);
    leftThruster.position.set(-0.2, -0.4, -0.4);
    leftThruster.rotation.x = Math.PI;
    characterGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, glowVioletMaterial);
    rightThruster.position.set(0.2, -0.4, -0.4);
    rightThruster.rotation.x = Math.PI;
    characterGroup.add(rightThruster);

    // --- Left & Right Floating Arms ---
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.7, 8);
    const leftArm = new THREE.Mesh(armGeo, secondaryMaterial);
    leftArm.position.set(-0.75, 0.1, 0);
    leftArm.rotation.z = 0.3;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, secondaryMaterial);
    rightArm.position.set(0.75, 0.1, 0);
    rightArm.rotation.z = -0.3;
    characterGroup.add(rightArm);

    // Holographic Datapad in Right Hand
    const datapadGeo = new THREE.PlaneGeometry(0.4, 0.25);
    const datapad = new THREE.Mesh(datapadGeo, glowCyanMaterial);
    datapad.position.set(0.85, -0.3, 0.3);
    datapad.rotation.x = -Math.PI / 4;
    characterGroup.add(datapad);

    // --- Floating Orbiting Bot Drone ("CORE-01") ---
    const botDroneGroup = new THREE.Group();
    scene.add(botDroneGroup);

    const botSphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const botMesh = new THREE.Mesh(botSphereGeo, glowCyanMaterial);
    botDroneGroup.add(botMesh);

    const botRingGeo = new THREE.TorusGeometry(0.28, 0.03, 8, 24);
    const botRing = new THREE.Mesh(botRingGeo, glowVioletMaterial);
    botDroneGroup.add(botRing);

    // --- Particle Thruster Trail System ---
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.3;
      particlePositions[i * 3 + 1] = -0.5 - Math.random() * 0.8;
      particlePositions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 0.3;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: -0.04 - Math.random() * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    characterGroup.add(particleSystem);

    // 4. Mouse tracking listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle Hovering Bobbing Motion
      characterGroup.position.y = Math.sin(elapsed * 2.5) * 0.15;
      characterGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.1 + mousePos.current.x * 0.4;
      characterGroup.rotation.x = -mousePos.current.y * 0.3;

      // Head follows cursor smoothly
      headGroup.rotation.y = mousePos.current.x * 0.6;
      headGroup.rotation.x = -mousePos.current.y * 0.4;

      // Arm subtle typing motion
      rightArm.rotation.x = Math.sin(elapsed * 6) * 0.15;
      leftArm.rotation.x = Math.cos(elapsed * 6) * 0.15;

      // Thrusters flame scale pulse
      const flameScale = 1 + Math.sin(elapsed * 18) * 0.3;
      leftThruster.scale.set(flameScale, flameScale, flameScale);
      rightThruster.scale.set(flameScale, flameScale, flameScale);

      // Core reactor breathing intensity
      const corePulse = 1 + Math.sin(elapsed * 4) * 0.2;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Orbiting Drone Animation
      const orbitRadius = 1.6;
      const orbitSpeed = elapsed * 2.0;
      botDroneGroup.position.x = Math.cos(orbitSpeed) * orbitRadius;
      botDroneGroup.position.z = Math.sin(orbitSpeed) * orbitRadius;
      botDroneGroup.position.y = Math.sin(elapsed * 3.5) * 0.4 + 0.3;
      botRing.rotation.x += 0.03;
      botRing.rotation.y += 0.04;

      // Particle update loop
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Reset particle if it falls too far
        if (positions[i * 3 + 1] < -1.8) {
          positions[i * 3] = (Math.random() - 0.5) * 0.25;
          positions[i * 3 + 1] = -0.5;
          positions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 0.25;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  // Jump to specific station
  const jumpToStation = (idx: number) => {
    sound.playTick();
    const target = STATIONS[idx];
    if (!target) return;
    setCurrentStationIdx(idx);

    const el = document.getElementById(target.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextStation = () => {
    const nextIdx = (currentStationIdx + 1) % STATIONS.length;
    jumpToStation(nextIdx);
  };

  const handlePrevStation = () => {
    const prevIdx = (currentStationIdx - 1 + STATIONS.length) % STATIONS.length;
    jumpToStation(prevIdx);
  };

  return (
    <>
      {/* =========================================================================
          FLOATING 3D CHARACTER COMPANION & HOLOGRAPHIC STATION HUD
          ========================================================================= */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none select-none">
        {/* Holographic Speech & Station Dialogue Bubble */}
        {!hudMinimized && speechActive && (
          <div className="pointer-events-auto mb-3 max-w-sm sm:max-w-md p-4 rounded-2xl bg-[#090B12]/95 backdrop-blur-xl border border-indigo-500/40 shadow-2xl shadow-indigo-950/60 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Top Bar with Station Indicator */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[11px] font-mono font-bold text-sky-400">
                  {currentStation.tag}{" // "}{currentStation.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSpeechActive(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Mute dialogue"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setHudMinimized(true)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Minimize HUD"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Typewriter Character Voice */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans min-h-[48px]">
                {dialogueText}
                {isTyping && <span className="inline-block w-1.5 h-3.5 ml-1 bg-indigo-400 animate-pulse" />}
              </p>

              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{currentStation.actionHint}</span>
              </div>
            </div>

            {/* Station Stepper Controls */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevStation}
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
                  title="Previous Section"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextStation}
                  className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  title="Next Section"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-400 text-[11px] ml-1.5">
                  {currentStationIdx + 1}/{STATIONS.length}
                </span>
              </div>

              <button
                onClick={handleNextStation}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>Fly to Next Station</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 3D Character Canvas Container & Control Pill */}
        <div className="pointer-events-auto flex items-end gap-2">
          {/* Character Widget Dock */}
          <div className="relative group">
            {/* Ambient character glow halo */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/30 via-sky-500/20 to-transparent blur-2xl rounded-full pointer-events-none" />

            <div
              onClick={() => {
                sound.playTick();
                setHudMinimized(false);
                setSpeechActive(true);
              }}
              className="relative cursor-pointer w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#090B12]/80 backdrop-blur-md border border-indigo-500/40 hover:border-sky-400 transition-all duration-300 shadow-2xl overflow-hidden flex items-center justify-center"
              title="Click to interact with Inderjeet (Architect Bot)"
            >
              {/* Three.js Canvas mounts here */}
              <div ref={mountRef} className="w-full h-full" />

              {/* Character Floating Mini Badge */}
              <div className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                BOT-01
              </div>

              <div className="absolute bottom-1 right-2 text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>

          {/* Minimized Quick Expand Pill */}
          {hudMinimized && (
            <button
              onClick={() => {
                sound.playTick();
                setHudMinimized(false);
                setSpeechActive(true);
              }}
              className="pointer-events-auto p-2.5 rounded-xl bg-[#0E1017] border border-white/[0.1] text-indigo-400 hover:text-white shadow-xl transition-all"
              title="Open Architect Dialogue"
            >
              <Bot className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
