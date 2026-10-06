'use client';

import { useEffect } from 'react';
import { useSiteSettings } from '@/lib/site-settings';

/**
 * Applies the favicon chosen in the admin panel (Website Settings → Favicon).
 * Updates every icon link tag so the new favicon takes effect immediately
 * without a rebuild. Does nothing when no custom favicon is set.
 */
export function DynamicFavicon() {
  const { faviconUrl, loaded } = useSiteSettings();

  useEffect(() => {
    if (!loaded || !faviconUrl) return;
    const selectors = ['link[rel="icon"]', 'link[rel="shortcut icon"]', 'link[rel="apple-touch-icon"]'];
    selectors.forEach((selector) => {
      document.querySelectorAll<HTMLLinkElement>(selector).forEach((link) => {
        link.href = faviconUrl;
      });
    });
    // Ensure at least one icon link exists.
    if (!document.querySelector('link[rel="icon"]')) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
    }
  }, [faviconUrl, loaded]);

  return null;
}
