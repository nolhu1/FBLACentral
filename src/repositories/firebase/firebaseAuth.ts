// src/repositories/firebase/firebaseAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from './firebaseApp';
import { 
  initializeAuth, 
  // @ts-ignore
  getReactNativePersistence,
  getAuth
} from 'firebase/auth';

let authInstance;

try {
  // Try to initialize with React Native persistence
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized, fallback to getAuth
  authInstance = getAuth(app);
}

export const auth = authInstance;