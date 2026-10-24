import type { Dictionary } from "@/content/types";
import { contact } from "@/lib/site";

export function getContactEntries(dict: Dictionary) {
  const entries: { label: string; href: string; text: string }[] = [];
  if (contact.email) {
    entries.push({
      label: dict.contact.emailLabel,
      href: `mailto:${contact.email}`,
      text: contact.email,
    });
  }
  if (contact.github) {
    entries.push({
      label: dict.contact.githubLabel,
      href: contact.github,
      text: contact.github.replace(/^https?:\/\//, ""),
    });
  }
  if (contact.linkedin) {
    entries.push({
      label: dict.contact.linkedinLabel,
      href: contact.linkedin,
      text: contact.linkedin.replace(/^https?:\/\//, ""),
    });
  }
  return entries;
}

export function ContactLinks({ dict }: { dict: Dictionary }) {
  const entries = getContactEntries(dict);
  if (entries.length === 0) return null;

  return (
    <ul className="mt-8 divide-y divide-line border-y border-line">
      {entries.map((entry) => (
        <li
          key={entry.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <span className="text-sm text-muted">{entry.label}</span>
          <a
            href={entry.href}
            className="text-link break-all text-lg font-medium"
            {...(entry.href.startsWith("http")
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
