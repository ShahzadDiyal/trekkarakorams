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
  Check
} from 'lucide-react';
import { whatsappLink, SITE_NAME } from '@/lib/site';
import { getFaqs, type PublicFaq } from '@/lib/content';
import { FaqSectionSkeleton } from './FaqSkeleton';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<PublicFaq[]>([]);
  const [loading, setLoading] = useState(true);

  // Live FAQs from Firestore (admin panel). Falls back to static data offline.
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

  // Categories follow whatever the database contains, in first-seen order.
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

  return (
    <section
      id="faq-section"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-slate-200/70 blur-3xl" />

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

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* =====================================
            HEADER
        ====================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100">
              <HelpCircle className="h-3.5 w-3.5 text-sky-600" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700">
              Expedition Knowledge Base
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Everything you need to know
            <span className="mt-1 block text-sky-600">
              before the Karakoram.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Clear answers about permits, visas, altitude, preparation,
            logistics, safety, and what to expect on your expedition.
          </p>
        </div>

        {/* =====================================
            SEARCH
        ====================================== */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="group relative">

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-sky-500" />
            </div>

            <input
              type="text"
              placeholder="Search visas, altitude, permits, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                h-14 w-full rounded-xl border border-slate-200
                bg-white pl-13 pr-5
                text-sm text-slate-900
                shadow-sm
                outline-none
                placeholder:text-slate-400
                transition-all
                focus:border-sky-400
                focus:ring-4
                focus:ring-sky-100
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* =====================================
            CATEGORY FILTERS
        ====================================== */}
        <div className="mt-6 flex justify-center overflow-x-auto pb-2">
          <div className="inline-flex min-w-max rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">

            {categories.map((cat) => {
              const active = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedIndex(null);
                  }}
                  className={`
                    rounded-xl px-3 py-2.5
                    text-[11px] font-semibold
                    transition-all duration-200
                    sm:px-4
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

        {/* =====================================
            FAQ COUNT
        ====================================== */}
        <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span className="text-xs font-semibold text-slate-600">
              {filteredFaqs.length}{' '}
              {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
          </div>

          {activeCategory !== 'ALL' && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
              {activeCategory}
            </span>
          )}
        </div>

        {/* =====================================
            FAQ ACCORDION
        ====================================== */}
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
                  overflow-hidden rounded-xl border
                  transition-all duration-300
                  ${
                    isExpanded
                      ? 'border-sky-200 bg-white shadow-md shadow-sky-100/40'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  {/* Number */}
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-xl text-[10px] font-bold
                      transition-all duration-300
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

                    <div className="mb-1.5 flex items-center gap-2">
                      <span
                        className={`
                          flex items-center gap-1.5
                          text-[9px] font-bold uppercase tracking-[0.14em]
                          ${
                            isExpanded
                              ? 'text-sky-600'
                              : 'text-slate-400'
                          }
                        `}
                      >
                        {getCategoryIcon(faq.category)}
                        {faq.category}
                      </span>
                    </div>

                    <span
                      className={`
                        block text-sm font-semibold leading-6 transition-colors sm:text-[15px]
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
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-full border transition-all duration-300
                      ${
                        isExpanded
                          ? 'border-sky-200 bg-sky-50 text-sky-600'
                          : 'border-slate-200 bg-white text-slate-400'
                      }
                    `}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`
                    grid transition-all duration-300
                    ${
                      isExpanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                      <div className="ml-[52px] border-l-2 border-sky-100 pl-5 sm:pl-6">
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

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
                }}
                className="mt-5 text-sm font-semibold text-sky-600 hover:text-sky-700"
              >
                View all questions →
              </button>
            </div>
          )}
        </div>
        )}

        {/* =====================================
            SUPPORT CTA
        ====================================== */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-9">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <MessageSquare className="h-5 w-5 text-sky-400" />
              </div>

              <div>
                <div className="text-base font-semibold text-white">
                  Still have questions?
                </div>

                <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                  Talk directly with our expedition team about routes,
                  preparation, permits, or anything else on your mind.
                </p>
              </div>

            </div>

            <a
              href={whatsappLink("Hi, I have a question about trekking in Pakistan")}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex shrink-0 items-center justify-center gap-2
                rounded-xl bg-sky-500 px-5 py-3
                text-xs font-bold uppercase tracking-wider text-slate-950
                transition-all duration-200
                hover:bg-sky-400
                hover:shadow-lg hover:shadow-sky-500/20
              "
            >
              <span>Chat With a Guide</span>
              <ArrowRight className="h-4 w-4" />
            </a>

          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Local expedition team</span></span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Practical advice</span></span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
          <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>No-pressure guidance</span></span>
        </div>
      </div>
    </section>
  );
};