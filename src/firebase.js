import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyA31W-GOY1OU_gykHw9u8gvOLknq6TeLi0",
  authDomain: "help-web-92738.firebaseapp.com",
  projectId: "help-web-92738",
  storageBucket: "help-web-92738.appspot.com",
  messagingSenderId: "805304770056",
  appId: "1:805304770056:web:68ab29c609ee1fc0883bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);