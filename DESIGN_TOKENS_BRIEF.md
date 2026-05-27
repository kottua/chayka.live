# Design Tokens Brief

## Role

The visual system should feel balanced, calm, professional, and slightly premium. It should avoid both clinical coldness and decorative "coach-brand" softness.

The site is content-heavy, SEO-oriented, and conversion-focused. Design tokens should support long reading, clear navigation, and low-pressure contact actions.

## Mood

- Balanced, with a slight move toward restrained premium.
- Warm enough to feel human, but not sweet or playful.
- Structured, quiet, confident.
- Minimal visual noise.
- Mostly text-led, with selective visuals and functional icons.

## Icon Provider

Use Iconify Design for communication and social icons.

Icon behavior:

- Use SVG icons.
- Icons should inherit color through `currentColor`.
- Default state should be monochrome and aligned with the site palette.
- Do not use full official social brand colors in the base UI.
- Hover may use a light background fill and brand-primary icon color.

## Color Tokens

Core palette:

```txt
brand-primary:       #265C50
brand-primary-hover: #1E4A41
brand-soft:          #C3DBD6

text-primary:        #2C302F
text-secondary:      #5C5A59

background:          #F7F8F6
surface:             #FFFFFF
surface-muted:       #EEF3F1

border:              #D9DEDC
border-strong:       #BFCBC6

warm-accent:         #D96F3D
warm-accent-soft:    #F6D8C8

critical:            #CC2D00
```

Usage:

- `#265C50` is the main brand and primary CTA color.
- `#C3DBD6` and `#EEF3F1` are soft supporting colors, not dominant CTA colors.
- `#D96F3D` is used very sparingly for focus states, small markers, or subtle emphasis.
- `#CC2D00` is reserved for critical/warning states, not normal CTA usage.

## Backgrounds

Use a combination:

- Main page background: light, nearly white.
- Content surfaces: white.
- Muted sections: soft gray-green only when useful.

Prefer clean sections over heavy cards or decorative panels.

## Typography

Keep the current font direction:

```txt
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Rules:

- Do not introduce a new decorative font family.
- Headings should feel confident but not oversized.
- Use `font-weight: 600` or `650` for headings.
- Body text should prioritize readability.
- Body line-height should stay comfortable, around `1.7-1.8`.
- Heading line-height should be tighter, around `1.1-1.25`.
- Letter spacing should be `0`, except for small eyebrow labels.

## Radius

Use restrained radii:

```txt
radius-small: 4px
radius-base:  6px
radius-large: 8px
radius-pill:  999px
```

Usage:

- Buttons: `6px`.
- Cards and panels: `6px` or `8px`.
- Inputs: `6px`.
- Tags/badges: `999px`.
- Contact icon buttons: `6px`, not circular by default.

## Borders And Shadows

Prefer borders over shadows.

```txt
border-color:        #D9DEDC
border-color-strong: #BFCBC6
```

Rules:

- Cards and panels use thin borders.
- Header/sticky surfaces may use a subtle bottom border.
- Avoid heavy shadows.
- Use shadow only when a layer would be unclear without it.

## Spacing And Density

General density should be medium.

- Hero sections: more generous spacing.
- CTA sections: more generous spacing.
- Articles and SEO pages: comfortable reading rhythm, not overly loose.
- Lists/cards: compact but readable.

## Sections

Prefer clean sections without unnecessary cards.

Use cards only when they represent repeated items or functional UI:

- services;
- articles;
- FAQ items;
- related requests;
- CTA/contact panels.

Do not make every page section a card.

## CTA Buttons

Primary CTA:

```txt
background: #265C50
text:       #FFFFFF
hover:      #1E4A41
radius:     6px
height:     at least 44px
```

Tone:

- Button text is short and direct.
- Supporting text is soft and low-pressure.

Example:

- Button: "Написати"
- Supporting text: "Можна почати з короткого повідомлення і уточнити формат роботи."

## Communication Channels

Each channel in the CMS should have a role:

```txt
contact
trust
both
```

Examples:

```txt
Phone:     contact
Telegram:  contact
Viber:     contact
WhatsApp:  contact
Messenger: both
Instagram: both or trust
TikTok:    trust
```

Usage:

- CTA/contact blocks show `contact` and `both`.
- Footer social/profile block shows `trust` and `both`.
- Social channels may be communication channels if the therapist actually responds there.
- Profile visits are microconversions, especially for long decision cycles.

## Contact Icon Buttons

```txt
button-size: 44px
icon-size:   20-22px
radius:      6px
border:      1px solid
```

Visual behavior:

- Icon-only buttons.
- No visible per-channel labels.
- Use `aria-label`, `title`, and `data-channel`.
- Default state: quiet monochrome.
- Hover/focus: light background fill plus brand-primary icon color.

Phone behavior:

- Phone starts as an icon-only action.
- On click, reveal the phone number and enable `tel:`.
- Track the reveal as a distinct conversion event.

## Footer Social Block

Use the footer as the first place for profile/social microconversions.

Rules:

- Show `trust` and `both` channels.
- Use icon-only buttons.
- Button size: `44px`.
- No visible labels per icon.
- A short section label is allowed, for example: "Більше контексту - у профілях".
- Track clicks separately from direct contact CTA clicks.

## Breadcrumbs

Breadcrumbs should be quiet.

- Small text.
- Muted color.
- Thin separators.
- No button-like styling.
- Current page is not visually loud.

They support structure and SEO without competing with the page title.

## Tracking Events

Recommended event names:

```txt
cta_contact_click
phone_reveal
social_profile_click
profile_visit_click
```

Keep contact conversions separate from trust/profile microconversions.
