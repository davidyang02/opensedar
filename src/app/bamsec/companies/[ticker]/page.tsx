import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssuerByTicker, HAND_CURATED_ISSUERS, isHandCurated } from "@/data/issuers";
import { getFilingsByIssuer } from "@/data/filings";
import { Filing, FilingType, FILING_TYPE_LABELS } from "@/lib/types";
import { formatFilingDate, formatMarketCap } from "@/lib/formatters";

export function generateStaticParams() {
  return HAND_CURATED_ISSUERS.map((i) => ({ ticker: i.ticker }));
}

export const dynamicParams = true;

/**
 * BamSEC-style company page. Categorized filings grouped into Financials,
 * Regulatory, Ownership, News, Other. Dense list rows. Sticky right rail
 * with company info.
 */
// Exact BamSEC category names + grouping. Order matters — matches how
// BamSEC's company page displays sections top-to-bottom.
const CATEGORY_GROUPS: { id: string; label: string; types: FilingType[] }[] = [
  {
    id: "financials",
    label: "Financials",
    types: ["financial-statements", "mda", "aif"],
  },
  {
    id: "prospectuses",
    label: "Prospectuses and Registrations",
    types: ["prospectus"],
  },
  {
    id: "ownership",
    label: "Ownership",
    types: ["insider", "early-warning"],
  },
  {
    id: "news",
    label: "News",
    types: ["news-release"],
  },
  {
    id: "proxies",
    label: "Proxies",
    types: ["proxy"],
  },
  {
    id: "other",
    label: "Other",
    types: ["material-change", "etf-mfr"],
  },
];

function groupFilings(filings: Filing[]) {
  const groups: Record<string, Filing[]> = {};
  const claimed = new Set<string>();
  for (const g of CATEGORY_GROUPS) {
    const inGroup = filings
      .filter((f) => g.types.includes(f.type))
      .sort((a, b) => b.date.localeCompare(a.date));
    if (inGroup.length > 0) groups[g.label] = inGroup;
    inGroup.forEach((f) => claimed.add(f.id));
  }
  const orphans = filings.filter((f) => !claimed.has(f.id));
  if (orphans.length > 0) groups["Other"] = orphans;
  return groups;
}

export default async function BamSecCompanyPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const issuer = getIssuerByTicker(ticker);
  if (!issuer) notFound();

  const filings = getFilingsByIssuer(issuer.ticker);
  const isFeatured = isHandCurated(issuer.ticker);
  const groups = groupFilings(filings);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-3">
        <Link href="/bamsec" className="hover:text-slate-900">
          Companies
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700">{issuer.ticker}</span>
      </nav>

      {/* Company header */}
      <header className="border-b border-slate-200 pb-4 mb-5 flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-semibold text-slate-900">{issuer.name}</h1>
            <span className="text-base font-mono font-semibold text-slate-600">
              {issuer.ticker}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">
              {issuer.exchange}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {issuer.industry} · {issuer.hq} ·{" "}
            {formatMarketCap(issuer.marketCapCadMillions)}
          </p>
        </div>
        <div className="text-xs">
          <a
            href={issuer.sedarProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-900 hover:underline"
          >
            Search on SEDAR+ ↗
          </a>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-5 border-b border-slate-200 mb-5 text-sm">
        <span className="pb-2 -mb-px border-b-2 border-slate-900 text-slate-900 font-medium">
          Categorized
        </span>
        <span className="pb-2 text-slate-400 cursor-not-allowed">Chronological</span>
        <span className="pb-2 text-slate-400 cursor-not-allowed">Ownership by Owner</span>
        <span className="pb-2 text-slate-400 cursor-not-allowed">Insider Transactions</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3 space-y-6">
          {filings.length === 0 ? (
            <NotYetTracked
              issuerName={issuer.name}
              ticker={issuer.ticker}
              sedarUrl={issuer.sedarProfileUrl}
            />
          ) : (
            CATEGORY_GROUPS.map((g) => {
              const items = groups[g.label];
              if (!items || items.length === 0) return null;
              return (
                <section key={g.id}>
                  <h2 className="text-[11px] uppercase tracking-wider text-slate-500 font-medium border-b border-slate-200 pb-2 mb-1">
                    {g.label}
                    <span className="ml-1.5 text-slate-400 font-normal normal-case tracking-normal">
                      · {items.length}
                    </span>
                  </h2>
                  <ul>
                    {items.map((f) => (
                      <li key={f.id}>
                        <Link
                          href={`/filing/${f.id}`}
                          className="grid grid-cols-12 gap-3 py-2 px-2 -mx-2 hover:bg-slate-50 text-sm items-baseline"
                        >
                          <span className="col-span-2">
                            <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200 rounded font-medium">
                              {FILING_TYPE_LABELS[f.type]}
                            </span>
                          </span>
                          <span className="col-span-8 text-slate-800 truncate">
                            {f.title}
                            {f.fiscalPeriod && (
                              <span className="text-slate-500 ml-2">
                                · {f.fiscalPeriod}
                              </span>
                            )}
                            {f.hasExtractedContent && (
                              <span className="ml-2 text-[9px] uppercase tracking-wider px-1 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                Extracted
                              </span>
                            )}
                          </span>
                          <span className="col-span-2 text-right text-slate-500 text-xs whitespace-nowrap">
                            {formatFilingDate(f.date)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </main>

        {/* Right rail */}
        <aside className="lg:col-span-1">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
            About
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{issuer.blurb}</p>
          {issuer.websiteUrl && (
            <div className="mt-3 text-xs">
              <a
                href={issuer.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-slate-900 hover:underline"
              >
                {issuer.websiteUrl.replace(/^https?:\/\//, "")} ↗
              </a>
            </div>
          )}

          <div className="mt-5 text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
            Quick Facts
          </div>
          <dl className="text-xs space-y-1.5">
            <Fact label="Exchange" value={issuer.exchange} />
            <Fact label="Industry" value={issuer.industry} />
            <Fact label="HQ" value={issuer.hq} />
            <Fact label="Market Cap" value={formatMarketCap(issuer.marketCapCadMillions)} />
            <Fact label="Filings tracked" value={filings.length.toString()} />
          </dl>

          {issuer.osfiInstitutionName && (
            <>
              <div className="mt-5 text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
                Cross-reference
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Also files OSFI regulatory returns as{" "}
                <strong className="text-slate-800">{issuer.osfiInstitutionName}</strong>.
              </p>
            </>
          )}

          {!isFeatured && (
            <div className="mt-5 text-xs text-slate-500 italic border-t border-slate-200 pt-3">
              This issuer is in the TMX-listed registry. Filings are not
              indexed in this demo — featured issuers only.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-800 text-right">{value}</dd>
    </div>
  );
}

function NotYetTracked({
  issuerName,
  ticker,
  sedarUrl,
}: {
  issuerName: string;
  ticker: string;
  sedarUrl: string;
}) {
  return (
    <div className="border border-slate-200 rounded-sm p-6 text-center bg-slate-50">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">
        Filings for {issuerName} aren&apos;t indexed yet
      </h3>
      <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
        Demo coverage is limited to 8 featured issuers. The production
        crawler will index all 2,187 tracked Canadian issuers.
      </p>
      <a
        href={sedarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-3 py-1.5 text-xs bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors"
      >
        Search {ticker} on SEDAR+ ↗
      </a>
    </div>
  );
}
