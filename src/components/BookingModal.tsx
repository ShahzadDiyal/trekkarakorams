import React, { useState } from 'react';
import { X, CheckCircle2, Send, MessageSquare, ShieldCheck, Mountain } from 'lucide-react';
import { TREK_PACKAGES } from '../data/treks';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trekTitle?: string;
  groupSize?: number;
  totalPerPerson?: number;
  notes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  trekTitle,
  groupSize: initialGroupSize,
  totalPerPerson,
  notes
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [selectedTrek, setSelectedTrek] = useState(trekTitle || TREK_PACKAGES[0].title);
  const [groupCount, setGroupCount] = useState(initialGroupSize || 2);
  const [departureMonth, setDepartureMonth] = useState('July 2026');
  const [userNotes, setUserNotes] = useState(notes || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/923009876543?text=${encodeURIComponent(
    `Hello Karakoram Expeditions! Booking inquiry from ${name || 'Treker'}. Trek: ${selectedTrek}, Group: ${groupCount}, Month: ${departureMonth}, Country: ${country || 'International'}, Notes: ${userNotes || 'None'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 overflow-y-auto p-4 flex items-center justify-center">
      <div className="bg-white max-w-xl w-full p-6 sm:p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-sky-500 text-slate-950 text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                Expedition Reservation
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Booking Surcharges</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Reserve Your Karakoram Trek
            </h2>
            <p className="text-xs text-slate-600 mt-1 mb-5 leading-relaxed">
              Fill out your details below to receive your official Pakistan E-Visa Letter of Invitation (LOI), permit clearance paperwork, and detailed gear briefing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Country of Citizenship *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USA, UK, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-800 uppercase mb-1">Selected Trek</label>
                  <select
                    value={selectedTrek}
                    onChange={(e) => setSelectedTrek(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    {TREK_PACKAGES.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Group Size</label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={groupCount}
                    onChange={(e) => setGroupCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Target Departure Month / Dates</label>
                <select
                  value={departureMonth}
                  onChange={(e) => setDepartureMonth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="June 2026">June 2026 (Early Summer)</option>
                  <option value="July 2026">July 2026 (Peak Season)</option>
                  <option value="August 2026">August 2026 (Peak Season)</option>
                  <option value="September 2026">September 2026 (Autumn Clear Skies)</option>
                  <option value="October 2026">October 2026 (Autumn Colors)</option>
                  <option value="2027 Advance Dates">2027 Season</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Special Notes / Experience / Custom Requests</label>
                <textarea
                  rows={2}
                  placeholder="Previous high-altitude experience, dietary requirements, single tent preference..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 p-2 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Reservation Request</span>
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Fast WhatsApp Direct</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Reservation Request Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Thank you <strong>{name}</strong>. We have registered your reservation for <strong>{selectedTrek}</strong> ({groupCount} persons in {departureMonth}). Our Skardu operations team will email your official Letter of Invitation (LOI) to <strong>{email}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
