import type { Metadata } from 'next';
import { TravelStylesPageClient } from './TravelStylesPageClient';

export const metadata: Metadata = {
  title: 'Travel Styles That Match Your Ambition | Trek Karakoram',
  description:
    'From classic teahouse trekking to remote wilderness expeditions, find the Karakoram travel style that matches your ambition and comfort level.',
};

export default function TravelStylesPage() {
  return <TravelStylesPageClient />;
}
