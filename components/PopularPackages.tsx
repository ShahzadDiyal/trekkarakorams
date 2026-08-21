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
  const [showAllFilters, setShowAllFilters] = useState(false);

  const filterTabs = [
    { label: 'All Packages', value: '' },
    { label: 'Karakoram (K2 & Baltoro)', value: 'Karakoram' },
    { label: 'Hunza & Nagar', value: 'Hunza & Nagar' },
    { label: 'Nanga Parbat / Himalayas', value: 'Himalayas' },
    { label: 'Deosai Plains', value: 'Deosai & Astore' }
  ];

  // Show first 3 filters on mobile, all on desktop or when expanded
  const visibleFilters = showAllFilters
    ? filterTabs
    : filterTabs.slice(0, 3);

  const filteredTreks = treks.filter((t) => {
    const matchesRegion = !activeRegionFilter || t.region.toLowerCase().includes(activeRegionFilter.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'ALL' || t.difficulty === selectedDifficulty;
    return matchesRegion && matchesDifficulty;
  });

  return (
    <section id="popular-packages-section" className="py-10 sm:py-12 md:py-14 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-wider text-sky-600">
              Guaranteed Departures
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 tracking-tight mt-1">
              Our Popular Packages
            </h2>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 mt-1">
              Explore high-altitude landscapes around Pakistan with our certified expedition teams.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {activeRegionFilter && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 px-2.5 sm:px-3 py-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Clear Filter</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 border-b border-slate-200 pb-3 sm:pb-4">
          {visibleFilters.map((tab) => {
            const isActive = activeRegionFilter === tab.value;
            return (
              <button
                key={tab.label}
                onClick={() => onFilterChange(tab.value)}
                className={`px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-[13px] md:text-[16px] font-bold transition-colors cursor-pointer border ${isActive
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-sky-600'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Show More/Less Button - Mobile Only */}
          {filterTabs.length > 3 && (
            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="md:hidden px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-[13px] font-bold transition-colors cursor-pointer border border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-600"
            >
              {showAllFilters ? 'Show Less' : `+${filterTabs.length - 3} More`}
            </button>
          )}
        </div>

        {/* Package Grid */}
        {filteredTreks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
          <div className="bg-white p-8 sm:p-10 md:p-12 text-center border border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">No Treks Match Your Filter</h3>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 mb-4">
              Try choosing another region or reset all filters to view our full expedition catalog.
            </p>
            <button
              onClick={onResetFilters}
              className="bg-sky-600 text-white font-bold text-[12px] sm:text-[13px] px-4 py-2 hover:bg-sky-500 transition-colors"
            >
              Show All Trek Packages
            </button>
          </div>
        )}
      </div>
    </section>
  );
};