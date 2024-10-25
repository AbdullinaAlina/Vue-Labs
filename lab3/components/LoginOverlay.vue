<template>
    <div class="login-overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h3>Login</h3>
        <form @submit.prevent="handleLogin">
          <input type="text" placeholder="Username" v-model="email" />
          <input type="password" placeholder="Password" v-model="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  
  const closeOverlay = () => {
    email.value = '';
    password.value = '';
    props.onClose();
  };
  
  const handleLogin = () => {
    console.log('Logging in with', email.value, password.value);
    closeOverlay();
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
    background-color: #43ef27;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #36c320;
  }
  
  h3 {
    margin-bottom: 16px;
  }
  </style>
  