import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TREK_PACKAGES } from '../data/treks';
import { PackageCard } from '../components/PackageCard';
import { Currency, TrekPackage } from '../types';
import {
  Filter,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Mountain,
  Compass,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

interface TreksPageProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const TreksPage: React.FC<TreksPageProps> = ({ currency, onOpenBooking }) => {
  const router = useRouter();

  // Read initial query params from router.query (on mount and on URL changes)
  const initialQuery = (router.query.q as string) || '';
  const initialRegion = (router.query.region as string) || '';
  const initialDifficulty = (router.query.difficulty as string) || '';
  const initialActivity = (router.query.activity as string) || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [selectedActivity, setSelectedActivity] = useState(initialActivity);
  const [selectedDurationRange, setSelectedDurationRange] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'altitude' | 'duration'>('recommended');

  // Sync local state with URL query params when they change (e.g., browser back/forward)
  useEffect(() => {
    setQuery((router.query.q as string) || '');
    setSelectedRegion((router.query.region as string) || '');
    setSelectedDifficulty((router.query.difficulty as string) || '');
    setSelectedActivity((router.query.activity as string) || '');
  }, [router.query]);

  // Update URL query params when filters change
  useEffect(() => {
    const queryParams: Record<string, string> = {};
    if (query) queryParams.q = query;
    if (selectedRegion) queryParams.region = selectedRegion;
    if (selectedDifficulty) queryParams.difficulty = selectedDifficulty;
    if (selectedActivity) queryParams.activity = selectedActivity;

    router.replace(
      {
        pathname: router.pathname,
        query: queryParams,
      },
      undefined,
      { shallow: true }
    );
  }, [query, selectedRegion, selectedDifficulty, selectedActivity, router]);

  const regions = [
    'Central Karakoram',
    'Western Himalayas',
    'Biafo & Hispar',
    'Nagar Valley',
    'Hunza & Shimshal',
    'Deosai & Astore'
  ];

  const difficulties = ['Moderate', 'Strenuous', 'Technical Alpine'];
  const activities = ['Trekking', 'Pass Crossing', 'Heli Trek', 'Expedition'];

  // Filter logic
  const filteredTreks = useMemo(() => {
    return TREK_PACKAGES.filter((t) => {
      // Keyword match
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q) || t.shortTitle.toLowerCase().includes(q);
        const matchesOverview = t.overview.toLowerCase().includes(q);
        const matchesHighlights = t.highlights.some((h) => h.toLowerCase().includes(q));
        const matchesRegion = t.region.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOverview && !matchesHighlights && !matchesRegion) return false;
      }

      // Region match
      if (selectedRegion && t.region !== selectedRegion) {
        return false;
      }

      // Difficulty match
      if (selectedDifficulty && t.difficulty !== selectedDifficulty) {
        return false;
      }

      // Activity match
      if (selectedActivity && t.activityType !== selectedActivity) {
        return false;
      }

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
    setSelectedRegion('');
    setSelectedDifficulty('');
    setSelectedActivity('');
    setSelectedDurationRange('ALL');
    setSortBy('recommended');
    // Clear URL query params
    router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => router.push('/')} className="hover:text-sky-600">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">All Pakistan Trekking Expeditions</span>
        </div>

        {/* Page Header */}
        <div className="bg-sky-950 text-white p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                2026 Guaranteed Departures
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Pakistan Trekking Packages
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Explore government-licensed guided treks across the Karakoram, Western Himalayas, and Hindukush ranges. Includes permits, domestic flights, certified Balti mountain guides, and full basecamp logistics.
              </p>
            </div>

            <div className="bg-slate-900 p-4 shrink-0 text-xs text-sky-200">
              <div className="font-bold text-white text-sm">Need Custom Dates?</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Private bespoke groups welcome for any date.</div>
              <button
                onClick={() => router.push('/planner')}
                className="mt-3 w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium py-2 px-3 text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Open Cost Planner
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 mb-8 space-y-4">
          {/* Top Search & Reset Row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by mountain, glacier, region, or pass (e.g. K2, Concordia, Baltoro, Gondogoro, Fairy Meadows)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none bg-slate-50 border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="altitude">Max Altitude (Highest)</option>
                <option value="duration">Duration (Longest)</option>
              </select>

              <button
                onClick={resetAllFilters}
                className="px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1 shrink-0 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filter Chips Rows */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Region Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
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
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Difficulties</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
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
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Activities</option>
                {activities.map((a) => (
                  <option key={a} value={a}>{a}</option>
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
                className="w-full bg-slate-50 border border-slate-300 p-2 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
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
          <div className="text-xs font-bold text-slate-700">
            Showing <strong className="text-sky-700">{filteredTreks.length}</strong> Expedition Packages
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
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
            <h3 className="text-base font-bold text-slate-900">No matching treks found</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              We couldn't find any itineraries matching your specific search filters. Try clearing your filters or design a bespoke custom plan with our expedition team.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="bg-sky-600 text-white font-bold text-xs px-4 py-2 hover:bg-sky-500 transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => router.push('/planner')}
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2 hover:bg-slate-800 transition-colors"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-1 text-xs">Peak Karakoram Summer (Mid-June - August)</h3>
              <p>
                Best period for K2 Base Camp, Gondogoro La pass, Snow Lake, and 8,000m base camps. High passes are snow-free or manageable with microspikes, and Baltoro glacial rivers are monitored daily.
              </p>
            </div>
            <div className="p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-1 text-xs">Autumn Golden Season (September - October)</h3>
              <p>
                Crystal-clear skies, dry weather, and magnificent golden apricot foliage throughout Hunza, Nagar, Rakaposhi, and Fairy Meadows. Daytime temperatures are pleasant with crisp evenings.
              </p>
            </div>
            <div className="p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-1 text-xs">Spring Blossom Season (April - May)</h3>
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