import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TREK_STYLES, TREK_PACKAGES } from '../data/treks';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { Mountain, Plane, Users, Compass, Camera, Sparkles, ArrowRight } from 'lucide-react';

interface TravelStylesPageProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const TravelStylesPage: React.FC<TravelStylesPageProps> = ({ currency, onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Expedition Travel Styles in Pakistan</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8 border-2 border-sky-500 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Tailored Mountain Experiences
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Travel Styles That Match Your Ambition
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Whether you seek rugged high-pass glaciated crossings, swift VIP helicopter charters, or relaxed cultural walks among alpine meadows, find your ideal expedition style below.
          </p>
        </div>

        {/* Styles Grid */}
        <div className="space-y-10">
          {TREK_STYLES.map((style) => {
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
                className="bg-white border border-slate-200 p-6 sm:p-8 scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 h-64 sm:h-72 overflow-hidden bg-slate-900 relative">
                    <img
                      src={style.image}
                      alt={style.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-sky-500 text-slate-950 font-black text-[11px] px-2 py-0.5 uppercase tracking-wider">
                      {style.count} Expeditions
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {style.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {style.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                        Recommended Expeditions for this Style:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {matchedTreks.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => navigate(`/treks/${t.id}`)}
                            className="p-3 bg-slate-50 border border-slate-200 hover:border-sky-500 cursor-pointer transition-colors"
                          >
                            <span className="text-[10px] font-bold text-sky-600 uppercase block">{t.region.split(' ')[0]}</span>
                            <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">{t.title}</h4>
                            <div className="text-[11px] font-bold text-sky-700 mt-2">
                              {formatPrice(t.discountPriceUSD || t.priceUSD, currency)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => navigate(`/treks?activity=${encodeURIComponent(style.title.split(' ')[0])}`)}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 flex items-center gap-1 transition-colors cursor-pointer"
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
