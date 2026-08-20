import React from 'react';
import { useRouter } from 'next/router';

import { MapExplorer } from '../components/MapExplorer';
import { Mountain, MapPin, Compass, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

export const RoutesMapPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => router.push('/')} className="hover:text-sky-600">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Interactive Karakoram & Pakistan Route Map</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Geographic Expedition Cartography
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Karakoram & Himalayan Route Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Navigate the high glaciers, technical alpine passes, and mountain massifs of Gilgit-Baltistan with our interactive geographic cartography explorer.
          </p>
        </div>

        {/* The Interactive Map Component */}
        <div className="mb-10">
          <MapExplorer onSelectTrekById={(id) => router.push(`/treks/${id}`)} />
        </div>

        {/* Comprehensive Route Waypoints & Camps Breakdown */}
        <div className="bg-white  p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-200">
            Baltoro Glacier & K2 Expedition Waypoints
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>1. Askole Village (Trailhead)</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">3,040m</span>
              </div>
              <p className="leading-relaxed">
                The final permanent settlement in Shigar Valley. Here, jeeps terminate and the expedition porters form up for gear loads along the Braldu River.
              </p>
            </div>

            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>2. Paiju Camp</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">3,450m</span>
              </div>
              <p className="leading-relaxed">
                Situated beneath Paiju Peak (6,610m) at the snout of the Baltoro Glacier. Crucial rest day for porters to bake traditional chapattis for the glacial journey.
              </p>
            </div>

            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>3. Urdukas Camp</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">4,050m</span>
              </div>
              <p className="leading-relaxed">
                Perched high on the grassy slopes directly overlooking the Baltoro Glacier with staggering views across to Trango Towers and Cathedral Peak.
              </p>
            </div>

            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>4. Goro II Glacial Camp</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">4,300m</span>
              </div>
              <p className="leading-relaxed">
                First camp fully on glacial ice and moraine. Direct views of Masherbrum (7,821m) rising sheer above the southern flank of the Baltoro.
              </p>
            </div>

            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>5. Concordia Amphitheatre</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">4,600m</span>
              </div>
              <p className="leading-relaxed">
                The world’s most dramatic mountain amphitheatre where Baltoro and Godwin-Austen glaciers meet. 360-degree panorama of K2, Broad Peak, and Gasherbrum.
              </p>
            </div>

            <div className="p-4 bg-slate-50 ">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>6. Gondogoro La High Pass</span>
                <span className="text-sky-700 bg-sky-100 px-1.5 py-0.5">5,585m</span>
              </div>
              <p className="leading-relaxed">
                Technical alpine col crossed under darkness with fixed ropes and crampons, descending into the lush green Hushe Valley.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => router.push('/treks/k2-basecamp-gondogoro-la')}
              className="bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs px-4 py-2.5 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View K2 & Gondogoro La Trek Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
