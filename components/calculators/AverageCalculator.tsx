"use client";

import { useState } from "react";
import { calculateAverage, isAverageError, averageErrorMessage } from "@/lib/calculations/average";

interface Row {
  id: string;
  value: string;
}

export default function AverageCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: crypto.randomUUID(), value: "" },
    { id: crypto.randomUUID(), value: "" },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const update = (id: string, value: string) => {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, value } : row)));
    setSubmitted(false);
  };
  const remove = (id: string) => setRows((r) => r.filter((row) => row.id !== id));
  const add = () => setRows((r) => [...r, { id: crypto.randomUUID(), value: "" }]);

  const isValidNumber = (v: number) => !Number.isNaN(v);
  const numericValues = rows.map((r) => parseFloat(r.value)).filter(isValidNumber);

  const result = submitted ? calculateAverage(numericValues) : null;

  return (
    <div className="max-w-md">
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={row.id} className="flex gap-2">
            <input
              type="number"
              placeholder={`Value ${i + 1}`}
              value={row.value}
              onChange={(e) => update(row.id, e.target.value)}
              className="flex-1 min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Value ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => remove(row.id)}
              disabled={rows.length <= 1}
              className="min-h-[44px] w-11 text-slate disabled:opacity-30"
              aria-label={`Remove value ${i + 1}`}
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
          {isAverageError(result) ? (
            <p className="text-error text-[15px]">{averageErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Average</p>
              <p className="text-4xl font-bold text-navy">{result.average}</p>
              <p className="text-sm text-slate mt-2">
                Sum: {result.sum} · Count: {result.count}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
