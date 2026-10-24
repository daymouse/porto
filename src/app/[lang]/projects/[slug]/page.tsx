import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import {
  absoluteUrl,
  hasLocale,
  hasProjectSlug,
  localePath,
  locales,
  projectSlugs,
} from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !hasProjectSlug(slug)) return {};
  const dict = await getDictionary(lang);
  const project = dict.projects[slug];
  return pageMetadata({
    lang,
    path: `/projects/${slug}`,
    title: project.metaTitle,
    socialTitle: project.metaTitle,
    description: project.metaDescription,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !hasProjectSlug(slug)) notFound();
  const dict = await getDictionary(lang);
  const project = dict.projects[slug];
  const { common } = dict;

  const nextSlug =
    projectSlugs[(projectSlugs.indexOf(slug) + 1) % projectSlugs.length];
  const nextProject = dict.projects[nextSlug];

  const crumbs = [
    { label: common.home, href: localePath(lang) },
    { label: common.projects, href: localePath(lang, "/projects") },
    { label: project.name },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(
        crumb.href ?? localePath(lang, `/projects/${slug}`),
      ),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <article>
        <header className="page-container pt-10 sm:pt-14">
          <Breadcrumbs items={crumbs} label={common.breadcrumbs} />
          <h1 className="display mt-10 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] sm:mt-14">
            {project.name}
          </h1>
          <p className="measure mt-8 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
            {project.lead}
          </p>
        </header>

        <div className="page-container mt-12 sm:mt-16">
          <ProjectVisual slug={slug} caption={project.visualCaption} />
          <dl className="mt-10 grid border-t border-line sm:grid-cols-3 sm:gap-8">
            {project.facts.map((fact) => (
              <div key={fact.label} className="border-b border-line py-4 sm:border-b-0">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="page-container mt-8 sm:mt-12">
          {project.sections.map((section, index) => (
            <section
              key={section.heading}
              aria-labelledby={`section-${index}`}
              className="grid gap-5 border-t border-line py-12 sm:py-16 md:grid-cols-12 md:gap-10"
            >
              <h2
                id={`section-${index}`}
                className="heading text-2xl sm:text-3xl md:col-span-4"
              >
                {section.heading}
              </h2>
              <div className="measure space-y-5 text-lg md:col-span-7 md:col-start-6">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="measure border-t border-line py-10 text-muted md:ml-[41.666%]">
            {project.pendingNote}
          </p>
        </div>

        <nav
          aria-label={common.nextProject}
          className="border-t border-line py-14 sm:py-20"
        >
          <div className="page-container flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted">{common.nextProject}</p>
              <Link
                href={localePath(lang, `/projects/${nextSlug}`)}
                className="heading mt-2 inline-block text-3xl hover:text-accent sm:text-4xl"
              >
                {nextProject.name}
              </Link>
            </div>
            <Link
              href={localePath(lang, "/projects")}
              className="text-link font-medium"
            >
              {common.backToProjects}
            </Link>
          </div>
        </nav>
      </article>
    </>
  );
}
