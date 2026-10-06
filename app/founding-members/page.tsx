 
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Mountain,
  ShieldCheck,
  Compass,
  Users,
  Gift,
  Crown,
  BadgePercent,
} from 'lucide-react';
import { FOUNDING_MEMBERS_SPECIAL } from '@/data/treks';

export const metadata: Metadata = {
  title: 'Founding Members | Trek Karakoram',
  description:
    'Join the founding members of Trek Karakoram and receive exclusive benefits on 2026 and 2027 trekking expeditions across the Karakoram.',
  alternates: {
    canonical: '/founding-members',
  },
  openGraph: {
    title: 'Founding Members | Trek Karakoram',
    description:
      'Be among the first guests to trek with Trek Karakoram and receive founding member benefits for future expeditions.',
    type: 'website',
  },
};

const BENEFITS = [
  {
    icon: BadgePercent,
    title: '20% Off 2026 / 2027 Treks',
    description:
      'Founding members receive 20% off eligible Trek Karakoram expeditions during our first two seasons.',
  },
  {
    icon: Users,
    title: 'Lifetime 10% Loyalty',
    description:
      'Return to the mountains with Trek Karakoram and keep a 10% loyalty discount on future eligible treks.',
  },
  {
    icon: Gift,
    title: 'Free Trek Karakoram Merchandise',
    description:
      'Founding members receive complimentary Trek Karakoram merchandise as part of the program.',
  },
];

const FAQS = [
  {
    question: 'What is a Trek Karakoram founding member?',
    answer:
      'Founding members are among the first guests to travel with Trek Karakoram during our first season. The program recognizes those early guests and gives them benefits that continue beyond their first expedition.',
  },
  {
    question: 'Which treks qualify for the 20% discount?',
    answer:
      'The founding member discount applies to eligible Trek Karakoram departures during the 2026 and 2027 seasons. Availability and specific departure conditions may vary by expedition.',
  },
  {
    question: 'Does the loyalty discount expire?',
    answer:
      'The founding member loyalty benefit is intended to remain available for eligible future Trek Karakoram trips. Specific terms may apply to individual expeditions.',
  },
  {
    question: 'How do I become a founding member?',
    answer:
      'Start by getting in touch with Trek Karakoram through the founding member enquiry. We will confirm the available expedition, departure details, and next steps with you.',
  },
];

export default function FoundingMembersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800">

        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

          <div className="max-w-4xl">

            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                First Season · 2026
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
              Be there at the beginning.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Trek Karakoram is entering its first season. We are inviting a
              small group of early guests to become part of the story from the
              very beginning.
            </p>

            {/* Offer */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">

              <Link
                href="#benefits"
                className="group inline-flex w-full items-center justify-center gap-2 bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 sm:w-auto"
              >
                See Founding Benefits
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-900 sm:w-auto"
              >
                Ask a Question
              </Link>

            </div>

          </div>

          {/* Hero bottom metadata */}
          <div className="mt-16 grid max-w-4xl grid-cols-1 border border-slate-800 bg-slate-900/40 sm:grid-cols-3">

            <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Season
              </span>

              <span className="mt-1 block text-sm font-semibold text-white">
                2026 / 2027
              </span>
            </div>

            <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                First Guests
              </span>

              <span className="mt-1 block text-sm font-semibold text-white">
                Limited places
              </span>
            </div>

            <div className="p-5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Location
              </span>

              <span className="mt-1 block text-sm font-semibold text-white">
                Karakoram · Baltistan
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">

            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-sky-400" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
                  Why Founding Members?
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The first season matters.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base leading-8 text-slate-300 sm:text-lg">
                Every expedition company has a first group of guests. These
                are the people who take the journey before there is a long
                history of trips, photographs, and stories to point to.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-400">
                We want to recognize those guests. Founding membership is our
                way of thanking the people who choose to travel with Trek
                Karakoram at the beginning and helping us build something
                worth returning to.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section
        id="benefits"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="mb-10 max-w-2xl sm:mb-12">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-sky-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                Your Benefits
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              More than a first trip.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Founding membership gives early guests benefits that continue
              beyond their first expedition.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="border border-slate-800 bg-slate-900/70 p-6 transition-colors hover:border-slate-700 sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-sky-500 text-slate-950">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}

          </div>

          {/* Offer summary */}
          <div className="mt-6 border border-sky-500/30 bg-sky-950/20 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">
                <Crown className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" strokeWidth={2.5} />

                <div>
                  <p className="text-sm font-bold text-white">
                    {FOUNDING_MEMBERS_SPECIAL.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    20% off 2026/2027 treks + lifetime 10% loyalty +
                    complimentary merchandise.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          WHAT IT MEANS
      ========================================================= */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">

            <div className="lg:col-span-5">
              <div className="flex h-12 w-12 items-center justify-center border border-slate-700 bg-slate-800">
                <Compass className="h-5 w-5 text-sky-400" />
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Come for the mountains.
                <span className="block text-slate-500">
                  Stay for the story.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-7">

              <div className="space-y-6 text-sm leading-7 text-slate-400 sm:text-base">

                <p>
                  A founding member is not simply someone who receives a
                  discount. You are one of the first people to experience
                  Trek Karakoram as we build our reputation in the mountains.
                </p>

                <p>
                  We want those early journeys to be personal, carefully
                  organized, and honest. As our seasons grow, founding members
                  will always have a connection to the beginning.
                </p>

                <div className="border-l-2 border-sky-500 pl-5 text-slate-300">
                  Your first expedition becomes part of our history — and
                  your future journeys remain part of the story.
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          HOW TO JOIN
      ========================================================= */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-sky-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                Start Your Journey
              </span>

              <span className="h-px w-8 bg-sky-400" />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Be one of the first.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Tell us which expedition interests you and we will walk you
              through the available dates, route, requirements, and founding
              member benefits.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
              >
                Become a Founding Member
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/treks"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-900"
              >
                Explore Treks
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              Founding Member FAQ
            </span>

            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Questions, answered.
            </h2>
          </div>

          <div className="divide-y divide-slate-800 border-y border-slate-800">

            {FAQS.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="flex items-start gap-3 text-base font-semibold text-white">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                  {faq.question}
                </h3>

                <p className="mt-3 pl-7 text-sm leading-6 text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-slate-950">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="border border-slate-800 bg-slate-900 p-7 sm:p-10 lg:p-12">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-400" />

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
                    Trek Karakoram
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  The mountains are waiting.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Join the first season and become part of the story from the
                  beginning.
                </p>

              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2 bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
              >
                Be One of the First
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
 
