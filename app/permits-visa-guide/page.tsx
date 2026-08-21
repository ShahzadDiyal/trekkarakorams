import type { Metadata } from 'next';
import { PermitsVisaGuidePageClient } from './PermitsVisaGuidePageClient';

export const metadata: Metadata = {
  alternates: { canonical: '/permits-visa-guide' },
  title: 'Pakistan Trekking Visa & Permits Guide | Trek Karakoram',
  description:
    'Everything you need to know about the Pakistan Online E-Visa system, Letter of Invitation (LOI), restricted area trekking permits for K2 Base Camp, and Gilgit-Baltistan government clearances.',
};

export default function PermitsVisaGuidePage() {
  return <PermitsVisaGuidePageClient />;
}
