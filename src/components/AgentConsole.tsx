import { useEffect, useMemo, useRef, useState } from "react";
import { Play, RotateCcw, Terminal, Cpu, ShieldCheck, Ban } from "lucide-react";
import {
  scenarios,
  ENGINES,
  type Actor,
  type ConsoleEvent,
  type ConsoleScenario,
} from "@/data/consoleScripts";
import { seal, shortHash } from "@/lib/sha256";

const PHASES = ["INTAKE", "GENERATE", "CONTRADICT", "PRESERVE", "COHERE", "WITNESS", "EARN"];

const stateClass: Record<string, string> = {
  supported: "state-supported",
  contested: "state-contested",
  unresolved: "state-unresolved",
  "capability-limited": "state-capability",
  retracted: "state-retracted",
};

const actorColor: Record<Actor, string> = {
  INDIVIDUAL: "#e3a63b",
  PHYSICIAN: "#7fd0c4",
  ASSAY: "#9db8b2",
  IMAGING: "#e08a5f",
  RUNTIME: "#8fa8a2",
  LLM: "#a99bd1",
  VALIDATOR: "#d07070",
  REALITY: "#f3f6f1",
};

const actorSource: Record<Actor, string> = {
  INDIVIDUAL: "TESTIMONY",
  PHYSICIAN: "PHYSICIAN",
  ASSAY: "INSTRUMENT · ASSAY",
  IMAGING: "INSTRUMENT · IMAGING",
  RUNTIME: "DETERMINISTIC RUNTIME",
  LLM: "MODEL-GENERATED",
  VALIDATOR: "VALIDATOR",
  REALITY: "REALITY",
};

function ActorBadge({ actor }: { actor: Actor }) {
  return (
    <span
      className="inline-block shrink-0 font-mono2 text-[9px] tracking-[0.14em] px-1.5 py-0.5 rounded border mr-2 align-middle"
      style={{ color: actorColor[actor], borderColor: `${actorColor[actor]}55` }}
    >
      {actor}
    </span>
  );
}

function delayFor(e: ConsoleEvent): number {
  switch (e.kind) {
    case "phase": return 650;
    case "claim": return 780;
    case "hold": return 1100;
    case "answer": return 1400;
    case "route": return 950;
    case "decision": return 1100;
    case "refusal": return 900;
    default: return 520;
  }
}

/* strict routing: a question maps to a labeled teaching case, or the demo refuses */
function matchScenario(text: string): ConsoleScenario | null {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  for (const sc of scenarios) if (t === sc.query.toLowerCase()) return sc;
  if (t.includes("lp(a") || t.includes("lpa") || t.includes("lipoprotein")) return scenarios[1];
  if (
    t.includes("ldl") || t.includes("cholesterol") || t.includes("plaque") ||
    t.includes("progressing") || t.includes("stent") || (t.includes("doctor") && t.includes("fine"))
  ) return scenarios[0];
  if (
    t.includes("actually okay") || t.includes("am i okay") || t.includes("don't know anything") ||
    t.includes("dont know anything") || t.includes("where do i start") || t.includes("cold start")
  ) return scenarios[2];
  return null;
}

/* word-level diff between two engine renderings — the proof that only prose moved */
type DiffToken = { text: string; type: "same" | "add" | "del" };
function wordDiff(a: string, b: string): DiffToken[] {
  const wa = a.split(/\s+/).filter(Boolean);
  const wb = b.split(/\s+/).filter(Boolean);
  const m = wa.length, n = wb.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = wa[i] === wb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffToken[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (wa[i] === wb[j]) { out.push({ text: wa[i], type: "same" }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ text: wa[i], type: "del" }); i++; }
    else { out.push({ text: wb[j], type: "add" }); j++; }
  }
  while (i < m) out.push({ text: wa[i++], type: "del" });
  while (j < n) out.push({ text: wb[j++], type: "add" });
  return out;
}

