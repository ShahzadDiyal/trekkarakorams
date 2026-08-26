import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, MapPin, Users, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/treks';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  // Get 4 testimonials for desktop grid (starting from current index)
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const idx = (currentIndex + i) % TESTIMONIALS.length;
      result.push(TESTIMONIALS[idx]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section id="testimonials-section" className="py-16 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Verified Trekkers
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight mt-1">
              Voices from the <span className="font-medium text-sky-400">Karakoram</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-light">
              Real stories from adventurers who answered the mountain's call
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2.5 border border-slate-700 hover:border-sky-500 hover:bg-sky-500/10 transition-all duration-300 text-slate-400 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 border border-slate-700 hover:border-sky-500 hover:bg-sky-500/10 transition-all duration-300 text-slate-400 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Carousel - visible only on small screens */}
        <div className="block md:hidden">
          <div className="relative">
            <div
              className={`bg-slate-800/50 border border-slate-700 p-6 transition-all duration-400 ${isTransitioning ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
                }`}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-sky-400/30 mb-3" />

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  {currentTestimonial.date}
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-sm text-slate-300 leading-relaxed mb-5 font-light italic">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Author Section */}
              <div className="pt-4 border-t border-slate-700/50 flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 object-cover border-2 border-sky-400/30"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-0.5">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {currentTestimonial.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-sky-400">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{currentTestimonial.country}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {currentTestimonial.trekTaken}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsTransitioning(false), 400);
                  }}
                  className={`transition-all duration-300 ${idx === currentIndex
                      ? 'w-8 h-1 bg-sky-400'
                      : 'w-4 h-1 bg-slate-700 hover:bg-slate-600'
                    }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid - visible on md and up */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTestimonials.map((t, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={`${t.id}-${currentIndex}`}
                className={`group p-5 flex flex-col justify-between border transition-all duration-500 ${isActive
                    ? 'bg-slate-800/70 border-sky-500/50 shadow-lg shadow-sky-500/5'
                    : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
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
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                      {t.date}
                    </span>
                  </div>

                  {/* Review */}
                  <blockquote className={`text-xs leading-relaxed italic mb-4 ${isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                    "{t.review}"
                  </blockquote>
                </div>

                {/* Author */}
                <div className={`pt-3 border-t ${isActive ? 'border-slate-700/50' : 'border-slate-700/30'
                  } flex items-center gap-3`}>
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 object-cover border border-slate-600"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {isActive && (
                      <div className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-0.5">
                        <ShieldCheck className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                      {t.name}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-sky-400">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate">{t.country}</span>
                    </div>
                    <div className="text-[9px] text-slate-500 truncate mt-0.5">
                      {t.trekTaken}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Navigation Hint */}
        <div className="hidden md:flex justify-center gap-1.5 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsTransitioning(false), 400);
              }}
              className={`transition-all duration-300 ${idx === currentIndex
                  ? 'w-6 h-0.5 bg-sky-400'
                  : 'w-4 h-0.5 bg-slate-700 hover:bg-slate-600'
                }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};