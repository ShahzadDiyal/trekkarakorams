import React, { JSX, useState } from 'react';
import { ChevronDown, HelpCircle, Search, MessageSquare, Mountain, MapPin, Clock, Shield, Users } from 'lucide-react';
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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      'Visa & Permits': <Shield className="w-3.5 h-3.5" />,
      'Fitness & Altitude': <Mountain className="w-3.5 h-3.5" />,
      'Logistics & Safety': <Clock className="w-3.5 h-3.5" />,
      'Booking & Payment': <Users className="w-3.5 h-3.5" />,
    };
    return icons[category] || <HelpCircle className="w-3.5 h-3.5" />;
  };

  return (
    <section id="faq-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight mt-1">
            Questions About Your <span className="font-medium text-sky-600">Karakoram Trek</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto font-light leading-relaxed">
            Expert answers on visas, altitude acclimatization, permits, and base camp logistics
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions about visas, altitude, permits, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:outline-none border border-slate-200 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${activeCategory === cat
                    ? 'bg-sky-50 text-sky-700 border border-sky-300'
                    : 'text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700 bg-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-1.5">
          {filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={faq.question}
                className={`group transition-all duration-300 ${isExpanded
                    ? 'bg-sky-50/60 border-l-2 border-sky-400'
                    : 'bg-white border-l-2 border-transparent hover:border-slate-300'
                  }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className={`mt-0.5 shrink-0 ${isExpanded ? 'text-sky-500' : 'text-slate-400 group-hover:text-slate-500'
                      }`}>
                      {getCategoryIcon(faq.category)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-medium uppercase tracking-wider ${isExpanded ? 'text-sky-600' : 'text-slate-400'
                          }`}>
                          {faq.category}
                        </span>
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isExpanded ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                        }`}>
                        {faq.question}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${isExpanded
                        ? 'rotate-180 text-sky-500'
                        : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1">
                    <div className="pl-6 border-l-2 border-sky-300/50">
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center bg-slate-50 border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No matching questions found.</p>
              <p className="text-xs text-slate-400 mt-1">Ask our team directly via WhatsApp or email</p>
            </div>
          )}
        </div>

        {/* Support Banner - Clean & Light */}
        <div className="mt-10 border border-slate-200 bg-slate-50/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 border border-sky-200 bg-sky-50">
              <MessageSquare className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900">Still have questions?</div>
              <div className="text-xs text-slate-500">Our expedition team is available 24/7</div>
            </div>
          </div>
          <a
            href="https://wa.me/923009876543?text=Hi%2C%20I%20have%20a%20question%20about%20trekking%20in%20Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sky-600 hover:text-sky-700 border border-sky-300 hover:border-sky-400 bg-white px-6 py-2.5 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Chat with Guide</span>
            <span className="text-sky-400">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};