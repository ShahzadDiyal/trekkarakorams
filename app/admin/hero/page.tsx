'use client';

import React, { useEffect, useState } from 'react';
import { Save, Loader2, MonitorPlay } from 'lucide-react';
import { getDocById, saveDoc, COLLECTIONS } from '@/lib/admin/db';
import type { HeroContent } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  TextField,
  TextArea,
  SelectField,
  Toggle,
  Spinner,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: HeroContent = {
  bgType: 'image',
  bgImageUrl: '',
  bgVideoUrl: '',
  badge: '',
  headline: '',
  headlineAccent: '',
  subheadline: '',
  ctaPrimaryLabel: '',
  ctaPrimaryHref: '',
  ctaSecondaryLabel: '',
  ctaSecondaryHref: '',
};

export default function AdminHeroPage() {
  const [form, setForm] = useState<HeroContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const doc = await getDocById<HeroContent>(COLLECTIONS.hero, 'main');
      if (doc) setForm({ ...EMPTY, ...doc });
      setLoading(false);
    })();
  }, []);

  const set = <K extends keyof HeroContent>(k: K, v: HeroContent[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      await saveDoc(COLLECTIONS.hero, 'main', form);
      setMsg('Hero section saved.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Save failed.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Hero Section"
        subtitle="The big banner at the top of the homepage."
        actions={
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Save changes'}
          </PrimaryButton>
        }
      />

      {msg && (
        <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{msg}</p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
            <MonitorPlay className="h-5 w-5 text-sky-600" /> Background
          </h2>
          <div className="space-y-4">
            <SelectField
              label="Background type"
              value={form.bgType}
              onChange={(e) => set('bgType', e.target.value as 'image' | 'video')}
              options={[
                { value: 'image', label: 'Image background' },
                { value: 'video', label: 'Video background' },
              ]}
            />
            {form.bgType === 'image' ? (
              <ImageUpload label="Background image" folder="hero" value={form.bgImageUrl} onChange={(u) => set('bgImageUrl', u)} />
            ) : (
              <TextField
                label="Background video URL"
                value={form.bgVideoUrl}
                onChange={(e) => set('bgVideoUrl', e.target.value)}
                placeholder="https://…/hero.mp4 — upload to Cloudinary, then paste the URL"
              />
            )}
          </div>
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-bold text-slate-900">Headline & copy</h2>
          <TextField label="Badge text" value={form.badge} onChange={(e) => set('badge', e.target.value)} />
          <TextField label="Headline" value={form.headline} onChange={(e) => set('headline', e.target.value)} />
          <TextField label="Headline accent (colored part)" value={form.headlineAccent} onChange={(e) => set('headlineAccent', e.target.value)} />
          <TextArea label="Subheadline" rows={3} value={form.subheadline} onChange={(e) => set('subheadline', e.target.value)} />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-bold text-slate-900">Primary button</h2>
          <TextField label="Label" value={form.ctaPrimaryLabel} onChange={(e) => set('ctaPrimaryLabel', e.target.value)} />
          <TextField label="Link" value={form.ctaPrimaryHref} onChange={(e) => set('ctaPrimaryHref', e.target.value)} placeholder="/treks" />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-bold text-slate-900">Secondary button</h2>
          <TextField label="Label" value={form.ctaSecondaryLabel} onChange={(e) => set('ctaSecondaryLabel', e.target.value)} />
          <TextField label="Link" value={form.ctaSecondaryHref} onChange={(e) => set('ctaSecondaryHref', e.target.value)} placeholder="/custom-plan" />
        </Card>
      </div>
    </div>
  );
}
