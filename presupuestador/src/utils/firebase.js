// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyColGiuBXzxJq_P5S5Ov3Uo0M-nOmKTwzA",
  authDomain: "tucostore-873da.firebaseapp.com",
  projectId: "tucostore-873da",
  storageBucket: "tucostore-873da.appspot.com",
  messagingSenderId: "467400232704",
  appId: "1:467400232704:web:68405898b2139e77fe6de5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export default db
