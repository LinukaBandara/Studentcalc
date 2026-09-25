"use client";

import { useState } from "react";
import {
  percentOf,
  whatPercent,
  percentChange,
  percentDifference,
  isPercentageError,
  percentageErrorMessage,
  PercentageMode,
} from "@/lib/calculations/percentage";

const MODES: { id: PercentageMode; label: string; a: string; b: string }[] = [
  { id: "of", label: "What is X% of Y?", a: "X (%)", b: "Y" },
  { id: "isWhatPercent", label: "What % is X of Y?", a: "X", b: "Y" },
  { id: "change", label: "Increase / decrease", a: "From", b: "To" },
  { id: "difference", label: "Percentage difference", a: "Value A", b: "Value B" },
];

export default function PercentageCalculator() {
  const [mode, setMode] = useState<PercentageMode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const active = MODES.find((m) => m.id === mode)!;

  const compute = () => {
    switch (mode) {
      case "of":
        return percentOf(numA, numB);
      case "isWhatPercent":
        return whatPercent(numA, numB);
      case "change":
        return percentChange(numA, numB);
      case "difference":
        return percentDifference(numA, numB);
    }
  };

  const result = submitted && a !== "" && b !== "" ? compute() : null;

  return (
    <div className="max-w-xl">
      <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Calculation mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setSubmitted(false);
            }}
            className={`min-h-[44px] rounded-card px-4 text-sm font-medium border ${
              mode === m.id
                ? "bg-emerald text-white border-emerald"
                : "bg-white text-navy border-borderc"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm text-slate">
          {active.a}
          <input
            type="number"
            value={a}
            onChange={(e) => {
              setA(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
        <label className="text-sm text-slate">
          {active.b}
          <input
            type="number"
            value={b}
            onChange={(e) => {
              setB(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={() => {
            setA("");
            setB("");
            setSubmitted(false);
          }}
          className="min-h-[44px] rounded-card px-4 text-[15px] font-medium text-slate"
        >
          Reset
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isPercentageError(result) ? (
            <p className="text-error text-[15px]">{percentageErrorMessage(result)}</p>
          ) : result.mode === "change" ? (
            <>
              <p className="text-sm text-slate capitalize">{result.direction}</p>
              <p className="text-4xl font-bold text-navy">{result.result}%</p>
            </>
          ) : (
            <p className="text-4xl font-bold text-navy">{result.result}%</p>
          )}
        </div>
      )}
    </div>
  );
}
