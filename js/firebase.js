// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/firebase-app.js";
import { getAnalytics } from "firebase/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR3cYuAwAuOMs2MtisFI3rmWFsEv-n8N8",
  authDomain: "leader-board-da464.firebaseapp.com",
  databaseURL: "https://leader-board-da464-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "leader-board-da464",
  storageBucket: "leader-board-da464.firebasestorage.app",
  messagingSenderId: "562083629862",
  appId: "1:562083629862:web:92ce91063127961b08cfe7",
  measurementId: "G-09TFYFR6VF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);