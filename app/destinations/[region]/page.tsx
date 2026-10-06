import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DestinationsPageClient, DESTINATION_REGIONS } from '../DestinationsPageClient';
import { SITE_NAME } from '@/lib/site';

interface RegionRouteParams {
  params: Promise<{ region: string }>;
}

/** Pre-render every region page at build time. */
export function generateStaticParams() {
  return DESTINATION_REGIONS.map((region) => ({ region: region.id }));
}

export async function generateMetadata({ params }: RegionRouteParams): Promise<Metadata> {
  const { region } = await params;
  const data = DESTINATION_REGIONS.find((r) => r.id === region);

  if (!data) {
    return { title: 'Destination Not Found | Trek Karakoram' };
  }

  return {
    title: `${data.name} Treks & Travel Guide | ${SITE_NAME}`,
    description: `${data.tagline}. ${data.overview.slice(0, 140)}…`,
    alternates: { canonical: `/destinations/${data.id}` },
    openGraph: {
      title: `${data.name} | ${SITE_NAME}`,
      description: data.tagline,
      images: data.image ? [{ url: data.image }] : undefined,
      type: 'website',
    },
  };
}

export default async function DestinationRegionPage({ params }: RegionRouteParams) {
  const { region } = await params;
  const data = DESTINATION_REGIONS.find((r) => r.id === region);

  if (!data) {
    notFound();
  }

  // key forces a fresh client state per region URL.
  return <DestinationsPageClient key={data.id} initialRegionId={data.id} />;
}
