'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Mountain } from 'lucide-react';
import { listDocs, deleteDocById, patchDoc, COLLECTIONS } from '@/lib/admin/db';
import type { AdminTrek } from '@/lib/admin/types';
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

export default function AdminTreksPage() {
  const [treks, setTreks] = useState<AdminTrek[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<AdminTrek | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setTreks(await listDocs<AdminTrek>(COLLECTIONS.treks));
    } catch {
      setTreks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublished = async (t: AdminTrek) => {
    await patchDoc(COLLECTIONS.treks, t.id, { published: !t.published });
    setTreks(treks.map((x) => (x.id === t.id ? { ...x, published: !x.published } : x)));
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    await deleteDocById(COLLECTIONS.treks, deleting.id);
    setDeleting(null);
    setBusy(false);
    load();
  };

  return (
    <div>
      <PageHeader
        title="Treks & Plans"
        subtitle={`${treks.length} trek packages in the database.`}
        actions={
          <Link href="/admin/treks/new">
            <PrimaryButton>
              <Plus className="h-4 w-4" /> New trek
            </PrimaryButton>
          </Link>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : treks.length === 0 ? (
        <EmptyState
          icon={<Mountain className="h-10 w-10" />}
          title="No treks yet"
          hint="Add your first trek package, or import the website's existing treks from the Dashboard."
          action={
            <Link href="/admin/treks/new">
              <PrimaryButton>
                <Plus className="h-4 w-4" /> New trek
              </PrimaryButton>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {treks.map((t) => (
            <Card key={t.id} className="overflow-hidden">
              <div className="relative h-40 bg-slate-100">
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.image} alt={t.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <Mountain className="h-10 w-10" />
                  </div>
                )}
                <span className="absolute left-3 top-3">
                  <Badge tone={t.published ? 'green' : 'slate'}>
                    {t.published ? 'Published' : 'Draft'}
                  </Badge>
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 line-clamp-1">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {t.durationDays} days · {t.difficulty} · $
                  {(() => {
                    const priced = (t.pricingTiers ?? [])
                      .map((x) => x.priceUSD)
                      .filter((p) => p > 0);
                    return (priced.length > 0
                      ? Math.min(...priced)
                      : t.priceUSD
                    ).toLocaleString();
                  })()}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/admin/treks/${t.id}`} className="flex-1">
                    <SecondaryButton className="w-full">
                      <Pencil className="h-4 w-4" /> Edit
                    </SecondaryButton>
                  </Link>
                  <SecondaryButton onClick={() => togglePublished(t)} title="Toggle published">
                    {t.published ? 'Unpublish' : 'Publish'}
                  </SecondaryButton>
                  <button
                    onClick={() => setDeleting(t)}
                    className="rounded-xl border border-slate-300 p-2.5 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete trek"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        busy={busy}
        title="Delete trek"
        message={`Delete "${deleting?.title}"? This cannot be undone.`}
      />
    </div>
  );
}
