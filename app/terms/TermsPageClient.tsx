'use client';

import React from 'react';
import Link from 'next/link';
import { BOOKING_TERMS } from '@/data/treks';
import {
  FileText,
  Wallet,
  CalendarX2,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
} from 'lucide-react';
import { whatsappLink, SITE_NAME } from '@/lib/site';
import { useSiteSettings } from '@/lib/site-settings';

const SECTIONS = [
  { ...BOOKING_TERMS.deposit, icon: Wallet },
  { ...BOOKING_TERMS.cancellation, icon: CalendarX2 },
  { ...BOOKING_TERMS.operator, icon: ShieldCheck },
];

export const TermsPageClient: React.FC = () => {
  const siteContact = useSiteSettings();
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Booking Terms & Conditions</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8 mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            Transparent Booking Policy
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Deposits, Cancellation & Refunds
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
            No hidden clauses. Every {SITE_NAME} booking follows the same clear
            deposit and cancellation schedule below — agreed in writing before
            you pay anything.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title} className="bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 mb-4">
                <span className="flex h-9 w-9 items-center justify-center bg-sky-100">
                  <section.icon className="h-4.5 w-4.5 text-sky-700" />
                </span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Insurance reminder */}
        <div className="mt-6 bg-amber-50 border border-amber-200 p-6">
          <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2 text-[15px]">
            <FileText className="h-4 w-4" />
            Travel Insurance Is Required
          </h3>
          <p className="text-[13px] text-amber-800 leading-relaxed">
            All trekkers must hold travel insurance covering high-altitude trekking
            (up to 6,000m), trip cancellation, and emergency helicopter evacuation.
            We can recommend expedition-specialist insurers if you need one.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-sky-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Questions about these terms?</h3>
            <p className="text-[13px] text-slate-300 mt-1">
              Talk to our team directly — {siteContact.phone}
            </p>
          </div>
          <a
            href={whatsappLink('Hi Trek Karakoram, I have a question about your booking terms and cancellation policy')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 text-[14px] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[13px] text-slate-500">
          <PhoneCall className="w-4 h-4" />
          <span>
            Prefer email? Write to <strong className="text-slate-700">info@trekkarakoram.com</strong> — we reply within 24 hours.
          </span>
        </div>
      </div>
    </div>
  );
};
