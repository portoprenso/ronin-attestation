import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";

console.log(process.env.apiKey)

const app = initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
});

export const db = getFirestore(app);
export const auth = getAuth(app);