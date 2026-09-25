"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/calculators", label: "Calculators" },
  { href: "/tools", label: "Tools" },
  { href: "/a-level", label: "A/L" },
  { href: "/guides", label: "Guides" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-borderc">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-navy">
          StudentCalc
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-navy hover:text-emerald transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/calculators"
          className="hidden md:inline-flex items-center rounded-card bg-emerald hover:bg-emerald-dark text-white px-4 py-2 text-[15px] font-medium transition-colors min-h-[44px]"
        >
          Explore Calculators
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-card border border-borderc"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-borderc bg-white px-4 py-3 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] text-navy border-b border-borderc last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculators"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-card bg-emerald text-white px-4 py-3 text-[15px] font-medium min-h-[44px]"
          >
            Explore Calculators
          </Link>
        </nav>
      )}
    </header>
  );
}
