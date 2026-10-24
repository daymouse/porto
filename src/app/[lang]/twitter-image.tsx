import { notFound } from "next/navigation";
import { ogSize, renderOgImage } from "@/lib/og";
import { hasLocale, locales, owner } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${owner.name} — ${owner.headline}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return renderOgImage(lang);
}
