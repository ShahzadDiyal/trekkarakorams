
'use client';

import React from 'react';
import {
  Award,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Users,
  Mountain,
} from 'lucide-react';
import Link from 'next/link';

import { useSiteSettings } from '@/lib/site-settings';

interface HeroProps {
  onTagClick: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onTagClick }) => {
  const { hero } = useSiteSettings();
  const quickTags = [
    'K2 Base Camp Trek',
    'Gondogoro La Pass',
    'Fairy Meadows & Nanga Parbat',
    'Snow Lake',
    'Rakaposhi Base Camp',
    'Minglik Sar 6,050m',
  ];

  const trustItems = [
    {
      icon: MapPin,
      title: 'Skardu Based',
      subtitle: 'Local team in Gilgit-Baltistan',
    },
    {
      icon: ShieldCheck,
      title: 'Safety Focused',
      subtitle: 'Experienced mountain guides',
    },
    {
      icon: Users,
      title: 'Small Groups',
      subtitle: 'Personal trekking experience',
    },
  ];

  return (
    <section
      id="hero-section"
      className="relative min-h-[720px] lg:min-h-[780px] overflow-hidden bg-slate-950 flex items-center"
    >
      {/* Background — image or video, from Website Settings → Hero Section */}
      <div className="absolute inset-0">
        {hero.mediaType === 'video' && hero.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={hero.posterUrl || undefined}
            className="h-full w-full object-cover object-center"
          >
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
        ) : hero.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.imageUrl}
            alt="Karakoram mountains"
            className="h-full w-full object-cover object-center"
          />
        ) : null}

        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-6">
        <div className="max-w-4xl">

          {/* Trust Badge */}
          <div className="mb-6 animate-hero-rise animate-hero-rise-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur-md">
              <Award className="h-4 w-4 text-sky-400" />
              {hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight leading-[1.05] text-white animate-hero-rise animate-hero-rise-2">
            {hero.headline}
            <span className="block text-sky-400">
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-200 animate-hero-rise animate-hero-rise-3">
            {hero.subheadline}
          </p>


          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-hero-rise animate-hero-rise-3">
            <Link
              href={hero.ctaPrimaryHref}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-sky-950/30 transition-all duration-200 hover:bg-sky-500 hover:-translate-y-0.5"
            >
              {hero.ctaPrimaryLabel}
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href={hero.ctaSecondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:border-white/40"
            >
              {hero.ctaSecondaryLabel}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-3">
            {trustItems.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/35 px-4 py-3 backdrop-blur-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10">
                  <Icon className="h-5 w-5 text-sky-400" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {title}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trek Links */}
          <div className="mt-8 hidden md:block">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <Mountain className="h-4 w-4 text-sky-400" />
              Popular Adventures
            </div>

            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-sky-400/40 hover:bg-sky-500/15 hover:text-sky-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </section>
  );
};
