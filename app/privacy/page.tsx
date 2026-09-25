import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "StudentCalc's privacy policy — what data is collected, what stays in your browser, and how local storage is used.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <h1 className="text-3xl font-bold text-navy mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate mb-8">Last updated: this page reflects the site's current implementation.</p>

      <div className="text-[15px] text-slate space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">No accounts, no sign-up</h2>
          <p>
            StudentCalc doesn't require or offer user accounts. There's nothing to register for,
            and no personal profile is created or stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Calculator inputs</h2>
          <p>
            Numbers you type into a calculator (grades, marks, dates, etc.) are processed
            entirely in your browser using JavaScript. They are not sent to, or stored on, any
            StudentCalc server.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Local storage (planning tools)</h2>
          <p>
            The Study Planner, Semester Planner, and Assignment Deadline Tracker save what you
            enter using your browser's <code>localStorage</code>. This data stays on your device
            — it isn't transmitted to us, isn't synced across devices, and is cleared if you
            clear your browser's site data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Analytics</h2>
          <p>
            As currently built, this site does not have any analytics tooling installed. If that
            changes in the future, this policy will be updated to name the specific tool and
            what it collects.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Cookies & advertising</h2>
          <p>
            This site does not currently serve ads or set advertising cookies. If display
            advertising is added later, this policy will be updated first, naming the ad network
            used and the cookies it sets.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Contact submissions</h2>
          <p>
            If you email us via the address on the{" "}
            <a href="/contact" className="text-emerald hover:underline">
              Contact page
            </a>
            , that email is handled like any normal email — it isn't added to a mailing list or
            shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Changes to this policy</h2>
          <p>
            If StudentCalc's data practices change — for example, adding analytics or
            advertising — this page will be updated to reflect exactly what's added.
          </p>
        </section>
      </div>
    </div>
  );
}
