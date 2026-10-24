import type { Dictionary } from "./types";

const en: Dictionary = {
  htmlTitle: "Dzulfikar Lintang Setyaji — Software Developer & System Designer",
  siteDescription:
    "Portfolio of Dzulfikar Lintang Setyaji, an Information Technology student at Universitas Negeri Yogyakarta interested in software development, backend systems, and information systems design.",
  common: {
    skipToContent: "Skip to main content",
    home: "Home",
    about: "About",
    projects: "Projects",
    footerNavigation: "Footer navigation",
    mainNavigation: "Main navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    menu: "Menu",
    languageSwitchLabel: "Switch language to Bahasa Indonesia",
    languageSwitchText: "ID",
    breadcrumbs: "Breadcrumbs",
    readCaseStudy: "Read the case study",
    nextProject: "Next project",
    backToProjects: "All projects",
    notFoundTitle: "Page not found",
    notFoundText:
      "The address you opened doesn't exist or has moved. Start again from the home page or the project list.",
  },
  hero: {
    title: ["Designing systems.", "Building solutions."],
    intro:
      "I'm Dzulfikar, an Information Technology student at Universitas Negeri Yogyakarta interested in software development, backend systems, and information systems design.",
    ctaProjects: "View projects",
    ctaAbout: "About me",
  },
  home: {
    metaTitle: "Dzulfikar Lintang Setyaji — Software Developer & System Designer",
    selectedHeading: "Selected projects",
    selectedIntro:
      "Two projects that best represent my interest in useful applications and well-organised systems.",
    approachHeading: "How I think about software",
    approachLead:
      "A good application starts with understanding the problem, then a clear data structure, and only then the interface. That is the order I try to hold myself to.",
    interestsHeading: "Technical interests",
    interestsLead:
      "Technologies I have used or studied, grouped by the role they play in an application.",
    educationHeading: "Education and current direction",
    educationBody:
      "I'm studying Information Technology and looking for the chance to gain my first professional experience, especially in software development and backend systems.",
    educationFacts: [
      { label: "University", value: "Universitas Negeri Yogyakarta" },
      { label: "Program", value: "Information Technology" },
      { label: "Status", value: "Student, open to professional experience" },
    ],
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "Information Technology student at Universitas Negeri Yogyakarta interested in backend development, database design, REST APIs, and application architecture.",
    title: "About me",
    lead: "I'm an Information Technology student at Universitas Negeri Yogyakarta. I enjoy turning loosely defined needs into systems that are tidy and maintainable.",
    sections: [
      {
        heading: "Background",
        body: [
          "I study Information Technology at Universitas Negeri Yogyakarta. That is where my interest grew toward software development and information systems design.",
          "I'm now looking for the chance to gain my first professional experience: a place to learn from real practice while contributing to products people use.",
        ],
      },
      {
        heading: "What interests me",
        body: [
          "I'm most drawn to the backend: how data is modelled, how REST APIs connect one part of a system to another, and how application architecture stays understandable as features grow.",
          "I also enjoy full-stack development, because a system only feels whole when its data side and its user side are designed together.",
        ],
      },
      {
        heading: "How I learn and build",
        body: [
          "I learn by building something real and then tidying it up. Each project is a chance to revisit design decisions: does the data structure make sense, can someone else read the code, and does the solution actually answer the problem?",
        ],
      },
    ],
    principlesHeading: "Working principles",
    technologyHeading: "Technology",
    technologyNote:
      "This list covers technologies I have used or studied. It is not a rating of expertise.",
    otherWorkHeading: "Other work",
    otherWorkBody:
      "Beyond the two featured projects, I have worked on Remen Coffee, a POS and ERP application for a coffee shop. It covers sales operations, financial transactions, raw materials, product recipes, and inventory costing. That work sharpened my interest in data integrity.",
  },
  projectsIndex: {
    metaTitle: "Projects",
    metaDescription:
      "Featured projects by Dzulfikar Lintang Setyaji: a pet-care service booking application and a project management system.",
    title: "Projects",
    lead: "Two featured projects and their context. Each case study contains only verified information.",
  },
  contact: {
    heading: "Let's talk",
    body: "I'm open to internships, collaboration, and conversations about software development. Public contact channels will be added to this page.",
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    note: "Built with Next.js and Tailwind CSS.",
  },
  principles: [
    {
      title: "Structured thinking",
      text: "Breaking a problem into clear parts before writing code.",
    },
    {
      title: "Thoughtful system design",
      text: "Considering how components and data relate from the start, not after features pile up.",
    },
    {
      title: "Data integrity",
      text: "Designing database structure and validation so data stays consistent and trustworthy.",
    },
    {
      title: "Maintainable software",
      text: "Readable, well-separated code that other people, including future me, can continue.",
    },
    {
      title: "Practical problem solving",
      text: "Choosing the solution that answers the real need, not the most complicated one.",
    },
    {
      title: "Continuous learning",
      text: "Revisiting decisions and learning new tools when they are actually needed.",
    },
    {
      title: "Technical curiosity",
      text: "Digging into how a system works at its foundations before relying on it.",
    },
  ],
  techGroups: [
    {
      label: "Backend",
      items: "Laravel, PHP, Node.js, Express.js, REST APIs",
    },
    {
      label: "Frontend",
      items: "React, JavaScript, TypeScript, Vite, Tailwind CSS, shadcn/ui",
    },
    {
      label: "Database",
      items: "PostgreSQL, Supabase, relational database design",
    },
  ],
  projects: {
    "pet-care-booking": {
      name: "Pet-Care Booking Application",
      domain: "Pet services",
      summary:
        "A pet-care service booking application designed to support the booking process through digital technology.",
      context: "Developed in the context of FIKSI 2025.",
      metaTitle: "Pet-Care Booking Application — Case Study",
      metaDescription:
        "Case study of a pet-care service booking application developed in the context of FIKSI 2025.",
      lead: "An application for booking pet-care services through digital technology, developed in the context of FIKSI 2025.",
      facts: [
        { label: "Type", value: "Service booking application" },
        { label: "Domain", value: "Pet care" },
        { label: "Context", value: "FIKSI 2025" },
      ],
      sections: [
        {
          heading: "Overview",
          body: [
            "This project is a pet-care service booking application. It was developed in the context of FIKSI 2025.",
          ],
        },
        {
          heading: "Problem space",
          body: [
            "Booking a pet-care service involves several related pieces of information: the chosen service, the time it takes place, and the pet that will be cared for. This describes the problem domain in general terms, not a list of the application's features.",
          ],
        },
        {
          heading: "Purpose",
          body: [
            "The application is intended to support the process of booking pet-care services through digital technology.",
          ],
        },
        {
          heading: "Design perspective",
          body: [
            "A booking system depends on consistent data: every booking should be traceable to a clear service, schedule, and customer. That matches the principles I hold when designing information systems.",
          ],
        },
      ],
      pendingNote:
        "A feature list, technology details, and screenshots will be added once the project documentation is organised.",
      visualCaption:
        "Conceptual illustration of a booking schedule, not a screenshot of the application.",
    },
    "project-management-system": {
      name: "Project Management System",
      domain: "Project management",
      summary:
        "A project management system focused on organising project information and work.",
      context:
        "In line with my interest in application development and information systems design.",
      metaTitle: "Project Management System — Case Study",
      metaDescription:
        "Case study of a project management system focused on organising project information and work.",
      lead: "A system for organising information and work within a project.",
      facts: [
        { label: "Type", value: "Project management system" },
        { label: "Focus", value: "Organising project information and work" },
        {
          label: "Relevance",
          value: "Application development and information systems design",
        },
      ],
      sections: [
        {
          heading: "Overview",
          body: [
            "This project is a project management system focused on organising project information and the work within a project.",
          ],
        },
        {
          heading: "Problem space",
          body: [
            "A project produces information and work that must stay organised to be easy to follow. This describes the problem domain in general terms, not a list of the system's features.",
          ],
        },
        {
          heading: "Purpose",
          body: [
            "The system is intended to help organise project information and the work inside it.",
          ],
        },
        {
          heading: "Why it matters to me",
          body: [
            "A project management system brings together several of my interests: information systems design, data modelling, and building applications used for everyday work.",
          ],
        },
      ],
      pendingNote:
        "A feature list, technology details, and screenshots will be added once the project documentation is organised.",
      visualCaption:
        "Conceptual illustration of grouped work, not a screenshot of the application.",
    },
  },
};

export default en;
