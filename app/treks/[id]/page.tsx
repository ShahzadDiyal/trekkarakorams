import type { Metadata } from 'next';
import { TREK_PACKAGES, TREK_FAQS } from '@/data/treks';
import { DEPARTURE_STATUS_LABEL } from '@/types';
import { SITE_URL, SITE_NAME } from '@/lib/site';
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

  // Keyword-led title targeting: "[Trek] 2026: cost, itinerary, dates" queries
  const price = trek.discountPriceUSD || trek.priceUSD;
  return {
    title: `${trek.title} 2026: Cost ($${price}), Itinerary & Dates | ${SITE_NAME}`,
    description: `${trek.title} — ${trek.durationDays} days, max ${trek.maxAltitude.toLocaleString()}m, from $${price}/person. ${trek.tagline} Guided by certified Balti mountaineers.`,
    keywords: [
      trek.title,
      `${trek.shortTitle} cost`,
      `${trek.shortTitle} itinerary`,
      `${trek.shortTitle} 2026 dates`,
      'Karakoram trekking',
      'Pakistan trekking tours',
      trek.region,
    ],
    alternates: { canonical: `/treks/${trek.id}` },
    openGraph: {
      title: `${trek.title} | ${SITE_NAME}`,
      description: trek.tagline || trek.overview,
      images: trek.image ? [{ url: trek.image }] : undefined,
      type: 'article',
    },
  };
}

/** TouristTrip + BreadcrumbList + FAQPage JSON-LD for rich results and AI answers. */
function trekJsonLd(trek: (typeof TREK_PACKAGES)[number]) {
  const price = trek.discountPriceUSD || trek.priceUSD;
  const url = `${SITE_URL}/treks/${trek.id}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        '@id': `${url}#trip`,
        name: trek.title,
        description: trek.overview,
        url,
        image: [trek.image, ...trek.gallery].filter(Boolean),
        touristType: 'Trekkers',
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: trek.itinerary.length,
          itemListElement: trek.itinerary.map((day, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `Day ${day.day}: ${day.title}`,
            description: day.desc,
          })),
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: trek.basicPriceUSD || Math.round(price * 0.75),
          highPrice: trek.premiumPriceUSD || Math.round(price * 1.35),
          offerCount: 3,
          offers: trek.departures
            .filter((d) => d.status !== 'soldout')
            .map((d) => ({
              '@type': 'Offer',
              name: `${trek.title} — ${d.date} (${DEPARTURE_STATUS_LABEL[d.status]})`,
              price,
              priceCurrency: 'USD',
              availability:
                d.status === 'limited'
                  ? 'https://schema.org/LimitedAvailability'
                  : 'https://schema.org/InStock',
              url,
            })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: trek.rating,
          reviewCount: trek.reviewsCount,
          bestRating: 5,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Treks', item: `${SITE_URL}/treks` },
          { '@type': 'ListItem', position: 3, name: trek.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: TREK_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export default async function TrekDetailPage({ params }: TrekDetailRouteParams) {
  const { id } = await params;
  const trek = TREK_PACKAGES.find((t) => t.id === id);

  // Unknown ids (e.g. treks created in the admin panel after build) render
  // client-side: the client resolves them from Firestore and shows a
  // not-found state only if the database doesn't have them either.
  // Static treks keep their server-rendered JSON-LD for rich results.
  return (
    <>
      {trek && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trekJsonLd(trek)) }}
        />
      )}
      <TrekDetailPageClient trekId={id} />
    </>
  );
}
