import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Compass, Activity, Sparkles } from 'lucide-react';

type AttractorType = 'lorenz' | 'chen' | 'rossler' | 'chua' | 'sprott';

interface AttractorConfig {
  name: string;
  label: string;
  dt: number;
  steps: number;
  initial: [number, number, number];
  scale: number;
  center: [number, number, number];
  equations: (x: number, y: number, z: number) => [number, number, number];
  description: string;
  formula: string;
  lyapunov: string;
}

const ATTRACTOR_CONFIGS: Record<AttractorType, AttractorConfig> = {
  lorenz: {
    name: 'Lorenz',
    label: 'Lorenz System (1963)',
    dt: 0.008,
    steps: 5000,
    initial: [0.1, 0, 0],
    scale: 3.8,
    center: [0, 0, 27],
    equations: (x, y, z) => {
      const sigma = 10;
      const rho = 28;
      const beta = 8 / 3;
      return [
        sigma * (y - x),
        x * (rho - z) - y,
        x * y - beta * z,
      ];
    },
    description: 'dx/dt = 10(y - x), dy/dt = x(28 - z) - y, dz/dt = xy - 8/3z',
    formula: 'σ=10, ρ=28, β=8/3',
    lyapunov: 'λ₁ = +0.9056 (Chaotic Flow)',
  },
  chen: {
    name: 'Chen',
    label: 'Chen Attractor (1999)',
    dt: 0.005,
    steps: 5500,
    initial: [-0.1, 0.5, -0.6],
    scale: 3.5,
    center: [0, 0, 28],
    equations: (x, y, z) => {
      const a = 35;
      const b = 3;
      const c = 28;
      return [
        a * (y - x),
        (c - a) * x - x * z + c * y,
        x * y - b * z,
      ];
    },
    description: 'dx/dt = 35(y - x), dy/dt = -7x - xz + 28y, dz/dt = xy - 3z',
    formula: 'a=35, b=3, c=28',
    lyapunov: 'λ₁ = +2.027 (Dual Scroll Hyperchaotic)',
  },
  rossler: {
    name: 'Rössler',
    label: 'Rössler Attractor (1976)',
    dt: 0.02,
    steps: 5000,
    initial: [0.1, 0, 0],
    scale: 7.0,
    center: [0, 0, 5],
    equations: (x, y, z) => {
      const a = 0.2;
      const b = 0.2;
      const c = 5.7;
      return [
        -y - z,
        x + a * y,
        b + z * (x - c),
      ];
    },
    description: 'dx/dt = -y - z, dy/dt = x + 0.2y, dz/dt = 0.2 + z(x - 5.7)',
    formula: 'a=0.2, b=0.2, c=5.7',
    lyapunov: 'λ₁ = +0.0714 (Spiral Chaos)',
  },
  chua: {
    name: 'Chua',
    label: 'Chua Double Scroll Circuit',
    dt: 0.015,
    steps: 5000,
    initial: [0.7, 0, 0],
    scale: 35.0,
    center: [0, 0, 0],
    equations: (x, y, z) => {
      const alpha = 9.0;
      const beta = 14.286;
      const m0 = -1 / 7;
      const m1 = 2 / 7;
      const h = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));
      return [
        alpha * (y - x - h),
        x - y + z,
        -beta * y,
      ];
    },
    description: 'Piecewise-linear non-linear resistor double-scroll attractor',
    formula: 'α=9.0, β=14.286, m₀=-1/7, m₁=2/7',
    lyapunov: 'λ₁ = +0.3421 (Memristive Circuit)',
  },
  sprott: {
    name: 'Sprott',
    label: 'Sprott Minimal Flow (Case B)',
    dt: 0.02,
    steps: 5000,
    initial: [0.1, 0.1, 0.1],
    scale: 35.0,
    center: [0, 0, 0],
    equations: (x, y, z) => {
      return [
        y * z,
        x - y,
        1 - x * y,
      ];
    },
    description: 'dx/dt = yz, dy/dt = x - y, dz/dt = 1 - xy (Minimal chaotic flow)',
    formula: 'Polynomial 2nd degree nonlinearity',
    lyapunov: 'λ₁ = +0.1342 (Quadratic Flow)',
  },
};

