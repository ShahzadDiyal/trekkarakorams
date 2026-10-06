import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const COLLECTIONS = {
  settings: 'settings',
  hero: 'hero',
  treks: 'treks',
  blogs: 'blogs',
  team: 'team',
  testimonials: 'testimonials',
  faqs: 'faqs',
  destinations: 'destinations',
  bookings: 'bookings',
  customers: 'customers',
} as const;

/** List all docs in a collection, newest first when possible. */
export async function listDocs<T>(collectionName: string): Promise<(T & { id: string })[]> {
  const col = collection(db, collectionName);
  let snap;
  try {
    snap = await getDocs(query(col, orderBy('createdAt', 'desc')));
  } catch {
    snap = await getDocs(col);
  }
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

/** Get a single doc by id; returns null when missing. */
export async function getDocById<T>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

/** Create a doc with an auto id. Returns the new id. */
export async function createDoc<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Overwrite (or create) a doc with a known id. */
export async function saveDoc<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } else {
    await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
}

/** Delete a doc by id. */
export async function deleteDocById(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

/** Update selected fields of a doc. */
export async function patchDoc(
  collectionName: string,
  id: string,
  data: DocumentData
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() });
}
