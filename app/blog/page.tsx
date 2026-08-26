import type { Metadata } from 'next';
import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Pakistan Mountain Guides & Journal | Trek Karakoram',
  description:
    'In-depth guides, visa procedures, training schedules, and gear packing lists curated by certified Karakoram mountain leaders.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
