import { defineField, defineType } from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO fields',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning('Try to keep SEO titles under 70 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(170).warning('Try to keep meta descriptions under 170 characters.'),
    }),
    defineField({ name: 'ogImage', title: 'Open Graph image', type: 'image' }),
    defineField({ name: 'canonicalOverride', title: 'Canonical override', type: 'url' }),
    defineField({ name: 'noindex', title: 'Noindex', type: 'boolean', initialValue: false }),
  ],
});
