'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { getDocById, createDoc, saveDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminBlog } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  TextField,
  TextArea,
  Toggle,
  ParagraphEditor,
  Spinner,
} from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';

const EMPTY: AdminBlog = {
  id: '',
  title: '',
  slug: '',
  category: 'Expedition Guides',
  readTime: '5 min read',
  author: '',
  authorRole: '',
  date: '',
  image: '',
  excerpt: '',
  content: [],
  published: true,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolved, setResolved] = useState<{ id: string } | null>(null);
  const [form, setForm] = useState<AdminBlog>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then(setResolved);
  }, [params]);

  useEffect(() => {
    if (!resolved) return;
    if (resolved.id === 'new') {
      setLoading(false);
      return;
    }
    (async () => {
      const doc = await getDocById<AdminBlog>(COLLECTIONS.blogs, resolved.id);
      if (doc) setForm({ ...EMPTY, ...doc });
      setLoading(false);
    })();
  }, [resolved]);

  const set = <K extends keyof AdminBlog>(k: K, v: AdminBlog[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, slug: form.slug.trim() || slugify(form.title) };
      if (resolved?.id === 'new') {
        await createDoc(COLLECTIONS.blogs, (({ id, ...rest }) => rest)(payload));
      } else if (resolved) {
        const { id, ...data } = payload;
        await saveDoc(COLLECTIONS.blogs, resolved.id, data);
      }
      router.push('/admin/blogs');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const isNew = resolved?.id === 'new';

  return (
    <div>
      <PageHeader
        title={isNew ? 'New blog post' : 'Edit blog post'}
        actions={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" /> Back
            </SecondaryButton>
            <PrimaryButton onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving…' : 'Save post'}
            </PrimaryButton>
          </div>
        }
      />

      {error && (
        <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="space-y-4 p-5">
            <TextField label="Title" value={form.title} onChange={(e) => { set('title', e.target.value); if (isNew) set('slug', slugify(e.target.value)); }} placeholder="Article headline" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="URL slug" value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} placeholder="auto-generated" />
              <TextField label="Category" value={form.category} onChange={(e) => set('category', e.target.value)} />
              <TextField label="Author" value={form.author} onChange={(e) => set('author', e.target.value)} />
              <TextField label="Author role" value={form.authorRole} onChange={(e) => set('authorRole', e.target.value)} />
              <TextField label="Date" value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="Jan 12, 2026" />
              <TextField label="Read time" value={form.readTime} onChange={(e) => set('readTime', e.target.value)} />
            </div>
            <TextArea label="Excerpt" rows={3} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
          </Card>
          <Card className="p-5">
            <ParagraphEditor label="Article body" values={form.content} onChange={(v) => set('content', v)} placeholder="Write a paragraph of the article…" />
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-4 font-bold text-slate-900">Cover image</h2>
            <ImageUpload label="Cover" folder="blogs" value={form.image} onChange={(u) => set('image', u)} />
          </Card>
          <Card className="p-5">
            <Toggle label="Published" hint="Visible as a published article" checked={form.published} onChange={(v) => set('published', v)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
