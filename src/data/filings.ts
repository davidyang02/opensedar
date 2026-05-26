import { Filing } from "@/lib/types";

/**
 * Hand-curated demo dataset of ~60 SEDAR+ filings across 8 issuers.
 * Mix of types — financial statements, MD&A, AIF, proxy circulars, MCRs,
 * insider reports, news releases. Spans the last ~18 months.
 *
 * Two filings have hand-extracted content (see extractedContent.ts):
 *   ry-2025-q3-mda — RBC Q3 2025 MD&A (financial deep-dive)
 *   td-2024-aml-mcr — TD US AML Settlement Material Change Report
 *
 * `sedarUrl` is shaped like real SEDAR+ document URLs but uses placeholder
 * IDs — clicking will hit SEDAR+'s search page rather than 404, which is
 * good enough for the demo. (Real merge phase pulls live IDs from the
 * pipeline.)
 */

function sedarUrl(ticker: string): string {
  // Demo placeholder — links to the SEDAR+ search landing rather than a
  // dead document URL.
  return `https://www.sedarplus.ca/csa-party/service/results.html?search=${encodeURIComponent(ticker)}`;
}

export const FILINGS: Filing[] = [
  // ─── RBC (RY) ───────────────────────────────────────────────────────
  {
    id: "ry-2025-q3-fs",
    issuerTicker: "RY",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-28",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Unaudited interim financial statements for the three months ended July 31, 2025. Net income of $4.5B, up 8% YoY.",
    pageCount: 87,
    language: "EN+FR",
  },
  {
    id: "ry-2025-q3-mda",
    issuerTicker: "RY",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-28",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Quarterly MD&A covering financial performance, segment results, capital adequacy, and forward outlook for fiscal Q3 2025.",
    hasExtractedContent: true,
    pageCount: 134,
    language: "EN+FR",
  },
  {
    id: "ry-2025-q2-fs",
    issuerTicker: "RY",
    type: "financial-statements",
    title: "Q2 2025 Interim Consolidated Financial Statements",
    date: "2025-05-29",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Net income of $4.4B for the quarter ended April 30, 2025, reflecting continued momentum in personal & commercial banking.",
    pageCount: 84,
    language: "EN+FR",
  },
  {
    id: "ry-2025-q2-mda",
    issuerTicker: "RY",
    type: "mda",
    title: "Q2 2025 Management's Discussion and Analysis",
    date: "2025-05-29",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Q2 2025 MD&A discussing PCL trends, City National Bank turnaround, and integration progress on HSBC Canada acquisition.",
    pageCount: 128,
    language: "EN+FR",
  },
  {
    id: "ry-2024-aif",
    issuerTicker: "RY",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-04",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Annual Information Form including business overview, risk factors, dividend policy, and director/officer biographies for fiscal 2024.",
    pageCount: 71,
    language: "EN+FR",
  },
  {
    id: "ry-2025-proxy",
    issuerTicker: "RY",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-02-25",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Notice of annual meeting of common shareholders held April 9, 2025. Includes executive compensation disclosure and director nominations.",
    pageCount: 119,
    language: "EN+FR",
  },
  {
    id: "ry-2024-hsbc-mcr",
    issuerTicker: "RY",
    type: "material-change",
    title:
      "Material Change Report — Completion of HSBC Bank Canada Acquisition",
    date: "2024-03-28",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Reporting the closing of the $13.5B acquisition of HSBC Bank Canada, materially expanding RBC's Canadian commercial and wealth franchise.",
    pageCount: 6,
    language: "EN+FR",
  },
  {
    id: "ry-2025-q3-newsrelease",
    issuerTicker: "RY",
    type: "news-release",
    title: "RBC reports third quarter 2025 results",
    date: "2025-08-28",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Earnings press release announcing Q3 2025 results with key highlights and CEO commentary.",
    pageCount: 5,
    language: "EN+FR",
  },
  {
    id: "ry-2025-insider-mckay",
    issuerTicker: "RY",
    type: "insider",
    title: "Insider Report — David McKay (President & CEO)",
    date: "2025-09-12",
    sedarUrl: sedarUrl("RY"),
    summary:
      "Reporting routine sale of 15,000 common shares pursuant to a pre-arranged 10b5-1 plan. Filed within statutory deadline.",
    pageCount: 2,
    language: "EN",
  },

  // ─── TD ────────────────────────────────────────────────────────────
  {
    id: "td-2025-q3-fs",
    issuerTicker: "TD",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-29",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("TD"),
    summary:
      "Net income of $3.6B for the quarter ended July 31, 2025, with continued recovery from US AML remediation costs.",
    pageCount: 81,
    language: "EN+FR",
  },
  {
    id: "td-2025-q3-mda",
    issuerTicker: "TD",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-29",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("TD"),
    summary:
      "MD&A covering segment results, AML remediation progress under the asset cap, and updated capital outlook.",
    pageCount: 142,
    language: "EN+FR",
  },
  {
    id: "td-2024-aml-mcr",
    issuerTicker: "TD",
    type: "material-change",
    title:
      "Material Change Report — Resolution of US AML Matters with FinCEN, OCC, Federal Reserve, and DOJ",
    date: "2024-10-10",
    sedarUrl: sedarUrl("TD"),
    summary:
      "Reporting US$3.09B in penalties, an asset cap on US retail operations, and consent orders with multiple US regulators related to AML program failures.",
    hasExtractedContent: true,
    pageCount: 14,
    language: "EN+FR",
  },
  {
    id: "td-2024-aif",
    issuerTicker: "TD",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-05",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("TD"),
    summary:
      "AIF including expanded risk factor disclosure related to US AML consent orders and asset cap. Updated executive officer biographies.",
    pageCount: 89,
    language: "EN+FR",
  },
  {
    id: "td-2025-proxy",
    issuerTicker: "TD",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-02-27",
    sedarUrl: sedarUrl("TD"),
    summary:
      "Notice and information circular for the 2025 annual meeting. Includes 'Say on Pay' vote and shareholder proposals.",
    pageCount: 127,
    language: "EN+FR",
  },
  {
    id: "td-2025-q2-newsrelease",
    issuerTicker: "TD",
    type: "news-release",
    title: "TD Bank Group reports second quarter 2025 results",
    date: "2025-05-22",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("TD"),
    summary:
      "Earnings release announcing Q2 results. Highlights US asset cap impact and remediation milestones.",
    pageCount: 6,
    language: "EN+FR",
  },
  {
    id: "td-2025-q1-fs",
    issuerTicker: "TD",
    type: "financial-statements",
    title: "Q1 2025 Interim Consolidated Financial Statements",
    date: "2025-02-27",
    fiscalPeriod: "Q1 2025",
    sedarUrl: sedarUrl("TD"),
    summary:
      "Net income of $2.8B for the quarter ended January 31, 2025. Year-over-year decline reflecting ongoing AML costs.",
    pageCount: 79,
    language: "EN+FR",
  },

  // ─── BMO ───────────────────────────────────────────────────────────
  {
    id: "bmo-2025-q3-fs",
    issuerTicker: "BMO",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-26",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "Net income of $2.4B for the quarter ended July 31, 2025. Continued PCL pressure in US commercial portfolio.",
    pageCount: 76,
    language: "EN+FR",
  },
  {
    id: "bmo-2025-q3-mda",
    issuerTicker: "BMO",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-26",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "MD&A covering Bank of the West integration progress, PCL outlook, and capital position at Q3 2025.",
    pageCount: 124,
    language: "EN+FR",
  },
  {
    id: "bmo-2024-aif",
    issuerTicker: "BMO",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-03",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "Annual Information Form covering business segments, risk factors, and Bank of the West post-acquisition update.",
    pageCount: 68,
    language: "EN+FR",
  },
  {
    id: "bmo-2025-proxy",
    issuerTicker: "BMO",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-03-04",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "Notice of 2025 annual meeting of shareholders. Includes ESG resolutions and board diversity disclosure.",
    pageCount: 116,
    language: "EN+FR",
  },
  {
    id: "bmo-2025-q2-fs",
    issuerTicker: "BMO",
    type: "financial-statements",
    title: "Q2 2025 Interim Consolidated Financial Statements",
    date: "2025-05-28",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "Q2 2025 results. Net income of $2.1B, with stable Canadian P&C performance and improving US wealth.",
    pageCount: 74,
    language: "EN+FR",
  },
  {
    id: "bmo-2024-newsrelease-dividend",
    issuerTicker: "BMO",
    type: "news-release",
    title:
      "BMO declares quarterly dividend and announces 3% dividend increase",
    date: "2024-12-04",
    sedarUrl: sedarUrl("BMO"),
    summary:
      "Board approves a $0.04 increase to the quarterly common share dividend, bringing it to $1.59 per share.",
    pageCount: 2,
    language: "EN+FR",
  },

  // ─── BNS (Scotiabank) ──────────────────────────────────────────────
  {
    id: "bns-2025-q3-fs",
    issuerTicker: "BNS",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-27",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "Net income of $2.0B for the quarter. International Banking segment shows continued earnings stabilization.",
    pageCount: 78,
    language: "EN+FR",
  },
  {
    id: "bns-2025-q3-mda",
    issuerTicker: "BNS",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-27",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "MD&A covering progress on capital reallocation strategy announced at 2023 Investor Day, plus Latin America segment update.",
    pageCount: 131,
    language: "EN+FR",
  },
  {
    id: "bns-2024-aif",
    issuerTicker: "BNS",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-06",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "AIF including segment overview, country-by-country exposure, and updated risk factors.",
    pageCount: 73,
    language: "EN+FR",
  },
  {
    id: "bns-2025-proxy",
    issuerTicker: "BNS",
    type: "proxy",
    title: "Management Proxy Circular — 2025 Annual Meeting",
    date: "2025-03-07",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "Notice of 2025 AGM. Includes new CEO compensation framework and director slate.",
    pageCount: 122,
    language: "EN+FR",
  },
  {
    id: "bns-2024-keycorp-mcr",
    issuerTicker: "BNS",
    type: "material-change",
    title:
      "Material Change Report — Strategic Minority Investment in KeyCorp",
    date: "2024-08-12",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "Reporting US$2.8B minority investment in KeyCorp, a US$190B asset regional US bank, as part of capital reallocation strategy.",
    pageCount: 8,
    language: "EN+FR",
  },
  {
    id: "bns-2025-q2-newsrelease",
    issuerTicker: "BNS",
    type: "news-release",
    title: "Scotiabank reports second quarter 2025 results",
    date: "2025-05-27",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("BNS"),
    summary:
      "Q2 2025 earnings release. Highlights KeyCorp synergy progress and Canadian P&C margin expansion.",
    pageCount: 5,
    language: "EN+FR",
  },

  // ─── CIBC (CM) ─────────────────────────────────────────────────────
  {
    id: "cm-2025-q3-fs",
    issuerTicker: "CM",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-28",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("CM"),
    summary:
      "Net income of $1.9B for the quarter, with strong US wealth contributions and improved Canadian P&C efficiency.",
    pageCount: 77,
    language: "EN+FR",
  },
  {
    id: "cm-2025-q3-mda",
    issuerTicker: "CM",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-28",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("CM"),
    summary:
      "MD&A covering segment-level results, digital channel adoption, and capital deployment plans.",
    pageCount: 119,
    language: "EN+FR",
  },
  {
    id: "cm-2024-aif",
    issuerTicker: "CM",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-05",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("CM"),
    summary:
      "AIF with business overview, risk factor disclosure, and updates on US Wealth Management acquisitions.",
    pageCount: 64,
    language: "EN+FR",
  },
  {
    id: "cm-2025-proxy",
    issuerTicker: "CM",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-03-06",
    sedarUrl: sedarUrl("CM"),
    summary:
      "2025 AGM notice and information circular. Includes virtual meeting logistics and director nominations.",
    pageCount: 110,
    language: "EN+FR",
  },
  {
    id: "cm-2025-q2-fs",
    issuerTicker: "CM",
    type: "financial-statements",
    title: "Q2 2025 Interim Consolidated Financial Statements",
    date: "2025-05-29",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("CM"),
    summary:
      "Q2 2025 results. Net income of $1.8B with continued PCL normalization.",
    pageCount: 75,
    language: "EN+FR",
  },
  {
    id: "cm-2025-buyback-mcr",
    issuerTicker: "CM",
    type: "material-change",
    title: "Material Change Report — Normal Course Issuer Bid Renewal",
    date: "2025-05-29",
    sedarUrl: sedarUrl("CM"),
    summary:
      "TSX approved CIBC's NCIB renewal authorizing repurchase of up to 18M common shares (approx. 2% of float).",
    pageCount: 4,
    language: "EN+FR",
  },

  // ─── National Bank (NA) ────────────────────────────────────────────
  {
    id: "na-2025-q3-fs",
    issuerTicker: "NA",
    type: "financial-statements",
    title: "Q3 2025 Interim Consolidated Financial Statements",
    date: "2025-08-27",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("NA"),
    summary:
      "First full quarter reflecting Canadian Western Bank acquisition. Combined NI of $1.0B.",
    pageCount: 88,
    language: "EN+FR",
  },
  {
    id: "na-2025-q3-mda",
    issuerTicker: "NA",
    type: "mda",
    title: "Q3 2025 Management's Discussion and Analysis",
    date: "2025-08-27",
    fiscalPeriod: "Q3 2025",
    sedarUrl: sedarUrl("NA"),
    summary:
      "MD&A reviewing CWB integration progress, synergy capture, and updated western Canada strategy.",
    pageCount: 136,
    language: "EN+FR",
  },
  {
    id: "na-2025-cwb-mcr",
    issuerTicker: "NA",
    type: "material-change",
    title:
      "Material Change Report — Closing of Canadian Western Bank Acquisition",
    date: "2025-02-04",
    sedarUrl: sedarUrl("NA"),
    summary:
      "Closing of all-stock acquisition of Canadian Western Bank for ~$5B, doubling National Bank's commercial banking presence outside Quebec.",
    pageCount: 11,
    language: "EN+FR",
  },
  {
    id: "na-2024-aif",
    issuerTicker: "NA",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2024-12-05",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("NA"),
    summary:
      "AIF including pro-forma CWB combination disclosure and updated risk factors.",
    pageCount: 79,
    language: "EN+FR",
  },
  {
    id: "na-2025-proxy",
    issuerTicker: "NA",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-03-12",
    sedarUrl: sedarUrl("NA"),
    summary:
      "Notice of 2025 AGM. Includes CWB integration update and post-merger board composition.",
    pageCount: 104,
    language: "EN+FR",
  },
  {
    id: "na-2025-q2-newsrelease",
    issuerTicker: "NA",
    type: "news-release",
    title: "National Bank reports second quarter 2025 results",
    date: "2025-05-28",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("NA"),
    summary:
      "Q2 2025 earnings release with CWB pro-forma context.",
    pageCount: 4,
    language: "EN+FR",
  },

  // ─── Shopify (SHOP) ────────────────────────────────────────────────
  {
    id: "shop-2024-annual-fs",
    issuerTicker: "SHOP",
    type: "financial-statements",
    title: "Annual Consolidated Financial Statements — Fiscal 2024",
    date: "2025-02-11",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Audited annual financial statements for the year ended December 31, 2024. Revenue of US$8.9B, up 26% YoY.",
    pageCount: 102,
    language: "EN",
  },
  {
    id: "shop-2024-annual-mda",
    issuerTicker: "SHOP",
    type: "mda",
    title: "Annual MD&A — Fiscal 2024",
    date: "2025-02-11",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Annual MD&A discussing merchant growth, GMV trends, Shopify Payments adoption, and operating leverage.",
    pageCount: 78,
    language: "EN",
  },
  {
    id: "shop-2024-aif",
    issuerTicker: "SHOP",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2025-02-11",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "AIF with business overview, segment disclosure, risk factors, and named executive officer profiles.",
    pageCount: 56,
    language: "EN",
  },
  {
    id: "shop-2025-proxy",
    issuerTicker: "SHOP",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-04-22",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Notice of 2025 AGM. Includes director compensation, executive compensation, and shareholder proposals.",
    pageCount: 89,
    language: "EN",
  },
  {
    id: "shop-2025-q2-newsrelease",
    issuerTicker: "SHOP",
    type: "news-release",
    title: "Shopify Announces Second Quarter 2025 Financial Results",
    date: "2025-08-06",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Q2 2025 earnings release. Revenue of US$2.6B, GMV growth of 22%, operating income margin expansion.",
    pageCount: 8,
    language: "EN",
  },
  {
    id: "shop-2025-q1-newsrelease",
    issuerTicker: "SHOP",
    type: "news-release",
    title: "Shopify Announces First Quarter 2025 Financial Results",
    date: "2025-05-08",
    fiscalPeriod: "Q1 2025",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Q1 2025 earnings release with merchant solutions revenue breakdown.",
    pageCount: 7,
    language: "EN",
  },
  {
    id: "shop-2024-buyback-mcr",
    issuerTicker: "SHOP",
    type: "material-change",
    title: "Material Change Report — Inducement Equity Grants",
    date: "2024-11-15",
    sedarUrl: sedarUrl("SHOP"),
    summary:
      "Disclosure of inducement RSU grants to newly hired executives, in compliance with TSX rules.",
    pageCount: 3,
    language: "EN",
  },

  // ─── Brookfield (BN) ───────────────────────────────────────────────
  {
    id: "bn-2024-annual-fs",
    issuerTicker: "BN",
    type: "financial-statements",
    title: "Annual Consolidated Financial Statements — Fiscal 2024",
    date: "2025-03-15",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Audited annual financial statements. Total assets under management of US$1.0 trillion across five strategy verticals.",
    pageCount: 188,
    language: "EN",
  },
  {
    id: "bn-2024-annual-mda",
    issuerTicker: "BN",
    type: "mda",
    title: "Annual MD&A — Fiscal 2024",
    date: "2025-03-15",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Annual MD&A covering DE, fundraising progress, deployment activity, and outlook by strategy (Real Estate, Infrastructure, Renewable, Private Equity, Credit).",
    pageCount: 142,
    language: "EN",
  },
  {
    id: "bn-2024-aif",
    issuerTicker: "BN",
    type: "aif",
    title: "Annual Information Form — Fiscal 2024",
    date: "2025-03-15",
    fiscalPeriod: "FY 2024",
    sedarUrl: sedarUrl("BN"),
    summary:
      "AIF including business overview, named flagship funds, risk factors, and director/officer disclosure.",
    pageCount: 91,
    language: "EN",
  },
  {
    id: "bn-2025-proxy",
    issuerTicker: "BN",
    type: "proxy",
    title: "Management Information Circular — 2025 Annual Meeting",
    date: "2025-04-09",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Notice of 2025 AGM. Includes new compensation framework and discussion of related-party transactions.",
    pageCount: 134,
    language: "EN",
  },
  {
    id: "bn-2025-q2-newsrelease",
    issuerTicker: "BN",
    type: "news-release",
    title:
      "Brookfield Corporation reports second quarter 2025 results",
    date: "2025-08-07",
    fiscalPeriod: "Q2 2025",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Q2 2025 quarterly update. Distributable Earnings of US$1.3B, fundraising of US$22B in the quarter.",
    pageCount: 9,
    language: "EN",
  },
  {
    id: "bn-2024-renewable-mcr",
    issuerTicker: "BN",
    type: "material-change",
    title:
      "Material Change Report — Acquisition of European Renewable Power Portfolio",
    date: "2024-11-26",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Reporting the US$3.8B acquisition of a European renewable power portfolio by Brookfield Renewable Partners, an entity managed by BN.",
    pageCount: 7,
    language: "EN",
  },
  {
    id: "bn-2025-q1-newsrelease",
    issuerTicker: "BN",
    type: "news-release",
    title:
      "Brookfield Corporation reports first quarter 2025 results",
    date: "2025-05-09",
    fiscalPeriod: "Q1 2025",
    sedarUrl: sedarUrl("BN"),
    summary:
      "Q1 2025 update. Strong fundraising momentum across infrastructure and credit strategies.",
    pageCount: 8,
    language: "EN",
  },
];

export function getFilingById(id: string): Filing | undefined {
  return FILINGS.find((f) => f.id === id);
}

export function getFilingsByIssuer(ticker: string): Filing[] {
  return FILINGS.filter(
    (f) => f.issuerTicker.toLowerCase() === ticker.toLowerCase(),
  ).sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentFilings(limit = 20): Filing[] {
  return [...FILINGS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function searchFilings(query: string): Filing[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return FILINGS.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.summary.toLowerCase().includes(q) ||
      f.issuerTicker.toLowerCase().includes(q) ||
      f.fiscalPeriod?.toLowerCase().includes(q),
  );
}
