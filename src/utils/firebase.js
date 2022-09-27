import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBYTIqoNCDp_EQV1fbFjqJMQGG1EEGBUqw",
  authDomain: "tenedores-89125.firebaseapp.com",
  projectId: "tenedores-89125",
  storageBucket: "tenedores-89125.appspot.com",
  messagingSenderId: "676963572136",
  appId: "1:676963572136:web:29acce0deeb0072c2d659d"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);