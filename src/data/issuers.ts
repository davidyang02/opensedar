import { Issuer } from "@/lib/types";

/**
 * Hand-curated demo dataset of 8 Canadian public issuers.
 * Big 6 banks + Shopify + Brookfield. Approximate market caps in CAD millions
 * (mid-2025 ballparks for the demo — not real-time).
 */
export const ISSUERS: Issuer[] = [
  {
    ticker: "RY",
    name: "Royal Bank of Canada",
    shortName: "RBC",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Toronto, ON",
    marketCapCadMillions: 257_000,
    blurb:
      "Canada's largest bank by market cap. Personal & commercial banking, wealth management, capital markets, and insurance across Canada, the US, and the Caribbean.",
    websiteUrl: "https://www.rbc.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000041",
    osfiInstitutionName: "Royal Bank of Canada",
  },
  {
    ticker: "TD",
    name: "Toronto-Dominion Bank",
    shortName: "TD",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Toronto, ON",
    marketCapCadMillions: 162_000,
    blurb:
      "Second-largest Canadian bank by assets, with major US retail banking footprint via TD Bank N.A. Recently emerged from US AML enforcement settlement.",
    websiteUrl: "https://www.td.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000050",
    osfiInstitutionName: "Toronto-Dominion Bank",
  },
  {
    ticker: "BMO",
    name: "Bank of Montreal",
    shortName: "BMO",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Montreal, QC",
    marketCapCadMillions: 113_000,
    blurb:
      "Canada's fourth-largest bank. Strong US Midwest presence following the BMO Harris and Bank of the West acquisitions. Active in capital markets and wealth.",
    websiteUrl: "https://www.bmo.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000031",
    osfiInstitutionName: "Bank of Montreal",
  },
  {
    ticker: "BNS",
    name: "Bank of Nova Scotia",
    shortName: "Scotiabank",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Toronto, ON",
    marketCapCadMillions: 88_000,
    blurb:
      "Canada's third-largest bank with the most international footprint among the Big 6, especially in Latin America (Mexico, Peru, Chile, Colombia).",
    websiteUrl: "https://www.scotiabank.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000032",
    osfiInstitutionName: "Bank of Nova Scotia",
  },
  {
    ticker: "CM",
    name: "Canadian Imperial Bank of Commerce",
    shortName: "CIBC",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Toronto, ON",
    marketCapCadMillions: 79_000,
    blurb:
      "Big 6 Canadian bank with a domestic focus and a growing US wealth management presence. Best-in-class digital banking platform among Canadian peers.",
    websiteUrl: "https://www.cibc.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000037",
    osfiInstitutionName: "Canadian Imperial Bank of Commerce",
  },
  {
    ticker: "NA",
    name: "National Bank of Canada",
    shortName: "National Bank",
    exchange: "TSX",
    sector: "Financials",
    industry: "Diversified Banks",
    hq: "Montreal, QC",
    marketCapCadMillions: 47_000,
    blurb:
      "Smallest of the Big 6 by assets, with a strong Quebec base. Acquired Canadian Western Bank in 2025 to expand into western Canada.",
    websiteUrl: "https://www.nbc.ca",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00000036",
    osfiInstitutionName: "National Bank of Canada",
  },
  {
    ticker: "SHOP",
    name: "Shopify Inc.",
    shortName: "Shopify",
    exchange: "TSX",
    sector: "Technology",
    industry: "Application Software",
    hq: "Ottawa, ON",
    marketCapCadMillions: 195_000,
    blurb:
      "Global commerce platform powering millions of merchants. Dual-listed on TSX and NYSE. Largest TSX-listed tech company by market cap.",
    websiteUrl: "https://www.shopify.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00026364",
  },
  {
    ticker: "BN",
    name: "Brookfield Corporation",
    shortName: "Brookfield",
    exchange: "TSX",
    sector: "Financials",
    industry: "Alternative Asset Management",
    hq: "Toronto, ON",
    marketCapCadMillions: 134_000,
    blurb:
      "Global alternative asset manager with ~$1 trillion AUM across real estate, infrastructure, renewable power, private equity, and credit.",
    websiteUrl: "https://www.brookfield.com",
    sedarProfileUrl:
      "https://www.sedarplus.ca/csa-party/records/document.html?id=00006689",
  },
];

export function getIssuerByTicker(ticker: string): Issuer | undefined {
  return ISSUERS.find(
    (i) => i.ticker.toLowerCase() === ticker.toLowerCase(),
  );
}

export function searchIssuers(query: string): Issuer[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ISSUERS.filter(
    (i) =>
      i.ticker.toLowerCase().includes(q) ||
      i.name.toLowerCase().includes(q) ||
      i.shortName?.toLowerCase().includes(q) ||
      i.sector.toLowerCase().includes(q) ||
      i.industry.toLowerCase().includes(q),
  );
}
