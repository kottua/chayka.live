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
      initialValue: 'Чайка Валентина',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerText',
      title: 'Footer text',
      type: 'text',
      rows: 3,
      initialValue:
        'Психотерапевтична підтримка онлайн: уважний перший контакт, конфіденційність і робота в темпі, який можна витримати.',
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
    defineField({
      name: 'profilePhoto',
      title: 'Profile photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'baseUrl',
    },
  },
});
