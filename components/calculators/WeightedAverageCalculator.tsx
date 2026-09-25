"use client";

import { useState } from "react";
import {
  calculateWeightedAverage,
  isWeightedAverageError,
  weightedAverageErrorMessage,
  WeightedEntry,
} from "@/lib/calculations/weightedAverage";

function newEntry(): WeightedEntry {
  return { id: crypto.randomUUID(), value: 0, weight: 0 };
}

export default function WeightedAverageCalculator() {
  const [entries, setEntries] = useState<WeightedEntry[]>([newEntry(), newEntry()]);
  const [submitted, setSubmitted] = useState(false);

  const update = (id: string, patch: Partial<WeightedEntry>) => {
    setEntries((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSubmitted(false);
  };
  const remove = (id: string) => setEntries((rows) => rows.filter((r) => r.id !== id));
  const add = () => setEntries((rows) => [...rows, newEntry()]);

  const result = submitted ? calculateWeightedAverage(entries) : null;

  return (
    <div className="max-w-lg">
      <div className="space-y-3">
        {entries.map((e, i) => (
          <div
            key={e.id}
            className="grid grid-cols-[1fr_1fr_40px] gap-2 items-center bg-white border border-borderc rounded-card p-3"
          >
            <label className="text-xs text-slate">
              Value
              <input
                type="number"
                value={e.value}
                onChange={(ev) => update(e.id, { value: parseFloat(ev.target.value) })}
                className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
                aria-label={`Value ${i + 1}`}
              />
            </label>
            <label className="text-xs text-slate">
              Weight
              <input
                type="number"
                value={e.weight}
                onChange={(ev) => update(e.id, { weight: parseFloat(ev.target.value) })}
                className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
                aria-label={`Weight ${i + 1}`}
              />
            </label>
            <button
              type="button"
              onClick={() => remove(e.id)}
              disabled={entries.length <= 1}
              className="min-h-[44px] mt-5 text-slate disabled:opacity-30"
              aria-label={`Remove entry ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={add}
          className="min-h-[44px] rounded-card border border-borderc bg-white px-4 text-[15px] font-medium"
        >
          + Add value
        </button>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isWeightedAverageError(result) ? (
            <p className="text-error text-[15px]">{weightedAverageErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Weighted average</p>
              <p className="text-4xl font-bold text-navy">{result.weightedAverage}</p>
              <p className="text-sm text-slate mt-2">Total weight: {result.totalWeight}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
