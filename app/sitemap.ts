import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { TREK_PACKAGES, BLOG_POSTS } from '@/data/treks';

export const dynamic = 'force-static';

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/treks', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/destinations', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/routes-map', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/planner', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/custom-plan', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/travel-styles', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/safety-and-guides', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/permits-visa-guide', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const trekEntries: MetadataRoute.Sitemap = TREK_PACKAGES.map((trek) => ({
    url: `${SITE_URL}/treks/${trek.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...trekEntries, ...blogEntries];
}
