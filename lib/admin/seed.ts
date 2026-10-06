/**
 * One-way import of the website's current static content into Firestore,
 * so the admin panel starts with real data. Run from the Dashboard.
 * Safe to re-run: docs are written with stable ids (set/merge).
 */
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from './db';
import { TREK_PACKAGES, TESTIMONIALS, BLOG_POSTS, FAQ_ITEMS } from '@/data/treks';
import { TEAM_MEMBERS } from '@/data/team';
import type {
  WebsiteSettings,
  HeroContent,
  AdminTrek,
  AdminBlog,
  AdminTeamMember,
  AdminTestimonial,
  AdminFaq,
} from './types';

async function upsert<T extends object>(collectionName: string, id: string, data: T) {
  await setDoc(
    doc(db, collectionName, id),
    // createdAt is required: list queries orderBy('createdAt') and Firestore
    // silently excludes documents that lack the ordered field.
    { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function seedSettings(): Promise<void> {
  const data: WebsiteSettings = {
    siteName: 'Trek Karakoram',
    tagline: 'Discover the Spirit of the Mountains',
    logoUrl: '/images/trekkarakoram-logo.png',
    faviconUrl: '/icon-192.png',
    phone: '+92 300 9876543',
    whatsapp: '923009876543',
    email: 'info@trekkarakoram.com',
    address: 'Skardu, Gilgit-Baltistan, Pakistan',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    tiktokUrl: '',
    footerAbout:
      'Trek Karakoram is a Skardu-based trekking company offering end-to-end guided expeditions across the Karakoram.',
    announcementBar: '',
    announcementBarEnabled: false,
    // Header/footer/hero fall back to built-in defaults when empty.
    headerMenus: [],
    headerButtons: [],
    footerColumns: [],
    hero: {
      mediaType: 'video',
      imageUrl: '',
      videoUrl: '',
      posterUrl: '',
      badge: '',
      headline: '',
      headlineAccent: '',
      subheadline: '',
      ctaPrimaryLabel: '',
      ctaPrimaryHref: '',
      ctaSecondaryLabel: '',
      ctaSecondaryHref: '',
    },
  };
  await upsert(COLLECTIONS.settings, 'website', data);
}

export async function seedHero(): Promise<void> {
  const data: HeroContent = {
    bgType: 'image',
    bgImageUrl: '/images/k2-basecamp-gondogoro-la.jpg',
    bgVideoUrl: '',
    badge: 'Local Pakistan Trekking & Expedition Team',
    headline: 'Trek deeper into the',
    headlineAccent: 'Karakoram Mountains.',
    subheadline:
      'Explore K2, Concordia, Gondogoro La, Fairy Meadows and the remote valleys of northern Pakistan with experienced local guides who know these mountains as home.',
    ctaPrimaryLabel: 'Explore Treks',
    ctaPrimaryHref: '/treks',
    ctaSecondaryLabel: 'Request Custom Expedition',
    ctaSecondaryHref: '/custom-plan',
  };
  await upsert(COLLECTIONS.hero, 'main', data);
}

export async function seedTreks(): Promise<void> {
  for (const t of TREK_PACKAGES) {
    const data: AdminTrek = {
      id: t.id,
      title: t.title,
      shortTitle: t.shortTitle,
      tagline: t.tagline,
      region: String(t.region),
      startingCity: t.startingCity,
      durationDays: t.durationDays,
      durationNights: t.durationNights,
      difficulty: String(t.difficulty),
      maxAltitude: t.maxAltitude,
      priceUSD: t.priceUSD,
      discountPriceUSD: t.discountPriceUSD ?? 0,
      rating: t.rating,
      reviewsCount: t.reviewsCount,
      featured: t.featured,
      popular: t.popular,
      published: true,
      bestSeason: t.bestSeason,
      groupSize: t.groupSize,
      image: t.image,
      gallery: t.gallery ?? [],
      overview: t.overview,
      highlights: t.highlights ?? [],
      itinerary: (t.itinerary ?? []).map((d) => ({
        day: `Day ${d.day}`,
        title: d.title,
        description: d.desc,
      })),
      inclusions: t.inclusions ?? [],
      exclusions: t.exclusions ?? [],
      permitRequirements: t.permitRequirements ?? '',
      fitnessLevel: t.fitnessLevel ?? '',
    };
    await upsert(COLLECTIONS.treks, t.id, data);
  }
}

export async function seedBlogs(): Promise<void> {
  for (const b of BLOG_POSTS) {
    const data: AdminBlog = {
      id: b.id,
      title: b.title,
      slug: b.slug,
      category: b.category,
      readTime: b.readTime,
      author: b.author,
      authorRole: b.authorRole,
      date: b.date,
      image: b.image,
      excerpt: b.excerpt,
      content: b.content ?? [],
      published: true,
    };
    await upsert(COLLECTIONS.blogs, b.id, data);
  }
}

export async function seedTeam(): Promise<void> {
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    const m = TEAM_MEMBERS[i];
    const id = `member-${i + 1}`;
    const data: AdminTeamMember = {
      id,
      name: m.name,
      title: m.title,
      image: m.image ?? '',
      bio: m.bio ?? '',
      phone: m.phone ?? '',
      whatsapp: m.whatsapp ?? '',
      email: m.email ?? '',
      order: i,
    };
    await upsert(COLLECTIONS.team, id, data);
  }
}

export async function seedTestimonials(): Promise<void> {
  for (const t of TESTIMONIALS) {
    const data: AdminTestimonial = {
      id: t.id,
      name: t.name,
      country: t.country,
      avatar: t.avatar,
      trekTaken: t.trekTaken,
      date: t.date,
      rating: t.rating,
      review: t.review,
      verified: t.verified,
    };
    await upsert(COLLECTIONS.testimonials, t.id, data);
  }
}

export async function seedFaqs(): Promise<void> {
  for (let i = 0; i < FAQ_ITEMS.length; i++) {
    const f = FAQ_ITEMS[i];
    const id = `faq-${i + 1}`;
    const data: AdminFaq = {
      id,
      category: f.category,
      question: f.question,
      answer: f.answer,
      order: i,
    };
    await upsert(COLLECTIONS.faqs, id, data);
  }
}

export async function seedAll(): Promise<void> {
  await seedSettings();
  await seedHero();
  await seedTreks();
  await seedBlogs();
  await seedTeam();
  await seedTestimonials();
  await seedFaqs();
}
