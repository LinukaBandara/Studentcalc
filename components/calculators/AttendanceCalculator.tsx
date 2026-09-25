"use client";

import { useState } from "react";
import {
  calculateAttendance,
  isAttendanceError,
  attendanceErrorMessage,
} from "@/lib/calculations/attendance";

export default function AttendanceCalculator() {
  const [total, setTotal] = useState("");
  const [attended, setAttended] = useState("");
  const [target, setTarget] = useState("80");
  const [submitted, setSubmitted] = useState(false);

  const result =
    submitted && total !== "" && attended !== ""
      ? calculateAttendance({
          totalClasses: parseFloat(total),
          attendedClasses: parseFloat(attended),
          targetPercent: parseFloat(target || "80"),
        })
      : null;

  return (
    <div className="max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm text-slate">
          Total classes
          <input
            type="number"
            min={0}
            value={total}
            onChange={(e) => {
              setTotal(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
        <label className="text-sm text-slate">
          Classes attended
          <input
            type="number"
            min={0}
            value={attended}
            onChange={(e) => {
              setAttended(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
      </div>

      <label className="block text-sm text-slate mt-3">
        Target attendance %
        <input
          type="number"
          min={1}
          max={100}
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>

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
            setTotal("");
            setAttended("");
            setTarget("80");
            setSubmitted(false);
          }}
          className="min-h-[44px] rounded-card px-4 text-[15px] font-medium text-slate"
        >
          Reset
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isAttendanceError(result) ? (
            <p className="text-error text-[15px]">{attendanceErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Attendance</p>
              <p className="text-4xl font-bold text-navy">{result.attendancePercent}%</p>
              <p className="text-sm text-slate mt-2">
                {result.missedClasses} classes missed so far
              </p>
              {result.classesCanMiss !== undefined && (
                <p className="text-sm text-navy mt-3">
                  You can miss up to <strong>{result.classesCanMiss}</strong> more class
                  {result.classesCanMiss === 1 ? "" : "es"} and stay at/above {target}%.
                </p>
              )}
              {result.classesNeededToReachTarget !== undefined && (
                <p className="text-sm text-navy mt-3">
                  Attend the next <strong>{result.classesNeededToReachTarget}</strong> class
                  {result.classesNeededToReachTarget === 1 ? "" : "es"} in a row to reach{" "}
                  {target}%.
                </p>
              )}
              {result.targetUnreachable && (
                <p className="text-sm text-error mt-3">
                  A 100% target can't be reached once any class has been missed.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
