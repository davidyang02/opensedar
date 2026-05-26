import { ISSUERS } from "@/data/issuers";
import { IssuerCard } from "@/components/IssuerCard";

export default function IssuersPage() {
  const sorted = [...ISSUERS].sort(
    (a, b) => b.marketCapCadMillions - a.marketCapCadMillions,
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Issuers
        </h1>
        <p className="mt-2 text-slate-600">
          {sorted.length} Canadian public companies tracked in this demo. Click
          into any issuer to see their full filings history.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((issuer) => (
          <IssuerCard key={issuer.ticker} issuer={issuer} />
        ))}
      </div>
    </div>
  );
}
