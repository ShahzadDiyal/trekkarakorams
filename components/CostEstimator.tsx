'use client';

import React, { useState } from 'react';
import { Sparkles, Calculator, Check, Users, Shield, Plane, ArrowRight, MessageSquare } from 'lucide-react';
import { TREK_PACKAGES } from '@/data/treks';
import { Currency } from '@/types';
import { formatPrice } from '@/utils/currency';

interface CostEstimatorProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ currency, onOpenBooking }) => {
  const [selectedTrekId, setSelectedTrekId] = useState(TREK_PACKAGES[0].id);
  const [groupSize, setGroupSize] = useState(2);
  const [tier, setTier] = useState<'standard' | 'deluxe'>('standard');
  const [includeExtraPorter, setIncludeExtraPorter] = useState(false);
  const [includeSingleTent, setIncludeSingleTent] = useState(false);
  const [includeHeliInsurance, setIncludeHeliInsurance] = useState(true);

  const selectedTrek = TREK_PACKAGES.find((t) => t.id === selectedTrekId) || TREK_PACKAGES[0];
  const basePrice = selectedTrek.discountPriceUSD || selectedTrek.priceUSD;

  // Pricing math:
  // Group discount factor:
  // 1 person: +25% solo surcharge
  // 2-3 persons: base price
  // 4-7 persons: -8% group discount
  // 8+ persons: -15% group discount
  let groupMultiplier = 1.0;
  if (groupSize === 1) groupMultiplier = 1.25;
  else if (groupSize >= 4 && groupSize <= 7) groupMultiplier = 0.92;
  else if (groupSize >= 8) groupMultiplier = 0.85;

  let perPersonTotal = basePrice * groupMultiplier;

  if (tier === 'deluxe') {
    perPersonTotal += 450; // Deluxe glamping dome & upgraded hotel in Skardu
  }
  if (includeExtraPorter) {
    perPersonTotal += 280; // Extra personal porter for heavy photography/video gear
  }
  if (includeSingleTent) {
    perPersonTotal += 160; // Private solo tent throughout trek
  }
  if (includeHeliInsurance) {
    perPersonTotal += 120; // Askari Aviation guaranteed medevac deposit bond
  }

  const groupGrandTotal = Math.round(perPersonTotal * groupSize);

