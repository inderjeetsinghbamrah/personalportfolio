import * as THREE from "three";

export interface StageKeyframe {
  progress: number;
  name: string;
  role: string;
  tech: string;
  posDesktop: [number, number, number];
  posMobile: [number, number, number];
  rotBase: [number, number, number];
  tierSeparation: number; // 0 for compact, 1.35 for exploded stack
  raftSpread: number;     // 0 for ring orbit, 1.6 for detached Raft triangle
  armillary: number;      // 0 for concentric, 1 for planetary coordinate cage
  turbineMode: number;    // 0 for gyroscopic, 1 for axial high-speed turbine
  emitterMode: number;    // 0 for idle, 1 for forward-facing directional transmitter
  color: number;          // primary hex
  accentColor: number;    // secondary hex
}

export const ARCHITECTURE_STAGES: StageKeyframe[] = [
  {
    progress: 0.05,
    name: "01 // INGRESS GATEWAY",
    role: "Edge Client Entry & HTTP/3 QUIC Router",
    tech: "Next.js Edge • Cloudflare CDN",
    posDesktop: [3.3, 0.15, -0.4],
    posMobile: [0.0, -0.9, -3.2],
    rotBase: [0.2, 0.3, 0.1],
    tierSeparation: 0.0,
    raftSpread: 0.0,
    armillary: 0.0,
    turbineMode: 0.0,
    emitterMode: 0.0,
    color: 0x10b981, // Emerald
    accentColor: 0x0ea5e9, // Sky
  },
  {
    progress: 0.28,
    name: "02 // 3-TIER SYSTEMS RUNTIME",
    role: "Exploded Architecture Breakdown",
    tech: "React 19 RSC ➔ Tokio Engine ➔ K8s Pods",
    posDesktop: [3.5, -0.2, -0.6],
    posMobile: [0.8, -0.5, -3.4],
    rotBase: [0.35, 0.5, 0.0],
    tierSeparation: 1.1, // Refined exploded view
    raftSpread: 0.0,
    armillary: 0.0,
    turbineMode: 0.0,
    emitterMode: 0.0,
    color: 0xf59e0b, // Amber (Rust)
    accentColor: 0x10b981, // Emerald (React)
  },
  {
    progress: 0.52,
    name: "03 // RAFT CONSENSUS CLUSTER",
    role: "Linearizable Distributed Storage Node",
    tech: "Aether-KV • Tokio Actors • io_uring",
    posDesktop: [-3.5, 0.1, -0.8], // Wide on peripheral left flank
    posMobile: [-0.8, -0.4, -3.4],
    rotBase: [0.25, -0.4, 0.15],
    tierSeparation: 0.0,
    raftSpread: 1.3, // Satellites detach into Raft consensus triangle
    armillary: 0.0,
    turbineMode: 0.0,
    emitterMode: 0.0,
    color: 0x0ea5e9, // Sky
    accentColor: 0xf59e0b, // Amber
  },
  {
    progress: 0.72,
    name: "04 // GLOBAL ANYCAST MESH",
    role: "Multi-Region Planetary Mesh & PoP Synchronization",
    tech: "SF • Tokyo • Frankfurt • Singapore • London",
    posDesktop: [3.3, -0.1, -0.6],
    posMobile: [0.7, -0.4, -3.2],
    rotBase: [0.4, 0.6, -0.2],
    tierSeparation: 0.0,
    raftSpread: 0.0,
    armillary: 1.0, // Planetary armillary sphere
    turbineMode: 0.0,
    emitterMode: 0.0,
    color: 0x818cf8, // Indigo
    accentColor: 0x38bdf8, // Cyan
  },
  {
    progress: 0.86,
    name: "05 // BARE-METAL KERNEL ENGINE",
    role: "Asynchronous IO_URING & System Execution Core",
    tech: "Zero-Cost Concurrency • CPU Registers",
    posDesktop: [0.0, 1.9, -2.6], // Set deeper above interactive terminal
    posMobile: [0.0, 1.3, -3.4],
    rotBase: [Math.PI / 2.3, 0, 0],
    tierSeparation: 0.0,
    raftSpread: 0.0,
    armillary: 0.0,
    turbineMode: 1.0, // Axial high-speed turbine
    emitterMode: 0.0,
    color: 0x34d399, // Neon Emerald
    accentColor: 0xffffff, // White
  },
  {
    progress: 0.98,
    name: "06 // SECURE TRANSMISSION DISPATCH",
    role: "Cryptographic Quantum Dispatch Gateway",
    tech: "TLS 1.3 • PGP Handshake • Packet Beacon",
    posDesktop: [3.1, -0.3, -0.5], // Anchored beside contact form
    posMobile: [0.0, 0.0, -3.0],
    rotBase: [0.1, 0.0, 0.0],
    tierSeparation: 0.0,
    raftSpread: 0.0,
    armillary: 0.0,
    turbineMode: 0.0,
    emitterMode: 1.0, // Forward-facing transmitter array
    color: 0xfacc15, // Radiant Gold
    accentColor: 0x10b981, // Emerald
  },
];

