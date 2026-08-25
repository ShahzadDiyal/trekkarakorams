import type { Metadata } from 'next';
import { CustomPlanPageClient } from './CustomPlanPageClient';

export const metadata: Metadata = {
  title: 'Request A Custom Expedition Plan | Trek Karakoram',
  description:
    'Tell us your dream Karakoram itinerary and our mountain planners will design a fully custom trekking expedition for you.',
};

export default function CustomPlanPage() {
  return <CustomPlanPageClient />;
}
