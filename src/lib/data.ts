import {
  articles as fallbackArticles,
  concerns as fallbackConcerns,
  faqItems as fallbackFaqItems,
  pageContentSettings as editorialPageContentSettings,
  pages as fallbackPages,
  services as fallbackServices,
} from './content';
import { contactSettings as fallbackContactSettings, site } from './site';
import { hasSanityConfig, sanityClient } from './sanity/client';

const fallbackArticleDocuments: CmsDocumentContent[] = fallbackArticles.map((article) => ({
  ...article,
  description: article.excerpt,
}));

export type CardContent = {
  title: string;
  slug: string;
  description: string;
};

export type ArticleContent = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
  order?: number;
};

export type SeoFields = {
  title?: string;
  description?: string;
  ogImage?: unknown;
  canonicalOverride?: string;
  noindex?: boolean;
};

export type SiteSettingsContent = {
  siteName: string;
  baseUrl: string;
  defaultLanguage: string;
  footerText: string;
  professionalName?: string;
  professionalRole?: string;
  profilePhoto?: unknown;
  defaultOgImage?: unknown;
  favicon?: unknown;
  defaultSeo?: SeoFields;
};

export type ExperienceSection = {
  period?: string;
  title: string;
  text?: unknown[];
  image?: unknown;
  imageAlt?: string;
};

export type PageContentSettings = {
  homeEyebrow: string;
  homeHeadline: string;
  homeIntro: string;
  homePrimaryButtonLabel: string;
  homeSecondaryButtonLabel: string;
  homeHeroPhoto?: unknown;
  homeSeo?: SeoFields;
  servicesSectionEyebrow: string;
  servicesSectionTitle: string;
  concernsSectionEyebrow: string;
  concernsSectionTitle: string;
  articlesSectionEyebrow: string;
  articlesSectionTitle: string;
  aboutEyebrow: string;
  aboutIntro?: unknown[];
  aboutPhoto?: unknown;
  aboutSeo?: SeoFields;
  experienceTitle: string;
  experienceSections: ExperienceSection[];
  concernsArchiveEyebrow: string;
  concernsArchiveTitle: string;
  concernsArchiveDescription: string;
  concernsArchiveSeo?: SeoFields;
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
  faqSeo?: SeoFields;
};

export type CmsDocumentContent = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: unknown;
  heroImageUrl?: string;
  author?: {
    name?: string;
    role?: string;
    photo?: unknown;
    shortBio?: string;
  };
  body?: unknown[];
  seo?: SeoFields;
  relatedServices?: CardContent[];
  relatedConcerns?: CardContent[];
  relatedArticles?: ArticleContent[];
  faq?: FaqItem[];
  cta?: CtaContent;
};

export type CtaContent = {
  id: string;
  internalName: string;
  headline?: string;
  text?: string;
  placementType?: string;
  enabledChannels?: string[];
  trackingContext?: string;
};

export type ContactChannel = {
  id: string;
  label: string;
  href: string;
  icon: string;
  role: ContactChannelRole;
};

export type ContactChannelRole = 'contact' | 'trust' | 'both';

export type ContactSettings = {
  phone: string;
  phoneDisplay: string;
  responseHours: string;
  confidentialityNote: string;
  channels: ContactChannel[];
};

type ChannelRoleSetting = {
  channel?: string;
  role?: ContactChannelRole;
};

type CmsPageNavFields = {
  title: string;
  slug?: string;
  navLabel?: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
  navOrder?: number;
};

const fallbackSiteSettings: SiteSettingsContent = {
  siteName: 'Валентина Чайка',
  baseUrl: site.url,
  defaultLanguage: site.language,
  footerText:
    'Психотерапевтична підтримка онлайн: уважний перший контакт, конфіденційність і робота в темпі, який можна витримати.',
  professionalName: 'Валентина Чайка',
  professionalRole: 'Психотерапевт',
};

function normalizeProfessionalName(name?: string) {
  if (!name) return undefined;
  return name.trim() === 'Чайка Валентина' ? 'Валентина Чайка' : name;
}

const fallbackPageContentSettings: PageContentSettings = {
  ...editorialPageContentSettings,
};

const channelDefaults: Record<string, { label: string; icon: string; role: ContactChannelRole }> = {
  telegram: { label: 'Telegram', icon: 'telegram', role: 'contact' },
  viber: { label: 'Viber', icon: 'viber', role: 'contact' },
  whatsapp: { label: 'WhatsApp', icon: 'whatsapp', role: 'contact' },
  messenger: { label: 'Messenger', icon: 'messenger', role: 'both' },
  instagram: { label: 'Instagram', icon: 'instagram', role: 'both' },
  tiktok: { label: 'TikTok', icon: 'tiktok', role: 'trust' },
};

