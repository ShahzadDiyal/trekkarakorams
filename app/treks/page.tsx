import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TreksPageClient } from './TreksPageClient';

export const metadata: Metadata = {
  alternates: { canonical: '/treks' },
  title: 'Pakistan Trekking Packages | Trek Karakoram',
  description:
    'Explore government-licensed guided treks across the Karakoram, Western Himalayas, and Hindukush ranges. Includes permits, domestic flights, certified Balti mountain guides, and full basecamp logistics.',
};

export default function TreksPage() {
  return (
    <Suspense fallback={null}>
      <TreksPageClient />
    </Suspense>
  );
}
