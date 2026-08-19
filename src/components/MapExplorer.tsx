import React, { useState } from 'react';
import { MapPin, Mountain, Compass, Info, ArrowRight, Eye } from 'lucide-react';
import { TrekPackage } from '../types';

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
    desc: 'The Savage Mountain — the second-highest and most demanding peak on Earth.',
    lat: 35.88,
    lng: 76.51,
    highlight: 'Crown of Karakoram, Godwin-Austen Glacier',
    matchedTrekId: 'k2-basecamp-gondogoro-la',
    type: 'peak'
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
    type: 'camp'
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
    type: 'pass'
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
    type: 'peak'
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
    type: 'glacier'
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
    type: 'peak'
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
    type: 'peak'
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
    type: 'camp'
  }
];

interface MapExplorerProps {
  onSelectTrekById: (trekId: string) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSelectTrekById }) => {
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint>(WAYPOINTS[0]);

  return (
    <section id="interactive-map-section" className="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Interactive Route Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Karakoram & Himalayan Peaks
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Explore famous landmarks across Gilgit-Baltistan and discover associated trekking expeditions.
          </p>
        </div>

        {/* Map Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Waypoints List / Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {WAYPOINTS.map((wp) => {
              const isSelected = activeWaypoint.id === wp.id;
              return (
                <div
                  key={wp.id}
                  onClick={() => setActiveWaypoint(wp)}
                  className={`p-3.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-950 border-sky-400 text-white'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 ${isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-700 text-sky-400'}`}>
                        <Mountain className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-white">
                        {wp.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-300 bg-sky-900/60 px-2 py-0.5 border border-sky-800">
                      {wp.altitude}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {wp.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Detail Spotlight Card (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border-2 border-sky-500 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="bg-sky-500 text-slate-950 font-black text-xs px-2.5 py-0.5 uppercase tracking-wider">
                  {activeWaypoint.type.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeWaypoint.region}, Gilgit-Baltistan
                </span>
              </div>
              <span className="text-sm font-extrabold text-amber-400">
                Elev: {activeWaypoint.altitude}
              </span>
            </div>

            <div className="py-4">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeWaypoint.name}
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {activeWaypoint.desc}
              </p>

              {/* Geographic Coordinates & Highlight */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900 p-3 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Key Geographical Feature:</span>
                  <span className="text-sky-300 font-bold">{activeWaypoint.highlight}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Coordinates:</span>
                  <span className="text-slate-200 font-mono">{activeWaypoint.lat}° N, {activeWaypoint.lng}° E</span>
                </div>
              </div>
            </div>

            {/* Action to View Associated Trek */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Featured on: <strong className="text-white">Active Guided Departures 2026</strong>
              </div>
              <button
                type="button"
                onClick={() => onSelectTrekById(activeWaypoint.matchedTrekId)}
                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Trek Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
