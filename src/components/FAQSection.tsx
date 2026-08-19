import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/treks';

export const FAQSection: React.FC = () => {
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
    <section id="faq-section" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Planning Your Pakistan Trek
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clear answers to common questions about visas, altitude acclimatization, permits, and base camp logistics.
          </p>
        </div>

        {/* Search bar & Category filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., visa, altitude sickness, solo female, sleeping bags)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-center">
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

        {/* Accordion List */}
        <div className="space-y-2">
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
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-sky-100/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 text-slate-600 text-xs">
              No matching questions found. Ask our team directly via WhatsApp or email!
            </div>
          )}
        </div>

        {/* Support Banner */}
        <div className="mt-8 p-4 bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900">Have more specific questions?</div>
            <div className="text-xs text-slate-600">Our expedition managers in Skardu & Islamabad are on standby 24/7.</div>
          </div>
          <a
            href="https://wa.me/923009876543?text=Hi%2C%20I%20have%20a%20question%20about%20trekking%20in%20Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat With Guide</span>
          </a>
        </div>
      </div>
    </section>
  );
};
