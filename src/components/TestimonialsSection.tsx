import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/treks';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-14 bg-white border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Verified Trekkers
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mt-1">
              What Our Climbers Say
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Read authentic feedback from international trekkers who explored Karakoram with us.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 border border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Carousel – visible only on small screens (< md) */}
        <div className="block md:hidden">
          <div className="p-5 flex flex-col justify-between border bg-sky-50/70 border-sky-400 transition-all">
            <div>
              {/* Rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500">{currentTestimonial.date}</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "{currentTestimonial.review}"
              </p>
            </div>

            {/* Author & Country */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center gap-3">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-9 h-9 object-cover rounded-none border border-slate-300 shrink-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                  <span>{currentTestimonial.name}</span>
                  <ShieldCheck className="w-3 h-3 text-sky-600 shrink-0" />
                </div>
                <div className="text-[11px] text-sky-700 font-medium truncate">
                  {currentTestimonial.country} • {currentTestimonial.trekTaken.split('&')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Optional dots indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-sky-600' : 'w-1.5 bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid – visible on md and up */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`p-5 flex flex-col justify-between border transition-all ${
                idx === currentIndex
                  ? 'bg-sky-50/70 border-sky-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{t.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{t.review}"
                </p>
              </div>

              {/* Author & Country */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 object-cover rounded-none border border-slate-300 shrink-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                    <span>{t.name}</span>
                    <ShieldCheck className="w-3 h-3 text-sky-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-sky-700 font-medium truncate">
                    {t.country} • {t.trekTaken.split('&')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};