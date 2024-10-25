<template>
    <div class="auth-overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h2>Authentication</h2>
        <button @click="showLoginOverlay">Login</button>
        <button @click="showRegister">Register</button>
  
        <div v-if="showRegisterForm">
          <h3>Register</h3>
          <form @submit.prevent="handleRegister">
            <input type="text" placeholder="Name" v-model="name" />
            <input type="text" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <button type="submit">Register</button>
          </form>
        </div>
  
        <LoginOverlay :isOpen="isLoginOverlayOpen" @close="closeLoginOverlay" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import LoginOverlay from './LoginOverlay.vue';
  
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
  const name = ref('');
  const showRegisterForm = ref(false);
  const isLoginOverlayOpen = ref(false);
  
  const closeOverlay = () => {
    showRegisterForm.value = false;
    email.value = '';
    password.value = '';
    name.value = '';
    isLoginOverlayOpen.value = false;
    props.onClose();
  };
  
  const showRegister = () => {
    showRegisterForm.value = true;
  };
  
  const showLoginOverlay = () => {
    isLoginOverlayOpen.value = true;
  };
  
  const closeLoginOverlay = () => {
    isLoginOverlayOpen.value = false;
  };
  
  const handleRegister = () => {
    console.log('Registering user', name.value, email.value, password.value);
    closeOverlay();
  };
  </script>
  
  <style scoped>
  .auth-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-end; /* Adjust to open from the right side */
    align-items: flex-start;
    z-index: 10;
  }
  
  .overlay__content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px; /* Ensure the width is enough for the form */
    margin: 16px; /* Add some margin to prevent sticking to the edges */
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
  
  h2, h3 {
    margin-bottom: 16px;
  }
  </style>
  