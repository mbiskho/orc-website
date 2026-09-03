'use client';

import { useEffect, useRef, useState } from 'react';
import { offices } from '@/lib/content/locations';
import { palette } from '@/lib/palette';

const DEG = Math.PI / 180;

/**
 * Longitude offset that keeps every office on the visible hemisphere.
 * Used as the resting position when motion is reduced.
 */
const STATIC_ROTATION = -55;

/** Degrees per second. Slow enough to read as drift rather than spin. */
const ROTATION_SPEED = 6;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Unit vector for a lat/lng on an unrotated sphere. */
function baseVec(lat: number, lng: number): Vec3 {
  const phi = lat * DEG;
  const lambda = lng * DEG;
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
}

/** Spin about the polar axis by `deg`. */
function rotateY(v: Vec3, deg: number): Vec3 {
  const t = deg * DEG;
  const cos = Math.cos(t);
  const sin = Math.sin(t);
  return { x: v.x * cos + v.z * sin, y: v.y, z: -v.x * sin + v.z * cos };
}

/**
 * Great-circle interpolation between two unit vectors, lifted off the surface
 * so the connecting arcs bow outward instead of hugging the sphere.
 */
function arcPoint(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const sin = Math.sin(omega);

  let x: number;
  let y: number;
  let z: number;

  if (sin < 1e-6) {
    x = a.x; y = a.y; z = a.z;
  } else {
    const wa = Math.sin((1 - t) * omega) / sin;
    const wb = Math.sin(t * omega) / sin;
    x = a.x * wa + b.x * wb;
    y = a.y * wa + b.y * wb;
    z = a.z * wa + b.z * wb;
  }

  const lift = 1 + 0.16 * Math.sin(Math.PI * t);
  return { x: x * lift, y: y * lift, z: z * lift };
}

export default function LocationGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Mirrored into a ref so the animation loop reads it without re-subscribing.
  const activeRef = useRef<string | null>(null);
  activeRef.current = activeId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rotation = STATIC_ROTATION;
    let size = 0;
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (v: Vec3, cx: number, cy: number, r: number) => ({
      sx: cx + v.x * r,
      sy: cy - v.y * r,
      front: v.z > 0,
    });

    const draw = (now: number): void => {
      const delta = (now - last) / 1000;
      last = now;
      if (!reduced) rotation -= ROTATION_SPEED * delta;

      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.38;
      ctx.clearRect(0, 0, size, size);

      // --- Sphere body, lit from the upper left ---
      const sphere = ctx.createRadialGradient(
        cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r,
      );
      sphere.addColorStop(0, palette['open-water']);
      sphere.addColorStop(1, palette.abyss);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      // --- Graticule ---
      ctx.strokeStyle = palette.current;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;

      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let drawing = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const v = rotateY(baseVec(lat, lng), rotation);
          const p = project(v, cx, cy, r);
          if (p.front) {
            if (drawing) ctx.lineTo(p.sx, p.sy);
            else { ctx.moveTo(p.sx, p.sy); drawing = true; }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      }

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let drawing = false;
        for (let lng = -180; lng <= 180; lng += 3) {
          const v = rotateY(baseVec(lat, lng), rotation);
          const p = project(v, cx, cy, r);
          if (p.front) {
            if (drawing) ctx.lineTo(p.sx, p.sy);
            else { ctx.moveTo(p.sx, p.sy); drawing = true; }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      }

      // --- Rim ---
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = palette.current;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // --- Arcs between offices ---
      ctx.lineWidth = 1.5;
      for (let i = 0; i < offices.length; i++) {
        for (let j = i + 1; j < offices.length; j++) {
          const a = offices[i];
          const b = offices[j];
          if (!a || !b) continue;

          const va = baseVec(a.lat, a.lng);
          const vb = baseVec(b.lat, b.lng);
          const lit = activeRef.current === a.id || activeRef.current === b.id;
          ctx.strokeStyle = lit ? palette.glow : palette['deep-surf'];
          ctx.globalAlpha = lit ? 0.9 : 0.5;

          ctx.beginPath();
          let drawing = false;
          for (let t = 0; t <= 1.0001; t += 0.02) {
            const v = rotateY(arcPoint(va, vb, t), rotation);
            const p = project(v, cx, cy, r);
            if (p.front) {
              if (drawing) ctx.lineTo(p.sx, p.sy);
              else { ctx.moveTo(p.sx, p.sy); drawing = true; }
            } else {
              drawing = false;
            }
          }
          ctx.stroke();
        }
      }

      // --- Office markers ---
      for (const office of offices) {
        const v = rotateY(baseVec(office.lat, office.lng), rotation);
        const p = project(v, cx, cy, r);
        const active = activeRef.current === office.id;

        if (!p.front) {
          // Hint that an office is round the back, without competing.
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = palette.glow;
          ctx.fill();
          continue;
        }

        // Halo
        ctx.globalAlpha = active ? 0.32 : 0.16;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, active ? 15 : 10, 0, Math.PI * 2);
        ctx.fillStyle = palette.glow;
        ctx.fill();

        // Dot
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, active ? 5 : 3.75, 0, Math.PI * 2);
        ctx.fillStyle = palette.glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, active ? 5 : 3.75, 0, Math.PI * 2);
        ctx.strokeStyle = palette.abyss;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    // Only burn frames while the globe is actually on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !visible) {
            visible = true;
            last = performance.now();
            frame = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && visible) {
            visible = false;
            cancelAnimationFrame(frame);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="flex items-center justify-center lg:col-span-5">
        <div ref={wrapRef} className="w-full max-w-sm lg:max-w-none">
          {/*
            Decorative: every office it plots is listed as real text alongside,
            so nothing here is the only route to the information.
          */}
          <canvas ref={canvasRef} aria-hidden="true" className="block w-full" />
        </div>
      </div>

      <ul className="lg:col-span-7">
        {offices.map((office) => (
          <li
            key={office.id}
            onMouseEnter={() => setActiveId(office.id)}
            onMouseLeave={() => setActiveId(null)}
            className={`border-t py-7 transition-colors last:border-b ${
              activeId === office.id ? 'border-glow' : 'border-current'
            }`}
          >
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                  activeId === office.id ? 'bg-glow' : 'bg-deep-surf'
                }`}
              />
              <h3 className="text-xl font-bold tracking-tight text-paper">
                {office.city}
              </h3>
              <span className="text-xs uppercase tracking-[0.16em] text-navy-body">
                {office.country}
              </span>
            </div>
            <address className="mt-3 pl-5 text-[15px] not-italic leading-relaxed text-navy-body">
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </li>
        ))}
      </ul>
    </div>
  );
}
