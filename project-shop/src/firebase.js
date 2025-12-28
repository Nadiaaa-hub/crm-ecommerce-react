import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4_v7wQbgs52xAmaZFa6BdK8Bdd7JzjQo",
  authDomain: "web-app-9f9a2.firebaseapp.com",
  projectId: "web-app-9f9a2",
  storageBucket: "web-app-9f9a2.firebasestorage.app",
  messagingSenderId: "481847028928",
  appId: "1:481847028928:web:63ae335e9898212b7f5125",
  measurementId: "G-L2PB7HN33J",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);
