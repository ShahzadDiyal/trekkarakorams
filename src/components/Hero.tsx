import React, { useState } from 'react';
import { Search, MapPin, Calendar, Activity, ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { TrekRegion, TrekDifficulty } from '../types';

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
          alt="Karakoram mountain range in Pakistan"
          className="w-full h-full object-cover object-center opacity-45"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              Pakistan #1 Trekking Specialist
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 text-slate-200 border border-slate-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Govt. Licensed DTS ID-2891
            </span>
          </div>

          {/* Punchy Concise Heading (No long headings) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Discover The Karakoram
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-normal">
            Epic trekking expeditions across Gilgit-Baltistan: K2 Base Camp, Baltoro Glacier, Gondogoro La, and Fairy Meadows with certified Balti mountain guides.
          </p>
        </div>

        {/* Search Engine Bar - strictly NO SHADOWS, crisp 1px borders */}
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
                <option value="">All Regions</option>
                <option value="Karakoram">Karakoram (K2 / Baltoro)</option>
                <option value="Hunza & Nagar">Hunza & Nagar Valley</option>
                <option value="Himalayas">Himalayas (Nanga Parbat)</option>
                <option value="Deosai & Astore">Deosai Plains (4,114m)</option>
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
                <option value="Moderate">Moderate (Fairy Meadows / Deosai)</option>
                <option value="Demanding">Demanding (Rush Lake / Heli)</option>
                <option value="Strenuous">Strenuous (K2 Base Camp)</option>
                <option value="Extreme">Extreme (Gondogoro La / Snow Lake)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="hero-search-btn"
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Search Treks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Popular Search Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="font-semibold text-sky-400">Popular searches:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="bg-slate-800/90 hover:bg-sky-600 hover:text-white text-slate-200 px-2.5 py-1 border border-slate-700 transition-colors cursor-pointer text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
