'use client';

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getDocById, COLLECTIONS } from './admin/db';
import type {
  WebsiteSettings,
  NavMenuItem,
  HeaderButton,
  FooterColumn,
  HeroSettings,
  GearRentalInfo,
  FooterNewsletterSettings,
  FooterFoundingSettings,
} from './admin/types';
import {
  SITE_NAME,
  SITE_TAGLINE,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  EMAIL_PRIMARY,
  setLiveSiteOverrides,
} from './site';

/**
 * Live website settings, merged from Firestore (`settings/website`) over the
 * static defaults in lib/site.ts. Everything the admin panel's Website
 * Settings page saves shows up on the website through this hook.
 */

export interface ResolvedSiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  footerAbout: string;
  announcementBar: string;
  announcementBarEnabled: boolean;
  headerMenus: NavMenuItem[];
  headerButtons: HeaderButton[];
  footerColumns: FooterColumn[];
  hero: HeroSettings;
  gearRental: GearRentalInfo;
  visaSteps: string[];
  defaultWeatherInfo: string;
  footerNewsletter: FooterNewsletterSettings;
  footerFounding: FooterFoundingSettings;
  footerCopyright: string;
  /** true once Firestore has responded (or failed) — data is final. */
  loaded: boolean;
}

const DEFAULT_HEADER_MENUS: NavMenuItem[] = [
  { label: 'HOME', href: '/', children: [] },
  { label: 'TREKKING PACKAGES', href: '/treks', children: [] },
  {
    label: 'DESTINATIONS',
    href: '/destinations',
    children: [
      { label: 'Central Karakoram & K2 (Skardu)', href: '/destination/karakoram' },
      { label: 'Hunza & Nagar Valleys (Rakaposhi)', href: '/destination/hunza-nagar' },
      { label: 'Western Himalayas (Nanga Parbat)', href: '/destination/himalayas-nanga-parbat' },
      { label: 'Deosai High Plains (Wilderness)', href: '/destination/deosai' },
      { label: 'Shimshal & Pamir (6000m Peaks)', href: '/destination/shimshal' },
    ],
  },
  { label: 'CONTACT', href: '/contact', children: [] },
];

const DEFAULT_HEADER_BUTTONS: HeaderButton[] = [
  {
    label: 'CUSTOM PLAN',
    href: '/custom-plan',
    icon: 'Compass',
    bgColor: '#0284c7',
    textColor: '#ffffff',
    borderColor: '#0284c7',
    borderWidth: 0,
    borderRadius: 2,
    fontSize: 15,
    fontWeight: '700',
  },
];

const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Popular Treks',
    links: [
      { label: 'K2 Base Camp & Gondogoro La', href: '/treks/k2-basecamp-gondogoro-la' },
      { label: 'K2 Base Camp Classic', href: '/treks/k2-basecamp-classic' },
      { label: 'Fairy Meadows & Nanga Parbat', href: '/treks/fairy-meadows-nanga-parbat' },
      { label: 'Snow Lake & Hispar La', href: '/treks/snow-lake-biafo-hispar' },
      { label: 'Rakaposhi & Diran Base Camp', href: '/treks/rakaposhi-diran-base-camp' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Trip Planner', href: '/planner' },
      { label: 'Safety & Guides', href: '/safety-and-guides' },
      { label: 'Permits & Visa Guide', href: '/permits-visa-guide' },
      { label: 'Blog & Stories', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Custom Expedition', href: '/custom-plan' },
      { label: 'About Us', href: '/about' },
      { label: 'Booking Terms', href: '/terms' },
    ],
  },
];

