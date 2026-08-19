import React from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '../data/treks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Top Banner – simplified */}
      <div className="bg-slate-900 text-slate-100 py-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              {BRAND_INFO.tagline}
            </span>
            <p className="text-sm font-semibold text-white">Worry‑free expeditions from airport to the highest peaks</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923009876543?text=Hello%20Trek%20Karakoram"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 24/7</span>
            </a>
            <button
              onClick={scrollToTop}
              className="bg-slate-800 hover:bg-slate-700 text-white p-2 border border-slate-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer – 3 columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600 flex items-center justify-center text-white font-bold">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block">
                  TREK KARAKORAM
                </span>
                <span className="text-[11px] text-sky-400 font-semibold">
                  {BRAND_INFO.licenseNo}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Born from the heart of the Karakoram – providing complete end‑to‑end guided expeditions to K2 Base Camp, Baltoro, Concordia, Nanga Parbat, and Snow Lake.
            </p>

            <div className="pt-1 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Skardu HQ:</strong> College Road, Airport Link, Skardu 16100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{BRAND_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 border border-emerald-800/60 rounded">
                <ShieldCheck className="w-3 h-3" />
                Licensed & Insured
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/50 px-2 py-1 border border-amber-800/60 rounded">
                <Award className="w-3 h-3" />
                Alpine Club Pakistan
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 bg-sky-950/50 px-2 py-1 /60 rounded">
                <Lock className="w-3 h-3" />
                Secure Booking
              </span>
            </div>
          </div>

          {/* Column 2: Popular Treks & Expedition Guides (includes removed navbar items) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Popular Treks
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 mb-4">
              <li><Link to="/treks/k2-basecamp-gondogoro-la" className="hover:text-sky-400 transition-colors">K2 Base Camp & Gondogoro La</Link></li>
              <li><Link to="/treks/k2-basecamp-classic" className="hover:text-sky-400 transition-colors">K2 Base Camp Classic (Baltoro)</Link></li>
              <li><Link to="/treks/fairy-meadows-nanga-parbat" className="hover:text-sky-400 transition-colors">Fairy Meadows & Nanga Parbat</Link></li>
              <li><Link to="/treks/snow-lake-biafo-hispar" className="hover:text-sky-400 transition-colors">Snow Lake & Hispar La</Link></li>
              <li><Link to="/treks/rakaposhi-diran-base-camp" className="hover:text-sky-400 transition-colors">Rakaposhi & Diran Base Camp</Link></li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 pb-1 border-b border-slate-800">
              Expedition Guides
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/destinations" className="hover:text-sky-400 transition-colors">Mountain Destinations</Link></li>
              {/* Removed navbar items are here */}
              <li><Link to="/routes-map" className="hover:text-sky-400 transition-colors">Interactive Route Map</Link></li>
              <li><Link to="/planner" className="hover:text-sky-400 transition-colors">Custom Cost Estimator</Link></li>
              <li><Link to="/travel-styles" className="hover:text-sky-400 transition-colors">Expedition Travel Styles</Link></li>
              <li><Link to="/safety-and-guides" className="hover:text-sky-400 transition-colors">High Altitude Safety & SOS</Link></li>
              <li><Link to="/permits-visa-guide" className="hover:text-sky-400 transition-colors">Pakistan E‑Visa & Permits</Link></li>
              <li><Link to="/blog" className="hover:text-sky-400 transition-colors">Knowledge Base & Stories</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/faq" className="hover:text-sky-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact Operations</Link></li>
              <li className="pt-2 border-t border-slate-800/60">
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  sitemap.xml
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  robots.txt
                </a>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  llms.txt
                </a>
              </li>
            </ul>

            {/* Affiliations (optional, kept clean) */}
            <div className="mt-4 pt-4 border-t border-slate-800/60">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Affiliations</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
                <span>Alpine Club of Pakistan</span>
                <span>•</span>
                <span>PTDC</span>
                <span>•</span>
                <span>Askari Aviation Rescue</span>
                <span>•</span>
                <span>IPPG Porter Welfare</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Member Callout – simplified */}
        <div className="mt-10 p-4 bg-slate-900 /30 flex flex-col sm:flex-row items-center justify-between gap-3 rounded">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {FOUNDING_MEMBERS_SPECIAL.title}
              </span>
              <p className="text-xs text-slate-300">
                20% off 2026/2027 treks + lifetime 10% loyalty & free merchandise.
              </p>
            </div>
          </div>
          <Link
            to="/planner"
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Claim Privileges
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Trek Karakoram. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              SSL Secure
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">We accept</span>
            <CreditCard className="w-4 h-4" />
            <span className="text-[10px] font-mono">Visa · Mastercard · Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
};