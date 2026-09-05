import type { Talk, TalkSegment } from "./mainTalk";

export interface Chapter {
  n: string;
  title: string;
  span: string;
  why: string;
  segments: TalkSegment[];
}

export const longTalkMeta: Talk = {
  id: "artery-long",
  door: "patient",
  kind: "long",
  title: "The Artery Remembers — The Long Version",
  subtitle: "Four ten-minute chapters · each stands alone · each is one shot",
  duration: "≈45 min · 4 chapters · 4 videos",
  blurb:
    "The ten-minute talk is the surface. This is the same building with the rooms open — nothing here claims more than the ten-minute version, it says more. The depth plane, in the founder's voice.",
};

export const longChapters: Chapter[] = [
  {
    n: "I",
    title: "The Family",
    span: "0:00–10:00",
    why: "Why this exists",
    segments: [
      {
        t: "0:00",
        title: "The reason, not the company",
        paras: [
          "I want to start with the reason, not the company. In my family, for four generations, the men died before forty. My great-grandfather. My grandfather. Both my uncles. Heart disease and diabetes — the same two words, every generation. Nobody in my family ever got to ask why. They got a diagnosis, then a funeral.",
          "I am fifty. I am the first man in my family in four generations to live past forty.",
          "Not luck. At thirty-seven I weighed 130 kilos. High cholesterol, hypertension, diabetes — what we call classic metabolic syndrome. I was a doctor, I had run a hospital, and I was becoming the next chapter of the same story. Today I weigh 75, and everything I can measure — heart-rate variability, VO2 max, every number I have — is excellent for a fifty-year-old. The story changed because the biology changed. And the biology changed because, for the first time in four generations, somebody watched it.",
        ],
      },
      {
        t: "2:00",
        title: "The fifth generation",
        paras: [
          "A few weeks ago my eight-year-old nephew asked me what I actually do. I explained the whole company to him in ten minutes, and it was the best explanation I have ever given, because a child does not let you hide behind vocabulary. He is the fifth generation. These arteries are his inheritance. Everything that follows is that explanation — with the adult details left in.",
        ],
      },
      {
        t: "2:30",
        title: "One mother",
        paras: [
          "In 2021 my mother, Vijayalakshmi, was diagnosed with diabetes. The plan was the plan every family gets. This medicine. Then, when it isn't enough, more medicine. Then insulin. Then you fight the complications one after another. That is not a bad plan — standard medicine answered the question it was designed to answer. It did not have the longitudinal instruments to answer the question I was asking about this one person.",
          "I'm a doctor. I was at MIT at the time. I asked a simple question: why can't we reverse this? And everyone — good doctors, people I respect — said: that's not how it works.",
          "So I studied one person. Her. I got her a glucose sensor — which at that time was reserved for people already on insulin; I got it anyway. She sent me photographs of her meals on WhatsApp. We watched what her sugar actually did — after her food, after her walks, through her sleep. We changed one thing. We watched. We kept what worked and dropped what didn't. And there was a third thing, which turned out to matter as much as the sensor: we worked on her understanding. She learned her own body. So the changes were hers, not my orders — and that is why they held.",
          "One year later she was off every medication. Last month — five years on — her HbA1c was 5.3. Five years. No medicine.",
        ],
      },
      {
        t: "5:00",
        title: "Real, or temporary?",
        paras: [
          "But I had a problem I could not live with. I did not know whether her remission was real or temporary. Would it hold? Had we understood something, or had we been lucky? And you cannot buy that understanding anywhere. No lab in the world sells “did this one person's biology actually change.”",
          "So we built it. Her genome. Her methylation — the exposure memory written on top of the genome. Her RNA. Her proteins — thousands of them. Her metabolites, her lipids, her microbiome. Our own pipelines, because no existing pipeline integrated these layers with the provenance, capability bounds and N=1 governance we required. Understand this clearly: there was no multiomics plan at the beginning. There was no company. Multiomics exists because a son refused to accept an unverified cure.",
          "Then we did the same to me. Today the two most-studied human beings in our system are my mother and me. We did not test a million people shallow. We went two people deep — deeper, I believe, than anyone has gone into single human beings — and we built the machine from what one person's biology actually requires.",
        ],
      },
      {
        t: "6:30",
        title: "Said plainly",
        paras: [
          "I should say something plainly. I am not a scientist. Three years ago, if you had asked me the full form of WGS or WES, I could not have told you. I came to this as a doctor and as a son. And what I found, once I could read these layers, was the thing that shocked me most: every measurement we treat as the ground of a human body — an HbA1c, a variant in a genome, a protein count — is a projection. A slice. Useful, real, and not the thing itself. Medicine conflates the projection with the ground constantly, and the whole chain — the payer, the provider, the physician, the patient — pays for things and swallows things on the basis of that false assurance. That is the enemy. Not any disease. False assurance.",
        ],
      },
      {
        t: "7:30",
        title: "All mothers",
        paras: [
          "And then my sister watched all of this happen — the sensor, the WhatsApp photographs, the pipelines, the years — and she said the sentence that turned a family project into a company. “Not every mother has a son like you. Can we build this for all mothers?”",
          "I said: then join me. Harsha quit her software engineering job in America and did. That is Vizzhy. From one mother, to all mothers.",
        ],
      },
      {
        t: "8:30",
        title: "The cardiologist",
        paras: [
          "One more person, before the science. A preventive cardiologist — a physician whose whole practice is the patient nobody can explain: the one whose numbers are controlled and whose disease keeps moving. He put his own patients into our first study. About a hundred and fifty people with coronary disease, under an IRB-approved protocol, every one of them built into a governed cardiac twin before this door opened to anyone.",
          "I want to say exactly what that is and exactly what it is not, because that is the discipline of this company. It is proof that the machine runs at depth on real people. It is not an outcomes trial. It does not prove benefit yet. His sentence runs through everything we build: health is a thousand-piece puzzle, and most medical decisions are made from twenty of the pieces.",
        ],
      },
      {
        t: "9:30",
        title: "Two questions",
        paras: [
          "So this whole talk answers two questions. The patient's: why is this happening to me? And ours, back to medicine: show me a report that tells you what it doesn't know. Chapter one ends here. Chapter two is the body.",
        ],
      },
    ],
  },
  {
    n: "II",
    title: "The Organism",
    span: "10:00–20:00",
    why: "Why arteries exist before how they fail",
    segments: [
      {
        t: "10:00",
        title: "Why do you have blood?",
        paras: [
          "Why do you have blood? Every cell in your body needs energy to stay alive, and to make energy a cell needs oxygen and fuel. Blood is the delivery system. Your heart is the pump. Your arteries are the roads — head to toe, reaching every part of you, every second, for your whole life. That is the whole reason a heart matters. Not because it is romantic. Because without the roads, every cell starves.",
        ],
      },
      {
        t: "11:00",
        title: "Six stages — a teaching grammar",
        paras: [
          "So how does a road fail? Coronary disease is usually explained as a pipe that clogs with cholesterol. That picture is too small. Here is how it actually forms — six stages. A teaching grammar, not six claims about any one person.",
          "One: pressure reaches the wall. Particles carrying cholesterol — ApoB particles, Lp(a), the remnants after a meal — plus blood pressure and metabolic load, all pressing on the inner lining, every heartbeat.",
          "Two: the wall retains and recognizes. Think of the particles as cargo trucks. The cargo is necessary — your body needs cholesterol to build every cell and to make hormones. The danger begins when too many ApoB-containing particles enter and remain trapped in the arterial wall. The wall notices what is trapped. It does not “repair” with cholesterol — that is a myth. It gets stuck with it.",
          "Three: the immune system enters. Monocytes arrive. They become macrophages — clean-up cells. They swallow the trapped material and become foam cells.",
          "Four: clearance fails. In a healthy wall the clean-up finishes and the tissue resolves. In disease, the clean-up doesn't finish. The dead cells are not cleared; a core of debris grows; the inflammation never resolves.",
          "Five: the artery remodels. A fibrous cap forms over the lump. The matrix turns over. Calcium is laid down. The wall bulges outward to preserve the channel — which is why a scan can look open while the wall is full.",
          "Six: no single destiny. The same lump can go quiet and heal. It can keep growing. It can rupture, or erode, and form a clot. Nothing about one snapshot tells you which. If it narrows the road to your heart, or breaks open — heart attack. The road to your brain — stroke.",
        ],
      },
      {
        t: "13:30",
        title: "The sentence to keep",
        paras: [
          "Now the sentence I want you to keep. The artery remembers how you have lived. Every year of pressure, trapped particles, high sugar, smoke, inflammation — the wall records it. Your artery's state today is a function of your exposure, your inherited terrain, every perturbation — food, infection, stress, medicine — how well your repair systems worked, and the memory that all of it left behind. The artery remembers what the blood panel has forgotten. A blood test tells you today's pressure. A scan tells you accumulated memory. Multiomics asks which processes are still writing.",
        ],
      },
      {
        t: "14:30",
        title: "The hinge: inflammation",
        paras: [
          "Inflammation is not bad. When you cut yourself, when you get an infection, the immune system arrives, does its job, and leaves — that is acute inflammation and it saves your life. What we suffer from now is different: a slow, chronic, low-grade inflammation from processed food, pollution, toxins, sleeplessness, stress — never loud enough to notice, never quiet enough to stop. It keeps the inner lining of the artery activated, sticky. And a sticky wall is where the trucks get trapped.",
        ],
      },
      {
        t: "15:30",
        title: "The organ tour",
        paras: [
          "Here is the part almost nobody teaches. The plaque is local. The forces that shape it are distributed. The artery is not an isolated pipe — it is a memory surface for the whole organism, and every organ writes on it.",
          "The liver sends the particles — ApoB, the remnants, Lp(a) — and sets the sterol and bile-acid chemistry. The bone marrow sends the monocytes, and it can send them trained — primed to inflame — and sometimes carrying clonal changes that make them worse. Fat tissue sends adipokines and insulin signals, and the fat that sits right around the artery talks to the wall directly. The gut and the mouth send metabolites and endotoxin surrogates — bile acids, TMAO, the products of a periodontal infection. The kidney controls pressure, clearance, minerals, and leaks albumin when its own vessels are hurt. Muscle decides where glucose goes and how much mitochondrial reserve you have. The brain and your sleep set the sympathetic load — apnea, pressure variability, whether you recover at night. And the heart muscle itself reports injury.",
          "Now the discipline that separates us from a wellness poster: for every one of those organs we can name what it sends to the artery, which of our layers can witness it, what remains invisible — and the smallest next test that could change a decision. Blood omics witness circulating and systemic biology. They do not sample the plaque. We never pretend they do.",
        ],
      },
      {
        t: "17:30",
        title: "The three clocks",
        paras: [
          "Which brings us to the three clocks, and this is the answer to the patient's question. The disease runs on three clocks. The exposure clock — cholesterol, pressure, glucose — can improve in months; a statin moves it fast. The plaque clock integrates your whole history and the biology still active today; it moves over months to decades, and it can keep moving after the exposure clock has been fixed. The event clock — the heart attack, the stroke — stays silent for years, until it isn't.",
          "So: the person can look better, the artery can look worse, and the event may not have happened yet. All three can be true. That is why a man with a perfect lab panel can have a progressing artery. His treatment worked. His disease progressed. Both sentences are true. The treatment solved one jurisdiction of the disease.",
        ],
      },
      {
        t: "18:30",
        title: "Photographs, not a movie",
        paras: [
          "And how does medicine look at all this? Fifteen minutes, twice a year. A blood test is a photograph. A scan is another photograph. Then your photographs are compared to the average of thousands of strangers and you are handed a score, with total confidence. False assurance is the most dangerous product in healthcare — because you are not the average. My daughter Seetha is certain girls love pink and boys don't. But I love pink, and I am a man. Population evidence is the indispensable prior — it is where we begin, gratefully. The mistake is treating the prior as the completed person.",
        ],
      },
      {
        t: "19:00",
        title: "The inversion",
        paras: [
          "Here is the inversion that runs the whole company. Early in disease, the levers are many and cheap and nobody is looking. Late in disease, everyone is looking and few levers remain. Leverage leaves before attention arrives. Medicine sees you most clearly after the number crosses a threshold; biology is most changeable before it. So we do not do the loud years — the heart attack, the fracture, the infection. Hospitals are magnificent at the loud years. We want the big boring years. When you become interesting, healthcare will take care of you. We want you before that — we want your boring years, so we can keep them boring, longer.",
          "And to be precise about where those years are: healthcare is four things. Acute — the loud years, the hospital's. Cardio-renal-metabolic — heart, artery, kidney, glucose, pressure. Cancer — a different biology, cells evolving against their own body, its own architecture, not ours today. And the rest of chronic disease — brain, mind, immune, lung. Noncommunicable diseases caused at least forty-three million deaths in 2021. Cardiovascular disease was the largest single contributor — at least nineteen million. That is why we begin with the artery, and why the artery is the wedge into everything else. Chapter two ends. Chapter three is the instrument.",
        ],
      },
    ],
  },
  {
    n: "III",
    title: "The Instrument",
    span: "20:00–32:00",
    why: "What Vizzhy is, box by box",
    segments: [
      {
        t: "20:00",
        title: "The instrument gap",
        paras: [
          "What my mother got was a doctor with unlimited attention on one patient. Medicine cannot give every patient a son. No human — no cardiologist, however brilliant — has the time or the mindwidth to hold one person's millions of changing signals, continuously, for years, and also hold two thousand other patients. That is not a failure of doctors. It is an instrument gap. The observable patient has outgrown the unaided physician. A machine can hold it — if you engineer the machine to preserve the disciplines of good medicine: never erase a contradiction, never call an unobserved thing absent, distinguish hypothesis from evidence, state capability bounds, name what would change the claim, retain every revision. That is the entire engineering problem, and it took five years.",
          "Think of an iPhone. A child draws on it. An engineer designs a rocket on the same machine. The complexity is underneath; the surface adapts to who is touching it. Vizzhy is the same: someone can arrive saying “I don't know anything — am I okay?” Someone else arrives with one frightening Lp(a) number. Someone else has two stents already in his chest and wants to know what is still active. Same machine underneath. Three different depths of entry. You start where you are.",
        ],
      },
      {
        t: "22:00",
        title: "The ladder of clocks",
        paras: [
          "So what does the machine read? A ladder. No sample is a single present tense. Every layer is a different memory with a different clock. Your genome is lifelong — what you inherited. Your epigenome is months to years — exposure memory, aging, trained immunity written on the genome. RNA is hours to days — which programs are running in the cells we sampled. Proteins are days to weeks — the circulating machinery, in its many forms. Metabolites and lipids are minutes to days — the chemical economy right now. Immune cells are hours to months. Organ anatomy — a scan — is months to decades: burden, scar, structural memory. And your sensors and your own account are seconds to months: lived exposure, perturbation, recovery. The twin's job is to reconcile these clocks, not to pretend they are synchronous, and not to pretend they are interchangeable.",
        ],
      },
      {
        t: "24:00",
        title: "The first box is you",
        paras: [
          "The ladder starts with you. Medicine asks you questions from predetermined forms — pain from zero to ten. We ask something different: how do you feel about yourself, in your own words. And then we compare it to the biology. Constantly, we see a person whose self-report says my heart is perfect — and whose proteins say something is cooking. And the reverse: a person with a dozen complaints whose biology is quiet. Neither of them is lying. Both are true at once. A human being is a perfect sensor for some things — pain, fatigue, fear — and a poor sensor for others, like an artery. The gap between what you feel and what the instrument sees is not an error. It is information, and we keep it.",
        ],
      },
      {
        t: "25:00",
        title: "Sensors and biomarkers",
        paras: [
          "Then sensors. My mother's blood pressure rises every time she sees a doctor — white-coat hypertension; at home she is normal. One reading in a clinic brands you for life; a day of readings understands you. A glucose sensor every minute shows what your sugar does when you sleep, when you eat, when you walk — an HbA1c is a three-month average, and an average can look calm while the sugar swings wildly underneath it. Then biomarkers — blood tests. Useful, and honestly labeled as what they are: projections of biology, not biology.",
        ],
      },
      {
        t: "26:00",
        title: "A gene is a suspicion",
        paras: [
          "Then the omics — and the rule that governs all of them. A genomic result may be a causal genotype, a risk modifier, a pharmacogenomic constraint, a carrier state, a VUS, or a computational hypothesis — those are not interchangeable, and we never treat them as if they were. Yesterday a company announced it can tell you your risk of sixteen hundred diseases from your DNA with ninety-nine percent accuracy. I opened their sample report. A variant in a repair gene, labeled: causes an inherited cancer syndrome. It does not. That variant raises the possibility — many people who carry it never develop the cancer, and a great deal happens in between.",
          "So we cross-examine. If a gene matters, it tends to leave fingerprints downstream — in the RNA, in the proteins, in the biomarkers, in the body. Fingerprints found, the suspicion grows. No fingerprints — and we truly looked, in the relevant tissue, at the relevant time, with an instrument capable of seeing them — then it stays a suspicion, and we tell you so. No negative without observation capability: a quiet blood signal does not become evidence of a quiet plaque when blood was never able to see the plaque. And the symmetric discipline: failure to detect a downstream signature cannot erase a well-established pathogenic genotype when the relevant tissue, time or capability was not observed.",
        ],
      },
      {
        t: "27:30",
        title: "The depth, for physicians",
        paras: [
          "Now, for the physicians in the room, the depth. A patient never has to navigate this, but it exists, and it is inspectable. Five patient questions. What is reaching the wall? What has the artery already become? What is keeping it active? Can it defend and repair? Is the trajectory changing? Each one expands, for the physician, into sixteen governed questions — particle burden; HDL transport; endothelial activation; four faces of complement; the acute-phase and myeloid pattern; matrix remodeling; procoagulant, anticoagulant, fibrinolytic balance; hepatic and renal context; metabolic and adipose context; myocardial stress; resolution and repair. Sixteen questions. Not sixteen diagnoses. Each question carries its own ceiling — abundance is not activity; total complement is not activation; blood abundance does not localize matrix turnover.",
          "Underneath the sixteen questions sit a hundred and forty-five measured process memberships, and underneath those, ten thousand four hundred and fifty-seven probe-defined protein objects per person. And the single most important thing our cohort taught us is that the gene name is too coarse to be the unit. Complement C3 is not one thing in the blood — it is total C3, and C3a, and C3b, and C3d, and iC3b: substrate, activation, regulation, degradation, and they can move in opposite directions. Average them and you erase the biology. Cardiac troponin came back as two probe objects moving in opposing directions — you do not average those; you go to a calibrated high-sensitivity assay and you look at timing. Object before gene. The screen may show a gene label; the evidence must keep the object.",
          "And we measured the same people on two independent platforms — affinity binding and mass spectrometry. Sometimes they agree, and the agreement strengthens a pattern without proving concentration. Sometimes they oppose — PCSK9 did — and that is a high-value question about molecular form, epitope, therapy. And sometimes there is no shared sample, which is typed absence, not agreement. Discordance is not noise to average away. It is a question to resolve.",
        ],
      },
      {
        t: "29:30",
        title: "Six configurations, one image",
        paras: [
          "And here is what all of that is for. Take one synthetic patient — AX-001, a teaching case — with the same scan: plaque progressing, every target controlled. That one anatomy can be six different biologies underneath. Residual particle burden — Lp(a) that a statin never touched. Local inflammation with a systemically quiet blood panel. A high lifetime burden with low current activity — an old fire, not a burning one. A repair failure — the wall remodeling badly. A hemostatic or clonal-myeloid driver. A gut-liver-metabolic driver despite a normal HbA1c. Six configurations. Same image. Each with a candidate witness and — this is the part that matters — each with the finding that would retire it. The same progressive plaque can be six different biological configurations, and we will not pretend to know which until the right witness separates them.",
        ],
      },
      {
        t: "30:30",
        title: "The router law",
        paras: [
          "Which is why the machine's central act is not testing. It is routing. For every live contradiction, the question is: what is the smallest witness that could change the decision — including the possibility that no further test is justified, and observation is the answer? Depth is not a package. It is a response to an unresolved question. We own the ability to measure nearly anything, and that is precisely why we refuse to measure everything. We open the next box only when the last box didn't answer.",
          "And the cohort itself is scaffolding. At your first visit, a hundred and twenty-seven people are your coordinate system — where do I sit among them? Useful for orientation. Not a normal range. Not a threshold. Because the mature question is never “where do I rank?” It is “has this thing moved beyond my own expected variation?” — and that question can only be answered from your own serial history. The cohort tells us where to look. The person tells us what changed. Which is the reason I keep saying: your own “normal” starts being learned on the day you start, and the years before that are photographs you cannot retake.",
        ],
      },
      {
        t: "31:30",
        title: "The cohort, at its ceiling",
        paras: [
          "Let me state the cohort at its ceiling, because that is how we state everything. About a hundred and fifty people built into governed twins — proof that the architecture runs on real biology. A hundred and twenty-seven with a governed proteomic release: a hundred and seventy-one plasma runs, ten thousand objects, an exact line from every score back to its source measurement, and an independent second platform for sixty-four of them. What that supports: measurement structure, reproducibility, a per-person process map. What it does not support: diagnosis, prognosis, pathway activity, event prediction, treatment selection. We built the instrument. We have not yet proven the outcome. Chapter four is about why you should trust an instrument that says that out loud.",
        ],
      },
    ],
  },
  {
    n: "IV",
    title: "The Trust",
    span: "32:00–44:00",
    why: "How it knows, how it is wrong, and what we promise",
    segments: [
      {
        t: "32:00",
        title: "Not confidence",
        paras: [
          "Why should you trust any of this? Not because an AI sounds confident. Confidence is the cheapest thing a machine produces.",
          "A good doctor does three things that machines are terrible at. When two findings disagree, he holds both — he does not average them into a comfortable middle. When he doesn't know, he says I don't know — and here is what would settle it. And he closes the loop: change something, watch, confirm. What a doctor cannot do is hold a billion data points at once. A machine can. Vizzhy is the attempt to put those two things in one instrument.",
          "Consider how medicine makes its rules. Ten thousand people, three years. Five thousand get the drug, five thousand don't. Four thousand of the treated get better — and the drug is approved for everyone. What about the thousand it did nothing for? They are noise. Discarded. Nobody asks why. The human body is a thousand-piece puzzle and we are deciding from twenty pieces — and calling the pieces that don't fit “noise.”",
        ],
      },
      {
        t: "34:00",
        title: "The challenge",
        paras: [
          "So here is the challenge, and you can hold us to it forever. Show me one report, anywhere in medicine, that tells you what it doesn't know. Every report you have ever received says yes or no. Nothing in between. Ours carries four sections on every page: what we know, how we know it, what we don't know, and what would change our mind. It is not a promise on a website. It is a screen in the app, one tap away, called How sure are we.",
        ],
      },
      {
        t: "35:00",
        title: "The four evidence states",
        paras: [
          "Let me show you what “what we don't know” looks like on a real — synthetic, but real-shaped — cardiac twin, because it is not vague. ApoB measured three times, at goal, stable: known — its witness is named, dated, and repeated. Lp(a) at 185, measured once, years ago, never repeated, never acted on: uncertain — one measurement is a hint, not a trajectory, and we show the uncertainty instead of smoothing it. Blood pressure normal in the clinic and six of nine home readings high: contradicted — both witnesses kept, neither deleted; the system does not pick a winner to look tidy. Sleep quality “fine,” said in conversation, never measured: testimony only — and not asked is not the same as no. Absence of evidence is declared as absence. It never quietly becomes a negative finding.",
        ],
      },
      {
        t: "36:30",
        title: "Scars",
        paras: [
          "And when it is wrong — it will sometimes be wrong — here is what happens. A doctor carries scars from every patient he has treated: what worked, what didn't, what nearly killed someone. The next similar patient, he already knows. Your body carries scars from every infection — that is how vaccines work; the immune system remembers. Vizzhy scars the same way. It cannot erase a wrong answer. The wrong answer stays written, marked as wrong, with the reason, so it can never quietly return — and so that no future version, no future engineer, no future model can repeat it without seeing it. Reality alone creates scars. The archive never forgets. Memory says: I know. A scar says: I cannot be what I was before knowing. This company is itself a scar — I could not go back to accepting an unverified cure for my mother, and I never will.",
        ],
      },
      {
        t: "38:30",
        title: "The twin must risk being wrong",
        paras: [
          "Which is why a BioTwin must risk being wrong. A twin that can only explain the past is a story. A twin becomes an instrument the day it risks a future observation. So before we act, we write down: the leading hypothesis, the smallest discriminating witness, the predicted direction, the observation window, and the finding that would prove us wrong. The physician commits. The person consents. We act. We witness what the body did. And then — support, oppose, or unresolved. Support raises the claim but does not remove its ceiling. Opposition retires the hypothesis; we do not defend it. Unresolved teaches us that this witness cannot settle this question. The old twin stays in the ledger, immutable; a new twin is rebuilt on the new substrate. A model that cannot be falsified is a story. A runtime gives you the date on which it can be proven wrong. And the test of whether the machine learned anything is not how much data it collected. It is whether the second decision changed because of what the first one taught.",
        ],
      },
      {
        t: "40:00",
        title: "Our report on ourselves",
        paras: [
          "We ask medicine for a report that says what it doesn't know. Fair is fair. So we published one about ourselves, and I will read you the shape of it. What we claim, with the witness and the ceiling. My mother's reversal — witness: her labs; ceiling: one person, proves possibility in her, not probability in you. My own — witness: my records; ceiling: one person, and a very motivated one. Four generations — witness: family testimony; ceiling: history, not data, and we label it that way. The cohort — I gave you its ceiling in chapter three. And the standard itself — open any report and check.",
          "What we do not know. Whether what worked in my family generalizes; we have not run an outcomes trial. Which of your questions the ladder answers cheaply and which demand depth — the first hundred will teach us. How often a held contradiction resolves, and how fast. Our own failure modes at scale — every system finds new ways to be wrong when strangers arrive. And where we sit on our own validation ladder: at the first rung, measurement integrity. Interpretation reliability, longitudinal reliability, clinical utility, outcome validation — the next four rungs — are not yet established. We publish the rung we are on.",
          "And our predictions for the first hundred people, sealed before they arrive. That most will come with a question medicine already failed to answer for them. That for many, the first box alone — story and records, no new test — will change the picture. That deep testing will be recommended for a minority, because depth must be earned. And that at least one of our own claims will be defeated by a first-hundred case — and that we will write the defeat down. If our report in November says zero defeats, distrust it.",
        ],
      },
      {
        t: "42:00",
        title: "Four promises",
        paras: [
          "Four promises, written before the first customer. We will never sell you a panel because we own the machine — capability is not a reason; your open question is. We will never diagnose you with a chatbot — software organizes and reveals; licensed physicians govern every clinical step and make every clinical decision with you. We will never trade in certainty we don't have — when the honest answer is “you're fine, keep living,” we will say it exactly that way. And we will never hold your data hostage — your picture is yours, whole, to any doctor, any time.",
          "The model proposes. The physician decides. The ledger remembers. And one honest boundary that stands above all of it: if it is loud — a heart attack, a fracture, an infection — go to the hospital. That is not our work. Ours is the boring years.",
        ],
      },
      {
        t: "43:00",
        title: "The close",
        paras: [
          "Guidelines carry the wisdom of millions, and they are where we begin. They are just not allowed to be the end of your story. You are one person, with one biology, being written every day — and the artery is taking notes. Vizzhy can only read your movie from the day you start. The years before are photographs you can't retake.",
          "I did not begin with a company. I began with a family question — four generations of my family never got to ask why. I test it on myself. I trust it with my mother and with my daughter before I ask you to trust it with yours. My nephew is the fifth generation, and I would like the story to end differently for him.",
          "Vizzhy opens today. Come with your question. Come with nothing. Ask the why that fifteen-minute visits never had the instruments for: Why is this happening to me — and what can we change?",
        ],
      },
    ],
  },
];
