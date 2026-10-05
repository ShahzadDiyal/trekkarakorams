import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'K2 Base Camp Treks & Karakoram Expeditions 2026 | Trek Karakoram',
  description:
    "Guided K2 Base Camp, Gondogoro La, Nanga Parbat & Rakaposhi treks in Pakistan 2026 — guaranteed departures, transparent pricing from $1,350, certified Balti guides, permits handled.",
  keywords: [
    'K2 Base Camp trek',
    'Karakoram trekking Pakistan',
    'Pakistan trekking company',
    'Gondogoro La trek',
    'Nanga Parbat base camp trek',
    'guided expeditions Pakistan',
  ],
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
