# StudentCalc

StudentCalc is a student utility website built with Next.js, TypeScript, and Tailwind CSS. It provides free calculators, study tools, and a focused Sri Lankan A/L resources section.

## Stack

- Next.js 15.5.26
- React 19.2
- TypeScript
- Tailwind CSS
- Vitest

## Included

- 9 calculators: GPA, percentage, grade, attendance, average, weighted average, marks needed, exam score, and study hours
- 6 student tools: exam countdown, study timer, Pomodoro, study planner, semester planner, and assignment deadline tracker
- Sri Lankan A/L section with Z-score education, university-selection overview, subject directory, and official resource links
- 9 educational guides with related calculators
- About, Contact, Privacy, Terms, Disclaimer, and FAQ pages
- Custom 404 and error handling
- XML sitemap and robots.txt
- Breadcrumb, Website, Organization, Article, and FAQ structured data where appropriate
- Client-side calculation and localStorage-based planning tools with no account requirement
- Unit tests for the calculation engine
- GitHub Actions CI for tests and production builds

## Environment

Copy `.env.example` to `.env.local` for local development:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.com
```

`NEXT_PUBLIC_SITE_URL` is required in production so canonical URLs, Open Graph URLs, JSON-LD, the sitemap, and robots.txt all use the real site.

`NEXT_PUBLIC_CONTACT_EMAIL` should be configured before launch so the Contact page does not expose a placeholder address.

For local development, the site URL automatically falls back to `http://localhost:3000`.

## Setup

```
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

Run the calculation tests:

```
npm test
```

Run the production build with the required environment variables:

```
$env:NEXT_PUBLIC_SITE_URL="https://your-domain.com"
$env:NEXT_PUBLIC_CONTACT_EMAIL="hello@your-domain.com"
npm run build
```

Then:

```
npm start
```

## SEO notes

The site uses canonical URLs, an XML sitemap, robots.txt, crawlable internal links, per-page metadata, and structured data.

The sitemap uses a fixed content timestamp rather than regenerating `lastModified` on every request.

Search-result URLs and other non-content states should not be submitted as indexable pages.

The A/L section clearly distinguishes educational explanations from official admissions calculations and directs users to official sources for time-sensitive information.

## Monetization

No advertising code is included by default.

Before adding analytics or advertising, update the Privacy Policy to accurately describe the exact services and data they introduce.

For AdSense, configure the production domain first, deploy the complete site, verify indexing and core functionality, and then add the relevant ad code after the site is reviewed and approved.

## Current limitations

- The repository does not include a committed package-lock.json yet. Run `npm install` locally and commit the generated lockfile for reproducible installs.
- A full Lighthouse/axe browser audit still needs to be run against the deployed site.
- The real production domain and contact email must be supplied through environment variables before launch.
- The production CI currently uses a placeholder URL only to satisfy the build-time required variable; replace it with the real domain once known.