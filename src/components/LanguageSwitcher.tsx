"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/site";

interface LanguageSwitcherProps {
  lang: Locale;
  label: string;
  text: string;
}

export function LanguageSwitcher({ lang, label, text }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target = locales.find((locale) => locale !== lang) ?? lang;
  const segments = pathname.split("/");
  segments[1] = target;
  const href = segments.join("/") || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 text-sm font-medium tracking-wide text-ink transition-colors hover:border-ink"
    >
      {text}
    </Link>
  );
}
