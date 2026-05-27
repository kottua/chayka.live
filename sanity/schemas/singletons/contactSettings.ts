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
    defineField({ name: 'messengerUrl', title: 'Messenger URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'tiktokUrl', title: 'TikTok URL', type: 'url' }),
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
      options: { list: ['telegram', 'viber', 'whatsapp', 'messenger', 'instagram', 'tiktok', 'phone'] },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'channelRoles',
      title: 'Channel roles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'channel',
              title: 'Channel',
              type: 'string',
              options: {
                list: ['telegram', 'viber', 'whatsapp', 'messenger', 'instagram', 'tiktok', 'phone'],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  { title: 'Contact', value: 'contact' },
                  { title: 'Trust', value: 'trust' },
                  { title: 'Both', value: 'both' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'channel',
              subtitle: 'role',
            },
          },
        },
      ],
      initialValue: [
        { channel: 'telegram', role: 'contact' },
        { channel: 'viber', role: 'contact' },
        { channel: 'whatsapp', role: 'contact' },
        { channel: 'messenger', role: 'both' },
        { channel: 'instagram', role: 'both' },
        { channel: 'tiktok', role: 'trust' },
        { channel: 'phone', role: 'contact' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'phoneDisplay',
      subtitle: 'responseHours',
    },
  },
});
