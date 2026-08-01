// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "jungwook-profile.firebaseapp.com",
  projectId: "jungwook-profile",
  storageBucket: "jungwook-profile.appspot.com",
  messagingSenderId: '2893561464',
  appId: '1:22893561464:web:e54e5c29d63c5853ac4f8d',
  measurementId: 'G-0B78BLLMD0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);