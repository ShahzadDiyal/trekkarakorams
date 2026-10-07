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
import {
  FeedOverlay,
  HeartButton,
  ShareButton,
  ReelVideo,
  reactionTotal,
} from './GalleryShared';

type Tab = 'all' | 'posts' | 'reels';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'posts', label: 'Posts', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 'reels', label: 'Reels', icon: <Clapperboard className="h-4 w-4" /> },
];

/** Instagram-style grid cell — opens the scroll feed at this item. */
function GridCell({
  item,
  onOpen,
}: {
  item: PublicGalleryItem;
  onOpen: (item: PublicGalleryItem) => void;
}) {
  const isReel = item.type === 'reel';
  return (
    <button
      onClick={() => onOpen(item)}
      className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl bg-slate-900 text-left"
    >
      {isReel ? (
        <ReelVideo
          src={item.mediaUrl}
          poster={item.thumbnailUrl}
          className="h-full w-full [&_video]:object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.mediaUrl}
          alt={item.title || 'Gallery image'}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {!isReel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-sm">
            <Play className="h-5 w-5 fill-white" />
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute left-3 top-3">
        <span className="rounded-full bg-slate-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {isReel ? 'Reel' : 'Post'}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3">
        {item.title && (
          <p className="truncate text-sm font-bold text-white">{item.title}</p>
        )}
        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-300">
          {item.location && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" /> {item.location}
            </span>
          )}
          {reactionTotal(item.reactions) > 0 && (
            <span className="flex shrink-0 items-center gap-1">
              <span>❤️</span>
              <span className="font-semibold">
                {reactionTotal(item.reactions)}
              </span>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/** Facebook-style post card with heart + share below. */
function PostCard({ item }: { item: PublicGalleryItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:shadow-lg">
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

      <Link href={`/gallery/${item.id}`} className="block bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.mediaUrl}
          alt={item.title || 'Gallery post'}
          loading="lazy"
          className="max-h-[520px] w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
        />
      </Link>

      <div className="p-4">
        {item.title && (
          <Link href={`/gallery/${item.id}`}>
            <h3 className="font-bold text-slate-900 hover:text-sky-700">
              {item.title}
            </h3>
          </Link>
        )}
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
          <div className="flex items-center gap-1">
            <HeartButton item={item} />
            <ShareButton item={item} />
          </div>
          <Link
            href={`/gallery/${item.id}`}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-sky-700 hover:text-sky-600"
          >
            View post <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Reel card for the Reels tab — hover autoplays, heart + share below. */
function ReelCard({ item }: { item: PublicGalleryItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:shadow-lg">
      <Link href={`/gallery/${item.id}`} className="block">
        <ReelVideo
          src={item.mediaUrl}
          poster={item.thumbnailUrl}
          className="aspect-[9/14] w-full [&_video]:object-cover"
        />
      </Link>
      <div className="p-3">
        {item.title && (
          <Link href={`/gallery/${item.id}`}>
            <h3 className="truncate text-sm font-bold text-slate-900 hover:text-sky-700">
              {item.title}
            </h3>
          </Link>
        )}
        <div className="-mx-1 mt-1 flex items-center">
          <HeartButton item={item} />
          <ShareButton item={item} />
        </div>
      </div>
    </article>
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
  const [feedItem, setFeedItem] = useState<PublicGalleryItem | null>(null);

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
        ) : tab === 'reels' ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => (
              <ReelCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => (
              <GridCell key={item.id} item={item} onOpen={setFeedItem} />
            ))}
          </div>
        )}
      </div>

      {feedItem && (
        <FeedOverlay
          items={items}
          startId={feedItem.id}
          onClose={() => setFeedItem(null)}
        />
      )}
    </main>
  );
};
