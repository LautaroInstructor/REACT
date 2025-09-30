// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCelxNBGFzW9Rb4yCLjBMs2MDNVaXyaliU",
  authDomain: "react-c9733.firebaseapp.com",
  projectId: "react-c9733",
  storageBucket: "react-c9733.firebasestorage.app",
  messagingSenderId: "937633766758",
  appId: "1:937633766758:web:e18886a2cfeb7de0913ca7",
  measurementId: "G-9PRRX78S4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);