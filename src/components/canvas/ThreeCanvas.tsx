"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArchitectureCore } from "./ArchitectureCore";

export type VisualEngineMode = "stream" | "horizon" | "mesh" | "globe";
export type VisualIntensityMode = "delicate" | "balanced" | "vivid" | "zen";

interface ThreeCanvasProps {
  scrollProgress: number;
  activeSection: string;
}

export default function ThreeCanvas({ scrollProgress, activeSection }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const sectionRef = useRef<string>(activeSection);
  const activeModeRef = useRef<VisualEngineMode>("stream");
  const [, setModeState] = useState<VisualEngineMode>("stream");
  const [intensityState, setIntensityState] = useState<VisualIntensityMode>("delicate");

  useEffect(() => {
    scrollRef.current = scrollProgress;
    sectionRef.current = activeSection;
  }, [scrollProgress, activeSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check localStorage for saved preference
    const saved = localStorage.getItem("portfolio_visual_engine") as VisualEngineMode | null;
    if (saved && ["stream", "horizon", "mesh", "globe"].includes(saved)) {
      activeModeRef.current = saved;
      setModeState(saved);
    }

    const savedIntensity = localStorage.getItem("portfolio_visual_intensity") as VisualIntensityMode | null;
    if (savedIntensity && ["delicate", "balanced", "vivid", "zen"].includes(savedIntensity)) {
      setIntensityState(savedIntensity);
    }

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.052);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x08090d, 1);
    container.appendChild(renderer.domElement);

    // --- LIGHTING (Softened ambient & point lights for reading comfort) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x10b981, 1.2, 12);
    coreLight.position.set(2, 1, 4);
    scene.add(coreLight);

    const secondaryLight = new THREE.PointLight(0x0ea5e9, 1.0, 12);
    secondaryLight.position.set(-2, -1, 4);
    scene.add(secondaryLight);

    // Mouse coordinates with high inertia
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 1.4;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 1.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Reusable circular soft glow sprite generator
    const createSoftParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
        gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.12)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };
    const softDotTexture = createSoftParticleTexture();

    // ==============================================================
    // 0. FOCAL 3D ARCHITECTURAL HYPERCORE (SCROLL-DRIVEN SYSTEMS ENGINE)
    // ==============================================================
    const architectureCore = new ArchitectureCore(softDotTexture);
    scene.add(architectureCore.group);

    // ==============================================================
    // 1. ENGINE MODE: TOKIO CONCURRENCY STREAMS (DEFAULT - CALM & FLOWING)
    // ==============================================================
    // Represents async task queues, streaming SSR, and Tokio worker pipelines
    const streamGroup = new THREE.Group();
    scene.add(streamGroup);

    const streamParticleCount = 950;
    const streamGeo = new THREE.BufferGeometry();
    const streamPos = new Float32Array(streamParticleCount * 3);
    const streamColors = new Float32Array(streamParticleCount * 3);
    const streamData: {
      speed: number;
      laneY: number;
      laneZ: number;
      phase: number;
      freq: number;
    }[] = [];

    const threadLanes = [
      { y: -1.2, z: 0.6, col: new THREE.Color(0x10b981) }, // Tokio Emerald
      { y: -0.4, z: -0.4, col: new THREE.Color(0x0ea5e9) }, // Edge Sky
      { y: 0.4, z: 0.8, col: new THREE.Color(0x14b8a6) }, // Async Teal
      { y: 1.1, z: -0.8, col: new THREE.Color(0x818cf8) }, // RSC Indigo
      { y: -1.9, z: -1.2, col: new THREE.Color(0x059669) }, // Kernel Green
      { y: 1.8, z: 0.2, col: new THREE.Color(0x38bdf8) }, // Network Cyan
    ];

    for (let i = 0; i < streamParticleCount; i++) {
      const i3 = i * 3;
      const lane = threadLanes[i % threadLanes.length];
      const x = (Math.random() - 0.5) * 26;
      const y = lane.y + (Math.random() - 0.5) * 0.45;
      const z = lane.z + (Math.random() - 0.5) * 0.5;

      streamPos[i3] = x;
      streamPos[i3 + 1] = y;
      streamPos[i3 + 2] = z;

      streamColors[i3] = lane.col.r;
      streamColors[i3 + 1] = lane.col.g;
      streamColors[i3 + 2] = lane.col.b;

      streamData.push({
        speed: 0.018 + Math.random() * 0.022,
        laneY: lane.y,
        laneZ: lane.z,
        phase: Math.random() * Math.PI * 2,
        freq: 0.25 + Math.random() * 0.35,
      });
    }

    streamGeo.setAttribute("position", new THREE.BufferAttribute(streamPos, 3));
    streamGeo.setAttribute("color", new THREE.BufferAttribute(streamColors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      map: softDotTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    streamGroup.add(streamPoints);

    // Subtle bedrock plane under streams
    const streamPlaneGeo = new THREE.PlaneGeometry(36, 18, 28, 14);
    const streamPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const streamPlane = new THREE.Mesh(streamPlaneGeo, streamPlaneMat);
    streamPlane.position.set(0, -2.8, -1.5);
    streamPlane.rotation.x = -Math.PI / 2.2;
    streamGroup.add(streamPlane);

    // ==============================================================
    // 2. ENGINE MODE: SYSTEMS HORIZON (DIGITAL TOPOLOGICAL MATRIX)
    // ==============================================================
    // Sits in bottom third with receding horizon; 100% reading space clarity
    const horizonGroup = new THREE.Group();
    scene.add(horizonGroup);
    horizonGroup.visible = false;

    const horizonWidth = 42;
    const horizonDepth = 26;
    const horizonSegmentsX = 42;
    const horizonSegmentsY = 26;
    const horizonGeo = new THREE.PlaneGeometry(
      horizonWidth,
      horizonDepth,
      horizonSegmentsX,
      horizonSegmentsY
    );
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(0, -2.5, -3.5);
    horizonMesh.rotation.x = -Math.PI / 2.22;
    horizonGroup.add(horizonMesh);

    // Floating telemetry horizon markers
    const beaconGeo = new THREE.BufferGeometry();
    const beaconPoints: number[] = [];
    for (let bx = -16; bx <= 16; bx += 4) {
      beaconPoints.push(bx, -2.4, -4);
      beaconPoints.push(bx, -1.2, -4);
    }
    beaconGeo.setAttribute("position", new THREE.Float32BufferAttribute(beaconPoints, 3));
    const beaconMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.16,
    });
    const beaconLines = new THREE.LineSegments(beaconGeo, beaconMat);
    horizonGroup.add(beaconLines);

    // ==============================================================
    // 3. ENGINE MODE: DISTRIBUTED CLUSTER DAG (MICROSERVICE MESH)
    // ==============================================================
    // Clean perimeter nodes framing text cards without obstructing reading
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroup.visible = false;

    const clusterNodePositions = [
      new THREE.Vector3(-4.4, 2.0, -1.0), // Ingress Gateway
      new THREE.Vector3(-4.0, 0.4, -0.6), // Auth Worker
      new THREE.Vector3(-4.6, -1.4, -1.2), // Edge KV
      new THREE.Vector3(-3.2, -2.6, -1.6), // DB Replica
      new THREE.Vector3(4.2, 2.1, -1.0), // Tokio Core
      new THREE.Vector3(4.6, 0.5, -0.6), // Raft Leader
      new THREE.Vector3(4.0, -1.3, -1.2), // Shard Manager
      new THREE.Vector3(3.2, -2.5, -1.6), // Redis Cluster
      new THREE.Vector3(-2.2, 3.2, -2.0), // K8s Controller
      new THREE.Vector3(2.2, 3.2, -2.0), // Canary Router
      new THREE.Vector3(-1.8, -3.4, -2.2), // Observability
      new THREE.Vector3(1.8, -3.4, -2.2), // Event Bus
    ];

    const clusterNodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const clusterNodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const clusterHaloMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.3,
    });

    clusterNodePositions.forEach((pos) => {
      const node = new THREE.Mesh(clusterNodeGeo, clusterNodeMat);
      node.position.copy(pos);
      meshGroup.add(node);

      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), clusterHaloMat);
      halo.position.copy(pos);
      meshGroup.add(halo);
    });

    // Mesh lines between adjacent nodes
    const meshConnections = [
      [0, 1], [1, 2], [2, 3],
      [4, 5], [5, 6], [6, 7],
      [0, 8], [8, 9], [9, 4],
      [3, 10], [10, 11], [11, 7],
      [1, 5], [2, 6],
    ];

    const meshLinesGeo = new THREE.BufferGeometry();
    const meshLinePoints: number[] = [];
    meshConnections.forEach(([from, to]) => {
      const p1 = clusterNodePositions[from];
      const p2 = clusterNodePositions[to];
      meshLinePoints.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    });
    meshLinesGeo.setAttribute("position", new THREE.Float32BufferAttribute(meshLinePoints, 3));
    const meshLinesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
    });
    const meshLines = new THREE.LineSegments(meshLinesGeo, meshLinesMat);
    meshGroup.add(meshLines);

    // Traveling packet dots across cluster
    const clusterPackets: {
      from: THREE.Vector3;
      to: THREE.Vector3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }[] = [];
    const packetMeshGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const packetMeshMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < 6; i++) {
      const conn = meshConnections[i % meshConnections.length];
      const pMesh = new THREE.Mesh(packetMeshGeo, packetMeshMat);
      meshGroup.add(pMesh);
      clusterPackets.push({
        from: clusterNodePositions[conn[0]],
        to: clusterNodePositions[conn[1]],
        mesh: pMesh,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.004,
      });
    }

    // ==============================================================
    // 4. ENGINE MODE: GLOBAL EDGE INFRASTRUCTURE (GLOBE CONSTELLATION)
    // ==============================================================
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroup.visible = false;

    const globeRadius = 2.2;
    const globePointCount = 550;
    const globeGeo = new THREE.BufferGeometry();
    const globePos = new Float32Array(globePointCount * 3);
    const globeColors = new Float32Array(globePointCount * 3);
    const colSlate = new THREE.Color(0x1e293b);
    const colEmerald = new THREE.Color(0x10b981);
    const colSky = new THREE.Color(0x0ea5e9);

    for (let i = 0; i < globePointCount; i++) {
      const i3 = i * 3;
      const phi = Math.acos(-1 + (2 * i) / globePointCount);
      const theta = Math.sqrt(globePointCount * Math.PI) * phi;
      globePos[i3] = globeRadius * Math.cos(theta) * Math.sin(phi);
      globePos[i3 + 1] = globeRadius * Math.sin(theta) * Math.sin(phi);
      globePos[i3 + 2] = globeRadius * Math.cos(phi);

      const c = i % 7 === 0 ? colEmerald : i % 11 === 0 ? colSky : colSlate;
      globeColors[i3] = c.r;
      globeColors[i3 + 1] = c.g;
      globeColors[i3 + 2] = c.b;
    }
    globeGeo.setAttribute("position", new THREE.BufferAttribute(globePos, 3));
    globeGeo.setAttribute("color", new THREE.BufferAttribute(globeColors, 3));

    const globeMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      map: softDotTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const globePoints = new THREE.Points(globeGeo, globeMat);
    globeGroup.add(globePoints);

    // Subtle rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const equator = new THREE.Mesh(new THREE.TorusGeometry(globeRadius, 0.007, 8, 70), ringMat);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    const meridian = new THREE.Mesh(new THREE.TorusGeometry(globeRadius, 0.007, 8, 70), ringMat);
    globeGroup.add(meridian);

    // Real PoPs
    const latLonToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const edgeNodes = [
      { lat: 37.77, lon: -122.41 }, // SF
      { lat: 40.71, lon: -74.0 }, // NYC
      { lat: 51.5, lon: -0.12 }, // London
      { lat: 50.11, lon: 8.68 }, // Frankfurt
      { lat: 35.67, lon: 139.65 }, // Tokyo
      { lat: 1.35, lon: 103.81 }, // Singapore
      { lat: 19.07, lon: 72.87 }, // Mumbai
      { lat: -33.86, lon: 151.2 }, // Sydney
    ];

    const edgePositions = edgeNodes.map((n) => latLonToVector3(n.lat, n.lon, globeRadius));
    const edgeNodeGeo = new THREE.SphereGeometry(0.05, 10, 10);
    const edgeNodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    edgePositions.forEach((pos) => {
      const node = new THREE.Mesh(edgeNodeGeo, edgeNodeMat);
      node.position.copy(pos);
      globeGroup.add(node);
    });

    const globeRoutes = [
      [0, 1], [1, 2], [2, 3], [3, 6], [6, 5], [5, 4], [4, 0], [5, 7]
    ];

    interface GlobePacket {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const globePackets: GlobePacket[] = [];

    globeRoutes.forEach(([from, to]) => {
      const p1 = edgePositions[from];
      const p2 = edgePositions[to];
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.26);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(32);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.14,
      });
      const arcLine = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(arcLine);

      const packetMesh = new THREE.Mesh(packetMeshGeo, packetMeshMat);
      globeGroup.add(packetMesh);
      globePackets.push({
        curve,
        mesh: packetMesh,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      });
    });

    // ==============================================================
    // VISUAL ENGINE & INTENSITY SWITCHING LISTENERS
    // ==============================================================
    const updateActiveVisualMode = (mode: VisualEngineMode) => {
      activeModeRef.current = mode;
      setModeState(mode);
      localStorage.setItem("portfolio_visual_engine", mode);

      streamGroup.visible = mode === "stream";
      horizonGroup.visible = mode === "horizon";
      meshGroup.visible = mode === "mesh";
      globeGroup.visible = mode === "globe";
    };

    // Initialize visibility from current mode
    updateActiveVisualMode(activeModeRef.current);

    const handleSwitchEngineEvent = (e: Event) => {
      const customEvent = e as CustomEvent<VisualEngineMode>;
      if (customEvent.detail) {
        updateActiveVisualMode(customEvent.detail);
      }
    };
    window.addEventListener("set-visual-engine", handleSwitchEngineEvent as EventListener);

    const handleSwitchIntensityEvent = (e: Event) => {
      const customEvent = e as CustomEvent<VisualIntensityMode>;
      if (customEvent.detail) {
        setIntensityState(customEvent.detail);
        localStorage.setItem("portfolio_visual_intensity", customEvent.detail);
      }
    };
    window.addEventListener("set-visual-intensity", handleSwitchIntensityEvent as EventListener);

    // Direct stage synchronization listener (from interactive project cards & tabs)
    const handleSetArchStage = (e: Event) => {
      const customEvent = e as CustomEvent<{ stageIndex: number | null }>;
      if (customEvent.detail !== undefined) {
        architectureCore.setManualStage(customEvent.detail.stageIndex);
      }
    };
    window.addEventListener("set-architecture-stage", handleSetArchStage as EventListener);

    // Interactive pointer/touch drag rotation listener
    const handleDragModel = (e: Event) => {
      const customEvent = e as CustomEvent<{ dx: number; dy: number }>;
      if (customEvent.detail) {
        architectureCore.applyDragDelta(customEvent.detail.dx, customEvent.detail.dy);
      }
    };
    window.addEventListener("drag-3d-model", handleDragModel as EventListener);

    // ==============================================================
    // CORE PULSE & DISPATCH EVENT LISTENERS
    // ==============================================================
    const handleCorePulse = () => {
      architectureCore.triggerResonancePulse("pulse");
    };
    const handleCoreDispatch = () => {
      architectureCore.triggerResonancePulse("dispatch");
    };
    window.addEventListener("trigger-core-pulse", handleCorePulse);
    window.addEventListener("trigger-core-dispatch", handleCoreDispatch);

    // ==============================================================
    // RAYCASTER FOR DIRECT 3D CORE CLICK INTERACTION
    // ==============================================================
    const raycaster = new THREE.Raycaster();
    const mouseCoords = new THREE.Vector2();

    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='dialog']"))
      ) {
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoords.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoords.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoords, camera);
      const hits = raycaster.intersectObjects(architectureCore.getInteractables(), true);

      if (hits.length > 0) {
        architectureCore.triggerResonancePulse("pulse");
        window.dispatchEvent(new CustomEvent("core-pulse-triggered"));
      }
    };
    window.addEventListener("click", handleWindowClick);

    // ==============================================================
    // STRESS TEST EVENT LISTENER
    // ==============================================================
    let isStress = false;
    let stressTimer: NodeJS.Timeout | null = null;
    const handleStress = () => {
      isStress = true;
      architectureCore.triggerResonancePulse("stress");
      if (stressTimer) clearTimeout(stressTimer);
      stressTimer = setTimeout(() => {
        isStress = false;
      }, 4000);
    };
    window.addEventListener("trigger-pipeline-stress", handleStress);

    // ==============================================================
    // ANIMATION RENDER LOOP (60 FPS, SILKY LERP)
    // ==============================================================
    let animId: number;
    const clock = new THREE.Clock();

    const targetCameraPos = new THREE.Vector3(0, 0, 7.5);
    const targetCameraLookAt = new THREE.Vector3(0, 0, 0);

    let lastStageIndex = -1;
    let lastProgress = -1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      const progress = scrollRef.current;
      const speedMult = isStress ? 3.5 : 1.0;
      const currentMode = activeModeRef.current;
      const isDesktop = window.innerWidth >= 1024;

      // --- 0. UPDATE 3D ARCHITECTURAL HYPERCORE ---
      const telemetry = architectureCore.update(
        progress,
        elapsedTime,
        isStress,
        mouse.x,
        mouse.y,
        isDesktop
      );

      // Dispatch telemetry event when stage changes or upon scroll
      if (
        lastStageIndex !== telemetry.stageIndex ||
        Math.abs(lastProgress - progress) > 0.004
      ) {
        lastStageIndex = telemetry.stageIndex;
        lastProgress = progress;
        window.dispatchEvent(
          new CustomEvent("core-telemetry-update", { detail: telemetry })
        );
      }

      // --- 1. STREAM ENGINE ANIMATION ---
      if (currentMode === "stream") {
        targetCameraPos.set(mouse.x * 0.5, 0.2 + mouse.y * 0.35, 7.5 - progress * 0.8);
        targetCameraLookAt.set(0, -0.2, 0);

        const positions = streamGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < streamParticleCount; i++) {
          const i3 = i * 3;
          const meta = streamData[i];

          // Forward horizontal flow along X axis
          positions[i3] += (meta.speed + progress * 0.03) * speedMult;
          if (positions[i3] > 13) {
            positions[i3] = -13;
          }

          // Subtle organic wave undulation
          positions[i3 + 1] =
            meta.laneY +
            Math.sin(elapsedTime * meta.freq + positions[i3] * 0.3 + meta.phase) * 0.25;
        }
        streamGeo.attributes.position.needsUpdate = true;
        streamPlane.rotation.z = Math.sin(elapsedTime * 0.1) * 0.03;
      }

      // --- 2. HORIZON ENGINE ANIMATION ---
      else if (currentMode === "horizon") {
        targetCameraPos.set(mouse.x * 0.6, 0.4 + mouse.y * 0.4, 7.8);
        targetCameraLookAt.set(0, -1.2, -4);

        const posAttr = horizonGeo.attributes.position;
        const posArray = posAttr.array as Float32Array;
        const vertexCount = posAttr.count;

        for (let i = 0; i < vertexCount; i++) {
          const x = posArray[i * 3];
          const y = posArray[i * 3 + 1];
          // Harmonic wave elevation
          posArray[i * 3 + 2] =
            Math.sin(x * 0.28 + elapsedTime * 0.7 * speedMult) *
              Math.cos(y * 0.25 + elapsedTime * 0.5) *
              0.48 +
            Math.sin(x * 0.5 - elapsedTime * 0.8) * 0.18;
        }
        posAttr.needsUpdate = true;
      }

      // --- 3. CLUSTER MESH ANIMATION ---
      else if (currentMode === "mesh") {
        targetCameraPos.set(mouse.x * 0.4, mouse.y * 0.3, 7.8);
        targetCameraLookAt.set(0, 0, 0);

        meshGroup.rotation.y = Math.sin(elapsedTime * 0.08) * 0.12;
        meshGroup.rotation.x = Math.cos(elapsedTime * 0.06) * 0.08;

        clusterPackets.forEach((p) => {
          p.progress += p.speed * speedMult;
          if (p.progress > 1.0) p.progress = 0;
          p.mesh.position.lerpVectors(p.from, p.to, p.progress);
        });
      }

      // --- 4. GLOBE ENGINE ANIMATION ---
      else if (currentMode === "globe") {
        if (isDesktop) {
          targetCameraPos.set(2.4 + mouse.x * 0.3, 1.0 + mouse.y * 0.3, 7.6);
          targetCameraLookAt.set(2.0, 0, 0);
          globeGroup.position.set(2.2, 0, 0);
        } else {
          targetCameraPos.set(mouse.x * 0.3, mouse.y * 0.3, 8.2);
          targetCameraLookAt.set(0, 0, 0);
          globeGroup.position.set(0, 0, -1.8);
        }

        globeGroup.rotation.y = elapsedTime * 0.04 * speedMult;
        globePackets.forEach((p) => {
          p.progress += p.speed * speedMult;
          if (p.progress > 1.0) p.progress = 0;
          const pt = p.curve.getPoint(p.progress);
          p.mesh.position.copy(pt);
        });
      }

      // Smooth camera transition
      camera.position.lerp(targetCameraPos, 0.04);
      camera.lookAt(targetCameraLookAt);

      // Accent lighting follows active mode & stress state
      if (isStress) {
        coreLight.color.setHex(0xf59e0b); // Amber during stress test
      } else if (currentMode === "stream") {
        coreLight.color.setHex(0x10b981); // Emerald
      } else if (currentMode === "horizon") {
        coreLight.color.setHex(0x0ea5e9); // Sky
      } else {
        coreLight.color.setHex(0x10b981);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("trigger-core-pulse", handleCorePulse);
      window.removeEventListener("trigger-core-dispatch", handleCoreDispatch);
      window.removeEventListener("trigger-pipeline-stress", handleStress);
      window.removeEventListener("set-visual-engine", handleSwitchEngineEvent as EventListener);
      window.removeEventListener("set-visual-intensity", handleSwitchIntensityEvent as EventListener);
      window.removeEventListener("set-architecture-stage", handleSetArchStage as EventListener);
      window.removeEventListener("drag-3d-model", handleDragModel as EventListener);
      if (stressTimer) clearTimeout(stressTimer);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Clean up 3D Architecture Core
      architectureCore.dispose();
      scene.remove(architectureCore.group);

      renderer.dispose();
      softDotTexture.dispose();
      streamGeo.dispose();
      streamMat.dispose();
      streamPlaneGeo.dispose();
      streamPlaneMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      clusterNodeGeo.dispose();
      clusterNodeMat.dispose();
      clusterHaloMat.dispose();
      meshLinesGeo.dispose();
      meshLinesMat.dispose();
      packetMeshGeo.dispose();
      packetMeshMat.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      ringMat.dispose();
      equator.geometry.dispose();
      meridian.geometry.dispose();
      edgeNodeGeo.dispose();
      edgeNodeMat.dispose();
    };
  }, []);

  const getIntensityClass = () => {
    switch (intensityState) {
      case "delicate":
        return "opacity-75";
      case "balanced":
        return "opacity-88";
      case "vivid":
        return "opacity-100";
      case "zen":
        return "opacity-25";
      default:
        return "opacity-75";
    }
  };

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${getIntensityClass()} transition-opacity duration-700`}
      aria-hidden="true"
    />
  );
}
