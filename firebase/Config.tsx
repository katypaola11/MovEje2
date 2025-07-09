// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBntFl3UdP8sxqHqT7Ytq4FozKYERoEcrw",
  authDomain: "app-ejercicio2.firebaseapp.com",
  projectId: "app-ejercicio2",
  storageBucket: "app-ejercicio2.firebasestorage.app",
  messagingSenderId: "772007781831",
  appId: "1:772007781831:web:5f716f005bfa99f0c965e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);