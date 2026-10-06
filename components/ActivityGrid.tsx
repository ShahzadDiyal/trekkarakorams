
'use client';

import React from 'react';
import { Mountain, Plane, MountainSnow, Car, Route, Landmark } from 'lucide-react';

interface ActivityGridProps {
  onSelectActivity: (activity: string) => void;
}

export const ActivityGrid: React.FC<ActivityGridProps> = ({
  onSelectActivity,
}) => {
  return (
    <section
      id="popular-activities-section"
      className="bg-white border-b border-slate-200"
    >
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Heading */}
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-sky-600" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              The Karakoram
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Where we take you.
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
            Some routes take two weeks. Some take three days. All of them
            are worth it.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* Trekking */}
          <div
            onClick={() => onSelectActivity('Trekking')}
            className="group relative h-[360px] cursor-pointer overflow-hidden rounded-xl border border-slate-200 lg:col-span-2"
          >
            <img
              src="/images/trekking-in-karakoram-and-himalayas.jpg"
              alt="Trekking through the Karakoram mountains"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-sky-300">
                <Mountain className="h-4 w-4" />
                Multi-day treks
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                K2, Baltoro & Concordia
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Follow some of the world's great mountain trails through
                the heart of the Karakoram.
              </p>
            </div>
          </div>

          {/* Helicopter */}
          <div
            onClick={() => onSelectActivity('Heli Trek')}
            className="group relative h-[360px] cursor-pointer overflow-hidden rounded-xl border border-slate-200 lg:col-span-2"
          >
            <img
              src="/images/helicopter-landing-on-snowy-mountain-in-karakoram.jpg"
              alt="Helicopter experience above the Karakoram mountains"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-sky-300">
                <Plane className="h-4 w-4" />
                By air
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                See the Karakoram from above
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Reach remote mountain landscapes and experience the scale
                of the Karakoram from the air.
              </p>
            </div>
          </div>

          {/* Jeep Safaris */}
          <div
            onClick={() => onSelectActivity('Jeep Safari')}
            className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src="/images/4wd-jeep-safaris-karakoram-pakistan.jpg"
              alt="4WD journey through the Karakoram"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <Car className="h-4 w-4" />
                Remote roads
              </p>

              <h3 className="text-xl font-bold">
                Deosai & Shimshal
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                4WD journeys into remote mountain country.
              </p>
            </div>
          </div>

          {/* Pass Crossings */}
          <div
            onClick={() => onSelectActivity('Pass Crossing')}
            className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src="/images/high-pass-crossing-karakoram-pakistan.jpg"
              alt="High mountain pass crossing in the Karakoram"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <Route className="h-4 w-4" />
                High passes
              </p>

              <h3 className="text-xl font-bold">
                Gondogoro & Hispar
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Cross some of the Karakoram's most dramatic passes.
              </p>
            </div>
          </div>

          {/* Trekking Peaks */}
          <div
            onClick={() => onSelectActivity('Expedition')}
            className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src="/images/trekking-peaks-karakoram-pakistan.jpg"
              alt="High altitude trekking peaks in the Karakoram"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <MountainSnow className="h-4 w-4" />
                Higher ground
              </p>

              <h3 className="text-xl font-bold">
                Minglik Sar & Spantik
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Take on the Karakoram's high trekking peaks.
              </p>
            </div>
          </div>

          {/* Cultural / Family */}
          <div
            onClick={() => onSelectActivity('Cultural Trek')}
            className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src="/images/cultural-and-family-hikes-trekkarakoram-pakistan.jpg"
              alt="Walking through villages and valleys of Gilgit-Baltistan"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <Landmark className="h-4 w-4" />
                Villages & valleys
              </p>

              <h3 className="text-xl font-bold">
                Hunza & Nagar
              </h3>

              <p className="mt-1 text-sm text-slate-300">
                Easier walks through villages, valleys and local life.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
