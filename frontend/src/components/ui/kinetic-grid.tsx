"use client";

import { useEffect, useRef, useCallback, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL_SIZE = 55; // Grid cell dimension
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;

const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(
  base: { r: number; g: number; b: number; a: number },
  active: { r: number; g: number; b: number; a: number },
  t: number,
): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function KineticGrid({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // Dynamically observe dark mode from document.documentElement
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // ── Warp ────────────────────────────────────────────────────────────────────

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
    ): { pt: Point; proximity: number } => {
      // Edge pin — smoothly locks boundary rows/cols in place
      const edgeMargin = 1.5;
      const colPin = Math.min(
        col / edgeMargin,
        (cols - 1 - col) / edgeMargin,
        1,
      );
      const rowPin = Math.min(
        row / edgeMargin,
        (rows - 1 - row) / edgeMargin,
        1,
      );
      const pinFactor = Math.max(0, colPin * rowPin);

      let dx = 0;
      let dy = 0;
      let proximity = 0;

      // Cursor warp
      const mx = gx - mouse.x;
      const my = gy - mouse.y;
      const mDist = Math.sqrt(mx * mx + my * my);

      if (mDist < INFLUENCE_RADIUS && mDist > 0) {
        const falloff = 1 - mDist / INFLUENCE_RADIUS;
        const smooth = falloff * falloff * (3 - 2 * falloff);
        const pull = smooth * MAX_WARP * pinFactor;
        dx -= (mx / mDist) * pull;
        dy -= (my / mDist) * pull;
        proximity = smooth * pinFactor;
      }

      // Ripple warp
      for (const r of ripples) {
        const rx = gx - r.x;
        const ry = gy - r.y;
        const rDist = Math.sqrt(rx * rx + ry * ry);
        const distFromFront = Math.abs(rDist - r.radius);
        const bandWidth = 80;

        if (distFromFront < bandWidth && rDist > 0) {
          const wavePhase = (distFromFront / bandWidth) * Math.PI;
          const waveAmp =
            Math.cos(wavePhase) *
            14 *
            r.opacity *
            pinFactor *
            Math.max(0, 1 - r.radius / 700);
          dx += (rx / rDist) * waveAmp;
          dy += (ry / rDist) * waveAmp;
          proximity = Math.max(proximity, Math.abs(waveAmp / 14));
        }
      }

      return {
        pt: { x: gx + dx, y: gy + dy },
        proximity,
      };
    },
    [],
  );

  // ── Draw ────────────────────────────────────────────────────────────────────

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      // Theme-dependent palette
      const lineBase = isDark
        ? { r: 255, g: 255, b: 255, a: 0.10 }
        : { r: 15, g: 23, b: 42, a: 0.07 };

      const lineActive = isDark
        ? { r: 59, g: 130, b: 246, a: 0.85 }
        : { r: 37, g: 99, b: 235, a: 0.75 };

      const nodeBase = isDark
        ? { r: 255, g: 255, b: 255, a: 0.20 }
        : { r: 15, g: 23, b: 42, a: 0.16 };

      const nodeActive = isDark
        ? { r: 96, g: 165, b: 250, a: 0.95 }
        : { r: 37, g: 99, b: 235, a: 0.85 };

      const glowColor = isDark ? "59,130,246" : "37,99,235";

      ctx.clearRect(0, 0, w, h);

      // Lerp mouse
      mouseRef.current.x = lerpN(
        mouseRef.current.x,
        targetMouseRef.current.x,
        LERP_SPEED,
      );
      mouseRef.current.y = lerpN(
        mouseRef.current.y,
        targetMouseRef.current.y,
        LERP_SPEED,
      );

      // Update ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        const age = now - r.born;
        r.radius = (age / 1000) * 420;
        r.opacity = Math.max(0, 1 - age / 1200);
        return r.opacity > 0;
      });

      const ripples = ripplesRef.current;
      const mouse = mouseRef.current;

      const cols = Math.ceil(w / CELL_SIZE) + 1;
      const rows = Math.ceil(h / CELL_SIZE) + 1;
      const offsetX = (w - (cols - 1) * CELL_SIZE) / 2;
      const offsetY = (h - (rows - 1) * CELL_SIZE) / 2;

      // Compute warped grid points
      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const gx = offsetX + col * CELL_SIZE;
          const gy = offsetY + row * CELL_SIZE;
          const { pt, proximity } = getWarpedPoint(
            gx,
            gy,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      // ── Grid lines ────────────────────────────────────────────────────────
      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg); // smoothstep
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(lineBase, lineActive, t);
        ctx.lineWidth = lerpN(0.75, 1.4, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSeg(
            pts[row][col],
            pts[row][col + 1],
            prox[row][col],
            prox[row][col + 1],
          );
        }
      }

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSeg(
            pts[row][col],
            pts[row + 1][col],
            prox[row][col],
            prox[row + 1][col],
          );
        }
      }

      // ── Intersection nodes ────────────────────────────────────────────────
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr); // smoothstep
          const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

          // Outer glow ring for active nodes
          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(
              p.x,
              p.y,
              r * 0.5,
              p.x,
              p.y,
              glowR,
            );
            grd.addColorStop(0, `rgba(${glowColor},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${glowColor},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          // Node fill
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(nodeBase, nodeActive, t);
          ctx.fill();
        }
      }

      // ── Ripple rings ──────────────────────────────────────────────────────
      for (const r of ripples) {
        const safeRadius = Math.max(0, r.radius);
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${glowColor},${(r.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // ── Dot matrix overlay ────────────────────────────────────────────────
      const dotBase = isDark
        ? { r: 255, g: 255, b: 255, a: 0.04 }
        : { r: 15, g: 23, b: 42, a: 0.03 };

      const dotActive = isDark
        ? { r: 59, g: 130, b: 246, a: 0.45 }
        : { r: 37, g: 99, b: 235, a: 0.40 };

      const dotCols = Math.ceil(w / DOT_SPACING) + 1;
      const dotRows = Math.ceil(h / DOT_SPACING) + 1;
      const dotOffX = (w - (dotCols - 1) * DOT_SPACING) / 2;
      const dotOffY = (h - (dotRows - 1) * DOT_SPACING) / 2;

      for (let r = 0; r < dotRows; r++) {
        for (let c = 0; c < dotCols; c++) {
          const dx = dotOffX + c * DOT_SPACING;
          const dy = dotOffY + r * DOT_SPACING;

          const toMouse = Math.sqrt(
            (dx - mouse.x) * (dx - mouse.x) + (dy - mouse.y) * (dy - mouse.y),
          );
          const t = Math.max(
            0,
            1 - toMouse / (INFLUENCE_RADIUS * 0.7),
          );

          ctx.beginPath();
          ctx.arc(dx, dy, lerpN(0.7, 1.2, t), 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(dotBase, dotActive, t);
          ctx.fill();
        }
      }
    },
    [getWarpedPoint, isDark],
  );

  // ── Animation Loop ──────────────────────────────────────────────────────────

  const animate = useCallback(
    (time: number) => {
      const now = performance.now();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (
        canvas.width !== Math.floor(w * dpr) ||
        canvas.height !== Math.floor(h * dpr)
      ) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        const ctx = canvas.getContext("2d");
        ctx?.scale(dpr, dpr);
        sizeRef.current = { w, h };
      }

      draw(now);
      rafRef.current = requestAnimationFrame(animate);
    },
    [draw],
  );

  // ── Setup ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      if (mouseRef.current.x === -9999) {
        mouseRef.current = { x: -9999, y: -9999 };
        targetMouseRef.current = { x: -9999, y: -9999 };
      }
    };

    setSize();

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    window.addEventListener("resize", setSize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        "relative w-full min-h-screen transition-colors duration-300",
        isDark ? "bg-[#090A0F] text-slate-100" : "bg-[#F8FAFC] text-slate-900",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full min-h-screen">{children}</div>
    </div>
  );
}
