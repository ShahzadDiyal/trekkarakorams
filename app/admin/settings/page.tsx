'use client';

import React, { useEffect, useState } from 'react';
import { Save, Loader2, Globe, Phone, Share2, Image as ImageIcon } from 'lucide-react';
import { getDocById, saveDoc, COLLECTIONS } from '@/lib/admin/db';
import type { WebsiteSettings } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  TextField,
  TextArea,
  Toggle,
  Spinner,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: WebsiteSettings = {
  siteName: '',
  tagline: '',
  logoUrl: '',
  faviconUrl: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
  tiktokUrl: '',
  footerAbout: '',
  announcementBar: '',
  announcementBarEnabled: false,
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<WebsiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const doc = await getDocById<WebsiteSettings>(COLLECTIONS.settings, 'website');
      if (doc) setForm({ ...EMPTY, ...doc });
      setLoading(false);
    })();
  }, []);

  const set = <K extends keyof WebsiteSettings>(k: K, v: WebsiteSettings[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      await saveDoc(COLLECTIONS.settings, 'website', form);
      setMsg('Website settings saved.');
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
        title="Website Settings"
        subtitle="Brand, contact details, social links and global site options."
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
        <Card className="space-y-4 p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <Globe className="h-5 w-5 text-sky-600" /> Brand
          </h2>
          <TextField label="Site name" value={form.siteName} onChange={(e) => set('siteName', e.target.value)} />
          <TextField label="Tagline" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          <ImageUpload label="Website logo" folder="branding" value={form.logoUrl} onChange={(u) => set('logoUrl', u)} />
          <ImageUpload label="Favicon" folder="branding" value={form.faviconUrl} onChange={(u) => set('faviconUrl', u)} />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <Phone className="h-5 w-5 text-sky-600" /> Contact
          </h2>
          <TextField label="Phone (display)" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+92 300 1234567" />
          <TextField label="WhatsApp number" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="923001234567 (no + or spaces)" />
          <TextField label="Email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <TextArea label="Address" rows={2} value={form.address} onChange={(e) => set('address', e.target.value)} />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <Share2 className="h-5 w-5 text-sky-600" /> Social links
          </h2>
          <TextField label="Facebook URL" value={form.facebookUrl} onChange={(e) => set('facebookUrl', e.target.value)} placeholder="https://facebook.com/…" />
          <TextField label="Instagram URL" value={form.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} placeholder="https://instagram.com/…" />
          <TextField label="YouTube URL" value={form.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)} placeholder="https://youtube.com/…" />
          <TextField label="TikTok URL" value={form.tiktokUrl} onChange={(e) => set('tiktokUrl', e.target.value)} placeholder="https://tiktok.com/…" />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <ImageIcon className="h-5 w-5 text-sky-600" /> Footer & announcements
          </h2>
          <TextArea label="Footer about text" rows={3} value={form.footerAbout} onChange={(e) => set('footerAbout', e.target.value)} />
          <Toggle
            label="Announcement bar"
            hint="Show a notice bar at the very top of the website"
            checked={form.announcementBarEnabled}
            onChange={(v) => set('announcementBarEnabled', v)}
          />
          <TextField label="Announcement text" value={form.announcementBar} onChange={(e) => set('announcementBar', e.target.value)} placeholder="2026 departures now open — early bird…" />
        </Card>
      </div>
    </div>
  );
}
