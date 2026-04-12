
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import{getAuth, GoogleAuthProvider} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authai-notes.firebaseapp.com",
  projectId: "authai-notes",
  storageBucket: "authai-notes.firebasestorage.app",
  messagingSenderId: "548485119350",
  appId: "1:548485119350:web:5844ccd059c4f2cfad4e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}