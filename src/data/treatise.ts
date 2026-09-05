import type { Talk } from "./mainTalk";

export const treatiseMeta: Talk = {
  id: "stethoscope",
  door: "physician",
  kind: "treatise",
  title: "The Stethoscope of the Mind",
  subtitle:
    "A treatise on instrument-grade intelligence, contradiction-preserving wisdom extraction, and the next clinical sense",
  duration: "The physician version · 19 sections",
  blurb:
    "Medicine does not need an oracle. It needs a new instrument. The stethoscope extended hearing; imaging extended sight; the next instrument extends the physician's ability to perceive one human being as a biological system across depth and time.",
};

export interface TreatiseSection {
  n: string;
  title: string;
  boxed?: string;
  paras: string[];
}

export const treatiseAbstract: string[] = [
  "The dominant public argument about AI in medicine is framed as a contest: will AI replace doctors? Can AI outperform doctors? This framing is impoverished because it assumes the physician and the machine occupy the same axis and compete for the same cognitive seat. The more useful question is different: how much more capable can a physician become because machine intelligence exists?",
  "Multi-omics, longitudinal physiology, imaging, clinical history, perturbations, interventions and the scientific literature have now exceeded the unaided integration bandwidth of any biological mind. This is not a failure of physicians. It is a measurement-and-computation problem. Telling doctors to “keep up” is increasingly equivalent to telling the pre-stethoscope physician to listen harder.",
  "The thesis: governed AI is a new class of clinical instrumentation — an instrument for integrative biological perception. Because generative models can create plausible coherence without sufficient evidence, they do not become instruments automatically. They must be engineered into instrument-grade intelligence. The epistemic discipline for doing so is Contradiction-Preserving Wisdom Extraction (CPWE): preserve contradiction, preserve provenance, seek coherence, let reality decide when collapse is earned.",
  "The ultimate product is not a multi-omics report, an LLM, a dashboard, or even a BioTwin. It is a new clinical object: the interpretable biological trajectory of one person. Success is not that physicians say “Vizzhy has the smartest AI.” Success is that practicing without this depth begins to feel like practicing without an instrument.",
];

