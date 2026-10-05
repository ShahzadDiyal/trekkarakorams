import type { Metadata } from 'next';
import { FAQPageClient } from './FAQPageClient';
import { FAQ_ITEMS } from '@/data/treks';

export const metadata: Metadata = {
  title: 'Pakistan Trekking FAQs: Visa, Permits, Cost & Safety Answers | Trek Karakoram',
  description:
    'Direct, transparent answers on Pakistan trekking visas, K2 permits, altitude sickness prevention, costs, porter welfare, and booking guarantees.',
  keywords: [
    'Pakistan trekking FAQ',
    'K2 trek permit questions',
    'Pakistan visa for trekking',
    'Karakoram trekking safety',
    'altitude sickness prevention',
  ],
  alternates: { canonical: '/faq' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageClient />
    </>
  );
}
