"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/utils/storage";

interface Assignment {
  id: string;
  name: string;
  dueDate: string;
  notes: string;
}

function newAssignment(): Assignment {
  return { id: crypto.randomUUID(), name: "", dueDate: "", notes: "" };
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

export default function AssignmentDeadlineTracker() {
  const [items, setItems] = useState<Assignment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage(STORAGE_KEYS.assignmentDeadlines, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEYS.assignmentDeadlines, items);
  }, [items, loaded]);

  const sorted = [...items].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => setItems((rows) => [newAssignment(), ...rows])}
        className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
      >
        + Add assignment
      </button>

      <div className="mt-4 space-y-3">
        {sorted.map((item) => {
          const d = daysUntil(item.dueDate);
          const overdue = d !== null && d < 0;
          return (
            <div key={item.id} className="rounded-card border border-borderc bg-white p-4">
              <div className="grid sm:grid-cols-[1fr_150px_40px] gap-2">
                <input
                  type="text"
                  placeholder="Assignment name"
                  value={item.name}
                  onChange={(e) =>
                    setItems((rows) =>
                      rows.map((r) => (r.id === item.id ? { ...r, name: e.target.value } : r))
                    )
                  }
                  className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
                />
                <input
                  type="date"
                  value={item.dueDate}
                  onChange={(e) =>
                    setItems((rows) =>
                      rows.map((r) => (r.id === item.id ? { ...r, dueDate: e.target.value } : r))
                    )
                  }
                  className="min-h-[44px] rounded-card border border-borderc px-2 text-[15px]"
                />
                <button
                  type="button"
                  onClick={() => setItems((rows) => rows.filter((r) => r.id !== item.id))}
                  className="min-h-[44px] text-slate"
                  aria-label={`Remove ${item.name || "assignment"}`}
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Notes (optional)"
                value={item.notes}
                onChange={(e) =>
                  setItems((rows) =>
                    rows.map((r) => (r.id === item.id ? { ...r, notes: e.target.value } : r))
                  )
                }
                className="mt-2 w-full min-h-[40px] rounded-card border border-borderc px-3 text-sm text-slate"
              />
              {d !== null && (
                <p className={`mt-2 text-sm font-medium ${overdue ? "text-error" : "text-emerald"}`}>
                  {overdue ? `Overdue by ${Math.abs(d)} day${Math.abs(d) === 1 ? "" : "s"}` : `${d} day${d === 1 ? "" : "s"} left`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate mt-4">
        Saved locally in this browser only.
      </p>
    </div>
  );
}
