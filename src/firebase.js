import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALYeatzGLgdelakb6ZaVP_LXmJmmolPY8",
  authDomain: "financely-react-77de5.firebaseapp.com",
  projectId: "financely-react-77de5",
  storageBucket: "financely-react-77de5.firebasestorage.app",
  messagingSenderId: "1093639914870",
  appId: "1:1093639914870:web:f11c8056e80b13e25c2657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};