// lib/site.ts — single source of truth for site identity, domain, and contact details.
// Update values here and every page, sitemap, schema block, and WhatsApp deep-link follows.

export const SITE_NAME = 'Trek Karakoram';
export const SITE_TAGLINE = 'Discover the Spirit of the Mountains';
export const SITE_URL = 'https://trekkarakoram.com';

/**
 * Primary contact phone (WhatsApp-enabled).
 * IMPORTANT: '+92 300 9876543' is a placeholder — replace with the real
 * business number before launch. Every tel:/wa.me link on the site reads
 * from these two constants, so this is the ONLY place that needs editing.
 */
export const PHONE_DISPLAY = '+92 300 9876543';
/** Digits only, for wa.me deep links. */
export const WHATSAPP_NUMBER = '923009876543';

export const EMAIL_PRIMARY = 'info@trekkarakoram.com';

export const CONTACT = {
  phoneDisplay: PHONE_DISPLAY,
  whatsapp: WHATSAPP_NUMBER,
  email: EMAIL_PRIMARY,
} as const;

/** Pre-encoded WhatsApp deep link with a custom message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** tel: link for click-to-call. */
export function telLink(): string {
  return `tel:+${WHATSAPP_NUMBER}`;
}
