import type { Metadata } from 'next';
import { FAQPageClient } from './FAQPageClient';
import { FAQ_ITEMS } from '@/data/treks';

export const metadata: Metadata = {
  alternates: { canonical: '/faq' },
  title: 'Pakistan Trekking FAQs & Answers | Trek Karakoram',
  description:
    'Direct, transparent answers regarding mountain logistics, E-Visas, altitude sickness prevention, meal sanitation, porter welfare, and booking guarantees.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
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
