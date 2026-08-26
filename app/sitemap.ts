import type { MetadataRoute } from 'next';
import { TREK_PACKAGES, BLOG_POSTS } from '@/data/treks';
import {
  ACTIVITY_FACETS,
  REGION_FACETS,
  DIFFICULTY_FACETS,
  BLOG_CATEGORY_FACETS,
} from '@/lib/trek-facets';

export const SITE_URL = 'https://karakoramexpeditions.com';

/**
 * Native Next.js sitemap (App Router convention).
 * Served at /sitemap.xml automatically, generated at build time,
 * and always stays in sync with the real trek/blog data instead of
 * a hand-maintained static XML file that can silently go stale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/treks`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/planner`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/custom-plan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/routes-map`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/travel-styles`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/safety-and-guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/permits-visa-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const trekRoutes: MetadataRoute.Sitemap = TREK_PACKAGES.map((trek) => ({
    url: `${SITE_URL}/treks/${trek.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Clean, crawlable facet catalog pages (replaces the old /treks?activity=...
  // style query-string URLs). Only generated for facet values that actually
  // have matching treks, so there are never any thin/empty listing pages.
  const activityFacetRoutes: MetadataRoute.Sitemap = ACTIVITY_FACETS.map((f) => ({
    url: `${SITE_URL}/treks/activity/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const regionFacetRoutes: MetadataRoute.Sitemap = REGION_FACETS.map((f) => ({
    url: `${SITE_URL}/treks/region/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const difficultyFacetRoutes: MetadataRoute.Sitemap = DIFFICULTY_FACETS.map((f) => ({
    url: `${SITE_URL}/treks/difficulty/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogCategoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORY_FACETS.map((f) => ({
    url: `${SITE_URL}/blog/category/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.55,
  }));

  return [
    ...staticRoutes,
    ...trekRoutes,
    ...activityFacetRoutes,
    ...regionFacetRoutes,
    ...difficultyFacetRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
  ];
}
