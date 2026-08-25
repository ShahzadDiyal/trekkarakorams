import type { Metadata } from 'next';
import { DestinationsPageClient } from './DestinationsPageClient';

export const metadata: Metadata = {
  title: 'Northern Pakistan Trekking Destinations | Trek Karakoram',
  description:
    'Explore the mountain regions of Gilgit-Baltistan: Central Karakoram & K2, Hunza & Nagar, Western Himalayas, Deosai, and Shimshal & Pamir.',
};

export default function DestinationsPage() {
  return <DestinationsPageClient />;
}
