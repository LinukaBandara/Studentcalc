export const SITE_NAME = "StudentCalc";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

  if (configured) return configured;

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) {
    return vercelProductionUrl.startsWith("http")
      ? vercelProductionUrl.replace(/\/+$/, "")
      : `https://${vercelProductionUrl.replace(/\/+$/, "")}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error(
    "NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL is required in production."
  );
}

export function getContactEmail(): string | null {
  const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return configured || null;
}
