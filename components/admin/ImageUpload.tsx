'use client';

import React, { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { ImagePlus, Loader2, X } from 'lucide-react';

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * Also accepts pasting an external URL directly.
 */
export function ImageUpload({
  label,
  value,
  onChange,
  folder = 'uploads',
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');

  const startUpload = (file: File) => {
    setError('');
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `${folder}/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    setProgress(0);
    task.on(
      'state_changed',
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => {
        setError(err.message || 'Upload failed.');
        setProgress(null);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onChange(url);
        setProgress(null);
      }
    );
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="h-40 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 rounded-lg bg-slate-950/70 p-1.5 text-white hover:bg-rose-600"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500 hover:border-sky-400 hover:text-sky-700"
        >
          {progress !== null ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
              <span className="font-semibold">Uploading… {progress}%</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="font-semibold">Click to upload an image</span>
              <span className="text-xs">JPG, PNG or WebP</span>
            </>
          )}
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) startUpload(f);
          e.target.value = '';
        }}
      />
      <div className="mt-2 flex items-center gap-2">
        <input
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-600 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
          placeholder="…or paste an image URL"
          value={value.startsWith('http') || value.startsWith('/') ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