export const treatiseSections: TreatiseSection[] = [
  {
    n: "I",
    title: "The Wrong Question — AI versus doctor is a category error",
    boxed: "D + I > D",
    paras: [
      "A radiologist and an MRI scanner are not usefully ranked against each other. A cardiologist and an ECG machine are not competitors for the same role. Their capabilities are complementary. The stronger formulation is interactive rather than additive: H ⊗ M → C — grounded human intelligence and machine intelligence producing a new reachable capability space. Human observations alter machine hypotheses; machine formalization alters what the human can inspect; new measurements alter both. The system is recursive.",
    ],
  },
  {
    n: "II",
    title: "Why the Bicycle Undershoots — acceleration is not perception",
    boxed: "human capability + instrument → previously inaccessible observation",
    paras: [
      "A bicycle improves something a human can already do. The limiting factor in multi-omic medicine is not merely effort — no amount of physician concentration makes billions of genomic positions, thousands of proteins, metabolites, transcripts, longitudinal labs, wearables, imaging, medications and literature simultaneously fit inside working memory. The problem is observability plus integration. Laennec's 1816 stethoscope did not “work harder” than the doctor; it extended what the doctor could perceive. The proposed next step: distributed biological state → clinically interrogable individual trajectory.",
    ],
  },
  {
    n: "III",
    title: "The Clinical Bottleneck is Biological Bandwidth",
    boxed: "not observed ≠ absent",
    paras: [
      "Medicine never directly observes the latent biological state x(t). Each instrument sees only a projection, and every modality has an observation-capability boundary — the region of biological state it could validly observe under the actual sample, protocol, coverage and quality conditions. A negative claim is valid only when observation capability existed for that claim. This is one of the fundamental differences between a report generator and an epistemic instrument.",
    ],
  },
  {
    n: "IV",
    title: "Mutual Incompleteness — inverse scarcities",
    boxed: "Human supplies stakes; AI supplies scale; reality adjudicates both.",
    paras: [
      "The strongest system refuses two fantasies: that the model possesses everything given enough training data, and that human intuition scales by trying harder. The physician contributes grounding, lived experience, contextual judgment, values and responsibility. The machine contributes breadth, formalization, combinatorial search, persistent memory, and execution — plus cognitive elasticity: the emotional cost of abandoning a prior hypothesis is approximately zero.",
    ],
  },
  {
    n: "V",
    title: "The Central Failure Mode — coherence without truth",
    paras: [
      "A physical stethoscope does not form opinions. A generative model does. Given A and ¬A, an LLM experiences optimization pressure to continue with something coherent — it may select one side, average the two, or create a bridge that has never been observed. The model's generative gift is precisely its ability to fill gaps with plausible structure; that becomes dangerous when plausibility is silently promoted into knowledge. AI is not an instrument by nature. It becomes instrument-like only through governance.",
    ],
  },
  {
    n: "VI",
    title: "Contradiction-Preserving Wisdom Extraction",
    boxed: "C₁ ≠ C₂ ⇒ information has appeared",
    paras: [
      "Every clinically meaningful claim is an object, not a sentence: proposition, supporting and opposing evidence, provenance, temporal validity, observation-capability bound, uncertainty, and an epistemic state — supported, contested, unresolved, capability-limited, or retracted. Claims form a contradiction graph; instead of collapsing {cᵢ, cⱼ} into a cosmetic c*, CPWE preserves {cᵢ, cⱼ, Δᵢⱼ} — the contradiction itself becomes a first-class object. Coherence is not agreement: sometimes a hidden structure (time, compartment) makes both observations jointly intelligible. If no such structure has been earned, the correct state is UNRESOLVED — not a product failure, but epistemic integrity.",
    ],
  },
  {
    n: "VII",
    title: "The Witness Operator — reasoning is not witnessing",
    boxed: "a* = argmax [ I(H;Oₐ) − λC(a) − μB(a) − νR(a) ]",
    paras: [
      "A model can generate a beautiful explanation of something false. The world gets the final vote. A witness can be a repeat assay, a different omic layer, imaging, an examination, a longitudinal outcome, a perturbation, the literature, a clinician's grounded observation, or time itself. The next probe should maximize expected discrimination while accounting for burden, risk and cost — converting “what should we test next?” into an epistemic design problem.",
    ],
  },
  {
    n: "VIII",
    title: "The CPWE Loop — generate aggressively, promote cautiously",
    boxed: "GENERATE → CONTRADICT → PRESERVE → COHERE → WITNESS → EARN",
    paras: [
      "The model expands possibility space — it should be imaginative. Human observation, other assays, literature or outcomes introduce discrepancies. The system forbids cosmetic resolution, searches for higher-order structures that could make all observed facts jointly intelligible, asks reality which structure survives — and only then promotes a claim. The central doctrine: do not make AI less imaginative. Make it unable to smuggle imagination into truth.",
    ],
  },
  {
    n: "IX",
    title: "Instrument-Grade Intelligence — the visible drivetrain",
    boxed: "IG(c) = (E, π, Γ, t, u, Δ, W, ρ)",
    paras: [
      "A stethoscope receives epistemic constraint from physics; a generative system must receive it from architecture. A claim may be surfaced clinically only if the system can expose its evidence, provenance, capability bound, temporal context, uncertainty, contradiction status, next witness, and revision history. The operational question is not “is the AI confident?” but “can the system show what this claim rests on, where its boundaries are, what disagrees with it, and how it could be proven wrong?” Legible failure modes are a feature of instrumentation, not an embarrassment.",
    ],
  },
  {
    n: "X",
    title: "The Missing Sense is Trajectory",
    boxed: "What is this person becoming? When did the trajectory turn, and what changed it?",
    paras: [
      "An EHR stores events. A longitudinal clinical instrument should estimate derivatives, changepoints, perturbation-response edges, and persistent scars. The stethoscope hears the heart today. The next instrument must hear the decade — and the scientific object beneath that metaphor is the interpretable longitudinal biological trajectory.",
    ],
  },
  {
    n: "XI",
    title: "Perturbation, Counterfactual, Response",
    boxed: "rₐ(Δ) = x_obs(tₐ+Δ) − x̂⁰(tₐ+Δ)",
    paras: [
      "N=1 medicine requires more than static risk. The goal is not to pretend a response residual is automatically causal; it is to formalize what was observed, what counterfactual assumptions were made, how uncertainty propagates, and what repeated probes would strengthen or weaken the inference. Treatment becomes a learning loop: baseline → perturbation → response → recovery → recurrence → updated model.",
    ],
  },
  {
    n: "XII",
    title: "Scar Memory — the path by which we were wrong is reusable knowledge",
    boxed: "contradiction → probe → witness → revision → scar",
    paras: [
      "Most software stores the current answer. Scientific intelligence also stores how the answer changed: the prior claim, the contradiction that destabilized it, the probe chosen, the witness observed, the revised claim, the change in uncertainty, and the reason. A scar is memory of the epistemic journey — and it prevents the dangerous institutional amnesia in which the system appears to have “always known” the latest conclusion.",
    ],
  },
  {
    n: "XIII–XV",
    title: "The Coupled Clinic — the CIE is a sensor, not a form; the shared window",
    boxed: "NOT ASKED ≠ NO",
    paras: [
      "The physician is a sensor, witness and adjudicator inside the system, not a passive consumer of AI output. Remove grounding and the model becomes an articulate wanderer through priors; remove contradiction preservation and it generates coherent fantasy; remove witnessing and nothing forces theory to collide with reality. Rapid micro-interactions are grounding events, not data-entry chores — and a system may never infer a negative merely because it lacks an observation. The strongest clinical geometry is doctor → shared biological object ← individual: the BioTwin as a radiograph on a lightbox, inspected together.",
    ],
  },
  {
    n: "XVI",
    title: "The New Clinical Object",
    boxed: "Tᵢ = { X(t), P(t), Δ(t), A(t), R(t), U(t), Σ(t) }",
    paras: [
      "The enduring clinical object is the interpretable longitudinal biological trajectory of one person: observed state, active hypotheses, contradictions, actions, responses, uncertainties, and scar history. This object is durable even as the underlying foundation models change. GPT, Claude, Gemini, Grok, open models or future architectures can become replaceable engines inside the instrument. The clinical object persists.",
    ],
  },
  {
    n: "XVII–XIX",
    title: "Depth per Doctor-Hour · Heavy Once, Light Repeatedly · Professional Literacy",
    boxed: "heavy once; increasingly light thereafter",
    paras: [
      "The scarce unit is useful doctor-hours and how much clinically relevant depth each hour contains — the instrument must maximize relevant, trustworthy depth per physician minute. Multi-omics acquisition is not immediate: the build is substantial, but once the longitudinal substrate exists, interrogation is light — an instrumented biological history, not a repeatedly re-ordered giant panel. And like auscultation or ECG before it, a BioTwin requires a learnable reading discipline: trajectories, discordances, assay capability, provenance, intervention-response edges. Instruments create reading skills; this is the next one.",
    ],
  },
];

