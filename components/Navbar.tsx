'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';

interface NavbarProps {
  // No longer need onOpenCustomPlan
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdown, setDestinationsDropdown] = useState(false);
  const pathname = usePathname();

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'TREKKING PACKAGES', path: '/treks' },
    { label: 'DESTINATIONS', path: '/destinations', hasDropdown: true },
    { label: 'CONTACT', path: '/contact' },
  ];

  const destinationLinks = [
    { name: 'Central Karakoram & K2 (Skardu)', path: '/destinations' },
    { name: 'Hunza & Nagar Valleys (Rakaposhi)', path: '/destinations' },
    { name: 'Western Himalayas (Nanga Parbat)', path: '/destinations' },
    { name: 'Deosai High Plains (Wilderness)', path: '/destinations' },
    { name: 'Shimshal & Pamir (6000m Peaks)', path: '/destinations' },
  ];

  return (
    <>
      {/* Top Notification Bar - NOT sticky */}
      <div className="bg-slate-950 text-white border-b border-slate-800 relative z-30">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 md:py-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 font-medium flex-wrap justify-center">
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 sm:px-2 py-0.5 text-[12px] sm:text-[10px] md:text-[11px] lg:text-[14px] uppercase tracking-wider whitespace-nowrap">
                {FOUNDING_MEMBERS_SPECIAL.badge}
              </span>
              <span className="text-[12px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] text-slate-200 text-center sm:text-left leading-tight">
                Save 20% on any 2026/2027 trek with lifetime 10% loyalty privileges.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Sticky */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Mobile Responsive */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none"
              title="Trek Karakoram Home"
            >
              <img
                src="/trekkarakoram-logo.png"
                alt="Trek Karakoram Logo"
                className="w-[120px] md:w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
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
                        href={item.path}
                        className={`px-3 py-2 text-[14px] font-medium uppercase tracking-wider flex items-center gap-1 transition-colors ${active
                            ? 'text-sky-600 bg-sky-50'
                            : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </Link>

                      {destinationsDropdown && (
                        <div className="absolute top-full left-0 w-64 bg-white shadow-lg py-2 z-50 animate-fadeIn border border-slate-100">
                          {destinationLinks.map((dest) => (
                            <Link
                              key={dest.name}
                              href={dest.path}
                              className="block px-4 py-2.5 text-[14px] font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 border-b border-slate-100 last:border-0 transition-colors"
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
                    href={item.path}
                    className={`px-3 py-2 text-[14px] font-medium uppercase tracking-wider transition-colors ${active
                        ? 'text-sky-600 bg-sky-50 font-bold'
                        : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              <Link
                href="/custom-plan"
                className="group relative px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-[14px] uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
              >
                {/* Animated background shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-90 transition-transform duration-300" />
                <span>CUSTOM PLAN</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`block px-3 py-2.5 text-[14px] font-medium uppercase tracking-wider border-b border-slate-100 transition-colors ${isCurrent(item.path)
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-800 hover:bg-slate-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Destination Sub-menu */}
            <div className="pl-4 space-y-1 border-b border-slate-100 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Popular Destinations
              </p>
              {destinationLinks.map((dest) => (
                <Link
                  key={dest.name}
                  href={dest.path}
                  className="block px-3 py-2 text-[14px] font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dest.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <Link
                href="/custom-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>REQUEST CUSTOM EXPEDITION</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};