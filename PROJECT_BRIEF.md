# chayka.live: upper-level project brief

## 1. Project essence

`chayka.live` is a personal website for a psychotherapist.

The site should work not only as a simple business-card website, but as an SEO-oriented content system for attracting clients through organic search.

Main focus:

- high-quality indexing;
- organic traffic from specific psychological search intents;
- trust in the specialist;
- conversion of visitors into first contact through a convenient communication channel.

## 2. Main goals

- Build a fast, technically clean website with a strong SEO foundation.
- Make content easy to add and edit through an admin interface.
- Create a structure for pages targeting specific psychological topics, services, and client concerns.
- Support convenient integration of Google Tag Manager, Google Analytics, Meta Pixel, and other marketing scripts.
- Prepare A/B testing for key conversion elements.
- Design internal linking, breadcrumbs, and structured data intentionally.
- Smoothly guide the visitor toward first contact with the psychotherapist.

## 3. Approved technology stack

- Frontend / framework: Astro
- CMS / admin: Sanity CMS
- Styling: Tailwind CSS
- Tracking: Google Tag Manager as the main integration point for analytics and pixels
- Hosting: Cloudflare Pages or Vercel
- Content model: pages, articles, services, FAQ, CTA, SEO settings, and conversion settings managed through CMS

## 4. Product principle

The site should not be a simple set of pages like "Home / About / Contacts".

It should be designed as:

- a personal brand platform for the psychotherapist;
- an SEO content system;
- a knowledge base answering specific psychological queries;
- a conversion system that gently leads people toward contact.

## 5. Approximate site structure

- Home
- About the psychotherapist
- Action / contact-intent page:
  - `/consultation`
  - or `/zapys-na-konsultatsiiu`
- Services:
  - individual therapy;
  - online consultation;
  - anxiety therapy;
  - self-esteem work;
  - relationships;
  - crises, loss, breakups;
  - other directions to be clarified later.
- Concerns / problems:
  - pages targeting specific psychological issues and search queries;
  - examples: anxiety, panic attacks, emotional burnout, relationship difficulties, etc.
- Blog / knowledge base
- FAQ
- Possible local SEO pages if needed

## 6. SEO requirements

The site must be designed with a strong SEO foundation:

- fast server-rendered / static HTML;
- correct title, description, and canonical URL;
- Open Graph metadata;
- `sitemap.xml`;
- `robots.txt`;
- clean URL structure;
- breadcrumbs on nested pages;
- internal linking between articles, services, concerns, and the action page;
- schema.org:
  - `Person`;
  - `ProfessionalService`;
  - `Article`;
  - `FAQPage`;
  - `BreadcrumbList`;
- SEO fields editable through CMS;
- structure suitable for many low- and mid-frequency psychological search queries.

## 7. CMS / admin

The admin interface should allow content management without developer involvement.

Approximate content types:

- `Page`
- `Article`
- `Service`
- `Concern` / `Problem`
- `FAQ`
- `Testimonial`
- `CTA`
- `ABTest`
- `Author`
- `SEO Settings`
- `Navigation`
- `ContactSettings` / `ConversionSettings`
- `TrackingSettings`

The CMS should ideally manage:

- pages;
- articles;
- services;
- FAQ;
- SEO metadata;
- CTA blocks;
- button texts;
- messengers;
- phone number;
- navigation;
- A/B variants of key blocks;
- tracking ID / GTM ID / marketing settings.

## 8. Main conversion

At launch, the site does not use a booking platform such as Calendly or Cal.com.

Primary target actions:

- opening a messenger preferred by the client;
- revealing the phone number;
- clicking to call;
- copying the phone number;
- going to the action / contact-intent page.

Core logic: the visitor may not yet be ready to book a consultation, but may be ready to ask a clarifying question. The site should preserve and support that intent.

## 9. Communication channels

The CTA system should support:

- Telegram;
- Viber;
- WhatsApp;
- phone call;
- phone number reveal;
- phone number copy.

In the future, it should be possible to add a booking platform or custom booking flow without rebuilding the architecture.

## 10. Action page

The action page should be a conversion node, not just a "Contacts" page.

Its tasks:

- confirm that the visitor is in the right place;
- briefly explain what concerns they can reach out with;
- offer a convenient communication channel;
- show messengers and phone number;
- reduce basic fears and doubts;
- avoid text overload;
- avoid elements that harm conversion.

Possible page content:

- short intro;
- "Choose a convenient way to contact" block;
- messenger buttons;
- phone number;
- response hours;
- short FAQ;
- confidentiality note;
- minimal navigation or simplified navigation.

## 11. CTA system

A global CTA component is required and should be reusable on:

- home page;
- service pages;
- concern pages;
- articles;
- FAQ;
- sticky mobile bar;
- action page.

CTA should be managed through CMS:

- headline;
- short text;
- active communication channels;
- channel order;
- button text;
- phone number;
- messengers;
- A/B variants;
- tracking events.

## 12. A/B tests

The project should support A/B testing without relying on a heavy external service at launch.

Possible test targets:

- hero headlines;
- CTA texts;
- order of messenger buttons;
- action page wording;
- sticky CTA;
- button labels;
- trust blocks.

A/B variants should be managed through CMS, and results should be tracked through GTM / GA4.

## 13. Analytics and events

Key events should be tracked through GTM:

- `cta_messenger_click`
- `cta_phone_reveal`
- `cta_phone_click`
- `cta_phone_copy`
- `contact_page_view`
- `sticky_cta_click`
- `article_cta_click`
- `service_cta_click`

All important CTA elements should have clear data attributes or another stable tracking base.

## 14. Future expansion

The architecture should allow adding later:

- Calendly / Cal.com;
- custom booking form;
- Google Calendar integration;
- multilingual support;
- additional landing pages;
- larger knowledge base;
- more advanced analytics;
- heatmaps / session recording;
- email newsletter or lead magnet.

## 15. General product principle

The site should not feel like an aggressive sales page.

It should be a delicate, trustworthy, and very clear system that:

- answers specific user concerns;
- demonstrates the psychotherapist's competence;
- does not pressure the visitor;
- lowers the barrier to first contact;
- helps the visitor quickly move to contact when they are ready.
