import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mountain,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Heart,
  MessageSquare,
  ArrowUp,
  FileText,
  Sparkles,
  ExternalLink,
  Compass
} from 'lucide-react';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '../data/treks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t-2 border-sky-500">
      {/* Top Banner Strip */}
      <div className="bg-slate-900 text-slate-100 py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              {BRAND_INFO.tagline}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              FROM AIRPORT TO THE HIGHEST PEAKS — WORRY-FREE EXPEDITIONS
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923009876543?text=Hello%20Trek%20Karakoram"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 24/7 Dispatch</span>
            </a>
            <button
              onClick={scrollToTop}
              className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 border border-slate-700 transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand (Spans 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600 flex items-center justify-center text-white font-black">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  TREK KARAKORAM
                </span>
                <span className="block text-[11px] text-sky-400 font-semibold">
                  {BRAND_INFO.licenseNo}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-story">
              Born from the heart of the Karakoram. A soulful, human-centered adventure travel brand providing complete end-to-end guided expeditions across K2 Base Camp, Baltoro, Concordia, Nanga Parbat, and Snow Lake.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span><strong>Skardu Basecamp HQ:</strong> College Road, Airport Link, Skardu 16100, GB, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span><strong>Islamabad Office:</strong> Blue Area, Jinnah Avenue, Islamabad</span>
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
          </div>

          {/* Column 2: Popular Expeditions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Signature Treks
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/treks/k2-basecamp-gondogoro-la" className="hover:text-sky-400 transition-colors">
                  K2 Base Camp & Gondogoro La
                </Link>
              </li>
              <li>
                <Link to="/treks/k2-basecamp-classic" className="hover:text-sky-400 transition-colors">
                  K2 Base Camp Classic (Baltoro)
                </Link>
              </li>
              <li>
                <Link to="/treks/fairy-meadows-nanga-parbat" className="hover:text-sky-400 transition-colors">
                  Fairy Meadows & Nanga Parbat
                </Link>
              </li>
              <li>
                <Link to="/treks/snow-lake-biafo-hispar" className="hover:text-sky-400 transition-colors">
                  Snow Lake & Hispar La Traverse
                </Link>
              </li>
              <li>
                <Link to="/treks/rakaposhi-diran-base-camp" className="hover:text-sky-400 transition-colors">
                  Rakaposhi & Diran Base Camp
                </Link>
              </li>
              <li>
                <Link to="/treks/k2-basecamp-heli-trek" className="hover:text-sky-400 transition-colors">
                  K2 Base Camp Heli-Trek (VIP)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Styles & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Expedition Guides
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/destinations" className="hover:text-sky-400 transition-colors">
                  Mountain Destinations
                </Link>
              </li>
              <li>
                <Link to="/routes-map" className="hover:text-sky-400 transition-colors">
                  Interactive Route Map
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-sky-400 transition-colors">
                  Custom Cost Estimator
                </Link>
              </li>
              <li>
                <Link to="/travel-styles" className="hover:text-sky-400 transition-colors">
                  Expedition Travel Styles
                </Link>
              </li>
              <li>
                <Link to="/safety-and-guides" className="hover:text-sky-400 transition-colors">
                  High Altitude Safety & SOS
                </Link>
              </li>
              <li>
                <Link to="/permits-visa-guide" className="hover:text-sky-400 transition-colors">
                  Pakistan E-Visa & Permits
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-sky-400 transition-colors">
                  Knowledge Base & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Indexing */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
              Trust & Indexing
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/faq" className="hover:text-sky-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">
                  Operations & Inquiries
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  <span>sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  <span>robots.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]">
                  <span>llms.txt (AI Index)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Founding Member Callout Box */}
        <div className="mt-10 p-6 bg-slate-900 border border-sky-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {FOUNDING_MEMBERS_SPECIAL.title}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              Receive 20% direct discount on any 2026/2027 trek, lifetime 10% loyalty privileges, and free Trek Karakoram merchandise.
            </p>
          </div>
          <Link
            to="/planner"
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Claim Founding Member Privileges
          </Link>
        </div>

        {/* Legal & Affiliations */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-slate-200 font-semibold">Affiliations:</span>
            <span>Alpine Club of Pakistan</span>
            <span>•</span>
            <span>Pakistan Tourism Development Corporation (PTDC)</span>
            <span>•</span>
            <span>Askari Aviation Rescue</span>
            <span>•</span>
            <span>IPPG Porter Welfare</span>
          </div>

          <div className="text-center sm:text-right">
            <span>© {new Date().getFullYear()} Trek Karakoram. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
