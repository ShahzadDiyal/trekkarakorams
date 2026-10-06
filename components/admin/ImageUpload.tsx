'use client';

import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_VIDEO_UPLOAD_PRESET,
  isCloudinaryConfigured,
} from '@/lib/cloudinary';

/**
 * Uploads an image or video to Cloudinary (unsigned preset) and returns the secure URL.
 * Also accepts pasting an external URL directly.
 */
export function ImageUpload({
  label,
  value,
  onChange,
  folder = 'uploads',
  resourceType = 'image',
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  /** 'video' uploads to the video endpoint + video preset and shows a video preview. */
  resourceType?: 'image' | 'video';
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');

  const startUpload = (file: File) => {
    if (!isCloudinaryConfigured()) {
      setError(
        'Cloudinary is not set up yet. Add your cloud name + unsigned upload preset in lib/cloudinary.ts (see the comments there).'
      );
      return;
    }
    setError('');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      resourceType === 'video' ? CLOUDINARY_VIDEO_UPLOAD_PRESET : CLOUDINARY_UPLOAD_PRESET
    );
    formData.append('folder', `trekkarakoram/${folder}`);

    // XMLHttpRequest for upload progress events (fetch can't report these).
    const xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) {
            onChange(res.secure_url as string);
          } else {
            setError('Upload failed: unexpected response from Cloudinary.');
          }
        } catch {
          setError('Upload failed: unexpected response from Cloudinary.');
        }
      } else {
        setError('Upload failed. Check the upload preset is Unsigned in Cloudinary settings.');
      }
      setProgress(null);
    };
    xhr.onerror = () => {
      setError('Upload failed. Check your connection and Cloudinary settings.');
      setProgress(null);
    };
    xhr.send(formData);
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200">
          {resourceType === 'video' ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={value} className="h-40 w-full object-cover" controls preload="metadata" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Uploaded preview" className="h-40 w-full object-cover" />
          )}
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
              <span className="font-semibold">
                Click to upload {resourceType === 'video' ? 'a video' : 'an image'}
              </span>
              <span className="text-xs">
                {resourceType === 'video' ? 'MP4, WebM or MOV' : 'JPG, PNG or WebP'}
              </span>
            </>
          )}
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept={resourceType === 'video' ? 'video/*' : 'image/*'}
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
          placeholder={`…or paste ${resourceType === 'video' ? 'a video' : 'an image'} URL`}
          value={value.startsWith('http') || value.startsWith('/') ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