/* ---------- Launch Ledger ---------- */

export const ledgerMeta: Talk = {
  id: "ledger-001",
  door: "governance",
  kind: "ledger",
  title: "The Launch Ledger — Entry 001",
  subtitle: "September 14, 2026 · Vizzhy's report on Vizzhy · append-only",
  duration: "Governance · on the record",
  blurb:
    "We ask medicine a hard question: show me a report that tells you what it doesn't know. Fair is fair. This is Vizzhy's report on Vizzhy — written the way our reports are written. Nothing above the append line is ever edited.",
};

export interface LedgerClaim {
  id: string;
  claim: string;
  witness: string;
  ceiling: string;
  cannotSee?: string;
}

export const ledgerClaims: LedgerClaim[] = [
  {
    id: "C1",
    claim:
      "In 2021 the founder's mother began type 2 diabetes remission using continuous glucose monitoring, dietary and lifestyle change, and close observation. Medication-free remission maintained for five years, with HbA1c 5.3% in August 2026 — meeting the international consensus definition (HbA1c below 6.5% for at least three months without glucose-lowering medication), with continued follow-up, because remission is not a permanent cure.",
    witness: "Her longitudinal laboratory records and CGM data, held in our system.",
    ceiling: "n=1. This proves remission was possible in her. It does not state a probability for you.",
    cannotSee: "Whether her path transfers to any other biology.",
  },
  {
    id: "C2",
    claim:
      "The founder's classic metabolic syndrome is in sustained remission: 130 kg with hypertension, diabetes, and dyslipidemia at 37; 75 kg with strong cardiometabolic measures at 50.",
    witness: "His own longitudinal records.",
    ceiling: "n=1, self-experimenter — motivation and attention were not typical, and we say so.",
  },
  {
    id: "C3",
    claim:
      "Four consecutive generations of men in the founder's family died before forty of cardiovascular-metabolic disease; he is the first to pass forty.",
    witness: "Family testimony.",
    ceiling:
      "History, not data. Unverifiable in records. Held as testimony and labeled as such — the same way we'd handle it in your file.",
  },
  {
    id: "C4",
    claim:
      "The system is real and running: patient-facing Reveal, physician-facing Clinician Console, and in-house pipelines across nine omics, sensors, and imaging.",
    witness: "The product itself. Use it.",
    ceiling: "“Running” means operational today, not proven at scale.",
  },
  {
    id: "C5",
    claim:
      "Every Vizzhy report states what it knows, how it knows it, what it doesn't know, and what would change its mind.",
    witness: "Open any report. Checkable in five seconds, forever.",
    ceiling: "—",
  },
  {
    id: "C6",
    claim:
      "≈150 patients with coronary disease were built into governed cardiac BioTwins before public launch under an IRB-approved protocol — proof-of-architecture events, each audited for governance failure; 127 carry a governed proteomic release (171 plasma runs, 10,457 probe-defined protein objects, exact score-to-object lineage, 64 with an orthogonal second-platform witness).",
    witness: "The C-BIOS protocol; the Observatory receipt files.",
    ceiling:
      "Proof of architecture and measurement integrity. Not diagnosis, prognosis, pathway activity, event prediction, or treatment selection; it does not yet prove benefit.",
    cannotSee: "Whether depth changed decisions for these patients — the pending EFE question.",
  },
];

