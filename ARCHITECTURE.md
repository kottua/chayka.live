# chayka.live: site architecture

This document defines the first architectural direction for `chayka.live`.
It should be read together with `PROJECT_BRIEF.md`.

## 1. Architectural goal

The site should be built as a fast SEO-first content platform with a gentle conversion layer.

The architecture must support:

- static/server-rendered pages with minimal client JavaScript;
- structured content managed through Sanity CMS;
- clean URL patterns for SEO;
- reusable page templates for services, concerns, articles, and landing pages;
- central CTA and contact settings;
- analytics-ready interactions;
- future booking and multilingual expansion.

## 2. Technology baseline

- Astro for frontend rendering and routing.
- Tailwind CSS for styling.
- Sanity CMS for content and admin workflows.
- Google Tag Manager as the main tracking integration layer.
- Cloudflare Pages or Vercel for hosting.

The frontend should treat Sanity as the source of editable content, but not as the source of every small UI decision. Core layouts, components, schema helpers, SEO helpers, and tracking contracts should live in code.

## 3. Site sections and URL structure

Use clear Ukrainian URL slugs for public pages. Keep URLs short, readable, and stable.

Recommended structure:

- `/` - home page
- `/pro-mene` - about the psychotherapist
- `/zapys-na-konsultatsiiu` - main contact-intent action page
- `/poslugy` - services index
- `/poslugy/[slug]` - individual service page
- `/zapyt/[slug]` - concern / problem page
- `/statti` - articles index
- `/statti/[slug]` - article page
- `/faq` - FAQ page

Possible future sections:

- `/misto/[slug]` - local SEO pages if needed
- `/landing/[slug]` - controlled landing pages for campaigns or experiments
- `/en/...` - future English localization

The preferred action page URL is `/zapys-na-konsultatsiiu`.
`/consultation` may be used later as an alias or English-language route.

## 4. Page types

### Home page

Purpose:

- introduce the psychotherapist;
- make the visitor feel oriented and safe;
- route people to relevant services, concerns, articles, and contact actions;
- establish trust without becoming a long sales page.

Expected blocks:

- hero with primary CTA;
- short positioning;
- core therapy directions;
- common concerns;
- trust / credentials block;
- selected articles;
- FAQ preview;
- global CTA.

### About page

Purpose:

- build trust in the specialist;
- explain approach, education, ethics, and format of work;
- reduce uncertainty before first contact.

Expected blocks:

- bio;
- therapeutic approach;
- education / qualifications;
- principles of work;
- formats and boundaries;
- CTA.

### Service page

Purpose:

- target a specific therapy service;
- explain who it is for;
- connect the service to relevant concerns and articles;
- guide to contact.

Expected blocks:

- service hero;
- who this may help;
- what sessions may focus on;
- expected format;
- related concerns;
- related articles;
- FAQ;
- CTA.

### Concern / problem page

Purpose:

- target specific search intent;
- answer the user's concern in plain language;
- explain how therapy may help;
- link to relevant services and articles;
- provide a soft contact path.

Expected blocks:

- concern-specific intro;
- signs / situations;
- what may stand behind this concern;
- how psychotherapy can help;
- related services;
- related articles;
- FAQ;
- CTA.

### Article page

Purpose:

- answer a concrete informational search query;
- build topical authority;
- move readers toward relevant services, concerns, or contact when appropriate.

Expected blocks:

- article header;
- author / reviewer metadata where appropriate;
- table of contents for long articles;
- content body;
- related services / concerns;
- related articles;
- inline CTA;
- final CTA.

### FAQ page

Purpose:

- answer high-friction questions;
- support SEO with `FAQPage` structured data;
- reduce hesitation before first contact.

FAQ items should also be reusable inside service, concern, and action pages.

### Action page

Purpose:

- convert intent into contact without pressure;
- offer messenger and phone choices;
- avoid distracting content.

Expected blocks:

