import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useMotion } from "@/hooks/useMotion";

/**
 * One live synthetic contradiction — ten seconds, before the full console.
 * Treatment target ACHIEVED. Structural trajectory CHANGED. Both true.
 */
export default function ContradictionTeaser() {
  const [step, setStep] = useState(0); // 0 idle, 1 first line, 2 second line, 3 verdict
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const motion = useMotion();

  const play = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!motion.on) {
      setStep(3);
      return;
    }
    setStep(0);
    timers.current.push(setTimeout(() => setStep(1), 500));
    timers.current.push(setTimeout(() => setStep(2), 2100));
    timers.current.push(setTimeout(() => setStep(3), 3900));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion.on]);

  const line =
    "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 font-mono2 text-[12px] tracking-[0.14em] transition-all duration-700";

  return (
    <div ref={ref} className="vz-panel p-5 md:p-6 mb-8" aria-label="A synthetic contradiction, preserved">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#6e8b85]">
          FIRST, TEN SECONDS — ONE SYNTHETIC CONTRADICTION
        </span>
        <button
          onClick={play}
          className="text-[#6e8b85] hover:text-[#e3a63b] transition-colors"
          title="Replay"
          aria-label="Replay the contradiction"
        >
          <RotateCcw size={14} />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div
          className={`${line} ${
            step >= 1
              ? "opacity-100 border-[rgba(127,208,196,0.45)] text-[#7fd0c4]"
              : "opacity-0 translate-y-2 border-transparent"
          }`}
        >
          <span>TREATMENT TARGET</span>
          <span className="px-2 py-0.5 rounded-full border border-[rgba(127,208,196,0.45)] text-[10px]">ACHIEVED</span>
        </div>
        <div
          className={`${line} ${
            step >= 2
              ? "opacity-100 border-[rgba(227,166,59,0.5)] text-[#e3a63b]"
              : "opacity-0 translate-y-2 border-transparent"
          }`}
        >
          <span>STRUCTURAL TRAJECTORY</span>
          <span className="px-2 py-0.5 rounded-full border border-[rgba(227,166,59,0.5)] text-[10px]">CHANGED</span>
        </div>
      </div>
      <div
        className={`mt-3 rounded-lg border px-4 py-3 text-center font-mono2 text-[12px] tracking-[0.18em] transition-all duration-700 ${
          step >= 3
            ? "opacity-100 border-[rgba(224,138,95,0.55)] bg-[rgba(224,138,95,0.07)] text-[#e08a5f]"
            : "opacity-0 translate-y-2 border-transparent"
        }`}
      >
        SYSTEM RESPONSE:&nbsp;&nbsp;BOTH TRUE · CONTRADICTION PRESERVED
      </div>
      <p className={`mt-3 text-[13px] text-[#9db8b2] italic transition-opacity duration-700 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
        Most systems would have averaged those into a comfortable middle. The full trace below shows what an
        instrument does instead.
      </p>
    </div>
  );
}
