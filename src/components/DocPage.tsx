import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft, Film, Link2, ShieldCheck } from "lucide-react";
import { mainTalk, mainTalkMeta } from "@/data/mainTalk";
import { longChapters, longTalkMeta } from "@/data/longTalk";
import {
  treatiseMeta,
  treatiseAbstract,
  treatiseSections,
  ledgerMeta,
  ledgerClaims,
  ledgerUnknowns,
  ledgerPredictions,
  ledgerMindChangers,
  ledgerEntry,
  ledgerScarFormat,
} from "@/data/treatise";
import { seal } from "@/lib/sha256";
import { BUILD } from "@/buildInfo";
import { DOC_ROUTES } from "@/lib/routing";

function Segments({ items }: { items: { t: string; title: string; paras: string[] }[] }) {
  return (
    <div className="space-y-10">
      {items.map((s, i) => (
        <div key={i}>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-mono2 text-[11px] tracking-[0.15em] text-[#e3a63b]">{s.t}</span>
            <h4 className="font-display text-xl text-[#f3f6f1]">{s.title}</h4>
          </div>
          <div className="space-y-4 pl-0 md:pl-16">
            {s.paras.map((p, j) => (
              <p key={j} className="text-[#c9d8d3] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const META: Record<string, typeof mainTalkMeta> = {
  "artery-main": mainTalkMeta,
  "artery-long": longTalkMeta,
  stethoscope: treatiseMeta,
  "ledger-001": ledgerMeta,
};

/**
 * Full-page document view — every long object lives at its own address
 * (#/story, #/story/long, #/thesis, #/ledger). Shareable, bookmarkable,
 * keyboard-reachable. Not a modal.
 */
export default function DocPage({ docId }: { docId: string }) {
  const backRef = useRef<HTMLAnchorElement>(null);
  const meta = META[docId];

  useEffect(() => {
    backRef.current?.focus();
  }, [docId]);

  const contentHash = useMemo(
    () =>
      docId === "ledger-001"
        ? seal({
            entry: ledgerEntry.entryId,
            claims: ledgerClaims,
            unknowns: ledgerUnknowns,
            predictions: ledgerPredictions,
            mindChangers: ledgerMindChangers,
          })
        : null,
    [docId]
  );

  if (!meta) return null;

  return (
    <div className="min-h-screen bg-[#0a2021]">
      {/* page bar */}
      <div className="sticky top-0 z-40 bg-[rgba(10,32,33,0.92)] backdrop-blur border-b border-[rgba(157,184,178,0.22)]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <a
            ref={backRef}
            href="#"
            className="flex items-center gap-2 font-mono2 text-[11px] tracking-[0.16em] text-[#9db8b2] hover:text-[#e3a63b] transition-colors"
          >
            <ArrowLeft size={14} /> THE BUILDING
          </a>
          <div className="flex items-center gap-2 font-mono2 text-[10px] tracking-widest text-[#4a5d59]">
            <Link2 size={11} />
            {DOC_ROUTES[docId]}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="vz-tag mb-2">{meta.duration}</div>
        <h2 className="font-display text-3xl md:text-4xl text-[#f3f6f1] leading-tight">{meta.title}</h2>
        <p className="font-display italic text-lg text-[#9db8b2] mt-4 mb-12 border-l-2 border-[#e3a63b] pl-5">
          {meta.subtitle}
        </p>

        {docId === "artery-main" && <Segments items={mainTalk} />}

        {docId === "artery-long" && (
          <div className="space-y-16">
            {longChapters.map((ch) => (
              <div key={ch.n}>
                <div className="mb-8 pb-5 border-b border-[rgba(157,184,178,0.22)]">
                  <div className="vz-tag mb-2">
                    Chapter {ch.n} · {ch.span}
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl text-[#f3f6f1]">{ch.title}</h3>
                      <p className="text-[#9db8b2] mt-1 italic">{ch.why}</p>
                    </div>
                    <a
                      href={`#/story/long/${ch.n}`}
                      className="vz-btn ghost !py-1.5 !px-3.5 text-[12px] flex items-center gap-1.5"
                    >
                      <Film size={13} /> Watch chapter {ch.n}
                    </a>
                  </div>
                </div>
                <Segments items={ch.segments} />
              </div>
            ))}
          </div>
        )}

        {docId === "stethoscope" && (
          <div className="space-y-12">
            <div className="vz-panel p-6 space-y-4">
              <div className="vz-tag">Abstract</div>
              {treatiseAbstract.map((p, i) => (
                <p key={i} className="text-[#c9d8d3] leading-relaxed text-[15px]">
                  {p}
                </p>
              ))}
            </div>
            {treatiseSections.map((s) => (
              <div key={s.n}>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono2 text-[11px] tracking-[0.15em] text-[#a99bd1]">§{s.n}</span>
                  <h4 className="font-display text-xl text-[#f3f6f1]">{s.title}</h4>
                </div>
                {s.boxed && (
                  <div className="my-4 md:ml-16 px-5 py-3 border border-[rgba(169,155,209,0.4)] rounded-xl font-mono2 text-[13px] text-[#a99bd1] bg-[rgba(169,155,209,0.06)]">
                    {s.boxed}
                  </div>
                )}
                <div className="space-y-4 md:pl-16">
                  {s.paras.map((p, j) => (
                    <p key={j} className="text-[#c9d8d3] leading-relaxed text-[15px]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[#6e8b85] text-sm italic pt-6 border-t border-[rgba(157,184,178,0.22)]">
              Reading version, condensed for the site. The full treatise circulates as a PDF.
            </p>
          </div>
        )}

        {docId === "ledger-001" && (
          <div className="space-y-12">
            {/* the seal */}
            <div className="rounded-xl border border-[rgba(127,208,196,0.3)] bg-[rgba(6,15,16,0.55)] px-5 py-4 font-mono2 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2 text-[#7fd0c4] tracking-[0.18em] text-[10px] mb-2.5">
                <ShieldCheck size={13} /> ENTRY SEAL — RECOMPUTE IT YOURSELF
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[#9db8b2]">
                <span>ENTRY_ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.entryId}</b></span>
                <span>PUBLISHED_AT&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.publishedAt}</b></span>
                <span>PREVIOUS_HASH&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.previousHash}</b></span>
                <span>CONTENT_HASH&nbsp;&nbsp;<b className="text-[#e3a63b] break-all">SHA256:{contentHash}</b></span>
                <span>SIGNER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="text-[#f3f6f1]">{ledgerEntry.signer}</b></span>
                <span>SOURCE_COMMIT&nbsp;<b className="text-[#f3f6f1]">{BUILD.commit}</b></span>
              </div>
              <p className="text-[#6e8b85] text-[10px] mt-2.5 tracking-wide">
                The hash is computed live, in your browser, from the canonical claim set on this page. Entry
                002 will carry it as PREVIOUS_HASH. “Nothing above the append line is ever edited” is not a
                promise — it is inspectable.
              </p>
            </div>

            <p className="text-[#c9d8d3] leading-relaxed">
              We ask medicine a hard question:{" "}
              <em className="text-[#f3f6f1]">show me a report that tells you what it doesn't know.</em> Fair
              is fair. This page is Vizzhy's report on Vizzhy — written the way our reports are written. It
              is append-only. When we are wrong, the correction is added below, dated, hashed, and the
              original stays standing, marked. A doctor scars. A body scars. Vizzhy scars. So does Vizzhy
              the company.
            </p>

            <div>
              <h4 className="vz-tag !text-[#e3a63b] mb-5">I · What we claim — with witness and ceiling</h4>
              <div className="space-y-5">
                {ledgerClaims.map((c) => (
                  <div key={c.id} className="vz-panel p-5">
                    <div className="font-mono2 text-[11px] text-[#e3a63b] mb-2">{c.id}</div>
                    <p className="text-[#f3f6f1] leading-relaxed">{c.claim}</p>
                    <div className="mt-3 space-y-1.5 text-[13px]">
                      <p className="text-[#7fd0c4]">
                        <span className="font-mono2 text-[10px] tracking-widest">WITNESS · </span>
                        {c.witness}
                      </p>
                      <p className="text-[#e3a63b]">
                        <span className="font-mono2 text-[10px] tracking-widest">CEILING · </span>
                        {c.ceiling}
                      </p>
                      {c.cannotSee && (
                        <p className="text-[#a99bd1]">
                          <span className="font-mono2 text-[10px] tracking-widest">CANNOT SEE · </span>
                          {c.cannotSee}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="vz-tag !text-[#e3a63b] mb-5">II · What we do not know — dated Sept 14, 2026</h4>
              <ol className="space-y-3 list-decimal list-inside text-[#c9d8d3] leading-relaxed">
                {ledgerUnknowns.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="vz-tag !text-[#e3a63b] mb-2">III · Sealed predictions — the first hundred</h4>
              <p className="text-[#9db8b2] text-sm mb-5 italic">
                Sealed before any of them arrived, by the content hash above. A prediction written after the
                outcome is not a prediction. Entry 002 reports what actually happened — on or before
                November 14, 2026.
              </p>
              <div className="space-y-4">
                {ledgerPredictions.map((p) => (
                  <div key={p.id} className="border-l-2 border-[#e3a63b] pl-4">
                    <div className="font-mono2 text-[11px] text-[#e3a63b] mb-1">{p.id}</div>
                    <p className="text-[#f3f6f1] leading-relaxed">{p.text}</p>
                    <p className="text-[#6e8b85] text-[13px] mt-1">Measure: {p.measure}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="vz-tag !text-[#e3a63b] mb-5">IV · What would change our mind</h4>
              <ul className="space-y-3 text-[#c9d8d3] leading-relaxed">
                {ledgerMindChangers.map((m, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#e3a63b]">→</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="vz-tag !text-[#e3a63b] mb-2">V · How a correction becomes a scar</h4>
              <p className="text-[#9db8b2] text-sm mb-5 italic">
                No corrections yet — this is the structure every future amendment must take. The original is
                left standing; the scar is chained to it.
              </p>
              <div className="vz-panel p-5 font-mono2 text-[11.5px] space-y-1.5">
                {ledgerScarFormat.map((f) => (
                  <div key={f.field} className="flex flex-wrap gap-x-4 gap-y-0.5">
                    <span className="text-[#e3a63b] w-44 shrink-0">{f.field}</span>
                    <span className="text-[#9db8b2]">{f.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-dashed border-[rgba(157,184,178,0.35)] text-center">
              <p className="font-mono2 text-[11px] tracking-[0.2em] text-[#6e8b85]">
                — append line · nothing above this is ever edited —
              </p>
              <p className="text-[#9db8b2] mt-4 italic">
                The population is the prior. The person is the jurisdiction. The model proposes. The
                physician decides. Reality corrects. And the ledger remembers.
              </p>
              <p className="text-[#6e8b85] text-sm mt-3">— Entry 001 · September 14, 2026 · Austin, Texas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
