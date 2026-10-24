import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  allPagePaths,
  defaultLocale,
  localePath,
  locales,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPagePaths().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/projects" ? 0.8 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, absoluteUrl(localePath(l, path))]),
          ),
          "x-default": absoluteUrl(localePath(defaultLocale, path)),
        },
      },
    })),
  );
}
