import { abTest } from './documents/abTest';
import { article } from './documents/article';
import { author } from './documents/author';
import { concern } from './documents/concern';
import { cta } from './documents/cta';
import { faqItem } from './documents/faqItem';
import { page } from './documents/page';
import { service } from './documents/service';
import { contactSettings } from './singletons/contactSettings';
import { siteSettings } from './singletons/siteSettings';
import { trackingSettings } from './singletons/trackingSettings';
import { blockContent } from './objects/blockContent';
import { seoFields } from './objects/seoFields';

export const schemaTypes = [
  siteSettings,
  trackingSettings,
  contactSettings,
  page,
  service,
  concern,
  article,
  faqItem,
  cta,
  abTest,
  author,
  blockContent,
  seoFields,
];
