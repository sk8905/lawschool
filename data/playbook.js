// Seed content for Module 4 — drafting / negotiation playbook.
// Read-only / git-tracked. User notes overlay by clause id in localStorage;
// user-added clauses live in localStorage["frp:custom"].
//
// Clause shape:
//   { id, doc: 'ig'|'leveraged'|'ref'|'intercreditor'|'security',
//     section, title, purpose, borrowerAsk, lenderPushback,
//     marketPosition, draftingNotes, relatedCases[], relatedTasks[] }

export const DOCS = [
  { id: "leveraged", title: "Leveraged Facilities", short: "Leveraged" },
  { id: "intercreditor", title: "Intercreditor Agreement", short: "Intercreditor" },
  { id: "ig", title: "Investment Grade / RCF", short: "IG / RCF" },
  { id: "ref", title: "Real Estate Finance", short: "REF" },
  { id: "security", title: "Security & Guarantees", short: "Security" },
];

export const CLAUSES = [
  // ---- Leveraged ----
  {
    id: "cl:lev-covenants",
    doc: "leveraged",
    section: "Financial covenants",
    title: "Financial covenants (cov-lite vs cov-loose)",
    purpose:
      "Give lenders an early-warning and control mechanism tied to the credit's performance — historically leverage, interest cover, cashflow cover and capex maintenance covenants tested each period.",
    borrowerAsk:
      "Sponsor pushes for cov-lite (no maintenance covenant; only an incurrence-based springing leverage covenant tested on RCF drawdown above a threshold), generous headroom over the base case, equity cure rights, and few/no capex or cashflow covenants.",
    lenderPushback:
      "Arranger wants at least a springing leverage covenant with meaningful headroom discipline, tight equity-cure limits (frequency, over-cure, cap on cures counted), and clarity that a cure does not deem the covenant met for baskets/ratios elsewhere.",
    marketPosition:
      "Large-cap sponsor-led European leveraged deals are predominantly cov-lite with a springing RCF covenant; mid-market and private-credit unitranche often retain one or two maintenance covenants. Equity cures are near-universal but capped in number and effect.",
    draftingNotes:
      "Watch the cure mechanics: define what the cure amount may be applied to (debt paydown vs deemed EBITDA), whether it flows into leverage for baskets, and the over-cure prohibition. Interpretation is construed per Wood v Capita — draft the springing trigger precisely.",
    relatedCases: ["case:woodcapita"],
    relatedTasks: ["A2", "A3", "A6"],
  },
  {
    id: "cl:lev-ebitda",
    doc: "leveraged",
    section: "Definitions — EBITDA",
    title: "EBITDA & add-backs",
    purpose:
      "EBITDA is the denominator/numerator for leverage, cover and most baskets. Its definition effectively sizes the borrower's capacity to incur debt, make distributions and grow baskets.",
    borrowerAsk:
      "Broad add-backs: run-rate cost synergies and 'anticipated' savings (often uncapped or capped high, with a long realisation horizon), pro forma treatment of acquisitions, exceptional/non-recurring items, and management projections.",
    lenderPushback:
      "Cap synergy/cost-saving add-backs (e.g. a percentage of EBITDA and a realisation longstop, e.g. 18–24 months), require reasonable-basis certification, and limit pro forma adjustments to identifiable, factually supportable items.",
    marketPosition:
      "Add-back caps (commonly a fixed % of EBITDA) with a realisation period are market in larger deals; uncapped run-rate add-backs are aggressive and a key negotiation flashpoint. Private credit tends to police EBITDA harder than broadly-syndicated.",
    draftingNotes:
      "This is the single most consequential definition — every basket and ratio breathes through it. Reconcile the add-back cap against the covenant headroom you conceded elsewhere; they compound.",
    relatedCases: [],
    relatedTasks: ["A2", "A3"],
  },
  {
    id: "cl:lev-mfn",
    doc: "leveraged",
    section: "Incremental facilities — MFN",
    title: "MFN (most-favoured-nation) protection",
    purpose:
      "Protects existing lenders from being primed on pricing when the borrower raises incremental/pari debt: if new debt prices above existing margin plus a threshold, the existing margin is adjusted up ('yield protection').",
    borrowerAsk:
      "A generous MFN threshold (e.g. 75–100bps), and — critically — an MFN 'sunset' so the protection falls away after a period (commonly 6–12 months), plus carve-outs (different maturity, currency, acquisition debt) that escape MFN entirely.",
    lenderPushback:
      "Resist the sunset or push it out; narrow the carve-outs; ensure MFN captures all-in yield (OID, fees) not just margin; keep the threshold tight (e.g. 50bps).",
    marketPosition:
      "50bps MFN with a 6–12 month sunset is common in large-cap; no-sunset MFN is a lender win now rarer in borrower-friendly markets. Carve-outs for different-maturity or acquisition debt are heavily negotiated.",
    draftingNotes:
      "Define 'all-in yield' carefully (include OID amortised over life, upfront fees) or the protection is easily arbitraged. Track the sunset date as a diarised event.",
    relatedCases: [],
    relatedTasks: ["A2", "A3", "A6"],
  },
  {
    id: "cl:lev-baskets",
    doc: "leveraged",
    section: "Negative covenants — baskets",
    title: "Baskets & builder / grower baskets",
    purpose:
      "Baskets are the permitted-exceptions to negative covenants (debt, liens, restricted payments, investments, disposals). They define how much leakage and flexibility the borrower has without lender consent.",
    borrowerAsk:
      "Large fixed baskets plus 'grower' baskets (greater of a fixed amount and a % of EBITDA/total assets), a builder/available-amount basket that grows with cumulative retained cashflow, generous reclassification between baskets, and 'no default' rather than 'no EoD' conditions.",
    lenderPushback:
      "Cap grower baskets, tighten the builder-basket build (start at nil, condition on a leverage test), restrict free reclassification, and require no-default (not just no-EoD) plus pro forma ratio compliance to use the more sensitive baskets.",
    marketPosition:
      "Grower baskets are standard; builder baskets keyed to 50% of cumulative consolidated net income (plus specified inclusions) are common. The aggregate capacity across baskets — the 'basket stack' — is what matters, and lenders increasingly model it in aggregate.",
    draftingNotes:
      "Never negotiate a basket in isolation — model the aggregate capacity (fixed + grower + builder + general RP) and how baskets feed each other via reclassification. This is where value leaks in a downside.",
    relatedCases: [],
    relatedTasks: ["A2", "A3", "A6"],
  },
  {
    id: "cl:lev-portability",
    doc: "leveraged",
    section: "Change of control",
    title: "Portability (change-of-control exception)",
    purpose:
      "A change of control is normally a mandatory prepayment/EoD event. Portability lets the facilities survive a change of control (i.e. a sale of the borrower group) if conditions are met, preserving in-place financing for the next buyer.",
    borrowerAsk:
      "Portability subject only to a leverage test at or below closing leverage, no ratings condition, usable more than once, and a wide definition of permitted acquirer.",
    lenderPushback:
      "Tight leverage condition (below opening leverage), a single use, a ratings floor, and exclusion of change to a materially weaker or sanctioned sponsor.",
    marketPosition:
      "Portability appears in stronger-credit large-cap deals in borrower-friendly windows; it is far from universal and is a genuine sponsor 'win'. Conditions (leverage test, single use) are the negotiation.",
    draftingNotes:
      "Interacts with the mandatory-prepayment and EoD stack — make sure a ported deal doesn't inadvertently trip another provision. Confirm sanctions/KYC on the incoming sponsor.",
    relatedCases: [],
    relatedTasks: ["A2"],
  },
  {
    id: "cl:lev-mac",
    doc: "leveraged",
    section: "Representations / EoD",
    title: "Material adverse change (MAC)",
    purpose:
      "A MAC provision lets a lender decline to fund (drawstop) or call default where a material adverse change occurs in the borrower's business, financial condition or ability to perform. A backstop against unforeseen deterioration.",
    borrowerAsk:
      "Narrow, objective MAC tied to ability to perform payment obligations, no forward-looking/prospects limb, and disapplication during certain-funds; ideally no MAC drawstop at all on a committed deal.",
    lenderPushback:
      "Retain a MAC drawstop and MAC EoD with a 'prospects' or 'ability to perform obligations under the finance documents' limb, though lenders accept it is hard to invoke.",
    marketPosition:
      "MAC is rarely successfully invoked and is disapplied during certain-funds. Its practical value is as leverage, not a reliable exit. Covid-era commentary reinforced how high the bar is to call a MAC.",
    draftingNotes:
      "Construed per Wood v Capita / Rainy Sky — the language bears real weight, so a vague MAC is close to unusable. If you need certainty, use specific financial-covenant triggers, not MAC.",
    relatedCases: ["case:woodcapita", "case:rainysky"],
    relatedTasks: ["A2", "B5"],
  },
  {
    id: "cl:lev-certainfunds",
    doc: "leveraged",
    section: "Conditions / acquisition",
    title: "Certain funds",
    purpose:
      "For acquisition finance (especially public bids), 'certain funds' ensures the lender cannot decline to fund during the offer period except on a very limited list of major defaults/reps, giving the bidder deal certainty required by takeover rules.",
    borrowerAsk:
      "Long certain-funds period, a short 'major representations' and 'major defaults' list, and clean-up periods post-closing so integration issues don't trip defaults immediately.",
    lenderPushback:
      "Adequate but bounded certain-funds period, ensure the major-default list still catches insolvency/illegality/unlawfulness, and reasonable (not open-ended) clean-up periods.",
    marketPosition:
      "Certain funds is mandatory in practice for public bids (Takeover Code) and standard for private acquisitions. The negotiation is the length of the period, the major-rep/default list and clean-up mechanics.",
    draftingNotes:
      "Cross-check the major-default list against the SPA conditionality — the financing conditionality should not exceed the acquisition conditionality, or the bidder is exposed.",
    relatedCases: [],
    relatedTasks: ["A4", "C3"],
  },
  {
    id: "cl:lev-interest",
    doc: "leveraged",
    section: "Interest",
    title: "Interest — compounded RFR mechanics",
    purpose:
      "Post-LIBOR, interest is set by reference to a risk-free rate (SONIA/SOFR) compounded in arrears, plus a credit adjustment spread where relevant, plus margin. Defines how the cost of the loan is actually calculated.",
    borrowerAsk:
      "Borrower-friendly conventions: a lookback/observation shift that eases operational burden, floors at zero only (no CAS gross-up), and clean fallback waterfall if the RFR is unavailable.",
    lenderPushback:
      "Standard compounding conventions with the market lookback (e.g. 5 banking days), clear break-cost and market-disruption fallbacks, and a robust rate-fallback waterfall.",
    marketPosition:
      "Compounded-in-arrears SONIA/SOFR with a 5-day lookback (observation shift) is now standard; the LIBOR transition is complete and legacy fallback language has largely dropped away.",
    draftingNotes:
      "Know the mechanics cold — compounding method, lookback vs observation shift, CAS, zero floor, and the fallback waterfall. The LMA has RFR-native forms; don't retrofit old LIBOR wording.",
    relatedCases: [],
    relatedTasks: ["D1"],
  },
  {
    id: "cl:lev-sanctions",
    doc: "leveraged",
    section: "Reps / undertakings",
    title: "Sanctions provisions",
    purpose:
      "Sanctions reps, undertakings and (sometimes) mandatory prepayment protect lenders from exposure to sanctioned parties and jurisdictions, and manage the tension between different sanctions regimes.",
    borrowerAsk:
      "Materiality and knowledge qualifiers, carve-outs where compliance with the sanctions rep would breach EU Blocking Regulation, and narrow scope (target the borrower group, not every counterparty).",
    lenderPushback:
      "Robust reps and undertakings, ability to require prepayment/transfer if a lender becomes sanctioned or the borrower is caught, and OFSI-licensing cooperation.",
    marketPosition:
      "Sanctions drafting hardened materially after 2022. Blocker language, prepayment-on-sanctioned-lender and OFSI mechanics are now standard; scope and blocking-regulation carve-outs are the negotiation.",
    draftingNotes:
      "Be alert to conflicts between US/UK/EU regimes and the EU Blocking Regulation — an unqualified rep can be unlawful to give. Coordinate with OFSI licensing guidance.",
    relatedCases: [],
    relatedTasks: ["D2"],
  },

  // ---- Intercreditor ----
  {
    id: "cl:ic-ranking",
    doc: "intercreditor",
    section: "Ranking & priority",
    title: "Ranking and priority of debt",
    purpose:
      "Establishes the order of priority between super-senior (RCF/hedging), senior secured, second-lien/mezzanine and shareholder debt — both as to payment and as to the proceeds of enforcement.",
    borrowerAsk:
      "Flexibility to incur additional pari or junior debt within agreed parameters, permitted-payment baskets to junior creditors while senior is outstanding.",
    lenderPushback:
      "Clear, hard priority; limits on additional pari debt; controlled permitted payments to junior/shareholder debt that switch off on default.",
    marketPosition:
      "Super-senior RCF + senior secured notes/TLB + second lien/mezz is a common European structure; unitranche uses an agreement among lenders (AGL) to carve first-out/last-out economics within a single facility.",
    draftingNotes:
      "In unitranche, the real ranking lives in the AGL, which lenders may keep confidential from the borrower — know where the priority actually sits. Reconcile ranking with the security-enforcement waterfall.",
    relatedCases: ["case:thameswater"],
    relatedTasks: ["A5", "C2"],
  },
  {
    id: "cl:ic-standstill",
    doc: "intercreditor",
    section: "Standstill",
    title: "Junior creditor standstill",
    purpose:
      "On a default, junior creditors are subject to a standstill: they cannot accelerate or enforce for a defined period, giving senior creditors first control of the workout.",
    borrowerAsk:
      "(Borrower is largely indifferent; the negotiation is senior vs junior.) Group prefers structures that avoid triggering cross-defaults and preserve stability.",
    lenderPushback:
      "Senior wants long standstill periods (commonly 90–179 days stepped by default type), junior wants shorter periods and permitted-enforcement exceptions (e.g. insolvency).",
    marketPosition:
      "Stepped standstill periods (e.g. 90/120/150/179 days depending on the nature of the default) are standard, with insolvency of an obligor typically lifting the standstill.",
    draftingNotes:
      "Align standstill expiry with senior's realistic enforcement timeline. Watch the interaction with the creditor duty (Sequana) — directors' behaviour in the standstill window is scrutinised.",
    relatedCases: ["case:sequana"],
    relatedTasks: ["A5"],
  },
  {
    id: "cl:ic-turnover",
    doc: "intercreditor",
    section: "Turnover",
    title: "Turnover of receipts",
    purpose:
      "Requires a junior creditor who receives a payment in breach of the priority/standstill regime to turn it over to the senior creditors, preserving the agreed waterfall notwithstanding leakage.",
    borrowerAsk:
      "N/A (senior/junior issue).",
    lenderPushback:
      "Senior wants broad turnover (all recoveries in breach, including set-off and enforcement proceeds) held on trust; junior wants carve-outs for permitted payments and to avoid turning over amounts received when no default subsisted.",
    marketPosition:
      "Broad turnover held on trust for senior is standard; the negotiation is the carve-outs for permitted payments and the trust mechanics.",
    draftingNotes:
      "Ensure the turnover is drafted as a trust (proprietary claim survives junior's insolvency) not merely a contractual debt. Coordinate with the payment-waterfall and permitted-payments definitions.",
    relatedCases: [],
    relatedTasks: ["A5"],
  },
  {
    id: "cl:ic-enforcement",
    doc: "intercreditor",
    section: "Enforcement",
    title: "Enforcement control & instructing group",
    purpose:
      "Determines who controls enforcement of the shared security — the 'instructing group' — and how the security agent acts, including the standstill on junior enforcement and any option for junior to buy out senior.",
    borrowerAsk:
      "N/A directly; borrower cares about stability and a controlled process.",
    lenderPushback:
      "Senior (or super-senior in some structures) wants to control enforcement and direct the security agent; junior wants consultation rights, a value-maximisation duty on enforcement, and buy-out/option rights.",
    marketPosition:
      "Senior-controlled enforcement with a duty to obtain a fair price (often supported by a financial-adviser opinion) is standard; junior buy-out options and consultation periods are negotiated. Restructuring-plan dynamics (Adler/Petrofac) now loom over any enforcement strategy.",
    draftingNotes:
      "The enforcement waterfall and the restructuring-plan alternative interact: post-Adler/Petrofac, a plan may reallocate the surplus the intercreditor waterfall assumes. Advise on both routes together.",
    relatedCases: ["case:adler", "case:petrofac", "case:sequana", "case:thameswater"],
    relatedTasks: ["A5", "B1"],
  },
  {
    id: "cl:ic-release",
    doc: "intercreditor",
    section: "Releases",
    title: "Release of guarantees & security on enforcement/disposal",
    purpose:
      "Allows the security agent, on an enforcement sale or permitted disposal, to release guarantees and security from junior claims so a clean asset/business can be sold — critical to realising value.",
    borrowerAsk:
      "N/A directly.",
    lenderPushback:
      "Senior wants wide release powers on distressed disposals (including releasing junior claims and guarantees) subject to fair-value/competitive-process conditions; junior wants those conditions to be robust to prevent value transfer.",
    marketPosition:
      "Release powers conditioned on a public auction / competitive process or a financial adviser's fair-value opinion are standard, reflecting the case-law concern about protecting junior value.",
    draftingNotes:
      "The fair-value condition is what makes the release defensible — tie it to a genuine process. This is exactly the fairness concern the restructuring cases (Adler/Petrofac) police in the plan context.",
    relatedCases: ["case:adler", "case:petrofac"],
    relatedTasks: ["A5"],
  },

  // ---- Investment Grade / RCF ----
  {
    id: "cl:ig-covenants",
    doc: "ig",
    section: "Covenants",
    title: "IG / RCF covenant package (light touch)",
    purpose:
      "Investment-grade and corporate RCF facilities run a deliberately light covenant package — reflecting the borrower's credit quality — often just a single financial covenant (or none) plus standard reps and information undertakings.",
    borrowerAsk:
      "No financial maintenance covenant (or a single leverage/interest-cover covenant with wide headroom), minimal restrictions on the business, clean-up on ratings-based pricing grids.",
    lenderPushback:
      "At least an interest-cover or leverage covenant, a negative pledge, and pari passu / disposal restrictions; ratings-based margin grid to price migration risk.",
    marketPosition:
      "IG RCFs are covenant-light with a ratings/leverage margin grid, negative pledge and pari passu; often undrawn backstop facilities. Sustainability-linked margin ratchets are increasingly standard.",
    draftingNotes:
      "The negative pledge and pari passu are doing most of the protective work here — draft them carefully because there is little else. Coordinate the margin grid with any sustainability ratchet.",
    relatedCases: [],
    relatedTasks: [],
  },

  // ---- Real Estate Finance ----
  {
    id: "cl:ref-security",
    doc: "ref",
    section: "Security",
    title: "REF security package",
    purpose:
      "Real estate finance security centres on a first legal mortgage/charge over the property, assignment of rents, insurances and hedging, a charge over the propco shares and accounts, and often a duty-of-care deed with the managing agent.",
    borrowerAsk:
      "Limit recourse to the propco/asset (non-recourse to sponsor), permitted disposals of individual assets from a portfolio with release, and flexibility on property management.",
    lenderPushback:
      "Full asset security, tight release conditions (release price / LTV retest on disposal), control over leasing and material contracts, and rent/insurance assignments perfected.",
    marketPosition:
      "Non-recourse propco financing with a full property-level security package is standard REF structure; portfolio deals negotiate individual-asset release pricing and LTV/debt-yield retests.",
    draftingNotes:
      "This is home turf — use it to re-anchor. The perfection and priority mechanics feed directly into the intercreditor and enforcement analysis if there is mezzanine.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },
  {
    id: "cl:ref-cashsweep",
    doc: "ref",
    section: "Cash management",
    title: "Cash sweep, DSCR & cash trap",
    purpose:
      "REF cash-management covenants (LTV, debt yield, DSCR/ICR) trigger cash traps and cash sweeps: on covenant deterioration, excess rental cash is trapped in a blocked account or swept to prepay, protecting the lender before an EoD.",
    borrowerAsk:
      "Wide covenant headroom, cure rights (deposit/prepay to cure LTV), release of trapped cash on cure, and distributions permitted while covenants are met.",
    lenderPushback:
      "Tight LTV/DSCR triggers, stepped cash-trap then cash-sweep then EoD, limited cure frequency, and no distributions once a trap is triggered.",
    marketPosition:
      "Layered LTV/debt-yield/DSCR triggers driving cash trap → sweep → default is standard REF structure; cure rights and the mechanics of releasing trapped cash are the negotiation.",
    draftingNotes:
      "Sequence the triggers so the lender gets cash control well before an EoD — the cash trap is the real protection, not acceleration. Define the account waterfall precisely.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },

  // ---- Security & Guarantees ----
  {
    id: "cl:sec-debenture",
    doc: "security",
    section: "Debenture",
    title: "Debenture / all-assets security",
    purpose:
      "A debenture takes fixed and floating security over all the assets and undertaking of an English obligor, supporting the ability to appoint an administrator and to enforce across the business.",
    borrowerAsk:
      "Carve-outs for operationally necessary dealings (permitted disposals in the ordinary course), and floating rather than fixed charge over trading assets to preserve flexibility.",
    lenderPushback:
      "Maximise fixed-charge assets (better priority and control), tight permitted-dealings, and ensure qualifying-floating-charge status for administrator appointment.",
    marketPosition:
      "All-assets debenture with fixed charges over key assets (real estate, shares, IP, key receivables/accounts) and a floating charge over the rest is standard for English corporate security.",
    draftingNotes:
      "Fixed vs floating characterisation turns on the degree of control over the asset (Spectrum Plus line) — draft and, crucially, operate the account controls consistently or a 'fixed' charge is recharacterised as floating.",
    relatedCases: [],
    relatedTasks: ["A7"],
  },
  {
    id: "cl:sec-negpledge",
    doc: "security",
    section: "Negative pledge",
    title: "Negative pledge",
    purpose:
      "Prevents the borrower from granting security to other creditors (or restricts it to permitted liens), preserving the lender's relative position and the value of an unsecured or lightly-secured claim.",
    borrowerAsk:
      "Wide permitted-lien basket (existing security, purchase-money/finance leases, netting/set-off in the ordinary course, a general basket), and flexibility for future secured financings.",
    lenderPushback:
      "Narrow permitted liens, a modest general basket, and an equal-and-rateable-sharing clause if security is granted to others.",
    marketPosition:
      "Negative pledge with a defined permitted-liens list and a capped general basket is universal; it does most of the protective work in unsecured IG facilities.",
    draftingNotes:
      "In an unsecured deal this clause is the security. Size the permitted-liens general basket against the debt baskets — leakage compounds across both.",
    relatedCases: [],
    relatedTasks: ["A7"],
  },
  {
    id: "cl:sec-guarantee",
    doc: "security",
    section: "Guarantees",
    title: "Guarantee & indemnity",
    purpose:
      "Upstream/cross-stream guarantees from group members give the lender recourse across the corporate group; the indemnity limb backstops situations where the guarantee itself is unenforceable.",
    borrowerAsk:
      "Guarantee limitations to respect corporate-benefit, financial-assistance and capital-maintenance constraints in each jurisdiction; release of guarantors on permitted disposals; caps on guaranteed amounts where local law requires.",
    lenderPushback:
      "Widest enforceable guarantee coverage, minimal limitations beyond what local law strictly requires, and a robust indemnity limb so a defective guarantee still bites.",
    marketPosition:
      "Guarantor coverage tested against an agreed guarantor-coverage threshold (e.g. % of group EBITDA/assets) with jurisdiction-specific limitation language is standard.",
    draftingNotes:
      "Watch undue influence where an individual guarantees for another's benefit (Waller-Edwards / Etridge — paper independent legal advice). Recovery against directors behind a guarantor is constrained by the accessory-liability line (Lifestyle Equities).",
    relatedCases: ["case:walleredwards", "case:lifestyle", "case:luxfilms"],
    relatedTasks: ["B3", "B4"],
  },
];
