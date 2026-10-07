'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Images,
  ArrowUp,
  ArrowDown,
  Loader2,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import {
  listDocs,
  createDoc,
  saveDoc,
  deleteDocById,
  COLLECTIONS,
} from '@/lib/admin/db';
import type {
  AdminGalleryItem,
  AdminTrek,
  GalleryItemType,
} from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  SelectField,
  Toggle,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  Badge,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: AdminGalleryItem = {
  id: '',
  type: 'post',
  title: '',
  description: '',
  mediaUrl: '',
  thumbnailUrl: '',
  location: '',
  trekId: '',
  reactions: {},
  published: true,
  order: 0,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [treks, setTreks] = useState<AdminTrek[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminGalleryItem | null>(null);
  const [deleting, setDeleting] = useState<AdminGalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | GalleryItemType>('all');

  const load = async () => {
    setLoading(true);
    try {
      const [docs, trekDocs] = await Promise.all([
        listDocs<AdminGalleryItem>(COLLECTIONS.gallery),
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

  const openNew = (type: GalleryItemType = 'post') =>
    setEditing({ ...EMPTY, type, order: items.length });
  const openEdit = (g: AdminGalleryItem) =>
    setEditing({ ...g, reactions: g.reactions ?? {} });

  const save = async () => {
    if (!editing || !editing.mediaUrl.trim()) return;
    setSaving(true);
    try {
      const payload = { ...editing };
      if (editing.id) {
        const { id, ...data } = payload;
        await saveDoc(COLLECTIONS.gallery, id, data);
      } else {
        const { id, ...data } = payload;
        await createDoc(COLLECTIONS.gallery, data);
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
    await deleteDocById(COLLECTIONS.gallery, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const ordered = visible;
    const other = index + dir;
    if (other < 0 || other >= ordered.length) return;
    const a = ordered[index];
    const b = ordered[other];
    setBusy(true);
    try {
      await saveDoc(COLLECTIONS.gallery, a.id, { order: b.order });
      await saveDoc(COLLECTIONS.gallery, b.id, { order: a.order });
      load();
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (g: AdminGalleryItem) => {
    setBusy(true);
    try {
      await saveDoc(COLLECTIONS.gallery, g.id, {
        published: !(g.published !== false),
      });
      load();
    } finally {
      setBusy(false);
    }
  };

  const set = <K extends keyof AdminGalleryItem>(k: K, v: AdminGalleryItem[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  const visible =
    typeFilter === 'all' ? items : items.filter((i) => i.type === typeFilter);

  const reactionTotal = (g: AdminGalleryItem) =>
    Object.values(g.reactions ?? {}).reduce((a, b) => a + b, 0);

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle={`${items.length} items. Posts and reels published here appear on the website /gallery page.`}
        actions={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => openNew('reel')}>
              <Film className="h-4 w-4" /> Add reel
            </SecondaryButton>
            <PrimaryButton onClick={() => openNew('post')}>
              <Plus className="h-4 w-4" /> Add post
            </PrimaryButton>
          </div>
        }
      />

      <div className="mb-4 flex gap-2">
        {(['all', 'post', 'reel'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              typeFilter === t
                ? 'bg-sky-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t === 'all' ? 'All' : t === 'post' ? 'Posts' : 'Reels'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<Images className="h-10 w-10" />}
          title={items.length === 0 ? 'No gallery items yet' : 'Nothing here'}
          hint="Upload trekking photos as posts and short clips as reels — they'll show on the website gallery."
          action={
            <PrimaryButton onClick={() => openNew('post')}>
              <Plus className="h-4 w-4" /> Add post
            </PrimaryButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((g) => {
            const idx = visible.indexOf(g);
            return (
              <Card key={g.id} className="overflow-hidden">
                <div className="relative flex h-44 items-center justify-center bg-slate-950">
                  {g.type === 'reel' ? (
                    g.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.thumbnailUrl} alt={g.title} className="h-full w-full object-cover" />
                    ) : (
                      <video src={g.mediaUrl} className="h-full w-full object-cover" preload="metadata" muted />
                    )
                  ) : g.mediaUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={g.mediaUrl} alt={g.title} className="h-full w-full object-cover" />
                  ) : (
                    <Images className="h-10 w-10 text-slate-600" />
                  )}
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge tone="sky">
                      {g.type === 'reel' ? 'Reel' : 'Post'}
                    </Badge>
                    <Badge tone={g.published !== false ? 'green' : 'slate'}>
                      {g.published !== false ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  {reactionTotal(g) > 0 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-xs font-bold text-white">
                      ❤️ {reactionTotal(g)}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="truncate font-bold text-slate-900">
                    {g.title || '(untitled)'}
                  </h3>
                  {g.location && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                      {g.location}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0 || busy}
                      className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-sky-300 hover:text-sky-600 disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => move(idx, 1)}
                      disabled={idx === visible.length - 1 || busy}
                      className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-sky-300 hover:text-sky-600 disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <SecondaryButton onClick={() => togglePublished(g)} className="flex-1">
                      {g.published !== false ? 'Unpublish' : 'Publish'}
                    </SecondaryButton>
                    <SecondaryButton onClick={() => openEdit(g)} className="flex-1">
                      <Pencil className="h-4 w-4" /> Edit
                    </SecondaryButton>
                    <button
                      onClick={() => setDeleting(g)}
                      className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit gallery item' : `Add ${editing?.type === 'reel' ? 'reel' : 'post'}`}
        wide
        dismissable={false}
      >
        {editing && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(['post', 'reel'] as GalleryItemType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('type', t)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                    editing.type === t
                      ? 'border-sky-600 bg-sky-50 text-sky-800'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-sky-300'
                  }`}
                >
                  {t === 'post' ? <ImageIcon className="h-4 w-4" /> : <Film className="h-4 w-4" />}
                  {t === 'post' ? 'Post (photo)' : 'Reel (video)'}
                </button>
              ))}
            </div>

            <TextField
              label="Title"
              value={editing.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Sunrise over K2 from Concordia"
            />
            <TextArea
              label="Description"
              rows={3}
              value={editing.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Tell the story behind this moment…"
            />

            <ImageUpload
              label={editing.type === 'reel' ? 'Video file' : 'Photo'}
              folder="gallery"
              resourceType={editing.type === 'reel' ? 'video' : 'image'}
              value={editing.mediaUrl}
              onChange={(u) => set('mediaUrl', u)}
            />
            {editing.type === 'reel' && (
              <ImageUpload
                label="Cover thumbnail (optional)"
                folder="gallery"
                resourceType="image"
                value={editing.thumbnailUrl}
                onChange={(u) => set('thumbnailUrl', u)}
              />
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                label="Location"
                value={editing.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="Concordia, Baltoro"
              />
              <SelectField
                label="Linked trek (optional)"
                value={editing.trekId}
                onChange={(e) => set('trekId', e.target.value)}
                options={[
                  { value: '', label: '— None —' },
                  ...treks.map((t) => ({ value: t.id, label: t.title })),
                ]}
              />
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
              <PrimaryButton onClick={save} disabled={saving || !editing.mediaUrl.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save item'}
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
        title="Delete gallery item"
        message={`Remove "${deleting?.title || 'this item'}" permanently? This cannot be undone.`}
      />
    </div>
  );
}
