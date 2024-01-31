import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARYIF48kiSF4gQIaCOllzLdKpfRDhixN8",
  authDomain: "learn-01-70ac8.firebaseapp.com",
  projectId: "learn-01-70ac8",
  storageBucket: "learn-01-70ac8.appspot.com",
  messagingSenderId: "843910193183",
  appId: "1:843910193183:web:0cce6c0237836babd9752a",
  measurementId: "G-25W52EQE62"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;