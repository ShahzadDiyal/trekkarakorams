'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';

interface NavbarProps {
  // No longer need onOpenCustomPlan
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdown, setDestinationsDropdown] = useState(false);
  const pathname = usePathname() ?? '/';

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
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 font-bold text-center">
            <span className="hidden md:block bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 text-[11px] uppercase tracking-wider whitespace-nowrap">
              {FOUNDING_MEMBERS_SPECIAL.badge}
            </span>
            <span className="text-slate-200 text-center">
              Save 20% on any 2026/2027 trek with lifetime 10% loyalty privileges.
            </span>
          </div>
        </div>
      </div>

      {/* Main Header - STICKY */}
      <header className="sticky top-0 z-40 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - now using PNG image */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="Trek Karakoram Home"
            >
              <img
                src="/images/trekkarakoram-logo.png"
                alt="Trek Karakoram Logo"
                className="h-10 w-auto sm:h-16 object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation - all menus 15px */}
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
                        className={`px-3 py-2 text-[14px] md:text-[15px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${active
                          ? 'text-sky-600 bg-sky-50'
                          : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </Link>

                      {destinationsDropdown && (
                        <div className="absolute top-full left-0 w-64 bg-white py-2 z-50 animate-fadeIn shadow-lg border border-slate-100">
                          {destinationLinks.map((dest) => (
                            <Link
                              key={dest.name}
                              href={dest.path}
                              className="block px-4 py-2.5 text-[14px] font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-600 border-b border-slate-100 last:border-0"
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
                    className={`px-3 py-2 text-[14px] md:text-[15px] font-bold uppercase tracking-wider transition-colors ${active
                      ? 'text-sky-600 bg-sky-50'
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
                className="px-4 py-2.5 rounded-sm bg-sky-600 hover:bg-sky-700 text-white font-bold text-[15px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>CUSTOM PLAN</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - 15px */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`block px-3 py-2.5 text-[14px] font-bold uppercase tracking-wider border-b border-slate-100 ${isCurrent(item.path)
                  ? 'text-sky-600 bg-sky-50'
                  : 'text-slate-800 hover:bg-slate-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/custom-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-sky-600 text-white font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>REQUEST CUSTOM EXPEDITION</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};