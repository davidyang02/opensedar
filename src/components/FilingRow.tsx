import Link from "next/link";
import { Filing } from "@/lib/types";
import { FilingTypeBadge } from "./FilingTypeBadge";
import { formatFilingDate } from "@/lib/formatters";
import { getIssuerByTicker } from "@/data/issuers";

interface FilingRowProps {
  filing: Filing;
  showIssuer?: boolean;
}

export function FilingRow({ filing, showIssuer = true }: FilingRowProps) {
  const issuer = showIssuer ? getIssuerByTicker(filing.issuerTicker) : null;
  return (
    <Link
      href={`/filing/${filing.id}`}
      className="block px-4 py-3 hover:bg-terminal-row-hover transition-colors border-b border-slate-100 last:border-b-0"
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center pt-0.5 shrink-0 w-12 text-center">
          <FilingTypeBadge type={filing.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-medium text-slate-900 line-clamp-1">
              {filing.title}
            </h3>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {formatFilingDate(filing.date)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            {issuer && (
              <>
                <span className="font-mono font-semibold text-terminal-navy">
                  {issuer.ticker}
                </span>
                <span>{issuer.shortName ?? issuer.name}</span>
                <span className="text-slate-300">·</span>
              </>
            )}
            {filing.fiscalPeriod && (
              <>
                <span>{filing.fiscalPeriod}</span>
                <span className="text-slate-300">·</span>
              </>
            )}
            <span>{filing.pageCount} pp</span>
            {filing.hasExtractedContent && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-terminal-accent font-medium">
                  Extracted
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
            {filing.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
