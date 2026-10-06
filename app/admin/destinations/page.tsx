'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  ArrowUp,
  ArrowDown,
  Loader2,
} from 'lucide-react';
import {
  listDocs,
  createDoc,
  saveDoc,
  deleteDocById,
  COLLECTIONS,
} from '@/lib/admin/db';
import type { AdminDestination, AdminTrek } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  Toggle,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  Badge,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: AdminDestination = {
  id: '',
  slug: '',
  name: '',
  mountainRange: '',
  tagline: '',
  image: '',
  overview: '',
  keyPeaks: [],
  bestMonths: '',
  hubCity: '',
  accessAirport: '',
  highlights: [],
  matchedTrekIds: [],
  published: true,
  order: 0,
};

/** One item per line <-> string[] helpers for the editor. */
const linesToText = (arr: string[]) => arr.join('\n');
const textToLines = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<AdminDestination[]>([]);
  const [treks, setTreks] = useState<AdminTrek[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminDestination | null>(null);
  const [deleting, setDeleting] = useState<AdminDestination | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  // Textarea drafts for list fields (converted to arrays on save).
  const [peaksText, setPeaksText] = useState('');
  const [highlightsText, setHighlightsText] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [docs, trekDocs] = await Promise.all([
        listDocs<AdminDestination>(COLLECTIONS.destinations),
        listDocs<AdminTrek>(COLLECTIONS.treks),
      ]);
      setItems(docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      setTreks(trekDocs);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing({ ...EMPTY, order: items.length });
    setPeaksText('');
    setHighlightsText('');
  };

  const openEdit = (d: AdminDestination) => {
    setEditing({ ...d });
    setPeaksText(linesToText(d.keyPeaks ?? []));
    setHighlightsText(linesToText(d.highlights ?? []));
  };

  const save = async () => {
    if (!editing || !editing.name.trim()) return;
    const slug = editing.slug.trim() || slugify(editing.name);
    if (!slug) return;
    setSaving(true);
    try {
      const payload = {
        ...editing,
        slug,
        keyPeaks: textToLines(peaksText),
        highlights: textToLines(highlightsText),
      };
      if (editing.id) {
        const { id, ...data } = payload;
        await saveDoc(COLLECTIONS.destinations, id, data);
      } else {
        const { id, ...data } = payload;
        await createDoc(COLLECTIONS.destinations, data);
      }
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    await deleteDocById(COLLECTIONS.destinations, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  /** Swap display order with the adjacent item. */
  const move = async (index: number, dir: -1 | 1) => {
    const other = index + dir;
    if (other < 0 || other >= items.length) return;
    const a = items[index];
    const b = items[other];
    setBusy(true);
    try {
      await saveDoc(COLLECTIONS.destinations, a.id, { order: b.order });
      await saveDoc(COLLECTIONS.destinations, b.id, { order: a.order });
      load();
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (d: AdminDestination) => {
    setBusy(true);
    try {
      await saveDoc(COLLECTIONS.destinations, d.id, {
        published: !(d.published !== false),
      });
      load();
    } finally {
      setBusy(false);
    }
  };

  const set = <K extends keyof AdminDestination>(k: K, v: AdminDestination[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  const toggleTrek = (trekId: string) =>
    setEditing((f) => {
      if (!f) return f;
      const ids = f.matchedTrekIds ?? [];
      return {
        ...f,
        matchedTrekIds: ids.includes(trekId)
          ? ids.filter((t) => t !== trekId)
          : [...ids, trekId],
      };
    });

  return (
    <div>
      <PageHeader
        title="Destinations"
        subtitle={`${items.length} regions. These power the Explore by Region tabs and /destinations pages.`}
        actions={
          <PrimaryButton onClick={openNew}>
            <Plus className="h-4 w-4" /> Add destination
          </PrimaryButton>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<MapPin className="h-10 w-10" />}
          title="No destinations yet"
          hint="Add your first mountain region, or import the current list from the Dashboard."
          action={
            <PrimaryButton onClick={openNew}>
              <Plus className="h-4 w-4" /> Add destination
            </PrimaryButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((d, i) => (
            <Card key={d.id} className="overflow-hidden">
              <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-sky-100 to-slate-200">
                {d.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
                ) : (
                  <MapPin className="h-10 w-10 text-sky-300" />
                )}
                <div className="absolute left-3 top-3">
                  <Badge tone={d.published !== false ? 'green' : 'slate'}>
                    {d.published !== false ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{d.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {d.mountainRange}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  /destinations/{d.slug || d.id}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0 || busy}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-sky-300 hover:text-sky-600 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1 || busy}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-sky-300 hover:text-sky-600 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <SecondaryButton onClick={() => togglePublished(d)} className="flex-1">
                    {d.published !== false ? 'Unpublish' : 'Publish'}
                  </SecondaryButton>
                  <SecondaryButton onClick={() => openEdit(d)} className="flex-1">
                    <Pencil className="h-4 w-4" /> Edit
                  </SecondaryButton>
                  <button
                    onClick={() => setDeleting(d)}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete destination"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit destination' : 'Add destination'}
        wide
      >
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Name"
                value={editing.name}
                onChange={(e) => {
                  set('name', e.target.value);
                  if (!editing.id) set('slug', slugify(e.target.value));
                }}
                placeholder="Hunza & Nagar Valleys"
              />
              <TextField
                label="URL slug"
                value={editing.slug}
                onChange={(e) => set('slug', slugify(e.target.value))}
                placeholder="hunza-nagar"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Mountain range"
                value={editing.mountainRange}
                onChange={(e) => set('mountainRange', e.target.value)}
                placeholder="Central & Western Karakoram"
              />
              <TextField
                label="Hub city"
                value={editing.hubCity}
                onChange={(e) => set('hubCity', e.target.value)}
                placeholder="Karimabad / Aliabad"
              />
            </div>
            <TextField
              label="Tagline"
              value={editing.tagline}
              onChange={(e) => set('tagline', e.target.value)}
              placeholder="Ancient Silk Road Kingdoms, Hanging Glaciers & Vibrant Orchards"
            />
            <ImageUpload
              label="Cover image"
              folder="destinations"
              value={editing.image}
              onChange={(u) => set('image', u)}
            />
            <TextArea
              label="Overview"
              rows={4}
              value={editing.overview}
              onChange={(e) => set('overview', e.target.value)}
              placeholder="Describe the region…"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextArea
                label="Key peaks (one per line)"
                rows={4}
                value={peaksText}
                onChange={(e) => setPeaksText(e.target.value)}
                placeholder={'Rakaposhi (7,788m)\nDiran Peak (7,266m)'}
              />
              <TextArea
                label="Highlights (one per line)"
                rows={4}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder={'Rush Lake (4,694m)\nBaltit Fort'}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Best months"
                value={editing.bestMonths}
                onChange={(e) => set('bestMonths', e.target.value)}
                placeholder="April to October"
              />
              <TextField
                label="Access airport"
                value={editing.accessAirport}
                onChange={(e) => set('accessAirport', e.target.value)}
                placeholder="Gilgit Airport (45 min flight from Islamabad)"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Featured treks <span className="font-normal text-slate-500">(shown in this region)</span>
              </p>
              {treks.length === 0 ? (
                <p className="text-xs text-slate-500">No treks in the database yet.</p>
              ) : (
                <div className="grid max-h-48 grid-cols-1 gap-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                  {treks.map((t) => {
                    const checked = (editing.matchedTrekIds ?? []).includes(t.id);
                    return (
                      <label
                        key={t.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          checked
                            ? 'border-sky-500 bg-sky-50 font-semibold text-sky-900'
                            : 'border-transparent bg-white text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTrek(t.id)}
                          className="h-4 w-4 accent-sky-600"
                        />
                        <span className="truncate">{t.title}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Display order"
                type="number"
                value={editing.order}
                onChange={(e) => set('order', Number(e.target.value))}
              />
              <Toggle
                label="Published"
                hint="Hidden from the website while off."
                checked={editing.published !== false}
                onChange={(v) => set('published', v)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={save} disabled={saving || !editing.name.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save destination'}
              </PrimaryButton>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        busy={busy}
        title="Delete destination"
        message={`Remove "${deleting?.name}" permanently? Its /destinations URL will stop working. This cannot be undone.`}
      />
    </div>
  );
}
