import React from 'react';
import { Mountain, Mail, Phone, MapPin, ShieldCheck, Award, Heart, MessageSquare, ArrowUp, Send } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onFilterRegion: (region: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onFilterRegion }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t-2 border-sky-500">
      {/* Top Graphic Strip (Matching screenshot #EXPLORE banner) */}
      <div className="bg-sky-900 text-sky-100 py-6 border-b border-sky-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">Ready for Adventure</span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              #EXPLORE KARAKORAM WITH CERTIFIED GUIDES
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923009876543?text=Hello%20Karakoram%20Expeditions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 24/7 Dispatch</span>
            </a>
            <button
              onClick={scrollToTop}
              className="bg-sky-950 hover:bg-sky-800 text-white p-2 border border-sky-700 transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand (Spans 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500 flex items-center justify-center text-slate-950 font-black">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  KARAKORAM EXPEDITIONS
                </span>
                <span className="block text-[11px] text-sky-400 font-semibold">
                  Department of Tourist Services License: ID-2891
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pakistan’s premier high-altitude adventure operator specializing in K2 Base Camp, Baltoro Glacier, Gondogoro La pass, Snow Lake, and Fairy Meadows. Based in Skardu with operational support in Islamabad.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span><strong>Skardu HQ:</strong> College Road, Airport Link, Skardu 16100, GB, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span><strong>Islamabad Office:</strong> Blue Area, Jinnah Avenue, Islamabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+92 300 9876543 / +92 5815 452100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>info@karakoramexpeditions.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Expeditions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Featured Treks
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  K2 Base Camp & Gondogoro La
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  K2 Base Camp Classic (Baltoro)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Fairy Meadows & Nanga Parbat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Snow Lake & Hispar La Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Rakaposhi & Diran Base Camp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('popular-packages-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  K2 Base Camp VIP Heli-Trek
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Trust & Safety
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('trust-safety-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  High-Altitude Safety Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('travel-styles-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Porter Welfare Policy (IPPG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('trust-safety-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Gamow Hyperbaric Chambers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('trust-safety-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Garmin Satellite Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Emergency Evacuation Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq-section')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Booking Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Visa Assistance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Visa Support & Updates
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get latest 2026 permit slot announcements and Gilgit-Baltistan weather advisories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-slate-900 border border-slate-700 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
              >
                <span>Get Season Updates</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Global Support Desks (Matching screenshot "OUR REPRESENTATIVES" section) */}
        <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/80 p-3 border border-slate-800">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>🇵🇰 Pakistan Headquarters</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Skardu Ops: +92 300 9876543<br />
              Airport Road, Skardu, Gilgit-Baltistan
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 border border-slate-800">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>🇺🇸 North America Desk</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              USA Liaison: +1 415 800 3921<br />
              support.na@karakoramexpeditions.com
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 border border-slate-800">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>🇪🇺 Europe & UK Desk</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              London / Munich: +44 20 7946 0912<br />
              europe@karakoramexpeditions.com
            </div>
          </div>
        </div>

        {/* Affiliations & Payment badges */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-300">Affiliations:</span>
            <span className="bg-slate-900 px-2 py-1 border border-slate-800 text-[11px]">Alpine Club of Pakistan</span>
            <span className="bg-slate-900 px-2 py-1 border border-slate-800 text-[11px]">ATOAP Licensed</span>
            <span className="bg-slate-900 px-2 py-1 border border-slate-800 text-[11px]">Govt. DTS ID-2891</span>
            <span className="bg-slate-900 px-2 py-1 border border-slate-800 text-[11px]">Leave No Trace</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span>Accepted Payments:</span>
            <span className="bg-slate-900 px-2 py-0.5 border border-slate-800 font-mono text-white">VISA</span>
            <span className="bg-slate-900 px-2 py-0.5 border border-slate-800 font-mono text-white">MasterCard</span>
            <span className="bg-slate-900 px-2 py-0.5 border border-slate-800 font-mono text-white">Wire Transfer</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Karakoram Expeditions Pakistan. All rights reserved. Registered with Department of Tourist Services, Government of Pakistan.
        </div>
      </div>
    </footer>
  );
};
