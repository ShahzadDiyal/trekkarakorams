import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TravelStylesPageClient } from '../TravelStylesPageClient';
import { TREK_STYLES } from '@/data/treks';
import { SITE_NAME } from '@/lib/site';

interface StyleRouteParams {
  params: Promise<{ style: string }>;
}

/** Pre-render every travel-style page at build time. */
export function generateStaticParams() {
  return TREK_STYLES.map((style) => ({ style: style.id }));
}

export async function generateMetadata({ params }: StyleRouteParams): Promise<Metadata> {
  const { style } = await params;
  const data = TREK_STYLES.find((s) => s.id === style);

  if (!data) {
    return { title: 'Travel Style Not Found | Trek Karakoram' };
  }

  return {
    title: `${data.title} | ${SITE_NAME}`,
    description: data.description,
    alternates: { canonical: `/travel-styles/${data.id}` },
    openGraph: {
      title: `${data.title} | ${SITE_NAME}`,
      description: data.description,
      images: data.image ? [{ url: data.image }] : undefined,
      type: 'website',
    },
  };
}

export default async function TravelStylePage({ params }: StyleRouteParams) {
  const { style } = await params;
  const data = TREK_STYLES.find((s) => s.id === style);

  if (!data) {
    notFound();
  }

  return <TravelStylesPageClient activeStyleId={data.id} />;
}
