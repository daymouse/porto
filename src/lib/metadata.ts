import type { Metadata } from "next";
import { ogSize } from "@/lib/og";
import {
  defaultLocale,
  localePath,
  locales,
  ogLocale,
  owner,
  type Locale,
} from "@/lib/site";

interface PageMetadataInput {
  lang: Locale;
  /** Path without locale prefix: "", "/about", "/projects/slug". */
  path: string;
  title: Metadata["title"];
  /** Plain-text title used for social cards. */
  socialTitle: string;
  description: string;
}

export function pageMetadata({
  lang,
  path,
  title,
  socialTitle,
  description,
}: PageMetadataInput): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [locale, localePath(locale, path)]),
  );
  languages["x-default"] = localePath(defaultLocale, path);

  const image = {
    url: localePath(lang, "/opengraph-image"),
    width: ogSize.width,
    height: ogSize.height,
    alt: `${owner.name} — ${owner.headline}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: owner.name,
      title: socialTitle,
      description,
      url: localePath(lang, path),
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
    robots: { index: true, follow: true },
  };
}
