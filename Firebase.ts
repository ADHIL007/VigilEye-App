// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo-5yeWtrtHVeFdPgn1B3bYCbIAidhXyI",
  authDomain: "vigileye-ea302.firebaseapp.com",
  projectId: "vigileye-ea302",
  storageBucket: "vigileye-ea302.appspot.com",
  messagingSenderId: "",
  appId: "1:727530988514:web:fc517713a7888b779ecfbb",
  measurementId: "G-N6ZEWQ3YLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
