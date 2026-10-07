'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import {
  Heart,
  Share2,
  Link2,
  Check,
  MessageCircle,
  MapPin,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { addGalleryReaction, type PublicGalleryItem } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export function reactionTotal(
  reactions: Record<string, number> | undefined
): number {
  return Object.values(reactions ?? {}).reduce((a, b) => a + b, 0);
}

function likedKey(id: string): string {
  return `gallery_liked_${id}`;
}

/* ---------------------------------- Heart --------------------------------- */

export function HeartButton({ item }: { item: PublicGalleryItem }) {
  const [count, setCount] = useState(() => reactionTotal(item.reactions));
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(likedKey(item.id)) === '1');
    } catch {
      /* storage unavailable */
    }
  }, [item.id]);

  const like = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked || busy) return;
    setBusy(true);
    try {
      const updated = await addGalleryReaction(item.id, '❤️');
      setCount(reactionTotal(updated));
      setLiked(true);
      try {
        localStorage.setItem(likedKey(item.id), '1');
      } catch {
        /* storage unavailable — like still counted */
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={like}
      aria-label={liked ? 'Liked' : 'Like'}
      className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold transition-all active:scale-90 ${
        liked
          ? 'bg-rose-50 text-rose-600'
          : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-transform ${liked ? 'fill-rose-500 text-rose-500 scale-110' : ''} ${busy ? 'animate-pulse' : ''}`}
      />
      {count > 0 && <span className="tabular-nums">{count}</span>}
    </button>
  );
}

/* ---------------------------------- Share --------------------------------- */

export function ShareButton({ item }: { item: PublicGalleryItem }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageUrl = `${SITE_URL}/gallery/${item.id}`;
  const text = item.title
    ? `${item.title} — Trek Karakoram Gallery`
    : 'Trek Karakoram Gallery';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await (
          navigator as Navigator & { share: (d: ShareData) => Promise<void> }
        ).share({ title: text, text: item.description || text, url: pageUrl });
      } catch {
        /* dismissed */
      }
    } else {
      copy();
    }
    setOpen(false);
  };

  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      icon: <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-xs font-black text-white">f</span>,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`,
      icon: <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-[11px] font-black text-white">𝕏</span>,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${pageUrl}`)}`,
      icon: <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white"><MessageCircle className="h-3.5 w-3.5" /></span>,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="Share"
        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold transition-all active:scale-90 ${
          open ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-sky-50 hover:text-sky-700'
        }`}
      >
        <Share2 className="h-5 w-5" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <div className="absolute bottom-full left-0 z-50 mb-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {l.icon} {l.label}
              </a>
            ))}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copy();
              }}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Link2 className="h-3.5 w-3.5" />}
              </span>
              {copied ? 'Link copied!' : 'Copy link'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nativeShare();
              }}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-white">
                <Share2 className="h-3.5 w-3.5" />
              </span>
              More options…
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------------- Reel video ------------------------------ */
/** Autoplays when scrolled into view or hovered; has a mute/unmute toggle. */
export function ReelVideo({
  src,
  poster,
  className = '',
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovering || inView) {
      v.play().catch(() => {
        /* autoplay blocked — stays paused until interaction */
      });
    } else {
      v.pause();
    }
  }, [hovering, inView]);

  return (
    <div
      ref={wrapRef}
      className={`relative bg-slate-950 ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="absolute bottom-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* --------------------------------- FeedCard ------------------------------- */

function formatDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/** Facebook-style card used in the scroll feed. */
export function FeedCard({ item }: { item: PublicGalleryItem }) {
  const isReel = item.type === 'reel';
  const date = formatDate(item.createdAt);

  return (
    <article
      id={`feed-${item.id}`}
      className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-700/60 bg-white shadow-2xl"
    >
      <div className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
          TK
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900">Trek Karakoram</p>
          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
            {item.location && (
              <>
                <MapPin className="h-3 w-3" /> {item.location}
              </>
            )}
            {item.location && date && ' · '}
            {date}
            <span className="ml-1 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
              {isReel ? 'Reel' : 'Post'}
            </span>
          </p>
        </div>
      </div>

      <Link href={`/gallery/${item.id}`} className="block bg-slate-950">
        {isReel ? (
          <ReelVideo
            src={item.mediaUrl}
            poster={item.thumbnailUrl}
            className="max-h-[70vh] w-full [&_video]:object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.mediaUrl}
            alt={item.title || 'Gallery image'}
            loading="lazy"
            className="max-h-[70vh] w-full object-contain"
          />
        )}
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
          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2">
          <HeartButton item={item} />
          <ShareButton item={item} />
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- FeedOverlay ----------------------------- */
/** Full-screen scroll feed of all items, opened at the clicked item. */
export function FeedOverlay({
  items,
  startId,
  onClose,
}: {
  items: PublicGalleryItem[];
  startId: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      document
        .getElementById(`feed-${startId}`)
        ?.scrollIntoView({ block: 'start' });
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [startId, onClose]);

  if (!mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-sm">
      <button
        onClick={onClose}
        aria-label="Close feed"
        className="fixed right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:rotate-90 hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
            Trek Karakoram
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">Gallery Feed</h2>
        </div>
        <div className="space-y-6">
          {items.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mx-auto mt-8 flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" /> Close feed
        </button>
      </div>
    </div>,
    document.body
  );
}
