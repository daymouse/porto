import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, hasLocale, localePath, owner } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/about",
    title: dict.about.metaTitle,
    socialTitle: dict.about.metaTitle,
    description: dict.about.metaDescription,
  });
}

function Row({
  heading,
  children,
  id,
}: {
  heading: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-5 border-t border-line py-12 sm:py-16 md:grid-cols-12 md:gap-10"
    >
      <h2
        id={id}
        className="heading text-2xl sm:text-3xl md:sticky md:top-24 md:col-span-4 md:self-start"
      >
        {heading}
      </h2>
      <div className="md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { about } = dict;

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absoluteUrl(localePath(lang, "/about")),
    name: about.metaTitle,
    description: about.metaDescription,
    inLanguage: lang,
    about: {
      "@type": "Person",
      name: owner.name,
      url: absoluteUrl(localePath(lang)),
    },
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <div className="page-container pb-8 pt-16 sm:pt-24">
        <h1 className="display text-[clamp(2.5rem,7vw,5.5rem)]">{about.title}</h1>
        <p className="measure mt-8 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
          {about.lead}
        </p>
      </div>

      <div className="page-container mt-12 sm:mt-20">
        {about.sections.map((section, index) => (
          <Row key={section.heading} heading={section.heading} id={`about-${index}`}>
            <div className="measure space-y-5 text-lg">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Row>
        ))}

        <Row heading={about.principlesHeading} id="about-principles">
          <dl>
            {dict.principles.map((principle) => (
              <div
                key={principle.title}
                className="border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <dt className="text-lg font-semibold tracking-tight">
                  {principle.title}
                </dt>
                <dd className="measure mt-1 text-muted">{principle.text}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row heading={about.technologyHeading} id="about-technology">
          <p className="measure text-muted">{about.technologyNote}</p>
          <dl className="mt-6">
            {dict.techGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-1 border-t border-line py-4 sm:grid-cols-4 sm:gap-6"
              >
                <dt className="text-muted">{group.label}</dt>
                <dd className="font-medium sm:col-span-3">{group.items}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row heading={about.otherWorkHeading} id="about-other">
          <p className="measure text-lg">{about.otherWorkBody}</p>
        </Row>
      </div>

      <div className="mt-8">
        <ContactSection dict={dict} />
      </div>
    </>
  );
}
