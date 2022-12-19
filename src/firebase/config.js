import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO4XcsdEIJMILSkqiwqvXCXH-UzBYXFaw",
  authDomain: "social-app-8618d.firebaseapp.com",
  projectId: "social-app-8618d",
  storageBucket: "social-app-8618d.appspot.com",
  messagingSenderId: "276681334959",
  appId: "1:276681334959:web:461fe7e137be7f5a26f45a",
  measurementId: "G-ERN8KWND6X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { db, auth, storage, analytics };
