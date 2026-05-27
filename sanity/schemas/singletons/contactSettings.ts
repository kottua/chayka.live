import { defineField, defineType } from 'sanity';

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone display text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'telegramUrl', title: 'Telegram URL', type: 'url' }),
    defineField({ name: 'viberUrl', title: 'Viber URL', type: 'url' }),
    defineField({ name: 'whatsAppUrl', title: 'WhatsApp URL', type: 'url' }),
    defineField({ name: 'responseHours', title: 'Response hours', type: 'string' }),
    defineField({
      name: 'confidentialityNote',
      title: 'Confidentiality note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'enabledChannels',
      title: 'Enabled channels',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['telegram', 'viber', 'whatsapp', 'phone'] },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'phoneDisplay',
      subtitle: 'responseHours',
    },
  },
});