  const handleProceed = () => {
    onOpenBooking({
      trekTitle: selectedTrek.title,
      groupSize,
      totalPerPerson: Math.round(perPersonTotal),
      notes: `Tier: ${tier.toUpperCase()}, Single Tent: ${includeSingleTent ? 'Yes' : 'No'}, Extra Porter: ${includeExtraPorter ? 'Yes' : 'No'}, Heli Evac: ${includeHeliInsurance ? 'Yes' : 'No'}`
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Karakoram Expeditions! I used your online Cost Estimator for "${selectedTrek.title}" for a group of ${groupSize} person(s). Estimated total per person is ${formatPrice(perPersonTotal, 'USD')}. Please provide booking availability and payment details.`
  );

return (
    <section id="cost-estimator-section" className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Heading - concise */}
            <div className="max-w-3xl mb-6 sm:mb-8">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-sky-600 mb-1">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Interactive Calculator</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight leading-tight">
                    Custom Trek Planner & Cost Estimator
                </h2>
                <p className="text-[14px] sm:text-[16px] text-slate-600 mt-1 leading-relaxed">
                    Calculate immediate transparent pricing based on group size, service tier, and expedition add-ons.
                </p>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                {/* Left Column: Form Controls (7 cols) */}
                <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 rounded-lg sm:rounded-none">

                    {/* 1. Select Expedition */}
                    <div>
                        <label className="block text-[11px] sm:text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 sm:mb-2">
                            1. Select Trekking Route
                        </label>
                        <select
                            value={selectedTrekId}
                            onChange={(e) => setSelectedTrekId(e.target.value)}
                            className="w-full bg-white border border-slate-300 p-2.5 sm:p-3 text-[14px] sm:text-[16px] font-semibold text-slate-900 focus:border-sky-500 focus:outline-none cursor-pointer rounded-md sm:rounded-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10"
                        >
                            {TREK_PACKAGES.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title} ({t.durationDays} Days, Max {t.maxAltitude}m)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 2. Group Size Selector */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 sm:mb-2 gap-1 sm:gap-0">
                            <label className="text-[11px] sm:text-[13px] font-bold text-slate-800 uppercase tracking-wider">
                                2. Number of Trekkers
                            </label>
                            <span className="text-[11px] sm:text-[13px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-sm self-start sm:self-auto text-center">
                                {groupSize} {groupSize === 1 ? 'Solo Trekker' : 'Trekkers'} {groupSize >= 4 ? '⭐ Group Discount' : groupSize === 1 ? '🔹 Solo Surcharge' : ''}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {[1, 2, 3, 4, 6, 8, 10, 12].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setGroupSize(num)}
                                    className={`px-2.5 sm:px-3 py-1.5 sm:py-1.5 text-[12px] sm:text-[13px] font-bold border transition-colors cursor-pointer rounded-md sm:rounded-none flex-1 sm:flex-none min-w-[52px] sm:min-w-[70px] text-center ${
                                        groupSize === num
                                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                                            : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:bg-sky-50'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Expedition Tier */}
                    <div>
                        <label className="block text-[11px] sm:text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 sm:mb-2">
                            3. Expedition Comfort Tier
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                            <div
                                onClick={() => setTier('standard')}
                                className={`p-3 sm:p-3.5 cursor-pointer transition-colors rounded-lg sm:rounded-none ${
                                    tier === 'standard'
                                        ? 'bg-sky-50 border-2 border-sky-500 shadow-sm'
                                        : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-[12px] sm:text-[13px] text-slate-900">Standard Expedition</span>
                                    <span className="text-[10px] sm:text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">Included</span>
                                </div>
                                <p className="text-[11px] sm:text-[11px] text-slate-600 mt-1 leading-relaxed">
                                    4-season tents, twin hotel sharing, expedition chef, 1 porter/trekker.
                                </p>
                            </div>

                            <div
                                onClick={() => setTier('deluxe')}
                                className={`p-3 sm:p-3.5 cursor-pointer transition-colors rounded-lg sm:rounded-none ${
                                    tier === 'deluxe'
                                        ? 'bg-sky-50 border-2 border-sky-500 shadow-sm'
                                        : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-[12px] sm:text-[13px] text-slate-900">VIP Glamping Tier</span>
                                    <span className="text-[10px] sm:text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">+ {formatPrice(450, currency)}</span>
                                </div>
                                <p className="text-[11px] sm:text-[11px] text-slate-600 mt-1 leading-relaxed">
                                    Serena Hotel upgrades, heated glamping domes at Concordia, satellite WiFi.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Optional Add-ons */}
                    <div>
                        <label className="block text-[11px] sm:text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1.5 sm:mb-2">
                            4. Add-ons & Safety Options
                        </label>
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="flex items-center justify-between p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-none cursor-pointer hover:border-sky-400 transition-colors">
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={includeHeliInsurance}
                                        onChange={(e) => setIncludeHeliInsurance(e.target.checked)}
                                        className="accent-sky-600 h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0"
                                    />
                                    <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800 leading-tight">
                                        Military Helicopter Rescue Bond
                                    </span>
                                </div>
                                <span className="text-[12px] sm:text-[13px] font-bold text-slate-600 flex-shrink-0 ml-2">
                                    +{formatPrice(120, currency)}
                                </span>
                            </label>

                            <label className="flex items-center justify-between p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-none cursor-pointer hover:border-sky-400 transition-colors">
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={includeSingleTent}
                                        onChange={(e) => setIncludeSingleTent(e.target.checked)}
                                        className="accent-sky-600 h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0"
                                    />
                                    <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800 leading-tight">
                                        Private Solo Tent Supplement
                                    </span>
                                </div>
                                <span className="text-[12px] sm:text-[13px] font-bold text-slate-600 flex-shrink-0 ml-2">
                                    +{formatPrice(160, currency)}
                                </span>
                            </label>

                            <label className="flex items-center justify-between p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-none cursor-pointer hover:border-sky-400 transition-colors">
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={includeExtraPorter}
                                        onChange={(e) => setIncludeExtraPorter(e.target.checked)}
                                        className="accent-sky-600 h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0"
                                    />
                                    <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800 leading-tight">
                                        Extra Porter (20kg Camera Gear)
                                    </span>
                                </div>
                                <span className="text-[12px] sm:text-[13px] font-bold text-slate-600 flex-shrink-0 ml-2">
                                    +{formatPrice(280, currency)}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Calculated Summary (5 cols) */}
                <div className="lg:col-span-5 bg-sky-950 text-white p-5 sm:p-6 lg:p-6 rounded-xl lg:rounded-none shadow-lg lg:shadow-none">
                    <div className="flex items-center justify-between pb-3 border-b border-sky-800">
                        <span className="text-[11px] sm:text-[13px] font-bold text-sky-400 uppercase tracking-wider">
                            Cost Breakdown
                        </span>
                        <span className="bg-sky-500 text-slate-950 text-[9px] sm:text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                            Instant Quote
                        </span>
                    </div>

                    <div className="py-3 sm:py-4 space-y-2 text-[13px] sm:text-[13px]">
                        <div className="font-bold text-[15px] sm:text-[16px] text-white leading-tight">{selectedTrek.title}</div>
                        <div className="text-sky-300 text-[12px] sm:text-[13px]">Duration: {selectedTrek.durationDays} Days / {selectedTrek.durationNights} Nights</div>

                        <div className="pt-3 border-t border-sky-900/60 space-y-1.5 text-slate-300 text-[12px] sm:text-[13px]">
                            <div className="flex justify-between">
                                <span>Group Size:</span>
                                <span className="text-white font-medium">{groupSize} Person(s)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Selected Tier:</span>
                                <span className="text-white font-medium capitalize">{tier}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Permits & Royalties:</span>
                                <span className="text-emerald-400 font-medium">Included</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Domestic Flights (Isb-Skardu):</span>
                                <span className="text-emerald-400 font-medium">Included</span>
                            </div>
                        </div>

                        {/* Total Box */}
                        <div className="pt-4 mt-3 border-t border-sky-800">
                            <div className="text-[11px] sm:text-[13px] text-sky-300 uppercase font-bold">Estimated Cost Per Person</div>
                            <div className="text-2xl sm:text-2xl lg:text-3xl font-bold text-white mt-0.5">
                                {formatPrice(Math.round(perPersonTotal), currency)}
                            </div>
                            <div className="text-[11px] sm:text-[11px] text-slate-400 mt-0.5">
                                Total for group of {groupSize}: <strong className="text-sky-300">{formatPrice(groupGrandTotal, currency)}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 sm:mt-5 pt-4 border-t border-sky-900 space-y-2.5 sm:space-y-2">
                        <button
                            type="button"
                            onClick={handleProceed}
                            id="cost-estimator-book-btn"
                            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium py-3 sm:py-3 px-4 text-[12px] sm:text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-lg sm:rounded-none shadow-md hover:shadow-lg"
                        >
                            <span>Book This Custom Plan</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <a
                            href={`https://wa.me/923009876543?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 sm:py-2.5 px-4 text-[12px] sm:text-[13px] flex items-center justify-center gap-2 transition-colors rounded-lg sm:rounded-none shadow-md hover:shadow-lg"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Inquire on WhatsApp</span>
                        </a>
                    </div>

                    <div className="mt-3 text-[9px] sm:text-[10px] text-slate-400 text-center leading-relaxed">
                        ✓ Price is guaranteed upon deposit. No hidden fees or surprise fuel surcharges.
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};