/** canonical claim-set statistics — the invariant the engine swap must not move */
function claimStats(sc: ConsoleScenario) {
  const claims = sc.events.filter((e) => e.kind === "claim") as Extract<ConsoleEvent, { kind: "claim" }>[];
  const answer = sc.events.find((e) => e.kind === "answer") as Extract<ConsoleEvent, { kind: "answer" }>;
  const canonical = {
    claims: claims.map((c) => ({
      id: c.id, prop: c.prop, state: c.state, role: c.role, valid: c.valid,
      witness: c.witness ?? null, ceiling: c.ceiling ?? null,
    })),
    contradictions: sc.events.filter((e) => e.kind === "hold").map((h) => (h as { info: string }).info),
    answer: { know: answer.know, how: answer.how, dontKnow: answer.dontKnow, changeMind: answer.changeMind },
  };
  return {
    count: claims.length,
    contradictions: sc.events.filter((e) => e.kind === "hold").length,
    capabilityGaps: claims.filter((c) => c.state === "capability-limited").length,
    retractions: claims.filter((c) => c.state === "retracted").length,
    hash: seal(canonical),
  };
}

export default function AgentConsole() {
  const [scenario, setScenario] = useState<ConsoleScenario>(scenarios[0]);
  const [query, setQuery] = useState(scenarios[0].query);
  const [shown, setShown] = useState<ConsoleEvent[]>([]);
  const [running, setRunning] = useState(false);
  const [engine, setEngine] = useState(ENGINES[0]);
  const [prevEngine, setPrevEngine] = useState<string | null>(null);
  const [refused, setRefused] = useState<string | null>(null);
  const [activePhases, setActivePhases] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => claimStats(scenario), [scenario]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runEvents = (events: ConsoleEvent[]) => {
    clearTimers();
    setShown([]);
    setRunning(true);
    setActivePhases([]);
    let t = 400;
    events.forEach((e, i) => {
      timers.current.push(
        setTimeout(() => {
          setShown((prev) => [...prev, e]);
          if (e.kind === "phase") setActivePhases((p) => [...new Set([...p, e.name])]);
          if (i === events.length - 1) setRunning(false);
        }, t)
      );
      t += delayFor(e);
    });
  };

  const run = (sc: ConsoleScenario) => {
    setRefused(null);
    runEvents(sc.events);
  };

  const refuse = (q: string) => {
    setRefused(q);
    runEvents([
      { kind: "sys", actor: "RUNTIME", text: "session opened · public demo · three synthetic teaching cases loaded" },
      { kind: "sys", actor: "RUNTIME", text: `query typed → “${q.slice(0, 140)}”` },
      { kind: "refusal", actor: "VALIDATOR", query: q },
    ]);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown]);

  const answer = useMemo(
    () => shown.find((e) => e.kind === "answer") as Extract<ConsoleEvent, { kind: "answer" }> | undefined,
    [shown]
  );

  const pick = (sc: ConsoleScenario) => {
    setScenario(sc);
    setQuery(sc.query);
    setEngine(ENGINES[0]);
    setPrevEngine(null);
    run(sc);
  };

  const submitFree = () => {
    const sc = matchScenario(query);
    setEngine(ENGINES[0]);
    setPrevEngine(null);
    if (sc) {
      setScenario(sc);
      run(sc);
    } else {
      refuse(query);
    }
  };

  const swapEngine = (eng: string) => {
    setPrevEngine(engine);
    setEngine(eng);
  };

  const diff = useMemo(() => {
    if (!prevEngine || prevEngine === engine) return null;
    return wordDiff(scenario.engineVoices[prevEngine], scenario.engineVoices[engine]);
  }, [prevEngine, engine, scenario]);

  return (
    <div className="vz-panel overflow-hidden">
      {/* console title bar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[rgba(157,184,178,0.22)] bg-[rgba(10,32,33,0.9)]">
        <div className="flex items-center gap-3 min-w-0">
          <Terminal size={16} className="text-[#e3a63b] shrink-0" />
          <span className="font-mono2 text-[12px] tracking-[0.14em] text-[#f3f6f1] truncate">
            CODEXOS REASONING TRACE
          </span>
          <span className="hidden sm:flex items-center gap-2 font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">
            <span className="live-dot" /> SYNTHETIC GOVERNED TRACE
          </span>
        </div>
        <div className="font-mono2 text-[10px] tracking-widest text-[#6e8b85] hidden md:block">
          corpus = the patient · {scenario.twin}
        </div>
      </div>

      {/* CPWE phase rail */}
      <div className="flex flex-wrap gap-1.5 px-5 py-3 border-b border-[rgba(157,184,178,0.22)]">
        {PHASES.map((p) => {
          const on = activePhases.includes(p);
          return (
            <span
              key={p}
              className={`font-mono2 text-[10px] tracking-[0.18em] px-2.5 py-1 rounded-full border transition-all duration-500 ${
                on
                  ? "border-[#e3a63b] text-[#e3a63b] bg-[rgba(227,166,59,0.08)]"
                  : "border-[rgba(157,184,178,0.18)] text-[#4a5d59]"
              }`}
            >
              {p}
            </span>
          );
        })}
      </div>

      {/* trace window */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Synthetic governed reasoning trace"
        className="console-scroll h-[430px] overflow-y-auto px-5 py-5 space-y-3 bg-[rgba(6,15,16,0.6)]"
      >
        {shown.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 opacity-70">
            <Cpu size={28} className="text-[#2f6e67]" />
            <p className="font-mono2 text-[11px] tracking-[0.18em] text-[#6e8b85] max-w-md leading-relaxed">
              THE TRACE SHOWS THE ACTORS, NOT ONE OMNISCIENT VOICE — INSTRUMENTS OBSERVE, THE RUNTIME
              TYPES, THE MODEL PROPOSES, THE VALIDATOR REFUSES, THE PHYSICIAN DECIDES.
            </p>
            <p className="text-[#9db8b2] text-sm">Pick a teaching case below and press run.</p>
          </div>
        )}

        {shown.map((e, i) => {
          switch (e.kind) {
            case "sys":
              return (
                <div key={i} className="font-mono2 text-[11px] text-[#6e8b85] leading-relaxed">
                  {e.actor && <ActorBadge actor={e.actor} />}
                  <span className="text-[#2f6e67]">$ </span>
                  {e.text}
                </div>
              );
            case "phase":
              return (
                <div key={i} className="pt-2">
                  <span className="font-mono2 text-[12px] tracking-[0.2em] text-[#e3a63b]">▸ {e.name}</span>
                  {e.note && <span className="text-[#9db8b2] text-[13px] ml-3 italic">{e.note}</span>}
                </div>
              );
            case "witness":
              return (
                <div key={i} className="border-l-2 border-[#2f6e67] pl-3 text-[13px] text-[#9db8b2] leading-relaxed">
                  <ActorBadge actor={e.actor} />
                  <span className="font-mono2 text-[10px] tracking-widest text-[#7fd0c4]">WITNESS · </span>
                  {e.text}
                </div>
              );
            case "claim":
              return (
                <div key={i} className="vz-panel !rounded-xl px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13.5px] text-[#f3f6f1] leading-snug">
                      <ActorBadge actor={e.actor} />
                      <span className="font-mono2 text-[11px] text-[#e3a63b] mr-1.5">{e.id}</span>
                      {e.prop}
                    </p>
                  </div>
                  {/* orthogonal axes — one chip no longer carries the whole semantics */}
                  <dl className="mt-2.5 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] font-mono2">
                    <div className="flex gap-2">
                      <dt className="text-[#4a5d59] tracking-wider shrink-0">CLAIM STATE</dt>
                      <dd>
                        <span className={`uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full border text-[9.5px] ${stateClass[e.state]}`}>
                          {e.state}
                        </span>
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-[#4a5d59] tracking-wider shrink-0">EVIDENCE ROLE</dt>
                      <dd className="text-[#c9d8d3]">{e.role}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-[#4a5d59] tracking-wider shrink-0">SOURCE</dt>
                      <dd className="text-[#c9d8d3]">{actorSource[e.actor]}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-[#4a5d59] tracking-wider shrink-0">TEMPORAL VALIDITY</dt>
                      <dd className="text-[#c9d8d3]">{e.valid}</dd>
                    </div>
                    {e.ceiling && (
                      <div className="flex gap-2 sm:col-span-2">
                        <dt className="text-[#4a5d59] tracking-wider shrink-0">CAPABILITY</dt>
                        <dd className="text-[#e08a5f]">{e.ceiling}</dd>
                      </div>
                    )}
                  </dl>
                  {e.witness && <p className="mt-1.5 text-[12px] text-[#7fd0c4]">witness — {e.witness}</p>}
                </div>
              );
            case "hold":
              return (
                <div key={i} className="rounded-xl border border-[rgba(224,138,95,0.45)] bg-[rgba(224,138,95,0.06)] px-4 py-3">
                  <div className="font-mono2 text-[10px] tracking-[0.18em] text-[#e08a5f] mb-2">
                    <ActorBadge actor={e.actor} />
                    CONTRADICTION HELD — Δ EDGE CREATED
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-[13px] text-[#f3f6f1]">
                    <div className="border border-[rgba(157,184,178,0.18)] rounded-lg px-3 py-2">{e.left}</div>
                    <div className="border border-[rgba(157,184,178,0.18)] rounded-lg px-3 py-2">{e.right}</div>
                  </div>
                  <p className="text-[#9db8b2] text-[12.5px] mt-2 leading-relaxed">{e.info}</p>
                </div>
              );
            case "decision":
              return (
                <div key={i} className="rounded-xl border border-[rgba(127,208,196,0.4)] bg-[rgba(127,208,196,0.05)] px-4 py-3">
                  <div className="font-mono2 text-[10px] tracking-[0.18em] text-[#7fd0c4] mb-2">
                    <ActorBadge actor={e.actor} />
                    DECISION AT STAKE — GATE BEFORE WITNESS
                  </div>
                  <p className="text-[#c9d8d3] text-[12.5px] leading-relaxed mb-2.5">{e.text}</p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 font-mono2 text-[11px]">
                    {e.atStake.map((o) => (
                      <div key={o} className="flex items-center gap-2 text-[#7fd0c4]">
                        <span className="w-3.5 h-3.5 rounded-sm border border-[#7fd0c4] inline-flex items-center justify-center text-[9px]">✓</span>
                        {o}
                      </div>
                    ))}
                    {e.notAtStake.map((o) => (
                      <div key={o} className="flex items-center gap-2 text-[#4a5d59]">
                        <span className="w-3.5 h-3.5 rounded-sm border border-[#4a5d59] inline-block" />
                        {o}
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "route":
              return (
                <div key={i} className="border-l-2 border-[#e3a63b] pl-3 text-[13px] text-[#f3f6f1] leading-relaxed">
                  <ActorBadge actor={e.actor} />
                  <span className="font-mono2 text-[10px] tracking-widest text-[#e3a63b]">ROUTER · </span>
                  {e.text}
                </div>
              );
            case "note":
              return (
                <div key={i} className="text-[12.5px] text-[#a99bd1] italic leading-relaxed pl-1">
                  <ActorBadge actor={e.actor} />◇ {e.text}
                </div>
              );
            case "refusal":
              return (
                <div key={i} className="rounded-xl border border-[rgba(208,112,112,0.5)] bg-[rgba(208,112,112,0.06)] px-5 py-4">
                  <div className="flex items-center gap-2 font-mono2 text-[11px] tracking-[0.16em] text-[#d07070] mb-2.5">
                    <Ban size={13} />
                    <ActorBadge actor={e.actor} />
                    NO GOVERNED DEMONSTRATION TRACE EXISTS FOR THIS QUESTION
                  </div>
                  <div className="space-y-1.5 text-[13px] text-[#c9d8d3] leading-relaxed">
                    <p>Your question was not matched to one of the three synthetic teaching cases.</p>
                    <p>Nothing has been inferred about you.</p>
                    <p className="text-[#9db8b2]">
                      Choose a teaching case below — or start a real intake with a physician.
                    </p>
                  </div>
                </div>
              );
            case "answer":
              return null; // rendered below the trace
            default:
              return null;
          }
        })}

        {running && <div className="font-mono2 text-[12px] text-[#7fd0c4] caret">tracing</div>}
      </div>

      {/* answer pane — the "How sure are we" screen */}
      {answer && !refused && (
        <div className="border-t border-[rgba(157,184,178,0.22)] px-5 py-5 bg-[rgba(18,52,51,0.5)]">
          {/* canonical claim set — the invariant */}
          <div className="rounded-xl border border-[rgba(157,184,178,0.25)] bg-[rgba(6,15,16,0.55)] px-4 py-3 mb-5 font-mono2 text-[11px]">
            <div className="flex items-center gap-2 text-[#7fd0c4] tracking-[0.18em] text-[10px] mb-2">
              <ShieldCheck size={13} /> CANONICAL CLAIM SET
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[#c9d8d3]">
              <span>claim_count <b className="text-[#f3f6f1]">{stats.count}</b></span>
              <span>contradictions <b className="text-[#f3f6f1]">{stats.contradictions}</b></span>
              <span>capability_gaps <b className="text-[#f3f6f1]">{stats.capabilityGaps}</b></span>
              <span>retractions <b className="text-[#f3f6f1]">{stats.retractions}</b></span>
              <span>claim_set_hash <b className="text-[#e3a63b]">{shortHash(stats.hash)}</b></span>
              <span>validator <b className="text-[#7fd0c4]">PASS</b></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#7fd0c4]">
              RENDERED ANSWER · HOW SURE ARE WE — ALWAYS ONE TAP AWAY
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Cpu size={12} className="text-[#6e8b85]" />
              {ENGINES.map((eng) => (
                <button
                  key={eng}
                  onClick={() => swapEngine(eng)}
                  className={`font-mono2 text-[9.5px] tracking-wider px-2 py-1 rounded-full border transition-colors ${
                    engine === eng
                      ? "border-[#a99bd1] text-[#a99bd1] bg-[rgba(169,155,209,0.1)]"
                      : "border-[rgba(157,184,178,0.2)] text-[#6e8b85] hover:text-[#9db8b2]"
                  }`}
                >
                  {eng.replace("vizzhy-render/", "")}
                </button>
              ))}
            </div>
          </div>

          {/* canon vs render — the difference made tangible */}
          <div className="rounded-xl border border-[rgba(157,184,178,0.18)] px-4 py-3 mb-3">
            <div className="font-mono2 text-[9.5px] tracking-[0.2em] text-[#6e8b85] mb-1.5">
              CANONICAL CLINICAL COMPRESSION · AUDIENCE-INVARIANT
            </div>
            <p className="text-[14px] text-[#c9d8d3] leading-snug">{answer.intro}</p>
          </div>
          <div className="rounded-xl border border-[rgba(169,155,209,0.3)] bg-[rgba(169,155,209,0.04)] px-4 py-3 mb-2">
            <div className="font-mono2 text-[9.5px] tracking-[0.2em] text-[#a99bd1] mb-1.5">
              AUDIENCE RENDER · {engine}
            </div>
            <p className="font-display text-lg md:text-xl text-[#f3f6f1] leading-snug transition-opacity">
              {scenario.engineVoices[engine]}
            </p>
          </div>

          {/* the swap, made physical */}
          <div className="font-mono2 text-[10px] tracking-[0.14em] mb-5 flex flex-wrap gap-x-5 gap-y-1">
            <span className="text-[#7fd0c4]">CLAIM GRAPH&nbsp;&nbsp;UNCHANGED</span>
            <span className="text-[#7fd0c4]">EVIDENCE BINDINGS&nbsp;&nbsp;UNCHANGED</span>
            <span className="text-[#7fd0c4]">BOUNDS&nbsp;&nbsp;UNCHANGED</span>
            <span className="text-[#a99bd1]">PROSE RENDER&nbsp;&nbsp;CHANGED</span>
          </div>
          {diff && (
            <div className="rounded-lg border border-[rgba(157,184,178,0.15)] px-4 py-3 mb-5 text-[12.5px] leading-relaxed">
              <span className="font-mono2 text-[9.5px] tracking-[0.2em] text-[#6e8b85] block mb-1.5">
                RENDER DIFF · {prevEngine?.replace("vizzhy-render/", "")} → {engine.replace("vizzhy-render/", "")}
              </span>
              {diff.map((t, k) => (
                <span
                  key={k}
                  className={
                    t.type === "add"
                      ? "text-[#e3a63b] underline decoration-[rgba(227,166,59,0.6)]"
                      : t.type === "del"
                        ? "text-[#d07070] line-through opacity-70"
                        : "text-[#6e8b85]"
                  }
                >
                  {t.text}{" "}
                </span>
              ))}
            </div>
          )}
          <p className="text-[11px] font-mono2 tracking-wider text-[#6e8b85] mb-5">
            the model is replaceable. the evidence object is not. models can change — your evidence cannot.
            render(claim, audience) → text
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {(
              [
                ["WHAT WE KNOW", answer.know, "#7fd0c4"],
                ["HOW WE KNOW IT", answer.how, "#9db8b2"],
                ["WHAT WE DON'T KNOW", answer.dontKnow, "#e3a63b"],
                ["WHAT WOULD CHANGE OUR MIND", answer.changeMind, "#a99bd1"],
              ] as const
            ).map(([label, items, color]) => (
              <div key={label} className="rounded-xl border border-[rgba(157,184,178,0.18)] px-4 py-3">
                <div className="font-mono2 text-[10px] tracking-[0.18em] mb-2" style={{ color }}>
                  {label}
                </div>
                <ul className="space-y-1.5">
                  {items.map((it, j) => (
                    <li key={j} className="text-[12.5px] text-[#c9d8d3] leading-snug flex gap-2">
                      <span style={{ color }}>·</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[#9db8b2] text-[13px] italic mt-4 leading-relaxed">{answer.closing}</p>
        </div>
      )}

      {/* query bar */}
      <div className="border-t border-[rgba(157,184,178,0.22)] px-5 py-4 bg-[rgba(10,32,33,0.9)]">
        <div className="flex flex-wrap gap-2 mb-3">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => pick(sc)}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                scenario.id === sc.id && (shown.length > 0 || running) && !refused
                  ? "border-[#e3a63b] text-[#e3a63b]"
                  : "border-[rgba(157,184,178,0.25)] text-[#9db8b2] hover:border-[#e3a63b] hover:text-[#f3f6f1]"
              }`}
            >
              {sc.chip}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !running && submitFree()}
            placeholder="Try a question — the public demo will either map it to a labeled synthetic trace or refuse."
            aria-label="Try a question against the synthetic teaching cases"
            className="flex-1 min-w-0 bg-[rgba(6,15,16,0.8)] border border-[rgba(157,184,178,0.25)] rounded-full px-4 py-2.5 text-[13.5px] text-[#f3f6f1] placeholder:text-[#4a5d59] focus:outline-none focus:border-[#e3a63b]"
          />
          <button onClick={submitFree} disabled={running} className="vz-btn flex items-center gap-2 disabled:opacity-40">
            <Play size={14} /> Run
          </button>
          <button
            onClick={() => pick(scenario)}
            disabled={running}
            className="vz-btn ghost !px-3.5 flex items-center disabled:opacity-40"
            title="Replay trace"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <p className="font-mono2 text-[9.5px] tracking-[0.14em] text-[#4a5d59] mt-2.5 leading-relaxed">
          PRECOMPUTED RUNTIME DEMONSTRATION · SYNTHETIC TWINS ONLY · UNSUPPORTED QUESTIONS ARE REFUSED, NOT
          ANSWERED · DEMO INPUT IS PROCESSED LOCALLY IN YOUR BROWSER — NOTHING IS TRANSMITTED OR STORED ·
          THE MODEL PROPOSES, THE PHYSICIAN DECIDES, THE LEDGER REMEMBERS
        </p>
      </div>
    </div>
  );
}
