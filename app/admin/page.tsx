'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Mountain,
  Newspaper,
  Users,
  MessageSquareQuote,
  HelpCircle,
  CalendarCheck,
  Contact,
  Database,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { listDocs, COLLECTIONS } from '@/lib/admin/db';
import { seedAll } from '@/lib/admin/seed';
import { Card, PageHeader, PrimaryButton, Spinner } from '@/components/admin/ui';

const CARDS = [
  { key: 'treks', label: 'Treks & Plans', href: '/admin/treks', icon: Mountain, tone: 'bg-sky-100 text-sky-700' },
  { key: 'blogs', label: 'Blog Posts', href: '/admin/blogs', icon: Newspaper, tone: 'bg-violet-100 text-violet-700' },
  { key: 'team', label: 'Team Members', href: '/admin/team', icon: Users, tone: 'bg-emerald-100 text-emerald-700' },
  { key: 'testimonials', label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote, tone: 'bg-amber-100 text-amber-700' },
  { key: 'faqs', label: 'FAQs', href: '/admin/faqs', icon: HelpCircle, tone: 'bg-rose-100 text-rose-700' },
  { key: 'bookings', label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck, tone: 'bg-indigo-100 text-indigo-700' },
  { key: 'customers', label: 'Customers', href: '/admin/customers', icon: Contact, tone: 'bg-teal-100 text-teal-700' },
] as const;

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  useEffect(() => {
    (async () => {
      const entries = await Promise.all(
        CARDS.map(async (c) => {
          try {
            const docs = await listDocs(COLLECTIONS[c.key as keyof typeof COLLECTIONS]);
            return [c.key, docs.length] as const;
          } catch {
            return [c.key, 0] as const;
          }
        })
      );
      setCounts(Object.fromEntries(entries));
      setLoading(false);
    })();
  }, []);

  const runSeed = async () => {
    setSeeding(true);
    setSeedMsg('');
    try {
      await seedAll();
      setSeedMsg('Website content imported into the database successfully.');
      const entries = await Promise.all(
        CARDS.map(async (c) => {
          try {
            const docs = await listDocs(COLLECTIONS[c.key as keyof typeof COLLECTIONS]);
            return [c.key, docs.length] as const;
          } catch {
            return [c.key, 0] as const;
          }
        })
      );
      setCounts(Object.fromEntries(entries));
    } catch (e) {
      setSeedMsg(e instanceof Error ? e.message : 'Import failed.');
    }
    setSeeding(false);
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Manage every part of trekkarakoram.com from here — no code changes needed."
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.key} href={c.href}>
                <Card className="group flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
                  <span className={`rounded-xl p-3 ${c.tone}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-3xl font-bold text-slate-900">
                      {counts[c.key] ?? 0}
                    </span>
                    <span className="block text-sm font-medium text-slate-500">{c.label}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-sky-600" />
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      <Card className="mt-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Import current website content</h2>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Copies the site&apos;s existing treks, blogs, team, testimonials, FAQs, hero and
                settings into the database so you can manage them here. Safe to run again — it
                updates rather than duplicates.
              </p>
              {seedMsg && <p className="mt-2 text-sm font-semibold text-emerald-700">{seedMsg}</p>}
            </div>
          </div>
          <PrimaryButton onClick={runSeed} disabled={seeding} className="shrink-0">
            {seeding && <Loader2 className="h-4 w-4 animate-spin" />}
            {seeding ? 'Importing…' : 'Import website data'}
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}
