'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { TREK_PACKAGES } from '@/data/treks';
import { PackageCard } from '@/components/PackageCard';
import { useApp } from '@/lib/context/AppContext';
import {
  ACTIVITY_FACETS,
  REGION_FACETS,
  DIFFICULTY_FACETS,
  facetUrl,
  type FacetType,
} from '@/lib/trek-facets';
import {
  Search,
  RotateCcw,
  Mountain,
} from 'lucide-react';

interface LockedFacet {
  type: FacetType;
  value: string;
}

interface TreksPageClientProps {
  /**
   * When set, this page is a dedicated SEO route (e.g. /treks/activity/trekking)
   * and this facet is hard-applied server-side via the URL — it is never written
   * back out as a query string. Any further refinement below (search text, sort,
   * duration, or picking a *different* facet type) stays purely client-side state
   * so we never generate combinatorial, duplicate-content query-string URLs.
   */
  lockedFacet?: LockedFacet;
  /** Optional prefill for the free-text search box (from a noindexed ?q= link). */
  initialQuery?: string;
}

export const TreksPageClient: React.FC<TreksPageClientProps> = ({ lockedFacet, initialQuery = '' }) => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [selectedDurationRange, setSelectedDurationRange] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'altitude' | 'duration'>('recommended');

  const selectedRegion = lockedFacet?.type === 'region' ? lockedFacet.value : '';
  const selectedDifficulty = lockedFacet?.type === 'difficulty' ? lockedFacet.value : '';
  const selectedActivity = lockedFacet?.type === 'activity' ? lockedFacet.value : '';

  // Selecting a facet always navigates to its clean, canonical URL
  // (e.g. /treks/region/karakoram) instead of pushing a query string.
  const navigateToFacet = (type: FacetType, value: string) => {
    if (!value) {
      router.push('/treks');
      return;
    }
    router.push(facetUrl(type, value));
  };

  // Filter logic
  const filteredTreks = useMemo(() => {
    return TREK_PACKAGES.filter((t) => {
      // Keyword match (client-side refinement only, never part of the URL on facet pages)
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q) || t.shortTitle.toLowerCase().includes(q);
        const matchesOverview = t.overview.toLowerCase().includes(q);
        const matchesHighlights = t.highlights.some((h) => h.toLowerCase().includes(q));
        const matchesRegion = t.region.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOverview && !matchesHighlights && !matchesRegion) return false;
      }

      if (selectedRegion && t.region !== selectedRegion) return false;
      if (selectedDifficulty && t.difficulty !== selectedDifficulty) return false;
      if (selectedActivity && t.activityType !== selectedActivity) return false;

      // Duration match
      if (selectedDurationRange === 'short' && t.durationDays > 10) return false;
      if (selectedDurationRange === 'medium' && (t.durationDays <= 10 || t.durationDays > 18)) return false;
      if (selectedDurationRange === 'long' && t.durationDays <= 18) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPriceUSD || a.priceUSD;
      const priceB = b.discountPriceUSD || b.priceUSD;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'altitude') return b.maxAltitude - a.maxAltitude;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return b.rating - a.rating;
    });
  }, [query, selectedRegion, selectedDifficulty, selectedActivity, selectedDurationRange, sortBy]);

  const resetAllFilters = () => {
    setQuery('');
    setSelectedDurationRange('ALL');
    setSortBy('recommended');
    router.push('/treks');
  };

  const pageHeading = lockedFacet
    ? (lockedFacet.type === 'activity' ? `${lockedFacet.value} in Pakistan` : `${lockedFacet.value} Treks`)
    : 'Pakistan Trekking Packages';

  const pageSubheading = lockedFacet
    ? `Government-licensed ${lockedFacet.value.toLowerCase()} itineraries with permits, certified Balti mountain guides, and full basecamp logistics included.`
    : 'Explore government-licensed guided treks across the Karakoram, Western Himalayas, and Hindukush ranges. Includes permits, domestic flights, certified Balti mountain guides, and full basecamp logistics.';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-4">
          <button onClick={() => router.push('/')} className="hover:text-sky-600">Home</button>
          <span>/</span>
          <button onClick={() => router.push('/treks')} className="hover:text-sky-600">
            All Pakistan Trekking Expeditions
          </button>
          {lockedFacet && (
            <>
              <span>/</span>
              <span className="font-semibold text-slate-900">{lockedFacet.value}</span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
                2026 Guaranteed Departures
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                {pageHeading}
              </h1>
              <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {pageSubheading}
              </p>
            </div>

            <div className="bg-slate-900  p-4 shrink-0 text-[14px] text-sky-200">
              <div className="font-bold text-white text-[16px]">Need Custom Dates?</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Private bespoke groups welcome for any date.</div>
              <button
                onClick={() => router.push('/planner')}
                className="mt-3 w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium py-2 px-3 text-[14px] uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
              >
                Open Cost Planner
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white py-4 sm:py-5 mb-8 space-y-4">
          {/* Top Search & Reset Row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by mountain, glacier, region, or pass (e.g. K2, Concordia, Baltoro, Gondogoro, Fairy Meadows)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 pl-9 pr-3 py-2 text-[14px] sm:text-[16px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none bg-slate-50 border border-slate-300 px-3 py-2 text-[14px] font-semibold text-slate-900 focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="altitude">Max Altitude (Highest)</option>
                <option value="duration">Duration (Longest)</option>
              </select>

              <button
                onClick={resetAllFilters}
                className="px-3 py-2 text-[14px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1 shrink-0 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filter Chips Rows */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[13px]">
            {/* Region Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => navigateToFacet('region', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-[14px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Regions</option>
                {REGION_FACETS.map((r) => (
                  <option key={r.slug} value={r.value}>{r.value} ({r.count})</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => navigateToFacet('difficulty', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-[14px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Difficulties</option>
                {DIFFICULTY_FACETS.map((d) => (
                  <option key={d.slug} value={d.value}>{d.value} ({d.count})</option>
                ))}
              </select>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Activity Type
              </label>
              <select
                value={selectedActivity}
                onChange={(e) => navigateToFacet('activity', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-[14px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Activities</option>
                {ACTIVITY_FACETS.map((a) => (
                  <option key={a.slug} value={a.value}>{a.value} ({a.count})</option>
                ))}
              </select>
            </div>

            {/* Duration Range */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Duration
              </label>
              <select
                value={selectedDurationRange}
                onChange={(e) => setSelectedDurationRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-[14px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="ALL">All Durations</option>
                <option value="short">Short (1 - 10 Days)</option>
                <option value="medium">Medium (11 - 18 Days)</option>
                <option value="long">Extended (19+ Days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="text-[13px] font-bold text-slate-700">
            Showing <strong className="text-sky-700">{filteredTreks.length}</strong> Expedition Packages
          </div>

          <div className="flex items-center gap-2 text-[14px] text-slate-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
            <span>All packages include Gilgit-Baltistan permits & liaison support</span>
          </div>
        </div>

        {/* Packages Grid */}
        {filteredTreks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTreks.map((trek) => (
              <PackageCard
                key={trek.id}
                trek={trek}
                currency={currency}
                onViewDetail={() => router.push(`/treks/${trek.id}`)}
                onBookNow={() => {
                  onOpenBooking({
                    trekTitle: trek.title,
                    groupSize: 2,
                    totalPerPerson: trek.discountPriceUSD || trek.priceUSD,
                    notes: `Booked from Treks Catalog for 2026 departure`
                  });
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-300 p-12 text-center">
            <Mountain className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-slate-900">No matching treks found</h3>
            <p className="text-[13px] text-slate-600 mt-1 max-w-md mx-auto">
              We couldn't find any itineraries matching your specific search filters. Try clearing your filters or design a bespoke custom plan with our expedition team.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="bg-sky-600 text-white font-bold text-[14px] px-4 py-2 hover:bg-sky-500 transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => router.push('/planner')}
                className="bg-slate-900 text-white font-bold text-[14px] px-4 py-2 hover:bg-slate-800 transition-colors"
              >
                Create Custom Route
              </button>
            </div>
          </div>
        )}

        {/* Informational Guidance Section */}
        <div className="mt-14 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Pakistan Trekking Seasonality & Best Months
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[14px] text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50 ">
              <h3 className="font-bold text-slate-900 mb-1 text-[13px]">Peak Karakoram Summer (Mid-June - August)</h3>
              <p>
                Best period for K2 Base Camp, Gondogoro La pass, Snow Lake, and 8,000m base camps. High passes are snow-free or manageable with microspikes, and Baltoro glacial rivers are monitored daily.
              </p>
            </div>
            <div className="p-4 bg-slate-50 ">
              <h3 className="font-bold text-slate-900 mb-1 text-[13px]">Autumn Golden Season (September - October)</h3>
              <p>
                Crystal-clear skies, dry weather, and magnificent golden apricot foliage throughout Hunza, Nagar, Rakaposhi, and Fairy Meadows. Daytime temperatures are pleasant with crisp evenings.
              </p>
            </div>
            <div className="p-4 bg-slate-50 ">
              <h3 className="font-bold text-slate-900 mb-1 text-[13px]">Spring Blossom Season (April - May)</h3>
              <p>
                Ideal for lower-altitude cultural treks in Hunza, Skardu valley orchards, and lower Karakoram Highway scenic tours before high glacial passes open in June.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
