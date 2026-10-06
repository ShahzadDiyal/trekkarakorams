'use client';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { FAQ_ITEMS } from '@/data/treks';

/**
 * Public-website content fetched live from Firestore.
 * Every function falls back to the site's static data if the database
 * can't be reached, so the website never renders empty.
 */

export interface PublicFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

function toPublicFaq(id: string, data: Record<string, unknown>): PublicFaq {
  return {
    id,
    category: String(data.category ?? 'General'),
    question: String(data.question ?? ''),
    answer: String(data.answer ?? ''),
  };
}

function staticFaqs(): PublicFaq[] {
  return FAQ_ITEMS.map((f, i) => ({
    id: `static-${i}`,
    category: f.category,
    question: f.question,
    answer: f.answer,
  }));
}

/** FAQs for the homepage section and /faq page — live from the `faqs` collection.
 *  The database is the source of truth: whatever the admin panel saves is
 *  what the site shows. Static data is only a fallback when Firestore
 *  itself can't be reached. */
export async function getFaqs(): Promise<PublicFaq[]> {
  try {
    const snap = await getDocs(query(collection(db, 'faqs'), orderBy('order', 'asc')));
    return snap.docs.map((d) => toPublicFaq(d.id, d.data() as Record<string, unknown>));
  } catch {
    return staticFaqs();
  }
}
