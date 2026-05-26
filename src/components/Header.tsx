import Link from "next/link";
import { GlobalSearch } from "./GlobalSearch";

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
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>
        <div className="flex-1 max-w-md ml-auto">
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}