- short confirmation headline;
- concise reassurance;
- messenger buttons;
- phone reveal / call / copy actions;
- response hours;
- confidentiality note;
- short FAQ;
- minimal navigation.

## 5. Sanity content model

### `siteSettings`

Singleton document.

Fields:

- site name;
- default language;
- base URL;
- default SEO title template;
- default SEO description;
- default Open Graph image;
- organization / professional profile data;
- global fallback metadata.

### `trackingSettings`

Singleton document.

Fields:

- GTM container ID;
- GA4 measurement ID if needed outside GTM;
- Meta Pixel ID if needed outside GTM;
- environment flag;
- tracking enabled flag.

Prefer GTM as the main integration point.

### `contactSettings`

Singleton document.

Fields:

- phone number;
- phone display text;
- Telegram URL / username;
- Viber URL;
- WhatsApp URL;
- prefilled messenger message where supported;
- response hours;
- confidentiality note;
- enabled channels;
- default channel order.

### `navigation`

Singleton or structured document.

Fields:

- header navigation items;
- footer navigation items;
- utility links;
- CTA link;
- optional simplified action-page navigation.

### `cta`

Reusable CTA document.

Fields:

- internal name;
- placement type;
- headline;
- short text;
- button labels;
- enabled contact channels;
- channel order override;
- visual variant;
- tracking context;
- optional A/B test reference.

### `abTest`

Experiment document.

Fields:

- internal name;
- status: draft, active, paused, archived;
- test key;
- target placement;
- variants;
- traffic split;
- start date;
- end date;
- notes;
- tracking event names.

The first implementation can keep assignment simple and stable per visitor using local storage or a cookie. Results should be measured through GTM / GA4 events.

### `author`

Fields:

- name;
- slug;
- role;
- short bio;
- photo;
- credentials;
- sameAs links;
- schema.org profile fields.

### `page`

Generic editable page for manually composed pages.

Fields:

- title;
- slug;
- page type;
- SEO fields;
- content blocks;
- CTA reference;
- noindex flag;
- canonical override.

### `service`

Fields:

- title;
- slug;
- short description;
- hero text;
- body content blocks;
- who it helps;
- session focus areas;
- related concerns;
- related articles;
- FAQ references;
- CTA reference;
- SEO fields;
- schema fields.

### `concern`

Fields:

- title;
- slug;
- search-intent summary;
- short description;
- body content blocks;
- signs / situations;
- therapy support explanation;
- related services;
- related articles;
- FAQ references;
- CTA reference;
- SEO fields.

### `article`

Fields:

- title;
- slug;
- excerpt;
- author;
- published date;
- updated date;
- hero image;
- body;
- table of contents flag;
- related services;
- related concerns;
- related articles;
- CTA reference;
- SEO fields;
- noindex flag.

### `faqItem`

Fields:

- question;
- answer;
- category;
- related services;
- related concerns;
- visibility;
- SEO relevance flag.

### `testimonial`

Optional and sensitive.

Fields:

- quote;
- display name or anonymized label;
- context;
- consent flag;
- visibility;

Testimonials should be used carefully because of the psychotherapy domain and privacy expectations.

## 6. Content blocks

Use structured Sanity blocks instead of one huge freeform body whenever the block affects layout, SEO, or conversion.

Recommended block types:

- rich text;
- image;
- quote;
- FAQ group;
- related links;
- service cards;
- concern cards;
- article cards;
- CTA block;
- trust / credentials block;
- note / reassurance block;
- two-column content block where useful;
- action channel block.

Avoid giving editors unlimited layout control at the start. The admin should make content flexible but still protect site quality.

## 7. SEO architecture

Each indexable page should support:

- title;
- meta description;
- canonical URL;
- Open Graph title;
- Open Graph description;
- Open Graph image;
- noindex flag;
- breadcrumbs;
- structured data;
- related internal links.

Generated files:

- `sitemap.xml`;
- `robots.txt`.

Structured data:

