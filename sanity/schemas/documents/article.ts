import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'updatedAt', title: 'Updated at', type: 'datetime' }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'relatedServices', title: 'Related services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'relatedConcerns', title: 'Related concerns', type: 'array', of: [{ type: 'reference', to: [{ type: 'concern' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'cta', title: 'CTA', type: 'reference', to: [{ type: 'cta' }] }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      publishedAt: 'publishedAt',
      media: 'heroImage',
    },
    prepare: ({ title, slug, publishedAt, media }) => ({
      title,
      subtitle: `${slug ? `/statti/${slug}` : 'No slug'}${publishedAt ? ` - ${publishedAt.slice(0, 10)}` : ''}`,
      media,
    }),
  },
});