export interface CoreTelemetryState {
  stageIndex: number;
  stageName: string;
  stageRole: string;
  activeTech: string;
  targetPos: THREE.Vector3;
  colorHex: number;
  progress: number;
}

export class ArchitectureCore {
  public group: THREE.Group;

  // Hierarchical groups
  private coreAssembly: THREE.Group;
  private ringFrontendGroup: THREE.Group;
  private ringSystemsGroup: THREE.Group;
  private ringCloudGroup: THREE.Group;
  private conduitsGroup: THREE.Group;
  private shockwaveMesh: THREE.Mesh;
  private swarmPoints: THREE.Points;

  // Meshes & Lights
  private innerOcta: THREE.Mesh;
  private outerIcosa: THREE.Mesh;
  private coreLight: THREE.PointLight;
  private auraSprite: THREE.Sprite;
  private ring1Mesh: THREE.Mesh;
  private ring2Mesh: THREE.Mesh;
  private ring3Mesh: THREE.Mesh;

  // Sub-elements
  private frontendPackets: THREE.Mesh[] = [];
  private systemsGears: THREE.Mesh[] = [];
  private byteRegisters: THREE.Mesh[] = [];
  private podNodes: THREE.Group[] = [];
  private verticalConduitLines: THREE.Line[] = [];
  private raftLaserLines: THREE.LineSegments;

  // Animation & Physics State
  private shockwaveActive = false;
  private shockwaveScale = 0.1;
  private shockwaveOpacity = 0.0;
  private shockwaveSpeed = 0.05;

  private pulseIntensity = 0.0;
  private currentSeparation = 0.0;
  private currentRaftSpread = 0.0;
  private currentArmillary = 0.0;
  private currentTurbine = 0.0;
  private currentEmitter = 0.0;

  private smoothPos = new THREE.Vector3(2.7, 0.15, 0.6);
  private smoothRot = new THREE.Vector3(0.2, 0.3, 0.1);
  private activeColor = new THREE.Color(0x10b981);
  private targetColor = new THREE.Color(0x10b981);

  // Disposal tracking
  private disposables: { dispose: () => void }[] = [];

  constructor(softDotTexture: THREE.Texture) {
    this.group = new THREE.Group();
    this.group.name = "ArchitectureCore";

    // 1. Core Assembly
    this.coreAssembly = new THREE.Group();
    this.group.add(this.coreAssembly);

    // Inner faceted crystal (Lightened, ethereal)
    const octaGeo = new THREE.OctahedronGeometry(0.42, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.45,
      metalness: 0.8,
      emissive: 0x054e38,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.85,
    });
    this.innerOcta = new THREE.Mesh(octaGeo, octaMat);
    this.coreAssembly.add(this.innerOcta);
    this.disposables.push(octaGeo, octaMat);

