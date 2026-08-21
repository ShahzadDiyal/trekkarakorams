'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, Activity, ArrowRight, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrekRegion, TrekDifficulty } from '@/types';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';

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
    <section id="hero-section" className="relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center">
      {/* Background with improved overlay */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/trek-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 text-left md:text-center">
        <div className="max-w-7xl mx-auto">
          {/* Top badges - refined spacing */}
          <div className="flex flex-wrap items-center gap-3 mb-6 justify-start md:justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600/20 text-sky-200 text-[13px] font-bold uppercase tracking-wider rounded-sm">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              Official Pakistan Trekking Operator
            </span>
          </div>

          {/* Heading - tightened spacing */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-2">
            TREK KARAKORAM
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-sky-300 font-story italic font-light mb-4">
            {BRAND_INFO.tagline}
          </p>

          <p className="text-slate-200 text-[14px] sm:text-[16px] lg:text-lg mb-6 leading-relaxed max-w-2xl mx-auto md:mx-auto">
            {BRAND_INFO.uspOneLiner} Guided expeditions to K2 Base Camp, Concordia, Fairy Meadows, and Snow Lake with certified local Balti leaders.
          </p>

          {/* Search Engine Bar - refined styling */}
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm border border-white/20 max-w-5xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Input */}
              <div className="lg:col-span-2 relative flex items-center border-2 border-slate-200 px-3 py-2.5 bg-white focus-within:border-sky-500 transition-colors">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search K2, Baltoro, Fairy Meadows..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-[16px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Region Select */}
              <div className="relative flex items-center border-2 border-slate-200 px-3 py-2.5 bg-white focus-within:border-sky-500 transition-colors">
                <MapPin className="w-4 h-4 text-sky-500 mr-2 shrink-0" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-transparent text-[16px] text-slate-800 focus:outline-none cursor-pointer appearance-none"
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
              <div className="relative flex items-center border-2 border-slate-200 px-3 py-2.5 bg-white focus-within:border-sky-500 transition-colors">
                <Activity className="w-4 h-4 text-sky-500 mr-2 shrink-0" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-transparent text-[16px] text-slate-800 focus:outline-none cursor-pointer appearance-none"
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
                  className="w-full h-full min-h-[48px] bg-sky-600 hover:bg-sky-700 text-white font-bold text-[16px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-sm"
                >
                  <span>FIND EXPEDITION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Tag Pills - refined */}
          <div className="hidden md:flex flex-wrap items-center gap-2 mt-6 justify-center">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="px-3 py-1.5 bg-slate-800/70 hover:bg-sky-600 hover:text-white border border-slate-700 hover:border-sky-500 text-slate-200 text-[13px] font-medium transition-all duration-200 rounded-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};