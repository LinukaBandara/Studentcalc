import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
      <p className="text-emerald font-semibold">404</p>
      <h1 className="text-3xl font-bold text-navy mt-2 mb-3">Page not found</h1>
      <p className="text-slate mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Back home
        </Link>
        <Link
          href="/calculators"
          className="min-h-[44px] inline-flex items-center rounded-card border border-borderc bg-white px-5 text-[15px] font-medium text-navy"
        >
          Browse calculators
        </Link>
        <Link
          href="/guides"
          className="min-h-[44px] inline-flex items-center rounded-card border border-borderc bg-white px-5 text-[15px] font-medium text-navy"
        >
          Browse guides
        </Link>
      </div>
    </div>
  );
}
