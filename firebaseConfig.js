// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import { getStorage } from "firebase/storage";

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
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const STORAGE = getStorage(FIREBASE_APP);

export { firebase };
