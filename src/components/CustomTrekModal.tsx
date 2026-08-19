import React, { useState } from 'react';
import { X, CheckCircle2, Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { TREK_PACKAGES } from '../data/treks';

interface CustomTrekModalProps {
  initialTrekTitle?: string;
  initialGroupSize?: number;
  initialTotalPerPerson?: number;
  initialNotes?: string;
  onClose: () => void;
}

export const CustomTrekModal: React.FC<CustomTrekModalProps> = ({
  initialTrekTitle,
  initialGroupSize,
  initialTotalPerPerson,
  initialNotes,
  onClose
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [trekTitle, setTrekTitle] = useState(initialTrekTitle || TREK_PACKAGES[0].title);
  const [groupSize, setGroupSize] = useState(initialGroupSize || 2);
  const [preferredMonth, setPreferredMonth] = useState('July 2026');
  const [diet, setDiet] = useState('Standard');
  const [message, setMessage] = useState(initialNotes || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/923009876543?text=${encodeURIComponent(
    `Hello Karakoram Expeditions! Name: ${name || 'Treker'}, Trek: ${trekTitle}, Group: ${groupSize}, Preferred: ${preferredMonth}, Country: ${country}. Looking for quote & permit availability.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 p-4 flex items-center justify-center">
      {/* Modal Card */}
      <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn p-6 sm:p-8">
        {/* Close Button - Sticky at top */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs z-10"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="clear-both">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-sky-500 text-slate-950 text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                Expedition Booking
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Booking Fees</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Plan Your Pakistan Trek
            </h2>
            <p className="text-xs text-slate-600 mb-6">
              Fill out this quick form. Our certified expedition leader will review your route and reply within 12 hours with permit availability.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Country of Citizenship *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom, USA, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Selected Trek / Route *
                  </label>
                  <select
                    value={trekTitle}
                    onChange={(e) => setTrekTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 font-semibold focus:border-sky-500 focus:outline-none"
                  >
                    {TREK_PACKAGES.map((t) => (
                      <option key={t.id} value={t.title}>{t.title}</option>
                    ))}
                    <option value="Custom Bespoke Expedition">Custom Bespoke Itinerary</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Group Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Target Month / Season
                  </label>
                  <select
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
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
                  <label className="block font-bold text-slate-800 uppercase mb-1">
                    Dietary Requirements
                  </label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
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
                <label className="block font-bold text-slate-800 uppercase mb-1">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about previous high-altitude experience, equipment needs, or helicopter requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
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
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 clear-both">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong>{name}</strong>. Our Skardu expedition operations center has received your inquiry for <strong>{trekTitle}</strong>. We will email your customized itinerary and official visa invitation details to <strong>{email}</strong> within 12 hours.
            </p>

            <div className="p-4 bg-sky-50 text-xs text-slate-800 max-w-md mx-auto">
              <strong>Need urgent assistance?</strong> Reach our high-altitude coordinator directly on WhatsApp at <strong>+92 300 9876543</strong>.
            </div>

            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};