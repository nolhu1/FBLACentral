import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC1ysvgq81jUIkkmX21tXi-u147ezdjLHE",
  authDomain: "fbla-central.firebaseapp.com",
  projectId: "fbla-central",
  storageBucket: "fbla-central.firebasestorage.app",
  messagingSenderId: "501768903545",
  appId: "1:501768903545:web:3525bfed8e400fee3d6da8"
};

export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();
