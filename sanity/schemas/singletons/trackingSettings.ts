import { defineField, defineType } from 'sanity';

export const trackingSettings = defineType({
  name: 'trackingSettings',
  title: 'Tracking settings',
  type: 'document',
  fields: [
    defineField({ name: 'trackingEnabled', title: 'Tracking enabled', type: 'boolean', initialValue: false }),
    defineField({
      name: 'gtmId',
      title: 'GTM container ID',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^GTM-[A-Z0-9]+$/).warning('GTM IDs usually look like GTM-XXXXXXX.'),
    }),
    defineField({ name: 'ga4MeasurementId', title: 'GA4 measurement ID', type: 'string' }),
    defineField({ name: 'metaPixelId', title: 'Meta Pixel ID', type: 'string' }),
    defineField({ name: 'environment', title: 'Environment', type: 'string', options: { list: ['development', 'production'] } }),
  ],
  preview: {
    prepare: () => ({
      title: 'Tracking settings',
      subtitle: 'GTM, GA4, pixels',
    }),
  },
});
