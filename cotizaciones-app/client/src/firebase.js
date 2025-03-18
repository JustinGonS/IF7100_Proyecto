// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkqy_gyEydu9TgJxkZON1w4Af0Msm-oFM",
    authDomain: "ingeneria-1014f.firebaseapp.com",
    projectId: "ingeneria-1014f",
    storageBucket: "ingeneria-1014f.firebasestorage.app",
    messagingSenderId: "30141490370",
    appId: "1:30141490370:web:8e3b36402dd73a8ccd475b",
    measurementId: "G-KNQNMZMLS0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

