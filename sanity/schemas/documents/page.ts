import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'navLabel', title: 'Navigation label', type: 'string' }),
    defineField({ name: 'showInHeader', title: 'Show in header', type: 'boolean', initialValue: false }),
    defineField({ name: 'showInFooter', title: 'Show in footer', type: 'boolean', initialValue: false }),
    defineField({ name: 'navOrder', title: 'Navigation order', type: 'number' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'cta', title: 'CTA', type: 'reference', to: [{ type: 'cta' }] }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/${slug}` : 'No slug',
    }),
  },
});
