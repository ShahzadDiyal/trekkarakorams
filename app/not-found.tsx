import type { Metadata } from 'next';
import Link from 'next/link';
import { Mountain } from 'lucide-react';

// A dedicated page here (instead of relying on the Next.js default) ensures
// every unmatched route still gets Trek Karakoram branding, a real HTTP 404
// status, and useful internal links back into the site.
export const metadata: Metadata = {
  title: 'Page Not Found | Trek Karakoram',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <Mountain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-slate-900">404 — Page Not Found</h1>
        <p className="text-[16px] text-slate-600 mt-2">
          That page doesn't exist or may have moved. Try browsing our treks, or head back home.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/treks"
            className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold text-[14px] px-5 py-2.5 uppercase tracking-wider transition-colors"
          >
            Browse All Treks
          </Link>
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] px-5 py-2.5 uppercase tracking-wider transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
