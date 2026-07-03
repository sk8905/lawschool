// Seed content for Module 1 — the 12-week refresher plan.
// Read-only / git-tracked. User progress overlays by task id in localStorage.
//
// Task shape:
//   { id, workstream, week, effort, title, detail, resources[],
//     relatedCases[], relatedClauses[] }
//
// workstream ids map to WORKSTREAMS below (A–E).
// effort is a rough hours estimate for the week's rep.

export const WORKSTREAMS = [
  {
    id: "A",
    title: "Documentation & Drafting",
    short: "Drafting",
    color: "#2f6f4f",
    summary:
      "The core. In-house you reviewed and negotiated; as partner you own the draft and the precedent. This stream is drafting reps, not reading — mark-ups, term sheets, CP lists, reconciled against what's market.",
  },
  {
    id: "B",
    title: "Case Law & Currency",
    short: "Currency",
    color: "#3a5a8c",
    summary:
      "Close the ~5-year gap: Part 26A restructuring, lending/security/guarantee cases, interpretation and MAC. Build a weekly habit so currency maintains itself.",
  },
  {
    id: "C",
    title: "Product Breadth",
    short: "Breadth",
    color: "#8c5a2f",
    summary:
      "Widen from RE-deep to the full finance product set: leveraged/acquisition, corporate/IG + RCFs, fund finance (subscription + NAV), direct lending/unitranche, distressed & special situations / solutions capital (liability management, priming, loan-to-own, hybrid), and structured credit (CLOs, warehouses, securitisation/SRT).",
  },
  {
    id: "D",
    title: "Regulatory & Risk",
    short: "Reg/Risk",
    color: "#7a3a6a",
    summary:
      "LIBOR→RFR completion, sanctions doc mechanics, Basel 3.1, NSIA, and the 2026 reg-change horizon — the framework the documents now sit inside.",
  },
  {
    id: "E",
    title: "Partner Transition",
    short: "Partner",
    color: "#6a6a2f",
    summary:
      "The non-legal partner gap: origination/BD off warm buy-side relationships, running matters and P&L, conflicts/engagement risk, and supervising leverage.",
  },
];

