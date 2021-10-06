import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyDahDsihomVM182rwr2_9G3hGsQf5tbO4w",
    authDomain: "ronin-project-ff1a7.firebaseapp.com",
    projectId: "ronin-project-ff1a7",
    storageBucket: "ronin-project-ff1a7.appspot.com",
    messagingSenderId: "508457530615",
    appId: "1:508457530615:web:df83ffe89c631266940ff2",
});

export const db = getFirestore(app);
export const auth = getAuth(app);