import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration using Vite environment variables (fallback to hardcoded values if unset)
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyA27yvSInQnH3l8QV5VuTvxrlpd5Xu1yzc",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "ansotechcompany-19e97.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "ansotechcompany-19e97",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "ansotechcompany-19e97.appspot.com",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "164667596105",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:164667596105:web:5088f1e44b97602f390e98",
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-41EDG23NL5"
};

// Singleton pattern: Prevent re-initialization during hot module replacement (HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize and Export Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Safe Analytics initialization
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Analytics not supported in this environment:", err);
  });
}

export default app;