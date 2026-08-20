import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function BlogPostNotFound() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-slate-900">Article Not Found</h1>
        <p className="text-[16px] text-slate-600 mt-2">
          This guide may have been moved or is no longer available.
        </p>
        <Link
          href="/blog"
          className="inline-block mt-6 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[13px] px-5 py-2.5 uppercase tracking-wider transition-colors"
        >
          Browse All Guides
        </Link>
      </div>
    </div>
  );
}
