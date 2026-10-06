'use client';

import React, { useEffect, useState } from 'react';
import { CalendarCheck, Trash2, Eye, Plus, Loader2, Inbox } from 'lucide-react';
import { listDocs, createDoc, deleteDocById, patchDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminBooking, BookingStatus } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Badge,
  EmptyState,
  Spinner,
  Modal,
  ConfirmDialog,
  SelectField,
  TextField,
  TextArea,
} from '@/components/admin/ui';

const STATUS_TONE: Record<BookingStatus, 'amber' | 'sky' | 'green' | 'red'> = {
  new: 'amber',
  contacted: 'sky',
  confirmed: 'green',
  cancelled: 'red',
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

export default function AdminBookingsPage() {
  const [items, setItems] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<AdminBooking | null>(null);
  const [deleting, setDeleting] = useState<AdminBooking | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState({ trekTitle: '', name: '', email: '', phone: '', country: '', travelDate: '', travelers: 1, message: '' });

  const load = async () => {
    setLoading(true);
    try {
      setItems(await listDocs<AdminBooking>(COLLECTIONS.bookings));
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (b: AdminBooking, status: BookingStatus) => {
    await patchDoc(COLLECTIONS.bookings, b.id, { status });
    setItems(items.map((x) => (x.id === b.id ? { ...x, status } : x)));
    setViewing((v) => (v && v.id === b.id ? { ...v, status } : v));
  };

  const saveNew = async () => {
    if (!draft.name.trim() || !draft.trekTitle.trim()) return;
    setSaving(true);
    try {
      await createDoc(COLLECTIONS.bookings, {
        ...draft,
        travelers: Number(draft.travelers) || 1,
        status: 'new' as BookingStatus,
        createdAt: new Date().toISOString().slice(0, 10),
      });
      setCreating(false);
      setDraft({ trekTitle: '', name: '', email: '', phone: '', country: '', travelDate: '', travelers: 1, message: '' });
      load();
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    await deleteDocById(COLLECTIONS.bookings, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const shown = filter === 'all' ? items : items.filter((b) => b.status === filter);

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle={`${items.length} booking enquiries. New website enquiries will appear here automatically once the booking form is connected.`}
        actions={
          <PrimaryButton onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> Add booking
          </PrimaryButton>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', 'new', 'contacted', 'confirmed', 'cancelled'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              filter === s
                ? 'bg-sky-600 text-white'
                : 'border border-slate-300 bg-white text-slate-600 hover:border-sky-400'
            }`}
          >
            {s === 'all' ? 'All' : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : shown.length === 0 ? (
        <EmptyState
          icon={<Inbox className="h-10 w-10" />}
          title={filter === 'all' ? 'No bookings yet' : `No ${STATUS_LABEL[filter].toLowerCase()} bookings`}
          hint="When the website's booking form is connected to the database, new enquiries will land here."
        />
      ) : (
        <Card className="divide-y divide-slate-100 overflow-hidden">
          {shown.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4">
              <span className="rounded-xl bg-indigo-100 p-2.5 text-indigo-700">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">
                  {b.name} <span className="font-medium text-slate-400">· {b.trekTitle}</span>
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {b.travelers} traveler{b.travelers === 1 ? '' : 's'} · {b.travelDate || 'Date flexible'} · {b.country}
                </p>
                <div className="mt-1.5">
                  <Badge tone={STATUS_TONE[b.status]}>{STATUS_LABEL[b.status]}</Badge>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <SecondaryButton onClick={() => setViewing(b)}>
                  <Eye className="h-4 w-4" /> View
                </SecondaryButton>
                <button
                  onClick={() => setDeleting(b)}
                  className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete booking"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Add booking" wide>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Trek" value={draft.trekTitle} onChange={(e) => setDraft({ ...draft, trekTitle: e.target.value })} placeholder="K2 Base Camp Trek" />
            <TextField label="Customer name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <TextField label="Email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            <TextField label="Phone / WhatsApp" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            <TextField label="Country" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
            <TextField label="Travel date" value={draft.travelDate} onChange={(e) => setDraft({ ...draft, travelDate: e.target.value })} placeholder="July 2026 / Flexible" />
            <TextField label="Travelers" type="number" min={1} value={draft.travelers} onChange={(e) => setDraft({ ...draft, travelers: Number(e.target.value) })} />
          </div>
          <TextArea label="Message / notes" rows={3} value={draft.message} onChange={(e) => setDraft({ ...draft, message: e.target.value })} />
          <div className="flex justify-end gap-2 pt-2">
            <SecondaryButton onClick={() => setCreating(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={saveNew} disabled={saving || !draft.name.trim() || !draft.trekTitle.trim()}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? 'Saving…' : 'Add booking'}
            </PrimaryButton>
          </div>
        </div>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Booking details" wide>
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ['Trek', viewing.trekTitle],
                ['Name', viewing.name],
                ['Email', viewing.email],
                ['Phone', viewing.phone],
                ['Country', viewing.country],
                ['Travel date', viewing.travelDate || 'Flexible'],
                ['Travelers', String(viewing.travelers)],
                ['Received', viewing.createdAt || '—'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{k}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            {viewing.message && (
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Message</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{viewing.message}</p>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <SelectField
                  label="Status"
                  value={viewing.status}
                  onChange={(e) => setStatus(viewing, e.target.value as BookingStatus)}
                  options={(Object.keys(STATUS_LABEL) as BookingStatus[]).map((s) => ({
                    value: s,
                    label: STATUS_LABEL[s],
                  }))}
                />
              </div>
              <a
                href={`https://wa.me/${viewing.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-emerald-700"
              >
                WhatsApp customer
              </a>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        busy={busy}
        title="Delete booking"
        message={`Delete the booking enquiry from "${deleting?.name}"? This cannot be undone.`}
      />
    </div>
  );
}
