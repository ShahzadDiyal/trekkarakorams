'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Play,
  X,
  Mountain,
} from 'lucide-react';
import { BRAND_INFO } from '@/data/treks';

export const TrustSection: React.FC = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="trust-safety-section"
      className="py-10 sm:py-12 lg:py-14 bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          {/* Left Column: Visual Media */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[680px] overflow-hidden border border-slate-700">

              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
              >
                <source
                  src="/videos/trekkarakoram-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-slate-950/30" />

              {/* Play Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-14 h-14 sm:w-16 sm:h-16
                  bg-sky-600 hover:bg-sky-500
                  text-white flex items-center justify-center
                  transition-transform hover:scale-105
                  cursor-pointer rounded-sm"
                title="Watch Trek Karakoram Mountain Expedition"
                aria-label="Play Video"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-1" />
              </button>

              {/* Experience Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/95 p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3">
                <Mountain className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400 shrink-0 mt-0.5" />

                <div className="min-w-0">
                  <div className="text-[11px] sm:text-[13px] font-bold uppercase text-white tracking-wider leading-snug">
                    {BRAND_INFO.storyTitle}
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-story leading-relaxed mt-0.5">
                    "When the mountains call, we don't just answer we listen."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">

            {/* Heading */}
            <div>
              <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em] text-sky-400">
                THE TREK KARAKORAM PROMISE
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight mt-1.5 leading-tight">
                {BRAND_INFO.uspTitle}
              </h2>
            </div>

            {/* Story */}
            <p className="text-slate-300 text-[14px] sm:text-[16px] leading-relaxed font-story">
              {BRAND_INFO.story[0]} {BRAND_INFO.story[2]}
            </p>

            {/* Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              {BRAND_INFO.uspDifferentiators.map((diff) => (
                <div
                  key={diff.title}
                  className="bg-slate-800/80 p-3 sm:p-3.5"
                >
                  <div className="flex items-start gap-2 font-bold text-[13px] sm:text-[14px] text-white mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      {diff.title}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-[12px] text-slate-300 leading-relaxed pl-5">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 sm:pt-4">

              <div className="bg-slate-800 p-3 sm:p-3.5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-sky-400">
                  Max 8
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-300 uppercase font-semibold mt-1 leading-tight">
                  Trekker Group Limit
                </div>
              </div>

              <div className="bg-slate-800 p-3 sm:p-3.5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-emerald-400">
                  100%
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-300 uppercase font-semibold mt-1 leading-tight">
                  Certified Balti Guides
                </div>
              </div>

              <div className="bg-slate-800 p-3 sm:p-3.5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-sky-400">
                  24/7
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-300 uppercase font-semibold mt-1 leading-tight">
                  Satellite SOS Dispatch
                </div>
              </div>

              <div className="bg-slate-800 p-3 sm:p-3.5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-amber-400">
                  Zero
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-300 uppercase font-semibold mt-1 leading-tight">
                  Hidden Travel Costs
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-slate-900 w-full max-w-3xl p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10
                p-1.5 sm:p-2
                bg-slate-800 text-slate-300
                hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-white mb-3 pr-8">
              Expedition Reel: The Heart of the Karakoram
            </h3>

            <div className="relative aspect-video bg-black flex items-center justify-center border border-slate-700 overflow-hidden">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
              >
                <source
                  src="/videos/trekkarakoram-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};