import { lang } from "next/root-params";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localePath } from "@/lib/site";

export default async function NotFound() {
  const current = await lang();
  if (!hasLocale(current)) return null;
  const dict = await getDictionary(current);

  return (
    <section className="page-container py-28 sm:py-40">
      <h1 className="display text-5xl sm:text-7xl">{dict.common.notFoundTitle}</h1>
      <p className="measure mt-8 text-xl text-muted">{dict.common.notFoundText}</p>
      <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-lg">
        <Link href={localePath(current)} className="text-link">
          {dict.common.home}
        </Link>
        <Link href={localePath(current, "/projects")} className="text-link">
          {dict.common.projects}
        </Link>
      </p>
    </section>
  );
}
