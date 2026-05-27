import { site } from '../site';
import type { ContactSettings, FaqItem } from '../data';

export type BreadcrumbItem = {
  label: string;
  path: string;
};

const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const fullItems = [{ label: 'Головна', path: '/' }, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildProfessionalServiceJsonLd(contactSettings?: ContactSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    contactPoint: contactSettings
      ? {
          '@type': 'ContactPoint',
          telephone: contactSettings.phone,
          contactType: 'customer service',
          availableLanguage: ['uk'],
        }
      : undefined,
  };
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: 'Психотерапевт',
    knowsLanguage: ['uk'],
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    inLanguage: site.language,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  };
}
