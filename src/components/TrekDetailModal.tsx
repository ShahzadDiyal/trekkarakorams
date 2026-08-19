import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Mountain,
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
  Heart,
  Share2,
  Sparkles
} from 'lucide-react';
import { TrekPackage, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface TrekDetailModalProps {
  trek: TrekPackage | null;
  currency: Currency;
  onClose: () => void;
  onBookNow: (trek: TrekPackage, selectedDate?: string, travelers?: number) => void;
}

export const TrekDetailModal: React.FC<TrekDetailModalProps> = ({
  trek,
  currency,
  onClose,
  onBookNow
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gear' | 'permits'>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  if (!trek) return null;

  const displayPrice = trek.discountPriceUSD || trek.priceUSD;
  const totalPrice = displayPrice * travelersCount;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karakoram Expeditions! I am inquiring about "${trek.title}" (${trek.durationDays} Days) for ${travelersCount} traveler(s). Date preferred: ${selectedDate || 'Upcoming 2026 departure'}. Please confirm permit slots.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 overflow-y-auto p-2 sm:p-4 md:p-6 flex items-start justify-center">
      <div className="bg-white max-w-5xl w-full my-4 overflow-hidden relative animate-fadeIn">
        {/* Modal Top Header Bar */}
        <div className="bg-sky-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2">
            <span className="bg-sky-500 text-slate-950 text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
              {trek.region}
            </span>
            <span className="text-xs text-sky-300 font-semibold hidden sm:inline">
              Max Altitude: {trek.maxAltitude.toLocaleString()}m
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-2.5 py-1 text-xs bg-sky-900 hover:bg-sky-800 text-sky-200 border border-sky-700 flex items-center gap-1 transition-colors"
              title="Copy Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center w-7 h-7 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner / Gallery Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-slate-900 p-2">
          <div className="lg:col-span-2 h-64 sm:h-80 overflow-hidden relative">
            <img
              src={trek.image}
              alt={trek.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                {trek.title}
              </h1>
              <p className="text-xs sm:text-sm text-sky-300 mt-1 font-medium">
                {trek.tagline}
              </p>
            </div>
          </div>

          <div className="hidden lg:grid grid-rows-2 gap-2 h-80">
            {trek.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="h-full overflow-hidden">
                <img
                  src={img}
                  alt={`${trek.title} photo ${i + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Key Quick Facts Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100 p-3 sm:p-4 border-b border-slate-200 text-xs">
          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Duration</span>
            <span className="font-extrabold text-slate-900">{trek.durationDays} Days / {trek.durationNights} N</span>
          </div>

          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Max Elevation</span>
            <span className="font-extrabold text-sky-700">{trek.maxAltitude.toLocaleString()}m</span>
          </div>

          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Difficulty</span>
            <span className="font-extrabold text-rose-700">{trek.difficulty}</span>
          </div>

          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Best Season</span>
            <span className="font-extrabold text-slate-900 truncate">{trek.bestSeason.split(' ')[0]}</span>
          </div>

          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Start / End</span>
            <span className="font-extrabold text-slate-900 truncate">{trek.startingCity}</span>
          </div>

          <div className="bg-white p-2.5 border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Activity</span>
            <span className="font-extrabold text-sky-700">{trek.activityType}</span>
          </div>
        </div>

        {/* Main Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
          {/* Left / Center: Details & Itinerary (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overview */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Expedition Overview</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {trek.overview}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="bg-sky-50/60  p-4">
              <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
                Expedition Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                {trek.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-2 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'itinerary'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Day-by-Day Route ({trek.itinerary.length} Days)
              </button>

              <button
                onClick={() => setActiveTab('inclusions')}
                className={`px-4 py-2 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'inclusions'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Inclusions & Exclusions
              </button>

              <button
                onClick={() => setActiveTab('gear')}
                className={`px-4 py-2 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'gear'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Gear Checklist
              </button>

              <button
                onClick={() => setActiveTab('permits')}
                className={`px-4 py-2 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'permits'
                    ? 'border-sky-600 text-sky-700 bg-sky-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Visas & Permits
              </button>
            </div>

            {/* Tab 1: Day by Day Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-3">
                {trek.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-3.5 bg-slate-50  transition-colors hover:border-sky-400"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-600 text-white font-bold text-xs px-2 py-0.5">
                          Day {day.day}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          {day.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                        <span className="bg-white px-2 py-0.5  text-sky-700">
                          Alt: {day.altitude}
                        </span>
                        <span className="bg-white px-2 py-0.5 border border-slate-200">
                          {day.trekHours}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {day.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Inclusions & Exclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What Is Included</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {trek.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/60 border border-rose-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>What Is Excluded</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
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

            {/* Tab 3: Gear Checklist */}
            {activeTab === 'gear' && (
              <div className="bg-slate-50  p-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <Luggage className="w-4 h-4 text-sky-600" />
                  <span>Mandatory High-Altitude Gear Checklist</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {trek.gearChecklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-white border border-slate-200">
                      <span className="w-2 h-2 bg-sky-500 rounded-none shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-sky-50  text-xs text-sky-800">
                  <strong>Gear Rental in Skardu:</strong> High-quality crampons, harnesses, down jackets, and 8000m sleeping bags can also be rented directly from our Skardu basecamp gear room at nominal daily rates.
                </div>
              </div>
            )}

            {/* Tab 4: Permits & Visas */}
            {activeTab === 'permits' && (
              <div className="bg-slate-50  p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Permits & Clearance Requirements</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {trek.permitRequirements}
                </p>
                <div className="p-3 bg-white  text-xs text-slate-700 space-y-1.5">
                  <div><strong>Required Documents:</strong></div>
                  <div>1. Valid Passport copy (with minimum 6 months validity)</div>
                  <div>2. Pakistan E-Visa Application reference number</div>
                  <div>3. 2 Passport-sized digital photos with white background</div>
                  <div>4. Emergency medical & helicopter evacuation insurance policy copy</div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking & Instant Inquiry Box (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50 p-5 flex flex-col justify-between">
            <div>
              {/* Pricing summary */}
              <div className="pb-3 border-b border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Expedition Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-sky-700">
                    {formatPrice(displayPrice, currency)}
                  </span>
                  {trek.discountPriceUSD && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(trek.priceUSD, currency)}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">/ person</span>
                </div>
              </div>

              {/* Booking Options */}
              <div className="py-4 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Select 2026 Guaranteed Departure:
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 p-2 text-xs font-semibold focus:border-sky-500 focus:outline-none"
                  >
                    <option value="">Select departure date...</option>
                    {trek.departureDates.map((date) => (
                      <option key={date} value={date}>{date} (Guaranteed)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Number of Trekkers:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-8 h-8 bg-white border border-slate-300 font-bold hover:bg-slate-100 text-slate-800"
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-900 px-3">{travelersCount}</span>
                    <button
                      type="button"
                      onClick={() => setTravelersCount(travelersCount + 1)}
                      className="w-8 h-8 bg-white border border-slate-300 font-bold hover:bg-slate-100 text-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                  <span>Total Calculated:</span>
                  <span className="text-sky-700 text-sm">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <button
                onClick={() => onBookNow(trek, selectedDate, travelersCount)}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book This Trek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <div className="text-[10px] text-slate-500 text-center pt-1">
                ✓ Free cancellation & date changes up to 60 days before start.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
