// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc,getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLO5uXaBw0TVzXxy5fM6ojoKcCnoTGUR4",
  authDomain: "ashi-bg.firebaseapp.com",
  projectId: "ashi-bg",
  storageBucket: "ashi-bg.appspot.com",
  messagingSenderId: "218621680845",
  appId: "1:218621680845:web:78c72974c5b3e87f061d84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Ensure you are getting Firestore instance

// Export the database for use in other modules
export { db, collection, doc, setDoc, getDoc, getFirestore,getDocs};