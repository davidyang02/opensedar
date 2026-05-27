import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIssuerByTicker,
  HAND_CURATED_ISSUERS,
  isHandCurated,
} from "@/data/issuers";
import { getFilingsByIssuer } from "@/data/filings";
import { IssuerFilingsList } from "@/components/IssuerFilingsList";
import { WatchStar } from "@/components/WatchStar";
import { formatMarketCap } from "@/lib/formatters";

// Only pre-render the hand-curated 8 statically. Everything else (the 2,200
// TMX issuers) is generated on first request. dynamicParams = true (default)
// keeps the dynamic catch-all working.
export function generateStaticParams() {
  return HAND_CURATED_ISSUERS.map((i) => ({ ticker: i.ticker }));
}

export const dynamicParams = true;

export default async function IssuerPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const issuer = getIssuerByTicker(ticker);
  if (!issuer) notFound();

  const filings = getFilingsByIssuer(issuer.ticker);
  const isFeatured = isHandCurated(issuer.ticker);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-4">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <span className="mx-1.5">›</span>
        <Link href="/issuers" className="hover:text-slate-900">
          Issuers
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700">{issuer.ticker}</span>
      </nav>

      {/* Issuer header */}
      <header className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">
                {issuer.name}
              </h1>
              <span className="text-base font-mono font-semibold text-terminal-navy">
                {issuer.ticker}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">
                {issuer.exchange}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 max-w-3xl">{issuer.blurb}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <WatchStar ticker={issuer.ticker} withLabel />
            {issuer.websiteUrl && (
              <a
                href={issuer.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-terminal-navy hover:underline"
              >
                {issuer.websiteUrl.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
            <a
              href={issuer.sedarProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-terminal-navy hover:underline"
              title="Opens SEDAR+ profile search — enter the ticker manually"
            >
              Search on SEDAR+ ↗
            </a>
          </div>
        </div>

        {/* Quick facts strip */}
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <Fact label="Market cap" value={formatMarketCap(issuer.marketCapCadMillions)} />
          <Fact label="Industry" value={issuer.industry} />
          <Fact label="Headquarters" value={issuer.hq} />
          <Fact label="Filings tracked" value={filings.length.toString()} />
        </dl>

        {issuer.osfiInstitutionName && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-[10px] uppercase tracking-wider text-terminal-muted mb-1">
              Cross-reference
            </div>
            <div className="text-xs text-slate-600">
              Also files OSFI regulatory returns as{" "}
              <strong>{issuer.osfiInstitutionName}</strong>. When OpenSEDAR
              merges into OpenBSIS, this issuer's M4 balance sheet, P3 income
              statement, BCAR capital ratios, and other OSFI returns will link
              directly from this page.
            </div>
          </div>
        )}
      </header>

      {/* Filings list — or "not yet tracked" state for non-featured issuers */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-900">Filings</h2>
          {isFeatured && (
            <span className="text-xs px-2 py-0.5 bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 rounded">
              Featured · curated filings
            </span>
          )}
        </div>
        {filings.length > 0 ? (
          <IssuerFilingsList filings={filings} />
        ) : (
          <NotYetTracked
            issuerName={issuer.name}
            ticker={issuer.ticker}
            sedarUrl={issuer.sedarProfileUrl}
          />
        )}
      </section>
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
    <div className="bg-white border border-slate-200 rounded-lg p-8">
      <div className="max-w-lg mx-auto text-center">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          Filings for {issuerName} aren&apos;t indexed yet
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          OpenSEDAR currently has hand-curated filings for 8 featured issuers
          (the Big 6 banks, Shopify, and Brookfield). Full SEDAR+ filing
          coverage for all 2,200+ tracked TSX/TSXV issuers is in development —
          the production crawler is the next milestone.
        </p>
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <a
            href={sedarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-terminal-navy text-white rounded hover:bg-terminal-dark-navy transition-colors"
          >
            View {ticker} on SEDAR+ ↗
          </a>
          <Link
            href="/about"
            className="px-4 py-2 bg-white text-terminal-navy border border-terminal-navy rounded hover:bg-terminal-row-hover transition-colors"
          >
            How OpenSEDAR works
          </Link>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-terminal-muted">
        {label}
      </dt>
      <dd className="text-sm font-medium text-slate-900 mt-0.5">{value}</dd>
    </div>
  );
}
