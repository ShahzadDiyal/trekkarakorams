import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { SiteSettingsProvider } from '@/lib/site-settings';

export const metadata: Metadata = {
  title: 'Admin Panel | Trek Karakoram',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteSettingsProvider>
      <AdminShell>{children}</AdminShell>
    </SiteSettingsProvider>
  );
}
