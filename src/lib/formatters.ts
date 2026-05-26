/**
 * Display formatters for the OpenSEDAR demo.
 */

export function formatFilingDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Generate a plausible filing-time (HH:MM) deterministically from a filing
 * id so the "live feed" feel matches SEDAR+ filing-time disclosure norms
 * (filings cluster 6am-8pm ET, with peak at 4-7pm after market close).
 */
export function plausibleFilingTime(filingId: string): { hour: number; minute: number; period: "AM" | "PM" } {
  let hash = 0;
  for (let i = 0; i < filingId.length; i++) {
    hash = (hash * 31 + filingId.charCodeAt(i)) >>> 0;
  }
  // Bias toward afternoon/evening hours (1pm-7pm ET typical filing window).
  const hourBuckets = [13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 19, 20, 9, 11];
  const hour24 = hourBuckets[hash % hourBuckets.length];
  const minute = (hash >>> 8) % 60;
  const hour = hour24 > 12 ? hour24 - 12 : hour24;
  const period = hour24 >= 12 ? "PM" : "AM";
  return { hour, minute, period };
}

export function formatFilingTimestamp(isoDate: string, filingId: string): string {
  const t = plausibleFilingTime(filingId);
  const d = new Date(isoDate + "T00:00:00Z");
  const dateStr = d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const minStr = t.minute.toString().padStart(2, "0");
  return `${dateStr} · ${t.hour}:${minStr} ${t.period} ET`;
}

export function formatRelativeDate(iso: string): string {
  const now = new Date();
  const then = new Date(iso + "T00:00:00Z");
  const days = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days < 1) return "Today";
  if (days < 2) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function formatMarketCap(millions: number): string {
  if (millions >= 1000) {
    return `$${(millions / 1000).toFixed(1)}B`;
  }
  return `$${millions.toLocaleString()}M`;
}
