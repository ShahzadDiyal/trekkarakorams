 
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials-section"
      className="border-b border-slate-800 bg-slate-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-400" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              Voices From The Karakoram
            </span>

            <span className="h-px w-10 bg-sky-400" />
          </div>

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
      </div>
    </section>
  );
};
 
