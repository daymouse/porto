import { notFound } from "next/navigation";
import { locales } from "@/lib/site";

// Unknown paths under a locale render the localized 404 page.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang, rest: ["not-found"] }));
}

export default function CatchAll() {
  notFound();
}
