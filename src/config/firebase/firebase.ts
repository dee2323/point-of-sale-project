// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu7Pugm6qK58X0s2y0wmOj2F-EezetmTk",
  authDomain: "pos-project-deema.firebaseapp.com",
  projectId: "pos-project-deema",
  storageBucket: "pos-project-deema.appspot.com",
  messagingSenderId: "45425329843",
  appId: "1:45425329843:web:2e6ea9ce5da634967952c6",
  measurementId: "G-1V664MBBHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
