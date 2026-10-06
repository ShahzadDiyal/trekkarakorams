'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, CornerDownRight } from 'lucide-react';
import type { NavMenuItem, NavSubItem } from '@/lib/admin/types';
import { SecondaryButton } from '@/components/admin/ui';

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none';

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** Header navigation menus with one level of sub-menus (dropdowns). */
export function MenuEditor({
  menus,
  onChange,
}: {
  menus: NavMenuItem[];
  onChange: (menus: NavMenuItem[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const update = (i: number, patch: Partial<NavMenuItem>) => {
    const next = [...menus];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const updateChild = (i: number, ci: number, patch: Partial<NavSubItem>) => {
    const next = [...menus];
    const children = [...(next[i].children ?? [])];
    children[ci] = { ...children[ci], ...patch };
    next[i] = { ...next[i], children };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {menus.map((menu, i) => (
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
              placeholder="Menu label (e.g. DESTINATIONS)"
              value={menu.label}
              onChange={(e) => update(i, { label: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Link (e.g. /treks)"
              value={menu.href}
              onChange={(e) => update(i, { href: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange(move(menus, i, -1))}
              disabled={i === 0}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              aria-label="Move up"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(move(menus, i, 1))}
              disabled={i === menus.length - 1}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
              aria-label="Move down"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(menus.filter((_, j) => j !== i))}
              className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Delete menu"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {open === i && (
            <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <CornerDownRight className="h-3.5 w-3.5" /> Sub-menus (dropdown)
              </p>
              {(menu.children ?? []).map((child, ci) => (
                <div key={ci} className="flex items-center gap-2 pl-5">
                  <input
                    className={inputCls}
                    placeholder="Sub-menu label"
                    value={child.label}
                    onChange={(e) => updateChild(i, ci, { label: e.target.value })}
                  />
                  <input
                    className={inputCls}
                    placeholder="Link (e.g. /treks/k2)"
                    value={child.href}
                    onChange={(e) => updateChild(i, ci, { href: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...menus];
                      next[i] = {
                        ...next[i],
                        children: (next[i].children ?? []).filter((_, j) => j !== ci),
                      };
                      onChange(next);
                    }}
                    className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete sub-menu"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update(i, { children: [...(menu.children ?? []), { label: '', href: '' }] })
                }
                className="ml-5 flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
              >
                <Plus className="h-3.5 w-3.5" /> Add sub-menu
              </button>
            </div>
          )}
        </div>
      ))}

      <SecondaryButton
        type="button"
        onClick={() => onChange([...menus, { label: '', href: '', children: [] }])}
        className="w-full"
      >
        <Plus className="h-4 w-4" /> Add menu item
      </SecondaryButton>
    </div>
  );
}
