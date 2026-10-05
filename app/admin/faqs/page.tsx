'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { listDocs, createDoc, saveDoc, deleteDocById, COLLECTIONS } from '@/lib/admin/db';
import type { AdminFaq } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  SelectField,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  Badge,
} from '@/components/admin/ui';

const CATEGORIES = ['Visa & Permits', 'Fitness & Altitude', 'Logistics & Safety', 'Booking & Payment', 'General'];

const EMPTY: AdminFaq = { id: '', category: 'General', question: '', answer: '', order: 0 };

export default function AdminFaqsPage() {
  const [items, setItems] = useState<AdminFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminFaq | null>(null);
  const [deleting, setDeleting] = useState<AdminFaq | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('All');

  const load = async () => {
    setLoading(true);
    try {
      const docs = await listDocs<AdminFaq>(COLLECTIONS.faqs);
      setItems(docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing || !editing.question.trim()) return;
    setSaving(true);
    try {
      if (editing.id) {
        const { id, ...data } = editing;
        await saveDoc(COLLECTIONS.faqs, id, data);
      } else {
        const { id, ...data } = editing;
        await createDoc(COLLECTIONS.faqs, data);
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
    await deleteDocById(COLLECTIONS.faqs, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const set = <K extends keyof AdminFaq>(k: K, v: AdminFaq[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  const shown = filter === 'All' ? items : items.filter((f) => f.category === filter);

  return (
    <div>
      <PageHeader
        title="FAQs"
        subtitle={`${items.length} questions & answers.`}
        actions={
          <PrimaryButton onClick={() => setEditing({ ...EMPTY, order: items.length })}>
            <Plus className="h-4 w-4" /> Add FAQ
          </PrimaryButton>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              filter === c ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 border border-slate-300 hover:border-sky-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : shown.length === 0 ? (
        <EmptyState
          icon={<HelpCircle className="h-10 w-10" />}
          title="No FAQs here yet"
          hint="Add frequently asked questions, or import the website's existing ones from the Dashboard."
          action={
            <PrimaryButton onClick={() => setEditing({ ...EMPTY, order: items.length })}>
              <Plus className="h-4 w-4" /> Add FAQ
            </PrimaryButton>
          }
        />
      ) : (
        <div className="space-y-3">
          {shown.map((f) => (
            <Card key={f.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Badge tone="sky">{f.category}</Badge>
                  <p className="mt-2 font-bold text-slate-900">{f.question}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditing({ ...f })}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:bg-slate-50 hover:text-sky-700"
                    aria-label="Edit FAQ"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleting(f)}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete FAQ"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit FAQ' : 'Add FAQ'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Category"
                value={editing.category}
                onChange={(e) => set('category', e.target.value)}
                options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
              <TextField label="Display order" type="number" value={editing.order} onChange={(e) => set('order', Number(e.target.value))} />
            </div>
            <TextField label="Question" value={editing.question} onChange={(e) => set('question', e.target.value)} placeholder="What should trekkers know?" />
            <TextArea label="Answer" rows={5} value={editing.answer} onChange={(e) => set('answer', e.target.value)} />
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={save} disabled={saving || !editing.question.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save FAQ'}
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
        title="Delete FAQ"
        message="Delete this question and answer? This cannot be undone."
      />
    </div>
  );
}
