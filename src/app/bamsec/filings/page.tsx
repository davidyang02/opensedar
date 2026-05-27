import Link from "next/link";
import { FILINGS } from "@/data/filings";
import { FILING_TYPE_SHORT } from "@/lib/types";
import { formatFilingDate } from "@/lib/formatters";

/**
 * BamSEC-style flat chronological filings feed. Reads like a regulator
 * ticker tape — denser than our OpenSEDAR LiveFilingsTable.
 */
export default function BamSecFilingsFeed() {
  const sorted = [...FILINGS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <header className="border-b border-slate-200 pb-3 mb-5">
        <h1 className="text-xl font-semibold text-slate-900">All Filings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {sorted.length} filings · chronological · most recent first
        </p>
      </header>

      <div className="border-t border-slate-200">
        <div className="hidden md:grid grid-cols-12 gap-3 py-2 px-2 text-[11px] uppercase tracking-wider text-slate-500 font-medium border-b border-slate-200 bg-slate-50 -mx-2">
          <div className="col-span-2">Ticker</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-6">Filing</div>
          <div className="col-span-2 text-right">Date</div>
        </div>
        {sorted.map((f) => (
          <div
            key={f.id}
            className="grid grid-cols-12 gap-3 py-2 px-2 -mx-2 border-b border-slate-100 hover:bg-slate-50 text-sm items-baseline"
          >
            <Link
              href={`/bamsec/companies/${f.issuerTicker}`}
              className="col-span-2 font-mono text-[12px] font-semibold text-slate-800 hover:text-blue-700 hover:underline"
            >
              {f.issuerTicker}
            </Link>
            <Link href={`/filing/${f.id}`} className="col-span-2">
              <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium">
                {FILING_TYPE_SHORT[f.type]}
              </span>
            </Link>
            <Link
              href={`/filing/${f.id}`}
              className="col-span-6 text-slate-800 truncate hover:text-blue-700"
            >
              {f.title}
              {f.fiscalPeriod && (
                <span className="text-slate-500 ml-2">· {f.fiscalPeriod}</span>
              )}
              {f.hasExtractedContent && (
                <span className="ml-2 text-[9px] uppercase tracking-wider px-1 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  Extracted
                </span>
              )}
            </Link>
            <span className="col-span-2 text-right text-slate-500 text-xs whitespace-nowrap">
              {formatFilingDate(f.date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
