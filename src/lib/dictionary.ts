import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("@/content/id").then((m) => m.default),
  en: () => import("@/content/en").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
