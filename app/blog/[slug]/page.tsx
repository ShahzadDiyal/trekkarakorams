import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/treks';
import { BlogPostPageClient } from './BlogPostPageClient';

interface BlogPostRouteParams {
  params: Promise<{ slug: string }>;
}

/** Pre-render every blog post at build time. */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostRouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article Not Found | Trek Karakoram' };
  }

  return {
    title: `${post.title} | Trek Karakoram`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostRouteParams) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageClient post={post} />;
}
