import React, { JSX, useEffect, useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageSquare,
  Mountain,
  LifeBuoy,
  Shield,
  CreditCard,
  ArrowRight,
  Check,
} from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { getFaqs, type PublicFaq } from '@/lib/content';
import { FaqSectionSkeleton } from './FaqSkeleton';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<PublicFaq[]>([]);
  const [loading, setLoading] = useState(true);

  // Live FAQs from Firestore (admin panel).
  // Falls back to static data offline.
  useEffect(() => {
    let cancelled = false;

    getFaqs().then((data) => {
      if (!cancelled) {
        setFaqs(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Categories follow whatever the database contains,
  // in first-seen order.
  const categories = [
    'ALL',
    ...Array.from(new Set(faqs.map((f) => f.category))),
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory =
      activeCategory === 'ALL' || item.category === activeCategory;

    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string): JSX.Element => {
    const icons: Record<string, JSX.Element> = {
      'Visa & Permits': <Shield className="h-3.5 w-3.5" />,
      'Fitness & Altitude': <Mountain className="h-3.5 w-3.5" />,
      'Logistics & Safety': <LifeBuoy className="h-3.5 w-3.5" />,
      'Booking & Payment': <CreditCard className="h-3.5 w-3.5" />,
    };

    return icons[category] || <HelpCircle className="h-3.5 w-3.5" />;
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setExpandedIndex(null);
  };

  return (
    <section
      id="faq-section"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-14 sm:py-20 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-16 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl sm:-right-40 sm:top-20 sm:h-96 sm:w-96" />

        <div className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl sm:-left-40 sm:h-96 sm:w-96" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 shadow-sm sm:mb-5 sm:px-4 sm:py-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100">
              <HelpCircle className="h-3.5 w-3.5 text-sky-600" />
            </span>

            <span className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-sky-700 sm:text-[10px] sm:tracking-[0.2em]">
              Expedition Knowledge Base
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Everything you need to know
            <span className="mt-1 block text-sky-600">
              before the Karakoram.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
            Clear answers about permits, visas, altitude, preparation,
            logistics, safety, and what to expect on your expedition.
          </p>
        </div>

        {/* =====================================================
            SEARCH
        ====================================================== */}
        <div className="mx-auto mt-8 w-full max-w-3xl sm:mt-10">
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5">
              <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-sky-500" />
            </div>

            <input
              type="text"
              placeholder="Search visas, altitude, permits, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                h-12 w-full rounded-xl border border-slate-200
                bg-white pl-12 pr-16
                text-sm text-slate-900
                shadow-sm
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
                sm:h-14
                sm:pl-13
                sm:pr-20
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  rounded-lg px-2 py-1.5
                  text-xs font-medium
                  text-slate-400
                  transition-colors
                  hover:bg-slate-100
                  hover:text-slate-700
                  sm:right-4
                "
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            CATEGORY FILTERS
            DESKTOP = TABS
            MOBILE = DROPDOWN
        ====================================================== */}

        {/* ---------------- MOBILE DROPDOWN ---------------- */}
        <div className="mt-5 block sm:hidden">
          <label
            htmlFor="faq-category"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500"
          >
            Browse by category
          </label>

          <div className="relative">
            <select
              id="faq-category"
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="
                h-12 w-full
                appearance-none
                rounded-xl
                border border-slate-200
                bg-white
                px-4 pr-11
                text-sm font-semibold
                text-slate-700
                shadow-sm
                outline-none
                transition-all
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
              "
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Questions' : cat}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute right-4 top-1/2
                h-4 w-4
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        {/* ---------------- DESKTOP TABS ---------------- */}
        <div className="mt-6 hidden justify-center sm:flex">
          <div
            className="
              flex max-w-full
              flex-wrap
              justify-center
              gap-1
              rounded-xl
              border border-slate-200
              bg-white
              p-1.5
              shadow-sm
            "
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    rounded-lg
                    px-3 py-2.5
                    text-[11px]
                    font-semibold
                    transition-all
                    duration-200
                    lg:px-4
                    ${
                      active
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }
                  `}
                >
                  {cat === 'ALL' ? 'All Questions' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            FAQ COUNT
        ====================================================== */}
        <div className="mt-6 flex min-h-[38px] items-center justify-between gap-3 border-b border-slate-200 pb-3 sm:mt-8">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />

            <span className="text-xs font-semibold text-slate-600">
              {filteredFaqs.length}{' '}
              {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
          </div>

          {activeCategory !== 'ALL' && (
            <span className="max-w-[55%] truncate text-right text-[9px] font-bold uppercase tracking-wider text-sky-600 sm:max-w-none sm:text-[10px]">
              {activeCategory}
            </span>
          )}
        </div>

        {/* =====================================================
            FAQ ACCORDION
        ====================================================== */}
        {loading ? (
          <FaqSectionSkeleton count={5} />
        ) : (
          <div className="mt-4 space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={faq.id}
                  className={`
                    overflow-hidden
                    rounded-xl
                    border
                    transition-all
                    duration-300
                    ${
                      isExpanded
                        ? 'border-sky-200 bg-white shadow-md shadow-sky-100/40'
                        : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                    aria-expanded={isExpanded}
                    className="
                      flex w-full
                      cursor-pointer
                      items-center
                      gap-3
                      px-4 py-4
                      text-left
                      sm:gap-4
                      sm:px-6 sm:py-5
                    "
                  >
                    {/* Number */}
                    <span
                      className={`
                        flex
                        h-8 w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-[9px]
                        font-bold
                        transition-all
                        duration-300
                        sm:h-9 sm:w-9
                        sm:rounded-xl
                        sm:text-[10px]
                        ${
                          isExpanded
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Question */}
                    <div className="min-w-0 flex-1">
                      {/* Category */}
                      <div className="mb-1.5 flex min-w-0 items-center gap-2">
                        <span
                          className={`
                            flex min-w-0
                            items-center gap-1.5
                            truncate
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            sm:text-[9px]
                            sm:tracking-[0.14em]
                            ${
                              isExpanded
                                ? 'text-sky-600'
                                : 'text-slate-400'
                            }
                          `}
                        >
                          {getCategoryIcon(faq.category)}
                          <span className="truncate">{faq.category}</span>
                        </span>
                      </div>

                      {/* Question Text */}
                      <span
                        className={`
                          block
                          text-[13px]
                          font-semibold
                          leading-5
                          transition-colors
                          sm:text-[15px]
                          sm:leading-6
                          ${
                            isExpanded
                              ? 'text-slate-950'
                              : 'text-slate-700'
                          }
                        `}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Chevron */}
                    <span
                      className={`
                        flex
                        h-8 w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          isExpanded
                            ? 'border-sky-200 bg-sky-50 text-sky-600'
                            : 'border-slate-200 bg-white text-slate-400'
                        }
                      `}
                    >
                      <ChevronDown
                        className={`
                          h-4 w-4
                          transition-transform
                          duration-300
                          ${isExpanded ? 'rotate-180' : ''}
                        `}
                      />
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`
                      grid
                      transition-all
                      duration-300
                      ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-5 sm:px-6 sm:pb-7">
                        <div
                          className="
                            ml-11
                            border-l-2
                            border-sky-100
                            pl-4
                            sm:ml-[52px]
                            sm:pl-6
                          "
                        >
                          <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:leading-7">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* =====================================================
                EMPTY STATE
            ====================================================== */}
            {filteredFaqs.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm sm:px-6 sm:py-14">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>

                <h3 className="mt-5 text-base font-semibold text-slate-900">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Try another search term or browse all expedition questions.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('ALL');
                    setExpandedIndex(null);
                  }}
                  className="
                    mt-5
                    text-sm
                    font-semibold
                    text-sky-600
                    transition-colors
                    hover:text-sky-700
                  "
                >
                  View all questions →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            SUPPORT CTA
        ====================================================== */}
        <div
          className="
            relative
            mt-10
            overflow-hidden
            rounded-2xl
            bg-slate-950
            px-5 py-6
            text-white
            shadow-xl
            sm:mt-12
            sm:px-8 sm:py-9
          "
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* CTA Content */}
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div
                className="
                  flex
                  h-10 w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  sm:h-11 sm:w-11
                "
              >
                <MessageSquare className="h-5 w-5 text-sky-400" />
              </div>

              <div className="min-w-0">
                <div className="text-base font-semibold text-white">
                  Still have questions?
                </div>

                <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                  Talk directly with our expedition team about routes,
                  preparation, permits, or anything else on your mind.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={whatsappLink(
                'Hi, I have a question about trekking in Pakistan'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                w-full
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-sky-500
                px-5 py-3.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-950
                transition-all
                duration-200
                hover:bg-sky-400
                hover:shadow-lg
                hover:shadow-sky-500/20
                sm:w-auto
              "
            >
              <span>Chat With a Guide</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM REASSURANCE
        ====================================================== */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-4
            gap-y-2
            text-center
            text-[9px]
            font-medium
            uppercase
            tracking-wider
            text-slate-400
            sm:mt-7
            sm:gap-x-5
            sm:text-[10px]
          "
        >
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>Local expedition team</span>
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>Practical advice</span>
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>No-pressure guidance</span>
          </span>
        </div>
      </div>
    </section>
  );
};