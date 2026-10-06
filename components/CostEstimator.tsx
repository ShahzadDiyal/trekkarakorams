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
import { whatsappLink, SITE_NAME } from '@/lib/site';
import { useTreks } from '@/lib/content';
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
  // Live published treks (static fallback if the DB is unreachable).
  const { treks } = useTreks();
  const [selectedTrekId, setSelectedTrekId] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [tier, setTier] = useState<'standard' | 'deluxe'>('standard');
  const [includeExtraPorter, setIncludeExtraPorter] = useState(false);
  const [includeSingleTent, setIncludeSingleTent] = useState(false);
  const [includeHeliInsurance, setIncludeHeliInsurance] = useState(true);

  // Default to the first live trek once loaded.
  React.useEffect(() => {
    if (!selectedTrekId && treks.length > 0) setSelectedTrekId(treks[0].id);
  }, [treks, selectedTrekId]);

  const selectedTrek =
    treks.find((trek) => trek.id === selectedTrekId) || treks[0];

  if (!selectedTrek) return null;

  const basePrice = selectedTrek.priceUSD;

  /* =========================
     PRICING
  ========================== */

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

  /* =========================
     BOOKING
  ========================== */

  const handleProceed = () => {
    onOpenBooking({
      trekTitle: selectedTrek.title,
      groupSize,
      totalPerPerson: roundedPerPerson,
      notes: `Tier: ${tier.toUpperCase()}, Single Tent: ${
        includeSingleTent ? 'Yes' : 'No'
      }, Extra Porter: ${
        includeExtraPorter ? 'Yes' : 'No'
      }, Heli Evac: ${
        includeHeliInsurance ? 'Yes' : 'No'
      }`,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Trek Karakoram! I used your online Cost Estimator for "${selectedTrek.title}" for a group of ${groupSize} person(s). Estimated total per person is ${formatPrice(
      perPersonTotal,
      'USD'
    )}. Please provide booking availability and payment details.`
  );

  const stepLabel =
    'text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 sm:text-xs';

  return (
    <section
      id="cost-estimator-section"
      className="relative overflow-hidden border-y border-slate-200 bg-slate-50"
    >
      {/* =========================
          BACKGROUND
      ========================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600 sm:text-[11px]">
            <span className="h-px w-7 bg-sky-500" />
            <Sparkles className="h-3.5 w-3.5" />
            <span>Plan Your Expedition</span>
            <span className="h-px w-7 bg-sky-500" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Build Your Expedition
            <span className="block text-sky-600">
              & See Your Price
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Choose your route, group size and preferred comfort level.
            Your estimated expedition cost updates instantly.
          </p>
        </div>

        {/* =========================
            CALCULATOR
        ========================== */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

          {/* =========================
              OPTIONS
          ========================== */}

          <div className="space-y-5 lg:col-span-7">

            {/* ROUTE */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-[11px] font-bold text-white">
                    01
                  </span>

                  <div>
                    <h3 className={stepLabel}>
                      Select Trekking Route
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Choose your preferred expedition
                    </p>
                  </div>
                </div>

                <select
                    value={selectedTrekId}
                    onChange={(event) =>
                      setSelectedTrekId(event.target.value)
                    }
                    className="field-select"
                  >
                    {treks.map((trek) => (
                      <option key={trek.id} value={trek.id}>
                        {trek.title} — {trek.durationDays} Days / Max{' '}
                        {trek.maxAltitude}m
                      </option>
                    ))}
                  </select>
              </div>
            </div>

            {/* GROUP SIZE */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-[11px] font-bold text-white">
                      02
                    </span>

                    <div>
                      <h3 className={stepLabel}>
                        Number of Trekkers
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Larger groups receive special rates
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex w-fit items-center gap-1.5 border border-sky-100 bg-sky-50 px-3 py-1.5 text-[11px] font-bold text-sky-700">
                    <Users className="h-3.5 w-3.5" />

                    {groupSize === 1
                      ? 'Solo Trek'
                      : `${groupSize} Trekkers`}

                    {groupSize >= 4 && ' · Discount'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                  {[1, 2, 3, 4, 6, 8, 10, 12].map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => setGroupSize(number)}
                      className={`min-h-[44px] rounded-lg border text-sm font-bold transition-all ${
                        groupSize === number
                          ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                {groupSize >= 4 && (
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                    Your group qualifies for a discounted per-person rate.
                  </div>
                )}
              </div>
            </div>

            {/* COMFORT */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-[11px] font-bold text-white">
                    03
                  </span>

                  <div>
                    <h3 className={stepLabel}>
                      Expedition Comfort
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Choose how you want to experience the mountains
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* STANDARD */}

                  <button
                    type="button"
                    onClick={() => setTier('standard')}
                    className={`relative border p-5 text-left transition-all ${
                      tier === 'standard'
                        ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tier === 'standard' && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center bg-sky-600 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}

                    <div className="pr-8">
                      <div className="text-sm font-bold text-slate-950">
                        Standard Expedition
                      </div>

                      <div className="mt-1 text-[11px] font-medium text-slate-500">
                        Comfortable & practical
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-6 text-slate-600">
                      4-season tents, twin hotel sharing, expedition chef
                      and 1 porter per trekker.
                    </p>

                    <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      Included
                    </div>
                  </button>

                  {/* DELUXE */}

                  <button
                    type="button"
                    onClick={() => setTier('deluxe')}
                    className={`relative border p-5 text-left transition-all ${
                      tier === 'deluxe'
                        ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tier === 'deluxe' && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center bg-sky-600 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}

                    <div className="pr-8">
                      <div className="text-sm font-bold text-slate-950">
                        VIP Glamping Tier
                      </div>

                      <div className="mt-1 text-[11px] font-medium text-slate-500">
                        Premium mountain comfort
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-6 text-slate-600">
                      Serena Hotel upgrades, heated glamping domes at
                      Concordia and satellite WiFi.
                    </p>

                    <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      +{formatPrice(450, currency)}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* ADD-ONS */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-[11px] font-bold text-white">
                    04
                  </span>

                  <div>
                    <h3 className={stepLabel}>
                      Safety & Optional Add-ons
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Add extra comfort or protection to your expedition
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">

                  {/* HELICOPTER */}

                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/30">
                    <div className="flex min-w-0 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeHeliInsurance}
                        onChange={(event) =>
                          setIncludeHeliInsurance(event.target.checked)
                        }
                        className="h-4 w-4 shrink-0 cursor-pointer accent-sky-600"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />

                          <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">
                            Helicopter Rescue Bond
                          </span>
                        </div>

                        <p className="mt-1 pl-5 text-[10px] leading-4 text-slate-500">
                          Additional emergency evacuation protection
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-slate-700">
                      +{formatPrice(120, currency)}
                    </span>
                  </label>

                  {/* SINGLE TENT */}

                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/30">
                    <div className="flex min-w-0 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeSingleTent}
                        onChange={(event) =>
                          setIncludeSingleTent(event.target.checked)
                        }
                        className="h-4 w-4 shrink-0 cursor-pointer accent-sky-600"
                      />

                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">
                          Private Solo Tent
                        </span>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Your own tent throughout the trek
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-slate-700">
                      +{formatPrice(160, currency)}
                    </span>
                  </label>

                  {/* EXTRA PORTER */}

                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/30">
                    <div className="flex min-w-0 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeExtraPorter}
                        onChange={(event) =>
                          setIncludeExtraPorter(event.target.checked)
                        }
                        className="h-4 w-4 shrink-0 cursor-pointer accent-sky-600"
                      />

                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">
                          Extra Porter
                        </span>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Recommended for additional camera equipment
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-slate-700">
                      +{formatPrice(280, currency)}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              PRICE SUMMARY
          ========================== */}

          <aside className="lg:sticky lg:top-6 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-xl">

              {/* HEADER */}

              <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400">
                      Your Expedition Estimate
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Live pricing · No obligation
                    </div>
                  </div>

                  <span className="shrink-0 rounded-md bg-sky-500 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-950">
                    Instant Quote
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">

                {/* SELECTED TREK */}

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-900/80">
                    <Mountain className="h-5 w-5 text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-6 text-white sm:text-base">
                      {selectedTrek.title}
                    </h3>

                    <p className="mt-1 text-[11px] text-sky-300">
                      {selectedTrek.durationDays} Days /{' '}
                      {selectedTrek.durationNights} Nights
                    </p>
                  </div>
                </div>

                {/* BREAKDOWN */}

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-slate-400">
                      <Users className="h-3.5 w-3.5" />
                      Group size
                    </span>

                    <span className="font-semibold text-white">
                      {groupSize} {groupSize === 1 ? 'person' : 'people'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Comfort tier
                    </span>

                    <span className="font-semibold capitalize text-white">
                      {tier}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Permits & royalties
                    </span>

                    <span className="font-semibold text-emerald-400">
                      Included
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2 text-slate-400">
                      <Plane className="h-3.5 w-3.5" />
                      Domestic flights
                    </span>

                    <span className="font-semibold text-emerald-400">
                      Included
                    </span>
                  </div>
                </div>

                {/* PRICE */}

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300">
                    Estimated Cost Per Person
                  </div>

                  <div className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {formatPrice(roundedPerPerson, currency)}
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400">
                    Estimated group total:{' '}
                    <span className="font-bold text-sky-300">
                      {formatPrice(groupGrandTotal, currency)}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-7 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleProceed}
                    id="cost-estimator-book-btn"
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-sky-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-sky-400"
                  >
                    <span>Book This Custom Plan</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href={whatsappLink(decodeURIComponent(whatsappMessage))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-emerald-600 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Ask About Availability</span>
                  </a>
                </div>

                {/* TRUST */}

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                      <div>
                        <div className="text-[11px] font-bold text-white">
                          Transparent Pricing
                        </div>

                        <div className="mt-1 text-[10px] leading-4 text-slate-400">
                          No surprise travel charges
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                      <div>
                        <div className="text-[11px] font-bold text-white">
                          Flexible Planning
                        </div>

                        <div className="mt-1 text-[10px] leading-4 text-slate-400">
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

        {/* =========================
            BOTTOM REASSURANCE
        ========================== */}

        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-[10px] font-medium text-slate-500 sm:flex-row sm:gap-5 sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Clear expedition pricing</span></span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Local expedition support</span></span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Confirm availability before booking</span></span>
        </div>
      </div>
    </section>
  );
};