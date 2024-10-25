<template>
    <div class="register-page">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="text" placeholder="Username" v-model="username" required />
        <input type="password" placeholder="Create Password" v-model="password" required />
        <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
        <button type="submit">Create User</button>
      </form>
  
      <AccountConfirmationOverlay 
        :isOpen="isOverlayOpen" 
        :username="username" 
        @close="isOverlayOpen = false" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AccountConfirmationOverlay from '~/components/AccountConfirmationOverlay.vue';
  
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isOverlayOpen = ref(false);
  const router = useRouter();
  
  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match!");
      return;
    }
  
    // Simulate registration logic (replace with actual API call)
    console.log("User registered:", { email: email.value, username: username.value, password: password.value });
  
    // Open the confirmation overlay
    isOverlayOpen.value = true;
  };
  </script>
  
  <style scoped>
  .register-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  input {
    display: block;
    width: 300px;
    margin: 10px 0;
    padding: 8px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #43ef27;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #36c320;
  }
  </style>
  