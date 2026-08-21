import type { Metadata } from 'next';
import { SafetyGuidesPageClient } from './SafetyGuidesPageClient';

export const metadata: Metadata = {
  alternates: { canonical: '/safety-and-guides' },
  title: 'High-Altitude Safety & Guide Protocols | Trek Karakoram',
  description:
    'At Trek Karakoram, trekker safety and porter welfare take absolute precedence. Learn about our medical equipment, satellite monitoring, and Askari helicopter dispatch protocols.',
};

export default function SafetyGuidesPage() {
  return <SafetyGuidesPageClient />;
}
