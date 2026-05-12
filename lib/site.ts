const DEFAULT_LOCAL_URL = "http://localhost:3000";

function normalizeSiteUrl(value?: string) {
  const candidate = value?.trim();

  if (!candidate) {
    return DEFAULT_LOCAL_URL;
  }

  if (/^https?:\/\//i.test(candidate)) {
    return new URL(candidate).origin;
  }

  const protocol =
    candidate.includes("localhost") || candidate.includes(":")
      ? "http"
      : "https";

  return new URL(`${protocol}://${candidate}`).origin;
}

export function getSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL,
  );
}
