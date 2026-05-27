import Link from "next/link";
import { HAND_CURATED_ISSUERS } from "@/data/issuers";
import { getRecentFilings, FILINGS } from "@/data/filings";
import { FILING_TYPE_SHORT } from "@/lib/types";
import { formatFilingDate } from "@/lib/formatters";

/**
 * BamSEC-style homepage. Dense list of recent filings on the left,
 * featured companies + extracted demos on the right. No card grids,
 * no big hero — institutional/utility feel.
 */
export default function BamSecHome() {
  const recentFilings = getRecentFilings(30);
  const featuredFilings = FILINGS.filter((f) => f.hasExtractedContent);
  const featuredCompanies = [...HAND_CURATED_ISSUERS].sort(
    (a, b) => b.marketCapCadMillions - a.marketCapCadMillions,
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Compact strip header */}
      <div className="border-b border-slate-200 pb-3 mb-5 flex items-baseline justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Canadian Public Filings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            All TSX/TSXV reporting issuers · 2,187 companies · {FILINGS.length}{" "}
            filings indexed in demo
          </p>
        </div>
        <div className="text-xs text-slate-500">
          As of {formatFilingDate(new Date().toISOString().slice(0, 10))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left: filings list */}
        <section className="lg:col-span-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2 flex items-baseline justify-between">
            <span>Recent Filings</span>
            <Link
              href="/bamsec/filings"
              className="normal-case tracking-normal text-[12px] text-slate-700 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>
          <div className="border-t border-slate-200">
            {recentFilings.map((f) => (
              <BamSecFilingRow key={f.id} filing={f} />
            ))}
          </div>
        </section>

        {/* Right: companies + featured extracted */}
        <aside className="lg:col-span-1">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
            Featured Companies
          </div>
          <ul className="border-t border-slate-200">
            {featuredCompanies.map((c) => (
              <li key={c.ticker}>
                <Link
                  href={`/bamsec/companies/${c.ticker}`}
                  className="grid grid-cols-12 gap-1 py-1.5 px-2 -mx-2 hover:bg-slate-50 text-sm"
                >
                  <span className="col-span-3 font-mono font-semibold text-slate-800">
                    {c.ticker}
                  </span>
                  <span className="col-span-9 text-slate-700 truncate">
                    {c.shortName ?? c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {featuredFilings.length > 0 && (
            <>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mt-6 mb-2">
                Extracted Filings (Demo)
              </div>
              <ul className="border-t border-slate-200 text-sm">
                {featuredFilings.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/filing/${f.id}`}
                      className="block py-2 px-2 -mx-2 hover:bg-slate-50"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-800">
                          {f.issuerTicker}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                          {FILING_TYPE_SHORT[f.type]}
                        </span>
                      </div>
                      <div className="text-slate-700 text-xs mt-1 line-clamp-2">
                        {f.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function BamSecFilingRow({
  filing,
}: {
  filing: ReturnType<typeof getRecentFilings>[number];
}) {
  return (
    <Link
      href={`/filing/${filing.id}`}
      className="grid grid-cols-12 gap-3 py-2 px-2 -mx-2 border-b border-slate-100 hover:bg-slate-50 text-sm items-baseline"
    >
      <span className="col-span-2 font-mono text-[12px] font-semibold text-slate-800">
        {filing.issuerTicker}
      </span>
      <span className="col-span-2">
        <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium">
          {FILING_TYPE_SHORT[filing.type]}
        </span>
      </span>
      <span className="col-span-6 text-slate-800 truncate">{filing.title}</span>
      <span className="col-span-2 text-right text-slate-500 text-xs whitespace-nowrap">
        {formatFilingDate(filing.date)}
      </span>
    </Link>
  );
}
