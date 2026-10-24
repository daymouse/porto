export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export const ogLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" };

export const projectSlugs = [
  "pet-care-booking",
  "project-management-system",
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

export const owner = {
  name: "Dzulfikar Lintang Setyaji",
  shortName: "Dzulfikar",
  headline: "Software Developer & System Designer",
} as const;

/**
 * Public contact channels. Leave a value empty until the real URL exists;
 * empty entries are not rendered anywhere on the site.
 */
export const contact: Record<"email" | "github" | "linkedin", string> = {
  email: "",
  github: "",
  linkedin: "",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function hasProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * Resolution order: explicit NEXT_PUBLIC_SITE_URL, then the Vercel production
 * domain, then the Vercel deployment URL, then localhost for development.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${stripTrailingSlash(vercelProduction)}`;

  const vercelDeployment = process.env.VERCEL_URL;
  if (vercelDeployment) return `https://${stripTrailingSlash(vercelDeployment)}`;

  return "http://localhost:3000";
}

/** True when the site URL comes from configuration rather than the localhost fallback. */
export function isSiteUrlConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL,
  );
}

/** Path for a locale, e.g. localePath("en", "/about") -> "/en/about". */
export function localePath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}

/** Every indexable path, without the locale prefix. */
export function allPagePaths(): string[] {
  return ["", "/about", "/projects", ...projectSlugs.map((s) => `/projects/${s}`)];
}
