import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActivityGrid } from './components/ActivityGrid';
import { PopularPackages } from './components/PopularPackages';
import { TravelStylesSection } from './components/TravelStylesSection';
import { TrustSection } from './components/TrustSection';
import { CostEstimator } from './components/CostEstimator';
import { MapExplorer } from './components/MapExplorer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { TrekDetailModal } from './components/TrekDetailModal';
import { CustomTrekModal } from './components/CustomTrekModal';

import { TREK_PACKAGES } from './data/treks';
import { TrekPackage, Currency } from './types';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [activeTreks, setActiveTreks] = useState<TrekPackage[]>(TREK_PACKAGES);
  
  // Modal states
  const [selectedTrekForDetail, setSelectedTrekForDetail] = useState<TrekPackage | null>(null);
  const [customPlanOpen, setCustomPlanOpen] = useState(false);
  const [customPlanData, setCustomPlanData] = useState<{
    trekTitle?: string;
    groupSize?: number;
    totalPerPerson?: number;
    notes?: string;
  }>({});

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero Search Handler
  const handleHeroSearch = (filters: { query: string; region: string; duration: string; difficulty: string }) => {
    let filtered = [...TREK_PACKAGES];

    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.overview.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (filters.region) {
      filtered = filtered.filter((t) => t.region === filters.region);
      setRegionFilter(filters.region);
    } else {
      setRegionFilter('');
    }

    if (filters.difficulty) {
      filtered = filtered.filter((t) => t.difficulty === filters.difficulty);
    }

    setActiveTreks(filtered);
    scrollToSection('popular-packages-section');
  };

  // Popular search tag click
  const handleTagClick = (tag: string) => {
    const q = tag.toLowerCase();
    const filtered = TREK_PACKAGES.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortTitle.toLowerCase().includes(q) ||
        t.highlights.some((h) => h.toLowerCase().includes(q))
    );
    if (filtered.length > 0) {
      setActiveTreks(filtered);
    } else {
      setActiveTreks(TREK_PACKAGES);
    }
    scrollToSection('popular-packages-section');
  };

  // Activity Grid click
  const handleActivitySelect = (activity: string) => {
    let filtered = TREK_PACKAGES;
    if (activity === 'Trekking') {
      filtered = TREK_PACKAGES.filter((t) => t.activityType === 'Trekking' || t.activityType === 'Pass Crossing');
    } else if (activity === 'Heli Trek') {
      filtered = TREK_PACKAGES.filter((t) => t.activityType === 'Heli Trek');
    } else if (activity === 'Expedition') {
      filtered = TREK_PACKAGES.filter((t) => t.activityType === 'Expedition');
    } else if (activity === 'Pass Crossing') {
      filtered = TREK_PACKAGES.filter((t) => t.activityType === 'Pass Crossing');
    } else if (activity === 'Jeep Safari') {
      filtered = TREK_PACKAGES.filter((t) => t.region === 'Deosai & Astore' || t.difficulty === 'Moderate');
    } else {
      filtered = TREK_PACKAGES.filter((t) => t.difficulty === 'Moderate');
    }

    setActiveTreks(filtered);
    setRegionFilter('');
    scrollToSection('popular-packages-section');
  };

  // Travel style selection
  const handleStyleSelect = (styleId: string) => {
    if (styleId === 'heli-treks') {
      setActiveTreks(TREK_PACKAGES.filter((t) => t.activityType === 'Heli Trek'));
    } else if (styleId === 'climbing-peaks') {
      setActiveTreks(TREK_PACKAGES.filter((t) => t.activityType === 'Expedition'));
    } else if (styleId === 'family-moderate') {
      setActiveTreks(TREK_PACKAGES.filter((t) => t.difficulty === 'Moderate'));
    } else {
      setActiveTreks(TREK_PACKAGES);
    }
    scrollToSection('popular-packages-section');
  };

  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region);
    if (!region) {
      setActiveTreks(TREK_PACKAGES);
    } else {
      setActiveTreks(TREK_PACKAGES.filter((t) => t.region.toLowerCase().includes(region.toLowerCase())));
    }
  };

  const handleResetFilters = () => {
    setRegionFilter('');
    setActiveTreks(TREK_PACKAGES);
  };

  const handleSelectTrekById = (trekId: string) => {
    const trek = TREK_PACKAGES.find((t) => t.id === trekId);
    if (trek) {
      setSelectedTrekForDetail(trek);
    }
  };

  const handleOpenBooking = (details: {
    trekTitle: string;
    groupSize: number;
    totalPerPerson: number;
    notes: string;
  }) => {
    setCustomPlanData(details);
    setCustomPlanOpen(true);
  };

  const handleBookFromModal = (trek: TrekPackage, selectedDate?: string, travelers?: number) => {
    setSelectedTrekForDetail(null);
    setCustomPlanData({
      trekTitle: trek.title,
      groupSize: travelers || 2,
      totalPerPerson: trek.discountPriceUSD || trek.priceUSD,
      notes: `Target Departure: ${selectedDate || 'Guaranteed 2026 departure slot'}`
    });
    setCustomPlanOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* 1. Top Utility Contact Bar */}
      <TopBar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenCustomPlan={() => {
          setCustomPlanData({});
          setCustomPlanOpen(true);
        }}
      />

      {/* 2. Main Navigation Header */}
      <Navbar
        onNavigateSection={scrollToSection}
        onFilterRegion={handleRegionFilterChange}
        onOpenCostEstimator={() => scrollToSection('cost-estimator-section')}
        onOpenCustomPlan={() => {
          setCustomPlanData({});
          setCustomPlanOpen(true);
        }}
      />

      {/* 3. Hero Section with Search and Mountain Backing */}
      <Hero
        onSearch={handleHeroSearch}
        onTagClick={handleTagClick}
      />

      {/* 4. Popular Activities Grid (Matching Screenshot) */}
      <ActivityGrid onSelectActivity={handleActivitySelect} />

      {/* 5. Popular Packages Grid with Duration & Badges */}
      <PopularPackages
        treks={activeTreks}
        currency={currency}
        activeRegionFilter={regionFilter}
        onFilterChange={handleRegionFilterChange}
        onViewDetail={(trek) => setSelectedTrekForDetail(trek)}
        onBookNow={(trek) => handleBookFromModal(trek)}
        onResetFilters={handleResetFilters}
      />

      {/* 6. Travel Styles (Matching Screenshot) */}
      <TravelStylesSection onSelectStyle={handleStyleSelect} />

      {/* 7. Trust & Companion Section with 4 Metrics */}
      <TrustSection />

      {/* 8. Interactive Cost Estimator / Planner */}
      <CostEstimator
        currency={currency}
        onOpenBooking={handleOpenBooking}
      />

      {/* 9. Interactive Karakoram & Pakistan Route Map */}
      <MapExplorer onSelectTrekById={handleSelectTrekById} />

      {/* 10. Trekkers Testimonials & Reviews */}
      <TestimonialsSection />

      {/* 11. Latest Blogs & Pakistan Guides */}
      <BlogSection />

      {/* 12. FAQ Section with AEO-ready structure */}
      <FAQSection />

      {/* 13. Comprehensive Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onFilterRegion={handleRegionFilterChange}
      />

      {/* Deep-Dive Package Details Modal */}
      {selectedTrekForDetail && (
        <TrekDetailModal
          trek={selectedTrekForDetail}
          currency={currency}
          onClose={() => setSelectedTrekForDetail(null)}
          onBookNow={handleBookFromModal}
        />
      )}

      {/* Custom Booking / Inquiry Modal */}
      {customPlanOpen && (
        <CustomTrekModal
          initialTrekTitle={customPlanData.trekTitle}
          initialGroupSize={customPlanData.groupSize}
          initialTotalPerPerson={customPlanData.totalPerPerson}
          initialNotes={customPlanData.notes}
          onClose={() => setCustomPlanOpen(false)}
        />
      )}
    </div>
  );
}