function getChannelRole(id: string, roleSettings: ChannelRoleSetting[] | null = []) {
  const settings = roleSettings || [];
  const configured = settings.find((item) => item.channel === id)?.role;
  return configured || channelDefaults[id]?.role || 'contact';
}

function buildChannel(
  id: keyof typeof channelDefaults,
  href: string | undefined,
  roleSettings: ChannelRoleSetting[] | null = [],
) {
  if (!href) return null;

  return {
    id,
    label: channelDefaults[id].label,
    href,
    icon: channelDefaults[id].icon,
    role: getChannelRole(id, roleSettings),
  };
}

const legalPageSlugs = new Set(['konfidenciinist', 'umovi']);
const reservedTopLevelSlugs = new Set([
  'faq',
  'poslugy',
  'pro-mene',
  'statti',
  'zapys-na-konsultatsiiu',
  'zapyt',
]);

function toPageNavItem(page: CmsPageNavFields): NavItem | null {
  if (!page.slug || reservedTopLevelSlugs.has(page.slug)) return null;

  return {
    label: page.navLabel || page.title,
    href: `/${page.slug}`,
    order: page.navOrder,
  };
}

async function fetchFromSanity<T>(query: string, fallback: T): Promise<T> {
  if (!hasSanityConfig) return fallback;

  try {
    const data = await sanityClient.fetch<T>(query);
    return data || fallback;
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback content.', error);
    return fallback;
  }
}

function mergeByKey<T extends Record<string, unknown>>(
  remote: T[],
  editorial: T[],
  key: keyof T,
) {
  const merged = new Map<string, T>();
  for (const item of remote) {
    const value = item[key];
    if (typeof value === 'string') merged.set(value, item);
  }
  for (const item of editorial) {
    const value = item[key];
    if (typeof value === 'string') merged.set(value, item);
  }
  return [...merged.values()];
}

const legacyServiceSlugs: Record<string, string> = {
  'indyvidualna-psykhoterapiia': 'indyvidualne-konsultuvannia',
  'onlain-konsultatsiia': 'indyvidualne-konsultuvannia',
  tryvozhnist: 'indyvidualne-konsultuvannia',
  '247': 'psykholohichna-pidtrymka-24-7',
};

const legacyConcernSlugs: Record<string, string> = {
  'postiina-tryvoha': 'naviazlyvi-tryvozhni-dumky',
  'skladnoshchi-u-stosunkakh': 'simeini-konflikty',
};

function remapCards(
  cards: CardContent[] | undefined,
  aliases: Record<string, string>,
  canonicalCards: CardContent[],
) {
  if (!cards) return cards;
  return cards.map((card) => {
    const nextSlug = aliases[card.slug];
    return nextSlug ? canonicalCards.find((candidate) => candidate.slug === nextSlug) || card : card;
  });
}

function normalizeLegacyRelations(document: CmsDocumentContent) {
  return {
    ...document,
    relatedServices: remapCards(document.relatedServices, legacyServiceSlugs, fallbackServices),
    relatedConcerns: remapCards(document.relatedConcerns, legacyConcernSlugs, fallbackConcerns),
  };
}

export async function getSiteSettings() {
  const settings = await fetchFromSanity<Partial<SiteSettingsContent> | null>(
    `*[_type == "siteSettings"][0] {
      siteName,
      baseUrl,
      defaultLanguage,
      footerText,
      professionalName,
      professionalRole,
      profilePhoto,
      defaultOgImage,
      favicon,
      defaultSeo
    }`,
    null,
  );

  if (!settings) return fallbackSiteSettings;

  return {
    siteName: normalizeProfessionalName(settings.siteName) || fallbackSiteSettings.siteName,
    baseUrl: settings.baseUrl || fallbackSiteSettings.baseUrl,
    defaultLanguage: settings.defaultLanguage || fallbackSiteSettings.defaultLanguage,
    footerText: settings.footerText || fallbackSiteSettings.footerText,
    professionalName: normalizeProfessionalName(settings.professionalName) || fallbackSiteSettings.professionalName,
    professionalRole: settings.professionalRole || fallbackSiteSettings.professionalRole,
    profilePhoto: settings.profilePhoto,
    defaultOgImage: settings.defaultOgImage || settings.defaultSeo?.ogImage,
    favicon: settings.favicon,
    defaultSeo: settings.defaultSeo,
  } satisfies SiteSettingsContent;
}

