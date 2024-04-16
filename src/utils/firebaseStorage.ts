// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD10l_qZ5TKqzHzwu1FIwGm8yV6piR809s",
  authDomain: "erohub-406408.firebaseapp.com",
  projectId: "erohub-406408",
  storageBucket: "erohub-406408.appspot.com",
  messagingSenderId: "509855982536",
  appId: "1:509855982536:web:1bbbbad7a3725ec1cad6fd",
  measurementId: "G-TDWFCBVGGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)