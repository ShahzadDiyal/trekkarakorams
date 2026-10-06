 
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowUp,
  ShieldCheck,
  Award,
  Lock,
  CreditCard,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { useSiteSettings, useWhatsappLink } from '@/lib/site-settings';
import { BRAND_INFO, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';
import { saveNewsletterSubscriber } from '@/lib/lead-capture';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const settings = useSiteSettings();
  const whatsappUrl = useWhatsappLink('Hello Trek Karakoram');
  const socials = [
    { label: 'Facebook', href: settings.facebookUrl, Icon: Facebook },
    { label: 'Instagram', href: settings.instagramUrl, Icon: Instagram },
    { label: 'YouTube', href: settings.youtubeUrl, Icon: Youtube },
  ].filter((s) => s.href);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    const address = email.trim();
    setEmail('');
    setSubscribeState('saving');
    try {
      // Recorded in the `customers` collection (tag: newsletter) — visible
      // in the admin panel. Requires the updated Firestore rules.
      await saveNewsletterSubscriber(address);
      setSubscribeState('done');
    } catch (err) {
      console.error('Newsletter signup failed:', err);
      setSubscribeState('error');
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4">

      {/* Top Banner - Trust Bar */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Licensed & Insured
              </span>

              <span className="hidden text-gray-300 sm:inline">|</span>

              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-600" />
                Alpine Club PK
              </span>

              <span className="hidden text-gray-300 sm:inline">|</span>

              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-sky-600" />
                Secure Booking
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp 24/7</span>
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                className="rounded-md border border-gray-200 bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl py-12">

        {/* Footer Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">

            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none"
              title="Trek Karakoram Home"
            >
              <img
                src={settings.logoUrl}
                alt={`${settings.siteName} Logo`}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105 sm:h-22"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-600">
              {settings.footerAbout}
            </p>

            <div className="space-y-2 text-sm text-gray-600">

              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <span>
                  <strong className="text-gray-800">Skardu HQ:</strong>{' '}
                  {settings.address}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-sky-600" />
                <span>{settings.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-sky-600" />
                <span>{settings.email}</span>
              </div>

            </div>

            {/* Social Links — configured in admin Website Settings */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-400 transition-colors hover:text-sky-600"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}

          </div>

          {/* Dynamic link columns — configured in admin Website Settings → Footer */}
          {settings.footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors hover:text-sky-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Trust Badges */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                SSL Secure
              </span>

              <span>|</span>

              <span className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                Visa · Mastercard
              </span>
            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-12 py-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">

            {/* Newsletter Copy */}
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-600" />

                <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
                  From the trail
                </span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Stories from the mountains.
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Occasional updates from the trail. New routes, seasonal
                guides, and honest writing from Baltistan. No spam.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-xl lg:max-w-md"
            >
              <div className="flex flex-col gap-2 sm:flex-row">

                <label htmlFor="newsletter-email" className="sr-only">
                  Your email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="min-w-0 flex-1 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

              </div>

              {subscribeState === 'done' && (
                <p className="mt-2 text-sm font-medium text-emerald-600">
                  You&apos;re subscribed — welcome aboard!
                </p>
              )}
              {subscribeState === 'error' && (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  Something went wrong — please try again.
                </p>
              )}
            </form>

          </div>
        </div>

        {/* Founding Member Special */}
        <div className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-start gap-3 sm:items-center">
              <Crown className="mt-0.5 h-5 w-5 shrink-0 text-amber-500 sm:mt-0" strokeWidth={2.5} />

              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-amber-600">
                  {FOUNDING_MEMBERS_SPECIAL.title}
                </span>

                <p className="text-sm text-gray-700">
                  20% off 2026/2027 treks + lifetime 10% loyalty & free
                  merchandise.
                </p>
              </div>
            </div>

            <Link
              href="/planner"
              className="whitespace-nowrap rounded-md bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Claim Your Benefits
            </Link>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 sm:flex-row">

          <span>
            © {new Date().getFullYear()} Trek Karakoram. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-gray-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-gray-700"
            >
              Terms of Service
            </Link>

            <Link
              href="/sitemap.xml"
              className="transition-colors hover:text-gray-700"
            >
              Sitemap
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};
 