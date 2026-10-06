'use client';

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getDocById, COLLECTIONS } from './admin/db';
import type { WebsiteSettings } from './admin/types';
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
  /** true once Firestore has responded (or failed) — data is final. */
  loaded: boolean;
}

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
  loaded: false,
};

/** Prefer a database value only when it is a non-empty string. */
function pick(dbValue: unknown, fallback: string): string {
  return typeof dbValue === 'string' && dbValue.trim() !== '' ? dbValue : fallback;
}

function mergeSettings(doc: WebsiteSettings | null): ResolvedSiteSettings {
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
