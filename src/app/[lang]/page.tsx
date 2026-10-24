import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { ProjectPreview } from "@/components/ProjectPreview";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import {
  absoluteUrl,
  hasLocale,
  localePath,
  owner,
  projectSlugs,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "",
    title: { absolute: dict.home.metaTitle },
    socialTitle: dict.home.metaTitle,
    description: dict.siteDescription,
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero, home } = dict;

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl(`${localePath(lang)}#website`),
        url: absoluteUrl(localePath(lang)),
        name: owner.name,
        description: dict.siteDescription,
        inLanguage: lang,
      },
      {
        "@type": "Person",
        "@id": absoluteUrl(`${localePath(lang)}#person`),
        name: owner.name,
        url: absoluteUrl(localePath(lang)),
        description: dict.siteDescription,
        knowsAbout: dict.techGroups.flatMap((g) => g.items.split(", ")),
      },
    ],
  };

  return (
    <>
      <JsonLd data={siteJsonLd} />

      <section aria-labelledby="hero-heading" className="page-container pb-20 pt-16 sm:pb-28 sm:pt-24 md:pb-36 md:pt-32">
        <p className="hero-rise flex flex-wrap items-baseline gap-x-4 gap-y-1 text-base">
          <span className="font-semibold">{owner.name}</span>
          <span className="text-muted">{owner.headline}</span>
        </p>
        <h1
          id="hero-heading"
          className="display hero-rise hero-rise-2 mt-8 text-[clamp(2.5rem,9.2vw,8.25rem)] sm:mt-10"
        >
          <span className="block">{hero.title[0]}</span>
          <span className="block text-muted">{hero.title[1]}</span>
        </h1>
        <p className="hero-rise hero-rise-3 measure mt-10 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
          {hero.intro}
        </p>
        <div className="hero-rise hero-rise-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={localePath(lang, "/projects")}
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-base font-medium text-bg transition-opacity hover:opacity-85"
          >
            {hero.ctaProjects}
          </Link>
          <Link
            href={localePath(lang, "/about")}
            className="text-link text-base font-medium"
          >
            {hero.ctaAbout}
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="selected-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <div className="page-container">
          <div className="grid gap-4 md:grid-cols-12 md:gap-10">
            <h2
              id="selected-heading"
              className="heading text-4xl sm:text-5xl md:col-span-6"
            >
              {home.selectedHeading}
            </h2>
            <p className="measure text-lg text-muted md:col-span-5 md:col-start-8 md:self-end">
              {home.selectedIntro}
            </p>
          </div>
          <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
            {projectSlugs.map((slug, index) => (
              <ProjectPreview
                key={slug}
                lang={lang}
                slug={slug}
                dict={dict}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="approach-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <div className="page-container grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h2
              id="approach-heading"
              className="heading text-4xl sm:text-5xl"
            >
              {home.approachHeading}
            </h2>
            <p className="measure mt-6 text-lg text-muted">{home.approachLead}</p>
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {dict.principles.slice(0, 4).map((principle) => (
              <div
                key={principle.title}
                className="border-t border-line py-6 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-6"
              >
                <dt className="text-xl font-semibold tracking-tight">
                  {principle.title}
                </dt>
                <dd className="measure mt-2 text-muted">{principle.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="interests-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <div className="page-container">
          <h2 id="interests-heading" className="heading text-4xl sm:text-5xl">
            {home.interestsHeading}
          </h2>
          <p className="measure mt-5 text-lg text-muted">{home.interestsLead}</p>
          <dl className="mt-12 sm:mt-16">
            {dict.techGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-2 border-t border-line py-7 sm:grid-cols-12 sm:gap-10 sm:py-9"
              >
                <dt className="text-base text-muted sm:col-span-3">
                  {group.label}
                </dt>
                <dd className="text-2xl font-semibold leading-snug tracking-tight sm:col-span-9 sm:text-3xl">
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="education-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <div className="page-container grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 id="education-heading" className="heading text-4xl sm:text-5xl">
              {home.educationHeading}
            </h2>
            <p className="measure mt-6 text-xl leading-relaxed">
              {home.educationBody}
            </p>
          </div>
          <dl className="md:col-span-4 md:col-start-9">
            {home.educationFacts.map((fact) => (
              <div key={fact.label} className="border-t border-line py-4">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection dict={dict} />
    </>
  );
}
