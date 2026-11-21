"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FluidLiquidSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rippleEnergy = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Liquid Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x06b6d4, 0.8);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f2fe, 5, 20);
    cyanPoint.position.set(4, 4, 5);
    scene.add(cyanPoint);

    const oceanBluePoint = new THREE.PointLight(0x3b82f6, 4.5, 20);
    oceanBluePoint.position.set(-4, -3, 3);
    scene.add(oceanBluePoint);

    const violetPoint = new THREE.PointLight(0x8b5cf6, 4, 15);
    violetPoint.position.set(0, -4, -2);
    scene.add(violetPoint);

    // 3. Fluid Liquid Sphere Mesh
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // High resolution icosahedron for fluid vertex waves
    const geometry = new THREE.IcosahedronGeometry(2.1, 32);
    const positionAttribute = geometry.getAttribute("position");
    const originalPositions = new Float32Array(positionAttribute.array);

    // Translucent Liquid Physical Material with caustic reflections
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x051329,
      emissive: 0x03224c,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.25,
      transmission: 0.65,
      ior: 1.333, // Water index of refraction
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const liquidSphere = new THREE.Mesh(geometry, material);
    sphereGroup.add(liquidSphere);

    // Wireframe overlay for technical aesthetic
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireframeSphere = new THREE.Mesh(geometry, wireframeMat);
    sphereGroup.add(wireframeSphere);

    // 4. Orbiting Bioluminescent Water Droplets
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particleCoords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particleCoords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particleCoords[i * 3 + 2] = radius * Math.cos(phi);

      particleSpeeds.push(0.5 + Math.random() * 1.5);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Interaction Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    };

    const handleClick = () => {
      // Trigger a ripple pulse wave
      rippleEnergy.current = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("click", handleClick);

    // 6. Animation Loop (Fluid Wave Displacement Engine)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse coordinate lerping
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Decay ripple energy
      rippleEnergy.current *= 0.94;

      // Group rotation
      sphereGroup.rotation.y = elapsed * 0.25 + mousePos.current.x * 0.5;
      sphereGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15 - mousePos.current.y * 0.5;

      // Fluid Vertex Wave Turbulence
      const positions = positionAttribute.array as Float32Array;
      const count = positionAttribute.count;

      const waveSpeed = elapsed * 2.2;
      const waveFreq = 2.4;
      const waveAmp = 0.22 + rippleEnergy.current * 0.35;

      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // 3D organic sinusoidal noise displacement
        const distance = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / distance;
        const ny = oy / distance;
        const nz = oz / distance;

        const wave1 = Math.sin(ox * waveFreq + waveSpeed) * Math.cos(oy * waveFreq + waveSpeed * 0.8);
        const wave2 = Math.sin(oz * waveFreq * 1.4 + waveSpeed * 1.2) * 0.5;
        const displacement = (wave1 + wave2) * waveAmp;

        positions[i * 3] = ox + nx * displacement;
        positions[i * 3 + 1] = oy + ny * displacement;
        positions[i * 3 + 2] = oz + nz * displacement;
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Rotate Orbiting Droplets
      particles.rotation.y = -elapsed * 0.15;
      particles.rotation.x = elapsed * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient underwater liquid blur glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/25 to-violet-500/20 rounded-full blur-3xl pointer-events-none animate-liquid-pulse" />

      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer select-none active:scale-[0.98] transition-transform duration-300"
        title="Interactive 3D Fluid Liquid Mesh (Click to send ripple waves)"
      />
    </div>
  );
}
