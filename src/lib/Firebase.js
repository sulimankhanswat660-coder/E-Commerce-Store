// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBZr4efWrAMfY0ZQ6YJG7rSGcNyLgqdn1U",
  authDomain: "new-project-2d7ca.firebaseapp.com",
  projectId: "new-project-2d7ca",
  storageBucket: "new-project-2d7ca.firebasestorage.app",
  messagingSenderId: "43293362666",
  appId: "1:43293362666:web:c714837e767813ee0eca93",
  measurementId: "G-0G0RRKRWJ8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
