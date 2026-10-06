
'use client';

import React from 'react';
import {
  Clock,
  Mountain,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { TrekPackage, Currency } from '@/types';
import { formatPrice } from '@/utils/currency';

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
  onBookNow,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Demanding':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Strenuous':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Extreme':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const displayPrice = trek.discountPriceUSD || trek.priceUSD;

  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden rounded-xl
        border border-slate-200 bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-xl hover:shadow-slate-900/10
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={trek.image}
          alt={trek.title}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />

        {/* Duration */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5 text-sky-600" />
          {trek.durationDays} days
        </div>

        {/* Region */}
        <div className="absolute right-3 top-3 max-w-[55%] rounded-full border border-white/20 bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <span className="block truncate">{trek.region}</span>
        </div>

        {/* Discount */}
        {trek.discountPriceUSD && (
          <div className="absolute bottom-3 left-3 rounded-xl bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-950">
            Save{' '}
            {formatPrice(
              trek.priceUSD - trek.discountPriceUSD,
              currency
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Difficulty */}
        <div className="mb-3 flex items-center justify-end">
          <span
            className="
              shrink-0 rounded-full  px-2.5 py-1
              text-[10px] font-bold uppercase tracking-wide
            "
          >
            <span
              className={`inline-block rounded-full border px-2.5 py-1 ${getDifficultyColor(
                trek.difficulty
              )}`}
            >
              {trek.difficulty}
            </span>
          </span>
        </div>

        {/* Title */}
        <button
          onClick={() => onViewDetail(trek)}
          className="
            group/title flex w-full items-start justify-between gap-2
            text-left cursor-pointer
          "
        >
          <h3
            className="
              line-clamp-2
              text-lg font-bold leading-snug
              tracking-tight text-slate-900
              transition-colors duration-200
              group-hover/title:text-sky-600
            "
          >
            {trek.title}
          </h3>

          <ArrowUpRight
            className="
              mt-0.5 h-4 w-4 shrink-0
              text-slate-400
              transition-all duration-200
              group-hover/title:-translate-y-0.5
              group-hover/title:translate-x-0.5
              group-hover/title:text-sky-600
            "
          />
        </button>

        {/* Trek Details */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <Mountain className="h-3.5 w-3.5 shrink-0 text-sky-600" />

              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Highest
              </span>
            </div>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {trek.maxAltitude.toLocaleString()}m
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 shrink-0 text-sky-600" />

              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Starts
              </span>
            </div>

            <p className="mt-1 truncate text-sm font-semibold text-slate-800">
              {trek.startingCity.split('/')[0]}
            </p>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-auto pt-5">
          <div className="mb-4 h-px bg-slate-100" />

          <div className="flex items-end justify-between gap-3">

            {/* Price */}
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                From
              </span>

              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">
                  {formatPrice(displayPrice, currency)}
                </span>

                {trek.discountPriceUSD && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(trek.priceUSD, currency)}
                  </span>
                )}
              </div>

              <span className="mt-0.5 block text-[11px] text-slate-400">
                per person
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => onViewDetail(trek)}
              className="
                inline-flex shrink-0 items-center justify-center gap-1.5
                rounded-xl bg-sky-600
                px-4 py-2.5
                text-xs font-bold uppercase tracking-wide text-white
                transition-all duration-200
                hover:bg-sky-700
                hover:shadow-md hover:shadow-sky-900/20
                cursor-pointer
              "
            >
              See Full Itinerary
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

          </div>
        </div>
      </div>
    </article>
  );
};
