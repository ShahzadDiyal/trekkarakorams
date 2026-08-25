'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mountain,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Award,
  Lock,
  CreditCard,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Top Banner - Trust Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Licensed & Insured
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Alpine Club PK
              </span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-600" />
                Secure Booking
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/923009876543?text=Hello%20Trek%20Karakoram"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 text-sm rounded-md flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 24/7</span>
              </a>
              <button
                onClick={scrollToTop}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors border border-gray-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">
            {/* Logo - now using PNG image */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="Trek Karakoram Home"
            >
              <img
                src="/images/footer-logo.png"
                alt="Trek Karakoram Logo"
                className="h-10 w-auto sm:h-22 object-contain transition-transform group-hover:scale-105"
              />
            </Link>


            <p className="text-sm text-gray-600 leading-relaxed">
              Guided expeditions to K2 Base Camp, Baltoro, Concordia, Nanga Parbat, and Snow Lake.
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong className="text-gray-800">Skardu HQ:</strong> College Road, Airport Link, Skardu 16100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{BRAND_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Treks */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Popular Treks
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/treks/k2-basecamp-gondogoro-la" className="text-gray-600 hover:text-sky-600 transition-colors">K2 Base Camp & Gondogoro La</Link></li>
              <li><Link href="/treks/k2-basecamp-classic" className="text-gray-600 hover:text-sky-600 transition-colors">K2 Base Camp Classic</Link></li>
              <li><Link href="/treks/fairy-meadows-nanga-parbat" className="text-gray-600 hover:text-sky-600 transition-colors">Fairy Meadows & Nanga Parbat</Link></li>
              <li><Link href="/treks/snow-lake-biafo-hispar" className="text-gray-600 hover:text-sky-600 transition-colors">Snow Lake & Hispar La</Link></li>
              <li><Link href="/treks/rakaposhi-diran-base-camp" className="text-gray-600 hover:text-sky-600 transition-colors">Rakaposhi & Diran Base Camp</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations" className="text-gray-600 hover:text-sky-600 transition-colors">Destinations</Link></li>
              <li><Link href="/planner" className="text-gray-600 hover:text-sky-600 transition-colors">Trip Planner</Link></li>
              <li><Link href="/safety-and-guides" className="text-gray-600 hover:text-sky-600 transition-colors">Safety & Guides</Link></li>
              <li><Link href="/permits-visa-guide" className="text-gray-600 hover:text-sky-600 transition-colors">Permits & Visa Guide</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-sky-600 transition-colors">Blog & Stories</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-gray-600 hover:text-sky-600 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-sky-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/custom-plan" className="text-gray-600 hover:text-sky-600 transition-colors">Custom Expedition</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-sky-600 transition-colors">About Us</Link></li>
            </ul>

            {/* Trust Badges */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  SSL Secure
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  Visa · Mastercard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Member Special */}
        <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <span className="text-sm font-bold text-amber-600 uppercase tracking-wider block">
                  {FOUNDING_MEMBERS_SPECIAL.title}
                </span>
                <p className="text-sm text-gray-700">
                  20% off 2026/2027 treks + lifetime 10% loyalty & free merchandise.
                </p>
              </div>
            </div>
            <Link
              href="/planner"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-md transition-colors whitespace-nowrap"
            >
              Claim Your Benefits
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Trek Karakoram. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-700 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};