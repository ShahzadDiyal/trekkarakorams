'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import type { HeaderButton } from '@/lib/admin/types';
import { SecondaryButton, SelectField } from '@/components/admin/ui';
import { HEADER_ICON_NAMES, headerIcon } from '@/lib/header-icons';

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none';

const FONT_WEIGHTS = [
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semibold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra bold' },
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
        />
        <input
          className={`${inputCls} font-mono text-xs`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#0284c7"
        />
      </span>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <span className="flex items-center gap-1">
        <input
          type="number"
          min={min}
          max={max}
          className={inputCls}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        {suffix && <span className="text-xs text-slate-400">{suffix}</span>}
      </span>
    </label>
  );
}

function buttonStyle(b: HeaderButton): React.CSSProperties {
  return {
    backgroundColor: b.bgColor || 'transparent',
    color: b.textColor || '#ffffff',
    borderColor: b.borderColor || 'transparent',
    borderWidth: b.borderWidth || 0,
    borderStyle: 'solid',
    borderRadius: b.borderRadius ?? 4,
    fontSize: b.fontSize || 15,
    fontWeight: b.fontWeight || '700',
  };
}

/** Header CTA buttons with full styling control + live preview. */
export function ButtonEditor({
  buttons,
  onChange,
}: {
  buttons: HeaderButton[];
  onChange: (buttons: HeaderButton[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const update = (i: number, patch: Partial<HeaderButton>) => {
    const next = [...buttons];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {buttons.map((b, i) => {
        const Icon = headerIcon(b.icon);
        return (
          <div key={i} className="rounded-xl border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center gap-3 p-3 text-left"
            >
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
              <span className="flex-1 truncate text-sm font-semibold text-slate-800">
                {b.label || <span className="text-slate-400">Untitled button</span>}
              </span>
              {/* Live preview */}
              <span
                className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 uppercase tracking-wider"
                style={buttonStyle(b)}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {b.label || 'Preview'}
              </span>
              <span
                role="button"
                tabIndex={0}
                aria-label="Delete button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(buttons.filter((_, j) => j !== i));
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onChange(buttons.filter((_, j) => j !== i));
                  }
                }}
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </span>
            </button>

            {open === i && (
              <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">Button text</span>
                  <input
                    className={inputCls}
                    value={b.label}
                    onChange={(e) => update(i, { label: e.target.value })}
                    placeholder="CUSTOM PLAN"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    Link (route)
                  </span>
                  <input
                    className={inputCls}
                    value={b.href}
                    onChange={(e) => update(i, { href: e.target.value })}
                    placeholder="/custom-plan"
                  />
                </label>
                <SelectField
                  label="Icon"
                  value={b.icon}
                  onChange={(e) => update(i, { icon: e.target.value })}
                  options={[
                    { value: '', label: 'No icon' },
                    ...HEADER_ICON_NAMES.map((n) => ({ value: n, label: n })),
                  ]}
                />
                <SelectField
                  label="Font weight"
                  value={b.fontWeight}
                  onChange={(e) =>
                    update(i, { fontWeight: e.target.value as HeaderButton['fontWeight'] })
                  }
                  options={FONT_WEIGHTS}
                />
                <ColorField label="Background color" value={b.bgColor} onChange={(v) => update(i, { bgColor: v })} />
                <ColorField label="Text color" value={b.textColor} onChange={(v) => update(i, { textColor: v })} />
                <ColorField label="Border color" value={b.borderColor} onChange={(v) => update(i, { borderColor: v })} />
                <NumberField label="Border width" suffix="px" value={b.borderWidth} onChange={(v) => update(i, { borderWidth: v })} max={20} />
                <NumberField label="Corner radius" suffix="px" value={b.borderRadius} onChange={(v) => update(i, { borderRadius: v })} max={60} />
                <NumberField label="Font size" suffix="px" value={b.fontSize} onChange={(v) => update(i, { fontSize: v })} min={10} max={32} />
              </div>
            )}
          </div>
        );
      })}

      <SecondaryButton
        type="button"
        onClick={() =>
          onChange([
            ...buttons,
            {
              label: '',
              href: '/',
              icon: '',
              bgColor: '#0284c7',
              textColor: '#ffffff',
              borderColor: '#0284c7',
              borderWidth: 0,
              borderRadius: 4,
              fontSize: 15,
              fontWeight: '700',
            },
          ])
        }
        className="w-full"
      >
        <Plus className="h-4 w-4" /> Add button
      </SecondaryButton>
    </div>
  );
}
