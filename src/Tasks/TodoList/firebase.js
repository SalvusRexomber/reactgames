// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyC2mwHQtJ_5Uttvb-L4TKdE3ZbWkpi4XcA",
  authDomain: "todolist-f65d2.firebaseapp.com",
  projectId: "todolist-f65d2",
  storageBucket: "todolist-f65d2.firebasestorage.app",
  messagingSenderId: "578484429174",
  appId: "1:578484429174:web:1931d80a68d9a982d01a57",
  measurementId: "G-FT45MPDCGP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
