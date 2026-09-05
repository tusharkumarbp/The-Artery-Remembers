import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-5 py-14">
      {/* conversion — one per audience */}
      <div className="grid md:grid-cols-2 gap-4 mb-14">
        <a href="#console" className="lib-card vz-panel p-6 block">
          <div className="vz-tag !text-[#e3a63b] mb-2">For individuals</div>
          <div className="font-display text-xl text-[#f3f6f1] leading-snug">
            Start with the question you already carry.
          </div>
          <span className="inline-flex items-center gap-2 mt-3 font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">
            TRY THE REASONING TRACE <ArrowRight size={12} />
          </span>
        </a>
        <a href="#/thesis" className="lib-card vz-panel p-6 block">
          <div className="vz-tag !text-[#a99bd1] mb-2">For physicians</div>
          <div className="font-display text-xl text-[#f3f6f1] leading-snug">
            Bring one case that does not fit.
          </div>
          <span className="inline-flex items-center gap-2 mt-3 font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">
            EXAMINE THE INSTRUMENT <ArrowRight size={12} />
          </span>
        </a>
      </div>

      {/* the final lockup */}
      <div className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] text-[#f3f6f1] max-w-3xl leading-[1.15]">
        The artery remembers.
        <br />
        <em className="text-[#e3a63b]">Good medicine should too.</em>
      </div>
      <p className="mt-4 text-[#9db8b2] text-lg">Vizzhy — the instrument for one human, through time.</p>

      <div className="mt-10 pt-6 border-t border-[rgba(157,184,178,0.22)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="font-display text-lg text-[#f3f6f1]">
          Vizzhy<span className="text-[#e3a63b]">.</span>{" "}
          <span className="text-[#6e8b85] text-sm font-sans">from one mother, to all mothers</span>
        </div>
        <p className="font-mono2 text-[9.5px] tracking-[0.12em] text-[#4a5d59] max-w-xl leading-relaxed">
          VIZZHY IS NOT FOR EMERGENCIES — IF YOU THINK YOU'RE HAVING ONE, CALL 911. TEACHING CASES ARE
          SYNTHETIC. NOT MEDICAL ADVICE. NOT A VALIDATED DIAGNOSTIC, PROGNOSTIC, ORGAN-AGE, PLAQUE-ACTIVITY
          OR TREATMENT-SELECTION SYSTEM. LICENSED PHYSICIANS GOVERN EVERY CLINICAL STEP. QUESTIONS TYPED
          INTO THE PUBLIC DEMO ARE PROCESSED LOCALLY IN YOUR BROWSER — NOTHING IS TRANSMITTED OR STORED.
        </p>
      </div>
    </footer>
  );
}
