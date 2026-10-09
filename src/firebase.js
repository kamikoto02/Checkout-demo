import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAFKtNWaL1QrBNGOBAA20QPuifWPlY75Uc",
    authDomain: "checkout-bf782.firebaseapp.com",
    projectId: "checkout-bf782",
    storageBucket: "checkout-bf782.firebasestorage.app",
    messagingSenderId: "384931742480",
    appId: "1:384931742480:web:9c1f4ae3659c478711db95",
    measurementId: "G-R4GN0W52LS"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);