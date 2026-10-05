'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
  Mountain,
  ArrowRight,
  Clock,
  Award,
  Globe,
} from 'lucide-react';
import { whatsappLink, SITE_NAME, PHONE_DISPLAY, EMAIL_PRIMARY } from '@/lib/site';

export const ContactPageClient: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [subject, setSubject] = useState('2026 Trek Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = whatsappLink(
    `Hello ${SITE_NAME}! My name is ${name || 'Treker'}. Subject: ${subject}. I am from ${country || 'International'}. Message: ${message || 'Inquiring about 2026 departures.'}`
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-slate-500 sm:text-[14px]">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-sky-600"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <span className="font-semibold text-slate-900">
            Contact {SITE_NAME}
          </span>
        </div>

        {/* Hero / Page Banner */}
        <section className="relative mb-8 overflow-hidden bg-sky-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
          {/* Decorative mountain glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950">
                <Mountain className="h-3 w-3" />
                Operations & Inquiries
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Direct Expedition Support
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              Get in Touch With Our Team
            </h1>

            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-slate-300 sm:text-[15px]">
              Contact our Skardu headquarters or Islamabad coordination office
              for custom expedition planning, permit questions, trekking
              advice, and mountain support.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sky-400" />
                Response within 12 hours
              </span>

              <span className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-sky-400" />
                Local expedition team
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-slate-200 bg-white shadow-sm">

              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-5 sm:p-8"
                >
                  {/* Form Heading */}
                  <div className="border-b border-slate-200 pb-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center bg-sky-50 text-sky-600">
                        <MessageSquare className="h-4 w-4" />
                      </div>

                      <div>
                        <h2 className="text-[15px] font-bold uppercase tracking-wide text-slate-900">
                          Send Us a Direct Message
                        </h2>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          Tell us about your expedition plans.
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                      We review every inquiry personally and normally respond
                      within 12 hours with route information, availability, and
                      next steps.
                    </p>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* Name */}
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Your Name *
                        </label>

                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          required
                          placeholder="e.g. john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          WhatsApp / Phone
                        </label>

                        <input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Country of Residence *
                        </label>

                        <input
                          type="text"
                          required
                          placeholder="e.g. United Kingdom, USA"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Inquiry Subject
                      </label>

                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full cursor-pointer border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] font-semibold text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white"
                      >
                        <option value="K2 Base Camp & Gondogoro La 2026">
                          K2 Base Camp & Gondogoro La (2026)
                        </option>
                        <option value="Classic Baltoro Glacier Trek">
                          Classic Baltoro Glacier Trek
                        </option>
                        <option value="Fairy Meadows & Nanga Parbat">
                          Fairy Meadows & Nanga Parbat
                        </option>
                        <option value="Snow Lake & Hispar La Pass">
                          Snow Lake & Hispar La Pass
                        </option>
                        <option value="VIP Helicopter Trek Charter">
                          VIP Helicopter Trek Charter
                        </option>
                        <option value="Custom Bespoke Itinerary">
                          Custom Bespoke Itinerary
                        </option>
                        <option value="Visa & LOI Assistance">
                          Visa & LOI Assistance
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Your Message or Route Questions *
                      </label>

                      <textarea
                        rows={5}
                        required
                        placeholder="Tell us about your preferred travel dates, group size, trekking experience, and any special requests..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full resize-y border border-slate-300 bg-slate-50 px-3.5 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Trust Row */}
                  <div className="grid grid-cols-2 gap-3 border-y border-slate-200 py-5 sm:grid-cols-3">
                    <div className="bg-slate-50 p-3 text-center">
                      <ShieldCheck className="mx-auto mb-1.5 h-5 w-5 text-sky-600" />
                      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                        Secure
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500">
                        Private inquiry
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 text-center">
                      <Clock className="mx-auto mb-1.5 h-5 w-5 text-sky-600" />
                      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                        Fast Reply
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500">
                        Within 12 hours
                      </div>
                    </div>

                    <div className="col-span-2 bg-slate-50 p-3 text-center sm:col-span-1">
                      <Mountain className="mx-auto mb-1.5 h-5 w-5 text-sky-600" />
                      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                        Local Team
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500">
                        Gilgit-Baltistan based
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-2 bg-sky-600 px-5 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky-500"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Expedition Inquiry</span>
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 px-5 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-center text-[10px] leading-relaxed text-slate-400">
                    Your information is used only to respond to your
                    expedition inquiry and provide relevant trekking
                    assistance.
                  </p>
                </form>
              ) : (
                /* Success State */
                <div className="p-6 sm:p-10">
                  <div className="flex flex-col items-center text-center">

                    <div className="flex h-16 w-16 items-center justify-center bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>

                    <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                      Inquiry Received
                    </span>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Thank You, {name}
                    </h2>

                    <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-slate-600 sm:text-[14px]">
                      Our Skardu expedition team has received your inquiry
                      regarding{' '}
                      <strong className="text-slate-900">
                        {subject}
                      </strong>
                      . We will contact you at{' '}
                      <strong className="text-slate-900">{email}</strong>{' '}
                      with the relevant route information and next steps.
                    </p>

                    <div className="mt-6 w-full max-w-lg border border-sky-200 bg-sky-50 p-5 text-left">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-sky-600">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>

                        <div>
                          <h3 className="text-[12px] font-bold uppercase tracking-wide text-sky-950">
                            Need urgent assistance?
                          </h3>

                          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                            Contact our expedition coordinator directly on
                            WhatsApp at{' '}
                            <strong className="text-slate-900">
                              {PHONE_DISPLAY}
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="flex-1 bg-slate-950 px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
                      >
                        Send Another Inquiry
                      </button>

                      <Link
                        href="/"
                        className="flex flex-1 items-center justify-center gap-2 border border-slate-300 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600"
                      >
                        Return Home
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-5 lg:col-span-5">

            {/* Skardu HQ */}
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-start gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-sky-50 text-sky-600">
                  <Mountain className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">
                    Skardu Basecamp Operations
                  </h3>

                  <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-wider text-sky-600">
                    Main Headquarters
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-[12px] leading-relaxed text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    College Road, Airport Link, Skardu 16100,
                    Gilgit-Baltistan, Pakistan
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-sky-600" />
                  <span>{PHONE_DISPLAY} / +92 5815 452100</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-sky-600" />
                  <span className="break-all">
                    {EMAIL_PRIMARY}
                  </span>
                </div>
              </div>
            </div>

            {/* Islamabad Office */}
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-start gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-sky-50 text-sky-600">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">
                    Islamabad Liaison & Visa Office
                  </h3>

                  <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-wider text-sky-600">
                    Government Liaison & Briefings
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-[12px] leading-relaxed text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    Blue Area, Jinnah Avenue, Sector F-6,
                    Islamabad 44000, Pakistan
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-sky-600" />
                  <span>+92 51 2891000</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-emerald-600 p-5 text-white transition-colors hover:bg-emerald-500 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/15">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100">
                    Direct Communication
                  </span>

                  <h3 className="mt-1 text-lg font-bold">
                    Chat With Our Team
                  </h3>

                  <p className="mt-1 text-[12px] leading-relaxed text-emerald-50">
                    For quick questions about routes, availability, permits,
                    and expedition planning.
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                    Open WhatsApp
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>

            {/* International Support */}
            <div className="bg-sky-950 p-5 text-white sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-sky-400" />

                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300">
                  International Support Desks
                </h3>
              </div>

              <div className="space-y-4 text-[11px]">
                <div>
                  <strong className="flex items-center gap-1.5 text-[12px] text-white">
                    <Globe className="h-3.5 w-3.5 text-sky-400" />
                    North America Liaison
                  </strong>

                  <span className="mt-0.5 block leading-relaxed text-slate-400">
                    San Francisco · +1 415 800 3921
                    <br />
                    support.na@trekkarakoram.com
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <strong className="flex items-center gap-1.5 text-[12px] text-white">
                    <Globe className="h-3.5 w-3.5 text-sky-400" />
                    Europe & UK Liaison
                  </strong>

                  <span className="mt-0.5 block leading-relaxed text-slate-400">
                    London · +44 20 7946 0912
                    <br />
                    europe@trekkarakoram.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-8 border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-sky-50 text-sky-600">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-wide text-slate-900">
                  Planning Your Expedition?
                </h3>

                <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-slate-500">
                  Whether you are considering K2 Base Camp, Baltoro Glacier,
                  Nanga Parbat, or a custom itinerary, our local team can help
                  you plan the route.
                </p>
              </div>
            </div>

            <Link
              href="/custom-plan"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
            >
              Plan a Custom Trek
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};