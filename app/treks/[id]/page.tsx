import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TREK_PACKAGES } from '@/data/treks';
import { TrekDetailPageClient } from './TrekDetailPageClient';
import { SITE_URL } from '@/lib/site';

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
    alternates: { canonical: `/treks/${trek.id}` },
    openGraph: {
      title: trek.title,
      description: trek.tagline || trek.overview,
      type: 'website',
      images: trek.image ? [{ url: trek.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: trek.title,
      description: trek.tagline || trek.overview,
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

  const price = trek.discountPriceUSD || trek.priceUSD;

  const tripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trek.title,
    description: trek.tagline || trek.overview,
    image: trek.image ? [trek.image, ...trek.gallery] : trek.gallery,
    touristType: trek.activityType,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: trek.itinerary.map((day) => ({
        '@type': 'ListItem',
        position: day.day,
        name: day.title,
        description: day.desc,
      })),
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/treks/${trek.id}`,
    },
    aggregateRating:
      trek.reviewsCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: trek.rating,
            reviewCount: trek.reviewsCount,
          }
        : undefined,
    provider: {
      '@type': 'TravelAgency',
      name: 'Trek Karakoram',
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Treks', item: `${SITE_URL}/treks` },
      { '@type': 'ListItem', position: 3, name: trek.title, item: `${SITE_URL}/treks/${trek.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TrekDetailPageClient trek={trek} />
    </>
  );
}
