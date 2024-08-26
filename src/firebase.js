// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMoetg02tqRWSxj_Nfj8uL9kvqoP9ET64",
  authDomain: "focus-b63d7.firebaseapp.com",
  projectId: "focus-b63d7",
  storageBucket: "focus-b63d7.appspot.com",
  messagingSenderId: "374539647504",
  appId: "1:374539647504:web:1cd68c486e1c673d2fa895",
  measurementId: "G-XW0CZTL8PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
