import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiNxV2Dt6RsR4VNpwrJqTEQsQ-HURz4no",
  authDomain: "app-avaliacao-a3f28.firebaseapp.com",
  projectId: "app-avaliacao-a3f28",
  storageBucket: "app-avaliacao-a3f28.appspot.com",
  messagingSenderId: "602527827793",
  appId: "1:602527827793:web:0f0336d1d09ff510dcf570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}