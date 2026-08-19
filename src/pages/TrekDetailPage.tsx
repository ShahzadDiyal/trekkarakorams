import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TREK_PACKAGES } from '../data/treks';
import { Currency, TrekPackage } from '../types';
import { formatPrice } from '../utils/currency';
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
  Sparkles
} from 'lucide-react';

interface TrekDetailPageProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const TrekDetailPage: React.FC<TrekDetailPageProps> = ({ currency, onOpenBooking }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const trek = TREK_PACKAGES.find((t) => t.id === id) || TREK_PACKAGES[0];

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gear' | 'permits' | 'weather'>('itinerary');
  const [selectedDate, setSelectedDate] = useState<string>(trek.departureDates[0] || '');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const displayPrice = trek.discountPriceUSD || trek.priceUSD;
  const totalPrice = displayPrice * travelersCount;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBook = () => {
    onOpenBooking({
      trekTitle: trek.title,
      groupSize: travelersCount,
      totalPerPerson: displayPrice,
      notes: `Departure Date: ${selectedDate || 'Upcoming 2026 Guaranteed departure'}`
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karakoram Expeditions! I am inquiring about "${trek.title}" (${trek.durationDays} Days) for ${travelersCount} traveler(s). Target Date: ${selectedDate}. Please provide availability & permit application guidance.`
  );

  const otherTreks = TREK_PACKAGES.filter((t) => t.id !== trek.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/treks" className="hover:text-sky-600">Trekking Packages</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{trek.title}</span>
        </div>

        {/* Hero Section of Trek */}
        <div className="bg-slate-950 text-white border-2 border-sky-500 overflow-hidden mb-8">
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
                <span className="bg-sky-500 text-slate-950 font-black text-xs px-3 py-1 uppercase tracking-wider">
                  {trek.region}
                </span>
                <span className="bg-slate-900/90 border border-slate-700 text-sky-300 font-bold text-xs px-3 py-1">
                  {trek.activityType}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {trek.title}
                </h1>
                <p className="text-xs sm:text-sm text-sky-300 mt-1 font-medium">
                  {trek.tagline}
                </p>
              </div>
            </div>

            {/* Quick Summary & Meta (5 cols) */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <span>★ {trek.rating}</span>
                    <span className="text-slate-400">({trek.reviewsCount} verified reviews)</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-xs text-sky-300 hover:text-white bg-slate-800 px-2.5 py-1 border border-slate-700 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 py-4 text-xs">
                  <div className="bg-slate-950 p-3 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Expedition Duration</span>
                    <span className="font-extrabold text-white text-sm">{trek.durationDays} Days / {trek.durationNights} Nights</span>
                  </div>

                  <div className="bg-slate-950 p-3 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Maximum Altitude</span>
                    <span className="font-extrabold text-sky-400 text-sm">{trek.maxAltitude.toLocaleString()} meters</span>
                  </div>

                  <div className="bg-slate-950 p-3 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trail Difficulty</span>
                    <span className="font-extrabold text-amber-400 text-sm">{trek.difficulty}</span>
                  </div>

                  <div className="bg-slate-950 p-3 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Starting Base</span>
                    <span className="font-extrabold text-white text-sm">{trek.startingCity}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Includes Skardu/Islamabad domestic airfares & 4WD jeeps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Askari Aviation guaranteed helicopter medical bond included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Official government restricted area trekking permits arranged</span>
                  </div>
                </div>
              </div>

              {/* Price Callout */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting From</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      {formatPrice(displayPrice, currency)}
                    </span>
                    {trek.discountPriceUSD && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(trek.priceUSD, currency)}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">/ person</span>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Book Expedition
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Section */}
            <div className="bg-white border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Expedition Overview & Trail Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {trek.overview}
              </p>

              {/* Highlights Box */}
              <div className="mt-6 p-4 bg-sky-50/70 border border-sky-200">
                <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Key Route Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
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
            <div className="bg-white border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Expedition Visual Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trek.gallery.map((img, i) => (
                  <div key={i} className="h-44 overflow-hidden border border-slate-200 bg-slate-100">
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
            <div className="bg-white border border-slate-200 p-6">
              <div className="border-b border-slate-200 flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'itinerary'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Day-by-Day Itinerary ({trek.itinerary.length} Days)
                </button>

                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'inclusions'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Inclusions & Exclusions
                </button>

                <button
                  onClick={() => setActiveTab('gear')}
                  className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'gear'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Gear Checklist
                </button>

                <button
                  onClick={() => setActiveTab('permits')}
                  className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'permits'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Visa & Permit Rules
                </button>

                <button
                  onClick={() => setActiveTab('weather')}
                  className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'weather'
                      ? 'border-sky-600 text-sky-700 bg-sky-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Weather & Best Season
                </button>
              </div>

              {/* Tab 1: Detailed Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {trek.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 bg-slate-50 border border-slate-200 transition-colors hover:border-sky-400"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-sky-600 text-white font-black text-xs px-2.5 py-0.5">
                            Day {day.day}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {day.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <span className="bg-white px-2 py-0.5 border border-slate-200 text-sky-700">
                            Elev: {day.altitude}
                          </span>
                          <span className="bg-white px-2 py-0.5 border border-slate-200">
                            {day.trekHours}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {day.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Inclusions & Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-emerald-50/70 border border-emerald-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Complete Inclusions</span>
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

                  <div className="p-5 bg-rose-50/70 border border-rose-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900 mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Exclusions</span>
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
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                      <Luggage className="w-4 h-4 text-sky-600" />
                      <span>Expedition Gear Checklist ({trek.gearChecklist.length} Items)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {trek.gearChecklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white border border-slate-200">
                          <span className="w-2 h-2 bg-sky-500 rounded-none shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-sky-50 border border-sky-200 text-xs text-slate-800">
                    <strong>Skardu Basecamp Gear Room:</strong> Need last-minute rental crampons, mountaineering boots (size 38-48), down suits, or 4-season sleeping bags? Our Skardu gear facility stocks leading brands (The North Face, La Sportiva, Petzl, Grivel).
                  </div>
                </div>
              )}

              {/* Tab 4: Permits & Visa */}
              {activeTab === 'permits' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-600" />
                      <span>Restricted Area Permits & Pakistan E-Visa Clearance</span>
                    </h4>
                    <p>{trek.permitRequirements}</p>
                    
                    <div className="bg-white p-3 border border-slate-200 space-y-1.5">
                      <div className="font-bold text-slate-900">Step-by-step clearance process handled by us:</div>
                      <div>1. We issue your official <strong>Letter of Invitation (LOI)</strong> and Ministry of Tourism itinerary within 24h.</div>
                      <div>2. You apply online via the Pakistan Official E-Visa portal (category: Trekking & Mountaineering).</div>
                      <div>3. Our Skardu team files group permits with the Gilgit-Baltistan Home Department and Central Karakoram National Park (CKNP).</div>
                      <div>4. Government liaison officer briefing conducted in Islamabad / Skardu.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Weather */}
              {activeTab === 'weather' && (
                <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                    Climate & Weather Guide: {trek.region}
                  </h4>
                  <p>
                    <strong>Best Months:</strong> {trek.bestSeason}
                  </p>
                  <p>
                    During the summer climbing season (June to late August), daytime temperatures at lower altitudes (Skardu/Askole) range from 24°C to 30°C. Above 4,000m (Concordia/Ali Camp), daytime temperatures are 10°C to 18°C, dropping to -5°C to -12°C at night. Gondogoro La pass crossings are scheduled at 1:00 AM when snow crust is firm.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Booking & Inquiry Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-sky-500 p-6 sticky top-24">
              <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-black text-sky-700 uppercase tracking-wider">
                  Guaranteed 2026 Departure
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  Permit Slots Open
                </span>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Expedition Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(displayPrice, currency)}
                  </span>
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  ✓ Price lock guarantee. No unexpected surcharge.
                </div>
              </div>

              {/* Booking Controls */}
              <div className="py-4 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Select Departure Date:
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
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
                      {travelersCount >= 4 ? 'Group Discount Applied' : 'Standard Rate'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Total Calculation:</span>
                  <span className="font-black text-sky-700 text-base">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Book Expedition Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
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
            <div className="bg-slate-900 text-white p-5 border border-slate-800 text-xs">
              <h4 className="font-bold text-sky-400 mb-1 text-xs uppercase tracking-wider">
                Need Help Deciding?
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                Our mountain director in Skardu can assess your acclimatization history and gear checklist over a 15-minute call.
              </p>
              <a
                href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20want%20to%20speak%20with%20an%20expedition%20leader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 font-bold hover:underline flex items-center gap-1 text-xs"
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
            <Link to="/treks" className="text-xs font-bold text-sky-600 hover:underline">
              View All Treks →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTreks.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  navigate(`/treks/${t.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-slate-200 p-4 hover:border-sky-500 cursor-pointer transition-colors"
              >
                <div className="h-36 overflow-hidden mb-3 bg-slate-100">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-sky-600 uppercase">{t.region}</span>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{t.title}</h3>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">{t.durationDays} Days</span>
                  <span className="font-black text-sky-700">{formatPrice(t.discountPriceUSD || t.priceUSD, currency)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
