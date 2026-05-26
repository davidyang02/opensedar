import Link from "next/link";
import { ISSUERS } from "@/data/issuers";
import { getRecentFilings, FILINGS } from "@/data/filings";
import { IssuerCard } from "@/components/IssuerCard";
import { FilingRow } from "@/components/FilingRow";

export default function Home() {
  const recentFilings = getRecentFilings(12);
  const featuredFilings = FILINGS.filter((f) => f.hasExtractedContent);
  const topIssuers = [...ISSUERS]
    .sort((a, b) => b.marketCapCadMillions - a.marketCapCadMillions)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero */}
      <section className="mb-12">
        <div className="max-w-3xl">
          <div className="inline-block px-2 py-0.5 mb-3 text-[10px] uppercase tracking-wider bg-terminal-navy text-white rounded">
            Demo preview · Canadian public filings
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Canadian public filings,{" "}
            <span className="text-terminal-navy">without the friction.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            SEDAR+ has every public-company filing in Canada. It also has a 90s
            interface. OpenSEDAR is a faster, cleaner browser over the same
            data — with key numbers surfaced instead of buried in 130-page PDFs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/issuers"
              className="px-4 py-2 bg-terminal-navy text-white rounded hover:bg-terminal-dark-navy transition-colors"
            >
              Browse issuers
            </Link>
            {featuredFilings[0] && (
              <Link
                href={`/filing/${featuredFilings[0].id}`}
                className="px-4 py-2 bg-white text-terminal-navy border border-terminal-navy rounded hover:bg-terminal-row-hover transition-colors"
              >
                See an extracted filing →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured extracted filings */}
      {featuredFilings.length > 0 && (
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Extracted highlights
            </h2>
            <span className="text-xs text-slate-500">
              Key numbers + notable sections, surfaced
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredFilings.map((f) => (
              <Link
                key={f.id}
                href={`/filing/${f.id}`}
                className="block bg-white border border-terminal-accent/30 rounded-lg p-5 hover:border-terminal-accent hover:shadow-md transition-all relative"
              >
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-terminal-accent text-white text-[10px] font-medium uppercase tracking-wide rounded">
                  Extracted
                </div>
                <div className="text-xs text-terminal-muted mb-1 font-mono">
                  {f.issuerTicker}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 pr-16">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  {f.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent filings */}
        <section className="lg:col-span-2">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent filings
            </h2>
            <span className="text-xs text-slate-500">
              {recentFilings.length} latest across tracked issuers
            </span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            {recentFilings.map((f) => (
              <FilingRow key={f.id} filing={f} />
            ))}
          </div>
        </section>

        {/* Top issuers sidebar */}
        <aside>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Top issuers</h2>
            <Link
              href="/issuers"
              className="text-xs text-terminal-navy hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {topIssuers.map((i) => (
              <IssuerCard key={i.ticker} issuer={i} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
