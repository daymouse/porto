import { NextResponse, type NextRequest } from "next/server";
import {
  allPagePaths,
  defaultLocale,
  hasLocale,
  locales,
  type Locale,
} from "@/lib/site";

const knownPaths = new Set([
  ...allPagePaths(),
  "/opengraph-image",
  "/twitter-image",
]);

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: q ? Number.parseFloat(q.trim().slice(2)) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    const match = locales.find((locale) => locale === base);
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const startsWithLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (startsWithLocale) {
    // Unknown paths under a locale would stream a soft 404 (status 200), so
    // rewrite them to the prerendered localized not-found page instead.
    const [, lang, ...rest] = pathname.split("/");
    const subPath = rest.length > 0 ? `/${rest.join("/")}`.replace(/\/+$/, "") : "";
    if (hasLocale(lang) && !knownPaths.has(subPath) && subPath !== "/not-found") {
      const url = request.nextUrl.clone();
      url.pathname = `/${lang}/not-found`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Skip Next.js internals and any path with a file extension (sitemap.xml, robots.txt, images).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
