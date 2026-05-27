import {
  articles as fallbackArticles,
  concerns as fallbackConcerns,
  faqItems as fallbackFaqItems,
  services as fallbackServices,
} from './content';
import { contactSettings as fallbackContactSettings } from './site';
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

export type SeoFields = {
  title?: string;
  description?: string;
  canonicalOverride?: string;
  noindex?: boolean;
};

export type CmsDocumentContent = {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  publishedAt?: string;
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

export async function getServices() {
  return fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "service"] | order(title asc) {
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
    fallbackServices,
  );
}

export async function getConcerns() {
  return fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "concern"] | order(title asc) {
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
    fallbackConcerns,
  );
}

export async function getArticles() {
  return fetchFromSanity<CmsDocumentContent[]>(
    `*[_type == "article"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      "description": coalesce(excerpt, seo.description, ""),
      "publishedAt": coalesce(publishedAt, _createdAt),
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
    fallbackArticleDocuments,
  );
}

export async function getFaqItems() {
  return fetchFromSanity<FaqItem[]>(
    `*[_type == "faqItem"] | order(_createdAt asc) {
      question,
      answer
    }`,
    fallbackFaqItems,
  );
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
