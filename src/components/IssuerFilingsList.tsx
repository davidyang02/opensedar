"use client";

import { useState, useMemo } from "react";
import { Filing, FilingType, FILING_TYPE_LABELS } from "@/lib/types";
import { FilingRow } from "./FilingRow";

const ALL_TYPES: FilingType[] = [
  "financial-statements",
  "mda",
  "aif",
  "proxy",
  "prospectus",
  "material-change",
  "news-release",
  "insider",
];

interface IssuerFilingsListProps {
  filings: Filing[];
}

export function IssuerFilingsList({ filings }: IssuerFilingsListProps) {
  const [filter, setFilter] = useState<FilingType | "all">("all");

  const presentTypes = useMemo(() => {
    const seen = new Set<FilingType>();
    filings.forEach((f) => seen.add(f.type));
    return ALL_TYPES.filter((t) => seen.has(t));
  }, [filings]);

  const filtered = filter === "all" ? filings : filings.filter((f) => f.type === filter);
  const counts: Partial<Record<FilingType | "all", number>> = { all: filings.length };
  filings.forEach((f) => {
    counts[f.type] = (counts[f.type] ?? 0) + 1;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All"
          count={counts.all ?? 0}
        />
        {presentTypes.map((t) => (
          <FilterChip
            key={t}
            active={filter === t}
            onClick={() => setFilter(t)}
            label={FILING_TYPE_LABELS[t]}
            count={counts[t] ?? 0}
          />
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            No filings of this type
          </div>
        ) : (
          filtered.map((f) => <FilingRow key={f.id} filing={f} showIssuer={false} />)
        )}
      </div>
    </div>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}

function FilterChip({ active, onClick, label, count }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
        active
          ? "bg-terminal-navy text-white border-terminal-navy"
          : "bg-white text-slate-700 border-slate-300 hover:border-terminal-blue hover:text-terminal-blue"
      }`}
    >
      {label} <span className={active ? "text-white/80" : "text-slate-400"}>{count}</span>
    </button>
  );
}
