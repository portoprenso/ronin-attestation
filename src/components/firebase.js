import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth  } from "firebase/auth";
import "firebase/database";
import "firebase/firestore";

console.log(process.env.apiKey)

const app = initializeApp({
    apiKey: "AIzaSyDahDsihomVM182rwr2_9G3hGsQf5tbO4w",
    authDomain: "ronin-project-ff1a7.firebaseapp.com",
    projectId: "ronin-project-ff1a7",
    storageBucket: "ronin-project-ff1a7.appspot.com",
    messagingSenderId: "508457530615",
    appId: "1:508457530615:web:df83ffe89c631266940ff2",
});
// const app = initializeApp({
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
// });

export const db = getFirestore(app);
export const auth = getAuth(app);