import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../data/treks';
import { HelpCircle, ChevronDown, Search, MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'Visa & Permits', 'Fitness & Altitude', 'Logistics & Safety', 'Booking & Payment'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Pakistan Trekking FAQs & Knowledge Center</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Frequently Asked Questions
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Pakistan Trekking FAQs & Answers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Direct, transparent answers regarding mountain logistics, E-Visas, altitude sickness prevention, meal sanitation, porter welfare, and booking guarantees.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white  p-4 mb-6 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. visa LOI, altitude sickness, solo female, sleeping bags, showers, payments)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-bold transition-colors cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3 mb-10">
          {filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={faq.question}
                className={`border transition-colors ${
                  isExpanded ? 'border-sky-500 bg-sky-50/40' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 shrink-0">
                      {faq.category}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-sky-600 shrink-0 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-sky-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-white">Have a specific question not covered here?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Reach out to our Skardu & Islamabad operations team directly.</p>
          </div>

          <a
            href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20have%20a%20question%20about%20Pakistan%20trekking"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
