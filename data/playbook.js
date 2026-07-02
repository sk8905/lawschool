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
  { id: "direct", title: "Direct Lending / Unitranche", short: "Direct Lending" },
  { id: "distressed", title: "Distressed & Special Situations", short: "Distressed" },
  { id: "structured", title: "Structured Credit", short: "Structured" },
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

  // ---- Direct Lending / Unitranche ----
  {
    id: "cl:dl-agl",
    doc: "direct",
    section: "Agreement among lenders",
    title: "Agreement among lenders (AGL) — first-out / last-out",
    purpose:
      "In a unitranche financing the single blended facility is split behind the scenes into first-out and last-out tranches via an agreement among lenders (AGL). The AGL — often not shown to the borrower — sets the payment waterfall, voting, standstill and buy-out rights between the first-out lender (often a bank RCF/first-out) and the last-out lender (the credit fund).",
    borrowerAsk:
      "Borrower typically sees only the blended rate and a single facility agreement; its interest is a clean single point of contact and no exposure to inter-lender disputes.",
    lenderPushback:
      "First-out lender wants payment and enforcement priority, control of key decisions and a buy-out right; last-out (fund) accepts subordination for higher yield but wants voting on fundamental terms and a buy-out option.",
    marketPosition:
      "AGL-based unitranche with first-out / last-out (sometimes plus a small 'skin' RCF) is standard in mid-market direct lending; the waterfall, voting splits and buy-out price are negotiated between the lenders, not the borrower.",
    draftingNotes:
      "The real priority sits in the AGL, not the facility agreement or any intercreditor the borrower sees — always ask for and review the AGL when advising a lender. Reconcile with the security-enforcement waterfall.",
    relatedCases: [],
    relatedTasks: ["C2", "C5"],
  },
  {
    id: "cl:dl-pik",
    doc: "direct",
    section: "Interest — PIK",
    title: "PIK & PIK-toggle interest",
    purpose:
      "Direct-lending and hybrid instruments frequently allow interest to be paid in kind (PIK) rather than cash, or to toggle between cash and PIK — preserving borrower liquidity in exchange for a higher rate and a compounding balance.",
    borrowerAsk:
      "PIK-toggle at the borrower's option, generous PIK for a defined period, and no cash-pay trigger tied to leverage.",
    lenderPushback:
      "PIK only in defined circumstances, a cash-pay switch as leverage improves, and pricing that compensates for the compounding and deferred cash.",
    marketPosition:
      "PIK and PIK-toggle features are common in unitranche, HoldCo and solutions/hybrid instruments; fully-PIK is priced materially wider than cash-pay.",
    draftingNotes:
      "Model the compounding — a PIK balance grows the exposure and reshapes recovery in a downside. Coordinate with the intercreditor if PIK debt sits behind senior cash-pay.",
    relatedCases: [],
    relatedTasks: ["C2", "C6"],
  },

  // ---- Distressed & Special Situations ----
  {
    id: "cl:ds-sacredrights",
    doc: "distressed",
    section: "Voting & minority protection",
    title: "Sacred rights, pro rata sharing & voting thresholds",
    purpose:
      "The provisions that protect minority lenders: 'sacred rights' requiring all-affected-lender (or unanimous) consent for changes to key terms, and pro rata sharing / ratable-treatment clauses. These are exactly what liability-management transactions try to work around.",
    borrowerAsk:
      "(Sponsor/borrower running an LME) a required-lender majority able to amend broadly, narrow sacred rights, and exceptions to pro rata sharing (open-market purchases, non-pro-rata new money) that permit uptiers and non-pro-rata exchanges.",
    lenderPushback:
      "Broad sacred rights — including making lien/claim subordination and pro rata sharing themselves all-lender matters — no open-market-purchase loophole, and anti-'majority-flip' protection against small incremental issuances changing the required-lender count.",
    marketPosition:
      "Post-Serta / Mitel / Incora, lenders increasingly negotiate explicit protection making priming/subordination and pro rata sharing sacred rights and tightening 'open market purchase'; sponsor-friendly docs still leave gaps.",
    draftingNotes:
      "The battleground is precisely which matters need all-affected-lender vs required-lender consent, and whether lien/payment subordination and pro rata sharing are sacred. Draft the 'open market purchase' definition tightly — that phrase did the work in Serta.",
    relatedCases: ["case:serta", "case:mitel", "case:incora"],
    relatedTasks: ["C5"],
  },
  {
    id: "cl:ds-unrestricted",
    doc: "distressed",
    section: "Unrestricted subsidiaries",
    title: "Unrestricted subsidiaries & drop-down capacity",
    purpose:
      "Unrestricted subsidiaries sit outside the covenant perimeter. Combined with investment and asset-transfer baskets, they enable 'drop-down' transactions (J.Crew) in which valuable assets — often IP — are moved beyond existing lenders' reach and used to raise new priming debt.",
    borrowerAsk:
      "Ability to designate unrestricted subsidiaries, generous investment / restricted-payment capacity to transfer assets to them, and freedom to raise debt at the unrestricted level secured on the transferred assets.",
    lenderPushback:
      "Restrict or remove unrestricted-subsidiary designation, blocker language preventing transfer of material IP / 'crown jewels', caps on investments into unrestricted subs, and a requirement that transferred assets remain guarantors/collateral (a 'J.Crew blocker').",
    marketPosition:
      "J.Crew blockers and material-IP transfer restrictions are now common lender asks; sponsor docs still preserve meaningful unrestricted-subsidiary and investment capacity. The aggregate leakage across baskets is the point.",
    draftingNotes:
      "Model the drop-down path end to end: designation → investment basket → asset transfer → new debt. A blocker on any one step defeats it. Reconcile with the EBITDA and basket definitions.",
    relatedCases: ["dev:lme-europe"],
    relatedTasks: ["C5"],
  },
  {
    id: "cl:ds-openmarket",
    doc: "distressed",
    section: "Buybacks",
    title: "Open-market purchases & non-pro-rata buybacks",
    purpose:
      "Exceptions permitting the borrower (or an affiliate) to buy back or exchange loans other than pro rata — including via 'open market purchases' — which uptier transactions have relied on to justify non-ratable treatment.",
    borrowerAsk:
      "A broad open-market-purchase and Dutch-auction buyback right exercisable non-pro-rata, usable by affiliates, without triggering pro rata sharing.",
    lenderPushback:
      "Define 'open market purchase' narrowly (a genuine secondary-market purchase, not a privately negotiated priming exchange), require pro rata offers, and disenfranchise debt held by the borrower/sponsor.",
    marketPosition:
      "Serta made the meaning of 'open market purchase' central; post-decision, lenders push to define it precisely and close the non-pro-rata exchange route. Buyback mechanics (Dutch auction vs open market) are negotiated.",
    draftingNotes:
      "This single defined term can decide an uptier's validity — draft it, and its interaction with pro rata sharing, deliberately. Consider disenfranchising debt held by the borrower/sponsor.",
    relatedCases: ["case:serta", "case:mitel"],
    relatedTasks: ["C5"],
  },
  {
    id: "cl:ds-newmoney",
    doc: "distressed",
    section: "New money",
    title: "Super-priority new money, priming & rescue financing",
    purpose:
      "Terms governing new money that primes existing debt — super-senior rescue financing, priming facilities and DIP-style funding — including whether existing lenders can be primed without consent and on what economics.",
    borrowerAsk:
      "Capacity to raise super-priority new money and prime existing lenders with required-lender (not all-lender) consent, generous priming baskets, and roll-up of participating lenders' existing debt.",
    lenderPushback:
      "Make priming/subordination a sacred right, cap priming baskets, require any new-money opportunity to be offered pro rata to all lenders, and resist roll-ups that reward only participating lenders.",
    marketPosition:
      "Pro rata new-money offers and priming-as-sacred-right are lender wins negotiated post-LME; sponsor docs preserve super-priority and roll-up flexibility. The fairness of the new-money allocation echoes the Part 26A cases.",
    draftingNotes:
      "Ties directly to the sacred-rights and pro rata provisions — priming without all-affected-lender consent is the crux. In an English restructuring the same fairness concern is policed under Part 26A (Adler/Petrofac).",
    relatedCases: ["case:serta", "case:incora", "case:adler", "case:petrofac"],
    relatedTasks: ["C5", "C6"],
  },
  {
    id: "cl:ds-l2o",
    doc: "distressed",
    section: "Transfers / loan-to-own",
    title: "Loan-to-own & debt-for-equity",
    purpose:
      "The mechanics by which a distressed-debt buyer converts a loan position into ownership — debt-for-equity swaps, credit bidding on enforcement, and control through a restructuring — the classic special-situations / loan-to-own play.",
    borrowerAsk:
      "(Incumbent sponsor) resists loss of control: change-of-control protection, limits on transfer of debt to competitors / loan-to-own funds, and consent rights on assignments.",
    lenderPushback:
      "(Distressed buyer) wants free transferability of the debt, ability to credit bid, and a clear path from a majority debt position to equity via enforcement or a restructuring plan.",
    marketPosition:
      "Transfer restrictions (disqualified-lender lists, competitor / loan-to-own-fund blocks) are negotiated up front precisely to control who can run a loan-to-own; credit-bidding and debt-for-equity via Part 26A are standard exit routes.",
    draftingNotes:
      "The assignment/transfer provisions and disqualified-lender list decide who can execute a loan-to-own — scrutinise them from both chairs. The exit typically runs through the intercreditor enforcement and Part 26A machinery.",
    relatedCases: ["case:adler", "case:petrofac", "case:sequana"],
    relatedTasks: ["C5"],
  },

  // ---- Structured Credit ----
  {
    id: "cl:sc-warehouse",
    doc: "structured",
    section: "Warehouse facility",
    title: "Warehouse facility (borrowing base)",
    purpose:
      "A warehouse facility funds the accumulation ('ramp') of loans or assets ahead of a CLO or securitisation take-out. It advances against a borrowing base — eligible assets times an advance rate — subject to eligibility criteria, concentration limits and a mark-to-market / margin-call mechanic.",
    borrowerAsk:
      "(Manager/sponsor) a high advance rate, broad eligibility, generous concentration limits, a long ramp/reinvestment period, and limited or no mark-to-market margin calls.",
    lenderPushback:
      "Conservative advance rates, tight eligibility and concentration limits, borrowing-base haircuts for ineligible/defaulted assets, and mark-to-market with margin calls or triggers on NAV decline.",
    marketPosition:
      "Advance-rate / borrowing-base warehouses with eligibility and concentration schedules and MTM triggers are standard for CLO ramps and asset-based private-credit facilities; the MTM / margin mechanics are the key risk negotiation.",
    draftingNotes:
      "The eligibility criteria and concentration limits are where credit risk is actually controlled — draft the schedules carefully and define the borrowing-base and MTM triggers precisely. Coordinate with the take-out (CLO/securitisation) timeline.",
    relatedCases: [],
    relatedTasks: ["C7"],
  },
  {
    id: "cl:sc-clotests",
    doc: "structured",
    section: "CLO coverage tests",
    title: "CLO coverage tests & reinvestment",
    purpose:
      "The core CLO indenture tests that protect noteholders: overcollateralisation (OC) and interest coverage (IC) tests, the reinvestment period, and portfolio-quality tests (WAL, WARF, diversity). A breach diverts cash from equity/junior notes to pay down senior notes.",
    borrowerAsk:
      "(Equity/manager) headroom in the OC/IC tests, a long reinvestment period, flexible portfolio-quality tests, and cure/trading flexibility to fix a breach.",
    lenderPushback:
      "(Senior noteholders) tight OC/IC triggers diverting cash to senior on breach, disciplined reinvestment criteria, and firm WAL / WARF / diversity limits.",
    marketPosition:
      "OC/IC coverage tests with cash-diversion on breach, a defined reinvestment period and standard portfolio-quality tests are the architecture of every CLO; levels are negotiated by tranche.",
    draftingNotes:
      "Understand how a failed OC test cascades down the waterfall — it is the senior noteholders' core protection and the equity's core risk. Model the interaction with the reinvestment criteria.",
    relatedCases: [],
    relatedTasks: ["C7"],
  },
  {
    id: "cl:sc-truesale",
    doc: "structured",
    section: "True sale",
    title: "True sale & recharacterisation",
    purpose:
      "For a securitisation to move assets (and their risk) off the originator's balance sheet, the transfer must be a 'true sale', not a disguised secured loan. Recharacterisation as a loan — or consolidation on the originator's insolvency — defeats the structure.",
    borrowerAsk:
      "(Originator) a clean true-sale opinion, retained servicing and limited recourse that does not undermine sale treatment, and off-balance-sheet accounting.",
    lenderPushback:
      "(Investors/arranger) robust true-sale and non-consolidation opinions, retained recourse / credit enhancement limited to what is consistent with a sale, and bankruptcy-remote SPV structuring.",
    marketPosition:
      "True-sale plus non-consolidation opinions, a bankruptcy-remote SPV and limited recourse are standard securitisation architecture; the degree of retained risk/enhancement is calibrated to preserve sale treatment and meet risk-retention rules.",
    draftingNotes:
      "The tension is real: enough enhancement/retention to sell the notes and meet retention rules, but not so much recourse that the 'sale' is recharacterised. Coordinate the true-sale analysis with risk retention and SRT accounting.",
    relatedCases: ["dev:uk-secreg"],
    relatedTasks: ["C8"],
  },
  {
    id: "cl:sc-riskretention",
    doc: "structured",
    section: "Risk retention",
    title: "Risk retention (5% skin in the game)",
    purpose:
      "Securitisation regulation requires the originator/sponsor to retain a material net economic interest (generally 5%) in the securitisation — 'skin in the game' — aligning incentives and satisfying the UK/EU retention rules.",
    borrowerAsk:
      "(Originator) flexibility on the form of retention (vertical, horizontal, L-shaped), retention at the most capital-efficient level, and reliance on a third-party retention holder where permitted.",
    lenderPushback:
      "(Investors) clear, compliant and disclosed retention that satisfies their own due-diligence duty, retention held by an eligible entity, and representations/undertakings that it will be maintained.",
    marketPosition:
      "5% retention (vertical or horizontal most common) with disclosure is mandatory under the UK Securitisation Regulation; the form and holder are structured for capital efficiency, and investors diligence compliance.",
    draftingNotes:
      "Investors have their own regulatory diligence duty, so retention must be documented and disclosed, not merely agreed. Reconcile the retention form with the SRT / true-sale and capital objectives.",
    relatedCases: ["dev:uk-secreg"],
    relatedTasks: ["C8", "D5"],
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
