import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  ACTIVITY_FACETS,
  findActivityBySlug,
  facetPageCopy,
} from '@/lib/trek-facets';
import { TreksPageClient } from '../../TreksPageClient';

interface RouteParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/** Only pre-render slugs that actually have matching treks — no thin/empty pages. */
export function generateStaticParams() {
  return ACTIVITY_FACETS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const facet = findActivityBySlug(slug);
  if (!facet) return { title: 'Not Found | Trek Karakoram' };

  const copy = facetPageCopy('activity', facet.value, facet.count);
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      // Self-referencing canonical: this facet page is its own canonical URL,
      // even when a non-indexed ?q= search refinement is present in the URL.
      canonical: `/treks/activity/${facet.slug}`,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function ActivityFacetPage({ params, searchParams }: RouteParams) {
  const { slug } = await params;
  const sp = await searchParams;
  const facet = findActivityBySlug(slug);

  // Unknown/invalid slug -> real 404, never a soft-404 fallback to the full catalog.
  if (!facet) {
    notFound();
  }

  const initialQuery = typeof sp.q === 'string' ? sp.q : '';

  return (
    <Suspense fallback={null}>
      <TreksPageClient lockedFacet={{ type: 'activity', value: facet.value }} initialQuery={initialQuery} />
    </Suspense>
  );
}
