import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-ab7fc.firebaseapp.com",
  projectId: "authexamnotes-ab7fc",
  storageBucket: "authexamnotes-ab7fc.firebasestorage.app",
  messagingSenderId: "947925754366",
  appId: "1:947925754366:web:c1b4cc25e9935cfe98a0af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}