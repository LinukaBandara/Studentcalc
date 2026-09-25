import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getContactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact StudentCalc",
  description: "How to get in touch with StudentCalc.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactEmail = getContactEmail();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Contact</h1>

      <div className="text-[15px] text-slate space-y-4 max-w-xl">
        <p>
          Found a calculation bug, a broken link, or have a suggestion for a new tool?
          We welcome feedback.
        </p>

        {contactEmail ? (
          <p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-emerald font-medium hover:underline text-lg"
            >
              {contactEmail}
            </a>
          </p>
        ) : (
          <p className="rounded-card border border-borderc bg-white p-4">
            The production contact email has not been configured yet. Site owners should set
            <code className="mx-1">NEXT_PUBLIC_CONTACT_EMAIL</code> before launch.
          </p>
        )}

        <p className="text-sm">
          Email is currently the reliable way to reach the StudentCalc team.
        </p>
      </div>
    </div>
  );
}
