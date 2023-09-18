import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6O7mZGEtupk15gzdiulAR83A2C8H2ewA",
  authDomain: "gvs-console.firebaseapp.com",
  projectId: "gvs-console",
  storageBucket: "gvs-console.appspot.com",
  messagingSenderId: "555680650777",
  appId: "1:555680650777:web:e6da39261029f46f473c88",
  measurementId: "G-LZHN7QTJ9V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };

