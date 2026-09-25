export const SITE_NAME = "StudentCalc";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

  if (configured) return configured;

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required in production. Set it in your deployment environment."
  );
}

export function getContactEmail(): string | null {
  const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return configured || null;
}
