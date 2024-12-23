import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJzZQDE26hZdpf-xFygAkJiEDh7q2JAxg",
  authDomain: "volunteer-app-d0d68.firebaseapp.com",
  projectId: "volunteer-app-d0d68",
  storageBucket: "volunteer-app-d0d68.appspot.com",
  messagingSenderId: "417987473500",
  appId: "1:417987473500:web:59effafccad066521bf699",
  measurementId: "G-HB9CJ5SP8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export db and timestamp so they can be used in other files
export { db};