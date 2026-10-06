'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { FAQ_ITEMS, TREK_PACKAGES, BLOG_POSTS } from '@/data/treks';
import { TEAM_MEMBERS, type TeamMember } from '@/data/team';
import { DESTINATION_REGIONS } from '@/data/destinations';
import type {
  AdminTrek,
  AdminBlog,
  AdminTeamMember,
  AdminTestimonial,
  AdminDestination,
  TrekFaq,
  PricingTier,
} from './admin/types';
import type {
  TrekPackage,
  BlogArticle,
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
  /** Per-trek weather paragraph override (global default otherwise). */
  weatherInfo: string;
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
 * Build pricing tiers from legacy static price fields — used when a trek has
 * no admin-managed tiers yet (and when Firestore is unreachable).
 */
export function synthTiersFromStatic(t: TrekPackage): PricingTier[] {
  return [
    {
      name: 'Basic',
      priceUSD: t.basicPriceUSD || Math.round(t.priceUSD * 0.75),
      singleSupplementUSD: 0,
      note: '',
      features: [],
    },
    {
      name: 'Standard',
      priceUSD: t.discountPriceUSD || t.priceUSD,
      singleSupplementUSD: t.singleSupplementUSD || 0,
      note: '',
      features: [],
    },
    {
      name: 'Premium',
      priceUSD: t.premiumPriceUSD || Math.round(t.priceUSD * 1.35),
      singleSupplementUSD: 0,
      note: '',
      features: [],
    },
  ];
}

/**
 * Merge one admin trek doc into the shape the site renders.
 * Admin-managed fields come from the database; fields the admin panel
 * doesn't manage (gear checklist, departures, activity type) fall back to
 * the matching static trek so detail pages stay complete.
 */
function toPublicTrek(doc: AdminTrek & { id: string }): PublicTrek {
  const base = TREK_PACKAGES.find((t) => t.id === doc.id);
  // Pricing is single-source: admin tiers win; otherwise synthesize from the
  // static price fields so cards and the booking widget always have prices.
  const tiers =
    doc.pricingTiers && doc.pricingTiers.length > 0
      ? doc.pricingTiers
      : base
        ? synthTiersFromStatic(base)
        : [];
  const tierPrice = (name: string) =>
    tiers.find((t) => t.name.trim().toLowerCase() === name)?.priceUSD || 0;
  const priced = tiers.filter((t) => t.priceUSD > 0).map((t) => t.priceUSD);
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
    // "From" price = cheapest tier; the legacy single-price fields are retired.
    priceUSD: priced.length > 0 ? Math.min(...priced) : base?.priceUSD || 0,
    discountPriceUSD: undefined,
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
    gearChecklist:
      doc.gearChecklist && doc.gearChecklist.length > 0
        ? doc.gearChecklist
        : (base?.gearChecklist ?? []),
    permitRequirements: doc.permitRequirements || base?.permitRequirements || '',
    fitnessLevel: doc.fitnessLevel || base?.fitnessLevel || '',
    departures:
      doc.departures && doc.departures.length > 0
        ? doc.departures
        : (base?.departures ?? []),
    faqs: doc.faqs ?? [],
    pricingTiers: tiers,
    weatherInfo: doc.weatherInfo || '',
  };
}

/** A static trek lifted into the public shape (DB-unreachable fallback). */
function staticTreks(): PublicTrek[] {
  return TREK_PACKAGES.map((t) => {
    const tiers = synthTiersFromStatic(t);
    const priced = tiers.map((x) => x.priceUSD).filter((p) => p > 0);
    return {
      ...t,
      priceUSD: priced.length > 0 ? Math.min(...priced) : t.priceUSD,
      discountPriceUSD: undefined,
      faqs: [],
      pricingTiers: tiers,
      weatherInfo: '',
    };
  });
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

/* ------------------------------------------------------------------ */
/* Blogs                                                               */
/* ------------------------------------------------------------------ */

/** AdminBlog already matches the BlogArticle shape the site renders. */
export type PublicBlog = BlogArticle;

function toPublicBlog(doc: AdminBlog & { id: string }): PublicBlog {
  return {
    id: doc.id,
    title: doc.title || 'Untitled article',
    slug: doc.slug || doc.id,
    category: doc.category || 'Guides',
    readTime: doc.readTime || '',
    author: doc.author || '',
    authorRole: doc.authorRole || '',
    date: doc.date || '',
    image: doc.image || '',
    excerpt: doc.excerpt || '',
    content: doc.content ?? [],
  };
}

/** All published blog posts, live from the `blogs` collection.
 *  The database is the source of truth; static data only fills in when
 *  Firestore can't be reached. */
export async function getBlogs(): Promise<PublicBlog[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'blogs'), orderBy('createdAt', 'asc'))
    );
    const docs = snap.docs.map((d) => {
      const { id: _docId, ...data } = d.data() as AdminBlog;
      return { id: d.id, ...data };
    });
    const published = docs.filter((d) => d.published !== false);
    if (published.length === 0) return [...BLOG_POSTS];
    const order = new Map(BLOG_POSTS.map((p, i) => [p.id, i]));
    return published
      .map(toPublicBlog)
      .sort((a, b) => (order.get(a.id) ?? 9999) - (order.get(b.id) ?? 9999));
  } catch {
    return [...BLOG_POSTS];
  }
}

