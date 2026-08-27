'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Users,
  Plane,
  Mountain,
} from 'lucide-react';
import { TREK_PACKAGES } from '@/data/treks';
import { Currency } from '@/types';
import { formatPrice } from '@/utils/currency';

interface CostEstimatorProps {
  currency: Currency;
  onOpenBooking: (details: {
    trekTitle: string;
    groupSize: number;
    totalPerPerson: number;
    notes: string;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  currency,
  onOpenBooking,
}) => {
  const [selectedTrekId, setSelectedTrekId] = useState(TREK_PACKAGES[0].id);
  const [groupSize, setGroupSize] = useState(2);
  const [tier, setTier] = useState<'standard' | 'deluxe'>('standard');
  const [includeExtraPorter, setIncludeExtraPorter] = useState(false);
  const [includeSingleTent, setIncludeSingleTent] = useState(false);
  const [includeHeliInsurance, setIncludeHeliInsurance] = useState(true);

  const selectedTrek =
    TREK_PACKAGES.find((t) => t.id === selectedTrekId) ||
    TREK_PACKAGES[0];

  const basePrice =
    selectedTrek.discountPriceUSD || selectedTrek.priceUSD;

  // -----------------------------
  // Pricing
  // -----------------------------

  let groupMultiplier = 1;

  if (groupSize === 1) {
    groupMultiplier = 1.25;
  } else if (groupSize >= 4 && groupSize <= 7) {
    groupMultiplier = 0.92;
  } else if (groupSize >= 8) {
    groupMultiplier = 0.85;
  }

  let perPersonTotal = basePrice * groupMultiplier;

  if (tier === 'deluxe') {
    perPersonTotal += 450;
  }

  if (includeExtraPorter) {
    perPersonTotal += 280;
  }

  if (includeSingleTent) {
    perPersonTotal += 160;
  }

  if (includeHeliInsurance) {
    perPersonTotal += 120;
  }

  const roundedPerPerson = Math.round(perPersonTotal);
  const groupGrandTotal = Math.round(perPersonTotal * groupSize);

  // -----------------------------
  // Booking
  // -----------------------------

  const handleProceed = () => {
    onOpenBooking({
      trekTitle: selectedTrek.title,
      groupSize,
      totalPerPerson: roundedPerPerson,
      notes: `Tier: ${tier.toUpperCase()}, Single Tent: ${
        includeSingleTent ? 'Yes' : 'No'
      }, Extra Porter: ${
        includeExtraPorter ? 'Yes' : 'No'
      }, Heli Evac: ${includeHeliInsurance ? 'Yes' : 'No'}`,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karakoram Expeditions! I used your online Cost Estimator for "${selectedTrek.title}" for a group of ${groupSize} person(s). Estimated total per person is ${formatPrice(
      perPersonTotal,
      'USD'
    )}. Please provide booking availability and payment details.`
  );

  return (
    <section
      id="cost-estimator-section"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}

        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-sky-600 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cost Estimator</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 leading-tight">
            Build Your Expedition & See Your Price
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Select your route, group size and preferred comfort level.
            Your estimated expedition cost updates instantly with no
            obligation to book.
          </p>
        </div>

        {/* =========================
            MAIN CALCULATOR
        ========================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* =========================
              LEFT: OPTIONS
          ========================== */}

          <div className="lg:col-span-7 space-y-6">

            {/* Route */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-sky-100 text-sky-700 text-[11px] font-bold">
                  1
                </span>

                <label className="text-[12px] sm:text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                  Select Trekking Route
                </label>
              </div>

              <select
                value={selectedTrekId}
                onChange={(e) => setSelectedTrekId(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-300 px-4 py-3 text-sm sm:text-[15px] font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 cursor-pointer rounded-sm"
              >
                {TREK_PACKAGES.map((trek) => (
                  <option key={trek.id} value={trek.id}>
                    {trek.title}   {trek.durationDays} Days / Max{' '}
                    {trek.maxAltitude}m
                  </option>
                ))}
              </select>
            </div>

            {/* Group Size */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-sky-100 text-sky-700 text-[11px] font-bold">
                    2
                  </span>

                  <span className="text-[12px] sm:text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                    Number of Trekkers
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 self-start sm:self-auto bg-sky-50 border border-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-700">
                  <Users className="w-3.5 h-3.5" />

                  {groupSize === 1
                    ? 'Solo Trek'
                    : `${groupSize} Trekkers`}

                  {groupSize >= 4 && ' · Group Discount'}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
                {[1, 2, 3, 4, 6, 8, 10, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGroupSize(num)}
                    className={`min-h-[42px] sm:min-h-0 sm:min-w-[64px] px-3 py-2 text-[13px] font-bold border transition-all cursor-pointer ${
                      groupSize === num
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:bg-sky-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {groupSize >= 4 && (
                <p className="mt-2 text-[11px] text-emerald-700 font-medium">
                  ✓ Your group qualifies for a discounted per-person rate.
                </p>
              )}
            </div>

            {/* Comfort Tier */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-sky-100 text-sky-700 text-[11px] font-bold">
                  3
                </span>

                <span className="text-[12px] sm:text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                  Expedition Comfort
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Standard */}
                <button
                  type="button"
                  onClick={() => setTier('standard')}
                  className={`text-left p-4 border transition-all cursor-pointer ${
                    tier === 'standard'
                      ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-slate-950">
                        Standard Expedition
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1">
                        Comfortable & practical
                      </div>
                    </div>

                    {tier === 'standard' && (
                      <Check className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                  </div>

                  <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
                    4-season tents, twin hotel sharing, expedition chef
                    and 1 porter per trekker.
                  </p>

                  <div className="mt-3 text-[11px] font-bold text-sky-700">
                    INCLUDED
                  </div>
                </button>

                {/* Deluxe */}
                <button
                  type="button"
                  onClick={() => setTier('deluxe')}
                  className={`text-left p-4 border transition-all cursor-pointer ${
                    tier === 'deluxe'
                      ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-slate-950">
                        VIP Glamping Tier
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1">
                        Premium mountain comfort
                      </div>
                    </div>

                    {tier === 'deluxe' && (
                      <Check className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                  </div>

                  <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
                    Serena Hotel upgrades, heated glamping domes at
                    Concordia and satellite WiFi.
                  </p>

                  <div className="mt-3 text-[11px] font-bold text-sky-700">
                    +{formatPrice(450, currency)}
                  </div>
                </button>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 bg-sky-100 text-sky-700 text-[11px] font-bold">
                  4
                </span>

                <span className="text-[12px] sm:text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                  Safety & Optional Add-ons
                </span>
              </div>

              <div className="space-y-2">

                {/* Helicopter */}
                <label className="flex items-center justify-between gap-3 p-3.5 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={includeHeliInsurance}
                      onChange={(e) =>
                        setIncludeHeliInsurance(e.target.checked)
                      }
                      className="w-4 h-4 accent-sky-600 shrink-0 cursor-pointer"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />

                        <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800">
                          Helicopter Rescue Bond
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-500 mt-0.5 pl-5">
                        Additional emergency evacuation protection
                      </p>
                    </div>
                  </div>

                  <span className="text-[12px] font-bold text-slate-700 shrink-0">
                    +{formatPrice(120, currency)}
                  </span>
                </label>

                {/* Single Tent */}
                <label className="flex items-center justify-between gap-3 p-3.5 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={includeSingleTent}
                      onChange={(e) =>
                        setIncludeSingleTent(e.target.checked)
                      }
                      className="w-4 h-4 accent-sky-600 shrink-0 cursor-pointer"
                    />

                    <div className="min-w-0">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800">
                        Private Solo Tent
                      </span>

                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Your own tent throughout the trek
                      </p>
                    </div>
                  </div>

                  <span className="text-[12px] font-bold text-slate-700 shrink-0">
                    +{formatPrice(160, currency)}
                  </span>
                </label>

                {/* Extra Porter */}
                <label className="flex items-center justify-between gap-3 p-3.5 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={includeExtraPorter}
                      onChange={(e) =>
                        setIncludeExtraPorter(e.target.checked)
                      }
                      className="w-4 h-4 accent-sky-600 shrink-0 cursor-pointer"
                    />

                    <div className="min-w-0">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800">
                        Extra Porter
                      </span>

                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Recommended for additional camera equipment
                      </p>
                    </div>
                  </div>

                  <span className="text-[12px] font-bold text-slate-700 shrink-0">
                    +{formatPrice(280, currency)}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT: PRICE SUMMARY
          ========================== */}

          <aside className="lg:col-span-5 lg:sticky lg:top-6">

            <div className="bg-sky-950 text-white border border-sky-900">

              {/* Summary Header */}
              <div className="p-5 sm:p-6 border-b border-sky-800">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300">
                      Your Expedition Estimate
                    </div>

                    <div className="text-[12px] text-sky-500 mt-1">
                      Live pricing · No obligation
                    </div>
                  </div>

                  <div className="px-2.5 py-1 bg-sky-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    Instant Quote
                  </div>
                </div>
              </div>

              {/* Trek */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-sky-900 flex items-center justify-center shrink-0">
                    <Mountain className="w-4 h-4 text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold leading-snug text-white">
                      {selectedTrek.title}
                    </h3>

                    <p className="text-[11px] text-sky-300 mt-1">
                      {selectedTrek.durationDays} Days /{' '}
                      {selectedTrek.durationNights} Nights
                    </p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mt-5 pt-4 border-t border-sky-900 space-y-2.5 text-[12px]">
                  <div className="flex justify-between gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Group size
                    </span>

                    <span className="text-white font-semibold">
                      {groupSize} {groupSize === 1 ? 'person' : 'people'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-400">
                    <span>Comfort tier</span>

                    <span className="text-white font-semibold capitalize">
                      {tier}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-400">
                    <span>Permits & royalties</span>

                    <span className="text-emerald-400 font-semibold">
                      Included
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5" />
                      Domestic flights
                    </span>

                    <span className="text-emerald-400 font-semibold">
                      Included
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-5 pt-5 border-t border-sky-800">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-sky-300 font-bold">
                    Estimated Cost Per Person
                  </div>

                  <div className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {formatPrice(roundedPerPerson, currency)}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Estimated group total:{' '}
                    <span className="text-sky-300 font-bold">
                      {formatPrice(groupGrandTotal, currency)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleProceed}
                    id="cost-estimator-book-btn"
                    className="w-full min-h-[48px] bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-3 text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Book This Custom Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 text-[12px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask About Availability</span>
                  </a>
                </div>

                {/* Trust */}
                <div className="mt-5 pt-4 border-t border-sky-900">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />

                      <div>
                        <div className="text-[11px] font-bold text-white">
                          Transparent Pricing
                        </div>

                        <div className="text-[10px] text-slate-400 mt-0.5">
                          No surprise travel charges
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />

                      <div>
                        <div className="text-[11px] font-bold text-white">
                          Flexible Planning
                        </div>

                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Confirm details before payment
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 text-center text-[10px] sm:text-[11px] text-slate-500">
          <span>✓ Clear expedition pricing</span>
          <span className="hidden sm:block">•</span>
          <span>✓ Local expedition support</span>
          <span className="hidden sm:block">•</span>
          <span>✓ Confirm availability before booking</span>
        </div>
      </div>
    </section>
  );
};