// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmcrTzBYDkH-8nqb994fECmsg7a7yN_rE",
  authDomain: "project-46750.firebaseapp.com",
  projectId: "project-46750",
  storageBucket: "project-46750.firebasestorage.app",
  messagingSenderId: "753210323345",
  appId: "1:753210323345:web:47d03918147c8c6dd7ea30",
  measurementId: "G-LC6TM0NFDT"
};



export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

