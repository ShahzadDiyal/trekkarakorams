import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Trek Karakoram | Discover the Spirit of the Mountains',
  description:
    "Trek Karakoram invites you into the soul of Northern Pakistan. End-to-end guided expeditions to K2 Base Camp, Nanga Parbat, Rakaposhi, Baltoro Glacier, and Fairy Meadows with certified Balti mountaineers.",
};

export default function HomePage() {
  return <HomePageClient />;
}
