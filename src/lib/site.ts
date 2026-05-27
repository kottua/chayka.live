import type { ContactSettings } from './data';

export const site = {
  name: 'chayka.live',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://chayka.live',
  title: 'chayka.live - психотерапія онлайн',
  description:
    'Сайт психотерапевта з делікатною навігацією за запитами, послугами та зручним першим контактом.',
  language: 'uk',
};

export const contactSettings: ContactSettings = {
  phone: '+380000000000',
  phoneDisplay: '+38 000 000 00 00',
  responseHours: 'Відповідь у месенджерах у робочий час',
  confidentialityNote: 'Перше повідомлення може бути коротким. Деталі можна уточнити у зручному темпі.',
  channels: [
    {
      id: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/',
      icon: 'telegram',
      role: 'contact',
    },
    {
      id: 'viber',
      label: 'Viber',
      href: 'viber://chat?number=%2B380000000000',
      icon: 'viber',
      role: 'contact',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/380000000000',
      icon: 'whatsapp',
      role: 'contact',
    },
  ],
};