- `Person` for psychotherapist profile;
- `ProfessionalService` for the practice;
- `Article` for articles;
- `FAQPage` for FAQ pages and eligible page FAQ sections;
- `BreadcrumbList` for nested pages.

SEO rules:

- one clear H1 per page;
- descriptive H2/H3 structure;
- clean internal links;
- avoid thin pages;
- avoid duplicate search-intent pages;
- keep canonical logic explicit;
- preserve stable URLs after publication.

## 8. Conversion architecture

Primary conversion is contact intent, not booking.

Global contact actions:

- Telegram click;
- Viber click;
- WhatsApp click;
- phone reveal;
- phone click;
- phone copy;
- action page click.

Core components:

- `ContactActions`;
- `GlobalCTA`;
- `InlineCTA`;
- `StickyMobileCTA`;
- `PhoneReveal`;
- `MessengerButton`;

All conversion elements should support stable tracking attributes:

- `data-event`;
- `data-channel`;
- `data-placement`;
- `data-page-type`;
- `data-content-id`;
- `data-ab-test`;
- `data-ab-variant`.

## 9. Analytics events

Initial event contract:

- `cta_messenger_click`
- `cta_phone_reveal`
- `cta_phone_click`
- `cta_phone_copy`
- `contact_page_view`
- `sticky_cta_click`
- `article_cta_click`
- `service_cta_click`

Recommended event payload fields:

- channel;
- placement;
- page type;
- page slug;
- content ID;
- CTA ID;
- A/B test key;
- A/B variant;
- language.

The frontend should push events to `dataLayer` when GTM is enabled, while staying safe if GTM is missing or blocked.

## 10. A/B testing architecture

First version should be simple:

- A/B tests are configured in Sanity.
- Frontend receives active test definitions.
- Visitor receives a stable variant assignment.
- Variant key is attached to CTA and interaction events.
- Analysis happens in GA4 or another analytics layer through GTM.

Initial testable surfaces:

- hero headline;
- hero CTA text;
- action page headline;
- CTA description;
- messenger order;
- sticky CTA label;
- trust block wording.

Avoid A/B testing too many things before there is meaningful traffic.

## 11. Frontend code organization

Recommended Astro structure:

```text
src/
  components/
    cta/
    seo/
    layout/
    navigation/
    content/
  layouts/
  lib/
    sanity/
    seo/
    tracking/
    ab-testing/
  pages/
    index.astro
    pro-mene.astro
    zapys-na-konsultatsiiu.astro
    poslugy/
    zapyt/
    statti/
    faq.astro
  styles/
  content/
```

Recommended Sanity structure:

```text
sanity/
  schemas/
    documents/
    objects/
    singletons/
  structure/
```

## 12. Rendering strategy

Prefer static generation for public pages.

Use server rendering only if needed later for:

- live personalization;
- protected preview flows;
- dynamic booking;
- complex experiment routing.

For launch, the site should work well as a static site with CMS-driven builds and preview support.

## 13. Preview and editorial workflow

Eventually support:

- draft preview for Sanity content;
- clear document previews in Sanity Studio;
- required SEO fields for publishable content;
- editorial validation for slug, title, description, and related links;
- clear singleton settings for contacts and tracking.

## 14. Future expansion points

The architecture should leave room for:

- Calendly / Cal.com;
- custom booking form;
- Google Calendar integration;
- multilingual routes;
- local SEO pages;
- campaign landing pages;
- lead magnets;
- newsletter integration;
- advanced analytics;
- heatmaps and session recording.

These should be additive, not a reason to complicate the first build.

## 15. First implementation milestone

The first practical milestone should include:

- Astro + Tailwind project scaffold;
- Sanity Studio scaffold;
- base layout;
- SEO helper components;
- contact settings model;
- CTA components;
- action page route;
- one service template;
- one concern template;
- one article template;
- sitemap and robots setup;
- GTM placeholder integration;
- local development scripts.

This milestone does not require final content or final design, but it should prove the system shape.
