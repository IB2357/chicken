import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


///////////////////////////////////////////////////////////////////////// Pasted from firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "ddddddddddddddd",
  authDomain: "ddddddddddddddd",
  projectId: "ddddddddddddddd",
  storageBucket: "ddddddddddddddd",
  messagingSenderId: "ddddddddddddddd",
  appId: "ddddddddddddddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////// END




const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, storage, auth };

