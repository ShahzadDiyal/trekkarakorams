'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Image as ImageIcon,
  Clapperboard,
  Play,
  MapPin,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { useGalleryItems, type PublicGalleryItem } from '@/lib/content';
import { GALLERY_REACTION_EMOJIS } from '@/lib/admin/types';

type Tab = 'all' | 'posts' | 'reels';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'posts', label: 'Posts', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 'reels', label: 'Reels', icon: <Clapperboard className="h-4 w-4" /> },
];

function reactionTotal(item: PublicGalleryItem): number {
  return Object.values(item.reactions ?? {}).reduce((a, b) => a + b, 0);
}

function topEmojis(item: PublicGalleryItem): string[] {
  return (Object.entries(item.reactions ?? {}) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([e]) => e);
}

/** Instagram-style grid cell (used by the All tab and the Reels tab). */
function GridCell({ item }: { item: PublicGalleryItem }) {
  const isReel = item.type === 'reel';
  const thumb = isReel ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl;
  return (
    <Link
      href={`/gallery/${item.id}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-slate-900"
    >
      {isReel && !item.thumbnailUrl ? (
        <video
          src={item.mediaUrl}
          className="h-full w-full object-cover"
          preload="metadata"
          muted
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={item.title || 'Gallery image'}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {isReel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <Play className="h-5 w-5 fill-white" />
          </span>
        </div>
      )}
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
        <span className="rounded-full bg-slate-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {isReel ? 'Reel' : 'Post'}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        {item.title && (
          <p className="truncate text-sm font-bold text-white">{item.title}</p>
        )}
        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-300">
          {item.location && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" /> {item.location}
            </span>
          )}
          {reactionTotal(item) > 0 && (
            <span className="flex shrink-0 items-center gap-0.5">
              {topEmojis(item).map((e) => (
                <span key={e}>{e}</span>
              ))}
              <span className="ml-0.5 font-semibold">{reactionTotal(item)}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/** Facebook-style post card (used by the Posts tab). */
function PostCard({ item }: { item: PublicGalleryItem }) {
  return (
    <Link
      href={`/gallery/${item.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
          TK
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">Trek Karakoram</p>
          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
            {item.location && (
              <>
                <MapPin className="h-3 w-3" /> {item.location}
              </>
            )}
            {item.location && item.createdAt && ' · '}
            {item.createdAt &&
              new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
          </p>
        </div>
      </div>

      <div className="relative bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.mediaUrl}
          alt={item.title || 'Gallery post'}
          loading="lazy"
          className="max-h-[520px] w-full object-cover"
        />
      </div>

      <div className="p-4">
        {item.title && (
          <h3 className="font-bold text-slate-900 group-hover:text-sky-700">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1 text-sm">
            {(topEmojis(item).length > 0
              ? topEmojis(item)
              : [...GALLERY_REACTION_EMOJIS].slice(0, 3)
            ).map((e) => (
              <span key={e} className={topEmojis(item).length > 0 ? '' : 'opacity-40 grayscale'}>
                {e}
              </span>
            ))}
            <span className="ml-1 text-xs font-semibold text-slate-500">
              {reactionTotal(item) > 0 ? `${reactionTotal(item)} reactions` : 'Be the first to react'}
            </span>
          </span>
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-sky-700">
            View post <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-shimmer aspect-[4/5] rounded-xl" />
      ))}
    </div>
  );
}

export const GalleryPageClient: React.FC = () => {
  const { items, loading } = useGalleryItems();
  const [tab, setTab] = useState<Tab>('all');

  const posts = useMemo(() => items.filter((i) => i.type === 'post'), [items]);
  const reels = useMemo(() => items.filter((i) => i.type === 'reel'), [items]);
  const shown = tab === 'all' ? items : tab === 'posts' ? posts : reels;

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8 rounded-2xl bg-sky-950 p-6 text-white sm:p-8">
          <p className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            From the trail
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-4xl">
            Gallery
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-300 sm:text-[16px]">
            Photos and reels from our Karakoram expeditions — captured by our
            local team on the trail.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all sm:px-8 ${
                  tab === t.id
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <SkeletonGrid />
        ) : shown.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Camera className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 font-bold text-slate-900">
              {items.length === 0 ? 'No moments yet' : `No ${tab} yet`}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {items.length === 0
                ? 'Our team is out on the trail — fresh photos and reels are coming soon.'
                : 'Try another tab.'}
            </p>
          </div>
        ) : tab === 'posts' ? (
          <div className="mx-auto max-w-2xl space-y-6">
            {shown.map((item) => (
              <PostCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => (
              <GridCell key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
