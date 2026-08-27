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
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';
import { TREK_PACKAGES, BRAND_INFO } from '@/data/treks';

// Component that uses useSearchParams - wrapped in Suspense
function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query parameters
  const trekTitleParam = searchParams.get('trek') || '';
  const groupSizeParam = parseInt(searchParams.get('group') || '2');
  const notesParam = searchParams.get('notes') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [selectedTrek, setSelectedTrek] = useState(trekTitleParam || TREK_PACKAGES[0]?.title || '');
  const [groupCount, setGroupCount] = useState(groupSizeParam || 2);
  const [departureMonth, setDepartureMonth] = useState('July 2026');
  const [userNotes, setUserNotes] = useState(notesParam || '');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Find selected trek details
  const selectedTrekDetails = TREK_PACKAGES.find(t => t.title === selectedTrek);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsLoading(false);
  };

  const whatsappInquiryUrl = `https://wa.me/923009876543?text=${encodeURIComponent(
    `Hello Karakoram Expeditions! Booking inquiry from ${name || 'Treker'}. Trek: ${selectedTrek}, Group: ${groupCount}, Month: ${departureMonth}, Country: ${country || 'International'}, Notes: ${userNotes || 'None'}`
  )}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-2xl w-full p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Reservation Request Confirmed!
          </h1>

          <p className="text-[15px] text-slate-600 max-w-lg mx-auto leading-relaxed">
            Thank you <strong className="text-slate-900">{name}</strong>. We have registered your reservation for{' '}
            <strong className="text-slate-900">{selectedTrek}</strong> ({groupCount} persons in {departureMonth}).
          </p>

          <div className="mt-4 p-4 bg-sky-50 border border-sky-200 text-left text-[14px] text-slate-700">
            <p className="font-medium text-sky-900 mb-1">📬 What happens next?</p>
            <p>Our Skardu operations team will email your official Letter of Invitation (LOI) to <strong>{email}</strong> within 24 hours.</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3 transition-colors"
            >
              Return to Home
            </Link>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/treks" className="hover:text-sky-600">Trekking Packages</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900">Book Expedition</span>
        </div>

        {/* Main Booking Card */}
        <div className="bg-white border border-slate-200">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-sky-600 text-white text-[12px] font-bold px-3 py-1 uppercase tracking-wider">
                    Expedition Reservation
                  </span>
                  <span className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zero Booking Surcharges</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Reserve Your Karakoram Trek
                </h1>

                <p className="text-[14px] text-slate-600 mt-2 max-w-2xl leading-relaxed">
                  Fill out your details below to receive your official Pakistan E-Visa Letter of Invitation (LOI),
                  permit clearance paperwork, and detailed gear briefing.
                </p>
              </div>
            </div>

            {/* Trek Summary Card */}
            {selectedTrekDetails && (
              <div className="mb-6 p-4 bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mountain className="w-4 h-4 text-sky-600" />
                    <span className="font-medium text-slate-900">{selectedTrekDetails.title}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {selectedTrekDetails.durationDays} Days
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedTrekDetails.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {selectedTrekDetails.difficulty}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/treks/${selectedTrekDetails.id}`}
                  className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
                >
                  <span>View Trek Details</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    Country of Citizenship *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USA, UK, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    Selected Trek
                  </label>
                  <select
                    value={selectedTrek}
                    onChange={(e) => setSelectedTrek(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] font-semibold text-slate-900 focus:border-sky-500 focus:outline-none transition-colors"
                  >
                    {TREK_PACKAGES.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title} - {t.durationDays} Days
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                    Group Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={groupCount}
                    onChange={(e) => setGroupCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                  Target Departure Month / Dates
                </label>
                <select
                  value={departureMonth}
                  onChange={(e) => setDepartureMonth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] font-semibold text-slate-900 focus:border-sky-500 focus:outline-none transition-colors"
                >
                  <option value="June 2026">June 2026 (Early Summer)</option>
                  <option value="July 2026">July 2026 (Peak Season)</option>
                  <option value="August 2026">August 2026 (Peak Season)</option>
                  <option value="September 2026">September 2026 (Autumn Clear Skies)</option>
                  <option value="October 2026">October 2026 (Autumn Colors)</option>
                  <option value="2027 Advance Dates">2027 Season - Advance Booking</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase text-[12px] tracking-wider mb-1.5">
                  Special Notes / Experience / Custom Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Previous high-altitude experience, dietary requirements, single tent preference, special requests..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-3 text-[15px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3 text-center border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-600 font-medium uppercase">Govt. Licensed</div>
                </div>
                <div className="bg-slate-50 p-3 text-center border border-slate-200">
                  <Users className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-600 font-medium uppercase">Max 8 Trekkers</div>
                </div>
                <div className="bg-slate-50 p-3 text-center border border-slate-200">
                  <Clock className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-600 font-medium uppercase">24/7 Support</div>
                </div>
                <div className="bg-slate-50 p-3 text-center border border-slate-200">
                  <Sparkles className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-600 font-medium uppercase">100% Transparency</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-400 text-white font-medium py-3.5 px-6 text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Reservation Request</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 px-6 text-[15px] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Fast WhatsApp Direct</span>
                </a>
              </div>

              <div className="text-center text-[11px] text-slate-400 pt-2">
                By submitting, you agree to our terms of service and privacy policy.
                Your data is secure and will only be used for your expedition booking.
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-1">📄</div>
            <div className="text-[12px] font-bold text-slate-900 uppercase">Letter of Invitation</div>
            <div className="text-[11px] text-slate-500">Official LOI for Pakistan E-Visa</div>
          </div>
          <div className="bg-white p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-1">🏔️</div>
            <div className="text-[12px] font-bold text-slate-900 uppercase">Permit Clearance</div>
            <div className="text-[11px] text-slate-500">CKNP & Gilgit-Baltistan Permits</div>
          </div>
          <div className="bg-white p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-1">🎒</div>
            <div className="text-[12px] font-bold text-slate-900 uppercase">Gear Briefing</div>
            <div className="text-[11px] text-slate-500">Complete equipment checklist</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export - wraps the form in Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}