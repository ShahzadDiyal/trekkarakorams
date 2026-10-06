'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Quote, Star, BadgeCheck } from 'lucide-react';
import { useTestimonials, type PublicTestimonial } from '@/lib/content';

function TestimonialSkeleton() {
  return (
    <div
      className="flex flex-col rounded-2xl border border-slate-700 bg-slate-800/70 p-6"
      aria-label="Loading review"
    >
      <div className="skeleton-shimmer h-4 w-full rounded" aria-hidden="true" />
      <div className="skeleton-shimmer mt-2 h-4 w-full rounded" aria-hidden="true" />
      <div className="skeleton-shimmer mt-2 h-4 w-3/4 rounded" aria-hidden="true" />
      <div className="mt-6 flex items-center gap-3">
        <div className="skeleton-shimmer h-10 w-10 rounded-full" aria-hidden="true" />
        <div className="flex-1">
          <div className="skeleton-shimmer h-4 w-32 rounded" aria-hidden="true" />
          <div className="skeleton-shimmer mt-1.5 h-3 w-24 rounded" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'text-slate-600'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: PublicTestimonial }) {
  return (
    <figure className="flex flex-col rounded-2xl border border-slate-700 bg-slate-800/70 p-6">
      <Quote className="h-6 w-6 text-sky-400" aria-hidden="true" />
      <div className="mt-3">
        <Stars rating={t.rating || 5} />
      </div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-7 text-slate-300">
        &ldquo;{t.review}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-700 pt-4">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
            {t.name
              .split(' ')
              .map((p) => p.charAt(0))
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-white">{t.name}</span>
            {t.verified && (
              <BadgeCheck
                className="h-4 w-4 shrink-0 text-emerald-400"
                aria-label="Verified trekker"
              />
            )}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-400">
            {[t.country, t.trekTaken].filter(Boolean).join(' · ')}
            {t.date ? ` · ${t.date}` : ''}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/** "First season" placeholder — shown when no testimonials exist yet. */
function EmptyPlaceholder() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Quote Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center border border-slate-700 bg-slate-800/70">
        <Quote className="h-6 w-6 text-sky-400" />
      </div>

      {/* Heading */}
      <h2 className="mt-7 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Your story could be here.
      </h2>

      {/* Body */}
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
        Trek Karakoram is in its first season. Our first guests are on
        their way. When they return, their words go in this section
        exactly as they wrote them, unedited and in full.
      </p>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/founding-members"
          className="group inline-flex items-center justify-center gap-2 bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
        >
          Be One of the First

          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Trust Note */}
      <div className="mt-8 border-t border-slate-800 pt-5">
        <p className="text-xs uppercase tracking-wider text-slate-600">
          Guest words · Unedited · Published after each expedition
        </p>
      </div>
    </div>
  );
}

export const TestimonialsSection: React.FC = () => {
  // Live testimonials from Firestore — the section shows real reviews once
  // the admin adds them; until then the "first season" placeholder stays.
  const { testimonials, loading } = useTestimonials();

  return (
    <section
      id="testimonials-section"
      className="border-b border-slate-800 bg-slate-900 text-white"
    >
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-400" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              Voices From The Karakoram
            </span>

            <span className="h-px w-10 bg-sky-400" />
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <>
            <h2 className="mx-auto mt-2 max-w-3xl text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What our trekkers say
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/founding-members"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-sky-400 hover:text-sky-300"
              >
                Trek With Us
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </>
        ) : (
          <EmptyPlaceholder />
        )}

      </div>
    </section>
  );
};
