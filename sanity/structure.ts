import type { StructureResolver } from 'sanity/structure';

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('chayka.live')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              singleton(S, 'siteSettings', 'Site settings'),
              singleton(S, 'trackingSettings', 'Tracking settings'),
              singleton(S, 'contactSettings', 'Contact settings'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('page').title('Pages'),
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('concern').title('Concerns'),
              S.documentTypeListItem('article').title('Articles'),
              S.documentTypeListItem('faqItem').title('FAQ items'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),
      S.listItem()
        .title('SEO / Conversion')
        .child(
          S.list()
            .title('SEO / Conversion')
            .items([
              S.documentTypeListItem('cta').title('CTA blocks'),
              S.documentTypeListItem('abTest').title('A/B tests'),
            ]),
        ),
    ]);
