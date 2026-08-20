import Link from 'next/link';
import { Mountain } from 'lucide-react';

export default function TrekNotFound() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <Mountain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-slate-900">Trek Not Found</h1>
        <p className="text-[16px] text-slate-600 mt-2">
          We couldn't find that expedition package. It may have been renamed or retired for the current season.
        </p>
        <Link
          href="/treks"
          className="inline-block mt-6 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[13px] px-5 py-2.5 uppercase tracking-wider transition-colors"
        >
          Browse All Treks
        </Link>
      </div>
    </div>
  );
}
