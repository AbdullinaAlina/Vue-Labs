<!-- LoginOverlay.vue -->

<template>
    <div class="login-overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h3>Login</h3>
        <form @submit.prevent="handleLogin">
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Login</button>
        </form>
        <p @click="showForgotPassword" class="forgot-password">Forgot Password?</p>
      </div>
  
      <div v-if="isForgotPassword" class="forgot-password-overlay">
        <h3>Reset Password</h3>
        <form @submit.prevent="handleResetPassword">
          <input type="email" placeholder="Email" v-model="resetEmail" required />
          <button type="submit">Send Reset Email</button>
        </form>
        <p @click="closeForgotPassword">Cancel</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useUserStore } from '~/stores/userStore';  // Import user store
  const userStore = useUserStore(); 
  
  import { useNuxtApp } from '#app'; // Import to access Nuxt app
  import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

  
  const router = useRouter();
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  });
  
  const email = ref('');
  const password = ref('');
  const resetEmail = ref('');
  const isForgotPassword = ref(false);
  const { $auth } = useNuxtApp(); // Get auth instance from Nuxt app
  
  const closeOverlay = () => {
    email.value = '';
    password.value = '';
    resetEmail.value = '';
    isForgotPassword.value = false;
    props.onClose();
  };
  
  const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value); 

    closeOverlay(); // Close the overlay after successful login
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed: ' + error.message); // Show error message
  }
};
  
  // Show forgot password form
  const showForgotPassword = () => {
    isForgotPassword.value = true;
  };
  
  // Close forgot password form
  const closeForgotPassword = () => {
    isForgotPassword.value = false;
  };
  
  // Handle password reset email
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail($auth, resetEmail.value);
      alert('Password reset email sent!');
      closeForgotPassword();
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error: ' + error.message);
    }
  };
  </script>
  
  <style scoped>
  .login-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    background-color: rgba(0, 0, 0, 0.6); /* Darken the background */
    z-index: 20; /* Higher z-index to ensure it overlays correctly */
  }
  
  .overlay__content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px; /* Ensure the width is enough for the form */
  }
  
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #5bb9cd;
    color: white;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #4da0b3;
  }
  
  h3 {
    margin-bottom: 16px;
  }
  
  .forgot-password {
    color: blue;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .forgot-password-overlay {
    margin-top: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  </style>
  