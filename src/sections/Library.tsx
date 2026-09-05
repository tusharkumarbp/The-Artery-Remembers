import { useState } from "react";
import { Film, Play, Eye, BookOpen, ArrowRight } from "lucide-react";
import { mainTalk } from "@/data/mainTalk";
import { longChapters } from "@/data/longTalk";
import { CHAPTER_VIDEO } from "@/components/Teleprompter";
import { DOC_ROUTES } from "@/lib/routing";
import { useMotion } from "@/hooks/useMotion";

type PreviewId = "artery-main" | "artery-long" | "stethoscope" | "ledger-001";

const doors: {
  q: string;
  a: string;
  color: string;
  title: string;
  duration: string;
  blurb: string;
  preview?: PreviewId;
  reads: { href: string; label: string }[];
}[] = [
  {
    q: "WHY",
    a: "Why does Vizzhy exist?",
    color: "#e3a63b",
    title: "The Artery Remembers",
    duration: "two durations of one door · 10 min / ≈45 min",
    blurb:
      "The founder story: four generations, one mother, the photograph and the movie, and the one challenge to medicine. The main talk is the surface; the four chapters are the same building with the rooms open.",
    preview: "artery-main",
    reads: [
      { href: DOC_ROUTES["artery-main"], label: "Read the main version" },
      { href: DOC_ROUTES["artery-long"], label: "Read the long version" },
    ],
  },
  {
    q: "WHAT",
    a: "What kind of thing is Vizzhy?",
    color: "#a99bd1",
    title: "The Stethoscope of the Mind",
    duration: "the physician version · 19 sections",
    blurb:
      "Not an oracle, not a bicycle — a new class of clinical instrument. Perception, time, mutual incompleteness, and instrument-grade intelligence, formalized.",
    preview: "stethoscope",
    reads: [{ href: DOC_ROUTES["stethoscope"], label: "Read the treatise" }],
  },
  {
    q: "HOW",
    a: "How does it reason without pretending?",
    color: "#7fd0c4",
    title: "CodexOS Reasoning Trace",
    duration: "synthetic governed traces · live below",
    blurb:
      "Claim typing, contradiction preservation, decision gates, refusals and witness selection — over labeled synthetic teaching twins, with every actor named. The console is further down this page.",
    reads: [{ href: "#console", label: "Run the trace" }],
  },
  {
    q: "WHY TRUST",
    a: "Why should anyone believe the company?",
    color: "#e08a5f",
    title: "The Launch Ledger",
    duration: "Entry 001 · append-only · content-hashed",
    blurb:
      "Vizzhy's report on Vizzhy, written the way our reports are written: claims with witnesses and ceilings, dated unknowns, sealed predictions, and a hash anyone can recompute.",
    preview: "ledger-001",
    reads: [{ href: DOC_ROUTES["ledger-001"], label: "Read Entry 001" }],
  },
];

