import { cacheLife } from "next/cache";
import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { localePath, owner, type Locale } from "@/lib/site";
import { getContactEntries } from "./ContactLinks";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const { common } = dict;
  const year = await getCurrentYear();
  const contactEntries = getContactEntries(dict);

  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <div className="page-container flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-ink">{owner.name}</p>
          <p>{owner.headline}</p>
          <p>{dict.footer.note}</p>
          <p>© {year}</p>
        </div>
        <nav aria-label={common.footerNavigation}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:flex-col sm:gap-y-1 sm:text-right">
            <li>
              <Link href={localePath(lang)} className="text-link">
                {common.home}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/about")} className="text-link">
                {common.about}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/projects")} className="text-link">
                {common.projects}
              </Link>
            </li>
            {contactEntries.map((entry) => (
              <li key={entry.label}>
                <a
                  href={entry.href}
                  className="text-link"
                  {...(entry.href.startsWith("http")
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
