import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SITE_URL } from '@/lib/site';
import { TREK_PACKAGES, BLOG_POSTS, TREK_STYLES } from '@/data/treks';
import { DESTINATION_REGIONS } from '@/data/destinations';
import {
  ACTIVITY_FACETS,
  REGION_FACETS,
  DIFFICULTY_FACETS,
  BLOG_CATEGORY_FACETS,
} from '@/lib/trek-facets';
import type {
  AdminTrek,
  AdminBlog,
  AdminDestination,
  AdminGalleryItem,
} from '@/lib/admin/types';

/**
 * Dynamic sitemap — served at /sitemap.xml, generated on request (never
 * prerendered at build time), so anything created in the admin panel
 * (treks, blogs, destinations) appears automatically without a rebuild.
 * Falls back to the built-in static data when Firestore can't be reached.
 */
export const dynamic = 'force-dynamic';

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: number;
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Live published treks from Firestore, newest last (stable order). */
async function liveTrekIds(): Promise<string[]> {
  const snap = await getDocs(
    query(collection(db, 'treks'), orderBy('createdAt', 'asc'))
  );
  const ids = snap.docs
    .map((d) => ({ ...(d.data() as Omit<AdminTrek, 'id'>), id: d.id }))
    .filter((t) => t.published !== false)
    .map((t) => t.id);
  return ids.length > 0 ? ids : TREK_PACKAGES.map((t) => t.id);
}

/** Live published blog slugs from Firestore. */
async function liveBlogSlugs(): Promise<string[]> {
  const snap = await getDocs(
    query(collection(db, 'blogs'), orderBy('createdAt', 'asc'))
  );
  const slugs = snap.docs
    .map((d) => ({ ...(d.data() as Omit<AdminBlog, 'id'>), id: d.id }))
    .filter((b) => b.published !== false)
    .map((b) => b.slug || b.id)
    .filter(Boolean);
  return slugs.length > 0 ? slugs : BLOG_POSTS.map((p) => p.slug);
}

/** Live published gallery item ids from Firestore, in admin order. */
async function liveGalleryIds(): Promise<string[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'gallery'), orderBy('createdAt', 'asc'))
    );
    const ids = snap.docs
      .map((d) => {
        const data = d.data() as Omit<AdminGalleryItem, 'id'>;
        return { ...data, id: d.id };
      })
      .filter((g) => g.published !== false && g.mediaUrl)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((g) => g.id);
    return ids;
  } catch {
    return [];
  }
}

/** Live published destination slugs from Firestore, in admin order. */
async function liveDestinationSlugs(): Promise<string[]> {
  const snap = await getDocs(
    query(collection(db, 'destinations'), orderBy('createdAt', 'asc'))
  );
  const docs = snap.docs.map((d) => ({ ...(d.data() as Omit<AdminDestination, 'id'>), id: d.id }));
  const published = docs.filter((d) => d.published !== false);
  if (published.length === 0) return DESTINATION_REGIONS.map((r) => r.id);
  return published
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => d.slug || d.id)
    .filter(Boolean);
}

export async function GET() {
  const now = new Date().toISOString();

  const staticRoutes: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${SITE_URL}/treks`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${SITE_URL}/destinations`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${SITE_URL}/travel-styles`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/planner`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${SITE_URL}/custom-plan`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${SITE_URL}/routes-map`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/safety-and-guides`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/permits-visa-guide`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: 0.7 },
    { loc: `${SITE_URL}/faq`, changefreq: 'monthly', priority: 0.6 },
    { loc: `${SITE_URL}/gallery`, changefreq: 'weekly', priority: 0.7 },
    { loc: `${SITE_URL}/contact`, changefreq: 'yearly', priority: 0.5 },
    { loc: `${SITE_URL}/about`, changefreq: 'monthly', priority: 0.6 },
    { loc: `${SITE_URL}/terms`, changefreq: 'yearly', priority: 0.4 },
    { loc: `${SITE_URL}/booking`, changefreq: 'yearly', priority: 0.5 },
    { loc: `${SITE_URL}/founding-members`, changefreq: 'monthly', priority: 0.6 },
  ];

  // Live content — each settles independently so one failing collection
  // never takes down the whole sitemap.
  const [trekIds, blogSlugs, destinationSlugs, galleryIds] = await Promise.all([
    liveTrekIds().catch(() => TREK_PACKAGES.map((t) => t.id)),
    liveBlogSlugs().catch(() => BLOG_POSTS.map((p) => p.slug)),
    liveDestinationSlugs().catch(() => DESTINATION_REGIONS.map((r) => r.id)),
    liveGalleryIds().catch(() => []),
  ]);

  const entries: SitemapEntry[] = [
    ...staticRoutes,
    ...trekIds.map((id) => ({
      loc: `${SITE_URL}/treks/${id}`,
      changefreq: 'weekly',
      priority: 0.85,
    })),
    ...ACTIVITY_FACETS.map((f) => ({
      loc: `${SITE_URL}/treks/activity/${f.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    })),
    ...REGION_FACETS.map((f) => ({
      loc: `${SITE_URL}/treks/region/${f.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    })),
    ...DIFFICULTY_FACETS.map((f) => ({
      loc: `${SITE_URL}/treks/difficulty/${f.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
    })),
    ...TREK_STYLES.map((st) => ({
      loc: `${SITE_URL}/travel-styles/${st.id}`,
      changefreq: 'monthly',
      priority: 0.75,
    })),
    ...destinationSlugs.map((slug) => ({
      loc: `${SITE_URL}/destination/${slug}`,
      changefreq: 'monthly',
      priority: 0.8,
    })),
    ...galleryIds.map((id) => ({
      loc: `${SITE_URL}/gallery/${id}`,
      changefreq: 'monthly',
      priority: 0.6,
    })),
    ...blogSlugs.map((slug) => ({
      loc: `${SITE_URL}/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
    })),
    ...BLOG_CATEGORY_FACETS.map((f) => ({
      loc: `${SITE_URL}/blog/category/${f.slug}`,
      changefreq: 'monthly',
      priority: 0.55,
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n    <loc>${esc(e.loc)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
      )
      .join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache at the CDN for an hour; serve stale while refreshing in background.
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
