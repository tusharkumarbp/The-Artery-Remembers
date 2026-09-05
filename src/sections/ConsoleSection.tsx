import AgentConsole from "@/components/AgentConsole";
import ContradictionTeaser from "@/components/ContradictionTeaser";

export default function ConsoleSection() {
  return (
    <section id="console" className="relative py-16 md:py-24 bg-[rgba(14,43,42,0.45)] border-y border-[rgba(157,184,178,0.16)]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="vz-tag mb-3">Public demo · precomputed governed traces, honestly labeled</div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#f3f6f1] leading-tight max-w-3xl">
          Watch the instrument preserve the disciplines of good medicine.
        </h2>
        <p className="mt-4 max-w-3xl text-[#9db8b2] leading-relaxed">
          The model generates hypotheses. Deterministic gates type and bind claims to evidence, time and
          observation capability. The physician adjudicates. Reality decides.{" "}
          <span className="text-[#f3f6f1]">The ledger remembers what changed.</span> The language model at
          the edge is a replaceable translation surface —{" "}
          <span className="text-[#a99bd1]">
            swap the engine after any run and watch the claim set hold still while only the voice changes.
          </span>
        </p>
        <div className="mt-8">
          <ContradictionTeaser />
          <AgentConsole />
        </div>
      </div>
    </section>
  );
}
