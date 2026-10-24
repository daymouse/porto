# Dzulfikar Lintang Setyaji — Portfolio

Bilingual (Indonesian / English) personal website built with Next.js 16 (App Router),
React 19, TypeScript and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /id or /en)
npm run lint
npx tsc --noEmit
npm run build && npm run start
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public base URL (no trailing slash). Drives canonical URLs, hreflang alternates, sitemap, robots and Open Graph. |

Fallback order when it is unset: `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, then
`http://localhost:3000`. A production build with none of these set serves a
`Disallow: /` robots.txt so a misconfigured deployment is never indexed with
localhost canonicals. See `.env.example`.

## Deploy to Vercel

1. Push the repository and import it in Vercel (framework preset: Next.js, no extra settings).
2. Add `NEXT_PUBLIC_SITE_URL` with the final domain under Project Settings, Environment Variables.
3. Deploy, then open `/sitemap.xml` and `/robots.txt` on the live domain to confirm the URLs.

## Structure

```
src/
  app/[lang]/            localized routes (layout is the root layout, <html lang>)
    page.tsx             home
    about/               about
    projects/            index + [slug] case study template
    opengraph-image.tsx  text-based Open Graph / Twitter image per locale
  app/sitemap.ts         localized sitemap with hreflang alternates
  app/robots.ts
  components/            header, nav, switcher, footer, project visuals, contact
  content/               typed dictionaries: types.ts, id.ts, en.ts
  lib/                   site config, metadata helper, dictionary loader
  proxy.ts               `/` -> `/id` or `/en` (Accept-Language); unknown paths -> 404
```

## Content that still needs real information

Everything lives in `src/content/{id,en}.ts` and `src/lib/site.ts`.

- **Contact links**: fill `contact.email`, `contact.github`, `contact.linkedin` in
  `src/lib/site.ts`. Empty values render nothing. Once any is set, update the
  `contact.body` sentence in both dictionaries (it currently says channels will be added).
- **Project details**: each project in the dictionaries has `facts`, `sections` and a
  `pendingNote`. Add confirmed features, stack, role and links there, then remove
  `pendingNote`. Add screenshots by replacing `ProjectVisual` with a real image.
- Project visuals are CSS illustrations, captioned as conceptual, not screenshots.

## Notes

- Dark mode follows the system preference; there is deliberately no toggle.
- Font: Hanken Grotesk (variable), self-hosted in `src/app/fonts` under the SIL Open Font License.
- Next.js 16 with Cache Components: the footer year is cached with `"use cache"`.
