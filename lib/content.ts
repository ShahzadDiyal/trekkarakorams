'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { FAQ_ITEMS, TREK_PACKAGES } from '@/data/treks';
import type { AdminTrek, TrekFaq, PricingTier } from './admin/types';
import type {
  TrekPackage,
  TrekRegion,
  TrekDifficulty,
  ItineraryDay,
} from '@/types';

/**
 * Public-website content fetched live from Firestore.
 * Every function falls back to the site's static data if the database
 * can't be reached, so the website never renders empty.
 */

export interface PublicFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

function toPublicFaq(id: string, data: Record<string, unknown>): PublicFaq {
  return {
    id,
    category: String(data.category ?? 'General'),
    question: String(data.question ?? ''),
    answer: String(data.answer ?? ''),
  };
}

function staticFaqs(): PublicFaq[] {
  return FAQ_ITEMS.map((f, i) => ({
    id: `static-${i}`,
    category: f.category,
    question: f.question,
    answer: f.answer,
  }));
}

/** FAQs for the homepage section and /faq page — live from the `faqs` collection.
 *  The database is the source of truth: whatever the admin panel saves is
 *  what the site shows. Static data is only a fallback when Firestore
 *  itself can't be reached. */
export async function getFaqs(): Promise<PublicFaq[]> {
  try {
    const snap = await getDocs(query(collection(db, 'faqs'), orderBy('order', 'asc')));
    return snap.docs.map((d) => toPublicFaq(d.id, d.data() as Record<string, unknown>));
  } catch {
    return staticFaqs();
  }
}

