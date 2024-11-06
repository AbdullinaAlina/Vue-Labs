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
  import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

  
  const { $auth } = useNuxtApp();
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isOverlayOpen = ref(false);
  const router = useRouter();
  
  import axios from 'axios';

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Passwords don't match!");
        return;
    }

    try {
      const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
        console.log("Retrieved CSRF Token:", csrfToken); // Log the retrieved token
        console.log("Requesting with CSRF Token:", csrfToken); // Log the token used in the request

        await axios.post('http://127.0.0.1:8000/api/register/', {
            email: email.value,
            username: username.value,
            password: password.value,
        }, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });

        console.log("User registered successfully!");
        // Proceed with the next steps, e.g., showing confirmation overlay
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed: " + error.message);
    }
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
    background-color: #5bb9cd;
    color: white;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #4e9fb2;
  }
  </style>
  