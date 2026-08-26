import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  REGION_FACETS,
  findRegionBySlug,
  facetPageCopy,
} from '@/lib/trek-facets';
import { TreksPageClient } from '../../TreksPageClient';

interface RouteParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export function generateStaticParams() {
  return REGION_FACETS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const facet = findRegionBySlug(slug);
  if (!facet) return { title: 'Not Found | Trek Karakoram' };

  const copy = facetPageCopy('region', facet.value, facet.count);
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/treks/region/${facet.slug}`,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function RegionFacetPage({ params, searchParams }: RouteParams) {
  const { slug } = await params;
  const sp = await searchParams;
  const facet = findRegionBySlug(slug);

  if (!facet) {
    notFound();
  }

  const initialQuery = typeof sp.q === 'string' ? sp.q : '';

  return (
    <Suspense fallback={null}>
      <TreksPageClient lockedFacet={{ type: 'region', value: facet.value }} initialQuery={initialQuery} />
    </Suspense>
  );
}
