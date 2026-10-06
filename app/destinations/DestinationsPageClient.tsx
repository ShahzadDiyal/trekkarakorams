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

interface DestinationRegion {
  id: string;
  name: string;
  mountainRange: string;
  tagline: string;
  image: string;
  overview: string;
  keyPeaks: string[];
  bestMonths: string;
  hubCity: string;
  accessAirport: string;
  highlights: string[];
  matchedTrekIds: string[];
}

export const DESTINATION_REGIONS: DestinationRegion[] = [
  {
    id: 'karakoram',
    name: 'Central Karakoram & Baltoro',
    mountainRange: 'Karakoram Mountain Range',
    tagline:
      'Home of K2, Concordia & the World’s Greatest Glacier Highway',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    overview:
      'The Central Karakoram in Baltistan is the dense epicenter of global mountaineering. Within a 20km radius of Concordia amphitheatre sit four of the planet’s fourteen 8,000-meter peaks (K2 8,611m, Gasherbrum I 8,080m, Broad Peak 8,051m, Gasherbrum II 8,035m) surrounded by towering granite spires like Trango Towers and Cathedral Peak.',
    keyPeaks: [
      'K2 (8,611m)',
      'Broad Peak (8,051m)',
      'Gasherbrum I-IV',
      'Trango Towers (6,286m)',
      'Muztagh Tower',
    ],
    bestMonths: 'Mid-June to late August (Summer Glacier Season)',
    hubCity: 'Skardu, Gilgit-Baltistan',
    accessAirport:
      'Skardu International Airport (Direct flights from Islamabad)',
    highlights: [
      'Concordia (The Throne Room of the Mountain Gods)',
      '62km long Baltoro Glacier trekking route',
      'Gondogoro La glaciated pass (5,585m)',
      'Historic base camps of legendary mountaineers',
    ],
    matchedTrekIds: [
      'k2-basecamp-gondogoro-la',
      'k2-basecamp-classic',
      'k2-basecamp-heli-trek',
    ],
  },
  {
    id: 'hunza-nagar',
    name: 'Hunza & Nagar Valleys',
    mountainRange: 'Central & Western Karakoram',
    tagline:
      'Ancient Silk Road Kingdoms, Hanging Glaciers & Vibrant Orchards',
    image:
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Flanked by the legendary Karakoram Highway (KKH), Hunza and Nagar are celebrated for dramatic verticality. Rakaposhi (7,788m) rises 6,000 uninterrupted meters from the river valley, while Passu Cones pierce the skyline above apricot and walnut orchards.',
    keyPeaks: [
      'Rakaposhi (7,788m)',
      'Diran Peak (7,266m)',
      'Passu Sar (7,478m)',
      'Ultar Sar (7,388m)',
      'Ladyfinger Peak',
    ],
    bestMonths:
      'April to October (Spring Blossoms, Summer Treks, Autumn Gold)',
    hubCity: 'Karimabad / Aliabad',
    accessAirport:
      'Gilgit Airport (45 min flight from Islamabad) or KKH drive',
    highlights: [
      'Rakaposhi & Diran Base Camp at Tagafari',
      'Rush Lake (World’s highest alpine lake at 4,694m)',
      'Historic 900-year-old Baltit and Altit Forts',
      'Passu Glacier and Hussaini Suspension Bridge',
    ],
    matchedTrekIds: ['rakaposhi-diran-base-camp', 'rush-lake-and-peak'],
  },
  {
    id: 'himalayas-nanga-parbat',
    name: 'Western Himalayas & Nanga Parbat',
    mountainRange: 'Western Himalayan Range',
    tagline:
      'Fairy Meadows & The Colossal 8,126m Killer Mountain',
    image:
      'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Nanga Parbat anchors the western terminus of the 2,400km Himalayan chain in Pakistan. With the world’s greatest single vertical rock and ice face (the 4,500m Rupal Face), this mountain provides unparalleled majesty viewed from the lush pine alpine pastures of Fairy Meadows and Beyal Camp.',
    keyPeaks: [
      'Nanga Parbat (8,126m)',
      'Raikot Peak (7,070m)',
      'Chongra Peak (6,830m)',
      'Mazeno Ridge',
    ],
    bestMonths: 'May to October',
    hubCity: 'Chilas / Raikot Bridge',
    accessAirport:
      'Gilgit Airport or Islamabad to Chilas scenic overland highway',
    highlights: [
      'Fairy Meadows log cabins facing the Raikot Glacier',
      'Beyal Camp & Nanga Parbat Base Camp walk',
      '4WD mountain jeep track through Raikot Gorge',
      'View of the Indus River collision with the Himalayas',
    ],
    matchedTrekIds: ['fairy-meadows-nanga-parbat'],
  },
  {
    id: 'deosai',
    name: 'Deosai High Plains & Astore',
    mountainRange: 'Himalayan-Karakoram Plateau',
    tagline:
      'The Land of Giants Second Highest Alpine Plateau on Earth',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Averaging 4,114 meters above sea level, Deosai National Park is a breathtaking expanse of rolling wildflowers, crystal-clear glacial streams, and high-altitude lakes. It is the protected wilderness sanctuary of the endangered Himalayan Brown Bear and snow leopards.',
    keyPeaks: [
      'Nanga Parbat (visible from Sheosar)',
      'Burzil Pass (4,100m)',
      'Shatung Pass',
    ],
    bestMonths: 'July to September (Wildflower Bloom)',
    hubCity: 'Skardu / Astore Valley',
    accessAirport:
      'Skardu Airport (1.5h jeep ascent to Deosai gate)',
    highlights: [
      'Sheosar Lake mirroring high snowcapped peaks',
      'Himalayan Brown Bear habitat safari',
      'Expedition camping under dark starlit skies',
      'Traverse linking Baltistan to Astore Valley',
    ],
    matchedTrekIds: ['deosai-plains-burzil'],
  },
  {
    id: 'shimshal',
    name: 'Shimshal Valley & High Pamir',
    mountainRange: 'Northern Karakoram & Pamir Transition',
    tagline:
      'Remote Wakhi Mountaineering Villages & 6,000m Trekking Peaks',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Shimshal is the highest settlement in Hunza, inhabited by tough Wakhi mountaineers who have produced many of Pakistan’s legendary K2 summiters. It offers pristine, crowd-free trekking to Shimshal Pass (4,735m) and non-technical alpine ascents of Minglik Sar (6,050m).',
    keyPeaks: [
      'Minglik Sar (6,050m)',
      'Disteghil Sar (7,885m)',
      'Kunjut Sar (7,760m)',
      'Shimshal Whitehorn',
    ],
    bestMonths: 'June to September',
    hubCity: 'Shimshal / Passu',
    accessAirport:
      'Gilgit Airport + KKH + Shimshal Gorge 4WD road',
    highlights: [
      'Non-technical 6,000m summit experience',
      'High Pamir summer pastures with yaks and glacial rivers',
      'Deep cultural immersion with authentic Wakhi mountain folk',
      'Untouched trekking circuits far off standard tourist trails',
    ],
    matchedTrekIds: ['shimshal-minglik-sar'],
  },
];

