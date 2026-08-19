import React from 'react';
import { Star, Clock, Mountain, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { TrekPackage, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface PackageCardProps {
  trek: TrekPackage;
  currency: Currency;
  onViewDetail: (trek: TrekPackage) => void;
  onBookNow: (trek: TrekPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  trek,
  currency,
  onViewDetail,
  onBookNow
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Moderate':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Demanding':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Strenuous':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Extreme':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const displayPrice = trek.discountPriceUSD || trek.priceUSD;

  return (
    <div className="bg-white border border-slate-200 flex flex-col h-full group hover:border-sky-500 transition-colors">
      {/* Image Container with Badges */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={trek.image}
          alt={trek.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top-Left Duration Badge (matching screenshot green/sky pills) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-sky-600 text-white text-xs font-bold px-2.5 py-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{trek.durationDays} Days</span>
        </div>

        {/* Top-Right Region Tag */}
        <div className="absolute top-3 right-3 bg-slate-900/85 text-sky-300 text-[11px] font-semibold px-2 py-0.5 border border-slate-700">
          {trek.region}
        </div>

        {/* Discount Ribbon if active */}
        {trek.discountPriceUSD && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5">
            Save ${(trek.priceUSD - trek.discountPriceUSD).toLocaleString()}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Difficulty */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">
                ({trek.reviewsCount})
              </span>
            </div>

            <span className={`text-[11px] font-bold px-2 py-0.5 border ${getDifficultyColor(trek.difficulty)}`}>
              {trek.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetail(trek)}
            className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 hover:text-sky-600 cursor-pointer transition-colors"
          >
            {trek.title}
          </h3>

          {/* Quick Details Chips */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 border border-slate-100">
            <div className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="truncate">Max {trek.maxAltitude.toLocaleString()}m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="truncate">{trek.startingCity.split('/')[0]}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action Button (Matching screenshot layout) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-slate-500 block uppercase font-medium">Starting from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-sky-700">
                {formatPrice(displayPrice, currency)}
              </span>
              {trek.discountPriceUSD && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(trek.priceUSD, currency)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetail(trek)}
              className="bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-700 border border-sky-300 font-bold text-xs px-3 py-2 transition-colors cursor-pointer"
            >
              VIEW DETAIL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
