import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/lib/dictionary";
import { getSiteUrl, hasLocale, locales, owner } from "@/lib/site";
import "../globals.css";

const hanken = localFont({
  src: "../fonts/HankenGrotesk-Variable.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: dict.htmlTitle,
      template: `%s — ${owner.name}`,
    },
    description: dict.siteDescription,
    applicationName: owner.name,
    authors: [{ name: owner.name }],
    creator: owner.name,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={hanken.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg focus:translate-y-0"
        >
          {dict.common.skipToContent}
        </a>
        <SiteHeader lang={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
