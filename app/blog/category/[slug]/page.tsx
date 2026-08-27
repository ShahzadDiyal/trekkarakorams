import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_CATEGORY_FACETS, findBlogCategoryBySlug } from '@/lib/trek-facets';
import { BlogPageClient } from '../../BlogPageClient';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Only pre-render categories that actually have published posts. */
export function generateStaticParams() {
  return BLOG_CATEGORY_FACETS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const facet = findBlogCategoryBySlug(slug);
  if (!facet) return { title: 'Not Found | Trek Karakoram' };

  return {
    title: `${facet.value} | Trek Karakoram Blog`,
    description: `${facet.count} in-depth ${facet.value.toLowerCase()} articles from certified Karakoram mountain leaders   guides, logistics, and practical advice for Pakistan trekking.`,
    alternates: {
      canonical: `/blog/category/${facet.slug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: RouteParams) {
  const { slug } = await params;
  const facet = findBlogCategoryBySlug(slug);

  if (!facet) {
    notFound();
  }

  return <BlogPageClient lockedCategory={facet.value} />;
}
