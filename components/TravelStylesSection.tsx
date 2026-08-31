 
'use client';

import React from 'react';
import {
  Mountain,
  Plane,
  Flag,
  Compass,
  Users,
  Camera,
} from 'lucide-react';
import { TREK_STYLES } from '@/data/treks';

interface TravelStylesProps {
  onSelectStyle: (styleId: string) => void;
}

export const TravelStylesSection: React.FC<TravelStylesProps> = ({
  onSelectStyle,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain':
        return <Mountain className="h-5 w-5" />;
      case 'Plane':
        return <Plane className="h-5 w-5" />;
      case 'Flag':
        return <Flag className="h-5 w-5" />;
      case 'Compass':
        return <Compass className="h-5 w-5" />;
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'Camera':
        return <Camera className="h-5 w-5" />;
      default:
        return <Mountain className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="travel-styles-section"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-sky-600" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Find Your Way
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-900">
            Choose how you want to explore.
          </h2>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-600">
            A long trek, a high pass, a family adventure or a few days in
            the mountains. Start with the kind of journey you have in mind.
          </p>
        </div>

        {/* Travel Styles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TREK_STYLES.map((style, idx) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={`
                group flex min-h-[150px] flex-col items-start justify-between
                rounded-md border p-5 text-left
                transition-all duration-200
                cursor-pointer
                ${
                  idx === 0
                    ? 'border-sky-600 bg-sky-600 text-white hover:bg-sky-700'
                    : 'border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md'
                }
              `}
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-md
                  ${
                    idx === 0
                      ? 'bg-sky-700/60 text-sky-100'
                      : 'bg-slate-50 text-sky-600 group-hover:bg-sky-50'
                  }
                `}
              >
                {getIcon(style.iconName)}
              </div>

              <div className="mt-6">
                <h3
                  className={`
                    text-sm sm:text-base font-bold leading-tight
                    ${
                      idx === 0
                        ? 'text-white'
                        : 'text-slate-900 group-hover:text-sky-700'
                    }
                  `}
                >
                  {style.title}
                </h3>

                <p
                  className={`
                    mt-1.5 text-xs
                    ${
                      idx === 0
                        ? 'text-sky-100'
                        : 'text-slate-500'
                    }
                  `}
                >
                  {style.count} expeditions
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Quiet Responsible Travel Statement */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            We believe the mountains should look the same after we leave.
            Our trips are planned with respect for the trails, villages,
            people and landscapes that make the Karakoram what it is.
          </p>
        </div>

      </div>
    </section>
  );
};
 
