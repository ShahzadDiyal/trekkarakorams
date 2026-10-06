'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_INFO, BRAND_VALUES } from '@/data/treks';
import {
  Mountain,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  MapPin,
  Leaf,
  Heart,
  Recycle,
  Globe,
} from 'lucide-react';
import { SITE_NAME } from '@/lib/site';

const VALUE_ICONS: Record<string, React.ReactNode> = {
  Leaf: <Leaf className="w-5 h-5 text-emerald-600" />,
  Heart: <Heart className="w-5 h-5 text-rose-500" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-sky-600" />,
  Compass: <Compass className="w-5 h-5 text-amber-600" />,
  Recycle: <Recycle className="w-5 h-5 text-teal-600" />,
  Users: <Users className="w-5 h-5 text-indigo-600" />,
  Mountain: <Mountain className="w-5 h-5 text-sky-700" />,
  Globe: <Globe className="w-5 h-5 text-sky-600" />,
};

export const AboutPageClient: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">About Us</span>
        </div>

        {/* Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-10 mb-10 rounded-xl">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            {BRAND_INFO.originCity} · {BRAND_INFO.licenseNo}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mt-2">
            {BRAND_INFO.storyTitle}
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-3 max-w-3xl leading-relaxed">
            {BRAND_INFO.uspOneLiner}
          </p>
        </div>

        {/* Story */}
        <div className="bg-white border border-slate-200 p-6 sm:p-10 mb-10 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900">Our Story</h2>
          </div>
          <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-slate-700">
            {BRAND_INFO.story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <h2 className="text-xl font-bold text-slate-900 mb-4">Why Trekkers Choose {SITE_NAME}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {BRAND_INFO.uspDifferentiators.map((d, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0" />
                <h3 className="font-bold text-[15px] text-slate-900">{d.title}</h3>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="text-xl font-bold text-slate-900 mb-4">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {BRAND_VALUES.map((v) => (
            <div key={v.number} className="bg-white border border-slate-200 p-5 rounded-xl">
              <div className="mb-3">{VALUE_ICONS[v.iconName] || VALUE_ICONS.Globe}</div>
              <h3 className="font-bold text-[14px] text-slate-900">{v.title}</h3>
              <p className="text-[12px] font-semibold text-sky-700 mt-0.5">{v.subtitle}</p>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-sky-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl">
          <div>
            <h3 className="font-bold text-lg">Ready to walk with us?</h3>
            <p className="text-[13px] text-slate-300 mt-1">Browse 2026 guaranteed departures across the Karakoram.</p>
          </div>
          <Link
            href="/treks"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 text-[14px] transition-colors rounded-xl"
          >
            <span>Explore Treks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
