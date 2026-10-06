'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mountain,
  MapPin,
  Compass,
  ArrowRight,
  Sun,
  Calendar,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TREK_PACKAGES } from '@/data/treks';
import { useDestinations } from '@/lib/content';
import {
  DESTINATION_REGIONS,
  type DestinationRegion,
} from '@/data/destinations';

// Re-exported for the sitemap and seed scripts.
export { DESTINATION_REGIONS };
import { useApp } from '@/lib/context/AppContext';
import { facetUrl, isKnownRegion } from '@/lib/trek-facets';

// Maps each editorial destination region to the real `region` value used on
// TrekPackage records.
const DESTINATION_ID_TO_TREK_REGION: Record<string, string> = {
  karakoram: 'Karakoram',
  'hunza-nagar': 'Hunza & Nagar',
  'himalayas-nanga-parbat': 'Himalayas',
  deosai: 'Deosai & Astore',
  shimshal: 'Hunza & Nagar',
};


export const DestinationsPageClient: React.FC<{ initialRegionId?: string }> = ({
  initialRegionId,
}) => {
  const router = useRouter();
  const { currency } = useApp();

  // Live published regions from the admin panel (static fallback built in).
  const { destinations } = useDestinations();
  const regions = destinations.length > 0 ? destinations : DESTINATION_REGIONS;

  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    initialRegionId || regions[0]?.id || ''
  );

  const activeRegion =
    regions.find((r) => (r.slug || r.id) === selectedRegionId || r.id === selectedRegionId) ||
    regions[0];

  return (
    <main className="flex-1 bg-white">

      {/* ============================================================
          1. PAGE INTRO
      ============================================================ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          {/* Breadcrumb */}
          <div className="mb-7 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
            <Link
              href="/"
              className="transition-colors hover:text-sky-600"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-semibold text-slate-900">
              Northern Pakistan Trekking Destinations
            </span>
          </div>

          <div className="max-w-4xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Geographic Explorer & Guide
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Pakistan Mountain Destinations
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Northern Pakistan is the collision point of three of the
              world’s greatest mountain ranges: the Karakoram, the Himalayas,
              and the Hindukush. Explore each region below.
            </p>

          </div>
        </div>
      </section>


      {/* ============================================================
          2. REGION SELECTOR
      ============================================================ */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Explore by Region
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Choose your mountain sector
              </h2>
            </div>

            <Compass className="hidden h-6 w-6 text-slate-300 sm:block" />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {regions.map((region) => {
              const isSelected = region.id === selectedRegionId;

              return (
                <Link
                  key={region.id}
                  href={`/destination/${region.slug || region.id}`}
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`group flex min-h-[82px] cursor-pointer flex-col justify-center rounded-xl border p-3 text-left transition-all duration-200 sm:p-4 ${
                    isSelected
                      ? 'border-sky-600 bg-sky-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-white'
                  }`}
                >
                  <div
                    className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isSelected
                        ? 'text-sky-100'
                        : 'text-slate-400'
                    }`}
                  >
                    {region.mountainRange.split(' ')[0]}
                  </div>

                  <div
                    className={`mt-1 text-[13px] font-bold leading-tight sm:text-[15px] ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-900'
                    }`}
                  >
                    {region.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ============================================================
          3. ACTIVE DESTINATION
      ============================================================ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          <div className="mb-8 max-w-3xl">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Region Spotlight
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 sm:text-4xl">
              {activeRegion.name}
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              {activeRegion.tagline}
            </p>

          </div>

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-12">

            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-slate-900 sm:h-96 lg:col-span-5 lg:h-auto lg:min-h-[620px]">

              <img
                src={activeRegion.image}
                alt={activeRegion.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-6 left-5 right-5 sm:left-7 sm:right-7">

                <span className="inline-flex rounded-xl bg-sky-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950">
                  {activeRegion.mountainRange}
                </span>

                <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {activeRegion.name}
                </h3>

              </div>
            </div>


            {/* Details */}
            <div className="lg:col-span-7">

              <div className="p-6 sm:p-8 lg:p-10">

                {/* Overview */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-sky-600" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                      Region Profile
                    </span>
                  </div>

                  <p className="text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-8">
                    {activeRegion.overview}
                  </p>
                </div>


                {/* Facts */}
                <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sky-600" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        Primary Hub
                      </span>
                    </div>

                    <p className="text-sm font-semibold leading-6 text-slate-900">
                      {activeRegion.hubCity}
                    </p>
                  </div>


                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Sun className="h-4 w-4 text-sky-600" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        Best Season
                      </span>
                    </div>

                    <p className="text-sm font-semibold leading-6 text-slate-900">
                      {activeRegion.bestMonths}
                    </p>
                  </div>


                  <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-sky-600" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        Access Airport / Route
                      </span>
                    </div>

                    <p className="text-sm font-semibold leading-6 text-slate-900">
                      {activeRegion.accessAirport}
                    </p>
                  </div>

                </div>


                {/* Peaks */}
                <div className="mt-8">

                  <div className="mb-3 flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-sky-600" />

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                      Notable Peaks & Spires
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeRegion.keyPeaks.map((peak, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-1.5 text-[12px] font-semibold text-sky-800"
                      >
                        {peak}
                      </span>
                    ))}
                  </div>

                </div>


                {/* Highlights */}
                <div className="mt-8">

                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-600" />

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                      Top Geographical Highlights
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6">

                    {activeRegion.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] leading-6 text-slate-600"
                      >
                        <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-sky-600" />

                        <span>{highlight}</span>
                      </li>
                    ))}

                  </ul>

                </div>


                {/* CTA */}
                <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-[13px] text-slate-500">
                      Ready to explore this region?
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                      Browse available expeditions.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const trekRegion =
                        DESTINATION_ID_TO_TREK_REGION[activeRegion.id];

                      router.push(
                        trekRegion && isKnownRegion(trekRegion)
                          ? facetUrl('region', trekRegion)
                          : '/treks'
                      );
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700 sm:w-auto"
                  >
                    <span>
                      Browse {activeRegion.name.split(' ')[0]} Treks
                    </span>

                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================================
          4. ALL REGIONS
      ============================================================ */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          {/* Header */}
          <div className="mb-10 max-w-3xl">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Explore Northern Pakistan
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 sm:text-4xl">
              Mountain sectors worth exploring.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              From the glaciers of Baltoro to the high plains of Deosai,
              each region offers a completely different experience of
              Pakistan’s mountains.
            </p>

          </div>


          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {regions.map((region) => (
              <article
                key={region.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-sky-300"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-200">

                  <img
                    src={region.image}
                    alt={region.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">

                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300">
                      {region.mountainRange}
                    </span>

                    <h3 className="mt-1 text-xl font-bold leading-tight text-white">
                      {region.name}
                    </h3>

                  </div>
                </div>


                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  <p className="text-[13px] leading-6 text-slate-600 line-clamp-4">
                    {region.overview}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-[12px] font-medium text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-sky-600" />

                    <span>{region.hubCity}</span>
                  </div>


                  <Link
                    href={`/destination/${region.slug || region.id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-slate-800 transition-all duration-200 hover:border-sky-600 hover:bg-sky-600 hover:text-white"
                  >
                    <span>View Destination Details</span>

                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ============================================================
          5. BOTTOM CTA
      ============================================================ */}
      <section className="bg-sky-600 text-white">

        <div className="mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-100">
                Plan Your Journey
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Not sure which region is right for you?
              </h2>

              <p className="mt-2 text-sm leading-6 text-sky-100 sm:text-base">
                Tell us what kind of experience you are looking for and our
                local team can help you choose the right route.
              </p>

            </div>


            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

              <button
                onClick={() => router.push('/planner')}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-slate-950 px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-slate-900 sm:w-auto rounded-xl"
              >
                <span>Plan Your Trek</span>

                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push('/treks')}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-white/30 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-sky-900 transition-all duration-200 hover:bg-slate-100 sm:w-auto rounded-xl"
              >
                <span>Browse All Treks</span>

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};
