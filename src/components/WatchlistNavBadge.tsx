"use client";

import Link from "next/link";
import { useWatchlist } from "@/contexts/WatchlistContext";

export function WatchlistNavBadge() {
  const { count } = useWatchlist();
  return (
    <Link
      href="/watchlist"
      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill={count > 0 ? "#d97706" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      <span>Watchlist</span>
      {count > 0 && (
        <span className="text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">
          {count}
        </span>
      )}
    </Link>
  );
}
