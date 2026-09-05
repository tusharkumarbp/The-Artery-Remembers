export interface TalkSegment {
  t: string;
  title: string;
  paras: string[];
}

export interface Talk {
  id: string;
  door: "patient" | "physician" | "governance";
  kind: "main" | "long" | "treatise" | "ledger";
  title: string;
  subtitle: string;
  duration: string;
  blurb: string;
}

export const mainTalkMeta: Talk = {
  id: "artery-main",
  door: "patient",
  kind: "main",
  title: "The Artery Remembers",
  subtitle: "The launch talk — one ten-minute window",
  duration: "10 min · the main version",
  blurb:
    "The surface of the whole building: four generations, one mother, the photograph and the movie, the ladder, and the one challenge to medicine. Every receipt spoken with its ceiling in the same breath.",
};

export const mainTalk: TalkSegment[] = [
  {
    t: "0:00",
    title: "The family",
    paras: [
      "I want to start with the reason, not the company.",
      "In my family, for four generations, the men died before forty. My great-grandfather. My grandfather. Both my uncles. Heart disease and diabetes — the same two words, every generation.",
      "I am fifty. I am the first man in my family in four generations to live past forty.",
      "Not luck. At thirty-seven I weighed 130 kilos — high cholesterol, hypertension, diabetes, classic metabolic syndrome. I was becoming the next chapter of the same story. Today I weigh 75, and everything I can measure is excellent for a fifty-year-old. The story changed because the biology changed. And the biology changed because we finally watched it.",
      "Let me explain what we built the way I explained it to my eight-year-old nephew — because he is the fifth generation, and these arteries are his inheritance too.",
    ],
  },
  {
    t: "1:20",
    title: "Why do you have blood?",
    paras: [
      "Why do you have blood?",
      "Every cell in your body needs energy to stay alive, and to make energy a cell needs oxygen and fuel. Your heart is the pump. Your arteries are the roads — head to toe, reaching every part of you, every second, for your whole life.",
      "The roads take a lifetime of traffic. Cholesterol travels in tiny particles — cargo trucks, and the cargo is necessary; your body needs it to build cells and hormones. The danger begins when too many ApoB-containing particles enter and remain trapped in the arterial wall. The body notices. Inflammation arrives. Clean-up cells swallow the trapped material. And over years — quietly, with no pain at all — a lump grows inside the artery wall.",
      "That is atherosclerosis. Narrow the road, or break it open — heart attack, stroke.",
      "Keep one sentence: the artery remembers how you have lived. Every year of pressure, trapped particles, high sugar, smoke, inflammation — the wall records it. The plaque is local; the forces that shape it are distributed — liver, marrow, gut, kidney, sleep, muscle, all reaching the same wall. My family's arteries remembered four generations. Mine had started recording the same story. We interrupted it.",
    ],
  },
  {
    t: "3:05",
    title: "The photograph and the movie",
    paras: [
      "How does medicine look at this? Fifteen minutes, twice a year. A blood test — a photograph. A scan — another photograph. Then your photographs are compared to the average of thousands of strangers, and you're handed a score with total confidence.",
      "False assurance is the most dangerous product in healthcare.",
      "Because you are not the average. My daughter Seetha is certain girls love pink and boys don't. But I love pink, and I am a man. Population evidence is the indispensable prior — we begin there, gratefully. The mistake is treating the prior as the completed person.",
      "The question that built this company: “My LDL is good. My doctor says I'm fine. Why is my disease still progressing?” Medicine asks what disease you have. Almost nobody asks why it is happening in you.",
      "Here is one reason nobody sees it. The disease runs on three clocks. Your exposure — cholesterol, pressure, sugar — can improve in months. Your artery integrates a lifetime, and can keep changing for years. And the event stays silent until it isn't. The person can look better, the artery can look worse, and the event may not have happened yet. All three can be true.",
    ],
  },
  {
    t: "4:20",
    title: "One mother",
    paras: [
      "In 2021 my mother, Vijayalakshmi, was diagnosed with diabetes. The plan was the plan every family gets — and it is a good plan for the question it was designed to answer. Standard medicine answered the question it was designed to answer. It did not have the longitudinal instruments to answer the question I was asking about this one person.",
      "I'm a doctor. I was at MIT. I asked: why can't we reverse this? Everyone said that's not how it works.",
      "So I studied one person. Her. A glucose sensor — reserved, back then, for people already on insulin. Her meals on WhatsApp. We watched what her sugar actually did after her food, her walks, her sleep. Change one thing. Watch. Keep what worked. And we worked on her understanding — she learned her own body, so the changes were hers, not my orders.",
      "One year later: off every medication. Last month, five years on, her HbA1c was 5.3.",
      "But I had a problem. I did not know if her remission was real or temporary. Would it hold? To be sure, I had to actually understand her biology — and you cannot buy that understanding anywhere. So we built it. Genome, methylation, RNA, proteins, metabolites, lipids, microbiome — our own pipelines, because no existing pipeline integrated these layers with the provenance, capability bounds and N=1 governance we required. There was no multiomics plan at the beginning. Multiomics exists because a son refused to accept an unverified cure. Today the two most-studied human beings in our system are my mother and me. Not a million people shallow. Two people deep.",
      "Then a hundred and fifty more — people with coronary disease, patients of a preventive cardiologist — who put his own practice into the study. Every one of them read to the deepest level we know how, before this door opened to anyone.",
      "And then my sister watched all of it and said the sentence that turned a family project into a company: “Not every mother has a son like you. Can we build this for all mothers?”",
      "I said: then join me. Harsha quit her software engineering job in America and did. That is Vizzhy — from one mother, to all mothers.",
    ],
  },
  {
    t: "6:35",
    title: "What Vizzhy is",
    paras: [
      "Because here is the truth: what my mother got was a doctor with unlimited attention on one patient. Medicine cannot give every patient a son. No human has the time or the mindwidth to hold one person's millions of changing signals, continuously, for years. A machine can — if you engineer it to preserve the disciplines of good medicine: never erase a contradiction, never call an unobserved thing absent, never let plausibility become truth.",
      "So Vizzhy is a ladder, and you climb only as high as your question requires.",
      "It starts with you — your story, how you feel; a perfect sensor for pain, a poor one for arteries. We use both facts.",
      "Then sensors — glucose, blood pressure, sleep, rhythm — watching your real life continuously. My mother's pressure rises just from seeing a doctor; at home she's normal. One reading brands you. A movie understands you.",
      "Then biomarkers — useful, but projections. An average can look calm while the sugar swings wildly underneath.",
      "Then the omics. And here is what almost everyone gets wrong: a genomic result may be a causal genotype, a risk modifier, a pharmacogenomic constraint, a carrier state, a VUS, or a computational hypothesis — and those are not interchangeable. If a gene matters, it tends to leave fingerprints downstream — RNA, proteins, biomarkers, the body. Fingerprints found, the suspicion grows. None found — and we truly looked, in the relevant tissue, at the relevant time, with an instrument capable of seeing them — it stays a suspicion, and we say so. But failure to detect a downstream signature can never erase a well-established pathogenic genotype when the relevant tissue, time or capability was not observed.",
      "We open the next box only when the last box didn't answer your question. My mother's answer was in the first box. A progressing artery under a “good” LDL needs deeper boxes. The parts finally exist; we assembled them.",
      "One honest boundary: a heart attack, a fracture, an infection — go to the hospital. Hospitals are magnificent at acute medicine, and that is not our work. When you become interesting, healthcare will take care of you. We want you before that — we want your boring years, so we can keep them boring, longer. Noncommunicable diseases caused at least forty-three million deaths in 2021. Cardiovascular disease was the largest single contributor — at least nineteen million. That is why we begin with the artery, and why the artery is the wedge into everything else.",
      "That is why anyone can enter Vizzhy with anything — with nothing at all, with one scary Lp(a) number, with two stents already in your chest. Same machine underneath. You start where you are.",
    ],
  },
  {
    t: "8:45",
    title: "Why trust it",
    paras: [
      "Why trust it? Not because an AI sounds confident.",
      "A good doctor does three things machines are terrible at. When two findings disagree, he holds both — he doesn't average them into a comfortable middle. When he doesn't know, he says I don't know — and here is what would settle it. And he closes the loop: change something, watch, confirm.",
      "We built Vizzhy so the machine is forced to behave that way. It writes down what it knows, how it knows it, what it cannot see, and what would change its mind. And when it is wrong — it will sometimes be wrong — it cannot erase the mistake. A doctor carries scars from every patient. Your body carries scars from every infection — that's how vaccines work. Vizzhy scars the same way. The wrong answer stays written, marked, so it can never quietly come back.",
      "Hold us to this forever: show me one report, anywhere in medicine, that tells you what it doesn't know. Ours does. On every page. That is the whole difference.",
    ],
  },
  {
    t: "9:35",
    title: "The fifth generation",
    paras: [
      "Guidelines carry the wisdom of millions, and they are where we begin. They are just not allowed to be the end of your story. You are one person, with one biology, being written every day — and the artery is taking notes. And here is the part no one tells you: Vizzhy can only read your movie from the day you start. The years before are photographs you can't retake.",
      "I did not begin with a company. I began with a family question — four generations of my family never got to ask why. I test it on myself. I trust it with my mother and my daughter before I ask you to trust it with yours.",
      "Vizzhy opens today. Come with your question. Come with nothing. Ask the why that fifteen-minute visits never had the instruments for:",
      "Why is this happening to me — and what can we change?",
    ],
  },
];
