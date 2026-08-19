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
import { TREK_PACKAGES, BRAND_INFO, BRAND_VALUES, AUDIENCE_PERSONAS, FOUNDING_MEMBERS_SPECIAL } from '../data/treks';
import { TrekPackage, Currency } from '../types';
import {
  ShieldCheck,
  Mountain,
  Plane,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Heart,
  Leaf,
  Recycle,
  Users,
  Globe,
  Star,
  Gift
} from 'lucide-react';

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

  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-600" />;
      case 'Recycle': return <Recycle className="w-5 h-5 text-teal-600" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-sky-700" />;
      default: return <Globe className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <main className="flex-1">
      {/* 1. Hero Search Engine with Brand Tagline & Founding Member Promo */}
      <Hero onSearch={handleHeroSearch} onTagClick={handleTagClick} />

      {/* Trust & Accreditation Strip Banner */}
      <section className="bg-slate-950 text-slate-200 py-3.5 border-y border-slate-800 text-xs">
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
            <span>Max 8 Trekkers / Small Group Focus</span>
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Founding Member Inception Special Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                THE SOUL OF GILGIT-BALTISTAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {BRAND_INFO.storyTitle}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-story">
                {BRAND_INFO.story[0]}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {BRAND_INFO.story[1]}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/treks')}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Explore 2026 Expeditions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/destinations')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Learn About The Regions
                </button>
              </div>
            </div>

            {/* Founding Members Special Box */}
            <div className="lg:col-span-5 bg-slate-900 border-2 border-amber-500 p-6 sm:p-7 text-white relative">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  {FOUNDING_MEMBERS_SPECIAL.title}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                Join As A Founding Explorer
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Be among the first explorers to journey with Trek Karakoram and receive lifetime privileges:
              </p>
              <ul className="space-y-2 text-xs text-slate-200 mb-6">
                {FOUNDING_MEMBERS_SPECIAL.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/planner')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Claim 20% Founding Discount</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 8 Core Values of Trek Karakoram */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              The 8 Core Values of Trek Karakoram
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Every expedition is rooted in authenticity, environmental stewardship, and deep reverence for the mountain folk of Gilgit-Baltistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BRAND_VALUES.map((val) => (
              <div
                key={val.number}
                className="bg-white border border-slate-200 p-5 hover:border-sky-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-slate-100 border border-slate-200">
                      {renderValueIcon(val.iconName)}
                    </div>
                    <span className="text-xs font-black text-slate-400">0{val.number}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight mb-0.5">
                    {val.title}
                  </h3>
                  <div className="text-[11px] font-bold text-sky-600 mb-2">
                    {val.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Activity Grid Bento Layout */}
      <ActivityGrid onSelectActivity={handleActivitySelect} />

      {/* 5. Featured Trek Packages Catalog */}
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

      {/* 6. Who We Guide - Target Explorers Profiles & Personas */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              CRAFTED FOR EVERY EXPLORER
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              For Those Who Seek More Than Just A Destination
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-story">
              Whether you are an international high-altitude trekker, Pakistani explorer, or wildlife filmmaker, our end-to-end logistics ensure total peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIENCE_PERSONAS.slice(0, 3).map((persona) => (
              <div key={persona.id} className="bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-sky-100 text-sky-800 text-[10px] font-black px-2 py-0.5 uppercase tracking-wider mb-2">
                    {persona.title}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {persona.profile}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    <strong>Motivation:</strong> {persona.motivation}
                  </p>
                  <div className="bg-white p-3 border border-slate-200 text-xs text-slate-700 mb-4">
                    <span className="font-bold text-slate-900 block mb-0.5">How We Help:</span>
                    {persona.howWeHelp}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic font-story">
                  {persona.personaExample}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Travel Styles */}
      <TravelStylesSection onSelectStyle={handleStyleSelect} />

      {/* 8. Trust Section & 4 Key Stat Metric Blocks */}
      <TrustSection />

      {/* 9. Interactive Custom Cost Estimator & Group Calculator */}
      <CostEstimator currency={currency} onOpenBooking={onOpenBooking} />

      {/* 10. Interactive Map Explorer */}
      <MapExplorer onSelectTrekById={(id) => navigate(`/treks/${id}`)} />

      {/* 11. Verified Trekkers Testimonials */}
      <TestimonialsSection />

      {/* 12. Latest Mountain Guides & Articles */}
      <BlogSection />

      {/* 13. FAQ Section */}
      <FAQSection />

      {/* Bottom Conversion CTA Strip */}
      <section className="bg-sky-600 text-white py-10 border-t border-sky-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-100">
              {BRAND_INFO.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
              Secure Your 2026 Karakoram Permit
            </h2>
            <p className="text-xs text-sky-100 mt-1 max-w-xl">
              Restricted area permits for K2 Base Camp, Concordia, and Baltoro are allocated strictly on a quota basis. Connect with our Skardu operations HQ.
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
              href="https://wa.me/923009876543?text=Hi%20Trek%20Karakoram%2C%20I%20want%20to%20inquire%20about%202026%20trekking%20permits"
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
