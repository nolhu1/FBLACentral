import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase/firebaseDb';
import type { UserProfile, NotificationPrefs } from '../types/models';

/**
 * Creates users/{userId} with safe defaults if it does not exist.
 * Safe to call multiple times (uses merge).
 */
export async function createUserDocIfMissing(userId: string) {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        name: 'Member',
        chapterId: '',
        state: '',
        gradYear: 0,
        role: 'member',
        interests: [],
        notificationPrefs: {
          announcements: true,
          events: true,
          resources: true,
          quietHours: null,
        } as NotificationPrefs,
        onboardingComplete: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
}

/**
 * Fetches users/{userId}
 * Returns null if missing.
 */
export async function getUserDoc(
  userId: string
): Promise<(UserProfile & { onboardingComplete: boolean }) | null> {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: userId,
    name: data.name ?? 'Member',
    chapterId: data.chapterId ?? '',
    state: data.state ?? '',
    gradYear: data.gradYear ?? 0,
    role: data.role ?? 'member',
    interests: data.interests ?? [],
    photoURL: data.photoURL,
    onboardingComplete: data.onboardingComplete ?? false,
  };
}

/**
 * Completes onboarding and updates required fields.
 */
export async function completeOnboarding(
  userId: string,
  payload: {
    chapterId: string;
    state: string;
    gradYear: number;
    interests: string[];
    notificationPrefs: NotificationPrefs;
  }
) {
  const ref = doc(db, 'users', userId);

  await updateDoc(ref, {
    chapterId: payload.chapterId,
    state: payload.state,
    gradYear: payload.gradYear,
    interests: payload.interests,
    notificationPrefs: payload.notificationPrefs,
    onboardingComplete: true,
    updatedAt: serverTimestamp(),
  });
}