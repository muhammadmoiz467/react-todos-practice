// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKzGEfUMifLBnPet0g06wNl4BDTAkCk9M",
  authDomain: "react-todos-6.firebaseapp.com",
  projectId: "react-todos-6",
  storageBucket: "react-todos-6.firebasestorage.app",
  messagingSenderId: "459963266739",
  appId: "1:459963266739:web:4cb5b2169090257478a2c6",
  measurementId: "G-0TW5KCP3V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { analytics, auth }