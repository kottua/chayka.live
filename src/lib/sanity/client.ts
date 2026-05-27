import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-05-27',
  useCdn: true,
});

export const hasSanityConfig = Boolean(
  import.meta.env.PUBLIC_SANITY_PROJECT_ID &&
    import.meta.env.PUBLIC_SANITY_PROJECT_ID !== 'placeholder',
);
