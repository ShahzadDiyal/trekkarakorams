
'use client';

import React from 'react';
import {
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBlogs } from '@/lib/content';
import { BlogGridSkeleton } from '@/components/BlogSkeletons';

export const BlogSection: React.FC = () => {
  const router = useRouter();
  // Live posts from Firestore (static data only if the DB is unreachable).
  const { posts, loading } = useBlogs();

  return (
    <section
      id="blog-section"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-slate-100 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-500" />

              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600">
                <BookOpen className="h-3.5 w-3.5" />
                Field Notes
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Prepare for the
              <span className="block text-sky-600">
                Karakoram.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Practical guides, route knowledge and expedition advice to help
              you prepare properly for trekking in Pakistan's high mountains.
            </p>
          </div>

          {/* Season badge */}
          <div className="flex items-center gap-3 self-start border border-slate-200 bg-white px-4 py-3 shadow-sm lg:self-auto">
            <div className="flex h-9 w-9 items-center justify-center bg-sky-50">
              <Sparkles className="h-4 w-4 text-sky-600" />
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-600">
                Expedition Journal
              </div>

              <div className="mt-0.5 text-xs font-medium text-slate-600">
                Updated for the 2026 season
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BLOG GRID
        ====================================================== */}
        {loading ? (
          <BlogGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
            <article
              key={post.id}
              className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-200/60"
            >
              {/* Image */}
              <button
                type="button"
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="relative block h-[230px] w-full overflow-hidden bg-slate-100 text-left sm:h-[250px]"
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70" />

                {/* Category */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center bg-sky-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Read icon */}
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-white/30 bg-slate-950/50 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-sky-500 group-hover:text-slate-950">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </button>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Meta */}
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-sky-500" />
                    {post.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-sky-500" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <button
                  type="button"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  className="text-left"
                >
                  <h3 className="line-clamp-2 text-lg font-bold leading-7 tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-sky-600">
                    {post.title}
                  </h3>
                </button>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {post.excerpt}
                </p>

                {/* Bottom action */}
                <div className="mt-auto pt-6">
                  <div className="border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:text-sky-600"
                    >
                      <span>Read Field Guide</span>

                      <span className="flex h-8 w-8 items-center justify-center border border-slate-200 transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-50">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>
        )}

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:px-6">

          <div className="flex items-center gap-4">
            <div className="hidden h-10 w-10 items-center justify-center border border-sky-200 bg-white sm:flex">
              <MountainIcon />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Planning your first Karakoram trek?
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Start with the practical knowledge you need before you go.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push('/blog')}
            className="flex min-h-[42px] w-full items-center justify-center gap-2 border border-slate-900 bg-slate-900 px-5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-slate-950 sm:w-auto"
          >
            <span>Explore All Guides</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* Small decorative mountain mark */
const MountainIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 text-sky-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 20 6.5-11 3.2 5 2-3L21 20H3Z" />
    <path d="m9.5 9 1.5 2.5" />
  </svg>
);