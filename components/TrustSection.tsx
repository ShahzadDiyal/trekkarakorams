 
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
      className="bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-sky-400" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              Before You Go
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
            You should know who is taking you into the mountains.
          </h2>

          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-slate-300">
            We are a local trekking company based in Skardu. Our team knows
            these mountains because they are home. From planning and permits
            to transport, guides and the trail itself, we stay involved
            throughout the journey.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Video */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video overflow-hidden border border-slate-700 bg-slate-800">

              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80"
              >
                <source
                  src="/videos/trekkarakoram-video.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-slate-950/30" />

              {/* Play Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="
                  absolute left-1/2 top-1/2
                  flex h-14 w-14 -translate-x-1/2 -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  bg-white text-slate-900
                  transition-all duration-200
                  hover:scale-105 hover:bg-sky-400 hover:text-white
                  cursor-pointer
                  sm:h-16 sm:w-16
                "
                title="Watch Trek Karakoram Expedition Video"
                aria-label="Play Trek Karakoram expedition video"
              >
                <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" />
              </button>

              {/* Video Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 to-transparent px-5 pb-5 pt-12 sm:px-6 sm:pb-6">
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-sky-400 shrink-0" />

                  <span className="text-sm font-semibold text-white">
                    Life in the Karakoram
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-300">
                  See the landscapes and trails we call home.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Content */}
          <div className="lg:col-span-5">

            <div className="border-t border-slate-700">

              {/* Point 1 */}
              <div className="border-b border-slate-700 py-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Local guides who know the terrain.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Our guides come from the communities around these
                      mountains. They know the trails, valleys, weather and
                      the places that do not appear on a map.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="border-b border-slate-700 py-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Everything arranged before you arrive.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Airport pickup, accommodation, transport, meals,
                      permits and the trek itself are planned ahead of time.
                      You should not have to figure out logistics while
                      standing at the trailhead.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div className="border-b border-slate-700 py-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Small groups. More attention.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      We keep groups manageable so our guides can pay
                      attention to the people actually walking with them,
                      rather than managing a crowd.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 4 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      We stay with you from start to finish.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Your journey does not start when you reach the trail
                      and it does not end when you leave it. Our team handles
                      the details around the trek as well.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Simple Trust Note */}
            <div className="mt-6 border border-slate-700 bg-slate-800/50 p-5">
              <p className="text-sm leading-6 text-slate-300">
                Based in <span className="font-semibold text-white">Skardu</span>.
                Working with local teams across Baltistan and the wider
                Karakoram.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-3 sm:p-6"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 p-3 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="
                absolute right-2 top-2 z-10
                flex h-9 w-9 items-center justify-center
                bg-slate-800 text-slate-300
                transition-colors
                hover:bg-slate-700 hover:text-white
                cursor-pointer
                sm:right-3 sm:top-3
              "
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-4 pr-10 text-base font-bold text-white sm:text-lg">
              Life in the Karakoram
            </h3>

            <div className="relative aspect-video overflow-hidden bg-black">
              <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
                poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80"
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
 
