import Link from "next/link";
import { notFound } from "next/navigation";
import { getFilingById, FILINGS } from "@/data/filings";
import { getIssuerByTicker } from "@/data/issuers";
import { getExtractedContent } from "@/data/extractedContent";
import { FILING_TYPE_LABELS } from "@/lib/types";
import { FilingTypeBadge } from "@/components/FilingTypeBadge";
import { formatFilingDate } from "@/lib/formatters";

export function generateStaticParams() {
  return FILINGS.map((f) => ({ id: f.id }));
}

export default async function FilingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filing = getFilingById(id);
  if (!filing) notFound();

  const issuer = getIssuerByTicker(filing.issuerTicker);
  const extracted = filing.hasExtractedContent
    ? getExtractedContent(filing.id)
    : undefined;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-4">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <span className="mx-1.5">›</span>
        {issuer && (
          <>
            <Link
              href={`/issuer/${issuer.ticker}`}
              className="hover:text-slate-900"
            >
              {issuer.ticker} · {issuer.shortName ?? issuer.name}
            </Link>
            <span className="mx-1.5">›</span>
          </>
        )}
        <span className="text-slate-700">
          {FILING_TYPE_LABELS[filing.type]}
        </span>
      </nav>

      {/* Filing header */}
      <header className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3">
          <FilingTypeBadge type={filing.type} />
          {filing.fiscalPeriod && (
            <span className="text-xs text-slate-500 mt-0.5">
              {filing.fiscalPeriod}
            </span>
          )}
          <span className="text-xs text-slate-400 mt-0.5">
            {filing.language}
          </span>
          <span className="text-xs text-slate-400 mt-0.5 ml-auto">
            Filed {formatFilingDate(filing.date)}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-3">
          {filing.title}
        </h1>
        {issuer && (
          <Link
            href={`/issuer/${issuer.ticker}`}
            className="inline-flex items-baseline gap-2 mt-2 hover:underline"
          >
            <span className="text-sm font-mono font-semibold text-terminal-navy">
              {issuer.ticker}
            </span>
            <span className="text-sm text-slate-700">{issuer.name}</span>
          </Link>
        )}
        <p className="text-sm text-slate-600 mt-4 max-w-3xl">{filing.summary}</p>
        <div className="flex flex-wrap gap-3 mt-5 text-sm">
          <a
            href={filing.sedarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-terminal-navy text-white rounded hover:bg-terminal-dark-navy transition-colors"
            title="SEDAR+ doesn't support deep-link URLs — opens their search form. Real document deep-links arrive when the crawler ships."
          >
            Search on SEDAR+ ↗
          </a>
          <span className="text-xs text-slate-500 self-center italic max-w-sm">
            SEDAR+ doesn&apos;t expose static document URLs — opens their
            search form. Phase 1 crawler will deep-link the actual filing.
          </span>
          {filing.pageCount && (
            <span className="px-4 py-1.5 text-slate-500 self-center">
              {filing.pageCount} pages
            </span>
          )}
        </div>
      </header>

      {extracted ? (
        <ExtractedView extracted={extracted} />
      ) : (
        <UnextractedView />
      )}
    </div>
  );
}

function ExtractedView({
  extracted,
}: {
  extracted: NonNullable<ReturnType<typeof getExtractedContent>>;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2">
        {/* Headline */}
        <div className="bg-gradient-to-br from-terminal-navy to-terminal-blue text-white rounded-lg p-6 mb-6">
          <div className="text-[10px] uppercase tracking-wider opacity-80 mb-2">
            OpenSEDAR extract · headline
          </div>
          <p className="text-lg leading-snug">{extracted.headline}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {extracted.sections.map((section, idx) => (
            <section key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3">
                {section.heading}
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
              {section.callout && (
                <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 text-sm text-amber-900">
                  <span className="block text-[10px] uppercase tracking-wider text-amber-700 mb-1">
                    Notable
                  </span>
                  {section.callout}
                </div>
              )}
            </section>
          ))}

          {extracted.riskNotes && extracted.riskNotes.length > 0 && (
            <section className="bg-white border border-rose-200 rounded-lg p-6">
              <h2 className="text-base font-semibold text-rose-900 mb-3">
                Risk notes
              </h2>
              <ul className="space-y-1 text-sm text-slate-700">
                {extracted.riskNotes.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Sidebar — key data points */}
      <aside>
        <div className="sticky top-20">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Key data points
            </h3>
            <dl className="space-y-3">
              {extracted.keyDataPoints.map((p, i) => (
                <div
                  key={i}
                  className={
                    p.emphasis
                      ? "p-3 -mx-2 bg-terminal-row-hover rounded"
                      : ""
                  }
                >
                  <dt className="text-[10px] uppercase tracking-wider text-terminal-muted">
                    {p.label}
                  </dt>
                  <dd
                    className={`mt-0.5 ${
                      p.emphasis
                        ? "text-xl font-bold text-terminal-navy"
                        : "text-base font-semibold text-slate-900"
                    }`}
                  >
                    {p.value}
                  </dd>
                  {p.delta && (
                    <dd className="text-xs text-slate-500">{p.delta}</dd>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600">
            <strong className="text-slate-900">How this works:</strong> Key
            numbers and notable sections are extracted on ingest. The original
            PDF is still the source of truth — every cell links back to its
            exact page in the SEDAR+ document.
          </div>
        </div>
      </aside>
    </div>
  );
}

function UnextractedView() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
      <h2 className="text-base font-semibold text-slate-900 mb-2">
        This filing hasn&apos;t been processed yet
      </h2>
      <p className="text-sm text-slate-600 max-w-xl mx-auto">
        OpenSEDAR is extracting key data points and notable sections from
        Canadian public-company filings. This particular filing is on the queue.
        For now, the original PDF on SEDAR+ has the full text.
      </p>
    </div>
  );
}
