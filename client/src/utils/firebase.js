// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-notes-b25b3.firebaseapp.com",
  projectId: "ai-notes-b25b3",
  storageBucket: "ai-notes-b25b3.firebasestorage.app",
  messagingSenderId: "270867355389",
  appId: "1:270867355389:web:e4e0f9b454122878061094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}
