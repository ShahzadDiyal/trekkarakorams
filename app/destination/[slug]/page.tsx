import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DestinationsPageClient } from '../../destinations/DestinationsPageClient';
import { DESTINATION_REGIONS } from '@/data/destinations';
import type { AdminDestination } from '@/lib/admin/types';
import { SITE_NAME } from '@/lib/site';

interface DestinationRouteParams {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known region page at build time. */
export function generateStaticParams() {
  return DESTINATION_REGIONS.map((region) => ({ slug: region.id }));
}

interface RegionMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  overview: string;
}

/** Static list first, live database second (for admin-added regions). */
async function findRegion(slug: string): Promise<RegionMeta | null> {
  const slugLower = slug.toLowerCase();
  const statik = DESTINATION_REGIONS.find(
    (r) => r.id.toLowerCase() === slugLower
  );
  if (statik) {
    return {
      id: statik.id,
      slug: statik.id,
      name: statik.name,
      tagline: statik.tagline,
      image: statik.image,
      overview: statik.overview,
    };
  }
  try {
    const snap = await getDocs(
      query(collection(db, 'destinations'), where('published', '==', true))
    );
    const match = snap.docs
      .map((d) => {
        const data = d.data() as Omit<AdminDestination, 'id'>;
        return { ...data, id: d.id };
      })
      .find(
        (d) =>
          (d.slug || d.id).toLowerCase() === slugLower ||
          d.id.toLowerCase() === slugLower
      );
    if (match) {
      return {
        id: match.id,
        slug: match.slug || match.id,
        name: match.name,
        tagline: match.tagline,
        image: match.image,
        overview: match.overview,
      };
    }
  } catch {
    // Fall through to 404.
  }
  return null;
}

export async function generateMetadata({
  params,
}: DestinationRouteParams): Promise<Metadata> {
  const { slug } = await params;
  const data = await findRegion(slug);

  if (!data) {
    return { title: 'Destination Not Found | Trek Karakoram' };
  }

  return {
    title: `${data.name} Treks & Travel Guide | ${SITE_NAME}`,
    description: `${data.tagline}. ${data.overview.slice(0, 140)}…`,
    alternates: { canonical: `/destination/${data.slug}` },
    openGraph: {
      title: `${data.name} | ${SITE_NAME}`,
      description: data.tagline,
      images: data.image ? [{ url: data.image }] : undefined,
      type: 'website',
    },
  };
}

export default async function DestinationPage({ params }: DestinationRouteParams) {
  const { slug } = await params;
  const data = await findRegion(slug);

  if (!data) {
    notFound();
  }

  // key forces a fresh client state per destination URL.
  return <DestinationsPageClient key={data.id} initialRegionId={data.slug} />;
}
