import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'chaykaLive',
  title: 'chayka.live',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'um0nx9l4',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !['siteSettings', 'trackingSettings', 'contactSettings'].includes(schemaType),
      ),
  },
});
