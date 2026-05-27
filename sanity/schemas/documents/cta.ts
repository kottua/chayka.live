import { defineField, defineType } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  fields: [
    defineField({ name: 'internalName', title: 'Internal name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (Rule) => Rule.max(260) }),
    defineField({
      name: 'placementType',
      title: 'Placement type',
      type: 'string',
      options: {
        list: [
          'global',
          'home',
          'service',
          'concern',
          'article',
          'faq',
          'action_page',
          'sticky_mobile',
        ],
      },
    }),
    defineField({
      name: 'enabledChannels',
      title: 'Enabled channels',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['telegram', 'viber', 'whatsapp', 'phone'] },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'trackingContext', title: 'Tracking context', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'abTest', title: 'A/B test', type: 'reference', to: [{ type: 'abTest' }] }),
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'placementType',
    },
  },
});
