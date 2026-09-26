import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StudentCalc — Free Calculators & Study Tools for Students",
    template: "%s | StudentCalc",
  },
  description:
    "Simple, accurate calculators and study tools for students — GPA, percentage, attendance, exam prep, and Sri Lankan A/L resources.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "StudentCalc — Free Calculators & Study Tools for Students",
    description:
      "Simple, accurate calculators and study tools for students — GPA, percentage, attendance, exam prep, and Sri Lankan A/L resources.",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "StudentCalc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudentCalc — Free Calculators & Study Tools for Students",
    description: "Simple tools for students.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "YOWIg2Fb_tETv8Zipja1KvuZFQ8dpLb5_PmvJL4mYj4",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Free calculators and study tools for students — GPA, percentage, attendance, exam prep, and Sri Lankan A/L resources.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/calculators?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "An independent student utility site providing free calculators and study tools. Not affiliated with any government, examination, or university body.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-offwhite text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white px-4 py-2 rounded-card border border-borderc"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