    // Outer wireframe cage (Delicate hairline wireframe, non-intrusive)
    const icosaGeo = new THREE.IcosahedronGeometry(0.68, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    this.outerIcosa = new THREE.Mesh(icosaGeo, icosaMat);
    this.coreAssembly.add(this.outerIcosa);
    this.disposables.push(icosaGeo, icosaMat);

    // Glowing point light at core center (Softened intensity to protect reading contrast)
    this.coreLight = new THREE.PointLight(0x10b981, 1.2, 8);
    this.coreAssembly.add(this.coreLight);

    // Soft aura glow sprite (Gentle ambient glow)
    const auraMat = new THREE.SpriteMaterial({
      map: softDotTexture,
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.auraSprite = new THREE.Sprite(auraMat);
    this.auraSprite.scale.set(1.9, 1.9, 1);
    this.coreAssembly.add(this.auraSprite);
    this.disposables.push(auraMat);

    // 2. Tier 1: Frontend Ring (React 19 / RSC Fiber Ring)
    this.ringFrontendGroup = new THREE.Group();
    this.group.add(this.ringFrontendGroup);

    const ring1Geo = new THREE.TorusGeometry(1.22, 0.015, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.35,
      metalness: 0.75,
      emissive: 0x0284c7,
      emissiveIntensity: 0.18,
      transparent: true,
      opacity: 0.75,
    });
    this.ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    this.ringFrontendGroup.add(this.ring1Mesh);
    this.disposables.push(ring1Geo, ring1Mat);

    // 4 Virtual DOM Component brackets & 4 orbiting client packets
    const packetGeo = new THREE.SphereGeometry(0.035, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    this.disposables.push(packetGeo, packetMat);

    const bracketGeo = new THREE.BoxGeometry(0.02, 0.09, 0.04);
    const bracketMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
    this.disposables.push(bracketGeo, bracketMat);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.position.set(Math.cos(angle) * 1.22, Math.sin(angle) * 1.22, 0);
      bracket.rotation.z = angle;
      this.ringFrontendGroup.add(bracket);

      const packet = new THREE.Mesh(packetGeo, packetMat);
      this.ringFrontendGroup.add(packet);
      this.frontendPackets.push(packet);
    }

    // 3. Tier 2: Systems Ring (Rust Tokio Concurrency Gear Manifold)
    this.ringSystemsGroup = new THREE.Group();
    this.group.add(this.ringSystemsGroup);

    const ring2Geo = new THREE.TorusGeometry(1.78, 0.018, 16, 90);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.85,
      emissive: 0x92400e,
      emissiveIntensity: 0.18,
      transparent: true,
      opacity: 0.75,
    });
    this.ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    this.ringSystemsGroup.add(this.ring2Mesh);
    this.disposables.push(ring2Geo, ring2Mat);

