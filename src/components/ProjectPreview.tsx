import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale, type ProjectSlug } from "@/lib/site";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectPreviewProps {
  lang: Locale;
  slug: ProjectSlug;
  dict: Dictionary;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProjectPreview({
  lang,
  slug,
  dict,
  reverse = false,
  headingLevel = "h3",
}: ProjectPreviewProps) {
  const project = dict.projects[slug];
  const Heading = headingLevel;
  const href = localePath(lang, `/projects/${slug}`);

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
      <div
        className={`md:col-span-7 ${reverse ? "md:order-2 md:col-start-6" : ""}`}
      >
        <ProjectVisual slug={slug} caption={project.visualCaption} />
      </div>
      <div
        className={`md:col-span-5 ${reverse ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}
      >
        <p className="text-sm text-muted">{project.domain}</p>
        <Heading className="heading mt-3 text-3xl sm:text-4xl">
          <Link href={href} className="hover:text-accent">
            {project.name}
          </Link>
        </Heading>
        <p className="measure mt-4 text-muted">{project.summary}</p>
        <p className="mt-3 text-sm">{project.context}</p>
        <Link
          href={href}
          className="text-link mt-6 inline-block font-medium"
          aria-label={`${dict.common.readCaseStudy}: ${project.name}`}
        >
          {dict.common.readCaseStudy}
        </Link>
      </div>
    </article>
  );
}
