import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        What OpenSEDAR is
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        A faster, cleaner browser for Canadian public-company filings.
      </p>

      <section className="mt-10 space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">
          The problem with SEDAR+
        </h2>
        <p>
          SEDAR+ — the Canadian Securities Administrators&apos; filings system —
          has every disclosure document filed by every public company in
          Canada. Financial statements, MD&amp;A, prospectuses, material change
          reports, insider transactions, proxy circulars.
        </p>
        <p>
          But finding anything in it requires knowing the issuer&apos;s exact
          legal name, navigating tab-driven search forms, and downloading
          130-page PDFs to extract one number. The interface predates the
          smartphone.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">
          What we&apos;re trying differently
        </h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-terminal-navy font-bold">→</span>
            <span>
              <strong>Instant search.</strong> Type a ticker, company name, or
              filing keyword — results appear as you type, no submit button.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-terminal-navy font-bold">→</span>
            <span>
              <strong>Filings extracted, not just listed.</strong> For key
              filings, we surface the numbers and notable sections so you don&apos;t
              have to read a 130-page PDF to find net income or the asset cap.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-terminal-navy font-bold">→</span>
            <span>
              <strong>Source is always one click away.</strong> Every extracted
              data point links back to the original SEDAR+ document. We surface;
              we don&apos;t replace.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-terminal-navy font-bold">→</span>
            <span>
              <strong>Cross-reference with regulatory data.</strong> For
              regulated entities (Big 6 banks), we&apos;ll link SEDAR+ filings to
              the equivalent OSFI returns — same issuer, two data sources, one
              page.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Demo scope</h2>
        <p>
          This is an early preview. The dataset is curated by hand — 8 issuers,
          ~50 filings, 2 extracted in detail. The production version will
          ingest SEDAR+ filings live and extract key data points using
          structured-filing parsing (XBRL/iXBRL) plus user-driven AI extraction.
        </p>
        <p>
          OpenSEDAR ships standalone first. It will eventually merge into{" "}
          <a
            href="https://github.com/davidyang02/openbsis-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-navy underline hover:text-terminal-dark-navy"
          >
            OpenBSIS
          </a>{" "}
          — a broader Canadian financial markets platform covering OSFI bank
          data, SEDAR+ filings, earnings, M&amp;A, and insider activity in one
          place.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">
          Not affiliated with
        </h2>
        <p>
          The Canadian Securities Administrators, SEDAR+, OSFI, or any
          regulated institution. OpenSEDAR reads public filings under
          NI&nbsp;13-101 and renders them in a different surface. The original
          documents on{" "}
          <a
            href="https://www.sedarplus.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-navy underline hover:text-terminal-dark-navy"
          >
            sedarplus.ca
          </a>{" "}
          remain the source of truth.
        </p>
      </section>

      <div className="mt-10 pt-6 border-t border-slate-200">
        <Link
          href="/"
          className="text-sm text-terminal-navy hover:underline"
        >
          ← Back to recent filings
        </Link>
      </div>
    </div>
  );
}