export default function Library() {
  const [selected, setSelected] = useState<PreviewId | null>(null);
  const motion = useMotion();

  return (
    <section id="library" className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <div className="vz-tag mb-3">The tellings · why, what, how, why trust</div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#f3f6f1] leading-tight max-w-3xl">
        One argument, four resolutions.
      </h2>
      <p className="mt-4 max-w-2xl text-[#9db8b2] leading-relaxed">
        Not four stories — a single case made at four depths.{" "}
        <strong className="text-[#f3f6f1]">Preview</strong> opens a panel here;{" "}
        <strong className="text-[#f3f6f1]">Read</strong> opens the full text at its own address, word for
        word, with its time marks and its ceilings.
      </p>

      {/* the four doors */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {doors.map((d) => (
          <div key={d.q} className="lib-card vz-panel p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="vz-tag" style={{ color: d.color }}>
                {d.q} · {d.a}
              </span>
            </div>
            <h3 className="font-display text-[1.4rem] text-[#f3f6f1] leading-snug">{d.title}</h3>
            <div className="font-mono2 text-[10px] text-[#6e8b85] mt-1">{d.duration}</div>
            <p className="text-[#9db8b2] text-sm mt-2 leading-relaxed flex-1">{d.blurb}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {d.preview && (
                <button
                  onClick={() => setSelected(selected === d.preview ? null : d.preview!)}
                  aria-expanded={selected === d.preview}
                  className={`vz-btn ghost !py-1.5 !px-3.5 text-[12px] flex items-center gap-1.5 ${
                    selected === d.preview ? "!border-[#e3a63b] !text-[#e3a63b]" : ""
                  }`}
                >
                  <Eye size={13} /> Preview
                </button>
              )}
              {d.reads.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="vz-btn ghost !py-1.5 !px-3.5 text-[12px] flex items-center gap-1.5 !border-[rgba(127,208,196,0.4)] !text-[#7fd0c4] hover:!border-[#7fd0c4]"
                >
                  <BookOpen size={13} /> {r.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* inline preview */}
      {selected && (
        <div className="vz-panel mt-4 p-6 md:p-8" role="region" aria-label="Document preview">
          {selected === "artery-main" && (
            <>
              <div className="vz-tag !text-[#e3a63b] mb-4">Preview · the main version · opening</div>
              {mainTalk.slice(0, 2).map((s, i) => (
                <div key={i} className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono2 text-[11px] text-[#e3a63b]">{s.t}</span>
                    <span className="font-display text-lg text-[#f3f6f1]">{s.title}</span>
                  </div>
                  <p className="text-[#c9d8d3] leading-relaxed md:pl-14">{s.paras[0]}</p>
                </div>
              ))}
              <a href={DOC_ROUTES["artery-main"]} className="inline-flex items-center gap-2 text-[#7fd0c4] text-sm hover:text-[#e3a63b] transition-colors">
                …six more time marks — read the full ten minutes <ArrowRight size={14} />
              </a>
            </>
          )}
          {selected === "artery-long" && (
            <>
              <div className="vz-tag !text-[#e3a63b] mb-4">Preview · the long version · four chapters</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {longChapters.map((c) => (
                  <div key={c.n} className="border border-[rgba(157,184,178,0.18)] rounded-xl p-4">
                    <div className="font-mono2 text-[10px] tracking-widest text-[#e3a63b]">
                      CHAPTER {c.n} · {c.span}
                    </div>
                    <div className="font-display text-lg text-[#f3f6f1] mt-1">{c.title}</div>
                    <p className="text-[#9db8b2] text-[13px] mt-1 italic">{c.why}</p>
                  </div>
                ))}
              </div>
              <a href={DOC_ROUTES["artery-long"]} className="inline-flex items-center gap-2 mt-4 text-[#7fd0c4] text-sm hover:text-[#e3a63b] transition-colors">
                Each chapter stands alone, each is one shot — read the complete script <ArrowRight size={14} />
              </a>
            </>
          )}
          {selected === "stethoscope" && (
            <>
              <div className="vz-tag !text-[#a99bd1] mb-4">Preview · the instrument thesis</div>
              <div className="space-y-3 font-mono2 text-[13px] text-[#a99bd1]">
                <p className="border border-[rgba(169,155,209,0.35)] rounded-lg px-4 py-2.5 bg-[rgba(169,155,209,0.05)]">
                  D + I &gt; D — the physician and the instrument are not on the same axis
                </p>
                <p className="border border-[rgba(169,155,209,0.35)] rounded-lg px-4 py-2.5 bg-[rgba(169,155,209,0.05)]">
                  not observed ≠ absent
                </p>
                <p className="border border-[rgba(169,155,209,0.35)] rounded-lg px-4 py-2.5 bg-[rgba(169,155,209,0.05)]">
                  GENERATE → CONTRADICT → PRESERVE → COHERE → WITNESS → EARN
                </p>
                <p className="border border-[rgba(169,155,209,0.35)] rounded-lg px-4 py-2.5 bg-[rgba(169,155,209,0.05)]">
                  Do not make AI less imaginative. Make it unable to smuggle imagination into truth.
                </p>
              </div>
              <a href={DOC_ROUTES["stethoscope"]} className="inline-flex items-center gap-2 mt-4 text-[#7fd0c4] text-sm hover:text-[#e3a63b] transition-colors">
                …nineteen sections — read the treatise <ArrowRight size={14} />
              </a>
            </>
          )}
          {selected === "ledger-001" && (
            <>
              <div className="vz-tag !text-[#e08a5f] mb-4">Preview · the company's report on itself</div>
              <p className="text-[#c9d8d3] leading-relaxed">
                Six claims, each with its witness and its ceiling. Five dated unknowns. Four sealed
                predictions for the first hundred —{" "}
                <em className="text-[#f3f6f1]">
                  if Entry 002 reports zero defeats, treat that as the most suspicious result on the page.
                </em>
              </p>
              <a href={DOC_ROUTES["ledger-001"]} className="inline-flex items-center gap-2 mt-4 text-[#7fd0c4] text-sm hover:text-[#e3a63b] transition-colors">
                Append-only and content-hashed — read Entry 001 in full <ArrowRight size={14} />
              </a>
            </>
          )}
        </div>
      )}

      {/* the four chapter films — the watch actions of the WHY door */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <Film size={16} className="text-[#e3a63b]" />
          <span className="vz-tag !text-[#e3a63b]">WHY, as film · one shot per chapter</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {longChapters.map((c) => (
            <a
              key={c.n}
              href={`#/story/long/${c.n}`}
              aria-label={`Watch chapter ${c.n}: ${c.title}`}
              className="poster-sheen lib-card relative rounded-2xl border border-[rgba(157,184,178,0.22)] overflow-hidden p-5 text-left cursor-pointer aspect-[4/5] flex flex-col justify-between"
            >
              <video
                src={CHAPTER_VIDEO[c.n]}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                autoPlay={motion.on}
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a2021]/60 via-[#0a2021]/20 to-[#0a2021]/85" />
              <div className="relative">
                <div className="font-mono2 text-[10px] tracking-[0.2em] text-[#9db8b2]">VIDEO {c.n}</div>
                <div className="font-display text-2xl text-[#f3f6f1] mt-2">{c.title}</div>
                <p className="text-[#c9d8d3] text-[12.5px] mt-1.5 italic">{c.why}</p>
              </div>
              <div className="relative flex items-center justify-between">
                <span className="font-mono2 text-[10px] text-[#9db8b2]">{c.span}</span>
                <span className="w-10 h-10 rounded-full bg-[#e3a63b] flex items-center justify-center">
                  <Play size={15} className="text-[#0a2021] ml-0.5" fill="currentColor" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="font-mono2 text-[9.5px] tracking-[0.14em] text-[#4a5d59] mt-3">
          AI-GENERATED TEASER FILMS PLAY LIVE IN EACH POSTER · EACH CHAPTER HAS ITS OWN ADDRESS — SHARE IT,
          BOOKMARK IT, RETURN TO IT
        </p>
      </div>
    </section>
  );
}
