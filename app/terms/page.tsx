import type { Metadata } from 'next';
import { TermsPageClient } from './TermsPageClient';

export const metadata: Metadata = {
  title: 'Booking Terms: Deposits, Cancellation & Refund Policy | Trek Karakoram',
  description:
    'Transparent booking terms for Trek Karakoram expeditions: 20% deposit, tiered cancellation policy, guaranteed departures, and operator cancellation guarantees.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
