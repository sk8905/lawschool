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

  // ==== Additional leveraged clauses ====
  {
    id: "cl:lev-mandprepay",
    doc: "leveraged",
    section: "Mandatory prepayment",
    title: "Mandatory prepayments & cash sweep",
    purpose:
      "Requires prepayment from defined sources — excess cashflow (the cash sweep), net disposal and insurance proceeds, and the proceeds of an IPO or further debt — capturing value for lenders before it leaks to equity.",
    borrowerAsk:
      "Low or nil excess-cashflow (ECF) sweep, or a leverage-based grid stepping to 0% below a leverage threshold; generous reinvestment rights for disposal/insurance proceeds; de minimis thresholds; and exclusion of equity-cure and available amounts from swept cash.",
    lenderPushback:
      "A meaningful ECF sweep (e.g. 50% stepping down with leverage), tight reinvestment periods and purpose limits, and prepayment of disposal proceeds that are not reinvested — applied across tranches pro rata / in inverse order.",
    marketPosition:
      "ECF sweeps with leverage-based step-downs (often to nil at or inside opening leverage) are market in cov-lite large-cap; reinvestment rights for disposal proceeds are standard. Mid-market and private-credit sweeps are tighter.",
    draftingNotes:
      "Define 'Excess Cashflow' and its deductions carefully (capex, permitted payments, voluntary prepayment credits) — it is heavily engineered. Reconcile reinvestment rights with the disposal covenant and baskets.",
    relatedCases: [],
    relatedTasks: ["A2", "A3"],
  },
  {
    id: "cl:lev-incremental",
    doc: "leveraged",
    section: "Incremental facilities",
    title: "Incremental / accordion facilities",
    purpose:
      "Lets the borrower raise additional debt (incremental term loans, incremental equivalent debt or an accordion) up to agreed limits without new-lender consent, to fund acquisitions and growth. The MFN clause protects existing lenders on pricing.",
    borrowerAsk:
      "A large 'free-and-clear' fixed/grower incremental amount plus unlimited amounts subject only to a leverage ratio (ratio incrementals), MFN and inside-maturity sunsets, and flexibility to incur as pari, junior or unsecured.",
    lenderPushback:
      "Cap the free-and-clear amount, require pro forma leverage compliance (and no default) for ratio incrementals, hold MFN with limited/no sunset, and restrict incremental to pari secured unless properly subordinated.",
    marketPosition:
      "Free-and-clear (greater of £X and Y% of EBITDA) plus unlimited ratio-based incremental at or inside opening leverage is standard large-cap, with 50bps / 6–12-month MFN. It compounds with the baskets and MFN provisions.",
    draftingNotes:
      "Model total incurrence headroom across incremental, ratio debt and the general debt basket together. Watch 'inside maturity' limits and the most-favoured-lender interplay.",
    relatedCases: [],
    relatedTasks: ["A2", "A6"],
  },
  {
    id: "cl:lev-rp",
    doc: "leveraged",
    section: "Negative covenants — restricted payments",
    title: "Restricted payments (dividends & distributions)",
    purpose:
      "Restricts dividends, distributions, junior-debt prepayments and other leakage to equity/affiliates, preserving cash in the credit group — the counterpart to the debt and investment covenants.",
    borrowerAsk:
      "Generous fixed/grower RP basket, a builder/available-amount basket usable for RPs, RPs permitted subject only to no-EoD and a leverage test, and carve-outs (tax distributions, management equity, ordinary-course intra-group).",
    lenderPushback:
      "Tight RP capacity, builder-basket RPs conditioned on inside-leverage and no default, and no leakage to junior creditors or sponsor while leverage is high.",
    marketPosition:
      "Grower RP baskets plus a builder basket keyed to cumulative retained cashflow, gated by a leverage ratio, are market in cov-lite deals. Lenders model aggregate leakage across the RP, investment and junior-prepayment baskets.",
    draftingNotes:
      "Never size RP capacity in isolation — value leaks through whichever of the RP / investment / debt baskets is loosest. Cap tax-distribution and management-equity carve-outs and keep them genuine.",
    relatedCases: [],
    relatedTasks: ["A2", "A3", "A6"],
  },
  {
    id: "cl:lev-transfers",
    doc: "leveraged",
    section: "Assignments & transfers",
    title: "Transfers, white lists & disqualified lenders",
    purpose:
      "Governs how lenders transfer their loans — consent rights, minimum amounts, and lists of permitted (white list) or barred (disqualified/DQ list) transferees — controlling who ends up in the syndicate, especially in a downside.",
    borrowerAsk:
      "Borrower consent to transfers (not unreasonably withheld) while no default, a broad disqualified-lender list (competitors and loan-to-own / distressed funds), and disenfranchisement of DQ lenders and affiliates.",
    lenderPushback:
      "Free transferability, consent deemed given after a period, no consent to other lenders/affiliates or on an EoD, and a narrow DQ list fixed at signing so secondary buyers are not trapped.",
    marketPosition:
      "Borrower consent (deemed) while solvent, plus a DQ list covering named competitors and — increasingly — distressed / loan-to-own funds, is market. Consent typically falls away on an EoD so lenders can exit.",
    draftingNotes:
      "The DQ list and consent-on-default mechanics decide who can build a blocking or loan-to-own stake — scrutinise from both chairs (see the Distressed playbook). Snapshot the list at a defined date.",
    relatedCases: [],
    relatedTasks: ["A2", "C5"],
  },

  // ==== Additional IG / RCF clauses ====
  {
    id: "cl:ig-financial",
    doc: "ig",
    section: "Financial covenants",
    title: "IG financial covenant (leverage / interest cover)",
    purpose:
      "A single (or no) maintenance covenant tested quarterly — typically net leverage or interest cover — reflecting investment-grade or strong-corporate quality. The main quantitative discipline in an otherwise light package.",
    borrowerAsk:
      "One covenant only (often interest cover), wide headroom, a generous EBITDA definition, an equity cure, and an acquisition leverage spike with a defined step-down.",
    lenderPushback:
      "A leverage covenant with sensible headroom, capped acquisition spikes, tighter EBITDA than leveraged, and limits on cure frequency.",
    marketPosition:
      "IG RCFs carry a single net-leverage or interest-cover covenant (or none for true IG), tested quarterly, alongside a ratings/leverage margin grid. Definitions are far tighter than leveraged EBITDA.",
    draftingNotes:
      "With little else in the package, this covenant plus the negative pledge and pari passu do the protective work. Align the acquisition spike with the margin grid and any mandatory prepayment.",
    relatedCases: [],
    relatedTasks: [],
  },
  {
    id: "cl:ig-coc",
    doc: "ig",
    section: "Change of control",
    title: "Change of control (lender put)",
    purpose:
      "On a change of control the facilities become repayable — usually a lender put / option to cancel and be prepaid rather than an automatic EoD — reflecting that lenders underwrote a particular ownership and credit.",
    borrowerAsk:
      "An individual lender put (not automatic acceleration), a consultation/cure period, carve-outs for permitted reorganisations, a narrow definition, and (in stronger credits) portability.",
    lenderPushback:
      "Prompt repayment on any change of control, a tight definition (including 'acting in concert' and permitted holders), and no portability absent a leverage test and sanctions/KYC on the incomer.",
    marketPosition:
      "A lender-by-lender put with a short window is standard in IG/corporate; automatic EoD is more leveraged-style, and portability is rare in IG.",
    draftingNotes:
      "Draft the CoC definition precisely (percentage thresholds, concert parties, permitted holders) and coordinate with mandatory prepayment and any portability carve-out.",
    relatedCases: [],
    relatedTasks: [],
  },
  {
    id: "cl:ig-ancillary",
    doc: "ig",
    section: "Facilities & utilisation",
    title: "RCF utilisation, ancillary & swingline facilities",
    purpose:
      "Governs how a revolving facility is drawn, rolled and repaid, and the ancillary facilities (overdraft, guarantee, letters of credit, swingline) that banks provide within the RCF commitment for day-to-day liquidity.",
    borrowerAsk:
      "Flexible utilisation (short notice, multiple currencies), large ancillary/swingline baskets, rollover of revolving loans without re-testing conditions, and a clean-up on the repeating representations.",
    lenderPushback:
      "Conditions to each utilisation (no default, reps true), ancillary caps within the commitment, cash cover on cancellation, and a defined swingline sublimit with same-day mechanics.",
    marketPosition:
      "RCFs with ancillary-facility baskets (overdraft / BG / LC / swingline) carved out of the total commitment are standard; the negotiation is the ancillary basket size and the utilisation conditions.",
    draftingNotes:
      "Ensure ancillary facilities share security and guarantees rateably and are treated (often super-senior) in the intercreditor. Watch which 'major representations' are repeated at rollover.",
    relatedCases: [],
    relatedTasks: [],
  },

  // ==== Additional real estate finance clauses ====
  {
    id: "cl:ref-ltv",
    doc: "ref",
    section: "Financial covenants",
    title: "Loan-to-value (LTV) covenant & valuations",
    purpose:
      "Caps the loan as a percentage of the property's market value, tested against periodic valuations — the core solvency covenant in REF. Breach triggers cash trap / cure and ultimately default.",
    borrowerAsk:
      "A high LTV threshold with headroom, infrequent valuations with borrower input on the valuer, cure by prepayment or deposit (with release on cure), and no 'valuation on demand' except on default.",
    lenderPushback:
      "Conservative LTV, lender-instructed valuations at least annually (and on default, at the borrower's cost), cure limited in frequency, and de-risking via cash trap before the covenant breaks.",
    marketPosition:
      "Senior LTV covenants (commonly 55–65%, asset/tenant-dependent) with lender-instructed valuations and cure rights are standard; the cure mechanics and valuation frequency/control are negotiated.",
    draftingNotes:
      "Define 'Market Value' by reference to the RICS Red Book and specify who instructs and pays for valuations. Sequence LTV with the cash-trap and debt-yield covenants so cash control precedes default.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },
  {
    id: "cl:ref-debtyield",
    doc: "ref",
    section: "Financial covenants",
    title: "Debt yield / interest cover (ICR / DSCR)",
    purpose:
      "Income-based covenants — interest cover (ICR), debt-service cover (DSCR) and debt yield — test rental income against debt service, protecting against income decline even where capital value holds.",
    borrowerAsk:
      "Headroom on ICR/DSCR, projected (not just historical) income counted, gross-up for rent-free/void periods with committed leases, and cure by deposit.",
    lenderPushback:
      "Both historical and projected tests, exclusion of uncontracted/short income, tenant-concentration and lease-expiry haircuts, and cash trap on deterioration.",
    marketPosition:
      "Layered ICR/DSCR and debt-yield covenants alongside LTV are standard; the treatment of projected income, voids and tenant concentration is the negotiation, especially for multi-let assets.",
    draftingNotes:
      "Specify the income basis (passing vs contracted vs projected rent), void/rent-free adjustments and tenant-concentration limits. These feed directly into the cash-sweep waterfall.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },
  {
    id: "cl:ref-disposals",
    doc: "ref",
    section: "Disposals",
    title: "Permitted disposals & release pricing (portfolio)",
    purpose:
      "In a multi-asset REF, governs sales of individual properties: the release price (portion of loan repaid on sale), the LTV/debt-yield retest of the remaining pool, and prepayment of net proceeds.",
    borrowerAsk:
      "Release at par (100% of the allocated loan amount) or a modest premium, active-management flexibility to sell or substitute, and reinvestment of proceeds into the portfolio.",
    lenderPushback:
      "A release price above the allocated loan amount (e.g. 110–125%) to de-lever the pool on each sale, a post-disposal LTV/debt-yield test, and mandatory prepayment of net proceeds.",
    marketPosition:
      "Release pricing at a premium to the allocated loan amount, with a retest of the remaining pool, is standard portfolio REF structure; the premium and retest levels are negotiated.",
    draftingNotes:
      "Set the Allocated Loan Amount per property and a release premium so the pool de-levers as the best assets are sold (cherry-picking protection). Coordinate with the cash-sweep and LTV covenants.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },
  {
    id: "cl:ref-recourse",
    doc: "ref",
    section: "Recourse",
    title: "Non-recourse & recourse carve-outs (bad-boy guarantees)",
    purpose:
      "REF is typically non-recourse to the sponsor, with recourse limited to the property/propco — save for 'recourse carve-outs' (bad-boy guarantees) where sponsor misconduct (fraud, misapplication of rents, unpermitted transfers, voluntary insolvency) triggers partial or full recourse.",
    borrowerAsk:
      "True non-recourse, a short objective carve-out list limited to wilful/bad-faith acts, loss-only (not springing full) recourse, and exclusion of matters outside the sponsor's control.",
    lenderPushback:
      "A robust carve-out list (misappropriation of rents/insurance, waste, unpermitted encumbrance/transfer, fraud, voluntary insolvency = full springing recourse), backed by a creditworthy guarantor.",
    marketPosition:
      "Non-recourse propco financing with a negotiated bad-boy carve-out guarantee is standard; the scope of carve-outs and loss-vs-springing recourse is the key negotiation.",
    draftingNotes:
      "Distinguish 'loss' carve-outs (recourse for the loss caused) from 'springing' carve-outs (full recourse). Keep the springing list to genuinely egregious acts and confirm the guarantor's covenant strength.",
    relatedCases: [],
    relatedTasks: ["A1"],
  },
  {
    id: "cl:ref-hedging",
    doc: "ref",
    section: "Hedging",
    title: "Interest-rate hedging",
    purpose:
      "REF (and leveraged) facilities usually require floating-rate exposure to be hedged (cap or swap) for a minimum notional and period, protecting debt service against rate rises. The hedge counterparty shares the security.",
    borrowerAsk:
      "A cap (limited downside, no mark-to-market liability) rather than a swap, hedging a portion of the loan, flexibility on counterparty, and no super-senior hedge on enforcement.",
    lenderPushback:
      "Hedge a high proportion (often 80–100%) of the loan for the term via an approved counterparty on standard ISDA terms, with the hedge ranking in the security waterfall.",
    marketPosition:
      "Caps are common in REF (no MTM break cost); swaps more common in leveraged. Minimum hedged notional/percentage and term, and the hedge counterparty's ranking, are the negotiation.",
    draftingNotes:
      "Reconcile the hedging requirement with the intercreditor waterfall (hedge close-out amounts, super-senior treatment). A cap avoids swap break costs on prepayment — relevant to the mandatory-prepayment analysis.",
    relatedCases: [],
    relatedTasks: ["A1", "D1"],
  },

  // ==== Additional security & guarantee clauses ====
  {
    id: "cl:sec-principles",
    doc: "security",
    section: "Security & guarantee principles",
    title: "Agreed security & guarantee principles",
    purpose:
      "A schedule that calibrates the security/guarantee package across jurisdictions — respecting corporate benefit, financial assistance, capital maintenance, cost/materiality thresholds and thin-cap/tax limits — so obligors give only enforceable, cost-justified security.",
    borrowerAsk:
      "Broad principles: materiality thresholds for guarantors and assets, no security where cost/time is disproportionate or where it triggers financial-assistance/whitewash burdens, and generous limitation language.",
    lenderPushback:
      "Guarantor-coverage tests (e.g. a percentage of group EBITDA/assets), key assets always secured, and limitations no wider than local law strictly requires.",
    marketPosition:
      "Agreed security principles with a guarantor-coverage threshold and materiality carve-outs are standard in cross-border leveraged deals; the coverage percentage and thresholds are negotiated.",
    draftingNotes:
      "These principles govern every local-law security document, so they cap what the whole package delivers — get them right up front. Coordinate with the guarantee limitation language and local counsel.",
    relatedCases: [],
    relatedTasks: ["A7", "A2"],
  },
  {
    id: "cl:sec-share",
    doc: "security",
    section: "Share security",
    title: "Share charge / pledge",
    purpose:
      "A charge over the shares in obligors (especially the top holdco/propco) lets the security agent sell the company or appoint on enforcement, and underpins the intercreditor ability to effect a distressed disposal of a clean group beneath the charged shares.",
    borrowerAsk:
      "Charge limited to key holding companies, retention of voting and dividend rights until an EoD, and no perfection steps that impair operations.",
    lenderPushback:
      "A charge over all material subsidiaries' shares, delivery of share certificates and blank stock-transfer forms, and a shift of voting/dividend rights on default.",
    marketPosition:
      "Share charges over holdco and material subsidiaries, with pre-default voting/dividends left with the chargor and shifting on enforcement, are standard; certificated delivery plus blank transfers is market.",
    draftingNotes:
      "Share security enables the intercreditor 'release on distressed disposal' of the group below the charged shares — the key enforcement route. Confirm the constitution contains no transfer restrictions.",
    relatedCases: [],
    relatedTasks: ["A7"],
  },
  {
    id: "cl:sec-accounts",
    doc: "security",
    section: "Receivables & accounts",
    title: "Account & receivables security",
    purpose:
      "Fixed charges over bank accounts and key receivables (rent, intra-group, insurance) capture cash and income; combined with account control (blocked/controlled accounts) they give the lender cash dominion, especially in REF and asset-based lending.",
    borrowerAsk:
      "Operating accounts left free for day-to-day use, control only over rent/deposit accounts, and blocked-account triggers only on default or covenant breach.",
    lenderPushback:
      "Fixed charges with genuine control over key accounts (to avoid floating recharacterisation), rent/deposit accounts blocked or swept, and notice/acknowledgement to account banks and debtors.",
    marketPosition:
      "Controlled/blocked account structures with fixed charges over rent and deposit accounts are standard in REF; the trigger for full cash dominion (default vs covenant step) is negotiated.",
    draftingNotes:
      "Fixed vs floating turns on control (Spectrum Plus) — operate the account controls consistently or a 'fixed' charge is recharacterised as floating, changing priority and prescribed-part exposure. Serve notices to perfect assignments.",
    relatedCases: [],
    relatedTasks: ["A7", "A1"],
  },
  {
    id: "cl:sec-parallel",
    doc: "security",
    section: "Security agent",
    title: "Parallel debt & the security agent",
    purpose:
      "Where a security agent/trustee holds security for a syndicate — and in civil-law jurisdictions that don't recognise the trust — a 'parallel debt' creates an independent claim owed to the security agent so it can hold and enforce security for all lenders.",
    borrowerAsk:
      "Standard parallel-debt mechanics without double-counting exposure, and clarity that payment of the principal debt reduces the parallel debt.",
    lenderPushback:
      "Robust parallel-debt and no-double-recovery language enforceable in each relevant jurisdiction, and broad security-agent powers to act on an instructing-group direction.",
    marketPosition:
      "Parallel debt (or joint-and-several creditor structures) is standard in cross-border deals with civil-law security; English-law deals rely on the trust but add parallel debt for foreign security.",
    draftingNotes:
      "Confirm enforceability of the parallel-debt structure with local counsel in each security jurisdiction. It ties to the intercreditor enforcement and instructing-group provisions.",
    relatedCases: [],
    relatedTasks: ["A5", "A7"],
  },

  // ==== Additional intercreditor clauses ====
  {
    id: "cl:ic-permittedpay",
    doc: "intercreditor",
    section: "Permitted payments",
    title: "Permitted payments & payment stop notices",
    purpose:
      "Defines what payments junior/mezzanine (and shareholder) creditors may receive while senior debt is outstanding, and how a senior 'payment stop notice' on default switches those permitted payments off.",
    borrowerAsk:
      "(Group) predictable permitted payments to service junior/shareholder debt (cash interest, agreed amortisation) so the structure functions.",
    lenderPushback:
      "(Senior) tightly defined permitted payments, an immediate stop on default via a payment stop notice, PIK-only junior interest in stress, and turnover of anything received in breach.",
    marketPosition:
      "Permitted-payment schedules (junior cash interest subject to no-default, PIK otherwise) with payment stop notices on senior default are standard in senior/mezz intercreditors.",
    draftingNotes:
      "Align permitted payments with the standstill and turnover provisions — a payment received during a stop must be turned over. Watch the number and duration of stop notices (blockage caps).",
    relatedCases: [],
    relatedTasks: ["A5"],
  },
  {
    id: "cl:ic-hedging",
    doc: "intercreditor",
    section: "Hedging",
    title: "Hedging counterparties in the waterfall",
    purpose:
      "Positions hedge counterparties in the priority/enforcement waterfall — often super-senior (alongside the RCF) for scheduled and close-out amounts — and controls their voting and enforcement rights.",
    borrowerAsk:
      "(Group) simple, standard treatment that keeps hedging available and cheap.",
    lenderPushback:
      "Senior lenders and hedge counterparties negotiate hedge ranking (super-senior close-out, sometimes capped) and limited hedge-counterparty voting/enforcement rights.",
    marketPosition:
      "Hedge close-out amounts ranking super-senior (sometimes capped) with limited hedge voting is standard; the cap and the treatment of early vs scheduled termination are negotiated.",
    draftingNotes:
      "Define which hedge amounts are super-senior (scheduled vs close-out) and any cap. Coordinate with the REF/leveraged hedging requirement and the enforcement waterfall.",
    relatedCases: [],
    relatedTasks: ["A5"],
  },
  {
    id: "cl:ic-option",
    doc: "intercreditor",
    section: "Junior option to purchase",
    title: "Junior option to purchase senior debt",
    purpose:
      "Gives junior/mezzanine creditors the right, on acceleration/enforcement, to buy out the senior debt at par (plus accrued and costs), taking control of the workout rather than being crammed or wiped out.",
    borrowerAsk:
      "(Not a borrower issue.) The group prefers a stable, funded resolution.",
    lenderPushback:
      "(Senior) a short exercise window and purchase at par plus all amounts (including hedge close-out and costs); (junior) a realistic window and price so the option is usable.",
    marketPosition:
      "A junior buy-out option at par, exercisable within a defined period after acceleration/enforcement, is standard in senior/mezz structures; the window and included amounts are negotiated.",
    draftingNotes:
      "Specify precisely what must be paid (principal, accrued interest, break/hedge costs) and the mechanics/timing. It interacts with enforcement control and the distressed loan-to-own analysis.",
    relatedCases: ["case:adler"],
    relatedTasks: ["A5", "C5"],
  },

  // ==== Additional direct lending clauses ====
  {
    id: "cl:dl-covenant",
    doc: "direct",
    section: "Financial covenant",
    title: "Unitranche leverage covenant & equity cure",
    purpose:
      "Unlike broadly-syndicated cov-lite, mid-market direct-lending unitranche typically retains one or two maintenance covenants (usually net leverage, sometimes plus minimum liquidity), tested quarterly, with an equity cure.",
    borrowerAsk:
      "(Sponsor) a single leverage covenant with 30–40% headroom to the base case, generous equity-cure rights (multiple cures, deemed-EBITDA cure), and no cashflow/liquidity covenant.",
    lenderPushback:
      "(Fund) a leverage covenant with disciplined headroom, capped equity cures (frequency and over-cure), and sometimes a minimum-liquidity backstop.",
    marketPosition:
      "One leverage maintenance covenant with a ~35% headroom cushion and a capped equity cure is typical of European mid-market unitranche; larger unitranche trends toward cov-loose/cov-lite.",
    draftingNotes:
      "The cure mechanics (deemed EBITDA vs debt paydown, over-cure, count limits) are the key negotiation, as in leveraged. Reconcile with the AGL — first-out and last-out can have different covenant sensitivities.",
    relatedCases: ["case:woodcapita"],
    relatedTasks: ["C2"],
  },
  {
    id: "cl:dl-ddtl",
    doc: "direct",
    section: "Facilities",
    title: "Delayed-draw term loan & committed acquisition lines",
    purpose:
      "Direct lenders often provide committed delayed-draw term loans (DDTLs) and acquisition/capex facilities drawable post-close to fund a buy-and-build strategy, with a commitment (ticking) fee on the undrawn amount.",
    borrowerAsk:
      "(Sponsor) a long availability period, light conditions to draw (no re-underwrite), a low ticking fee, and use for a broad range of acquisitions/capex.",
    lenderPushback:
      "(Fund) conditions to each draw (pro forma leverage, no default, permitted-acquisition criteria), a defined availability period, and a market ticking fee.",
    marketPosition:
      "DDTLs and committed acquisition lines with pro-forma-leverage draw conditions and a ticking fee are a hallmark of buy-and-build direct lending; availability periods and draw conditions are negotiated.",
    draftingNotes:
      "Draw conditions (leverage test, permitted-acquisition definition) are where the credit is controlled between closing and draw. Coordinate with the incremental/accordion and permitted-acquisition provisions.",
    relatedCases: [],
    relatedTasks: ["C2", "C3"],
  },

  // ==== Additional structured credit clauses ====
  {
    id: "cl:sc-waterfall",
    doc: "structured",
    section: "Priority of payments",
    title: "Priority of payments (waterfall)",
    purpose:
      "The payment 'waterfall' orders how collections are applied each period — fees, senior interest, senior principal (on tests), then down the tranches to equity — and typically differs pre- and post-enforcement. It is the spine of a CLO/securitisation.",
    borrowerAsk:
      "(Equity/manager) more cash reaching the residual/equity tranche — generous senior thresholds, interest diversion only on hard triggers, and management-fee seniority.",
    lenderPushback:
      "(Noteholders) diversion of cash to senior notes on OC/IC failure, sequential pay in stress, and subordination of certain fees/residual until tests cure.",
    marketPosition:
      "Separate interest and principal waterfalls that flip to sequential/turbo on trigger breach or post-acceleration are standard CLO/securitisation architecture; trigger levels and fee placement are negotiated.",
    draftingNotes:
      "Model the waterfall under stress (triggers breached) — that is where equity value evaporates and noteholder protection bites. Reconcile with the coverage-test and reinvestment provisions.",
    relatedCases: [],
    relatedTasks: ["C7", "C8"],
  },
  {
    id: "cl:sc-eligibility",
    doc: "structured",
    section: "Eligibility & concentration",
    title: "Eligibility criteria & concentration limits",
    purpose:
      "The eligibility criteria (what assets may be bought) and concentration limits (caps by obligor, industry, rating, currency, jurisdiction) define and constrain the portfolio in a CLO, warehouse or securitisation — the primary credit-risk controls.",
    borrowerAsk:
      "(Manager) broad eligibility and generous concentration limits for portfolio-construction flexibility, with cure/trading time to fix breaches.",
    lenderPushback:
      "(Arranger/noteholders) tight, well-defined eligibility, conservative concentration limits, and clear consequences (borrowing-base haircut / ineligibility) for assets outside the limits.",
    marketPosition:
      "Detailed eligibility schedules and concentration limits (single-obligor, industry, CCC/rating buckets, currency) are standard; the limits and the treatment of breaches are the core credit negotiation.",
    draftingNotes:
      "This schedule is where credit risk is actually controlled — draft it precisely and align it with the warehouse borrowing base and the CLO coverage/quality tests.",
    relatedCases: [],
    relatedTasks: ["C7", "C8"],
  },
];
