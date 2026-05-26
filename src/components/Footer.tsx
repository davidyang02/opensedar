import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-terminal-navy">OpenSEDAR</span>
          <span className="text-slate-300">·</span>
          <span>Demo build for analyst preview — not affiliated with the Canadian Securities Administrators.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <a
            href="https://www.sedarplus.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            SEDAR+
          </a>
        </div>
      </div>
    </footer>
  );
}
