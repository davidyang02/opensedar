import { ExtractedContent } from "@/lib/types";

/**
 * Hand-extracted content for the 2 "demo punch" filings — what
 * "better than SEDAR+" looks like when key data points and notable
 * sections are surfaced instead of buried in a 134-page PDF.
 *
 * Production OpenBSIS would extract these automatically from
 * iXBRL filings + LLM extraction (user's own subscription via MCP,
 * not server-paid).
 */
export const EXTRACTED_CONTENT: ExtractedContent[] = [
  {
    filingId: "ry-2025-q3-mda",
    headline:
      "RBC delivers Q3 2025 net income of $4.5B, up 8% YoY. PCL ratio improves 9bps QoQ as HSBC Canada integration nears completion.",
    keyDataPoints: [
      {
        label: "Net income",
        value: "$4.5B",
        delta: "+8% YoY",
        emphasis: true,
      },
      {
        label: "Diluted EPS",
        value: "$3.21",
        delta: "+9% YoY",
        emphasis: true,
      },
      { label: "Revenue", value: "$14.9B", delta: "+11% YoY" },
      { label: "Return on equity", value: "14.9%", delta: "vs 14.2% Q2" },
      { label: "CET1 ratio", value: "13.2%", delta: "+40bps QoQ" },
      { label: "PCL ratio", value: "0.32%", delta: "−9bps QoQ" },
      { label: "Net interest margin", value: "1.61%", delta: "+2bps QoQ" },
      { label: "Efficiency ratio", value: "53.2%", delta: "−180bps YoY" },
    ],
    sections: [
      {
        heading: "Executive summary",
        body:
          "Royal Bank delivered net income of $4.5 billion for the quarter ended July 31, 2025, an 8% increase over the prior year and 4% sequentially. Results reflect solid client volume growth across all reportable segments, improved credit performance, and the continued integration of HSBC Bank Canada into the Canadian Personal & Commercial Banking franchise.\n\nDiluted earnings per share were $3.21 (Q3 2024: $2.95). Return on equity expanded to 14.9% from 14.2% in Q2, driven by both operating leverage and reduced provision for credit losses. The Common Equity Tier 1 ratio strengthened to 13.2% as risk-weighted assets grew at a slower pace than retained earnings.",
        callout:
          "PCL ratio at 32 basis points is the lowest since Q1 2023, reflecting improving Canadian commercial credit and stable consumer trends.",
      },
      {
        heading: "Personal & Commercial Banking",
        body:
          "Personal & Commercial Banking earnings were $2.5 billion, up 12% year over year. Canadian Banking results reflect 9 months of HSBC Canada contribution, with full integration of front-line systems expected by Q1 2026.\n\nNet interest margin in Canadian Banking expanded 5 basis points sequentially to 2.80%, benefiting from continued deposit pricing discipline and the run-off of low-yielding pandemic-era assets. Caribbean banking remains a small but profitable contributor with stable margins.",
      },
      {
        heading: "Wealth Management",
        body:
          "Wealth Management net income was $1.0 billion, up 14% year over year. City National Bank's turnaround continued, with the platform returning to profitability for the second consecutive quarter following the strategic repositioning announced in 2024.\n\nGlobal Asset Management saw $8 billion in net new assets during the quarter, the strongest quarterly inflow in the past five years.",
      },
      {
        heading: "Capital Markets",
        body:
          "Capital Markets net income was $923 million, down 4% year over year reflecting lower investment banking fee activity and softer equities trading. Fixed income, currencies and commodities revenue was stable, supported by client activity around Canadian rate volatility.",
      },
      {
        heading: "HSBC Canada integration update",
        body:
          "Integration is approximately 80% complete by milestones. Cost synergies of $740 million annualized have been realized through Q3 2025 against the $810 million target, with the remaining cost synergies expected to be captured by mid-2026. Revenue synergies — primarily cross-selling RBC wealth and commercial products to legacy HSBC clients — are tracking ahead of plan.",
        callout:
          "Management raised the revenue synergy target by $100M to $400M annualized by FY 2026.",
      },
      {
        heading: "Capital adequacy and outlook",
        body:
          "The CET1 ratio of 13.2% provides approximately 220 basis points of buffer above the regulatory minimum of 11.0% (including the 4.5% common equity Tier 1 minimum, 2.5% capital conservation buffer, 1.0% D-SIB surcharge, and 3.0% Domestic Stability Buffer set by OSFI as of November 2024).\n\nManagement maintains its medium-term outlook of 7-10% diluted EPS growth and ROE in the 16%+ range. Q4 guidance includes expectations of continued PCL improvement and modest expense growth as integration costs roll off.",
      },
    ],
    riskNotes: [
      "Pending OSC review of historical bond trading practices disclosed in Q1 2025",
      "Macro overhang from US-Canada tariff developments could pressure commercial credit",
      "City National Bank requires continued execution on simplification plan",
    ],
  },
  {
    filingId: "td-2024-aml-mcr",
    headline:
      "TD agrees to US$3.09B penalty and US asset cap to resolve global resolution of US AML enforcement matters with DOJ, FinCEN, OCC, and Federal Reserve.",
    keyDataPoints: [
      {
        label: "Total penalties",
        value: "US$3.09B",
        delta: "largest US AML settlement",
        emphasis: true,
      },
      {
        label: "US retail asset cap",
        value: "US$434B",
        delta: "current level frozen",
        emphasis: true,
      },
      { label: "DOJ penalty", value: "US$1.80B" },
      { label: "FinCEN penalty", value: "US$1.30B" },
      { label: "OCC penalty", value: "US$450M" },
      { label: "Federal Reserve penalty", value: "US$124M" },
      { label: "Q4 2024 P&L impact", value: "US$2.55B" },
      { label: "Remediation period", value: "3–4 years" },
    ],
    sections: [
      {
        heading: "Background",
        body:
          "Between January 2014 and October 2023, certain TD Bank, N.A. employees in the US failed to file currency transaction reports as required by the Bank Secrecy Act, and certain bank systems failed to flag suspicious activity for review. Three independent money laundering schemes used TD Bank, N.A. accounts to launder approximately US$670M in illicit proceeds, including from narcotics trafficking.\n\nTD voluntarily disclosed certain deficiencies to regulators in May 2023, leading to extensive remediation work and the regulatory resolution announced today.",
      },
      {
        heading: "Settlement terms — financial",
        body:
          "TD has agreed to pay total monetary penalties of approximately US$3.09 billion. The largest component, a US$1.8 billion penalty to the Department of Justice, includes a guilty plea by TD Bank, N.A. to a felony money-laundering charge — the first such plea by a major US bank in over a decade.\n\nThe FinCEN penalty of US$1.3 billion is the largest in that agency's history. The Office of the Comptroller of the Currency and Federal Reserve penalties account for the remainder.\n\nTD recorded a US$2.55 billion charge in Q4 2024 covering the legal accrual, with the remainder absorbed by previously recorded reserves.",
      },
      {
        heading: "US retail asset cap",
        body:
          "Effective immediately, TD Bank, N.A. and TD Bank USA, N.A. are subject to a combined US$434 billion asset cap on US retail banking operations, calibrated to current consolidated US retail balance sheet levels. The cap remains in place until OCC determines TD has remediated the underlying deficiencies and implemented an enhanced AML program acceptable to the regulator.\n\nThe asset cap does NOT apply to TD's investment banking, wealth management, or Canadian operations. Excess deposits will be managed through portfolio repositioning rather than growth restrictions.",
        callout:
          "The asset cap is similar in mechanism to the cap imposed on Wells Fargo in 2018, which remained in place for 7+ years.",
      },
      {
        heading: "Consent orders and remediation",
        body:
          "TD has entered into consent orders with each of the OCC and Federal Reserve, committing to a comprehensive overhaul of its US AML program. This includes:\n\n- Implementation of a new transaction monitoring system\n- Establishment of an independent monitor for a 3-year period\n- Hiring of additional AML/BSA staff (~1,500 positions)\n- Senior leadership accountability measures\n\nTotal remediation costs are estimated at US$500 million to US$1 billion over the next 3–4 years, primarily reflected in non-interest expense in TD's US Retail segment.",
      },
      {
        heading: "Management changes",
        body:
          "Bharat Masrani has confirmed his retirement as Group President and CEO, effective April 2025, with Raymond Chun (currently Group Head, Canadian P&C Banking) appointed his successor. Leo Salom continues as Head, US Retail and is leading remediation execution.",
      },
      {
        heading: "Forward statements",
        body:
          "TD reiterates that the US asset cap will limit US retail balance sheet growth for an extended period but does not constrain Canadian operations or non-retail US businesses. Capital and liquidity positions remain strong, with a CET1 ratio of 13.1% pro-forma for the Q4 charge.\n\nThe Board of Directors has reaffirmed the common share dividend and intends to continue the dividend reinvestment plan and other capital return programs subject to OSFI guidance.",
      },
    ],
    riskNotes: [
      "Ongoing OCC oversight under consent order; cap removal contingent on regulator's assessment",
      "Civil litigation risk from ancillary class actions (TD acknowledges)",
      "Reputational impact on US deposit franchise — to be monitored",
      "Potential follow-on enforcement from other US states under existing Bank Secrecy Act authorities",
    ],
  },
];

export function getExtractedContent(
  filingId: string,
): ExtractedContent | undefined {
  return EXTRACTED_CONTENT.find((e) => e.filingId === filingId);
}
