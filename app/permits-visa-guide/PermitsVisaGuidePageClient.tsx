'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Download,
  PhoneCall,
  Clock
} from 'lucide-react';

export const PermitsVisaGuidePageClient: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Pakistan Trekking Visa & Permits Guide (2026)</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            Official Regulatory Clearance
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Pakistan Trekking Visa & Permits Guide
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Everything you need to know about the Pakistan Online E-Visa system, Letter of Invitation (LOI), restricted area trekking permits for K2 Base Camp, and Gilgit-Baltistan government clearances.
          </p>
        </div>

        {/* 3 Step Visa Process Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6">
            <span className="bg-sky-600 text-white font-bold text-[13px] px-2.5 py-0.5">STEP 1</span>
            <h3 className="text-[16px] font-bold text-slate-900 mt-2">Book & Receive LOI</h3>
            <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
              Upon placing a 20% deposit on your chosen trek, Karakoram Expeditions issues your official <strong>Letter of Invitation (LOI)</strong>, stamped itinerary, and operator license copy within 24 hours.
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="bg-sky-600 text-white font-bold text-[13px] px-2.5 py-0.5">STEP 2</span>
            <h3 className="text-[16px] font-bold text-slate-900 mt-2">Apply on NADRA Portal</h3>
            <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
              Submit your application online at the official Pakistan Visa Portal (<a href="https://visa.nadra.gov.pk" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:underline">visa.nadra.gov.pk</a>) under <em>"Trekking & Mountaineering"</em> category.
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="bg-sky-600 text-white font-bold text-[13px] px-2.5 py-0.5">STEP 3</span>
            <h3 className="text-[16px] font-bold text-slate-900 mt-2">Government Permits Issued</h3>
            <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
              Our team in Skardu processes your group permits with the Gilgit-Baltistan Home Department and Central Karakoram National Park (CKNP) authority prior to your arrival.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Detailed Information (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Required Documents */}
            <div className="bg-white  p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Required Documents for Pakistan Trekking E-Visa</span>
              </h2>

              <ul className="space-y-3 text-[13px] text-slate-700">
                <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Valid Passport Copy:</strong> Scanned color copy with minimum 6 months validity from the date of arrival and at least 2 blank pages.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Digital Passport-Sized Photograph:</strong> High-resolution front face portrait with plain white background (under 5MB, JPG/PNG).
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Official Letter of Invitation (LOI):</strong> Provided directly by Karakoram Expeditions with government DTS License # ID-2891 stamp.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Emergency Mountain Medical Insurance:</strong> Policy document confirming coverage for high-altitude trekking up to 6,000m and helicopter rescue.
                  </div>
                </li>
              </ul>
            </div>

            {/* Restricted vs Open Zone Regulations */}
            <div className="bg-white  p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Open Trekking Zones vs. Restricted Military Zones
              </h2>
              <div className="space-y-4 text-[13px] text-slate-700 leading-relaxed">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-1">Open Zones (No Military Permit Fee Required)</h4>
                  <p>
                    Trekking routes like <strong>Fairy Meadows & Nanga Parbat Base Camp</strong>, <strong>Rakaposhi & Diran Base Camp</strong>, <strong>Rush Lake</strong>, and <strong>Hunza Valleys</strong> are classified as open zones. Foreign tourists only require standard Pakistan Tourist E-Visas.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-1">Restricted Zones (Govt. Group Permit & Briefing Mandatory)</h4>
                  <p>
                    Treks inside Central Karakoram National Park near international borders (e.g. <strong>K2 Base Camp, Baltoro Glacier, Gondogoro La, Snow Lake/Hispar La</strong>) are classified as Restricted Zones. Under Ministry of Tourism regulations, independent solo trekking without a licensed local agency is strictly illegal. Karakoram Expeditions arranges all required royalty clearances, liaison officer assignments, and environmental waste management bonds on your behalf.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Links & Help (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 text-[13px] space-y-4">
              <h3 className="font-bold text-[16px] text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                Official E-Visa Links
              </h3>
              <a
                href="https://visa.nadra.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 flex items-center justify-between transition-colors"
              >
                <span>NADRA Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="p-3 bg-sky-50  text-slate-800 space-y-1">
                <div className="font-bold">Estimated Visa Processing Time:</div>
                <div className="flex items-center gap-1.5 text-sky-800 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>5 to 10 business days</span>
                </div>
                <p className="text-[11px] text-slate-600 pt-1">
                  We recommend applying 4 to 8 weeks before your planned expedition departure date.
                </p>
              </div>
            </div>

            <div className="bg-sky-950 text-white p-6  text-[13px] space-y-3">
              <h3 className="font-bold text-sky-400 text-[16px]">Need Visa Assistance?</h3>
              <p className="text-slate-300 leading-relaxed">
                Our visa specialists in Islamabad guide all booked trekkers step-by-step through the NADRA online forms to ensure 100% approval rates.
              </p>
              <a
                href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20need%20help%20with%20my%20Pakistan%20Trekking%20Visa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Visa Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
