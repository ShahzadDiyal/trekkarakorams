import type { Metadata } from 'next';
import { FAQPageClient } from './FAQPageClient';

export const metadata: Metadata = {
  title: 'Pakistan Trekking FAQs & Answers | Trek Karakoram',
  description:
    'Direct, transparent answers regarding mountain logistics, E-Visas, altitude sickness prevention, meal sanitation, porter welfare, and booking guarantees.',
};

export default function FAQPage() {
  return <FAQPageClient />;
}
