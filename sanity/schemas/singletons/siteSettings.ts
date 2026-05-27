import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      initialValue: 'chayka.live',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'baseUrl',
      title: 'Base URL',
      type: 'url',
      initialValue: 'https://chayka.live',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultLanguage',
      title: 'Default language',
      type: 'string',
      initialValue: 'uk',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'defaultSeo', title: 'Default SEO', type: 'seoFields' }),
    defineField({ name: 'professionalName', title: 'Professional name', type: 'string' }),
    defineField({ name: 'professionalRole', title: 'Professional role', type: 'string' }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'baseUrl',
    },
  },
});
