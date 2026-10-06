'use client';

import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  increment,
  arrayUnion,
} from 'firebase/firestore';

/**
 * Public write helpers — booking form + newsletter.
 *
 * Visitors are NOT signed in, so these rely on the Firestore rules in
 * `lib/admin/firestore.rules` which allow validated public creates on
 * `bookings` and `customers` (admin-only reads). The rules must be deployed
 * in the Firebase console for these writes to succeed.
 */

export interface BookingSubmission {
  trekTitle: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  travelDate: string;
  travelers: number;
  message: string;
}

/** Deterministic customer doc id derived from the email — lets the public
 *  client upsert without read access (no duplicate customer rows). */
export function customerDocId(email: string): string {
  const clean = email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
  return `web_${clean || 'unknown'}`;
}

interface CustomerUpsert {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
  tag: string;
  /** true when this interaction was a trip booking (bumps totalTrips). */
  countTrip: boolean;
}

export async function upsertCustomer({
  name,
  email,
  phone,
  country,
  notes,
  tag,
  countTrip,
}: CustomerUpsert): Promise<void> {
  const ref = doc(db, 'customers', customerDocId(email));
  await setDoc(
    ref,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      country: (country || '').trim(),
      notes: notes || '',
      tags: arrayUnion(tag),
      totalTrips: increment(countTrip ? 1 : 0),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Save a website booking request and link it to a customer record. */
export async function saveBooking(sub: BookingSubmission): Promise<void> {
  await addDoc(collection(db, 'bookings'), {
    trekTitle: sub.trekTitle,
    name: sub.name.trim(),
    email: sub.email.trim().toLowerCase(),
    phone: sub.phone.trim(),
    country: (sub.country || '').trim(),
    travelDate: (sub.travelDate || '').trim(),
    travelers: sub.travelers > 0 ? sub.travelers : 1,
    message: (sub.message || '').trim(),
    status: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
  });

  await upsertCustomer({
    name: sub.name,
    email: sub.email,
    phone: sub.phone,
    country: sub.country,
    notes: `Latest booking: ${sub.trekTitle}${sub.travelDate ? ` (${sub.travelDate})` : ''}`,
    tag: 'website-booking',
    countTrip: true,
  });
}

/** Save a newsletter subscriber as a customer record. */
export async function saveNewsletterSubscriber(email: string): Promise<void> {
  await upsertCustomer({
    name: 'Newsletter subscriber',
    email,
    notes: 'Subscribed via website newsletter',
    tag: 'newsletter',
    countTrip: false,
  });
}
