/**
 * Shared types for the OpenSEDAR demo.
 *
 * Static-data oriented for v1 — every record is hand-curated. When the demo
 * is folded into OpenBSIS as the /sedar vertical, these shapes will map to
 * Supabase tables (sedar_filings, sedar_issuers, sedar_filing_extracts).
 */

export type Exchange = "TSX" | "TSXV" | "CSE" | "NEO";

export type FilingType =
  | "financial-statements"
  | "mda"
  | "aif"
  | "proxy"
  | "prospectus"
  | "material-change"
  | "insider"
  | "news-release"
  | "early-warning"
  | "etf-mfr";

export interface Issuer {
  ticker: string;
  name: string;
  shortName?: string;
  exchange: Exchange;
  sector: string;
  industry: string;
  hq: string;
  marketCapCadMillions: number;
  blurb: string;
  websiteUrl?: string;
  sedarProfileUrl: string;
  // OpenBSIS bank cross-reference — populated for Big 6 + other OSFI-regulated banks
  osfiInstitutionName?: string;
}

export interface Filing {
  id: string;
  issuerTicker: string;
  type: FilingType;
  title: string;
  date: string; // ISO YYYY-MM-DD
  fiscalPeriod?: string; // e.g. "Q4 2025", "FY 2024"
  sedarUrl: string;
  summary: string;
  hasExtractedContent?: boolean;
  pageCount?: number;
  language: "EN" | "FR" | "EN+FR";
}

export interface ExtractedKeyDataPoint {
  label: string;
  value: string;
  delta?: string; // e.g. "+8.2% YoY"
  emphasis?: boolean; // highlight as headline number
}

export interface ExtractedSection {
  heading: string;
  body: string; // markdown-lite (paragraphs separated by \n\n)
  callout?: string; // optional pull-quote
}

export interface ExtractedContent {
  filingId: string;
  headline: string; // 1-line takeaway
  keyDataPoints: ExtractedKeyDataPoint[];
  sections: ExtractedSection[];
  riskNotes?: string[];
}

export const FILING_TYPE_LABELS: Record<FilingType, string> = {
  "financial-statements": "Financial Statements",
  mda: "MD&A",
  aif: "Annual Information Form",
  proxy: "Proxy Circular",
  prospectus: "Prospectus",
  "material-change": "Material Change Report",
  insider: "Insider Report",
  "news-release": "News Release",
  "early-warning": "Early Warning Report",
  "etf-mfr": "ETF / MFR",
};

export const FILING_TYPE_SHORT: Record<FilingType, string> = {
  "financial-statements": "Financials",
  mda: "MD&A",
  aif: "AIF",
  proxy: "Proxy",
  prospectus: "Prospectus",
  "material-change": "MCR",
  insider: "Insider",
  "news-release": "News",
  "early-warning": "EWR",
  "etf-mfr": "MFR",
};
