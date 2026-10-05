import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Web app's Firebase configuration (trekkarakoram-8e58b)
const firebaseConfig = {
  apiKey: 'AIzaSyBKu39kLkYWcaYpvBMio28WPVAR4PDyW0g',
  authDomain: 'trekkarakoram-8e58b.firebaseapp.com',
  projectId: 'trekkarakoram-8e58b',
  storageBucket: 'trekkarakoram-8e58b.firebasestorage.app',
  messagingSenderId: '711505575535',
  appId: '1:711505575535:web:434841ae46c0df2a02179a',
  measurementId: 'G-7BMMD0YHBR',
};

const app: FirebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Analytics is browser-only; guard for SSR.
let analytics: Analytics | null = null;
export function getFirebaseAnalytics(): Analytics | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!analytics) analytics = getAnalytics(app);
    return analytics;
  } catch {
    return null;
  }
}

export default app;
