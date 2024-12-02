import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCB3g5Lc3S7BLON61CaD5ZUAipbBvXkAc",
    authDomain: "ubongo-3d-d2125.firebaseapp.com",
    projectId: "ubongo-3d-d2125",
    storageBucket: "ubongo-3d-d2125.firebasestorage.app",
    messagingSenderId: "696038951485",
    appId: "1:696038951485:web:d11c7e5ce7e7af75e8b854"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();