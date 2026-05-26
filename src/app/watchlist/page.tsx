"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { getIssuerByTicker, isHandCurated } from "@/data/issuers";
import { FILINGS } from "@/data/filings";
import { WatchStar } from "@/components/WatchStar";
import { LiveFilingsTable } from "@/components/LiveFilingsTable";
import { formatMarketCap } from "@/lib/formatters";

export default function WatchlistPage() {
  const { tickers, count } = useWatchlist();
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState<string | null>(null);

  const watchedIssuers = useMemo(
    () =>
      tickers
        .map((t) => getIssuerByTicker(t))
        .filter((i): i is NonNullable<ReturnType<typeof getIssuerByTicker>> => Boolean(i)),
    [tickers],
  );

  const watchedFilings = useMemo(() => {
    if (tickers.length === 0) return [];
    const set = new Set(tickers.map((t) => t.toUpperCase()));
    return [...FILINGS]
      .filter((f) => set.has(f.issuerTicker.toUpperCase()))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 40);
  }, [tickers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes("@")) return;
    setEmailSubmitted(emailInput);
    setEmailInput("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Watchlist
          </h1>
          <span className="text-sm text-slate-500">
            {count} issuer{count === 1 ? "" : "s"} watched
          </span>
        </div>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Your starred issuers — pinned locally to this browser. Star any
          issuer to add them here. Subscribe to get an email digest when they
          file.
        </p>
      </header>

      {/* Email digest subscribe form */}
      <section className="mb-8 bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
          <h2 className="text-base font-semibold text-slate-900">
            Email digest
          </h2>
          <span className="text-[10px] uppercase tracking-wider text-terminal-muted">
            Demo · placeholder
          </span>
        </div>
        {emailSubmitted ? (
          <div className="text-sm text-slate-700">
            ✓ Subscribed{" "}
            <span className="font-mono text-terminal-navy">{emailSubmitted}</span>{" "}
            to daily digests for {count} watched issuer{count === 1 ? "" : "s"}.
            <span className="block text-xs text-slate-500 mt-1">
              In the production version, you&apos;ll get one email per day with
              new filings from issuers on your watchlist. This is a UI
              placeholder — no email is actually sent.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-terminal-blue focus:ring-1 focus:ring-terminal-blue"
            />
            <button
              type="submit"
              disabled={count === 0}
              className="px-4 py-1.5 text-sm bg-terminal-navy text-white rounded hover:bg-terminal-dark-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Subscribe to daily digest
            </button>
            {count === 0 && (
              <span className="text-xs text-slate-500">
                Add at least one issuer to enable digests.
              </span>
            )}
          </form>
        )}
      </section>

      {count === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Watched issuers
            </h2>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              {watchedIssuers.map((issuer) => (
                <div
                  key={issuer.ticker}
                  className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-terminal-row-hover border-b border-slate-100 last:border-b-0 items-center"
                >
                  <div className="col-span-1">
                    <WatchStar ticker={issuer.ticker} size="sm" />
                  </div>
                  <Link
                    href={`/issuer/${issuer.ticker}`}
                    className="col-span-2 font-mono text-sm font-semibold text-terminal-navy"
                  >
                    {issuer.ticker}
                  </Link>
                  <Link
                    href={`/issuer/${issuer.ticker}`}
                    className="col-span-5 min-w-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-900 truncate">
                        {issuer.name}
                      </span>
                      {isHandCurated(issuer.ticker) && (
                        <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="col-span-2 text-xs text-slate-500 truncate">
                    {issuer.sector}
                  </div>
                  <div className="col-span-2 text-xs text-right text-slate-600 font-mono">
                    {formatMarketCap(issuer.marketCapCadMillions)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent filings from your watchlist
              </h2>
              <span className="text-xs text-slate-500">
                {watchedFilings.length}{" "}
                {watchedFilings.length === 1 ? "filing" : "filings"}
              </span>
            </div>
            {watchedFilings.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-sm text-slate-500">
                No filings indexed yet for these watched issuers. OpenSEDAR
                currently has hand-curated filings for the Big 6 banks +
                Shopify + Brookfield. Star one of those to populate this
                feed.
              </div>
            ) : (
              <LiveFilingsTable filings={watchedFilings} />
            )}
          </section>
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 rounded-full mb-4">
        <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2">
        Your watchlist is empty
      </h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
        Star an issuer to add them here. Watchlists are stored locally in
        your browser — no account needed.
      </p>
      <Link
        href="/issuers"
        className="inline-block px-4 py-2 text-sm bg-terminal-navy text-white rounded hover:bg-terminal-dark-navy transition-colors"
      >
        Browse issuers
      </Link>
    </div>
  );
}
