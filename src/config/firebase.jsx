// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_IZbLOMQ4aAca7cJqOvCwHYqnied5qL0",
  authDomain: "react-todos-practice.firebaseapp.com",
  projectId: "react-todos-practice",
  storageBucket: "react-todos-practice.firebasestorage.app",
  messagingSenderId: "241371481932",
  appId: "1:241371481932:web:a1868146a0ed79bdf831e9",
  measurementId: "G-PK0T0HKS13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)

export { analytics, auth, firestore }
