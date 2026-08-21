import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { TREK_PACKAGES } from '../data/treks';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';
import {
  Calculator,
  Sparkles,
  Users,
  Shield,
  Plane,
  Luggage,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  FileDown,
  Info,
  Calendar
} from 'lucide-react';

interface PlannerPageProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({ currency, onOpenBooking }) => {
  const router = useRouter();

  const [selectedTrekId, setSelectedTrekId] = useState<string>(TREK_PACKAGES[0].id);
  const [groupSize, setGroupSize] = useState<number>(2);
  const [tier, setTier] = useState<'standard' | 'deluxe' | 'luxury'>('standard');
  const [includeExtraPorter, setIncludeExtraPorter] = useState(false);
  const [includeSingleTent, setIncludeSingleTent] = useState(false);
  const [includeHeliInsurance, setIncludeHeliInsurance] = useState(true);
  const [includeOxygenCylinder, setIncludeOxygenCylinder] = useState(false);
  const [includeSatelliteWifi, setIncludeSatelliteWifi] = useState(false);
  const [preferredMonth, setPreferredMonth] = useState('July 2026');

  const selectedTrek = TREK_PACKAGES.find((t) => t.id === selectedTrekId) || TREK_PACKAGES[0];
  const basePrice = selectedTrek.discountPriceUSD || selectedTrek.priceUSD;

  // Calculation Math
  let groupMultiplier = 1.0;
  if (groupSize === 1) groupMultiplier = 1.25; // Solo surcharge
  else if (groupSize >= 4 && groupSize <= 7) groupMultiplier = 0.92; // 8% group discount
  else if (groupSize >= 8) groupMultiplier = 0.85; // 15% group discount

  let perPersonTotal = basePrice * groupMultiplier;

  if (tier === 'deluxe') perPersonTotal += 450;
  if (tier === 'luxury') perPersonTotal += 950;
  if (includeExtraPorter) perPersonTotal += 280;
  if (includeSingleTent) perPersonTotal += 160;
  if (includeHeliInsurance) perPersonTotal += 120;
  if (includeOxygenCylinder) perPersonTotal += 150;
  if (includeSatelliteWifi) perPersonTotal += 90;

  const totalGroupCost = Math.round(perPersonTotal * groupSize);

