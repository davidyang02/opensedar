"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatMarketCap } from "@/lib/formatters";

interface IssuerLite {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  subSector: string;
  marketCapCadMillions: number;
}

interface IssuersBrowserProps {
  handCurated: IssuerLite[];
  tmxOnly: IssuerLite[];
}

const PAGE_SIZE = 60;

export function IssuersBrowser({ handCurated, tmxOnly }: IssuersBrowserProps) {
  const [query, setQuery] = useState("");
  const [exchangeFilter, setExchangeFilter] = useState<"all" | "TSX" | "TSXV">("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const handTickers = useMemo(
    () => new Set(handCurated.map((i) => i.ticker.toUpperCase())),
    [handCurated],
  );

  const allIssuers = useMemo(
    () => [...handCurated, ...tmxOnly],
    [handCurated, tmxOnly],
  );

  const sectors = useMemo(() => {
    const set = new Set<string>();
    for (const i of allIssuers) if (i.sector) set.add(i.sector);
    return Array.from(set).sort();
  }, [allIssuers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allIssuers.filter((i) => {
      if (showFeaturedOnly && !handTickers.has(i.ticker.toUpperCase())) return false;
      if (exchangeFilter !== "all" && i.exchange !== exchangeFilter) return false;
      if (sectorFilter !== "all" && i.sector !== sectorFilter) return false;
      if (q) {
        const hay = `${i.ticker} ${i.name} ${i.sector} ${i.subSector}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allIssuers, query, exchangeFilter, sectorFilter, showFeaturedOnly, handTickers]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  // reset to page 1 when filters change
  const onChange = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Filter by name, ticker, sector..."
            value={query}
            onChange={(e) => onChange(setQuery)(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-300 rounded bg-white focus:outline-none focus:border-terminal-blue focus:ring-1 focus:ring-terminal-blue"
          />
        </div>
        <select
          value={exchangeFilter}
          onChange={(e) => onChange(setExchangeFilter)(e.target.value as "all" | "TSX" | "TSXV")}
          className="text-sm border border-slate-300 rounded px-2 py-1.5 bg-white"
        >
          <option value="all">All exchanges</option>
          <option value="TSX">TSX</option>
          <option value="TSXV">TSXV</option>
        </select>
        <select
          value={sectorFilter}
          onChange={(e) => onChange(setSectorFilter)(e.target.value)}
          className="text-sm border border-slate-300 rounded px-2 py-1.5 bg-white max-w-[200px]"
        >
          <option value="all">All sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => onChange(setShowFeaturedOnly)(e.target.checked)}
            className="rounded"
          />
          <span>Featured only</span>
        </label>
      </div>

      {/* Result count */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs text-slate-500">
          {filtered.length.toLocaleString()} match{filtered.length === 1 ? "" : "es"}
          {filtered.length > PAGE_SIZE && (
            <>
              {" · "}showing {startIdx + 1}–{Math.min(startIdx + PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length.toLocaleString()}
            </>
          )}
        </span>
        {pageCount > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              className="px-2 py-1 border border-slate-300 rounded disabled:opacity-40 hover:bg-slate-50"
            >
              ← Prev
            </button>
            <span className="text-slate-500">
              Page {safePage} / {pageCount}
            </span>
            <button
              type="button"
              disabled={safePage === pageCount}
              onClick={() => setPage(safePage + 1)}
              className="px-2 py-1 border border-slate-300 rounded disabled:opacity-40 hover:bg-slate-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Issuer list */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {visible.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-slate-500">
            No issuers match the current filters.
          </div>
        ) : (
          visible.map((i) => {
            const featured = handTickers.has(i.ticker.toUpperCase());
            return (
              <Link
                key={`${i.exchange}-${i.ticker}`}
                href={`/issuer/${i.ticker}`}
                className="grid grid-cols-12 gap-2 px-4 py-2.5 hover:bg-terminal-row-hover border-b border-slate-100 last:border-b-0 transition-colors"
              >
                <div className="col-span-2 flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-terminal-navy">
                    {i.ticker}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">{i.exchange}</span>
                </div>
                <div className="col-span-5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-900 truncate">{i.name}</span>
                    {featured && (
                      <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-3 text-xs text-slate-500 truncate">{i.sector}</div>
                <div className="col-span-2 text-xs text-right text-slate-600 font-mono">
                  {formatMarketCap(i.marketCapCadMillions)}
                </div>
              </Link>
            );
          })
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-4 flex justify-center items-center gap-3 text-sm">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setPage(safePage - 1)}
            className="px-3 py-1.5 border border-slate-300 rounded disabled:opacity-40 hover:bg-slate-50"
          >
            ← Prev
          </button>
          <span className="text-slate-500">
            Page {safePage} of {pageCount}
          </span>
          <button
            type="button"
            disabled={safePage === pageCount}
            onClick={() => setPage(safePage + 1)}
            className="px-3 py-1.5 border border-slate-300 rounded disabled:opacity-40 hover:bg-slate-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
