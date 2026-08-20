import type { Metadata } from 'next';
import { RoutesMapPageClient } from './RoutesMapPageClient';

export const metadata: Metadata = {
  title: 'Interactive Route Map | Trek Karakoram',
  description:
    'Navigate the high glaciers, technical alpine passes, and mountain massifs of Gilgit-Baltistan with our interactive geographic cartography explorer.',
};

export default function RoutesMapPage() {
  return <RoutesMapPageClient />;
}
