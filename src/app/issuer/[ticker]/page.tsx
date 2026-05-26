import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssuerByTicker, ISSUERS } from "@/data/issuers";
import { getFilingsByIssuer } from "@/data/filings";
import { IssuerFilingsList } from "@/components/IssuerFilingsList";
import { formatMarketCap } from "@/lib/formatters";

export function generateStaticParams() {
  return ISSUERS.map((i) => ({ ticker: i.ticker }));
}

export default async function IssuerPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const issuer = getIssuerByTicker(ticker);
  if (!issuer) notFound();

  const filings = getFilingsByIssuer(issuer.ticker);

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
            <div className="flex items-baseline gap-3">
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
          <div className="flex flex-col gap-2 text-right">
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
            >
              View on SEDAR+ ↗
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

      {/* Filings list */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Filings</h2>
        <IssuerFilingsList filings={filings} />
      </section>
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
