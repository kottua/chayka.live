import { defineField, defineType } from 'sanity';

export const concern = defineType({
  name: 'concern',
  title: 'Concern',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'searchIntentSummary',
      title: 'Search intent summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'relatedServices', title: 'Related services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'relatedArticles', title: 'Related articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }] }),
    defineField({ name: 'faq', title: 'FAQ', type: 'array', of: [{ type: 'reference', to: [{ type: 'faqItem' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'cta', title: 'CTA', type: 'reference', to: [{ type: 'cta' }] }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      subtitle: 'shortDescription',
    },
    prepare: ({ title, slug, subtitle }) => ({
      title,
      subtitle: slug ? `/zapyt/${slug} - ${subtitle || 'No description'}` : subtitle,
    }),
  },
});
