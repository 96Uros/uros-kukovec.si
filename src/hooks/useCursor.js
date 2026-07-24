import { useEffect, useRef } from "react";

const MAX_TRAIL_LENGTH = 80;
const TRAIL_LIFETIME = 1000;
const LINE_WIDTH = 4;

function drawTrail(ctx, trail, now) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = LINE_WIDTH;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 1; i < trail.length; i += 1) {
    const prev = trail[i - 1];
    const curr = trail[i];
    const age = now - curr.time;

    if (age > TRAIL_LIFETIME) {
      continue;
    }

    const alpha = 1 - age / TRAIL_LIFETIME;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();
  }
}

export default function useCursor(canvasRef) {
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (event) => {
      const trail = trailRef.current;
      trail.push({ x: event.clientX, y: event.clientY, time: Date.now() });

      if (trail.length > MAX_TRAIL_LENGTH) {
        trail.shift();
      }
    };

    const tick = () => {
      const now = Date.now();
      const trail = trailRef.current;

      for (let i = trail.length - 1; i >= 0; i -= 1) {
        if (now - trail[i].time > TRAIL_LIFETIME) {
          trail.splice(i, 1);
        }
      }

      drawTrail(ctx, trail, now);
      rafId = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      trailRef.current = [];
    };
  }, [canvasRef]);
}
