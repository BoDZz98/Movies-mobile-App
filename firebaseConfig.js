// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArpQ4Z3ZcrHX7cL65S7WnKCq5UvuVuTWo",
  authDomain: "movies-imdp.firebaseapp.com",
  projectId: "movies-imdp",
  storageBucket: "movies-imdp.appspot.com",
  messagingSenderId: "136907590740",
  appId: "1:136907590740:web:f2134d09b70ff66dbb71c1",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