    // 16 Mechanical turbine teeth (Streamlined)
    const toothGeo = new THREE.BoxGeometry(0.02, 0.09, 0.04);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.35,
    });
    this.disposables.push(toothGeo, toothMat);

    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(Math.cos(angle) * 1.78, Math.sin(angle) * 1.78, 0);
      tooth.rotation.z = angle + 0.3; // Angled turbine blade
      this.ringSystemsGroup.add(tooth);
      this.systemsGears.push(tooth);
    }

    // 4 3D Byte Registers (simulated memory safety allocation blocks)
    const byteGeo = new THREE.BoxGeometry(0.12, 0.07, 0.04);
    const byteMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const byteLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    this.disposables.push(byteGeo, byteMat, byteLedMat);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const byteBlock = new THREE.Mesh(byteGeo, byteMat);
      byteBlock.position.set(Math.cos(angle) * 1.78, Math.sin(angle) * 1.78, 0);
      byteBlock.rotation.z = angle;

      const led = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.05), byteLedMat);
      led.position.set(0.03, 0, 0);
      byteBlock.add(led);

      this.ringSystemsGroup.add(byteBlock);
      this.byteRegisters.push(byteBlock);
    }

    // 4. Tier 3: Cloud Ring (Kubernetes Container Mesh & Pod Nodes)
    this.ringCloudGroup = new THREE.Group();
    this.group.add(this.ringCloudGroup);

    const ring3Geo = new THREE.TorusGeometry(2.36, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.45,
      metalness: 0.7,
      transparent: true,
      opacity: 0.30,
      emissive: 0x0284c7,
      emissiveIntensity: 0.10,
    });
    this.ring3Mesh = new THREE.Mesh(ring3Geo, ring3Mat);
    this.ringCloudGroup.add(this.ring3Mesh);
    this.disposables.push(ring3Geo, ring3Mat);

    // 3 Container Pod Satellites (Raft cluster members)
    const podGeo = new THREE.BoxGeometry(0.13, 0.13, 0.13);
    const podEdgeGeo = new THREE.WireframeGeometry(podGeo);
    const podMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.8,
    });
    const podEdgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
    this.disposables.push(podGeo, podEdgeGeo, podMat, podEdgeMat);

    for (let i = 0; i < 3; i++) {
      const pod = new THREE.Group();
      const body = new THREE.Mesh(podGeo, podMat);
      const wire = new THREE.LineSegments(podEdgeGeo, podEdgeMat);
      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      beacon.position.set(0, 0.09, 0);
      pod.add(body, wire, beacon);

      this.group.add(pod);
      this.podNodes.push(pod);
    }

    // 5. Exploded Stack Vertical Conduits & Raft Lasers
    this.conduitsGroup = new THREE.Group();
    this.group.add(this.conduitsGroup);

    const conduitLineMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.25,
    });
    this.disposables.push(conduitLineMat);

    // 4 Vertical laser beams for exploded view
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const x = Math.cos(angle) * 1.2;
      const z = Math.sin(angle) * 1.2;
      const pts = [new THREE.Vector3(x, 1.4, z), new THREE.Vector3(x, -1.4, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(lineGeo, conduitLineMat);
      line.visible = false;
      this.conduitsGroup.add(line);
      this.verticalConduitLines.push(line);
      this.disposables.push(lineGeo);
    }

    // Triangular Raft laser lines
    const raftPts = [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    const raftGeo = new THREE.BufferGeometry();
    raftGeo.setAttribute("position", new THREE.Float32BufferAttribute(raftPts, 3));
    const raftMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
    });
    this.raftLaserLines = new THREE.LineSegments(raftGeo, raftMat);
    this.raftLaserLines.visible = false;
    this.conduitsGroup.add(this.raftLaserLines);
    this.disposables.push(raftGeo, raftMat);

    // 6. Resonance Shockwave Ring
    const shockGeo = new THREE.RingGeometry(0.15, 0.28, 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.shockwaveMesh = new THREE.Mesh(shockGeo, shockMat);
    this.group.add(this.shockwaveMesh);
    this.disposables.push(shockGeo, shockMat);

    // 7. Ionization Swarm Particles (Surrounding data cloud)
    const swarmCount = 75;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmCount * 3);
    const swarmColors = new Float32Array(swarmCount * 3);
    const baseCol = new THREE.Color(0x10b981);
    const secCol = new THREE.Color(0x0ea5e9);

    for (let i = 0; i < swarmCount; i++) {
      const i3 = i * 3;
      const radius = 1.0 + Math.random() * 1.8;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      swarmPos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      swarmPos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      swarmPos[i3 + 2] = radius * Math.cos(phi);

      const c = Math.random() > 0.5 ? baseCol : secCol;
      swarmColors[i3] = c.r;
      swarmColors[i3 + 1] = c.g;
      swarmColors[i3 + 2] = c.b;
    }

    swarmGeo.setAttribute("position", new THREE.BufferAttribute(swarmPos, 3));
    swarmGeo.setAttribute("color", new THREE.BufferAttribute(swarmColors, 3));

    const swarmMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      map: softDotTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.swarmPoints = new THREE.Points(swarmGeo, swarmMat);
    this.group.add(this.swarmPoints);
    this.disposables.push(swarmGeo, swarmMat);
  }

  // Trigger visual resonance shockwave
  public triggerResonancePulse(type: "pulse" | "dispatch" | "stress" = "pulse"): void {
    this.shockwaveActive = true;
    this.shockwaveScale = 0.2;
    this.shockwaveOpacity = type === "dispatch" ? 1.0 : type === "stress" ? 0.9 : 0.75;
    this.shockwaveSpeed = type === "dispatch" ? 0.08 : 0.055;
    this.pulseIntensity = 1.0;

    if (type === "stress") {
      this.shockwaveMesh.material = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
    } else if (type === "dispatch") {
      this.shockwaveMesh.material = new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
      });
    }
  }

  // Find nearest stage and interpolate target parameters
  private computeStageParameters(progress: number, isDesktop: boolean) {
    const stages = ARCHITECTURE_STAGES;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Find bounding keyframes
    let k1 = stages[0];
    let k2 = stages[stages.length - 1];

    for (let i = 0; i < stages.length - 1; i++) {
      if (clampedProgress >= stages[i].progress && clampedProgress <= stages[i + 1].progress) {
        k1 = stages[i];
        k2 = stages[i + 1];
        break;
      }
    }

    if (clampedProgress <= stages[0].progress) {
      k1 = stages[0];
      k2 = stages[0];
    } else if (clampedProgress >= stages[stages.length - 1].progress) {
      k1 = stages[stages.length - 1];
      k2 = stages[stages.length - 1];
    }

    const span = k2.progress - k1.progress;
    const rawT = span > 0 ? (clampedProgress - k1.progress) / span : 0;
    // Smoothstep interpolation for silky physics
    const t = rawT * rawT * (3 - 2 * rawT);

    const pos1 = isDesktop ? k1.posDesktop : k1.posMobile;
    const pos2 = isDesktop ? k2.posDesktop : k2.posMobile;

    const targetPos = new THREE.Vector3(
      pos1[0] + (pos2[0] - pos1[0]) * t,
      pos1[1] + (pos2[1] - pos1[1]) * t,
      pos1[2] + (pos2[2] - pos1[2]) * t
    );

    // Parabolic depth sag: when transitioning across horizontal flanks, curve deep into background
    // to prevent any collision with central headings, filter bars, and reading content
    const deltaX = Math.abs(pos1[0] - pos2[0]);
    if (deltaX > 2.0) {
      const crossoverFactor = Math.sin(t * Math.PI); // 0 at endpoints, 1.0 at midpoint
      targetPos.z -= crossoverFactor * (isDesktop ? 2.6 : 1.8);
      targetPos.y -= crossoverFactor * 0.35;
    }

    const targetRot = new THREE.Vector3(
      k1.rotBase[0] + (k2.rotBase[0] - k1.rotBase[0]) * t,
      k1.rotBase[1] + (k2.rotBase[1] - k1.rotBase[1]) * t,
      k1.rotBase[2] + (k2.rotBase[2] - k1.rotBase[2]) * t
    );

    const tierSeparation = k1.tierSeparation + (k2.tierSeparation - k1.tierSeparation) * t;
    const raftSpread = k1.raftSpread + (k2.raftSpread - k1.raftSpread) * t;
    const armillary = k1.armillary + (k2.armillary - k1.armillary) * t;
    const turbineMode = k1.turbineMode + (k2.turbineMode - k1.turbineMode) * t;
    const emitterMode = k1.emitterMode + (k2.emitterMode - k1.emitterMode) * t;

    const col1 = new THREE.Color(k1.color);
    const col2 = new THREE.Color(k2.color);
    const interpColor = new THREE.Color().lerpColors(col1, col2, t);

    // Active keyframe determines metadata readout
    const activeStage = t > 0.5 ? k2 : k1;
    const activeStageIndex = stages.indexOf(activeStage);

    return {
      targetPos,
      targetRot,
      tierSeparation,
      raftSpread,
      armillary,
      turbineMode,
      emitterMode,
      interpColor,
      activeStage,
      activeStageIndex,
    };
  }

  // Frame update
  public update(
    scrollProgress: number,
    elapsedTime: number,
    isStress: boolean,
    mouseX: number,
    mouseY: number,
    isDesktop: boolean
  ): CoreTelemetryState {
    const params = this.computeStageParameters(scrollProgress, isDesktop);

    // 1. Position & Base Rotation Spring Lerp
    this.smoothPos.lerp(params.targetPos, 0.055);
    this.group.position.copy(this.smoothPos);

    // Responsive dynamic scale: keep lightweight footprint on all screens
    const targetScale = isDesktop ? 0.78 : 0.48;
    this.group.scale.set(targetScale, targetScale, targetScale);

    // Add mouse parallax
    this.group.position.x += mouseX * (isDesktop ? 0.35 : 0.15);
    this.group.position.y += mouseY * (isDesktop ? 0.25 : 0.1);

    this.smoothRot.lerp(params.targetRot, 0.05);

    // 2. Continuous State Lerps
    this.currentSeparation += (params.tierSeparation - this.currentSeparation) * 0.06;
    this.currentRaftSpread += (params.raftSpread - this.currentRaftSpread) * 0.06;
    this.currentArmillary += (params.armillary - this.currentArmillary) * 0.06;
    this.currentTurbine += (params.turbineMode - this.currentTurbine) * 0.06;
    this.currentEmitter += (params.emitterMode - this.currentEmitter) * 0.06;

    // Pulse decay
    this.pulseIntensity *= 0.94;

    // Color Lerp
    this.targetColor.copy(params.interpColor);
    if (isStress) {
      this.targetColor.setHex(0xf59e0b); // Amber during stress test
    }
    this.activeColor.lerp(this.targetColor, 0.06);

    // Apply color to lights and glowing elements
    this.coreLight.color.copy(this.activeColor);
    (this.auraSprite.material as THREE.SpriteMaterial).color.copy(this.activeColor);
    (this.innerOcta.material as THREE.MeshStandardMaterial).color.copy(this.activeColor);

    const stressSpeed = isStress ? 3.0 : 1.0;
    const baseSpeed = 0.8 * stressSpeed;

    // 3. Central Reactor Animation
    this.innerOcta.rotation.x = elapsedTime * 0.9 * baseSpeed;
    this.innerOcta.rotation.y = elapsedTime * 1.2 * baseSpeed;

    this.outerIcosa.rotation.x = -elapsedTime * 0.5 * baseSpeed;
    this.outerIcosa.rotation.z = elapsedTime * 0.4 * baseSpeed;

    // Breathing scale pulse
    const breath = 1.0 + Math.sin(elapsedTime * 2.5) * 0.06 + this.pulseIntensity * 0.25;
    this.innerOcta.scale.set(breath, breath, breath);

    // 4. Kinematics: Tier 1 (Frontend Ring / RSC)
    // When separated, moves up along Y axis
    this.ringFrontendGroup.position.y = this.currentSeparation * 1.35;
    if (this.currentArmillary > 0.05) {
      // Tilts into Equatorial coordinate plane
      this.ringFrontendGroup.rotation.x =
        this.smoothRot.x + (Math.PI / 2 - this.smoothRot.x) * this.currentArmillary;
      this.ringFrontendGroup.rotation.y = elapsedTime * 0.4 * baseSpeed;
    } else if (this.currentTurbine > 0.05) {
      // Flattens into turbine plane & spins at ultra-high speed
      this.ringFrontendGroup.rotation.x = Math.PI / 2;
      this.ringFrontendGroup.rotation.z = elapsedTime * 4.5 * stressSpeed;
    } else if (this.currentEmitter > 0.05) {
      // Aligns facing forward
      this.ringFrontendGroup.rotation.set(0, 0, elapsedTime * 0.5 * baseSpeed);
    } else {
      // Normal gyroscopic precession
      this.ringFrontendGroup.rotation.x = this.smoothRot.x + Math.sin(elapsedTime * 0.6) * 0.15;
      this.ringFrontendGroup.rotation.y = this.smoothRot.y + elapsedTime * 0.7 * baseSpeed;
      this.ringFrontendGroup.rotation.z = this.smoothRot.z;
    }

    // Frontend orbiting packet beads
    this.frontendPackets.forEach((p, idx) => {
      const angle = elapsedTime * 2.2 * baseSpeed + (idx * Math.PI) / 2;
      p.position.set(Math.cos(angle) * 1.22, Math.sin(angle) * 1.22, 0);
    });

    // 5. Kinematics: Tier 2 (Systems Ring / Rust Tokio Engine)
    this.ringSystemsGroup.position.y = 0; // Stays centered
    if (this.currentArmillary > 0.05) {
      // Tilts into Prime Meridian coordinate plane
      this.ringSystemsGroup.rotation.y =
        this.smoothRot.y + (Math.PI / 2 - this.smoothRot.y) * this.currentArmillary;
      this.ringSystemsGroup.rotation.x = elapsedTime * 0.35 * baseSpeed;
    } else if (this.currentTurbine > 0.05) {
      this.ringSystemsGroup.rotation.x = Math.PI / 2;
      this.ringSystemsGroup.rotation.z = -elapsedTime * 6.0 * stressSpeed; // Counter-rotating turbine!
    } else if (this.currentEmitter > 0.05) {
      this.ringSystemsGroup.rotation.set(0, 0, -elapsedTime * 0.6 * baseSpeed);
    } else {
      this.ringSystemsGroup.rotation.x = this.smoothRot.x - Math.cos(elapsedTime * 0.5) * 0.2;
      this.ringSystemsGroup.rotation.y = this.smoothRot.y - elapsedTime * 0.9 * baseSpeed;
      this.ringSystemsGroup.rotation.z = this.smoothRot.z;
    }

    // 6. Kinematics: Tier 3 (Cloud Ring / Kubernetes & Raft Pods)
    this.ringCloudGroup.position.y = -this.currentSeparation * 1.35;
    if (this.currentArmillary > 0.05) {
      // 45-degree oblique planetary orbit
      this.ringCloudGroup.rotation.x = Math.PI / 4;
      this.ringCloudGroup.rotation.y = -elapsedTime * 0.3 * baseSpeed;
    } else if (this.currentTurbine > 0.05) {
      this.ringCloudGroup.rotation.x = Math.PI / 2;
      this.ringCloudGroup.rotation.z = elapsedTime * 3.0 * stressSpeed;
    } else if (this.currentEmitter > 0.05) {
      this.ringCloudGroup.rotation.set(0, 0, elapsedTime * 0.3 * baseSpeed);
    } else {
      this.ringCloudGroup.rotation.x = this.smoothRot.x + Math.sin(elapsedTime * 0.4) * 0.25;
      this.ringCloudGroup.rotation.y = this.smoothRot.y + elapsedTime * 0.5 * baseSpeed;
      this.ringCloudGroup.rotation.z = this.smoothRot.z;
    }

    // Pod Nodes kinematics (Smoothly transition between Ring Orbit and Raft Triangle)
    const raftRadius = 1.6 * this.currentRaftSpread;
    const normalRadius = 2.36;

    const raftPosArray: number[] = [];

    this.podNodes.forEach((pod, idx) => {
      const angle = (idx * Math.PI * 2) / 3 + elapsedTime * 0.8 * baseSpeed;

      if (this.currentRaftSpread > 0.1) {
        // Raft consensus triangle orbiting central leader
        const rx = Math.cos(angle) * raftRadius;
        const ry = Math.sin(angle) * raftRadius;
        const rz = Math.sin(angle * 2) * 0.2;
        pod.position.set(rx, ry, rz);
        pod.rotation.x = elapsedTime * 1.2;
        pod.rotation.y = elapsedTime * 0.8;

        raftPosArray.push(rx, ry, rz);
      } else {
        // Tied to Cloud ring orbit
        const rx = Math.cos(angle) * normalRadius;
        const ry = Math.sin(angle) * normalRadius - this.currentSeparation * 1.35;
        const rz = 0;
        pod.position.set(rx, ry, rz);
        pod.rotation.set(0, 0, angle);
      }
    });

    // 7. Exploded Vertical Conduits
    const showVertical = this.currentSeparation > 0.25;
    this.verticalConduitLines.forEach((line) => {
      line.visible = showVertical;
      if (showVertical) {
        (line.material as THREE.LineBasicMaterial).opacity = Math.min(
          this.currentSeparation * 0.5,
          0.6
        );
      }
    });

    // 8. Raft Consensus Laser Links
    if (this.currentRaftSpread > 0.25 && raftPosArray.length >= 9) {
      this.raftLaserLines.visible = true;
      const positions = this.raftLaserLines.geometry.attributes.position.array as Float32Array;

      // Triangle edges: 0->1, 1->2, 2->0
      positions[0] = raftPosArray[0];
      positions[1] = raftPosArray[1];
      positions[2] = raftPosArray[2];
      positions[3] = raftPosArray[3];
      positions[4] = raftPosArray[4];
      positions[5] = raftPosArray[5];

      positions[6] = raftPosArray[3];
      positions[7] = raftPosArray[4];
      positions[8] = raftPosArray[5];
      positions[9] = raftPosArray[6];
      positions[10] = raftPosArray[7];
      positions[11] = raftPosArray[8];

      positions[12] = raftPosArray[6];
      positions[13] = raftPosArray[7];
      positions[14] = raftPosArray[8];
      positions[15] = raftPosArray[0];
      positions[16] = raftPosArray[1];
      positions[17] = raftPosArray[2];

      this.raftLaserLines.geometry.attributes.position.needsUpdate = true;
    } else {
      this.raftLaserLines.visible = false;
    }

    // 9. Resonance Shockwave Pulse Animation
    if (this.shockwaveActive) {
      this.shockwaveScale += this.shockwaveSpeed;
      this.shockwaveOpacity -= 0.022;

      this.shockwaveMesh.scale.set(this.shockwaveScale, this.shockwaveScale, 1);
      (this.shockwaveMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
        this.shockwaveOpacity,
        0
      );

      // Orient shockwave facing camera
      this.shockwaveMesh.rotation.set(0, 0, elapsedTime * 0.5);

      if (this.shockwaveOpacity <= 0) {
        this.shockwaveActive = false;
      }
    }

    // 10. Swarm particles slow drift
    this.swarmPoints.rotation.y = elapsedTime * 0.12 * baseSpeed;
    this.swarmPoints.rotation.z = Math.sin(elapsedTime * 0.08) * 0.1;

    return {
      stageIndex: params.activeStageIndex,
      stageName: params.activeStage.name,
      stageRole: params.activeStage.role,
      activeTech: params.activeStage.tech,
      targetPos: this.smoothPos,
      colorHex: params.activeStage.color,
      progress: scrollProgress,
    };
  }

  // Get interactable objects for raycaster
  public getInteractables(): THREE.Object3D[] {
    return [this.innerOcta, this.outerIcosa, this.ring1Mesh, this.ring2Mesh, this.ring3Mesh];
  }

  // Proper GPU memory cleanup
  public dispose(): void {
    this.disposables.forEach((item) => {
      try {
        item.dispose();
      } catch {
        // Ignore
      }
    });
  }
}
