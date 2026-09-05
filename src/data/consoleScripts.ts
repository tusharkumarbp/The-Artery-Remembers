export type EpistemicState =
  | "supported"
  | "contested"
  | "unresolved"
  | "capability-limited"
  | "retracted";

/**
 * The system is not one omniscient voice. Every event in a trace belongs to
 * a named epistemic actor with a legitimate role — the console renders these
 * as lanes so the human–machine coupling stays visible.
 */
export type Actor =
  | "INDIVIDUAL" // lived experience, testimony, goals, constraints
  | "PHYSICIAN" // examination, context, adjudication, responsibility
  | "ASSAY" // bounded observation
  | "IMAGING" // bounded observation, structural
  | "RUNTIME" // deterministic normalization, gating, typing, provenance
  | "LLM" // hypothesis expansion, comparison, explanation
  | "VALIDATOR" // permission, refusal, structural enforcement
  | "REALITY"; // outcome — the final witness

export type EvidenceRole = "OBSERVED" | "HYPOTHESIS" | "TESTIMONY" | "POPULATION PRIOR";

export type ConsoleEvent =
  | { kind: "sys"; actor?: Actor; text: string }
  | { kind: "phase"; name: string; note?: string }
  | {
      kind: "claim";
      actor: Actor;
      id: string;
      prop: string;
      state: EpistemicState;
      role: EvidenceRole;
      valid: string; // temporal validity
      witness?: string;
      ceiling?: string; // observation-capability bound
    }
  | { kind: "witness"; actor: Actor; text: string }
  | { kind: "route"; actor: Actor; text: string }
  | { kind: "note"; actor: Actor; text: string }
  | { kind: "hold"; actor: Actor; left: string; right: string; info: string }
  | {
      kind: "decision"; // the Decision Gate — before any witness is chosen
      actor: Actor;
      text: string;
      atStake: string[]; // decision options currently in play
      notAtStake: string[];
    }
  | { kind: "refusal"; actor: Actor; query: string }
  | {
      kind: "answer";
      intro: string; // canonical clinical compression — audience-invariant
      know: string[];
      how: string[];
      dontKnow: string[];
      changeMind: string[];
      closing: string;
    };

export interface ConsoleScenario {
  id: string;
  chip: string;
  query: string;
  twin: string;
  events: ConsoleEvent[];
  /* the same typed claims, re-voiced — demonstrating render(claim, audience) → text */
  engineVoices: Record<string, string>;
}

export const ENGINES = [
  "vizzhy-render/claude",
  "vizzhy-render/gpt",
  "vizzhy-render/gemini",
  "vizzhy-render/open-weights",
];

export const DECISION_OPTIONS = [
  "current prevention intensity",
  "imaging strategy",
  "family screening",
  "treatment-monitoring plan",
  "trial eligibility",
  "no present decision",
];

