"use client";

import { useWatchlist } from "@/contexts/WatchlistContext";

interface WatchStarProps {
  ticker: string;
  size?: "sm" | "md";
  withLabel?: boolean;
}

/**
 * Star button: click to add/remove an issuer to the local Watchlist.
 * Persists via WatchlistContext (localStorage).
 */
export function WatchStar({ ticker, size = "md", withLabel = false }: WatchStarProps) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(ticker);
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(ticker);
      }}
      aria-pressed={watched}
      aria-label={watched ? `Remove ${ticker} from watchlist` : `Add ${ticker} to watchlist`}
      title={watched ? "Remove from watchlist" : "Add to watchlist"}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border transition-colors ${
        watched
          ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
          : "bg-white border-slate-300 text-slate-500 hover:border-amber-300 hover:text-amber-600"
      }`}
    >
      <svg
        className={iconSize}
        viewBox="0 0 24 24"
        fill={watched ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      {withLabel && (
        <span className="text-xs font-medium">
          {watched ? "Watching" : "Watch"}
        </span>
      )}
    </button>
  );
}
