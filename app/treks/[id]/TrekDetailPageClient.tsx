'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { TREK_PACKAGES, BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';
import { Currency, TrekPackage } from '@/types';
import { formatPrice } from '@/utils/currency';
import {
  Mountain,
  Calendar,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageSquare,
  Luggage,
  FileText,
  Activity,
  Share2,
  MapPin,
  Users,
  ChevronRight,
  PhoneCall,
  Sparkles,
  Gift
} from 'lucide-react';

interface TrekDetailPageProps {
  trek: TrekPackage;
}

export const TrekDetailPageClient: React.FC<TrekDetailPageProps> = ({ trek }) => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();

  const [activeTab, setActiveTab] = useState<'itinerary' | 'packages' | 'inclusions' | 'gear' | 'permits' | 'weather'>('itinerary');
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [selectedDate, setSelectedDate] = useState<string>(trek.departureDates[0] || '');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  // Price calculations based on tier
  const baseTierPrice =
    selectedTier === 'basic'
      ? (trek.basicPriceUSD || Math.round(trek.priceUSD * 0.75))
      : selectedTier === 'premium'
        ? (trek.premiumPriceUSD || Math.round(trek.priceUSD * 1.35))
        : (trek.discountPriceUSD || trek.priceUSD);

  const displayPrice = baseTierPrice;
  const totalPrice = displayPrice * travelersCount;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBook = () => {
    onOpenBooking({
      trekTitle: `${trek.title} (${selectedTier.toUpperCase()} Package)`,
      groupSize: travelersCount,
      totalPerPerson: displayPrice,
      notes: `Departure Date: ${selectedDate || '2026 Guaranteed Departure'}, Tier: ${selectedTier.toUpperCase()}`
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Trek Karakoram! I am inquiring about "${trek.title}" (${selectedTier.toUpperCase()} tier, ${trek.durationDays} Days) for ${travelersCount} traveler(s). Target Date: ${selectedDate}. Please provide availability & permit guidance.`
  );

  const otherTreks = TREK_PACKAGES.filter((t) => t.id !== trek.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/treks" className="hover:text-sky-600">Trekking Packages</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{trek.title}</span>
        </div>

        {/* Hero Section of Trek */}
        <div className="bg-slate-950 text-white overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Main Visual Photo (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden">
              <img
                src={trek.image}
                alt={trek.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-sky-600 text-white font-bold text-[13px] px-3 py-1 uppercase tracking-wider">
                  {trek.region}
                </span>
                <span className="bg-slate-900/90 border border-slate-700 text-sky-300 font-bold text-[13px] px-3 py-1">
                  {trek.activityType}
                </span>
              </div>

              {/* Founding Member Badge */}
              <div className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 font-bold text-[13px] px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Founding Members 20% Applied</span>
              </div>
            </div>

            {/* Quick Metrics & Highlights (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[13px] font-bold text-sky-400 uppercase tracking-widest block mb-1 font-story">
                  {BRAND_INFO.tagline}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {trek.title}
                </h1>
                <p className="text-[13px] text-slate-300 mt-2 font-story leading-relaxed">
                  "{trek.tagline}"
                </p>
              </div>

              {/* 4 Metric Badges */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800 text-[13px]">
                <div className="bg-slate-900 p-2.5 ">
                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                  <div className="font-bold text-white text-[16px] mt-0.5">{trek.durationDays} Days / {trek.durationNights} Nights</div>
                </div>
                <div className="bg-slate-900 p-2.5 ">
                  <span className="text-slate-400 block text-[10px] uppercase">Max Elevation</span>
                  <div className="font-bold text-sky-400 text-[16px] mt-0.5">{trek.maxAltitude} m</div>
                </div>
                <div className="bg-slate-900 p-2.5 ">
                  <span className="text-slate-400 block text-[10px] uppercase">Difficulty Level</span>
                  <div className="font-bold text-amber-400 text-[16px] mt-0.5">{trek.difficulty}</div>
                </div>
                <div className="bg-slate-900 p-2.5 ">
                  <span className="text-slate-400 block text-[10px] uppercase">Group Size</span>
                  <div className="font-bold text-emerald-400 text-[16px] mt-0.5">Max 8 Trekkers</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[13px] text-slate-300">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Starts: {trek.startingCity}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-[13px] text-slate-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share Trek'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content & Sticky Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Section */}
            <div className="bg-white  p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Expedition Overview & Trail Summary
              </h2>
              <p className="text-[13px] sm:text-[16px] text-slate-700 leading-relaxed font-story">
                {trek.overview}
              </p>

              {/* Highlights Box */}
              <div className="mt-6 p-4 bg-sky-50 ">
                <h3 className="text-[13px] font-bold text-sky-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Key Route Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-slate-800">
                  {trek.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="bg-white  p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Expedition Visual Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trek.gallery.map((img, i) => (
                  <div key={i} className="h-44 overflow-hidden  bg-slate-100">
                    <img
                      src={img}
                      alt={`${trek.title} scenery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white  p-6">
              <div className="border-b border-slate-200 flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'itinerary'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Day-by-Day Itinerary ({trek.itinerary.length} Days)
                </button>

                <button
                  onClick={() => setActiveTab('packages')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'packages'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Package Tiers (Basic / Standard / Premium)
                </button>

                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'inclusions'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Inclusions & Exclusions
                </button>

                <button
                  onClick={() => setActiveTab('gear')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'gear'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Gear Checklist
                </button>

                <button
                  onClick={() => setActiveTab('permits')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'permits'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Visa & Permit Rules
                </button>

                <button
                  onClick={() => setActiveTab('weather')}
                  className={`px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'weather'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Weather & Season
                </button>
              </div>

              {/* Tab 1: Detailed Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {trek.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 bg-slate-50  transition-colors hover:border-sky-400"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-sky-600 text-white font-bold text-[13px] px-2.5 py-0.5">
                            Day {day.day}
                          </span>
                          <h4 className="font-bold text-[13px] sm:text-[16px] text-slate-900">
                            {day.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-600">
                          <span className="bg-white px-2 py-0.5  text-sky-700">
                            Elev: {day.altitude}
                          </span>
                          <span className="bg-white px-2 py-0.5 border border-slate-200">
                            {day.trekHours}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-story">
                        {day.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Package Tiers Comparison (From Section 18 of Dataset) */}
              {activeTab === 'packages' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Basic */}
                    <div className={`p-4 border-2 transition-all ${selectedTier === 'basic' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 bg-white'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[13px] uppercase text-slate-900">Basic Package</span>
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 text-slate-700">Budget Authentic</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mb-2">
                        {formatPrice(trek.basicPriceUSD || Math.round(trek.priceUSD * 0.75), currency)}
                      </div>
                      <p className="text-[11px] text-slate-600 mb-4">
                        For independent, budget-conscious international travelers seeking the pure authentic mountain walk.
                      </p>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 mb-4">
                        <li>✓ Certified local guide</li>
                        <li>✓ Standard dome camping</li>
                        <li>✓ 3 camp meals daily</li>
                        <li>✓ Essential mountain safety gear</li>
                      </ul>
                      <button
                        onClick={() => setSelectedTier('basic')}
                        className={`w-full py-2 text-[13px] font-bold uppercase tracking-wider ${selectedTier === 'basic' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-800'}`}
                      >
                        {selectedTier === 'basic' ? 'Selected' : 'Choose Basic'}
                      </button>
                    </div>

                    {/* Standard (Most Popular) */}
                    <div className={`p-4 border-2 relative transition-all ${selectedTier === 'standard' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 bg-white'}`}>
                      <div className="absolute -top-3 right-3 bg-sky-600 text-white text-[9px] font-bold uppercase px-2 py-0.5">
                        Most Popular
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[13px] uppercase text-slate-900">Standard Package</span>
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5">Worry-Free Care</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mb-2">
                        {formatPrice(trek.discountPriceUSD || trek.priceUSD, currency)}
                      </div>
                      <p className="text-[11px] text-slate-600 mb-4">
                        Complete end-to-end comfort with airport transfers, upgraded hotel lodging, and pre-trek coordinator.
                      </p>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 mb-4">
                        <li>✓ All in Basic Package</li>
                        <li>✓ Islamabad & Skardu Airport Transfers</li>
                        <li>✓ 4-Star Hotel Accommodations</li>
                        <li>✓ Pre-Trek Preparation Guide & Briefing</li>
                        <li>✓ Porter Gear Allowance (20kg)</li>
                      </ul>
                      <button
                        onClick={() => setSelectedTier('standard')}
                        className={`w-full py-2 text-[13px] font-bold uppercase tracking-wider ${selectedTier === 'standard' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-800'}`}
                      >
                        {selectedTier === 'standard' ? 'Selected' : 'Choose Standard'}
                      </button>
                    </div>

                    {/* Premium */}
                    <div className={`p-4 border-2 transition-all ${selectedTier === 'premium' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 bg-white'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[13px] uppercase text-slate-900">Premium Package</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5">VIP Alpine</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mb-2">
                        {formatPrice(trek.premiumPriceUSD || Math.round(trek.priceUSD * 1.35), currency)}
                      </div>
                      <p className="text-[11px] text-slate-600 mb-4">
                        Luxury high-altitude comfort with private guide, heated dining domes, professional photos, and gourmet menus.
                      </p>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 mb-4">
                        <li>✓ All in Standard Package</li>
                        <li>✓ Dedicated Private Mountain Guide</li>
                        <li>✓ Serena Hotel Luxury Stays</li>
                        <li>✓ Heated Dining Dome & Espresso Bar</li>
                        <li>✓ Professional High-Res Photo Sessions</li>
                      </ul>
                      <button
                        onClick={() => setSelectedTier('premium')}
                        className={`w-full py-2 text-[13px] font-bold uppercase tracking-wider ${selectedTier === 'premium' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-800'}`}
                      >
                        {selectedTier === 'premium' ? 'Selected' : 'Choose Premium'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Inclusions & Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-emerald-50/70 border border-emerald-200">
                    <h4 className="font-bold text-[13px] uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Complete Inclusions</span>
                    </h4>
                    <ul className="space-y-2 text-[13px] text-slate-700">
                      {trek.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-rose-50/70 border border-rose-200">
                    <h4 className="font-bold text-[13px] uppercase tracking-wider text-rose-900 mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Exclusions</span>
                    </h4>
                    <ul className="space-y-2 text-[13px] text-slate-700">
                      {trek.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">✕</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 4: Gear Checklist */}
              {activeTab === 'gear' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 ">
                    <h4 className="font-bold text-[13px] uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-sky-600" />
                      <span>Expedition Gear Checklist ({trek.gearChecklist.length} Items)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-slate-700">
                      {trek.gearChecklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white border border-slate-200">
                          <span className="w-2 h-2 bg-sky-500 rounded-none shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-sky-50  text-[13px] text-slate-800">
                    <strong>Skardu Basecamp Gear Room:</strong> Need last-minute rental crampons, mountaineering boots (size 38-48), down suits, or 4-season sleeping bags? Our Skardu gear facility stocks leading brands (The North Face, La Sportiva, Petzl, Grivel).
                  </div>
                </div>
              )}

              {/* Tab 5: Permits & Visa */}
              {activeTab === 'permits' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50  text-[13px] text-slate-700 leading-relaxed space-y-3">
                    <h4 className="font-bold text-[13px] uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-600" />
                      <span>Restricted Area Permits & Pakistan E-Visa Clearance</span>
                    </h4>
                    <p>{trek.permitRequirements}</p>

                    <div className="bg-white p-3  space-y-1.5">
                      <div className="font-bold text-slate-900">Step-by-step clearance process handled by Trek Karakoram:</div>
                      <div>1. We issue your official <strong>Letter of Invitation (LOI)</strong> and Ministry of Tourism itinerary within 24h.</div>
                      <div>2. You apply online via the Pakistan Official E-Visa portal (category: Trekking & Mountaineering).</div>
                      <div>3. Our Skardu team files group permits with the Gilgit-Baltistan Home Department and Central Karakoram National Park (CKNP).</div>
                      <div>4. Government liaison officer briefing conducted in Islamabad / Skardu.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Weather */}
              {activeTab === 'weather' && (
                <div className="p-4 bg-slate-50  text-[13px] text-slate-700 space-y-3">
                  <h4 className="font-bold text-[13px] uppercase tracking-wider text-slate-900">
                    Climate & Weather Guide: {trek.region}
                  </h4>
                  <p>
                    <strong>Best Months:</strong> {trek.bestSeason}
                  </p>
                  <p className="font-story leading-relaxed">
                    During the summer climbing season (June to late August), daytime temperatures at lower altitudes (Skardu/Askole) range from 24°C to 30°C. Above 4,000m (Concordia/Ali Camp), daytime temperatures are 10°C to 18°C, dropping to -5°C to -12°C at night. Gondogoro La pass crossings are scheduled at 1:00 AM when snow crust is firm.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Booking & Inquiry Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sticky top-24">
              <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-[13px] font-bold text-sky-700 uppercase tracking-wider">
                  Guaranteed 2026 Departure
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  Permit Slots Open
                </span>
              </div>

              {/* Tier Selection in Booking Card */}
              <div className="py-3 border-b border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">Selected Tier</span>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1">
                  <button
                    onClick={() => setSelectedTier('basic')}
                    className={`py-1 text-[11px] font-bold uppercase ${selectedTier === 'basic' ? 'bg-white text-sky-700 ' : 'text-slate-600'}`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setSelectedTier('standard')}
                    className={`py-1 text-[11px] font-bold uppercase ${selectedTier === 'standard' ? 'bg-white text-sky-700 ' : 'text-slate-600'}`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSelectedTier('premium')}
                    className={`py-1 text-[11px] font-bold uppercase ${selectedTier === 'premium' ? 'bg-white text-sky-700 ' : 'text-slate-600'}`}
                  >
                    Premium
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Expedition Cost ({selectedTier.toUpperCase()})</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    {formatPrice(displayPrice, currency)}
                  </span>
                  <span className="text-[13px] text-slate-500">/ person</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  ✓ Founding Member 20% discount included.
                </div>
              </div>

              {/* Booking Controls */}
              <div className="py-4 space-y-3 text-[13px]">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Select Departure Date:
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-[13px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
                  >
                    {trek.departureDates.map((date) => (
                      <option key={date} value={date}>{date} (Guaranteed)</option>
                    ))}
                    <option value="Custom Group Date">Custom Group Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Number of Trekkers:
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-300 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                        className="px-3 py-1.5 font-bold hover:bg-slate-200 text-slate-800"
                      >
                        -
                      </button>
                      <span className="px-4 font-bold text-slate-900">{travelersCount}</span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount(travelersCount + 1)}
                        className="px-3 py-1.5 font-bold hover:bg-slate-200 text-slate-800"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {travelersCount >= 4 ? 'Group Discount Active' : 'Max 8 Trekkers'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[13px]">
                  <span className="font-bold text-slate-700">Total Calculation:</span>
                  <span className="font-bold text-sky-700 text-[16px]">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-[13px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Book Expedition Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 text-[13px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Guide Direct</span>
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div>• Free cancellation up to 60 days before trip.</div>
                <div>• Complete deposit security via escrow or bank wire.</div>
              </div>
            </div>

            {/* Assistance Box */}
            <div className="bg-slate-900 text-white p-5 border border-slate-800 text-[13px]">
              <h4 className="font-bold text-sky-400 mb-1 text-[13px] uppercase tracking-wider">
                Need Help Deciding?
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-3 font-story">
                Our mountain director in Skardu can assess your acclimatization history and gear checklist over a 15-minute call.
              </p>
              <a
                href="https://wa.me/923009876543?text=Hi%20Trek%20Karakoram%2C%20I%20want%20to%20speak%20with%20an%20expedition%20leader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 font-bold hover:underline flex items-center gap-1 text-[13px]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Speak with an Expedition Leader</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Treks Section */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Other Popular Expeditions in Pakistan
            </h2>
            <Link href="/treks" className="text-[13px] font-bold text-sky-600 hover:underline">
              View All Treks →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTreks.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  router.push(`/treks/${t.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white  p-4 hover:border-sky-500 cursor-pointer transition-colors"
              >
                <div className="h-36 overflow-hidden mb-3 bg-slate-100">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-sky-600 uppercase">{t.region}</span>
                <h3 className="font-bold text-[13px] sm:text-[16px] text-slate-900 ">{t.title}</h3>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[13px]">
                  <span className="text-slate-500">{t.durationDays} Days</span>
                  <span className="font-bold text-sky-700">{formatPrice(t.discountPriceUSD || t.priceUSD, currency)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
