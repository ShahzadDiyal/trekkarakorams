'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { Hero } from '@/components/Hero';
import { ActivityGrid } from '@/components/ActivityGrid';
import { PopularPackages } from '@/components/PopularPackages';
import { TravelStylesSection } from '@/components/TravelStylesSection';
import { TrustSection } from '@/components/TrustSection';
import { CostEstimator } from '@/components/CostEstimator';
import { MapExplorer } from '@/components/MapExplorer';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TeamSection } from '@/components/TeamSection';
import { Reveal } from '@/components/Reveal';
import { BlogSection } from '@/components/BlogSection';
import { FAQSection } from '@/components/FAQSection';
import { BRAND_INFO, BRAND_VALUES, AUDIENCE_PERSONAS, FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';
import { useTreks } from '@/lib/content';
import { facetUrl, isKnownActivity, isKnownRegion } from '@/lib/trek-facets';
import {
  ShieldCheck,
  Mountain,
  Compass,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Heart,
  Leaf,
  Recycle,
  Users,
  Globe,
  Star,
  Gift,
  MapPin,
  BadgeCheck,
} from 'lucide-react';
import { whatsappLink } from '@/lib/site';

export const HomePageClient: React.FC = () => {
  const router = useRouter();
  const { currency, onOpenBooking } = useApp();
  // Live trek catalog from Firestore (static data only if the DB is unreachable).
  const { treks, loading: treksLoading } = useTreks();

  const handleHeroSearch = (filters: { query: string; region: string; duration: string; difficulty: string }) => {
    // A single facet (region or difficulty) maps to a clean, canonical URL;
    // any free-text query rides along as a non-indexed ?q= refinement.
    // (Duration isn't a crawlable facet   it's applied client-side only.)
    if (filters.region && isKnownRegion(filters.region)) {
      const url = facetUrl('region', filters.region);
      router.push(filters.query ? `${url}?q=${encodeURIComponent(filters.query)}` : url);
      return;
    }
    if (filters.difficulty) {
      const url = facetUrl('difficulty', filters.difficulty);
      router.push(filters.query ? `${url}?q=${encodeURIComponent(filters.query)}` : url);
      return;
    }
    if (filters.query) {
      router.push(`/treks?q=${encodeURIComponent(filters.query)}`);
      return;
    }
    router.push('/treks');
  };

  const handleTagClick = (tag: string) => {
    router.push(`/treks?q=${encodeURIComponent(tag)}`);
  };

  const handleActivitySelect = (activity: string) => {
    // Only navigate to a dedicated facet page when it actually has inventory  
    // otherwise fall back to the full, unfiltered catalog instead of a 404.
    router.push(isKnownActivity(activity) ? facetUrl('activity', activity) : '/treks');
  };

  const handleStyleSelect = (styleId: string) => {
    router.push(`/travel-styles#${styleId}`);
  };

  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-600" />;
      case 'Recycle': return <Recycle className="w-5 h-5 text-teal-600" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-sky-700" />;
      default: return <Globe className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <main className="flex-1">
      {/* 1. Hero Search Engine with Brand Tagline & Founding Member Promo */}
      <Hero onTagClick={handleTagClick} />

      {/* Trust & Accreditation Strip Banner */}
      <section className="bg-slate-950 text-slate-200 py-3.5 border-y border-slate-800 text-[14px] font-bold">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-sky-400 shrink-0" strokeWidth={2.5} />
            <span>Alpine Club of Pakistan Accredited</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" strokeWidth={2.5} />
            <span>Govt. Licensed Tour Operator (DTS ID-2891)</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400 shrink-0" strokeWidth={2.5} />
            <span>Max 8 Trekkers / Small Group Focus</span>
          </div>
        </div>
      </section>


      {/* 2. Brand Story — We Come From Here */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

            {/* Story Content */}
            <div className="lg:col-span-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-sky-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                  Our Story
                </span>
              </div>

              <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-900">
                We come from here.
              </h2>

              <div className="mt-7 max-w-3xl space-y-5">
                <p className="text-base sm:text-lg leading-8 text-slate-700">
                  Trek Karakoram was not built by people who discovered these
                  mountains from the outside. It was built by people who grew up
                  in Baltistan, with these peaks on the horizon every single day.
                </p>

                <p className="text-base sm:text-lg leading-8 text-slate-600">
                  We started this company because we believe the best way to
                  experience the Karakoram is with the people who actually live in
                  it. Our guides know every trail, every change in the weather,
                  and every family in these valleys. That kind of knowledge does
                  not come from training. It comes from a lifetime of being here.
                </p>
              </div>

              {/* Story CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/treks')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-sky-700 hover:-translate-y-0.5"
                >
                  Explore Our Treks
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => router.push('/destinations')}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-800 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50"
                >
                  Explore the Regions
                </button>
              </div>
            </div>

            {/* Supporting Visual / Local Identity */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-lg bg-slate-900 p-7 sm:p-8">

                {/* Decorative element */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-sky-400/20" />
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-sky-400/10" />

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-sky-500/10">
                    <Mountain className="h-6 w-6 text-sky-400" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                    Northern Pakistan
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                    The Karakoram is not just where we work.
                    <span className="block text-sky-400">
                      It is home.
                    </span>
                  </h3>

                  <div className="mt-6 h-px w-full bg-white/10" />

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    From Skardu to the remote valleys beyond, our connection to
                    these mountains is personal. We know the people, the trails,
                    the seasons and the rhythm of life here.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-200">
                    <MapPin className="h-4 w-4 text-sky-400" />
                    Skardu, Gilgit-Baltistan
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* 3. What You Can Expect From Us */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {/* Column 1 */}
            <div className="py-8 md:py-0 md:px-8 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
                Local Knowledge
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                We are from here.
              </h2>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                Our guides grew up in Baltistan. They have walked these trails
                their entire lives. When they point at a peak and say its name
                in Balti, it is because they grew up looking at it every day.
              </p>
            </div>

            {/* Column 2 */}
            <div className="py-8 md:py-0 md:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
                Everything Organised
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                We handle everything.
              </h2>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                Airport pickup, accommodation, meals, guides, permits, transport
                back. Every detail is sorted before you arrive. You focus on what
                is in front of you. We take care of the rest.
              </p>
            </div>

            {/* Column 3 */}
            <div className="py-8 md:py-0 md:px-8 last:pb-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
                Responsible Travel
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                We travel carefully.
              </h2>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                No waste left on the trail. Fair wages for every porter and cook.
                Respect for every village we walk through. This is not a policy.
                This is just how we work.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Activity Grid Bento Layout */}
      <ActivityGrid onSelectActivity={handleActivitySelect} />

      {/* 5. Featured Trek Packages Catalog */}
      <PopularPackages
        treks={treks}
        loading={treksLoading}
        currency={currency}
        activeRegionFilter=""
        onFilterChange={(region) => {
          if (region) {
            router.push(isKnownRegion(region) ? facetUrl('region', region) : '/treks');
          }
        }}
        onViewDetail={(trek) => router.push(`/treks/${trek.id}`)}
        onBookNow={(trek) => {
          onOpenBooking({
            trekTitle: trek.title,
            groupSize: 2,
            totalPerPerson: trek.discountPriceUSD || trek.priceUSD,
            notes: 'Booked directly from Home Page featured packages'
          });
        }}
        onResetFilters={() => router.push('/treks')}
      />

      {/* 6. Different Journeys, Same Care */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                Different Ways To Explore
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-900">
              Not everyone comes for K2. Both journeys matter.
            </h2>

            <p className="mt-5 max-w-3xl text-base sm:text-lg leading-8 text-slate-600">
              K2 Base Camp is our most well-known trek. But not everyone has two
              weeks or wants to sleep on a glacier. Some people have five days.
              Some are traveling with their family. Some just want to sit on the
              Deosai plateau and watch the mountains change colour. We plan all
              of those journeys with the same care.
            </p>
          </div>

          {/* Journey Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200">

            {/* Column 1 */}
            <div className="py-8 md:py-10 md:pr-8 lg:pr-10 md:border-r border-slate-200">
              <span className="text-sm font-semibold text-sky-600">
                01
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                The big treks.
              </h3>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                K2 Base Camp, Nanga Parbat, Concordia, Biafo and Hispar. These are
                the routes that take weeks and stay with you for years. We guide
                them with experienced local teams who have done them many times
                before.
              </p>
            </div>

            {/* Column 2 */}
            <div className="py-8 md:py-10 md:px-8 lg:px-10 md:border-r border-slate-200">
              <span className="text-sm font-semibold text-sky-600">
                02
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                The quieter places.
              </h3>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                Deosai at 4,000 metres. Kachura Lakes an hour from Skardu. Basho
                Meadows. Shigar Fort. These places rarely appear on international
                travel lists. They should. We take you there too.
              </p>
            </div>

            {/* Column 3 */}
            <div className="py-8 md:py-10 md:pl-8 lg:pl-10">
              <span className="text-sm font-semibold text-sky-600">
                03
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Your own journey.
              </h3>

              <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-600">
                Different dates, a specific interest, traveling with children, a
                photography goal, not much time. Tell us what you have in mind and
                we will plan something that fits it properly.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 7. Travel Styles */}
      <Reveal>
        <TravelStylesSection onSelectStyle={handleStyleSelect} />
      </Reveal>

      {/* 8. Trust Section & 4 Key Stat Metric Blocks */}
      <Reveal>
        <TrustSection />
      </Reveal>

      {/* 11. Verified Trekkers Testimonials */}
      <Reveal>
        <TestimonialsSection />
      </Reveal>

      {/* 11b. Meet Our Team */}
      <Reveal>
        <TeamSection />
      </Reveal>

      {/* 9. Interactive Custom Cost Estimator & Group Calculator */}
      <CostEstimator currency={currency} onOpenBooking={onOpenBooking} />

      {/* 10. Interactive Map Explorer */}
      <MapExplorer onSelectTrekById={(id) => router.push(`/treks/${id}`)} />



      {/* 12. Latest Mountain Guides & Articles */}
      <Reveal>
        <BlogSection />
      </Reveal>

      {/* 13. FAQ Section */}
      <FAQSection />

      {/* Bottom Conversion CTA Strip */}
      <section className="bg-sky-600 text-white py-8 sm:py-10 lg:py-12 border-t border-sky-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">

            {/* Left: Text Content */}
            <div className="w-full lg:flex-1 text-center lg:text-left">
              <span className="inline-block text-[10px] sm:text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.14em] text-sky-100">
                {BRAND_INFO.tagline}
              </span>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1 leading-tight">
                Secure Your 2026 Karakoram Permit
              </h2>

              <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-sky-100 mt-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Restricted area permits for K2 Base Camp, Concordia, and Baltoro
                are allocated strictly on a quota basis. Connect with our Skardu
                operations HQ.
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">

              <button
                onClick={() => router.push('/planner')}
                className="w-full sm:w-auto min-h-[48px] bg-slate-950 hover:bg-slate-900 text-white font-semibold text-[12px] sm:text-[13px] lg:text-[14px] px-5 sm:px-6 py-3 uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg border border-slate-800/30 rounded-sm"
              >
                <span>Calculate Custom Quote</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={whatsappLink("Hi Trek Karakoram, I want to inquire about 2026 trekking permits")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] bg-white hover:bg-slate-100 text-sky-900 font-semibold text-[12px] sm:text-[13px] lg:text-[14px] px-5 sm:px-6 py-3 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg border border-white/20 rounded-sm"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>WhatsApp Direct Hotline</span>
              </a>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