  const handleProceed = () => {
    onOpenBooking({
      trekTitle: selectedTrek.title,
      groupSize,
      totalPerPerson: Math.round(perPersonTotal),
      notes: `Month: ${preferredMonth}, Tier: ${tier.toUpperCase()}, Single Tent: ${includeSingleTent ? 'Yes' : 'No'}, Extra Porter: ${includeExtraPorter ? 'Yes' : 'No'}, Heli: ${includeHeliInsurance ? 'Yes' : 'No'}, Oxygen: ${includeOxygenCylinder ? 'Yes' : 'No'}`
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karakoram Expeditions! I used your online Custom Trek Planner for "${selectedTrek.title}" for a group of ${groupSize} in ${preferredMonth}. Estimated per person: ${formatPrice(perPersonTotal, 'USD')}. Please send formal quote and permit availability.`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => router.push('/')} className="hover:text-sky-600">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">Custom Trek Planner & Cost Calculator</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Interactive Quotation Engine
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Custom Trek Planner & Cost Estimator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Customize group size, accommodation tier, private porters, and high-altitude safety equipment. Get instant transparent pricing with zero booking surcharges.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white  p-6 space-y-6">
            {/* Step 1: Route Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Step 1: Select Trekking Itinerary
                </label>
                <span className="text-xs text-sky-700 font-semibold">
                  {selectedTrek.durationDays} Days / {selectedTrek.maxAltitude}m
                </span>
              </div>
              <select
                value={selectedTrekId}
                onChange={(e) => setSelectedTrekId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
              >
                {TREK_PACKAGES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.durationDays} Days (Max {t.maxAltitude}m) — Starting {formatPrice(t.discountPriceUSD || t.priceUSD, currency)}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Group Size & Month */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Step 2: Number of Trekkers ({groupSize})
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 6, 8, 12].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGroupSize(n)}
                      className={`flex-1 py-2 text-xs font-bold border transition-colors cursor-pointer ${groupSize === n
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'
                        }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {groupSize >= 4 ? '✓ 8%-15% Group Discount applied' : groupSize === 1 ? 'Solo traveler surcharge (+25%)' : 'Standard 2-3 person rate'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Target Departure Month
                </label>
                <select
                  value={preferredMonth}
                  onChange={(e) => setPreferredMonth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
                >
                  <option value="June 2026">June 2026 (Early Summer)</option>
                  <option value="July 2026">July 2026 (Peak Season)</option>
                  <option value="August 2026">August 2026 (Peak Season)</option>
                  <option value="September 2026">September 2026 (Autumn Clear Skies)</option>
                  <option value="October 2026">October 2026 (Autumn Colors)</option>
                  <option value="2027 Season">2027 Advance Booking</option>
                </select>
              </div>
            </div>

            {/* Step 3: Service Comfort Tier */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Step 3: Expedition Comfort Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setTier('standard')}
                  className={`p-3 border cursor-pointer transition-colors ${tier === 'standard'
                    ? 'bg-sky-50 border-sky-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                    <span>Standard</span>
                    <span className="text-[10px] text-sky-700">Included</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    4-season alpine tents, twin hotel sharing, expedition kitchen chef, full porter support.
                  </p>
                </div>

                <div
                  onClick={() => setTier('deluxe')}
                  className={`p-3 border cursor-pointer transition-colors ${tier === 'deluxe'
                    ? 'bg-sky-50 border-sky-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                    <span>VIP Glamping</span>
                    <span className="text-[10px] text-sky-700">+ {formatPrice(450, currency)}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Upgraded Serena hotels, heated dome tents at Concordia, and satellite WiFi vouchers.
                  </p>
                </div>

                <div
                  onClick={() => setTier('luxury')}
                  className={`p-3 border cursor-pointer transition-colors ${tier === 'luxury'
                    ? 'bg-sky-50 border-sky-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                    <span>Ultra Luxury</span>
                    <span className="text-[10px] text-sky-700">+ {formatPrice(950, currency)}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Single occupancy suites, private chef, dedicated personal guide, and private 4WD Prado.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Add-ons & Equipment */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Step 4: Safety, Gear & Add-on Services
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 bg-slate-50 hover:border-sky-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeHeliInsurance}
                      onChange={(e) => setIncludeHeliInsurance(e.target.checked)}
                      className="accent-sky-600 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Askari Aviation Military Heli Evacuation Bond</div>
                      <div className="text-[10px] text-slate-500">Immediate military helicopter dispatch guarantee in emergency</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">+{formatPrice(120, currency)}</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:border-sky-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeSingleTent}
                      onChange={(e) => setIncludeSingleTent(e.target.checked)}
                      className="accent-sky-600 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Private Solo Tent Supplement</div>
                      <div className="text-[10px] text-slate-500">Single occupancy 4-season mountain tent throughout the entire trek</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">+{formatPrice(160, currency)}</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:border-sky-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeExtraPorter}
                      onChange={(e) => setIncludeExtraPorter(e.target.checked)}
                      className="accent-sky-600 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Dedicated Personal Equipment Porter</div>
                      <div className="text-[10px] text-slate-500">Extra 20kg weight capacity for camera rigs, video, or excess personal luggage</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">+{formatPrice(280, currency)}</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:border-sky-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeOxygenCylinder}
                      onChange={(e) => setIncludeOxygenCylinder(e.target.checked)}
                      className="accent-sky-600 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Dedicated Medical Oxygen Kit & Mask</div>
                      <div className="text-[10px] text-slate-500">Personal Poisk/Summit oxygen cylinder on high passes</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">+{formatPrice(150, currency)}</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:border-sky-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeSatelliteWifi}
                      onChange={(e) => setIncludeSatelliteWifi(e.target.checked)}
                      className="accent-sky-600 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Starlink / Satellite WiFi Data Voucher</div>
                      <div className="text-[10px] text-slate-500">High-speed satellite messaging access at Concordia & Base Camp</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">+{formatPrice(90, currency)}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Quote Card (5 cols) */}
          <div className="lg:col-span-5 bg-sky-950 text-white p-6 sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-sky-800">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Instant Price Calculation
              </span>
              <span className="bg-sky-500 text-slate-950 text-[10px] font-bold uppercase px-2 py-0.5">
                Transparent Quote
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{selectedTrek.title}</h3>
              <div className="text-xs text-sky-300 mt-0.5">
                {selectedTrek.durationDays} Days / {selectedTrek.durationNights} Nights • {selectedTrek.region}
              </div>

              <div className="mt-4 pt-3 border-t border-sky-900/80 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Group Size:</span>
                  <span className="text-white font-bold">{groupSize} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Departure Target:</span>
                  <span className="text-white font-bold">{preferredMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Tier:</span>
                  <span className="text-white font-bold capitalize">{tier}</span>
                </div>
                <div className="flex justify-between">
                  <span>Islamabad-Skardu Flights:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Government Trekking Permits:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-6 pt-4 border-t border-sky-800">
                <div className="text-xs text-sky-300 uppercase font-bold">Estimated Cost Per Person</div>
                <div className="text-3xl font-bold text-white mt-1">
                  {formatPrice(Math.round(perPersonTotal), currency)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Total for entire group of {groupSize}: <strong className="text-sky-300">{formatPrice(totalGroupCost, currency)}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Reserve Custom Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

            <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-sky-900">
              ✓ 100% price lock guaranteed once 20% deposit is secured.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PlannerPage;