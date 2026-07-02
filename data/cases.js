// Seed content for Module 2 — case law & market/regulatory developments.
// Read-only / git-tracked. User read/notes state overlays by id in localStorage;
// user-added entries live in localStorage["frp:custom"].
//
// Entry shape:
//   { id, type: 'case'|'lma'|'regulatory'|'market',
//     title, citation, court, date, category[],
//     holding, whyItMatters, links[], relatedClauses[] }

export const CATEGORIES = [
  "Restructuring / Part 26A",
  "Security & guarantees",
  "Directors' duties",
  "Interpretation & MAC",
  "Accessory liability",
  "Documentation",
  "Rates / RFR",
  "Sustainable finance",
  "Market structure",
];

export const CASES = [
  // ---- Restructuring / Part 26A cluster (top priority) ----
  {
    id: "case:adler",
    type: "case",
    title: "Re AGPS Bondco plc (Adler)",
    citation: "[2024] EWCA Civ 24",
    court: "Court of Appeal",
    date: "2024-01-23",
    category: ["Restructuring / Part 26A"],
    holding:
      "First Court of Appeal decision on a Part 26A restructuring plan with cross-class cram-down. The CoA set aside the sanction, holding that the plan wrongly departed from the pari passu principle by preserving the maturity ladder of the notes and allocating value in a way that was not justified. Established that the 'no worse off' test is a threshold, not the whole enquiry — the court retains a discretion over fair allocation of the benefits of the restructuring.",
    whyItMatters:
      "The foundational case for how English courts now police cross-class cram-down. It shifted the debate from 'is anyone worse off than in the relevant alternative' to 'is the distribution of the restructuring surplus fair'. Every subsequent plan is argued against Adler.",
    links: [],
    relatedClauses: ["cl:ic-enforcement"],
  },
  {
    id: "case:thameswater",
    type: "case",
    title: "Re Thames Water Utilities Holdings Ltd",
    citation: "[2025] EWCA Civ 475",
    court: "Court of Appeal",
    date: "2025-03-17",
    category: ["Restructuring / Part 26A"],
    holding:
      "Court of Appeal considered a high-profile emergency liquidity plan. The court addressed the correct identification of the 'relevant alternative', the treatment of new-money and priority financing, and the extent to which the court weighs the interests of dissenting classes and the public interest in a regulated utility. Sanction issues turned on the realistic counterfactual and the pricing of the interim facility.",
    whyItMatters:
      "Shows how the relevant-alternative counterfactual and new-money priority are litigated in a systemically important restructuring, and how far the court will scrutinise the cost of rescue financing. Directly relevant to advising lenders providing super-priority new money.",
    links: [],
    relatedClauses: ["cl:ic-ranking", "cl:ic-enforcement"],
  },
  {
    id: "case:petrofac",
    type: "case",
    title: "Re Petrofac Ltd",
    citation: "[2025] EWCA Civ 821",
    court: "Court of Appeal",
    date: "2025-06-24",
    category: ["Restructuring / Part 26A"],
    holding:
      "Court of Appeal overturned the sanction of a restructuring plan. Two themes: (1) genuine negotiation — the plan had been presented to creditors with insufficient real engagement, and (2) fair allocation — the benefits of the restructuring (including value attributable to the new-money opportunity) were not fairly shared with the dissenting classes who were being crammed down. Reinforces that sanction is not a rubber stamp.",
    whyItMatters:
      "The clearest recent statement that cross-class cram-down requires both genuine creditor engagement and a fair split of the restructuring surplus. It drove the September 2025 Practice Statement requiring pre-convening evidence of engagement. Essential reading before advising on any cram-down strategy.",
    links: [],
    relatedClauses: ["cl:ic-enforcement"],
  },
  {
    id: "case:waldorf",
    type: "case",
    title: "Re Waldorf (restructuring plan)",
    citation: "[2025] EWHC 2181",
    court: "High Court",
    date: "2025-08-01",
    category: ["Restructuring / Part 26A"],
    holding:
      "Sanction of a restructuring plan was refused at first instance. The court applied the post-Adler/Petrofac framework and found the plan did not satisfy the requirements for cross-class cram-down — issues around the fairness of allocation and/or the adequacy of the evidence and creditor engagement.",
    whyItMatters:
      "A first-instance refusal showing the higher bar in practice. Useful as the cautionary counterpoint to earlier plans that sailed through — the pendulum has swung toward scrutiny.",
    links: [],
    relatedClauses: [],
  },

  // ---- Security, guarantees, directors' duties ----
  {
    id: "case:walleredwards",
    type: "case",
    title: "Waller-Edwards v One Savings Bank plc",
    citation: "[2025] UKSC 22",
    court: "Supreme Court",
    date: "2025-06-11",
    category: ["Security & guarantees"],
    holding:
      "Supreme Court revisited the Etridge framework on undue influence and a lender's duty to take steps where a surety stands in a non-commercial relationship with the debtor. Addressed when a transaction puts the lender on inquiry (including in 'hybrid' part-commercial/part-personal borrowing) and what the bank must do to avoid being fixed with constructive notice.",
    whyItMatters:
      "The current word on protecting a guarantee/security package from undue-influence attack. Directly affects how you paper independent legal advice and diligence when an individual guarantees or charges assets for another's benefit.",
    links: [],
    relatedClauses: ["cl:sec-guarantee"],
  },
  {
    id: "case:sequana",
    type: "case",
    title: "BTI 2014 LLC v Sequana SA",
    citation: "[2022] UKSC 25",
    court: "Supreme Court",
    date: "2022-10-05",
    category: ["Directors' duties"],
    holding:
      "Supreme Court confirmed the existence of the 'creditor duty' — the modified duty of directors to consider or act in the interests of creditors as a company approaches insolvency. The duty is engaged when the company is insolvent, bordering on insolvency, or an insolvent liquidation/administration is probable; it is not triggered merely by a real risk of insolvency.",
    whyItMatters:
      "Sets the trigger for the creditor duty — central to advising sponsors and directors in the zone of insolvency, to intercreditor enforcement dynamics, and to any transaction that might later be attacked. Frequently paired with restructuring advice.",
    links: [],
    relatedClauses: ["cl:ic-enforcement"],
  },

  // ---- Accessory / director liability ----
  {
    id: "case:lifestyle",
    type: "case",
    title: "Lifestyle Equities CV v Ahmed",
    citation: "[2024] UKSC 17",
    court: "Supreme Court",
    date: "2024-05-15",
    category: ["Accessory liability"],
    holding:
      "Supreme Court held that a director is not automatically jointly liable as an accessory for a tort committed by the company; accessory liability requires knowledge of the essential facts making the act wrongful. Also limited an account of profits against an accessory to profits they personally made.",
    whyItMatters:
      "Shapes recovery strategy against the individuals behind corporate guarantors/obligors — you cannot assume the director is on the hook. Relevant to structuring guarantees and to assessing the real value of personal recourse.",
    links: [],
    relatedClauses: ["cl:sec-guarantee"],
  },
  {
    id: "case:luxfilms",
    type: "case",
    title: "LUX Films v Fowler",
    citation: "[2026] EWHC 963 (KB)",
    court: "High Court (KB)",
    date: "2026-04-01",
    category: ["Accessory liability"],
    holding:
      "High Court applied the Lifestyle Equities knowledge standard to a director/accessory claim, working through what degree of knowledge fixes an individual with liability for the company's wrong and how profits attributable to the accessory are assessed.",
    whyItMatters:
      "A recent worked application of the accessory-liability line — useful for pressure-testing recovery against directors behind a defaulting borrower or guarantor.",
    links: [],
    relatedClauses: ["cl:sec-guarantee"],
  },

  // ---- Interpretation & MAC ----
  {
    id: "case:woodcapita",
    type: "case",
    title: "Wood v Capita Insurance Services Ltd",
    citation: "[2017] UKSC 24",
    court: "Supreme Court",
    date: "2017-03-29",
    category: ["Interpretation & MAC"],
    holding:
      "Supreme Court confirmed that contractual interpretation is a unitary exercise balancing the language used against business common sense; textualism and contextualism are tools, not rival approaches. The more sophisticated the drafting and parties, the more weight the language bears.",
    whyItMatters:
      "The governing statement on how a finance document is construed. It underpins how any EoD, covenant or MAC is read — and is your first citation when a clause you drafted is being tested.",
    links: [],
    relatedClauses: ["cl:lev-mac", "cl:lev-covenants"],
  },
  {
    id: "case:rainysky",
    type: "case",
    title: "Rainy Sky SA v Kookmin Bank",
    citation: "[2011] UKSC 50",
    court: "Supreme Court",
    date: "2011-11-02",
    category: ["Interpretation & MAC"],
    holding:
      "Where a clause is open to rival meanings, the court may prefer the construction most consistent with business common sense. Established the commercial-sense tie-breaker later refined in Wood v Capita.",
    whyItMatters:
      "The other half of the interpretation pairing — cited whenever a rate, guarantee or bond wording is ambiguous. Know both, and know that Wood clarified rather than displaced it.",
    links: [],
    relatedClauses: ["cl:lev-mac"],
  },

  // ---- Market & regulatory developments (log as entries) ----
  {
    id: "dev:lma-refresh",
    type: "lma",
    title: "LMA documentation refreshes + LMA.Automate",
    citation: "—",
    court: "LMA",
    date: "2025-01-01",
    category: ["Documentation"],
    holding:
      "The LMA continues to refresh its suite (leveraged, REF, investment grade, intercreditor, RFR-native rate mechanics) and has launched LMA.Automate, an AI-augmented document-automation platform with a free member tier that produces first drafts from the LMA templates.",
    whyItMatters:
      "The template you last drafted from has moved on, and first drafts are increasingly machine-generated. Staying current on the refreshed forms — and knowing how LMA.Automate produces a draft — is part of re-owning the drafting seat.",
    links: [],
    relatedClauses: ["cl:lev-covenants", "cl:lev-interest"],
  },
  {
    id: "dev:sustainable-2025",
    type: "regulatory",
    title: "GLP / SLP / SLLP updated (March 2025)",
    citation: "—",
    court: "LMA / APLMA / LSTA",
    date: "2025-03-01",
    category: ["Sustainable finance"],
    holding:
      "The Green Loan Principles, Social Loan Principles and Sustainability-Linked Loan Principles were refreshed in March 2025, tightening expectations on KPI/SPT selection, external review, and reporting to address greenwashing concerns.",
    whyItMatters:
      "Sustainable-lending features (margin ratchets, KPIs, declassification) are now standard asks. You need the current principles to draft or negotiate them and to advise on greenwashing/declassification risk.",
    links: [],
    relatedClauses: [],
  },
  {
    id: "dev:libor-rfr",
    type: "regulatory",
    title: "LIBOR→RFR transition completed",
    citation: "—",
    court: "FCA / working groups",
    date: "2024-09-30",
    category: ["Rates / RFR"],
    holding:
      "The transition from LIBOR to risk-free rates (SONIA, SOFR) is complete. Compounded-in-arrears conventions, credit adjustment spreads, lookback/observation shift and RFR-native fallback drafting are now the market standard in loan documentation.",
    whyItMatters:
      "Rate clauses no longer look the way they did when you last drafted from scratch. You should be able to explain a compounded-SONIA interest clause and its fallbacks cold.",
    links: [],
    relatedClauses: ["cl:lev-interest"],
  },
  {
    id: "dev:navgrowth",
    type: "market",
    title: "Fund finance & NAV growth",
    citation: "—",
    court: "Market",
    date: "2025-01-01",
    category: ["Market structure"],
    holding:
      "Fund finance has grown sharply, with NAV facilities in particular scaling up (record NAV fund closes of ~$12.9bn reported in 2025) alongside the established subscription-line market.",
    whyItMatters:
      "NAV finance is a high-growth product adjacent to your existing strengths. Understanding subscription vs NAV structures widens your addressable partner practice.",
    links: [],
    relatedClauses: [],
  },
  {
    id: "dev:privatecredit-fsb",
    type: "market",
    title: "Private credit growth & FSB scrutiny",
    citation: "—",
    court: "FSB / regulators",
    date: "2026-01-01",
    category: ["Market structure"],
    holding:
      "Private credit / direct lending has grown to roughly $1.5–2tn, with unitranche and agreement-among-lenders structures and documentation drifting from the LMA template. Regulators (FSB) have increased scrutiny of the sector's systemic footprint into 2026.",
    whyItMatters:
      "Private credit is where much finance work now sits and where doc conventions differ from bank-syndicated deals. The regulatory attention is a live watch-list item for the 2026 horizon.",
    links: [],
    relatedClauses: ["cl:ic-ranking"],
  },
];