const DEFAULT_GEAR_RENTAL: GearRentalInfo = {
  title: "Rent in Skardu — Don't Overpack",
  intro:
    'Flying with expedition gear is expensive and unnecessary. Our Skardu outfitter stocks inspected, expedition-grade equipment at a fraction of retail price.',
  items: [
    { item: 'Expedition sleeping bag (-20C)', price: '$25 / trek' },
    { item: '800-fill down jacket', price: '$20 / trek' },
    { item: 'Trekking poles (pair)', price: '$10 / trek' },
    { item: 'Crampons (for pass crossings)', price: '$15 / trek' },
    { item: '90L expedition duffel', price: '$8 / trek' },
    { item: 'Sleeping mat (inflatable)', price: '$10 / trek' },
  ],
  note: 'Full rental bundle for a K2 Base Camp trek: under $100. Reserve with your booking and your kit is inspected, packed, and waiting at your Skardu hotel.',
};

const DEFAULT_VISA_STEPS: string[] = [
  'We issue your official Letter of Invitation (LOI) and Ministry of Tourism itinerary within 24h.',
  'You apply online via the Pakistan Official E-Visa portal (category: Trekking & Mountaineering).',
  'Our Skardu team files group permits with the Gilgit-Baltistan Home Department and Central Karakoram National Park (CKNP).',
  'Government liaison officer briefing conducted in Islamabad / Skardu.',
];

const DEFAULT_WEATHER_INFO =
  'During the summer climbing season (June to late August), daytime temperatures at lower altitudes (Skardu/Askole) range from 24°C to 30°C. Above 4,000m (Concordia/Ali Camp), daytime temperatures are 10°C to 18°C, dropping to -5°C to -12°C at night. Gondogoro La pass crossings are scheduled at 1:00 AM when snow crust is firm.';

const DEFAULT_FOOTER_NEWSLETTER: FooterNewsletterSettings = {
  enabled: true,
  eyebrow: 'From the trail',
  title: 'Stories from the mountains.',
  description:
    'Occasional updates from the trail. New routes, seasonal guides, and honest writing from Baltistan. No spam.',
  placeholder: 'Your email address',
  buttonLabel: 'Subscribe',
};

const DEFAULT_FOOTER_FOUNDING: FooterFoundingSettings = {
  enabled: true,
  title: 'Founding Members Special (2026 Inception)',
  description:
    '20% off 2026/2027 treks + lifetime 10% loyalty & free merchandise.',
  ctaLabel: 'Claim Your Benefits',
  ctaHref: '/planner',
};

const DEFAULT_FOOTER_COPYRIGHT = '© {year} Trek Karakoram. All rights reserved.';

const DEFAULT_HERO: HeroSettings = {
  mediaType: 'video',
  imageUrl:
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
  videoUrl: '/videos/trekkarakoram-video.mp4',
  posterUrl:
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
  badge: 'Local Pakistan Trekking & Expedition Team',
  headline: 'Trek deeper into the',
  headlineAccent: 'Karakoram Mountains.',
  subheadline:
    'Explore K2, Concordia, Gondogoro La, Fairy Meadows and the remote valleys of northern Pakistan with experienced local guides who know these mountains as home.',
  ctaPrimaryLabel: 'Explore Our Treks',
  ctaPrimaryHref: '/treks',
  ctaSecondaryLabel: 'Plan Your Journey',
  ctaSecondaryHref: '/booking',
};

const DEFAULTS: ResolvedSiteSettings = {
  siteName: SITE_NAME,
  tagline: SITE_TAGLINE,
  logoUrl: '/images/trekkarakoram-logo.png',
  faviconUrl: '',
  phone: PHONE_DISPLAY,
  whatsapp: WHATSAPP_NUMBER,
  email: EMAIL_PRIMARY,
  address: 'College Road, Airport Link, Skardu 16100',
  facebookUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
  tiktokUrl: '',
  footerAbout:
    'Guided expeditions to K2 Base Camp, Baltoro, Concordia, Nanga Parbat, and Snow Lake.',
  announcementBar: '',
  announcementBarEnabled: false,
  headerMenus: DEFAULT_HEADER_MENUS,
  headerButtons: DEFAULT_HEADER_BUTTONS,
  footerColumns: DEFAULT_FOOTER_COLUMNS,
  hero: DEFAULT_HERO,
  gearRental: DEFAULT_GEAR_RENTAL,
  visaSteps: DEFAULT_VISA_STEPS,
  defaultWeatherInfo: DEFAULT_WEATHER_INFO,
  footerNewsletter: DEFAULT_FOOTER_NEWSLETTER,
  footerFounding: DEFAULT_FOOTER_FOUNDING,
  footerCopyright: DEFAULT_FOOTER_COPYRIGHT,
  loaded: false,
};

