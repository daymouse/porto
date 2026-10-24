import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProjectPreview } from "@/components/ProjectPreview";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import {
  absoluteUrl,
  hasLocale,
  localePath,
  projectSlugs,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/projects",
    title: dict.projectsIndex.metaTitle,
    socialTitle: dict.projectsIndex.metaTitle,
    description: dict.projectsIndex.metaDescription,
  });
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { projectsIndex } = dict;

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(localePath(lang, "/projects")),
    name: projectsIndex.metaTitle,
    description: projectsIndex.metaDescription,
    inLanguage: lang,
    hasPart: projectSlugs.map((slug) => ({
      "@type": "WebPage",
      name: dict.projects[slug].name,
      url: absoluteUrl(localePath(lang, `/projects/${slug}`)),
    })),
  };

  return (
    <>
      <JsonLd data={listJsonLd} />
      <div className="page-container pt-16 sm:pt-24">
        <h1 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
          {projectsIndex.title}
        </h1>
        <p className="measure mt-8 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
          {projectsIndex.lead}
        </p>
      </div>
      <div className="page-container space-y-20 py-16 sm:space-y-28 sm:py-24">
        {projectSlugs.map((slug, index) => (
          <ProjectPreview
            key={slug}
            lang={lang}
            slug={slug}
            dict={dict}
            reverse={index % 2 === 1}
            headingLevel="h2"
          />
        ))}
      </div>
    </>
  );
}
