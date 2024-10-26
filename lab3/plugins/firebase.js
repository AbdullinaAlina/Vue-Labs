// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxIgzGTdI1ukLHQC6NM_Zq_FdXAoIgDQw",
  authDomain: "nuxt-blog-53c9f.firebaseapp.com",
  projectId: "nuxt-blog-53c9f",
  storageBucket: "nuxt-blog-53c9f.appspot.com",
  messagingSenderId: "370473189327",
  appId: "1:370473189327:web:12191429d2fa18a4121cba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)