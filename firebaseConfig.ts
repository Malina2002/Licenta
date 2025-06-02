import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurația Firebase – înlocuiește valorile cu cele reale din Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCzZToZaRm8wwtELeZ5pujA7fW9Wazi7lQ",
  authDomain: "beautyscan-99d8d.firebaseapp.com",
  projectId: "beautyscan-99d8d",
  storageBucket: "beautyscan-99d8d.appspot.com",
  messagingSenderId: "773416236925",
  appId: "1:773416236925:web:56b0a8dbaf47239e28be14",
  measurementId: "G-9GEC4T89B3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
