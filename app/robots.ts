import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Native Next.js robots file (App Router convention).
 * Served at /robots.txt automatically and shares SITE_URL with sitemap.ts
 * so the Sitemap: line can never drift out of sync with the real domain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
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
