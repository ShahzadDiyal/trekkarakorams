'use client';

import React, { useState } from 'react';
import { TrekPackage, Currency } from '@/types';
import { PackageCard } from '@/components/PackageCard';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

interface PopularPackagesProps {
  treks: TrekPackage[];
  currency: Currency;
  activeRegionFilter: string;
  onFilterChange: (region: string) => void;
  onViewDetail: (trek: TrekPackage) => void;
  onBookNow: (trek: TrekPackage) => void;
  onResetFilters: () => void;
}

export const PopularPackages: React.FC<PopularPackagesProps> = ({
  treks,
  currency,
  activeRegionFilter,
  onFilterChange,
  onViewDetail,
  onBookNow,
  onResetFilters
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const filterTabs = [
    { label: 'All Packages', value: '' },
    { label: 'Karakoram (K2 & Baltoro)', value: 'Karakoram' },
    { label: 'Hunza & Nagar', value: 'Hunza & Nagar' },
    { label: 'Nanga Parbat / Himalayas', value: 'Himalayas' },
    { label: 'Deosai Plains', value: 'Deosai & Astore' }
  ];

  const filteredTreks = treks.filter((t) => {
    const matchesRegion = !activeRegionFilter || t.region.toLowerCase().includes(activeRegionFilter.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'ALL' || t.difficulty === selectedDifficulty;
    return matchesRegion && matchesDifficulty;
  });

  return (
    <section id="popular-packages-section" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-sky-600">
              Guaranteed Departures
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mt-1">
              Our Popular Packages
            </h2>
            <p className="text-[16px] text-slate-600 mt-1">
              Explore high-altitude landscapes around Pakistan with our certified expedition teams.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeRegionFilter && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-[14px] font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Filter: {activeRegionFilter}</span>
              </button>
            )}
          </div>
        </div>

       {/* Tab Filters */}
<div className="mb-8 border-b border-slate-200 pb-4">
  {/* Below md: Dropdown */}
  <div className="md:hidden relative">
    <select
      value={activeRegionFilter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="w-full appearance-none px-3.5 py-2.5 pr-10 text-[14px] font-bold bg-white text-slate-700 border border-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
    >
      {filterTabs.map((tab) => (
        <option key={tab.label} value={tab.value}>
          {tab.label}
        </option>
      ))}
    </select>

    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
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

  {/* md and above: Existing tabs */}
  <div className="hidden md:flex flex-wrap items-center gap-2">
    {filterTabs.map((tab) => {
      const isActive = activeRegionFilter === tab.value;

      return (
        <button
          key={tab.label}
          onClick={() => onFilterChange(tab.value)}
          className={`px-3.5 py-1.5 text-[14px] sm:text-[16px] font-bold transition-colors cursor-pointer border ${
            isActive
              ? 'bg-sky-600 text-white border-sky-600'
              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-sky-600'
          }`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
</div>

        {/* Package Grid */}
        {filteredTreks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="bg-white  p-12 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Treks Match Your Filter</h3>
            <p className="text-[16px] text-slate-600 mb-4">
              Try choosing another region or reset all filters to view our full expedition catalog.
            </p>
            <button
              onClick={onResetFilters}
              className="bg-sky-600 text-white font-bold text-[14px] px-4 py-2 hover:bg-sky-500 transition-colors"
            >
              Show All Trek Packages
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
