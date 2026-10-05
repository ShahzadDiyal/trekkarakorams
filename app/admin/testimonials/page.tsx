'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, MessageSquareQuote, Star, Loader2, BadgeCheck } from 'lucide-react';
import { listDocs, createDoc, saveDoc, deleteDocById, patchDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminTestimonial } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  Badge,
  Toggle,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: AdminTestimonial = {
  id: '',
  name: '',
  country: '',
  avatar: '',
  trekTaken: '',
  date: '',
  rating: 5,
  review: '',
  verified: true,
};

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < n ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </span>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminTestimonial | null>(null);
  const [deleting, setDeleting] = useState<AdminTestimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await listDocs<AdminTestimonial>(COLLECTIONS.testimonials));
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing || !editing.name.trim()) return;
    setSaving(true);
    try {
      if (editing.id) {
        const { id, ...data } = editing;
        await saveDoc(COLLECTIONS.testimonials, id, data);
      } else {
        const { id, ...data } = editing;
        await createDoc(COLLECTIONS.testimonials, data);
      }
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleVerified = async (t: AdminTestimonial) => {
    await patchDoc(COLLECTIONS.testimonials, t.id, { verified: !t.verified });
    setItems(items.map((x) => (x.id === t.id ? { ...x, verified: !x.verified } : x)));
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    await deleteDocById(COLLECTIONS.testimonials, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const set = <K extends keyof AdminTestimonial>(k: K, v: AdminTestimonial[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle={`${items.length} trekker reviews.`}
        actions={
          <PrimaryButton onClick={() => setEditing({ ...EMPTY })}>
            <Plus className="h-4 w-4" /> Add testimonial
          </PrimaryButton>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<MessageSquareQuote className="h-10 w-10" />}
          title="No testimonials yet"
          hint="Add trekker reviews, or import the website's existing ones from the Dashboard."
          action={
            <PrimaryButton onClick={() => setEditing({ ...EMPTY })}>
              <Plus className="h-4 w-4" /> Add testimonial
            </PrimaryButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((t) => (
            <Card key={t.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    {t.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 font-bold text-slate-900">
                      {t.name}
                      {t.verified && <BadgeCheck className="h-4 w-4 text-sky-600" />}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.country} · {t.trekTaken} · {t.date}
                    </p>
                  </div>
                </div>
                <Stars n={t.rating} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">“{t.review}”</p>
              <div className="mt-4 flex items-center gap-2">
                <SecondaryButton onClick={() => setEditing({ ...t })} className="flex-1">
                  <Pencil className="h-4 w-4" /> Edit
                </SecondaryButton>
                <button
                  onClick={() => toggleVerified(t)}
                  className="rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t.verified ? 'Unverify' : 'Verify'}
                </button>
                <button
                  onClick={() => setDeleting(t)}
                  className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete testimonial"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit testimonial' : 'Add testimonial'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Name" value={editing.name} onChange={(e) => set('name', e.target.value)} />
              <TextField label="Country" value={editing.country} onChange={(e) => set('country', e.target.value)} />
              <TextField label="Trek taken" value={editing.trekTaken} onChange={(e) => set('trekTaken', e.target.value)} />
              <TextField label="Date" value={editing.date} onChange={(e) => set('date', e.target.value)} placeholder="July 2025" />
              <TextField label="Rating (1–5)" type="number" min={1} max={5} value={editing.rating} onChange={(e) => set('rating', Math.min(5, Math.max(1, Number(e.target.value))))} />
            </div>
            <ImageUpload label="Avatar photo" folder="testimonials" value={editing.avatar} onChange={(u) => set('avatar', u)} />
            <TextArea label="Review" rows={4} value={editing.review} onChange={(e) => set('review', e.target.value)} />
            <Toggle label="Verified trekker" hint="Show the verified badge next to this review" checked={editing.verified} onChange={(v) => set('verified', v)} />
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={save} disabled={saving || !editing.name.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save testimonial'}
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
        title="Delete testimonial"
        message={`Delete the review from "${deleting?.name}"? This cannot be undone.`}
      />
    </div>
  );
}
