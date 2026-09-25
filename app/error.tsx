"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
      <p className="text-error font-semibold">Something went wrong</p>
      <h1 className="text-3xl font-bold text-navy mt-2 mb-3">
        This page hit an unexpected error
      </h1>
      <p className="text-slate mb-8">
        Try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-[44px] inline-flex items-center rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Try again
        </button>
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center rounded-card border border-borderc bg-white px-5 text-[15px] font-medium text-navy"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
