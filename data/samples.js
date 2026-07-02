// data/samples.js — illustrative drafting wording, keyed by clause id.
//
// These are short, adapt-me starter snippets in an LMA/market idiom — NOT a
// substitute for the current LMA form or tailored drafting. Bracketed [ ] items
// are deal-specific. Clauses that already carry an inline `sample` field in
// playbook.js take precedence over anything here.

export const SAMPLES = {
  // ---- Leveraged ----
  "cl:lev-covenants":
    "The Company shall ensure that, on each Test Date, the Total Net Leverage Ratio for the Relevant Period ending on that date does not exceed the ratio set out opposite that Test Date in Schedule [ ] (Financial Covenant); [this Clause is tested only on each date on which Revolving Facility utilisations exceed [40]% of Total Commitments (a springing covenant)].",
  "cl:lev-ebitda":
    "'EBITDA' means, for any Relevant Period, the consolidated operating profit of the Group before interest, tax, depreciation and amortisation, adjusted (without double counting) to add back run-rate cost savings and synergies reasonably expected within [18] months [capped at [ ]% of EBITDA], exceptional and non-recurring items, and calculated on a pro forma basis for acquisitions and disposals made during the period.",
  "cl:lev-baskets":
    "The Group may incur Financial Indebtedness under the General Debt Basket up to the greater of £[ ] and [ ]% of EBITDA, and utilise the Available Amount, in each case so long as no Event of Default is continuing and (in the case of the Available Amount) the Total Net Leverage Ratio (pro forma) does not exceed [ ]:1.",
  "cl:lev-portability":
    "A Change of Control shall not require prepayment if, on a pro forma basis immediately after it, the Total Net Leverage Ratio is no greater than the ratio as at the Closing Date and no Event of Default is continuing (a 'Permitted Change of Control'), which may be relied on [once].",
  "cl:lev-mac":
    "'Material Adverse Effect' means a material adverse effect on: (a) the business, assets or financial condition of the Group taken as a whole; (b) the ability of an Obligor to perform its payment obligations under the Finance Documents; or (c) the validity or enforceability of, or the rights or remedies of any Finance Party under, the Finance Documents.",
  "cl:lev-certainfunds":
    "During the Certain Funds Period, no Finance Party shall be entitled to refuse to participate in a Certain Funds Utilisation, cancel a Commitment, or accelerate or enforce, except to the extent that a Major Default is continuing or a Major Representation is incorrect in any material respect.",
  "cl:lev-sanctions":
    "No Obligor shall directly or indirectly use the proceeds of any Loan for the benefit of any Restricted Party or in any manner that would result in a breach of Sanctions by any party, provided that this undertaking shall not apply to the extent it would result in a breach of [the EU Blocking Regulation].",
  "cl:lev-mandprepay":
    "An amount equal to [50]% of Excess Cashflow for each financial year (stepping down to [25]% and [0]% where the Total Net Leverage Ratio is not more than [ ]:1 and [ ]:1 respectively) shall be applied in prepayment of the Facilities within [10] Business Days of delivery of the audited financial statements.",
  "cl:lev-incremental":
    "The Borrower may establish one or more Incremental Facilities in an aggregate amount not exceeding the sum of (a) the Free and Clear Amount (the greater of £[ ] and [ ]% of EBITDA) and (b) any additional amount, so long as the Senior Secured Net Leverage Ratio (pro forma) does not exceed [ ]:1 (the 'Ratio Amount').",
  "cl:lev-rp":
    "The Company shall not make any Restricted Payment except (a) out of the Available Amount so long as no Event of Default is continuing and the Total Net Leverage Ratio (pro forma) does not exceed [ ]:1, and (b) as permitted under Schedule [ ] (Permitted Payments).",
  "cl:lev-transfers":
    "A Lender may assign or transfer its rights or obligations to another Lender or an Affiliate, or (while no Event of Default is continuing) to any other person with the prior consent of the Company (not to be unreasonably withheld and deemed given if no response is received within [10] Business Days), provided that no assignment or transfer may be made to a Disqualified Lender.",

  // ---- Direct lending ----
  "cl:dl-agl":
    "The relative rights of the First Out Lenders and the Last Out Lenders (including the application of payments and enforcement proceeds, voting, standstill and the right to purchase) are set out in the Agreement Among Lenders, which confers no rights on, and need not be disclosed to, any Obligor.",
  "cl:dl-pik":
    "Interest on each Loan may, at the Borrower's option on notice to the Agent, be paid in cash or capitalised and added to the outstanding principal (PIK), provided that from the first Interest Period commencing after the Total Net Leverage Ratio is less than [ ]:1, interest shall be payable in cash.",
  "cl:dl-covenant":
    "The Company shall ensure that on each Test Date the Total Net Leverage Ratio does not exceed [ ]:1; the Sponsor may cure a breach by procuring an equity contribution (treated as increasing EBITDA) on no more than [two] occasions in any [four] consecutive Test Dates and not in consecutive Test Dates.",
  "cl:dl-ddtl":
    "The Delayed Draw Facility is available during the Availability Period to fund Permitted Acquisitions and capital expenditure, subject on each Utilisation to no Default continuing and the Total Net Leverage Ratio (pro forma) not exceeding [ ]:1; a ticking fee of [ ]% per annum accrues on the undrawn Commitments.",

  // ---- Distressed & special situations ----
  "cl:ds-unrestricted":
    "The Company may designate a Subsidiary as an Unrestricted Subsidiary so long as no Event of Default results and the designation is treated as an Investment equal to the fair market value of that Subsidiary (using capacity under the Investments Basket), provided that no material Intellectual Property shall be transferred to an Unrestricted Subsidiary.",
  "cl:ds-newmoney":
    "The incurrence of any Super Priority Debt ranking ahead of the Facilities, or any subordination of the Liabilities or the Transaction Security, requires the consent of each affected Lender; any new-money financing offered to Lenders shall be offered pro rata to all Lenders.",
  "cl:ds-l2o":
    "No Lender may assign or transfer its participation to a Disqualified Lender (including any Loan-to-Own Fund or Competitor) without the Company's consent while no Event of Default is continuing; on and after an acceleration such consent is not required, and a Lender may credit bid its Liabilities on any enforcement of the Transaction Security.",

  // ---- Structured credit ----
  "cl:sc-warehouse":
    "No Advance shall be made if it would cause the aggregate principal outstanding to exceed the Borrowing Base (being, for each Eligible Asset, its value multiplied by the applicable Advance Rate, less any Concentration Excess); on a Borrowing Base Deficiency the Borrower shall within [ ] Business Days cure it by prepayment or by delivering additional Eligible Assets (a mark-to-market margin call).",
  "cl:sc-clotests":
    "If on any Determination Date an Overcollateralisation Test or Interest Coverage Test is not satisfied, Interest Proceeds and (to the extent necessary) Principal Proceeds shall be applied to redeem the most senior Class of Notes outstanding until each such Test is satisfied, in priority to payments to the subordinated Notes and the Income Notes.",
  "cl:sc-truesale":
    "The parties intend that each sale of Receivables constitutes a true sale and absolute assignment, such that the Receivables and their proceeds are not property of the Seller and the transaction is not a loan secured on the Receivables; the Seller shall have no right or obligation to reacquire any Receivable except as expressly permitted.",
  "cl:sc-riskretention":
    "The Originator shall retain on an ongoing basis a material net economic interest of not less than 5% in accordance with [the UK Securitisation Regulation], in the form of [a vertical interest in each Class / the first-loss tranche], and shall not sell, transfer or hedge that retained interest save as permitted.",
  "cl:sc-waterfall":
    "On each Payment Date, Interest Proceeds shall be applied in the following order of priority: (i) taxes and trustee/administrative expenses (subject to the Expense Cap); (ii) senior Collateral Management Fee; (iii) interest on the Class A Notes; (iv) if a Coverage Test is not met, to redeem Notes sequentially until met; and finally the balance to the Income Notes.",
  "cl:sc-eligibility":
    "An obligation is an 'Eligible Asset' only if (among other things) it is [a senior secured loan], is denominated in a Permitted Currency, is not a Defaulted Obligation, and its acquisition would not cause any Concentration Limit (including the single-obligor, industry and [CCC] rating limits) to be exceeded.",

  // ---- Intercreditor ----
  "cl:ic-ranking":
    "The Liabilities shall rank in right and priority of payment: first, the Super Senior Liabilities (the Revolving Facility and Hedging Liabilities up to the Hedging Cap); secondly, the Senior Secured Liabilities; and thirdly, the Second Lien Liabilities — in each case as more fully set out in this Agreement, notwithstanding the ranking, date or order of creation of any Security.",
  "cl:ic-turnover":
    "If any Junior Creditor receives or recovers any amount that, under this Agreement, it was not entitled to receive, it shall promptly pay that amount to the Security Agent and, pending payment, shall hold it on trust for the Security Agent for application in accordance with the Payment Waterfall.",
  "cl:ic-enforcement":
    "The Security Agent shall take Enforcement Action in respect of the Transaction Security only in accordance with the instructions of the [Majority Senior Creditors]; in enforcing, the Security Agent shall be obliged to obtain consideration which is [a fair market price / confirmed as fair by a Financial Adviser].",
  "cl:ic-release":
    "On a Distressed Disposal, the Security Agent is irrevocably authorised to release the Transaction Security and any Guarantee over the relevant asset (and, on a sale of shares, the Liabilities and claims of the disposed entity), provided the disposal is made [by way of a Public Auction or competitive process / at a price confirmed as fair by a Financial Adviser].",
  "cl:ic-permittedpay":
    "Prior to the Senior Discharge Date, the Debtors may make payments in respect of the Junior Liabilities only to the extent expressly permitted (including scheduled cash interest while no Default is continuing); following delivery of a Payment Stop Notice, no payment may be made in respect of the Junior Liabilities during the Standstill Period.",
  "cl:ic-hedging":
    "The Hedging Liabilities shall rank as Super Senior Liabilities in respect of [scheduled amounts and close-out amounts up to the Hedging Cap]; a Hedge Counterparty may terminate a Hedging Transaction only in the circumstances permitted by this Agreement, and its voting rights are limited as set out herein.",
  "cl:ic-option":
    "At any time after acceleration of the Senior Liabilities, the Second Lien Creditors may, by irrevocable notice given within [ ] days, purchase all (but not part) of the Senior Liabilities at par plus accrued interest and all other amounts then due (including Hedging close-out amounts and costs).",

  // ---- IG / RCF ----
  "cl:ig-covenants":
    "The Borrower shall ensure that the ratio of EBITDA to Net Finance Charges for each Relevant Period is not less than [ ]:1; and the Group shall not create Security other than Permitted Security and shall ensure that the Facilities rank at least pari passu with all its other unsecured and unsubordinated obligations.",
  "cl:ig-financial":
    "The Total Net Leverage Ratio for each Relevant Period shall not exceed [ ]:1, provided that for any Relevant Period in which a Material Acquisition completes, that level shall be increased by [0.5x] for that Test Date and the following [two] Test Dates (an 'Acquisition Spike').",
  "cl:ig-coc":
    "Upon a Change of Control, a Lender may, by notice within [ ] days, cancel its Commitments and declare its participation, together with accrued interest and all other amounts, immediately due and payable, following a period of [ ] days for consultation.",
  "cl:ig-ancillary":
    "A Borrower and a Lender may agree that all or part of that Lender's Revolving Facility Commitment be made available as an Ancillary Facility (by way of overdraft, guarantee, documentary or standby letter of credit, or short-term loan facility); the aggregate of the Ancillary Commitments shall not exceed £[ ].",

  // ---- Real estate finance ----
  "cl:ref-security":
    "As continuing security for the Secured Liabilities, the Chargor (a) charges by way of first legal mortgage the Properties; (b) assigns absolutely (subject to reassignment on discharge) its rights under the Lease Documents, the Insurances, the Rental Income and the Hedging Agreements; and (c) charges by way of first fixed charge the Accounts.",
  "cl:ref-cashsweep":
    "If on any Test Date the Historical Debt Yield is less than [ ]% (a 'Cash Trap Event'), all amounts standing to the credit of the Rent Account after payment of items ranking in priority shall be retained in the Deposit Account and shall not be released to the Borrower until the Cash Trap Event has been remedied for [two] consecutive Test Dates.",
  "cl:ref-debtyield":
    "The Borrower shall ensure that on each Test Date (a) the Projected Interest Cover Ratio is not less than [ ]:1 and (b) the Debt Yield is not less than [ ]%, in each case calculated on Net Rental Income excluding income from any tenant in arrears by more than [ ] days or whose lease expires within [ ] months.",
  "cl:ref-disposals":
    "The Borrower may dispose of a Property so long as it prepays the Loan by the Release Price for that Property (being [110]% of its Allocated Loan Amount) and, immediately after the disposal, the Loan-to-Value and Debt Yield covenants are satisfied in respect of the remaining Portfolio.",
  "cl:ref-recourse":
    "Recourse against the Sponsor under the Recourse Guarantee is limited to Losses suffered by the Finance Parties arising from [fraud, wilful misconduct, misappropriation of Rental Income or Insurance proceeds, or breach of the negative pledge], save that the entire Loan shall become recourse to the Sponsor upon [a voluntary insolvency filing by an Obligor or an unpermitted disposal of a Property].",
  "cl:ref-hedging":
    "The Borrower shall maintain interest-rate hedging with an Approved Hedge Counterparty in respect of not less than [90]% of the Loan for not less than [the term of the Loan], by way of a cap with a strike rate not exceeding [ ]% or a swap on terms approved by the Agent.",

  // ---- Security & guarantees ----
  "cl:sec-debenture":
    "The Company, with full title guarantee, charges to the Security Agent: (a) by way of first legal mortgage its freehold and leasehold property; (b) by way of first fixed charge its shares, intellectual property, plant and machinery, and the Accounts and material receivables; and (c) by way of first floating charge all its assets (this floating charge being a qualifying floating charge for the purposes of the Insolvency Act 1986).",
  "cl:sec-principles":
    "The guarantees and security to be granted are subject to the Agreed Security Principles in Schedule [ ], including that none is required where it is not permitted by applicable law (financial assistance, corporate benefit, capital maintenance) or where the cost is disproportionate to the benefit, and subject to the Guarantor Coverage Test (Obligors representing not less than [80]% of consolidated EBITDA).",
  "cl:sec-share":
    "The Chargor charges by way of first fixed charge all of the Shares in each Charged Company and shall deliver the share certificates and duly executed undated blank stock transfer forms; until an Event of Default is continuing the Chargor may exercise voting rights and receive dividends, after which those rights vest in the Security Agent.",
  "cl:sec-accounts":
    "The Chargor charges by way of first fixed charge each Account and shall not, without the Security Agent's consent, withdraw or deal with any amount standing to the credit of a Controlled Account except as expressly permitted; the Chargor shall procure that each Account Bank acknowledges the Security Agent's security and the withdrawal restrictions.",
  "cl:sec-parallel":
    "Each Obligor irrevocably and unconditionally owes to the Security Agent, as a separate and independent obligation (the 'Parallel Debt'), an amount equal to the aggregate of its Liabilities to the Secured Parties; any payment in respect of the Liabilities discharges the Parallel Debt in a corresponding amount and vice versa, and no double recovery shall arise.",
};
