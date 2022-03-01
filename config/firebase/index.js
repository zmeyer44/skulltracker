// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJFn_IDdn--M-fBrVmJqa-fcI7mGstjLc",
  authDomain: "skulltracker.firebaseapp.com",
  projectId: "skulltracker",
  storageBucket: "skulltracker.appspot.com",
  messagingSenderId: "86081426310",
  appId: "1:86081426310:web:17e1b81ce93bbb39ce9207",
  measurementId: "G-X52WE0T2VY",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
