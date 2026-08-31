
'use client';

import React, { useState } from 'react';
import { Mountain, ArrowRight, MapPin } from 'lucide-react';

interface Waypoint {
  id: string;
  name: string;
  region: string;
  altitude: string;
  desc: string;
  lat: number;
  lng: number;
  highlight: string;
  matchedTrekId: string;
  type: 'peak' | 'pass' | 'camp' | 'glacier' | 'city';
}

const WAYPOINTS: Waypoint[] = [
  {
    id: 'k2',
    name: 'K2 Summit & Base Camp',
    region: 'Central Karakoram',
    altitude: '5,150m (BC) / 8,611m',
    desc: 'The Savage Mountain, the second-highest and most demanding peak on Earth.',
    lat: 35.88,
    lng: 76.51,
    highlight: 'Crown of Karakoram, Godwin-Austen Glacier',
    matchedTrekId: 'k2-basecamp-gondogoro-la',
    type: 'peak',
  },
  {
    id: 'concordia',
    name: 'Concordia Amphitheatre',
    region: 'Baltoro Glacier',
    altitude: '4,600m',
    desc: 'The Throne Room of Mountain Gods where Baltoro and Godwin-Austen glaciers meet.',
    lat: 35.78,
    lng: 76.45,
    highlight: 'Front row views of K2, Broad Peak, Gasherbrum I-IV',
    matchedTrekId: 'k2-basecamp-classic',
    type: 'camp',
  },
  {
    id: 'gondogoro-la',
    name: 'Gondogoro La Pass',
    region: 'Hushe / Baltoro',
    altitude: '5,585m',
    desc: 'Technical glaciated pass offering a 360° panorama of four 8,000m peaks.',
    lat: 35.65,
    lng: 76.42,
    highlight: 'Fixed rope alpine crossing with crampons into Hushe',
    matchedTrekId: 'k2-basecamp-gondogoro-la',
    type: 'pass',
  },
  {
    id: 'trango',
    name: 'Trango Granite Towers',
    region: 'Baltoro Glacier',
    altitude: '6,286m',
    desc: 'The world’s tallest sheer vertical granite rock faces.',
    lat: 35.75,
    lng: 76.15,
    highlight: 'Great Trango & Nameless Tower',
    matchedTrekId: 'k2-basecamp-classic',
    type: 'peak',
  },
  {
    id: 'snow-lake',
    name: 'Snow Lake (Lukpe Lawo)',
    region: 'Biafo - Hispar',
    altitude: '4,900m',
    desc: 'A 16-kilometer wide glacial basin of perpetual snow and ice.',
    lat: 36.05,
    lng: 75.85,
    highlight: 'Hispar La pass (5,151m) linking Baltistan to Hunza',
    matchedTrekId: 'snow-lake-biafo-hispar',
    type: 'glacier',
  },
  {
    id: 'nanga-parbat',
    name: 'Nanga Parbat & Fairy Meadows',
    region: 'Western Himalayas',
    altitude: '3,967m (BC) / 8,126m',
    desc: 'The colossal Killer Mountain rising 4,000m sheer above Fairy Meadows.',
    lat: 35.23,
    lng: 74.58,
    highlight: 'Fairy Meadows pine forests & Raikot Face Base Camp',
    matchedTrekId: 'fairy-meadows-nanga-parbat',
    type: 'peak',
  },
  {
    id: 'rakaposhi',
    name: 'Rakaposhi & Minapin',
    region: 'Nagar Valley',
    altitude: '3,800m (BC) / 7,788m',
    desc: 'Steepest unbroken vertical rise on planet Earth (6,000m from Hunza river).',
    lat: 36.14,
    lng: 74.49,
    highlight: 'Tagafari Glacier Camp & Diran Base Camp',
    matchedTrekId: 'rakaposhi-diran-base-camp',
    type: 'peak',
  },
  {
    id: 'deosai',
    name: 'Deosai High Plains',
    region: 'Skardu / Astore',
    altitude: '4,114m',
    desc: 'Second-highest plateau in the world, filled with wildflowers & Himalayan bears.',
    lat: 35.03,
    lng: 75.48,
    highlight: 'Sheosar Lake & brown bear wilderness sanctuary',
    matchedTrekId: 'deosai-plains-burzil',
    type: 'camp',
  },
];

interface MapExplorerProps {
  onSelectTrekById: (trekId: string) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({
  onSelectTrekById,
}) => {
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint>(WAYPOINTS[0]);

  return (
    <section
      id="interactive-map-section"
      className="border-b border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 max-w-3xl sm:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-sky-400" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
              Route Explorer
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Explore the Karakoram & Himalayan Peaks
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Discover legendary peaks, glaciers and high-altitude passes across
            Gilgit-Baltistan, then explore the trekking expedition connected
            to each destination.
          </p>
        </div>

        {/* Explorer */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">

          {/* Waypoint Navigation */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Destinations
              </span>

              <span className="text-xs text-slate-500">
                {WAYPOINTS.length} locations
              </span>
            </div>

            <div className="space-y-2">
              {WAYPOINTS.map((wp) => {
                const isSelected = activeWaypoint.id === wp.id;

                return (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => setActiveWaypoint(wp)}
                    className={`group w-full border p-3.5 text-left transition-all duration-200 sm:p-4 ${
                      isSelected
                        ? 'border-sky-500/70 bg-sky-950/50'
                        : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">

                      {/* Icon */}
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-800 text-sky-400 group-hover:bg-slate-700'
                        }`}
                      >
                        <Mountain className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <h3 className="text-sm font-semibold leading-5 text-white sm:text-[15px]">
                            {wp.name}
                          </h3>

                          <span className="w-fit shrink-0 bg-slate-800 px-2 py-1 text-[10px] font-bold tracking-wide text-sky-300">
                            {wp.altitude}
                          </span>
                        </div>

                        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-[13px]">
                          {wp.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-7">
            <div className="relative h-full overflow-hidden border border-slate-800 bg-slate-900/80">

              {/* Subtle Top Accent */}
              <div className="h-1 w-full bg-sky-500" />

              <div className="p-5 sm:p-7 lg:p-8">

                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-sky-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-950">
                      {activeWaypoint.type}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-sky-400" />
                      {activeWaypoint.region}, Gilgit-Baltistan
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-amber-400">
                    Elev. {activeWaypoint.altitude}
                  </span>
                </div>

                {/* Main Content */}
                <div className="py-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {activeWaypoint.name}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    {activeWaypoint.desc}
                  </p>

                  {/* Information Grid */}
                  <div className="mt-6 grid gap-px overflow-hidden border border-slate-800 bg-slate-800 sm:grid-cols-2">

                    <div className="bg-slate-950/80 p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Key Feature
                      </span>

                      <span className="mt-1.5 block text-sm font-medium leading-5 text-sky-300">
                        {activeWaypoint.highlight}
                      </span>
                    </div>

                    <div className="bg-slate-950/80 p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Coordinates
                      </span>

                      <span className="mt-1.5 block font-mono text-sm text-slate-200">
                        {activeWaypoint.lat}° N, {activeWaypoint.lng}° E
                      </span>
                    </div>

                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Expedition
                    </span>

                    <span className="mt-1 block text-sm font-medium text-white">
                      Guided departures 2026
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectTrekById(activeWaypoint.matchedTrekId)
                    }
                    className="group flex w-full items-center justify-center gap-2 bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 sm:w-auto"
                  >
                    View Trek Package
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

