'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Heart } from 'lucide-react';
import type { PublicGalleryItem } from '@/lib/content';
import { HeartButton, ShareButton, ReelVideo, reactionTotal } from '../GalleryShared';

export const GalleryDetailClient: React.FC<{ item: PublicGalleryItem }> = ({
  item,
}) => {
  const isReel = item.type === 'reel';
  const total = reactionTotal(item.reactions);

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/gallery"
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Gallery
        </Link>

        {/* Facebook-like post card */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
              TK
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-slate-900">Trek Karakoram</p>
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
                <span className="ml-1 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  {isReel ? 'Reel' : 'Post'}
                </span>
              </p>
            </div>
          </div>

          {/* Media */}
          <div className="bg-slate-950">
            {isReel ? (
              <ReelVideo
                src={item.mediaUrl}
                poster={item.thumbnailUrl}
                className="max-h-[75vh] w-full [&_video]:object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.mediaUrl}
                alt={item.title || 'Gallery image'}
                className="max-h-[75vh] w-full object-contain"
              />
            )}
          </div>

          <div className="p-4 sm:p-5">
            {item.title && (
              <h1 className="text-lg font-bold text-slate-900">{item.title}</h1>
            )}
            {item.description && (
              <p className="mt-2 whitespace-pre-line text-[15px] leading-7 text-slate-600">
                {item.description}
              </p>
            )}

            {/* Like + share */}
            <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-3">
              <HeartButton item={item} />
              <ShareButton item={item} />
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Heart className="h-3.5 w-3.5 fill-rose-200 text-rose-400" />
                {total > 0 ? `${total} like${total === 1 ? '' : 's'}` : 'Be the first to like'}
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
