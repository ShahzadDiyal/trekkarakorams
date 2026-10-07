import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AdminGalleryItem } from '@/lib/admin/types';
import { GalleryDetailClient } from './GalleryDetailClient';
import type { PublicGalleryItem } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

interface GalleryRouteParams {
  params: Promise<{ id: string }>;
}

async function fetchItem(id: string): Promise<PublicGalleryItem | null> {
  try {
    const snap = await getDoc(doc(db, 'gallery', id));
    if (!snap.exists()) return null;
    const data = snap.data() as Omit<AdminGalleryItem, 'id'>;
    if (data.published === false || !data.mediaUrl) return null;
    const ts = (snap.data() as { createdAt?: { toDate?: () => Date } }).createdAt;
    return {
      id: snap.id,
      type: data.type === 'reel' ? 'reel' : 'post',
      title: data.title || '',
      description: data.description || '',
      mediaUrl: data.mediaUrl || '',
      thumbnailUrl: data.thumbnailUrl || '',
      location: data.location || '',
      trekId: data.trekId || '',
      reactions: data.reactions ?? {},
      createdAt:
        ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : '',
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: GalleryRouteParams): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem(id);
  if (!item) return { title: 'Gallery | Trek Karakoram' };
  const title = item.title || (item.type === 'reel' ? 'Reel' : 'Photo');
  return {
    title: `${title} | Trek Karakoram Gallery`,
    description:
      item.description.slice(0, 150) ||
      'A moment from our Karakoram expeditions.',
    alternates: { canonical: `/gallery/${item.id}` },
    openGraph: {
      title: `${title} | Trek Karakoram`,
      description: item.description.slice(0, 150),
      images: item.thumbnailUrl
        ? [{ url: item.thumbnailUrl }]
        : item.type === 'post'
          ? [{ url: item.mediaUrl }]
          : undefined,
      type: 'website',
    },
  };
}

export default async function GalleryDetailPage({ params }: GalleryRouteParams) {
  const { id } = await params;
  const item = await fetchItem(id);
  if (!item) notFound();
  return <GalleryDetailClient item={item} />;
}
