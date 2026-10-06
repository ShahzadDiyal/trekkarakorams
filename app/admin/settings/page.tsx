'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  Loader2,
  Globe,
  Phone,
  Share2,
  Megaphone,
  PanelTop,
  Image as ImageIcon,
  PanelBottom,
} from 'lucide-react';
import { getDocById, saveDoc, COLLECTIONS } from '@/lib/admin/db';
import type { WebsiteSettings, HeroSettings } from '@/lib/admin/types';
import { mergeSettings } from '@/lib/site-settings';
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
import { MenuEditor } from '@/components/admin/settings/MenuEditor';
import { ButtonEditor } from '@/components/admin/settings/ButtonEditor';
import { FooterColumnsEditor } from '@/components/admin/settings/FooterColumnsEditor';

const TABS = [
  { id: 'brand', label: 'Brand', icon: Globe },
  { id: 'announcement', label: 'Announcement', icon: Megaphone },
  { id: 'header', label: 'Header', icon: PanelTop },
  { id: 'hero', label: 'Hero Section', icon: ImageIcon },
  { id: 'footer', label: 'Footer', icon: PanelBottom },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'social', label: 'Social', icon: Share2 },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Form state before Firestore responds — replaced by mergeSettings() on load. */
function initialForm(): WebsiteSettings {
  const { loaded: _loaded, ...resolved } = mergeSettings(null);
  return resolved;
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<WebsiteSettings>(initialForm);
  const [tab, setTab] = useState<TabId>('brand');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const doc = await getDocById<WebsiteSettings>(COLLECTIONS.settings, 'website');
      // Show exactly what the website renders: DB values merged over defaults,
      // so existing menus/buttons/footer/hero are pre-filled and editable.
      const { loaded: _loaded, ...resolved } = mergeSettings(doc);
      setForm(resolved);
      setLoading(false);
    })();
  }, []);

  const set = <K extends keyof WebsiteSettings>(k: K, v: WebsiteSettings[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setHero = <K extends keyof HeroSettings>(k: K, v: HeroSettings[K]) =>
    setForm((f) => ({ ...f, hero: { ...f.hero, [k]: v } }));

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      await saveDoc(COLLECTIONS.settings, 'website', form);
      setMsg('Website settings saved — the live site updates on next visit.');
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
        subtitle="Brand, header, hero, footer, contact and social — everything global, in one place."
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

      {/* Section tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === id
                ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'brand' && (
        <Card className="max-w-2xl space-y-4 p-5">
          <TextField label="Site name" value={form.siteName} onChange={(e) => set('siteName', e.target.value)} />
          <TextField label="Tagline" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          <ImageUpload label="Website logo" folder="branding" value={form.logoUrl} onChange={(u) => set('logoUrl', u)} />
          <ImageUpload label="Favicon" folder="branding" value={form.faviconUrl} onChange={(u) => set('faviconUrl', u)} />
        </Card>
      )}

      {tab === 'announcement' && (
        <Card className="max-w-2xl space-y-4 p-5">
          <Toggle
            label="Announcement bar"
            hint="Show a notice bar at the very top of the website"
            checked={form.announcementBarEnabled}
            onChange={(v) => set('announcementBarEnabled', v)}
          />
          <TextField
            label="Announcement text"
            value={form.announcementBar}
            onChange={(e) => set('announcementBar', e.target.value)}
            placeholder="2026 departures now open — early bird…"
          />
        </Card>
      )}

      {tab === 'header' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="space-y-4 p-5">
            <div>
              <h2 className="font-bold text-slate-900">Navigation menus</h2>
              <p className="text-xs text-slate-500">
                Expand a menu to add sub-menus — they appear as a dropdown on the website.
              </p>
            </div>
            <MenuEditor menus={form.headerMenus} onChange={(m) => set('headerMenus', m)} />
          </Card>
          <Card className="space-y-4 p-5">
            <div>
              <h2 className="font-bold text-slate-900">Header buttons</h2>
              <p className="text-xs text-slate-500">
                Style each button: icon, colors, border, corners and font.
              </p>
            </div>
            <ButtonEditor buttons={form.headerButtons} onChange={(b) => set('headerButtons', b)} />
          </Card>
        </div>
      )}

      {tab === 'hero' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="space-y-4 p-5">
            <h2 className="font-bold text-slate-900">Background media</h2>
            <div className="flex gap-2">
              {(['image', 'video'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setHero('mediaType', t)}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    form.hero.mediaType === t
                      ? 'border-sky-600 bg-sky-50 text-sky-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-sky-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {form.hero.mediaType === 'image' ? (
              <ImageUpload
                label="Hero background image"
                folder="hero"
                value={form.hero.imageUrl}
                onChange={(u) => setHero('imageUrl', u)}
              />
            ) : (
              <>
                <ImageUpload
                  label="Hero background video — upload from your device"
                  folder="hero"
                  resourceType="video"
                  value={form.hero.videoUrl}
                  onChange={(u) => setHero('videoUrl', u)}
                />
                <ImageUpload
                  label="Video poster (shown while the video loads)"
                  folder="hero"
                  value={form.hero.posterUrl}
                  onChange={(u) => setHero('posterUrl', u)}
                />
              </>
            )}
          </Card>
          <Card className="space-y-4 p-5">
            <h2 className="font-bold text-slate-900">Hero content</h2>
            <TextField label="Badge text" value={form.hero.badge} onChange={(e) => setHero('badge', e.target.value)} />
            <TextField label="Headline" value={form.hero.headline} onChange={(e) => setHero('headline', e.target.value)} placeholder="Trek deeper into the" />
            <TextField label="Headline accent (highlighted line)" value={form.hero.headlineAccent} onChange={(e) => setHero('headlineAccent', e.target.value)} placeholder="Karakoram Mountains." />
            <TextArea label="Subheadline" rows={3} value={form.hero.subheadline} onChange={(e) => setHero('subheadline', e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Primary button text" value={form.hero.ctaPrimaryLabel} onChange={(e) => setHero('ctaPrimaryLabel', e.target.value)} />
              <TextField label="Primary button link" value={form.hero.ctaPrimaryHref} onChange={(e) => setHero('ctaPrimaryHref', e.target.value)} placeholder="/treks" />
              <TextField label="Secondary button text" value={form.hero.ctaSecondaryLabel} onChange={(e) => setHero('ctaSecondaryLabel', e.target.value)} />
              <TextField label="Secondary button link" value={form.hero.ctaSecondaryHref} onChange={(e) => setHero('ctaSecondaryHref', e.target.value)} placeholder="/booking" />
            </div>
          </Card>
        </div>
      )}

      {tab === 'footer' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="space-y-4 p-5">
            <h2 className="font-bold text-slate-900">About text</h2>
            <TextArea label="Footer about text" rows={4} value={form.footerAbout} onChange={(e) => set('footerAbout', e.target.value)} />
          </Card>
          <Card className="space-y-4 p-5">
            <div>
              <h2 className="font-bold text-slate-900">Link columns</h2>
              <p className="text-xs text-slate-500">
                These appear next to the brand column in the footer.
              </p>
            </div>
            <FooterColumnsEditor columns={form.footerColumns} onChange={(c) => set('footerColumns', c)} />
          </Card>
        </div>
      )}

      {tab === 'contact' && (
        <Card className="max-w-2xl space-y-4 p-5">
          <TextField label="Phone (display)" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+92 300 1234567" />
          <TextField label="WhatsApp number" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="923001234567 (no + or spaces)" />
          <TextField label="Email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          <TextArea label="Address" rows={2} value={form.address} onChange={(e) => set('address', e.target.value)} />
        </Card>
      )}

      {tab === 'social' && (
        <Card className="max-w-2xl space-y-4 p-5">
          <TextField label="Facebook URL" value={form.facebookUrl} onChange={(e) => set('facebookUrl', e.target.value)} placeholder="https://facebook.com/…" />
          <TextField label="Instagram URL" value={form.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} placeholder="https://instagram.com/…" />
          <TextField label="YouTube URL" value={form.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)} placeholder="https://youtube.com/…" />
          <TextField label="TikTok URL" value={form.tiktokUrl} onChange={(e) => set('tiktokUrl', e.target.value)} placeholder="https://tiktok.com/…" />
        </Card>
      )}
    </div>
  );
}
