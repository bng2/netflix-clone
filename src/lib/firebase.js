// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "netflix-clone-b600d.firebaseapp.com",
  projectId: "netflix-clone-b600d",
  storageBucket: "netflix-clone-b600d.appspot.com",
  messagingSenderId: "288321055471",
  appId: "1:288321055471:web:74e43b7bb0874832efc91a",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

export { auth, db };
