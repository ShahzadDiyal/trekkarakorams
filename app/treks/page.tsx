import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { TreksPageClient } from './TreksPageClient';
import {
  findActivityBySlug,
  findRegionBySlug,
  findDifficultyBySlug,
  facetUrl,
  slugify,
} from '@/lib/trek-facets';

interface TreksRouteProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: TreksRouteProps): Promise<Metadata> {
  const sp = await searchParams;
  const hasSearchQuery = typeof sp.q === 'string' && sp.q.trim().length > 0;

  return {
    title: 'Pakistan Trekking Packages | Trek Karakoram',
    description:
      'Explore government-licensed guided treks across the Karakoram, Western Himalayas, and Hindukush ranges. Includes permits, domestic flights, certified Balti mountain guides, and full basecamp logistics.',
    alternates: {
      // Always canonicalize back to the clean, param-free catalog URL so an
      // in-page keyword search (?q=...) never gets treated as a separate page.
      canonical: '/treks',
    },
    // A free-text search result view is dynamic/thin and shouldn't be indexed,
    // even though it's still fully crawlable/followable.
    robots: hasSearchQuery
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function TreksPage({ searchParams }: TreksRouteProps) {
  const sp = await searchParams;

  // Legacy /treks?activity=...&region=...&difficulty=... links (old bookmarks,
  // previously-indexed URLs, external backlinks) are 301-redirected to their
  // clean equivalents instead of rendering duplicate content at two URLs.
  // Priority when multiple facets are present at once (e.g. from the Hero
  // search bar): region, then difficulty, then activity. Only a single facet
  // maps to a clean URL by design (see lib/trek-facets.ts)   this avoids
  // generating combinatorial, near-duplicate indexable pages. Any leftover
  // free-text query is preserved as a non-indexed ?q= on the destination.
  const legacyActivity = typeof sp.activity === 'string' ? sp.activity : undefined;
  const legacyRegion = typeof sp.region === 'string' ? sp.region : undefined;
  const legacyDifficulty = typeof sp.difficulty === 'string' ? sp.difficulty : undefined;
  const legacyQuery = typeof sp.q === 'string' ? sp.q : undefined;

  const withQuery = (path: string) => {
    if (!legacyQuery) return path;
    return `${path}?q=${encodeURIComponent(legacyQuery)}`;
  };

  if (legacyRegion) {
    const facet = findRegionBySlug(slugify(legacyRegion));
    permanentRedirect(withQuery(facet ? facetUrl('region', facet.value) : '/treks'));
  }
  if (legacyDifficulty) {
    const facet = findDifficultyBySlug(slugify(legacyDifficulty));
    permanentRedirect(withQuery(facet ? facetUrl('difficulty', facet.value) : '/treks'));
  }
  if (legacyActivity) {
    const facet = findActivityBySlug(slugify(legacyActivity));
    permanentRedirect(withQuery(facet ? facetUrl('activity', facet.value) : '/treks'));
  }

  const initialQuery = legacyQuery || '';

  return <TreksPageClient initialQuery={initialQuery} />;
}
