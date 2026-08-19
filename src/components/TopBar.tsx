import React from 'react';
import { Mail, Phone, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { Currency } from '../types';

interface TopBarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCustomPlan: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenCustomPlan
}) => {
  return (
    <div id="top-contact-bar" className="bg-sky-950 text-sky-100 text-xs border-b border-sky-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact Info & Gov License */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          <a
            href="mailto:info@karakoramexpeditions.com"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>info@karakoramexpeditions.com</span>
          </a>
          <a
            href="tel:+923009876543"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>+92 300 9876543 (Skardu HQ)</span>
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Govt. License: DTS ID-2891</span>
          </div>
        </div>

        {/* Right: Experience Badge, Currency & Custom Trek CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>15+ Years in Karakoram</span>
          </div>

          <div className="h-3.5 w-px bg-sky-800 hidden sm:block" />

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/923009876543?text=Hello%2C%20I%20am%20interested%20in%20trekking%20in%20Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-400 transition-colors font-medium text-emerald-300"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp 24/7</span>
          </a>

          <div className="h-3.5 w-px bg-sky-800" />

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-sky-900/80 px-2 py-0.5  rounded">
            <span className="text-sky-300 text-[11px]">Curr:</span>
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
              aria-label="Select Currency"
            >
              <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
              <option value="PKR" className="bg-slate-900 text-white">PKR (₨)</option>
            </select>
          </div>

          {/* Custom Plan Button */}
          <button
            onClick={onOpenCustomPlan}
            id="top-plan-trip-btn"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1 text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Plan A Custom Trek
          </button>
        </div>
      </div>
    </div>
  );
};
