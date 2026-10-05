'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react';
import { listDocs, deleteDocById, patchDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminBlog } from '@/lib/admin/types';
import {
  Card,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Badge,
  EmptyState,
  Spinner,
  ConfirmDialog,
} from '@/components/admin/ui';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<AdminBlog | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setBlogs(await listDocs<AdminBlog>(COLLECTIONS.blogs));
    } catch {
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublished = async (b: AdminBlog) => {
    await patchDoc(COLLECTIONS.blogs, b.id, { published: !b.published });
    setBlogs(blogs.map((x) => (x.id === b.id ? { ...x, published: !x.published } : x)));
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    await deleteDocById(COLLECTIONS.blogs, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        subtitle={`${blogs.length} articles in the database.`}
        actions={
          <Link href="/admin/blogs/new">
            <PrimaryButton>
              <Plus className="h-4 w-4" /> New post
            </PrimaryButton>
          </Link>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={<Newspaper className="h-10 w-10" />}
          title="No blog posts yet"
          hint="Write your first article, or import the website's existing posts from the Dashboard."
          action={
            <Link href="/admin/blogs/new">
              <PrimaryButton>
                <Plus className="h-4 w-4" /> New post
              </PrimaryButton>
            </Link>
          }
        />
      ) : (
        <Card className="divide-y divide-slate-100 overflow-hidden">
          {blogs.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {b.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <Newspaper className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">{b.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {b.category} · {b.author} · {b.date}
                </p>
                <div className="mt-1.5">
                  <Badge tone={b.published ? 'green' : 'slate'}>
                    {b.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={`/admin/blogs/${b.id}`}>
                  <SecondaryButton>
                    <Pencil className="h-4 w-4" /> Edit
                  </SecondaryButton>
                </Link>
                <button
                  onClick={() => togglePublished(b)}
                  className="rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {b.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => setDeleting(b)}
                  className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        busy={busy}
        title="Delete post"
        message={`Delete "${deleting?.title}"? This cannot be undone.`}
      />
    </div>
  );
}
