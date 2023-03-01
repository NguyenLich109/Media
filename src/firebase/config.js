import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWxzfQjXWs9GUOFhB5Z6Erw9D3NUS-FXY",
  authDomain: "media-cd4c3.firebaseapp.com",
  projectId: "media-cd4c3",
  storageBucket: "media-cd4c3.appspot.com",
  messagingSenderId: "308346808241",
  appId: "1:308346808241:web:f0bbb6aa7bba699e3e3f90",
  measurementId: "G-91EPMY3PQS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { db, auth, storage, analytics };
