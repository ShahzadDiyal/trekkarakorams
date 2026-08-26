import { TREK_PACKAGES } from '@/data/treks';
import type { TrekPackage } from '@/types';

/**
 * Central source of truth for turning trek facets (activity / region / difficulty)
 * into clean, crawlable URL slugs — and back again.
 *
 * Why this file exists:
 * Facet lists here are DERIVED from the real TREK_PACKAGES data instead of being
 * hand-typed, so a static route can never be generated for a facet value that has
 * zero matching treks (which would otherwise produce a thin/empty "0 results" page —
 * bad for SEO and a soft-404 risk). It also means a slug page can never silently
 * drift out of sync with the dataset.
 */

export type FacetType = 'activity' | 'region' | 'difficulty';

export interface FacetOption {
  /** Exact value as stored on TrekPackage, e.g. "Pass Crossing" */
  value: string;
  /** URL-safe slug, e.g. "pass-crossing" */
  slug: string;
  count: number;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFacets(values: string[]): FacetOption[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return Array.from(counts.entries()).map(([value, count]) => ({
    value,
    slug: slugify(value),
    count,
  }));
}

export const ACTIVITY_FACETS: FacetOption[] = buildFacets(
  TREK_PACKAGES.map((t) => t.activityType)
);

export const REGION_FACETS: FacetOption[] = buildFacets(
  TREK_PACKAGES.map((t) => t.region)
);

export const DIFFICULTY_FACETS: FacetOption[] = buildFacets(
  TREK_PACKAGES.map((t) => t.difficulty)
);

function findFacet(list: FacetOption[], slug: string): FacetOption | undefined {
  return list.find((f) => f.slug === slug);
}

export function findActivityBySlug(slug: string) {
  return findFacet(ACTIVITY_FACETS, slug);
}
export function findRegionBySlug(slug: string) {
  return findFacet(REGION_FACETS, slug);
}
export function findDifficultyBySlug(slug: string) {
  return findFacet(DIFFICULTY_FACETS, slug);
}

/** True only when a real facet page exists for this value (has matching treks). */
export function isKnownActivity(value: string) {
  return ACTIVITY_FACETS.some((f) => f.value === value);
}
export function isKnownRegion(value: string) {
  return REGION_FACETS.some((f) => f.value === value);
}
export function isKnownDifficulty(value: string) {
  return DIFFICULTY_FACETS.some((f) => f.value === value);
}

/** Canonical clean-URL builder — the ONLY place that should know the /treks/... shape. */
export function facetUrl(type: FacetType, value: string): string {
  return `/treks/${type}/${slugify(value)}`;
}

const FACET_LABEL: Record<FacetType, string> = {
  activity: 'Activity',
  region: 'Region',
  difficulty: 'Difficulty',
};

const FACET_NOUN: Record<FacetType, string> = {
  activity: '',
  region: 'treks',
  difficulty: 'treks',
};

/** Human copy for <title>/<meta description> on a facet page — kept unique per value. */
export function facetPageCopy(type: FacetType, value: string, count: number) {
  if (type === 'activity') {
    return {
      title: `${value} in Pakistan | ${count} Guided ${value} Packages | Trek Karakoram`,
      description: `Browse ${count} government-licensed ${value.toLowerCase()} packages across the Karakoram, Himalayas, and Hindukush. Certified Balti guides, permits, and full logistics included.`,
      heading: `${value} in Pakistan`,
    };
  }
  if (type === 'region') {
    return {
      title: `${value} Trekking Packages | ${count} Itineraries | Trek Karakoram`,
      description: `Explore ${count} guided trekking and expedition itineraries in ${value}, Pakistan. Government permits, certified mountain guides, and complete basecamp logistics included.`,
      heading: `${value} Treks`,
    };
  }
  return {
    title: `${value} Difficulty Treks in Pakistan | ${count} Itineraries | Trek Karakoram`,
    description: `Browse ${count} ${value.toLowerCase()}-rated trekking and expedition packages in Pakistan, graded for fitness and altitude experience. Certified guides and full logistics included.`,
    heading: `${value} Treks`,
  };
}

export function facetLabel(type: FacetType) {
  return FACET_LABEL[type];
}

export function filterTreksByFacet(
  type: FacetType,
  value: string
): TrekPackage[] {
  if (type === 'activity') return TREK_PACKAGES.filter((t) => t.activityType === value);
  if (type === 'region') return TREK_PACKAGES.filter((t) => t.region === value);
  return TREK_PACKAGES.filter((t) => t.difficulty === value);
}

// ---------------------------------------------------------------------------
// Blog category facets — same "derive from real data" principle as above, so
// a /blog/category/[slug] page can never be generated for an empty category.
// ---------------------------------------------------------------------------
import { BLOG_POSTS } from '@/data/treks';

export const BLOG_CATEGORY_FACETS: FacetOption[] = buildFacets(
  BLOG_POSTS.map((p) => p.category)
);

export function findBlogCategoryBySlug(slug: string) {
  return findFacet(BLOG_CATEGORY_FACETS, slug);
}

export function blogCategoryUrl(value: string): string {
  return `/blog/category/${slugify(value)}`;
}
