<template>
    <div class="overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h2>Authentication</h2>
        <button @click="showLogin">Login</button>
        <button @click="showRegister">Register</button>
        <button @click="closeOverlay">Close</button>
        <div v-if="showLoginForm">
          <h3>Login</h3>
          <form @submit.prevent="handleLogin">
            <input type="text" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <button type="submit">Login</button>
          </form>
        </div>
        <div v-if="showRegisterForm">
          <h3>Register</h3>
          <form @submit.prevent="handleRegister">
            <input type="text" placeholder="Name" v-model="name" />
            <input type="text" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  });
  
  const email = ref('');
  const password = ref('');
  const name = ref('');
  const showLoginForm = ref(false);
  const showRegisterForm = ref(false);
  
  const closeOverlay = () => {
    showLoginForm.value = false;
    showRegisterForm.value = false;
    email.value = '';
    password.value = '';
    name.value = '';
    props.onClose();
  };
  
  const showLogin = () => {
    showLoginForm.value = true;
    showRegisterForm.value = false;
  };
  
  const showRegister = () => {
    showLoginForm.value = false;
    showRegisterForm.value = true;
  };
  
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with', email.value, password.value);
    closeOverlay();
  };
  
  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registering user', name.value, email.value, password.value);
    closeOverlay();
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .overlay__content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  </style>
  