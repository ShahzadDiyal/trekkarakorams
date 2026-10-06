'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { getDocById, createDoc, saveDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminTrek, PricingTier } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  SelectField,
  Toggle,
  ListEditor,
  Spinner,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { GalleryUpload } from '@/components/admin/GalleryUpload';

const DEFAULT_TIERS: PricingTier[] = [
  { name: 'Basic', priceUSD: 0, singleSupplementUSD: 0, note: '' },
  { name: 'Standard', priceUSD: 0, singleSupplementUSD: 0, note: '' },
  { name: 'Premium', priceUSD: 0, singleSupplementUSD: 0, note: '' },
];

const EMPTY: AdminTrek = {
  id: '',
  title: '',
  shortTitle: '',
  tagline: '',
  region: 'Karakoram',
  startingCity: 'Skardu',
  durationDays: 12,
  durationNights: 11,
  difficulty: 'Challenging',
  maxAltitude: 5000,
  priceUSD: 2000,
  discountPriceUSD: 0,
  rating: 5,
  reviewsCount: 0,
  featured: false,
  popular: false,
  published: true,
  bestSeason: 'June – September',
  groupSize: '2–8 trekkers',
  image: '',
  gallery: [],
  overview: '',
  highlights: [],
  itinerary: [],
  inclusions: [],
  exclusions: [],
  permitRequirements: '',
  fitnessLevel: '',
  faqs: [],
  pricingTiers: DEFAULT_TIERS,
};

