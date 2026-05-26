import { TMX_ISSUERS } from "@/data/allIssuers";
import { HAND_CURATED_ISSUERS } from "@/data/issuers";
import { IssuersBrowser } from "@/components/IssuersBrowser";

export default function IssuersPage() {
  // Build a unified list: hand-curated first (sorted by mcap), then TMX (already sorted by mcap).
  const handTickers = new Set(HAND_CURATED_ISSUERS.map((i) => i.ticker.toUpperCase()));
  const tmxOnly = TMX_ISSUERS.filter((i) => !handTickers.has(i.ticker.toUpperCase()));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Issuers
        </h1>
        <p className="mt-2 text-slate-600">
          {(HAND_CURATED_ISSUERS.length + tmxOnly.length).toLocaleString()}{" "}
          Canadian public companies listed on TSX or TSXV (April 2026 snapshot).
          <span className="ml-2 inline-block text-xs px-2 py-0.5 bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded">
            {HAND_CURATED_ISSUERS.length} featured with filings
          </span>
        </p>
      </div>
      <IssuersBrowser
        handCurated={HAND_CURATED_ISSUERS.map((i) => ({
          ticker: i.ticker,
          name: i.name,
          exchange: i.exchange,
          sector: i.sector,
          subSector: i.industry,
          marketCapCadMillions: i.marketCapCadMillions,
        }))}
        tmxOnly={tmxOnly.map((i) => ({
          ticker: i.ticker,
          name: i.name,
          exchange: i.exchange,
          sector: i.sector,
          subSector: i.subSector,
          marketCapCadMillions: i.marketCapCadMillions,
        }))}
      />
    </div>
  );
}
