"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filing, FilingType, FILING_TYPE_LABELS, FILING_TYPE_SHORT } from "@/lib/types";
import { formatFilingTimestamp } from "@/lib/formatters";
import { getIssuerByTicker } from "@/data/issuers";

/**
 * Live-feel filings stream, modeled after thisisnotsedar's homepage table:
 *   Ticker · Company · Filing type · Period · PDF · HH:MM ET
 *
 * Filter chips above for filing type + exchange. Click any row to open
 * the filing detail page. PDF icon links straight to the SEDAR+ source.
 */

const FILING_TYPES_TO_SHOW: FilingType[] = [
  "financial-statements",
  "mda",
  "aif",
  "proxy",
  "material-change",
  "news-release",
  "insider",
];

interface LiveFilingsTableProps {
  filings: Filing[];
}

export function LiveFilingsTable({ filings }: LiveFilingsTableProps) {
  const [typeFilter, setTypeFilter] = useState<FilingType | "all">("all");
  const [exchangeFilter, setExchangeFilter] = useState<"all" | "TSX" | "TSXV">("all");

  const filtered = useMemo(() => {
    return filings.filter((f) => {
      if (typeFilter !== "all" && f.type !== typeFilter) return false;
      if (exchangeFilter !== "all") {
        const issuer = getIssuerByTicker(f.issuerTicker);
        if (!issuer || issuer.exchange !== exchangeFilter) return false;
      }
      return true;
    });
  }, [filings, typeFilter, exchangeFilter]);

  const typeCounts = useMemo(() => {
    const counts: Partial<Record<FilingType | "all", number>> = { all: filings.length };
    for (const f of filings) {
      counts[f.type] = (counts[f.type] ?? 0) + 1;
    }
    return counts;
  }, [filings]);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-wider text-terminal-muted mr-1">
          Filter
        </span>
        <Chip
          active={typeFilter === "all"}
          onClick={() => setTypeFilter("all")}
          label="All types"
          count={typeCounts.all ?? 0}
        />
        {FILING_TYPES_TO_SHOW.filter((t) => (typeCounts[t] ?? 0) > 0).map((t) => (
          <Chip
            key={t}
            active={typeFilter === t}
            onClick={() => setTypeFilter(t)}
            label={FILING_TYPE_LABELS[t]}
            count={typeCounts[t] ?? 0}
          />
        ))}
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <Chip
          active={exchangeFilter === "all"}
          onClick={() => setExchangeFilter("all")}
          label="All exchanges"
        />
        <Chip
          active={exchangeFilter === "TSX"}
          onClick={() => setExchangeFilter("TSX")}
          label="TSX"
        />
        <Chip
          active={exchangeFilter === "TSXV"}
          onClick={() => setExchangeFilter("TSXV")}
          label="TSXV"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-terminal-muted font-medium">
          <div className="col-span-1">Ticker</div>
          <div className="col-span-4">Company / Filing</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Period</div>
          <div className="col-span-1 text-center">PDF</div>
          <div className="col-span-2 text-right">Filed</div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-slate-500">
            No filings match the current filters.
          </div>
        ) : (
          filtered.map((f) => <LiveFilingRow key={f.id} filing={f} />)
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
        active
          ? "bg-terminal-navy text-white border-terminal-navy"
          : "bg-white text-slate-700 border-slate-300 hover:border-terminal-blue hover:text-terminal-blue"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 ${active ? "text-white/80" : "text-slate-400"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function LiveFilingRow({ filing }: { filing: Filing }) {
  const issuer = getIssuerByTicker(filing.issuerTicker);
  const timestamp = formatFilingTimestamp(filing.date, filing.id);
  return (
    <Link
      href={`/filing/${filing.id}`}
      className="grid grid-cols-12 gap-2 px-4 py-2.5 hover:bg-terminal-row-hover transition-colors border-b border-slate-100 last:border-b-0 items-center"
    >
      <div className="col-span-3 md:col-span-1 font-mono text-sm font-semibold text-terminal-navy">
        {filing.issuerTicker}
      </div>
      <div className="col-span-9 md:col-span-4 min-w-0">
        <div className="text-sm text-slate-900 line-clamp-1">{filing.title}</div>
        <div className="text-xs text-slate-500 md:hidden">
          {issuer?.shortName ?? issuer?.name} · {FILING_TYPE_LABELS[filing.type]}
          {filing.fiscalPeriod ? ` · ${filing.fiscalPeriod}` : ""}
        </div>
        <div className="hidden md:block text-xs text-slate-500 line-clamp-1">
          {issuer?.shortName ?? issuer?.name ?? filing.issuerTicker}
        </div>
      </div>
      <div className="hidden md:flex col-span-2 items-center">
        <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200 rounded">
          {FILING_TYPE_SHORT[filing.type]}
        </span>
        {filing.hasExtractedContent && (
          <span className="ml-1.5 text-[9px] uppercase tracking-wider px-1 py-0.5 bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded">
            Extracted
          </span>
        )}
      </div>
      <div className="hidden md:block col-span-2 text-xs text-slate-600">
        {filing.fiscalPeriod ?? "—"}
      </div>
      <div className="hidden md:flex col-span-1 justify-center">
        <a
          href={filing.sedarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="View original PDF on SEDAR+"
          className="text-rose-600 hover:text-rose-700"
          title="View on SEDAR+"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </a>
      </div>
      <div className="hidden md:block col-span-2 text-xs text-slate-500 text-right whitespace-nowrap">
        {timestamp}
      </div>
    </Link>
  );
}
