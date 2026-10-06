import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/treks';
import { SITE_URL, SITE_NAME } from '@/lib/site';
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
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : undefined,
      type: 'article',
      authors: [SITE_NAME],
    },
  };
}

/** BlogPosting + BreadcrumbList JSON-LD for article rich results and AI citations. */
function blogJsonLd(post: (typeof BLOG_POSTS)[number]) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image ? [`${SITE_URL}${post.image}`] : undefined,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        datePublished: post.date,
        mainEntityOfPage: url,
        articleBody: post.content.join('\n\n'),
        about: { '@type': 'Place', name: 'Karakoram, Pakistan' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export default async function BlogPostPage({ params }: BlogPostRouteParams) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(post)) }}
      />
      <BlogPostPageClient post={post} />
    </>
  );
}