export const DestinationsPageClient: React.FC<{ initialRegionId?: string }> = ({
  initialRegionId,
}) => {
  const router = useRouter();
  const { currency } = useApp();

  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    initialRegionId || DESTINATION_REGIONS[0].id
  );

  const activeRegion =
    DESTINATION_REGIONS.find((r) => r.id === selectedRegionId) ||
    DESTINATION_REGIONS[0];

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
            {DESTINATION_REGIONS.map((region) => {
              const isSelected = region.id === selectedRegionId;

              return (
                <Link
                  key={region.id}
                  href={`/destinations/${region.id}`}
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

          <div className="grid overflow-hidden border border-slate-200 bg-white lg:grid-cols-12">

            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-slate-900 sm:h-96 lg:col-span-5 lg:h-auto lg:min-h-[620px]">

              <img
                src={activeRegion.image}
                alt={activeRegion.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-6 left-5 right-5 sm:left-7 sm:right-7">

                <span className="inline-flex bg-sky-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950">
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
                <div className="mt-8 grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2">

                  <div className="bg-slate-50 p-4">
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


                  <div className="bg-slate-50 p-4">
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


                  <div className="bg-slate-50 p-4 sm:col-span-2">
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
                        className="border border-sky-100 bg-sky-50 px-3 py-1.5 text-[12px] font-semibold text-sky-800"
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
                    className="inline-flex w-full items-center justify-center gap-2 bg-sky-600 px-5 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700 sm:w-auto"
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

            {DESTINATION_REGIONS.map((region) => (
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
                    href={`/destinations/${region.id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-slate-800 transition-all duration-200 hover:border-sky-600 hover:bg-sky-600 hover:text-white"
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
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-slate-950 px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-slate-900 sm:w-auto"
              >
                <span>Plan Your Trek</span>

                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push('/treks')}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-white/30 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-sky-900 transition-all duration-200 hover:bg-slate-100 sm:w-auto"
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