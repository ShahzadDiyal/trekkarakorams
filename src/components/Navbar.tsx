import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mountain,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Compass,
  FileText
} from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand with Mountain Icon */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
            title="Karakoram Expeditions Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-sky-500 flex items-center justify-center text-slate-950 font-black transition-transform group-hover:scale-105">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 block leading-tight">
                KARAKORAM <span className="text-sky-600">EXPEDITIONS</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                Pakistan Trekking & High Altitude Tours
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
                      className={`px-3 py-2 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                        active
                          ? 'text-sky-600 bg-sky-50'
                          : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Link>

                    {/* Dropdown Menu */}
                    {destinationsDropdown && (
                      <div className="absolute top-full left-0 w-64 bg-white border-2 border-sky-500 py-2 z-50 animate-fadeIn">
                        {destinationLinks.map((dest) => (
                          <Link
                            key={dest.name}
                            to={dest.path}
                            onClick={() => setDestinationsDropdown(false)}
                            className="block px-4 py-2 text-xs font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-600 transition-colors"
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
                  className={`px-3 py-2 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                    active
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenCustomPlan}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Custom Trek Plan
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenCustomPlan}
              className="bg-sky-500 text-slate-950 font-extrabold px-2.5 py-1.5 text-[11px] uppercase tracking-wider sm:hidden"
            >
              Plan Trek
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-300 hover:border-sky-500 text-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-sky-500 px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 ${
                  active ? 'text-sky-600 bg-sky-50' : 'text-slate-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomPlan();
              }}
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3 text-xs uppercase tracking-wider text-center"
            >
              Calculate Custom Trek Plan
            </button>
            <a
              href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <span>WhatsApp Emergency Dispatch (+92 300 9876543)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