export const scenarios: ConsoleScenario[] = [
  {
    id: "ax001",
    chip: "AX-001 · controlled targets, changed structure",
    query: "My LDL is good. My doctor says I'm fine. Why is my disease still progressing?",
    twin: "AX-001 · synthetic teaching twin v1.0 · cardiac",
    events: [
      { kind: "sys", actor: "RUNTIME", text: "session opened · corpus = the patient · twin substrate AX-001 (synthetic, v1.0) loaded" },
      { kind: "sys", actor: "RUNTIME", text: "query typed → jurisdiction: person-level process question · population evidence admitted as prior only" },
      { kind: "phase", name: "INTAKE", note: "read the movie, not the photograph" },
      { kind: "witness", actor: "RUNTIME", text: "substrate: story · sensors (home BP × 9d, CGM 14d) · biomarkers × 3 panels · imaging (CCTA, 2 timepoints) · governed proteomic release (10,457 probe-defined objects)" },
      {
        kind: "claim", actor: "ASSAY", id: "c₁",
        prop: "ApoB/LDL exposure at goal — three measurements, stable, on therapy",
        state: "supported", role: "OBSERVED", valid: "current to 2026-03-07",
        witness: "lipid panel ×3, dated, repeated",
        ceiling: "exposure clock only; says nothing about plaque activity",
      },
      {
        kind: "claim", actor: "IMAGING", id: "c₂",
        prop: "Serial imaging demonstrates structural change between T₁ and T₂",
        state: "supported", role: "OBSERVED", valid: "T₂ = 2026-03-07",
        witness: "CCTA Δ, same scanner, locked acquisition protocol",
        ceiling: "structure ≠ activity — under statin therapy calcium can rise while plaque densifies and stabilizes; composition and acquisition bounds still to be adjudicated",
      },
      { kind: "phase", name: "CONTRADICT", note: "the two claims cannot both be the whole story" },
      {
        kind: "hold", actor: "RUNTIME",
        left: "c₁ · treatment target achieved — exposure controlled",
        right: "c₂ · structural trajectory changed between scans",
        info: "Both true. Δ₁ created. Whether the change is active adverse progression, treatment-related stabilization, measurement variability, or a mixture remains to be adjudicated from composition and acquisition bounds. The contradiction is kept as an edge — not averaged into a comfortable middle.",
      },
      { kind: "phase", name: "PRESERVE", note: "no cosmetic resolution permitted" },
      { kind: "note", actor: "VALIDATOR", text: "refused the completion “LDL is fine, therefore disease is fine.” Plausibility was not promoted into knowledge." },
      { kind: "phase", name: "GENERATE", note: "expand the possibility space — one image, six biologies" },
      {
        kind: "claim", actor: "LLM", id: "h₁",
        prop: "Residual particle burden — Lp(a)-driven; statin never touched it",
        state: "unresolved", role: "HYPOTHESIS", valid: "open",
        witness: "Lp(a) 185 nmol/L, measured once, years ago, never confirmed",
      },
      {
        kind: "claim", actor: "LLM", id: "h₂",
        prop: "Local plaque inflammation with a systemically quiet blood panel",
        state: "capability-limited", role: "HYPOTHESIS", valid: "open",
        ceiling: "blood omics cannot sample the plaque; no negative without capability",
      },
      {
        kind: "claim", actor: "LLM", id: "h₃",
        prop: "Treatment-related stabilization or low current activity — an old fire, not a burning one",
        state: "unresolved", role: "HYPOTHESIS", valid: "open",
      },
      {
        kind: "claim", actor: "LLM", id: "h₄",
        prop: "Repair failure — the wall remodeling badly",
        state: "unresolved", role: "HYPOTHESIS", valid: "open",
        witness: "matrix-remodeling process memberships, blood-based",
        ceiling: "blood abundance does not localize matrix turnover",
      },
      {
        kind: "claim", actor: "LLM", id: "h₅",
        prop: "Hemostatic / clonal-myeloid driver",
        state: "capability-limited", role: "HYPOTHESIS", valid: "open",
        ceiling: "no marrow witness in substrate",
      },
      {
        kind: "claim", actor: "LLM", id: "h₆",
        prop: "Gut–liver–metabolic driver despite a normal HbA1c",
        state: "contested", role: "HYPOTHESIS", valid: "open",
        witness: "CGM variability vs. calm average — the average hid the swings",
      },
      { kind: "phase", name: "COHERE", note: "search for the structure that makes all facts jointly intelligible" },
      { kind: "note", actor: "RUNTIME", text: "no higher-order structure earned yet. Correct state: UNRESOLVED × 6 — each configuration carries the finding that would retire it." },
      {
        kind: "decision", actor: "PHYSICIAN",
        text: "Decision gate — before any witness is chosen: what decision could the next measurement plausibly change? No deeper measurement without a decision it can plausibly change.",
        atStake: ["current prevention intensity", "treatment-monitoring plan"],
        notAtStake: ["imaging strategy", "family screening", "trial eligibility", "no present decision"],
      },
      { kind: "phase", name: "WITNESS", note: "route to the smallest decision-changing witness" },
      { kind: "route", actor: "RUNTIME", text: "a* = argmax [ I(H;Oₐ) × D(a) − λC(a) − μB(a) − νR(a) ] → one confirmatory Lp(a) with calibrated assay timing (discriminates h₁, changes prevention intensity) · costs little, decides much · ranked above imaging repeat and above “no further test” — this time" },
      { kind: "note", actor: "PHYSICIAN", text: "depth is not a package. It is a response to an unresolved question. The physician adjudicates; the next box opens only because this box didn't answer." },
      { kind: "phase", name: "EARN", note: "nothing promoted this run — and that is the honest output" },
      {
        kind: "answer",
        intro:
          "Your cholesterol is controlled. Your artery's structure changed anyway. Both are measured, both are kept — and under treatment, a changed scan can mean progression, stabilization, or measurement variability; that is adjudicated, not assumed. Six biological configurations remain live under the same image — we will not pretend to know which one until the right witness separates them.",
        know: [
          "Exposure is controlled — ApoB/LDL at goal, three dated measurements, on therapy.",
          "Serial imaging shows structural change — two scans, same protocol, real interval difference.",
          "The treatment worked and the structure changed. The treatment solved one jurisdiction of the disease.",
        ],
        how: [
          "Serial lipid panel (three draws, dated, repeatable witness).",
          "CCTA at two timepoints under a locked acquisition protocol.",
          "Governed proteomic release — 145 process memberships over 10,457 probe-defined objects, exact score-to-object lineage.",
        ],
        dontKnow: [
          "Whether the structural change is active progression, treatment-related stabilization, measurement variability, or a mixture — adjudication pending composition and acquisition bounds.",
          "Which of the six configurations is driving your plaque — unresolved, by discipline.",
          "Whether local plaque inflammation is active — blood cannot see the plaque; declared, not smoothed.",
          "Whether Lp(a) 185 still stands — one old measurement is a hint, not a confirmed value.",
        ],
        changeMind: [
          "A confirmatory Lp(a) with calibrated timing — retires or promotes h₁, and changes prevention intensity.",
          "Plaque composition read against acquisition bounds — separates progression from stabilization.",
          "A witness capable of plaque-level activity — would separate h₂ from h₃.",
          "Any first-hundred case that defeats this routing logic gets written into the scar log, permanently.",
        ],
        closing:
          "This is what a report that tells you what it doesn't know looks like. Every page of every twin carries these four sections. It is not a promise. It is a screen.",
      },
    ],
    engineVoices: {
      "vizzhy-render/claude":
        "Your cholesterol is controlled. Your artery's structure changed anyway. Both are measured, both are kept — progression, stabilization, and measurement variability are still being adjudicated, not assumed. Six biological configurations remain live under the same image — we will not pretend to know which one until the right witness separates them.",
      "vizzhy-render/gpt":
        "Controlled LDL, changed structure: both true, both on the record — and a changed scan under treatment is adjudicated, not read as verdict. Six candidate biologies remain. We decline to guess — the next decision-relevant witness decides.",
      "vizzhy-render/gemini":
        "The exposure clock is fixed; the plaque clock moved. Structure is not activity — composition will adjudicate. Six mechanisms remain live. None promoted without its witness.",
      "vizzhy-render/open-weights":
        "Targets met. Structure changed; activity unadjudicated. Six hypotheses held open pending discriminating evidence. No claim beyond capability.",
    },
  },
  {
    id: "lpa",
    chip: "One inherited number · Lp(a)",
    query: "My Lp(a) is high. What does that mean in me?",
    twin: "walk-in twin · story + one PDF report · no substrate yet",
    events: [
      { kind: "sys", actor: "RUNTIME", text: "session opened · corpus = the patient · substrate: story + a single uploaded lab PDF" },
      { kind: "sys", actor: "RUNTIME", text: "query typed → an inherited number changes the prior; it is not yet a verdict about your artery" },
      { kind: "phase", name: "INTAKE", note: "one datapoint, one context, zero artery data" },
      { kind: "witness", actor: "RUNTIME", text: "substrate: self-report · one Lp(a) value, 142 nmol/L, assay metadata incomplete · no imaging · family history not yet taken" },
      {
        kind: "claim", actor: "ASSAY", id: "c₁",
        prop: "Lp(a) concentration is elevated — 142 nmol/L",
        state: "supported", role: "OBSERVED", valid: "single draw",
        witness: "one assay",
        ceiling: "assay identity and context determine how confidently the number itself is accepted",
      },
      {
        kind: "claim", actor: "RUNTIME", id: "c₂",
        prop: "Elevated Lp(a) raises this person's lifelong cardiovascular-risk prior",
        state: "supported", role: "POPULATION PRIOR", valid: "lifelong exposure",
        witness: "Lp(a) is largely genetically determined and relatively stable across life; guidance recommends at least one adult measurement",
        ceiling: "a prior is not a personal prognosis",
      },
      {
        kind: "claim", actor: "RUNTIME", id: "c₃",
        prop: "Current arterial burden attributable to Lp(a)",
        state: "capability-limited", role: "HYPOTHESIS", valid: "unwitnessed",
        ceiling: "no imaging, no downstream fingerprints measured — the question is live but unwitnessed",
      },
      { kind: "phase", name: "CONTRADICT", note: "what the population says vs. what was measured in you" },
      {
        kind: "hold", actor: "RUNTIME",
        left: "population prior: elevated Lp(a) ≈ higher lifelong event risk",
        right: "this person: one value, no artery data, no family history taken",
        info: "The population is the prior — gratefully. It is not allowed to be the end of your story.",
      },
      { kind: "phase", name: "PRESERVE", note: "the gap between prior and person stays open" },
      { kind: "note", actor: "VALIDATOR", text: "refused both completions — “high Lp(a) = disease” and “high Lp(a) = harmless.” Neither is earned. A causal, inherited risk factor is never ‘carrier without consequence’; the honest statement is: no demonstrated structural consequence at the resolution and time currently observed — lifelong inherited exposure remains relevant." },
      { kind: "phase", name: "GENERATE", note: "what would make this number matter — in you, specifically" },
      {
        kind: "claim", actor: "LLM", id: "h₁",
        prop: "Lp(a)-driven particle burden reaching the wall, additive to ApoB, blood pressure, smoking, diabetes, kidney function and family history",
        state: "unresolved", role: "HYPOTHESIS", valid: "open",
        witness: "would need: ApoB + full causal terrain, then arterial imaging if decision-relevant",
      },
      {
        kind: "claim", actor: "LLM", id: "h₂",
        prop: "No demonstrated structural consequence at the resolution and time currently observed — lifelong inherited exposure remains relevant",
        state: "unresolved", role: "HYPOTHESIS", valid: "open",
        witness: "would need: baseline arterial imaging — only if it would change a present decision",
      },
      { kind: "phase", name: "COHERE", note: "what structure would make prior and person jointly intelligible" },
      { kind: "note", actor: "RUNTIME", text: "none earned yet. Correct state: UNRESOLVED × 2 — and the missing discriminant is decision-dependent, not automatic." },
      {
        kind: "decision", actor: "PHYSICIAN",
        text: "Decision gate — would an imaging result change a present clinical decision? Does the family picture, or a trial doorway, change what we do next? Sensors serve the global terrain; they do not answer an Lp(a)-specific question merely because they sit on an earlier rung.",
        atStake: ["current prevention intensity", "family screening", "trial eligibility"],
        notAtStake: ["imaging strategy", "treatment-monitoring plan", "no present decision"],
      },
      { kind: "phase", name: "WITNESS", note: "question- and decision-specific — not a universal staircase" },
      { kind: "route", actor: "RUNTIME", text: "router: confirm the number once (assay identity, calibrated method — repeat is selective, not routine monitoring) · measure ApoB and the rest of the causal terrain (pressure, glucose, kidney function, smoking) · take the family history properly — the cheapest witness in the system · image only if it would change a decision · screen trial eligibility" },
      { kind: "note", actor: "PHYSICIAN", text: "the physician adjudicates which door opens first. Depth must be earned by the question — and by the decision it could change." },
      { kind: "phase", name: "EARN", note: "what got earned: a plan, and an honest ceiling" },
      {
        kind: "answer",
        intro:
          "Your Lp(a) is inherited, lifelong, and real — it changes your risk prior today. What it has done in your arteries is a separate question, and no witness has looked yet. Here is what we know, and what would settle the rest.",
        know: [
          "The measured concentration is elevated — 142 nmol/L, one assay.",
          "Elevated Lp(a) changes your lifelong cardiovascular-risk prior — it is largely genetic and relatively stable over life.",
          "Assay identity and context determine how confidently the number itself is accepted.",
        ],
        how: [
          "Your uploaded report — single assay, metadata declared incomplete, not filled in.",
          "Contemporary guidance: at least one adult measurement for everyone, repeat selectively — admitted as prior, never as your personal proof.",
        ],
        dontKnow: [
          "Your current arterial burden and composition — unwitnessed.",
          "The contribution of Lp(a) relative to ApoB, blood pressure, smoking, diabetes, kidney function and family history.",
          "Whether an imaging result would change a present clinical decision.",
          "Whether you or your family qualify for additional evaluation or a clinical trial.",
        ],
        changeMind: [
          "A one-time confirmatory assay with a calibrated method — settles the number itself.",
          "ApoB plus the full causal terrain — settles what else is carrying the risk.",
          "A baseline arterial image — only if it would change a decision — separates exposure from consequence.",
          "Family history properly taken — the cheapest witness in the entire system is your story.",
        ],
        closing:
          "An inherited number is a lifelong prior, not a verdict. We confirm it once, we measure the terrain around it, and we look at the artery only when the answer would change what we do.",
      },
    ],
    engineVoices: {
      "vizzhy-render/claude":
        "Your Lp(a) is inherited, lifelong, and real — it changes your risk prior today. What it has done in your arteries is a separate question, and no witness has looked yet.",
      "vizzhy-render/gpt":
        "Elevated Lp(a), confirmed once: a lifelong prior, not a personal verdict. Confirm the number, map the causal terrain, image only if it changes a decision — in that order.",
      "vizzhy-render/gemini":
        "Genetic prior updated; arterial consequence unwitnessed. Repeat is selective, not routine. Next witnesses sequenced by decision relevance.",
      "vizzhy-render/open-weights":
        "Elevated Lp(a), single observation. Prior revised; burden claim bounded at capability. Next witnesses: confirmatory assay, ApoB + terrain, family history, decision-gated imaging.",
    },
  },
  {
    id: "firstbox",
    chip: "“Am I actually okay?” · the first box",
    query: "I don't know anything about my health. Am I actually okay?",
    twin: "cold start · story only · zero instruments",
    events: [
      { kind: "sys", actor: "RUNTIME", text: "session opened · corpus = the patient · substrate: empty except the person" },
      { kind: "sys", actor: "RUNTIME", text: "doctrine loaded: the question is the entry, not the diagnosis · you start where you are" },
      { kind: "phase", name: "INTAKE", note: "the first box is you" },
      { kind: "witness", actor: "INDIVIDUAL", text: "substrate: your story in your own words · existing records organized · how you actually feel" },
      { kind: "note", actor: "PHYSICIAN", text: "a human is a perfect sensor for pain, fatigue, fear — and a poor sensor for an artery. Both facts are used; neither is deleted." },
      { kind: "phase", name: "GENERATE", note: "what could 'okay' even mean here" },
      {
        kind: "claim", actor: "INDIVIDUAL", id: "c₁",
        prop: "Self-report: “I feel fine.”",
        state: "supported", role: "TESTIMONY", valid: "current",
        witness: "testimony — labeled testimony",
        ceiling: "testimony is not biology; not asked ≠ no",
      },
      {
        kind: "claim", actor: "RUNTIME", id: "c₂",
        prop: "No red-flag pattern in history or records",
        state: "supported", role: "OBSERVED", valid: "records to date",
        witness: "organized record review",
        ceiling: "records witness what was measured, never what wasn't",
      },
      {
        kind: "claim", actor: "RUNTIME", id: "c₃",
        prop: "Arterial state is quiet",
        state: "capability-limited", role: "HYPOTHESIS", valid: "unwitnessed",
        ceiling: "nothing in box one can see an artery. Declared blind spot — never a reassuring negative",
      },
      { kind: "phase", name: "PRESERVE", note: "the blind spot stays on the page" },
      { kind: "note", actor: "VALIDATOR", text: "refused the completion “no complaints = healthy.” Absence of evidence declared as absence. It never quietly becomes a negative finding." },
      {
        kind: "decision", actor: "PHYSICIAN",
        text: "Decision gate — is there a present decision a measurement could change? Honest answer: not yet. The cheapest learning is continuous, already-owned, and changes the baseline everything else will be read against.",
        atStake: ["no present decision"],
        notAtStake: ["current prevention intensity", "imaging strategy", "family screening", "treatment-monitoring plan", "trial eligibility"],
      },
      { kind: "phase", name: "WITNESS", note: "what would box one change?" },
      { kind: "route", actor: "RUNTIME", text: "router: sealed prediction P2 in play — story + records alone often change the picture. Recommendation: connect the sensors you already own (box 2) before any blood is drawn. Cost ≈ 0. Information: continuous. No deeper measurement without a decision it can plausibly change." },
      { kind: "phase", name: "EARN", note: "the honest answer, when it's honest" },
      {
        kind: "answer",
        intro:
          "From your story and your records: nothing we can see is alarming, and we will say that plainly — you're fine, keep living — with one declared blind spot, named, not smoothed over.",
        know: [
          "No red-flag pattern in what you told us or in your records.",
          "How you feel is real data — kept, dated, and compared against biology from today forward.",
        ],
        how: [
          "Structured story intake — your words, not a form's.",
          "Organization of every record you already had. No new test was needed to say this much.",
        ],
        dontKnow: [
          "Your arteries, your glucose dynamics, your pressure at home — unmeasured is not fine; it is unknown.",
          "Your baselines. “Normal for you” can only start being learned on the day you start.",
        ],
        changeMind: [
          "Two weeks of the sensors already on your wrist and in your home.",
          "Any contradiction between how you feel and what the sensors see — that gap is information, and we keep it.",
          "The years before today are photographs you can't retake. Starting costs nothing; waiting does.",
        ],
        closing:
          "Most first questions resolve in the early rungs. That is a sealed prediction of ours (P2) — and if the first hundred people prove it wrong, the defeat gets written down, publicly, in the ledger.",
      },
    ],
    engineVoices: {
      "vizzhy-render/claude":
        "From your story and your records: nothing we can see is alarming — you're fine, keep living — with one declared blind spot, named, not smoothed over.",
      "vizzhy-render/gpt":
        "Okay as far as any story can show: yes. Arteries: unwitnessed, declared unknown. Cheapest next witness: the sensors you already own.",
      "vizzhy-render/gemini":
        "No red flags in narrative or records. Blind spots enumerated. Baseline learning starts today or not at all.",
      "vizzhy-render/open-weights":
        "History clean; instrumentation absent; unknowns typed. Recommend box 2 sensors prior to any assay.",
    },
  },
];
