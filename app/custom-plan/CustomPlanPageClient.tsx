'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Send,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  Mountain,
  Users,
  Calendar,
  Utensils,
  Sparkles,
} from 'lucide-react';
import { whatsappLink, SITE_NAME } from '@/lib/site';
import { useSiteSettings } from '@/lib/site-settings';
import { TREK_PACKAGES } from '@/data/treks';

export const CustomPlanPageClient: React.FC = () => {
  const siteContact = useSiteSettings();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [trekTitle, setTrekTitle] = useState(TREK_PACKAGES[0].title);
  const [groupSize, setGroupSize] = useState(2);
  const [preferredMonth, setPreferredMonth] = useState('July 2026');
  const [diet, setDiet] = useState('Standard');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = whatsappLink(
    `Hello ${SITE_NAME}! Name: ${name || 'Treker'}, Trek: ${trekTitle}, Group: ${groupSize}, Preferred: ${preferredMonth}, Country: ${country}. Looking for quote & permit availability.`
  );

  return (
    <main className="flex-1 bg-white">

      {/* =========================================================
          PAGE INTRO
      ========================================================= */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">

            {/* Intro Content */}
            <div className="lg:col-span-8">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-sky-600" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                  Expedition Planning
                </span>
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="bg-sky-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Custom Expedition
                </span>

                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Zero Booking Fees
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Plan Your Pakistan Trek
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Tell us what you have in mind. Our expedition team will review
                your route, timing and requirements and help build a journey
                that fits you properly.
              </p>
            </div>

            {/* Brand Panel */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-lg bg-sky-950 p-6 sm:p-7">

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-sky-400/20" />
                <div className="absolute -right-5 -top-5 h-18 w-18 rounded-full border border-sky-400/10" />

                <div className="relative">

                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-sky-500/10">
                    <Mountain className="h-6 w-6 text-sky-400" />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                    Local Expedition Team
                  </p>

                  <h2 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">
                    Your journey.
                    <span className="block text-sky-400">
                      Planned properly.
                    </span>
                  </h2>

                  <div className="mt-5 h-px w-full bg-white/10" />

                  <p className="mt-4 text-[13px] leading-6 text-slate-300">
                    From permits and transport to meals and mountain logistics,
                    our Skardu team helps organize the details before you arrive.
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          FORM SECTION
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          <div className="mx-auto max-w-5xl">

            {!submitted ? (
              <>

                {/* Form Heading */}
                <div className="mb-8 max-w-3xl">

                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-10 bg-sky-600" />

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                      Tell Us About Your Trip
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Start planning your expedition
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    Fill out the form below and our certified expedition leader
                    will review your requirements and reply with route,
                    availability and planning information.
                  </p>

                </div>


                {/* Main Form Card */}
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

                  {/* Form Top Bar */}
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-600">
                          <Mountain className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                            Expedition Inquiry
                          </h3>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Build your ideal Karakoram journey
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Your information is secure</span>
                      </div>

                    </div>

                  </div>


                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-8 p-5 sm:p-8 lg:p-10"
                  >

                    {/* =====================================================
                        PERSONAL DETAILS
                    ====================================================== */}
                    <div>

                      <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">

                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-50 text-sky-600">
                          <Users className="h-4 w-4" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                            Your Details
                          </h3>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Basic information for your expedition enquiry.
                          </p>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Name */}
                        <div>
                          <label className="field-label">
                            Your Full Name *
                          </label>

                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="field-input"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="field-label">
                            Email Address *
                          </label>

                          <input
                            type="email"
                            required
                            placeholder="e.g. john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="field-input"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="field-label">
                            WhatsApp / Phone Number
                          </label>

                          <input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="field-input"
                          />
                        </div>

                        {/* Country */}
                        <div>
                          <label className="field-label">
                            Country of Citizenship *
                          </label>

                          <input
                            type="text"
                            required
                            placeholder="e.g. United Kingdom, USA, Germany"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="field-input"
                          />
                        </div>

                      </div>
                    </div>


                    {/* =====================================================
                        TREK DETAILS
                    ====================================================== */}
                    <div>

                      <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">

                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-50 text-sky-600">
                          <Mountain className="h-4 w-4" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                            Trek Details
                          </h3>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Choose your route, group size and travel season.
                          </p>
                        </div>

                      </div>


                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Trek */}
                        <div className="sm:col-span-2">

                          <label className="field-label">
                            Selected Trek / Route *
                          </label>

                          <select
                            value={trekTitle}
                            onChange={(e) => setTrekTitle(e.target.value)}
                            className="w-full cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                          >
                            {TREK_PACKAGES.map((t) => (
                              <option key={t.id} value={t.title}>
                                {t.title}
                              </option>
                            ))}

                            <option value="Custom Bespoke Expedition">
                              Custom Bespoke Itinerary
                            </option>
                          </select>

                        </div>


                        {/* Group */}
                        <div>

                          <label className="field-label">
                            Group Size
                          </label>

                          <input
                            type="number"
                            min={1}
                            max={30}
                            value={groupSize}
                            onChange={(e) =>
                              setGroupSize(Number(e.target.value))
                            }
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                          />

                        </div>

                      </div>


                      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Month */}
                        <div>

                          <label className="field-label">
                            Target Month / Season
                          </label>

                          <select
                            value={preferredMonth}
                            onChange={(e) =>
                              setPreferredMonth(e.target.value)
                            }
                            className="w-full cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                          >
                            <option value="June 2026">
                              June 2026
                            </option>

                            <option value="July 2026">
                              July 2026 (Peak Season)
                            </option>

                            <option value="August 2026">
                              August 2026 (Peak Season)
                            </option>

                            <option value="September 2026">
                              September 2026
                            </option>

                            <option value="October 2026">
                              October 2026
                            </option>

                            <option value="2027 Season">
                              2027 Advance Booking
                            </option>
                          </select>

                        </div>


                        {/* Diet */}
                        <div>

                          <label className="field-label">
                            Dietary Requirements
                          </label>

                          <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            className="w-full cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                          >
                            <option value="Standard">
                              Standard Expedition Meals
                            </option>

                            <option value="Vegetarian">
                              Strict Vegetarian
                            </option>

                            <option value="Vegan">
                              Vegan
                            </option>

                            <option value="Gluten-Free">
                              Gluten-Free
                            </option>

                            <option value="Halal">
                              Halal (Standard)
                            </option>
                          </select>

                        </div>

                      </div>


                      {/* Notes */}
                      <div className="mt-5">

                        <label className="field-label">
                          Additional Notes or Questions
                        </label>

                        <textarea
                          rows={4}
                          placeholder="Tell us about previous high-altitude experience, equipment needs, or helicopter requests..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full resize-y rounded-md border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                        />

                      </div>

                    </div>


                    {/* =====================================================
                        QUICK TRUST STRIP
                    ====================================================== */}
                    <div className="grid grid-cols-2 gap-3 border-y border-slate-200 py-5 sm:grid-cols-4">

                      <div className="rounded-md bg-slate-50 p-4 text-center">
                        <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
                          Transparent
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Clear planning
                        </p>
                      </div>


                      <div className="rounded-md bg-slate-50 p-4 text-center">
                        <Users className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
                          Small Groups
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Personal attention
                        </p>
                      </div>


                      <div className="rounded-md bg-slate-50 p-4 text-center">
                        <Calendar className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
                          Flexible Dates
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Seasonal planning
                        </p>
                      </div>


                      <div className="rounded-md bg-slate-50 p-4 text-center">
                        <Sparkles className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
                          Local Team
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          Based in GB
                        </p>
                      </div>

                    </div>


                    {/* =====================================================
                        ACTIONS
                    ====================================================== */}
                    <div className="flex flex-col gap-3 pt-1 sm:flex-row">

                      <button
                        type="submit"
                        className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md"
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Expedition Inquiry</span>
                      </button>


                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Send via WhatsApp</span>
                      </a>

                    </div>


                    {/* Disclaimer */}
                    <p className="text-center text-[10px] leading-5 text-slate-400">
                      By submitting this form, you agree to our terms of service
                      and privacy policy. Your information will only be used to
                      respond to your expedition enquiry.
                    </p>

                  </form>

                </div>


                {/* =====================================================
                    SUPPORTING INFORMATION
                ====================================================== */}
                <div className="mt-10">

                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-sky-600" />

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                      What Happens Next
                    </span>
                  </div>


                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-md border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm">

                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                        <Send className="h-4 w-4 text-sky-600" />
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-900">
                        Review & Reply
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Our expedition team reviews your requirements and
                        contacts you with the next steps.
                      </p>

                    </div>


                    <div className="rounded-md border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm">

                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                        <Mountain className="h-4 w-4 text-sky-600" />
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-900">
                        Build Your Route
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        We help refine the itinerary, preparation requirements
                        and expedition logistics.
                      </p>

                    </div>


                    <div className="rounded-md border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm">

                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                        <MessageSquare className="h-4 w-4 text-sky-600" />
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-900">
                        Stay Connected
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Have questions? Continue the conversation directly with
                        our team through WhatsApp.
                      </p>

                    </div>

                  </div>

                </div>

              </>

            ) : (

              /* =========================================================
                 SUCCESS STATE
              ========================================================= */
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

                {/* Success Header */}
                <div className="bg-sky-950 px-6 py-8 text-white sm:px-10 sm:py-10">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-500">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                        Trek Karakoram
                      </p>

                      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                        Inquiry Received!
                      </h2>

                    </div>

                  </div>

                </div>


                {/* Success Content */}
                <div className="p-6 sm:p-10">

                  <div className="max-w-2xl">

                    <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                      Thank you,{' '}
                      <strong className="text-slate-900">{name}</strong>.
                      Our Skardu expedition operations center has received
                      your inquiry for{' '}
                      <strong className="text-slate-900">
                        {trekTitle}
                      </strong>.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                      We will email your customized itinerary and official visa
                      invitation details to{' '}
                      <strong className="text-slate-900">{email}</strong>{' '}
                      within 12 hours.
                    </p>


                    {/* WhatsApp Callout */}
                    <div className="mt-7 rounded-md border border-sky-200 bg-sky-50 p-5">

                      <div className="flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sky-600">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>

                        <div>

                          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-sky-950">
                            Need urgent assistance?
                          </h3>

                          <p className="mt-1.5 text-xs leading-6 text-slate-600">
                            Reach our high-altitude coordinator directly on
                            WhatsApp at{' '}
                            <strong className="text-slate-900">
                              {siteContact.phone}
                            </strong>.
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Success Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                      <button
                        onClick={() => router.push('/')}
                        className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-slate-800"
                      >
                        Return to Home
                      </button>

                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-emerald-700"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat on WhatsApp
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>
        </div>
      </section>


      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      {!submitted && (
        <section className="overflow-hidden border-t border-sky-700 bg-sky-600 py-8 text-white sm:py-10 lg:py-12">

          <div className="mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">

            <div className="w-full lg:flex-1">

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-100 sm:text-xs">
                Local Knowledge. Personal Planning.
              </span>

              <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                Not sure which route is right for you?
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-sky-100 sm:text-sm">
                Tell us your dates, experience and interests. We can help you
                choose a route that fits your time and goals.
              </p>

            </div>

            <div className="w-full shrink-0 sm:w-auto">

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-sky-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg sm:w-auto"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Our Team
              </a>

            </div>

          </div>

        </section>
      )}

    </main>
  );
};