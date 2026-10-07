'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Share2,
  Link2,
  Check,
  MessageCircle,
} from 'lucide-react';
import type { PublicGalleryItem } from '@/lib/content';
import { addGalleryReaction } from '@/lib/content';
import { GALLERY_REACTION_EMOJIS } from '@/lib/admin/types';
import { SITE_URL } from '@/lib/site';

function reactionTotal(reactions: Record<string, number>): number {
  return Object.values(reactions ?? {}).reduce((a, b) => a + b, 0);
}

function reactedKey(id: string): string {
  return `gallery_reacted_${id}`;
}

function getMyReactions(id: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(reactedKey(id)) || '[]');
  } catch {
    return [];
  }
}

export const GalleryDetailClient: React.FC<{ item: PublicGalleryItem }> = ({
  item,
}) => {
  const [reactions, setReactions] = useState<Record<string, number>>(
    item.reactions ?? {}
  );
  const [myReactions, setMyReactions] = useState<string[]>([]);
  const [reacting, setReacting] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMyReactions(getMyReactions(item.id));
  }, [item.id]);

  const pageUrl = `${SITE_URL}/gallery/${item.id}`;
  const shareText = item.title
    ? `${item.title} — Trek Karakoram Gallery`
    : 'Trek Karakoram Gallery';

  const react = async (emoji: string) => {
    if (reacting || myReactions.includes(emoji)) return;
    setReacting(emoji);
    try {
      const updated = await addGalleryReaction(item.id, emoji);
      setReactions(updated);
      const mine = [...myReactions, emoji];
      setMyReactions(mine);
      try {
        localStorage.setItem(reactedKey(item.id), JSON.stringify(mine));
      } catch {
        /* storage unavailable — reaction still counted */
      }
    } catch {
      /* offline or permission error — stay silent, counts unchanged */
    } finally {
      setReacting(null);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: shareText,
          text: item.description || shareText,
          url: pageUrl,
        });
      } catch {
        /* user dismissed */
      }
    } else {
      copyLink();
    }
  };

  const shareLinks = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      className: 'bg-[#1877F2] hover:bg-[#1466d1] text-white',
      short: 'f',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      className: 'bg-slate-950 hover:bg-slate-800 text-white',
      short: '𝕏',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`,
      className: 'bg-[#25D366] hover:bg-[#1eb857] text-white',
      short: <MessageCircle className="h-4 w-4" />,
    },
  ];

  const isReel = item.type === 'reel';

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
              <video
                src={item.mediaUrl}
                poster={item.thumbnailUrl || undefined}
                controls
                playsInline
                preload="metadata"
                className="max-h-[75vh] w-full"
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

            {/* Reaction summary */}
            <div className="mt-4 flex items-center gap-1 text-sm">
              {Object.entries(reactions)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([e]) => (
                  <span key={e}>{e}</span>
                ))}
              <span className="ml-1 text-xs font-semibold text-slate-500">
                {reactionTotal(reactions) > 0
                  ? `${reactionTotal(reactions)} reaction${reactionTotal(reactions) === 1 ? '' : 's'}`
                  : 'Be the first to react'}
              </span>
            </div>

            {/* Emoji reactions */}
            <div className="mt-3 grid grid-cols-6 gap-2 border-t border-slate-100 pt-4">
              {GALLERY_REACTION_EMOJIS.map((emoji) => {
                const count = reactions[emoji] ?? 0;
                const mine = myReactions.includes(emoji);
                return (
                  <button
                    key={emoji}
                    onClick={() => react(emoji)}
                    disabled={reacting !== null}
                    title={mine ? 'You reacted' : `React ${emoji}`}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-2 py-2.5 transition-all ${
                      mine
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50'
                    } ${reacting === emoji ? 'scale-110' : ''}`}
                  >
                    <span className="text-2xl leading-none">{emoji}</span>
                    <span className="text-[11px] font-bold text-slate-600">
                      {count > 0 ? count : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Share2 className="h-3.5 w-3.5" /> Share this {isReel ? 'reel' : 'post'}
              </p>
              <div className="flex flex-wrap gap-2">
                {shareLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 min-w-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${s.className}`}
                  >
                    {typeof s.short === 'string' ? (
                      <span className="text-base font-black">{s.short}</span>
                    ) : (
                      s.short
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
                <button
                  onClick={copyLink}
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-700"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <button
                  onClick={nativeShare}
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white transition-colors hover:bg-sky-500"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
