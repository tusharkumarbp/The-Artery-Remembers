import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Global motion switch. Defaults off when the user prefers reduced motion.
 * When off: the `motion-off` class freezes CSS animation, every <video> on
 * the page is paused, and canvas loops (artery, clocks) hold a still frame.
 */

const MotionCtx = createContext<{ on: boolean; toggle: () => void }>({
  on: true,
  toggle: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState<boolean>(
    () => !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !on);
    // small delay so newly mounted videos are caught too
    const t = setTimeout(() => {
      document.querySelectorAll("video").forEach((v) => {
        if (on) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, 60);
    return () => clearTimeout(t);
  }, [on]);

  return <MotionCtx.Provider value={{ on, toggle: () => setOn((v) => !v) }}>{children}</MotionCtx.Provider>;
}

export function useMotion() {
  return useContext(MotionCtx);
}
