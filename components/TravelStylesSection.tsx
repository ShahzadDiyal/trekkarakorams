'use client';

import React, { useState } from 'react';
import { Mountain, Plane, Flag, Compass, Users, Camera, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TREK_STYLES } from '@/data/treks';

interface TravelStylesProps {
  onSelectStyle: (styleId: string) => void;
}

export const TravelStylesSection: React.FC<TravelStylesProps> = ({ onSelectStyle }) => {
  const [showAllStyles, setShowAllStyles] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain':
        return <Mountain className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Plane':
        return <Plane className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Flag':
        return <Flag className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Compass':
        return <Compass className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Users':
        return <Users className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Camera':
        return <Camera className="w-6 h-6 sm:w-7 sm:h-7" />;
      default:
        return <Mountain className="w-6 h-6 sm:w-7 sm:h-7" />;
    }
  };

  // Show first 4 on mobile, all on desktop or when expanded
  const visibleStyles = showAllStyles
    ? TREK_STYLES
    : TREK_STYLES.slice(0, 4);

  return (
    <section id="travel-styles-section" className="py-10 sm:py-12 md:py-14 bg-white border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - concise */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-wider text-sky-600">
            Tailored Experiences
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 tracking-tight mt-1">
            Travel Styles That Suit You
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 mt-1 px-2 sm:px-0">
            Whether you want strenuous glacier passes or luxury heli drops, we tailor each journey to your pace.
          </p>
        </div>

        {/* Travel Style Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {visibleStyles.map((style, idx) => (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={`p-3 sm:p-4 flex flex-col items-center text-center cursor-pointer transition-all ${idx === 0
                  ? 'bg-sky-600 text-white border-sky-600 hover:bg-sky-700'
                  : 'bg-slate-50 text-slate-800 border border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                }`}
            >
              <div className={`mb-2 sm:mb-3 p-2 sm:p-3 rounded-none ${idx === 0 ? 'text-sky-100 bg-sky-700/50' : 'text-sky-600 bg-white'}`}>
                {getIcon(style.iconName)}
              </div>
              <h3 className="text-[11px] sm:text-[13px] md:text-[16px] font-bold leading-tight">
                {style.title}
              </h3>
              <span className={`text-[9px] sm:text-[10px] md:text-[11px] mt-0.5 sm:mt-1 font-medium ${idx === 0 ? 'text-sky-200' : 'text-slate-500'}`}>
                {style.count} Expeditions
              </span>
            </div>
          ))}
        </div>

        {/* Show More/Less Button - Mobile Only */}
        {TREK_STYLES.length > 4 && (
          <div className="text-center mt-4 sm:mt-6 lg:hidden">
            <button
              onClick={() => setShowAllStyles(!showAllStyles)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] sm:text-[13px] uppercase tracking-wider transition-colors border border-slate-200"
            >
              {showAllStyles ? 'Show Less Styles' : `View All ${TREK_STYLES.length} Styles`}
            </button>
          </div>
        )}

        {/* Responsible Tourism & Porter Welfare Commitment */}
        <div className="mt-6 sm:mt-8 bg-sky-50 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-sky-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
            <div className="p-2 sm:p-2.5 bg-sky-500 text-slate-950 font-bold shrink-0 self-start sm:self-center">
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-[13px] sm:text-[14px] md:text-[16px] font-bold text-slate-900 leading-tight">
                Ethical Porter Welfare & Fair Wages Guaranteed
              </h4>
              <p className="text-[11px] sm:text-[12px] md:text-[13px] text-slate-600 mt-0.5 sm:mt-0 leading-relaxed">
                We strictly adhere to IPPG guidelines: 15kg load caps, high-altitude gear provided, full life & rescue insurance for all Balti porters.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-[12px] md:text-[13px] font-bold text-sky-800 shrink-0 w-full md:w-auto justify-start md:justify-end pt-2 sm:pt-0 border-t border-sky-200 md:border-t-0">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span>100% Certified Local Staff</span>
          </div>
        </div>
      </div>
    </section>
  );
};