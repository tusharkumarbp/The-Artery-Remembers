import { useState } from "react";
import ArteryCanvas from "@/components/ArteryCanvas";
import { Stethoscope, HeartPulse, ArrowRight, Menu, X, Activity } from "lucide-react";
import { useMotion } from "@/hooks/useMotion";

const NAV = [
  { href: "#library", label: "WHY · THE TELLINGS" },
  { href: "#/thesis", label: "WHAT · THE INSTRUMENT" },
  { href: "#console", label: "HOW · REASONING TRACE" },
  { href: "#ledger", label: "WHY TRUST · LEDGER" },
];

export default function Hero({ onOpenDoc }: { onOpenDoc: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const motion = useMotion();

  return (
    <header className="relative overflow-hidden">
      {/* ambient artery film behind the hero */}
      <video
        src="/videos/hero-artery.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22] pointer-events-none"
        autoPlay={motion.on}
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2021]/70 via-transparent to-[#0a2021] pointer-events-none" />

      {/* topbar */}
      <div className="relative max-w-6xl mx-auto px-5 flex items-center justify-between py-5 border-b border-[rgba(157,184,178,0.22)]">
        <a href="#" className="font-display text-xl text-[#f3f6f1]" aria-label="Vizzhy — back to top">
          Vizzhy<span className="text-[#e3a63b]">.</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 font-mono2 text-[10.5px] tracking-[0.18em] text-[#9db8b2]">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-[#e3a63b] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <button
            onClick={motion.toggle}
            aria-pressed={!motion.on}
            title={motion.on ? "Pause all motion and video" : "Resume motion and video"}
            className="font-mono2 text-[10px] tracking-widest text-[#9db8b2] border border-[rgba(157,184,178,0.3)] rounded-full px-3 py-1 flex items-center gap-2 hover:border-[#e3a63b] hover:text-[#e3a63b] transition-colors"
          >
            <Activity size={11} />
            {motion.on ? "MOTION ON" : "STILL"}
          </button>
          <span className="hidden sm:flex font-mono2 text-[10px] tracking-widest text-[#7fd0c4] border border-[rgba(127,208,196,0.35)] rounded-full px-3 py-1 items-center gap-2">
            <span className="live-dot" /> LAUNCH DEMO
          </span>
          <button
            className="lg:hidden text-[#9db8b2] hover:text-[#e3a63b] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {menuOpen && (
        <nav className="relative lg:hidden max-w-6xl mx-auto px-5 py-4 flex flex-col gap-3 border-b border-[rgba(157,184,178,0.22)] bg-[rgba(10,32,33,0.95)] font-mono2 text-[11px] tracking-[0.18em] text-[#9db8b2] z-20">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e3a63b] transition-colors py-1"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}

      {/* hero */}
      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-10 md:pt-24 md:pb-16 z-10">
        <div className="vz-tag mb-5 reveal on">Vizzhy launch · September 14, 2026 · Austin, Texas</div>
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.04] max-w-16ch text-[#f3f6f1]">
          The artery remembers.
          <br />
          <em className="text-[#e3a63b] font-light text-[clamp(1.4rem,3.6vw,2.6rem)]">
            A blood test sees today. The artery carries the years.
          </em>
        </h1>
        <p className="mt-5 max-w-2xl text-[#9db8b2] text-[15px] leading-relaxed">
          Not as judgment. As biology: inherited particles, blood pressure, glucose, inflammation, smoke,
          sleep, environment, treatment and time.
        </p>

        {/* the one product sentence */}
        <p className="mt-6 max-w-3xl text-[#c9d8d3] text-lg leading-relaxed border-l-2 border-[#e3a63b] pl-5">
          Vizzhy builds an evolving BioTwin from your story, existing records, sensors, imaging and — only
          when a decision-relevant question earns it — deeper biology. It helps you and your physician see
          what is known, what remains uncertain, what does not line up and what is worth learning next.
        </p>

        <p className="mt-6 max-w-2xl text-[#9db8b2] text-[15px] leading-relaxed">
          <em className="text-[#f3f6f1]">
            “Not every mother has a son like you. Can we build this for all mothers?”
          </em>{" "}
          — the question, asked by the founder's sister, that turned one family's fight into Vizzhy.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#console" className="vz-btn">Start with your question</a>
          <a href="#/thesis" className="vz-btn ghost">For physicians: examine the instrument</a>
          <a
            href="#ledger"
            className="font-mono2 text-[11px] tracking-[0.14em] text-[#6e8b85] hover:text-[#7fd0c4] transition-colors underline underline-offset-4 decoration-[rgba(157,184,178,0.35)]"
          >
            Audit our claims
          </a>
        </div>

        {/* living artery — two futures */}
        <div className="mt-10 vz-panel overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-3">
            <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#6e8b85]">
              LIVE SUBSTRATE · THE ROAD, THE CARGO, THE WALL
            </span>
            <span className="font-mono2 text-[10px] tracking-widest text-[#e3a63b] hidden sm:block">
              plaque is local · forces are distributed
            </span>
          </div>
          <ArteryCanvas className="w-full h-[190px] md:h-[230px] block" />
          <div className="flex flex-wrap gap-x-6 gap-y-1 px-5 pb-3 font-mono2 text-[9.5px] tracking-widest text-[#4a5d59]">
            <span><i className="inline-block w-2 h-2 rounded-full bg-[#e3a63b] mr-1.5" />ApoB cargo — necessary, until retained in the wall</span>
            <span><i className="inline-block w-2 h-2 rounded-full bg-[#7fd0c4] mr-1.5" />cells — every second, for your whole life</span>
            <span><i className="inline-block w-2 h-2 rounded-full bg-[#d07070] mr-1.5" />two futures — gradual narrowing, or quiet plaque that disrupts without warning</span>
          </div>
        </div>

        {/* the two doors */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <button
            onClick={() => onOpenDoc("artery-main")}
            className="lib-card vz-panel p-6 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <HeartPulse size={16} className="text-[#e3a63b]" />
              <span className="vz-tag !text-[#e3a63b]">Why Vizzhy exists</span>
            </div>
            <h3 className="font-display text-2xl text-[#f3f6f1]">The Artery Remembers</h3>
            <p className="text-[#9db8b2] text-sm mt-2 leading-relaxed">
              The launch telling — main ten-minute version and the four-chapter long version. Why do you have
              blood, the photograph and the movie, one mother, all mothers.
            </p>
            <span className="inline-flex items-center gap-2 mt-4 font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">
              READ THE TALK <ArrowRight size={12} />
            </span>
          </button>
          <button
            onClick={() => onOpenDoc("stethoscope")}
            className="lib-card vz-panel p-6 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Stethoscope size={16} className="text-[#a99bd1]" />
              <span className="vz-tag !text-[#a99bd1]">What Vizzhy is</span>
            </div>
            <h3 className="font-display text-2xl text-[#f3f6f1]">The Stethoscope of the Mind</h3>
            <p className="text-[#9db8b2] text-sm mt-2 leading-relaxed">
              The instrument thesis — not an oracle, not a bicycle. Instrument-grade intelligence, CPWE, the
              witness operator, and the next clinical sense: trajectory.
            </p>
            <span className="inline-flex items-center gap-2 mt-4 font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">
              READ THE TREATISE <ArrowRight size={12} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
