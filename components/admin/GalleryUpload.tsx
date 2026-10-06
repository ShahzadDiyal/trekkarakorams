'use client';

import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X, Plus } from 'lucide-react';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  isCloudinaryConfigured,
} from '@/lib/cloudinary';

/** Max parallel uploads — keeps big batches reliable without hammering the browser. */
const CONCURRENCY = 4;

function uploadOne(file: File, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `trekkarakoram/${folder}`);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) resolve(res.secure_url as string);
          else reject(new Error('Unexpected response from Cloudinary.'));
        } catch {
          reject(new Error('Unexpected response from Cloudinary.'));
        }
      } else {
        reject(new Error('Upload failed — check the upload preset is Unsigned.'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload.'));
    xhr.send(formData);
  });
}

/**
 * Gallery field: pick any number of images from the device at once, they
 * upload to Cloudinary (a few at a time) and their URLs are appended.
 * URLs can also be pasted manually; thumbnails can be removed or reordered.
 */
export function GalleryUpload({
  label,
  values,
  onChange,
  folder = 'gallery',
}: {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');

  const startUpload = async (files: File[]) => {
    if (!files.length) return;
    if (!isCloudinaryConfigured()) {
      setError('Cloudinary is not set up yet. Add your cloud name + upload preset in lib/cloudinary.ts.');
      return;
    }
    setError('');
    setUploading(true);
    setTotal(files.length);
    setDone(0);

    const urls: string[] = [];
    let failed = 0;
    let completed = 0;
    const queue = [...files];

    const worker = async () => {
      while (queue.length) {
        const file = queue.shift()!;
        try {
          urls.push(await uploadOne(file, folder));
        } catch {
          failed++;
        }
        completed++;
        setDone(completed);
      }
    };

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

    if (urls.length) onChange([...values, ...urls]);
    if (failed > 0) setError(`${failed} of ${files.length} images failed to upload — try them again.`);
    setUploading(false);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = [...values];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const addUrl = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...values, v]);
    setDraft('');
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>

      {values.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {values.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative overflow-hidden rounded-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Gallery image ${i + 1}`} className="h-20 w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-slate-950/70 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="px-1.5 text-xs font-bold text-white disabled:opacity-30"
                  aria-label="Move left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === values.length - 1}
                  className="px-1.5 text-xs font-bold text-white disabled:opacity-30"
                  aria-label="Move right"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 rounded-md bg-slate-950/70 p-1 text-white hover:bg-rose-600"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500 hover:border-sky-400 hover:text-sky-700 disabled:opacity-60"
      >
        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
            <span className="font-semibold">
              Uploading… {done}/{total}
            </span>
            <span className="text-xs">You can keep editing — they’ll appear above when done.</span>
          </>
        ) : (
          <>
            <ImagePlus className="h-6 w-6" />
            <span className="font-semibold">Upload images from device</span>
            <span className="text-xs">Select as many as you like — JPG, PNG or WebP</span>
          </>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          e.target.value = '';
          startUpload(files);
        }}
      />

      <div className="mt-2 flex items-center gap-2">
        <input
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-600 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
          placeholder="…or paste an image URL and press Add"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addUrl();
            }
          }}
        />
        <button
          type="button"
          onClick={addUrl}
          className="flex shrink-0 items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>

      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
