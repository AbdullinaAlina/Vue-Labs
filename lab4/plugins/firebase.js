// plugins/firebase.js
import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDxIgzGTdI1ukLHQC6NM_Zq_FdXAoIgDQw",
  authDomain: "nuxt-blog-53c9f.firebaseapp.com",
  projectId: "nuxt-blog-53c9f",
  storageBucket: "nuxt-blog-53c9f.appspot.com",
  messagingSenderId: "370473189327",
  appId: "1:370473189327:web:12191429d2fa18a4121cba"
};

// Initialize Firebase and export auth
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth }; // Named export for auth

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('auth', auth);
});
