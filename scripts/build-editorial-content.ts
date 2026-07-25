import { readFile, writeFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';
import {
  articles,
  author,
  concerns,
  faqItems,
  pageContentSettings,
  pages,
  services,
} from '../src/lib/content';

const client = createClient({
  projectId: 'um0nx9l4',
  dataset: 'production',
  apiVersion: '2026-07-25',
  useCdn: false,
});

const [existingPageSettings, existingPages] = await Promise.all([
  client.fetch('*[_type == "pageContentSettings"][0]'),
  client.fetch('*[_type == "page"]{_id, "slug": slug.current}'),
]);

const existingPageIdBySlug = Object.fromEntries(
  existingPages.map((page: { _id: string; slug: string }) => [page.slug, page._id]),
);

const ref = (_ref: string) => ({ _type: 'reference', _ref });
const slug = (current: string) => ({ _type: 'slug', current });

const globalFaqDocuments = faqItems.map((item) => ({
  _id: item.id,
  _type: 'faqItem',
  question: item.question,
  answer: item.answer,
  category: item.category,
  seoRelevant: true,
}));

const concernFaqDocuments: Array<Record<string, unknown>> = [];
const concernDocuments = concerns.map((item) => {
  const faqRefs = (item.faq || []).map((faq, index) => {
    const faqId = `${item.id}-faq-${index + 1}`;
    concernFaqDocuments.push({
      _id: faqId,
      _type: 'faqItem',
      question: faq.question,
      answer: faq.answer,
      category: item.slug,
      seoRelevant: true,
    });
    return ref(faqId);
  });

  return {
    _id: item.id,
    _type: 'concern',
    title: item.title,
    slug: slug(item.slug),
    searchIntentSummary: item.description,
    shortDescription: item.description,
    body: item.body,
    relatedServices: item.relatedServiceSlugs.map((serviceSlug) => {
      const service = services.find((candidate) => candidate.slug === serviceSlug);
      return ref(service!.id);
    }),
    relatedArticles: articles
      .filter((article) => article.concerns.includes(item.slug))
      .map((article) => ref(article.id)),
    faq: faqRefs,
    seo: { _type: 'seoFields', ...item.seo },
    cta: ref('cta-default-contact'),
  };
});

const serviceDocuments = services.map((item) => ({
  _id: item.id,
  _type: 'service',
  title: item.title,
  slug: slug(item.slug),
  shortDescription: item.description,
  body: item.body,
  relatedConcerns: item.relatedConcerns.map((concern) => {
    const match = concerns.find((candidate) => candidate.slug === concern.slug);
    return ref(match!.id);
  }),
  relatedArticles: articles
    .filter((article) => article.services.includes(item.slug))
    .map((article) => ref(article.id)),
  faq: faqItems.slice(0, 2).map((faq) => ref(faq.id)),
  seo: { _type: 'seoFields', ...item.seo },
  cta: ref('cta-default-contact'),
}));

const articleDocuments = articles.map((item) => ({
  _id: item.id,
  _type: 'article',
  title: item.title,
  slug: slug(item.slug),
  excerpt: item.excerpt,
  author: ref(author.id),
  publishedAt: item.publishedAt,
  updatedAt: new Date().toISOString(),
  heroImageUrl: item.heroImageUrl,
  body: item.body,
  relatedServices: item.services.map((serviceSlug) => {
    const service = services.find((candidate) => candidate.slug === serviceSlug);
    return ref(service!.id);
  }),
  relatedConcerns: item.concerns.map((concernSlug) => {
    const concern = concerns.find((candidate) => candidate.slug === concernSlug);
    return ref(concern!.id);
  }),
  seo: { _type: 'seoFields', ...item.seo },
  cta: ref('cta-default-contact'),
}));

const pageDocuments = pages.map((item) => ({
  _id: existingPageIdBySlug[item.slug] || item.id,
  _type: 'page',
  title: item.title,
  slug: slug(item.slug),
  navLabel: item.navLabel,
  showInHeader: item.showInHeader,
  showInFooter: item.showInFooter,
  navOrder: item.navOrder,
  body: item.body,
  seo: {
    _type: 'seoFields',
    title: item.title,
    description: item.description,
    ...(item.seo || {}),
  },
  cta: ref('cta-default-contact'),
}));

const pageSettingsDocument = {
  ...(existingPageSettings || {}),
  _id: 'pageContentSettings',
  _type: 'pageContentSettings',
  ...pageContentSettings,
};

const authorDocument = {
  _id: author.id,
  _type: 'author',
  name: author.name,
  slug: slug(author.slug),
  role: author.role,
  shortBio: author.shortBio,
  credentials: author.credentials,
};

const documents = [
  pageSettingsDocument,
  authorDocument,
  ...globalFaqDocuments,
  ...concernFaqDocuments,
  ...serviceDocuments,
  ...concernDocuments,
  ...articleDocuments,
  ...pageDocuments,
];

await writeFile('sanity/seed/editorial-content.json', `${JSON.stringify(documents, null, 2)}\n`, 'utf8');
await writeFile(
  'sanity/seed/editorial-content.ndjson',
  `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`,
  'utf8',
);

const existingSeed = (await readFile('sanity/seed/production.ndjson', 'utf8'))
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const mergedSeed = new Map(existingSeed.map((document) => [document._id, document]));
for (const document of documents) mergedSeed.set(document._id, document);
await writeFile(
  'sanity/seed/production.ndjson',
  `${[...mergedSeed.values()].map((document) => JSON.stringify(document)).join('\n')}\n`,
  'utf8',
);

console.log(`Prepared ${documents.length} Sanity documents.`);
