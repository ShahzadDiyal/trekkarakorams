'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';
import { useSiteSettings } from '@/lib/site-settings';
import { headerIcon } from '@/lib/header-icons';
import type { HeaderButton } from '@/lib/admin/types';

interface NavbarProps {
  // No longer need onOpenCustomPlan
}

function buttonStyle(b: HeaderButton): React.CSSProperties {
  return {
    backgroundColor: b.bgColor || 'transparent',
    color: b.textColor || '#ffffff',
    borderColor: b.borderColor || 'transparent',
    borderWidth: b.borderWidth || 0,
    borderStyle: 'solid',
    borderRadius: b.borderRadius ?? 2,
    fontSize: b.fontSize || 15,
    fontWeight: b.fontWeight || '700',
  };
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { logoUrl, siteName, headerMenus, headerButtons } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname() ?? '/';

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Notification Bar - NOT sticky */}
      <div className="bg-slate-950 text-white text-[11px] py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/founding-members"
            className="group flex items-center justify-center gap-2 sm:gap-3 font-bold text-center hover:text-white transition-colors"
          >
            <span className="hidden md:block shrink-0 bg-amber-500 text-slate-950 font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">
              {FOUNDING_MEMBERS_SPECIAL.badge}
            </span>

            <span className="text-slate-200 leading-5">
              <span className="text-amber-400">Founding Members Special.</span>{' '}
              The first 10 guests get <span className="text-white">20% off</span>{' '}
              their trek and a lifetime <span className="text-white">10% discount</span>{' '}
              on all future bookings.
              <span className="hidden sm:inline text-slate-400"> Only a few spots left.</span>
            </span>

            <span className="hidden lg:inline shrink-0 text-sky-400 group-hover:text-sky-300 transition-colors">
              →
            </span>
          </Link>
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
                src={logoUrl}
                alt={`${siteName} Logo`}
                className="h-10 w-auto sm:h-16 object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation - all menus 15px */}
            <nav className="hidden md:flex items-center gap-1">
              {headerMenus.map((item) => {
                const active = isCurrent(item.href);
                const hasDropdown = (item.children?.length ?? 0) > 0;
                const linkCls = `px-3 py-2 text-[14px] md:text-[15px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                  active
                    ? 'text-sky-600 bg-sky-50'
                    : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                }`;

                if (hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link href={item.href} className={linkCls}>
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </Link>

                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 w-64 bg-white py-2 z-50 animate-fadeIn shadow-lg border border-slate-100">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-[14px] font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-600 border-b border-slate-100 last:border-0"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link key={item.label} href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons — configured in admin Website Settings → Header */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {headerButtons.map((b) => {
                const Icon = headerIcon(b.icon);
                return (
                  <Link
                    key={b.label}
                    href={b.href}
                    className="px-4 py-2.5 uppercase tracking-wider transition-all flex items-center gap-1.5 hover:brightness-110"
                    style={buttonStyle(b)}
                  >
                    {Icon && <Icon className="w-4 h-4" strokeWidth={2.5} />}
                    <span>{b.label}</span>
                  </Link>
                );
              })}
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
            {headerMenus.map((item) => {
              const hasDropdown = (item.children?.length ?? 0) > 0;
              const expanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="border-b border-slate-100">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex-1 block px-3 py-2.5 text-[14px] font-bold uppercase tracking-wider ${
                        isCurrent(item.href)
                          ? 'text-sky-600 bg-sky-50'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasDropdown && (
                      <button
                        type="button"
                        aria-label={expanded ? 'Collapse sub-menu' : 'Expand sub-menu'}
                        onClick={() => setMobileExpanded(expanded ? null : item.label)}
                        className="p-2.5 text-slate-500"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {hasDropdown && expanded && (
                    <div className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-sky-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {headerButtons.length > 0 && (
              <div className="pt-4 space-y-2">
                {headerButtons.map((b) => {
                  const Icon = headerIcon(b.icon);
                  return (
                    <Link
                      key={b.label}
                      href={b.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 uppercase tracking-wider flex items-center justify-center gap-2"
                      style={buttonStyle(b)}
                    >
                      {Icon && <Icon className="w-5 h-5" strokeWidth={2.5} />}
                      <span>{b.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