export const ledgerUnknowns: string[] = [
  "Whether what worked in our family generalizes. We have not run an outcomes trial. Two deep cases and a built system are a foundation for hypotheses, not proof of population benefit.",
  "Which questions our ladder answers cheaply and which will demand depth. We believe most first questions resolve in the early rungs — story, sensors, biomarkers. We do not yet know the real ratio. The first hundred people will teach us.",
  "How often held contradictions resolve, how fast, and how often they simply persist. Our doctrine says hold them. Our data on their natural history is young.",
  "Our failure modes at scale. Every system reveals new ways to be wrong when strangers arrive. That is precisely what this soft launch is designed to surface.",
  "Where we sit on our own validation ladder: V1 — measurement integrity — is supported by the cohort. V2 (interpretation reliability), V3 (longitudinal reliability), V4 (clinical utility) and V5 (outcome validation) are not yet established. We publish the rung we are on.",
];

export const ledgerPredictions: { id: string; text: string; measure: string }[] = [
  {
    id: "P1",
    text: "The majority of the first hundred will arrive carrying a question population medicine has already failed to answer for them (“my numbers are fine, but…” / “why did this happen despite treatment?”) rather than a general wellness curiosity.",
    measure: "Classification of each person's stated entry question.",
  },
  {
    id: "P2",
    text: "In a meaningful fraction of the first hundred, the first box alone — story plus organized existing records, no new testing — will materially change the working picture (surface a contradiction, retire a false assurance, or redirect the question).",
    measure: "Count of cases where the pre-testing synthesis changed the plan.",
  },
  {
    id: "P3",
    text: "Deep testing will be recommended in a minority of first-hundred cases — because the doctrine says depth must be earned by the question, and we predict most first questions won't require it yet.",
    measure:
      "Fraction of cases where the system escalated beyond biomarkers. If high, either the doctrine or the router is wrong, and we will say which.",
  },
  {
    id: "P4",
    text: "At least one of our own claims or mechanisms will be defeated by a first-hundred case, and the defeat will be recorded, not smoothed.",
    measure:
      "The scar log itself. If Entry 002 reports zero defeats, treat that as the most suspicious result on the page.",
  },
];

export const ledgerMindChangers: string[] = [
  "If depth routinely fails to change decisions — data accumulating while next steps stay identical — then our ladder is instrumentation, not learning, and the architecture is wrong.",
  "If the “what we don't know” sections of our reports go unread and unused by patients and physicians alike, then the challenge we pose to medicine is theater, and we owe a redesign, not a restatement.",
  "If the first hundred's questions resolve better through standard care pathways than through ours, we will publish that, too. The ledger doesn't have a marketing mode.",
];

/* ---------- Entry seal ----------
 * The ledger is not a promise; it is a chain. Entry 001's content hash is
 * computed live from the canonical claim set rendered on this page — anyone
 * can recompute it. Entry 002 will carry Entry 001's hash as PREVIOUS_HASH.
 */

export const ledgerEntry = {
  entryId: "VZ-LEDGER-001",
  publishedAt: "2026-09-14T09:00:00-05:00",
  previousHash: "GENESIS",
  signer: "Vizzhy Launch Key — signature affixed at launch-day sealing",
};

/**
 * How a correction becomes a scar: every future amendment to the entry above
 * is appended with this exact structure — the original left standing.
 */
export const ledgerScarFormat: { field: string; meaning: string }[] = [
  { field: "claim_id", meaning: "the claim being corrected" },
  { field: "prior_version", meaning: "content hash of the version being amended" },
  { field: "contradicting_witness", meaning: "the observation that defeated it" },
  { field: "old_claim", meaning: "what we said — left standing, struck, never deleted" },
  { field: "new_claim", meaning: "what the evidence now supports" },
  { field: "uncertainty_delta", meaning: "how the uncertainty moved, and in which direction" },
  { field: "reviewer", meaning: "the licensed physician who adjudicated the change" },
  { field: "effective_date", meaning: "when reality was allowed to correct us" },
  { field: "content_hash", meaning: "seal of the amended entry — chained to the previous" },
];
