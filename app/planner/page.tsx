import type { Metadata } from 'next';
import { PlannerPageClient } from './PlannerPageClient';

export const metadata: Metadata = {
  title: 'Custom Cost Estimator & Trip Planner | Trek Karakoram',
  description:
    'Calculate a custom Karakoram expedition quote based on trek, group size, and comfort tier, then book directly with our mountain planners.',
};

export default function PlannerPage() {
  return <PlannerPageClient />;
}
