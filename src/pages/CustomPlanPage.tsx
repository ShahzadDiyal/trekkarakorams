import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Send, MessageSquare, ShieldCheck, ArrowLeft } from 'lucide-react';
import { TREK_PACKAGES } from '../data/treks';

export const CustomPlanPage: React.FC = () => {
  const navigate = useNavigate();
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

  const whatsappInquiryUrl = `https://wa.me/923009876543?text=${encodeURIComponent(
    `Hello Karakoram Expeditions! Name: ${name || 'Treker'}, Trek: ${trekTitle}, Group: ${groupSize}, Preferred: ${preferredMonth}, Country: ${country}. Looking for quote & permit availability.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
          {!submitted ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-sky-500 text-slate-950 text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                  Expedition Booking
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero Booking Fees</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Plan Your Pakistan Trek
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6">
                Fill out this quick form. Our certified expedition leader will review your route and reply within 12 hours with permit availability.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Country of Citizenship *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom, USA, Germany"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Selected Trek / Route *
                    </label>
                    <select
                      value={trekTitle}
                      onChange={(e) => setTrekTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
                    >
                      {TREK_PACKAGES.map((t) => (
                        <option key={t.id} value={t.title}>{t.title}</option>
                      ))}
                      <option value="Custom Bespoke Expedition">Custom Bespoke Itinerary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Group Size
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Target Month / Season
                    </label>
                    <select
                      value={preferredMonth}
                      onChange={(e) => setPreferredMonth(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                    >
                      <option value="June 2026">June 2026</option>
                      <option value="July 2026">July 2026 (Peak Season)</option>
                      <option value="August 2026">August 2026 (Peak Season)</option>
                      <option value="September 2026">September 2026</option>
                      <option value="October 2026">October 2026</option>
                      <option value="2027 Season">2027 Advance Booking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                      Dietary Requirements
                    </label>
                    <select
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                    >
                      <option value="Standard">Standard Expedition Meals</option>
                      <option value="Vegetarian">Strict Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                      <option value="Halal">Halal (Standard)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1 text-xs">
                    Additional Notes or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about previous high-altitude experience, equipment needs, or helicopter requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Expedition Inquiry</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center rounded-full">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Inquiry Received!</h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Our Skardu expedition operations center has received your inquiry for <strong>{trekTitle}</strong>. We will email your customized itinerary and official visa invitation details to <strong>{email}</strong> within 12 hours.
              </p>

              <div className="p-4 bg-sky-50 text-sm text-slate-800 max-w-md mx-auto">
                <strong>Need urgent assistance?</strong> Reach our high-altitude coordinator directly on WhatsApp at <strong>+92 300 9876543</strong>.
              </div>

              <button
                onClick={() => navigate('/')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};