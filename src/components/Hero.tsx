import React, { useState } from 'react';
import { Search, MapPin, Calendar, Activity, ArrowRight, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrekRegion, TrekDifficulty } from '../types';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '../data/treks';

interface HeroProps {
  onSearch: (filters: { query: string; region: string; duration: string; difficulty: string }) => void;
  onTagClick: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onTagClick }) => {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      region: selectedRegion,
      duration: selectedDuration,
      difficulty: selectedDifficulty
    });
  };

  const quickTags = [
    'K2 Base Camp Trek',
    'Gondogoro La Pass',
    'Fairy Meadows & Nanga Parbat',
    'Snow Lake (Biafo Hispar)',
    'Rakaposhi Base Camp',
    'Minglik Sar 6,050m'
  ];

  return (
    <section id="hero-section" className="relative bg-slate-900 overflow-hidden">
      {/* Background Mountain Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85"
          alt="K2 and Karakoram mountain range in Pakistan"
          className="w-full h-full object-cover object-center opacity-40"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-600/30 text-sky-200 border border-sky-400/50 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              Official Pakistan Trekking Operator
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/90 text-slate-200 border border-slate-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {BRAND_INFO.licenseNo}
            </span>
          </div>

          {/* Punchy Concise Heading (Strictly no long slogans) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-2">
            TREK KARAKORAM
          </h1>
          <p className="text-xl sm:text-2xl text-sky-300 font-story italic font-normal mb-4">
            {BRAND_INFO.tagline}
          </p>

          <p className="text-slate-200 text-sm sm:text-base mb-6 leading-relaxed max-w-2xl">
            {BRAND_INFO.uspOneLiner} Guided expeditions to K2 Base Camp, Concordia, Fairy Meadows, and Snow Lake with certified local Balti leaders.
          </p>

          {/* Founding Member Banner Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-500/20 border border-amber-400/60 text-amber-200 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>2026 Inception Offer:</strong> 20% discount on all treks + lifetime 10% loyalty privileges.</span>
          </div>
        </div>

        {/* Search Engine Bar - strictly NO SHADOWS, crisp 2px border */}
        <div className="bg-white border-2 border-sky-500 p-3 sm:p-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-2 relative flex items-center border border-slate-200 px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-sky-500">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search K2, Baltoro, Fairy Meadows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Region Select */}
            <div className="relative flex items-center border border-slate-200 px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-sky-500">
              <MapPin className="w-4 h-4 text-sky-500 mr-2 shrink-0" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none cursor-pointer"
                aria-label="Filter by region"
              >
                <option value="">All Mountain Regions</option>
                <option value="Karakoram">Karakoram (K2 / Baltoro)</option>
                <option value="Hunza & Nagar">Hunza & Nagar Valley</option>
                <option value="Himalayas">Himalayas (Nanga Parbat)</option>
                <option value="Deosai & Astore">Deosai & Astore Plains</option>
              </select>
            </div>

            {/* Difficulty Select */}
            <div className="relative flex items-center border border-slate-200 px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-sky-500">
              <Activity className="w-4 h-4 text-sky-500 mr-2 shrink-0" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none cursor-pointer"
                aria-label="Filter by difficulty"
              >
                <option value="">All Difficulties</option>
                <option value="Moderate">Moderate (Family Friendly)</option>
                <option value="Demanding">Demanding (Active Hikers)</option>
                <option value="Strenuous">Strenuous (Experienced)</option>
                <option value="Extreme">Extreme (High Pass / Glaciers)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-full min-h-[44px] bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>FIND EXPEDITION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Popular Routes:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-sky-600 hover:text-white border border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
