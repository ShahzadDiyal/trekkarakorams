'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';

/* ---------- layout primitives ---------- */

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-5 w-5 animate-spin text-sky-600 ${className}`} />;
}

export function EmptyState({
  icon,
  title,
  hint,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
      {icon && <div className="mb-3 text-slate-400">{icon}</div>}
      <p className="text-base font-semibold text-slate-700">{title}</p>
      {hint && <p className="mt-1 max-w-md text-sm text-slate-500">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = 'slate',
}: {
  children: React.ReactNode;
  tone?: 'slate' | 'green' | 'amber' | 'red' | 'sky' | 'purple';
}) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-rose-100 text-rose-700',
    sky: 'bg-sky-100 text-sky-700',
    purple: 'bg-violet-100 text-violet-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- form fields ---------- */

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-700">
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100';

export function TextField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input className={inputCls} {...props} />
    </div>
  );
}

export function TextArea({
  label,
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea className={inputCls} rows={rows} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select className={inputCls} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left"
    >
      <span>
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        {hint && <span className="block text-xs text-slate-500">{hint}</span>}
      </span>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-sky-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}

/** Editable list of short strings (highlights, inclusions, tags…). */
export function ListEditor({
  label,
  values,
  onChange,
  placeholder = 'Add item…',
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...values, v]);
    setDraft('');
  };
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={inputCls}
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            className={inputCls}
            value={draft}
            placeholder={placeholder}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                add();
              }
            }}
          />
          <button
            type="button"
            onClick={add}
            className="rounded-lg bg-slate-900 p-2.5 text-white hover:bg-slate-700"
            aria-label="Add item"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Multi-line editor: one paragraph per block (blog content, gallery URLs…). */
export function ParagraphEditor({
  label,
  values,
  onChange,
  placeholder = 'Write a paragraph…',
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-3">
        {values.map((v, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Paragraph {i + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                aria-label="Remove paragraph"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea
              className={inputCls}
              rows={3}
              value={v}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-700"
        >
          <Plus className="h-4 w-4" /> Add paragraph
        </button>
      </div>
    </div>
  );
}

/* ---------- dialogs ---------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 sm:items-center sm:p-6">
      <div
        className={`w-full ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'} overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex items-start gap-3">
        <span className="rounded-full bg-rose-100 p-2 text-rose-600">
          <AlertCircle className="h-5 w-5" />
        </span>
        <p className="text-sm leading-relaxed text-slate-600">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
        >
          {busy && <Spinner className="h-4 w-4 text-white" />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

/* ---------- buttons ---------- */

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:opacity-50 ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
}
