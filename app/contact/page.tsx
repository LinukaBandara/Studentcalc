import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact StudentCalc",
  description: "How to get in touch with StudentCalc.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Contact</h1>

      <div className="text-[15px] text-slate space-y-4 max-w-xl">
        <p>
          Found a calculation bug, a broken link, or have a suggestion for a new tool? Email:
        </p>
        <p>
          <a
            href="mailto:hello@studentcalc.example"
            className="text-emerald font-medium hover:underline text-lg"
          >
            hello@studentcalc.example
          </a>
        </p>
        <p className="text-sm">
          There's no live-chat or automated contact form on this site yet — email is the
          reliable way to reach us for now.
        </p>
      </div>
    </div>
  );
}
