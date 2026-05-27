import Link from "next/link";
import { GlobalSearch } from "./GlobalSearch";
import { WatchlistNavBadge } from "./WatchlistNavBadge";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-8">
        <Link href="/" className="flex items-baseline gap-2 shrink-0">
          <span className="text-terminal-navy font-bold text-lg tracking-tight">
            OpenSEDAR
          </span>
          <span className="text-[10px] text-terminal-muted uppercase tracking-wider">
            demo
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Recent
          </Link>
          <Link href="/issuers" className="hover:text-slate-900">
            Issuers
          </Link>
          <WatchlistNavBadge />
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>
        <div className="flex-1 max-w-md ml-auto">
          <GlobalSearch />
        </div>
        <a
          href="https://notsedar.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline text-xs px-2 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap"
          title="Sister product: same data, BamSEC-style UI"
        >
          NotSEDAR ↗
        </a>
      </div>
    </header>
  );
}
