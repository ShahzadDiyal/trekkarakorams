'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Users, Phone, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { listDocs, createDoc, saveDoc, deleteDocById, COLLECTIONS } from '@/lib/admin/db';
import type { AdminTeamMember } from '@/lib/admin/types';
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
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: AdminTeamMember = {
  id: '',
  name: '',
  title: '',
  image: '',
  bio: '',
  phone: '',
  whatsapp: '',
  email: '',
  order: 0,
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminTeamMember | null>(null);
  const [deleting, setDeleting] = useState<AdminTeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const docs = await listDocs<AdminTeamMember>(COLLECTIONS.team);
      setMembers(docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch {
      setMembers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, order: members.length });
  const openEdit = (m: AdminTeamMember) => setEditing({ ...m });

  const save = async () => {
    if (!editing || !editing.name.trim()) return;
    setSaving(true);
    try {
      if (editing.id) {
        const { id, ...data } = editing;
        await saveDoc(COLLECTIONS.team, id, data);
      } else {
        const { id, ...data } = editing;
        await createDoc(COLLECTIONS.team, data);
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
    await deleteDocById(COLLECTIONS.team, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  const set = <K extends keyof AdminTeamMember>(k: K, v: AdminTeamMember[K]) =>
    setEditing((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div>
      <PageHeader
        title="Team"
        subtitle={`${members.length} team members. This powers the "Meet Our Team" section.`}
        actions={
          <PrimaryButton onClick={openNew}>
            <Plus className="h-4 w-4" /> Add member
          </PrimaryButton>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : members.length === 0 ? (
        <EmptyState
          icon={<Users className="h-10 w-10" />}
          title="No team members yet"
          hint="Add the people behind your expeditions, or import the current list from the Dashboard."
          action={
            <PrimaryButton onClick={openNew}>
              <Plus className="h-4 w-4" /> Add member
            </PrimaryButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((m) => (
            <Card key={m.id} className="overflow-hidden">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-sky-100 to-slate-200">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-xl font-bold text-white">
                    {m.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{m.title}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  {m.phone && (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> {m.phone}
                    </p>
                  )}
                  {m.whatsapp && (
                    <p className="flex items-center gap-1.5">
                      <MessageCircle className="h-3 w-3" /> {m.whatsapp}
                    </p>
                  )}
                  {m.email && (
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" /> {m.email}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <SecondaryButton onClick={() => openEdit(m)} className="flex-1">
                    <Pencil className="h-4 w-4" /> Edit
                  </SecondaryButton>
                  <button
                    onClick={() => setDeleting(m)}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit member' : 'Add member'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Name" value={editing.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" />
              <TextField label="Title" value={editing.title} onChange={(e) => set('title', e.target.value)} placeholder="Lead Mountain Guide" />
            </div>
            <ImageUpload label="Photo" folder="team" value={editing.image} onChange={(u) => set('image', u)} />
            <TextArea label="Bio" rows={3} value={editing.bio} onChange={(e) => set('bio', e.target.value)} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Phone" value={editing.phone} onChange={(e) => set('phone', e.target.value)} />
              <TextField label="WhatsApp" value={editing.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
              <TextField label="Email" value={editing.email} onChange={(e) => set('email', e.target.value)} />
              <TextField label="Display order" type="number" value={editing.order} onChange={(e) => set('order', Number(e.target.value))} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={save} disabled={saving || !editing.name.trim()}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? 'Saving…' : 'Save member'}
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
        title="Delete member"
        message={`Remove "${deleting?.name}" from the team? This cannot be undone.`}
      />
    </div>
  );
}
