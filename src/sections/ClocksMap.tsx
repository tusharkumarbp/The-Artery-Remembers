import ThreeClocks from "@/components/ThreeClocks";

const map = [
  {
    name: "Acute",
    body: "Infection, trauma, the sudden illness. Hospitals are magnificent at this. If it's happening to you now, go. That is not our work.",
    ours: false,
  },
  {
    name: "Cardio-renal-metabolic",
    body: "The heart, the arteries, the kidneys, glucose, blood pressure. The big boring years. This is our work, and the artery is where it starts.",
    ours: true,
  },
  {
    name: "Cancer",
    body: "A different biology: cells evolving against their own body. It needs its own architecture. Not ours today.",
    ours: false,
  },
  {
    name: "Everything else chronic",
    body: "The brain, the mind, the immune system, the lungs. Later, if the artery teaches us how.",
    ours: false,
  },
];

export default function ClocksMap() {
  return (
    <section id="clocks" className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <div className="vz-tag mb-3">Why nobody sees it coming</div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#f3f6f1] leading-tight max-w-3xl">
        The disease runs on three clocks.
      </h2>
      <p className="mt-4 max-w-2xl text-[#9db8b2] leading-relaxed">
        The person can look better, the artery can look worse, and the event may not have happened yet.{" "}
        <em className="text-[#f3f6f1]">All three can be true.</em>
      </p>

      <div className="mt-8">
        <ThreeClocks />
      </div>

      <div className="mt-16">
        <div className="vz-tag mb-3">The map · healthcare is four things — we do one, starting at its center</div>
        <div className="grid md:grid-cols-2 gap-4">
          {map.map((m) => (
            <div
              key={m.name}
              className={`vz-panel p-6 ${m.ours ? "!border-[#e3a63b] bg-[rgba(227,166,59,0.05)]" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl text-[#f3f6f1]">{m.name}</h3>
                {m.ours && (
                  <span className="font-mono2 text-[9.5px] tracking-[0.18em] text-[#e3a63b] border border-[rgba(227,166,59,0.45)] rounded-full px-2.5 py-1">
                    OUR WORK
                  </span>
                )}
              </div>
              <p className="text-[#9db8b2] text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[#6e8b85] text-[13px] leading-relaxed max-w-3xl">
          Noncommunicable diseases caused at least 43 million deaths in 2021. Cardiovascular disease was the
          largest single contributor, accounting for at least 19 million. That is why we begin with the
          artery. Source: WHO noncommunicable-disease and cardiovascular fact sheets, 2021 data.{" "}
          <em className="text-[#9db8b2]">
            When you become interesting, healthcare will take care of you. We want you before that — we want
            your boring years, so we can keep them boring, longer.
          </em>
        </p>
      </div>
    </section>
  );
}
