import { useEffect, useRef } from "react";
import { useMotion } from "@/hooks/useMotion";

/**
 * Living artery — two futures, honestly drawn:
 *  1. a obstructive lesion mid-vessel that narrows the lumen and traps cargo;
 *  2. a soft, non-obstructive plaque downstream that barely narrows the road
 *     but periodically disrupts — a clot burst without prior severe stenosis.
 * Atherosclerosis is not merely plumbing, and the canvas should say so.
 */
export default function ArteryCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const motion = useMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface P {
      x: number;
      y: number; // -1..1 across the lumen
      v: number;
      r: number;
      hue: number; // 0 = amber cargo, 1 = mint cell
      trapped: number;
    }
    interface Clot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      r: number;
    }
    let parts: P[] = [];
    let clots: Clot[] = [];
    let t = 0;
    let nextRupture = 240; // frames until first disruption
    let rupturing = 0; // frames remaining in an active disruption

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(60, Math.floor(w / 12));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: (Math.random() * 2 - 1) * 0.8,
        v: 0.4 + Math.random() * 1.1,
        r: 1 + Math.random() * 2.2,
        hue: Math.random() < 0.72 ? 0 : 1,
        trapped: 0,
      }));
    };

    // future one: stenotic plaque at 62% — up to 42% narrowing
    // future two: soft plaque at 86% — only ~9% narrowing, dangerous anyway
    const lumen = (x: number) => {
      const d1 = (x - w * 0.62) / (w * 0.09);
      const d2 = (x - w * 0.86) / (w * 0.045);
      return 1 - Math.exp(-d1 * d1) * 0.42 - Math.exp(-d2 * d2) * 0.09;
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.5;
      const R = h * 0.34;

      // vessel band
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = cy - R * lumen(x);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      for (let x = w; x >= 0; x -= 8) ctx.lineTo(x, cy + R * lumen(x));
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, cy - R, 0, cy + R);
      grad.addColorStop(0, "rgba(47,110,103,0.05)");
      grad.addColorStop(0.5, "rgba(224,138,95,0.07)");
      grad.addColorStop(1, "rgba(47,110,103,0.05)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(157,184,178,0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // future one: plaque highlight on upper wall (the narrowing)
      ctx.beginPath();
      for (let x = w * 0.5; x <= w * 0.74; x += 6) {
        const y = cy - R * lumen(x);
        x === w * 0.5 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(227,166,59,0.5)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // future two: the quiet plaque — a soft rose smear on the lower wall,
      // visually easy to underestimate, like the real thing
      ctx.beginPath();
      for (let x = w * 0.8; x <= w * 0.92; x += 6) {
        const y = cy + R * lumen(x);
        x === w * 0.8 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = rupturing > 0 ? "rgba(208,112,112,0.85)" : "rgba(208,112,112,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // disruption scheduling
      if (motion.on) {
        if (rupturing > 0) {
          rupturing--;
          // clot burst: rose particles shed downstream
          if (Math.random() < 0.5) {
            clots.push({
              x: w * 0.86 + (Math.random() - 0.5) * 8,
              y: cy + R * lumen(w * 0.86) * 0.7,
              vx: 0.8 + Math.random() * 1.8,
              vy: -(0.3 + Math.random() * 0.9),
              life: 1,
              r: 1.2 + Math.random() * 2,
            });
          }
        } else if (--nextRupture <= 0) {
          rupturing = 70;
          nextRupture = 380 + Math.random() * 300;
        }
      }

      // rupture halo
      if (rupturing > 0) {
        const pulse = 1 - rupturing / 70;
        ctx.beginPath();
        ctx.arc(w * 0.86, cy + R * lumen(w * 0.86) * 0.8, 8 + pulse * 26, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(208,112,112,${0.5 * (1 - pulse)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // clots
      clots = clots.filter((c) => c.life > 0 && c.x < w + 10);
      for (const c of clots) {
        c.x += c.vx;
        c.y += c.vy;
        c.vy *= 0.985;
        c.vx *= 0.995;
        c.life -= 0.008;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(208,112,112,${0.75 * Math.max(0, c.life)})`;
        ctx.fill();
      }

      // flow particles
      for (const p of parts) {
        const half = R * lumen(p.x);
        const narrow = 1 - lumen(p.x);
        // trap only at the stenotic lesion — the soft plaque kills without trapping
        if (p.x > w * 0.5 && p.x < w * 0.74 && narrow > 0.25 && Math.random() < 0.002 && p.trapped === 0 && p.hue === 0) {
          p.trapped = 1;
        }
        if (p.trapped > 0) {
          p.v *= 0.995;
          p.y += (Math.sin(p.x * 0.05) * 0.002 - p.y) * 0.002;
          if (Math.random() < 0.001) p.trapped = 0;
        }
        const speed = p.v * (p.trapped ? 0.15 : 1 + narrow * 1.6);
        p.x += speed;
        if (p.x > w + 10) {
          p.x = -10;
          p.y = (Math.random() * 2 - 1) * 0.8;
          p.trapped = 0;
          p.v = 0.4 + Math.random() * 1.1;
        }
        const py = cy + p.y * half * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 0 ? `rgba(227,166,59,${p.trapped ? 0.9 : 0.55})` : "rgba(127,208,196,0.5)";
        ctx.fill();
      }

      if (motion.on) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(); // with motion off this renders exactly one still frame
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [motion.on]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
