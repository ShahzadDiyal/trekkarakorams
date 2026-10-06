
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Send,
  MessageSquare,
  ShieldCheck,
  Mountain,
  ChevronRight,
  Users,
  Calendar,
  MapPin,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { useTreks } from '@/lib/content';
import { saveBooking } from '@/lib/lead-capture';

// Component that uses useSearchParams - wrapped in Suspense
function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Live published treks for the dropdown (static fallback if DB unreachable).
  const { treks } = useTreks();

  const trekTitleParam = searchParams.get('trek') || '';
  const groupSizeParam = parseInt(searchParams.get('group') || '2');
  const notesParam = searchParams.get('notes') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [selectedTrek, setSelectedTrek] = useState(trekTitleParam);
  const [groupCount, setGroupCount] = useState(groupSizeParam || 2);
  const [departureMonth, setDepartureMonth] = useState('July 2026');
  const [userNotes, setUserNotes] = useState(notesParam || '');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Default to the first live trek once the list loads (unless a trek was preselected).
  useEffect(() => {
    if (!trekTitleParam && treks.length > 0 && !selectedTrek) {
      setSelectedTrek(treks[0].title);
    }
  }, [treks, trekTitleParam, selectedTrek]);

  const selectedTrekDetails = treks.find((t) => t.title === selectedTrek);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      // Saved to Firestore `bookings` (visible in the admin panel) and the
      // visitor is recorded in `customers`. Requires the updated security
      // rules to be deployed — otherwise this throws permission-denied.
      await saveBooking({
        trekTitle: selectedTrek,
        name,
        email,
        phone,
        country,
        travelDate: departureMonth,
        travelers: groupCount,
        message: userNotes,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission failed:', err);
      setSubmitError(
        'We could not save your request online. Please try again or reach us directly on WhatsApp — your details are pre-filled there.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappInquiryUrl = whatsappLink(
    `Hello Trek Karakoram! Booking inquiry from ${name || 'Treker'}. Trek: ${selectedTrek}, Group: ${groupCount}, Month: ${departureMonth}, Country: ${country || 'International'}, Notes: ${userNotes || 'None'}`
  );

  /*
   * ----------------------------------------
   * SUCCESS STATE
   * ----------------------------------------
   */
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Top Accent */}
        <div className="h-1 bg-sky-600" />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
            <Link
              href="/"
              className="transition-colors hover:text-sky-600"
            >
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

            <Link
              href="/treks"
              className="transition-colors hover:text-sky-600"
            >
              Trekking Packages
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

            <span className="font-semibold text-slate-900">
              Reservation Confirmed
            </span>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {/* Success Header */}
            <div className="relative overflow-hidden bg-slate-950 px-6 py-10 text-white sm:px-10">
              {/* Decorative circles matching homepage visual language */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-sky-400/10" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-sky-400/10" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-500">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                    Trek Karakoram
                  </span>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    Reservation Request Confirmed
                  </h1>
                </div>
              </div>
            </div>

            {/* Success Content */}
            <div className="p-6 sm:p-10">
              <p className="text-[15px] leading-8 text-slate-600">
                Thank you{' '}
                <strong className="text-slate-900">{name}</strong>. We have
                registered your reservation request for{' '}
                <strong className="text-slate-900">{selectedTrek}</strong>{' '}
                ({groupCount} {groupCount === 1 ? 'person' : 'people'}) in{' '}
                <strong className="text-slate-900">{departureMonth}</strong>.
              </p>

              <div className="mt-7 rounded-md border border-sky-200 bg-sky-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sky-600">
                    <Send className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-sky-950">
                      What happens next?
                    </h2>

                    <p className="mt-2 text-[13px] leading-7 text-slate-600">
                      Our Skardu operations team will contact you regarding
                      your reservation and provide the next steps for your
                      expedition.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="flex-1 rounded-md bg-slate-950 px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Return to Home
                </Link>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-md bg-emerald-600 px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------
   * BOOKING PAGE
   * ----------------------------------------
   */
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top Accent */}
      <div className="h-1 bg-sky-600" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        {/* Breadcrumb */}
        <div className="mb-7 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
          <Link
            href="/"
            className="transition-colors hover:text-sky-600"
          >
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

          <Link
            href="/treks"
            className="transition-colors hover:text-sky-600"
          >
            Trekking Packages
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />

          <span className="font-semibold text-slate-900">
            Book Expedition
          </span>
        </div>

        {/* Page Header */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-sky-600" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Expedition Reservation
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Reserve Your Trek
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-base">
                Tell us about your trip and our Skardu team will help you
                arrange your trekking experience, permits, transport and
                expedition logistics.
              </p>
            </div>

            <Link
              href="/treks"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-slate-300 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 lg:self-end"
            >
              Browse Treks
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Main Booking Card */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

          {/* Selected Trek Summary */}
          {selectedTrekDetails && (
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-sky-600" />

                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-600">
                      Selected Expedition
                    </span>
                  </div>

                  <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {selectedTrekDetails.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-sky-600" />
                      {selectedTrekDetails.durationDays} Days
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-sky-600" />
                      {selectedTrekDetails.region}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-sky-600" />
                      {selectedTrekDetails.difficulty}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/treks/${selectedTrekDetails.id}`}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-sky-600 transition-colors hover:text-sky-700"
                >
                  View Trek
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-9 p-5 sm:p-8 lg:p-10"
          >

            {/* Personal Information */}
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-50 text-sky-600">
                  <Users className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">
                    Step 01
                  </p>

                  <h2 className="mt-0.5 text-[15px] font-bold uppercase tracking-wide text-slate-900">
                    Your Details
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Tell us who will be joining the expedition.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    WhatsApp / Phone *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="+1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    Country of Citizenship *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. USA, UK, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Expedition Details */}
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-50 text-sky-600">
                  <Mountain className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">
                    Step 02
                  </p>

                  <h2 className="mt-0.5 text-[15px] font-bold uppercase tracking-wide text-slate-900">
                    Expedition Details
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Choose your trek, group size and preferred timing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    Selected Trek
                  </label>

                  <select
                    value={selectedTrek}
                    onChange={(e) => setSelectedTrek(e.target.value)}
                    className="w-full cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  >
                    {treks.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title} - {t.durationDays} Days
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                    Group Size
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={groupCount}
                    onChange={(e) => setGroupCount(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Target Departure Month / Dates
                </label>

                <select
                  value={departureMonth}
                  onChange={(e) => setDepartureMonth(e.target.value)}
                  className="w-full cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                >
                  <option value="June 2026">
                    June 2026 (Early Summer)
                  </option>

                  <option value="July 2026">
                    July 2026 (Peak Season)
                  </option>

                  <option value="August 2026">
                    August 2026 (Peak Season)
                  </option>

                  <option value="September 2026">
                    September 2026 (Autumn Clear Skies)
                  </option>

                  <option value="October 2026">
                    October 2026 (Autumn Colors)
                  </option>

                  <option value="2027 Advance Dates">
                    2027 Season - Advance Booking
                  </option>
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Special Notes / Experience / Custom Requests
                </label>

                <textarea
                  rows={4}
                  placeholder="Previous high-altitude experience, dietary requirements, single tent preference, special requests..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full resize-y rounded-md border border-slate-300 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
                />
              </div>
            </div>

            {/* Trust / Information */}
            <div className="grid grid-cols-2 gap-3 border-y border-slate-200 py-6 sm:grid-cols-4">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center transition-colors hover:bg-white">
                <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Transparent
                </div>

                <div className="mt-1 text-[10px] leading-relaxed text-slate-500">
                  Clear pricing
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center transition-colors hover:bg-white">
                <Users className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Small Groups
                </div>

                <div className="mt-1 text-[10px] leading-relaxed text-slate-500">
                  Personal attention
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center transition-colors hover:bg-white">
                <Clock className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Support
                </div>

                <div className="mt-1 text-[10px] leading-relaxed text-slate-500">
                  Expedition assistance
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center transition-colors hover:bg-white">
                <Sparkles className="mx-auto mb-2 h-5 w-5 text-sky-600" />

                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                  Local Team
                </div>

                <div className="mt-1 text-[10px] leading-relaxed text-slate-500">
                  Gilgit-Baltistan based
                </div>
              </div>
            </div>

            {/* Submission error */}
            {submitError && (
              <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-[13px] leading-6 text-rose-800">
                {submitError}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">              <button
                type="submit"
                disabled={isLoading}
                className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-md bg-sky-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-sky-400"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Reservation Request</span>
                  </>
                )}
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-[10px] leading-relaxed text-slate-400">
              By submitting this form, you agree to our terms of service and
              privacy policy. Your information will only be used to respond
              to your expedition enquiry.
            </p>
          </form>
        </div>

        {/* Additional Information */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-sky-600" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              What Happens Next
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                <Send className="h-4 w-4 text-sky-600" />
              </div>

              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-900">
                Booking Confirmation
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-slate-500">
                Receive confirmation and next steps from our expedition team.
              </p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                <Mountain className="h-4 w-4 text-sky-600" />
              </div>

              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-900">
                Trek Preparation
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-slate-500">
                Get itinerary information, preparation guidance and logistics
                details.
              </p>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-50">
                <MessageSquare className="h-4 w-4 text-sky-600" />
              </div>

              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-900">
                Direct Communication
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-slate-500">
                Have questions? Contact the team directly through WhatsApp.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Main export - wraps the form in Suspense
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />

            <p className="mt-4 text-[13px] font-medium text-slate-500">
              Loading booking form...
            </p>
          </div>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}