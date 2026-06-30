import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  life: number;
};

const COLORS = [
  "#FE5A4E",
  "#FF756B",
  "#FF9A8E",
  "#FFD0CC",
  "#ffffff",
  "#FE5A4E",
  "#FF756B",
];

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    let mouseX = -200;
    let mouseY = -200;
    let rafId = 0;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn a burst of sparkles on each move event
      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 8,
          y: mouseY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,  // slight upward drift
          alpha: 1,
          size: Math.random() * 4 + 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: Math.random() * 0.04 + 0.025, // how fast it fades
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Rotate/drift
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;   // gravity
        p.vx *= 0.97;   // drag
        p.alpha -= p.life;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw a star/sparkle shape
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        // Alternate between circles and 4-point stars
        if (i % 2 === 0) {
          // 4-point star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.alpha * 3);
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.3, -s * 0.3);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.3, s * 0.3);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, s * 0.3);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.3, -s * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
