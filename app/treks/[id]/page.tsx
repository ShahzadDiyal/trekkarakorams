import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TREK_PACKAGES } from '@/data/treks';
import { TrekDetailPageClient } from './TrekDetailPageClient';

interface TrekDetailRouteParams {
  params: Promise<{ id: string }>;
}

/** Pre-render every trek package at build time. */
export function generateStaticParams() {
  return TREK_PACKAGES.map((trek) => ({ id: trek.id }));
}

/** Server-side lookup so <title>/description reflect the actual trek being viewed. */
export async function generateMetadata({ params }: TrekDetailRouteParams): Promise<Metadata> {
  const { id } = await params;
  const trek = TREK_PACKAGES.find((t) => t.id === id);

  if (!trek) {
    return { title: 'Trek Not Found | Trek Karakoram' };
  }

  return {
    title: `${trek.title} | Trek Karakoram`,
    description: trek.tagline || trek.overview,
    openGraph: {
      title: trek.title,
      description: trek.tagline || trek.overview,
      images: trek.image ? [{ url: trek.image }] : undefined,
    },
  };
}

export default async function TrekDetailPage({ params }: TrekDetailRouteParams) {
  const { id } = await params;
  const trek = TREK_PACKAGES.find((t) => t.id === id);

  // Server-side 404 for unknown trek ids, instead of silently falling back to TREK_PACKAGES[0]
  if (!trek) {
    notFound();
  }

  return <TrekDetailPageClient trek={trek} />;
}
