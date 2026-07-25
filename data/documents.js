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

  // ============================================================
  // 2. Corporate / Investment-Grade Term & RCF
  // ============================================================
  {
    id: "doc:ig-fa",
    area: "Investment Grade",
    title: "Corporate / Investment-Grade Term and Revolving Facilities Agreement",
    short: "Corporate / IG Term & RCF",
    summary:
      "An illustrative model investment-grade / strong-corporate facilities agreement — a term loan and revolving credit facility with a deliberately light covenant package (a single financial covenant or none, negative pledge and pari passu doing the work), a ratings/leverage margin grid, and a change-of-control put.",
    sections: [
      {
        id: "sec:igfa:01", no: "1", title: "Definitions and Interpretation", group: "Interpretation",
        purpose: "Defines terms and construction. In IG deals the definitions are far tighter than leveraged — EBITDA is closer to the accounts, with limited add-backs.",
        illustrative: "In this Agreement 'Margin' means the rate determined under the ratings/leverage grid in Schedule [ ]; interpretation follows the usual rules (a Finance Document as amended from time to time, singular includes plural, etc.).",
        annotation: "Construed per Wood v Capita / Arnold v Britton. The absence of the elaborate leveraged 'Permitted' definitions is the point — an IG deal runs on a handful of tight definitions.",
        relatedClauses: ["cl:lev-ebitda"], relatedCases: ["case:woodcapita", "case:arnold"],
      },
      {
        id: "sec:igfa:02", no: "2", title: "The Facilities", group: "The Facilities",
        purpose: "Establishes a term facility and a revolving credit facility (often an undrawn backstop), with ancillary facilities available within the RCF.",
        illustrative: "The Lenders make available a term loan facility and a multicurrency revolving credit facility in the amounts of the Total Commitments for each; a Lender's Revolving Facility Commitment may be made available in whole or part as an Ancillary Facility.",
        annotation: "IG RCFs are frequently large, lightly-conditioned liquidity backstops. Confirm the ancillary basket and swingline sublimit.",
        relatedClauses: ["cl:ig-ancillary"], relatedCases: [],
      },
      {
        id: "sec:igfa:03", no: "3", title: "Purpose", group: "The Facilities",
        purpose: "Restricts use of proceeds to refinancing, general corporate and working-capital purposes (and any specified acquisition).",
        illustrative: "The Borrower shall apply amounts borrowed towards the refinancing of existing indebtedness and the general corporate and working-capital purposes of the Group, and shall not apply any amount in breach of the sanctions or anti-corruption undertakings.",
        annotation: "Purpose is broad in IG deals; the Agent is not obliged to monitor application.",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:igfa:04", no: "4", title: "Conditions of Utilisation", group: "The Facilities",
        purpose: "The (short) conditions precedent and the 'further conditions' (no default, repeating reps true) to each utilisation.",
        illustrative: "The Lenders will only be obliged to comply with a Utilisation Request if no Default is continuing or would result, and the Repeating Representations are true in all material respects.",
        annotation: "IG CP lists are short and objective. Note the 'clean-up' on repeating reps to avoid a stale rep blocking an RCF rollover.",
        relatedClauses: ["cl:lev-cp", "cl:lev-reps"], relatedCases: [],
      },
      {
        id: "sec:igfa:05", no: "5", title: "Utilisation and Ancillary Facilities", group: "Utilisation",
        purpose: "Drawing mechanics for the facilities and the ancillary facilities (overdraft, guarantee, LC, swingline) that net down the RCF commitment.",
        illustrative: "The Borrower may utilise a Facility by delivery of a Utilisation Request by the Specified Time. A Borrower and an Ancillary Lender may agree an Ancillary Facility; the aggregate Ancillary Commitments shall not exceed [ ].",
        annotation: "Ancillary facilities share the RCF commitment and (where secured) rank rateably. Rollover conditions are light.",
        relatedClauses: ["cl:ig-ancillary"], relatedCases: [],
      },
      {
        id: "sec:igfa:06", no: "6", title: "Repayment, Prepayment and Cancellation", group: "Repayment, Prepayment and Cancellation",
        purpose: "The term loan repays at maturity (or amortises); the RCF at its termination date; and the borrower may prepay or cancel voluntarily on notice, usually at par with no soft call.",
        illustrative: "The Borrower shall repay the Term Loan on the Termination Date and may, on [3] Business Days' notice, prepay the whole or part of a Loan (in a minimum amount of [ ]) without premium; a Lender may require prepayment of its participation if it becomes unlawful for it to fund.",
        annotation: "IG prepayment is clean (no soft call). Break costs are limited for RFR loans.",
        relatedClauses: ["cl:lev-amort", "cl:lev-voluntaryprepay"], relatedCases: [],
      },
      {
        id: "sec:igfa:07", no: "7", title: "Interest", group: "Costs of Utilisation",
        purpose: "Margin plus the compounded risk-free rate, with the margin set by a ratings and/or leverage grid, plus default interest.",
        illustrative: "The rate of interest is the aggregate of the Margin and the Compounded Reference Rate. The Margin is the rate in the grid in Schedule [ ] opposite the Group's credit rating (or Net Leverage) for the time being; default interest accrues at [1]% above the applicable rate.",
        annotation: "The ratings/leverage margin grid is the defining IG pricing feature. A sustainability-linked ratchet is increasingly overlaid. Default interest must stay proportionate (Cavendish v Makdessi).",
        relatedClauses: ["cl:lev-interest", "cl:lev-marginratchet", "cl:lev-defaultinterest"], relatedCases: ["case:makdessi"],
      },
      {
        id: "sec:igfa:08", no: "8", title: "Interest Periods and Changes to Calculation", group: "Costs of Utilisation",
        purpose: "How interest periods are selected, and the market-disruption / RFR-fallback machinery if the reference rate is unavailable.",
        illustrative: "The Borrower may select Interest Periods of [1, 3 or 6] Months. If a Market Disruption Event occurs, interest on the affected share shall be the Margin plus the relevant Lender's cost of funds, pending agreement of a substitute basis.",
        annotation: "Post-LIBOR, largely the RFR fallback waterfall; rarely invoked.",
        relatedClauses: ["cl:lev-interest", "cl:lev-mktdisruption"], relatedCases: [],
      },
      {
        id: "sec:igfa:09", no: "9", title: "Fees", group: "Costs of Utilisation",
        purpose: "Arrangement fee, a commitment fee on undrawn RCF commitments, a utilisation fee (sometimes), and an agency fee.",
        illustrative: "The Borrower shall pay a commitment fee at [X]% per annum on the undrawn, uncancelled amount of the Revolving Facility Commitments, and any utilisation fee at the rate applicable to the aggregate outstandings.",
        annotation: "IG commitment fees are modest given the backstop nature of the RCF; utilisation fees step with drawn amounts.",
        relatedClauses: ["cl:lev-fees"], relatedCases: [],
      },
      {
        id: "sec:igfa:10", no: "10", title: "Tax Gross-Up, Increased Costs and Indemnities", group: "Additional Payment Obligations",
        purpose: "Gross-up for withholding (Qualifying/Treaty Lenders), the increased-costs indemnity, mitigation, and the tax-credit clawback.",
        illustrative: "If a Tax Deduction is required, the payment shall be increased so the Finance Party receives the amount it would have received absent the deduction, subject to the Qualifying Lender carve-outs; the Borrower shall indemnify Increased Costs arising from a Change in Law.",
        annotation: "Standard LMA tax and increased-costs machinery; get the Qualifying/Treaty Lender and DTTP mechanics right.",
        relatedClauses: ["cl:lev-taxgrossup"], relatedCases: [],
      },
      {
        id: "sec:igfa:11", no: "11", title: "Guarantee and Indemnity", group: "Guarantee",
        purpose: "An upstream guarantee from material subsidiaries (some IG deals are unsecured and even unguaranteed on strength of rating), subject to guarantor-coverage and limitation language.",
        illustrative: "Each Guarantor guarantees to each Finance Party the due performance by each Obligor of its obligations, subject to the guarantee limitations in Schedule [ ]; the Guarantors shall at all times represent not less than [ ]% of consolidated EBITDA (the Guarantor Coverage Test).",
        annotation: "Strong IG credits may be unguaranteed; where guarantees are given, the coverage test and jurisdiction limitations are the negotiation.",
        relatedClauses: ["cl:sec-guarantee", "cl:sec-guaranteelimits"], relatedCases: ["case:etridge"],
      },
      {
        id: "sec:igfa:12", no: "12", title: "Representations and Information Undertakings", group: "Representations, Undertakings and Events of Default",
        purpose: "The representation suite and the reporting package (audited annual and interim financials, a compliance certificate, and default/litigation notices).",
        illustrative: "Each Obligor makes the Representations, the Repeating Representations being deemed repeated on each Utilisation Date and Interest Payment Date. The Company shall deliver audited financials within [120] days and half-year financials within [90] days, with a Compliance Certificate.",
        annotation: "Reporting is lighter and less frequent than leveraged/private-credit. Keep repeating reps tight.",
        relatedClauses: ["cl:lev-reps", "cl:lev-info"], relatedCases: [],
      },
      {
        id: "sec:igfa:13", no: "13", title: "Financial Covenant", group: "Representations, Undertakings and Events of Default",
        purpose: "A single maintenance covenant — typically net leverage or interest cover — tested semi-annually, with an acquisition spike; some true-IG deals have none.",
        illustrative: "The Company shall ensure that on each Test Date the ratio of Net Debt to EBITDA does not exceed [ ]:1, increased by [0.5x] for the two Test Dates following a Material Acquisition (the Acquisition Spike).",
        annotation: "One covenant (or none). The negative pledge and pari passu do most of the protective work in the absence of leveraged-style baskets.",
        relatedClauses: ["cl:ig-financial", "cl:ig-covenants"], relatedCases: [],
      },
      {
        id: "sec:igfa:14", no: "14", title: "General Undertakings", group: "Representations, Undertakings and Events of Default",
        purpose: "A light negative/affirmative covenant set — negative pledge, pari passu, restrictions on disposals and mergers, maintenance of authorisations, and sanctions/anti-corruption.",
        illustrative: "No Obligor shall create Security other than Permitted Security, or dispose of assets other than as permitted, and shall ensure its payment obligations rank at least pari passu with all its other unsecured and unsubordinated obligations.",
        annotation: "No elaborate 'Permitted' baskets — the negative pledge and pari passu are the core protections. The permitted-security list is the main negotiation.",
        relatedClauses: ["cl:sec-negpledge", "cl:ig-covenants"], relatedCases: [],
      },
      {
        id: "sec:igfa:15", no: "15", title: "Change of Control", group: "Representations, Undertakings and Events of Default",
        purpose: "On a change of control, each Lender may (a lender put) cancel its commitment and require prepayment, following a consultation period.",
        illustrative: "Upon a Change of Control, a Lender may, by notice within [ ] days, cancel its Commitments and declare its participation, with accrued interest, immediately due and payable, following a period of [ ] days for consultation with the Company.",
        annotation: "A lender-by-lender put (not automatic acceleration) is standard IG; portability is rare. Draft the CoC definition (thresholds, concert parties, permitted holders) precisely.",
        relatedClauses: ["cl:ig-coc"], relatedCases: [],
      },
      {
        id: "sec:igfa:16", no: "16", title: "Events of Default", group: "Representations, Undertakings and Events of Default",
        purpose: "The EoD suite — non-payment, covenant breach, misrepresentation, cross-default/acceleration, insolvency and unlawfulness — with grace periods and a meaningful cross-default threshold.",
        illustrative: "An Event of Default occurs on non-payment (subject to a short grace period for administrative error), breach of the Financial Covenant, insolvency of a material member of the Group, or cross-acceleration above the Threshold Amount.",
        annotation: "IG deals favour cross-acceleration (not mere cross-default) with a high threshold; no MAC EoD in stronger credits. Construed strictly.",
        relatedClauses: ["cl:lev-eod"], relatedCases: ["case:urvasco"],
      },
      {
        id: "sec:igfa:17", no: "17", title: "Changes to the Lenders and the Obligors", group: "Changes to Parties",
        purpose: "Transfer mechanics (with borrower consent while no default) and accession/resignation of obligors.",
        illustrative: "A Lender may assign or transfer to an Eligible Institution with the prior consent of the Company (not to be unreasonably withheld and deemed given after [10] Business Days) unless an Event of Default is continuing.",
        annotation: "IG transfer regimes are relatively borrower-friendly; disqualified-lender lists are less elaborate than leveraged.",
        relatedClauses: ["cl:lev-transfers"], relatedCases: [],
      },
      {
        id: "sec:igfa:18", no: "18", title: "The Finance Parties, Sharing and Amendments", group: "Administration",
        purpose: "Agency machinery, the pro rata sharing clause, and the amendments regime (Majority Lenders plus all-lender matters).",
        illustrative: "The Agent acts on the instructions of the Majority Lenders. Any amendment may be made with the consent of the Majority Lenders and the Company, save for the all-Lender matters (changes to margin, amount, maturity, or the pro rata sharing and release provisions).",
        annotation: "The Majority-Lender threshold and the all-lender list matter even in IG, though LME risk is lower than leveraged.",
        relatedClauses: ["cl:lev-agency", "cl:lev-sharing"], relatedCases: [],
      },
      {
        id: "sec:igfa:19", no: "19", title: "Governing Law and Enforcement", group: "Governing Law and Enforcement",
        purpose: "English governing law and jurisdiction of the English courts, with process-agent appointment for foreign obligors.",
        illustrative: "This Agreement and any non-contractual obligations are governed by English law; the courts of England have exclusive jurisdiction; each Obligor not incorporated in England appoints a process agent in England.",
        annotation: "English law matters for restructuring recognition (the rule in Gibbs).",
        relatedClauses: [], relatedCases: ["case:gibbs"],
      },
    ],
  },

  // ============================================================
  // 3. Second-Lien / Mezzanine (Junior) Facilities Agreement
  // ============================================================
  {
    id: "doc:mezz-fa",
    area: "Junior",
    title: "Second-Lien / Mezzanine (Junior) Facilities Agreement",
    short: "Second-Lien / Mezzanine",
    summary:
      "An illustrative model junior (second-lien / mezzanine) facilities agreement sitting behind a senior facility — higher-priced, often part-PIK, structurally and contractually subordinated under an intercreditor agreement, with covenants mirroring the senior with headroom cushions and enforcement rights constrained by the intercreditor.",
    sections: [
      {
        id: "sec:mezz:01", no: "1", title: "Definitions and Interpretation", group: "Interpretation",
        purpose: "Defines terms, importing key concepts from the Senior Facilities Agreement and the Intercreditor Agreement (Senior Discharge Date, Permitted Payment, Standstill Period).",
        illustrative: "Terms defined in the Intercreditor Agreement have the same meaning in this Agreement unless otherwise defined; 'Senior Discharge Date' means the date on which all Senior Liabilities have been irrevocably and unconditionally discharged in full.",
        annotation: "The junior facility is drafted to dovetail with the senior and the ICA — read all three together. Construed per Wood v Capita.",
        relatedClauses: ["cl:lev-ebitda"], relatedCases: ["case:woodcapita"],
      },
      {
        id: "sec:mezz:02", no: "2", title: "The Facility", group: "The Facility",
        purpose: "A single (usually term) junior facility, fully drawn at closing alongside the senior debt, sized to bridge the gap between the senior debt and the equity.",
        illustrative: "The Lenders make available a term facility in the amount of the Total Commitments; the Facility is drawn in a single Utilisation on the Closing Date.",
        annotation: "Junior debt is typically fully funded at completion (not a delayed draw). Its size and cost reflect its position in the structure.",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:mezz:13", no: "3", title: "Purpose", group: "The Facility",
        purpose: "Restricts use of proceeds to the acquisition/refinancing and transaction costs, applied together with the senior facilities and the equity contribution.",
        illustrative: "The Borrower shall apply the proceeds towards financing the Acquisition and paying Transaction Costs, in each case together with the Senior Facilities and the Equity Contribution.",
        annotation: "Purpose dovetails with the senior facilities and the funds flow.",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:mezz:14", no: "4", title: "Conditions of Utilisation", group: "The Facility",
        purpose: "Certain-funds-style conditions to the single drawing, mirroring the senior facilities so the junior funds with the same certainty on completion.",
        illustrative: "Utilisation on the Closing Date is subject only to the Major Conditions (the Major Representations and the absence of a Major Default), consistent with the Senior Facilities Agreement.",
        annotation: "Junior conditions track the senior certain-funds regime so both tranches fund together on the acquisition.",
        relatedClauses: ["cl:lev-cp", "cl:lev-certainfunds"], relatedCases: [],
      },
      {
        id: "sec:mezz:03", no: "5", title: "Interest — Cash Pay and PIK", group: "Costs of Utilisation",
        purpose: "A higher margin than senior, with interest payable in cash and/or capitalised (PIK) — and cash interest switched off (PIK-only) when senior payment blockage applies.",
        illustrative: "Interest accrues at the Margin plus the Compounded Reference Rate; the Cash Pay portion is payable in cash and the PIK Portion is capitalised, provided that during a Payment Blockage Period no cash interest shall be payable and all interest shall be capitalised.",
        annotation: "The cash/PIK split and its interaction with senior payment-blockage is the heart of mezzanine economics and subordination. Model the compounding PIK balance.",
        relatedClauses: ["cl:dl-pik", "cl:lev-interest"], relatedCases: [],
      },
      {
        id: "sec:mezz:15", no: "6", title: "Fees", group: "Costs of Utilisation",
        purpose: "The junior fee suite — an arrangement/upfront fee (typically richer than senior), a ticking fee if funding is deferred, and any exit or prepayment premium compensating the lenders for a shortened hold.",
        illustrative: "The Borrower shall pay an arrangement fee equal to [ ]% of the Total Commitments on the Closing Date and, on any prepayment or repayment prior to the [ ] anniversary, an exit premium equal to [the Applicable Premium / a stepped percentage of the amount repaid], in each case only to the extent such payment is a Permitted Payment under the Intercreditor Agreement.",
        annotation: "Junior returns are back-loaded — upfront OID/fees, PIK accrual and an exit or make-whole premium together build the target IRR. Every fee payment is still gated by the ICA permitted-payment regime, so exit premia may accrue but not be payable while senior is out.",
        relatedClauses: ["cl:lev-fees", "cl:ic-permittedpay"], relatedCases: [],
      },
      {
        id: "sec:mezz:16", no: "7", title: "Tax Gross-Up and Increased Costs", group: "Costs of Utilisation",
        purpose: "Standard tax gross-up, tax indemnity and increased-costs protection for the junior lenders, mirroring senior but with the junior's own qualifying-lender and treaty-lender mechanics.",
        illustrative: "All payments shall be made free and clear of Tax save as required by law; if a deduction is required, the Borrower shall gross up, save in respect of a payment to a Lender that is not a Qualifying Lender other than by reason of a Change of Law. The Borrower shall indemnify the Lenders for Increased Costs arising from a change in law or regulatory capital requirements.",
        annotation: "The gross-up/qualifying-lender machinery matters more on junior paper because the lender base is narrower (funds, not banks) — check treaty-passport and double-tax-treaty positions and how they interact with the tighter junior transfer regime.",
        relatedClauses: ["cl:lev-taxgrossup"], relatedCases: [],
      },
      {
        id: "sec:mezz:04", no: "8", title: "Repayment and Prepayment", group: "Repayment, Prepayment and Cancellation",
        purpose: "Bullet repayment at a maturity date falling after the senior maturity, with voluntary and mandatory prepayment permitted only as the Intercreditor Agreement allows.",
        illustrative: "The Borrower shall repay the Loans in full on the Termination Date (which falls no earlier than [6] months after the Senior Termination Date). No prepayment may be made except to the extent constituting a Permitted Payment under the Intercreditor Agreement.",
        annotation: "Junior maturity must sit beyond senior ('longer than senior') and prepayments are gated by the ICA — a junior 'permitted payment' analysis governs.",
        relatedClauses: ["cl:lev-amort", "cl:ic-permittedpay"], relatedCases: [],
      },
      {
        id: "sec:mezz:05", no: "9", title: "Ranking and Subordination", group: "Subordination",
        purpose: "Establishes that the junior liabilities are subordinated to the senior liabilities in right of payment and (for second lien) security, as set out in the Intercreditor Agreement.",
        illustrative: "The Liabilities under this Agreement are subordinated to the Senior Liabilities and rank behind them in right and priority of payment and (in respect of the Transaction Security) in priority of security, in each case as set out in the Intercreditor Agreement.",
        annotation: "Second lien = same collateral, junior ranking; mezzanine = often structurally subordinated too. Directors approaching insolvency owe the creditor duty (Sequana), relevant to the junior's downside.",
        relatedClauses: ["cl:ic-ranking"], relatedCases: ["case:sequana"],
      },
      {
        id: "sec:mezz:06", no: "10", title: "Payment Blockage and Standstill", group: "Subordination",
        purpose: "Cross-refers the intercreditor payment-blockage (stop notices switching off junior cash payments on senior default) and the standstill on junior enforcement.",
        illustrative: "Following delivery of a Payment Stop Notice under the Intercreditor Agreement, the Debtors shall make no payment in respect of the Junior Liabilities during the relevant period; the Junior Creditors shall not take Enforcement Action until expiry of the applicable Standstill Period.",
        annotation: "The number/duration of stop notices (blockage caps) and the stepped standstill periods are negotiated in the ICA. This clause simply pulls those through.",
        relatedClauses: ["cl:ic-permittedpay", "cl:ic-standstill"], relatedCases: [],
      },
      {
        id: "sec:mezz:17", no: "11", title: "Warrants and Equity Kicker", group: "Subordination",
        purpose: "Where the junior return includes an equity component, records the warrant/equity-kicker arrangements (or cross-refers a separate warrant instrument) and the related information and anti-dilution protections.",
        illustrative: "As consideration for the Facility the relevant Holdco shall issue Warrants to the Lenders entitling them to subscribe for [ ]% of the fully diluted ordinary share capital, on the terms of the Warrant Instrument; the Warrants carry customary anti-dilution, tag-along and information rights and are held subject to the Intercreditor Agreement.",
        annotation: "Mezzanine (as opposed to pure second lien) frequently carries an equity kicker to lift blended returns. The warrant terms, anti-dilution and drag/tag interplay with the sponsor's shareholders' agreement — and the equity upside must not disturb the debt's subordination or trip change-of-control triggers.",
        relatedClauses: ["cl:sec-share"], relatedCases: [],
      },
      {
        id: "sec:mezz:07", no: "12", title: "Representations", group: "Representations, Undertakings and Events of Default",
        purpose: "Representations that generally track the senior package (status, binding obligations, no conflict, no misleading information, ranking of the subordinated debt), repeated at the certain-funds standard on the Closing Date.",
        illustrative: "Each Obligor makes the Repeating Representations by reference to the facts existing on each date they are deemed repeated; on the Closing Date only the Major Representations are made, consistent with the Senior Facilities Agreement.",
        annotation: "Reps mirror senior to keep the two agreements aligned, but only the Major Representations bite for certain-funds. Watch the ranking/subordination representation dovetails with the ICA.",
        relatedClauses: ["cl:lev-reps"], relatedCases: [],
      },
      {
        id: "sec:mezz:18", no: "13", title: "Information Undertakings", group: "Representations, Undertakings and Events of Default",
        purpose: "Reporting that tracks the senior package — annual audited and management accounts, a compliance certificate, budgets and (for sponsor deals) lender/monitoring information — delivered to the junior agent in parallel with senior.",
        illustrative: "The Company shall supply its audited consolidated financial statements within [120] days of each financial year end and management accounts within [45] days of each quarter, together with a Compliance Certificate signed by two directors; information provided to the Senior Agent shall be provided concurrently to the Agent.",
        annotation: "Junior lenders live off the same reporting as senior; the key ask is concurrent delivery and equivalent access to management. Skewed information rights are a common early sign a junior is being managed out of a workout.",
        relatedClauses: ["cl:lev-info"], relatedCases: [],
      },
      {
        id: "sec:mezz:19", no: "14", title: "Financial Covenants", group: "Representations, Undertakings and Events of Default",
        purpose: "Maintenance (or, on cov-lite deals, springing) financial covenants set at the same ratios as senior but with a headroom cushion so the junior does not default first, plus a matching equity-cure right.",
        illustrative: "The Financial Covenants correspond to those in the Senior Facilities Agreement, tested at levels providing [10]–[15]% additional headroom to the equivalent Senior levels; the Sponsor may cure a breach in accordance with Equity Cure provisions that mirror the Senior Facilities Agreement.",
        annotation: "The covenant 'cushion' to senior is standard so the junior is not tripped first; align the cure count, add-backs and EBITDA definition with senior to avoid mismatched triggers. On cov-lite deals the junior may take a springing covenant even where senior has none.",
        relatedClauses: ["cl:lev-covenants", "cl:lev-equitycure"], relatedCases: [],
      },
      {
        id: "sec:mezz:08", no: "15", title: "General Undertakings", group: "Representations, Undertakings and Events of Default",
        purpose: "Negative/affirmative covenants mirroring the senior deal with cushions, so the junior is not tripped before senior and its permissions are no tighter than needed.",
        illustrative: "The undertakings in this Clause correspond to the equivalent Senior Undertakings, with baskets and thresholds set at [110]% of the equivalent Senior levels; a breach of a Senior Undertaking that is not an Event of Default under the Senior Facilities Agreement shall not be an Event of Default here.",
        annotation: "Mirroring with cushions avoids the junior having a hair-trigger. Confirm the baskets are sized off the same EBITDA definition.",
        relatedClauses: ["cl:lev-baskets", "cl:lev-rp"], relatedCases: [],
      },
      {
        id: "sec:mezz:09", no: "16", title: "Events of Default", group: "Representations, Undertakings and Events of Default",
        purpose: "An EoD suite mirroring senior, with a cross-default to the senior facilities, but with acceleration/enforcement subject to the intercreditor standstill.",
        illustrative: "The Events of Default correspond to those in the Senior Facilities Agreement. On an Event of Default which is continuing, the Agent may accelerate, but no Enforcement Action may be taken except in accordance with the Intercreditor Agreement.",
        annotation: "The junior can accelerate but generally cannot enforce until the standstill expires — the practical value of junior EoDs is constrained by the ICA.",
        relatedClauses: ["cl:lev-eod", "cl:ic-standstill"], relatedCases: [],
      },
      {
        id: "sec:mezz:10", no: "17", title: "Guarantee and Security", group: "Guarantee and Security",
        purpose: "Second-ranking guarantee and security over the same collateral as senior (for second lien) or structurally junior support (for mezzanine), held by a common security agent under the intercreditor.",
        illustrative: "Each Guarantor guarantees the Junior Liabilities and the Obligors grant second-ranking Transaction Security over the Charged Assets, held by the Security Agent for the Secured Parties and ranking behind the Senior Security as set out in the Intercreditor Agreement.",
        annotation: "Common security agent + agreed security principles + parallel debt as for senior. The ranking and release regime lives in the ICA.",
        relatedClauses: ["cl:sec-guarantee", "cl:sec-principles"], relatedCases: [],
      },
      {
        id: "sec:mezz:20", no: "18", title: "Enforcement — Relationship with Senior", group: "Guarantee and Security",
        purpose: "Governs how and when the junior may act on its security and claims — the standstill gate, the security agent's control of enforcement, and the junior's turnover and release obligations on a senior-led disposal.",
        illustrative: "The Junior Creditors shall not take Enforcement Action except after expiry of the applicable Standstill Period and otherwise in accordance with the Intercreditor Agreement; the Security Agent shall control enforcement and any Distressed Disposal, and the Junior Creditors shall turn over recoveries received in breach of the Intercreditor Agreement and release their claims and security as required to effect a permitted enforcement sale.",
        annotation: "This is where the junior's economic subordination becomes real: it can accelerate but the senior (through the security agent) drives enforcement, can release junior security on a distressed disposal, and turnover captures any leakage. The Serta/Mitel-style priming disputes show how contentious control of enforcement value has become.",
        relatedClauses: ["cl:ic-enforcement", "cl:ic-turnover", "cl:ic-release"], relatedCases: ["case:serta", "case:mitel"],
      },
      {
        id: "sec:mezz:11", no: "19", title: "Option to Purchase", group: "Guarantee and Security",
        purpose: "The junior creditors' right, on senior acceleration/enforcement, to buy out the senior debt at par and take control of the workout — the mezzanine's key defensive tool.",
        illustrative: "At any time after acceleration of the Senior Liabilities, the Junior Creditors may, by notice within [ ] days, purchase all (but not part) of the Senior Liabilities at par plus accrued interest and all other amounts then due (including hedge close-out amounts).",
        annotation: "The buy-out lets the junior avoid being wiped out in a senior-led enforcement. Specify precisely what must be paid and the timing.",
        relatedClauses: ["cl:ic-option", "cl:ic-enforcement"], relatedCases: [],
      },
      {
        id: "sec:mezz:21", no: "20", title: "Consultation and Consent Rights", group: "Guarantee and Security",
        purpose: "The junior's positive protections short of enforcement — consultation before senior takes enforcement action, and consent rights over amendments to the senior documents that would worsen the junior's position (increased quantum, extended maturity, tightened terms).",
        illustrative: "Prior to taking Enforcement Action the Senior Creditors shall consult with the Junior Creditors for a period of [ ] days; no amendment to the Senior Finance Documents that increases the principal amount of the Senior Liabilities, increases the Margin above the agreed cap, extends the final maturity beyond the junior maturity or amends the Permitted Payment provisions shall bind the Junior Creditors without their consent.",
        annotation: "These caps on senior (the 'senior headroom' the junior will and won't accept) are the most negotiated part of the junior/ICA package — they define how far senior can be increased or amended over the junior's head. Weak consent rights are what let liability-management transactions prime junior lenders.",
        relatedClauses: ["cl:ic-standstill", "cl:ds-sacredrights"], relatedCases: ["case:serta"],
      },
      {
        id: "sec:mezz:22", no: "21", title: "Changes to the Lenders", group: "Administration",
        purpose: "Transfer restrictions — often tighter than senior because junior positions are relationship-driven — including Company consent, disqualified-lender lists and whitelist/blacklist mechanics, all subject to the Intercreditor Agreement.",
        illustrative: "A Lender may assign or transfer its rights only with the prior consent of the Company (not to be unreasonably withheld, and deemed given after [10] Business Days), save that no consent is required for a transfer to an Affiliate or Related Fund or while an Event of Default is continuing; no transfer may be made to a Disqualified Lender, and every transferee accedes to the Intercreditor Agreement.",
        annotation: "Who can hold the junior paper matters for who can run a loan-to-own from the junior tranche; disqualified-lender and consent mechanics are the sponsor's defence against a distressed fund building a blocking position. Any transferee must accede to the ICA.",
        relatedClauses: ["cl:lev-transfers", "cl:ds-openmarket"], relatedCases: [],
      },
      {
        id: "sec:mezz:12", no: "22", title: "Amendments and Waivers", group: "Administration",
        purpose: "The amendments regime — Majority Lender consent for most changes and an all-Lender list of sacred/entrenched rights — together with the agency provisions, structured to interlock with the senior and the ICA.",
        illustrative: "Amendments require Majority Lenders and the Company, save that changes to the definition of Majority Lenders, the amount or currency of any commitment, the margin, the maturity, the subordination provisions or any sacred right require the consent of each affected Lender.",
        annotation: "Junior sacred-rights carve-outs and the Majority-Lender threshold matter for who can run a loan-to-own from the junior tranche. Align the entrenched-rights list with the ICA so a senior-side amendment cannot be forced through the junior.",
        relatedClauses: ["cl:lev-agency", "cl:ds-sacredrights"], relatedCases: [],
      },
      {
        id: "sec:mezz:23", no: "23", title: "Governing Law and Enforcement", group: "Administration",
        purpose: "English governing law and jurisdiction, chosen (as for senior) partly because English law does not recognise a discharge of English-law debt under a foreign insolvency process (the rule in Gibbs), which shapes restructuring strategy.",
        illustrative: "This Agreement and any non-contractual obligations arising out of or in connection with it are governed by English law; the courts of England have exclusive jurisdiction, and each Obligor irrevocably submits to that jurisdiction and appoints a process agent.",
        annotation: "The Gibbs rule means English-law junior debt generally cannot be compromised by a foreign proceeding without creditor consent or an English scheme/Part 26A plan — a key lever in cross-border restructurings and in the junior's own downside planning.",
        relatedClauses: ["cl:lev-agency"], relatedCases: ["case:gibbs"],
      },
    ],
  },

  // ============================================================
  // 4. Real Estate Finance Facilities Agreement
  // ============================================================
  {
    id: "doc:ref-fa",
    area: "Real Estate",
    title: "Real Estate Finance Facilities Agreement",
    short: "Real Estate Finance",
    summary:
      "An illustrative model investment real-estate finance facilities agreement — non-recourse propco lending secured on income-producing property, with LTV / debt-yield / DSCR covenants, a controlled-account cash-management and cash-trap/sweep structure, mandatory hedging, permitted disposals with release pricing, and bad-boy recourse carve-outs.",
    sections: [
      {
        id: "sec:reffa:01", no: "1", title: "Definitions and Interpretation", group: "Interpretation",
        purpose: "Defines the property-finance vocabulary — Market Value, Rental Income, Net Rental Income, Loan-to-Value, Debt Yield, Property, Occupational Lease, Managing Agent.",
        illustrative: "'Market Value' means the market value of a Property determined in accordance with the RICS Valuation – Global Standards (Red Book) by a Valuer instructed by the Agent; 'Rental Income' means all amounts payable under the Occupational Leases.",
        annotation: "The Market Value and income definitions drive the LTV and cover covenants — get them precise (Wood v Capita).",
        relatedClauses: [], relatedCases: ["case:woodcapita"],
      },
      {
        id: "sec:reffa:02", no: "2", title: "The Facilities and Purpose", group: "The Facilities",
        purpose: "An investment (term) facility, and often a capex/RCF facility, to fund the acquisition or refinancing of the Properties and permitted capital expenditure.",
        illustrative: "The Lenders make available an investment facility and a capex facility; the Borrower shall apply the investment facility towards the acquisition or refinancing of the Properties and payment of Transaction Costs, and the capex facility towards Permitted Capital Expenditure.",
        annotation: "Development deals add a development facility with drawdown against certified works — a different risk profile (cost overrun, completion).",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:reffa:03", no: "3", title: "Conditions of Utilisation", group: "The Facilities",
        purpose: "The property-specific CPs — certificate of title, valuation, the executed security, insurance, the report on the leases, and the funds flow.",
        illustrative: "The Lenders will only be obliged to fund once the Agent has received the property CPs in Schedule [ ], including a Certificate of Title, a Valuation, the Property Security duly executed, and evidence of Insurances, each in form and substance satisfactory to it.",
        annotation: "Property diligence (title, valuation, leases, environmental) is front-loaded into the CPs. Certificate of title is central.",
        relatedClauses: ["cl:lev-cp"], relatedCases: [],
      },
      {
        id: "sec:reffa:04", no: "4", title: "Repayment and Amortisation", group: "Repayment, Prepayment and Cancellation",
        purpose: "Scheduled amortisation (often modest, e.g. 1–2% p.a.) with a balloon at maturity, reflecting the asset's income profile.",
        illustrative: "The Borrower shall repay the Loan by instalments on each Repayment Date in the amounts set out in Schedule [ ] (Amortisation), with the balance (the balloon) repayable on the Termination Date.",
        annotation: "Amortisation de-levers the loan over its life; the balloon assumes a refinancing or sale at maturity (refinancing risk).",
        relatedClauses: ["cl:lev-amort"], relatedCases: [],
      },
      {
        id: "sec:reffa:05", no: "5", title: "Prepayment, Disposals and Release", group: "Repayment, Prepayment and Cancellation",
        purpose: "Voluntary prepayment, and mandatory prepayment from net disposal and insurance proceeds; in a portfolio, individual-property release at a release price with a retest of the remaining pool.",
        illustrative: "On a disposal of a Property the Borrower shall prepay the Release Price (being [110]% of its Allocated Loan Amount) and shall procure that, immediately after the disposal, the LTV and Debt Yield covenants are satisfied for the remaining Portfolio.",
        annotation: "The release premium de-levers the pool as the best assets are sold (cherry-picking protection). Coordinate with the cash sweep.",
        relatedClauses: ["cl:ref-disposals", "cl:lev-mandprepay"], relatedCases: [],
      },
      {
        id: "sec:reffa:06", no: "6", title: "Interest, Fees and Hedging", group: "Costs of Utilisation",
        purpose: "Margin plus the compounded RFR, the fee suite, and the mandatory interest-rate hedging (cap or swap) protecting debt service.",
        illustrative: "Interest accrues at the Margin plus the Compounded Reference Rate. The Borrower shall maintain hedging with an Approved Hedge Counterparty for not less than [90]% of the Loan for the term, by way of a cap with a strike not exceeding [ ]% or an approved swap.",
        annotation: "A cap avoids swap break costs on prepayment/disposal; the hedge counterparty shares the security and features in any intercreditor.",
        relatedClauses: ["cl:lev-interest", "cl:ref-hedging", "cl:lev-fees"], relatedCases: [],
      },
      {
        id: "sec:reffa:07", no: "7", title: "Property Security", group: "Security and Cash Management",
        purpose: "The security package — first legal mortgage over the Properties, assignment of rent, insurances and hedging, charge over the accounts, and a charge over the propco shares.",
        illustrative: "As security for the Secured Liabilities, the Chargor charges by way of first legal mortgage the Properties and assigns absolutely (subject to reassignment) its rights under the Lease Documents, Insurances, Rental Income and Hedging Agreements, and charges the Accounts.",
        annotation: "The propco share charge enables an enforcement sale of a clean company. Perfection (Companies House 21 days, notices of assignment) is critical.",
        relatedClauses: ["cl:ref-security", "cl:sec-accounts", "cl:sec-perfection"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:reffa:08", no: "8", title: "Cash Management, Cash Trap and Cash Sweep", group: "Security and Cash Management",
        purpose: "The controlled-account structure — rent, deposit and disposal accounts with a defined waterfall — and the cash-trap/sweep that retains or applies excess cash on covenant deterioration before an EoD.",
        illustrative: "All Rental Income shall be paid into the Rent Account and applied on each Payment Date in the order: taxes and property costs, interest and hedge payments, scheduled amortisation, then (absent a Cash Trap Event) to the Borrower; on a Cash Trap Event, surplus is retained in the Deposit Account.",
        annotation: "The account waterfall and the cash-trap/sweep triggers are the lender's real protection — cash control precedes acceleration. Operate account control consistently to keep the charge fixed (Spectrum).",
        relatedClauses: ["cl:ref-cashsweep", "cl:sec-accounts"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:reffa:09", no: "9", title: "Financial Covenant — Loan-to-Value", group: "Financial Covenants",
        purpose: "Caps the loan as a percentage of Market Value, tested against periodic lender-instructed valuations, with cure by prepayment or deposit.",
        illustrative: "The Borrower shall ensure that on each Test Date the Loan-to-Value does not exceed [60]%; a breach may be cured within [ ] Business Days by prepayment or by depositing cash into the Deposit Account, released on cure.",
        annotation: "Valuation frequency and control (lender-instructed, RICS) and the cure mechanics are negotiated. Sequence with the cash trap so control precedes default.",
        relatedClauses: ["cl:ref-ltv"], relatedCases: [],
      },
      {
        id: "sec:reffa:10", no: "10", title: "Financial Covenant — Debt Yield / ICR / DSCR", group: "Financial Covenants",
        purpose: "Income-based covenants testing rental income against debt service — interest cover, debt-service cover, and debt yield — protecting against income decline.",
        illustrative: "The Borrower shall ensure that on each Test Date the Projected Interest Cover Ratio is not less than [ ]:1 and the Debt Yield is not less than [ ]%, calculated on Net Rental Income excluding income from tenants in arrears beyond [ ] days or whose leases expire within [ ] months.",
        annotation: "The income basis (passing/contracted/projected), void and tenant-concentration adjustments are the negotiation, especially for multi-let assets.",
        relatedClauses: ["cl:ref-debtyield"], relatedCases: [],
      },
      {
        id: "sec:reffa:11", no: "11", title: "Valuations", group: "Financial Covenants",
        purpose: "The lender's right to obtain valuations — at least annually and on default, at the borrower's cost — used to test LTV.",
        illustrative: "The Agent may instruct a Valuer to value the Properties at any time, and shall do so at least once in each year; the cost of one Valuation per year (and any Valuation obtained while an Event of Default is continuing) shall be for the account of the Borrower.",
        annotation: "Control over valuer instruction and cost allocation is negotiated; borrowers resist 'valuation on demand' except on default.",
        relatedClauses: ["cl:ref-ltv"], relatedCases: [],
      },
      {
        id: "sec:reffa:12", no: "12", title: "Insurance", group: "Property Undertakings",
        purpose: "Requires full-reinstatement and loss-of-rent cover with approved insurers, the Security Agent noted as composite insured / first loss payee, and proceeds applied to reinstatement or prepayment.",
        illustrative: "The Borrower shall insure the Properties on a full reinstatement basis and for loss of Rental Income for not less than [three] years, procure the Security Agent is named composite insured and first loss payee, and ensure the policy contains a non-vitiation clause.",
        annotation: "The non-vitiation clause protects the lender against an insured's breach voiding cover. Coordinate the proceeds waterfall with mandatory prepayment.",
        relatedClauses: ["cl:ref-insurance"], relatedCases: [],
      },
      {
        id: "sec:reffa:13", no: "13", title: "Property Undertakings", group: "Property Undertakings",
        purpose: "Operational covenants over the Properties — leasing (lender consent to new leases/surrenders above thresholds), repair, headlease compliance, management by an approved Managing Agent, and (for development) monitoring.",
        illustrative: "The Borrower shall not, without the Agent's consent, grant, vary or surrender any Occupational Lease other than on the Approved Lease Terms; shall keep the Properties in good repair; and shall comply with the terms of any Headlease.",
        annotation: "Leasing controls protect the income underpinning the covenants; a duty-of-care deed with the Managing Agent is common. Headlease default is a property-specific EoD.",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:reffa:14", no: "14", title: "Non-Recourse and Recourse Carve-outs", group: "Recourse",
        purpose: "Limits recourse to the propco/Properties, save for 'bad-boy' carve-outs (fraud, misapplication of rents/insurance, unpermitted transfers, voluntary insolvency) under a sponsor guarantee.",
        illustrative: "Recourse against the Sponsor is limited to Losses arising from the Recourse Events (fraud, wilful misconduct, misapplication of Rental Income or Insurance proceeds, or breach of the negative pledge), save that the whole Loan becomes recourse on a voluntary insolvency filing or an unpermitted disposal.",
        annotation: "Distinguish 'loss' carve-outs from 'springing' full-recourse triggers; keep the springing list to genuinely egregious acts and confirm the guarantor's strength.",
        relatedClauses: ["cl:ref-recourse"], relatedCases: [],
      },
      {
        id: "sec:reffa:15", no: "15", title: "Representations and Information Undertakings", group: "Representations, Undertakings and Events of Default",
        purpose: "Representations (including title, leases and environmental) and reporting (rent roll, management accounts, valuations, budgets and notices).",
        illustrative: "Each Obligor represents that it has good and marketable title to the Properties free of Security other than Permitted Security; the Borrower shall deliver a quarterly rent roll, annual budget and updated Valuations as required.",
        annotation: "Property reporting (rent roll, arrears, lease events) is the lender's window on the income. Title and environmental reps are property-specific.",
        relatedClauses: ["cl:lev-reps", "cl:lev-info"], relatedCases: [],
      },
      {
        id: "sec:reffa:16", no: "16", title: "Events of Default", group: "Representations, Undertakings and Events of Default",
        purpose: "The EoD suite plus property-specific events — LTV/cover breach uncured, insurance lapse, loss of headlease, compulsory purchase, and material damage.",
        illustrative: "An Event of Default occurs on non-payment, uncured breach of a Financial Covenant, lapse of Insurances, forfeiture or loss of a Headlease, or the Properties suffering material damage that is not adequately insured.",
        annotation: "Property-specific EoDs sit alongside the standard suite. Align with the cash-trap/cure sequence so cash control bites before an EoD.",
        relatedClauses: ["cl:lev-eod"], relatedCases: ["case:urvasco"],
      },
      {
        id: "sec:reffa:17", no: "17", title: "Finance Parties, Changes and Governing Law", group: "Administration",
        purpose: "The Agent and Security Agent roles (with parallel debt for any foreign security), transfer mechanics, amendments, and English governing law and jurisdiction.",
        illustrative: "The Security Agent holds the Transaction Security for the Secured Parties and acts on the instructions of the Majority Lenders. A Lender may transfer subject to the Company's consent while no Event of Default is continuing. This Agreement is governed by English law.",
        annotation: "Where foreign-situated assets or SPVs are involved, parallel debt supports the security-agent structure. English law and jurisdiction as standard.",
        relatedClauses: ["cl:lev-agency", "cl:sec-parallel", "cl:lev-transfers"], relatedCases: ["case:gibbs"],
      },
    ],
  },

  // ============================================================
  // 5. Security Package (Debenture, Share Charge & Assignments)
  // ============================================================
  {
    id: "doc:sec-pkg",
    area: "Security",
    title: "Security Package — Debenture, Share Charge and Assignments",
    short: "Security Package",
    summary:
      "An illustrative model English-law security suite — the all-assets debenture (fixed and floating charges), a share charge, account and receivables security, assignments of insurances/rent/contracts, the guarantee, and the agency and enforcement mechanics — calibrated by the Agreed Security Principles and perfected within the statutory deadlines.",
    sections: [
      {
        id: "sec:secpkg:01", no: "1", title: "The Security Package (Overview)", group: "Overview",
        purpose: "Explains the composite nature of the package — a debenture plus specific security documents and a guarantee, all held by a Security Agent for the Secured Parties and subject to the Agreed Security Principles.",
        illustrative: "The Transaction Security comprises the Debenture, the Share Charges, the Account Security, the Assignments and the Guarantee, in each case granted in favour of the Security Agent as trustee for the Secured Parties and subject to the Agreed Security Principles.",
        annotation: "The package is only as good as the Agreed Security Principles allow — read those first (they cap the whole thing).",
        relatedClauses: ["cl:sec-principles"], relatedCases: [],
      },
      {
        id: "sec:secpkg:02", no: "2", title: "The Debenture — Fixed Charges", group: "The Debenture",
        purpose: "Fixed charges over the specific, controllable assets — real property, shares, intellectual property, plant, key receivables and the bank accounts.",
        illustrative: "The Chargor charges by way of first fixed charge all its estates and interests in real property, its shares in the Charged Companies, its intellectual property, and its rights in the Accounts and the Assigned Receivables.",
        annotation: "Fixed-charge status turns on control over the asset and its proceeds (Spectrum Plus) — it must be operated consistently or it is recharacterised as floating, changing priority and prescribed-part exposure.",
        relatedClauses: ["cl:sec-debenture", "cl:sec-accounts"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:03", no: "3", title: "The Debenture — Floating Charge", group: "The Debenture",
        purpose: "A floating charge over all other present and future assets, expressed to be a qualifying floating charge so the holder can appoint an administrator out of court.",
        illustrative: "The Chargor charges by way of first floating charge all its assets not effectively charged by way of fixed charge; this floating charge is a qualifying floating charge for the purposes of paragraph 14 of Schedule B1 to the Insolvency Act 1986.",
        annotation: "The QFC underpins the ability to appoint an administrator (and to block a hostile appointment). Note the statutory prescribed part carved out for unsecured creditors from floating-charge realisations.",
        relatedClauses: ["cl:sec-debenture"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:13", no: "4", title: "Crystallisation and Automatic Conversion", group: "The Debenture",
        purpose: "Sets out when the floating charge crystallises into a fixed charge — automatically on certain insolvency/enforcement triggers and by notice otherwise — fixing the assets and improving the chargee's priority.",
        illustrative: "The floating charge shall automatically convert into a fixed charge over the relevant assets on the occurrence of specified events (including any step to appoint an administrator or liquidator, or any third party levying execution), and the Security Agent may by notice convert the floating charge into a fixed charge at any time after it has become enforceable.",
        annotation: "Automatic crystallisation on insolvency-related triggers is standard; but crystallisation does not defeat the statutory prescribed part or preferential creditors, whose claims are still calculated by reference to the property subject to a charge that was floating 'as created' (Spectrum). Over-broad automatic crystallisation can be commercially unhelpful (it can trip the borrower's ordinary dealings), so calibrate the triggers.",
        relatedClauses: ["cl:sec-debenture"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:04", no: "5", title: "Share Charge", group: "Specific Security",
        purpose: "A fixed charge over the shares in obligors, with delivery of certificates and blank transfers, enabling an enforcement sale of the company and the intercreditor 'clean company' distressed disposal.",
        illustrative: "The Chargor charges by way of first fixed charge all the Shares in each Charged Company and delivers the share certificates and duly executed undated blank stock transfer forms; until an Event of Default is continuing the Chargor may exercise voting rights and receive dividends.",
        annotation: "Voting/dividends shift to the Security Agent on default. Confirm the constitution contains no transfer restrictions that impede enforcement.",
        relatedClauses: ["cl:sec-share"], relatedCases: [],
      },
      {
        id: "sec:secpkg:05", no: "6", title: "Account Security and Cash Control", group: "Specific Security",
        purpose: "Fixed charges over bank accounts combined with account control (blocked/controlled accounts) to give the lender cash dominion, with account-bank acknowledgements and withdrawal restrictions.",
        illustrative: "The Chargor charges by way of first fixed charge each Account and shall not deal with amounts standing to the credit of a Controlled Account except as permitted; the Chargor shall procure that each Account Bank acknowledges the security, the withdrawal restrictions and (where required) waives its set-off and combination rights.",
        annotation: "Genuine control over the account and its withdrawals is what keeps the charge fixed rather than floating (Spectrum) — the label is not enough. Obtain the account-bank acknowledgement (and any set-off waiver) to perfect and to establish priority.",
        relatedClauses: ["cl:sec-accounts"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:14", no: "7", title: "Receivables and Book Debts Security", group: "Specific Security",
        purpose: "Security over trade receivables and book debts — expressed as a fixed charge over the debts and their proceeds where control is exercised, with a floating charge fallback, and notice to debtors to perfect a legal assignment.",
        illustrative: "The Chargor charges by way of first fixed charge all its book and other debts and the proceeds thereof, and shall pay all such proceeds into a Controlled Account and not otherwise deal with them; to the extent any such charge takes effect as a floating charge, it is charged accordingly.",
        annotation: "This is the Spectrum battleground: a charge over book debts is only fixed if the chargor is genuinely restricted from using the proceeds (paying into a blocked account under the chargee's control). Without that control it is a floating charge, ranking behind preferential creditors and the prescribed part. Perfect any legal assignment of specific receivables by notice to the debtor (Dearle v Hall priority).",
        relatedClauses: ["cl:sec-accounts", "cl:sec-debenture"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:15", no: "8", title: "Intellectual Property Security", group: "Specific Security",
        purpose: "Fixed charge over (and, where taken, assignment by way of security of) registered and unregistered intellectual property, with registration at the relevant IP registries in addition to Companies House.",
        illustrative: "The Chargor charges by way of first fixed charge all its Intellectual Property, and shall, where required by the Security Agent, execute short-form security over registered IP for filing at the UK Intellectual Property Office and other applicable registries, and shall not permit any registered IP to lapse.",
        annotation: "IP security needs dual perfection: Companies House within 21 days and entry on the specialist registers (UKIPO / EUIPO) to bind third parties and later assignees. Take short-form, registry-friendly security documents for filing, and diligence chain of title and licences-in that the business depends on.",
        relatedClauses: ["cl:sec-debenture", "cl:sec-perfection"], relatedCases: [],
      },
      {
        id: "sec:secpkg:06", no: "9", title: "Assignment of Insurances, Rent and Contracts", group: "Specific Security",
        purpose: "Assignment (absolute, subject to reassignment) of rights under insurances, occupational leases/rent, hedging and material contracts, perfected by notice to the counterparty.",
        illustrative: "The Chargor assigns absolutely (subject to reassignment on discharge) all its rights under the Insurances, the Lease Documents, the Hedging Agreements and the Material Contracts, and shall give notice of assignment to each counterparty and use reasonable endeavours to obtain acknowledgement.",
        annotation: "Notice to the counterparty perfects a legal assignment and fixes priority (the rule in Dearle v Hall). Watch anti-assignment clauses in the underlying contracts.",
        relatedClauses: ["cl:ref-security", "cl:sec-accounts"], relatedCases: [],
      },
      {
        id: "sec:secpkg:16", no: "10", title: "Representations — Title and Security", group: "Representations and Covenants",
        purpose: "The chargor's representations supporting the security — that it owns the charged assets free of other security (save Permitted Security), that the security ranks as first-ranking, and that no consents are needed to create or enforce it.",
        illustrative: "Each Chargor represents that it is the sole legal and beneficial owner of the Charged Assets free from Security other than Permitted Security; that this Deed creates the Security it purports to create with the ranking expressed; and that no consent, filing or registration is required to create, perfect or enforce the Transaction Security other than those being made.",
        annotation: "These reps underpin the lender's security opinion; a gap here (a prior charge, a required consent, a defective title) is what unravels enforcement later. They are typically repeated and tie into the facility agreement's events of default.",
        relatedClauses: ["cl:sec-negpledge", "cl:sec-principles"], relatedCases: [],
      },
      {
        id: "sec:secpkg:17", no: "11", title: "Covenants — Preservation of Security", group: "Representations and Covenants",
        purpose: "Positive and negative covenants protecting the collateral — a negative pledge, restrictions on disposals and dealings, maintenance and insurance of assets, and notification of anything impairing the security.",
        illustrative: "The Chargor shall not create or permit any Security over the Charged Assets (other than Permitted Security) nor dispose of them (other than Permitted Disposals); shall maintain and insure the Charged Assets; and shall notify the Security Agent of any event that would materially impair the Transaction Security.",
        annotation: "The negative pledge and disposals restriction preserve the value and ranking of the security between closing and enforcement; align the Permitted Security/Permitted Disposal carve-outs precisely with the facility agreement so the two documents do not conflict.",
        relatedClauses: ["cl:sec-negpledge"], relatedCases: [],
      },
      {
        id: "sec:secpkg:07", no: "12", title: "Guarantee and Indemnity", group: "Guarantee",
        purpose: "The cross-guarantee from obligors with the indemnity backstop, subject to the guarantee limitations, and the preservation provisions that keep the guarantor bound despite indulgence or variation.",
        illustrative: "Each Guarantor guarantees the Secured Liabilities and, as an independent and primary obligation, indemnifies each Secured Party against loss; the guarantee is a continuing security and is not discharged by any amendment, waiver, time or indulgence granted to any Obligor.",
        annotation: "The preservation wording is there to disapply the rule in Holme v Brunskill (a variation otherwise discharges the guarantor). Watch undue influence where individuals guarantee (Etridge).",
        relatedClauses: ["cl:sec-guarantee", "cl:sec-guaranteelimits"], relatedCases: ["case:holme", "case:etridge"],
      },
      {
        id: "sec:secpkg:08", no: "13", title: "Agreed Security Principles and Limitations", group: "Guarantee",
        purpose: "The schedule calibrating the package across jurisdictions — corporate benefit, financial assistance, capital maintenance, cost/materiality thresholds — and the jurisdiction-specific limitation language.",
        illustrative: "The guarantees and security are subject to the Agreed Security Principles, including that none is required where not permitted by law or where the cost is disproportionate, and are limited as set out in the jurisdiction-specific Limitation Language (e.g. the German Stammkapital limitation).",
        annotation: "These principles and limitations decide what the package actually delivers — driven by local counsel and settled early.",
        relatedClauses: ["cl:sec-principles", "cl:sec-guaranteelimits"], relatedCases: [],
      },
      {
        id: "sec:secpkg:09", no: "14", title: "Parallel Debt and the Security Agent", group: "Agency and Perfection",
        purpose: "The trust on which the Security Agent holds English security, and the parallel-debt covenant supporting security in civil-law jurisdictions that do not recognise the trust.",
        illustrative: "The Security Agent holds the Transaction Security on trust for the Secured Parties. Each Obligor owes to the Security Agent, as a separate and independent obligation (the Parallel Debt), an amount equal to its Liabilities to the Secured Parties, discharged pro tanto by payment of the Liabilities and vice versa.",
        annotation: "Confirm enforceability of the parallel-debt structure with local counsel in each security jurisdiction; no double recovery.",
        relatedClauses: ["cl:sec-parallel"], relatedCases: [],
      },
      {
        id: "sec:secpkg:10", no: "15", title: "Perfection and Registration", group: "Agency and Perfection",
        purpose: "The perfection steps — Companies House registration within 21 days, notices of assignment, delivery of certificates and possession of certificated collateral — that make the security bind third parties and an officeholder.",
        illustrative: "Each Obligor shall register each registrable charge at Companies House within 21 days of creation, serve all notices of assignment, deliver all share certificates and stock transfer forms, and take all other steps necessary to perfect the Transaction Security.",
        annotation: "The 21-day Companies House deadline is a hard trap — a charge not registered in time is void against an administrator/liquidator and other creditors under s.859H CA 2006. Specialist collateral (land, IP, ships, aircraft) needs additional registry filings and possession/notice steps.",
        relatedClauses: ["cl:sec-perfection", "cl:sec-negpledge"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:18", no: "16", title: "Further Assurance and Power of Attorney", group: "Agency and Perfection",
        purpose: "A covenant to do whatever else is needed to give effect to and perfect the security, backed by an irrevocable power of attorney letting the Security Agent execute documents and take perfection/enforcement steps if the chargor does not.",
        illustrative: "Each Obligor shall promptly do all such acts and execute all such documents as the Security Agent may reasonably require to perfect, protect or facilitate enforcement of the Transaction Security, and irrevocably appoints the Security Agent (and any Receiver) its attorney to take any such step on its behalf.",
        annotation: "The power of attorney is the self-help backstop — it lets the Security Agent complete blank transfers, file registrations and execute a sale on enforcement without the chargor's co-operation. It is expressed to be irrevocable and given by way of security (s.4 Powers of Attorney Act 1971) so it survives the donor's insolvency.",
        relatedClauses: ["cl:sec-perfection"], relatedCases: [],
      },
      {
        id: "sec:secpkg:19", no: "17", title: "Tacking and Further Advances", group: "Agency and Perfection",
        purpose: "Preserves the priority of the security for future advances (revolving drawings, incremental and hedging liabilities) so later money ranks with the original security rather than behind an intervening charge.",
        illustrative: "The Transaction Security secures further advances and other future Secured Liabilities; each Secured Party is obliged to make such advances on the terms of the Finance Documents, and the security shall have priority for all such advances to the maximum extent permitted by law.",
        annotation: "Tacking matters because facilities revolve and grow (incremental, hedging): the security must secure future advances with the original priority. Note the interaction with s.49 Land Registration Act 2002 for registered land and with any intervening registered charge of which the chargee has notice.",
        relatedClauses: ["cl:sec-debenture", "cl:sec-negpledge"], relatedCases: [],
      },
      {
        id: "sec:secpkg:11", no: "18", title: "Enforcement — Powers and Officeholders", group: "Enforcement",
        purpose: "When the security becomes enforceable (on an EoD), the extended statutory powers, and the appointment of a receiver or an administrator.",
        illustrative: "On and at any time after an Event of Default which is continuing, the Transaction Security becomes immediately enforceable and the Security Agent may, without the restrictions in sections 93 and 103 of the Law of Property Act 1925, appoint a receiver of, or take possession of, the Charged Assets, or appoint an administrator.",
        annotation: "The LPA restrictions are disapplied and the s.103 notice period removed. Appointment of a receiver vs administrator is a strategic choice driven by the intercreditor and the restructuring plan.",
        relatedClauses: ["cl:sec-debenture"], relatedCases: [],
      },
      {
        id: "sec:secpkg:12", no: "19", title: "Application of Proceeds", group: "Enforcement",
        purpose: "How enforcement recoveries are applied — costs of enforcement first, then in accordance with the intercreditor waterfall, with any surplus to the chargor and the chargor liable for any shortfall.",
        illustrative: "All amounts received on enforcement shall be applied first in payment of the costs and remuneration of the Security Agent and any Receiver, then in accordance with the payment waterfall in the Intercreditor Agreement, and any surplus shall be paid to the person entitled to it; the Chargor remains liable for any shortfall.",
        annotation: "The application waterfall must dovetail exactly with the Intercreditor Agreement, and a receiver applies proceeds subject to the statutory order (preferential creditors and the prescribed part out of floating-charge realisations) — the reason keeping fixed-charge status (Spectrum) matters so much for recovery.",
        relatedClauses: ["cl:ic-enforcement"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:secpkg:20", no: "20", title: "Release of Security", group: "Enforcement",
        purpose: "When and how the security is released — automatically on the final Discharge Date, and, on a permitted or distressed disposal, the Security Agent's authority to release the relevant assets (and junior/guarantee claims) to deliver a clean sale.",
        illustrative: "On the Discharge Date the Security Agent shall, at the Chargor's cost, release the Transaction Security; on any Permitted Disposal or Distressed Disposal the Security Agent is irrevocably authorised to release the Transaction Security over the assets disposed of and to release claims and guarantees as contemplated by the Intercreditor Agreement.",
        annotation: "The distressed-disposal release power is what lets a senior enforcement deliver assets free of junior security and guarantees — the mechanic at the heart of the Stabilus/creditor-on-creditor release cases. Confirm the release authority and the accompanying credit-bidding and consideration protections match the Intercreditor Agreement.",
        relatedClauses: ["cl:ic-release", "cl:ic-enforcement"], relatedCases: [],
      },
      {
        id: "sec:secpkg:21", no: "21", title: "Governing Law and Foreign Security", group: "Enforcement",
        purpose: "English governing law and jurisdiction for the English security documents, and the principle that security over foreign-situated assets is taken under, and governed by, the law of the place where the asset is located (lex situs).",
        illustrative: "This Deed and any non-contractual obligations arising out of or in connection with it are governed by English law and the parties submit to the jurisdiction of the English courts; security over assets situated in another jurisdiction is granted under separate Security Documents governed by the law of that jurisdiction.",
        annotation: "The lex situs rule means a multi-jurisdictional group needs a suite of local-law security documents (each with its own perfection and enforcement regime), coordinated by the intercreditor and the security agent. English law's approach to foreign insolvency processes (Gibbs) also shapes how the secured debt can be restructured.",
        relatedClauses: ["cl:sec-perfection"], relatedCases: ["case:gibbs"],
      },
    ],
  },

  // ============================================================
  // 6. Intercreditor Agreement
  // ============================================================
  {
    id: "doc:ica",
    area: "Intercreditor",
    title: "Intercreditor Agreement",
    short: "Intercreditor Agreement",
    summary:
      "An illustrative model intercreditor agreement for a super-senior RCF / senior secured / second-lien or mezzanine structure — ranking and priority, permitted payments and payment blockage, turnover, junior standstill, senior-controlled enforcement of the shared security, distressed disposals and releases, the junior option to purchase, hedging, and the enforcement waterfall.",
    sections: [
      {
        id: "sec:ica:01", no: "1", title: "Definitions and Ranking", group: "Ranking and Priority",
        purpose: "Defines the creditor classes (Super Senior, Senior Secured, Second Lien / Mezzanine, Hedging, Shareholder / Intra-Group) and the core concepts (Discharge Dates, Permitted Payments, Enforcement Action).",
        illustrative: "In this Agreement the Liabilities are classified as the Super Senior Liabilities, the Senior Secured Liabilities, the Second Lien Liabilities and the Subordinated (Shareholder and Intra-Group) Liabilities, and the Hedging Liabilities as provided herein.",
        annotation: "The class definitions drive the whole document — get them and the 'Discharge Date' concepts right (construed per Wood v Capita).",
        relatedClauses: ["cl:ic-ranking"], relatedCases: ["case:woodcapita"],
      },
      {
        id: "sec:ica:02", no: "2", title: "Priority of Debts and Security", group: "Ranking and Priority",
        purpose: "Establishes the order of priority of the liabilities and of the shared Transaction Security, expressly overriding the order, date or manner of creation of any security.",
        illustrative: "The Liabilities rank in right and priority of payment: first, the Super Senior Liabilities (the RCF and Hedging Liabilities up to the cap); secondly, the Senior Secured Liabilities; thirdly, the Second Lien Liabilities; and lastly, the Subordinated Liabilities. The Transaction Security ranks in the same order, notwithstanding the date of its creation.",
        annotation: "In a super-senior structure the RCF/hedging rank ahead on enforcement proceeds despite ranking pari on the debt. Thames Water shows how new-money priority is litigated.",
        relatedClauses: ["cl:ic-ranking"], relatedCases: ["case:thameswater"],
      },
      {
        id: "sec:ica:03", no: "3", title: "Permitted Payments", group: "Payments",
        purpose: "Defines what payments each junior class may receive while senior debt is outstanding — scheduled cash interest subject to no default, PIK otherwise — and what is blocked.",
        illustrative: "Prior to the Senior Discharge Date, the Debtors may pay the Second Lien Liabilities only as expressly permitted (including scheduled cash interest while no Default is continuing); the Subordinated Liabilities may be paid only to the extent of the Permitted Subordinated Payments.",
        annotation: "The permitted-payment matrix is negotiated hard; it must align with the standstill and turnover provisions.",
        relatedClauses: ["cl:ic-permittedpay"], relatedCases: [],
      },
      {
        id: "sec:ica:04", no: "4", title: "Payment Blockage / Stop Notices", group: "Payments",
        purpose: "The senior creditors' right, on a senior default, to serve a payment stop notice suspending junior payments for a blockage period, subject to caps on the number and duration of notices.",
        illustrative: "On a Senior Event of Default, the Senior Agent may deliver a Payment Stop Notice, following which no payment may be made in respect of the blocked Junior Liabilities during the Payment Blockage Period; no more than [one] Payment Stop Notice may be issued in any [360]-day period.",
        annotation: "Blockage caps (frequency and duration) prevent perpetual blockage. Interaction with junior EoDs (a missed cash payment during blockage should not itself be a junior default) is key.",
        relatedClauses: ["cl:ic-permittedpay"], relatedCases: [],
      },
      {
        id: "sec:ica:05", no: "5", title: "Subordination of Shareholder and Intra-Group Debt", group: "Payments",
        purpose: "Deeply subordinates shareholder and intra-group liabilities, permitting only limited payments, and turning over anything received in breach.",
        illustrative: "The Subordinated Creditors shall not receive any payment in respect of the Subordinated Liabilities except a Permitted Subordinated Payment, and shall hold any other receipt on trust for the Security Agent for application under the Payment Waterfall.",
        annotation: "Shareholder debt sits at the bottom of the structure; the creditor duty (Sequana) constrains how the group deals with it approaching insolvency.",
        relatedClauses: ["cl:ic-ranking"], relatedCases: ["case:sequana"],
      },
      {
        id: "sec:ica:06", no: "6", title: "Junior Creditor Undertakings and Standstill", group: "Enforcement and Standstill",
        purpose: "Restricts junior creditors from accelerating, enforcing, suing or petitioning except as permitted, and imposes stepped standstill periods before any junior enforcement.",
        illustrative: "Until the Senior Discharge Date, no Junior Creditor shall take Enforcement Action save that, following a Junior Event of Default, it may do so after expiry of the relevant Standstill Period (being [90]/[120]/[150]/[179] days depending on the nature of the default), or immediately on an Insolvency Event.",
        annotation: "Stepped standstills give senior first control of the workout. An obligor insolvency typically lifts the standstill.",
        relatedClauses: ["cl:ic-standstill"], relatedCases: [],
      },
      {
        id: "sec:ica:07", no: "7", title: "Turnover of Receipts", group: "Enforcement and Standstill",
        purpose: "Requires any creditor that receives a payment or recovery in breach of the priority/standstill regime to turn it over to the Security Agent, held on trust, for application under the waterfall.",
        illustrative: "If any Creditor receives or recovers any amount that, under this Agreement, it was not entitled to receive (including by set-off or enforcement), it shall hold that amount on trust for the Security Agent and promptly pay it over for application in accordance with the Payment Waterfall.",
        annotation: "Draft the turnover as a trust (a proprietary claim survives the recipient's insolvency), not merely a contractual debt.",
        relatedClauses: ["cl:ic-turnover"], relatedCases: [],
      },
      {
        id: "sec:ica:08", no: "8", title: "Enforcement of Security — Instructing Group", group: "Enforcement of Security",
        purpose: "Determines who controls enforcement of the shared security — the senior-led Instructing Group — and how the Security Agent acts on their instructions.",
        illustrative: "The Security Agent shall take Enforcement Action in respect of the Transaction Security only in accordance with the instructions of the Instructing Group (being the Majority Senior Creditors, subject to any Super Senior consultation and the enforcement principles).",
        annotation: "Post-Adler/Petrofac, enforcement strategy sits alongside the restructuring-plan alternative — a plan may reallocate the surplus the waterfall assumes; advise on both routes together.",
        relatedClauses: ["cl:ic-enforcement"], relatedCases: ["case:adler", "case:petrofac"],
      },
      {
        id: "sec:ica:09", no: "9", title: "Manner of Enforcement and Fair Value", group: "Enforcement of Security",
        purpose: "Requires enforcement to be conducted to obtain fair value — via a public auction, competitive process, or a financial adviser's fairness opinion — protecting junior value.",
        illustrative: "In enforcing the Transaction Security, the Security Agent shall use reasonable care to obtain a fair market price, and any Distressed Disposal shall be made by way of a Public Auction or competitive process, or at a price confirmed as fair by a Financial Adviser.",
        annotation: "The fair-value condition is what makes a senior-led enforcement (and the release of junior claims) defensible — the same fairness concern the Part 26A cases police in the plan context.",
        relatedClauses: ["cl:ic-enforcement"], relatedCases: ["case:petrofac"],
      },
      {
        id: "sec:ica:10", no: "10", title: "Distressed Disposals and Releases", group: "Enforcement of Security",
        purpose: "Authorises the Security Agent, on an enforcement or distressed disposal, to release the Transaction Security and junior guarantees/claims so a clean asset or company can be sold.",
        illustrative: "On a Distressed Disposal, the Security Agent is irrevocably authorised to release the Transaction Security and any Guarantee over the relevant asset (and, on a share sale, the Liabilities and claims of the disposed entity), subject to the fair-value conditions.",
        annotation: "Releasing junior claims on a distressed disposal is the mechanism that delivers a clean sale — its fairness safeguards are exactly the Adler/Petrofac concern.",
        relatedClauses: ["cl:ic-release"], relatedCases: ["case:adler"],
      },
      {
        id: "sec:ica:11", no: "11", title: "Option to Purchase", group: "Enforcement of Security",
        purpose: "Gives junior creditors the right, on senior acceleration/enforcement, to buy out the senior debt at par plus accrued and costs, taking control rather than being wiped out.",
        illustrative: "At any time after acceleration of the Senior Liabilities or the Security Agent taking Enforcement Action, the Second Lien Creditors may, by irrevocable notice within [ ] days, purchase all (but not part) of the Senior Liabilities at par plus accrued interest and all other amounts then due (including Hedging close-out amounts).",
        annotation: "Specify precisely what must be paid and the timing; the option interacts with the enforcement control and the loan-to-own analysis.",
        relatedClauses: ["cl:ic-option"], relatedCases: [],
      },
      {
        id: "sec:ica:12", no: "12", title: "Hedging", group: "Hedging",
        purpose: "Positions hedge counterparties in the priority and enforcement waterfall (often super-senior for close-out amounts, sometimes capped) and limits their voting and termination rights.",
        illustrative: "The Hedging Liabilities rank as Super Senior Liabilities in respect of scheduled amounts and close-out amounts up to the Hedging Cap; a Hedge Counterparty may terminate only in the permitted circumstances and its voting rights are limited as set out herein.",
        annotation: "Define which hedge amounts are super-senior and any cap; coordinate with the facility-level hedging requirement.",
        relatedClauses: ["cl:ic-hedging"], relatedCases: [],
      },
      {
        id: "sec:ica:13", no: "13", title: "Application of Proceeds — the Waterfall", group: "Application of Proceeds",
        purpose: "The order in which enforcement and turnover proceeds are applied — Security Agent costs, super-senior, senior, second-lien, then subordinated and the balance to the debtors.",
        illustrative: "All amounts received by the Security Agent in connection with enforcement shall be applied: first, in payment of the Security Agent's costs and the Receiver's remuneration; secondly, the Super Senior Liabilities; thirdly, the Senior Secured Liabilities; fourthly, the Second Lien Liabilities; and thereafter the surplus to the person entitled to it.",
        annotation: "The waterfall is the economic heart of the ICA; model it under stress and reconcile with the ranking and turnover provisions.",
        relatedClauses: ["cl:ic-ranking", "cl:ic-turnover"], relatedCases: [],
      },
      {
        id: "sec:ica:14", no: "14", title: "Amendments, Consents and Sacred Rights", group: "Administration",
        purpose: "The consent thresholds for amending the intercreditor, and the matters (ranking, subordination, release, pro rata sharing) requiring all-affected-creditor consent.",
        illustrative: "This Agreement may be amended with the consent of the Majority Senior Creditors and the relevant Debtors, save that an amendment affecting the priority or subordination of a Party's Liabilities, the release provisions, or the order of the Payment Waterfall requires the consent of each affected Party.",
        annotation: "The intercreditor is where much of the LME 'sacred rights' battle plays out — the release and priority provisions in particular (Serta and the sacred-rights clause).",
        relatedClauses: ["cl:ds-sacredrights", "cl:lev-agency"], relatedCases: ["case:serta"],
      },
      {
        id: "sec:ica:15", no: "15", title: "Changes to Parties, Insolvency and Governing Law", group: "Administration",
        purpose: "Accession of new creditors and debtors, the effect of an obligor insolvency (proofs, voting, the creditor duty), and English governing law and jurisdiction.",
        illustrative: "Any new creditor or debtor shall accede by Creditor/Debtor Accession Undertaking. In an insolvency of an Obligor, the provisions of this Agreement continue to bind the Parties (including as to turnover and voting). This Agreement is governed by English law.",
        annotation: "Turnover and subordination must survive the obligor's insolvency (hence the trust). English law and an English process aid cross-border enforcement (Gibbs; gategroup on Part 26A jurisdiction).",
        relatedClauses: ["cl:lev-transfers"], relatedCases: ["case:sequana", "case:gategroup"],
      },
    ],
  },

  // ============================================================
  // 7. High-Yield Notes Indenture
  // ============================================================
  {
    id: "doc:hy-indenture",
    area: "High Yield",
    title: "High-Yield Notes Indenture",
    short: "High-Yield Notes",
    summary:
      "An illustrative model high-yield senior (secured) notes indenture — a bond, not a loan — with a fixed coupon and bullet maturity, a non-call/call schedule and change-of-control offer, and incurrence-based covenants (a fixed-charge coverage test rather than maintenance covenants). Note that HY indentures are frequently governed by New York law.",
    sections: [
      {
        id: "sec:hy:01", no: "1", title: "Definitions and Interpretation", group: "Interpretation",
        purpose: "Defines the indenture vocabulary — Consolidated EBITDA, the Fixed Charge Coverage Ratio, the builder / 'available amount' basket, Permitted Liens and Permitted Investments.",
        illustrative: "'Fixed Charge Coverage Ratio' means the ratio of Consolidated EBITDA to Consolidated Fixed Charges for the most recent four fiscal quarters, calculated on a pro forma basis for the relevant transaction.",
        annotation: "Bond definitions are cousins of leveraged-loan definitions but with their own conventions (e.g. the FCCR incurrence test). HY and loan documents in the same capital structure should be reconciled ('covenant conformity').",
        relatedClauses: ["cl:lev-ebitda"], relatedCases: [],
      },
      {
        id: "sec:hy:02", no: "2", title: "The Notes — Issuance, Ranking and Maturity", group: "The Notes",
        purpose: "Issues the notes, fixes their ranking (senior secured or senior, pari with or subordinated to the loans) and their fixed coupon and bullet maturity.",
        illustrative: "The Issuer issues [ ]% Senior Secured Notes due [ ] in an aggregate principal amount of [ ]; the Notes bear interest at [ ]% per annum payable semi-annually and mature on the Maturity Date, and rank pari passu with the Issuer's other senior secured obligations.",
        annotation: "Fixed-rate, bullet, semi-annual — unlike a floating, amortising loan. Ranking and the security/guarantee package are shared with the loans under the intercreditor.",
        relatedClauses: ["cl:ic-ranking", "cl:lev-interest"], relatedCases: [],
      },
      {
        id: "sec:hy:03", no: "3", title: "Optional Redemption and Make-Whole", group: "Redemption",
        purpose: "The call protection — a non-call period, then a declining call premium schedule — plus a make-whole for early redemption and an equity clawback for a portion redeemable from IPO proceeds.",
        illustrative: "The Notes are non-callable until [ ]; thereafter redeemable at the premiums in the redemption table; before the first call date, redeemable at a make-whole price (the greater of 100% and a T+[50]bps discounted value); and up to [40]% redeemable from the proceeds of an equity offering at [par plus coupon].",
        annotation: "Call protection is the bond analogue of soft call — it protects the investor's yield. The make-whole and equity clawback are heavily standardised.",
        relatedClauses: ["cl:lev-voluntaryprepay"], relatedCases: [],
      },
      {
        id: "sec:hy:04", no: "4", title: "Change of Control", group: "Redemption",
        purpose: "On a change of control, the Issuer must offer to repurchase the notes at 101% of principal plus accrued interest (a put, not a call), sometimes with a portability exception.",
        illustrative: "Upon a Change of Control, the Issuer shall make an offer to repurchase all Notes at 101% of principal plus accrued interest; no such offer is required if, on a pro forma basis, the Consolidated Net Leverage Ratio does not exceed the ratio at issuance (portability).",
        annotation: "The 101% change-of-control put is a defining HY feature; portability (survival of the bonds on a sale) mirrors the loan concept and is a genuine issuer win.",
        relatedClauses: ["cl:ig-coc", "cl:lev-portability"], relatedCases: [],
      },
      {
        id: "sec:hy:05", no: "5", title: "Guarantees and Security", group: "The Notes",
        purpose: "Guarantees from the same obligor group as the loans and (for secured notes) shared security held under the intercreditor, subject to agreed security principles.",
        illustrative: "The Notes are guaranteed on a senior basis by each Guarantor and secured by the shared Collateral, in each case subject to the Agreed Security Principles and the terms of the Intercreditor Agreement.",
        annotation: "The notes plug into the same guarantee/security/intercreditor architecture as the loans; the release and enforcement regime lives in the ICA.",
        relatedClauses: ["cl:sec-guarantee", "cl:ic-ranking"], relatedCases: [],
      },
      {
        id: "sec:hy:06", no: "6", title: "Limitation on Indebtedness", group: "Covenants",
        purpose: "The debt covenant — incurrence-based: additional debt is permitted only if, pro forma, the Fixed Charge Coverage Ratio is met, plus a suite of permitted-debt baskets.",
        illustrative: "The Issuer shall not incur Indebtedness unless, on a pro forma basis, the Fixed Charge Coverage Ratio would be at least 2.00:1, save for Indebtedness incurred under the Permitted Debt baskets (including a credit-facility basket and a general basket).",
        annotation: "Incurrence (tested only when you act) vs maintenance (tested every period) is the key HY-vs-loan distinction. The ratio debt plus baskets is the debt capacity — model it in aggregate.",
        relatedClauses: ["cl:lev-baskets", "cl:lev-incremental"], relatedCases: [],
      },
      {
        id: "sec:hy:07", no: "7", title: "Limitation on Restricted Payments", group: "Covenants",
        purpose: "The restricted-payments covenant — dividends, junior-debt prepayments and investments permitted out of a builder ('available amount') basket that grows with cumulative consolidated net income, plus fixed baskets.",
        illustrative: "The Issuer shall not make a Restricted Payment unless no Default exists, the FCCR incurrence test is met, and the payment is within the Available Amount (building at 50% of Consolidated Net Income from the Issue Date) or a permitted RP basket.",
        annotation: "The builder basket is the HY hallmark; the aggregate of the RP, investment and 'permitted payments' baskets is where value can leak. Reconcile with the loan RP covenant.",
        relatedClauses: ["cl:lev-rp"], relatedCases: [],
      },
      {
        id: "sec:hy:08", no: "8", title: "Liens, Asset Sales and Affiliate Transactions", group: "Covenants",
        purpose: "The negative-pledge (permitted liens), the asset-sale covenant (fair value, minimum cash, and application of net proceeds to an offer or reinvestment), and the arm's-length affiliate-transactions covenant.",
        illustrative: "The Issuer shall not create Liens other than Permitted Liens; may only make an Asset Sale for fair market value with at least 75% cash consideration, applying Net Proceeds to repay senior debt or reinvest, failing which to a repurchase offer; and shall transact with Affiliates on arm's-length terms.",
        annotation: "The asset-sale 'offer' mechanic and the liens basket are standard; watch the interplay with unrestricted subsidiaries and the drop-down / J.Crew analysis.",
        relatedClauses: ["cl:sec-negpledge", "cl:lev-mandprepay", "cl:ds-unrestricted"], relatedCases: [],
      },
      {
        id: "sec:hy:09", no: "9", title: "Events of Default and Acceleration", group: "Default and Amendment",
        purpose: "The events of default — non-payment (with a 30-day grace for interest), covenant breach (usually after notice and a cure period), cross-acceleration, and insolvency — and acceleration by the trustee or 25% of holders.",
        illustrative: "An Event of Default includes failure to pay interest within 30 days of the due date, failure to comply with a covenant for [60] days after notice, cross-acceleration above the Threshold, and certain insolvency events; on which the Trustee or holders of at least 25% in principal amount may accelerate.",
        annotation: "Bond EoDs are more forgiving than loans (grace and notice periods) and acceleration needs a holder threshold. The 'no-action' clause limits individual holder enforcement.",
        relatedClauses: ["cl:lev-eod"], relatedCases: [],
      },
      {
        id: "sec:hy:10", no: "10", title: "Amendments, Waivers and Sacred Rights", group: "Default and Amendment",
        purpose: "The consent thresholds — most amendments need a majority in principal amount; 'money terms' (principal, interest, maturity, ranking) need each affected holder.",
        illustrative: "The Indenture may be amended with the consent of holders of a majority in principal amount, save that no amendment may, without the consent of each affected holder, reduce the principal or interest, extend the maturity, or subordinate the Notes or release all or substantially all the Collateral or Guarantees.",
        annotation: "The 'sacred rights' of noteholders are the money terms plus collateral/guarantee releases — the same LME battleground seen in loans (Serta).",
        relatedClauses: ["cl:ds-sacredrights"], relatedCases: ["case:serta"],
      },
      {
        id: "sec:hy:11", no: "11", title: "The Trustee, Governing Law and Notes vs Loans", group: "Boilerplate",
        purpose: "The trustee's role and protections, the governing law (frequently New York, sometimes English for European HY), and the practical differences between bond and loan documentation.",
        illustrative: "The Trustee's duties are limited to those expressly set out and it owes no fiduciary duty; this Indenture is governed by the laws of the State of New York [or England and Wales]. The Notes are freely transferable securities subject to the applicable securities laws.",
        annotation: "Key bond/loan differences: incurrence vs maintenance covenants; a dispersed, transferable bondholder base; the trustee and no-action clause; and (often) New York governing law and US securities-law overlay.",
        relatedClauses: ["cl:lev-agency"], relatedCases: [],
      },
    ],
  },

  // ============================================================
  // 8. Asset-Based Lending (ABL) Facility Agreement
  // ============================================================
  {
    id: "doc:abl-fa",
    area: "ABL",
    title: "Asset-Based Lending (ABL) Facility Agreement",
    short: "Asset-Based Lending",
    summary:
      "An illustrative model asset-based revolving facility — availability driven by a borrowing base of eligible receivables and inventory (rather than cash-flow leverage), with advance rates and reserves, springing cash dominion, field exams and appraisals, a springing fixed-charge covenant, and a split-lien intercreditor with any term-loan lenders.",
    sections: [
      {
        id: "sec:abl:01", no: "1", title: "Definitions and the Borrowing Base", group: "Interpretation",
        purpose: "Defines the borrowing-base machinery — Eligible Receivables, Eligible Inventory, Advance Rates, Reserves and Availability — which govern how much can be drawn.",
        illustrative: "'Borrowing Base' means, at any time, the sum of [85]% of Eligible Receivables and [65]% of the net orderly liquidation value of Eligible Inventory, less Reserves; 'Availability' means the lesser of the Commitments and the Borrowing Base.",
        annotation: "ABL is lent against assets, not leverage. The eligibility criteria, advance rates and (discretionary) reserves are where the lender controls credit — read them closely.",
        relatedClauses: ["cl:sc-warehouse", "cl:sc-eligibility"], relatedCases: [],
      },
      {
        id: "sec:abl:02", no: "2", title: "The Revolving Facility and Utilisation", group: "The Facility",
        purpose: "A revolving facility (with swingline and letter-of-credit sublimits) available up to the lesser of commitments and the borrowing base, drawn against a borrowing base certificate.",
        illustrative: "The Lenders make available a revolving credit facility; a Utilisation may not be made if, after it, the Loans would exceed Availability. The Borrower shall deliver a Borrowing Base Certificate [weekly/monthly] and on each Utilisation.",
        annotation: "Availability fluctuates with the collateral. Overadvances (loans exceeding the base) are tightly controlled and usually an immediate repayment event.",
        relatedClauses: ["cl:sc-warehouse", "cl:lev-cp"], relatedCases: [],
      },
      {
        id: "sec:abl:03", no: "3", title: "Interest, Fees and Repayment", group: "Costs of Utilisation",
        purpose: "Margin plus the compounded RFR, an unused-line (commitment) fee, LC fees, and repayment on demand of any amount exceeding availability.",
        illustrative: "Interest accrues at the Margin plus the Compounded Reference Rate; an unused line fee accrues on the undrawn Commitments; and the Borrower shall immediately repay any amount by which the Loans exceed Availability (an Overadvance).",
        annotation: "Pricing is typically tighter than cash-flow lending given the collateral. The overadvance-repayment mechanic is the core discipline.",
        relatedClauses: ["cl:lev-fees"], relatedCases: [],
      },
      {
        id: "sec:abl:04", no: "4", title: "Security — Receivables, Inventory and Accounts", group: "Collateral and Control",
        purpose: "First-priority security over the ABL priority collateral — receivables, inventory and the collection accounts — plus a floating charge, with the term lenders taking first priority over fixed assets.",
        illustrative: "The Obligors grant first-priority Security over the ABL Priority Collateral (Receivables, Inventory, related books and records, and the Collection Accounts) and a floating charge over their other assets, ranking behind the Term Loan Security over the Term Priority Collateral.",
        annotation: "The collateral split (ABL first on current assets, term first on fixed assets) is the heart of an ABL/term structure. Fixed-charge status over accounts needs real control (Spectrum).",
        relatedClauses: ["cl:sec-accounts", "cl:sec-debenture"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:abl:05", no: "5", title: "Cash Dominion and Blocked Accounts", group: "Collateral and Control",
        purpose: "Springing cash dominion — collections sweep to the lender's blocked account (via lockboxes / deposit account control agreements) on a trigger (availability falling below a threshold or an event of default).",
        illustrative: "During a Cash Dominion Period (which commences if Availability is less than [X]% of the Commitments or an Event of Default occurs), all collections in the Blocked Accounts shall be swept daily to the Agent and applied to the Loans.",
        annotation: "Springing (not permanent) cash dominion is market — full control only bites in stress. The DACA / lockbox mechanics are operationally critical.",
        relatedClauses: ["cl:sec-accounts"], relatedCases: ["case:spectrum"],
      },
      {
        id: "sec:abl:06", no: "6", title: "Field Examinations and Appraisals", group: "Collateral and Control",
        purpose: "The lender's right to conduct periodic field exams of the collateral and inventory appraisals, more frequently when availability is low or a default exists, at the borrower's cost.",
        illustrative: "The Agent may conduct [ ] field examinations and [ ] inventory appraisals in each year (and additional ones during a Cash Dominion Period or while an Event of Default is continuing), the cost of which shall be for the account of the Borrower.",
        annotation: "Field exams and appraisals keep the borrowing base honest — a distinctive ABL feature. Frequency steps up with risk.",
        relatedClauses: [], relatedCases: [],
      },
      {
        id: "sec:abl:07", no: "7", title: "Springing Financial Covenant", group: "Covenants",
        purpose: "A single springing fixed-charge coverage covenant, tested only when excess availability falls below a threshold — otherwise the facility is effectively covenant-light.",
        illustrative: "If at any time Excess Availability is less than the greater of [X] and [10]% of the Commitments, the Borrower shall maintain a Fixed Charge Coverage Ratio of not less than 1.00:1, tested until Excess Availability has exceeded the threshold for [30] consecutive days.",
        annotation: "The springing FCCR (triggered by low availability) is the standard ABL covenant — the collateral does the work, the covenant is a backstop.",
        relatedClauses: ["cl:lev-covenants"], relatedCases: [],
      },
      {
        id: "sec:abl:08", no: "8", title: "Representations, Reporting and Events of Default", group: "Representations, Undertakings and Events of Default",
        purpose: "Representations and collateral reporting (the borrowing base certificate, ageings, inventory reports) and an EoD suite including borrowing-base and cash-dominion breaches.",
        illustrative: "The Borrower shall deliver the Borrowing Base Certificate and supporting receivables ageings and inventory reports; an Event of Default includes an uncured Overadvance, failure to maintain the required reporting, or the springing covenant breach.",
        annotation: "Reporting is more granular and frequent than cash-flow lending because availability depends on it.",
        relatedClauses: ["cl:lev-reps", "cl:lev-info", "cl:lev-eod"], relatedCases: [],
      },
      {
        id: "sec:abl:09", no: "9", title: "ABL / Term Loan Intercreditor", group: "Intercreditor",
        purpose: "The split-lien intercreditor between the ABL and any term lenders — each has first priority over its priority collateral, with access rights and a standstill over the other's collateral.",
        illustrative: "The ABL Lenders and the Term Lenders enter into an Intercreditor Agreement under which each has first priority over its Priority Collateral; the Term Agent's enforcement against ABL Priority Collateral is subject to a standstill and the ABL Agent's access rights to process inventory.",
        annotation: "The ABL/term intercreditor (a US-style 'split collateral' ICA) differs from the senior/junior ICA — the two classes are pari but on different collateral. Access rights (to run down inventory) are keenly negotiated.",
        relatedClauses: ["cl:ic-ranking", "cl:ic-enforcement"], relatedCases: [],
      },
      {
        id: "sec:abl:10", no: "10", title: "Finance Parties, Changes and Governing Law", group: "Administration",
        purpose: "Agency machinery, transfers, amendments, and English (or New York) governing law and jurisdiction.",
        illustrative: "The Agent acts on Majority-Lender instructions; a Lender may transfer subject to the Company's consent while no Event of Default is continuing; this Agreement is governed by English law.",
        annotation: "ABL is well developed in the US; the mechanics translate to English law with a debenture and account control. Governing law follows the collateral and market.",
        relatedClauses: ["cl:lev-agency", "cl:lev-transfers"], relatedCases: ["case:gibbs"],
      },
    ],
  },

  // ============================================================
  // 9. Fund Finance — Subscription (Capital Call) Facility
  // ============================================================
  {
    id: "doc:subline",
    area: "Fund Finance",
    title: "Fund Finance — Subscription (Capital Call) Facility Agreement",
    short: "Subscription Line",
    summary:
      "An illustrative model subscription (capital-call) facility for a closed-ended fund — a revolving facility secured not on the fund's assets but on the undrawn capital commitments of the investors, the general partner's right to call that capital, and the account into which it is funded; availability is driven by a borrowing base of 'included' investor commitments.",
    sections: [
      {
        id: "sec:sub:01", no: "1", title: "Definitions and the Borrowing Base", group: "Interpretation",
        purpose: "Defines the subscription-finance vocabulary — Capital Commitments, Uncalled Capital, Included and Excluded Investors, Advance Rates and the Borrowing Base of includible commitments.",
        illustrative: "'Borrowing Base' means the aggregate of the Uncalled Capital Commitments of the Included Investors, each multiplied by the applicable Advance Rate for that Investor's rating category, subject to the Concentration Limits.",
        annotation: "The credit is the investors' obligation to fund capital calls, not the fund's assets. Investor credit quality, 'included/excluded' status and concentration limits drive availability.",
        relatedClauses: ["cl:sc-eligibility"], relatedCases: ["dev:fundfinance-docs"],
      },
      {
        id: "sec:sub:02", no: "2", title: "The Facility and Purpose", group: "The Facility",
        purpose: "A revolving facility used to bridge capital calls — funding investments and fund expenses ahead of drawing capital from investors — smoothing cash-flow and IRR timing.",
        illustrative: "The Lenders make available a revolving facility to be applied towards making Portfolio Investments and paying Fund expenses pending the drawdown of Capital Commitments; each Loan is to be repaid from the proceeds of a Capital Call.",
        annotation: "Subscription lines are short-term bridges repaid from capital calls; note the fund's own LPA limits on borrowing and the (often) 'clean-down' expectation.",
        relatedClauses: [], relatedCases: ["dev:fundfinance-docs"],
      },
      {
        id: "sec:sub:03", no: "3", title: "Conditions and the LPA", group: "The Facility",
        purpose: "The conditions precedent — review of the limited partnership agreement (borrowing power, capital-call mechanics, overcall limitations) and delivery of investor consent letters / acknowledgements.",
        illustrative: "It is a condition that the Agent has reviewed the LPA and is satisfied as to the Fund's power to borrow and to grant security over the Capital Commitments and Call Rights, and has received Investor Letters from Investors representing not less than [ ]% of Commitments.",
        annotation: "The LPA is the foundational document — the lender must confirm borrowing power, the right to call capital to repay the loan, and any overcall/limitation provisions.",
        relatedClauses: ["cl:lev-cp"], relatedCases: [],
      },
      {
        id: "sec:sub:04", no: "4", title: "Security — Uncalled Commitments and Call Rights", group: "Security",
        purpose: "Security over the fund's right to call capital, the investors' funding obligations, and the collateral account into which called capital is paid.",
        illustrative: "The Fund and the General Partner grant Security over (a) the right to make Capital Calls and to receive Capital Contributions, (b) the Uncalled Capital Commitments, and (c) the Collateral Account into which Capital Contributions are funded.",
        annotation: "This is the defining feature — you take security over the right to call capital and the account, not the underlying portfolio (contrast NAV facilities). Perfection of the assignment and account control are key.",
        relatedClauses: ["cl:sec-accounts"], relatedCases: [],
      },
      {
        id: "sec:sub:05", no: "5", title: "Capital Call Mechanics and Investor Letters", group: "Security",
        purpose: "The lender's right, on an event of default, to issue capital calls directly to investors, supported by investor consent letters acknowledging the security and agreeing to fund without set-off or defence.",
        illustrative: "Following an Event of Default, the Agent may exercise the Call Rights and issue Capital Calls directly to the Investors, who (pursuant to their Investor Letters) shall fund such calls into the Collateral Account without set-off, counterclaim or defence.",
        annotation: "The enforceability of the direct-call right and the investor acknowledgements (no set-off/defence) are what make the security bankable — diligence them carefully.",
        relatedClauses: [], relatedCases: ["dev:fundfinance-docs"],
      },
      {
        id: "sec:sub:06", no: "6", title: "Representations and Coverage", group: "Representations, Undertakings and Events of Default",
        purpose: "Representations (LPA in force, borrowing permitted, no undisclosed side letters cutting down commitments) and the coverage requirement that the loans not exceed the borrowing base.",
        illustrative: "The Fund represents that the LPA is in full force, that borrowing and the grant of Security are permitted, and that no side letter materially adversely affects an Included Investor's obligation to fund; the Loans shall not at any time exceed the Borrowing Base.",
        annotation: "Side letters can excuse or reduce an investor's obligation to fund calls (or exclude them from a call to repay debt) — a key diligence and representation point.",
        relatedClauses: ["cl:lev-reps", "cl:sc-warehouse"], relatedCases: [],
      },
      {
        id: "sec:sub:07", no: "7", title: "Information and Events of Default", group: "Representations, Undertakings and Events of Default",
        purpose: "Reporting (investor reports, capital-account statements, notices of LPA amendments and defaulting or transferring investors) and an EoD suite tuned to the fund structure.",
        illustrative: "The Fund shall notify the Agent of any LPA amendment, any Investor default or transfer, or any event affecting an Included Investor; an Event of Default includes a borrowing-base overadvance, a material LPA breach, the removal of the General Partner, or a key Investor ceasing to be an Included Investor.",
        annotation: "GP removal, LPA amendment and investor default/transfer are the fund-specific risks the EoDs and reporting are built around.",
        relatedClauses: ["cl:lev-info", "cl:lev-eod"], relatedCases: ["dev:navfinance-issues"],
      },
      {
        id: "sec:sub:08", no: "8", title: "Finance Parties, Changes and Governing Law", group: "Administration",
        purpose: "Agency machinery, transfer provisions, amendments, and English governing law and jurisdiction.",
        illustrative: "The Agent acts on Majority-Lender instructions; a Lender may transfer subject to the Fund's consent while no Event of Default is continuing; this Agreement is governed by English law.",
        annotation: "Subscription lines are heavily relationship- and structure-driven; the LPA and investor base, not the boilerplate, are where the work is. Contrast NAV facilities, secured on the portfolio itself.",
        relatedClauses: ["cl:lev-agency", "cl:lev-transfers"], relatedCases: ["dev:navfinance-issues"],
      },
    ],
  },
];
