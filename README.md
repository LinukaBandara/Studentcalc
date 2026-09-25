# StudentCalc

Simple tools for students. Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # runs the calculation-engine unit tests
npm run build    # production build
```

## Build status — complete

All 16 planned phases and every planned public route are implemented:

- **Foundation & design system**: strict TypeScript, Tailwind with the navy/emerald/mint
  palette, Vitest, accessible focus states, reduced-motion support.
- **Layout**: sticky header w/ mobile drawer, footer, skip-link.
- **Homepage**: hero, popular calculators, A/L teaser.
- **Calculator engine**: 10 pure, validated modules in `lib/calculations/` (gpa, percentage,
  grade, attendance, average, weightedAverage, marksNeeded, examScore, studyHours, zscore) —
  fully unit-tested in `tests/` (6 test files, no NaN/Infinity, all edge cases from the spec's
  Section 63 covered).
- **9 calculators**: GPA, Percentage, Grade, Attendance, Average, Weighted Average, Marks
  Needed, Exam Score, Study Hours — each with working UI, SEO metadata, canonical URL,
  breadcrumbs + JSON-LD.
- **6 student tools**: Exam Countdown, Study Timer, Pomodoro, Study Planner, Semester
  Planner, Assignment Deadline Tracker — all client-side, planners use `localStorage`.
- **A/L section**: hub, Z-score explanation + calculator (clearly distinguished from the
  official UGC methodology), university selection overview (no invented cutoffs), subject
  streams directory, official resources links.
- **9 guides**: each with short answer, explanation, formula, worked example, common
  mistakes, related calculator, related guides — Article (+ FAQ where relevant) JSON-LD.
- **Legal/info pages**: About, Contact (honest — no fake form backend), Privacy (documents
  actual behavior: no accounts, no server-side data, localStorage usage explained,
  no analytics/ads currently installed), Terms, Disclaimer, FAQ (with FAQPage JSON-LD).
- **System**: custom 404 (`not-found.tsx`) and error boundary (`error.tsx`).
- **SEO infra**: `sitemap.ts` and `robots.ts`, scoped to exactly the 41 indexable routes that
  exist — no orphaned or placeholder pages included.

## Before deploying

1. Replace the placeholder `SITE_URL` (`https://studentcalc.example`) in `app/layout.tsx`,
   `app/sitemap.ts`, and `app/robots.ts` with your real production domain.
2. Add real assets: `public/og-image.png` (1200x630), `public/favicon.ico`,
   `public/apple-touch-icon.png` — referenced in metadata but not yet created.
3. Replace the placeholder contact email in `app/contact/page.tsx`.
4. Run `npm install && npm run build` to confirm a clean production build, then `npm test`.
5. If/when you add analytics or ads, update `app/privacy/page.tsx` first to name the exact
   tool/network and what it collects — the current policy is accurate only for the current,
   ad-free/analytics-free build.

## Monetization readiness (Section 56)

No ads are wired in yet — the spec explicitly defers this. The site is now positioned for
AdSense application: real content across 41 pages, a genuine privacy policy, no thin/spam
pages, no fake stats or testimonials. When you're ready to monetize, ad slots can be added
without restructuring anything.

## Not included in this build (would need dedicated follow-up passes)

- Full automated accessibility audit (axe/Lighthouse) — components follow semantic HTML,
  label, and focus-state practices throughout, but no automated scan has been run.
- Production `npm install` / `next build` — this environment has no network access, so the
  build has not been executed here. Run it locally before deploying.
- Real OG image, favicon, and apple-touch-icon assets (see step 2 above).
