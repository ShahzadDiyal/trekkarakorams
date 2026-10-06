'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBlogs } from '@/lib/content';
import { BlogGridSkeleton } from '@/components/BlogSkeletons';
import { BLOG_CATEGORY_FACETS, blogCategoryUrl } from '@/lib/trek-facets';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

interface BlogPageClientProps {
  /** Set only on /blog/category/[slug] routes   hard-applied via the URL, never a query string. */
  lockedCategory?: string;
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ lockedCategory }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  // Live posts from Firestore (static data only if the DB is unreachable).
  const { posts: allPosts, loading } = useBlogs();

  const filteredPosts = allPosts.filter((post) => {
    const matchesCat = !lockedCategory || post.category === lockedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const pageHeading = lockedCategory ? lockedCategory : 'Pakistan Mountain Guides & Journal';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-sky-600">Pakistan Trekking Guides & Expedition Blog</Link>
          {lockedCategory && (
            <>
              <span>/</span>
              <span className="font-semibold text-slate-900">{lockedCategory}</span>
            </>
          )}
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            High Altitude Knowledge Base
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            {pageHeading}
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
            In-depth guides, visa procedures, training schedules, and gear packing lists curated by certified Karakoram mountain leaders.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white  p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={`px-3 py-1.5 text-[14px] font-bold transition-colors cursor-pointer border ${
                !lockedCategory
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'
              }`}
            >
              ALL
            </Link>
            {BLOG_CATEGORY_FACETS.map((c) => (
              <Link
                key={c.slug}
                href={blogCategoryUrl(c.value)}
                className={`px-3 py-1.5 text-[14px] font-bold transition-colors cursor-pointer border ${
                  lockedCategory === c.value
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'
                }`}
              >
                {c.value}
              </Link>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 pl-9 pr-3 py-1.5 text-[14px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <BlogGridSkeleton count={6} />
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white  flex flex-col justify-between hover:border-sky-500 transition-colors"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-sky-600 text-white text-[11px] font-bold px-2 py-0.5">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-600" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-600" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="text-[16px] font-bold text-slate-900 hover:text-sky-600 cursor-pointer transition-colors"
                    >
                      {post.title}
                    </h2>

                    <p className="text-[13px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="w-full bg-slate-50 hover:bg-sky-500 hover:text-white text-sky-700 font-bold text-[14px] py-2 px-3  hover:border-sky-500 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-300 p-12 text-center mb-12">
            <h3 className="text-[16px] font-bold text-slate-900">No matching articles found</h3>
            <p className="text-[13px] text-slate-600 mt-1 max-w-md mx-auto">
              Try a different search term, or browse all articles.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 bg-sky-600 text-white font-bold text-[14px] px-4 py-2 hover:bg-sky-500 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