// Fourth-order Runge-Kutta numerical solver
function integrateTrajectory(config: AttractorConfig): Float32Array {
  const { dt, steps, initial, scale, center, equations } = config;
  const positions = new Float32Array(steps * 3);

  let [x, y, z] = initial;

  for (let i = 0; i < steps; i++) {
    positions[i * 3] = (x - center[0]) * scale;
    positions[i * 3 + 1] = (y - center[1]) * scale;
    positions[i * 3 + 2] = (z - center[2]) * scale;

    // k1
    const [dx1, dy1, dz1] = equations(x, y, z);
    // k2
    const [dx2, dy2, dz2] = equations(
      x + 0.5 * dt * dx1,
      y + 0.5 * dt * dy1,
      z + 0.5 * dt * dz1
    );
    // k3
    const [dx3, dy3, dz3] = equations(
      x + 0.5 * dt * dx2,
      y + 0.5 * dt * dy2,
      z + 0.5 * dt * dz2
    );
    // k4
    const [dx4, dy4, dz4] = equations(
      x + dt * dx3,
      y + dt * dy3,
      z + dt * dz3
    );

    x += (dt / 6) * (dx1 + 2 * dx2 + 2 * dx3 + dx4);
    y += (dt / 6) * (dy1 + 2 * dy2 + 2 * dy3 + dy4);
    z += (dt / 6) * (dz1 + 2 * dz2 + 2 * dz3 + dz4);
  }

  return positions;
}

export const Attractor3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<AttractorType>('lorenz');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const lineMeshRef = useRef<THREE.Line | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });

  const activeConfig = ATTRACTOR_CONFIGS[activeType];

  // Update geometry when active system changes
  const updateGeometry = useCallback((type: AttractorType) => {
    if (!lineMeshRef.current) return;
    const config = ATTRACTOR_CONFIGS[type];
    const positions = integrateTrajectory(config);

    const geometry = lineMeshRef.current.geometry;
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    // Reset rotation slightly for nice view
    if (groupRef.current) {
      groupRef.current.rotation.set(0.4, 0.6, 0);
    }
  }, []);

  const resetView = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0.4, 0.6, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 260);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    camera.position.set(0, 0, 260);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Line material with Sage Green from palette (#75A06A)
    const material = new THREE.LineBasicMaterial({
      color: 0x75A06A,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.94,
    });

    const geometry = new THREE.BufferGeometry();
    const line = new THREE.Line(geometry, material);
    group.add(line);
    lineMeshRef.current = line;

    // Initialize with current config
    updateGeometry(activeType);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (groupRef.current && !isDraggingRef.current && isAutoRotating) {
        groupRef.current.rotation.y += 0.0035;
        groupRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse handlers for dragging/orbiting
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(
        120,
        Math.min(420, cameraRef.current.position.z + e.deltaY * 0.15)
      );
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Handle container resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [updateGeometry, activeType, isAutoRotating]);

  // Handle system switch
  const handleSelectSystem = (type: AttractorType) => {
    setActiveType(type);
    updateGeometry(type);
  };

  return (
    <div className="attractor-figure-wrap w-full rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0E1015]/90 backdrop-blur-md shadow-xl flex flex-col justify-between font-sans m-0">
      {/* Top Deck: System Selector + Dynamic Controls */}
      <div className="attractor-controls-bar p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-black/30 flex items-center justify-between flex-wrap gap-2">
        <div className="attractor-system-tabs flex items-center gap-1.5 flex-wrap">
          {(Object.keys(ATTRACTOR_CONFIGS) as AttractorType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelectSystem(type)}
              className={`text-xs font-mono px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeType === type
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                  : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
              }`}
            >
              {ATTRACTOR_CONFIGS[type].name}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-mono text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 cursor-pointer transition-colors"
            title={isAutoRotating ? 'Pause Rotation' : 'Resume Auto-Rotation'}
          >
            {isAutoRotating ? <Pause size={11} /> : <Play size={11} />}
            <span>{isAutoRotating ? 'Pause' : 'Rotate'}</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-mono text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 cursor-pointer transition-colors"
            title="Reset Phase Space Angle"
          >
            <RotateCcw size={11} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Trajectory Canvas Container */}
      <div
        ref={containerRef}
        className="attractor-canvas-wrapper w-full h-[250px] sm:h-[270px] lg:h-[290px] cursor-grab relative"
        title="Click and drag with mouse to orbit 3D phase space • Scroll wheel to zoom"
      />

      {/* Compact Dynamics Metadata Readout Box */}
      <div className="attractor-caption-box p-2.5 sm:p-3 border-t border-slate-200/70 dark:border-white/10 bg-slate-50/60 dark:bg-black/20 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              FIGURE 1: {activeConfig.label}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-semibold">
              {activeConfig.lyapunov}
            </span>
          </div>

          <div className="text-slate-400 text-[10px] hidden sm:inline">
            RK4 &bull; N = 5,000 steps
          </div>
        </div>

        <div className="mt-1.5 text-slate-500 dark:text-slate-400 text-[11px] truncate">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">&bull; State Equations: </span>
          <code className="text-slate-700 dark:text-slate-300">{activeConfig.description}</code>
        </div>
      </div>
    </div>
  );
};
