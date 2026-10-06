'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TREK_STYLES, TREK_PACKAGES } from '@/data/treks';
import { useApp } from '@/lib/context/AppContext';
import { formatPrice } from '@/utils/currency';
import { facetUrl, isKnownActivity } from '@/lib/trek-facets';
import { Mountain, Plane, Users, Compass, Camera, Sparkles, ArrowRight } from 'lucide-react';

// Maps each editorial "travel style" card to the closest real activityType
// in the trek dataset, so the CTA always lands on a real, non-empty facet
// page instead of guessing from the card title (which doesn't reliably
// match the underlying data and could dead-end on a 404 or empty results).
const STYLE_ID_TO_ACTIVITY: Record<string, string> = {
  'high-altitude': 'Pass Crossing',
  'heli-treks': 'Heli Trek',
  'climbing-peaks': 'Expedition',
  'family-moderate': 'Cultural Trek',
  'photography-tours': 'Trekking',
  // 'jeep-safari' has no matching activity in the current catalog yet,
  // so it intentionally falls back to the full catalog below.
};

export const TravelStylesPageClient: React.FC<{ activeStyleId?: string }> = ({
  activeStyleId,
}) => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();

  const styles = activeStyleId
    ? TREK_STYLES.filter((st) => st.id === activeStyleId)
    : TREK_STYLES;
  const activeStyle = activeStyleId
    ? TREK_STYLES.find((st) => st.id === activeStyleId)
    : undefined;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          {activeStyle ? (
            <>
              <Link href="/travel-styles" className="hover:text-sky-600">Travel Styles</Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">{activeStyle.title}</span>
            </>
          ) : (
            <span className="font-semibold text-slate-900">Expedition Travel Styles in Pakistan</span>
          )}
        </div>

        {/* Page Banner */}
        <div className="rounded-2xl bg-sky-950 text-white p-6 sm:p-8 mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            Tailored Mountain Experiences
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            {activeStyle ? activeStyle.title : 'Travel Styles That Match Your Ambition'}
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Whether you seek rugged high-pass glaciated crossings, swift VIP helicopter charters, or relaxed cultural walks among alpine meadows, find your ideal expedition style below.
          </p>
        </div>

        {/* Styles Grid */}
        <div className="space-y-10">
          {styles.map((style) => {
            const matchedTreks = TREK_PACKAGES.filter((t) => {
              if (style.id === 'heli-treks') return t.activityType === 'Heli Trek';
              if (style.id === 'climbing-peaks') return t.activityType === 'Expedition';
              if (style.id === 'family-moderate') return t.difficulty === 'Moderate';
              if (style.id === 'high-altitude') return t.maxAltitude > 5000;
              return true;
            }).slice(0, 3);

            return (
              <div
                key={style.id}
                id={style.id}
                className="rounded-2xl bg-white p-6 sm:p-8 scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 h-64 sm:h-72 overflow-hidden rounded-xl bg-slate-900 relative">
                    <img
                      src={style.image}
                      alt={style.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-[11px] px-2 py-0.5 uppercase tracking-wider">
                      {style.count} Expeditions
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {style.title}
                      </h2>
                      <p className="text-[13px] sm:text-[16px] text-slate-600 leading-relaxed mt-2">
                        {style.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[13px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                        Recommended Expeditions for this Style:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {matchedTreks.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => router.push(`/treks/${t.id}`)}
                            className="rounded-xl border border-transparent p-3 bg-slate-50 hover:border-sky-500 cursor-pointer transition-colors"
                          >
                            <span className="text-[10px] font-bold text-sky-600 uppercase block">{t.region.split(' ')[0]}</span>
                            <h4 className="font-bold text-[14px] text-slate-900  mt-0.5">{t.title}</h4>
                            <div className="text-[11px] font-bold text-sky-700 mt-2">
                              {formatPrice(t.discountPriceUSD || t.priceUSD, currency)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          const activity = STYLE_ID_TO_ACTIVITY[style.id];
                          router.push(activity && isKnownActivity(activity) ? facetUrl('activity', activity) : '/treks');
                        }}
                        className="rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[14px] px-4 py-2 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Explore All {style.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
