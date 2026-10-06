'use client';

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getDocById, COLLECTIONS } from './admin/db';
import type {
  WebsiteSettings,
  NavMenuItem,
  HeaderButton,
  FooterColumn,
  HeroSettings,
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
      { label: 'Central Karakoram & K2 (Skardu)', href: '/destinations' },
      { label: 'Hunza & Nagar Valleys (Rakaposhi)', href: '/destinations' },
      { label: 'Western Himalayas (Nanga Parbat)', href: '/destinations' },
      { label: 'Deosai High Plains (Wilderness)', href: '/destinations' },
      { label: 'Shimshal & Pamir (6000m Peaks)', href: '/destinations' },
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
 *  admin form can show exactly what the website renders). */
export function mergeSettings(doc: WebsiteSettings | null): ResolvedSiteSettings {
  if (!doc) return { ...DEFAULTS, loaded: true };
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
    hero: { ...DEFAULT_HERO, ...(doc.hero ?? {}) },
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
