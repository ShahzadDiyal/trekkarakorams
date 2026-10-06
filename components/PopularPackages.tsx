
'use client';

import React, { useState } from 'react';
import { TrekPackage, Currency } from '@/types';
import { PackageCard } from '@/components/PackageCard';
import { TrekGridSkeleton } from '@/components/TrekSkeletons';
import { RefreshCw } from 'lucide-react';

interface PopularPackagesProps {
  treks: TrekPackage[];
  currency: Currency;
  activeRegionFilter: string;
  onFilterChange: (region: string) => void;
  onViewDetail: (trek: TrekPackage) => void;
  onBookNow: (trek: TrekPackage) => void;
  onResetFilters: () => void;
  loading?: boolean;
}

export const PopularPackages: React.FC<PopularPackagesProps> = ({
  treks,
  currency,
  activeRegionFilter,
  onFilterChange,
  onViewDetail,
  onBookNow,
  onResetFilters,
  loading = false,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const filterTabs = [
    { label: 'All Packages', value: '' },
    { label: 'Karakoram (K2 & Baltoro)', value: 'Karakoram' },
    { label: 'Hunza & Nagar', value: 'Hunza & Nagar' },
    { label: 'Nanga Parbat / Himalayas', value: 'Himalayas' },
    { label: 'Deosai Plains', value: 'Deosai & Astore' },
  ];

  const filteredTreks = treks.filter((t) => {
    const matchesRegion =
      !activeRegionFilter ||
      t.region
        .toLowerCase()
        .includes(activeRegionFilter.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === 'ALL' ||
      t.difficulty === selectedDifficulty;

    return matchesRegion && matchesDifficulty;
  });

  return (
    <section
      id="popular-packages-section"
      className="bg-slate-50 border-b border-slate-200"
    >
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Section Header */}
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Choose Your Route
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Our treks.
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
              From the trails beneath K2 to quiet valleys beyond the main
              routes, find the trek that suits you.
            </p>
          </div>

          {/* Clear Filter */}
          <div className="shrink-0">
            {activeRegionFilter && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 rounded-md bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Clear: {activeRegionFilter}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-9 border-b border-slate-200 pb-4">

          {/* Mobile Dropdown */}
          <div className="relative md:hidden">
            <select
              value={activeRegionFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full appearance-none rounded-md border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            >
              {filterTabs.map((tab) => (
                <option key={tab.label} value={tab.value}>
                  {tab.label}
                </option>
              ))}
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            {filterTabs.map((tab) => {
              const isActive = activeRegionFilter === tab.value;

              return (
                <button
                  key={tab.label}
                  onClick={() => onFilterChange(tab.value)}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                      ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-600'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trek Grid */}
        {loading ? (
          <TrekGridSkeleton count={6} />
        ) : filteredTreks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTreks.map((trek) => (
              <PackageCard
                key={trek.id}
                trek={trek}
                currency={currency}
                onViewDetail={onViewDetail}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-10 sm:p-12 text-center">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              No Treks Match Your Filter
            </h3>

            <p className="mx-auto mb-5 max-w-md text-sm sm:text-base leading-6 text-slate-600">
              Try another region or reset the filter to explore all available
              treks.
            </p>

            <button
              onClick={onResetFilters}
              className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Show All Treks
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

