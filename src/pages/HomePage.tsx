import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ActivityGrid } from '../components/ActivityGrid';
import { PopularPackages } from '../components/PopularPackages';
import { TravelStylesSection } from '../components/TravelStylesSection';
import { TrustSection } from '../components/TrustSection';
import { CostEstimator } from '../components/CostEstimator';
import { MapExplorer } from '../components/MapExplorer';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { FAQSection } from '../components/FAQSection';
import { TREK_PACKAGES } from '../data/treks';
import { TrekPackage, Currency } from '../types';
import { ShieldCheck, Mountain, Plane, Award, Compass, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';

interface HomePageProps {
  currency: Currency;
  onOpenBooking: (details: { trekTitle: string; groupSize: number; totalPerPerson: number; notes: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ currency, onOpenBooking }) => {
  const navigate = useNavigate();

  const handleHeroSearch = (filters: { query: string; region: string; duration: string; difficulty: string }) => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.region) params.set('region', filters.region);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    navigate(`/treks?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    navigate(`/treks?q=${encodeURIComponent(tag)}`);
  };

  const handleActivitySelect = (activity: string) => {
    navigate(`/treks?activity=${encodeURIComponent(activity)}`);
  };

  const handleStyleSelect = (styleId: string) => {
    navigate(`/travel-styles#${styleId}`);
  };

  return (
    <main className="flex-1">
      {/* 1. Hero Search Engine */}
      <Hero onSearch={handleHeroSearch} onTagClick={handleTagClick} />

      {/* Trust & Accreditation Strip Banner */}
      <section className="bg-sky-950 text-sky-200 py-3.5 border-y border-sky-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Govt. DTS License: <strong>ID-2891</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Alpine Club of Pakistan Accredited</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Askari Military Helicopter Rescue Bond Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-400 shrink-0" />
            <span>15+ Years Expedition Leadership</span>
          </div>
        </div>
      </section>

      {/* 2. Popular Activities Bento Grid */}
      <ActivityGrid onSelectActivity={handleActivitySelect} />

      {/* 3. Popular Packages Grid */}
      <PopularPackages
        treks={TREK_PACKAGES}
        currency={currency}
        activeRegionFilter=""
        onFilterChange={(region) => {
          if (region) navigate(`/treks?region=${encodeURIComponent(region)}`);
        }}
        onViewDetail={(trek) => navigate(`/treks/${trek.id}`)}
        onBookNow={(trek) => {
          onOpenBooking({
            trekTitle: trek.title,
            groupSize: 2,
            totalPerPerson: trek.discountPriceUSD || trek.priceUSD,
            notes: 'Booked directly from Home Page featured packages'
          });
        }}
        onResetFilters={() => navigate('/treks')}
      />

      {/* 4. Travel Styles Section */}
      <TravelStylesSection onSelectStyle={handleStyleSelect} />

      {/* 5. Trust Section & 4 Key Stat Metric Blocks */}
      <TrustSection />

      {/* 6. Interactive Custom Cost Estimator & Group Calculator */}
      <CostEstimator currency={currency} onOpenBooking={onOpenBooking} />

      {/* 7. Interactive Map Explorer */}
      <MapExplorer onSelectTrekById={(id) => navigate(`/treks/${id}`)} />

      {/* 8. Verified Trekkers Testimonials */}
      <TestimonialsSection />

      {/* 9. Latest Mountain Guides & Articles */}
      <BlogSection />

      {/* 10. FAQ Section */}
      <FAQSection />

      {/* Bottom Conversion CTA Strip */}
      <section className="bg-sky-600 text-white py-10 border-t border-sky-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-100">Ready for 2026 Karakoram Season?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
              Secure Your K2 & Baltoro Permit Slots
            </h2>
            <p className="text-xs text-sky-100 mt-1 max-w-xl">
              Restricted area permits are allocated on a first-come, first-served basis by the Gilgit-Baltistan government. Contact our Skardu operations center today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/planner')}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-5 py-3 uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Calculate Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20want%20to%20inquire%20about%202026%20trekking%20permits"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-sky-900 font-extrabold text-xs px-5 py-3 flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Direct Hotline</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
