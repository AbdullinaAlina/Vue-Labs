<template>
    <div class="auth-overlay" v-if="isOpen" @click.self="closeOverlay">
      <div class="overlay__content">
        <h2>Authentication</h2>
        <div v-if="!user.isAuth">
          <button @click="showLoginOverlay">Login</button>
          <button @click="redirectToRegister">Register</button>
        </div>
        <div v-else>
          <h3>Welcome, {{ user.username }}!</h3>
          <router-link to="/profile">My Profile</router-link>
          <button @click="handleLogout">Log Out</button>
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
  
        <LoginOverlay :isOpen="isLoginOverlayOpen" @close="closeLoginOverlay" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'; // Import computed
  import { useRouter } from 'vue-router';
  import { useUserStore } from '~/stores/userStore'; // Import user store
  
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
  
  const router = useRouter();
  const userStore = useUserStore(); // Get user store instance
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
  
  const redirectToRegister = () => {
    props.onClose(); // Close the authentication overlay
    router.push('/register'); // Navigate to the /register page
  };
  
  const showLoginOverlay = () => {
    isLoginOverlayOpen.value = true;
  };
  
  const closeLoginOverlay = () => {
    isLoginOverlayOpen.value = false;
  };
  
  const handleRegister = () => {
    userStore.register(email.value, password.value, name.value); // Adjust parameters as needed
    closeOverlay();
  };
  
  const handleLogout = () => {
    userStore.logout();
    closeOverlay();
  };
  
  const navigateToProfile = () => {
    router.push(`/user/${userStore.user.email}`); // Change this based on your routing logic
  };
  
  // Create a computed property to access user data
  const user = computed(() => userStore.user);
  </script>
  