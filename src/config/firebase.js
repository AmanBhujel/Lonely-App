import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgYizyF5purxjem-q-CCW_7m6dIwGL1XU",
  authDomain: "startup-app-bb5a1.firebaseapp.com",
  projectId: "startup-app-bb5a1",
  storageBucket: "startup-app-bb5a1.appspot.com",
  messagingSenderId: "1029043901263",
  appId: "1:1029043901263:web:cbd49492667e316edf2b3a",
  measurementId: "G-PVRRKJF332"
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