import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Trek Karakoram | Local Skardu Trekking Company',
  description:
    'Trek Karakoram is a government-licensed local trekking company based in Skardu, Gilgit-Baltistan — certified Balti guides, ethical porter welfare, and end-to-end expedition care.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
