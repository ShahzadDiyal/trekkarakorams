'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SiteSettingsProvider } from '@/lib/site-settings';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import { AnnouncementBar } from '@/components/AnnouncementBar';

/** Hides the public navbar/footer inside /admin so the admin has its own shell. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SiteSettingsProvider>
      <DynamicFavicon />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </SiteSettingsProvider>
  );
}
