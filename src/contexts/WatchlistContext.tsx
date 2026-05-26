"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * Watchlist of starred issuer tickers, persisted in localStorage.
 * No auth needed — per-browser scope. Production version would migrate
 * to a server-backed user.watchlist table when OpenSEDAR folds into
 * OpenBSIS with auth.
 */

const STORAGE_KEY = "opensedar_watchlist_v1";

interface WatchlistContextValue {
  tickers: string[];
  isWatched: (ticker: string) => boolean;
  toggle: (ticker: string) => void;
  add: (ticker: string) => void;
  remove: (ticker: string) => void;
  count: number;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [tickers, setTickers] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTickers(parsed.filter((t) => typeof t === "string"));
        }
      }
    } catch {
      // ignore malformed state
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickers));
    } catch {
      // localStorage may be full or unavailable; ignore
    }
  }, [tickers, hydrated]);

  const normalize = (t: string) => t.toUpperCase();

  const isWatched = useCallback(
    (ticker: string) => tickers.includes(normalize(ticker)),
    [tickers],
  );

  const add = useCallback((ticker: string) => {
    const t = normalize(ticker);
    setTickers((prev) => (prev.includes(t) ? prev : [...prev, t]));
  }, []);

  const remove = useCallback((ticker: string) => {
    const t = normalize(ticker);
    setTickers((prev) => prev.filter((x) => x !== t));
  }, []);

  const toggle = useCallback(
    (ticker: string) => {
      const t = normalize(ticker);
      setTickers((prev) =>
        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
      );
    },
    [],
  );

  return (
    <WatchlistContext.Provider
      value={{ tickers, isWatched, toggle, add, remove, count: tickers.length }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    // SSR / no-provider fallback — return inert handlers so hooks
    // can still be called.
    return {
      tickers: [],
      isWatched: () => false,
      toggle: () => {},
      add: () => {},
      remove: () => {},
      count: 0,
    };
  }
  return ctx;
}
