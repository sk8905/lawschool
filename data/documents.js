// data/documents.js — annotated model agreements (a study/reference aid).
//
// IMPORTANT: these are ORIGINAL, illustrative model documents written in an
// LMA/market *style*. They are NOT the LMA's copyrighted forms and are NOT a
// precedent to run a deal on — for real transactions use your firm's actual LMA
// documents plus Practical Law / LexisNexis annotations. Bracketed [ ] items are
// deal-specific.
//
// Document shape:
//   { id, area, title, short, summary, roadmap?, sections: [ Section ] }
// Section shape:
//   { id, no, title, group, purpose, illustrative, annotation,
//     relatedClauses[], relatedCases[] }
//
// `no` is the clause number; `group` is the LMA "Section" heading it sits under.

export const DOC_ROADMAP = [
  "Senior Secured Leveraged Facilities Agreement (built)",
  "Corporate / Investment-Grade Term & RCF (to follow)",
  "Second-Lien / Mezzanine (Junior) Facilities Agreement (to follow)",
  "Real Estate Finance Facilities Agreement (to follow)",
  "Security Package — Debenture, Share Charge & Assignments (to follow)",
  "Intercreditor Agreement (to follow)",
];

export const DOCUMENTS = [
  {
    id: "doc:lev-fa",
    area: "Leveraged",
    title: "Senior Secured Leveraged Facilities Agreement",
    short: "Senior Leveraged (TLB / RCF)",
    summary:
      "An illustrative model senior secured leveraged facilities agreement (Term Loan B plus a revolving credit facility), sponsor-acquisition style, in LMA structure. Walk it clause by clause: what each section does, representative wording, and the considerations and negotiation points — cross-linked to the playbook clauses and the case law.",
    sections: [
      // ---- Interpretation ----
      {
        id: "sec:levfa:01",
        no: "1",
        title: "Definitions and Interpretation",
        group: "Interpretation",
        purpose:
          "Defines every term and sets the rules of construction. In a leveraged deal this clause is where the commercial deal is really made — EBITDA, the leverage ratios, 'Permitted' baskets, Margin and the ratchet all live here.",
        illustrative:
          "In this Agreement: 'EBITDA' has the meaning given in Clause 23 (Financial Covenants); 'Margin' means [ ]% per annum subject to Clause 11 (Interest); a reference to a Finance Document or other agreement is to it as amended, restated or replaced from time to time.",
        annotation:
          "The most negotiated clause in the book — definitions carry the economics, so read them before the operative clauses. English courts construe them per Wood v Capita and Arnold v Britton: clear language governs, so precision here is everything. Watch the defined-term 'daisy chains' (EBITDA → leverage → baskets → ratchet).",
        relatedClauses: ["cl:lev-ebitda", "cl:lev-covenants"],
        relatedCases: ["case:woodcapita", "case:arnold"],
      },
      // ---- The Facilities ----
      {
        id: "sec:levfa:02",
        no: "2",
        title: "The Facilities",
        group: "The Facilities",
        purpose:
          "Establishes the facilities and commitments — typically a Term Loan B (institutional, bullet) and a Revolving Credit Facility — and the incremental / accordion capacity to raise more debt later.",
        illustrative:
          "Subject to the terms of this Agreement, the Lenders make available a term loan facility ('Facility B') in an aggregate amount equal to the Total Facility B Commitments and a revolving credit facility in an aggregate amount equal to the Total Revolving Facility Commitments.",
        annotation:
          "Fixes the tranching and the incremental/accordion headroom that the borrower can tap without new consents (protected by MFN). Confirm the interaction between the RCF, ancillary facilities and any incremental facility.",
        relatedClauses: ["cl:lev-incremental", "cl:lev-mfn"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:03",
        no: "3",
        title: "Purpose",
        group: "The Facilities",
        purpose:
          "Restricts the use of proceeds — funding the acquisition and related costs (Facility B) and general corporate / working-capital purposes (RCF) — with the Agent not obliged to monitor use.",
        illustrative:
          "The Borrower shall apply all amounts borrowed under Facility B towards financing the Acquisition and the Refinancing and paying Transaction Costs; and amounts under the Revolving Facility towards the general corporate and working-capital purposes of the Group.",
        annotation:
          "Ties the loan to the deal. In acquisition finance this dovetails with certain funds and the funds-flow; the 'no obligation to monitor' wording protects the Agent.",
        relatedClauses: ["cl:lev-certainfunds"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:04",
        no: "4",
        title: "Conditions of Utilisation",
        group: "The Facilities",
        purpose:
          "Sets the conditions precedent to drawing and, in acquisition finance, the certain-funds regime that limits when lenders can refuse to fund during the offer/acquisition period.",
        illustrative:
          "The Lenders will only be obliged to comply with a Utilisation Request if, on the date of the Utilisation Request and the Utilisation Date, in the case of a Certain Funds Utilisation, no Major Default is continuing and the Major Representations are true in all material respects.",
        annotation:
          "The certain-funds list (major defaults / major reps) is what gives the bidder deal certainty. Cross-check it against the SPA conditionality so the financing is no more conditional than the acquisition.",
        relatedClauses: ["cl:lev-cp", "cl:lev-certainfunds"],
        relatedCases: [],
      },
      // ---- Utilisation ----
      {
        id: "sec:levfa:05",
        no: "5",
        title: "Utilisation",
        group: "Utilisation",
        purpose:
          "The mechanics of drawing — delivery of a Utilisation Request, notice periods, minimum amounts, currency, and the making of each Loan available on the Utilisation Date.",
        illustrative:
          "The Borrower may utilise a Facility by delivery to the Agent of a duly completed Utilisation Request not later than the Specified Time. Each Loan will be made available in the amount and currency specified, subject to the limits in Clause 5 (Utilisation).",
        annotation:
          "Operational plumbing, but the 'repeating representations' at utilisation and the notice mechanics matter — over-broad repeating reps can turn a stale rep into a drawstop. Coordinate with the commitment-fee accrual.",
        relatedClauses: ["cl:lev-reps", "cl:lev-fees"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:06",
        no: "6",
        title: "Ancillary Facilities",
        group: "Utilisation",
        purpose:
          "Allows part of the RCF commitment to be provided as ancillary facilities (overdraft, guarantee, letter of credit, short-term loan) for day-to-day liquidity, within the revolving commitment.",
        illustrative:
          "A Borrower and an Ancillary Lender may agree that all or part of that Lender's Revolving Facility Commitment be made available as an Ancillary Facility; the aggregate Ancillary Commitments shall not at any time exceed [ ].",
        annotation:
          "Ancillary facilities net down the RCF and share security/guarantees rateably; make sure they are covered (often super-senior) in the intercreditor. Watch the ancillary cap and the cash-cover mechanics on cancellation.",
        relatedClauses: ["cl:ig-ancillary"],
        relatedCases: [],
      },
      // ---- Repayment, Prepayment and Cancellation ----
      {
        id: "sec:levfa:07",
        no: "7",
        title: "Repayment",
        group: "Repayment, Prepayment and Cancellation",
        purpose:
          "Sets the repayment profile — Facility B typically bullet at the Termination Date; the RCF repayable at its termination date; any TLA amortising by instalments.",
        illustrative:
          "The Borrower shall repay each Facility B Loan in full on the Facility B Termination Date. The Borrower shall repay each Revolving Facility Loan on the last day of its Interest Period, and repay all outstandings on the Revolving Facility Termination Date.",
        annotation:
          "European leveraged TLBs are usually bullet with no amortisation. Keep the repayment, mandatory- and voluntary-prepayment application consistent (order across instalments).",
        relatedClauses: ["cl:lev-amort"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:08",
        no: "8",
        title: "Illegality, Voluntary Prepayment and Cancellation",
        group: "Repayment, Prepayment and Cancellation",
        purpose:
          "Allows a lender to require prepayment if funding becomes illegal, and the borrower to prepay or cancel voluntarily on notice (subject to any soft-call), plus debt-buyback mechanics.",
        illustrative:
          "The Borrower may, on [3] Business Days' notice, prepay the whole or any part of a Loan (in a minimum amount of [ ]) without premium, save that a prepayment of Facility B from a Repricing Transaction within [6] months of Closing shall carry a [1.00]% premium.",
        annotation:
          "The soft-call scope (repricing only vs all prepayments) and the debt-buyback (Dutch auction / open market) mechanics are the negotiation — and the buyback machinery is exactly what uptiers exploit (see the Distressed playbook).",
        relatedClauses: ["cl:lev-voluntaryprepay", "cl:ds-openmarket"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:09",
        no: "9",
        title: "Mandatory Prepayment",
        group: "Repayment, Prepayment and Cancellation",
        purpose:
          "Requires prepayment on defined events — change of control (subject to any portability), disposal and insurance proceeds, and the excess-cashflow sweep.",
        illustrative:
          "Upon a Change of Control, each Lender may cancel its Commitment and declare its participation immediately due and payable. An amount equal to [50]% of Excess Cashflow (stepping down with leverage) shall be applied in prepayment within [10] Business Days of the audited accounts.",
        annotation:
          "The ECF sweep percentage/step-downs and the portability of the deal on a change of control are heavily negotiated. Define 'Excess Cashflow' and its deductions carefully.",
        relatedClauses: ["cl:lev-mandprepay", "cl:lev-portability"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:10",
        no: "10",
        title: "Restrictions",
        group: "Repayment, Prepayment and Cancellation",
        purpose:
          "Housekeeping on prepayment/cancellation — notices are irrevocable, amounts prepaid are applied in a set order, no re-borrowing of term loans, and any break costs are payable.",
        illustrative:
          "Any notice of prepayment or cancellation is irrevocable and shall specify the relevant amount and date. Amounts prepaid under Facility B may not be re-borrowed. The Borrower shall pay any Break Costs on a prepayment made otherwise than on the last day of an Interest Period.",
        annotation:
          "With RFR loans, break costs are limited compared with fixed-rate. Confirm the order of application (pro rata across facilities / inverse order of maturities) matches the commercial deal.",
        relatedClauses: ["cl:lev-voluntaryprepay"],
        relatedCases: [],
      },
      // ---- Costs of Utilisation ----
      {
        id: "sec:levfa:11",
        no: "11",
        title: "Interest",
        group: "Costs of Utilisation",
        purpose:
          "Fixes the rate — Margin plus the compounded risk-free rate — the leverage-based margin ratchet, any sustainability-linked adjustment, and default interest on overdue amounts.",
        illustrative:
          "The rate of interest on each Loan for an Interest Period is the aggregate of the Margin and the Compounded Reference Rate. If an Obligor fails to pay any amount when due, interest accrues on the overdue amount at [1]% per annum above the rate that would otherwise apply.",
        annotation:
          "The RFR mechanics (compounding, lookback, zero floor) are now standard; keep the leverage ratchet and any ESG ratchet separate so they don't double-count. Keep default interest proportionate so it is enforceable and not a penalty (Cavendish v Makdessi).",
        relatedClauses: ["cl:lev-interest", "cl:lev-marginratchet", "cl:lev-esg", "cl:lev-defaultinterest"],
        relatedCases: ["case:makdessi"],
      },
      {
        id: "sec:levfa:12",
        no: "12",
        title: "Interest Periods",
        group: "Costs of Utilisation",
        purpose:
          "Sets how interest periods are selected (typically 1, 3 or 6 months), how they are notified, and how non-business-day and overlapping-period conventions work.",
        illustrative:
          "The Borrower may select an Interest Period of [1, 3 or 6] Months (or any other period agreed) in the relevant Utilisation Request or Selection Notice; an Interest Period that would extend beyond a Termination Date shall be shortened so that it ends on that date.",
        annotation:
          "Mechanical, but interacts with the RFR compounding conventions and break costs. Confirm consistency with the rate-fallback waterfall.",
        relatedClauses: ["cl:lev-interest"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:13",
        no: "13",
        title: "Changes to the Calculation of Interest",
        group: "Costs of Utilisation",
        purpose:
          "The rate-fallback and market-disruption machinery — what happens if the reference rate is unavailable or a market-disruption event occurs, and the mechanism to agree a replacement basis.",
        illustrative:
          "If a Market Disruption Event occurs, the rate of interest on the affected Lender's share of the Loan shall be the sum of the Margin and that Lender's cost of funds. The Agent and the Borrower may agree amendments to reflect any Replacement Reference Rate.",
        annotation:
          "Post-LIBOR, this is largely the RFR fallback waterfall; market disruption is rarely invoked. Confirm the replacement-rate amendment mechanics and the disruption threshold.",
        relatedClauses: ["cl:lev-mktdisruption", "cl:lev-interest"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:14",
        no: "14",
        title: "Fees",
        group: "Costs of Utilisation",
        purpose:
          "The fee suite — arrangement/upfront fee (and any OID), commitment/ticking fee on undrawn commitments, and the agency fee.",
        illustrative:
          "The Borrower shall pay a commitment fee computed at [35]% of the applicable Margin on the undrawn, uncancelled Available Commitments during the Availability Period, payable quarterly in arrear and on the last day of the Availability Period.",
        annotation:
          "Fees feed the 'all-in yield' the MFN protects — keep OID and fees within that definition or the protection is arbitraged.",
        relatedClauses: ["cl:lev-fees", "cl:lev-mfn"],
        relatedCases: [],
      },
      // ---- Additional Payment Obligations ----
      {
        id: "sec:levfa:15",
        no: "15",
        title: "Tax Gross-Up and Indemnities",
        group: "Additional Payment Obligations",
        purpose:
          "Ensures lenders receive payments free of withholding — the gross-up, the Qualifying/Treaty-Lender regime, the tax-credit clawback, and FATCA allocation.",
        illustrative:
          "If a Tax Deduction is required, the payment shall be increased so that the Finance Party receives the amount it would have received absent the deduction, save that no additional amount is payable in respect of a Lender that is not a Qualifying Lender (other than by reason of a Change in Law).",
        annotation:
          "Get the Qualifying/Treaty-Lender definitions and HMRC Treaty-Passport (DTTP) mechanics right for the lender group. Increased costs should exclude anything already grossed up.",
        relatedClauses: ["cl:lev-taxgrossup"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:16",
        no: "16",
        title: "Increased Costs",
        group: "Additional Payment Obligations",
        purpose:
          "Indemnifies lenders for increased costs arising from a change in law or regulatory capital requirements (e.g. Basel), subject to standard exclusions.",
        illustrative:
          "The Borrower shall pay to a Finance Party the amount of any Increased Costs incurred as a result of a Change in Law, save to the extent attributable to a matter compensated under Clause 15 (Tax) or resulting from the Finance Party's wilful breach.",
        annotation:
          "Rarely invoked but important boilerplate; watch the exclusions and any borrower right to prepay/replace an affected lender (mitigation).",
        relatedClauses: ["cl:lev-taxgrossup"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:17",
        no: "17",
        title: "Other Indemnities",
        group: "Additional Payment Obligations",
        purpose:
          "Currency, break-cost and general indemnities protecting the Finance Parties against losses from default, funding and enforcement.",
        illustrative:
          "The Borrower shall, within three Business Days of demand, indemnify each Finance Party against any cost, loss or liability incurred as a result of the occurrence of any Event of Default, a failure by an Obligor to pay any amount due, or funding a Loan not made by reason of the Borrower.",
        annotation:
          "Keep indemnities to genuine loss so they are not attacked as penalties; the currency indemnity matters in multi-currency deals.",
        relatedClauses: [],
        relatedCases: ["case:makdessi"],
      },
      {
        id: "sec:levfa:18",
        no: "18",
        title: "Mitigation by the Lenders",
        group: "Additional Payment Obligations",
        purpose:
          "Requires lenders to take reasonable steps to mitigate circumstances that trigger a gross-up, increased cost or illegality (e.g. transfer to another lending office).",
        illustrative:
          "Each Finance Party shall, in consultation with the Borrower, take all reasonable steps to mitigate any circumstances which arise and would result in any amount becoming payable under Clause 15 or 16 or any prepayment for illegality, including transferring its rights to an Affiliate or Facility Office.",
        annotation:
          "A borrower-protective counterweight to the tax/increased-cost indemnities; usually accepted with a 'no prejudice to the lender' proviso.",
        relatedClauses: ["cl:lev-taxgrossup"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:19",
        no: "19",
        title: "Costs and Expenses",
        group: "Additional Payment Obligations",
        purpose:
          "Allocates transaction, amendment and enforcement costs — typically the borrower pays the Agent's and Arranger's reasonable costs, and all enforcement costs.",
        illustrative:
          "The Borrower shall promptly on demand pay the Agent and the Arranger the amount of all costs and expenses (including legal fees) reasonably incurred in connection with the negotiation, amendment or enforcement of the Finance Documents.",
        annotation:
          "Negotiate caps and 'reasonable' qualifiers on transaction and amendment costs; enforcement costs are typically uncapped.",
        relatedClauses: [],
        relatedCases: [],
      },
      // ---- Guarantee ----
      {
        id: "sec:levfa:20",
        no: "20",
        title: "Guarantee and Indemnity",
        group: "Guarantee",
        purpose:
          "The upstream/cross-stream guarantee from the obligor group, with the indemnity limb backstopping any unenforceable guarantee, subject to the agreed security principles and local limitation language.",
        illustrative:
          "Each Guarantor irrevocably and unconditionally, jointly and severally, guarantees to each Finance Party due performance by each Obligor, and as an independent and primary obligation indemnifies each Finance Party against loss arising from any guaranteed obligation being unenforceable, invalid or illegal.",
        annotation:
          "Coverage is tested against the guarantor-coverage threshold and calibrated by the Agreed Security Principles and jurisdiction-specific limitation language. Watch undue influence where individuals are involved (Etridge) and the rule that variations can discharge a guarantor absent the preservation wording (Holme v Brunskill).",
        relatedClauses: ["cl:sec-guarantee", "cl:sec-guaranteelimits", "cl:sec-principles"],
        relatedCases: ["case:etridge", "case:holme"],
      },
      // ---- Representations, Undertakings and Events of Default ----
      {
        id: "sec:levfa:21",
        no: "21",
        title: "Representations",
        group: "Representations, Undertakings and Events of Default",
        purpose:
          "The representations given at signing and repeated (the Repeating Representations) on each utilisation and interest payment date — status, power, enforceability, no default, financial statements, and more.",
        illustrative:
          "Each Obligor makes the representations in this Clause 21 to each Finance Party on the date of this Agreement. The Repeating Representations are deemed made on the date of each Utilisation Request and the first day of each Interest Period by reference to the circumstances then existing.",
        annotation:
          "Define 'Repeating Representations' tightly — over-broad repetition turns a rep breach into a drawstop or EoD. Align with the certain-funds 'Major Representations'.",
        relatedClauses: ["cl:lev-reps"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:22",
        no: "22",
        title: "Information Undertakings",
        group: "Representations, Undertakings and Events of Default",
        purpose:
          "The reporting package — annual audited and quarterly financials, a compliance certificate with covenant calculations, an annual budget, and notice of default and litigation.",
        illustrative:
          "The Company shall supply the Agent with: its audited consolidated financial statements within [120] days of each financial year-end; quarterly management accounts within [45] days; and a Compliance Certificate with each, setting out computations of the Financial Covenant.",
        annotation:
          "The compliance-certificate mechanics are where add-backs and equity cures are evidenced. Private-credit deals demand more frequent, granular reporting.",
        relatedClauses: ["cl:lev-info"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:23",
        no: "23",
        title: "Financial Covenants",
        group: "Representations, Undertakings and Events of Default",
        purpose:
          "The maintenance/springing covenant regime — in cov-lite large-cap, a springing leverage covenant tested only on RCF drawings above a threshold — plus the EBITDA definition and equity-cure rights.",
        illustrative:
          "If, on the last day of any Relevant Period, the aggregate Revolving Facility utilisations exceed [40]% of the Total Revolving Commitments, the Total Net Leverage Ratio shall not exceed the ratio set out in Schedule [ ]. The Sponsor may cure a breach in accordance with Clause 23 (Equity Cure).",
        annotation:
          "Cov-lite vs one maintenance covenant is the headline; the EBITDA add-backs and the equity-cure mechanics (EBITDA cure vs debt paydown, frequency caps, over-cure) are the substance. Construed strictly (Wood v Capita).",
        relatedClauses: ["cl:lev-covenants", "cl:lev-equitycure", "cl:lev-ebitda"],
        relatedCases: ["case:woodcapita"],
      },
      {
        id: "sec:levfa:24",
        no: "24",
        title: "General Undertakings",
        group: "Representations, Undertakings and Events of Default",
        purpose:
          "The negative and affirmative covenant suite — restrictions on debt, security (negative pledge), disposals, restricted payments, investments and acquisitions, with the 'Permitted' baskets, plus sanctions and MFN.",
        illustrative:
          "No Obligor shall (and the Company shall procure that no member of the Group will) incur Financial Indebtedness, create Security, make a Restricted Payment, or make an acquisition, except as permitted by the relevant Permitted baskets and Schedule [ ] (Permitted Transactions).",
        annotation:
          "The whole covenant package breathes through the 'Permitted' baskets and the EBITDA definition — model the aggregate leakage across the debt, RP, investment and acquisition baskets. MFN protects incremental pricing.",
        relatedClauses: ["cl:lev-baskets", "cl:lev-rp", "cl:lev-permacq", "cl:lev-mfn", "cl:lev-incremental", "cl:lev-sanctions", "cl:sec-negpledge"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:25",
        no: "25",
        title: "Events of Default",
        group: "Representations, Undertakings and Events of Default",
        purpose:
          "The events entitling the Majority Lenders to accelerate — non-payment, financial-covenant breach, breach of other obligations (with grace), misrepresentation, cross-default/acceleration, insolvency, and (sometimes) MAC.",
        illustrative:
          "An Event of Default occurs if an Obligor does not pay on the due date any amount payable under a Finance Document, unless (for an administrative error) payment is made within [three] Business Days. On an Event of Default which is continuing, the Agent may, and shall if so instructed by the Majority Lenders, accelerate.",
        annotation:
          "Cross-default vs cross-acceleration and its threshold, grace periods, and whether a MAC EoD survives are the negotiation. A MAC is hard to invoke (Grupo Hotelero Urvasco). Align with the equity-cure and clean-up provisions.",
        relatedClauses: ["cl:lev-eod", "cl:lev-mac"],
        relatedCases: ["case:urvasco"],
      },
      // ---- Changes to Parties ----
      {
        id: "sec:levfa:26",
        no: "26",
        title: "Changes to the Lenders",
        group: "Changes to Parties",
        purpose:
          "How lenders assign or transfer their participations — consent rights, minimum amounts, the disqualified-lender list, and defaulting-lender / yank-the-bank mechanics.",
        illustrative:
          "A Lender may assign or transfer to another Lender or Affiliate, or (while no Event of Default is continuing) to any other person with the Company's consent (not unreasonably withheld and deemed given after [10] Business Days), provided that no transfer may be made to a Disqualified Lender.",
        annotation:
          "The DQ list and consent-on-default mechanics decide who can build a blocking or loan-to-own stake — the LME battleground. Defaulting-lender disenfranchisement and yank-the-bank sit here too.",
        relatedClauses: ["cl:lev-transfers", "cl:lev-defaulting"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:27",
        no: "27",
        title: "Changes to the Obligors",
        group: "Changes to Parties",
        purpose:
          "Accession of additional guarantors/borrowers (e.g. acquired companies) and resignation of obligors on a permitted disposal, subject to the guarantor-coverage test and security principles.",
        illustrative:
          "The Company may request that any member of the Group become an Additional Guarantor by delivery of an Accession Deed and the documents in Schedule [ ]; an Obligor may resign if it is being disposed of under a permitted disposal and no Event of Default is continuing.",
        annotation:
          "Ties to permitted acquisitions (targets accede as obligors) and the Agreed Security Principles. Confirm the coverage test is maintained after accessions/resignations.",
        relatedClauses: ["cl:sec-principles", "cl:lev-permacq"],
        relatedCases: [],
      },
      // ---- The Finance Parties ----
      {
        id: "sec:levfa:28",
        no: "28",
        title: "Role of the Agent and the Arranger",
        group: "The Finance Parties",
        purpose:
          "Defines the Agent's authority and duties, its exculpation, and the (limited) role of the Arranger — the machinery that lets the Agent act for the syndicate on instructions.",
        illustrative:
          "Each Finance Party appoints the Agent to act as its agent under the Finance Documents and authorises it to exercise the rights, powers and discretions specifically delegated to it, together with any reasonably incidental powers. The Agent's duties are solely mechanical and administrative.",
        annotation:
          "Standard exculpation and 'no fiduciary duty' wording; the Agent acts on Majority-Lender instructions (Clause 37). Central to how amendments and enforcement are directed.",
        relatedClauses: ["cl:lev-agency"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:29",
        no: "29",
        title: "Conduct of Business by the Finance Parties",
        group: "The Finance Parties",
        purpose:
          "Confirms that nothing in the agreement interferes with a Finance Party's own tax and regulatory affairs or requires disclosure of confidential information about its computations.",
        illustrative:
          "No provision of this Agreement will interfere with the right of any Finance Party to arrange its affairs (tax or otherwise) as it thinks fit, oblige it to investigate or claim any credit, or require disclosure of any information relating to its affairs or computations.",
        annotation:
          "Boilerplate, but relevant to the tax-credit clawback in Clause 15 — a lender need not reveal its tax position.",
        relatedClauses: [],
        relatedCases: [],
      },
      {
        id: "sec:levfa:30",
        no: "30",
        title: "Sharing among the Finance Parties",
        group: "The Finance Parties",
        purpose:
          "The pro rata sharing clause — a lender that recovers more than its share (e.g. by set-off) redistributes the excess so all are treated rateably.",
        illustrative:
          "If a Recovering Finance Party receives or recovers any amount otherwise than through the Agent and applies it against the Liabilities, it shall pay to the Agent an amount equal to the excess over its pro rata share, for redistribution rateably among the Finance Parties.",
        annotation:
          "Whether pro rata sharing is a sacred/all-lender right, and how its exceptions are drawn, is central to uptier resilience (Serta). Reconcile with the amendments clause.",
        relatedClauses: ["cl:lev-sharing", "cl:ds-sacredrights"],
        relatedCases: ["case:serta"],
      },
      // ---- Administration ----
      {
        id: "sec:levfa:31",
        no: "31",
        title: "Payment Mechanics",
        group: "Administration",
        purpose:
          "How and where payments are made and applied — funds through the Agent, the partial-payments waterfall, timing and currency of account.",
        illustrative:
          "On each date on which an Obligor or a Lender is required to make a payment, it shall make it available to the Agent for value on the due date. If the Agent receives a payment insufficient to discharge all amounts then due, it shall apply it in the order set out in Clause 31 (Partial Payments).",
        annotation:
          "The partial-payments order (costs → interest → principal) matters in stress; coordinate with the intercreditor waterfall where relevant.",
        relatedClauses: [],
        relatedCases: [],
      },
      {
        id: "sec:levfa:32",
        no: "32",
        title: "Set-Off",
        group: "Administration",
        purpose:
          "Permits a Finance Party to set off matured obligations owed by an Obligor against amounts it holds — subject to the sharing clause so no lender gains a non-pro-rata advantage.",
        illustrative:
          "A Finance Party may set off any matured obligation due from an Obligor against any matured obligation owed by that Finance Party to the Obligor, regardless of the currency of either obligation.",
        annotation:
          "Set-off recoveries feed the sharing clause (Clause 30). Contrast the borrower's position (no set-off — payments to be made without deduction).",
        relatedClauses: ["cl:lev-sharing"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:33",
        no: "33",
        title: "Notices",
        group: "Administration",
        purpose:
          "How communications are given and deemed received — addresses, electronic communication, and the deemed-delivery rules.",
        illustrative:
          "Any communication under the Finance Documents shall be in writing and, unless otherwise stated, may be made by letter or electronic communication to the address or electronic address most recently notified for that purpose.",
        annotation:
          "Mechanical but litigated at the margins (deemed receipt on default notices). Confirm electronic-communication and 'Specified Time' provisions.",
        relatedClauses: [],
        relatedCases: [],
      },
      {
        id: "sec:levfa:34",
        no: "34",
        title: "Calculations and Certificates",
        group: "Administration",
        purpose:
          "Evidential provisions — accounts of a Finance Party are prima facie evidence, day-count conventions, and how certificates are treated.",
        illustrative:
          "Any certification or determination by a Finance Party of a rate or amount under the Finance Documents is, in the absence of manifest error, conclusive evidence of the matters to which it relates. Interest accrues on a daily basis on the actual number of days elapsed.",
        annotation:
          "The 'manifest error' standard and day-count conventions matter for the compliance certificate (Clause 22) and interest (Clause 11).",
        relatedClauses: ["cl:lev-info"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:35",
        no: "35",
        title: "Partial Invalidity",
        group: "Administration",
        purpose:
          "Severance — if a provision is or becomes illegal, invalid or unenforceable, the remaining provisions are unaffected.",
        illustrative:
          "If, at any time, any provision of a Finance Document is or becomes illegal, invalid or unenforceable in any respect under any law, neither the legality, validity or enforceability of the remaining provisions shall in any way be affected or impaired.",
        annotation:
          "Standard severance; particularly relevant where guarantee/security limitation language may cut down a provision in one jurisdiction.",
        relatedClauses: ["cl:sec-guaranteelimits"],
        relatedCases: [],
      },
      {
        id: "sec:levfa:36",
        no: "36",
        title: "Remedies and Waivers",
        group: "Administration",
        purpose:
          "Confirms that no failure or delay in exercising a right operates as a waiver, and that rights are cumulative and not exclusive of rights at law.",
        illustrative:
          "No failure to exercise, nor any delay in exercising, on the part of any Finance Party, any right or remedy under a Finance Document shall operate as a waiver, nor shall any single or partial exercise preclude any further exercise. The rights and remedies are cumulative.",
        annotation:
          "Boilerplate, but note the interaction with the rule in Holme v Brunskill — indulgence to the borrower could discharge a guarantor absent the guarantee's preservation wording.",
        relatedClauses: ["cl:sec-guarantee"],
        relatedCases: ["case:holme"],
      },
      {
        id: "sec:levfa:37",
        no: "37",
        title: "Amendments and Waivers",
        group: "Administration",
        purpose:
          "The voting machinery — the Majority-Lender threshold, the matters requiring all-lender (sacred-rights) or all-affected-lender consent, and snooze-you-lose.",
        illustrative:
          "Subject to Clause 37 (Exceptions), any term of the Finance Documents may be amended or waived with the consent of the Majority Lenders and the Company. An amendment affecting [the ranking or subordination of the Liabilities, pro rata sharing, or release of material Guarantees/Security] requires the consent of all Lenders (or all affected Lenders).",
        annotation:
          "The Majority-Lender threshold (50.1% or 66⅔%) and the sacred-rights list are the heart of LME/uptier resilience (Serta). Snooze-you-lose must not override all-lender rights.",
        relatedClauses: ["cl:lev-agency", "cl:ds-sacredrights", "cl:lev-defaulting"],
        relatedCases: ["case:serta"],
      },
      {
        id: "sec:levfa:38",
        no: "38",
        title: "Confidentiality",
        group: "Administration",
        purpose:
          "Restricts disclosure of confidential information, with permitted-disclosure carve-outs (to affiliates, transferees, regulators) and the confidentiality of funding rates.",
        illustrative:
          "Each Finance Party shall keep confidential all Confidential Information and shall not disclose it to any person, save to the extent permitted (including to a person to whom it assigns or transfers, or proposes to assign or transfer, its rights, subject to a confidentiality undertaking).",
        annotation:
          "The permitted-disclosure list interacts with transfers (Clause 26) — a prospective transferee gets information under a confidentiality undertaking. Watch disclosure to loan-to-own funds.",
        relatedClauses: ["cl:lev-transfers"],
        relatedCases: [],
      },
      // ---- Governing Law and Enforcement ----
      {
        id: "sec:levfa:39",
        no: "39",
        title: "Governing Law",
        group: "Governing Law and Enforcement",
        purpose:
          "Chooses the governing law — English law — for the agreement and non-contractual obligations arising from it.",
        illustrative:
          "This Agreement and any non-contractual obligations arising out of or in connection with it are governed by English law.",
        annotation:
          "Governing law is strategically important for restructuring: an English-law debt cannot be compromised by a foreign proceeding (the rule in Gibbs), which is why English law + an English scheme/Part 26A plan is the workhorse for cross-border groups.",
        relatedClauses: [],
        relatedCases: ["case:gibbs", "case:bakhshiyeva"],
      },
      {
        id: "sec:levfa:40",
        no: "40",
        title: "Enforcement (Jurisdiction)",
        group: "Governing Law and Enforcement",
        purpose:
          "Confers jurisdiction on the English courts, deals with service of process, and (where relevant) any arbitration or asymmetric jurisdiction option.",
        illustrative:
          "The courts of England have exclusive jurisdiction to settle any dispute arising out of or in connection with this Agreement. Each Obligor not incorporated in England shall appoint a process agent in England.",
        annotation:
          "Confirm the process-agent appointment for foreign obligors. For a Part 26A plan affecting foreign-law debt, note gategroup (a plan is an insolvency proceeding for jurisdiction purposes).",
        relatedClauses: [],
        relatedCases: ["case:gategroup"],
      },
      // ---- Schedules ----
      {
        id: "sec:levfa:99",
        no: "Schs",
        title: "Schedules (overview)",
        group: "Schedules",
        purpose:
          "The schedules carry much of the operative detail: the original parties and commitments, the conditions precedent, forms of Utilisation Request / Transfer Certificate / Accession Deed, the timetables, the form of Compliance Certificate, and (critically) the negotiated 'Permitted' baskets and the Agreed Security Principles.",
        illustrative:
          "Schedule 1 (The Original Parties) · Schedule 2 (Conditions Precedent) · Schedule 3 (Utilisation Request) · Schedule 4 (Form of Transfer Certificate / Assignment Agreement) · Schedule 5 (Form of Accession Deed) · Schedule 6 (Form of Compliance Certificate) · Schedule 7 (Timetables) · Schedule 8 (Agreed Security Principles) · Schedule 9 (Permitted Transactions / Baskets).",
        annotation:
          "Do not treat the schedules as boilerplate — the commercial deal (baskets, security principles, CP list, compliance-certificate build) is often decided here. The CP schedule and the Agreed Security Principles in particular repay close reading.",
        relatedClauses: ["cl:lev-cp", "cl:sec-principles", "cl:lev-baskets"],
        relatedCases: [],
      },
    ],
  },
];
