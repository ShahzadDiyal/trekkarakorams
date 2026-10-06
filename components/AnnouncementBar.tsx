'use client';

import { Megaphone } from 'lucide-react';
import { useSiteSettings } from '@/lib/site-settings';

/**
 * Announcement bar driven by the admin panel
 * (Website Settings → Footer & announcements).
 */
export function AnnouncementBar() {
  const { announcementBar, announcementBarEnabled, loaded } = useSiteSettings();

  if (!loaded || !announcementBarEnabled || !announcementBar.trim()) return null;

  return (
    <div className="bg-amber-400 text-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <Megaphone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-[13px] font-bold tracking-wide">{announcementBar}</p>
      </div>
    </div>
  );
}
