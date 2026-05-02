// Import Firebase core
import { initializeApp } from "firebase/app";

// 🔥 ADD THESE (important)
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// (Optional analytics)
import { getAnalytics } from "firebase/analytics";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyANi8SEm-IbDMWT77bG0chI9f-LkCyveaU",
  authDomain: "motioniq-76b98.firebaseapp.com",
  projectId: "motioniq-76b98",
  storageBucket: "motioniq-76b98.firebasestorage.app",
  messagingSenderId: "63323005598",
  appId: "1:63323005598:web:d80b641209ece65212d18f",
  measurementId: "G-B60FF61VDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional (can keep or remove)
const analytics = getAnalytics(app);

// ✅ 🔥 EXPORT THESE (THIS FIXES YOUR ERROR)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);