
'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTreks } from '@/lib/content';
import { TrekGridSkeleton } from '@/components/TrekSkeletons';
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
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LockedFacet {
  type: FacetType;
  value: string;
}

interface TreksPageClientProps {
  lockedFacet?: LockedFacet;
  initialQuery?: string;
}

export const TreksPageClient: React.FC<TreksPageClientProps> = ({
  lockedFacet,
  initialQuery = '',
}) => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();

  // Live trek catalog from Firestore (static data only if the DB is unreachable).
  const { treks: allTreks, loading: treksLoading } = useTreks();

  const [query, setQuery] = useState(initialQuery);
  const [selectedDurationRange, setSelectedDurationRange] =
    useState<string>('ALL');

  const [sortBy, setSortBy] = useState<
    'recommended' | 'price-asc' | 'price-desc' | 'altitude' | 'duration'
  >('recommended');

  const selectedRegion =
    lockedFacet?.type === 'region' ? lockedFacet.value : '';

  const selectedDifficulty =
    lockedFacet?.type === 'difficulty' ? lockedFacet.value : '';

  const selectedActivity =
    lockedFacet?.type === 'activity' ? lockedFacet.value : '';

  const navigateToFacet = (type: FacetType, value: string) => {
    if (!value) {
      router.push('/treks');
      return;
    }

    router.push(facetUrl(type, value));
  };

  const filteredTreks = useMemo(() => {
    return allTreks.filter((trek) => {
      if (query.trim()) {
        const q = query.toLowerCase().trim();

        const matchesTitle =
          trek.title.toLowerCase().includes(q) ||
          trek.shortTitle.toLowerCase().includes(q);

        const matchesOverview =
          trek.overview.toLowerCase().includes(q);

        const matchesHighlights = trek.highlights.some((highlight) =>
          highlight.toLowerCase().includes(q)
        );

        const matchesRegion =
          trek.region.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesOverview &&
          !matchesHighlights &&
          !matchesRegion
        ) {
          return false;
        }
      }

      if (selectedRegion && trek.region !== selectedRegion) {
        return false;
      }

      if (
        selectedDifficulty &&
        trek.difficulty !== selectedDifficulty
      ) {
        return false;
      }

      if (
        selectedActivity &&
        trek.activityType !== selectedActivity
      ) {
        return false;
      }

      if (
        selectedDurationRange === 'short' &&
        trek.durationDays > 10
      ) {
        return false;
      }

      if (
        selectedDurationRange === 'medium' &&
        (trek.durationDays <= 10 || trek.durationDays > 18)
      ) {
        return false;
      }

      if (
        selectedDurationRange === 'long' &&
        trek.durationDays <= 18
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPriceUSD || a.priceUSD;
      const priceB = b.discountPriceUSD || b.priceUSD;

      if (sortBy === 'price-asc') {
        return priceA - priceB;
      }

      if (sortBy === 'price-desc') {
        return priceB - priceA;
      }

      if (sortBy === 'altitude') {
        return b.maxAltitude - a.maxAltitude;
      }

      if (sortBy === 'duration') {
        return b.durationDays - a.durationDays;
      }

      return b.rating - a.rating;
    });
  }, [
    allTreks,
    query,
    selectedRegion,
    selectedDifficulty,
    selectedActivity,
    selectedDurationRange,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setQuery('');
    setSelectedDurationRange('ALL');
    setSortBy('recommended');
    router.push('/treks');
  };

  const pageHeading = lockedFacet
    ? lockedFacet.type === 'activity'
      ? `${lockedFacet.value} in Pakistan`
      : `${lockedFacet.value} Treks`
    : 'Our treks. Choose yours.';

  const pageSubheading = lockedFacet
    ? `Every package includes a local guide from Gilgit-Baltistan, all meals, accommodation, permits, and transport from Skardu. No hidden costs. What you see is what you pay.`
    : `Every package includes a local guide from Gilgit-Baltistan, all meals, accommodation, permits, and transport from Skardu. No hidden costs. What you see is what you pay.`;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <button
              onClick={() => router.push('/')}
              className="transition-colors hover:text-sky-600"
            >
              Home
            </button>

            <span>/</span>

            <button
              onClick={() => router.push('/treks')}
              className="transition-colors hover:text-sky-600"
            >
              Trekking Packages
            </button>

            {lockedFacet && (
              <>
                <span>/</span>
                <span className="font-semibold text-slate-900">
                  {lockedFacet.value}
                </span>
              </>
            )}
          </div>

          {/* Hero */}
          <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">

            <div className="max-w-3xl">

              <span className="inline-flex items-center border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-700">
                2026 Season
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {pageHeading}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {pageSubheading}
              </p>

            </div>

            {/* Custom Plan */}
            <div className="border border-slate-200 bg-slate-50 p-5">

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-sky-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-950">
                    Want a custom itinerary?
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Private groups and flexible dates welcome. Tell us what you have in mind.
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push('/custom-plan')}
                className="mt-4 flex w-full items-center justify-center gap-2 bg-sky-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky-700"
              >
                Plan a Custom Trip
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FILTERS
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by mountain, glacier, region, or pass..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
              />

            </div>

            {/* Sort + Reset */}
            <div className="flex w-full gap-2 lg:w-auto">

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as
                      | 'recommended'
                      | 'price-asc'
                      | 'price-desc'
                      | 'altitude'
                      | 'duration'
                  )
                }
                className="flex-1 border border-slate-300 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500 lg:w-52 lg:flex-none"
              >
                <option value="recommended">
                  Sort by: Recommended
                </option>
                <option value="price-asc">
                  Price: Low to High
                </option>
                <option value="price-desc">
                  Price: High to Low
                </option>
                <option value="altitude">
                  Max Altitude
                </option>
                <option value="duration">
                  Duration
                </option>
              </select>

              <button
                onClick={resetAllFilters}
                className="flex items-center justify-center gap-2 border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  Reset
                </span>
              </button>

            </div>
          </div>

          {/* Facets */}
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Region */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Region
              </label>

              <select
                value={selectedRegion}
                onChange={(event) =>
                  navigateToFacet(
                    'region',
                    event.target.value
                  )
                }
                className="w-full border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
              >
                <option value="">All Regions</option>

                {REGION_FACETS.map((region) => (
                  <option
                    key={region.slug}
                    value={region.value}
                  >
                    {region.value} ({region.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Difficulty
              </label>

              <select
                value={selectedDifficulty}
                onChange={(event) =>
                  navigateToFacet(
                    'difficulty',
                    event.target.value
                  )
                }
                className="w-full border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
              >
                <option value="">All Difficulties</option>

                {DIFFICULTY_FACETS.map((difficulty) => (
                  <option
                    key={difficulty.slug}
                    value={difficulty.value}
                  >
                    {difficulty.value} ({difficulty.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Activity Type
              </label>

              <select
                value={selectedActivity}
                onChange={(event) =>
                  navigateToFacet(
                    'activity',
                    event.target.value
                  )
                }
                className="w-full border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
              >
                <option value="">All Activities</option>

                {ACTIVITY_FACETS.map((activity) => (
                  <option
                    key={activity.slug}
                    value={activity.value}
                  >
                    {activity.value} ({activity.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Duration
              </label>

              <select
                value={selectedDurationRange}
                onChange={(event) =>
                  setSelectedDurationRange(event.target.value)
                }
                className="w-full border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-sky-500"
              >
                <option value="ALL">
                  All Durations
                </option>
                <option value="short">
                  Short (1 - 10 Days)
                </option>
                <option value="medium">
                  Medium (11 - 18 Days)
                </option>
                <option value="long">
                  Extended (19+ Days)
                </option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          RESULTS
      ========================================================= */}
      <section className="bg-slate-50">
        <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">

          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Trek Karakoram
              </span>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                Showing{' '}
                <span className="text-sky-700">
                  {filteredTreks.length}
                </span>{' '}
                expedition packages
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Gilgit-Baltistan permits & liaison support included
              </span>
            </div>

          </div>

          {/* Cards */}
          {treksLoading ? (
            <TrekGridSkeleton count={6} />
          ) : filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredTreks.map((trek) => (
                <PackageCard
                  key={trek.id}
                  trek={trek}
                  currency={currency}
                  onViewDetail={() =>
                    router.push(`/treks/${trek.id}`)
                  }
                  onBookNow={() => {
                    onOpenBooking({
                      trekTitle: trek.title,
                      groupSize: 2,
                      totalPerPerson:
                        trek.discountPriceUSD ||
                        trek.priceUSD,
                      notes:
                        'Booked from Treks Catalog for 2026 departure',
                    });
                  }}
                />
              ))}

            </div>
          ) : (
            <div className="border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <Mountain className="mx-auto mb-4 h-12 w-12 text-slate-300" />

              <h3 className="text-lg font-bold text-slate-900">
                No matching treks found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find any itineraries matching your current filters. Try clearing the filters or create a custom trip.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                <button
                  onClick={resetAllFilters}
                  className="bg-sky-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky-700"
                >
                  Reset All Filters
                </button>

                <button
                  onClick={() => router.push('/custom-plan')}
                  className="bg-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
                >
                  Create Custom Route
                </button>

              </div>

            </div>
          )}

          {/* =====================================================
              SEASONALITY
          ===================================================== */}
          <div className="mt-16">

            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-sky-600">
                Plan Your Adventure
              </span>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                When to come.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <div className="border border-slate-200 bg-white p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  June — August
                </span>

                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Peak Karakoram Summer
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Best period for K2 Base Camp, Gondogoro La, Snow Lake, and high-altitude base camps.
                </p>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  September — October
                </span>

                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Autumn Golden Season
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear skies, dry weather, and golden autumn scenery across Hunza, Nagar, Rakaposhi, and Fairy Meadows.
                </p>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  April — May
                </span>

                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Spring Blossom Season
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ideal for lower-altitude cultural treks, Hunza valley orchards, and scenic routes before the high passes open.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
};