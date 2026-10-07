import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery: Trekking Photos & Reels from the Karakoram | Trek Karakoram',
  description:
    'Photos and reels from our Karakoram expeditions — K2 base camp, Gondogoro La, Hunza valley and beyond, captured by our local team.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Trek Karakoram Gallery',
    description: 'Photos and reels from the Karakoram mountains.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
