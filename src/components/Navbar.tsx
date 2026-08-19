import React, { useState } from 'react';
import { Mountain, Menu, X, Compass, MapPin, Sparkles, BookOpen, HelpCircle, PhoneCall, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onFilterRegion: (region: string) => void;
  onOpenCostEstimator: () => void;
  onOpenCustomPlan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  onFilterRegion,
  onOpenCostEstimator,
  onOpenCustomPlan
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
    setDestinationDropdown(false);
  };

  const handleRegionClick = (region: string) => {
    onFilterRegion(region);
    handleNavClick('popular-packages-section');
  };

  return (
    <header id="main-navigation-header" className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-sky-500 flex items-center justify-center text-slate-950 font-black">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  KARAKORAM
                </span>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                  Expeditions
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Pakistan Trekking & High Altitude Adventures
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('hero-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Home
            </button>

            {/* Destinations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDestinationDropdown(!destinationDropdown)}
                onMouseEnter={() => setDestinationDropdown(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
              >
                <span>Destinations</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {destinationDropdown && (
                <div
                  onMouseLeave={() => setDestinationDropdown(false)}
                  className="absolute top-full left-0 w-60 bg-white border border-slate-200 py-2 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => handleRegionClick('Karakoram')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-between"
                  >
                    <span>Karakoram & Baltoro</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 font-bold">K2 / Broad Peak</span>
                  </button>
                  <button
                    onClick={() => handleRegionClick('Hunza & Nagar')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-between"
                  >
                    <span>Hunza & Nagar Valley</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5">Rakaposhi / Rush</span>
                  </button>
                  <button
                    onClick={() => handleRegionClick('Himalayas')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-between"
                  >
                    <span>Nanga Parbat & Fairy Meadows</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5">Himalayas</span>
                  </button>
                  <button
                    onClick={() => handleRegionClick('Deosai & Astore')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-between"
                  >
                    <span>Deosai Plains Plateau</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5">4,114m</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('popular-packages-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Trek Packages
            </button>

            <button
              onClick={() => handleNavClick('travel-styles-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Trek Styles
            </button>

            <button
              onClick={() => handleNavClick('interactive-map-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-1"
            >
              <Compass className="w-4 h-4 text-sky-500" />
              <span>Route Map</span>
            </button>

            <button
              onClick={() => handleNavClick('trust-safety-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Safety & Guides
            </button>

            <button
              onClick={() => handleNavClick('blog-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              Guides & Visas
            </button>

            <button
              onClick={() => handleNavClick('faq-section')}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenCostEstimator}
              id="nav-cost-calculator-btn"
              className="flex items-center gap-1.5 px-3 py-2 border border-sky-500 text-sky-600 font-bold text-xs hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Price Calculator</span>
            </button>

            <button
              onClick={onOpenCustomPlan}
              id="nav-plan-trip-cta"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Inquire / Book Trek
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCostEstimator}
              className="p-2 text-sky-600 border border-sky-200 text-xs font-bold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick('hero-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Home
          </button>
          <div className="border-t border-slate-100 pt-2">
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Destinations</div>
            <div className="grid grid-cols-2 gap-1 px-3 py-1">
              <button
                onClick={() => handleRegionClick('Karakoram')}
                className="text-left text-xs text-sky-700 py-1 font-medium hover:underline"
              >
                • K2 & Baltoro Glacier
              </button>
              <button
                onClick={() => handleRegionClick('Hunza & Nagar')}
                className="text-left text-xs text-sky-700 py-1 font-medium hover:underline"
              >
                • Hunza & Nagar Valley
              </button>
              <button
                onClick={() => handleRegionClick('Himalayas')}
                className="text-left text-xs text-sky-700 py-1 font-medium hover:underline"
              >
                • Fairy Meadows & Nanga Parbat
              </button>
              <button
                onClick={() => handleRegionClick('Deosai & Astore')}
                className="text-left text-xs text-sky-700 py-1 font-medium hover:underline"
              >
                • Deosai Plains (4,114m)
              </button>
            </div>
          </div>
          <button
            onClick={() => handleNavClick('popular-packages-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Trek Packages
          </button>
          <button
            onClick={() => handleNavClick('travel-styles-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Trek Styles
          </button>
          <button
            onClick={() => handleNavClick('interactive-map-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Karakoram Route Map
          </button>
          <button
            onClick={() => handleNavClick('trust-safety-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Safety Protocols & Guides
          </button>
          <button
            onClick={() => handleNavClick('blog-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Pakistan Trekking Guides & Visa
          </button>
          <button
            onClick={() => handleNavClick('faq-section')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenCostEstimator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 border border-sky-500 text-sky-700 font-bold text-xs text-center"
            >
              Price Calculator
            </button>
            <button
              onClick={() => {
                onOpenCustomPlan();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-sky-600 text-white font-bold text-xs text-center"
            >
              Book Custom Trek
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
