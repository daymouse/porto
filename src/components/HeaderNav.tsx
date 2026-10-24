"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderNavProps {
  lang: Locale;
  items: NavItem[];
  navLabel: string;
  menuLabel: string;
  openLabel: string;
  closeLabel: string;
}

function isActive(pathname: string, href: string, lang: Locale) {
  if (href === `/${lang}`) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({
  lang,
  items,
  navLabel,
  menuLabel,
  openLabel,
  closeLabel,
}: HeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav aria-label={navLabel} className="flex items-center">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 items-center px-1 text-[0.9375rem] text-ink md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {menuLabel}
      </button>

      <ul
        id={panelId}
        className={`${
          open ? "block" : "hidden"
        } absolute inset-x-0 top-full border-b border-line bg-bg px-5 py-2 sm:px-8 md:static md:flex md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
      >
        {items.map((item) => {
          const active = isActive(pathname, item.href, lang);
          return (
            <li
              key={item.href}
              className="border-t border-line first:border-t-0 md:border-0"
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-12 items-center text-xl font-semibold tracking-tight transition-colors md:min-h-0 md:py-2 md:text-[0.9375rem] md:font-normal md:tracking-normal md:hover:text-ink ${
                  active ? "text-accent md:text-ink" : "text-ink md:text-muted"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 hidden h-px bg-accent md:block"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