/** Prefer a database value only when it is a non-empty string. */
function pick(dbValue: unknown, fallback: string): string {
  return typeof dbValue === 'string' && dbValue.trim() !== '' ? dbValue : fallback;
}

/** Prefer a database array only when it is a non-empty array. */
function pickList<T>(dbValue: unknown, fallback: T[]): T[] {
  return Array.isArray(dbValue) && dbValue.length > 0 ? (dbValue as T[]) : fallback;
}

/** Merge a Firestore settings doc over the built-in defaults (exported so the
 *  admin form can show exactly what the website renders). Empty strings in
 *  the doc fall back to the defaults — the admin form pre-fills with the
 *  merged values, so a field the user never touched never wipes the site. */
export function mergeSettings(doc: WebsiteSettings | null): ResolvedSiteSettings {
  if (!doc) return { ...DEFAULTS, loaded: true };
  const dbHero = doc.hero ?? {};
  const heroMediaType =
    dbHero.mediaType === 'video' || dbHero.mediaType === 'image'
      ? dbHero.mediaType
      : DEFAULT_HERO.mediaType;
  return {
    siteName: pick(doc.siteName, DEFAULTS.siteName),
    tagline: pick(doc.tagline, DEFAULTS.tagline),
    logoUrl: pick(doc.logoUrl, DEFAULTS.logoUrl),
    faviconUrl: pick(doc.faviconUrl, DEFAULTS.faviconUrl),
    phone: pick(doc.phone, DEFAULTS.phone),
    whatsapp: pick(doc.whatsapp, DEFAULTS.whatsapp),
    email: pick(doc.email, DEFAULTS.email),
    address: pick(doc.address, DEFAULTS.address),
    facebookUrl: pick(doc.facebookUrl, DEFAULTS.facebookUrl),
    instagramUrl: pick(doc.instagramUrl, DEFAULTS.instagramUrl),
    youtubeUrl: pick(doc.youtubeUrl, DEFAULTS.youtubeUrl),
    tiktokUrl: pick(doc.tiktokUrl, DEFAULTS.tiktokUrl),
    footerAbout: pick(doc.footerAbout, DEFAULTS.footerAbout),
    announcementBar: doc.announcementBar ?? '',
    announcementBarEnabled: !!doc.announcementBarEnabled,
    headerMenus: pickList<NavMenuItem>(doc.headerMenus, DEFAULT_HEADER_MENUS),
    headerButtons: pickList<HeaderButton>(doc.headerButtons, DEFAULT_HEADER_BUTTONS),
    footerColumns: pickList<FooterColumn>(doc.footerColumns, DEFAULT_FOOTER_COLUMNS),
    hero: {
      mediaType: heroMediaType,
      imageUrl: pick(dbHero.imageUrl, DEFAULT_HERO.imageUrl),
      videoUrl: pick(dbHero.videoUrl, DEFAULT_HERO.videoUrl),
      posterUrl: pick(dbHero.posterUrl, DEFAULT_HERO.posterUrl),
      badge: pick(dbHero.badge, DEFAULT_HERO.badge),
      headline: pick(dbHero.headline, DEFAULT_HERO.headline),
      headlineAccent: pick(dbHero.headlineAccent, DEFAULT_HERO.headlineAccent),
      subheadline: pick(dbHero.subheadline, DEFAULT_HERO.subheadline),
      ctaPrimaryLabel: pick(dbHero.ctaPrimaryLabel, DEFAULT_HERO.ctaPrimaryLabel),
      ctaPrimaryHref: pick(dbHero.ctaPrimaryHref, DEFAULT_HERO.ctaPrimaryHref),
      ctaSecondaryLabel: pick(dbHero.ctaSecondaryLabel, DEFAULT_HERO.ctaSecondaryLabel),
      ctaSecondaryHref: pick(dbHero.ctaSecondaryHref, DEFAULT_HERO.ctaSecondaryHref),
    },
    gearRental: {
      title: pick(doc.gearRental?.title, DEFAULT_GEAR_RENTAL.title),
      intro: pick(doc.gearRental?.intro, DEFAULT_GEAR_RENTAL.intro),
      items:
        doc.gearRental?.items && doc.gearRental.items.length > 0
          ? doc.gearRental.items
          : DEFAULT_GEAR_RENTAL.items,
      note: pick(doc.gearRental?.note, DEFAULT_GEAR_RENTAL.note),
    },
    visaSteps: pickList<string>(doc.visaSteps, DEFAULT_VISA_STEPS),
    defaultWeatherInfo: pick(doc.defaultWeatherInfo, DEFAULT_WEATHER_INFO),
    footerNewsletter: {
      enabled: doc.footerNewsletter?.enabled ?? DEFAULT_FOOTER_NEWSLETTER.enabled,
      eyebrow: pick(doc.footerNewsletter?.eyebrow, DEFAULT_FOOTER_NEWSLETTER.eyebrow),
      title: pick(doc.footerNewsletter?.title, DEFAULT_FOOTER_NEWSLETTER.title),
      description: pick(
        doc.footerNewsletter?.description,
        DEFAULT_FOOTER_NEWSLETTER.description
      ),
      placeholder: pick(
        doc.footerNewsletter?.placeholder,
        DEFAULT_FOOTER_NEWSLETTER.placeholder
      ),
      buttonLabel: pick(
        doc.footerNewsletter?.buttonLabel,
        DEFAULT_FOOTER_NEWSLETTER.buttonLabel
      ),
    },
    footerFounding: {
      enabled: doc.footerFounding?.enabled ?? DEFAULT_FOOTER_FOUNDING.enabled,
      title: pick(doc.footerFounding?.title, DEFAULT_FOOTER_FOUNDING.title),
      description: pick(
        doc.footerFounding?.description,
        DEFAULT_FOOTER_FOUNDING.description
      ),
      ctaLabel: pick(doc.footerFounding?.ctaLabel, DEFAULT_FOOTER_FOUNDING.ctaLabel),
      ctaHref: pick(doc.footerFounding?.ctaHref, DEFAULT_FOOTER_FOUNDING.ctaHref),
    },
    footerCopyright: pick(doc.footerCopyright, DEFAULT_FOOTER_COPYRIGHT),
    loaded: true,
  };
}

const SettingsContext = createContext<ResolvedSiteSettings>(DEFAULTS);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ResolvedSiteSettings>(DEFAULTS);
  // One full-tree re-render when settings arrive, so legacy whatsappLink() /
  // telLink() call sites (which read the live registry) pick up DB values.
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    let cancelled = false;
    getDocById<WebsiteSettings>(COLLECTIONS.settings, 'website')
      .then((doc) => {
        if (cancelled) return;
        const merged = mergeSettings(doc);
        setLiveSiteOverrides({ whatsapp: merged.whatsapp });
        setSettings(merged);
        forceUpdate();
      })
      .catch(() => {
        if (!cancelled) setSettings({ ...DEFAULTS, loaded: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSiteSettings(): ResolvedSiteSettings {
  return useContext(SettingsContext);
}

/** WhatsApp deep link built from the live (database) number. */
export function useWhatsappLink(message: string): string {
  const { whatsapp } = useSiteSettings();
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

/** tel: link built from the live (database) number. */
export function useTelLink(): string {
  const { whatsapp } = useSiteSettings();
  return `tel:+${whatsapp}`;
}
