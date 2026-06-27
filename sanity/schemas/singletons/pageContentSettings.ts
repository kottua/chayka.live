import { defineField, defineType } from 'sanity';

const seoGroup = { name: 'seo', title: 'SEO' };
const contentGroup = { name: 'content', title: 'Content', default: true };
const mediaGroup = { name: 'media', title: 'Media' };

export const pageContentSettings = defineType({
  name: 'pageContentSettings',
  title: 'Page content',
  type: 'document',
  groups: [contentGroup, mediaGroup, seoGroup],
  fields: [
    defineField({
      name: 'homeEyebrow',
      title: 'Home eyebrow',
      type: 'string',
      initialValue: 'Психотерапія онлайн',
      group: 'content',
    }),
    defineField({
      name: 'homeHeadline',
      title: 'Home slogan / credo',
      type: 'text',
      rows: 3,
      initialValue: 'Простір для розмови про те, що всередині вже давно потребує уваги',
      validation: (Rule) => Rule.required().max(140),
      group: 'content',
    }),
    defineField({
      name: 'homeIntro',
      title: 'Home credo explanation',
      type: 'text',
      rows: 4,
      initialValue:
        'Онлайн-консультації для моментів, коли важливо розібратися з тривогою, виснаженням, стосунками або внутрішньою напругою без поспіху й тиску.',
      validation: (Rule) => Rule.max(320),
      group: 'content',
    }),
    defineField({
      name: 'homePrimaryButtonLabel',
      title: 'Home primary button label',
      type: 'string',
      initialValue: 'Звернутися',
      group: 'content',
    }),
    defineField({
      name: 'homeSecondaryButtonLabel',
      title: 'Home secondary button label',
      type: 'string',
      initialValue: 'Подивитись послуги',
      group: 'content',
    }),
    defineField({
      name: 'homeHeroPhoto',
      title: 'Home hero photo',
      description:
        'Рекомендація: горизонтальне фото 2400x1600 px або більше, JPG/WebP, терапевт у кадрі + багато легкого вільного простору під текст. Важливі деталі тримати ближче до центру, бо на мобільному фото кадрується.',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'homeSeo',
      title: 'Home SEO',
      type: 'seoFields',
      group: 'seo',
    }),
    defineField({
      name: 'servicesSectionEyebrow',
      title: 'Services section eyebrow',
      type: 'string',
      initialValue: 'Напрямки',
      group: 'content',
    }),
    defineField({
      name: 'servicesSectionTitle',
      title: 'Services section title',
      type: 'string',
      initialValue: 'Послуги',
      group: 'content',
    }),
    defineField({
      name: 'concernsSectionEyebrow',
      title: 'Concerns section eyebrow',
      type: 'string',
      initialValue: 'З чим працюю',
      group: 'content',
    }),
    defineField({
      name: 'concernsSectionTitle',
      title: 'Concerns section title',
      type: 'string',
      initialValue: 'Теми, з якими люди шукають підтримку',
      group: 'content',
    }),
    defineField({
      name: 'articlesSectionEyebrow',
      title: 'Articles section eyebrow',
      type: 'string',
      initialValue: 'База знань',
      group: 'content',
    }),
    defineField({
      name: 'articlesSectionTitle',
      title: 'Articles section title',
      type: 'string',
      initialValue: 'Перші статті',
      group: 'content',
    }),
    defineField({
      name: 'aboutEyebrow',
      title: 'About eyebrow',
      type: 'string',
      initialValue: 'Про спеціаліста',
      group: 'content',
    }),
    defineField({
      name: 'aboutIntro',
      title: 'About intro',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'About page portrait',
      description:
        'Рекомендація: вертикальне фото 1600x2000 px або більше, JPG/WebP, спокійний фон, достатньо повітря над головою і з боків для адаптивного кадрування.',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'aboutSeo',
      title: 'About SEO',
      type: 'seoFields',
      group: 'seo',
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Experience section title',
      type: 'string',
      initialValue: 'Досвід',
      group: 'content',
    }),
    defineField({
      name: 'experienceSections',
      title: 'Experience timeline sections',
      description:
        'Хронологічні блоки: освіта, додаткова освіта, ВУЗ, сертифікати, практика тощо. Для фото дипломів/документів бажано 1800x2400 px або більше, рівне світло, без сильних тіней.',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'period', title: 'Period / year', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'blockContent' }),
            defineField({
              name: 'image',
              title: 'Section photo / diploma',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'imageAlt', title: 'Image alt text', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'period', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'concernsArchiveEyebrow',
      title: '"З чим працюю" eyebrow',
      type: 'string',
      initialValue: 'З чим працюю',
      group: 'content',
    }),
    defineField({
      name: 'concernsArchiveTitle',
      title: '"З чим працюю" title',
      type: 'string',
      initialValue: 'Конкретні теми, з якими люди шукають підтримку',
      group: 'content',
    }),
    defineField({
      name: 'concernsArchiveDescription',
      title: '"З чим працюю" SEO description',
      type: 'text',
      rows: 3,
      initialValue: 'SEO-сторінки під конкретні психологічні запити і стани.',
      group: 'content',
    }),
    defineField({
      name: 'concernsArchiveSeo',
      title: '"З чим працюю" SEO',
      type: 'seoFields',
      group: 'seo',
    }),
    defineField({
      name: 'faqEyebrow',
      title: 'Часті питання eyebrow',
      type: 'string',
      initialValue: 'Часті питання',
      group: 'content',
    }),
    defineField({
      name: 'faqTitle',
      title: 'Часті питання title',
      type: 'string',
      initialValue: 'Питання перед першим контактом',
      group: 'content',
    }),
    defineField({
      name: 'faqDescription',
      title: 'Часті питання SEO description',
      type: 'text',
      rows: 3,
      initialValue: 'Відповіді на базові питання перед першим зверненням до психотерапевта.',
      group: 'content',
    }),
    defineField({
      name: 'faqSeo',
      title: 'Часті питання SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page content' }),
  },
});