/** React hook for the global FAQs. */
export function useFaqs(): { faqs: PublicFaq[]; loading: boolean } {
  const [faqs, setFaqs] = useState<PublicFaq[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getFaqs()
      .then((f) => {
        if (!cancelled) {
          setFaqs(f);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return { faqs, loading };
}

/* ------------------------------------------------------------------ */
/* Treks                                                               */
/* ------------------------------------------------------------------ */

/** A trek as the public site renders it: the UI shape plus admin extras. */
export interface PublicTrek extends TrekPackage {
  faqs: TrekFaq[];
  pricingTiers: PricingTier[];
}

const VALID_REGIONS: TrekRegion[] = [
  'Karakoram',
  'Himalayas',
  'Hindukush',
  'Hunza & Nagar',
  'Deosai & Astore',
];

const VALID_DIFFICULTIES: TrekDifficulty[] = [
  'Easy',
  'Moderate',
  'Demanding',
  'Strenuous',
  'Extreme',
];

/** Admin difficulty labels → the site's difficulty scale. */
function mapDifficulty(raw: string): TrekDifficulty {
  const v = (raw || '').trim();
  if ((VALID_DIFFICULTIES as string[]).includes(v)) return v as TrekDifficulty;
  if (v === 'Challenging') return 'Demanding';
  if (v === 'Expedition') return 'Extreme';
  return 'Moderate';
}

function mapRegion(raw: string): TrekRegion {
  const v = (raw || '').trim();
  if ((VALID_REGIONS as string[]).includes(v)) return v as TrekRegion;
  return 'Karakoram';
}

function toItineraryDay(
  d: { day: string; title: string; description: string; timing?: string },
  index: number
): ItineraryDay {
  const num = parseInt(String(d.day ?? '').replace(/\D/g, ''), 10);
  return {
    day: Number.isFinite(num) && num > 0 ? num : index + 1,
    title: d.title || '',
    desc: d.description || '',
    altitude: '',
    stay: '',
    trekHours: d.timing || '',
  };
}

/**
 * Merge one admin trek doc into the shape the site renders.
 * Admin-managed fields come from the database; fields the admin panel
 * doesn't manage (gear checklist, departures, activity type) fall back to
 * the matching static trek so detail pages stay complete.
 */
function toPublicTrek(doc: AdminTrek & { id: string }): PublicTrek {
  const base = TREK_PACKAGES.find((t) => t.id === doc.id);
  const tiers = doc.pricingTiers ?? [];
  const tierPrice = (name: string) =>
    tiers.find((t) => t.name.trim().toLowerCase() === name)?.priceUSD || 0;
  const baseItinerary = base?.itinerary ?? [];

  const itinerary = (doc.itinerary ?? []).map((d, i) => {
    const item = toItineraryDay(d, i);
    // Fill altitude/stay/walking-time from the static trek when the admin
    // hasn't set them — admin-entered timing always wins.
    const b =
      baseItinerary.find((x) => x.day === item.day) ?? baseItinerary[i];
    return {
      ...item,
      altitude: item.altitude || b?.altitude || '',
      stay: item.stay || b?.stay || '',
      trekHours: item.trekHours || b?.trekHours || '',
    };
  });

  return {
    id: doc.id,
    title: doc.title || base?.title || 'Untitled trek',
    shortTitle: doc.shortTitle || doc.title || base?.shortTitle || '',
    tagline: doc.tagline || base?.tagline || '',
    region: mapRegion(doc.region || base?.region || ''),
    startingCity: doc.startingCity || base?.startingCity || 'Skardu',
    durationDays: doc.durationDays || base?.durationDays || 0,
    durationNights: doc.durationNights || base?.durationNights || 0,
    difficulty: mapDifficulty(doc.difficulty || base?.difficulty || ''),
    maxAltitude: doc.maxAltitude || base?.maxAltitude || 0,
    priceUSD: doc.priceUSD || base?.priceUSD || 0,
    discountPriceUSD: doc.discountPriceUSD || base?.discountPriceUSD || undefined,
    basicPriceUSD: tierPrice('basic') || base?.basicPriceUSD || undefined,
    standardPriceUSD: tierPrice('standard') || base?.standardPriceUSD || undefined,
    premiumPriceUSD: tierPrice('premium') || base?.premiumPriceUSD || undefined,
    singleSupplementUSD:
      tiers.find((t) => t.singleSupplementUSD > 0)?.singleSupplementUSD ??
      base?.singleSupplementUSD,
    rating: doc.rating || base?.rating || 5,
    reviewsCount: doc.reviewsCount ?? base?.reviewsCount ?? 0,
    featured: !!doc.featured,
    popular: !!doc.popular,
    bestSeason: doc.bestSeason || base?.bestSeason || '',
    groupSize: doc.groupSize || base?.groupSize || '',
    activityType: base?.activityType || 'Trekking',
    image: doc.image || '',
    gallery: doc.gallery ?? [],
    overview: doc.overview || base?.overview || '',
    highlights: doc.highlights ?? base?.highlights ?? [],
    itinerary,
    inclusions: doc.inclusions ?? base?.inclusions ?? [],
    exclusions: doc.exclusions ?? base?.exclusions ?? [],
    gearChecklist: base?.gearChecklist ?? [],
    permitRequirements: doc.permitRequirements || base?.permitRequirements || '',
    fitnessLevel: doc.fitnessLevel || base?.fitnessLevel || '',
    departures: base?.departures ?? [],
    faqs: doc.faqs ?? [],
    pricingTiers: tiers,
  };
}

/** A static trek lifted into the public shape (DB-unreachable fallback). */
function staticTreks(): PublicTrek[] {
  return TREK_PACKAGES.map((t) => ({
    ...t,
    faqs: [],
    pricingTiers: [],
  }));
}

/** All published treks, live from the `treks` collection.
 *  The database is the source of truth; static data only fills in when
 *  Firestore can't be reached. Curated static ordering is preserved. */
export async function getTreks(): Promise<PublicTrek[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'treks'), orderBy('createdAt', 'asc'))
    );
    const docs = snap.docs.map((d) => {
      const { id: _docId, ...data } = d.data() as AdminTrek;
      return { id: d.id, ...data };
    });
    const published = docs.filter((d) => d.published !== false);
    if (published.length === 0) return staticTreks();
    const order = new Map(TREK_PACKAGES.map((t, i) => [t.id, i]));
    return published
      .map(toPublicTrek)
      .sort((a, b) => (order.get(a.id) ?? 9999) - (order.get(b.id) ?? 9999));
  } catch {
    return staticTreks();
  }
}

/** React hook for the public trek catalog. */
export function useTreks(): { treks: PublicTrek[]; loading: boolean } {
  const [treks, setTreks] = useState<PublicTrek[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getTreks()
      .then((t) => {
        if (!cancelled) {
          setTreks(t);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return { treks, loading };
}

/** React hook for a single trek by id (database first, static fallback). */
export function useTrek(id: string): {
  trek: PublicTrek | null;
  loading: boolean;
} {
  const { treks, loading } = useTreks();
  const trek = treks.find((t) => t.id === id) ?? null;
  return { trek, loading };
}
