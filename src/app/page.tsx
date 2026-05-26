import Link from "next/link";
import { HAND_CURATED_ISSUERS } from "@/data/issuers";
import { TMX_ISSUERS } from "@/data/allIssuers";
import { getRecentFilings, FILINGS } from "@/data/filings";
import { IssuerCard } from "@/components/IssuerCard";
import { LiveFilingsTable } from "@/components/LiveFilingsTable";

export default function Home() {
  const recentFilings = getRecentFilings(40);
  const featuredFilings = FILINGS.filter((f) => f.hasExtractedContent);
  const topIssuers = [...HAND_CURATED_ISSUERS]
    .sort((a, b) => b.marketCapCadMillions - a.marketCapCadMillions)
    .slice(0, 4);
  const totalIssuers = TMX_ISSUERS.length + HAND_CURATED_ISSUERS.filter(
    (i) => !TMX_ISSUERS.some((t) => t.ticker.toUpperCase() === i.ticker.toUpperCase()),
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero */}
      <section className="mb-8">
        <div className="max-w-3xl">
          <div className="inline-block px-2 py-0.5 mb-3 text-[10px] uppercase tracking-wider bg-terminal-navy text-white rounded">
            Demo preview · {totalIssuers.toLocaleString()} Canadian issuers tracked
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Canadian public filings,{" "}
            <span className="text-terminal-navy">without the friction.</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-600 max-w-2xl">
            A faster, cleaner browser over SEDAR+. Filings stream live, key
            numbers surfaced, original PDFs always one click away. Star issuers
            to build your watchlist.
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Live filings table */}
        <section className="lg:col-span-9">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent filings
            </h2>
            <span className="text-xs text-slate-500">
              {recentFilings.length} most recent across tracked issuers
            </span>
          </div>
          <LiveFilingsTable filings={recentFilings} />
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Featured extracted */}
          {featuredFilings.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
                Extracted demos
              </h3>
              <div className="space-y-2">
                {featuredFilings.map((f) => (
                  <Link
                    key={f.id}
                    href={`/filing/${f.id}`}
                    className="block bg-white border border-terminal-accent/30 rounded-lg p-3 hover:border-terminal-accent hover:shadow-sm transition-all"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-terminal-navy">
                        {f.issuerTicker}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded">
                        Extracted
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">
                      {f.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Top issuers */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Top issuers
              </h3>
              <Link
                href="/issuers"
                className="text-xs text-terminal-navy hover:underline"
              >
                All →
              </Link>
            </div>
            <div className="space-y-2">
              {topIssuers.map((i) => (
                <IssuerCard key={i.ticker} issuer={i} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
