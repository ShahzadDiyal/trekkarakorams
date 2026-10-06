'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';
import { useSiteSettings } from '@/lib/site-settings';
import { DEPARTURE_STATUS_LABEL } from '@/types';
import { useTreks, useFaqs, type PublicTrek } from '@/lib/content';
import { TrekDetailSkeleton } from '@/components/TrekSkeletons';
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
  Gift,
  Check,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { whatsappLink, SITE_NAME } from '@/lib/site';

/** Wrapper: resolves the trek from Firestore (static fallback), then renders. */
export const TrekDetailPageClient: React.FC<{ trekId: string }> = ({ trekId }) => {
  const { treks, loading } = useTreks();
  const trek = treks.find((t) => t.id === trekId) ?? null;

  if (loading) return <TrekDetailSkeleton />;

  if (!trek) {
    return (
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Trek not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            This trek doesn&apos;t exist or was removed.
          </p>
          <Link
            href="/treks"
            className="mt-6 inline-block bg-sky-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky-700 rounded-xl"
          >
            View all treks
          </Link>
        </div>
      </div>
    );
  }

  return <TrekDetailView trek={trek} allTreks={treks} />;
};

const TrekDetailView: React.FC<{ trek: PublicTrek; allTreks: PublicTrek[] }> = ({
  trek,
  allTreks,
}) => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();
  // Global FAQs (Firestore `faqs` collection) — used when the trek has no own FAQs.
  const { faqs: globalFaqs } = useFaqs();
  // Global site content (gear rental box, visa steps, default weather).
  const siteSettings = useSiteSettings();

  const [activeTab, setActiveTab] = useState<'itinerary' | 'packages' | 'inclusions' | 'gear' | 'permits' | 'weather'>('itinerary');
  // Pricing tiers are fully admin-driven; the first tier is selected by default.
  const [selectedTierName, setSelectedTierName] = useState<string>(
    trek.pricingTiers[0]?.name ?? ''
  );
  const selectedTier =
    trek.pricingTiers.find((t) => t.name === selectedTierName) ?? trek.pricingTiers[0];
  const [selectedDate, setSelectedDate] = useState<string>(trek.departures[0]?.date || '');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Price calculations based on the selected admin-defined tier.
  const displayPrice = selectedTier?.priceUSD ?? 0;
  const totalPrice = displayPrice * travelersCount;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintItinerary = () => {
    setActiveTab('itinerary');
    // Wait a tick so the itinerary tab renders before the print dialog opens.
    setTimeout(() => window.print(), 350);
  };

  const handleBook = () => {
    onOpenBooking({
      trekTitle: `${trek.title}${selectedTier ? ` (${selectedTier.name} Package)` : ''}`,
      groupSize: travelersCount,
      totalPerPerson: displayPrice,
      notes: `Departure Date: ${selectedDate || '2026 Guaranteed Departure'}${selectedTier ? `, Tier: ${selectedTier.name}` : ''}`
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Trek Karakoram! I am inquiring about "${trek.title}"${selectedTier ? ` (${selectedTier.name} tier` : ''}, ${trek.durationDays} Days) for ${travelersCount} traveler(s). Target Date: ${selectedDate}. Please provide availability & permit guidance.`
  );

  const otherTreks = allTreks.filter((t) => t.id !== trek.id).slice(0, 3);

  // Per-trek FAQs first; fall back to the global FAQ collection.
  const faqs = trek.faqs.length > 0 ? trek.faqs : globalFaqs;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-6 flex-wrap">
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
                <span className="bg-sky-600 text-white font-bold text-[14px] px-3 py-1 uppercase tracking-wider rounded-xl">
                  {trek.region}
                </span>
                <span className="rounded-xl bg-slate-900/90 border border-slate-700 text-sky-300 font-bold text-[14px] px-3 py-1">
                  {trek.activityType}
                </span>
              </div>

              {/* Founding Member Badge */}
              <div className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 font-bold text-[14px] px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 rounded-xl">
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
                <div className="bg-slate-900 p-2.5  rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                  <div className="font-bold text-white text-[16px] mt-0.5">{trek.durationDays} Days / {trek.durationNights} Nights</div>
                </div>
                <div className="bg-slate-900 p-2.5  rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Max Elevation</span>
                  <div className="font-bold text-sky-400 text-[16px] mt-0.5">{trek.maxAltitude} m</div>
                </div>
                <div className="bg-slate-900 p-2.5  rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Difficulty Level</span>
                  <div className="font-bold text-amber-400 text-[16px] mt-0.5">{trek.difficulty}</div>
                </div>
                <div className="bg-slate-900 p-2.5  rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Group Size</span>
                  <div className="font-bold text-emerald-400 text-[16px] mt-0.5">Max 8 Trekkers</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[14px] text-slate-300">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Starts: {trek.startingCity}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-[14px] text-slate-400 hover:text-white transition-colors"
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
              <div className="mt-6 p-4 bg-sky-50  rounded-xl">
                <h3 className="text-[13px] font-bold text-sky-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Key Route Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-slate-800">
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
            {trek.gallery.length > 0 && (
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
            )}

            {/* Navigation Tabs */}
            <div className="bg-white  p-6">
              <div className="border-b border-slate-200 flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'itinerary'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Day-by-Day Itinerary ({trek.itinerary.length} Days)
                </button>

                <button
                  onClick={() => setActiveTab('packages')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'packages'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Package Tiers ({trek.pricingTiers.map((t) => t.name).join(' / ')})
                </button>

                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'inclusions'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Inclusions & Exclusions
                </button>

                <button
                  onClick={() => setActiveTab('gear')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'gear'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Gear Checklist
                </button>

                <button
                  onClick={() => setActiveTab('permits')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'permits'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Visa & Permit Rules
                </button>

                <button
                  onClick={() => setActiveTab('weather')}
                  className={`px-4 py-2.5 text-[14px] font-bold transition-colors cursor-pointer border-b-2 ${activeTab === 'weather'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Weather & Season
                </button>
              </div>

              {/* Tab 1: Detailed Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4" id="trek-itinerary-print">
                  <div className="flex items-center justify-between print:hidden">
                    <p className="text-[13px] text-slate-500">
                      Day-by-day route with altitudes, walking times, and overnight stays.
                    </p>
                    <button
                      type="button"
                      onClick={handlePrintItinerary}
                      className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-[13px] font-bold text-slate-700 hover:border-sky-500 hover:text-sky-700 transition-colors cursor-pointer rounded-xl"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Download Itinerary (PDF)</span>
                    </button>
                  </div>
                  {trek.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 bg-slate-50  transition-colors hover:border-sky-400 rounded-xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-sky-600 text-white font-bold text-[14px] px-2.5 py-0.5 rounded-xl">
                            Day {day.day}
                          </span>
                          <h4 className="font-bold text-[14px] sm:text-[16px] text-slate-900">
                            {day.title}
                          </h4>
                        </div>
                        {(day.altitude || day.trekHours) && (
                          <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-600">
                            {day.altitude && (
                              <span className="bg-white px-2 py-0.5 text-sky-700">
                                Elev: {day.altitude}
                              </span>
                            )}
                            {day.trekHours && (
                              <span className="rounded-xl bg-white px-2 py-0.5 border border-slate-200">
                                {day.trekHours}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-story">
                        {day.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Package Tiers — fully admin-driven (price, checkpoints, note) */}
              {activeTab === 'packages' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {trek.pricingTiers.map((tier) => {
                      const isSelected = selectedTierName === tier.name;
                      const isPopular = tier.name.trim().toLowerCase() === 'standard';
                      return (
                        <div
                          key={tier.name}
                          className={`p-4 border-2 relative transition-all ${isSelected ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 bg-white'}`}
                        >
                          {isPopular && (
                            <div className="absolute -top-3 right-3 bg-sky-600 text-white text-[11px] font-bold uppercase px-2 py-0.5 rounded-xl">
                              Most Popular
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-[14px] uppercase text-slate-900">{tier.name} Package</span>
                          </div>
                          <div className="text-lg font-bold text-slate-900 mb-2">
                            {formatPrice(tier.priceUSD, currency)}
                            {tier.singleSupplementUSD > 0 && (
                              <span className="block text-[11px] font-normal text-slate-500">
                                +{formatPrice(tier.singleSupplementUSD, currency)} single supplement
                              </span>
                            )}
                          </div>
                          {tier.note && (
                            <p className="text-[11px] text-slate-600 mb-4">{tier.note}</p>
                          )}
                          {tier.features.length > 0 && (
                            <ul className="space-y-1.5 text-[11px] text-slate-700 mb-4">
                              {tier.features.map((f, fi) => (
                                <li key={fi} className="flex items-start gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <button
                            onClick={() => setSelectedTierName(tier.name)}
                            className={`w-full py-2 text-[14px] font-bold uppercase tracking-wider ${isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-800'}`}
                          >
                            {isSelected ? 'Selected' : `Choose ${tier.name}`}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Inclusions & Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <h4 className="font-bold text-[14px] uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Complete Inclusions</span>
                    </h4>
                    <ul className="space-y-2 text-[14px] text-slate-700">
                      {trek.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200">
                    <h4 className="font-bold text-[14px] uppercase tracking-wider text-rose-900 mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Exclusions</span>
                    </h4>
                    <ul className="space-y-2 text-[14px] text-slate-700">
                      {trek.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
                  <div className="p-4 bg-slate-50  rounded-xl">
                    <h4 className="font-bold text-[14px] uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-sky-600" />
                      <span>Expedition Gear Checklist ({trek.gearChecklist.length} Items)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-slate-700">
                      {trek.gearChecklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200">
                          <span className="w-2 h-2 bg-sky-500 rounded-none shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-sky-50  text-[14px] text-slate-800 rounded-xl">
                    <strong>{siteSettings.gearRental.title}:</strong> {siteSettings.gearRental.intro}
                    {siteSettings.gearRental.items.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {siteSettings.gearRental.items.map((r, i) => (
                          <div key={i} className="flex items-center justify-between bg-white border border-sky-100 px-3 py-2 rounded-xl">
                            <span className="text-slate-700">{r.item}</span>
                            <span className="font-bold text-sky-700">{r.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {siteSettings.gearRental.note && (
                      <p className="mt-3 text-[13px] text-slate-600">{siteSettings.gearRental.note}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 5: Permits & Visa */}
              {activeTab === 'permits' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50  text-[14px] text-slate-700 leading-relaxed space-y-3 rounded-xl">
                    <h4 className="font-bold text-[14px] uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-600" />
                      <span>Restricted Area Permits & Pakistan E-Visa Clearance</span>
                    </h4>
                    <p>{trek.permitRequirements}</p>

                    {siteSettings.visaSteps.length > 0 && (
                      <div className="bg-white p-3  space-y-1.5">
                        <div className="font-bold text-slate-900">Step-by-step clearance process handled by Trek Karakoram:</div>
                        {siteSettings.visaSteps.map((step, i) => (
                          <div key={i}>{i + 1}. {step}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 6: Weather */}
              {activeTab === 'weather' && (
                <div className="p-4 bg-slate-50  text-[14px] text-slate-700 space-y-3 rounded-xl">
                  <h4 className="font-bold text-[14px] uppercase tracking-wider text-slate-900">
                    Climate & Weather Guide: {trek.region}
                  </h4>
                  <p>
                    <strong>Best Months:</strong> {trek.bestSeason}
                  </p>
                  {(trek.weatherInfo || siteSettings.defaultWeatherInfo) && (
                    <p className="font-story leading-relaxed">
                      {trek.weatherInfo || siteSettings.defaultWeatherInfo}
                    </p>
                  )}
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
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xl">
                  Permit Slots Open
                </span>
              </div>

              {/* Tier Selection in Booking Card — dynamic from admin tiers */}
              <div className="py-3 border-b border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">Selected Tier</span>
                <div className={`grid gap-1 bg-slate-100 p-1`} style={{ gridTemplateColumns: `repeat(${trek.pricingTiers.length}, minmax(0, 1fr))` }}>
                  {trek.pricingTiers.map((tier) => (
                    <button
                      key={tier.name}
                      onClick={() => setSelectedTierName(tier.name)}
                      className={`py-1 text-[11px] font-bold uppercase ${selectedTierName === tier.name ? 'bg-white text-sky-700 ' : 'text-slate-600'}`}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">
                  Expedition Cost{selectedTier ? ` (${selectedTier.name})` : ''}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    {formatPrice(displayPrice, currency)}
                  </span>
                  <span className="text-[13px] text-slate-500">/ person</span>
                </div>
                {selectedTier && selectedTier.singleSupplementUSD > 0 && (
                  <div className="mt-1 text-[11px] text-slate-500">
                    Single supplement (private room/tent):{' '}
                    <span className="font-semibold text-slate-700">
                      {formatPrice(selectedTier.singleSupplementUSD, currency)}
                    </span>
                  </div>
                )}
                {selectedTier?.note && (
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {selectedTier.note}
                  </div>
                )}
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
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-[14px] text-slate-900 font-semibold focus:border-sky-500 focus:outline-none rounded-xl"
                  >
                    {trek.departures.map((dep) => (
                      <option key={dep.date} value={dep.date} disabled={dep.status === 'soldout'}>
                        {dep.date} ({DEPARTURE_STATUS_LABEL[dep.status]})
                      </option>
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
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-[14px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-xl"
                >
                  <span>Book Expedition Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappLink(decodeURIComponent(whatsappMessage))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 text-[14px] flex items-center justify-center gap-1.5 transition-colors rounded-xl"
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

           
          </div>
        </div>

        {/* Trek FAQs — per-trek FAQs when set, otherwise the global FAQ collection */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {trek.shortTitle} — Frequently Asked Questions
          </h2>
          <p className="text-[13px] text-slate-500 mb-6">
            Straight answers on cost, difficulty, best season, permits, and fitness.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-[14px] sm:text-[15px] text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-sky-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[13px] sm:text-[14px] leading-relaxed text-slate-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
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
                <div className="h-[300px] overflow-hidden mb-3 bg-slate-100">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-sky-600 uppercase">{t.region}</span>
                <h3 className="font-bold text-[14px] sm:text-[16px] text-slate-900 ">{t.title}</h3>
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
