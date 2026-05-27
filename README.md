# chayka.live

SEO-first website for a psychotherapist.

The project is built around:

- Astro for a fast static/frontend layer;
- Tailwind CSS for styling;
- Sanity CMS for editable content and admin workflows;
- GTM-ready CTA/contact tracking;
- reusable page templates for services, concerns, articles, FAQ, and the contact-intent action page.

Read first:

- `PROJECT_BRIEF.md`
- `ARCHITECTURE.md`

## Local development

```bash
npm install
npm run dev
```

Astro dev server:

```bash
npm run dev
```

Sanity Studio:

```bash
npm run studio:dev
```

Hosted Sanity Studio:

```txt
https://chayka-live.sanity.studio/
```

Sanity needs real values in `.env` before it can connect to a project.
Use `.env.example` as the starting point.

## Sanity setup

The code is ready to work in two modes:

- with a real Sanity project when `PUBLIC_SANITY_PROJECT_ID` is set;
- with local fallback seed content when Sanity is not configured yet.

Initial setup flow:

```bash
npm run sanity:login
```

Then create or select a Sanity project and put the real values into `.env`:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-05-27
```

After the dataset exists, import starter content:

```bash
npm run sanity:import
```

## Scripts

- `npm run dev` - start Astro locally
- `npm run build` - build the public site
- `npm run preview` - preview the built site
- `npm run studio:dev` - start Sanity Studio
- `npm run studio:build` - build Sanity Studio
- `npm run sanity:login` - log in to Sanity CLI
- `npm run sanity:debug` - inspect local Sanity CLI/project state
- `npm run sanity:import` - import starter content into the `production` dataset
