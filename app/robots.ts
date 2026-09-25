import type { MetadataRoute } from "next";

const SITE_URL = "https://studentcalc.example"; // TODO: replace with real production domain

// Known AI/LLM crawlers as of this writing. Listed explicitly (rather than
// relying on the wildcard rule alone) so it's a deliberate, visible choice
// that StudentCalc wants to be discoverable by AI answer engines — not an
// accident of omission. Revisit this list periodically as new crawlers
// appear; unlisted bots still fall under the "*" allow-all rule below.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI
  "ChatGPT-User", // OpenAI (user-triggered browsing)
  "OAI-SearchBot", // OpenAI search
  "ClaudeBot", // Anthropic
  "Claude-Web", // Anthropic
  "anthropic-ai", // Anthropic
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google's AI training signal (Gemini/AI Overviews)
  "Bytespider", // ByteDance
  "CCBot", // Common Crawl (feeds many AI training sets)
  "Applebot-Extended", // Apple Intelligence
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((agent) => ({ userAgent: agent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
