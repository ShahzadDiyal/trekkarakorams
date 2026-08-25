'use client';

import React from 'react';
import { Mountain, Plane, Flag, Compass, Users, Camera, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TREK_STYLES } from '@/data/treks';

interface TravelStylesProps {
  onSelectStyle: (styleId: string) => void;
}

export const TravelStylesSection: React.FC<TravelStylesProps> = ({ onSelectStyle }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain':
        return <Mountain className="w-7 h-7" />;
      case 'Plane':
        return <Plane className="w-7 h-7" />;
      case 'Flag':
        return <Flag className="w-7 h-7" />;
      case 'Compass':
        return <Compass className="w-7 h-7" />;
      case 'Users':
        return <Users className="w-7 h-7" />;
      case 'Camera':
        return <Camera className="w-7 h-7" />;
      default:
        return <Mountain className="w-7 h-7" />;
    }
  };

  return (
    <section id="travel-styles-section" className="py-14 bg-white border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - concise */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[13px] font-bold uppercase tracking-wider text-sky-600">
            Tailored Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mt-1">
            Travel Styles That Suit You
          </h2>
          <p className="text-[16px] text-slate-600 mt-1">
            Whether you want strenuous glacier passes or luxury heli drops, we tailor each journey to your pace.
          </p>
        </div>

        {/* Travel Style Badges Grid (matching the iconic screenshot bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TREK_STYLES.map((style, idx) => (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={`p-4 flex flex-col items-center text-center cursor-pointer transition-all ${
                idx === 0
                  ? 'bg-sky-600 text-white border-sky-600 hover:bg-sky-700'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-500 hover:bg-sky-50'
              }`}
            >
              <div className={`mb-3 p-3 rounded-none ${idx === 0 ? 'text-sky-100 bg-sky-700/50' : 'text-sky-600 bg-white'}`}>
                {getIcon(style.iconName)}
              </div>
              <h3 className="text-[13px] sm:text-[16px] font-bold leading-tight">
                {style.title}
              </h3>
              <span className={`text-[11px] mt-1 font-medium ${idx === 0 ? 'text-sky-200' : 'text-slate-500'}`}>
                {style.count} Expeditions
              </span>
            </div>
          ))}
        </div>

        {/* Responsible Tourism & Porter Welfare Commitment */}
        <div className="mt-8 bg-sky-50  p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500 text-slate-950 font-bold shrink-0">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-slate-900">
                Ethical Porter Welfare & Fair Wages Guaranteed
              </h4>
              <p className="text-[13px] text-slate-600">
                We strictly adhere to IPPG guidelines: 15kg load caps, high-altitude gear provided, full life & rescue insurance for all Balti porters.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold text-sky-800 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Certified Local Staff</span>
          </div>
        </div>
      </div>
    </section>
  );
};
