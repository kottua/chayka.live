import { defineField, defineType } from 'sanity';

export const abTest = defineType({
  name: 'abTest',
  title: 'A/B test',
  type: 'document',
  fields: [
    defineField({ name: 'internalName', title: 'Internal name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'testKey', title: 'Test key', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['draft', 'active', 'paused', 'archived'] }, initialValue: 'draft' }),
    defineField({ name: 'targetPlacement', title: 'Target placement', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Variant key', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'weight', title: 'Traffic weight', type: 'number', validation: (Rule) => Rule.required().min(0) },
            { name: 'headline', title: 'Headline', type: 'string' },
            { name: 'text', title: 'Text', type: 'text' },
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).warning('A/B tests usually need at least two variants.'),
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      status: 'status',
      testKey: 'testKey',
    },
    prepare: ({ title, status, testKey }) => ({
      title,
      subtitle: `${status || 'draft'} - ${testKey || 'No key'}`,
    }),
  },
});