export const TASKS = [
  // ---- Workstream A — Documentation & Drafting ----
  {
    id: "A1",
    workstream: "A",
    week: 1,
    effort: 4,
    title: "Re-anchor to the LMA Real Estate Finance facility (home turf)",
    detail:
      "Start where you are strongest. Re-read the LMA REF agreement end to end, annotating what has changed since you last drafted from scratch. This is the warm-up rep that rebuilds the muscle before you move to leveraged.",
    resources: [
      "LMA Real Estate Finance facility agreement (member portal)",
      "Practical Law — Real estate finance: overview",
    ],
    relatedCases: [],
    relatedClauses: ["cl:ref-security", "cl:ref-cashsweep"],
  },
  {
    id: "A2",
    workstream: "A",
    week: 2,
    effort: 6,
    title: "Mark up an LMA leveraged agreement — borrower side",
    detail:
      "Take the LMA leveraged facility and mark it as if acting for a sponsor: push covenants toward cov-lite, widen baskets, maximise EBITDA add-backs, MFN sunset, portability on change of control. The goal is to re-learn where the give is.",
    resources: [
      "LMA leveraged facilities agreement",
      "Practical Law — Leveraged finance: overview",
      "Wright, Handbook of International Loan Documentation",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-covenants", "cl:lev-ebitda", "cl:lev-mfn", "cl:lev-baskets", "cl:lev-portability"],
  },
  {
    id: "A3",
    workstream: "A",
    week: 3,
    effort: 6,
    title: "Mark up the same leveraged agreement — lender side",
    detail:
      "Now flip. Mark the same document for the arranger/lenders: tighten leakage, close basket free-riders, defend against EBITDA inflation, hold MFN. Comparing your two mark-ups is the single most valuable rep — it re-teaches 'what's market' from both chairs.",
    resources: [
      "LMA leveraged facilities agreement (your borrower mark-up from A2)",
      "LexisNexis Banking & Finance — leveraged commentary",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-covenants", "cl:lev-ebitda", "cl:lev-mfn", "cl:lev-baskets"],
  },
  {
    id: "A4",
    workstream: "A",
    week: 4,
    effort: 5,
    title: "Draft a term sheet + CP list from a cold fact pattern",
    detail:
      "Given a one-paragraph deal (sponsor acquiring a mid-market target, unitranche, certain funds), draft a term sheet and conditions precedent list from scratch. This is the partner-seat rep: producing the precedent, not reviewing someone else's.",
    resources: [
      "Practical Law — Term sheet (leveraged) standard document",
      "LMA form of confidentiality and term sheet",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-certainfunds"],
  },
  {
    id: "A5",
    workstream: "A",
    week: 6,
    effort: 6,
    title: "Work through an LMA intercreditor agreement",
    detail:
      "Intercreditor is where RE, leveraged and restructuring meet. Map ranking, payment waterfall, turnover, standstill, release provisions and enforcement control. Note where super-senior/RCF, senior secured notes and mezz/second-lien change the shape.",
    resources: [
      "LMA intercreditor agreement (super senior / senior secured)",
      "Practical Law — Intercreditor agreements: overview",
    ],
    relatedCases: ["case:sequana"],
    relatedClauses: ["cl:ic-ranking", "cl:ic-standstill", "cl:ic-turnover", "cl:ic-enforcement", "cl:ic-release"],
  },
  {
    id: "A6",
    workstream: "A",
    week: 8,
    effort: 4,
    title: "Reconcile your drafting against 'what's market'",
    detail:
      "Take your A2/A3 mark-ups and A4 term sheet and reconcile every material position against Practical Law 'What's Market' and recent LexisNexis deal points. Build a personal 'market position' note per clause — this becomes your negotiating reference as a partner.",
    resources: [
      "Practical Law — What's Market (loans)",
      "LexisNexis Banking & Finance — market trackers",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-covenants", "cl:lev-baskets", "cl:lev-mfn"],
  },
  {
    id: "A7",
    workstream: "A",
    week: 10,
    effort: 4,
    title: "Draft security package + review LMA.Automate",
    detail:
      "Draft (or heavily mark up) a debenture and a share charge; note perfection, negative pledge interaction and the Beale framework for taking security. Separately, trial LMA.Automate (free member tier, AI-augmented doc automation) to see how first drafts are now produced.",
    resources: [
      "Beale, The Law of Security and Title-Based Financing",
      "LMA.Automate (member tier)",
      "Practical Law — Taking security: overview",
    ],
    relatedCases: [],
    relatedClauses: ["cl:sec-debenture", "cl:sec-negpledge"],
  },
  {
    id: "A8",
    workstream: "A",
    week: 9,
    effort: 4,
    title: "Draft the pricing & payments mechanics",
    detail:
      "Work through the money-mechanics clauses that decide economics and remedies: margin ratchet, sustainability-linked ratchet, tax gross-up / increased costs, default interest and break costs, and the defaulting-lender / yank-the-bank / snooze-you-lose machinery. Draft each from the illustrative wording in the playbook and reconcile default interest against Cavendish v Makdessi.",
    resources: [
      "LMA facility agreement — interest, tax and lender provisions",
      "Practical Law — Margin ratchets; Default interest",
    ],
    relatedCases: ["case:makdessi"],
    relatedClauses: [
      "cl:lev-marginratchet",
      "cl:lev-esg",
      "cl:lev-taxgrossup",
      "cl:lev-defaultinterest",
      "cl:lev-defaulting",
    ],
  },

  // ---- Workstream B — Case Law & Currency ----
  {
    id: "B1",
    workstream: "B",
    week: 1,
    effort: 3,
    title: "Read the Part 26A restructuring cluster",
    detail:
      "Top-priority currency gap. Read Adler, Thames Water, Petrofac and Waldorf as a set — the arc from cross-class cram-down being available to the Court of Appeal policing genuine negotiation and fair allocation of the restructuring surplus.",
    resources: [
      "Re AGPS Bondco plc (Adler) [2024] EWCA Civ 24",
      "Thames Water [2025] EWCA Civ 475",
      "Petrofac [2025] EWCA Civ 821",
      "Waldorf [2025] EWHC 2181",
    ],
    relatedCases: ["case:adler", "case:thameswater", "case:petrofac", "case:waldorf"],
    relatedClauses: ["cl:ic-enforcement"],
  },
  {
    id: "B2",
    workstream: "B",
    week: 2,
    effort: 2,
    title: "Log the Sept-2025 Practice Statement change",
    detail:
      "Read the September 2025 Practice Statement on pre-convening evidence of creditor engagement for cross-class cram-down. Understand what a convening court now expects to see, and how it changes early-stage restructuring strategy.",
    resources: ["Practice Statement (Sept 2025) — schemes and Part 26A plans"],
    relatedCases: ["case:petrofac"],
    relatedClauses: [],
  },
  {
    id: "B3",
    workstream: "B",
    week: 3,
    effort: 2,
    title: "Guarantees, undue influence & creditor duty",
    detail:
      "Read Waller-Edwards v One Savings Bank (Etridge revisited) and BTI v Sequana (the creditor duty) together — the two cases that most affect how you take guarantees and how directors behave in the zone of insolvency.",
    resources: [
      "Waller-Edwards v One Savings Bank [2025] UKSC 22",
      "BTI 2014 LLC v Sequana SA [2022] UKSC 25",
    ],
    relatedCases: ["case:walleredwards", "case:sequana"],
    relatedClauses: ["cl:sec-guarantee"],
  },
  {
    id: "B4",
    workstream: "B",
    week: 5,
    effort: 2,
    title: "Accessory / director liability line",
    detail:
      "Read Lifestyle Equities v Ahmed and LUX Films v Fowler on accessory and director liability. Relevant to recovery strategy against individuals behind guarantors and to how you advise on personal exposure.",
    resources: [
      "Lifestyle Equities v Ahmed [2024] UKSC 17",
      "LUX Films v Fowler [2026] EWHC 963 (KB)",
    ],
    relatedCases: ["case:lifestyle", "case:luxfilms"],
    relatedClauses: ["cl:sec-guarantee"],
  },
  {
    id: "B5",
    workstream: "B",
    week: 6,
    effort: 2,
    title: "Contract interpretation & MAC refresher",
    detail:
      "Re-read Wood v Capita and Rainy Sky on interpretation, and the Covid-era MAC / drawstop commentary. This is the lens through which every EoD and condition is now read — essential before you rely on a MAC in a term sheet.",
    resources: [
      "Wood v Capita Insurance Services [2017] UKSC 24",
      "Rainy Sky SA v Kookmin Bank [2011] UKSC 50",
      "Practical Law — Material adverse change clauses",
    ],
    relatedCases: ["case:woodcapita", "case:rainysky"],
    relatedClauses: ["cl:lev-mac"],
  },
  {
    id: "B6",
    workstream: "B",
    week: 4,
    effort: 1,
    title: "Set up the weekly currency habit",
    detail:
      "Stand up a repeatable routine so currency maintains itself: JIBFL, LexisNexis B&F case tracker + weekly highlights, Practical Law 'What's Market', and 2–3 magic-circle / US-elite finance & R&I client-alert subscriptions. Block 30 minutes every Friday.",
    resources: [
      "Journal of International Banking and Financial Law (JIBFL)",
      "LexisNexis B&F case tracker",
      "Practical Law — What's Market",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "B7",
    workstream: "B",
    week: 5,
    effort: 2,
    title: "Fixed vs floating & taking security (Spectrum)",
    detail:
      "Re-anchor the security-law fundamentals your drafting depends on: Spectrum Plus on fixed-vs-floating characterisation (control over the proceeds of book debts) and its consequences for priority, the prescribed part and administration expenses. Tie it back to how you draft and operate account and debenture security.",
    resources: [
      "Re Spectrum Plus Ltd [2005] UKHL 41",
      "Beale, The Law of Security and Title-Based Financing",
    ],
    relatedCases: ["case:spectrum"],
    relatedClauses: ["cl:sec-debenture", "cl:sec-accounts"],
  },
  {
    id: "B8",
    workstream: "B",
    week: 6,
    effort: 2,
    title: "Penalties, default interest & strict interpretation",
    detail:
      "Read Cavendish v Makdessi (the modern penalty rule) and Arnold v Britton (clear words govern) together — the two cases that most affect default-interest / fee clauses and how tightly your drafting is read. Pair with the default-interest & remedies clause in the playbook.",
    resources: [
      "Cavendish Square Holding BV v Makdessi [2015] UKSC 67",
      "Arnold v Britton [2015] UKSC 36",
    ],
    relatedCases: ["case:makdessi", "case:arnold"],
    relatedClauses: ["cl:lev-defaultinterest"],
  },
  {
    id: "B9",
    workstream: "B",
    week: 1,
    effort: 2,
    title: "Part 26A foundations (DeepOcean → Great Annual Savings)",
    detail:
      "Before the Adler/Petrofac appeals, read the first-instance arc that built the restructuring-plan jurisprudence: DeepOcean (first cross-class cram-down), Virgin Active (out-of-the-money creditors crammed down), Houst (first SME plan; HMRC) and Great Annual Savings (sanction refused). This is the base layer the Court of Appeal cases refine.",
    resources: [
      "Re DeepOcean 1 UK Ltd [2021] EWHC 138 (Ch)",
      "Re Virgin Active Holdings Ltd [2021] EWHC 1246 (Ch)",
      "Re Houst Ltd [2022] EWHC 1765 (Ch)",
      "Re Great Annual Savings Co Ltd [2023] EWHC 1141 (Ch)",
    ],
    relatedCases: ["case:deepocean", "case:virginactive", "case:houst", "case:gas"],
    relatedClauses: ["cl:ic-enforcement"],
  },
  {
    id: "B10",
    workstream: "B",
    week: 2,
    effort: 2,
    title: "Cross-border recognition & the Gibbs rule",
    detail:
      "Understand why English governing law and an English process matter in international restructurings: the rule in Gibbs (English-law debt not discharged by a foreign proceeding), its modern confirmation in Bakhshiyeva, and gategroup (a Part 26A plan is an insolvency proceeding for jurisdiction). Essential when advising on cross-border deals and enforcement.",
    resources: [
      "Antony Gibbs & Sons v La Société Industrielle (1890) 25 QBD 399",
      "Bakhshiyeva v Sberbank of Russia [2018] EWCA Civ 2802",
      "Re gategroup Guarantee Ltd [2021] EWHC 304 (Ch)",
    ],
    relatedCases: ["case:gibbs", "case:bakhshiyeva", "case:gategroup"],
    relatedClauses: ["cl:ic-enforcement"],
  },

  // ---- Workstream C — Product Breadth ----
  {
    id: "C1",
    workstream: "C",
    week: 5,
    effort: 4,
    title: "Fund finance: subscription vs NAV",
    detail:
      "Learn the two poles of fund finance. Subscription (capital-call) lines secured on undrawn commitments vs NAV facilities secured on the underlying portfolio value. Note the record ~$12.9bn NAV fund closes in 2025 and why NAV is the growth story.",
    resources: [
      "Practical Law — Fund finance: overview",
      "LMA fund finance documentation notes",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "C2",
    workstream: "C",
    week: 7,
    effort: 4,
    title: "Private credit / direct lending & doc drift",
    detail:
      "Map the ~$1.5–2tn private-credit market: unitranche, agreement among lenders (AGL), and the drift of direct-lending docs away from the LMA template. Understand where a private-credit unitranche differs from a bank-syndicated leveraged deal.",
    resources: [
      "Practical Law — Direct lending / unitranche",
      "LexisNexis — Agreement among lenders (AGL)",
    ],
    relatedCases: [],
    relatedClauses: ["cl:ic-ranking"],
  },
  {
    id: "C3",
    workstream: "C",
    week: 9,
    effort: 3,
    title: "Leveraged / acquisition: certain funds mechanics",
    detail:
      "Drill into acquisition-finance specifics: certain-funds periods, clean-up periods, SPA/interconditionality, and the limited conditionality lenders accept on a public bid. Ties directly to the term sheet you drafted in A4.",
    resources: [
      "Practical Law — Certain funds",
      "Fuller, Corporate Borrowing: Law and Practice",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-certainfunds"],
  },
  {
    id: "C4",
    workstream: "C",
    week: 11,
    effort: 3,
    title: "Sustainable finance documentation",
    detail:
      "Get current on the March-2025 refresh of the Green Loan Principles, Social Loan Principles and Sustainability-Linked Loan Principles (GLP/SLP/SLLP). Understand KPI/SPT mechanics, sustainability margin ratchets, and greenwashing/declassification risk.",
    resources: [
      "LMA Green / Social / Sustainability-Linked Loan Principles (Mar 2025)",
      "Practical Law — Sustainable finance",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "C5",
    workstream: "C",
    week: 7,
    effort: 5,
    title: "Distressed & special situations: liability management",
    detail:
      "Get current on the liability-management toolkit that now dominates distressed credit: uptier / priming transactions (Serta), drop-down asset transfers to unrestricted subsidiaries (J.Crew), non-pro-rata exchanges, super-priority new money and loan-to-own. Understand both how they are executed and how existing lenders defend against them — from both chairs, given your buy-side seat.",
    resources: [
      "Practical Law — Liability management transactions",
      "Serta Simmons / Mitel / Incora commentary",
      "LMA / LSTA notes on lender protections",
    ],
    relatedCases: ["case:serta", "case:mitel", "case:incora"],
    relatedClauses: ["cl:ds-sacredrights", "cl:ds-unrestricted", "cl:ds-openmarket", "cl:ds-newmoney", "cl:ds-l2o"],
  },
  {
    id: "C6",
    workstream: "C",
    week: 9,
    effort: 4,
    title: "Solutions / capital solutions (hybrid capital)",
    detail:
      "Map the 'capital solutions' space your buy-side seat touched: preferred equity, HoldCo PIK, structured equity and rescue financing that sit between senior debt and common equity. Understand the documentation, ranking and PIK mechanics of hybrid instruments and where they compete with NAV finance and direct lending.",
    resources: [
      "Practical Law — Preferred equity / structured equity",
      "LexisNexis — Holdco PIK and hybrid instruments",
    ],
    relatedCases: ["case:sequana"],
    relatedClauses: ["cl:dl-pik", "cl:ds-newmoney", "cl:ic-ranking"],
  },
  {
    id: "C7",
    workstream: "C",
    week: 8,
    effort: 5,
    title: "Structured credit: CLOs & warehouse facilities",
    detail:
      "Learn the structured-credit stack: CLO mechanics (warehouse, ramp-up, reinvestment period, WAL/WARF, OC/IC coverage tests, note tranching and equity) and the warehouse facilities that fund the ramp. Understand the manager, the indenture and the key tests that govern the vehicle.",
    resources: [
      "Practical Law — CLOs: overview",
      "Warehouse facility / borrowing-base documentation notes",
    ],
    relatedCases: [],
    relatedClauses: ["cl:sc-warehouse", "cl:sc-clotests"],
  },
  {
    id: "C8",
    workstream: "C",
    week: 10,
    effort: 4,
    title: "Securitisation & significant risk transfer (SRT)",
    detail:
      "Cover the securitisation toolkit: true sale vs synthetic structures, significant-risk-transfer (SRT) trades that free bank capital under Basel 3.1, risk retention, STS treatment, and forward-flow / receivables financing. A high-growth area adjacent to private credit where buy-side experience is rare and valuable.",
    resources: [
      "Practical Law — Securitisation: overview",
      "Practical Law — Significant risk transfer (SRT)",
    ],
    relatedCases: ["dev:uk-secreg", "dev:srt-growth"],
    relatedClauses: ["cl:sc-truesale", "cl:sc-riskretention"],
  },

  // ---- Workstream D — Regulatory & Risk ----
  {
    id: "D1",
    workstream: "D",
    week: 2,
    effort: 3,
    title: "LIBOR→RFR: the completed transition",
    detail:
      "The transition is done — get current on the endpoint. SONIA/SOFR compounding conventions, credit adjustment spreads (CAS), lookback/observation shift, and the fallback drafting that is now standard. You should be able to explain a rate clause cold.",
    resources: [
      "Practical Law — Risk-free rates (RFRs): overview",
      "LMA compounded/term RFR facility documentation",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-interest"],
  },
  {
    id: "D2",
    workstream: "D",
    week: 4,
    effort: 3,
    title: "Sanctions: post-2022 doc mechanics",
    detail:
      "Understand how sanctions clauses hardened after 2022: representations, undertakings, mandatory prepayment on a sanctioned lender/borrower, blocker language and OFSI licensing interaction. Know what you can and cannot give under English law.",
    resources: [
      "OFSI guidance",
      "Practical Law — Sanctions provisions in finance documents",
    ],
    relatedCases: [],
    relatedClauses: ["cl:lev-sanctions"],
  },
  {
    id: "D3",
    workstream: "D",
    week: 8,
    effort: 2,
    title: "Basel 3.1 & NSIA touchpoints",
    detail:
      "Understand the two frameworks that most affect your clients' behaviour: Basel 3.1 endgame (bank capital, pricing, appetite) and the National Security and Investment Act screening that can gate acquisition finance. Enough to spot the issue, not to advise standalone.",
    resources: [
      "Practical Law — Basel 3.1",
      "Practical Law — National Security and Investment Act 2021",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "D5",
    workstream: "D",
    week: 11,
    effort: 2,
    title: "Securitisation Regulation & risk retention",
    detail:
      "Get current on the UK Securitisation Regulation regime (the 2024 onshored/reformed framework: risk retention, due-diligence, transparency and STS) and its Basel 3.1 capital interaction. The regulatory frame around all structured-credit and SRT work.",
    resources: [
      "Practical Law — UK Securitisation Regulation",
      "PRA / FCA securitisation rules (in force Nov 2024)",
    ],
    relatedCases: ["dev:uk-secreg"],
    relatedClauses: ["cl:sc-riskretention"],
  },
  {
    id: "D4",
    workstream: "D",
    week: 12,
    effort: 2,
    title: "Scan the 2026 reg-change horizon",
    detail:
      "Close the plan by scanning what's coming: private-credit systemic scrutiny (FSB into 2026), further RFR/term-rate developments, and any LMA doc refreshes on the horizon. Convert into a short 'watch list' you keep in the Case Law tracker.",
    resources: [
      "FSB — non-bank financial intermediation reports",
      "LMA news / documentation updates",
    ],
    relatedCases: ["dev:privatecredit-fsb"],
    relatedClauses: [],
  },

  // ---- Workstream E — Partner Transition ----
  {
    id: "E1",
    workstream: "E",
    week: 3,
    effort: 3,
    title: "Draft a 12-month BD / origination plan",
    detail:
      "Your buy-side/credit-committee network is the rare asset. Map warm relationships (funds, sponsors, arrangers you sat across from) into a 12-month origination plan: who, what they need, what you can bring, and a realistic contact cadence.",
    resources: [
      "Firm BD templates (once you have a home)",
      "Your own relationship map from 4.5 years principal-side",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "E2",
    workstream: "E",
    week: 7,
    effort: 2,
    title: "Matter economics: budgeting, leverage, lock-up",
    detail:
      "Re-learn the P&L side of running matters as a partner: scoping and budgeting a deal, staffing leverage (associate mix), realisation, WIP and lock-up. In-house you were the client; now you own the margin.",
    resources: [
      "Practical guides on law-firm matter management",
      "Conversations with your future practice-group head",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "E3",
    workstream: "E",
    week: 9,
    effort: 2,
    title: "Conflicts, engagement & risk as an owner",
    detail:
      "As a partner you carry conflicts and engagement risk. Refresh on conflict checks across a lender/sponsor client base, engagement-letter scope, and supervising associates. Especially important given you'll act for parties you previously sat opposite.",
    resources: [
      "SRA Standards and Regulations",
      "Firm risk / conflicts policy (once onboarded)",
    ],
    relatedCases: [],
    relatedClauses: [],
  },
  {
    id: "E4",
    workstream: "E",
    week: 12,
    effort: 2,
    title: "Consolidate: your partner positioning narrative",
    detail:
      "Close the 12 weeks by writing your own positioning: buy-side credit-committee experience + re-acquired drafting seat + product breadth. Frame the last decade as a differentiator (rare in partners), not a gap to apologise for. This is your pitch.",
    resources: ["Your outputs from workstreams A–E"],
    relatedCases: [],
    relatedClauses: [],
  },
];
