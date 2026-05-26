"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { searchIssuers, isHandCurated } from "@/data/issuers";
import { FILINGS } from "@/data/filings";
import { FILING_TYPE_SHORT } from "@/lib/types";
import { formatDateShort } from "@/lib/formatters";

/**
 * Instant client-side search across ~2,200 TMX issuers + ~60 hand-curated
 * filings. Uses searchIssuers() which delegates to the unified registry.
 * Sub-millisecond filter on a 2,200-row array.
 */
export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const q = query.trim().toLowerCase();

  const issuerMatches = useMemo(
    () => (q ? searchIssuers(query, 8) : []),
    [q, query],
  );

  const filingMatches = useMemo(
    () =>
      q
        ? FILINGS.filter(
            (f) =>
              f.title.toLowerCase().includes(q) ||
              f.summary.toLowerCase().includes(q) ||
              f.fiscalPeriod?.toLowerCase().includes(q),
          ).slice(0, 6)
        : [],
    [q],
  );

  const hasResults = issuerMatches.length + filingMatches.length > 0;

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
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
          placeholder="Search issuers, filings, RY, MD&A..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-300 rounded bg-white focus:outline-none focus:border-terminal-blue focus:ring-1 focus:ring-terminal-blue"
        />
      </div>
      {open && q && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-[500px] overflow-y-auto z-50">
          {!hasResults && (
            <div className="px-4 py-3 text-sm text-slate-500">
              No matches for &quot;{query}&quot;
            </div>
          )}
          {issuerMatches.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50">
                Issuers
              </div>
              {issuerMatches.map((i) => (
                <Link
                  key={i.ticker}
                  href={`/issuer/${i.ticker}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="block px-3 py-2 hover:bg-terminal-row-hover"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-sm text-slate-900 line-clamp-1">
                      {i.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isHandCurated(i.ticker) && (
                        <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded">
                          Featured
                        </span>
                      )}
                      <span className="text-xs font-mono text-terminal-navy">
                        {i.ticker}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {i.exchange} · {i.industry}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {filingMatches.length > 0 && (
            <div className="py-1 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50">
                Filings
              </div>
              {filingMatches.map((f) => (
                <Link
                  key={f.id}
                  href={`/filing/${f.id}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="block px-3 py-2 hover:bg-terminal-row-hover"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm text-slate-900 line-clamp-1">
                      {f.title}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {formatDateShort(f.date)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-mono">{f.issuerTicker}</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                      {FILING_TYPE_SHORT[f.type]}
                    </span>
                    {f.fiscalPeriod && (
                      <span className="text-[10px]">{f.fiscalPeriod}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
