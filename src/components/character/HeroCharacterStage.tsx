"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCharacterStage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const violetKeyLight = new THREE.DirectionalLight(0x818cf8, 3.2);
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
    const particleCount = 40;
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
      size: 0.08,
      transparent: true,
      opacity: 0.8,
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
      characterGroup.position.y = Math.sin(elapsed * 2.5) * 0.15;
      characterGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.1 + mousePos.current.x * 0.4;
      characterGroup.rotation.x = -mousePos.current.y * 0.3;

      // Head cursor tracking
      headGroup.rotation.y = mousePos.current.x * 0.6;
      headGroup.rotation.x = -mousePos.current.y * 0.4;

      // Typing motion
      rightArm.rotation.x = Math.sin(elapsed * 5.5) * 0.18;
      leftArm.rotation.x = Math.cos(elapsed * 5.5) * 0.18;

      // Thruster flame scale
      const flamePulse = 1 + Math.sin(elapsed * 20) * 0.3;
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
      droneGroup.position.y = Math.sin(elapsed * 3.5) * 0.4 + 0.3;
      droneRing.rotation.x += 0.035;
      droneRing.rotation.y += 0.045;

      // Particle update
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 2] += particleVelocities[i].z;

        if (positions[i * 3 + 1] < -2.0) {
          positions[i * 3] = (Math.random() - 0.5) * 0.25;
          positions[i * 3 + 1] = -0.6;
          positions[i * 3 + 2] = -0.42 + (Math.random() - 0.5) * 0.25;
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

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Subtle outer glow halo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/15 via-sky-500/20 to-violet-500/15 rounded-3xl blur-xl opacity-60 pointer-events-none" />

      {/* Clean 3D Stage Container */}
      <div className="relative rounded-2xl bg-[#090C15]/90 border border-white/[0.1] shadow-2xl p-4 backdrop-blur-xl">
        {/* Top Minimal Telemetry Bar */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300">
              ARCHITECT BOT // SIMULATION
            </span>
          </div>

          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Interactive WebGL
          </span>
        </div>

        {/* 3D WebGL Canvas */}
        <div className="relative h-72 sm:h-80 w-full rounded-xl bg-gradient-to-b from-[#080A12] to-[#0D111D] border border-white/[0.05] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>
      </div>
    </div>
  );
}
