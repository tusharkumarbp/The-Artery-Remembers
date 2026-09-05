import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  ledgerClaims,
  ledgerUnknowns,
  ledgerPredictions,
  ledgerMindChangers,
  ledgerEntry,
} from "@/data/treatise";
import { seal, shortHash } from "@/lib/sha256";
import { BUILD } from "@/buildInfo";
import { DOC_ROUTES } from "@/lib/routing";

const stats = [
  { n: "4 → 1", s: "four generations of men gone before forty — the founder is the first past it" },
  { n: "130 → 75", s: "his own metabolic syndrome, in sustained remission from 37 to 50" },
  { n: "5y · 0 · 5.3%", s: "his mother — years in medication-free remission, medications, HbA1c — still writing the ending" },
  { n: "150", s: "people with coronary disease who had a BioTwin before you could" },
];

export default function LedgerSection() {
  const contentHash = seal({
    entry: ledgerEntry.entryId,
    claims: ledgerClaims,
    unknowns: ledgerUnknowns,
    predictions: ledgerPredictions,
    mindChangers: ledgerMindChangers,
  });

  return (
    <section id="ledger" className="bg-[rgba(14,43,42,0.45)] border-y border-[rgba(157,184,178,0.16)] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="vz-tag mb-3">On the record · append-only · content-hashed</div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#f3f6f1] leading-tight max-w-3xl">
          We asked medicine for a report that says what it doesn't know.
          <em className="text-[#e3a63b]"> So we published one about ourselves.</em>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {stats.map((st) => (
            <div key={st.n} className="vz-panel p-5">
              <div className="font-display text-3xl text-[#e3a63b]">{st.n}</div>
              <p className="text-[#9db8b2] text-[12.5px] mt-2 leading-snug">{st.s}</p>
            </div>
          ))}
        </div>

        <div className="vz-panel mt-8 p-6 md:p-8">
          <div className="vz-tag !text-[#7fd0c4] mb-4">The Launch Ledger — Entry 001 · September 14, 2026</div>

          {/* the seal — technically inspectable, not promised */}
          <div className="rounded-xl border border-[rgba(127,208,196,0.3)] bg-[rgba(6,15,16,0.55)] px-4 py-3 mb-5 font-mono2 text-[10.5px] leading-relaxed">
            <div className="flex items-center gap-2 text-[#7fd0c4] tracking-[0.18em] text-[10px] mb-2">
              <ShieldCheck size={13} /> ENTRY SEAL — RECOMPUTABLE BY ANYONE
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-[#9db8b2]">
              <span>ENTRY_ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.entryId}</b></span>
              <span>PUBLISHED_AT&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.publishedAt}</b></span>
              <span>PREVIOUS_HASH&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.previousHash}</b></span>
              <span>CONTENT_HASH&nbsp;&nbsp;<b className="text-[#e3a63b]">SHA256:{shortHash(contentHash)}</b></span>
              <span>SIGNER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.signer}</b></span>
              <span>SOURCE_COMMIT&nbsp;<b className="text-[#f3f6f1]">{BUILD.commit}</b></span>
            </div>
          </div>

          <p className="text-[#c9d8d3] leading-relaxed max-w-3xl">
            Six claims, each with its witness and its ceiling. Five things we do not know, dated. Four
            predictions sealed before the first hundred arrived. And the append rule: nothing above the line
            is ever edited — corrections are added below, dated, hashed, and chained to this entry, with the
            original left standing.{" "}
            <em className="text-[#f3f6f1]">A doctor scars. A body scars. Vizzhy scars.</em>
          </p>
          <a href={DOC_ROUTES["ledger-001"]} className="vz-btn mt-6 inline-flex items-center gap-2">
            Read Entry 001 in full <ArrowRight size={15} />
          </a>
          <p className="font-mono2 text-[9.5px] tracking-[0.14em] text-[#4a5d59] mt-4">
            ENTRY 002 — WHAT ACTUALLY HAPPENED — PUBLISHES ON OR BEFORE NOVEMBER 14, 2026 · IT WILL CARRY
            THIS ENTRY'S HASH AS PREVIOUS_HASH
          </p>
        </div>
      </div>
    </section>
  );
}
