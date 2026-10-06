import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Native Next.js robots file (App Router convention).
 * Served at /robots.txt automatically. The sitemap is served dynamically
 * at /sitemap.xml (see app/sitemap.xml/route.ts) and always includes the
 * latest admin-published treks, blogs and destinations.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin' },
      // LLM & AI crawlers explicitly allowed (AEO / GEO indexing)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
