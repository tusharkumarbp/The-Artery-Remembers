import { useEffect, useRef } from "react";
import { useMotion } from "@/hooks/useMotion";

/** Three clocks — exposure moves in months, plaque integrates decades, the event stays silent until it isn't. */
export default function ThreeClocks() {
  const refs = [useRef<SVGLineElement>(null), useRef<SVGLineElement>(null), useRef<SVGLineElement>(null)];
  const motion = useMotion();

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const speeds = [0.9, 0.12, 0.015]; // exposure fast, plaque slow, event near-silent
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      refs.forEach((r, i) => {
        const el = r.current;
        if (!el) return;
        const ang = t * speeds[i] * 60 - 90;
        const rad = (ang * Math.PI) / 180;
        const len = 30;
        el.setAttribute("x2", String(40 + len * Math.cos(rad)));
        el.setAttribute("y2", String(40 + len * Math.sin(rad)));
      });
      if (motion.on) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion.on]);

  const clocks = [
    { label: "EXPOSURE", sub: "cholesterol · pressure · glucose — moves in months", color: "#7fd0c4" },
    { label: "PLAQUE", sub: "integrates a lifetime — moves for years, can keep moving", color: "#e3a63b" },
    { label: "EVENT", sub: "silent for years — until it isn't", color: "#d07070" },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {clocks.map((c, i) => (
        <div key={c.label} className="vz-panel p-5 flex flex-col items-center text-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="rgba(6,15,16,0.6)" stroke="rgba(157,184,178,0.25)" />
            {Array.from({ length: 12 }).map((_, k) => {
              const a = (k * 30 * Math.PI) / 180;
              return (
                <line
                  key={k}
                  x1={40 + 32 * Math.sin(a)}
                  y1={40 - 32 * Math.cos(a)}
                  x2={40 + 35 * Math.sin(a)}
                  y2={40 - 35 * Math.cos(a)}
                  stroke="rgba(157,184,178,0.3)"
                />
              );
            })}
            <line ref={refs[i]} x1="40" y1="40" x2="40" y2="12" stroke={c.color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="3" fill={c.color} />
          </svg>
          <div className="font-mono2 text-[11px] tracking-[0.2em] mt-3" style={{ color: c.color }}>
            {c.label}
          </div>
          <p className="text-[#9db8b2] text-[12.5px] mt-1.5 leading-snug">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
