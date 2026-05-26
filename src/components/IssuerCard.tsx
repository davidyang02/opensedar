import Link from "next/link";
import { Issuer } from "@/lib/types";
import { formatMarketCap } from "@/lib/formatters";

export function IssuerCard({ issuer }: { issuer: Issuer }) {
  return (
    <Link
      href={`/issuer/${issuer.ticker}`}
      className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-terminal-blue hover:shadow-sm transition-all"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{issuer.name}</h3>
        <span className="text-xs font-mono text-terminal-navy font-semibold">
          {issuer.ticker}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
        <span>{issuer.exchange}</span>
        <span className="text-slate-300">·</span>
        <span>{issuer.industry}</span>
        <span className="text-slate-300">·</span>
        <span>{formatMarketCap(issuer.marketCapCadMillions)}</span>
      </div>
      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{issuer.blurb}</p>
    </Link>
  );
}
