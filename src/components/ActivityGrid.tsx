import React from 'react';
import { Mountain, Plane, Flag, Compass, Users } from 'lucide-react';

interface ActivityGridProps {
  onSelectActivity: (activity: string) => void;
}

export const ActivityGrid: React.FC<ActivityGridProps> = ({ onSelectActivity }) => {
  return (
    <section id="popular-activities-section" className="py-14 bg-white border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - concise */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Adventure Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mt-1">
            Popular Activities in Pakistan
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Choose from a wide variety of meticulously organized treks, heli-safaris, and high-altitude climbs.
          </p>
        </div>

        {/* Bento / Asymmetric Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Main Large Trekking Card (Spans 2 cols on lg) */}
          <div
            onClick={() => onSelectActivity('Trekking')}
            className="md:col-span-2 lg:col-span-2 group relative h-72 sm:h-90 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
              alt="Trekking in Pakistan Karakoram"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="bg-sky-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider mb-2 inline-block">
                Top Highlight
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                Trekking in Karakoram & Himalayas
              </h3>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-sky-400" />
                <span>32 Guided Itineraries • Baltoro, K2, Gondogoro, Fairy Meadows</span>
              </p>
            </div>
          </div>

          {/* Helicopter Tour Card */}
          <div
            onClick={() => onSelectActivity('Heli Trek')}
            className="md:col-span-1 lg:col-span-2 group relative h-72 sm:h-90 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80"
              alt="Helicopter Tours in Gilgit Baltistan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider mb-2 inline-block">
                VIP Experience
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                Helicopter Mountain Tours
              </h3>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-amber-300" />
                <span>8 VIP Packages • Concordia & K2 Heli Drops</span>
              </p>
            </div>
          </div>

          {/* 4WD Jeep Safaris */}
          <div
            onClick={() => onSelectActivity('Jeep Safari')}
            className="group relative h-60 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="4WD Jeep Tours Pakistan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                4WD Jeep Safaris
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <Compass className="w-3 h-3 text-sky-400" />
                <span>11 Routes • Deosai & Shimshal</span>
              </p>
            </div>
          </div>

          {/* High Pass Crossings */}
          <div
            onClick={() => onSelectActivity('Pass Crossing')}
            className="group relative h-60 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
              alt="High Pass Crossings Pakistan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                High Pass Crossings
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <Mountain className="w-3 h-3 text-sky-400" />
                <span>6 Passes • Gondogoro & Hispar</span>
              </p>
            </div>
          </div>

          {/* 6000m Peak Climbing */}
          <div
            onClick={() => onSelectActivity('Expedition')}
            className="group relative h-60 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
              alt="Peak Climbing Karakoram"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                Trekking Peaks
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <Flag className="w-3 h-3 text-sky-400" />
                <span>9 Peaks • Minglik Sar & Spantik</span>
              </p>
            </div>
          </div>

          {/* Cultural & Family Walks */}
          <div
            onClick={() => onSelectActivity('Cultural Trek')}
            className="group relative h-60 overflow-hidden cursor-pointer border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80"
              alt="Cultural & Family Treks Pakistan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                Cultural & Family Hikes
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <Users className="w-3 h-3 text-sky-400" />
                <span>7 Tours • Hunza & Nagar</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
