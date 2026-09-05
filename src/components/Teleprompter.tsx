import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { longChapters, type Chapter } from "@/data/longTalk";
import { useMotion } from "@/hooks/useMotion";

export const CHAPTER_VIDEO: Record<string, string> = {
  I: "/videos/chapter-1-family.mp4",
  II: "/videos/chapter-2-organism.mp4",
  III: "/videos/chapter-3-instrument.mp4",
  IV: "/videos/chapter-4-trust.mp4",
};

/** word-count-based dwell: the roll breathes with the text instead of a flat metronome */
function dwellFor(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.min(9000, Math.max(2800, 1400 + words * 320));
}

/**
 * Chapter view: the AI-generated teaser film on top, and beneath it the full
 * script as a timecoded roll — manual first, autoplay only on request.
 * Addressable at #/story/long/<chapter>.
 */
export default function Teleprompter({
  chapter,
  onClose,
}: {
  chapter: Chapter | null;
  onClose: () => void;
}) {
  const [lineIdx, setLineIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const motion = useMotion();

  const lines =
    chapter?.segments.flatMap((s) => [
      { t: s.t, text: s.title, head: true },
      ...s.paras.map((p) => ({ t: "", text: p, head: false })),
    ]) ?? [];

  useEffect(() => {
    setLineIdx(0);
    setPlaying(false);
    closeRef.current?.focus();
  }, [chapter]);

  useEffect(() => {
    if (!chapter || !playing) return;
    const current = lines[lineIdx];
    timer.current = setTimeout(() => {
      setLineIdx((i) => {
        if (i + 1 >= lines.length) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, dwellFor(current?.text ?? ""));
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [chapter, playing, lineIdx, lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setLineIdx((i) => Math.min(i + 1, lines.length - 1));
      if (e.key === "ArrowLeft") setLineIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lines.length]);

  if (!chapter) return null;
  const atEnd = lineIdx >= lines.length - 1;
  const others = longChapters.filter((c) => c.n !== chapter.n);

  return (
    <div className="fixed inset-0 z-50 bg-[#060f10]/97 backdrop-blur flex flex-col" role="dialog" aria-modal="true" aria-label={`Chapter ${chapter.n}: ${chapter.title}`}>
      <div className="flex items-center justify-between px-5 md:px-10 py-4 border-b border-[rgba(157,184,178,0.22)]">
        <div className="font-mono2 text-[11px] tracking-[0.18em] text-[#9db8b2]">
          VIDEO {chapter.n} · {chapter.span} · ONE SHOT ·{" "}
          <span className="text-[#e3a63b]">TEASER FILM + FULL SCRIPT ROLL</span>
        </div>
        <button ref={closeRef} onClick={onClose} className="vz-btn ghost !py-2 !px-4 text-sm flex items-center gap-2">
          <X size={15} /> Close
        </button>
      </div>

      <div className="reader-scroll flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-8">
          <div className="vz-tag mb-4">
            Chapter {chapter.n} — {chapter.title} · {chapter.why}
          </div>

          {/* the film */}
          <div className="rounded-2xl overflow-hidden border border-[rgba(157,184,178,0.25)] bg-[#0a2021]">
            <video
              key={chapter.n}
              src={CHAPTER_VIDEO[chapter.n]}
              className="w-full aspect-[16/9] object-cover"
              autoPlay={motion.on}
              loop
              muted
              playsInline
              controls
            />
          </div>
          <p className="font-mono2 text-[9.5px] tracking-[0.14em] text-[#4a5d59] mt-2">
            AI-GENERATED TEASER IN THE VIZZHY VISUAL LANGUAGE
          </p>

          {/* the script roll */}
          <div className="mt-8 vz-panel p-6 md:p-8">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#e3a63b]">
                SCRIPT ROLL · TIMECODED
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLineIdx((i) => Math.max(i - 1, 0))}
                  disabled={lineIdx === 0}
                  className="vz-btn ghost !px-2.5 !py-1.5 disabled:opacity-30"
                  aria-label="Previous line"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="vz-btn ghost !px-4 !py-1.5 flex items-center gap-2 text-[12px]"
                >
                  {playing ? <Pause size={13} /> : <Play size={13} />}
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  onClick={() => setLineIdx((i) => Math.min(i + 1, lines.length - 1))}
                  disabled={atEnd}
                  className="vz-btn ghost !px-2.5 !py-1.5 disabled:opacity-30"
                  aria-label="Next line"
                >
                  <ChevronRight size={14} />
                </button>
                <span className="font-mono2 text-[10px] tracking-widest text-[#6e8b85] ml-1">
                  {lineIdx + 1}/{lines.length} {atEnd && "· END"}
                </span>
              </div>
            </div>
            <div className="h-0.5 bg-[rgba(157,184,178,0.15)] mb-6">
              <div
                className="h-full bg-[#e3a63b] transition-all duration-700"
                style={{ width: `${lines.length > 1 ? (lineIdx / (lines.length - 1)) * 100 : 0}%` }}
              />
            </div>
            <div key={lineIdx} className="min-h-[140px] flex items-center">
              <p
                className={`${
                  lines[lineIdx]?.head
                    ? "font-mono2 text-[13px] tracking-[0.2em] text-[#e3a63b]"
                    : "font-display text-[clamp(1.15rem,2.4vw,1.6rem)] leading-[1.4] text-[#f3f6f1]"
                }`}
                style={{ animation: "fadeIn 0.6s ease" }}
              >
                {lines[lineIdx]?.head && lines[lineIdx]?.t
                  ? `[${lines[lineIdx].t}] ${lines[lineIdx].text}`
                  : lines[lineIdx]?.text}
              </p>
            </div>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1}}`}</style>
            <div className="mt-5 pt-4 border-t border-[rgba(157,184,178,0.15)] flex flex-wrap items-center justify-between gap-3">
              <a
                href="#/story/long"
                className="inline-flex items-center gap-2 font-mono2 text-[10px] tracking-[0.16em] text-[#7fd0c4] hover:text-[#e3a63b] transition-colors"
              >
                <BookOpen size={12} /> READ THE FULL CHAPTER TEXT
              </a>
              <div className="flex items-center gap-2 font-mono2 text-[9.5px] tracking-widest text-[#4a5d59]">
                {others.map((c) => (
                  <a key={c.n} href={`#/story/long/${c.n}`} className="hover:text-[#e3a63b] transition-colors">
                    {c.n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
