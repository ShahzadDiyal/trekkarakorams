 
'use client';

import React, { useEffect, useState } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/treks';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  const changeTestimonial = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % TESTIMONIALS.length;
    changeTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    const previousIndex =
      (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;

    changeTestimonial(previousIndex);
  };

  /* Auto-slide */
  useEffect(() => {
    if (TESTIMONIALS.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getSupportingTestimonials = () => {
    const result = [];

    for (let i = 1; i < Math.min(4, TESTIMONIALS.length); i++) {
      result.push(
        TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]
      );
    }

    return result;
  };

  const supportingTestimonials = getSupportingTestimonials();

  return (
    <section
      id="testimonials-section"
      className="bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                From The Trail
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              What people remember.
            </h2>

            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-400">
              The mountains are different for everyone. Here is what a few
              people took home with them.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className="
                flex h-10 w-10 items-center justify-center
                border border-slate-700
                text-slate-400
                transition-colors
                hover:border-sky-400
                hover:bg-sky-400/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
              "
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className="
                flex h-10 w-10 items-center justify-center
                border border-slate-700
                text-slate-400
                transition-colors
                hover:border-sky-400
                hover:bg-sky-400/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
              "
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Featured Testimonial */}
          <div
            className={`
              lg:col-span-7
              border border-slate-700
              bg-slate-800/60
              p-6 sm:p-8 lg:p-10
              transition-all duration-350
              ${
                isTransitioning
                  ? 'opacity-50 translate-y-1'
                  : 'opacity-100 translate-y-0'
              }
            `}
          >
            <Quote className="h-10 w-10 text-sky-400/30 sm:h-12 sm:w-12" />

            {/* Stars */}
            <div className="mt-5 flex items-center gap-1">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Review */}
            <blockquote className="mt-5 max-w-2xl text-xl font-light leading-9 text-slate-200 sm:text-2xl sm:leading-10">
              “{currentTestimonial.review}”
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4 border-t border-slate-700 pt-6">

              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="h-12 w-12 rounded-full object-cover border border-slate-600"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              <div className="min-w-0">
                <div className="font-semibold text-white">
                  {currentTestimonial.name}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-sky-400" />
                    {currentTestimonial.country}
                  </span>

                  <span className="hidden text-slate-600 sm:inline">
                    •
                  </span>

                  <span>{currentTestimonial.trekTaken}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Testimonials */}
          <div className="lg:col-span-5 divide-y divide-slate-700 border border-slate-700 bg-slate-800/30">

            {supportingTestimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => {
                  const index = TESTIMONIALS.findIndex(
                    (item) => item.id === testimonial.id
                  );

                  if (index !== -1) {
                    changeTestimonial(index);
                  }
                }}
                className="
                  w-full p-5 sm:p-6
                  text-left
                  transition-colors
                  hover:bg-slate-800/70
                  cursor-pointer
                "
              >
                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {testimonial.date}
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                  “{testimonial.review}”
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-8 w-8 rounded-full object-cover border border-slate-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-200">
                      {testimonial.name}
                    </p>

                    <p className="truncate text-[10px] text-slate-500">
                      {testimonial.trekTaken}
                    </p>
                  </div>
                </div>
              </button>
            ))}

          </div>
        </div>

        {/* Navigation Progress */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">

          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => changeTestimonial(index)}
                className={`
                  h-1 transition-all duration-300 cursor-pointer
                  ${
                    index === currentIndex
                      ? 'w-8 bg-sky-400'
                      : 'w-4 bg-slate-700 hover:bg-slate-600'
                  }
                `}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          <span className="text-[10px] uppercase tracking-wider text-slate-600">
            {currentIndex + 1} / {TESTIMONIALS.length}
          </span>
        </div>

      </div>
    </section>
  );
};
 