export default function TrekEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolved, setResolved] = useState<{ id: string } | null>(null);
  const [form, setForm] = useState<AdminTrek>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then(setResolved);
  }, [params]);

  useEffect(() => {
    if (!resolved) return;
    if (resolved.id === 'new') {
      setLoading(false);
      return;
    }
    (async () => {
      const doc = await getDocById<AdminTrek>(COLLECTIONS.treks, resolved.id);
      if (doc) {
        setForm({
          ...EMPTY,
          ...doc,
          // Backfill fields added after the doc was created.
          itinerary: (doc.itinerary ?? []).map((d) => ({ ...d, timing: d.timing ?? '' })),
          faqs: doc.faqs ?? [],
          pricingTiers:
            doc.pricingTiers && doc.pricingTiers.length > 0 ? doc.pricingTiers : DEFAULT_TIERS,
        });
      }
      setLoading(false);
    })();
  }, [resolved]);

  const set = <K extends keyof AdminTrek>(k: K, v: AdminTrek[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (resolved?.id === 'new') {
        await createDoc(COLLECTIONS.treks, (({ id, ...rest }) => rest)(form));
      } else if (resolved) {
        const { id, ...data } = form;
        await saveDoc(COLLECTIONS.treks, resolved.id, data);
      }
      router.push('/admin/treks');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const isNew = resolved?.id === 'new';

  return (
    <div>
      <PageHeader
        title={isNew ? 'New trek' : 'Edit trek'}
        actions={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" /> Back
            </SecondaryButton>
            <PrimaryButton onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving…' : 'Save trek'}
            </PrimaryButton>
          </div>
        }
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Basics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField label="Title" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="K2 Base Camp & Gondogoro La Pass Trek" />
              </div>
              <TextField label="Short title" value={form.shortTitle} onChange={(e) => set('shortTitle', e.target.value)} />
              <TextField label="Tagline" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
              <TextField label="Region" value={form.region} onChange={(e) => set('region', e.target.value)} />
              <TextField label="Starting city" value={form.startingCity} onChange={(e) => set('startingCity', e.target.value)} />
              <SelectField
                label="Difficulty"
                value={form.difficulty}
                onChange={(e) => set('difficulty', e.target.value)}
                options={['Easy', 'Moderate', 'Challenging', 'Strenuous', 'Expedition'].map((d) => ({ value: d, label: d }))}
              />
              <TextField label="Best season" value={form.bestSeason} onChange={(e) => set('bestSeason', e.target.value)} />
              <TextField label="Group size" value={form.groupSize} onChange={(e) => set('groupSize', e.target.value)} />
              <TextField label="Fitness level" value={form.fitnessLevel} onChange={(e) => set('fitnessLevel', e.target.value)} />
            </div>
            <div className="mt-4">
              <TextArea label="Overview" rows={5} value={form.overview} onChange={(e) => set('overview', e.target.value)} />
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Pricing & facts</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <TextField label="Duration (days)" type="number" value={form.durationDays} onChange={(e) => set('durationDays', Number(e.target.value))} />
              <TextField label="Nights" type="number" value={form.durationNights} onChange={(e) => set('durationNights', Number(e.target.value))} />
              <TextField label="Max altitude (m)" type="number" value={form.maxAltitude} onChange={(e) => set('maxAltitude', Number(e.target.value))} />
              <TextField label="Price (USD)" type="number" value={form.priceUSD} onChange={(e) => set('priceUSD', Number(e.target.value))} />
              <TextField label="Discount price (USD)" type="number" value={form.discountPriceUSD ?? 0} onChange={(e) => set('discountPriceUSD', Number(e.target.value))} />
              <TextField label="Rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', Number(e.target.value))} />
              <TextField label="Reviews count" type="number" value={form.reviewsCount} onChange={(e) => set('reviewsCount', Number(e.target.value))} />
            </div>
            <div className="mt-4">
              <TextArea label="Permit requirements" rows={3} value={form.permitRequirements} onChange={(e) => set('permitRequirements', e.target.value)} />
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="mb-1 text-sm font-bold text-slate-900">Pricing tiers</h3>
              <p className="mb-3 text-xs text-slate-500">
                Each tier gets its own expedition cost and single supplement (shown as a tier selector on the trek page).
              </p>
              <div className="space-y-3">
                {form.pricingTiers.map((t, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Tier {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => set('pricingTiers', form.pricingTiers.filter((_, j) => j !== i))}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        aria-label="Remove tier"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <input
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
                        placeholder="Tier name (Basic)"
                        value={t.name}
                        onChange={(e) => {
                          const next = [...form.pricingTiers];
                          next[i] = { ...next[i], name: e.target.value };
                          set('pricingTiers', next);
                        }}
                      />
                      <label className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
                        <span className="text-slate-400">$</span>
                        <input
                          type="number"
                          min="0"
                          className="w-full bg-transparent outline-none"
                          placeholder="Expedition cost"
                          value={t.priceUSD || ''}
                          onChange={(e) => {
                            const next = [...form.pricingTiers];
                            next[i] = { ...next[i], priceUSD: Number(e.target.value) };
                            set('pricingTiers', next);
                          }}
                        />
                        <span className="shrink-0 text-xs text-slate-400">/ person</span>
                      </label>
                      <label className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
                        <span className="text-slate-400">$</span>
                        <input
                          type="number"
                          min="0"
                          className="w-full bg-transparent outline-none"
                          placeholder="Single supplement"
                          value={t.singleSupplementUSD || ''}
                          onChange={(e) => {
                            const next = [...form.pricingTiers];
                            next[i] = { ...next[i], singleSupplementUSD: Number(e.target.value) };
                            set('pricingTiers', next);
                          }}
                        />
                      </label>
                    </div>
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      placeholder="Note (e.g. Founding Member 20% discount included.)"
                      value={t.note}
                      onChange={(e) => {
                        const next = [...form.pricingTiers];
                        next[i] = { ...next[i], note: e.target.value };
                        set('pricingTiers', next);
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    set('pricingTiers', [
                      ...form.pricingTiers,
                      { name: '', priceUSD: 0, singleSupplementUSD: 0, note: '' },
                    ])
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-700"
                >
                  <Plus className="h-4 w-4" /> Add pricing tier
                </button>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Day-by-day itinerary</h2>
            <div className="space-y-3">
              {form.itinerary.map((d, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stop {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => set('itinerary', form.itinerary.filter((_, j) => j !== i))}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Remove stop"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      placeholder="Day 1"
                      value={d.day}
                      onChange={(e) => {
                        const next = [...form.itinerary];
                        next[i] = { ...next[i], day: e.target.value };
                        set('itinerary', next);
                      }}
                    />
                    <input
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      placeholder="Timing (e.g. 4 hours trekking)"
                      value={d.timing ?? ''}
                      onChange={(e) => {
                        const next = [...form.itinerary];
                        next[i] = { ...next[i], timing: e.target.value };
                        set('itinerary', next);
                      }}
                    />
                  </div>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Stop title"
                    value={d.title}
                    onChange={(e) => {
                      const next = [...form.itinerary];
                      next[i] = { ...next[i], title: e.target.value };
                      set('itinerary', next);
                    }}
                  />
                  <textarea
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    rows={2}
                    placeholder="Description…"
                    value={d.description}
                    onChange={(e) => {
                      const next = [...form.itinerary];
                      next[i] = { ...next[i], description: e.target.value };
                      set('itinerary', next);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => set('itinerary', [...form.itinerary, { day: '', title: '', description: '', timing: '' }])}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-700"
              >
                <Plus className="h-4 w-4" /> Add itinerary stop
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-1 font-bold text-slate-900">Trek FAQs</h2>
            <p className="mb-4 text-xs text-slate-500">
              Questions specific to this trek — shown in an accordion on the trek detail page.
            </p>
            <div className="space-y-3">
              {form.faqs.map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">FAQ {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => set('faqs', form.faqs.filter((_, j) => j !== i))}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Remove FAQ"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
                    placeholder="Question"
                    value={f.question}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[i] = { ...next[i], question: e.target.value };
                      set('faqs', next);
                    }}
                  />
                  <textarea
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Answer…"
                    value={f.answer}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[i] = { ...next[i], answer: e.target.value };
                      set('faqs', next);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => set('faqs', [...form.faqs, { question: '', answer: '' }])}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-700"
              >
                <Plus className="h-4 w-4" /> Add FAQ
              </button>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className="p-5">
              <ListEditor label="Highlights" values={form.highlights} onChange={(v) => set('highlights', v)} />
            </Card>
            <Card className="p-5">
              <ListEditor label="Inclusions" values={form.inclusions} onChange={(v) => set('inclusions', v)} />
            </Card>
            <Card className="p-5">
              <ListEditor label="Exclusions" values={form.exclusions} onChange={(v) => set('exclusions', v)} />
            </Card>
            <Card className="p-5">
              <GalleryUpload label="Gallery images" values={form.gallery} onChange={(v) => set('gallery', v)} folder="treks/gallery" />
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Cover image</h2>
            <ImageUpload label="Main image" folder="treks" value={form.image} onChange={(u) => set('image', u)} />
          </Card>
          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Visibility</h2>
            <div className="space-y-3">
              <Toggle label="Published" hint="Visible in the admin lists as published" checked={form.published} onChange={(v) => set('published', v)} />
              <Toggle label="Featured" hint="Show in featured sections" checked={form.featured} onChange={(v) => set('featured', v)} />
              <Toggle label="Popular" hint="Show in popular sections" checked={form.popular} onChange={(v) => set('popular', v)} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
