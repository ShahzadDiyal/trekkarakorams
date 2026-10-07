'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  LayoutDashboard,
  Mountain,
  Newspaper,
  Users,
  MessageSquareQuote,
  HelpCircle,
  MapPin,
  Images,
  Settings,
  CalendarCheck,
  Contact,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Spinner } from './ui';
import { useSiteSettings } from '@/lib/site-settings';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/treks', label: 'Treks & Plans', icon: Mountain },
  { href: '/admin/blogs', label: 'Blog Posts', icon: Newspaper },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/customers', label: 'Customers', icon: Contact },
  { href: '/admin/settings', label: 'Website Settings', icon: Settings },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  // Live brand from Website Settings — the sidebar logo updates the moment
  // the logo is changed in settings.
  const settings = useSiteSettings();

  const logout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-300">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        {settings.logoUrl ? (
          <img
            src={settings.logoUrl}
            alt={settings.siteName || 'Trek Karakoram'}
            className="h-10 w-10 shrink-0 rounded-xl bg-white object-contain p-1"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 font-bold text-white">
            TK
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">
            {settings.siteName || 'Trek Karakoram'}
          </p>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user === null && pathname !== '/admin/login') router.push('/admin/login');
    if (user && pathname === '/admin/login') router.push('/admin');
  }, [user, pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (user === null) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60" onClick={() => setMenuOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw]">
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {NAV.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.label ??
                'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {user.email}
            </span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              View site
            </a>
          </div>
        </header>

        <main className="mx-auto w-full flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
