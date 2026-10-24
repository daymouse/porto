import type { ProjectSlug } from "@/lib/site";

export interface Principle {
  title: string;
  text: string;
}

export interface TechGroup {
  label: string;
  items: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface ProjectContent {
  name: string;
  domain: string;
  /** One-sentence description used on cards and in metadata. */
  summary: string;
  /** Known context line shown under the summary. */
  context: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** Verified facts only, shown as a definition list. */
  facts: { label: string; value: string }[];
  sections: CaseStudySection[];
  /** Neutral line shown when documentation is still being prepared. */
  pendingNote: string;
  visualCaption: string;
}

export interface Dictionary {
  htmlTitle: string;
  siteDescription: string;
  common: {
    skipToContent: string;
    home: string;
    about: string;
    projects: string;
    mainNavigation: string;
    footerNavigation: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    languageSwitchLabel: string;
    languageSwitchText: string;
    breadcrumbs: string;
    readCaseStudy: string;
    nextProject: string;
    backToProjects: string;
    notFoundTitle: string;
    notFoundText: string;
  };
  hero: {
    title: [string, string];
    intro: string;
    ctaProjects: string;
    ctaAbout: string;
  };
  home: {
    metaTitle: string;
    selectedHeading: string;
    selectedIntro: string;
    approachHeading: string;
    approachLead: string;
    interestsHeading: string;
    interestsLead: string;
    educationHeading: string;
    educationBody: string;
    educationFacts: { label: string; value: string }[];
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    sections: CaseStudySection[];
    principlesHeading: string;
    technologyHeading: string;
    technologyNote: string;
    otherWorkHeading: string;
    otherWorkBody: string;
  };
  projectsIndex: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
  };
  contact: {
    heading: string;
    body: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
  };
  footer: {
    note: string;
  };
  principles: Principle[];
  techGroups: TechGroup[];
  projects: Record<ProjectSlug, ProjectContent>;
}