export async function getPageContentSettings() {
  const settings = await fetchFromSanity<Partial<PageContentSettings> | null>(
    `*[_type == "pageContentSettings"][0] {
      homeEyebrow,
      homeHeadline,
      homeIntro,
      homePrimaryButtonLabel,
      homeSecondaryButtonLabel,
      homeHeroPhoto,
      homeSeo,
      servicesSectionEyebrow,
      servicesSectionTitle,
      concernsSectionEyebrow,
      concernsSectionTitle,
      articlesSectionEyebrow,
      articlesSectionTitle,
      aboutEyebrow,
      aboutIntro,
      aboutPhoto,
      aboutSeo,
      experienceTitle,
      experienceSections[] {
        period,
        title,
        text,
        image,
        imageAlt
      },
      concernsArchiveEyebrow,
      concernsArchiveTitle,
      concernsArchiveDescription,
      concernsArchiveSeo,
      faqEyebrow,
      faqTitle,
      faqDescription,
      faqSeo
    }`,
    null,
  );

  return {
    ...(settings || {}),
    ...fallbackPageContentSettings,
    homeHeroPhoto: settings?.homeHeroPhoto,
    aboutPhoto: settings?.aboutPhoto,
    homeSeo: { ...(settings?.homeSeo || {}), ...(fallbackPageContentSettings.homeSeo || {}) },
    aboutSeo: { ...(settings?.aboutSeo || {}), ...(fallbackPageContentSettings.aboutSeo || {}) },
    concernsArchiveSeo: {
      ...(settings?.concernsArchiveSeo || {}),
      ...(fallbackPageContentSettings.concernsArchiveSeo || {}),
    },
    faqSeo: { ...(settings?.faqSeo || {}), ...(fallbackPageContentSettings.faqSeo || {}) },
    experienceSections: fallbackPageContentSettings.experienceSections,
  } satisfies PageContentSettings;
}

export async function getServices() {
  const remote = await fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "service"] | order(title asc) {
      "id": _id,
      title,
      "slug": slug.current,
      "description": coalesce(shortDescription, seo.description, ""),
      body,
      seo,
      "relatedConcerns": relatedConcerns[]->{
        title,
        "slug": slug.current,
        "description": coalesce(shortDescription, searchIntentSummary, seo.description, "")
      },
      "relatedArticles": relatedArticles[]->{
        title,
        "slug": slug.current,
        excerpt,
        "publishedAt": coalesce(publishedAt, _createdAt)
      },
      "faq": faq[]->{
        question,
        answer
      },
      "cta": cta->{
        "id": _id,
        internalName,
        headline,
        text,
        placementType,
        enabledChannels,
        trackingContext
      }
    }`,
    [],
  );
  return mergeByKey(remote, fallbackServices, 'id');
}

export async function getConcerns() {
  const remote = await fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "concern"] | order(title asc) {
      "id": _id,
      title,
      "slug": slug.current,
      "description": coalesce(shortDescription, searchIntentSummary, seo.description, ""),
      body,
      seo,
      "relatedServices": relatedServices[]->{
        title,
        "slug": slug.current,
        "description": coalesce(shortDescription, seo.description, "")
      },
      "relatedArticles": relatedArticles[]->{
        title,
        "slug": slug.current,
        excerpt,
        "publishedAt": coalesce(publishedAt, _createdAt)
      },
      "faq": faq[]->{
        question,
        answer
      },
      "cta": cta->{
        "id": _id,
        internalName,
        headline,
        text,
        placementType,
        enabledChannels,
        trackingContext
      }
    }`,
    [],
  );
  return mergeByKey(remote.map(normalizeLegacyRelations), fallbackConcerns, 'id');
}

export async function getArticles() {
  const remote = await fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "article"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      "description": coalesce(excerpt, seo.description, ""),
      "publishedAt": coalesce(publishedAt, _createdAt),
      heroImage,
      heroImageUrl,
      "author": author->{
        name,
        role,
        photo,
        shortBio
      },
      body,
      seo,
      "relatedServices": relatedServices[]->{
        title,
        "slug": slug.current,
        "description": coalesce(shortDescription, seo.description, "")
      },
      "relatedConcerns": relatedConcerns[]->{
        title,
        "slug": slug.current,
        "description": coalesce(shortDescription, searchIntentSummary, seo.description, "")
      },
      "cta": cta->{
        "id": _id,
        internalName,
        headline,
        text,
        placementType,
        enabledChannels,
        trackingContext
      }
    }`,
    [],
  );
  return mergeByKey(remote.map(normalizeLegacyRelations), fallbackArticleDocuments, 'id').sort((a, b) =>
    (b.publishedAt || '').localeCompare(a.publishedAt || ''),
  );
}

export async function getFaqItems() {
  return fallbackFaqItems;
}

export async function getPages() {
  const remote = await fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "page"] | order(title asc) {
      title,
      "slug": slug.current,
      "description": coalesce(seo.description, ""),
      body,
      seo,
      "cta": cta->{
        "id": _id,
        internalName,
        headline,
        text,
        placementType,
        enabledChannels,
        trackingContext
      }
    }`,
    [],
  );
  return mergeByKey(remote, fallbackPages, 'slug');
}

export async function getHeaderNavItems() {
  const staticItems: NavItem[] = [
    { label: 'Про мене', href: '/pro-mene', order: 10 },
    { label: 'Послуги', href: '/poslugy', order: 20 },
    { label: 'З чим працюю', href: '/zapyt', order: 30 },
  ];

  const pages = await fetchFromSanity<CmsPageNavFields[]>(
    `*[_type == "page"] | order(coalesce(navOrder, 100) asc, title asc) {
      title,
      "slug": slug.current,
      navLabel,
      showInHeader,
      navOrder
    }`,
    fallbackPages,
  );

  const mergedPages = mergeByKey(pages, fallbackPages, 'slug');
  const cmsItems = mergedPages
    .filter((page) => page.showInHeader === true || (page.showInHeader == null && !legalPageSlugs.has(page.slug || '')))
    .map(toPageNavItem)
    .filter(Boolean) as NavItem[];

  return [...staticItems, ...cmsItems, { label: 'Статті', href: '/statti', order: 90 }, { label: 'Часті питання', href: '/faq', order: 100 }]
    .sort((a, b) => (a.order || 100) - (b.order || 100));
}

export async function getFooterNavItems() {
  const pages = await fetchFromSanity<CmsPageNavFields[]>(
    `*[_type == "page"] | order(coalesce(navOrder, 100) asc, title asc) {
      title,
      "slug": slug.current,
      navLabel,
      showInFooter,
      navOrder
    }`,
    fallbackPages,
  );

  return mergeByKey(pages, fallbackPages, 'slug')
    .filter((page) => page.showInFooter === true || (page.showInFooter == null && legalPageSlugs.has(page.slug || '')))
    .map(toPageNavItem)
    .filter(Boolean) as NavItem[];
}

export async function getContactSettings() {
  const settings = await fetchFromSanity<
    | (Partial<ContactSettings> & {
        telegramUrl?: string;
        viberUrl?: string;
        whatsAppUrl?: string;
        messengerUrl?: string;
        instagramUrl?: string;
        tiktokUrl?: string;
        channelRoles?: ChannelRoleSetting[];
      })
    | null
  >(
    `*[_type == "contactSettings"][0] {
      phone,
      phoneDisplay,
      telegramUrl,
      viberUrl,
      whatsAppUrl,
      messengerUrl,
      instagramUrl,
      tiktokUrl,
      channelRoles,
      responseHours,
      confidentialityNote
    }`,
    null,
  );

  if (!settings) return fallbackContactSettings;

  const channels = [
    buildChannel('telegram', settings.telegramUrl, settings.channelRoles),
    buildChannel('viber', settings.viberUrl, settings.channelRoles),
    buildChannel('whatsapp', settings.whatsAppUrl, settings.channelRoles),
    buildChannel('messenger', settings.messengerUrl, settings.channelRoles),
    buildChannel('instagram', settings.instagramUrl, settings.channelRoles),
    buildChannel('tiktok', settings.tiktokUrl, settings.channelRoles),
  ].filter(Boolean) as ContactChannel[];

  return {
    phone: settings.phone || fallbackContactSettings.phone,
    phoneDisplay: settings.phoneDisplay || fallbackContactSettings.phoneDisplay,
    responseHours: settings.responseHours || fallbackContactSettings.responseHours,
    confidentialityNote: settings.confidentialityNote || fallbackContactSettings.confidentialityNote,
    channels: channels.length > 0 ? channels : fallbackContactSettings.channels,
  };
}

export async function getDefaultCTA() {
  return fetchFromSanity<CtaContent | null>(
    `*[_type == "cta" && _id == "cta-default-contact"][0] {
      "id": _id,
      internalName,
      headline,
      text,
      placementType,
      enabledChannels,
      trackingContext
    }`,
    {
      id: 'fallback-default-cta',
      internalName: 'Fallback default CTA',
      headline: 'Можна почати з короткого повідомлення',
      text: 'Оберіть зручний канал і напишіть кілька слів про те, що зараз турбує. Не потрібно одразу формулювати ідеальний запит.',
      placementType: 'global',
      enabledChannels: ['telegram', 'viber', 'whatsapp', 'messenger', 'instagram', 'phone'],
      trackingContext: 'global_contact',
    },
  );
}