/** React hook for the public blog list. */
export function useBlogs(): { posts: PublicBlog[]; loading: boolean } {
  const [posts, setPosts] = useState<PublicBlog[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getBlogs()
      .then((p) => {
        if (!cancelled) {
          setPosts(p);
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
  return { posts, loading };
}

/** React hook for a single post by slug (database first, static fallback). */
export function useBlog(slug: string): {
  post: PublicBlog | null;
  loading: boolean;
} {
  const { posts, loading } = useBlogs();
  const post = posts.find((p) => p.slug === slug) ?? null;
  return { post, loading };
}

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

/** AdminTeamMember already matches the TeamMember shape the site renders. */
export type PublicTeamMember = TeamMember;

function toPublicTeamMember(doc: AdminTeamMember & { id: string }): PublicTeamMember {
  return {
    name: doc.name || 'Team Member',
    title: doc.title || '',
    image: doc.image || '',
    bio: doc.bio || '',
    phone: doc.phone || '',
    whatsapp: doc.whatsapp || '',
    email: doc.email || '',
  };
}

/** Team members, live from the `team` collection ordered by `order`.
 *  Static data only fills in when Firestore can't be reached. */
export async function getTeamMembers(): Promise<PublicTeamMember[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'team'), orderBy('order', 'asc'))
    );
    if (snap.empty) return [...TEAM_MEMBERS];
    return snap.docs.map((d) => {
      const { id: _docId, ...data } = d.data() as AdminTeamMember;
      return toPublicTeamMember({ id: d.id, ...data });
    });
  } catch {
    return [...TEAM_MEMBERS];
  }
}

/** React hook for the public team section. */
export function useTeam(): { members: PublicTeamMember[]; loading: boolean } {
  const [members, setMembers] = useState<PublicTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getTeamMembers()
      .then((m) => {
        if (!cancelled) {
          setMembers(m);
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
  return { members, loading };
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

/** AdminTestimonial is rendered directly by the public section. */
export type PublicTestimonial = AdminTestimonial;

/** Testimonials, live from the `testimonials` collection.
 *  Returns [] when the DB is unreachable or empty — the section then shows
 *  its "first season" placeholder instead of fake reviews. */
export async function getTestimonials(): Promise<PublicTestimonial[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'testimonials'), orderBy('createdAt', 'asc'))
    );
    return snap.docs.map((d) => {
      const { id: _docId, ...data } = d.data() as AdminTestimonial;
      return { id: d.id, ...data };
    });
  } catch {
    return [];
  }
}

/** React hook for the public testimonials section. */
export function useTestimonials(): {
  testimonials: PublicTestimonial[];
  loading: boolean;
} {
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getTestimonials()
      .then((t) => {
        if (!cancelled) {
          setTestimonials(t);
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
  return { testimonials, loading };
}

/* ------------------------------------------------------------------ */
/* Destinations                                                        */
/* ------------------------------------------------------------------ */

export interface PublicDestination {
  id: string;
  slug: string;
  name: string;
  mountainRange: string;
  tagline: string;
  image: string;
  overview: string;
  keyPeaks: string[];
  bestMonths: string;
  hubCity: string;
  accessAirport: string;
  highlights: string[];
  matchedTrekIds: string[];
}

function toPublicDestination(doc: AdminDestination & { id: string }): PublicDestination {
  return {
    id: doc.id,
    slug: doc.slug || doc.id,
    name: doc.name,
    mountainRange: doc.mountainRange,
    tagline: doc.tagline,
    image: doc.image,
    overview: doc.overview,
    keyPeaks: doc.keyPeaks ?? [],
    bestMonths: doc.bestMonths,
    hubCity: doc.hubCity,
    accessAirport: doc.accessAirport,
    highlights: doc.highlights ?? [],
    matchedTrekIds: doc.matchedTrekIds ?? [],
  };
}

/**
 * Database-first destination regions (published, admin order), with the
 * built-in region list as fallback when Firestore can't be reached.
 */
export async function getDestinations(): Promise<PublicDestination[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'destinations'), orderBy('createdAt', 'asc'))
    );
    const docs = snap.docs.map((d) => {
      const data = d.data() as AdminDestination;
      return { ...data, id: d.id };
    });
    const published = docs.filter((d) => d.published !== false);
    if (published.length === 0) return staticDestinations();
    return published
      .map(toPublicDestination)
      .sort(
        (a, b) =>
          (docs.find((d) => d.id === a.id)?.order ?? 0) -
          (docs.find((d) => d.id === b.id)?.order ?? 0)
      );
  } catch {
    return staticDestinations();
  }
}

function staticDestinations(): PublicDestination[] {
  return DESTINATION_REGIONS.map((r) => ({ ...r, slug: r.id }));
}

/** React hook for the public destinations page. */
export function useDestinations(): {
  destinations: PublicDestination[];
  loading: boolean;
} {
  const [destinations, setDestinations] = useState<PublicDestination[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    getDestinations()
      .then((d) => {
        if (!cancelled) {
          setDestinations(d);
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
  return { destinations, loading };
}
