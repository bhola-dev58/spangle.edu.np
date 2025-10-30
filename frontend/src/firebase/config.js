import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// TODO: Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAQNx9MNddhRztuXZDOWgWHIU3M9UKDs00",
  authDomain: "spangle-edu-1fef0.firebaseapp.com",
  projectId: "spangle-edu-1fef0",
  storageBucket: "spangle-edu-1fef0.firebasestorage.app",
  messagingSenderId: "56010893093",
  appId: "1:56010893093:web:539861021c4ad62a795ccc",
  measurementId: "G-TY8C9TT32X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
