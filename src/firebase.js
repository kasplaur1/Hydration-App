// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBfz9fsHE4j6gCFcxqBWiwNyrhbgmLywoc",
  authDomain: "hydration-buddy-dc4ba.firebaseapp.com",
  projectId: "hydration-buddy-dc4ba",
  storageBucket: "hydration-buddy-dc4ba.firebasestorage.app",
  messagingSenderId: "7682367271",
  appId: "1:7682367271:web:b720d43c44383e9a679302",
  measurementId: "G-YVLN0T51D0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);