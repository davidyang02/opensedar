import { FilingType, FILING_TYPE_SHORT } from "@/lib/types";

const STYLES: Record<FilingType, string> = {
  "financial-statements": "bg-blue-50 text-blue-700 border-blue-200",
  mda: "bg-indigo-50 text-indigo-700 border-indigo-200",
  aif: "bg-purple-50 text-purple-700 border-purple-200",
  proxy: "bg-teal-50 text-teal-700 border-teal-200",
  prospectus: "bg-orange-50 text-orange-700 border-orange-200",
  "material-change": "bg-amber-50 text-amber-800 border-amber-200",
  insider: "bg-rose-50 text-rose-700 border-rose-200",
  "news-release": "bg-slate-50 text-slate-700 border-slate-200",
  "early-warning": "bg-yellow-50 text-yellow-800 border-yellow-200",
  "etf-mfr": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export function FilingTypeBadge({ type }: { type: FilingType }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide border rounded ${STYLES[type]}`}
    >
      {FILING_TYPE_SHORT[type]}
    </span>
  );
}
