import React, { useState } from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Play, Users, MapPin, Sparkles, X, Radio, Mountain } from 'lucide-react';
import { BRAND_INFO } from '../data/treks';

export const TrustSection: React.FC = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="trust-safety-section" className="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Media with Play Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-96 sm:h-[480px] overflow-hidden border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
                alt="Trek Karakoram expedition team at Concordia K2"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/30" />

              {/* Play Video Trigger Overlay */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                title="Watch Trek Karakoram Mountain Expedition"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>

              {/* Experience Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95  p-3.5 flex items-center gap-3">
                <Mountain className="w-8 h-8 text-sky-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase text-white tracking-wider">
                    {BRAND_INFO.storyTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 font-story">
                    "When the mountains call, we don’t just answer — we listen."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trust Details & Differentiators */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                THE TREK KARAKORAM PROMISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-1">
                {BRAND_INFO.uspTitle}
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-story">
              {BRAND_INFO.story[0]} {BRAND_INFO.story[2]}
            </p>

            {/* Differentiators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BRAND_INFO.uspDifferentiators.map((diff) => (
                <div key={diff.title} className="bg-slate-800/80 p-3 border border-slate-700/80">
                  <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{diff.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal pl-5">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 4 Stats Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-slate-800 border border-slate-700 p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-sky-400">Max 8</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold mt-0.5">Trekker Group Limit</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold mt-0.5">Certified Balti Guides</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-sky-400">24/7</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold mt-0.5">Satellite SOS Dispatch</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-amber-400">Zero</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold mt-0.5">Hidden Travel Costs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 p-1.5 bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-3">
              Expedition Reel: The Heart of the Karakoram
            </h3>
            <div className="relative aspect-video bg-black flex items-center justify-center border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                alt="Baltoro Glacier footage thumbnail"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <Play className="w-12 h-12 text-sky-400 mb-2" />
                <p className="text-sm font-bold text-white max-w-md">
                  Experience the silence of Baltoro Glacier, Concordia, and the warmth of Balti campfire songs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
