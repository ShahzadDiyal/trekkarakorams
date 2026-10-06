'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import type { FooterColumn, FooterLinkItem } from '@/lib/admin/types';
import { SecondaryButton } from '@/components/admin/ui';

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none';

/** Footer link columns (title + list of links). */
export function FooterColumnsEditor({
  columns,
  onChange,
}: {
  columns: FooterColumn[];
  onChange: (columns: FooterColumn[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const update = (i: number, patch: Partial<FooterColumn>) => {
    const next = [...columns];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const updateLink = (i: number, li: number, patch: Partial<FooterLinkItem>) => {
    const next = [...columns];
    const links = [...next[i].links];
    links[li] = { ...links[li], ...patch };
    next[i] = { ...next[i], links };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {columns.map((col, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-2 p-3">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label={open === i ? 'Collapse' : 'Expand'}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <input
              className={`${inputCls} font-semibold`}
              placeholder="Column title (e.g. Popular Treks)"
              value={col.title}
              onChange={(e) => update(i, { title: e.target.value })}
            />
            <span className="shrink-0 text-xs text-slate-400">{col.links.length} links</span>
            <button
              type="button"
              onClick={() => onChange(columns.filter((_, j) => j !== i))}
              className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Delete column"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {open === i && (
            <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 p-3">
              {col.links.map((link, li) => (
                <div key={li} className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    placeholder="Link label"
                    value={link.label}
                    onChange={(e) => updateLink(i, li, { label: e.target.value })}
                  />
                  <input
                    className={inputCls}
                    placeholder="Link (e.g. /treks/k2-basecamp)"
                    value={link.href}
                    onChange={(e) => updateLink(i, li, { href: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(i, { links: col.links.filter((_, j) => j !== li) })
                    }
                    className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update(i, { links: [...col.links, { label: '', href: '' }] })}
                className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
              >
                <Plus className="h-3.5 w-3.5" /> Add link
              </button>
            </div>
          )}
        </div>
      ))}

      <SecondaryButton
        type="button"
        onClick={() => onChange([...columns, { title: '', links: [] }])}
        className="w-full"
      >
        <Plus className="h-4 w-4" /> Add footer column
      </SecondaryButton>
    </div>
  );
}
