import { useEffect, useRef } from "react";

type NexusParticlesProps = {
  className?: string;
  density?: number;
};

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
};

/**
 * Lightweight dependency-free nexus network used only by the security gate.
 * It avoids adding another runtime dependency to the long-term-stable desktop build.
 */
export default function NexusParticles({ className = "", density = 52 }: NexusParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.48, active: false };
    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let nodes: NodePoint[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(26, Math.min(density, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.7 + Math.random() * 1.35,
        phase: index * 0.57 + Math.random() * 4,
      }));
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(1, window.innerWidth);
      pointer.y = event.clientY / Math.max(1, window.innerHeight);
      pointer.active = true;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.47;
      const nexusRadius = Math.min(width, height) * 0.26;

      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, nexusRadius * 1.3);
      glow.addColorStop(0, "rgba(103,232,249,0.13)");
      glow.addColorStop(0.45, "rgba(34,211,238,0.06)");
      glow.addColorStop(1, "rgba(2,12,27,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -12 || node.x > width + 12) node.vx *= -1;
          if (node.y < -12 || node.y > height + 12) node.vy *= -1;
        }
      }

      const maxDistance = Math.min(145, Math.max(95, Math.min(width, height) * 0.22));
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const pulse = 0.65 + Math.sin(time * 0.0011 + a.phase) * 0.22;

        if (pointer.active) {
          const px = pointer.x * width;
          const py = pointer.y * height;
          const dx = px - a.x;
          const dy = py - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 2) {
            a.vx += (dx / dist) * 0.0025;
            a.vy += (dy / dist) * 0.0025;
          }
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > maxDistance) continue;

          const alpha = Math.max(0, 0.19 * (1 - distance / maxDistance));
          context.strokeStyle = `rgba(103,232,249,${alpha})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }

        context.beginPath();
        context.fillStyle = `rgba(165,243,252,${Math.max(0.22, pulse * 0.72)})`;
        context.shadowColor = "rgba(103,232,249,0.65)";
        context.shadowBlur = 8;
        context.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }

      // Subtle central nexus node.
      const corePulse = 1 + Math.sin(time * 0.0015) * 0.08;
      const core = context.createRadialGradient(cx, cy, 0, cx, cy, 22 * corePulse);
      core.addColorStop(0, "rgba(207,250,254,0.34)");
      core.addColorStop(0.35, "rgba(103,232,249,0.14)");
      core.addColorStop(1, "rgba(103,232,249,0)");
      context.fillStyle = core;
      context.beginPath();
      context.arc(cx, cy, 24 * corePulse, 0, Math.PI * 2);
      context.fill();

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-90 ${className}`}
    />
  );
}
