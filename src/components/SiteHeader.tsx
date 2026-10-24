import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { localePath, owner, type Locale } from "@/lib/site";
import { HeaderNav } from "./HeaderNav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { common } = dict;
  const items = [
    { href: localePath(lang), label: common.home },
    { href: localePath(lang, "/about"), label: common.about },
    { href: localePath(lang, "/projects"), label: common.projects },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link
          href={localePath(lang)}
          aria-label={`${owner.name}, ${common.home}`}
          className="text-base font-semibold tracking-tight"
        >
          <span className="sm:hidden" aria-hidden="true">
            {owner.shortName}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            {owner.name}
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <HeaderNav
            lang={lang}
            items={items}
            navLabel={common.mainNavigation}
            menuLabel={common.menu}
            openLabel={common.openMenu}
            closeLabel={common.closeMenu}
          />
          <LanguageSwitcher
            lang={lang}
            label={common.languageSwitchLabel}
            text={common.languageSwitchText}
          />
        </div>
      </div>
    </header>
  );
}
