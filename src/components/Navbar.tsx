import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mountain,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Gift
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '../data/treks';

interface NavbarProps {
  onOpenCostEstimator?: () => void;
  onOpenCustomPlan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCostEstimator,
  onOpenCustomPlan
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdown, setDestinationsDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'TREKKING PACKAGES', path: '/treks' },
    { label: 'DESTINATIONS', path: '/destinations', hasDropdown: true },
    { label: 'ROUTES MAP', path: '/routes-map' },
    { label: 'COST PLANNER', path: '/planner' },
    { label: 'TRAVEL STYLES', path: '/travel-styles' },
    { label: 'SAFETY & GUIDES', path: '/safety-and-guides' },
    { label: 'VISA GUIDE', path: '/permits-visa-guide' },
    { label: 'CONTACT', path: '/contact' }
  ];

  const destinationLinks = [
    { name: 'Central Karakoram & K2 (Skardu)', path: '/destinations' },
    { name: 'Hunza & Nagar Valleys (Rakaposhi)', path: '/destinations' },
    { name: 'Western Himalayas (Nanga Parbat)', path: '/destinations' },
    { name: 'Deosai High Plains (Wilderness)', path: '/destinations' },
    { name: 'Shimshal & Pamir (6000m Peaks)', path: '/destinations' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-sky-500">
      {/* Top Notification Announcement Bar for Founding Members Special */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
              {FOUNDING_MEMBERS_SPECIAL.badge}
            </span>
            <span className="text-slate-200">
              Save 20% on any 2026/2027 trek with lifetime 10% loyalty privileges.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline font-mono">{BRAND_INFO.licenseNo}</span>
            <a
              href="tel:+923009876543"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{BRAND_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            title="Trek Karakoram Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-sky-600 flex items-center justify-center text-white font-black transition-transform group-hover:scale-105">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-950 block leading-tight">
                TREK <span className="text-sky-600">KARAKORAM</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block font-story italic">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isCurrent(item.path);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDestinationsDropdown(true)}
                    onMouseLeave={() => setDestinationsDropdown(false)}
                  >
                    <Link
                      to={item.path}
                      className={`px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                        active
                          ? 'text-sky-600 bg-sky-50'
                          : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </Link>

                    {destinationsDropdown && (
                      <div className="absolute top-full left-0 w-64 bg-white border-2 border-sky-500 py-2 z-50 animate-fadeIn">
                        {destinationLinks.map((dest) => (
                          <Link
                            key={dest.name}
                            to={dest.path}
                            className="block px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 border-b border-slate-100 last:border-0"
                            onClick={() => setDestinationsDropdown(false)}
                          >
                            {dest.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                    active
                      ? 'text-sky-600 bg-sky-50 font-black'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenCustomPlan}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CUSTOM PLAN</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenCustomPlan}
              className="p-2 bg-sky-600 text-white font-bold text-xs flex items-center gap-1"
              aria-label="Custom plan"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 border border-slate-300"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`block px-3 py-2.5 text-xs font-black uppercase tracking-wider border-b border-slate-100 ${
                isCurrent(item.path)
                  ? 'text-sky-600 bg-sky-50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomPlan();
              }}
              className="w-full py-3 bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>REQUEST CUSTOM EXPEDITION</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
