'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Contact, Loader2, Phone, Mail } from 'lucide-react';
import { listDocs, createDoc, saveDoc, deleteDocById, COLLECTIONS } from '@/lib/admin/db';
import type { AdminCustomer } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  ListEditor,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  Badge,
} from '@/components/admin/ui';

const EMPTY: AdminCustomer = {
  id: '',
  name: '',
  email: '',
  phone: '',
  country: '',
  notes: '',
  tags: [],
  totalTrips: 0,
  createdAt: '',
};

export default function AdminCustomersPage() {
  const [items, setItems] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminCustomer | null>(null);
  const [deleting, setDeleting] = useState<AdminCustomer | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      setItems(await listDocs<AdminCustomer>(COLLECTIONS.customers));
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
        await saveDoc(COLLECTIONS.customers, id, data);
      } else {
        const { id, createdAt, ...data } = editing;
        await createDoc(COLLECTIONS.customers, { ...data, createdAt: new Date().toISOString().slice(0, 10) });
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
    await deleteDocById(COLLECTIONS.customers, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const set = <K extends keyof AdminCustomer>(k: K, v: AdminCustomer[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  const shown = items.filter((c) =>
    `${c.name} ${c.email} ${c.country}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle={`${items.length} customers in your database.`}
        actions={
          <PrimaryButton onClick={() => setEditing({ ...EMPTY })}>
            <Plus className="h-4 w-4" /> Add customer
          </PrimaryButton>
        }
      />

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or country…"
          className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : shown.length === 0 ? (
        <EmptyState
          icon={<Contact className="h-10 w-10" />}
          title={search ? 'No customers match your search' : 'No customers yet'}
          hint="Add customers manually as they book, or import them later."
          action={
            !search ? (
              <PrimaryButton onClick={() => setEditing({ ...EMPTY })}>
                <Plus className="h-4 w-4" /> Add customer
              </PrimaryButton>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    {c.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.country || '—'}</p>
                  </div>
                </div>
                {c.totalTrips > 0 && <Badge tone="sky">{c.totalTrips} trip{c.totalTrips === 1 ? '' : 's'}</Badge>}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                {c.email && (
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> {c.email}
                  </p>
                )}
                {c.phone && (
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {c.phone}
                  </p>
                )}
              </div>
              {c.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.tags.map((t, i) => (
                    <Badge key={i} tone="slate">{t}</Badge>
                  ))}
                </div>
              )}
              {c.notes && <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">{c.notes}</p>}
              <div className="mt-4 flex gap-2">
                <SecondaryButton onClick={() => setEditing({ ...c })} className="flex-1">
                  <Pencil className="h-4 w-4" /> Edit
                </SecondaryButton>
                <button
                  onClick={() => setDeleting(c)}
                  className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete customer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit customer' : 'Add customer'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Full name" value={editing.name} onChange={(e) => set('name', e.target.value)} />
              <TextField label="Country" value={editing.country} onChange={(e) => set('country', e.target.value)} />
              <TextField label="Email" type="email" value={editing.email} onChange={(e) => set('email', e.target.value)} />
              <TextField label="Phone / WhatsApp" value={editing.phone} onChange={(e) => set('phone', e.target.value)} />
              <TextField label="Total trips" type="number" min={0} value={editing.totalTrips} onChange={(e) => set('totalTrips', Number(e.target.value))} />
            </div>
            <ListEditor label="Tags" values={editing.tags} onChange={(v) => set('tags', v)} placeholder="e.g. VIP, repeat, K2 2026" />
            <TextArea label="Notes" rows={3} value={editing.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Preferences, medical notes, history…" />
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={save} disabled={saving || !editing.name.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save customer'}
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
        title="Delete customer"
        message={`Delete "${deleting?.name}" from your customers? This cannot be undone.`}
      />
    </div>
  );
}
