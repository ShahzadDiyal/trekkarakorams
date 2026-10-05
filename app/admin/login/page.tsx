'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Mountain, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed.';
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/[^)]+\)\.?/, '').trim());
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-900">
            <Mountain className="h-7 w-7" />
          </span>
          <h1 className="text-2xl font-bold text-white">Trek Karakoram</h1>
          <p className="mt-1 text-sm text-slate-400">Admin panel sign in</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-2xl">
          {error && (
            <p className="mb-4 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700">
              {error}
            </p>
          )}
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@trekkarakoram.com"
            className="mb-4 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mb-5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
            First time? Create an admin user in the Firebase Console → Authentication → Users, then
            sign in here.
          </p>
        </form>
      </div>
    </div>
  );
}
