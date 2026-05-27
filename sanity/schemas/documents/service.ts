import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'relatedConcerns', title: 'Related concerns', type: 'array', of: [{ type: 'reference', to: [{ type: 'concern' }] }] }),
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
      subtitle: slug ? `/poslugy/${slug} - ${subtitle || 'No description'}` : subtitle,
    }),
  },
});
