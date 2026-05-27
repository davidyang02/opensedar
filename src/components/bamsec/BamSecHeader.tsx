"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * BamSEC-style header — dark navy bar with white logo, horizontal nav,
 * UI-style switcher. Replaces the default Header when /bamsec/* routes
 * render. Keeps the same WatchlistProvider context so user state is
 * shared between the two UIs.
 */
export function BamSecHeader() {
  const pathname = usePathname() || "/bamsec";
  const inBamsec = pathname.startsWith("/bamsec");

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-30 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-6">
        <Link href="/bamsec" className="flex items-baseline gap-2 shrink-0">
          <span className="font-bold text-base tracking-tight">OpenSEDAR</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            BamSEC-style
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-slate-300">
          <Link href="/bamsec" className="hover:text-white">
            Companies
          </Link>
          <Link href="/bamsec/filings" className="hover:text-white">
            Filings
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </nav>
        {/* UI style switcher */}
        <div className="ml-auto flex items-center gap-1 text-xs">
          <span className="text-slate-400 mr-2 hidden sm:inline">UI:</span>
          <Link
            href="/"
            className={`px-3 py-1 rounded transition-colors ${
              inBamsec
                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                : "bg-white text-slate-900"
            }`}
          >
            OpenSEDAR
          </Link>
          <Link
            href="/bamsec"
            className={`px-3 py-1 rounded transition-colors ${
              inBamsec
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            BamSEC
          </Link>
        </div>
      </div>
    </header>
  );
}
