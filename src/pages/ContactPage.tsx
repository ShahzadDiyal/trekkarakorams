import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Mountain,
  Award
} from 'lucide-react';

export const ContactPage: React.FC = () => {
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

  const whatsappInquiryUrl = `https://wa.me/923009876543?text=${encodeURIComponent(
    `Hello Karakoram Expeditions! My name is ${name || 'Treker'}. Subject: ${subject}. I am from ${country || 'International'}. Message: ${message || 'Inquiring about 2026 departures.'}`
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Contact Karakoram Expeditions Pakistan</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Operations & Inquiries
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Get In Touch With Our Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Contact our Skardu headquarters or Islamabad coordination office for custom expedition planning, permit questions, and immediate 24/7 mountain support.
          </p>
        </div>

        {/* 2-Column Grid: Form + Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Send Us a Direct Message</h2>
                  <p className="text-slate-600 text-xs mb-4">We reply to all inquiries within 12 hours with customized itineraries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1">Your Name *</label>
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
                    <label className="block font-bold text-slate-800 uppercase mb-1">Email Address *</label>
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
                    <label className="block font-bold text-slate-800 uppercase mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 uppercase mb-1">Country of Residence *</label>
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

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="K2 Base Camp & Gondogoro La 2026">K2 Base Camp & Gondogoro La (2026)</option>
                    <option value="Classic Baltoro Glacier Trek">Classic Baltoro Glacier Trek</option>
                    <option value="Fairy Meadows & Nanga Parbat">Fairy Meadows & Nanga Parbat</option>
                    <option value="Snow Lake & Hispar La Pass">Snow Lake & Hispar La Pass</option>
                    <option value="VIP Helicopter Trek Charter">VIP Helicopter Trek Charter</option>
                    <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
                    <option value="Visa & LOI Assistance">Visa & LOI Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Your Message or Route Questions</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your previous trekking experience, preferred travel dates, group size, and any special requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Expedition Inquiry</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you <strong>{name}</strong>. Our Skardu expedition command team will email your customized route briefing and visa guidance to <strong>{email}</strong> within 12 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Offices & Emergency Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Skardu Basecamp HQ */}
            <div className="bg-white p-6 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Mountain className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Skardu Basecamp Operations (HQ)</h3>
                  <span className="text-[10px] text-sky-700 font-semibold">Gilgit-Baltistan Main Headquarters</span>
                </div>
              </div>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>College Road, Airport Link, Skardu 16100, Gilgit-Baltistan, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>+92 300 9876543 / +92 5815 452100</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <span>info@karakoramexpeditions.com</span>
              </p>
            </div>

            {/* Islamabad Liaison Office */}
            <div className="bg-white p-6 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Islamabad Liaison & Visa Office</h3>
                  <span className="text-[10px] text-sky-700 font-semibold">Government Liaison & Briefings</span>
                </div>
              </div>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Blue Area, Jinnah Avenue, Sector F-6, Islamabad 44000, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>+92 51 2891000</span>
              </p>
            </div>

            {/* International Liaison Desks */}
            <div className="bg-sky-950 text-white p-6 space-y-3 text-xs">
              <h3 className="font-bold text-sky-400 uppercase tracking-wider text-xs">
                International Support Desks
              </h3>
              <div className="space-y-2 text-slate-300">
                <div>
                  <strong className="text-white block">🇺🇸 North America Liaison (San Francisco):</strong>
                  <span>+1 415 800 3921 • support.na@karakoramexpeditions.com</span>
                </div>
                <div>
                  <strong className="text-white block">🇬🇧 Europe & UK Liaison (London):</strong>
                  <span>+44 20 7946 0912 • europe@karakoramexpeditions.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};